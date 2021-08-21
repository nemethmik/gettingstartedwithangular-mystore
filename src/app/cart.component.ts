import { Component, OnInit } from "@angular/core"
import { CartService } from "./cart.service"
import {RouteNames} from "./appconstantsandtypes"
@Component({
  selector: "app-cart",
  template: `
    <div style="padding: 0 16px;">
      <h2>Cart</h2>
      <a mat-flat-button color="primary" [routerLink]=shippingRouteName>Shipping Prices</a>
      <a style="margin-left:4px;" mat-flat-button color="primary" routerLink="/"><mat-icon>home</mat-icon> Home</a>
    </div>
    <p>
    <mat-list [style.overflow]="'auto'" [style.height.px]=400>
      <mat-list-item *ngFor="let item of items">
        <span matLine>{{ item.name }}</span>
        <span matLine>{{ item.price | currency }}</span>
      </mat-list-item>
    </mat-list>  
  `,
  styles: [
  ]
})
export class CartComponent {
  shippingRouteName = "/" + RouteNames.shipping
  items = this.cartService.getItems()
  constructor(private cartService: CartService) { }
}
