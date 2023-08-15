import { TestBed } from '@angular/core/testing';

import { SharedApisService } from './shared-apis.service';

describe('SharedApisService', () => {
  let service: SharedApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
