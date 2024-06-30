# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
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

## Описание проекта
Проект WEB-larek реализует пример типового веб-магазина. Пользователь может добавлять и удалять товары в корзину, делать заказ с набранной корзиной. Проект реализован на TypeScript и представляет собой SPA (Single Page Application) с использованием API для получения данных о товарах и заказах.

Особенности реализации:
- товар можно добавить в корзину в единственном экземпляре
- заказ разделён на два модальных окна (способ оплаты + адрес и почта + телефон)
- после отправки заказа на сервер страница обновляется 

## Описание интерфейса 
Интерфейс можно разделить на 5 процессов:

1. Просмотр подробного описания товара 
2. Просмотр и редактирование корзины 
3. Оформление заказа (2 экрана)
4. Экран успешности заказа 

Так как модальные окна в проекте однотипные, их отображение вынесено в ModalView, удобная работа в класс ModalController. В проекте создан один объект модального окна, в который постепенно поступают данные для отображения, и как только они становятся не актуальны, контент в окне меняется.

## Структура проекта
. 
├── src/ 
│ ├── common.blocks/ [Стили компонент верстки] 
│ ├── components/ [Реализация] 
│ │ ├── base/ [Базовый|вспомогательный код]
│ │ ├── model/ [Модели данных] 
│ │ ├── view/ [Отображения] 
│ │ ├── controller/ [Контроллеры]
│ ├── pages/ 
│ │ ├── index.html [Основная страница и шаблоны компонент] 
│ ├── types/ [Типизация] 
│ │ ├── components/ 
│ │ │ ├── base/ [Базовый код] 
│ │ │ ├── model/ [Модели данных и АПИ] 
│ │ │ ├── view/ [Отображения] 
│ ├── utils/ 
│ │ ├── constants.ts [Настройки проекта] 
│ │ ├── utils.ts [Утилиты для работы с DOM] 
├── api.yml [Спецификация API]

## Архитектура проекта (MVC)
Внутри контроллеров четырёх сущностей создаются модель и отображение. Модель и отображение взаимоддействуют друг с другом только по средвствам контроллера. Таким образом достигается отсутствие зависимости между логикой и оттображением элементов. 

Взаимодействие между контроллерами происходит благодаря классу EventEmmiter, при помощи которого контроллеры подписываются на события инициируемые друг другом. При надобности данных и/или отображения класса А внутри класса Б, класс Б инициирует событие, на которое подписан класс А, внутри которого в свою очередь и выполняется нужный по функционалу код. Таким образом достигается минимальная зависимость контроллеров друг от друга (в отличии от случая, где внутри кода класса А создаётся/передаётся как параметр класс Б).

Взаимодействия в коде можно представить так:
class A {
    constructor() {
        // ... код инициализации
    }

    someFunc(eve: EventEmitter) {
        // Инициирование события с данными о товаре
        eve.emit('addToCart', data);
    }
}

class B {
    constructor(eve: EventEmitter) {
        // Подписка на событие добавления в корзину
        eve.on('addToCart', this.someFunc(data));
    }

    someFunc(data) {
        // ... код функции
    }
}

## Отображения
Отображения разделены по сущностям создаваемым на странице. Типы BasketView, ProductView, OrderView, ModalView не зависят от внешних данных и могут быть переиспользованы в других проектах, также эти классы имеют собственную типизацию. ModalView полностью универсален для модальных окон, что делает его более переносимым в отличии от трёх други классов. 

Далее описание полей и методов классов отображений используемых в проекте:

// Отображение корзины
class BasketView implements IBasketView{
    protected mainBasketButton: HTMLElement; //кнопка открытия корзины на главной странице
    protected mainBasketCounter: HTMLElement; //счётчик элементов в корзине на главной странице
    protected basketTemplate: HTMLElement; //шаблон корзины 
    protected basketProducts: HTMLUListElement; //список элементов находящихся в корзине
    protected basketTotal: HTMLElement; //общая стоимость корзины
    protected basketButton: HTMLButtonElement; //кнопка внутри корзины для перехода далее

    public getMainBasketButton(): HTMLElement 
    public getMainBasketCounter(): HTMLElement 
    public getBasketTemplate(): HTMLElement 
    public getBasketProducts(): HTMLUListElement 
    public getBasketTotal(): HTMLElement 
    public getBasketButton(): HTMLButtonElement       // возвращают соответственно поле написанное после get
}

