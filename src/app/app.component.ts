import { Component, OnDestroy, OnInit } from "@angular/core"
import {Subscription} from "rxjs"
import { ToastrService } from "ngx-toastr"
import {ProductDetailsComponent} from "./product-details.component"
import {ProductListComponent} from "./product-list.component"
import {Product,IMyStoreEvents} from "./appconstantsandtypes"
import {MyStoreEventsService} from "./mystore-events.service"

@Component({
  selector: "app-root",
  template: `
    <app-top-bar></app-top-bar>
    <!-- app-product-list></app-product-list -->
    <router-outlet (activate)=subscribeToChildComponent($event) (deactivate)=unsubscribe($event)></router-outlet>
  `,
  styles: []
})
export class AppComponent implements IMyStoreEvents, OnInit, OnDestroy  {
  constructor(private toastr: ToastrService, private myStoreEvents:MyStoreEventsService){}
  onShoppingCardSubmission(p: Product[]): void {
    this.toastr.success(`${p.length} item(s) have been ordered`, "My Store")
  }
  likeSubscription: Subscription | null = null
  shareSubscription: Subscription | null = null
  notifySubscription: Subscription | null = null
  title = "gettingstartedwithangular-mystore"
  subscribeToChildComponent(routedComponent:any) {
    // console.log("AppComponent:subscribeToChildComponent",routedComponent)
    if(routedComponent instanceof ProductDetailsComponent) {
      // console.log("AppComponent:routed component is ProductDetailsComponent",routedComponent)
      routedComponent.myStoreEventHandler = this
      this.likeSubscription = routedComponent.like.subscribe((p:Product) => this.onLikeButtonClick(p))
      this.shareSubscription = routedComponent.share.subscribe((p:Product) => {
        console.log("AppComponent:ProductDetailsComponent event via emitter",p)
        this.onShareButtonClick(p)
      })
    } else if (routedComponent instanceof ProductListComponent) {
      routedComponent.myStoreEventHandler = this
      this.notifySubscription = routedComponent.notify.subscribe((p:Product) => this.onNotify(p))
      this.shareSubscription = routedComponent.share.subscribe((p:Product) => this.onShareButtonClick(p))
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
  unsubscribe(routedComponent:any) {
    this.likeSubscription?.unsubscribe()
    this.likeSubscription = null
    this.shareSubscription?.unsubscribe()
    this.shareSubscription = null
    this.notifySubscription?.unsubscribe()
    this.notifySubscription = null
    if(routedComponent instanceof ProductDetailsComponent || routedComponent instanceof ProductListComponent) {
      routedComponent.myStoreEventHandler = null
    }
  }
  private shareButtonSubscr: Subscription | null = null
  private likeButtonSubscr: Subscription | null = null
  private buyButtonSubscr: Subscription | null = null
  private purchaseButtonSubscr: Subscription | null = null
  ngOnInit(): void {  
    this.shareButtonSubscr = this.myStoreEvents.onShareButtonClick.asObservable().subscribe((p:Product)=>{
      this.toastr.success(`${p.name} shared via Service`, "My Store")
    })
    this.likeButtonSubscr = this.myStoreEvents.onLikeButtonClick.asObservable().subscribe((p:Product)=>{
      this.toastr.success(`${p.name} liked via Service`, "My Store")
    })
    this.buyButtonSubscr = this.myStoreEvents.onBuyButtonClick.asObservable().subscribe((p:Product)=>{
      this.toastr.success(`${p.name} added to cart`, "My Store")
    })
    this.purchaseButtonSubscr = this.myStoreEvents.onShoppingCardSubmission.asObservable().subscribe((p:Product[])=>{
      this.onShoppingCardSubmission(p)
    })
  }
  ngOnDestroy():void {
    this.shareButtonSubscr?.unsubscribe()
    this.likeButtonSubscr?.unsubscribe()
    this.buyButtonSubscr?.unsubscribe()
    this.purchaseButtonSubscr?.unsubscribe()
  }
}
