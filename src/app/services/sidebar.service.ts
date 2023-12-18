import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Menú',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress Bar', url: 'progress' },
        { titulo: 'Gráficas', url: 'grafica1' },
      ]
    }
  ];

  constructor() { }
}
