import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { ILoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient, private router: Router) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  public crearUsuario( formData: IRegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  public actualizarUsuario( data: {email: string, nombre: string } ){
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  public login( formData: ILoginForm ){
    return this.http.post(`${base_url}/login`, formData);
  }

  public loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token });
  }

  public validarToken() {
    

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap( ( resp: any ) => {
        const { email, google, nombre, role, img, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
      catchError( err => of(false))
    )
  }

  public logOut() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('fibacosta@gmail.com', () =>{
      this.router.navigateByUrl('/login')
    })
  }
}
