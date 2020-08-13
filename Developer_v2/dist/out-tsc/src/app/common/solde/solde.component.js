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
import { SoldeService } from "./solde.service";
import { DatePipe } from '@angular/common';
import { NavbarService } from "src/app/partials/navbar/navbar.service";
import { SidebarService } from "src/app/partials/sidebar/sidebar.service";
import { MasterComponent } from "src/app/_controler/master.component";
import { NotifierService } from "angular-notifier";
import { NotificationService } from '../../_services/';
var SoldeComponent = /** @class */ (function (_super) {
    __extends(SoldeComponent, _super);
    function SoldeComponent(rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.selectedValue = null;
        _this.summaryCountSms = 0;
        _this.summaryCountApp = 0;
        _this.totalSms = 0;
        _this.totalBilling = 0;
        _this.sld_api = 0;
        _this.nbr_biling = 0;
        _this.ddlValue = 'Today';
        _this.toDayDate = new Date();
        _this.first = _this.toDayDate.getDate() - _this.toDayDate.getDay();
        _this.last = _this.first + 6;
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
    SoldeComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.DataBindAppAmount(this.beginDate, this.endDate);
        this.GetDebitSummary();
        this.GetAppSummary();
    };
    SoldeComponent.prototype.DataBindAppAmount = function (begin_date, end_date) {
        var _this = this;
        this.rest.getAppDev(this.id_developer.toString(), '', begin_date, end_date).subscribe(function (respond) {
            _this.soldes = respond;
            var count = _this.soldes.length;
            _this.totalSms = 0;
            _this.totalBilling = 0;
            for (var i = 0; i < count; i++) {
                _this.totalSms += parseInt(_this.soldes[i].nbr_sms);
                _this.totalBilling += parseFloat(_this.soldes[i].solde);
            }
        });
    };
    SoldeComponent.prototype.GetDebitSummary = function () {
        var _this = this;
        var toDay = new Date();
        var debit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.rest.getSoldeDebitAmount(this.id_developer.toString(), this.date_developer, toDay).subscribe(function (respond) {
            for (var i = 0; i < respond.length; i++) {
                debit += parseFloat(respond[i].solde);
                _this.summaryDebit = debit.toFixed(3).toString();
            }
        });
    };
    SoldeComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        var credit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.rest.getAppDev(this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.summaryCountApp = respond.length;
            for (var i = 0; i < _this.summaryCountApp; i++) {
                _this.summaryCountSms += parseInt(respond[i].nbr_sms);
                credit += parseFloat(respond[i].solde);
                _this.summaryCredit = credit.toFixed(3).toString();
            }
        });
    };
    SoldeComponent.prototype.SelectTime = function (label, begin, end) {
        this.ddlValue = label;
        this.endDate = end;
        this.beginDate = begin;
        this.DataBindAppAmount(begin, end);
    };
    SoldeComponent.prototype.CalculatePourcentage = function (value, total) {
        var pourcentage = 0;
        if (total > 0) {
            pourcentage = Math.round((value * 100) / total);
        }
        return pourcentage;
    };
    SoldeComponent.prototype.CalculatePourcentageWidth = function (value, total) {
        var pourcentage = 0;
        if (total > 0) {
            pourcentage = Math.round((value * 100) / total);
        }
        var style = pourcentage.toString() + "%";
        return style;
    };
    SoldeComponent.prototype.CalculatePourcentageColor = function (value, total) {
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
    SoldeComponent = __decorate([
        Component({
            selector: 'app-solde',
            templateUrl: './solde.component.html',
            styleUrls: ['./solde.component.scss']
        }),
        __metadata("design:paramtypes", [SoldeService, DatePipe, NavbarService, SidebarService,
            NotifierService, NotificationService])
    ], SoldeComponent);
    return SoldeComponent;
}(MasterComponent));
export { SoldeComponent };
//# sourceMappingURL=solde.component.js.map