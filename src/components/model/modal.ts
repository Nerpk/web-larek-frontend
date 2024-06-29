import { IModalModel } from "../../types";

export class ModalModel implements IModalModel{
    private content: HTMLElement;

    constructor(content: HTMLElement) {
        this.content = content;
    }

    public getContent(): HTMLElement {
        return this.content;
    }
}