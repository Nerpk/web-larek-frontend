import * as Api from '../components/base/api';
import * as Events from '../components/base/events';
import * as Сonstants from '../utils/constants';
import * as Utils from '../utils/utils';
function p(some: any) {console.log(some)}

export interface IUserData {
    id: string;
    username: string;
    email: string;
    phone: string;
  }
export interface IUserAPI {
    substituteAddressAndPayment(address: string, paymentMethod: string): void;
    substituteEmailAndPhone(email: string, phone: string): void;
  }
export interface IOrderData {
    orderId: string;
    products: IProductData[];
    orderDate: Date;
    userId: string;
  }
export interface IOrderAPI {
    createOrder(products: IProductData[], userId: string): IOrderData;
    validateOrderData(): boolean;
  }
export interface ICartData {
    items: IProductData[];
  }
export interface ICartAPI {
    addItemToCart(product: IProductData): void;
    removeItemFromCart(productId: string): void;
    toggleItemInCart(product: IProductData): void;
  }
  
  export interface IProductList {
    total: number;
    items: IProductData[];
}
export class ProductList {
    private total: number;
    private items: IProductData[];
  
    constructor(data: IProductList) {
      this.items = data.items;
      this.total = data.total;
    }

    public createGallery(where: string) {
        const gallery = document.querySelector(where)

        this.items.forEach(item => {
            const product = new Product(item)
            gallery.append(product.createCard())
        })
    }
}


export interface IModal {
    getExternal(): HTMLElement;
    getInternal(): HTMLElement;
    getCloseButton(): HTMLElement;
    getContent(): HTMLElement;

    activationModal(): void;
    disActivationModal(): void;
}
export class Modal implements IModal {
    private external: HTMLElement;
    private internal: HTMLElement;
    private closeButton: HTMLElement;
    private content: HTMLElement;

    constructor(content: HTMLElement) {
        this.external = document.querySelector('#modal-container');
        this.internal = this.external.querySelector('.modal__content');
        this.closeButton = this.external.querySelector('.modal__close');
        this.content = content;

        this.closeButton.addEventListener('click', () => this.disActivationModal())
        document.addEventListener('keydown', (event) => this.escapeCheck(event));
        this.external.addEventListener('click', (evt) => this.closePopupByOverlay(evt));
    }

    public activationModal() {
        this.internal.appendChild(this.content);
        this.external.classList.add('modal_active')
    }
    public disActivationModal() {
        if (this.internal.contains(this.content)) {
            this.internal.removeChild(this.content);
        }
        this.external.classList.remove('modal_active');
    }

    private escapeCheck(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.disActivationModal();
        }
    }
    private closePopupByOverlay(evt: MouseEvent) {
        if (evt.target === this.external) {
            this.disActivationModal();
        }
    }
    public getExternal(): HTMLElement {return this.external;}
    public getInternal(): HTMLElement {return this.internal;}
    public getCloseButton(): HTMLElement {return this.closeButton;}
    public getContent(): HTMLElement {return this.content;}
}

export interface IProductData {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out';
  }

export interface IProductAPI {
    createShort(): HTMLElement
    createCard(templateName: string): HTMLElement;
    createModal(): HTMLElement
}
export class Product implements IProductAPI {
    private data: IProductData;
  
    constructor(data: IProductData) {
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

    public createShort(): HTMLElement {
        const item = this.pushInfo('#card-basket');
        
        const deleteButton = item.querySelector('.basket__item-delete') as HTMLButtonElement;
        deleteButton.onclick = () => {
            basket.removeProduct(this.data)
            deleteButton.closest('.card').remove()
            this.data.basket = 'out'
            basket.createBasket()
            document.querySelector('.basket__list').querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`);
            document.querySelector('.basket__price').textContent = `${basket.totalPrice()} синапсов`
        };
    
        return item;
    }
  
    public createCard(): HTMLElement {
      const card = this.pushInfo('#card-catalog')

      card.addEventListener('click', () => {
        const modal = new Modal(this.createModal());
        modal.activationModal();
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

export class Basket {
    protected products: IProductData[];
    protected counter: number;

    constructor () {
        this.products = [];
        this.counter = 0
    }
    public addProduct(product: IProductData) {
        this.products.push(product)
        this.counter = this.counter+1
        document.querySelector('.header__basket-counter').textContent = `${this.counter}`
    }
    public removeProduct(product: IProductData) {
        this.products = this.products.filter(item => item.id !== product.id)
        this.counter = this.counter-1
        document.querySelector('.header__basket-counter').textContent = `${this.counter}`
    }
    public totalPrice(): number {
        let total = this.products.reduce((sum, product) => sum + product.price, 0)
        return total
    }
}
export class PrintBasket extends Basket {
    constructor() {
        super()
        document.querySelector('.header__basket').addEventListener('click', () => {
            const popup = new Modal(this.createBasket())
            popup.activationModal()
        })
    }

    public createBasket(): HTMLElement {
        const cart = Utils.cloneTemplate<HTMLLIElement>('#basket');
        this.products.forEach(item => {
            const product = new Product(item)
            cart.querySelector('.basket__list').append(product.createShort())
        })
        cart.querySelectorAll('.basket__item-index').forEach((item, index) => item.textContent = `${index+1}`)
        cart.querySelector('.basket__price').textContent = `${this.totalPrice()} синапсов`

        return cart
    }

}
  


const basket = new PrintBasket()