import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingUrlsComponent } from './trending-urls.component';

describe('TrendingUrlsComponent', () => {
  let component: TrendingUrlsComponent;
  let fixture: ComponentFixture<TrendingUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingUrlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
