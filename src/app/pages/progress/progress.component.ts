import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['progress.component.css']
})
export class ProgressComponent {
  public progreso1: number = 0;
  public progreso2: number = 0;
  
  get getProgreso1(): string {
    return `${this.progreso1}%`;
  }

  get getProgreso2(): string {
    return `${this.progreso2}%`;
  }
}
