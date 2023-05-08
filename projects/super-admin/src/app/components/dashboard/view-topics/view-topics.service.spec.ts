import { TestBed } from '@angular/core/testing';

import { ViewTopicsService } from './view-topics.service';

describe('ViewTopicsService', () => {
  let service: ViewTopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
