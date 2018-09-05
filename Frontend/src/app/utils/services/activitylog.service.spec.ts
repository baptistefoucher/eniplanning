import { TestBed, inject } from '@angular/core/testing';

import { ActivityLogService } from './activitylog.service';

describe('ActivityLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityLogService]
    });
  });

  it('should be created', inject([ActivityLogService], (service: ActivityLogService) => {
    expect(service).toBeTruthy();
  }));
});
