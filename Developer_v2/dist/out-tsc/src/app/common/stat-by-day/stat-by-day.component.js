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
var StatByDayComponent = /** @class */ (function (_super) {
    __extends(StatByDayComponent, _super);
    function StatByDayComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.id_app_api = '';
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
        _this.lineChartOptions = {
            responsive: true,
            scales: {
                yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 10
                        }
                    }]
            }
        };
        _this.lineChartLabels = [];
        _this.lineChartType = 'line';
        _this.lineChartData = [{ data: [], label: 'Total SMS' }];
        //public lineChartOptions: any = {responsive: true};
        _this.lineChartColors = [
            {
                // pink
                backgroundColor: 'rgba(255, 153, 194,0.2)',
                borderColor: 'rgba(255, 0, 102)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                // blue
                backgroundColor: 'rgba(0, 96, 128,0.2)',
                borderColor: 'rgba(0, 153, 204)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                // yellow
                backgroundColor: 'rgba(255, 255, 0,0.2)',
                borderColor: 'rgba(204, 204, 0)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        return _this;
    }
    StatByDayComponent.prototype.ngOnInit = function () {
        console.log(this.todayStart);
        console.log(this.todayEnd);
        console.log('**********This Week*****************');
        console.log(this.weekEnd);
        console.log(this.weekStart);
        console.log('**********This month*****************');
        console.log(this.monthEnd);
        console.log(this.monthStart);
        console.log('**********This year*****************');
        console.log(this.yearEnd);
        console.log(this.yearStart);
        this.nav.Show();
        this.side.ShowSide();
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
        this.ViewStatByDay();
        this.lineChartData = [
            { data: [], label: 'Total SMS' }
        ];
    };
    StatByDayComponent.prototype.SelectTime = function (object) {
        console.log((object['checkedValue']));
        this.p_begin_date = (object['checkedValue'][0]);
        this.p_end_date = (object['checkedValue'][1]);
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByDay();
    };
    StatByDayComponent.prototype.ViewStatByDay = function () {
        var _this = this;
        this.lineChartData = [
            { data: [], label: 'Total SMS' }
        ];
        return this.rest.GetStatByDay(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            _this.lineChartLabels = [];
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.lineChartLabels.push(res[i].entry_date);
                _this.lineChartData[0].data[i] = (parseInt(res[i].nbr_sms, 10));
                if (_this.lineChartData.length < count) {
                    parseInt(_this.lineChartData[0].data.push(), 10);
                }
            }
            _this.lineChartOptions;
            _this.lineChartType = 'line';
            _this.lineChartLegend = true;
            _this.lineChartColors;
        });
    };
    StatByDayComponent.prototype.back = function () { this.router.navigate(['/statistics']); };
    StatByDayComponent.prototype.chartClicked = function (e) { };
    StatByDayComponent.prototype.chartHovered = function (e) { };
    StatByDayComponent.prototype.randomizeType = function () { this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line'; };
    StatByDayComponent = __decorate([
        Component({
            selector: 'app-stat-by-day',
            templateUrl: './stat-by-day.component.html',
            styleUrls: ['./stat-by-day.component.scss'],
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], StatByDayComponent);
    return StatByDayComponent;
}(MasterComponent));
export { StatByDayComponent };
//# sourceMappingURL=stat-by-day.component.js.map