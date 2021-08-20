import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { Output, EventEmitter } from "@angular/core"
// import { ToastrService } from "ngx-toastr"
import { products } from "./products"
import {Product,RouteParams} from "./appconstantsandtypes"
@Component({
  selector: "app-product-details",
  template: `
    <div style="padding:0 16px" *ngIf=product>
      <h2>Product Details</h2>
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar class="example-header-image"></div>
          <mat-card-title>{{ product.name }}</mat-card-title>
          <mat-card-subtitle>{{ product.price | currency:'EUR' }}</mat-card-subtitle>
        </mat-card-header>
        <!-- img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu" -->
        <mat-card-content>
          <p>
          {{ product.description }}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)=onLikeButtonClick(product)><mat-icon>favorite</mat-icon> LIKE</button>
          <button mat-button color="primary" (click)=onShareButtonClick(product)><mat-icon>share</mat-icon> SHARE</button>
          <a mat-button color="primary" routerLink="/"><mat-icon>home</mat-icon> Home</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    ".example-header-image {background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');background-size: cover;}"
  ]
})
export class ProductDetailsComponent implements OnInit { 
  product: Product|undefined
  constructor(private route: ActivatedRoute) { } //,private toastr: ToastrService
  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap
    const productIdFromRoute = Number(routeParams.get(RouteParams.productId))
    // Find the product that correspond with the id provided in route.
    this.product = products.find(product => product.id === productIdFromRoute)
  }
  @Output() share = new EventEmitter<Product>()
  @Output() like = new EventEmitter<Product>()
  onShareButtonClick(p:Product) {
    // this.toastr.success(`${p.name} has been shared`, "My Store")
    this.share.emit(p)
  }
  onLikeButtonClick(p:Product) {
    // this.toastr.success(`${p.name} has been Liked`, "My Store")
    this.like.emit(p)
  }
}
