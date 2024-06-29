import { ProductModel } from '../model/product';
import { ProductView } from '../view/product';
import { IProductData } from '../../types';
import * as Events from '../base/events';
import * as Сonstants from '../../utils/constants';

export class ProductController {
    private model: ProductModel;
    private view: ProductView;
  
    constructor(data: IProductData) {
      this.model = new ProductModel(data);
    }
  
    public createCard(eve: Events.EventEmitter): HTMLElement {
        this.view = new ProductView('#card-catalog');
        this.modelToView();
        this.view.getCardTemplate().addEventListener('click', () => {
            eve.emit('activationModal', this.createModal(eve))
        })
        return this.view.getCardTemplate();
    }

    public createShort(eve: Events.EventEmitter): HTMLElement {
        this.view = new ProductView('#card-basket');
        this.modelToView();

        this.view.getCardButton().addEventListener('click', () => {
            eve.emit('removeProduct', this.model.getData())
            eve.emit('changeData')
            this.view.getCardButton().closest('.card').remove()
            this.model.setBasketStatus('out');
        })

        return this.view.getCardTemplate();
    }

    public createModal(eve: Events.EventEmitter): HTMLElement {
        this.view = new ProductView('#card-preview');
        this.modelToView();

        this.view.getCardButton().textContent = this.model.getBasketStatus() === 'in' ? 'Убрать из корзины' : 'В корзину';
        this.view.getCardButton().addEventListener('click', () => {
            this.model.setBasketStatus(this.model.getBasketStatus() === 'in' ? 'out' : 'in');
            this.view.getCardButton().textContent = this.model.getBasketStatus() === 'in' ? 'Убрать из корзины' : 'В корзину';
            if (this.model.getBasketStatus() === 'in') {eve.emit('addProduct', this.model.getData())} 
            else {eve.emit('removeProduct', this.model.getData())}
        })

        return this.view.getCardTemplate();
    }

    public modelToView() {
        if (this.view.getCardTitle()) 
            this.view.getCardTitle().textContent = this.model.getTitle();
        if (this.view.getCardCategory()) 
            this.view.getCardCategory().textContent = this.model.getCategory();
        if (this.view.getCardImage()) 
            this.view.getCardImage().src = `${Сonstants.CDN_URL}${this.model.getImageUrl()}`;
        if (this.view.getCardPrice()) 
            this.view.getCardPrice().textContent = this.model.getPrice();
        if (this.view.getCardDescription()) 
            this.view.getCardDescription().textContent = this.model.getDescription();
    }
}