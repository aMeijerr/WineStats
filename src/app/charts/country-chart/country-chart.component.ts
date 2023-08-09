import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { IChartData } from '../../services/api.service';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss'],
})
export class CountryChartComponent implements OnInit, OnChanges {
  @Input('topCountryListData') topCountryListData$?: IChartData[] | null;

  public topCountryChart: any;
  public topCountrySalesChart: any;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    this.createCountryListChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.topCountryListData$) {
      this.isLoading = true;
      return;
    }

    this.topCountryChart.data.labels = this.topCountryListData$.map(
      (res: any) => {
        return res.country;
      },
      []
    );

    this.topCountryChart.data.datasets[0].data = this.topCountryListData$.map(
      (res: any) => {
        return res.total_sales;
      },
      []
    );

    this.topCountrySalesChart.data.labels = this.topCountryListData$.map(
      (res: any) => {
        return res.country;
      },
      []
    );

    this.topCountrySalesChart.data.datasets[0].data =
      this.topCountryListData$.map((res: any) => {
        return res.total_sales;
      }, []);

    this.topCountryChart.update();
    this.topCountrySalesChart.update();

    this.isLoading = false;
  }

  createCountryListChart() {
    this.topCountryChart = new Chart('topCountryChart', {
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
    this.topCountrySalesChart = new Chart('topCountrySalesChart', {
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
        maintainAspectRatio: false,
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
