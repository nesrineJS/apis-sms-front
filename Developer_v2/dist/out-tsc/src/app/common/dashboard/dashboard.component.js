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
import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { SoldeService } from '../solde/solde.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var DashboardComponent = /** @class */ (function (_super) {
    __extends(DashboardComponent, _super);
    function DashboardComponent(nav, side, restAmount, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.nav = nav;
        _this.side = side;
        _this.restAmount = restAmount;
        _this.summaryCountSms = 0;
        _this.summaryCountApp = 0;
        _this.summaryCountAmount = 0;
        _this.ListOfSMS = [];
        // dashboardBarChartlabels = [];
        //  boucle  this.dashboardBarChartlabels[i] = res[i].entry_date
        //  dashboardBarChartData = [
        // {label: '', data: []},]
        // booce  read res label : title app  et data list de nombre de sms 
        _this.dashboardBarChartlabels = ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27']; // list entry_date
        _this.dashboardBarChartData = [
            {
                label: 'SNOOZED',
                data: [330, 380, 230, 400, 309, 430, 340, 310, 280, 300]
            },
            {
                label: 'COMPLETED',
                data: [375, 440, 284, 450, 386, 480, 400, 365, 365, 435]
            },
            {
                label: 'OVERDUE',
                data: [425, 480, 324, 490, 426, 520, 440, 405, 425, 475]
            }
        ];
        _this.dashboardBarChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                xAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#bdbcbe"
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            display: false
                        },
                        barPercentage: 0.2
                    }]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        };
        _this.dashboardBarChartColors = [
            {
                backgroundColor: '#8862e0',
            },
            {
                backgroundColor: '#49bbce'
            },
            {
                backgroundColor: '#e7487e'
            }
        ];
        return _this;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.GetDebitSummary();
        this.GetAppSummary();
        // this.GetAppTotal(); 
        this.GetPerformance();
    };
    DashboardComponent.prototype.GetDebitSummary = function () {
        var _this = this;
        var toDay = new Date();
        var debit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.restAmount.getSoldeDebitAmount(this.id_developer.toString(), this.date_developer, toDay).subscribe(function (respond) {
            for (var i = 0; i < respond.length; i++) {
                debit += parseFloat(respond[i].solde);
                _this.summaryDebit = debit.toFixed(3).toString();
            }
        });
    };
    DashboardComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        var credit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.restAmount.getAppDev(this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.summaryCountApp = respond.length;
            for (var i = 0; i < _this.summaryCountApp; i++) {
                _this.summaryCountSms += parseInt(respond[i].nbr_sms);
                credit += parseFloat(respond[i].solde);
                _this.summaryCredit = credit.toFixed(3).toString();
            }
        });
    };
    /* GetAppTotal ()  {

       const toDay = new Date();
       toDay.setDate( toDay.getDate() + 3 );

       this.restApp.GetApplication (this.id_developer.toString(),'',this.date_developer,toDay).subscribe(respond => {
       this.applications = respond;
       });
     }*/
    DashboardComponent.prototype.GetPerformance = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        var reducer = function (accumulator, currentValue) { return accumulator + currentValue; };
        this.restAmount.getAppDev(this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.ListOfSMS.splice(0, _this.ListOfSMS.length);
            var count = respond.length;
            for (var i = 0; i < count; i++) {
                _this.ListOfSMS.push(parseInt(respond[i].nbr_sms, 10));
                if (_this.ListOfSMS.length < count) {
                    _this.ListOfSMS.push();
                }
            }
            //console.log('_LIST OF NBR SMS_');
            // console.log(this.ListOfSMS);
            //console.log('_LIST OF MAX NBR SMS_');
            _this.MaxSMS = Math.max.apply(null, _this.ListOfSMS);
            //console.log('_LIST OF SUM NBR SMS_');
            // console.log(this.ListOfSMS.reduce(reducer));
            _this.Total = _this.ListOfSMS.reduce(reducer);
            // console.log('_LIST OF MIN NBR SMS_');
            _this.MinSMS = Math.min.apply(null, _this.ListOfSMS);
            //console.log(this.MinSMS=Math.min.apply(null, this.ListOfSMS)); 
        });
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [NavbarService, SidebarService, SoldeService, NotifierService,
            NotificationService])
    ], DashboardComponent);
    return DashboardComponent;
}(MasterComponent));
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map