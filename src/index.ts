import './scss/styles.scss';
import * as Types from './types/index';
import * as Api from './components/base/api';
import * as Events from './components/base/events';
import * as Сonstants from './utils/constants';
import * as Utils from './utils/utils';
function p(some: any) {console.log(some)}

class ProductList {
    private total: number;
    private items: Types.IProductData[];
  
    constructor(data: Types.IProductList) {
      this.items = data.items;
      this.total = data.total;
    }

    public createGallery(where: string) {
        const gallery = document.querySelector(where)

        this.items.forEach(item => {
            const product = new ProductView(item)
            gallery.append(product.createCard())
        })
    }
}


class ModalModel {
    private content: HTMLElement;

    constructor(content: HTMLElement) {
        this.content = content;
    }

    public getContent(): HTMLElement {
        return this.content;
    }
}
class ModalView {
    private external: HTMLElement;
    private internal: HTMLElement;
    private closeButton: HTMLElement;

    constructor() {
        this.external = document.querySelector('#modal-container');
        this.internal = this.external.querySelector('.modal__content');
        this.closeButton = this.external.querySelector('.modal__close');
    }

    public activationModal(content: HTMLElement) {
        this.internal.appendChild(content);
        this.external.classList.add('modal_active');
    }

    public disActivationModal(content: HTMLElement) {
        if (this.internal.contains(content)) {
            this.internal.removeChild(content);
        }
        this.external.classList.remove('modal_active');
    }

    public getExternal(): HTMLElement {
        return this.external;
    }
    public getInternal(): HTMLElement {
        return this.internal;
    }
    public getCloseButton(): HTMLElement {
        return this.closeButton;
    }
}
class ModalController {
    private model: ModalModel;
    private view: ModalView;

    constructor() {
        this.view = new ModalView();

        this.view.getCloseButton().addEventListener('click', () => this.disActivationModal());
        document.addEventListener('keydown', (event) => this.escapeCheck(event));
        this.view.getExternal().addEventListener('click', (evt) => this.closePopupByOverlay(evt));
    }

    public activationModal(content: HTMLElement) {
        this.model = new ModalModel(content);
        this.view.activationModal(this.model.getContent());
    }

    public disActivationModal() {
        this.view.disActivationModal(this.model.getContent());
    }

    private escapeCheck(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.disActivationModal();
        }
    }
    private closePopupByOverlay(evt: MouseEvent) {
        if (evt.target === this.view.getExternal()) {
            this.disActivationModal();
        }
    }
}


class Product implements Types.IProductAPI {
    protected data: Types.IProductData;
  
    constructor(data: Types.IProductData) {
      this.data = data;
    }

    public pushInfo(selector: string) {
        const product = Utils.cloneTemplate<HTMLLIElement>(selector);

        if (product.querySelector('.card__title')) 
            product.querySelector('.card__title').textContent = this.data.title;
        if (product.querySelector('.card__category')) 
            product.querySelector('.card__category').textContent = this.data.category;
        if (product.querySelector('.card__image')) 
            (product.querySelector('.card__image') as HTMLImageElement).src = `${Сonstants.CDN_URL}${this.data.image}`;
        if (product.querySelector('.card__price')) 
            product.querySelector('.card__price').textContent = `${this.data.price ?? 0} синапсов`;
        if (product.querySelector('.card__text')) 
            product.querySelector('.card__text').textContent = this.data.description;

        return product
    }
}
class ProductView extends Product{
    public createShort(): HTMLElement {
        const item = this.pushInfo('#card-basket');
        
        const deleteButton = item.querySelector('.basket__item-delete') as HTMLButtonElement;
        deleteButton.onclick = () => {
            basket.removeProduct(this.data)
            deleteButton.closest('.card').remove()
            this.data.basket = 'out'
            basket.changeBasket()
            document.querySelector('.basket__list').querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`);
            document.querySelector('.basket__price').textContent = `${basket.totalPrice()} синапсов`
        };
    
        return item;
    }
  
    public createCard(): HTMLElement {
      const card = this.pushInfo('#card-catalog')

      card.addEventListener('click', () => {
        modal.activationModal(this.createModal());
      });
  
      return card;
    }
      
    public createModal(): HTMLElement {
        const card = this.pushInfo('#card-preview')
    
        const basketButton = card.querySelector('.card__button') as HTMLButtonElement;
        basketButton.textContent = this.data.basket === 'in' ? 'Убрать из корзины' : 'В корзину';
        basketButton.onclick = () => {
            this.data.basket = this.data.basket === 'in' ? 'out' : 'in';
            basketButton.textContent = this.data.basket === 'in' ? 'Убрать из корзины' : 'В корзину';
            if (this.data.basket === 'in') {basket.addProduct(this.data);} 
            else {basket.removeProduct(this.data);}
        };
    
        return card;
    }
}


class Basket implements Types.IBasket {
    protected products: Types.IProductData[];
    protected counter: number;

    constructor () {
        this.products = [];
        this.counter = 0
    }
    public getCounter() {
        return this.counter
    }
    public addProduct(product: Types.IProductData) {
        this.products.push(product)
        this.counter = this.counter+1
        document.querySelector('.header__basket-counter').textContent = `${this.counter}`
    }
    public removeProduct(product: Types.IProductData) {
        this.products = this.products.filter(item => item.id !== product.id)
        this.counter = this.counter-1
        document.querySelector('.header__basket-counter').textContent = `${this.counter}`
    }
    public totalPrice(): number {
        let total = this.products.reduce((sum, product) => sum + product.price, 0)
        return total
    }
    public pushID(): string[] {
        return this.products.map(product => product.id);
    }
    public cleareBasket() {
        this.counter = 0;
        this.products.forEach(product => {
            this.removeProduct(product)
            
            //p(this.counter)
        })
    }
}
class BasketView extends Basket {
    constructor() {
        super()
        document.querySelector('.header__basket').addEventListener('click', () => {
            modal.activationModal(this.createBasket())
        })
    }

    public createBasket(): HTMLElement {
        const cart = Utils.cloneTemplate<HTMLLIElement>('#basket');
        this.products.forEach(item => {
            const product = new ProductView(item)
            cart.querySelector('.basket__list').append(product.createShort())
        })
        return this.basketLogic(cart)
    }

    public changeBasket(): HTMLElement {
        const cart = document.querySelector('.basket') as HTMLElement;
        return this.basketLogic(cart)
    }

    private basketLogic(cart: HTMLElement) {
        cart.querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`)
        cart.querySelector('.basket__price').textContent = `${this.totalPrice()} синапсов`

        if (this.products.length === 0) {
            (cart.querySelector('.basket__button') as HTMLButtonElement).disabled = true
        }
        else {
            (cart.querySelector('.basket__button') as HTMLButtonElement).disabled = false
            cart.querySelector('.basket__button').addEventListener('click', () => {
                modal.disActivationModal()
                modal.activationModal(mainOrder.createOrder())
            })
        }
        return cart
    }
}


