import { TestBed } from '@angular/core/testing';

import { TransitionViewService } from './transition-view.service';

describe('TransitionViewService', () => {
  let service: TransitionViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
