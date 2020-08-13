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
var ChartjsComponent = /** @class */ (function () {
    function ChartjsComponent() {
        this.ChartColors = [
            {
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255,99,132,1)'
            },
            {
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)'
            },
            {
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)'
            },
            {
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)'
            },
            {
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)'
            },
            {
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)'
            }
        ];
        this.Chartlabels = ["2013", "2014", "2014", "2015", "2016", "2017"];
        this.ChartData = [
            {
                label: '# of Votes',
                data: [10, 19, 3, 5, 2, 3],
                borderWidth: 1
            }
        ];
        this.ChartOptions = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        };
        this.lineChartData = [
            {
                label: '# of Votes',
                data: [10, 19, 3, 5, 2, 3],
                borderWidth: 1,
                fill: false
            }
        ];
        this.doughnutChartlabels = ['Pink', 'Blue', 'Yellow'];
        this.doughnutChartData = [
            {
                data: [30, 40, 30]
            }
        ];
        this.doughnutChartOptions = {
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            }
        };
        this.scatteredChartlabels = ['Pink', 'Blue', 'Yellow'];
        this.scatteredChartData = [{
                label: 'First Dataset',
                data: [{
                        x: -10,
                        y: 0
                    },
                    {
                        x: 0,
                        y: 3
                    },
                    {
                        x: -25,
                        y: 5
                    },
                    {
                        x: 40,
                        y: 5
                    }],
                borderWidth: 1
            },
            {
                label: 'Second Dataset',
                data: [{
                        x: 10,
                        y: 5
                    },
                    {
                        x: 20,
                        y: -30
                    },
                    {
                        x: -25,
                        y: 15
                    },
                    {
                        x: -10,
                        y: 5
                    }
                ],
                borderWidth: 1
            }];
        this.scatteredChartOptions = {
            scales: {
                xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
            }
        };
    }
    ChartjsComponent.prototype.ngOnInit = function () {
    };
    ChartjsComponent = __decorate([
        Component({
            selector: 'app-chartjs',
            templateUrl: './chartjs.component.html',
            styleUrls: ['./chartjs.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ChartjsComponent);
    return ChartjsComponent;
}());
export { ChartjsComponent };
//# sourceMappingURL=chartjs.component.js.map