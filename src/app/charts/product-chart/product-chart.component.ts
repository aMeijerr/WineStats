import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { IChartData } from '../../services/api.service';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.scss'],
})
export class ProductChartComponent implements OnInit, OnChanges {
  @Input('topProductListData') topProductListData$?: IChartData[] | null;

  public productChart: any;
  public productSalesChart: any;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    this.createTopProductListChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.topProductListData$) {
      this.isLoading = true;
      return;
    }

    this.productChart.data.labels = this.topProductListData$.map((res: any) => {
      return res.name;
    }, []);

    this.productChart.data.datasets[0].data = this.topProductListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.productSalesChart.data.labels = this.topProductListData$.map(
      (res: any) => {
        return res.name;
      },
      []
    );

    this.productSalesChart.data.datasets[0].data = this.topProductListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.productChart.update();
    this.productSalesChart.update();

    this.isLoading = false;
  }

  createTopProductListChart() {
    this.productChart = new Chart('productChart', {
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
        maintainAspectRatio: false,
      },
    });
    this.productSalesChart = new Chart('productSalesChart', {
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
