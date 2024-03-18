import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: `
    img{
      max-height: 300px;
    }
  `
})
export class PerfilComponent implements OnInit { 

  public profilePicture: string = '';
  public usuario!: Usuario;

  public profileForm!: FormGroup;

  public imagenSubir!: File;

  public vistaPrevia: any = '';

  constructor( private usuarioService: UsuarioService, private fileUploadService: FileUploadService, private fb: FormBuilder){
    this.profilePicture = usuarioService.usuario.imagenUsuario;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [ this.usuario.nombre ],
      email: [ this.usuario.email ]
    })

    if(this.usuario.google){
      this.profileForm.get('email')?.disable();
    }
  }

  public actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.profileForm.value).subscribe({
      next: (response: any) => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        
      },
      error: error => {
        Swal.fire('Error', error.error.msg, 'error');
      },
      complete: () => {
        Swal.fire('Guradado', 'Cambios fueron guardados', 'success');
      }
    });
  }

  public actualizarFoto(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!).then( img => {
      this.usuario.img = img;
      Swal.fire('Guardado', "Imagen actualizada", 'success')
    });
  }

  public cambiarImagen(event: any){
    this.imagenSubir = event.target.files[0];

    if ( !event.target.files[0] ) { return; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( this.imagenSubir );

    
    reader.onloadend = () => {
      this.vistaPrevia = reader.result;
    }
  }

}
