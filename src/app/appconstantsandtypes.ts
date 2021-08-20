export enum RouteNames {products = "products", home = "home"}
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
}
