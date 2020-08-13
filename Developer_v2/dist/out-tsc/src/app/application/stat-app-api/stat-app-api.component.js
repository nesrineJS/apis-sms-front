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
var StatAppApiComponent = /** @class */ (function (_super) {
    __extends(StatAppApiComponent, _super);
    function StatAppApiComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.notifierService = notifierService;
        _this.searchApi = '';
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
        _this.lstlanguageChecked = ";";
        _this.barChartLabels = [];
        _this.barChartData = [
            { data: [0], label: ' ' }
        ];
        _this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
                yAxes: [{
                        ticks: {
                            min: 0,
                            max: 20,
                            stepSize: 3
                        }
                    }]
            }
        };
        return _this;
    }
    StatAppApiComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.id_app = this.id_app.toString();
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
        this.GetApplicationApi();
        this.ViewStatByApi();
        this.barChartData = [
            { data: [], label: ' ' },
        ];
        this.ddlValueApi = 'Select Api';
        //  this.barChartData=[{ data:[1,2,3,4],label:'Application1'},
        //  { data:[5,6,3,4],label:'Application2'},
        //  { data:[20,6,30,4],label:'Application3'},
        // ]
        //this.barChartLabels=['2018-01-31','2018-05-06','2018-12-31','2019-01-01']
        this.ViewStatByApi();
    };
    StatAppApiComponent.prototype.ViewStatByApi = function () {
        var _this = this;
        this.barChartData = [
            { data: [0], label: '' }
        ];
        this.barChartLabels = [];
        return this.rest.GetStatByApi(this.id_developer.toString(), this.id_app.toString(), this.searchApi, this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            console.log(res);
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.barChartData[i].data = ((res[i].nbr_sms_agg.split(",").map(Number)));
                _this.barChartData[i].label = (res[i].label);
                _this.barChartLabels = (res[i].entry_date_agg.split(","));
                if (_this.barChartData.length < count) {
                    _this.barChartData.push({ data: [], label: '' });
                }
            }
            _this.barChartData;
            _this.barChartLabels;
            _this.barChartOptions;
            _this.barChartType = 'bar';
            _this.barChartLegend = true;
            console.log(_this.barChartData);
            console.log(_this.barChartLabels);
        });
    };
    StatAppApiComponent.prototype.SelectTime = function (object) {
        console.log((object['checkedValue']));
        this.p_begin_date = (object['checkedValue'][0]);
        this.p_end_date = (object['checkedValue'][1]);
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByApi();
    };
    StatAppApiComponent.prototype.back = function () {
        //this.router.navigate(['/application/statistics',this.id_app]);
        this.router.navigate(['/application/statistics']);
    };
    StatAppApiComponent.prototype.chartClicked = function (e) { };
    StatAppApiComponent.prototype.chartHovered = function (e) { };
    StatAppApiComponent.prototype.randomize = function () {
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
    StatAppApiComponent.prototype.GetApplicationApi = function () {
        var _this = this;
        this.rest.GetApplicationApi(this.id_developer.toString(), this.id_app.toString()).subscribe(function (respond) {
            _this.resultAppApi = respond;
        });
    };
    StatAppApiComponent.prototype.SelectApi = function (id_app_api, label) {
        this.ddlValueApi = label;
        this.searchApi = id_app_api.toString();
        this.ViewStatByApi();
    };
    StatAppApiComponent = __decorate([
        Component({
            selector: 'app-stat-app-api',
            templateUrl: './stat-app-api.component.html',
            styleUrls: ['./stat-app-api.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], StatAppApiComponent);
    return StatAppApiComponent;
}(MasterComponent));
export { StatAppApiComponent };
//# sourceMappingURL=stat-app-api.component.js.map