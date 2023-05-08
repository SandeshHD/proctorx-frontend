import { TestBed } from '@angular/core/testing';

import { ViewQuestionsService } from './view-questions.service';

describe('ViewQuestionsService', () => {
  let service: ViewQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
