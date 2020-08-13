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
import { DatePipe } from '@angular/common';
var DatepickerComponent = /** @class */ (function () {
    function DatepickerComponent(dataPipe) {
        this.dataPipe = dataPipe;
        this.today = new Date(new Date().toDateString());
        this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        this.weekEnd = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        this.monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
        this.monthEnd = this.today;
        this.lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        this.lastEnd = this.today;
        this.yearStart = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
        this.yearEnd = this.today;
    }
    DatepickerComponent.prototype.SelectTime = function (object) {
        console.log(JSON.parse(object));
        //console.log(object.selectedDateValue[1]);
    };
    DatepickerComponent = __decorate([
        Component({
            selector: 'app-datepicker',
            templateUrl: './datepicker.component.html',
            styleUrls: ['./datepicker.component.scss']
        }),
        __metadata("design:paramtypes", [DatePipe])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
export { DatepickerComponent };
//# sourceMappingURL=datepicker.component.js.map