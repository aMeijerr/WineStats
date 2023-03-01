import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BehaviorSubject } from 'rxjs';
import { IChartData } from '../services/api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input('chartData') chartData!: IChartData[] | null;

  public chart: any;

  queryParam = new BehaviorSubject<string>('Vin');
  country = new BehaviorSubject<string>('Frankrike');

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
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Sales in litres',
            data: [],
            backgroundColor: 'blue',
          },
          // {
          //   label: 'Profit',
          //   data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
          //   backgroundColor: 'limegreen',
          // },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
