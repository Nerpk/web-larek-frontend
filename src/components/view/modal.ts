import { IModalView } from "../../types";

export class ModalView implements IModalView{
    private external: HTMLElement;
    private internal: HTMLElement;
    private closeButton: HTMLElement;
    private content: HTMLElement;

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
    public getCloseButton(): HTMLElement {
        return this.closeButton;
    }

    public getContent(): HTMLElement {
        return this.content;
    } 

    public setContent(content: HTMLElement) {
        this.content = content;
    }
}
