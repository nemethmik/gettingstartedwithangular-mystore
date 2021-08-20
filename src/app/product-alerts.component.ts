import { Component, OnInit } from "@angular/core"
import { Input } from "@angular/core"
import { Output, EventEmitter } from "@angular/core"
import {Product} from "./appconstantsandtypes"

@Component({
  selector: "app-product-alerts",
  template: `
    <p *ngIf="product && product.price > 700">
      <button mat-button color="primary" (click)=notify.emit(product)><mat-icon>email</mat-icon> Notify Me</button>
    </p>
  `,
  styles: [
  ]
})
export class ProductAlertsComponent { // implements OnInit {
  @Input() product!: Product
  @Output() notify = new EventEmitter<Product>()
  constructor() { }
  // ngOnInit(): void {
  // }
}
