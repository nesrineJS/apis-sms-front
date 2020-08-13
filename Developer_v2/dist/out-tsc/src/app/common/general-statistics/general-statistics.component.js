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
import { StatisticsService } from './statistics.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var GeneralStatisticsComponent = /** @class */ (function (_super) {
    __extends(GeneralStatisticsComponent, _super);
    function GeneralStatisticsComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.id_app_api = '';
        _this.items = '';
        _this.date = new Date();
        _this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        _this.weekEnding = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        _this.weekEnd = _this.datePipe.transform(_this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
        _this.doughnutChartLabels = [];
        _this.doughnutChartData = [];
        _this.lineChartType = 'line';
        _this.barChartLabels = [];
        _this.lineChartLabels = [];
        _this.barChartData = [
            { data: [], label: ' ' },
        ];
        _this.lineChartData = [
            { data: [], label: 'Total SMS' }
        ];
        _this.polarAreaChartData = [];
        _this.polarAreaChartLabels = [];
        _this.lineChartOptions = {
            responsive: true
        };
        _this.lineChartColors = [
            {
                backgroundColor: 'rgba(255, 153, 194,0.2)',
                borderColor: 'rgba(255, 0, 102)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(0, 96, 128,0.2)',
                borderColor: 'rgba(0, 153, 204)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(255, 255, 0,0.2)',
                borderColor: 'rgba(204, 204, 0)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        _this.barChartOptions = {
            scaleShowVerticalLines: false,
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
        return _this;
    }
    GeneralStatisticsComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.p_begin_date = this.weekStart;
        this.p_end_date = this.weekEnd;
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByApplication();
        this.ViewStatByCountry();
        this.ViewStatByDay();
        this.ViewStatByDlr();
    };
    GeneralStatisticsComponent.prototype.randomize = function () {
        var data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    };
    GeneralStatisticsComponent.prototype.chartClicked = function (e) { };
    GeneralStatisticsComponent.prototype.chartHovered = function (e) { };
    GeneralStatisticsComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    };
    GeneralStatisticsComponent.prototype.ViewStatByApplication = function () {
        var _this = this;
        return this.rest.GetStatByApplication(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.barChartData[i].data[0] = (parseInt(res[i].nbr_sms, 10));
                _this.barChartData[i].label = res[i].title;
                if (_this.barChartData.length < count) {
                    _this.barChartData.push({ data: [], label: '' });
                }
            }
            _this.barChartOptions;
            _this.barChartType = 'bar';
            _this.barChartLegend = true;
        });
    };
    GeneralStatisticsComponent.prototype.ViewStatByCountry = function () {
        var _this = this;
        return this.rest.GetStatByCountry(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            var countItem = res.length;
            for (var i = 0; i < countItem; i++) {
                _this.items = res[i].label;
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
    GeneralStatisticsComponent.prototype.ViewStatByDay = function () {
        var _this = this;
        return this.rest.GetStatByDay(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            _this.sms_mt = res;
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
    GeneralStatisticsComponent.prototype.ViewStatByDlr = function () {
        var _this = this;
        return this.rest.GetStatByDlr(this.id_developer.toString(), '', this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
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
    GeneralStatisticsComponent.prototype.StatApplications = function () {
        this.router.navigate(['/statistics/application']);
    };
    GeneralStatisticsComponent.prototype.StatSms = function () {
        this.router.navigate(['/statistics/sms']);
    };
    GeneralStatisticsComponent.prototype.StatDlr = function () {
        this.router.navigate(['/statistics/dlr']);
    };
    GeneralStatisticsComponent.prototype.StatCountry = function () {
        this.router.navigate(['/statistics/country']);
    };
    GeneralStatisticsComponent = __decorate([
        Component({
            selector: 'app-general-statistics',
            templateUrl: './general-statistics.component.html',
            styleUrls: ['./general-statistics.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe, NavbarService,
            SidebarService, NotifierService, NotificationService])
    ], GeneralStatisticsComponent);
    return GeneralStatisticsComponent;
}(MasterComponent));
export { GeneralStatisticsComponent };
//# sourceMappingURL=general-statistics.component.js.map