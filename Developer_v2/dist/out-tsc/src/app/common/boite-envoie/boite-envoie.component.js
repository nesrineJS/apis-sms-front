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
import { BoiteEnvoieService } from './boite-envoie.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../GlobalServices/excel.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { PagerService, NotificationService } from '../../_services/';
var BoiteEnvoieComponent = /** @class */ (function (_super) {
    __extends(BoiteEnvoieComponent, _super);
    /* first = this.toDayDate.getDate() - this.toDayDate.getDay();
     last = this.first + 6; // last day is the first day + 6

     firstWeek = new Date(this.toDayDate.setDate(this.first));
     lastWeek = new Date(this.toDayDate.setDate(this.last));
     currentYear = this.toDayDate.getFullYear();
     currentMonth = this.toDayDate.getMonth();
     firstMonthDay = new Date(this.currentYear, this.currentMonth, 1);
     lastMonthDay = new Date(this.currentYear, this.currentMonth + 1, 0);
     searchDateBegin = this.datePipe.transform(this.toDayDate, 'yyyy-MM-dd 00:00:00').toString();
     searchDateEnd = this.datePipe.transform(this.toDayDate, 'yyyy-MM-dd 23:59:59').toString();

     lstTimeSearch = [  {  label: 'Today',
       begin: ( this.datePipe.transform(this.toDayDate, 'yyyy-MM-dd 00:00:00')).toString(),
       end: ( this.datePipe.transform(this.toDayDate, 'yyyy-MM-dd 23:59:59')).toString()},
       {label: 'This Week',
         begin: ( this.datePipe.transform(this.firstWeek, 'yyyy-MM-dd 00:00:00')).toString(),
         end: ( this.datePipe.transform(this.lastWeek, 'yyyy-MM-dd 23:59:59')).toString()},
       {label: ' This Month',
         begin: ( this.datePipe.transform(this.firstMonthDay, 'yyyy-MM-dd 00:00:00 ')).toString(),
         end: ( this.datePipe.transform(this.lastMonthDay, 'yyyy-MM-dd 23:59:59')).toString()},
       {label: 'This Year',
         begin: ( this.datePipe.transform(this.currentYear, this.currentYear + '-01-01 00:00:00')).toString(),
         end: ( this.datePipe.transform(this.currentYear, this.currentYear + '-12-31 23:59:59')).toString()},
       {label: 'Custumize Time',
         begin: '#',
         end: '#'},
     ];*/
    function BoiteEnvoieComponent(rest, datePipe, excelService, nav, side, notifierService, pagerService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.datePipe = datePipe;
        _this.excelService = excelService;
        _this.nav = nav;
        _this.side = side;
        _this.pagerService = pagerService;
        _this.fixedSizeData = Array(10000).fill(30);
        _this.searchKeyword = "";
        _this.searchDlr = "";
        _this.searchCountry = "";
        _this.searchStatus = "";
        _this.nbrMessageMt = 0;
        _this.nbrPage = 0;
        _this.PAGE_ROW_LENGTH = 5;
        // pager object
        _this.pager = {};
        _this.nbrSMS = 0;
        _this.p = [];
        _this.ddlValueCountry = 'Select Country';
        _this.ddlValueDlrType = 'Select Dlr';
        _this.ddlValueStatus = 'Select Status';
        _this.ddlValueDate = 'Today';
        _this.toDayDate = new Date();
        //page:any;
        _this.date = new Date();
        _this.today = new Date(new Date().toDateString());
        _this.todayStart = _this.datePipe.transform(_this.date, 'yyyy-MM-dd 00:00:00').toString();
        _this.todayEnd = _this.datePipe.transform(_this.date, 'yyyy-MM-dd 23:59:59').toString();
        _this.weekStart = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
        _this.weekEnd = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate() - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
        _this.monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
        _this.monthEnd = _this.today;
        _this.lastStart = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
        _this.lastEnd = _this.today;
        _this.yearStart = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
        _this.yearEnd = _this.today;
        _this.GetCountryService();
        return _this;
    }
    BoiteEnvoieComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.GetViewByCountry(this.id_developer);
        //  this.p_begin_date= this.today;
        //  this.p_end_date= this.today; 
        this.GetViewCountBySMSMT();
        //this.GetViewPaginationBySMSMT(this.page);
        this.value = [this.todayStart, this.todayEnd];
        this.p_begin_date = this.todayStart;
        this.p_end_date = this.todayEnd;
    };
    // GetSmsMt() {
    //       const toDay = new Date();
    //       toDay.setDate( toDay.getDate() + 3 );
    //       this.rest.GetSmsMt(this.searchKeyword,this.id_developer.toString(),  this.searchDlr, this.searchCountry, this.searchStatus,this.date_developer, toDay,page, row).subscribe(respond => {
    //       this.resultSmsMt = respond;
    //       this.count= this.resultSmsMt.length
    //       this.nbrSMS = 0;
    //       for(let i=0; i < this.count;i++){    
    //             this.nbrSMS +=this.resultSmsMt[i].nbr_sms=parseInt(this.resultSmsMt[i].nbr_sms)
    //         }                                     
    //     });   
    // }
    BoiteEnvoieComponent.prototype.GetCountryService = function () {
        var _this = this;
        this.rest.GetCountry().subscribe(function (respond) {
            _this.countries = respond;
        });
    };
    BoiteEnvoieComponent.prototype.GetViewByCountry = function (id_developer) {
        var _this = this;
        this.rest.GetViewByCountry(id_developer.toString()).subscribe(function (respond) {
            _this.countries = respond;
        });
    };
    BoiteEnvoieComponent.prototype.GetViewCountBySMSMT = function () {
        //this.p_begin_date = '2017-01-01 00:00:00';
        //this.p_end_date = '2020-01-01 00:00:00';
        var _this = this;
        this.rest.GetViewCount(this.searchKeyword, this.id_developer.toString(), '', '', '', this.searchDlr, '', this.searchCountry, this.searchStatus, this.p_begin_date, this.p_end_date).subscribe(function (respond) {
            _this.countSMS = respond;
            //console.log(this.countSMS);
            _this.nbrMessageMt = _this.countSMS[0].nbr_message;
            _this.nbrPage = _this.nbrMessageMt / _this.PAGE_ROW_LENGTH;
            _this.nbrSMS = _this.countSMS[0].nbr_sms;
            // if(Math.round(this.nbrPage) > this.nbrPage )
            // {
            //   this.nbrPage = Math.round(this.nbrPage);
            // }
            // else if (Math.round(this.nbrPage) < this.nbrPage)
            // {
            //   this.nbrPage = Math.round(this.nbrPage) + 1;
            // }           
            // console.log('********COUNT*****************');
            // console.log(this.nbrPage);
            // if(this.nbrPage > 0)
            // {
            //   this.GetViewPaginationBySMSMT(1);
            // }
            // else
            // {
            //   console.log("PAS DE RESULTAT")
            // }  
            _this.setPage(1);
        });
    };
    BoiteEnvoieComponent.prototype.setPage = function (page) {
        this.pager = this.pagerService.getPager(this.nbrMessageMt, page, this.PAGE_ROW_LENGTH);
        this.GetViewPaginationBySMSMT(page);
        // get current page of items
        //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    BoiteEnvoieComponent.prototype.GetViewPaginationBySMSMT = function (page) {
        //this.p_begin_date = '2017-01-01 00:00:00';
        //this.p_end_date = '2020-01-01 00:00:00';
        var _this = this;
        this.rest.GetViewPagination(this.searchKeyword, this.id_developer.toString(), '', '', '', this.searchDlr, '', this.searchCountry, this.searchStatus, this.p_begin_date, this.p_end_date, page, this.PAGE_ROW_LENGTH).subscribe(function (respond) {
            _this.pagination = respond;
            // this.count= this.pagination.length
            //        for(let i=0; i < this.count;i++){    
            //            this.nbrSMS +=this.pagination[i].nbr_sms=parseInt(this.pagination[i].nbr_sms)
            //         } 
            //console.log('********PAGE*****************');
            //console.log(this.pagination);
        });
    };
    BoiteEnvoieComponent.prototype.GetStatusText = function (status, send_date) {
        switch (status) {
            case '1':
                return 'sent ( ' + send_date + ' )';
            case '0':
                return 'untreated  ( ' + send_date + ' )';
            case '2':
                return 'error  ( ' + send_date + ' )';
            case '3':
                return 'suspended  ( ' + send_date + ' )';
        }
    };
    BoiteEnvoieComponent.prototype.GetDlrText = function (dlr_type, dlr_date) {
        switch (dlr_type) {
            case 'DELIVRD':
                return 'DELIVRD  ( ' + dlr_date + ' )';
            case 'UNDELIV':
                return 'UNDELIV  ( ' + dlr_date + ' )';
            case 'EXPIRED':
                return 'EXPIRED  ( ' + dlr_date + ' )';
            case 'REJECTED':
                return 'REJECTED  ( ' + dlr_date + ' )';
        }
    };
    /*SelectTime(object) {
      //console.log((object['checkedValue']));

      this.p_begin_date= object.checkedValue[0];
      this.p_end_date= object.checkedValue[1];
    
     // console.log(this.p_begin_date);
     // console.log(this.p_end_date);
    
      this.GetViewCountBySMSMT();
    }*/
    BoiteEnvoieComponent.prototype.SelectTime = function (value) {
        this.p_begin_date = value[0];
        this.p_end_date = value[1];
        console.log(this.p_begin_date);
        console.log(this.p_end_date);
        this.GetViewCountBySMSMT();
    };
    BoiteEnvoieComponent.prototype.SelectCountry = function (id_country, label) {
        this.ddlValueCountry = label;
        this.searchCountry = id_country;
        this.GetViewCountBySMSMT();
    };
    BoiteEnvoieComponent.prototype.SelectDlrType = function (dlr_type) {
        this.searchDlr = dlr_type;
        if (dlr_type == '')
            dlr_type = 'All Dlr ...';
        this.ddlValueDlrType = dlr_type;
        this.GetViewCountBySMSMT();
    };
    BoiteEnvoieComponent.prototype.SelectStatus = function (status, label) {
        this.ddlValueStatus = label;
        this.searchStatus = status;
        this.GetViewCountBySMSMT();
    };
    BoiteEnvoieComponent.prototype.SelectKeyWord = function (keyword) {
        this.searchKeyword = keyword;
        this.GetViewCountBySMSMT();
    };
    BoiteEnvoieComponent.prototype.exportAsXLSX = function () {
        this.excelService.exportAsExcelFile(this.pagination, 'SMS MT');
    };
    BoiteEnvoieComponent = __decorate([
        Component({
            selector: 'app-boite-envoie',
            templateUrl: './boite-envoie.component.html',
            styleUrls: ['./boite-envoie.component.scss']
        }),
        __metadata("design:paramtypes", [BoiteEnvoieService, DatePipe, ExcelService,
            NavbarService, SidebarService, NotifierService,
            PagerService, NotificationService])
    ], BoiteEnvoieComponent);
    return BoiteEnvoieComponent;
}(MasterComponent));
export { BoiteEnvoieComponent };
//# sourceMappingURL=boite-envoie.component.js.map