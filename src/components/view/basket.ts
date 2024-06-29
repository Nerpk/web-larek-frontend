import { IBasketView } from "../../types";
import * as Utils from '../../utils/utils';

export class BasketView implements IBasketView{
    protected mainBasketButton: HTMLElement;
    protected mainBasketCounter: HTMLElement;
    protected basketTemplate: HTMLElement;
    protected basketProducts: HTMLUListElement;
    protected basketTotal: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor () {
        this.basketTemplate = Utils.cloneTemplate<HTMLLIElement>('#basket');
        this.mainBasketCounter = document.querySelector('.header__basket-counter');
        this.mainBasketButton = document.querySelector('.header__basket');
        if (this.basketTemplate.querySelector('.basket__list')) 
            this.basketProducts = this.basketTemplate.querySelector('.basket__list');
        if (this.basketTemplate.querySelector('.basket__button')) 
            this.basketButton = this.basketTemplate.querySelector('.basket__button');
        if (this.basketTemplate.querySelector('.basket__price')) 
            this.basketTotal = this.basketTemplate.querySelector('.basket__price');       
    }

    public getMainBasketButton(): HTMLElement {
        return this.mainBasketButton;
    }

    public getMainBasketCounter(): HTMLElement {
        return this.mainBasketCounter;
    }

    public getBasketTemplate(): HTMLElement {
        return this.basketTemplate;
    }

    public getBasketProducts(): HTMLUListElement {
        return this.basketProducts;
    }

    public getBasketTotal(): HTMLElement {
        return this.basketTotal;
    }

    public getBasketButton(): HTMLButtonElement {
        return this.basketButton;
    }
}