import './scss/styles.scss';
import * as Types from './types/index';
import * as Api from './components/base/api';
import * as Events from './components/base/events';
import * as Сonstants from './utils/constants';
import * as Utils from './utils/utils';

function p(some: any) {console.log(some)}



const api = new Api.Api(Сonstants.API_URL);

api.get(`/product/`).then(data => {
    const productList = new Types.ProductList(data as Types.IProductList) 
    productList.createGallery('.gallery')
})
