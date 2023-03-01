import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IChartData {
  date: number;
  total_sales: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'http://localhost:3000/country';
  country$ = new BehaviorSubject<string>('USA');

  constructor(private http: HttpClient) {}

  private buildUrl(): string {
    const baseUrl = 'http://localhost:3000/country';
    const queryParams = new HttpParams().set('country', this.country$.value);
    return `${baseUrl}?${queryParams.toString()}`;
  }

  getData(): Observable<IChartData[]> {
    const url = this.buildUrl();
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
