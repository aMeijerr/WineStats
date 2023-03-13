import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface IChartData {
  date: number;
  total_sales: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private buildCountryUrl(
    selectedCountry: string,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = 'http://localhost:3000/country';
    let queryParams = new HttpParams().set('country', selectedCountry);
    if (selectedRegion) {
      queryParams = queryParams.set('region', selectedRegion);
    }
    if (selectedCategory && selectedCategory.length > 0) {
      queryParams = queryParams.set('category', selectedCategory);
    }
    return `${baseUrl}?${queryParams.toString()}`;
  }

  getData(
    selectedCountry: string,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildCountryUrl(
      selectedCountry,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
