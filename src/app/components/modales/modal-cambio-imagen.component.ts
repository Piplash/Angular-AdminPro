import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-cambio-imagen',
  templateUrl: './modal-cambio-imagen.component.html',
  styleUrl: './modal-cambio-imagen.component.css'
})
export class ModalCambioImagenComponent {
  public profilePicture: string = '';
  public usuario!: Usuario;
  public vistaPrevia: any = '';
  public imagenSubir!: File;

  constructor( public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService ){ }

  public actualizarFoto(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id).then( img => {
      Swal.fire('Guardado', "Imagen actualizada", 'success');

      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( err => {
      console.log(err);
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

  public cerrarModal(){
    this.vistaPrevia = '';
    this.modalImagenService.cerrarModal();
  }
}

