import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import countries from './services/countries.json';

export interface IChartInputData {
  country?: string;
  minYear: number;
  maxYear: number;
  region: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //Setup form
  form!: FormGroup;

  //Define toggle value in navbar, to show specific chart, default as sales to make it selected from start
  selectedToggleValue = 'sales';

  //Define current selected option in dropdown
  countries: { [key: string]: string[] } = countries;
  currentCountry!: string;
  filteredRegions!: string[];

  //Define chart data
  salesChartData$!: Observable<IChartData[]>;
  topProducerListData$!: Observable<IChartData[]>;
  topProductListData$!: Observable<IChartData[]>;
  topCountryListData$!: Observable<IChartData[]>;
  topCategoryListData$!: Observable<IChartData[]>;

  //Set year range of chart
  minYear: number = 2009;
  maxYear: number = 2021;

  //Define chart regions depending on selected country
  onCountrySelect() {
    const country = this.currentCountry;
    if (country) {
      this.filteredRegions = this.countries[country];
    } else {
      this.filteredRegions = [];
    }
  }

  //Patch value to form when toggle value is changed
  changeToggleValue(value: string) {
    this.selectedToggleValue = value;
    this.form.patchValue({ country: '', region: '', category: '' });
  }

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      country: [''],
      region: [''],
      category: [''],
      minYear: [this.minYear],
      maxYear: [this.maxYear],
    });

    //Reset region and category when country is changed
    this.form.get('country')?.valueChanges.subscribe(() => {
      this.form.get('region')?.setValue('');
      this.form.get('category')?.setValue('');
      this.form.get('minYear')?.setValue(this.minYear);
      this.form.get('maxYear')?.setValue(this.maxYear);
    });

    //Get chart data from api service
    this.salesChartData$ = this.form.valueChanges.pipe(
      debounceTime(0),
      switchMap(({ country, minYear, maxYear, region, category }) => {
        return this.apiService.getSalesData(
          country,
          minYear,
          maxYear,
          region,
          category
        );
      })
    );
    this.topProducerListData$ = this.form.valueChanges.pipe(
      debounceTime(0),
      switchMap(({ country, minYear, maxYear, region, category }) => {
        return this.apiService.getProducerTopListData(
          country,
          minYear,
          maxYear,
          region,
          category
        );
      })
    );
    this.topProductListData$ = this.form.valueChanges.pipe(
      debounceTime(0),
      switchMap(({ country, minYear, maxYear, region, category }) => {
        return this.apiService.getProductTopListData(
          country,
          minYear,
          maxYear,
          region,
          category
        );
      })
    );
    this.topCountryListData$ = this.form.valueChanges.pipe(
      debounceTime(0),
      switchMap(({ country, minYear, maxYear, region, category }) => {
        return this.apiService.getCountryTopListData(
          country,
          minYear,
          maxYear,
          region,
          category
        );
      })
    );
    this.topCategoryListData$ = this.form.valueChanges.pipe(
      debounceTime(0),
      switchMap(({ country, minYear, maxYear, region, category }) => {
        return this.apiService.getCategoryTopListData(
          country,
          minYear,
          maxYear,
          region,
          category
        );
      })
    );
  }
}
