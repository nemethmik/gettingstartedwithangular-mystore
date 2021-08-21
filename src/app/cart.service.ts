import { Injectable } from "@angular/core"
import {Product,TShippingPrices} from "./appconstantsandtypes"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
@Injectable({
  providedIn: "root"
})
export class CartService {
  items: Product[] = []
  constructor(private http: HttpClient) { }
  addToCart(product: Product):void {
    this.items.push(product)
  }
  getItems():Product[] {
    return this.items
  }
  clearCart():Product[] {
    this.items = []
    return this.items
  }
  getShippingPrices():Observable<TShippingPrices[]> {
    return this.http.get<TShippingPrices[]>("/assets/shipping.json")
  }
}
