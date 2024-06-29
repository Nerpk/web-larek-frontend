import { IOrderView } from "../../types";
import * as Utils from '../../utils/utils';

export class OrderView implements IOrderView {
    protected orderTemplate: HTMLElement;
    protected contactsTemplate: HTMLElement;
    protected chooseButtons: HTMLButtonElement[];
    protected adressInput: HTMLFormElement;
    protected emailInput: HTMLFormElement;
    protected phoneInput: HTMLFormElement;
    protected nextButton: HTMLButtonElement;
    protected payButton: HTMLButtonElement;

    constructor() {
        this.orderTemplate = Utils.cloneTemplate<HTMLLIElement>('#order');
        this.contactsTemplate = Utils.cloneTemplate<HTMLLIElement>('#contacts');

        this.chooseButtons = [];
        this.orderTemplate.querySelectorAll('.button_alt').forEach(button => {
            this.chooseButtons.push(button as HTMLButtonElement)
        })
        this.adressInput = this.orderTemplate.querySelector('.form__input');
        this.nextButton = this.orderTemplate.querySelector('.order__button')

        this.emailInput = (this.contactsTemplate.querySelectorAll('.form__input'))[0] as HTMLFormElement
        this.phoneInput = (this.contactsTemplate.querySelectorAll('.form__input'))[1] as HTMLFormElement
        this.payButton = this.contactsTemplate.querySelector('.button')
    }
    get orderTemplateElement(): HTMLElement {
        return this.orderTemplate;
    }
    get contactsTemplateElement(): HTMLElement {
        return this.contactsTemplate;
    }
    get chooseButtonsElement(): HTMLButtonElement[] {
        return this.chooseButtons;
    }
    get adressInputElement(): HTMLFormElement {
        return this.adressInput;
    }
    get emailInputElement(): HTMLFormElement {
        return this.emailInput;
    }
    get phoneInputElement(): HTMLFormElement {
        return this.phoneInput;
    }
    get nextButtonElement(): HTMLButtonElement {
        return this.nextButton;
    }
    get payButtonElement(): HTMLButtonElement {
        return this.payButton;
    }

    public toggleButton(condition: boolean, button: HTMLButtonElement) {
        if (condition) {
            button.disabled = false
        }
        else {
            button.disabled = true
        }
    }
    public validateInput(input: string, flag: string): boolean {
        const regexes: Record<string, RegExp> = {
          'address': /^\d{6},\s[а-яА-ЯёЁ]+,\sул\.\s[а-яА-ЯёЁ]+.*$/,
          'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'phone': /^\+?[1-9]\d{1,14}$/
        };
        return regexes[flag] ? regexes[flag].test(input) : false;
    }
}