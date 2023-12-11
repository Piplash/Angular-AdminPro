import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
  public titulos: string[] = ['Rendimiento','Lado', 'Campeones', 'KDA'];

  public rendimientoLabels: string[] = [
    'Victorias',
    'Derrotas',
  ];

  public ladoLabels: string[] = [
    'Azul',
    'Rojo'
  ];

  public campeonesLabels: string[] = [
    'Janna',
    'Karma',
    'Lux',
    'Nami',
  ];

  public kdaLabels: string[] = [
    'Kills',
    'Deaths',
    'Assists',
  ];

  public rendimientoData = {
    data: [59, 41] 
  };

  public ladoData = {
     data: [43, 57]
  };

  public campeonesData = {
    data: [17, 23, 42, 18]
  };

  public kdaData = {
    data: [31, 59, 242] 
  };
}


