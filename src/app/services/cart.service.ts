import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: ProductModel[] = [];
  public productsList = new BehaviorSubject<ProductModel[]>([]);

  constructor() {}

  getCartProducts(): Observable<ProductModel[]> {
    return this.productsList.asObservable();
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

    this.productsList.next(this.cartItems);

    this.getTotalPrice();
    console.log(this.cartItems);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItems.map((product) => {
      grandTotal += product.total;
    });
    console.log(grandTotal);
    return grandTotal;
  }

  removeFromCart(product: ProductModel): void {
    const index = this.cartItems.indexOf(product);
    this.cartItems.splice(index, 1);

    this.productsList.next(this.cartItems);

    // this.getTotalPrice();
  }

  clearCart(): void {
    this.cartItems = [];

    this.productsList.next(this.cartItems);

    // this.getTotalPrice();
  }
}
