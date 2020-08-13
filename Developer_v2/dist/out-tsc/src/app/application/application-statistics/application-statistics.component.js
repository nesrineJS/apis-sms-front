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
import { StatisticsService } from '../../common/general-statistics/statistics.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApplicationStatisticsComponent = /** @class */ (function (_super) {
    __extends(ApplicationStatisticsComponent, _super);
    function ApplicationStatisticsComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.entry_date = '';
        _this.id_app_api = '';
        _this.items = '';
        _this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        _this.weekEnding = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        _this.weekEnd = _this.datePipe.transform(_this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
        _this.lineChartType = 'line';
        _this.barChartLabels = [];
        _this.lineChartLabels = [];
        _this.barChartData = [
            { data: [5, 3], label: 'SOAP' },
            { data: [3], label: 'json' },
            { data: [2], label: 'rest' },
        ];
        _this.doughnutChartLabels = [];
        _this.doughnutChartData = [];
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
    ApplicationStatisticsComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.ViewStatByApi();
        this.ViewStatByCountry();
        this.ViewStatByDay();
        this.ViewStatByDlr();
        this.p_begin_date = this.weekStart;
        this.p_end_date = this.weekEnd;
        this.barChartData = [
            { data: [], label: ' ' },
        ];
        //this.GetAppDetail();
    };
    ApplicationStatisticsComponent.prototype.ViewStatByApi = function () {
        var _this = this;
        return this.rest.GetStatByApi(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            _this.barChartLabels = [];
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.barChartLabels.push(res[i].entry_date);
                _this.barChartData[i].data[i] = (parseInt(res[i].nbr_sms, 10));
                _this.barChartData[i].label = res[i].label;
                if (_this.barChartData.length < count) {
                    _this.barChartData.push({ data: [], label: '' });
                }
            }
            _this.barChartOptions;
            _this.barChartType = 'bar';
            _this.barChartLegend = true;
        });
    };
    ApplicationStatisticsComponent.prototype.ViewStatByCountry = function () {
        var _this = this;
        return this.rest.GetStatByCountry(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
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
    ApplicationStatisticsComponent.prototype.ViewStatByDay = function () {
        var _this = this;
        return this.rest.GetStatByDay(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
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
    ApplicationStatisticsComponent.prototype.ViewStatByDlr = function () {
        var _this = this;
        return this.rest.GetStatByDlr(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
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
    ApplicationStatisticsComponent.prototype.StatApi = function () {
        this.router.navigate(['/application/statistics/api']);
    };
    ApplicationStatisticsComponent.prototype.StatSms = function () {
        //  this.router.navigate(['/sms',this.id_app]);
        this.router.navigate(['/application/statistics/sms']);
    };
    ApplicationStatisticsComponent.prototype.StatDlr = function () {
        this.router.navigate(['/application/statistics/dlr']);
    };
    ApplicationStatisticsComponent.prototype.StatCountry = function () {
        this.router.navigate(['/application/statistics/country']);
    };
    ApplicationStatisticsComponent.prototype.chartClicked = function (e) { };
    ApplicationStatisticsComponent.prototype.chartHovered = function (e) { };
    ApplicationStatisticsComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    };
    ApplicationStatisticsComponent.prototype.randomize = function () {
        // Only Change 3 values
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
    ApplicationStatisticsComponent = __decorate([
        Component({
            selector: 'app-application-statistics',
            templateUrl: './application-statistics.component.html',
            styleUrls: ['./application-statistics.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], ApplicationStatisticsComponent);
    return ApplicationStatisticsComponent;
}(MasterComponent));
export { ApplicationStatisticsComponent };
//# sourceMappingURL=application-statistics.component.js.map