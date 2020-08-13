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
import { Router } from '@angular/router';
import { StatisticsService } from '../general-statistics/statistics.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var StatByCountryComponent = /** @class */ (function (_super) {
    __extends(StatByCountryComponent, _super);
    function StatByCountryComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.entry_date = '';
        _this.id_app_api = '';
        _this.items = '';
        _this.date = new Date();
        _this.today = new Date(new Date().toDateString());
        _this.todayStart = _this.datePipe.transform(_this.date, 'yyyy-MM-dd 00:00:00').toString();
        _this.todayEnd = _this.datePipe.transform(_this.date, 'yyyy-MM-dd 23:59:59').toString();
        _this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        _this.weekEnding = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        _this.weekEnd = _this.datePipe.transform(_this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
        _this.monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
        _this.monthEnd = _this.todayEnd;
        _this.lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        _this.lastEnd = _this.todayEnd;
        _this.yearStart = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
        _this.yearEnd = _this.todayEnd;
        _this.doughnutChartLabels = [];
        _this.doughnutChartData = [];
        return _this;
    }
    StatByCountryComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByCountry();
    };
    StatByCountryComponent.prototype.SelectTime = function (object) {
        console.log((object['checkedValue']));
        this.p_begin_date = (object['checkedValue'][0]);
        this.p_end_date = (object['checkedValue'][1]);
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByCountry();
    };
    StatByCountryComponent.prototype.ViewStatByCountry = function () {
        var _this = this;
        return this.rest.GetStatByCountry(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            _this.doughnutChartLabels = [];
            _this.doughnutChartData.splice(0, _this.doughnutChartData.length);
            _this.countries = res;
            var countt = res.length;
            for (var i = 0; i < countt; i++) {
                _this.items = _this.countries[i].label;
            }
            _this.doughnutChartLabels.push(_this.items);
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.doughnutChartData.push(res[i].nbr_sms);
                _this.doughnutChartLabels.push(res[i].label);
                if (_this.doughnutChartData.length < count) {
                    _this.doughnutChartData.push();
                }
            }
            _this.doughnutChartType = 'doughnut';
        });
    };
    StatByCountryComponent.prototype.chartClicked = function (e) { };
    StatByCountryComponent.prototype.chartHovered = function (e) { };
    StatByCountryComponent.prototype.back = function () { this.router.navigate(['/statistics']); };
    StatByCountryComponent = __decorate([
        Component({
            selector: 'app-stat-by-country',
            templateUrl: './stat-by-country.component.html',
            styleUrls: ['./stat-by-country.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], StatByCountryComponent);
    return StatByCountryComponent;
}(MasterComponent));
export { StatByCountryComponent };
//# sourceMappingURL=stat-by-country.component.js.map