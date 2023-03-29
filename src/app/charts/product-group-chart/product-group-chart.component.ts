import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IChartData } from '../../services/api.service';

@Component({
  selector: 'app-product-group-chart',
  templateUrl: './product-group-chart.component.html',
  styleUrls: ['./product-group-chart.component.scss'],
})
export class ProductGroupChartComponent implements OnInit, OnChanges {
  @Input('productGroupListData') productGroupListData$?: IChartData[] | null;

  public productGroupChart: any;
  public productGroupSalesChart: any;
  public isLoading = true;

  // chartType: keyof ChartTypeRegistry = 'line';

  constructor() {}

  ngOnInit() {
    this.createProductGroupListChart();
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.productGroupListData$) {
      this.isLoading = true;
      return;
    }

    // if (window.innerWidth <= 700) {
    //   this.chartType = 'line';
    // }

    this.productGroupChart.data.labels = this.productGroupListData$.map(
      (res: any) => {
        console.log(res);
        return res.product_group_detail;
      },
      []
    );

    this.productGroupChart.data.datasets[0].data =
      this.productGroupListData$.map((res: any) => {
        return res.total_sales;
      }, []);

    this.productGroupSalesChart.data.labels = this.productGroupListData$.map(
      (res: any) => {
        return res.product_group_detail;
      },
      []
    );

    this.productGroupSalesChart.data.datasets[0].data =
      this.productGroupListData$.map((res: any) => {
        return res.total_sales;
      }, []);

    this.productGroupChart.update();
    this.productGroupSalesChart.update();

    this.isLoading = false;
  }

  createProductGroupListChart() {
    this.productGroupChart = new Chart('productGroupChart', {
      type: 'doughnut',
      data: {
        //Country / Leverantör beroende på mest antal top 10?
        labels: [],
        datasets: [
          {
            //Number of sales top 10?
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
    this.productGroupSalesChart = new Chart('productGroupSalesChart', {
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
        plugins: {
          // legend: {
          //   position: 'right',
          // },
        },
      },
    });
    // this.productGroupSalesChart = new Chart('productGroupSalesChart', {
    //   type: 'line',
    //   data: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: 'Sales in litres',
    //         data: [],
    //         backgroundColor: ['rgba(75, 192, 192, 0.2)'],
    //         borderColor: ['rgba(54, 162, 235, 1)'],
    //         fill: {
    //           target: 'origin',
    //         },
    //         tension: 0.3,
    //         pointStyle: 'rectRounded',
    //         pointRadius: 8,
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     aspectRatio: 2,
    //     scales: {
    //       x: {
    //         ticks: {
    //           font: {
    //             size: 12,
    //             family:
    //               "'Tinos', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    //           },
    //           color: 'black',
    //         },
    //       },
    //     },
    //   },
    // });
  }
}
