import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { singleProductResolver } from './single-product.resolver';

describe('singleProductResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => singleProductResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
