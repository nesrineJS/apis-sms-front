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
var NavbarService = /** @class */ (function () {
    function NavbarService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    NavbarService.prototype.Hide = function () { this.visible = false; };
    NavbarService.prototype.Show = function () { this.visible = true; };
    NavbarService.prototype.GetNotificationWeb = function (id_developer, begin_date, end_date, status) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/developernotification/web', { id_developer: id_developer, begin_date: begin_date, end_date: end_date, status: status }, { headers: headers })
            .map(this.extractData);
    };
    NavbarService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    NavbarService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], NavbarService);
    return NavbarService;
}());
export { NavbarService };
//# sourceMappingURL=navbar.service.js.map