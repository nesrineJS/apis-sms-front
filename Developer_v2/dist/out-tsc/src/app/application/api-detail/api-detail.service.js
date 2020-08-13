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
var ApiDetailService = /** @class */ (function () {
    function ApiDetailService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    ApiDetailService.prototype.GetApiDetail = function (id_api) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/api/detail/', { id_api: id_api }, { headers: headers })
            .map(this.extractData);
    };
    ApiDetailService.prototype.ApplicationApiAdd = function (id_app, id_api, id_developer, label) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/application_api/Add/', { id_app: id_app, id_api: id_api, id_developer: id_developer, label: label }, { headers: headers })
            .map(this.extractData);
    };
    ApiDetailService.prototype.ApiDetail = function (id_developer, id_app_api) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application_api/detail/', { id_developer: id_developer, id_app_api: id_app_api }, { headers: headers })
            .map(this.extractData);
    };
    ApiDetailService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ApiDetailService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], ApiDetailService);
    return ApiDetailService;
}());
export { ApiDetailService };
//# sourceMappingURL=api-detail.service.js.map