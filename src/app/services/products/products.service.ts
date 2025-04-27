import { APIS_URL } from '@/config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    return this.httpClient.get(APIS_URL.GET_PRODUCTS);
  }
}
