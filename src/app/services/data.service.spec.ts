import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { ListService } from './list.service';

describe('ListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ AppModule ]
  }));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });
});
