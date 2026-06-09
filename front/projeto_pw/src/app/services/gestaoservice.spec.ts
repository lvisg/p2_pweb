import { TestBed } from '@angular/core/testing';

import { Gestaoservice } from './gestaoservice';

describe('GestaoService', () => {
  let service: GestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
