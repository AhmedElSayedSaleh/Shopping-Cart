import { ProductModel } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getProducts(): Observable<ProductModel[]> {
    return this._HttpClient
      .get<ProductModel[]>('https://fakestoreapi.com/products')
      .pipe(map((data) => data));
  }
}
