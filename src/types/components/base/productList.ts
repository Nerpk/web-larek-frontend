import { IProductData } from "../model/product";

export interface IProductList {
    total: number;
    items: IProductData[];
}