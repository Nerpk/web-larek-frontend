import { BasketModel } from '../model/basket';
import { BasketView } from '../view/basket';
import { IProductData } from '../../types';
import * as Events from '../base/events';

export class BasketController {
    private model: BasketModel;
    private view: BasketView;

    constructor(event: Events.EventEmitter) {
        this.model = new BasketModel();
        this.view = new BasketView();
        event.on('addProduct', (e) => {
            this.model.addProduct(e as IProductData)
            this.view.getMainBasketCounter().textContent = `${this.model.getCounter()}`;
        })
        event.on('removeProduct', (e) => {
            this.model.removeProduct(e as IProductData)
            this.view.getMainBasketCounter().textContent = `${this.model.getCounter()}`;
        })
        event.on('changeData', () => {
            this.view.getBasketProducts().querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`);
            this.view.getBasketTotal().textContent = `${this.model.getTotalPrice()} синапсов`
            this.createBasket(event);
        })
        event.on('getBasket', () => {
            return this.model.getData()
        })
        event.on('disActivationSuccess', () => {
            this.model = new BasketModel;
            this.view = new BasketView;
            this.view.getMainBasketCounter().textContent = '0';
        })

        this.view.getMainBasketButton().addEventListener('click', () => {
            event.emit('activationModal', this.createBasket(event))
        })
    }

    public getModel() {
        return this.model
    }

    public getView() {
        return this.view
    }

    public createBasket(event: Events.EventEmitter): HTMLElement {
        while (this.view.getBasketProducts().firstChild) {
            this.view.getBasketProducts().removeChild(this.view.getBasketProducts().firstChild);
        }
        event.emit('createBasket', {where: this.view.getBasketProducts(), items: this.model.getProducts()})
        return this.changeBasket(event);
    }

    public changeBasket(event: Events.EventEmitter): HTMLElement {
        this.view.getBasketTemplate().querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`)
        this.view.getBasketTotal().textContent = `${this.model.getTotalPrice()} синапсов`

        if (this.model.getCounter() === 0) {
            this.view.getBasketButton().disabled = true
        }
        else {
            this.view.getBasketButton().disabled = false
            this.view.getBasketButton().addEventListener('click', () => {
                event.emit('disActivationModal')
                event.emit('createOrder', this.model.getData())
            })
        }
        return this.view.getBasketTemplate();
    }
}