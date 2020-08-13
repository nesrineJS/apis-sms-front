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
var SettingsService = /** @class */ (function () {
    function SettingsService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    SettingsService.prototype.GetApplicationDetail = function (id_developer, id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var keyword = '';
        return this.http
            .put(this.url + '/application/dev/', { id_developer: id_developer, id_app: id_app, keyword: keyword }, { headers: headers })
            .map(this.extractData);
    };
    SettingsService.prototype.ApplicationStatus = function (id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application/status/', { id_app: id_app }, { headers: headers })
            .map(this.extractData);
    };
    SettingsService.prototype.ApplicationMode = function (id_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application/mode/', { id_app: id_app }, { headers: headers })
            .map(this.extractData);
    };
    SettingsService.prototype.GetTypeApplication = function () {
        return this.http.get(this.url + '/typeApplication').map(this.extractData);
    };
    SettingsService.prototype.GetLanguage = function () {
        return this.http.get(this.url + '/language').map(this.extractData);
    };
    SettingsService.prototype.AddLanguage = function (id_language, label, description) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/language/add/', { id_language: id_language, label: label, description: description }, { headers: headers })
            .map(this.extractData);
    };
    SettingsService.prototype.SaveDetail = function (id_app, id_developer, title, description, language_set, url, id_type_app) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/application/Update/', { id_app: id_app, id_developer: id_developer, title: title, description: description, language_set: language_set, url: url, id_type_app: id_type_app }, { headers: headers })
            .map(this.extractData);
    };
    SettingsService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    SettingsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], SettingsService);
    return SettingsService;
}());
export { SettingsService };
//# sourceMappingURL=settings.service.js.map