export interface IModalView {
    activationModal(content: HTMLElement): void;
    disActivationModal(content: HTMLElement): void;
    getExternal(): HTMLElement;
    getCloseButton(): HTMLElement;
}