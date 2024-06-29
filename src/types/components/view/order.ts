export interface IOrderView {
    orderTemplateElement: HTMLElement;
    contactsTemplateElement: HTMLElement;
    chooseButtonsElement: HTMLButtonElement[];
    adressInputElement: HTMLFormElement;
    emailInputElement: HTMLFormElement;
    phoneInputElement: HTMLFormElement;
    nextButtonElement: HTMLButtonElement;
    payButtonElement: HTMLButtonElement;

    toggleButton(condition: boolean, button: HTMLButtonElement): void;
    validateInput(input: string, flag: string): boolean;
}