import { CartService } from './../../services/cart.service';
import { ProductModel } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: ProductModel[] = [];
  public grandPrice: number = 0;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe((data) => {
      this.products = data;
      this.grandPrice = this._CartService.getTotalPrice();
    });
  }

  removeItem(product: ProductModel): void {
    this._CartService.removeFromCart(product);
  }

  emptyCart(): void {
    this._CartService.clearCart();
  }
}
