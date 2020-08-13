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
var StatisticsService = /** @class */ (function () {
    function StatisticsService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core/';
    }
    StatisticsService.prototype.GetStatByApplication = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByAppl', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetStatByCountry = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByCountry', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetStatByDay = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByDay', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetStatByDlr = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByDlr', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetStatByApi = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByApi', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetApplicationApi = function (id_developer, id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'application_api/dev/', { id_developer: id_developer, id_app: id_app }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.GetStatByApp = function (id_developer, id_app, id_app_api, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + 'smsMt/statByApp', { id_developer: id_developer, id_app: id_app, id_app_api: id_app_api, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    StatisticsService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    StatisticsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], StatisticsService);
    return StatisticsService;
}());
export { StatisticsService };
//# sourceMappingURL=statistics.service.js.map