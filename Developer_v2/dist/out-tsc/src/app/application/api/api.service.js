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
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/catch';
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    ApiService.prototype.GetApi = function (id_app, id_developer, id_app_api, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/application/api', { id_app: id_app, id_developer: id_developer, id_app_api: id_app_api, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    ApiService.prototype.ApplicationApiStatus = function (id_app_api) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/status/', { id_app_api: id_app_api }, { headers: headers })
            .map(this.extractData);
    };
    ApiService.prototype.ApplicationApiGenerateSecretKey = function (id_app_api) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/Update/Secret', { id_app_api: id_app_api }, { headers: headers })
            .map(this.extractData);
    };
    ApiService.prototype.ApiDetail = function (id_developer, id_app_api) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/detail/', { id_developer: id_developer, id_app_api: id_app_api }, { headers: headers })
            .map(this.extractData);
    };
    ApiService.prototype.ApiListByApplication = function (id_developer, id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/dev/', { id_developer: id_developer, id_app: id_app }, { headers: headers })
            .map(this.extractData);
    };
    ApiService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map