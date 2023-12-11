import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent implements OnInit{

  @Input() title: string = 'Sin Título'
  @Input('labels') labels: string[] = ['Sin Labels'];
  @Input('data') data: any = { };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Sin Labels'],
    datasets: [
      { data: [0] },
    ],
  };

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        this.data
      ]
    }
  }

}
