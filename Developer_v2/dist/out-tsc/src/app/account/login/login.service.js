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
import { Router } from '@angular/router';
var LoginService = /** @class */ (function () {
    function LoginService(http, myRoute) {
        this.http = http;
        this.myRoute = myRoute;
        this.url = 'http://localhost:3000/core';
    }
    // logout() {
    //   localStorage.removeItem('developer');
    //   localStorage.clear(); 
    //   sessionStorage.removeItem('user_id');
    //   sessionStorage.clear(); 
    //   this.myRoute.navigate(['/login']);
    // }
    LoginService.prototype.GetCheckAuthenticate = function (id_type_auth, email, uid, token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/developerauthentication/checkAutentication', {
            id_type_auth: id_type_auth, email: email, uid: uid, token: token
        }, { headers: headers })
            .map(this.extractData);
    };
    LoginService.prototype.GetAuthenticate = function (firstname, lastname, mobile, username, id_country, email, address, company, birthday_date, profile_picture, password, id_devise, sexe, id_type_auth, uid, token, param1, param2) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/developerauthentication/add/social', {
            firstname: firstname, lastname: lastname, mobile: mobile, username: username, id_country: id_country, email: email, address: address, company: company, birthday_date: birthday_date,
            profile_picture: profile_picture, password: password, id_devise: id_devise, sexe: sexe, id_type_auth: id_type_auth, uid: uid, token: token, param1: param1, param2: param2
        }, { headers: headers }).map(this.extractData);
    };
    LoginService.prototype.VerifToken = function (id_developer, token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + '/developerauthentication/token', { id_developer: id_developer, token: token }, { headers: headers })
            .map(this.extractData);
    };
    LoginService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    LoginService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http, Router])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map