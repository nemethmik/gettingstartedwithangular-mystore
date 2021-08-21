import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button"
import {MatListModule} from "@angular/material/list"
import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import { ToastrModule } from "ngx-toastr"
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { ReactiveFormsModule } from "@angular/forms"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { TopBarComponent } from "./top-bar.component"
import { ProductListComponent } from "./product-list.component"
import { ProductAlertsComponent } from "./product-alerts.component"
import { ProductDetailsComponent } from "./product-details.component"
import {RouteNames,RouteParams} from "./appconstantsandtypes"
import { CartComponent } from "./cart.component"
import { ShippingComponent } from "./shipping.component"

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: RouteNames.cart, component: CartComponent },
      { path: RouteNames.shipping, component: ShippingComponent },
      { path: `${RouteNames.products}/:${RouteParams.productId}`, component: ProductDetailsComponent },
      { path: RouteNames.products, component: ProductListComponent },
      { path: "", redirectTo: `${RouteNames.products}`, pathMatch: "full" },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
