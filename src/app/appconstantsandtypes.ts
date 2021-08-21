export enum RouteNames {products = "products", home = "home", cart = "cart", shipping = "shipping"}
export enum RouteParams {productId = "productId"}
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }
export interface IMyStoreEvents {
  onShareButtonClick(p:Product):void,
  onLikeButtonClick(p:Product):void,
  onNotify(p:Product):void,
  onShoppingCardSubmission(p:Product[]):void
}
export type TShippingPrices = {
  type: string, 
  price: number,
}
