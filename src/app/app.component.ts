import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  //Setup form
  form!: FormGroup;

  categoryControl = new FormControl([]);

  selectedToggleValue = '';

  //Define current selected option in dropdown
  countries: { [key: string]: string[] } = countries;
  currentCountry!: string;
  filteredRegions!: string[];

  //Define chart data
  chartData$!: Observable<IChartData[]>;

  onCountrySelect() {
    const country = this.currentCountry;
    if (country) {
      this.filteredRegions = this.countries[country];
    } else {
      this.filteredRegions = [];
    }
  }

  changeToggleValue(value: string) {
    this.selectedToggleValue = value;
    this.form.patchValue({ region: '', category: '' });
    // this.form.get('region')?.setValue('', { emitEvent: false });
  }

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

    this.categoryControl.valueChanges.subscribe(
      (selectedCategories: string[] | null) => {
        this.form.get('category')?.setValue(selectedCategories);
      }
    );

    this.chartData$ = this.form.valueChanges.pipe(
      switchMap(({ country, region, category }) => {
        return this.apiService.getData(country, region, category);
      })
    );
  }
}
