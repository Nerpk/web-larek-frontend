import { ModalModel } from '../model/modal';
import { ModalView } from '../view/modal';
import * as Events from '../base/events';

export class ModalController {
    private model: ModalModel;
    private view: ModalView;

    constructor(eve: Events.EventEmitter) {
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

    public activationModal(content: HTMLElement) {
        this.model = new ModalModel(content);
        this.view.activationModal(this.model.getContent());
    }

    public disActivationModal() {
        this.view.disActivationModal(this.model.getContent());
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