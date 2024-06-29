import { IProductData } from './product';

export interface IBasketModel {
    addProduct(product: IProductData): void;
    removeProduct(product: IProductData): void;
    getTotalPrice(): number;
    getProducts(): IProductData[];
    getCounter(): number;
    getProductsID(): string[];
    getData(): object;
}