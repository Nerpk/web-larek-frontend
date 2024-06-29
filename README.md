# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация

### Общие комментарии
1. Инутитивно ясно I_NAME_Model - имя интерфейса для модели, I_NAME_View - имя интерфейса для отображения. Функции get_NAME_ - возвращают _NAME_. В документации подробно описаны только не понятные на первый взгляд функции.

2. Классы _NAME_Model и _NAME_View полностью соответсвуют своим интерфейсам, от которых наследуются. Таким образом преобладающее число функций копируют сеттеры и геттеры, в связи с чем в описании классов простейшие функциии вида "дай это поле" не представлены.

3. На странице создано 7 объектов. eventBus - слушатель событий (вспомагательный объект). api - создан для запрос к серверу (вспомагательный объект). modal - модальное окно,  которое открывается с разным контентом. basket - корзина. order - заказ формируем в эту сессию. success - окно успешности (вспомагательный объект). productList - объект для получения данных с сервера и отрисовки на главной странице (вспомагательный объект).

4. Методы классов типа createSomething создают полностью рабочий контент для модального окна, то есть всем кнопкам вешаются кликеры, всем инпутам валидаторы и так далее. 

5. Тестоые данные проходящие валидацию 
    Адрес:      143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44
    Почта:      example.email@domain.com
    Телефон:    +71234567890

6. Используется MVC модель.


### Интерфейсы
//массив карточек с сервера 
export interface IProductList {
    total: number; //количество 
    items: IProductData[]; //данные карточек
}

#### Модели
export interface IModalModel {
    getContent(): HTMLElement
}

export interface IProductData { //данные продукта  
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out'; //попадает ли продукт в корзину или нет 
}

export interface IProductModel { 
    getData(): IProductData;
    getTitle(): string;
    getCategory(): string;
    getImageUrl(): string;
    getPrice(): string;
    getDescription(): string;
    getBasketStatus(): string;
    setBasketStatus(basketStatus: 'in' | 'out'): void;
}

export interface IBasketModel {
    addProduct(product: IProductData): void;
    removeProduct(product: IProductData): void;
    getTotalPrice(): number;
    getProducts(): IProductData[];
    getCounter(): number;
    getProductsID(): string[]; //возвращает массив айди товаров в корзине
    getData(): object; //функция возвращает объект из полей количества объектов и массива их идентификаторов (удобно для пост запроса отправки заказа на сервер)
}

export interface IUserData {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
}

export interface IOrderData {
    user: IUserData;
    items: string[];
    total: number;
}

export interface IOrderModel {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
    items: string[];
    total: number;
    getData(): IOrderData; 
    flattenObject(obj: any): Record<string, any>; //из объекта любой вложенности делает линейный объект
}

#### Отображения
export interface IModalView {
    activationModal(content: HTMLElement): void; //открытие окна с контентом
    disActivationModal(content: HTMLElement): void; //закрытие окна с контентом
    getExternal(): HTMLElement;
    getCloseButton(): HTMLElement;
}

export interface IProductView {
    getCardTemplate(): HTMLElement;
    getCardTitle(): HTMLElement;
    getCardCategory(): HTMLElement;
    getCardImage(): HTMLImageElement;
    getCardPrice(): HTMLElement;
    getCardDescription(): HTMLElement;
    getCardButton(): HTMLButtonElement;
}

export interface IBasketView {
    getMainBasketButton(): HTMLElement;
    getMainBasketCounter(): HTMLElement;
    getBasketTemplate(): HTMLElement;
    getBasketProducts(): HTMLUListElement;
    getBasketTotal(): HTMLElement;
    getBasketButton(): HTMLButtonElement;
}

export interface IOrderView {
    orderTemplateElement: HTMLElement;
    contactsTemplateElement: HTMLElement;
    chooseButtonsElement: HTMLButtonElement[];
    adressInputElement: HTMLFormElement;
    emailInputElement: HTMLFormElement;
    phoneInputElement: HTMLFormElement;
    nextButtonElement: HTMLButtonElement;
    payButtonElement: HTMLButtonElement;

