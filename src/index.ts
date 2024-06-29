import './scss/styles.scss';
import * as Types from './types/index';
import * as Api from './components/base/api';
import * as Events from './components/base/events';
import * as Сonstants from './utils/constants';
import * as Utils from './utils/utils';
import { ModalController, ProductController, BasketController, OrderController } from './components/index';

class ProductListView {
    private total: number;
    private items: Types.IProductData[];
  
    constructor(data: Types.IProductList) {
      this.items = data.items;
      this.total = data.total;
    }

    public createGallery(where: string, eve: Events.EventEmitter) {
        const gallery = document.querySelector(where)

        this.items.forEach(item => {
            const product = new ProductController(item)
            gallery.append(product.createCard(eve))
        })
    }
}
class SuccessView {
    total: number;

    constructor(eve: Events.EventEmitter) {
        eve.on('openSuccess', (e) => {
            this.total = (e as {total: number}).total;
            eve.emit('activationModal', this.createSuccess(eve))
        })
    }

    public createSuccess(eve: Events.EventEmitter): HTMLElement {
        const success = Utils.cloneTemplate<HTMLLIElement>('#success');
        success.querySelector('.order-success__description').textContent = `Списано ${this.total} синапсов`
        success.querySelector('.order-success__close').addEventListener('click', () => {
            eve.emit('disactivationModal');
            location.reload();
        })
        return success
    }
}
class helpApi {
    protected api: Api.Api;

    constructor (eve: Events.EventEmitter) {
        this.api = new Api.Api(Сonstants.API_URL);

        eve.on('ApiPOST', (e) => {
            this.api.post('/order', e)
        })
    }

    public get(uri: string) {
        return this.api.get(uri)
    }
}


const eventBus = new Events.EventEmitter();
const api = new helpApi(eventBus);
const modal = new ModalController(eventBus)
const basket = new BasketController(eventBus)
const order = new OrderController(eventBus)
const success = new SuccessView(eventBus)

api.get(`/product/`).then(data => {
    const productList = new ProductListView(data as Types.IProductList) 
    productList.createGallery('.gallery', eventBus)
})

