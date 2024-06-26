import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit{

  public profilePicture: string = '';
  public usuario!: Partial<Usuario>;

  constructor( private usuarioService: UsuarioService){ }

  ngOnInit(): void {
    this.profilePicture = this.usuarioService.usuario.imagenUsuario;
    this.usuario = this.usuarioService.usuario;
  }

  public logOut(){
    this.usuarioService.logOut();
  }

}
