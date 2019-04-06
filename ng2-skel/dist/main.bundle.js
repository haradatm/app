webpackJsonp([1,4],{

/***/ 1243:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1245:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(652);


/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SocketService = (function () {
    function SocketService() {
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
    }
    /**
     * Register listeners to sync an array with updates on a model
     *
     * Takes the array we want to sync, the model name that socket updates are sent from,
     * and an optional callback function after new items are updated.
     *
     * @param {String} modelName
     * @param {Array} array
     * @param {Function} cb
     */
    SocketService.prototype.syncUpdates = function (modelName, array, cb) {
        cb = cb || function () { };
        /**
         * Syncs item creation/updates on 'model:save'
         */
        this.socket.on(modelName + ":save", function (item) {
            // var oldItem = find(array, {_id: item._id});
            var oldItem = array.find(function (array) { return array._id === item._id; });
            var index = array.indexOf(oldItem);
            var event = 'created';
            // replace oldItem if it exists
            // otherwise just add item to the collection
            if (oldItem) {
                array.splice(index, 1, item);
                event = 'updated';
            }
            else {
                array.push(item);
            }
            cb(event, item, array);
        });
        /**
         * Syncs removed items on 'model:remove'
         */
        this.socket.on(modelName + ":remove", function (item) {
            var event = 'deleted';
            // remove(array, {_id: item._id});
            var oldItem = array.find(function (array) { return array._id === item._id; });
            var index = array.indexOf(oldItem);
            array.splice(index, 1);
            cb(event, item, array);
        });
    };
    /**
     * Removes listeners for a models updates on the socket
     *
     * @param modelName
     */
    SocketService.prototype.unsyncUpdates = function (modelName) {
        this.socket.removeAllListeners(modelName + ":save");
        this.socket.removeAllListeners(modelName + ":remove");
    };
    SocketService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/socket.service.js.map

/***/ }),

/***/ 651:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 651;


/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(772);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/main.js.map

/***/ }),

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(974),
            styles: [__webpack_require__(971)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/app.component.js.map

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__ = __webpack_require__(954);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rest_rest_component__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__chat_chat_component__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__chat_socket_service__ = __webpack_require__(406);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// Define the routes
var ROUTES = [
    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
    {
        path: 'rest',
        component: __WEBPACK_IMPORTED_MODULE_7__rest_rest_component__["a" /* RestComponent */]
    },
    {
        path: 'chat',
        component: __WEBPACK_IMPORTED_MODULE_8__chat_chat_component__["a" /* ChatComponent */]
    },
    {
        path: '**',
        redirectTo: 'chat'
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__rest_rest_component__["a" /* RestComponent */],
                __WEBPACK_IMPORTED_MODULE_8__chat_chat_component__["a" /* ChatComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap__["a" /* Ng2BootstrapModule */],
                // InMemoryWebApiModule.forRoot(HeroData),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(ROUTES) // Add routes to the app
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__chat_socket_service__["a" /* SocketService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/app.module.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__socket_service__ = __webpack_require__(406);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { ChatService }            from './chat.service';
var HUMAN = {
    userId: 'human',
    userType: 'human',
    initial: '有人',
    name: 'あなた'
};
var ChatComponent = (function () {
    function ChatComponent(http, _SocketService_) {
        this.http = http;
        this._SocketService_ = _SocketService_;
        this.comments = [];
        this.current_user = HUMAN;
        this.userId = '';
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/api/chats/comments')
            .map(function (res) {
            return res.json();
        })
            .catch(function (err) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err.json().error || 'Server error');
        })
            .subscribe(function (comments) {
            _this.comments = comments;
            _this._SocketService_.syncUpdates('comment', _this.comments, null);
        });
        this.connection = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var event = 'new:chat:message';
            var socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__();
            socket.on(event, function (comment) {
                console.dir(comment);
                observer.next(comment);
            });
            return function () { socket.disconnect(); };
        })
            .subscribe(function (comment) {
            _this.addComment(comment);
        });
    };
    ChatComponent.prototype.sendComment = function (newComment) {
        var _this = this;
        if (newComment) {
            console.log(newComment);
            var message = {
                messageId: (new Date()).getTime().toString(),
                messageType: 'text',
                content: newComment,
                replyToken: '',
                timestamp: new Date(),
                answer: ''
            };
            var comment = {
                user: this.current_user,
                message: message,
                replyToId: this.userId
            };
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post('/api/chats/send', comment, options)
                .map(function (res) {
                return res.json();
            })
                .catch(function (err) {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err.json().error || 'Server error');
            })
                .subscribe(function (response) { _this.response = JSON.stringify(JSON.parse(response), null, '  '); }, function (error) { _this.errorMessage = error; });
            this.addComment(comment);
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this._SocketService_.unsyncUpdates('comments');
        this.connection.unsubscribe();
    };
    ChatComponent.prototype.addComment = function (newComment) {
        console.dir(newComment);
        this.http.post('/api/chats/comments', newComment)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err.json().error || 'Server error'); })
            .subscribe();
        if (newComment.user.userType !== 'human') {
            this.newComment = newComment.message.answer;
            this.userId = newComment.user.userId;
        }
    };
    ChatComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
            selector: 'app-chat',
            template: __webpack_require__(975),
            styles: [__webpack_require__(972)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__socket_service__["a" /* SocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__socket_service__["a" /* SocketService */]) === 'function' && _b) || Object])
    ], ChatComponent);
    return ChatComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/chat.component.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RestComponent = (function () {
    // constructor(private restService: RestService) { }
    function RestComponent(http) {
        this.http = http;
        this.sample = {
            request_id: "record001",
            sentence: "日本語を分析します。",
            info_filter: "form"
        };
        this.endpoint = 'https://api.apigw.smt.docomo.ne.jp/gooLanguageAnalysis/v1';
        this.api = 'morph?APIKEY=(APIキー)';
        this.request = JSON.stringify(this.sample, null, '  ');
    }
    RestComponent.prototype.ngOnInit = function () { };
    RestComponent.prototype.post = function () {
        var _this = this;
        if (this.request) {
            var payload = {
                method: 'POST',
                url: this.endpoint + '/' + this.api,
                payload: this.request
            };
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
            this.http.post('/api/rests', payload, options)
                .map(function (res) {
                return res.json();
            })
                .catch(function (err) {
                return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(err.json().error || 'Server error');
            })
                .subscribe(function (response) { _this.respose = JSON.stringify(JSON.parse(response), null, '  '); }, function (error) { _this.errorMessage = error; });
        }
    };
    RestComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
            selector: 'app-rest',
            template: __webpack_require__(976),
            styles: [__webpack_require__(973)],
            providers: [],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === 'function' && _a) || Object])
    ], RestComponent);
    return RestComponent;
    var _a;
}());
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/rest.component.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Data/haradatm/kenkyu/170225/ng2-skel/src/environment.js.map

