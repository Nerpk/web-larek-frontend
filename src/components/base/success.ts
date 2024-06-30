import * as Events from './events';
import * as Utils from '../../utils/utils';

export class SuccessView {
    total: number;

    constructor(eve: Events.EventEmitter) {
        eve.on('openSuccess', (e) => {
            this.total = (e as {total: number}).total;
            eve.emit('activationModal', this.createSuccess(eve))
        })
    }

    public createSuccess(eve: Events.EventEmitter): HTMLElement {
        const success = Utils.cloneTemplate<HTMLLIElement>('#success');
        success.querySelector('.order-success__description').textContent = `Списано ${this.total} синапсов`
        success.querySelector('.order-success__close').addEventListener('click', () => {
            eve.emit('disactivationModal');
            location.reload();
        })
        return success
    }
}