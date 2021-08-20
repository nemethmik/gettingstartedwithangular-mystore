import { Component, OnInit } from "@angular/core"
import { ToastrService } from "ngx-toastr"
import { products } from "./products"
import {Product,RouteNames} from "./appconstantsandtypes"

/*
    <div style="padding: 0 16px;"> <!-- display: flex;flex-direction: row; -->
      <h2>Products</h2>
      <div *ngFor="let p of products">
        <a title="Title {{p.name}} details"><h3>{{ p.name }}</h3></a> <!-- [title]="p.name + ' details'" -->
        <p *ngIf=p.description>Description: {{ p.description }}</p>
        <button (click)=share(p)>Share</button>
        <app-product-alerts [product]=p (notify)=onNotify($event)></app-product-alerts>
      </div>
    </div>
*/
@Component({
  selector: "app-product-list",
  template: `
    <h2 style="padding: 0 16px;">Products</h2>
    <mat-nav-list>
      <mat-list-item *ngFor="let p of products">
        <a matLine title="Title {{p.name}} details" [routerLink]="[routeName, p.id]" >{{ p.name }}</a>
        <p matLine *ngIf=p.description>Description: {{ p.description }}</p>
        <button mat-button color="primary" (click)="share(p)"><mat-icon>share</mat-icon> Share</button>
        <app-product-alerts [product]=p (notify)=onNotify($event)></app-product-alerts>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
  ]
})
export class ProductListComponent { //implements OnInit { ngOnInit(): void {  }
  routeName = "/" + RouteNames.products
  products = products // This looks weird but TS knows how to interpret it: it creates a member variable and links it to the imported products object 
  constructor(private toastr: ToastrService) { }
  share(p:Product) {
    //window.alert(`${p.name} has been shared`)
    this.toastr.success(`${p.name} has been shared`, "My Store")
  }
  onNotify(p:Product) {
    //window.alert(`You will be notified when ${p.name} goes on sale`)
    this.toastr.success(`You will be notified when ${p.name} goes on sale`, "My Store")
  }
}
