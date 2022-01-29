import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public cartItemsCount: number = 0;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe((products) => {
      this.cartItemsCount = products.length;
      console.log(this.cartItemsCount);
    });
  }
}
