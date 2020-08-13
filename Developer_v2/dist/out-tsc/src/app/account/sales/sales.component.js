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
import { SalesService } from './sales.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { ExcelService } from '../../GlobalServices/excel.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var SalesComponent = /** @class */ (function (_super) {
    __extends(SalesComponent, _super);
    function SalesComponent(rest, nav, side, excelService, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.nav = nav;
        _this.side = side;
        _this.excelService = excelService;
        _this.credit = 0;
        return _this;
    }
    SalesComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.DataBindAppAmount();
    };
    SalesComponent.prototype.DataBindAppAmount = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.rest.GetSoldeCreditAmount(this.id_developer.toString(), this.date_developer, toDay).subscribe(function (respond) {
            _this.sales = respond;
            _this.credit = 0;
            for (var i = 0; i < _this.sales.length; i++) {
                _this.summaryCredit += parseFloat(_this.sales[i].solde);
                _this.credit += parseFloat(_this.sales[i].solde) * -1;
                _this.totalCredit = _this.credit.toFixed(3).toString();
            }
        });
    };
    SalesComponent.prototype.CalculateSolde = function (solde) {
        solde = solde * -1;
        return solde;
    };
    SalesComponent.prototype.exportAsXLSX = function () {
        this.excelService.exportAsExcelFile(this.sales, 'SMS MT');
    };
    SalesComponent = __decorate([
        Component({
            selector: 'app-sales',
            templateUrl: './sales.component.html',
            styleUrls: ['./sales.component.scss']
        }),
        __metadata("design:paramtypes", [SalesService, NavbarService, SidebarService, ExcelService, NotifierService, NotificationService])
    ], SalesComponent);
    return SalesComponent;
}(MasterComponent));
export { SalesComponent };
//# sourceMappingURL=sales.component.js.map