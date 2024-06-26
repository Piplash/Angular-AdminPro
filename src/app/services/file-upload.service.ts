import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  public async actualizarFoto(archivo: File, tipo: string, id: string){
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
         'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if( data.ok ){
        return data.nombreArchivo;
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
