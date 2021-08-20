import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-top-bar",
  template: `
    <mat-toolbar color="primary">
      <!--button mat-icon-button aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button-->
      <span>My Store</span>
      <span style="flex: 1 1 auto;"  ></span> <!-- style="flex: 1 1 auto;" class="filler" -->
      <!--button mat-icon-button aria-label="Example icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
      </button-->
      <button mat-button aria-label="Checkout button with shopping cart icon">
        <mat-icon>shopping_cart</mat-icon> Checkout
      </button>
    </mat-toolbar>
  `,
  styles: [
    ".filler{flex: 1 1 auto;}"
  ]
})
export class TopBarComponent { //implements OnInit { ngOnInit(): void {}
  constructor() { }  
}
