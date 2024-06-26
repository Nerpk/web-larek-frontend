export interface IProductList {
    total: number;
    items: IProductData[];
}

export interface IModal {
    getExternal(): HTMLElement;
    getInternal(): HTMLElement;
    getCloseButton(): HTMLElement;
    getContent(): HTMLElement;

    activationModal(): void;
    disActivationModal(): void;
}

export interface IProductData {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out';
}
export interface IProductAPI {
    pushInfo(selector: string): void;
}

export interface IBasket {
    addProduct(product: IProductData): void;
    removeProduct(product: IProductData): void;
    totalPrice(): number;
}

export interface IUserData {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
}
export interface IOrderData {
    orderId: string;
    user: IUserData;
    total: number;
    items: string[];
}
export interface IOrderAPI {
    setUserInfo(user: IUserData): void;
    getUserInfo(): IUserData;
}