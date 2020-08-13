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
var SoldeService = /** @class */ (function () {
    function SoldeService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    SoldeService.prototype.getAppDev = function (id_developer, id_app, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/application', { id_developer: id_developer, id_app: id_app, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    SoldeService.prototype.getSoldeDebitAmount = function (id_developer, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/developer/debit', { id_developer: id_developer, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    SoldeService.prototype.getSoldeDebitAmountByApplication = function (id_developer, id_app, begin_date, end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/application', { id_developer: id_developer, id_app: id_app, begin_date: begin_date, end_date: end_date }, { headers: headers })
            .map(this.extractData);
    };
    SoldeService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    SoldeService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], SoldeService);
    return SoldeService;
}());
export { SoldeService };
//# sourceMappingURL=solde.service.js.map