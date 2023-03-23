import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplistChartComponent } from './toplist-chart.component';

describe('ToplistChartComponent', () => {
  let component: ToplistChartComponent;
  let fixture: ComponentFixture<ToplistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToplistChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToplistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
