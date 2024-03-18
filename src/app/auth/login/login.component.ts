import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ILoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit{
  @ViewChild('googleBtn')   googleBtn!: ElementRef;
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email     : [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password  : ['', Validators.required],
    remember  : [false]
  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService){}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  public googleInit(){
    google.accounts.id.initialize({
      client_id: "772748740980-tj9isbslfc4noo5pnmir5sfqa0h255vp.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  public handleCredentialResponse(response: any){
    this.usuarioService.loginGoogle( response.credential ).subscribe({
      next: (resp: any) => {
        localStorage.setItem('token', resp.token);
      },
      error: error => {
        Swal.fire('Error', error.error.msg, 'error')
      },
      complete: () => {
        this.router.navigateByUrl('/dashboard');
      }
    })
  }

  public login(){
    const form = this.loginForm.value as ILoginForm;
    this.usuarioService.login( form ).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        if( form.remember ){
          localStorage.setItem('email', form.email);
        } else {
          localStorage.removeItem('email');
        }
      },
      error: error =>{
        Swal.fire('Error', error.error.msg, 'error');
      },
      complete: () => {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
