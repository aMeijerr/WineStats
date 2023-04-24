import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesChartComponent } from './charts/sales-chart/sales-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProducerChartComponent } from './charts/producer-chart/producer-chart.component';
import { ProductChartComponent } from './charts/product-chart/product-chart.component';
import { CountryChartComponent } from './charts/country-chart/country-chart.component';
import { CategoryChartComponent } from './charts/category-chart/category-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesChartComponent,
    NavbarComponent,
    ProducerChartComponent,
    ProductChartComponent,
    CountryChartComponent,
    CategoryChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSliderModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
