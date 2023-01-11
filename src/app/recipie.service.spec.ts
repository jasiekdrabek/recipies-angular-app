import { TestBed } from '@angular/core/testing';

import { RecipieService } from './recipie.service';

describe('RecipieService', () => {
  let service: RecipieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