/***/ }),

/***/ 945:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 451,
	"./af.js": 451,
	"./ar": 457,
	"./ar-dz": 452,
	"./ar-dz.js": 452,
	"./ar-ly": 453,
	"./ar-ly.js": 453,
	"./ar-ma": 454,
	"./ar-ma.js": 454,
	"./ar-sa": 455,
	"./ar-sa.js": 455,
	"./ar-tn": 456,
	"./ar-tn.js": 456,
	"./ar.js": 457,
	"./az": 458,
	"./az.js": 458,
	"./be": 459,
	"./be.js": 459,
	"./bg": 460,
	"./bg.js": 460,
	"./bn": 461,
	"./bn.js": 461,
	"./bo": 462,
	"./bo.js": 462,
	"./br": 463,
	"./br.js": 463,
	"./bs": 464,
	"./bs.js": 464,
	"./ca": 465,
	"./ca.js": 465,
	"./cs": 466,
	"./cs.js": 466,
	"./cv": 467,
	"./cv.js": 467,
	"./cy": 468,
	"./cy.js": 468,
	"./da": 469,
	"./da.js": 469,
	"./de": 471,
	"./de-at": 470,
	"./de-at.js": 470,
	"./de.js": 471,
	"./dv": 472,
	"./dv.js": 472,
	"./el": 473,
	"./el.js": 473,
	"./en-au": 474,
	"./en-au.js": 474,
	"./en-ca": 475,
	"./en-ca.js": 475,
	"./en-gb": 476,
	"./en-gb.js": 476,
	"./en-ie": 477,
	"./en-ie.js": 477,
	"./en-nz": 478,
	"./en-nz.js": 478,
	"./eo": 479,
	"./eo.js": 479,
	"./es": 481,
	"./es-do": 480,
	"./es-do.js": 480,
	"./es.js": 481,
	"./et": 482,
	"./et.js": 482,
	"./eu": 483,
	"./eu.js": 483,
	"./fa": 484,
	"./fa.js": 484,
	"./fi": 485,
	"./fi.js": 485,
	"./fo": 486,
	"./fo.js": 486,
	"./fr": 489,
	"./fr-ca": 487,
	"./fr-ca.js": 487,
	"./fr-ch": 488,
	"./fr-ch.js": 488,
	"./fr.js": 489,
	"./fy": 490,
	"./fy.js": 490,
	"./gd": 491,
	"./gd.js": 491,
	"./gl": 492,
	"./gl.js": 492,
	"./he": 493,
	"./he.js": 493,
	"./hi": 494,
	"./hi.js": 494,
	"./hr": 495,
	"./hr.js": 495,
	"./hu": 496,
	"./hu.js": 496,
	"./hy-am": 497,
	"./hy-am.js": 497,
	"./id": 498,
	"./id.js": 498,
	"./is": 499,
	"./is.js": 499,
	"./it": 500,
	"./it.js": 500,
	"./ja": 501,
	"./ja.js": 501,
	"./jv": 502,
	"./jv.js": 502,
	"./ka": 503,
	"./ka.js": 503,
	"./kk": 504,
	"./kk.js": 504,
	"./km": 505,
	"./km.js": 505,
	"./ko": 506,
	"./ko.js": 506,
	"./ky": 507,
	"./ky.js": 507,
	"./lb": 508,
	"./lb.js": 508,
	"./lo": 509,
	"./lo.js": 509,
	"./lt": 510,
	"./lt.js": 510,
	"./lv": 511,
	"./lv.js": 511,
	"./me": 512,
	"./me.js": 512,
	"./mi": 513,
	"./mi.js": 513,
	"./mk": 514,
	"./mk.js": 514,
	"./ml": 515,
	"./ml.js": 515,
	"./mr": 516,
	"./mr.js": 516,
	"./ms": 518,
	"./ms-my": 517,
	"./ms-my.js": 517,
	"./ms.js": 518,
	"./my": 519,
	"./my.js": 519,
	"./nb": 520,
	"./nb.js": 520,
	"./ne": 521,
	"./ne.js": 521,
	"./nl": 523,
	"./nl-be": 522,
	"./nl-be.js": 522,
	"./nl.js": 523,
	"./nn": 524,
	"./nn.js": 524,
	"./pa-in": 525,
	"./pa-in.js": 525,
	"./pl": 526,
	"./pl.js": 526,
	"./pt": 528,
	"./pt-br": 527,
	"./pt-br.js": 527,
	"./pt.js": 528,
	"./ro": 529,
	"./ro.js": 529,
	"./ru": 530,
	"./ru.js": 530,
	"./se": 531,
	"./se.js": 531,
	"./si": 532,
	"./si.js": 532,
	"./sk": 533,
	"./sk.js": 533,
	"./sl": 534,
	"./sl.js": 534,
	"./sq": 535,
	"./sq.js": 535,
	"./sr": 537,
	"./sr-cyrl": 536,
	"./sr-cyrl.js": 536,
	"./sr.js": 537,
	"./ss": 538,
	"./ss.js": 538,
	"./sv": 539,
	"./sv.js": 539,
	"./sw": 540,
	"./sw.js": 540,
	"./ta": 541,
	"./ta.js": 541,
	"./te": 542,
	"./te.js": 542,
	"./tet": 543,
	"./tet.js": 543,
	"./th": 544,
	"./th.js": 544,
	"./tl-ph": 545,
	"./tl-ph.js": 545,
	"./tlh": 546,
	"./tlh.js": 546,
	"./tr": 547,
	"./tr.js": 547,
	"./tzl": 548,
	"./tzl.js": 548,
	"./tzm": 550,
	"./tzm-latn": 549,
	"./tzm-latn.js": 549,
	"./tzm.js": 550,
	"./uk": 551,
	"./uk.js": 551,
	"./uz": 552,
	"./uz.js": 552,
	"./vi": 553,
	"./vi.js": 553,
	"./x-pseudo": 554,
	"./x-pseudo.js": 554,
	"./yo": 555,
	"./yo.js": 555,
	"./zh-cn": 556,
	"./zh-cn.js": 556,
	"./zh-hk": 557,
	"./zh-hk.js": 557,
	"./zh-tw": 558,
	"./zh-tw.js": 558
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 945;


