import { TestBed } from '@angular/core/testing';

import { ToastrHelperService } from './toastr-helper.service';

describe('ToastrHelperService', () => {
  let service: ToastrHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
