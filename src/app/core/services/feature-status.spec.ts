import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeatureStatusService } from './feature-status';

describe('FeatureStatusService', () => {
  let service: FeatureStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FeatureStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
