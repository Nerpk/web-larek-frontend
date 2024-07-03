import { IProductData, IBasketModel} from "../../types";

export class BasketModel implements IBasketModel{
    protected products: IProductData[];
    protected counter: number;
    protected total: number;

    constructor() {
        this.products = [];
        this.counter = 0;
        this.total = 0;
    }

    public addProduct(product: IProductData): void {
        this.products.push(product);
        this.counter++;
        this.total += product.price;
    }

    public removeProduct(product: IProductData): void {
        this.products = this.products.filter(pr => pr.id !== product.id);
        this.counter--;
        this.total -= product.price;
    }

    public getTotalPrice(): number {
        return this.total;
    }

    public getProducts(): IProductData[] {
        return this.products;
    }

    public getCounter(): number {
        return this.counter;
    }

    public getProductsID(): string[] {
        return this.products.map(product => product.id);
    }

    public getData(): object {
        return {total: this.total, products: this.getProductsID()}
    }
    public updateBasketModel() {
        this.counter = 0;
        this.total = 0;
        this.products = [];
    }
}