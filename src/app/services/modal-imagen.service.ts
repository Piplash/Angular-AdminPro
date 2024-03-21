import { EventEmitter, Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { FileUploadService } from './file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

  public tipo: string = '';
  public id: string = '';
  public img: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  public abrirModal(tipo: string, id: string, img: string){

    this._ocultarModal = false;

    this.tipo = tipo;
    this.id   = id;
    this.img  = img;

    if(img){
      if(img.includes('https')){
        this.img = img;
      }else{
        this.img = `${base_url}/uploads/${tipo}/${img}`;
      }
    }
    
  }

  public cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
