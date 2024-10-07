(()=>{"use strict";function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===_typeof(i)?i:String(i)),o)}var n,i}var e=function(){function EventEmitter(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,EventEmitter),this._events=new Map}return function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(EventEmitter,[{key:"on",value:function on(e,t){var r;this._events.has(e)||this._events.set(e,new Set),null===(r=this._events.get(e))||void 0===r||r.add(t)}},{key:"off",value:function off(e,t){var r;this._events.has(e)&&(this._events.get(e).delete(t),0===(null===(r=this._events.get(e))||void 0===r?void 0:r.size)&&this._events.delete(e))}},{key:"emit",value:function emit(e,t){this._events.forEach((function(r,o){(o instanceof RegExp&&o.test(e)||o===e)&&r.forEach((function(e){return e(t)}))}))}},{key:"onAll",value:function onAll(e){this.on("*",e)}},{key:"offAll",value:function offAll(){this._events=new Map}},{key:"trigger",value:function trigger(e,t){var r=this;return function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r.emit(e,Object.assign(Object.assign({},o||{}),t||{}))}}}]),EventEmitter}();function modal_typeof(e){return modal_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},modal_typeof(e)}function modal_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function modal_toPrimitive(e,t){if("object"!==modal_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==modal_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===modal_typeof(i)?i:String(i)),o)}var n,i}var t=function(){function ModalView(){!function modal_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ModalView),this.external=document.querySelector("#modal-container"),this.internal=this.external.querySelector(".modal__content"),this.closeButton=this.external.querySelector(".modal__close")}return function modal_createClass(e,t,r){return t&&modal_defineProperties(e.prototype,t),r&&modal_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(ModalView,[{key:"activationModal",value:function activationModal(e){this.internal.appendChild(e),this.external.classList.add("modal_active")}},{key:"disActivationModal",value:function disActivationModal(e){this.internal.contains(e)&&this.internal.removeChild(e),this.external.classList.remove("modal_active")}},{key:"getExternal",value:function getExternal(){return this.external}},{key:"getCloseButton",value:function getCloseButton(){return this.closeButton}},{key:"getContent",value:function getContent(){return this.content}},{key:"setContent",value:function setContent(e){this.content=e}}]),ModalView}();function isSelector(e){return"string"==typeof e&&e.length>1}function ensureElement(e,t){if(isSelector(e)){var r=function ensureAllElements(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;if(isSelector(e))return Array.from(t.querySelectorAll(e));if(e instanceof NodeList)return Array.from(e);if(Array.isArray(e))return e;throw new Error("Unknown selector element")}(e,t);if(r.length>1&&console.warn("selector ".concat(e," return more then one element")),0===r.length)throw new Error("selector ".concat(e," return nothing"));return r.pop()}if(e instanceof HTMLElement)return e;throw new Error("Unknown selector element")}function cloneTemplate(e){return ensureElement(e).content.firstElementChild.cloneNode(!0)}function controller_modal_typeof(e){return controller_modal_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},controller_modal_typeof(e)}function controller_modal_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function controller_modal_toPrimitive(e,t){if("object"!==controller_modal_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==controller_modal_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===controller_modal_typeof(i)?i:String(i)),o)}var n,i}var r=function(){function ModalController(e){var r=this;!function controller_modal_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ModalController),this.view=new t,this.closeFunctional(),e.on("activationModal",(function(e){r.activationModal(e)})),e.on("disActivationModal",(function(){r.disActivationModal()})),e.on("activationSuccess",(function(t){var o=cloneTemplate("#success");o.querySelector(".order-success__description").textContent="Списано ".concat(t.total," синапсов"),o.querySelector(".order-success__close").addEventListener("click",(function(){e.emit("disActivationModal")})),r.activationModal(o)}))}return function controller_modal_createClass(e,t,r){return t&&controller_modal_defineProperties(e.prototype,t),r&&controller_modal_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(ModalController,[{key:"activationModal",value:function activationModal(e){this.view.setContent(e),this.view.activationModal(this.view.getContent())}},{key:"disActivationModal",value:function disActivationModal(){this.view.disActivationModal(this.view.getContent())}},{key:"escapeCheck",value:function escapeCheck(e){"Escape"===e.key&&(e.preventDefault(),this.disActivationModal())}},{key:"closePopupByOverlay",value:function closePopupByOverlay(e){e.target===this.view.getExternal()&&this.disActivationModal()}},{key:"closeFunctional",value:function closeFunctional(){var e=this;this.view.getCloseButton().addEventListener("click",(function(){e.disActivationModal()})),document.addEventListener("keydown",(function(t){e.escapeCheck(t)})),this.view.getExternal().addEventListener("click",(function(t){e.closePopupByOverlay(t)}))}}]),ModalController}();function product_typeof(e){return product_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},product_typeof(e)}function product_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function product_toPrimitive(e,t){if("object"!==product_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==product_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===product_typeof(i)?i:String(i)),o)}var n,i}var o=function(){function ProductModel(e){!function product_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ProductModel),this.data=e}return function product_createClass(e,t,r){return t&&product_defineProperties(e.prototype,t),r&&product_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(ProductModel,[{key:"getData",value:function getData(){return this.data}},{key:"getTitle",value:function getTitle(){return this.data.title}},{key:"getCategory",value:function getCategory(){return this.data.category}},{key:"getImageUrl",value:function getImageUrl(){return this.data.image}},{key:"getPrice",value:function getPrice(){var e;return"".concat(null!==(e=this.data.price)&&void 0!==e?e:0," синапсов")}},{key:"getDescription",value:function getDescription(){return this.data.description}},{key:"getBasketStatus",value:function getBasketStatus(){return this.data.basket}},{key:"setBasketStatus",value:function setBasketStatus(e){this.data.basket=e}}]),ProductModel}();function view_product_typeof(e){return view_product_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},view_product_typeof(e)}function view_product_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function view_product_toPrimitive(e,t){if("object"!==view_product_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==view_product_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===view_product_typeof(i)?i:String(i)),o)}var n,i}var n=function(){function ProductView(e){!function view_product_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ProductView),this.cardTemplate=cloneTemplate(e),this.cardTemplate.querySelector(".card__title")&&(this.cardTitle=this.cardTemplate.querySelector(".card__title")),this.cardTemplate.querySelector(".card__category")&&(this.cardCategory=this.cardTemplate.querySelector(".card__category")),this.cardTemplate.querySelector(".card__image")&&(this.cardImage=this.cardTemplate.querySelector(".card__image")),this.cardTemplate.querySelector(".card__price")&&(this.cardPrice=this.cardTemplate.querySelector(".card__price")),this.cardTemplate.querySelector(".card__text")&&(this.cardDescription=this.cardTemplate.querySelector(".card__text")),this.cardTemplate.querySelector(".card__button")&&(this.cardButton=this.cardTemplate.querySelector(".card__button"))}return function view_product_createClass(e,t,r){return t&&view_product_defineProperties(e.prototype,t),r&&view_product_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(ProductView,[{key:"getCardTemplate",value:function getCardTemplate(){return this.cardTemplate}},{key:"getCardTitle",value:function getCardTitle(){return this.cardTitle}},{key:"getCardCategory",value:function getCardCategory(){return this.cardCategory}},{key:"getCardImage",value:function getCardImage(){return this.cardImage}},{key:"getCardPrice",value:function getCardPrice(){return this.cardPrice}},{key:"getCardDescription",value:function getCardDescription(){return this.cardDescription}},{key:"getCardButton",value:function getCardButton(){return this.cardButton}},{key:"getCategoryColor",value:function getCategoryColor(){return this.cardCategoryColor}},{key:"setCategoryColor",value:function setCategoryColor(e){"софт-скил"===e&&(this.cardCategoryColor="card__category_soft"),"хард-скил"===e&&(this.cardCategoryColor="card__category_hard"),"другое"===e&&(this.cardCategoryColor="card__category_other"),"дополнительное"===e&&(this.cardCategoryColor="card__category_additional"),"кнопка"===e&&(this.cardCategoryColor="card__category_button")}}]),ProductView}();function controller_product_typeof(e){return controller_product_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},controller_product_typeof(e)}function controller_product_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function controller_product_toPrimitive(e,t){if("object"!==controller_product_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==controller_product_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===controller_product_typeof(i)?i:String(i)),o)}var n,i}var i=function(){function ProductController(e,t){var r=this;!function controller_product_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ProductController),this.model=new o(e),t.on("updateProducts",(function(){r.model.setBasketStatus("out")}))}return function controller_product_createClass(e,t,r){return t&&controller_product_defineProperties(e.prototype,t),r&&controller_product_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(ProductController,[{key:"createCard",value:function createCard(e){var t=this;return this.view=new n("#card-catalog"),this.modelToView(),this.view.getCardTemplate().addEventListener("click",(function(){e.emit("activationModal",t.createModal(e))})),this.view.getCardTemplate()}},{key:"createShort",value:function createShort(e){var t=this;return this.view=new n("#card-basket"),this.modelToView(),this.view.getCardButton().addEventListener("click",(function(){t.view.getCardButton().closest(".card").remove(),t.model.setBasketStatus("out"),e.emit("removeProduct",t.model.getData()),e.emit("changeData")})),this.view.getCardTemplate()}},{key:"createModal",value:function createModal(e){var t=this;return this.view=new n("#card-preview"),this.modelToView(),"Мамка-таймер"!=this.model.getTitle()?(this.view.getCardButton().textContent="in"===this.model.getBasketStatus()?"Убрать из корзины":"В корзину",this.view.getCardButton().addEventListener("click",(function(){t.model.setBasketStatus("in"===t.model.getBasketStatus()?"out":"in"),t.view.getCardButton().textContent="in"===t.model.getBasketStatus()?"Убрать из корзины":"В корзину","in"===t.model.getBasketStatus()?e.emit("addProduct",t.model.getData()):e.emit("removeProduct",t.model.getData())}))):this.view.getCardButton().disabled=!0,this.view.getCardTemplate()}},{key:"modelToView",value:function modelToView(){this.view.getCardTitle()&&(this.view.getCardTitle().textContent=this.model.getTitle()),this.view.getCardCategory()&&(this.view.getCardCategory().textContent=this.model.getCategory(),this.view.setCategoryColor(this.model.getCategory()),this.view.getCardCategory().classList.remove("card__category_other"),this.view.getCardCategory().classList.remove("crad__category_soft"),this.view.getCardCategory().classList.add(this.view.getCategoryColor())),this.view.getCardImage()&&(this.view.getCardImage().src="".concat("https://larek-api.nomoreparties.co/content/weblarek").concat(this.model.getImageUrl())),this.view.getCardPrice()&&(this.view.getCardPrice().textContent=this.model.getPrice()),this.view.getCardDescription()&&(this.view.getCardDescription().textContent=this.model.getDescription())}}]),ProductController}();function basket_typeof(e){return basket_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},basket_typeof(e)}function basket_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function basket_toPrimitive(e,t){if("object"!==basket_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==basket_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===basket_typeof(i)?i:String(i)),o)}var n,i}var a=function(){function BasketModel(){!function basket_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,BasketModel),this.products=[],this.counter=0,this.total=0}return function basket_createClass(e,t,r){return t&&basket_defineProperties(e.prototype,t),r&&basket_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(BasketModel,[{key:"addProduct",value:function addProduct(e){this.products.push(e),this.counter++,this.total+=e.price}},{key:"removeProduct",value:function removeProduct(e){this.products=this.products.filter((function(t){return t.id!==e.id})),this.counter--,this.total-=e.price}},{key:"getTotalPrice",value:function getTotalPrice(){return this.total}},{key:"getProducts",value:function getProducts(){return this.products}},{key:"getCounter",value:function getCounter(){return this.counter}},{key:"getProductsID",value:function getProductsID(){return this.products.map((function(e){return e.id}))}},{key:"getData",value:function getData(){return{total:this.total,products:this.getProductsID()}}},{key:"updateBasketModel",value:function updateBasketModel(){this.counter=0,this.total=0,this.products=[]}}]),BasketModel}();function view_basket_typeof(e){return view_basket_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},view_basket_typeof(e)}function view_basket_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function view_basket_toPrimitive(e,t){if("object"!==view_basket_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==view_basket_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===view_basket_typeof(i)?i:String(i)),o)}var n,i}var l=function(){function BasketView(){!function view_basket_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,BasketView),this.basketTemplate=cloneTemplate("#basket"),this.mainBasketCounter=document.querySelector(".header__basket-counter"),this.mainBasketButton=document.querySelector(".header__basket"),this.basketTemplate.querySelector(".basket__list")&&(this.basketProducts=this.basketTemplate.querySelector(".basket__list")),this.basketTemplate.querySelector(".basket__button")&&(this.basketButton=this.basketTemplate.querySelector(".basket__button")),this.basketTemplate.querySelector(".basket__price")&&(this.basketTotal=this.basketTemplate.querySelector(".basket__price"))}return function view_basket_createClass(e,t,r){return t&&view_basket_defineProperties(e.prototype,t),r&&view_basket_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(BasketView,[{key:"getMainBasketButton",value:function getMainBasketButton(){return this.mainBasketButton}},{key:"getMainBasketCounter",value:function getMainBasketCounter(){return this.mainBasketCounter}},{key:"getBasketTemplate",value:function getBasketTemplate(){return this.basketTemplate}},{key:"getBasketProducts",value:function getBasketProducts(){return this.basketProducts}},{key:"getBasketTotal",value:function getBasketTotal(){return this.basketTotal}},{key:"getBasketButton",value:function getBasketButton(){return this.basketButton}},{key:"updateBasketView",value:function updateBasketView(){this.mainBasketCounter.textContent="0",this.basketTotal.textContent="0",this.basketButton.disabled=!0}}]),BasketView}();function controller_basket_typeof(e){return controller_basket_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},controller_basket_typeof(e)}function controller_basket_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function controller_basket_toPrimitive(e,t){if("object"!==controller_basket_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==controller_basket_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===controller_basket_typeof(i)?i:String(i)),o)}var n,i}var u=function(){function BasketController(e){var t=this;!function controller_basket_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,BasketController),this.model=new a,this.view=new l,e.on("addProduct",(function(e){t.model.addProduct(e),t.view.getMainBasketCounter().textContent="".concat(t.model.getCounter())})),e.on("removeProduct",(function(e){t.model.removeProduct(e),t.view.getMainBasketCounter().textContent="".concat(t.model.getCounter())})),e.on("changeData",(function(){t.changeBasket(e)})),e.on("updateBasket",(function(){t.model.updateBasketModel(),t.view.updateBasketView()})),this.view.getMainBasketButton().addEventListener("click",(function(){e.emit("activationModal",t.createBasket(e))})),this.view.getBasketButton().addEventListener("click",(function(){e.emit("disActivationModal"),e.emit("createOrder",t.model.getData())}))}return function controller_basket_createClass(e,t,r){return t&&controller_basket_defineProperties(e.prototype,t),r&&controller_basket_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(BasketController,[{key:"getModel",value:function getModel(){return this.model}},{key:"getView",value:function getView(){return this.view}},{key:"createBasket",value:function createBasket(e){for(;this.view.getBasketProducts().firstChild;)this.view.getBasketProducts().removeChild(this.view.getBasketProducts().firstChild);return e.emit("createBasket",{where:this.view.getBasketProducts(),items:this.model.getProducts()}),this.changeBasket(e)}},{key:"changeBasket",value:function changeBasket(e){return this.view.getBasketTemplate().querySelectorAll(".basket__item-index").forEach((function(e,t){return e.textContent="".concat(t+1)})),this.view.getBasketTotal().textContent="".concat(this.model.getTotalPrice()," синапсов"),0===this.model.getCounter()?this.view.getBasketButton().disabled=!0:this.view.getBasketButton().disabled=!1,this.view.getBasketTemplate()}}]),BasketController}();function order_slicedToArray(e,t){return function order_arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function order_iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var o,n,i,a,l=[],u=!0,c=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(o=i.call(r)).done)&&(l.push(o.value),l.length!==t);u=!0);}catch(e){c=!0,n=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw n}}return l}}(e,t)||function order_unsupportedIterableToArray(e,t){if(!e)return;if("string"==typeof e)return order_arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return order_arrayLikeToArray(e,t)}(e,t)||function order_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function order_arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function order_typeof(e){return order_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},order_typeof(e)}function order_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function order_toPrimitive(e,t){if("object"!==order_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==order_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===order_typeof(i)?i:String(i)),o)}var n,i}var c=function(){function OrderModel(){!function order_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OrderModel),this.orderData={},this.orderData.user={}}return function order_createClass(e,t,r){return t&&order_defineProperties(e.prototype,t),r&&order_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(OrderModel,[{key:"payment",get:function get(){return this.orderData.user.payment},set:function set(e){this.orderData.user.payment=e}},{key:"address",get:function get(){return this.orderData.user.address},set:function set(e){this.orderData.user.address=e}},{key:"email",get:function get(){return this.orderData.user.email},set:function set(e){this.orderData.user.email=e}},{key:"phone",get:function get(){return this.orderData.user.phone},set:function set(e){this.orderData.user.phone=e}},{key:"items",get:function get(){return this.items},set:function set(e){this.orderData.items=e}},{key:"total",get:function get(){return this.total},set:function set(e){this.total=e}},{key:"getData",value:function getData(){return this.orderData}},{key:"updateOrderModel",value:function updateOrderModel(){this.orderData={},this.orderData.user={}}},{key:"flattenObject",value:function flattenObject(e){var t=this;return Object.keys(e).reduce((function(r,o){if("object"!==order_typeof(e[o])||null===e[o]||Array.isArray(e[o]))r[o]=e[o];else for(var n=t.flattenObject(e[o]),i=0,a=Object.entries(n);i<a.length;i++){var l=order_slicedToArray(a[i],2),u=l[0],c=l[1];r[u]=c}return r}),{})}}]),OrderModel}();function view_order_typeof(e){return view_order_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},view_order_typeof(e)}function view_order_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function view_order_toPrimitive(e,t){if("object"!==view_order_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==view_order_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===view_order_typeof(i)?i:String(i)),o)}var n,i}var s=function(){function OrderView(){var e=this;!function view_order_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OrderView),this.orderTemplate=cloneTemplate("#order"),this.contactsTemplate=cloneTemplate("#contacts"),this.chooseButtons=[],this.orderTemplate.querySelectorAll(".button_alt").forEach((function(t){e.chooseButtons.push(t)})),this.adressInput=this.orderTemplate.querySelector(".form__input"),this.nextButton=this.orderTemplate.querySelector(".order__button"),this.emailInput=this.contactsTemplate.querySelectorAll(".form__input")[0],this.phoneInput=this.contactsTemplate.querySelectorAll(".form__input")[1],this.payButton=this.contactsTemplate.querySelector(".button")}return function view_order_createClass(e,t,r){return t&&view_order_defineProperties(e.prototype,t),r&&view_order_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(OrderView,[{key:"orderTemplateElement",get:function get(){return this.orderTemplate}},{key:"contactsTemplateElement",get:function get(){return this.contactsTemplate}},{key:"chooseButtonsElement",get:function get(){return this.chooseButtons}},{key:"adressInputElement",get:function get(){return this.adressInput}},{key:"emailInputElement",get:function get(){return this.emailInput}},{key:"phoneInputElement",get:function get(){return this.phoneInput}},{key:"nextButtonElement",get:function get(){return this.nextButton}},{key:"payButtonElement",get:function get(){return this.payButton}},{key:"toggleButton",value:function toggleButton(e,t){t.disabled=!e}},{key:"updateOrderView",value:function updateOrderView(){this.adressInput.value="",this.emailInput.value="",this.phoneInput.value="",this.chooseButtons.forEach((function(e){e.style.outline="none"})),this.nextButton.disabled=!0,this.payButton.disabled=!0}},{key:"validateInput",value:function validateInput(e,t){var r={address:/^\d{6},\s[а-яА-ЯёЁ]+,\sул\.\s[а-яА-ЯёЁ]+.*$/,email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,phone:/^\+?[1-9]\d{1,14}$/};return!!r[t]&&r[t].test(e)}}]),OrderView}();function controller_order_typeof(e){return controller_order_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},controller_order_typeof(e)}function controller_order_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function controller_order_toPrimitive(e,t){if("object"!==controller_order_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==controller_order_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===controller_order_typeof(i)?i:String(i)),o)}var n,i}var f=function(){function OrderController(e){var t=this;!function controller_order_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OrderController),this.model=new c,this.view=new s,e.on("createOrder",(function(r){t.model.getData().total=r.total,t.model.getData().items=r.products,e.emit("activationModal",t.createOrder(e))})),e.on("updateOrder",(function(){t.model.updateOrderModel(),t.view.updateOrderView()})),this.view.nextButtonElement.addEventListener("click",(function(){e.emit("disActivationModal"),e.emit("activationModal",t.createContacts(e))})),this.view.payButtonElement.addEventListener("click",(function(r){r.preventDefault(),e.emit("ApiPOST",t.model.flattenObject(t.model.getData()))}))}return function controller_order_createClass(e,t,r){return t&&controller_order_defineProperties(e.prototype,t),r&&controller_order_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(OrderController,[{key:"createOrder",value:function createOrder(e){var t=this,r={b:!1,i:!1};return this.view.chooseButtonsElement.forEach((function(e){e.addEventListener("click",(function(){t.view.chooseButtonsElement.forEach((function(e){e.style.outline="none",r.b=!1})),e.style.outline="2px solid white","Онлайн"===e.textContent?t.model.payment="online":t.model.payment="offline",r.b=!0,t.view.toggleButton(r.b&&r.i,t.view.nextButtonElement)}))})),this.view.adressInputElement.addEventListener("input",(function(){t.view.validateInput(t.view.adressInputElement.value,"address")?(r.i=!0,t.model.address=t.view.adressInputElement.value):r.i=!1,t.view.toggleButton(r.b&&r.i,t.view.nextButtonElement)})),this.view.orderTemplateElement}},{key:"createContacts",value:function createContacts(e){var t=this,r={0:!1,1:!1};return[this.view.emailInputElement,this.view.phoneInputElement].forEach((function(e,o){e.addEventListener("input",(function(){t.view.validateInput(e.value,e.name)?(r[o]=!0,0===o?t.model.email=t.view.emailInputElement.value:t.model.phone=t.view.phoneInputElement.value):r[o]=!1,t.view.toggleButton(r[0]&&r[1],t.view.payButtonElement)}))})),this.view.contactsTemplateElement}}]),OrderController}();function api_typeof(e){return api_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},api_typeof(e)}function api_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function api_toPrimitive(e,t){if("object"!==api_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==api_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===api_typeof(i)?i:String(i)),o)}var n,i}var d=function(){function Api(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function api_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Api),this.baseUrl=e,this.options={headers:Object.assign({"Content-Type":"application/json"},null!==(t=r.headers)&&void 0!==t?t:{})}}return function api_createClass(e,t,r){return t&&api_defineProperties(e.prototype,t),r&&api_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(Api,[{key:"handleResponse",value:function handleResponse(e){return e.ok?e.json():e.json().then((function(t){var r;return Promise.reject(null!==(r=t.error)&&void 0!==r?r:e.statusText)}))}},{key:"get",value:function get(e){return fetch(this.baseUrl+e,Object.assign(Object.assign({},this.options),{method:"GET"})).then(this.handleResponse)}},{key:"post",value:function post(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST";return fetch(this.baseUrl+e,Object.assign(Object.assign({},this.options),{method:r,body:JSON.stringify(t)})).then(this.handleResponse)}}]),Api}();function helpApi_typeof(e){return helpApi_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},helpApi_typeof(e)}function helpApi_defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(n=o.key,i=void 0,i=function helpApi_toPrimitive(e,t){if("object"!==helpApi_typeof(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==helpApi_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(n,"string"),"symbol"===helpApi_typeof(i)?i:String(i)),o)}var n,i}var p=function(){function HelpApi(e){var t=this;!function helpApi_classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,HelpApi),this.api=new d("https://larek-api.nomoreparties.co/api/weblarek"),e.on("ApiPOST",(function(r){t.api.post("/order",r).then((function(t){console.log(t),e.emit("disActivationModal"),e.emit("activationSuccess",{total:t.total}),e.emit("disActivationSuccess")})).catch((function(e){console.error("Произошла ошибка при выполнении запроса:",e)}))}))}return function helpApi_createClass(e,t,r){return t&&helpApi_defineProperties(e.prototype,t),r&&helpApi_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(HelpApi,[{key:"get",value:function get(e){return this.api.get(e)}}]),HelpApi}(),y=new e,v=new p(y);new r(y),new u(y),new f(y);v.get("/product/").then((function(e){y.emit("createGallery",{where:".gallery",items:e.items})})).catch((function(e){console.error("Произошла ошибка при получении данных о продуктах:",e)})),y.on("createGallery",(function(e){var t=document.querySelector(e.where);e.items.forEach((function(e){var r=new i(e,y);t.append(r.createCard(y))}))})),y.on("createBasket",(function(e){var t=e.where;e.items.forEach((function(e){var r=new i(e,y);t.append(r.createShort(y))}))})),y.on("disActivationSuccess",(function(){y.emit("updateProducts"),y.emit("updateBasket"),y.emit("updateOrder")}))})();
//# sourceMappingURL=main.js.map