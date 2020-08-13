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
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var BoiteEnvoieService = /** @class */ (function () {
    function BoiteEnvoieService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    BoiteEnvoieService.prototype.GetSmsMt = function (p_keyword, id_developer, dlr_type, id_country, status, p_begin_date, p_end_date) {
        var id_app = '';
        var id_api = '';
        var id_app_api = '';
        var prefix = '';
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/smsMt/developper', { p_keyword: p_keyword, id_developer: id_developer, id_app: id_app, id_api: id_api, id_app_api: id_app_api,
            dlr_type: dlr_type, prefix: prefix,
            id_country: id_country, status: status, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieService.prototype.GetCountry = function () {
        return this.http.get(this.url + '/country').map(this.extractData);
    };
    BoiteEnvoieService.prototype.GetViewByCountry = function (id_developer) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/country/viewbycountry/', { id_developer: id_developer }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieService.prototype.GetViewCount = function (p_keyword, id_developer, id_app, id_api, id_app_api, dlr_type, prefix, id_country, status, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/smsMt/developper/count', { p_keyword: p_keyword, id_developer: id_developer, id_app: id_app, id_api: id_api, id_app_api: id_app_api, dlr_type: dlr_type, prefix: prefix, id_country: id_country, status: status, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieService.prototype.GetViewPagination = function (p_keyword, id_developer, id_app, id_api, id_app_api, dlr_type, prefix, id_country, status, p_begin_date, p_end_date, p_rowspage, p_rowslenght) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/smsMt/developper/pagination', { p_keyword: p_keyword, id_developer: id_developer, id_app: id_app, id_api: id_api, id_app_api: id_app_api, dlr_type: dlr_type, prefix: prefix, id_country: id_country, status: status, p_begin_date: p_begin_date, p_end_date: p_end_date, p_rowspage: p_rowspage, p_rowslenght: p_rowslenght }, { headers: headers })
            .map(this.extractData);
    };
    BoiteEnvoieService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    BoiteEnvoieService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], BoiteEnvoieService);
    return BoiteEnvoieService;
}());
export { BoiteEnvoieService };
//# sourceMappingURL=boite-envoie.service.js.map