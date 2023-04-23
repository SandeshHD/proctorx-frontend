import { TestBed } from '@angular/core/testing';

import { TestWindowService } from './test-window.service';

describe('TestWindowService', () => {
  let service: TestWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
