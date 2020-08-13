var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
var WidgetsComponent = /** @class */ (function () {
    function WidgetsComponent() {
        this.gaugeType = "semi";
        this.gaugeValue = 28.3;
        this.gaugeLabel = "Daily average";
        this.gaugeForegroundColor = "#62d896";
        this.gaugeSize = "180";
        this.gaugeThickness = "20";
        this.statisticsGraphlabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
        ];
        this.statisticsGraphOptions = {
            scales: {
                yAxes: [
                    {
                        display: false
                    }
                ],
                xAxes: [
                    {
                        display: false
                    }
                ]
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0
                }
            },
            stepsize: 100
        };
        this.statistics_graph_1_Colors = [
            {
                borderColor: "#8862e0",
                backgroundColor: "rgba(243,240,252,1)"
            }
        ];
        this.statistics_graph_1_Data = [
            {
                label: "Profit",
                data: [3, 9, 7, 5, 7, 2, 8],
                borderWidth: 2
            }
        ];
        this.statistics_graph_2_Colors = [
            {
                borderColor: "#f8c452",
                backgroundColor: "rgba(254,247,232,1)"
            }
        ];
        this.statistics_graph_2_Data = [
            {
                label: "Profit",
                data: [7, 9, 2, 2, 8, 7, 9],
                borderWidth: 2
            }
        ];
        this.statistics_graph_3_Colors = [
            {
                borderColor: "#46a5f4",
                backgroundColor: "rgba(235,245,253,1)"
            }
        ];
        this.statistics_graph_3_Data = [
            {
                label: "Profit",
                data: [5, 4, 7, 2, 9, 2, 8],
                borderWidth: 2
            }
        ];
        this.statistics_graph_4_Colors = [
            {
                borderColor: "#ef6d63",
                backgroundColor: "rgba(253,240,239,1)"
            }
        ];
        this.statistics_graph_4_Data = [
            {
                label: "Profit",
                data: [5, 2, 5, 2, 4, 4, 1],
                borderWidth: 2
            }
        ];
        this.dashboardBarChartlabels = [
            "1",
            "3",
            "6",
            "9",
            "12",
            "15",
            "18",
            "21",
            "24",
            "27"
        ];
        this.dashboardBarChartData = [
            {
                label: "SNOOZED",
                data: [330, 380, 230, 400, 309, 430, 340, 310, 280, 300]
            },
            {
                label: "COMPLETED",
                data: [375, 440, 284, 450, 386, 480, 400, 365, 365, 435]
            },
            {
                label: "OVERDUE",
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
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }
                ],
                xAxes: [
                    {
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
                    }
                ]
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
                backgroundColor: "#8862e0"
            },
            {
                backgroundColor: "#49bbce"
            },
            {
                backgroundColor: "#e7487e"
            }
        ];
        this.productAreaChartlabels = [
            "2013",
            "2014",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018"
        ];
        this.productAreaChartData = [
            {
                label: "Support",
                data: [150, 200, 150, 220, 350, 275, 365]
            },
            {
                label: "Product",
                data: [300, 400, 300, 440, 700, 550, 730]
            }
        ];
        this.productAreaChartOptions = {
            scales: {
                yAxes: [
                    {
                        display: false
                    }
                ],
                xAxes: [
                    {
                        display: false
                    }
                ]
            },
            elements: {
                point: {
                    radius: 3
                },
                line: {
                    tension: 0
                }
            },
            stepsize: 1
        };
        this.productAreaChartColors = [
            {
                backgroundColor: "rgba(52,110,240,0.7)",
                borderColor: "rgba(52,110,240,0.8)"
            },
            {
                backgroundColor: "rgba(0,187,248,0.7)",
                borderColor: "rgba(0,187,248,0.8)"
            }
        ];
        this.totalBalanceChartlabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
        ];
        this.totalBalanceChartData_1 = [
            {
                label: "Balance",
                data: [10, 2, 7, 3, 10, 0, 9, 0],
                borderWidth: 2,
                fill: false
            }
        ];
        this.totalBalanceChartData_2 = [
            {
                label: "Credit",
                data: [4, 1, 7, 4, 1, 8, 2, 8],
                borderWidth: 2,
                fill: false
            }
        ];
        this.totalBalanceChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        display: false
                    }
                ],
                xAxes: [
                    {
                        display: false
                    }
                ]
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            tooltips: {
                enabled: false
            },
            stepsize: 100
        };
        this.totalBalanceChartColors = [
            {
                borderColor: "#3096f3"
            }
        ];
        this.UsersDoughnutChartlabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
        ];
        this.UsersDoughnutChartData = [
            {
                data: [80, 34, 100],
                backgroundColor: ["#62d896", "#8862e0", "#e6eef2"]
            }
        ];
        this.UsersDoughnutChartOptions = {
            cutoutPercentage: 70,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
        this.UsersDoughnutChartColors = [
            {
                backgroundColor: ["#62d896", "#8862e0", "#e6eef2"],
                borderColor: ["#62d896", "#8862e0", "#e6eef2"]
            }
        ];
        this.conversionBarChartlabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7",
            "Day 8",
            "Day 9",
            "Day 10"
        ];
        this.conversionBarChartData = [
            {
                label: "Amount Due",
                data: [39, 19, 25, 16, 31, 39, 12, 18, 33, 24]
            }
        ];
        this.conversionBarChartOptions = {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                responsive: true,
                maintainAspectRatio: true,
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0.03)"
                        }
                    }
                ],
                xAxes: [
                    {
                        display: false,
                        barPercentage: 0.4,
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        };
        this.conversionBarChartColors = [
            {
                backgroundColor: "#3096f3"
            }
        ];
        this.topSellingProductslabels = [
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017"
        ];
        this.topSellingProductsData = [
            {
                label: "Total Profit",
                data: [150, 200, 150, 220, 350, 275, 365],
                borderWidth: 2
            },
            {
                label: "Total Sales",
                data: [300, 400, 300, 440, 700, 550, 730],
                borderWidth: 2
            }
        ];
        this.topSellingProductsOptions = {
            scales: {
                yAxes: [
                    {
                        display: false
                    }
                ],
                xAxes: [
                    {
                        display: false
                    }
                ]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                    radius: 3
                },
                line: {
                    tension: 0
                }
            },
            stepsize: 100
        };
        this.topSellingProductsColors = [
            {
                borderColor: "#2196f3",
                backgroundColor: "#E9F7FB"
            },
            {
                borderColor: "#19d895",
                backgroundColor: "#E9F7FB"
            }
        ];
        this.trafficDoughnutChartlabels = ["Chrome", "Firefox"];
        this.trafficDoughnutChartData = [
            {
                data: [70, 20]
            }
        ];
        this.trafficDoughnutChartOptions = {
            cutoutPercentage: 70,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
        this.trafficDoughnutChartColors = [
            {
                backgroundColor: ["#2196f3", "#62d896"],
                borderColor: ["#2196f3", "#62d896"]
            }
        ];
        this.sourceGraphLabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
        ];
        this.sourceGraphOptions = {
            scales: {
                yAxes: [
                    {
                        display: false
                    }
                ],
                xAxes: [
                    {
                        display: false
                    }
                ]
            },
            elements: {
                point: {
                    radius: 1
                },
                line: {
                    tension: 0
                }
            },
            stepsize: 100
        };
        this.sourceGraphData_1 = [
            {
                label: "Profit",
                data: [1, 3, 7, 4, 1, 9, 6],
                fill: false,
                borderWidth: 2
            }
        ];
        this.sourceGraphColors_1 = [
            {
                borderColor: "#f6af42"
            }
        ];
        this.sourceGraphData_2 = [
            {
                label: "Profit",
                data: [1, 4, 8, 3, 4, 6, 1],
                fill: false,
                borderWidth: 2
            }
        ];
        this.sourceGraphColors_2 = [
            {
                borderColor: "#62d896"
            }
        ];
        this.sourceGraphData_3 = [
            {
                label: "Profit",
                data: [8, 12, 5, 4, 1, 12, 4],
                fill: false,
                borderWidth: 2
            }
        ];
        this.sourceGraphColors_3 = [
            {
                borderColor: "#ee5f56"
            }
        ];
        this.sourceGraphData_4 = [
            {
                label: "Profit",
                data: [6, 9, 3, 4, 2, 5, 6],
                fill: false,
                borderWidth: 2
            }
        ];
        this.sourceGraphColors_4 = [
            {
                borderColor: "#f6af42"
            }
        ];
        this.statisticsChartLabels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7",
            "Day 8",
            "Day 9",
            "Day 10"
        ];
        this.statisticsChartOptions = {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                responsive: true,
                maintainAspectRatio: true,
                yAxes: [
                    {
                        stacked: true,
                        display: false,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0.03)"
                        }
                    }
                ],
                xAxes: [
                    {
                        stacked: true,
                        display: false,
                        barPercentage: 0.3,
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        };
        this.statisticsChartData = [
            {
                label: "Revenue",
                data: [39, 19, 25, 16, 31, 39, 23, 20, 23, 18]
            },
            {
                label: "Sales",
                data: [27, 12, 26, 15, 21, 27, 13, 19, 32, 22]
            }
        ];
        this.statisticsChartColors = [
            {
                backgroundColor: "#62d896"
            },
            {
                backgroundColor: "#3096f3"
            }
        ];
        this.realtimeStatisticsLabels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        this.realtimeStatisticsOptions = {
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
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }
                ],
                xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#354168"
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            display: false
                        },
                        barPercentage: 0.4
                    }
                ]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        };
        this.realtimeStatisticsData = [
            {
                label: "Profit",
                data: [330, 380, 230, 400, 309, 530, 340, 400, 490, 380, 300, 510]
            },
            {
                label: "Target",
                data: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600]
            }
        ];
        this.realtimeStatisticsColors = [
            {
                backgroundColor: "#3096f3"
            },
            {
                backgroundColor: "rgba(238, 242, 245, 1)"
            }
        ];
        this.humanResouceDoughnutChartlabels = ["Human Resources", "Manger", "Other"];
        this.humanResouceDoughnutChartData = [
            {
                data: [20, 80, 85, 45]
            }
        ];
        this.humanResouceDoughnutChartOptions = {
            cutoutPercentage: 75,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
        this.humanResouceDoughnutChartColors = [
            {
                backgroundColor: ["#62d896", "#3096f3", "#ee5f56", "#e6eef2"],
                borderColor: ["#62d896", "#3096f3", "#ee5f56", "#e6eef2"]
            }
        ];
        this.salesPrdictionDoughnutChartLabels = ["Human Resources", "Manger", "Other"];
        this.salesPrdictionDoughnutChartData = [
            {
                data: [185, 85, 65]
            }
        ];
        this.salesPrdictionDoughnutChartOptions = {
            cutoutPercentage: 75,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
        this.salesPrdictionDoughnutChartColors = [
            {
                backgroundColor: ["#3096f3", "#f6af42", "#62d896"],
                borderColor: ["#3096f3", "#f6af42", "#62d896"]
            }
        ];
        this.trafficSourceDoughnutChartLabels = ["Human Resources", "Manger", "Other"];
        this.trafficSourceDoughnutChartData = [
            {
                data: [185, 85, 15]
            }
        ];
        this.trafficSourceDoughnutChartOptions = {
            cutoutPercentage: 75,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
        this.trafficSourceDoughnutChartColors = [
            {
                backgroundColor: ["#e6eef2", "#62d896", "#ee5f56"],
                borderColor: ["#e6eef2", "#62d896", "#ee5f56"]
            }
        ];
    }
    WidgetsComponent.prototype.ngOnInit = function () { };
    WidgetsComponent = __decorate([
        Component({
            selector: "app-widgets",
            templateUrl: "./widgets.component.html",
            styleUrls: ["./widgets.component.scss"]
        }),
        __metadata("design:paramtypes", [])
    ], WidgetsComponent);
    return WidgetsComponent;
}());
export { WidgetsComponent };
//# sourceMappingURL=widgets.component.js.map