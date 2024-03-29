import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const API_BASE_URL = environment.API_BASE_URL;

export interface IChartData {
  name: string;
  product_group_details: string;
  date: number;
  total_sales: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private buildSalesUrl(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/sales`;
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

  private buildCountryTopListUrl(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/countryToplist`;
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

  private buildProducerTopListUrl(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/producerToplist`;
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

  private buildProductTopListUrl(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/productToplist`;
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

  private buildCategoryTopListUrl(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): string {
    const baseUrl = `${API_BASE_URL}/categoryToplist`;
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

  getSalesData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildSalesUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }

  getCountryTopListData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildCountryTopListUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }

  getProductTopListData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildProductTopListUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }

  getProducerTopListData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildProducerTopListUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }

  getCategoryTopListData(
    selectedCountry: string,
    minYear: Number,
    maxYear: Number,
    selectedRegion?: string,
    selectedCategory?: string
  ): Observable<IChartData[]> {
    const url = this.buildCategoryTopListUrl(
      selectedCountry,
      minYear,
      maxYear,
      selectedRegion,
      selectedCategory
    );
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
