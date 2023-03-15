import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IChartData } from '../services/api.service';

@Component({
  selector: 'app-toplist-chart',
  templateUrl: './toplist-chart.component.html',
  styleUrls: ['./toplist-chart.component.scss'],
})
export class ToplistChartComponent implements OnInit, OnChanges {
  @Input('topListData') topListData$?: IChartData[] | null;

  public toplistChart: any;

  constructor() {}

  ngOnInit() {
    this.createTopListChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.topListData$) {
      return;
    }

    this.toplistChart.data.labels = this.topListData$.map((res: any) => {
      return res.producer_name;
    }, []);

    this.toplistChart.data.datasets[0].data = this.topListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.toplistChart.update();
  }

  createTopListChart() {
    this.toplistChart = new Chart('toplistChart', {
      type: 'doughnut',
      data: {
        //Country / Leverantör beroende på mest antal top 10?
        labels: [],
        datasets: [
          {
            //Number of sales top 10?
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            hoverOffset: 4,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
      },
    });
  }
}
