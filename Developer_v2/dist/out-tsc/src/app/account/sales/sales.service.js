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
var SalesService = /** @class */ (function () {
    function SalesService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    SalesService.prototype.GetSoldeCreditAmount = function (id_developer, p_begin_date, p_end_date) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + '/solde/developer/credit', { id_developer: id_developer, p_begin_date: p_begin_date, p_end_date: p_end_date }, { headers: headers })
            .map(this.extractData);
    };
    SalesService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    SalesService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], SalesService);
    return SalesService;
}());
export { SalesService };
//# sourceMappingURL=sales.service.js.map