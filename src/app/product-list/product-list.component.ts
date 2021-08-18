import { Component, OnInit } from "@angular/core"
import { products } from "../products"
@Component({
  selector: "app-product-list",
  template: `
    <div style="padding: 0 16px;display: flex;flex-direction: row;">
      <h2>Products</h2>
    </div>
  `,
  styles: [
  ]
})
export class ProductListComponent { //implements OnInit { ngOnInit(): void {  }
  products = products // This looks weird but TS knows how to interpret it: it creates a member variable and links it to the imported products object 
  constructor() { }
}
