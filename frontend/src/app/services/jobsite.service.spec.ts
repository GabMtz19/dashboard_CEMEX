import { TestBed } from '@angular/core/testing';

import { JobsiteService } from './jobsite.service';

describe('JobsiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobsiteService = TestBed.get(JobsiteService);
    expect(service).toBeTruthy();
  });
});
