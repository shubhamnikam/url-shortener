import { ComponentFixture, TestBed } from '@angular/core/testing';

import UrlShortVisitMainComponent from './url-short-visit-main.component';

describe('UrlShortVisitMainComponent', () => {
  let component: UrlShortVisitMainComponent;
  let fixture: ComponentFixture<UrlShortVisitMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlShortVisitMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlShortVisitMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
