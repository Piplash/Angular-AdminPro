import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MenuItems } from '../../interfaces/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  public menuItems: MenuItems[] = [];

  constructor( private sidebarService: SidebarService ) {
    this.menuItems = sidebarService.menu;
    this.menuItems.forEach(item =>{
      item.submenu.sort((a, b) => (a.titulo > b.titulo) ? 1: -1);
    })
  }

}
