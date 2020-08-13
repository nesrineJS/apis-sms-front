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
import { BehaviorSubject } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('developer')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            var _this = this;
            var md5_developer_id = '';
            // console.log("***************this.currentUserSubject*********************");
            // console.log(this.currentUserSubject);
            if (this.currentUserSubject.value && this.currentUserSubject.value.id_developer) {
                md5_developer_id = Md5.hashStr(this.currentUserSubject.value.id_developer);
                //console.log("***********localStorage**************")
                if (!sessionStorage.getItem('user_id') || (sessionStorage.getItem('user_id') && sessionStorage.getItem('user_id') != md5_developer_id)) {
                    //A VOIR COMMENT RESOUDRE LE PROBLEE DE currentUserSubject
                    //console.log("***********sessionStorage**************")
                    //console.log(this.currentUserSubject.value.id_developer);
                    //console.log(this.currentUserSubject.value.token);
                    this.VerifToken(this.currentUserSubject.value.id_developer, this.currentUserSubject.value.token).subscribe(function (respond) {
                        //console.log(respond);
                        if (respond[0].ctl_developer_authentication_token != 1) {
                            localStorage.clear();
                            sessionStorage.clear();
                            _this.currentUserSubject = new BehaviorSubject(JSON.parse(null));
                        }
                        else {
                            var user_id = Md5.hashStr(_this.currentUserSubject.value.id_developer);
                            sessionStorage.setItem('user_id', user_id.toString());
                        }
                    });
                }
            }
            else if (!this.currentUserSubject.value || !this.currentUserSubject.value.id_developer) {
                localStorage.clear();
                sessionStorage.clear();
                this.currentUserSubject = new BehaviorSubject(JSON.parse(null));
            }
            //console.log(this.currentUserSubject.value);
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.VerifToken = function (id_developer, token) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("VerifToken");
        return this.http.put(this.url + '/developerauthentication/token', { id_developer: id_developer, token: token }, { headers: headers })
            .map(this.extractData);
    };
    AuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('user_id');
        this.currentUserSubject.next(null);
    };
    AuthenticationService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map