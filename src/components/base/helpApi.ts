import * as Api from './api';
import * as Events from './events';
import * as Сonstants from '../../utils/constants';

export class HelpApi {
    protected api: Api.Api;

    constructor (event: Events.EventEmitter) {
        this.api = new Api.Api(Сonstants.API_URL);

        event.on('ApiPOST', (e) => {
            this.api.post('/order', e)
        })
    }

    public get(uri: string) {
        return this.api.get(uri)
    }
}