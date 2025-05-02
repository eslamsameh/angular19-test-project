import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

const cache = new Map<string, CacheEntry>();
const maxAge = 300000; // 5 minutes

function cleanupCache() {
  const expired = Date.now() - maxAge;
  cache.forEach((entry, key) => {
    if (entry.lastRead < expired) {
      cache.delete(key);
    }
  });
}

export const cacheRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);

  // If cached and fresh, return it
  if (cached && Date.now() - cached.lastRead < maxAge) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          url: req.urlWithParams,
          response: event.clone(),
          lastRead: Date.now(),
        });

        // Optionally: purge old entries
        cleanupCache();
      }
    })
  );
};
