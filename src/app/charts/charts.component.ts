import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IChartData } from '../services/api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input('chartData') chartData$!: IChartData[] | null;

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
    if (!this.chartData$) {
      return;
    }

    this.chart.data.labels = this.chartData$.map((res: any) => {
      return res.date;
    }, []);

    this.chart.data.datasets[0].data = this.chartData$.map((res: any) => {
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
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            fill: {
              target: 'origin',
            },
            tension: 0.3,
            pointStyle: 'rectRounded',
            pointRadius: 8,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        scales: {
          x: {
            ticks: {
              font: {
                size: 10,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              color: 'black',
            },
          },
        },
      },
    });
  }
}
