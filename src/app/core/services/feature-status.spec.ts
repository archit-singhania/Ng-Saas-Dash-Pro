import { TestBed } from '@angular/core/testing';

import { FeatureStatus } from './feature-status';

describe('FeatureStatus', () => {
  let service: FeatureStatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureStatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
