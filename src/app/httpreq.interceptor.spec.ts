import { TestBed } from '@angular/core/testing';

import { HttpreqInterceptor } from './httpreq.interceptor';

describe('HttpreqInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpreqInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpreqInterceptor = TestBed.inject(HttpreqInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
