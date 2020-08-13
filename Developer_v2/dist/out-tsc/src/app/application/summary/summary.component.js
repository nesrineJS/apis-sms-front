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
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { SoldeService } from 'src/app/common/solde/solde.service';
import { ApiService } from '../api/api.service';
import { SettingsService } from '../settings/settings.service';
import { NotificationService } from '../../_services/';
var SummaryComponent = /** @class */ (function (_super) {
    __extends(SummaryComponent, _super);
    function SummaryComponent(nav, side, ApiService, restAmount, notifierService, SettingsService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.nav = nav;
        _this.side = side;
        _this.ApiService = ApiService;
        _this.restAmount = restAmount;
        _this.SettingsService = SettingsService;
        _this.summaryCountSms = 0;
        _this.summaryCountApp = 0;
        _this.dashboardBarChartlabels = ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27'];
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
        _this.dashboardTrendingBarsChartlabels = ['1', '3', '6', '9', '12', '15'];
        _this.dashboardTrendingBarsChartData = [
            {
                label: 'SNOOZED',
                data: [100, 130, 180, 170, 130, 170],
            }
        ];
        _this.dashboardTrendingBarsChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                        display: false
                    }],
                xAxes: [{
                        display: false,
                        barPercentage: 0.8
                    }]
            }
        };
        _this.dashboardTrendingBarsChartColors = [
            {
                backgroundColor: '#8862e0'
            }
        ];
        return _this;
    }
    SummaryComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.GetDebitSummary();
        this.GetTotalApi();
    };
    SummaryComponent.prototype.GetDebitSummary = function () {
        var _this = this;
        var toDay = new Date();
        var debit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.restAmount.getSoldeDebitAmountByApplication(this.id_developer.toString(), this.id_app.toString(), this.date_developer, toDay).subscribe(function (respond) {
            for (var i = 0; i < respond.length; i++) {
                debit += parseFloat(respond[i].solde);
                _this.summaryDebit = debit.toFixed(3).toString();
            }
        });
    };
    SummaryComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.restAmount.getAppDev(this.id_developer.toString(), this.id_app.toString(), this.date_developer, toDay).subscribe(function (respond) {
            _this.summaryCountApp = respond.length;
            for (var i = 0; i < _this.summaryCountApp; i++) {
                _this.summaryCountSms += parseInt(respond[i].nbr_sms);
            }
        });
    };
    SummaryComponent.prototype.GetTotalApi = function () {
        var _this = this;
        this.ApiService.ApiListByApplication(this.id_developer.toString(), this.id_app.toString()).subscribe(function (Respond) {
            _this.totalApi = Respond.length;
        });
    };
    SummaryComponent.prototype.GetSummaryMode = function (id_app) {
        var _this = this;
        var v_id_app = parseInt(this.id_app);
        this.SettingsService.ApplicationMode(v_id_app).subscribe(function (respond) {
            _this.summaryMode = respond;
            // console.log(this.summaryMode)
        });
    };
    SummaryComponent.prototype.GetSummaryActivation = function (id_app) {
        var _this = this;
        var v_id_app = parseInt(this.id_app);
        this.SettingsService.ApplicationStatus(v_id_app).subscribe(function (respond) {
            _this.summaryActivator = respond;
            //console.log(this.summaryActivator)
        });
    };
    SummaryComponent = __decorate([
        Component({
            selector: 'app-summary',
            templateUrl: './summary.component.html',
            styleUrls: ['./summary.component.scss']
        }),
        __metadata("design:paramtypes", [NavbarService, SidebarService, ApiService,
            SoldeService, NotifierService, SettingsService, NotificationService])
    ], SummaryComponent);
    return SummaryComponent;
}(MasterComponent));
export { SummaryComponent };
//# sourceMappingURL=summary.component.js.map