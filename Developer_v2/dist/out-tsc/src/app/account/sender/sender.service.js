var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { HttpParams } from '@angular/common/http';
import { MasterService } from '../../_services/master.service';
var SenderService = /** @class */ (function (_super) {
    __extends(SenderService, _super);
    function SenderService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.url = 'http://localhost:3000/core';
        return _this;
    }
    /********************************Get SENDERS BY DEVELOPER***********************/
    SenderService.prototype.GetSender = function (id_developer) {
        var headers = new Headers({ 'x-access-token': this.x_access_token });
        headers.append('Content-Type', 'application/json');
        params: new HttpParams().append('token', localStorage.getItem('token'));
        return this.http
            .put(this.url + '/sender/dev/', { id_developer: id_developer }, { headers: headers })
            .map(this.extractData);
    };
    /********************************ADD SENDERS BY DEVELOPER***********************/
    SenderService.prototype.AddSender = function (id_developer, sender) {
        // let headers = new Headers();
        var headers = new Headers({ 'x-access-token': this.x_access_token });
        headers.append('Content-Type', 'application/json');
        params: new HttpParams().append('token', localStorage.getItem('token'));
        return this.http
            .put(this.url + '/sender/add/', { id_developer: id_developer, sender: sender }, { headers: headers })
            .map(this.extractData);
    };
    SenderService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    SenderService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    SenderService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], SenderService);
    return SenderService;
}(MasterService));
export { SenderService };
//# sourceMappingURL=sender.service.js.map