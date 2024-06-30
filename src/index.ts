import './scss/styles.scss';
import * as Types from './types/index';
import * as Events from './components/base/events';
import { ModalController, ProductController, BasketController, OrderController, HelpApi, SuccessView } from './components/index';

const eventBus = new Events.EventEmitter();
const api = new HelpApi(eventBus);
const modal = new ModalController(eventBus)
const basket = new BasketController(eventBus)
const order = new OrderController(eventBus)
const success = new SuccessView(eventBus)

api.get(`/product/`).then(data => {
    eventBus.emit('createGallery', {where: '.gallery', items: (data as Types.IProductList).items})
})

eventBus.on('createGallery', (e) => {
    const gallery = document.querySelector((e as {where: string, items: Types.IProductData[]}).where);

    (e as {where: string, items: Types.IProductData[]}).items.forEach((item: Types.IProductData) => {
        const product = new ProductController(item)
        gallery.append(product.createCard(eventBus))
    })
})

eventBus.on('createBasket', (e) => {
    const gallery = (e as {where: HTMLElement, items: Types.IProductData[]}).where;

    (e as {where: HTMLElement, items: Types.IProductData[]}).items.forEach((item: Types.IProductData) => {
        const product = new ProductController(item)
        gallery.append(product.createShort(eventBus))
    })
})
