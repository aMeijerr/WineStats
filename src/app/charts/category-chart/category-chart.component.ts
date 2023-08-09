import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { IChartData } from '../../services/api.service';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
})
export class CategoryChartComponent implements OnInit, OnChanges {
  @Input('topCategoryListData') topCategoryListData$?: IChartData[] | null;

  public topCategoryChart: any;
  public topCategorySalesChart: any;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    this.createCategoryTopListChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.topCategoryListData$) {
      this.isLoading = true;
      return;
    }

    // if (window.innerWidth <= 700) {
    //   this.chartType = 'line';
    // }

    this.topCategoryChart.data.labels = this.topCategoryListData$.map(
      (res: any) => {
        return res.product_group_detail;
      },
      []
    );

    this.topCategoryChart.data.datasets[0].data = this.topCategoryListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.topCategorySalesChart.data.labels = this.topCategoryListData$.map(
      (res: any) => {
        return res.product_group_detail;
      },
      []
    );

    this.topCategorySalesChart.data.datasets[0].data =
      this.topCategoryListData$.map((res: any) => {
        return res.total_sales;
      }, []);

    this.topCategoryChart.update();
    this.topCategorySalesChart.update();

    this.isLoading = false;
  }

  createCategoryTopListChart() {
    this.topCategoryChart = new Chart('topCategoryChart', {
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
    this.topCategorySalesChart = new Chart('topCategorySalesChart', {
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
