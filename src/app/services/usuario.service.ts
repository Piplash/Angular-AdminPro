import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { ILoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient, private router: Router) { }

  public crearUsuario( formData: IRegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  public login( formData: ILoginForm ){
    return this.http.post(`${base_url}/login`, formData);
  }

  public loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token });
  }

  public validarToken() {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( ( resp: any ) => {
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
