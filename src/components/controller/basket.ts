import { BasketModel } from '../model/basket';
import { BasketView } from '../view/basket';
import { ProductController } from './product';
import { IProductData } from '../../types';
import * as Events from '../base/events';

export class BasketController {
    private model: BasketModel;
    private view: BasketView;

    constructor(eve: Events.EventEmitter) {
        this.model = new BasketModel();
        this.view = new BasketView();
        eve.on('addProduct', (e) => {
            this.model.addProduct(e as IProductData)
            this.view.getMainBasketCounter().textContent = `${this.model.getCounter()}`;
        })
        eve.on('removeProduct', (e) => {
            this.model.removeProduct(e as IProductData)
            this.view.getMainBasketCounter().textContent = `${this.model.getCounter()}`;
        })
        eve.on('changeData', () => {
            this.view.getBasketProducts().querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`);
            this.view.getBasketTotal().textContent = `${this.model.getTotalPrice()} синапсов`
            this.createBasket(eve);
        })
        eve.on('getBasket', () => {
            return this.model.getData()
        })

        this.view.getMainBasketButton().addEventListener('click', () => {
            eve.emit('activationModal', this.createBasket(eve))
        })
    }

    public getModel() {
        return this.model
    }

    public getView() {
        return this.view
    }

    public createBasket(eve: Events.EventEmitter): HTMLElement {
            while (this.view.getBasketProducts().firstChild) {
                this.view.getBasketProducts().removeChild(this.view.getBasketProducts().firstChild);
            }
            this.model.getProducts().forEach(item => {
                const product = new ProductController(item)
                this.view.getBasketProducts().append(product.createShort(eve))
            })
        return this.changeBasket(eve);
    }

    public changeBasket(eve: Events.EventEmitter): HTMLElement {
        this.view.getBasketTemplate().querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`)
        this.view.getBasketTotal().textContent = `${this.model.getTotalPrice()} синапсов`

        if (this.model.getCounter() === 0) {
            this.view.getBasketButton().disabled = true
        }
        else {
            this.view.getBasketButton().disabled = false
            this.view.getBasketButton().addEventListener('click', () => {
                eve.emit('disActivationModal')
                eve.emit('createOrder', this.model.getData())
            })
        }
        return this.view.getBasketTemplate();
    }
}