export interface IBasketView {
    getMainBasketButton(): HTMLElement;
    getMainBasketCounter(): HTMLElement;
    getBasketTemplate(): HTMLElement;
    getBasketProducts(): HTMLUListElement;
    getBasketTotal(): HTMLElement;
    getBasketButton(): HTMLButtonElement;
}
