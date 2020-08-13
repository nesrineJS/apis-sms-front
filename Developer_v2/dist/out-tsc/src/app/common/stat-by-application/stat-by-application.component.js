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
var StatByApplicationComponent = /** @class */ (function (_super) {
    __extends(StatByApplicationComponent, _super);
    function StatByApplicationComponent(router, rest, datePipe, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.nav = nav;
        _this.side = side;
        _this.entry_date = '';
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
        _this.barChartData = [
            { data: [1], label: 'Your Application' },
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
    StatByApplicationComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.value = [this.todayStart, this.todayEnd];
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
        this.ViewStatByApplication();
        this.barChartData = [
            { data: [1], label: 'Your Application' },
        ];
        this.barChartLabels = [''];
    };
    StatByApplicationComponent.prototype.ViewStatByApplication = function () {
        var _this = this;
        this.barChartData = [
            { data: [1], label: 'Your Application' },
        ];
        this.barChartLabels = [''];
        return this.rest.GetStatByApp(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
            .subscribe(function (res) {
            console.log(res);
            var k = 0;
            var count = res.length;
            for (var i = 0; i < count; i++) {
                _this.barChartData[i].data = ((res[i].nbr_sms_agg.split(","))); //.map(Number)))  
                _this.barChartData[i].label = (res[i].title);
                var labels = res[i].entry_date_agg.split(",");
                for (var j = 0; j < res[i].entry_date_agg.split(",").length; j++) {
                    k += (i + j);
                    _this.barChartLabels[k] = labels[j];
                }
                if (_this.barChartData.length < count) {
                    _this.barChartData.push({ data: [0], label: '' });
                }
                _this.barChartLabels = _this.barChartLabels.filter(function (el, i, a) { return i === a.indexOf(el); });
                //var result=[];
                //for (var i=0,l=this.barChartLabels.length;i<l;i++){
                // result[i]=this.barChartLabels[i]=this.datePipe.transform(this.date, 'yyyy-MM-dd'); }
                // console.log('result:'+result)
                _this.barChartData;
                //this.barChartLabels;
                _this.barChartOptions;
                _this.barChartType = 'bar';
                _this.barChartLegend = true;
                console.log('barchartdate:' + _this.barChartData);
                console.log('barChartLabels:' + _this.barChartLabels);
            }
        });
    };
    StatByApplicationComponent.prototype.back = function () {
        this.router.navigate(['/statistics']);
    };
    StatByApplicationComponent.prototype.chartClicked = function (e) { };
    StatByApplicationComponent.prototype.chartHovered = function (e) {
    };
    StatByApplicationComponent.prototype.SelectTime = function (value) {
        this.p_begin_date = value[0];
        this.p_end_date = value[1];
        /*  this.p_begin_date= this.datePipe.transform(value[0], 'yyyy-MM-dd 00:00:00').toString()
          this.p_end_date= this.datePipe.transform(value[1], 'yyyy-MM-dd 23:59:59').toString()*/
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.ViewStatByApplication();
    };
    StatByApplicationComponent = __decorate([
        Component({
            selector: 'app-stat-by-application',
            templateUrl: './stat-by-application.component.html',
            styleUrls: ['./stat-by-application.component.scss']
        }),
        __metadata("design:paramtypes", [Router, StatisticsService, DatePipe,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], StatByApplicationComponent);
    return StatByApplicationComponent;
}(MasterComponent));
export { StatByApplicationComponent };
//# sourceMappingURL=stat-by-application.component.js.map