// Отображение модального окна
class ModalView implements IModalView {
    private external: HTMLElement; // внешний слой окна 
    private internal: HTMLElement; // внутренний слой окна, куда будет поммещён контент
    private closeButton: HTMLElement; // кнопка закрытия окна
    private content: HTMLElement; // контент размещаемый в окне

    public activationModal(content: HTMLElement) // открытие окна с контентом
    public disActivationModal(content: HTMLElement) // закртие окна с контентом

    public getExternal(): HTMLElement 
    public getCloseButton(): HTMLElement 
    public getContent(): HTMLElement                // возвращают соответственно поле написанное после get

    public setContent(content: HTMLElement) // устанавливает контент 
}

// Отображение заказа
export class OrderView implements IOrderView {
    protected orderTemplate: HTMLElement;    // шаблон окна заказа
    protected contactsTemplate: HTMLElement;  // шаблон окна с контактами
    protected chooseButtons: HTMLButtonElement[]; // массив кнопок для выбора способа оплаты
    protected adressInput: HTMLFormElement; // поле ввода адреса 
    protected emailInput: HTMLFormElement; // поле ввода почты 
    protected phoneInput: HTMLFormElement; // поле ввода телефона 
    protected nextButton: HTMLButtonElement; // кнопка перехода от заказа к контактам
    protected payButton: HTMLButtonElement; // кнопка оплаты заказа (завершения)

    get orderTemplateElement(): HTMLElement 
    get contactsTemplateElement(): HTMLElement 
    get chooseButtonsElement(): HTMLButtonElement[] 
    get adressInputElement(): HTMLFormElement 
    get emailInputElement(): HTMLFormElement 
    get phoneInputElement(): HTMLFormElement 
    get nextButtonElement(): HTMLButtonElement 
    get payButtonElement(): HTMLButtonElement            // возвращают соответствующие поля

    public toggleButton(condition: boolean, button: HTMLButtonElement) //переключение состояния кнопки по условию
    public validateInput(input: string, flag: string): boolean //валидация выбранного поля ввода по флагу 
}

// Отображение продукта
export class ProductView implements IProductView{
    private cardTemplate: HTMLElement; //шаблон продукта из разметки
    private cardTitle: HTMLElement; //заголовок
    private cardCategory: HTMLElement; //категория
    private cardImage: HTMLImageElement; //изображение
    private cardPrice: HTMLElement; //цена
    private cardDescription: HTMLElement; //описание
    private cardButton: HTMLButtonElement; //кнопка добавления в корзину

    public getCardTemplate(): HTMLElement 
    public getCardTitle(): HTMLElement 
    public getCardCategory(): HTMLElement 
    public getCardImage(): HTMLImageElement 
    public getCardPrice(): HTMLElement 
    public getCardDescription(): HTMLElement 
    public getCardButton(): HTMLButtonElement    //возвращают соответствующие поля
}




## Модели 
Модели представлены классами BasketModel, ProductModel, OrderModel. Они реализованы на основе данных нужных для сервера, в частности ProductModel, OrderModel, либо на основе данных нужных для логики работы, в частности BasketModel. 
Модели не зависимы друг от друга и используются только внутри контроллеров. 

Далее описание полей и методов классов моделей используемых в проекте:

// Модель корзины
class BasketModel implements IBasketModel{
    protected products: IProductData[]; // продукты находящиеся внутри корзины
    protected counter: number; //количество продуктов
    protected total: number; //общая стоимость корзины

    public addProduct(product: IProductData): void //добавление продукта
    public removeProduct(product: IProductData): void //удаление продукта

    public getTotalPrice(): number 
    public getProducts(): IProductData[] 
    public getCounter(): number                // возвращают соответствующие поля

    public getProductsID(): string[] //возвращает массив id товаров в корзине
    public getData(): object //возвращает данные в виде удобном для сервера 
}

// Модель заказа
class OrderModel implements IOrderModel {
    protected orderData: IOrderData; //данные заказа (данные о ползователе (телефон, почта, адрес, способ оплаты), массив id товаров, общая цена, id заказа)

    get payment(): 'online' | 'offline'
    set payment(value: 'online' | 'offline')
    get address(): string 
    set address(value: string)
    get email(): string 
    set email(value: string) 
    get phone(): string 
    set phone(value: string) 
    get items(): string[]
    set items(items: string[]) 
    get total(): number 
    set total(value: number)      // установка|возврат соответствующих полей

