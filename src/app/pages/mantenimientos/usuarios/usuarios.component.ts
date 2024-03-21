import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: `
    img{
      max-height: 50px;
    }

    td{
      vertical-align: middle;
    }
  `
})
export class UsuariosComponent implements OnInit{
  public usuarios: any = [];
  
  public base_url = environment.url;
  public avatarUsuario: string = '';
  
  public cargando: boolean = true;

  //Paginacion
  public elementosPorPagina: number =  5;
  public pagina: number = 0;
  public totalElementos: number = 0;
  public totalPaginas: number = 0;
  public prevDisabled: boolean = true;
  public nextDisabled: boolean = false;

  //
  public usuarioConectado!: Usuario;

  constructor( private usuarioService: UsuarioService, private modalImagenService: ModalImagenService){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioConectado = this.usuarioService.usuario;

    this.modalImagenService.nuevaImagen.subscribe( img => this.cargarUsuarios());
  }

  public cargarUsuarios(pagina: number = 0){
    this.cargando = true;
    setTimeout(() => {
      this.usuarioService.cargarUsuarios(pagina).subscribe({
        next: (res: any) => {
          this.usuarios = res.usuarios;
          this.totalElementos = res.total;
  
          this.totalPaginas = this.totalElementos / this.elementosPorPagina;
  
          this.generarRutaImagen(this.usuarios);
        },
        complete: () => {
          this.cargando = false;
        }
      })
    }, 1000);
  }

  public buscarUsuario(usuario: string){
    
    if(usuario === ''){
      this.cargarUsuarios();
      return
    }

    this.cargando = true;
    setTimeout(() => {
      this.usuarioService.buscarUsuario(usuario).subscribe({
        next: (res: any) =>{
          this.usuarios = res.resultado;
          this.generarRutaImagen(this.usuarios);
        },
        error: err =>{
          console.log(err);
        },
        complete: () =>{
          this.cargando = false;
        }
      });
    }, 1000);
  }

  public generarRutaImagen(usuarios: []){
    usuarios.forEach((usuario: any) => {
      if(usuario.img && usuario.img.includes('https')){
        usuario.rutaImagen = usuario.img
      }else{
        if(usuario.img){
          usuario.rutaImagen = `${this.base_url}/uploads/usuarios/${usuario.img}`
        }
        
      }
    });
  }

  public eliminarUsuario(id: string, nombre: string){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir la eliminación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar Usuario",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: res =>{
            this.cargarUsuarios();
          },
          error: err =>{
            console.log(err)
          },
          complete: () =>{
            Swal.fire({
              title: `Eliminado`,
              text: `El usuario "${nombre}" ha sido eliminado.`,
              icon: "success"
            });
          }
        })
      }
    });
  }

  public cambiarRol(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario, usuario.uid).subscribe({
      next: res => {
      },
      error: err =>{
        console.log(err)
      },
      complete: () => {
        Swal.fire({
          title: "Rol Actualizado",
          icon: "success"
        });
      }
    })
  }

  public cambiarPagina ( valor: number ){
    this.pagina = this.pagina + valor;

    if( this.pagina < 0){
      this.pagina = 0;
    } else if ( this.pagina >= this.totalElementos ){
      this.pagina -= valor;
    }

    this.cargarUsuarios(this.pagina);
    this.deshabilitarBotones();
  }

  public deshabilitarBotones(){
    if( this.pagina === 0){
      this.prevDisabled = true;
    }else{
      this.prevDisabled = false;
    }

    if( this.pagina + this.elementosPorPagina >= this.totalElementos ){
      this.nextDisabled = true;
    }else{
      this.nextDisabled = false;
    }
  }

  public abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img!);
  }

}
