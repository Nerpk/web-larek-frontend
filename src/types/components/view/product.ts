export interface IProductView {
    getCardTemplate(): HTMLElement;
    getCardTitle(): HTMLElement;
    getCardCategory(): HTMLElement;
    getCardImage(): HTMLImageElement;
    getCardPrice(): HTMLElement;
    getCardDescription(): HTMLElement;
    getCardButton(): HTMLButtonElement;
}
