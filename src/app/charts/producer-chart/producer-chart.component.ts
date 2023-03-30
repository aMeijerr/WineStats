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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            hoverOffset: 8,
            borderColor: ['rgb(255,255,255)'],
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
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Sales in litres',
            data: [],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
      },
    });
  }
}
