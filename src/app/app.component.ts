import { Component, OnChanges, OnInit } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  countries: any = [
    'Italien',
    'Frankrike',
    'Spanien',
    'Tyskland',
    'Ungern',
    'USA',
    'Chile',
  ];

  //Kör python och skapa en json fil med data??
  regions: any = {
    Italien: ['Toscana', 'Piemonte', 'Sicilien', 'Umbrien'],
    Frankrike: [
      'Bordeaux',
      'Bourgogne',
      'Provence',
      'Champagne',
      'Cognac',
      'Rhonedalen',
      'Alsace',
    ],
    Spanien: ['Rioja', 'Penedès', 'Priorat', 'Jerez', 'Valencia'],
    USA: ['Kalifornien', 'Oregon'],
    Tyskland: ['Pfalz', 'Mosel', 'Rheingau', 'Baden'],
  };

  //Setup form
  form!: FormGroup;

  selectedToggleValue = '';

  //Define current selected option in dropdown
  currentCountry!: string;

  //Define chart data
  chartData$!: Observable<IChartData[]>;

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
