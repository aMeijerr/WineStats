import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { IChartData } from './services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  countries: any = [
    'Italien',
    'Frankrike',
    'Spanien',
    'Slovenien',
    'Ungern',
    'USA',
  ];
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  countrySelect = this.fb.group({
    country: '',
  });

  get country() {
    return this.countrySelect.get('country');
  }

  changeCountry(e: any) {
    this.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onChange() {
    console.log(this.country?.value);
    // this.apiService.country$.next(this.country?.value);
  }

  chartData$: Observable<IChartData[]> = this.apiService.getData();
}
