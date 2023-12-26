import { Injectable } from '@angular/core';
import { MenuItems } from '../interfaces/menu-items';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: MenuItems[] = [
    {
      title: 'Menú',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress Bar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'RXJS', url: 'rxjs' },
      ]
    }
  ];

  constructor() { }
}