/***/ }),

/***/ 971:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 972:
/***/ (function(module, exports) {

module.exports = "\n.page {\n  max-width: 960px;\n  height: 100%;\n  margin: 0 auto auto auto;\n  padding: 10px;\n  background-color: #fff;\n  border-left: 1px solid #DDDDDD;\n  border-right: 1px solid #DDDDDD;\n  box-shadow: 0 0 15px #DDDDDD;\n  /*overflow: scroll;*/\n}\n\n.page .panel .media-body {\n  padding: 18px;\n  background-color: #F5F5F5;\n  border-radius: 10px;\n  font-size: 15px;\n  word-break: break-all;\n}\n\n.page .panel .media-body h4.media-heading {\n  color: #999999;\n  font-size: 13px;\n}\n\n.page .panel a.icon-rounded {\n  display: block;\n  font-size: 26px;\n  color: #fff;\n  line-height: normal;\n  text-align: center;\n  margin: 5px;\n  padding: 5px;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n\n.page .panel .media-left a.icon-rounded {\n  background-color: #5cb85c;\n}\n\n.page .panel .media-right a.icon-rounded {\n  background-color: #f0ad4e;\n}\n"

/***/ }),

/***/ 973:
/***/ (function(module, exports) {

module.exports = ".page {\n  max-width: 960px;\n  height: 100%;\n  margin: 0 auto auto auto;\n  padding: 10px;\n  background-color: #fff;\n  border-left: 1px solid #DDDDDD;\n  border-right: 1px solid #DDDDDD;\n  box-shadow: 0 0 15px #DDDDDD;\n}\n\n.page .panel .media-body {\n  padding: 18px;\n  background-color: #F5F5F5;\n  border-radius: 10px;\n  font-size: 15px;\n  word-break: break-all;\n}\n\n.page .panel .media-body h4.media-heading {\n  color: #999999;\n  font-size: 13px;\n}\n\n.page .panel a.icon-rounded {\n  display: block;\n  font-size: 26px;\n  color: #fff;\n  line-height: normal;\n  text-align: center;\n  margin: 5px;\n  padding: 5px;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n\n.page .panel .media-left a.icon-rounded {\n  background-color: #f0ad4e;\n}\n\n.page .panel .media-right a.icon-rounded {\n  background-color: #5cb85c;\n}\n\n.error {color:red;}\n"

/***/ }),

