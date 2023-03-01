import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  ];

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

  currentCountry!: string;
  countrySelect!: FormGroup;

  currentRegion!: string;
  regionSelect!: FormGroup;

  chartData$!: Observable<IChartData[]>;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.countrySelect = this.fb.group({
      selectedCountry: '',
    });

    this.regionSelect = this.fb.group({
      selectedRegion: '',
    });

    this.chartData$ = combineLatest([
      this.countrySelect.controls['selectedCountry'].valueChanges,
      this.regionSelect.controls['selectedRegion'].valueChanges,
    ]).pipe(
      switchMap(([country, region]) => {
        return this.apiService.getData(country, region);
      })
    );

    // this.chartData$ = this.countrySelect.controls[
    //   'selectedCountry'
    // ].valueChanges.pipe(
    //   switchMap((country: string) => {
    //     // let region = this.countrySelect.controls['selectedRegion'].value;
    //     // return this.currentRegion
    //     //   ? this.apiService.getData(country)
    //     //   : this.apiService.getData(country, this.currentRegion);
    //     return this.apiService.getData(country, this.currentRegion);
    //   })
    // );

    // this.chartData$ = this.regionSelect.controls[
    //   'selectedRegion'
    // ].valueChanges.pipe(
    //   switchMap((region: string) => this.apiService.getData(region))
    // );
  }
}
