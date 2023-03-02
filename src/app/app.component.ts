import { Component, OnChanges, OnInit } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    this.form.get('selectedRegion')?.setValue('');
    this.form.get('selectedCategory')?.setValue('');
  }

  // resetData() {
  //   this.form.get('selectedCountry')?.setValue('');
  //   this.form.get('selectedRegion')?.setValue('');
  //   this.form.get('selectedCategory')?.setValue('');
  // }

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      selectedCountry: [''],
      selectedRegion: [''],
      selectedCategory: [''],
    });

    this.form.get('selectedCountry')?.valueChanges.subscribe(() => {
      this.form.get('selectedRegion')?.setValue('');
      this.form.get('selectedCategory')?.setValue('');
    });

    this.chartData$ = combineLatest([
      this.form.controls['selectedCountry'].valueChanges,
      this.form.controls['selectedRegion'].valueChanges,
      this.form.controls['selectedCategory'].valueChanges,
    ]).pipe(
      switchMap(([country, region, category]) => {
        return this.apiService.getData(country, region, category);
      })
    );
  }
}
