import { IProductView } from "../../types";
import * as Utils from '../../utils/utils';

export class ProductView implements IProductView{
    private cardTemplate: HTMLElement;
    private cardTitle: HTMLElement;
    private cardCategory: HTMLElement;
    private cardImage: HTMLImageElement;
    private cardPrice: HTMLElement;
    private cardDescription: HTMLElement;
    private cardButton: HTMLButtonElement;

    constructor (selector: string) {
        this.cardTemplate = Utils.cloneTemplate<HTMLLIElement>(selector);

        if (this.cardTemplate.querySelector('.card__title')) 
            this.cardTitle = this.cardTemplate.querySelector('.card__title');
        if (this.cardTemplate.querySelector('.card__category')) 
            this.cardCategory = this.cardTemplate.querySelector('.card__category');
        if (this.cardTemplate.querySelector('.card__image')) 
            this.cardImage = (this.cardTemplate.querySelector('.card__image') as HTMLImageElement);
        if (this.cardTemplate.querySelector('.card__price')) 
            this.cardPrice = this.cardTemplate.querySelector('.card__price');
        if (this.cardTemplate.querySelector('.card__text')) 
            this.cardDescription = this.cardTemplate.querySelector('.card__text');
        if (this.cardTemplate.querySelector('.card__button')) 
            this.cardButton = this.cardTemplate.querySelector('.card__button') as HTMLButtonElement;
    }

    public getCardTemplate(): HTMLElement {
        return this.cardTemplate;
    }

    public getCardTitle(): HTMLElement {
        return this.cardTitle;
    }

    public getCardCategory(): HTMLElement {
        return this.cardCategory;
    }

    public getCardImage(): HTMLImageElement {
        return this.cardImage;
    }

    public getCardPrice(): HTMLElement {
        return this.cardPrice;
    }

    public getCardDescription(): HTMLElement {
        return this.cardDescription;
    }

    public getCardButton(): HTMLButtonElement {
        return this.cardButton;
    }
}