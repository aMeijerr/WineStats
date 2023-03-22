import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const API_BASE_URL = environment.API_BASE_URL;

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
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/country`;
    let queryParams = new HttpParams();
    if (selectedCountry) {
      queryParams = queryParams.set('country', selectedCountry);
    }
    if (selectedRegion) {
      queryParams = queryParams.set('region', selectedRegion);
    }
    if (selectedCategory && selectedCategory.length > 0) {
      queryParams = queryParams.set('category', selectedCategory);
    }
    if (minYear && maxYear) {
      queryParams = queryParams.set('minYear', minYear.toString());
      queryParams = queryParams.set('maxYear', maxYear.toString());
    }
    return `${baseUrl}?${queryParams.toString()}`;
  }

  private buildTopListUrl(
    minYear: Number,
    maxYear: Number,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/toplist`;
    let queryParams = new HttpParams();
    if (selectedCategory && selectedCategory.length > 0) {
      queryParams = queryParams.set('category', selectedCategory);
    }
    if (minYear && maxYear) {
      queryParams = queryParams.set('minYear', minYear.toString());
      queryParams = queryParams.set('maxYear', maxYear.toString());
    }
    return `${baseUrl}?${queryParams.toString()}`;
  }

  getData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildCountryUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }

  getTopListData(
    minYear: Number,
    maxYear: Number,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildTopListUrl(minYear, maxYear, selectedCategory);
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
