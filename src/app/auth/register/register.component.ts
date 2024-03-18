import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { IRegisterForm } from '../../interfaces/register-form.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre    : ['Kim Dahyun', [Validators.required, Validators.minLength(5)]],
    email     : ['kimdubu@gmail.com', [Validators.required, Validators.email]],
    password  : ['', Validators.required],
    password2 : ['', Validators.required],
    terminos  : [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  public crearUsuario() {
    this.formSubmitted = true;
    
    if(this.registerForm.invalid){
      return;
    }

    const form = this.registerForm.value as IRegisterForm;

    this.usuarioService.crearUsuario( form ).subscribe({
      next: resp =>{
        console.log('Usuario Creado', resp);
      },
      error: error =>{
        Swal.fire('Error', error.error.msg, 'error');
      },
      complete: () => { 
        Swal.fire({
          title: "Creación Exitosa",
          text: "Su cuenta ha sido creada exitosamente",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/login');
          }
        });
      }
    })
  }

  public validarCampos(campo: string): boolean {
    let response = false;

    if (campo !== 'terminos') {
      if (this.registerForm.get(campo)?.invalid && (this.formSubmitted || this.registerForm.get(campo)?.touched)) {
        response = true;
      }
    } else {
      if (this.registerForm.get(campo)?.invalid && (this.formSubmitted || this.registerForm.get(campo)?.touched)) {
        response = true;
        this.registerForm.controls[campo].setErrors({required: true});
      }
    }
    return response;
  }

  public validarContrasenas(): boolean {
    let pass1;
    let pass2;
  
    let response = false;
  
    pass1 = this.registerForm.get('password')?.value;
    pass2 = this.registerForm.get('password2')?.value;
  
    if (pass1 !== pass2) {
      response = true;
      this.registerForm.setErrors({contrasenasNoCoinciden: true});
    } else {
      this.registerForm.setErrors(null);
    }
  
    return response;
  }
}