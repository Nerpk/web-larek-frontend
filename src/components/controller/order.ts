import { OrderModel } from '../model/order';
import { OrderView } from '../view/order';
import * as Events from '../base/events';

export class OrderController {
    private model: OrderModel;
    private view: OrderView;

    constructor(event: Events.EventEmitter) {
        this.model = new OrderModel;
        this.view = new OrderView;

        event.on('createOrder', (e) => {
            this.model.getData().total = (e as {total: number, products: string[]}).total;
            this.model.getData().items = (e as {total: number, products: string[]}).products;
            event.emit('activationModal', this.createOrder(event))
        })
        event.on('updateOrder', () => {
            this.model.updateOrderModel();
            this.view.updateOrderView();
        })

        this.view.nextButtonElement.addEventListener('click', () => {
            event.emit('disActivationModal');
            event.emit('activationModal', this.createContacts(event))
        })
        this.view.payButtonElement.addEventListener('click', (e) => {
            e.preventDefault()
            event.emit('ApiPOST', this.model.flattenObject(this.model.getData()))
        })

    }

    public createOrder(event: Events.EventEmitter): HTMLElement {
        // this.view.adressInputElement.value = '134532, ствыл, ул. счы'
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
            if (this.view.validateInput(this.view.adressInputElement.value, 'address')) {
                flag.i=true;
                this.model.address = this.view.adressInputElement.value
            }
            else {flag.i = false}
            this.view.toggleButton((flag.b && flag.i), this.view.nextButtonElement)
        })

        return this.view.orderTemplateElement
    }
    
    public createContacts(event: Events.EventEmitter): HTMLElement {
        const flag: {[key: number]: boolean} = {0: false, 1: false};
        // this.view.emailInputElement.value = 'ncdk@nckds.cnk';
        [this.view.emailInputElement, this.view.phoneInputElement].forEach((contact: HTMLFormElement, index: number) => {
            contact.addEventListener('input', () => {
                if (this.view.validateInput(contact.value, contact.name)) {
                    flag[index] = true
                    if (index === 0) {
                        this.model.email = this.view.emailInputElement.value
                    }
                    else {
                        this.model.phone = this.view.phoneInputElement.value
                    }
                }
                else {flag[index] = false}
                this.view.toggleButton((flag[0]&&flag[1]), this.view.payButtonElement)
            })
        })

        return this.view.contactsTemplateElement
    }
}