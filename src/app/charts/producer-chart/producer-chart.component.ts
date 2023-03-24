import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IChartData } from '../../services/api.service';

@Component({
  selector: 'app-producer-chart',
  templateUrl: './producer-chart.component.html',
  styleUrls: ['./producer-chart.component.scss'],
})
export class ProducerChartComponent implements OnInit, OnChanges {
  @Input('topProducerListData') topProducerListData$?: IChartData[] | null;

  public producerChart: any;
  public producerSalesChart: any;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    this.createProducerChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.topProducerListData$) {
      this.isLoading = true;
      return;
    }

    this.producerChart.data.labels = this.topProducerListData$.map(
      (res: any) => {
        return res.producer_name;
      },
      []
    );

    this.producerChart.data.datasets[0].data = this.topProducerListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.producerSalesChart.data.labels = this.topProducerListData$.map(
      (res: any) => {
        return res.producer_name;
      },
      []
    );

    this.producerSalesChart.data.datasets[0].data =
      this.topProducerListData$.map((res: any) => {
        return res.total_sales;
      }, []);

    this.producerChart.update();
    this.producerSalesChart.update();

    this.isLoading = false;
  }

  createProducerChart() {
    this.producerChart = new Chart('producerChart', {
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
    this.producerSalesChart = new Chart('producerSalesChart', {
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
                size: 12,
                family:
                  "'Tinos', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
              color: 'black',
            },
          },
        },
      },
    });
  }
}
