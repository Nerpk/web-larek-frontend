import { IProductData, IProductModel } from "../../types";
import * as Сonstants from '../../utils/constants';

export class ProductModel implements IProductModel {
    protected data: IProductData;
  
    constructor(data: IProductData) {
      this.data = data;
      this.data.image = `${Сonstants.CDN_URL}${data.image}`;
    }

    public getData(): IProductData {
        return this.data
    }

    public getTitle(): string {
      return this.data.title;
    }
  
    public getCategory(): string {
      return this.data.category;
    }
  
    public getImageUrl(): string {
      return this.data.image;
    }
  
    public getPrice(): string {
      return `${this.data.price ?? 0} синапсов`;
    }
  
    public getDescription(): string {
      return this.data.description;
    }
  
    public getBasketStatus(): string {
      return this.data.basket;
    }

    public setBasketStatus(basketStatus: 'in' | 'out'): void {
        this.data.basket = basketStatus;
    }
}