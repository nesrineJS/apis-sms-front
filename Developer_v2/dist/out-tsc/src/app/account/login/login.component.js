var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { LoginService } from './login.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Developer } from '../../_model/developer';
import { Md5 } from 'ts-md5/dist/md5';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, loginService, nav, side, router) {
        this.authService = authService;
        this.loginService = loginService;
        this.nav = nav;
        this.side = side;
        this.router = router;
        this.loggedIn = new BehaviorSubject(false);
        this.applicationsData = [];
        this.AUTH_TYPE_FACEBOOK = 1;
        this.AUTH_TYPE_GOOGLE = 2;
        this.AUTH_TYPE_LINKEDIN = 4;
        this.AUTH_TYPE_GITHUB = 3;
        this.DEFAULT_CURRENCY = 'DT';
        this.CUURENT_COUNTRY = 'tn';
        this.developer = new Developer();
        // this.authService.authState.subscribe((user) => {
        // this.user = user;
        // }
        // );
    }
    Object.defineProperty(LoginComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.loggedIn.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        this.CkeckDeveloperToken();
    };
    LoginComponent.prototype.SignUpWithGoogle = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((function (userGoogleData) {
            _this.user = userGoogleData;
            _this.firstname = userGoogleData.firstName;
            _this.lastname = userGoogleData.lastName;
            _this.mobile = '';
            _this.username = userGoogleData.name;
            _this.id_country = _this.CUURENT_COUNTRY;
            _this.email = userGoogleData.email;
            _this.address = '';
            _this.company = '';
            _this.birthday_date = '2010-01-01 00:00:00';
            _this.profile_picture = userGoogleData.photoUrl;
            _this.password = '';
            _this.id_devise = _this.DEFAULT_CURRENCY;
            _this.sexe = '';
            _this.id_type_auth = _this.AUTH_TYPE_GOOGLE;
            _this.uid = userGoogleData.id;
            _this.token = userGoogleData.authToken;
            _this.param1 = '';
            _this.param2 = '';
            _this.loginService.GetAuthenticate(_this.firstname, _this.lastname, _this.mobile, _this.username, _this.id_country, _this.email, _this.address, _this.company, _this.birthday_date, _this.profile_picture, _this.password, _this.id_devise, _this.sexe, _this.id_type_auth, _this.uid, _this.token, _this.param1, _this.param2).subscribe(function (respond) {
                console.log(respond);
                _this.developer.name = respond[0].firstname + " " + respond[0].lastname;
                _this.developer.email = respond[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond[0].id_developer;
                _this.developer.image = respond[0].profile_picture;
                _this.developer.entry_date = respond[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                sessionStorage.getItem('');
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                _this.router.navigate(['/dashboard/']);
            });
        }));
        this.loggedIn.next(true);
    };
    LoginComponent.prototype.SignInWithGoogle = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((function (userGoogleData) {
            _this.user = userGoogleData;
            _this.email = userGoogleData.email;
            _this.id_type_auth = _this.AUTH_TYPE_GOOGLE;
            _this.uid = userGoogleData.id;
            _this.token = userGoogleData.authToken;
            _this.loginService.GetCheckAuthenticate(_this.id_type_auth, _this.email, _this.uid, _this.token).subscribe(function (respond) {
                _this.developer = new Developer();
                _this.developer.name = respond.developer_authentication[0].firstname + " " + respond.developer_authentication[0].lastname;
                _this.developer.email = respond.developer_authentication[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond.developer_authentication[0].id_developer;
                _this.developer.image = respond.developer_authentication[0].profile_picture;
                _this.developer.entry_date = respond.developer_authentication[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                sessionStorage.setItem('x-access-token', respond.x_access_token);
                _this.router.navigate(['/dashboard']);
            });
        }));
        this.loggedIn.next(true);
    };
    LoginComponent.prototype.SignInWithFacebook = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((function (userFacebookData) {
            _this.user = userFacebookData;
            if (userFacebookData.email == undefined) {
                _this.email = userFacebookData.id + '@Exemple.com';
            }
            else {
                _this.email = userFacebookData.email;
            }
            _this.id_type_auth = _this.AUTH_TYPE_FACEBOOK;
            _this.uid = userFacebookData.id;
            _this.token = userFacebookData.authToken;
            _this.loginService.GetCheckAuthenticate(_this.id_type_auth, _this.email, _this.uid, _this.token).subscribe(function (respond) {
                _this.developer = new Developer();
                _this.developer.name = respond[0].firstname + " " + respond[0].lastname;
                _this.developer.email = respond[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond[0].id_developer;
                _this.developer.image = respond[0].profile_picture;
                _this.developer.entry_date = respond[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                _this.router.navigate(['/dashboard']);
            });
        }));
        this.loggedIn.next(true);
    };
    LoginComponent.prototype.SignUpWithFacebook = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((function (userFacebookData) {
            _this.user = userFacebookData;
            _this.firstname = userFacebookData.firstName;
            _this.lastname = userFacebookData.lastName;
            _this.mobile = '';
            _this.username = userFacebookData.name;
            _this.id_country = _this.CUURENT_COUNTRY;
            if (userFacebookData.email == undefined) {
                _this.email = userFacebookData.id + '@Exemple.com';
            }
            else {
                _this.email = userFacebookData.email;
            }
            _this.address = '';
            _this.company = '';
            _this.birthday_date = '2010-01-01 00:00:00';
            _this.profile_picture = userFacebookData.photoUrl;
            _this.password = '';
            _this.id_devise = _this.DEFAULT_CURRENCY;
            _this.sexe = '';
            _this.id_type_auth = _this.AUTH_TYPE_FACEBOOK;
            _this.uid = userFacebookData.id;
            _this.token = userFacebookData.authToken;
            _this.param1 = '';
            _this.param2 = '';
            _this.loginService.GetAuthenticate(_this.firstname, _this.lastname, _this.mobile, _this.username, _this.id_country, _this.email, _this.address, _this.company, _this.birthday_date, _this.profile_picture, _this.password, _this.id_devise, _this.sexe, _this.id_type_auth, _this.uid, _this.token, _this.param1, _this.param2).subscribe(function (respond) {
                _this.developer.name = respond[0].firstname + " " + respond[0].lastname;
                _this.developer.email = respond[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond[0].id_developer;
                _this.developer.image = respond[0].profile_picture;
                _this.developer.entry_date = respond[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                _this.router.navigate(['/dashboard/']);
            });
        }));
        this.loggedIn.next(true);
    };
    LoginComponent.prototype.SignUpWithLinkdn = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then((function (userLinkedInData) {
            _this.user = userLinkedInData;
            _this.firstname = userLinkedInData.firstName;
            _this.lastname = userLinkedInData.lastName;
            _this.mobile = '';
            _this.username = userLinkedInData.name;
            _this.id_country = _this.CUURENT_COUNTRY;
            _this.email = userLinkedInData.email;
            _this.address = '';
            _this.company = '';
            _this.birthday_date = '2010-01-01 00:00:00';
            _this.profile_picture = userLinkedInData.photoUrl;
            _this.password = '';
            _this.id_devise = _this.DEFAULT_CURRENCY;
            _this.sexe = '';
            _this.id_type_auth = _this.AUTH_TYPE_LINKEDIN;
            _this.uid = userLinkedInData.id;
            _this.token = userLinkedInData.authToken;
            _this.param1 = '';
            _this.param2 = '';
            _this.loginService.GetAuthenticate(_this.firstname, _this.lastname, _this.mobile, _this.username, _this.id_country, _this.email, _this.address, _this.company, _this.birthday_date, _this.profile_picture, _this.password, _this.id_devise, _this.sexe, _this.id_type_auth, _this.uid, _this.token, _this.param1, _this.param2).subscribe(function (respond) {
                _this.developer.name = respond[0].firstname + " " + respond[0].lastname;
                _this.developer.email = respond[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond[0].id_developer;
                _this.developer.image = respond[0].profile_picture;
                _this.developer.entry_date = respond[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                _this.router.navigate(['/dashboard/']);
            });
        }));
    };
    LoginComponent.prototype.SignInWithLinkedIn = function () {
        var _this = this;
        var toDay = new Date();
        this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then((function (userLinkedInData) {
            _this.user = userLinkedInData;
            if (userLinkedInData.email == undefined) {
                _this.email = userLinkedInData.id + '@Exemple.com';
            }
            else {
                _this.email = userLinkedInData.email;
            }
            _this.id_type_auth = _this.AUTH_TYPE_FACEBOOK;
            _this.uid = userLinkedInData.id;
            _this.token = userLinkedInData.authToken;
            _this.loginService.GetCheckAuthenticate(_this.id_type_auth, _this.email, _this.uid, _this.token).subscribe(function (respond) {
                _this.developer = new Developer();
                _this.developer.name = respond[0].firstname + " " + respond[0].lastname;
                _this.developer.email = respond[0].email;
                _this.developer.auth_date = toDay;
                _this.developer.token = _this.token;
                _this.developer.id_developer = respond[0].id_developer;
                _this.developer.image = respond[0].profile_picture;
                _this.developer.entry_date = respond[0].entry_date;
                localStorage.setItem('developer', JSON.stringify(_this.developer));
                var user_id = Md5.hashStr(_this.developer.id_developer);
                sessionStorage.setItem('user_id', user_id.toString());
                _this.router.navigate(['/dashboard']);
            });
        }));
        this.loggedIn.next(true);
    };
    LoginComponent.prototype.SignOut = function () {
        localStorage.clear();
        sessionStorage.clear();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    };
    LoginComponent.prototype.CkeckDeveloperToken = function () {
        var _this = this;
        var element = localStorage.getItem('developer');
        console.log(element);
        if (element) {
            console.log("IS ELEMENT");
            this.developer = new Developer();
            this.developer = JSON.parse(element);
            this.loginService.VerifToken(this.developer.id_developer, this.developer.token).subscribe(function (respond) {
                console.log(respond);
                if (respond[0].ctl_developer_authentication_token == 1) {
                    _this.router.navigate(['/dashboard']);
                }
            });
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService, LoginService, NavbarService, SidebarService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map