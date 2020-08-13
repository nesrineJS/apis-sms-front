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
import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from './navbar.service';
import { LoginService } from 'src/app/account/login/login.service';
import { ApplicationsService } from 'src/app/common/applications/applications.service';
import { MenuComponent } from 'src/app/_controler/';
import { Application } from 'src/app/_model';
import { Router, ActivatedRoute } from '@angular/router';
var NavbarComponent = /** @class */ (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent(config, nav, authService, restApp, router, restWeb, route) {
        var _this = _super.call(this) || this;
        _this.nav = nav;
        _this.authService = authService;
        _this.restApp = restApp;
        _this.router = router;
        _this.restWeb = restWeb;
        _this.route = route;
        _this.loading = false;
        _this.sidebarOpened = false;
        _this.iconOnlyToggled = false;
        config.placement = 'bottom-right';
        _this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        _this.application = new Application();
        return _this;
    }
    NavbarComponent.prototype.toggleOffcanvas = function () {
        this.sidebarOpened = !this.sidebarOpened;
        if (this.sidebarOpened) {
            document.querySelector('.sidebar-offcanvas').classList.add('active');
        }
        else {
            document.querySelector('.sidebar-offcanvas').classList.remove('active');
        }
    };
    NavbarComponent.prototype.toggleIconOnlySidebar = function () {
        this.iconOnlyToggled = !this.iconOnlyToggled;
        if (this.iconOnlyToggled) {
            document.querySelector('body').classList.add('sidebar-icon-only');
        }
        else {
            document.querySelector('body').classList.remove('sidebar-icon-only');
        }
    };
    NavbarComponent.prototype.onLogout = function () {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    };
    NavbarComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.restApp.GetApplication(this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.applications = respond;
        });
    };
    NavbarComponent.prototype.GetApplication = function (event) {
        sessionStorage.removeItem('application');
        this.application.id_app = event.target.value;
        this.application.name = event.target.options[event.target.selectedIndex].text;
        sessionStorage.setItem('application', JSON.stringify(this.application));
        this.router.navigate(['/application/summary/', this.application.id_app]);
    };
    NavbarComponent.prototype.GetDeveloperNotificationWeb = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.restWeb.GetNotificationWeb(this.id_developer.toString(), this.date_developer, toDay, status).subscribe(function (respond) {
            _this.notifications = respond;
            _this.countWeb = _this.notifications.length;
        });
    };
    NavbarComponent.prototype.ngOnInit = function () {
        this.GetAppSummary();
        this.GetDeveloperNotificationWeb();
        if (this.route.snapshot.params['id_app']) {
            this.application.id_app = this.route.snapshot.params['id_app'];
        }
        this.selectedApplication = this.id_app;
    };
    NavbarComponent = __decorate([
        Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss'],
            providers: [NgbDropdownConfig]
        }),
        __metadata("design:paramtypes", [NgbDropdownConfig, NavbarService, LoginService,
            ApplicationsService, Router, NavbarService, ActivatedRoute])
    ], NavbarComponent);
    return NavbarComponent;
}(MenuComponent));
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map