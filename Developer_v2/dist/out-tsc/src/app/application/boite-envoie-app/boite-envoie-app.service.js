var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var BoiteEnvoieAppService = /** @class */ (function () {
    function BoiteEnvoieAppService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    /********************************Get Data by developer from SMS_MT***********************/
    BoiteEnvoieAppService.prototype.GetSmsMt = function (p_keyword, id_developer, id_app, id_app_api, dlr_type, id_country, status, p_begin_date, p_end_date) {
        var id_api = '';
        var prefix = '';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/smsMt/developper', { p_keyword: p_keyword, id_developer: id_developer, id_app: id_app, id_api: id_api, id_app_api: id_app_api, dlr_type: dlr_type, prefix: prefix,
            id_country: id_country, status: status, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieAppService.prototype.GetViewByCountry = function (id_developer) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/country/viewbycountry/', { id_developer: id_developer }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieAppService.prototype.GetApplicationApi = function (id_developer, id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/dev/', { id_developer: id_developer, id_app: id_app }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieAppService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    BoiteEnvoieAppService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    BoiteEnvoieAppService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], BoiteEnvoieAppService);
    return BoiteEnvoieAppService;
}());
export { BoiteEnvoieAppService };
//# sourceMappingURL=boite-envoie-app.service.js.map