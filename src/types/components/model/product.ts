export interface IProductData {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out';
}

export interface IProductModel {
    getData(): IProductData;
    getTitle(): string;
    getCategory(): string;
    getImageUrl(): string;
    getPrice(): string;
    getDescription(): string;
    getBasketStatus(): string;
    setBasketStatus(basketStatus: 'in' | 'out'): void;
}