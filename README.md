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

### Интерфейсы
//массив карточек получаемых с сервера, нужен для отрисовки галереи на главной странице
interface IProductList { 
    total: number; //общее количество продуктов для отрисовки
    items: IProductData[]; //массив продуктов
}

//модальное окно, нужно для отрисовки всех однотипных модальных окон в проекте 
interface IModal {
    getExternal(): HTMLElement; //внешнее окно 
    getInternal(): HTMLElement; //внутренне окно
    getCloseButton(): HTMLElement; //кнопка зактрытия 
    getContent(): HTMLElement; //контет внутри модального окна

    activationModal(content: HTMLElement): void; //открыть модальное окно с контентом 
    disActivationModal(): void; //закрыть открытое на странице модальное окно
}

//данные продукта + функционал
export interface IProductData {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    basket: 'in' | 'out'; //находится ли продукт в корзине
}
export interface IProductAPI {
    pushInfo(selector: string): void; //заполняет данными выбранный селектор
}

//функционал корзины
export interface IBasket {
    addProduct(product: IProductData): void; 
    removeProduct(product: IProductData): void;
    totalPrice(): number; //общая цена
    public pushID(): string[]; //возвращает массив ID товаров лежащих в корзине 
    public cleareBasket(); //очистка корзины
}

//интерфейсы для заказа: данные пользователя, данные заказа + функционал заказа
export interface IUserData {
    payment: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
}
export interface IOrderData {
    orderId: string;
    user: IUserData;
    total: number; //общая цена заказа
    items: string[]; //ID предметов в корзине
}
export interface IOrderAPI {
    setUserInfo(user: IUserData): void;
    getUserInfo(): IUserData;
}

### Классы
//массив товаров 
class ProductList {
    private total: number; //общее количество товаров
    private items: Types.IProductData[]; //массив товаров

    public createGallery(where: string); //создание галереи товаров в выбранном селекторе
}

//модель модального окна
class ModalModel {
    private content: HTMLElement; 

    public getContent(): HTMLElement;
}
//отображение модального окна
class ModalView {
    private external: HTMLElement; //внешний слой (всё окно)
    private internal: HTMLElement; //внутренний слой (куда пойдёт контент)
    private closeButton: HTMLElement; //кнопка закрытия

    public activationModal(content: HTMLElement); //открытие окна с контентом
    public disActivationModal(content: HTMLElement); //закрытие окна с контентом
    public getExternal(): HTMLElement;
    public getInternal(): HTMLElement;
    public getCloseButton(): HTMLElement;
}
//контроллер модального окна (в конструкторе сразу вешаются функции закрытия окна при нажатии на кнопку, оверлей и эскейп)
class ModalController {
    private model: ModalModel;
    private view: ModalView;

    public activationModal(content: HTMLElement); //активация окна с контентом
    public disActivationModal(); //закрытие открытого на данный момент окна
    private escapeCheck(event: KeyboardEvent); //закртие по эскейпу
    private closePopupByOverlay(evt: MouseEvent); //закрытие по оверлею
}

//модель товара 
class Product implements Types.IProductAPI {
    protected data: Types.IProductData;

    public pushInfo(selector: string); //добавляем информацию в выбранный селектор
}
//отображение товара
class ProductView extends Product{
    public createShort(): HTMLElement; //создание полностью функционального отображния товара для корзины
    public createCard(): HTMLElement; //создание полностью функционального отображния товара для галереи на главной странице
    public createModal(): HTMLElement; //создание полностью функционального отображния товара для модального окна
}

//модель корзины
class Basket implements Types.IBasket {
    protected products: Types.IProductData[]; //продукты внутри корзины
    protected counter: number; //количество продуктов

    public getCounter();
    public addProduct(product: Types.IProductData); //добавление продукта
    public removeProduct(product: Types.IProductData); //удаление продукта
    public totalPrice(): number; //общая цена корзины
    public pushID(): string[]; //возвращает массив ID товаров лежащих в корзине 
    public cleareBasket(); //очистка корзины
}
//отображение корзины
class BasketView extends Basket {
    public createBasket(): HTMLElement; //создание полностью функционального отображения корзины
    public changeBasket(): HTMLElement //изменение корзины 
    private basketLogic(cart: HTMLElement); //общая логика в отображении для создания и изменения
}

//модель заказа
class OrderModel implements Types.IOrderAPI {
    protected orderData: Types.IOrderData;

    public setUserInfo(user: Types.IUserData);
    public getUserInfo(): Types.IUserData;
}
//отображение заказа
class OrderView extends OrderModel {
    public createOrder(): HTMLElement; //создание польностью функционального окна заказа (для окна с полем ввода адресса)
    public createContacts(): HTMLElement; //создание польностью функционального окна заказа (для окна с полем ввода телефона и почты)
    private validateInput(input: string, flag: string): boolean; //валидация выбранного инпута с выбранным смыслом инпута
    private toggleButton(condition: boolean, button: HTMLButtonElement); изменение состояния кнопки (активна/не активна)
    private flattenObject(obj: any): Record<string, any>; //объект любой вложенности делает линейным объектом 
}

//отображение финального модального окна 
class SuccessView {
    total: number; //списанная сумма 

    public createSuccess(): HTMLElement; //создание полностью функционального окна успешной покупки 
}

### Общие комментарии
1. На странице созданы шесть объектов (productList, success, basket, mainOrder, modal, api), отвечающие каждый соответственно своему названию. productList, basket, mainOrder, success - олицетворяют единожды используемые объекты, то есть, например, на странице есть одна корзина и всё что происходит происходит ТОЛЬКО с ней. modal - объект переиспользуемый, то есть в новое окно по сути старое но с новым контеном. api - вспомогательный объект для работы с сервером.
2. Методы классов типа createSomething создают полностью рабочий контент для модального окна, то есть всем кнопкам вешаются кликеры, всем инпутам валидаторы и так далее. На входе они получают темплейт из разметки, а возвращают полностью готовый контент для передачи в модальное окно. 
3. Тестоые данные проходящие валидацию 
    Адрес:      143004, Москва, ул. Пушкина, д. 4, стр. 1, кв. 44
    Почта:      example.email@domain.com
    Телефон:    +71234567890

