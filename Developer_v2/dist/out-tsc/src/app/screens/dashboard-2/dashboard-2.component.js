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
var Dashboard2Component = /** @class */ (function () {
    function Dashboard2Component() {
        this.dashboardBarChartlabels = ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27'];
        this.dashboardBarChartData = [
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
        this.dashboardBarChartOptions = {
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
        this.dashboardBarChartColors = [
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
        this.dashboardTrendingBarsChartlabels = ['1', '3', '6', '9', '12', '15'];
        this.dashboardTrendingBarsChartData = [
            {
                label: 'SNOOZED',
                data: [100, 130, 180, 170, 130, 170],
            }
        ];
        this.dashboardTrendingBarsChartOptions = {
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
        this.dashboardTrendingBarsChartColors = [
            {
                backgroundColor: '#8862e0'
            }
        ];
    }
    Dashboard2Component.prototype.ngOnInit = function () {
    };
    Dashboard2Component = __decorate([
        Component({
            selector: 'app-dashboard-2',
            templateUrl: './dashboard-2.component.html',
            styleUrls: ['./dashboard-2.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], Dashboard2Component);
    return Dashboard2Component;
}());
export { Dashboard2Component };
//# sourceMappingURL=dashboard-2.component.js.map