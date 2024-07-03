import { IOrderModel, IOrderData, IUserData } from "../../types";

export class OrderModel implements IOrderModel {
    protected orderData: IOrderData;

    constructor() {
        this.orderData = {} as IOrderData;
        this.orderData.user = {} as IUserData;
    }

    get payment(): 'online' | 'offline' {
        return this.orderData.user.payment;
    }
    set payment(value: 'online' | 'offline') {
        this.orderData.user.payment = value;
    }
    get address(): string {
        return this.orderData.user.address;
    }
    set address(value: string) {
        this.orderData.user.address = value;
    }
    get email(): string {
        return this.orderData.user.email;
    }
    set email(value: string) {
        this.orderData.user.email = value;
    }
    get phone(): string {
        return this.orderData.user.phone;
    }
    set phone(value: string) {
        this.orderData.user.phone = value;
    }
    get items(): string[]{
        return this.items
    }
    set items(items: string[]) {
        this.orderData.items = items;
    }
    get total(): number {
        return this.total;
    }
    set total(value: number) {
        this.total = value
    }

    public getData(): IOrderData{
        return this.orderData
    }
    public updateOrderModel() {
        this.orderData = {} as IOrderData;
        this.orderData.user = {} as IUserData;
    }
    public flattenObject(obj: any): Record<string, any> {
        return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
          if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            const flatObject = this.flattenObject(obj[k]);
            for (const [innerKey, value] of Object.entries(flatObject)) {
              acc[innerKey] = value;
            }
          } else {
            acc[k] = obj[k];
          }
          return acc;
        }, {});
    }  
}