    public getData(): IOrderData //возвращает все данные заказа целиком
    public flattenObject(obj: any): Record<string, any>  //из объекта любой вложенности создаёт линейный объект
}

// Модель товара
export class ProductModel implements IProductModel {
    protected data: IProductData; //данные о товаре (заголовок, категория, изображение, цена, описание, статус товара относительно корзины)
  
    public getData(): IProductData
    public getTitle(): string 
    public getCategory(): string 
    public getImageUrl(): string 
    public getPrice(): string 
    public getDescription(): string 
    public getBasketStatus(): string   //возвращают соответствующие поля

    public setBasketStatus(basketStatus: 'in' | 'out'): void //устанавливает статус товара относительно корзины
}

## Контроллеры
Контроллеры в проекте представлены классами _Name_Controller. Они создают внутри себя модель и отображение объекта, а также занимаются их взаимодействием. Взаимодействие между контроллерами представленно в виде подписки на событие друг друга, по средствам класса EventEmmiter. В контроллерах происходит обработка событий и принятие решений, а также обновление данных в моделях.

Далее описание полей и методов классов контроллеров используемых в проекте:

// Контроллер корзины
class BasketController {
    private model: BasketModel; //модель
    private view: BasketView; //отображение

    public getModel() 
    public getView()         //возвращают соответствующие поля

    public createBasket(event: Events.EventEmitter): HTMLElement //отрисовка корзины с учётом полученных данных

    public changeBasket(event: Events.EventEmitter): HTMLElement //изменения корзины (отрисовка корректных номеров товаров в списке, изменение состояния кнопки)
}

// Контроллер модального окна
class ModalController {
    private view: ModalView; //отображенеи

    public activationModal(content: HTMLElement) // открытие окна с контентом
    public disActivationModal() //закрытие окна открытого на данный момент

    private escapeCheck(event: KeyboardEvent) //закрытие по эскейпу
    private closePopupByOverlay(evt: MouseEvent) //закрытие по оверлею
}

// Контроллер заказа
class OrderController {
    private model: OrderModel; //модель
    private view: OrderView; //отображение

    public createOrder(event: Events.EventEmitter): HTMLElement // отрисовка окна заказа с достоверной информацией и функционалом (валидация кнопок и инпута, изменение состояния кнопки далее по валидации)
    
    public createContacts(event: Events.EventEmitter): HTMLElement // отрисовка окна контактов с достоверной информацией и функционалом (валидация инпутов, изменение состояния кнопки оплаты по валидации)
}

// Контроллер продукта
export class ProductController {
    private model: ProductModel; //модель
    private view: ProductView; //отображение

    public createCard(event: Events.EventEmitter): HTMLElement // отрисовка товара для главной страницы с достоверной информацией и функционалом (при нажатии на товар открывается модальное окно)

    public createShort(event: Events.EventEmitter): HTMLElement // отрисовка товара для корзины с достоверной информацией и функционалом (работает кнопка удаления товара из корзины)

    public createModal(event: Events.EventEmitter): HTMLElement // отрисовка товара для модального окна с достоверной информацией и функционалом (работает кнопка добавления|удаления товара в корзину)

    public modelToView() // отрисовка данных из модели в блоках из отображения
}

Таким образом взаимодействие происходит только между контроллерами, а соединения отображения и модели происходят внутри контроллера, что и соответствует MVC-модели.

## Прочее
В папке src/base представлены вспомогательные классы используемые в проекте. Api и EventEmmiter даны изначально и представляют работу с сервером и брокер событий соответственно. В файле helpApi.ts представлен класс HelpApi представляющий из себя переходник между базовым классом ддля работы с сервером и нуждами проекта. В файле success.ts представлен класс SuccessView используемый для отрисовки окна успешного совершения заказа. 

Далее описание полей и методов вспомогательных классов используемых в проекте:

class HelpApi {
    protected api: Api.Api; //исходный базовый класс

    public get(uri: string) //удобный для проекта запрос
}

export class SuccessView {
    total: number; // общая цена заказа отпраленного на сервер

    public createSuccess(eve: Events.EventEmitter): HTMLElement //отрисовка окна успешного совершения заказа с достоверными данными и функционалом (работает кнопка к новым покупкам)
}