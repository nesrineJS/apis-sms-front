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
var ApplicationsService = /** @class */ (function () {
    function ApplicationsService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
        // this.SaveLanguage (this.id_language,this.label,this.description) //
    }
    ApplicationsService.prototype.GetApplication = function (id_developer, id_app, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/application', { id_developer: id_developer, id_app: id_app, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    ApplicationsService.prototype.GetTypeApplication = function () {
        return this.http.get(this.url + '/typeApplication').map(this.extractData);
    };
    ApplicationsService.prototype.GetLanguage = function () {
        return this.http.get(this.url + '/language').map(this.extractData);
    };
    ApplicationsService.prototype.AddLanguage = function (id_language, label, description) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/language/add/', { id_language: id_language, label: label, description: description }, { headers: headers })
            .map(this.extractData);
    };
    ApplicationsService.prototype.ViewApplicationsService = function (id_developer, id_app, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/solde/application', { id_developer: id_developer, id_app: id_app, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    ApplicationsService.prototype.AddApplicationsService = function (id_developer, title, description, language_set, url, id_type_app) {
        return this.http.put(this.url + '/application/Add/', { 'id_developer': id_developer, 'title': title,
            'description': description, 'language_set': language_set, 'url': url, 'id_type_app': id_type_app });
    };
    ApplicationsService.prototype.AddNotifcationWeb = function (label, body, type_notif, notif_from, notif_cc, param1) {
        return this.http.put(this.url + '/notification/add/', { 'label': label,
            'body': body,
            'type_notif': type_notif,
            'notif_from': notif_from,
            'notif_cc': notif_cc,
            'param1': param1 });
    };
    ApplicationsService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ApplicationsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], ApplicationsService);
    return ApplicationsService;
}());
export { ApplicationsService };
//# sourceMappingURL=applications.service.js.map