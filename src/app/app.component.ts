import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import countries from './services/countries.json';

export interface IChartInputData {
  country: string;
  region: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // countries = Object.entries(data).map(([country, regions]) => ({ country, regions }));

  //Setup form
  form!: FormGroup;

  selectedToggleValue = '';

  //Define current selected option in dropdown
  countries: { [key: string]: string[] } = countries;
  currentCountry!: string;
  filteredRegions!: string[];

  //Define chart data
  chartData$!: Observable<IChartData[]>;

  onCountrySelect() {
    const country = this.currentCountry;
    // this.currentCountry = country;
    if (country) {
      this.filteredRegions = this.countries[country];
      console.log(this.filteredRegions);
    } else {
      this.filteredRegions = [];
    }
  }

  changeToggleValue(value: string) {
    this.selectedToggleValue = value;
    this.form.patchValue({ region: '', category: '' });
    // this.form.get('region')?.setValue('', { emitEvent: false });
    // this.form.get('category')?.setValue('');
  }

  // resetData() {
  //   this.form.get('country')?.setValue('');
  //   this.form.get('region')?.setValue('');
  //   this.form.get('category')?.setValue('');
  // }

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      country: [''],
      region: [''],
      category: [''],
    });

    this.form.get('country')?.valueChanges.subscribe(() => {
      this.form.get('region')?.setValue('');
      this.form.get('category')?.setValue('');
    });

    this.chartData$ = this.form.valueChanges.pipe(
      switchMap(({ country, region, category }) => {
        return this.apiService.getData(country, region, category);
      })
    );
  }
}
