import { TestBed, inject } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';

describe('TransactionsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsService]
    });
  });

  it('should be created', inject([TransactionsService], (service: TransactionsService) => {
    expect(service).toBeTruthy();
  }));
});
