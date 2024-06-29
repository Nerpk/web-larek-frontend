export interface IUserData {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    user: IUserData;
    items: string[];
    total: number;
}

export interface IOrderModel {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
    items: string[];
    total: number;
    getData(): IOrderData;
    flattenObject(obj: any): Record<string, any>;
}