import { CartService } from './../../services/cart.service';
import { ProductModel } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productsList: ProductModel[] = [];
  public filteredProducts: ProductModel[] = [];

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe((data) => {
      this.productsList = data;
      this.filteredProducts = data;

      this.productsList.forEach((product) => {
        if (
          product.category === "men's clothing" ||
          product.category === "women's clothing"
        ) {
          product.category = 'fashion';
        }
      });
      console.log(this.productsList);
    });
  }

  addToCart(product: ProductModel): void {
    this._CartService.addToCart(product);
  }

  productsFilter(category: string) {
    this.filteredProducts = this.productsList.filter((product) =>
      product ? product.category === category || category === 'all' : false
    );
  }
}
