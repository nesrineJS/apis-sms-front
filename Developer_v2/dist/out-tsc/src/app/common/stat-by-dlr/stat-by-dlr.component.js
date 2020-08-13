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
var StatByDlrComponent = /** @class */ (function (_super) {
    __extends(StatByDlrComponent, _super);
    function StatByDlrComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.value = [];
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
        _this.polarAreaChartData = [];
        _this.polarAreaChartLabels = [];
        return _this;
    }
    StatByDlrComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
    };
    StatByDlrComponent.prototype.SelectTime = function (object) {
        console.log((object['checkedValue']));
        this.p_begin_date = (object['checkedValue'][0]);
        this.p_end_date = (object['checkedValue'][1]);
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByDlr();
    };
    StatByDlrComponent.prototype.ViewStatByDlr = function () {
        var _this = this;
        return this.rest.GetStatByDlr(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            _this.polarAreaChartLabels = [];
            _this.polarAreaChartData.splice(0, _this.polarAreaChartData.length);
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.polarAreaChartData.push(parseInt(res[i].nbr_sms, 10));
                _this.polarAreaChartLabels.push(res[i].dlr_type);
                if (_this.polarAreaChartData.length < count) {
                    _this.polarAreaChartData.push();
                }
            }
            _this.polarAreaLegend = true;
            _this.polarAreaChartType = 'polarArea';
        });
    };
    StatByDlrComponent.prototype.back = function () {
        this.router.navigate(['/statistics']);
    };
    StatByDlrComponent.prototype.chartClicked = function (e) { };
    StatByDlrComponent.prototype.chartHovered = function (e) {
    };
    StatByDlrComponent = __decorate([
        Component({
            selector: 'app-stat-by-dlr',
            templateUrl: './stat-by-dlr.component.html',
            styleUrls: ['./stat-by-dlr.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe, NavbarService,
            SidebarService, NotifierService, NotificationService])
    ], StatByDlrComponent);
    return StatByDlrComponent;
}(MasterComponent));
export { StatByDlrComponent };
//# sourceMappingURL=stat-by-dlr.component.js.map