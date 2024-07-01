import { ModalView } from '../view/modal';
import * as Events from '../base/events';
import * as Utils from '../../utils/utils';

export class ModalController {
    private view: ModalView;

    constructor(event: Events.EventEmitter) {
        this.view = new ModalView();
        this.closeFunctional();

        event.on('activationModal', (e) => {
            this.activationModal(e as HTMLElement);
        })
        event.on('disActivationModal', () => {
            this.disActivationModal();
        })
        event.on('activationSuccess', (e) => {
            const success = Utils.cloneTemplate<HTMLLIElement>('#success');
            success.querySelector('.order-success__description').textContent = `Списано ${(e as {total: number}).total} синапсов`
            success.querySelector('.order-success__close').addEventListener('click', () => {
                event.emit('disActivationModal')
            })
            this.activationModal(success);
        })
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
    private closeFunctional() {
        this.view.getCloseButton().addEventListener('click', () => {
            this.disActivationModal()
        });
        document.addEventListener('keydown', (event) => {
            this.escapeCheck(event)
        });
        this.view.getExternal().addEventListener('click', (evt) => {
            this.closePopupByOverlay(evt)
        });
    }
}