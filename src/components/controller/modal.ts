import { ModalView } from '../view/modal';
import * as Events from '../base/events';

export class ModalController {
    private view: ModalView;

    constructor(event: Events.EventEmitter) {
        this.view = new ModalView();

        event.on('activationModal', (e) => {
            this.activationModal(e as HTMLElement);
        })
        event.on('disActivationModal', () => {
            this.disActivationModal();
        })

        this.view.getCloseButton().addEventListener('click', () => this.disActivationModal());
        document.addEventListener('keydown', (event) => this.escapeCheck(event));
        this.view.getExternal().addEventListener('click', (evt) => this.closePopupByOverlay(evt));
    }

    public activationModal(content: HTMLElement) {
        this.view.setContent(content);
        this.view.activationModal(this.view.getContent());
    }

    public disActivationModal() {
        this.view.disActivationModal(this.view.getContent());
    }

    private escapeCheck(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.disActivationModal();
        }
    }
    private closePopupByOverlay(evt: MouseEvent) {
        if (evt.target === this.view.getExternal()) {
            this.disActivationModal();
        }
    }
}