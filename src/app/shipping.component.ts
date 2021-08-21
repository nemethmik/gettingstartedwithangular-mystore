import { Component, OnInit } from "@angular/core"
import { CartService } from "./cart.service"
import {RouteNames} from "./appconstantsandtypes"

@Component({
  selector: "app-shipping",
  template: `
    <div style="padding: 0 16px;">
      <h2>Shipping Prices</h2>
      <a mat-flat-button color="primary" routerLink="/"><mat-icon>home</mat-icon> Home</a>
      <a style="margin-left:4px;" mat-flat-button color="primary" [routerLink]=cartRouteName><mat-icon>shopping_cart</mat-icon> Checkout</a>
    </div>
    <mat-list [style.overflow]="'auto'" [style.height.px]=400>
      <mat-list-item *ngFor="let shipping of shippingCosts | async">
        <span matLine>{{ shipping.type }}</span>
        <span matLine>{{ shipping.price | currency }}</span>
      </mat-list-item>
    </mat-list>  
  `,
  styles: [
  ]
})
export class ShippingComponent {
  cartRouteName = "/" + RouteNames.cart
  shippingCosts = this.cartService.getShippingPrices()
  constructor(private cartService: CartService) { }
}
