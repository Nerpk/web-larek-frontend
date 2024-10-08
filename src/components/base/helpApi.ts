import * as Api from './api';
import * as Events from './events';
import * as Сonstants from '../../utils/constants';

export class HelpApi {
    protected api: Api.Api;

    constructor (event: Events.EventEmitter) {
        this.api = new Api.Api(Сonstants.API_URL);

        event.on('ApiPOST', (e) => {
            this.api.post('/order', e).then(v => {
                console.log(v);
                event.emit('disActivationModal');
                event.emit('activationSuccess', {total: (v as {total: number}).total});
                event.emit('disActivationSuccess')
            }).catch(err => {
                console.error('Произошла ошибка при выполнении запроса:', err);
            });
        })
    }

    public get(uri: string) {
       return this.api.get(uri)
    }
}