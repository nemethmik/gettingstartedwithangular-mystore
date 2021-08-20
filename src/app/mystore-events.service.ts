import { Injectable } from "@angular/core"
import {Subject} from "rxjs"
import { Product } from "./appconstantsandtypes"

@Injectable({
  providedIn: "root"
})
export class MyStoreEventsService {
  onShareButtonClick = new Subject<Product>()
  onLikeButtonClick = new Subject<Product>()
}
