import * as Api from './api';
import * as Events from './events';
import * as Сonstants from '../../utils/constants';

export class helpApi {
    protected api: Api.Api;

    constructor (eve: Events.EventEmitter) {
        this.api = new Api.Api(Сonstants.API_URL);

        eve.on('ApiPOST', (e) => {
            this.api.post('/order', e)
        })
    }

    public get(uri: string) {
        return this.api.get(uri)
    }
}