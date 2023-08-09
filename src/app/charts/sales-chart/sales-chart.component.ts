import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { IChartData } from 'src/app/services/api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss'],
})
export class SalesChartComponent implements OnInit, OnChanges {
  @Input('salesChartData') salesChartData$!: IChartData[] | null;

  public chart: any;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    this.createChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.salesChartData$) {
      this.isLoading = true;
      return;
    }

    this.chart.data.labels = this.salesChartData$.map((res: any) => {
      return res.date;
    }, []);

    this.chart.data.datasets[0].data = this.salesChartData$.map((res: any) => {
      return res.total_sales;
    }, []);

    this.chart.update();

    this.isLoading = false;
  }

  createChart() {
    this.chart = new Chart('salesChart', {
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
        maintainAspectRatio: false,
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
