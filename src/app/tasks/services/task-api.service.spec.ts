import { TestBed } from '@angular/core/testing';

import { TaskApiService } from './task-api.service';

describe('TaskApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskApiService = TestBed.get(TaskApiService);
    expect(service).toBeTruthy();
  });
});
