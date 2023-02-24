import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  public chart: any;
  queryParam = new BehaviorSubject<string>('Vin');
  country = new BehaviorSubject<string>('Frankrike');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.createChart();
  }

  // private buildDynamicUrl(param: string): string {
  //   const baseUrl = `http://localhost:3000/${param}`;
  //   const queryParams = new HttpParams().set(
  //     param,
  //     this.queryParam.value
  //   );
  //   return `${baseUrl}?${queryParams.toString()}`;
  // }

  private buildUrl(): string {
    const baseUrl = 'http://localhost:3000/data';
    const queryParams = new HttpParams().set(
      'queryParam',
      this.queryParam.value
    );
    return `${baseUrl}?${queryParams.toString()}`;
  }

  private buildCountryUrl(): string {
    const baseUrl = 'http://localhost:3000/country';
    const queryParams = new HttpParams().set('country', this.country.value);
    return `${baseUrl}?${queryParams.toString()}`;
  }

  fetchData() {
    const url = this.buildCountryUrl();
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.chart.data.labels = response.map((res: any) => {
        return res.date;
      }, []);

      this.chart.data.datasets[0].data = response.map((res: any) => {
        return res.total_sales;
      }, []);
      this.chart.update();
    });
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

// this.http.get('http://localhost:3000/data').subscribe((response: any) => {
//   this.data = response.data;
// });