    toggleButton(condition: boolean, button: HTMLButtonElement): void; //переключение состояния выбранной кнопки
    validateInput(input: string, flag: string): boolean; //валидация выбранного инпута по выбранному флагу
}

### Классы
#### Модели
class ProductModel {
    protected data: Types.IProductData; //данные карточки в виде приходящим с сервера

    ...
}
class BasketModel {
    protected products: Types.IProductData[]; //товары в корзине 
    protected counter: number; //счётчик товаров 
    protected total: number; //общая цена корзины

    public addProduct(product: Types.IProductData): void { //добавление товара с изменением цены и счётчика
        this.products.push(product);
        this.counter++;
        this.total += product.price;
    }

    public removeProduct(product: Types.IProductData): void { //удаление товара с изменением цены и счётчика
        this.products = this.products.filter(pr => pr.id !== product.id);
        this.counter--;
        this.total -= product.price;
    }

    public getData(): object { //преобразование к удобному для сервера виду 
        return {total: this.total, products: this.getProductsID()}
    }

    ...
}
class OrderModel {
    protected orderData: Types.IOrderData; //данные о заказе 
    
    public flattenObject(obj: any): Record<string, any> { //превращает список любой вложенности в линейный 
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

#### Отображения
export class ModalView implements IModalView{
    private external: HTMLElement; //внешний слой модального окна
    private internal: HTMLElement; //внутренний слой модального окна
    private closeButton: HTMLElement; //кнопка закрытия модального окна

    public activationModal(content: HTMLElement) { //открытие модального окна
        this.internal.appendChild(content);
        this.external.classList.add('modal_active');
    }

    public disActivationModal(content: HTMLElement) { //закрытие модального окна
        if (this.internal.contains(content)) {
            this.internal.removeChild(content);
        }
        this.external.classList.remove('modal_active');
    }
    ...
}
class ProductView { // поля - содержимое темплейта в хтмл разметке
    private cardTemplate: HTMLElement; 
    private cardTitle: HTMLElement;
    private cardCategory: HTMLElement;
    private cardImage: HTMLImageElement;
    private cardPrice: HTMLElement;
    private cardDescription: HTMLElement;
    private cardButton: HTMLButtonElement;

    ...
}
class BasketView { // поля - содержимое темплейта в хтмл разметке
    protected mainBasketButton: HTMLElement;
    protected mainBasketCounter: HTMLElement;
    protected basketTemplate: HTMLElement;
    protected basketProducts: HTMLUListElement;
    protected basketTotal: HTMLElement;
    protected basketButton: HTMLButtonElement;
    
    ...
}
class OrderView { // поля - содержимое темплейта в хтмл разметке (сразу двух окон, так как по факту это две части одного заказа)
    protected orderTemplate: HTMLElement;
    protected contactsTemplate: HTMLElement;
    protected chooseButtons: HTMLButtonElement[];
    protected adressInput: HTMLFormElement;
    protected emailInput: HTMLFormElement;
    protected phoneInput: HTMLFormElement;
    protected nextButton: HTMLButtonElement;
    protected payButton: HTMLButtonElement;

    public toggleButton(condition: boolean, button: HTMLButtonElement) { //переключение состояния кнопки
        if (condition) {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    }
    public validateInput(input: string, flag: string): boolean { //валидация инпута по флагу
        const regexes: Record<string, RegExp> = {
          'address': /^\d{6},\s[а-яА-ЯёЁ]+,\sул\.\s[а-яА-ЯёЁ]+.*$/,
          'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'phone': /^\+?[1-9]\d{1,14}$/
        };
        return regexes[flag] ? regexes[flag].test(input) : false;
    }
}

#### Контроллеры
export class ModalController {
    private model: ModalModel;
    private view: ModalView;

    constructor(eve: Events.EventEmitter) { // в окнструкторе сразу вешаются закрытие окна по оверлею, кнопке и эскейпу, а также внешние слушатели событий поступающих от подписчиков 
        this.view = new ModalView();

        eve.on('activationModal', (e) => {
            this.activationModal(e as HTMLElement);
        })
        eve.on('disActivationModal', () => {
            this.disActivationModal();
        })

        this.view.getCloseButton().addEventListener('click', () => this.disActivationModal());
        document.addEventListener('keydown', (event) => this.escapeCheck(event));
        this.view.getExternal().addEventListener('click', (evt) => this.closePopupByOverlay(evt));
    }

    public activationModal(content: HTMLElement) { // открытие
        this.model = new ModalModel(content);
        this.view.activationModal(this.model.getContent());
    }

    public disActivationModal() { // закрытие
        this.view.disActivationModal(this.model.getContent());
    }

    private escapeCheck(event: KeyboardEvent) { //закрытие по эскейпу
        if (event.key === 'Escape') {
            event.preventDefault();
            this.disActivationModal();
        }
    }
    private closePopupByOverlay(evt: MouseEvent) { //закрытие по оверлею
        if (evt.target === this.view.getExternal()) {
            this.disActivationModal();
        }
    }
}
class ProductController {
    private model: ProductModel;
    private view: ProductView;
    
    public createCard(eve: Events.EventEmitter): HTMLElement { //создание карточки для главной страницы (с полным функционалом)
        this.view = new ProductView('#card-catalog');
        this.modelToView();
        this.view.getCardTemplate().addEventListener('click', () => {
            eve.emit('activationModal', this.createModal(eve))
        })
        return this.view.getCardTemplate();
    }

    public createShort(eve: Events.EventEmitter): HTMLElement { //создание карточки для корзины (с полным функционалом)
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

    public createModal(eve: Events.EventEmitter): HTMLElement { //создание карточки для попапа (с полным функционалом)
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

    public modelToView() { //соединение модели и отображения
        if (this.view.getCardTitle()) 
            this.view.getCardTitle().textContent = this.model.getTitle();
        if (this.view.getCardCategory()) 
            this.view.getCardCategory().textContent = this.model.getCategory();
        if (this.view.getCardImage()) 
            this.view.getCardImage().src = this.model.getImageUrl();
        if (this.view.getCardPrice()) 
            this.view.getCardPrice().textContent = this.model.getPrice();
        if (this.view.getCardDescription()) 
            this.view.getCardDescription().textContent = this.model.getDescription();
    }
}
class BasketController {
    private model: BasketModel;
    private view: BasketView;

    constructor(eve: Events.EventEmitter) { //подписка на добавление-удаление товара, изменение состояния корзины, взятие корзины заказом, открытие корзины из главной страницы
        this.model = new BasketModel();
        this.view = new BasketView();
        eve.on('addProduct', (e) => {
            this.model.addProduct(e as Types.IProductData)
            this.view.getMainBasketCounter().textContent = `${this.model.getCounter()}`;
        })
        eve.on('removeProduct', (e) => {
            this.model.removeProduct(e as Types.IProductData)
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

    public createBasket(eve: Events.EventEmitter): HTMLElement { //создание страницы корзины (с полным функционалом)
            while (this.view.getBasketProducts().firstChild) {
                this.view.getBasketProducts().removeChild(this.view.getBasketProducts().firstChild);
            }
            this.model.getProducts().forEach(item => {
                const product = new ProductController(item)
                this.view.getBasketProducts().append(product.createShort(eve))
            })
        return this.changeBasket(eve);
    }

    public changeBasket(eve: Events.EventEmitter): HTMLElement { //изменение страницы корзины (с полным функционалом)
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
class OrderController {
    private model: OrderModel;
    private view: OrderView;

    constructor(eve: Events.EventEmitter) { //подписка на создание заказа из корзины
        this.model = new OrderModel;
        this.view = new OrderView;

        eve.on('createOrder', (e) => {
            this.model.getData().total = (e as {total: number, ids: string[]}).total;
            this.model.getData().items = (e as {total: number, ids: string[]}).ids;
            eve.emit('activationModal', this.createOrder(eve))
        })
    }

    public createOrder(eve: Events.EventEmitter): HTMLElement { //создание первого окна заказа (с полной валидацией)
        const flag: {b: boolean; i: boolean;} = {b: false, i: false};
        this.view.chooseButtonsElement.forEach((button) => {
            button.addEventListener('click', () => {
                this.view.chooseButtonsElement.forEach(btn => {btn.style.outline = 'none'; flag.b = false});
                button.style.outline = '2px solid white';
                if (button.textContent === 'Онлайн') {
                    this.model.payment = 'online'
                } else {this.model.payment = 'offline'}
                flag.b = true; this.view.toggleButton((flag.b && flag.i), this.view.nextButtonElement)
            });
        })

        this.view.adressInputElement.addEventListener('input', () => {
            if (this.view.validateInput(this.view.adressInputElement.value, 'address')) {flag.i=true;}
            else {flag.i = false}
            this.view.toggleButton((flag.b && flag.i), this.view.nextButtonElement)
        })

        this.view.nextButtonElement.addEventListener('click', () => {
            this.model.address = this.view.adressInputElement.value
            eve.emit('disActivationModal');
            eve.emit('activationModal', this.createContacts(eve))
        })

        return this.view.orderTemplateElement
    }
    
    public createContacts(eve: Events.EventEmitter): HTMLElement { //создание второго окна заказа (с полной валидацией)
        const flag: {[key: number]: boolean} = {0: false, 1: false};
        [this.view.emailInputElement, this.view.phoneInputElement].forEach((contact: HTMLFormElement, index: number) => {
            contact.addEventListener('input', () => {
                if (this.view.validateInput(contact.value, contact.name)) {flag[index] = true}
                else {flag[index] = false}
                this.view.toggleButton((flag[0]&&flag[1]), this.view.payButtonElement)
            })
        })

        this.view.payButtonElement.addEventListener('click', (event) => {
            event.preventDefault()
            this.model.email = this.view.emailInputElement.value
            this.model.phone = this.view.phoneInputElement.value

            eve.emit('ApiPOST', this.model.flattenObject(this.model.getData())) 
            eve.emit('disActivationModal');
            eve.emit('openSuccess', {total: this.model.getData().total});
        })

        return this.view.contactsTemplateElement
    }
}

#### Прочее
//маленькие классы, которые можно считать вспомогательными 
class ProductListView {
    private total: number;
    private items: Types.IProductData[];
  
    constructor(data: Types.IProductList) {
      this.items = data.items;
      this.total = data.total;
    }

    public createGallery(where: string, eve: Events.EventEmitter) { //отрисовывает галерею на главной странице
        const gallery = document.querySelector(where)

        this.items.forEach(item => {
            const product = new ProductController(item)
            gallery.append(product.createCard(eve))
        })
    }
}
class SuccessView { //отрисовывает окно успешного заказа 
    total: number;

    constructor(eve: Events.EventEmitter) { //подписывается на открытие себя после удачного совершения заказа
        eve.on('openSuccess', (e) => {
            this.total = (e as {total: number}).total;
            eve.emit('activationModal', this.createSuccess(eve))
        })
    }

    public createSuccess(eve: Events.EventEmitter): HTMLElement { //создаёт окно успешного совершения заказа
        const success = Utils.cloneTemplate<HTMLLIElement>('#success');
        success.querySelector('.order-success__description').textContent = `Списано ${this.total} синапсов`
        success.querySelector('.order-success__close').addEventListener('click', () => {
            eve.emit('disactivationModal');
            location.reload();
        })
        return success
    }
}
class helpApi { //вспомагательный класс чтобы не ломать данный изначально 
    protected api: Api.Api;

    constructor (eve: Events.EventEmitter) { //подписан на пост запрос к себе
        this.api = new Api.Api(Сonstants.API_URL);

        eve.on('ApiPOST', (e) => {
            this.api.post('/order', e)
        })
    }

    public get(uri: string) { //оболочка для гет запроса
        return this.api.get(uri)
    }
}

