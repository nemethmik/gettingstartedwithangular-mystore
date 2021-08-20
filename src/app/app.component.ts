import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <app-top-bar></app-top-bar>
    <!-- app-product-list></app-product-list -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "gettingstartedwithangular-mystore"
}
