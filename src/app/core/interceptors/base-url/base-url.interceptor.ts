import { environment } from '@/environment/environment';
import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Only prepend if it's a relative URL (not absolute)
  const isRelative = !/^http(s)?:\/\//i.test(req.url);
  const apiReq = req.clone({
    url: isRelative ? `${environment.apiUrl}${req.url}` : req.url,
  });

  return next(apiReq);
};
