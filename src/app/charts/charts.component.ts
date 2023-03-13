import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IChartData } from '../services/api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input('chartData') chartData!: IChartData[] | null;

  public chart: any;

  constructor() {}

  ngOnInit() {
    this.createChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.chartData) {
      return;
    }

    this.chart.data.labels = this.chartData.map((res: any) => {
      return res.date;
    }, []);

    this.chart.data.datasets[0].data = this.chartData.map((res: any) => {
      return res.total_sales;
    }, []);
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Sales in litres',
            data: [],
            backgroundColor: [
              // 'rgba(255, 99, 132, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              //'rgba(255, 206, 86, 1)',
              // 'rgba(255,99,132,1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            fill: {
              target: 'origin',
              // above: 'rgb(255, 240, 0)', // Area will be red above the origin
              // below: 'rgb(0, 231, 255)', // And blue below the origin
            },
            tension: 0.3,
            pointStyle: 'rectRounded',
            pointRadius: 8,
            borderWidth: 1,
          },
          // {
          //   label: 'Profit',
          //   data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
          //   backgroundColor: 'limegreen',
          // },
        ],
      },
      options: {
        aspectRatio: 2,
        // scales: {
        //   x: {
        //     ticks: {
        //       font: {
        //         size: 14,
        //         family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //         weight: 'bold',
        //       },
        //       color: 'black',
        //     },
        //   },
        // },
      },
    });
  }
}
