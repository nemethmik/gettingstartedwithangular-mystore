export enum RouteNames {products = "products", home = "home"}
export enum RouteParams {productId = "productId"}
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
  }