class OrderModel implements Types.IOrderAPI {
    protected orderData: Types.IOrderData;

    constructor (basket: Basket) {
        this.orderData = {} as Types.IOrderData
        this.orderData.user = {} as Types.IUserData
    }

    public setUserInfo(user: Types.IUserData) {
        this.orderData.user = user;
    }

    public getUserInfo(): Types.IUserData {
        return this.orderData.user
    }
}
class OrderView extends OrderModel {

    public createOrder(): HTMLElement {
        const order = Utils.cloneTemplate<HTMLLIElement>('#order');

        this.orderData.total = basket.totalPrice();
        this.orderData.items = basket.pushID();

        const nextButton = order.querySelector('.order__button') as HTMLButtonElement

        const buttons = order.querySelectorAll('.button_alt');
        const flag: {b: boolean; i: boolean;} = {b: false, i: false};
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => {(btn as HTMLElement).style.outline = 'none'; flag.b = false});
                (button as HTMLElement).style.outline = '2px solid white';
                if (button.textContent === 'Онлайн') {
                    this.orderData.user.payment = 'online'
                } else {this.orderData.user.payment = 'offline'}
                flag.b = true; this.toggleButton((flag.b && flag.i), nextButton)
            });
        })

        const address = order.querySelector('.form__input');
        //(address as HTMLFormElement).value = '143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44'
        address.addEventListener('input', () => {
            if (this.validateInput((address as HTMLFormElement).value, 'address')) {flag.i=true;}
            else {flag.i = false}
            this.toggleButton((flag.b && flag.i), nextButton)
        })

        nextButton.addEventListener('click', () => {
            this.orderData.user.address = (address as HTMLFormElement).value
            modal.disActivationModal();
            modal.activationModal(this.createContacts());
        })

        return order
    }

    public createContacts(): HTMLElement {
        const order = Utils.cloneTemplate<HTMLLIElement>('#contacts');

        const flag: {[key: number]: boolean} = {0: false, 1: false};
        const contacts = order.querySelectorAll('.form__input')
        contacts.forEach((contact, index: number) => {
            contact.addEventListener('input', () => {
                if (this.validateInput((contact as HTMLFormElement).value, (contact as HTMLFormElement).name)) {flag[index] = true}
                else {flag[index] = false}
                this.toggleButton((flag[0]&&flag[1]), (order.querySelector('.button') as HTMLButtonElement))
            })
        })

        order.querySelector('.button').addEventListener('click', (event) => {
            event.preventDefault()
            this.orderData.user.email = (contacts[0] as HTMLFormElement).value
            this.orderData.user.phone = (contacts[1] as HTMLFormElement).value

            api.post('/order', this.flattenObject(this.orderData))

            modal.disActivationModal();
            modal.activationModal(success.createSuccess())
        })

        return order
    }

    private validateInput(input: string, flag: string): boolean {
        const regexes: Record<string, RegExp> = {
          'address': /^\d{6},\s[а-яА-ЯёЁ]+,\sул\.\s[а-яА-ЯёЁ]+.*$/,
          'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'phone': /^\+?[1-9]\d{1,14}$/
        };
        return regexes[flag] ? regexes[flag].test(input) : false;
    }
    
    private toggleButton(condition: boolean, button: HTMLButtonElement) {
        if (condition) {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    }

    private flattenObject(obj: any): Record<string, any> {
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


class SuccessView {
    total: number;

    constructor() {
        this.total = 0;
    }

    public createSuccess(): HTMLElement {
        const success = Utils.cloneTemplate<HTMLLIElement>('#success');
        this.total = basket.totalPrice();
        success.querySelector('.order-success__description').textContent = `Списано ${this.total} синапсов`
        success.querySelector('.order-success__close').addEventListener('click', () => {
            modal.disActivationModal();
            location.reload();
        })
        return success
    }
}

const success = new SuccessView()
const basket = new BasketView()
const mainOrder = new OrderView(basket)
const modal = new ModalController()
const api = new Api.Api(Сonstants.API_URL);

api.get(`/product/`).then(data => {
    const productList = new ProductList(data as Types.IProductList) 
    productList.createGallery('.gallery')
})

