import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BigQueryService } from './services/query.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ChartsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [BigQueryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
