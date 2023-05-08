import { TestBed } from '@angular/core/testing';

import { ViewFacultiesService } from './view-faculties.service';

describe('ViewFacultiesService', () => {
  let service: ViewFacultiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewFacultiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