/***/ 974:
/***/ (function(module, exports) {

module.exports = "<!-- <h1>\n  {{title}}\n</h1> -->\n\n<!-- navbar -->\n<div class=\"row\">\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"navbar-header\">\n      <button class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#collapse-target\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"#\" class=\"navbar-brand\">Ng2Chat</a>\n    </div>\n    <div class=\"collapse navbar-collapse\" id=\"collapse-target\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/rest\" routerLinkActive=\"active\">REST</a></li>\n        <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/chat\" routerLinkActive=\"active\">CHAT</a></li>\n      </ul>\n    </div>\n  </nav>\n</div>\n\n<!-- content -->\n<div class=\"row\" style=\"padding:60px 0 0 0\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 975:
/***/ (function(module, exports) {

module.exports = "<!-- <p>\n  chat works!\n</p> -->\n<div class=\"page\">\n  <section class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <div class=\"heading-main\">\n        Ng2Chat\n      </div>\n    </div>\n    <div class=\"panel-body\" style=\"height: 600px; overflow-y: auto;\" #list [scrollTop]=\"list.scrollHeight\">\n      <div *ngFor=\"let comment of comments\">\n        <div *ngIf=\"current_user.userId !== comment.user.userId\" class=\"media\">\n          <div class=\"media-left\">\n            <a href=\"#\" class=\"icon-rounded\" [style.backgroundColor]=\"comment.user.userType == 'kirobo'? '#eb0a1e':'#5cb85c'\">{{comment.user.initial}}</a>\n          </div>\n          <div class=\"media-body\">\n            <h4 class=\"media-heading\">{{comment.user.name}} ({{comment.user.userId}}) {{comment.message.timestamp | date: 'HH時mm分ss秒'}}</h4>\n            <div>{{comment.message.content}}</div>\n          </div>\n        </div>\n        <div *ngIf=\"current_user.userId === comment.user.userId\" class=\"media\">\n          <div class=\"media-body\">\n            <h4 class=\"media-heading\">{{comment.user.name}} ({{comment.user.userId}}) {{comment.message.timestamp | date: 'HH時mm分ss秒'}}</h4>\n            <div>{{comment.message.content}}</div>\n          </div>\n          <div class=\"media-right\">\n            <a href=\"#\" class=\"icon-rounded\">{{comment.user.initial}}</a>\n          </div>\n        </div>\n\n        <hr>\n      </div>\n    </div>\n    <div class=\"panel-footer\">\n      <div class=\"footer-form\">\n        <div style=\"padding: 5px 5px 10px 5px;\">\n          Reply to: <input type=\"text\" class=\"input-text\" [(ngModel)]=\"userId\" placeholder=\"\" size=\"40px\">\n        </div>\n        <div class=\"input-group\">\n          <textarea type=\"text\" class=\"form-control\" rows=3 [(ngModel)]=\"newComment\" placeholder=\"Comment\"></textarea>\n          <span class=\"input-group-btn\" style=\"padding: 0px 0px 0px 10px;\" >\n            <button class=\"btn btn-info\" type=\"submit\" (click)=\"sendComment(newComment);newComment=''\">送信</button>\n          </span>\n        </div>\n      </div>\n    </div>\n  </section>\n</div>\n"

/***/ }),

/***/ 976:
/***/ (function(module, exports) {

module.exports = "<!-- <p>\n  rest works!\n</p> -->\n<div class=\"page\">\n  <section class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <div class=\"heading-main\">\n        REST API\n      </div>\n    </div>\n    <div class=\"panel-body\">\n      <form (ngSubmit)=\"onSubmit()\" #heroForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label for=\"endpoint\">endpoint URL</label>\n          <input type=\"text\" class=\"form-control\" id=\"endpoint\" required [(ngModel)]=\"endpoint\" name=\"endpoint\" #vendpoint=\"ngModel\">\n          <div [hidden]=\"vendpoint.valid || vendpoint.pristine\" class=\"alert alert-danger\">\n            endpoint is required\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"api\">api</label>\n          <input type=\"text\" class=\"form-control\" id=\"api\" required [(ngModel)]=\"api\" name=\"api\" #vapi=\"ngModel\">\n          <div [hidden]=\"vapi.valid || vapi.pristine\" class=\"alert alert-danger\">\n            api is required\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"req\">リクエストボディ</label>\n          <textarea resize-textarea type=\"text\" class=\"form-control\" id=\"request\" [(ngModel)]=\"request\" name=\"request\"></textarea>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"res\">レスポンスボディ</label>\n          <textarea resize-textarea type=\"text\" class=\"form-control\" id=\"respose\" [(ngModel)]=\"respose\" name=\"respose\"></textarea>\n        </div>\n        <button type=\"button\" class=\"btn btn-default\" [disabled]=\"!heroForm.form.valid\" (click)=\"post()\">送信</button>\n      </form>\n      <p class=\"error\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n    </div>\n  </section>\n</div>\n"

/***/ })

},[1245]);
//# sourceMappingURL=main.bundle.map