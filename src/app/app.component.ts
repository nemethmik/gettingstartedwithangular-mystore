import { Component } from "@angular/core"
import {Subscription} from "rxjs"
import { ToastrService } from "ngx-toastr"
import {ProductDetailsComponent} from "./product-details.component"
import {ProductListComponent} from "./product-list.component"
import {Product} from "./appconstantsandtypes"

@Component({
  selector: "app-root",
  template: `
    <app-top-bar></app-top-bar>
    <!-- app-product-list></app-product-list -->
    <router-outlet (activate)=subscribeToChildComponent($event) (deactivate)=unsubscribe()></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(private toastr: ToastrService){}
  likeSubscription: Subscription | null = null
  shareSubscription: Subscription | null = null
  notifySubscription: Subscription | null = null
  title = "gettingstartedwithangular-mystore"
  subscribeToChildComponent(routedComponent:any) {
    // console.log("AppComponent:subscribeToChildComponent",routedComponent)
    if(routedComponent instanceof ProductDetailsComponent) {
      // console.log("AppComponent:routed component is ProductDetailsComponent",routedComponent)
      this.likeSubscription = (routedComponent as ProductDetailsComponent).like.subscribe((p:Product) => this.onLikeButtonClick(p))
      this.shareSubscription = (routedComponent as ProductDetailsComponent).share.subscribe((p:Product) => this.onShareButtonClick(p))
    } else if (routedComponent instanceof ProductListComponent) {
      this.notifySubscription = (routedComponent as ProductListComponent).notify.subscribe((p:Product) => this.onNotify(p))
      this.shareSubscription = (routedComponent as ProductListComponent).share.subscribe((p:Product) => this.onShareButtonClick(p))
    }
  }
  onShareButtonClick(p:Product) {
    this.toastr.success(`${p.name} has been shared`, "My Store")
  }
  onLikeButtonClick(p:Product) {
    this.toastr.success(`${p.name} has been Liked`, "My Store")
  }
  onNotify(p:Product) {
    //window.alert(`You will be notified when ${p.name} goes on sale`)
    this.toastr.success(`You will be notified when ${p.name} goes on sale`, "My Store")
  }
  unsubscribe() {
    this.likeSubscription?.unsubscribe()
    this.likeSubscription = null
    this.shareSubscription?.unsubscribe()
    this.shareSubscription = null
    this.notifySubscription?.unsubscribe()
    this.notifySubscription = null
  }
}
