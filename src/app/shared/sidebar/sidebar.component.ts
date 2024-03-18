import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MenuItems } from '../../interfaces/menu-items';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  public menuItems: MenuItems[] = [];
  public profilePicture: string = '';
  public usuario!: Partial<Usuario>;

  constructor( private sidebarService: SidebarService, private usuarioService: UsuarioService ) {
    this.menuItems = sidebarService.menu;
    this.menuItems.forEach(item =>{
      item.submenu.sort((a, b) => (a.titulo > b.titulo) ? 1: -1);
    })

    this.profilePicture = usuarioService.usuario.imagenUsuario;
    this.usuario = usuarioService.usuario;
  }

}
