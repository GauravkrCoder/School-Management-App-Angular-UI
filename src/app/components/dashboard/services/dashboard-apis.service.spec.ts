import { TestBed } from '@angular/core/testing';

import { DashboardApisService } from './dashboard-apis.service';

describe('DashboardApisService', () => {
  let service: DashboardApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
