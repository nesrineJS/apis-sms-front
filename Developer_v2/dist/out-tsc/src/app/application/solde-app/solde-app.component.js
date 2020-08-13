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
import { Component } from "@angular/core";
import { SoldeAppService } from "./solde-app.service";
import { DatePipe } from '@angular/common';
import { NavbarService } from "src/app/partials/navbar/navbar.service";
import { SidebarService } from "src/app/partials/sidebar/sidebar.service";
import { SettingsService } from "../settings/settings.service";
import { ActivatedRoute } from "@angular/router";
import { MasterComponent } from "src/app/_controler/master.component";
import { NotifierService } from "angular-notifier";
import { NotificationService } from '../../_services/';
var SoldeAppComponent = /** @class */ (function (_super) {
    __extends(SoldeAppComponent, _super);
    function SoldeAppComponent(rest, datePipe, nav, side, restSettings, route, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.restSettings = restSettings;
        _this.route = route;
        _this.summaryCountSms = 0;
        _this.summaryCountApp = 0;
        _this.totalSms = 0;
        _this.totalBilling = 0;
        _this.totalApi = 0;
        _this.lstlanguageChecked = ";";
        _this.ddlValue = 'Today';
        _this.toDayDate = new Date();
        _this.first = _this.toDayDate.getDate() - _this.toDayDate.getDay();
        _this.last = _this.first + 6; // last day is the first day + 6
        _this.firstWeek = new Date(_this.toDayDate.setDate(_this.first));
        _this.lastWeek = new Date(_this.toDayDate.setDate(_this.last));
        _this.currentYear = _this.toDayDate.getFullYear();
        _this.currentMonth = _this.toDayDate.getMonth();
        _this.firstMonthDay = new Date(_this.currentYear, _this.currentMonth, 1);
        _this.lastMonthDay = new Date(_this.currentYear, _this.currentMonth + 1, 0);
        _this.beginDate = _this.datePipe.transform(_this.toDayDate, 'yyyy-MM-dd 00:00:00').toString();
        _this.endDate = _this.datePipe.transform(_this.toDayDate, 'yyyy-MM-dd 23:59:59').toString();
        _this.lstTimeSearch = [{ label: 'Today',
                begin: (_this.datePipe.transform(_this.toDayDate, 'yyyy-MM-dd 00:00:00')).toString(),
                end: (_this.datePipe.transform(_this.toDayDate, 'yyyy-MM-dd 23:59:59')).toString() },
            { label: 'This Week',
                begin: (_this.datePipe.transform(_this.firstWeek, 'yyyy-MM-dd 00:00:00')).toString(),
                end: (_this.datePipe.transform(_this.lastWeek, 'yyyy-MM-dd 23:59:59')).toString() },
            { label: ' This Month',
                begin: (_this.datePipe.transform(_this.firstMonthDay, 'yyyy-MM-dd 00:00:00 ')).toString(),
                end: (_this.datePipe.transform(_this.lastMonthDay, 'yyyy-MM-dd 23:59:59')).toString() },
            { label: 'This Year',
                begin: (_this.datePipe.transform(_this.currentYear, _this.currentYear + '-01-01 00:00:00')).toString(),
                end: (_this.datePipe.transform(_this.currentYear, _this.currentYear + '-12-31 23:59:59')).toString() },
            { label: 'Custumize Time',
                begin: '#',
                end: '#' },
        ];
        return _this;
    }
    SoldeAppComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.DataBindAppAmount(this.beginDate, this.endDate);
        this.GetAppSummary();
    };
    SoldeAppComponent.prototype.DataBindAppAmount = function (begin_date, end_date) {
        var _this = this;
        this.rest.getAppDev(this.id_app.toString(), this.id_developer.toString(), begin_date, end_date).subscribe(function (respond) {
            _this.soldes = respond;
            _this.totalSms = 0;
            _this.totalBilling = 0;
            _this.totalApi = 0;
            for (var i = 0; i < _this.soldes.length; i++) {
                _this.totalSms += parseInt(_this.soldes[i].nbr_sms);
                _this.totalBilling += parseFloat(_this.soldes[i].solde);
                _this.totalApi += parseInt(_this.soldes[i].id_api);
                _this.databindCredit = _this.totalBilling.toFixed(3).toString();
            }
        });
    };
    SoldeAppComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        var credit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.rest.getAppDev(this.id_app.toString(), this.id_developer.toString(), this.date_developer, toDay).subscribe(function (respond) {
            _this.summaryCountApp = respond.length;
            for (var i = 0; i < _this.summaryCountApp; i++) {
                _this.summaryCountSms += parseInt(respond[i].nbr_sms);
                credit += parseFloat(respond[i].solde);
                _this.summaryCredit = credit.toFixed(3).toString();
            }
        });
    };
    SoldeAppComponent.prototype.SelectTime = function (label, begin, end) {
        this.ddlValue = label;
        this.endDate = end;
        this.beginDate = begin;
        this.DataBindAppAmount(begin, end);
    };
    SoldeAppComponent.prototype.CalculatePourcentage = function (value, total) {
        var pourcentage = 0;
        if (total > 0) {
            pourcentage = Math.round((value * 100) / total);
        }
        return pourcentage;
    };
    SoldeAppComponent.prototype.CalculatePourcentageWidth = function (value, total) {
        var pourcentage = 0;
        if (total > 0) {
            pourcentage = Math.round((value * 100) / total);
        }
        var style = pourcentage.toString() + "%";
        return style;
    };
    SoldeAppComponent.prototype.CalculatePourcentageColor = function (value, total) {
        var pourcentage = 0;
        if (total > 0) {
            pourcentage = Math.round((value * 100) / total);
        }
        if (pourcentage < 20) {
            return "progress-bar bg-info";
        }
        else if (pourcentage < 50) {
            return "progress-bar bg-primary";
        }
        else if (pourcentage < 70) {
            return "progress-bar bg-warning";
        }
        else {
            return "progress-bar bg-danger";
        }
    };
    SoldeAppComponent.prototype.GetAppDetail = function () {
        var _this = this;
        this.restSettings.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(function (respond) {
            _this.AppTitle = respond[0].title;
            _this.AppDescription = respond[0].description;
            _this.AppUrl = respond[0].url;
            _this.AppStatus = respond[0].status;
            _this.AppDate = respond[0].entry_date;
            _this.AppMode = respond[0].developer_mode;
            _this.AppLang = respond[0].language_set;
            _this.AppTypeApp = respond[0].id_type_app;
            _this.AppTypeAppValue = respond[0].id_type_app;
            _this.lstlanguageChecked = respond[0].language_set;
        });
    };
    SoldeAppComponent = __decorate([
        Component({
            selector: 'app-solde-app',
            templateUrl: './solde-app.component.html',
            styleUrls: ['./solde-app.component.scss']
        }),
        __metadata("design:paramtypes", [SoldeAppService, DatePipe, NavbarService,
            SidebarService, SettingsService, ActivatedRoute, NotifierService, NotificationService])
    ], SoldeAppComponent);
    return SoldeAppComponent;
}(MasterComponent));
export { SoldeAppComponent };
//# sourceMappingURL=solde-app.component.js.map