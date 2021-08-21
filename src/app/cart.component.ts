import { Component, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { CartService } from "./cart.service"
import { RouteNames, IMyStoreEvents } from "./appconstantsandtypes"
import { MyStoreEventsService } from "./mystore-events.service"

@Component({
  selector: "app-cart",
  template: `
    <div style="padding: 0 16px;">
      <h2>Cart</h2>
      <a mat-flat-button color="primary" [routerLink]=shippingRouteName>Shipping Prices</a>
      <a style="margin-left:4px;" mat-flat-button color="primary" routerLink="/"><mat-icon>home</mat-icon> Home</a>
    </div>
    <p>
    <mat-list [style.overflow]="'auto'" [style.height.px]=300>
      <mat-list-item *ngFor="let item of items">
        <span matLine>{{ item.name }}</span>
        <span matLine>{{ item.price | currency }}</span>
      </mat-list-item>
    </mat-list>
    <form [formGroup]=checkoutForm (ngSubmit)=onSubmit() style="margin: 16px; width:400px;">
      <div>
        <mat-form-field appearance="fill" style="width: 100%;">
          <label for="name">Name</label>
          <input matInput id="name" type="text" formControlName="name">
        </mat-form-field>
      </div>
      <div>
        <mat-form-field appearance="fill" style="width: 100%;">
          <label for="address">Address</label>
          <input matInput id="address" type="text" formControlName="address">
        </mat-form-field>
      </div>
      <button mat-flat-button color=primary class="button" type="submit">Purchase</button>
    </form>
  `,
  styles: [
  ]
})
export class CartComponent {
  shippingRouteName = "/" + RouteNames.shipping
  items = this.cartService.getItems()
  constructor(private cartService: CartService, private formBuilder: FormBuilder, private myStoreEvents: MyStoreEventsService) { }
  checkoutForm = this.formBuilder.group({
    name: "",
    address: ""
  })
  onSubmit(): void {
    // Process checkout data here
    this.myStoreEvents.onShoppingCardSubmission.next(this.items)
    console.warn("Your order has been submitted", this.checkoutForm.value)
    this.items = this.cartService.clearCart()
    this.checkoutForm.reset()
  }
}
