import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit{
  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';
  
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ` + this.btnClass;
  }

  get getPorcentaje(): string {
    return `${this.progreso}%`;
  }

  public cambiarValor( valor: number): number {
    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
    return this.progreso;
  }

  public onChange(evento: number): void{
    if(evento >= 100){
      this.progreso = 100;
    }else if ( evento <= 0){
      this.progreso = 0;
    }else{
      this.progreso = evento;
    }
    
    this.valorSalida.emit(this.progreso);
  }
}
