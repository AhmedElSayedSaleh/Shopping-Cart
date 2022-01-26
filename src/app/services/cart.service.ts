import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: ProductModel[] = [];

  constructor() {}

  getCartProducts(): Observable<ProductModel[]> {
    return new Observable((observer) => {
      observer.next(this.cartItems);
    });
  }

  addToCart(product: ProductModel): void {
    const index = this.cartItems.indexOf(product);
    if (index === -1) {
      product.quantity = 1;
      product.total = Number(product.price) * product.quantity;
      this.cartItems.push(product);
    } else {
      this.cartItems[index].quantity++;
      this.cartItems[index].total =
        Number(this.cartItems[index].price) * this.cartItems[index].quantity;
    }
    this.getTotalPrice();
    console.log(this.cartItems);
  }

  getTotalPrice(): void {
    let grandTotal = 0;
    this.cartItems.map((product) => {
      grandTotal += product.total;
    });
  }

  removeFromCart(product: ProductModel): void {
    const index = this.cartItems.indexOf(product);
    this.cartItems.splice(index, 1);
    this.getTotalPrice();
  }

  clearCart(): void {
    this.cartItems = [];
    this.getTotalPrice();
  }
}
