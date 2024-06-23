import * as Api from '../components/base/api';
import * as Events from '../components/base/events';
import * as Сonstants from '../utils/constants';
import * as Utils from '../utils/utils';
function p(some: any) {console.log(some)}

export interface IProductData {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out';
  }
export interface IProductList {
    total: number;
    items: IProductData[];
}
export interface IProductAPI {
    createShort(): HTMLElement
    createCard(templateName: string): HTMLElement;
    createModal(): HTMLElement
}
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


export class Product implements IProductAPI {
    private data: IProductData;
  
    constructor(data: IProductData) {
      this.data = data;
      this.data.basket = "out"
    }

    public createShort(): HTMLElement {
        const item = Utils.cloneTemplate<HTMLLIElement>('#card-basket');

        item.querySelector('.card__title').textContent = this.data.title;
        item.querySelector('.card__price').textContent = `${this.data.price ?? 0} синапсов`;
    
        // Добавляем обработчик клика для кнопки удаления из корзины
        const deleteButton = item.querySelector('.basket__item-delete') as HTMLButtonElement;
        deleteButton.onclick = () => {
          // Здесь должна быть логика для удаления товара из корзины
        };
    
        return item;
    }
  
    public createCard(): HTMLElement {
      const card = Utils.cloneTemplate<HTMLDivElement>('#card-catalog');

      card.querySelector('.card__title').textContent = this.data.title;
      card.querySelector('.card__category').textContent = this.data.category;
      (card.querySelector('.card__image') as HTMLImageElement).src = `${Сonstants.CDN_URL}${this.data.image}`;
      card.querySelector('.card__price').textContent = `${this.data.price ?? 0} синапсов`;

      card.addEventListener('click', () => {
        const modal = new Modal(this.createModal());
        modal.activationModal();
      });
  
      return card;
    }
      
    public createModal(): HTMLElement {
        const card = Utils.cloneTemplate<HTMLDivElement>('#card-preview');

        card.querySelector('.card__title').textContent = this.data.title;
        card.querySelector('.card__category').textContent = this.data.category;
        (card.querySelector('.card__image') as HTMLImageElement).src = `${Сonstants.CDN_URL}${this.data.image}`;
        card.querySelector('.card__price').textContent = `${this.data.price ?? 0} синапсов`;
        card.querySelector('.card__text').textContent = this.data.description;
    
        const basketButton = card.querySelector('.card__button') as HTMLButtonElement;
        basketButton.textContent = this.data.basket === 'in' ? 'Убрать из корзины' : 'В корзину';
        basketButton.onclick = () => {
            this.data.basket = this.data.basket === 'in' ? 'out' : 'in';
            basketButton.textContent = this.data.basket === 'in' ? 'Убрать из корзины' : 'В корзину';

            // Здесь должна быть логика для добавления или удаления товара из корзины
        };
    
        return card;
    }
}
    
export class ProductList implements IProductList {
    total: number;
    items: IProductData[];
  
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

export class Basket {
    products: IProductData[];

    constructor () {
        this.products = [];
    }

    public addProduct(product: IProductData) {
        this.products.push(product)
    }

    public removeProduct(product: IProductData) {
        this.products.filter(item => item !== product)
    }

    public totalPrice(): number {
        let total = this.products.reduce((sum, product) => sum + product.price, 0)
        return total
    }

    public totalCounter(): number {
        return this.products.length
    }
}
  
