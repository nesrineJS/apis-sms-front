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
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApplicationsService } from '../../common/applications/applications.service';
import { SoldeService } from '../../common/solde/solde.service';
import { MenuComponent } from 'src/app/_controler/';
import { Application } from '../../_model';
import { LoginService } from 'src/app/account/login/login.service';
var SidebarComponent = /** @class */ (function (_super) {
    __extends(SidebarComponent, _super);
    function SidebarComponent(modalService, rest, toastr, router, side, restsolde, authService) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        _this.rest = rest;
        _this.toastr = toastr;
        _this.router = router;
        _this.side = side;
        _this.restsolde = restsolde;
        _this.authService = authService;
        _this.lstlanguageChecked = ";";
        _this.application = new Application();
        return _this;
    }
    SidebarComponent.prototype.GetTypeApplication = function () {
        var _this = this;
        this.rest.GetTypeApplication().subscribe(function (respond) {
            _this.type_applications = respond;
        });
    };
    SidebarComponent.prototype.GetLanguage = function () {
        var _this = this;
        this.rest.GetLanguage().subscribe(function (respond) {
            _this.languages = respond;
        });
    };
    SidebarComponent.prototype.PopupAddApplication = function (title, description, url, id_type_app, event) {
        var _this = this;
        this.rest.AddApplicationsService(this.id_developer.toString(), title, description, this.lstlanguageChecked, url, id_type_app)
            .subscribe(function (res) {
            var v_application = res.json();
            console.log(v_application);
            _this.application.id_app = v_application[0].id_app.toString();
            _this.application.name = v_application[0].title;
            console.log(sessionStorage.setItem('application', JSON.stringify(_this.application)));
            sessionStorage.setItem('application', JSON.stringify(_this.application));
            var btnClosePopup = document.getElementById('btnClosePopup');
            btnClosePopup.click();
            swal({
                title: '',
                text: 'Application Added successfully!',
                icon: 'success',
                timer: 1500,
            });
            _this.router.navigate(['/applications']);
        });
    };
    SidebarComponent.prototype.PopupOpen = function (content) {
        var _this = this;
        this.GetLanguage();
        this.GetTypeApplication();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.PopupClose(reason);
        });
    };
    SidebarComponent.prototype.PopupClose = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    SidebarComponent.prototype.PopupChechBoxChange = function (chkLanguage, event) {
        if (event.target.checked) {
            this.lstlanguageChecked = this.lstlanguageChecked + chkLanguage + ";";
        }
        else {
            this.lstlanguageChecked = this.lstlanguageChecked.replace(chkLanguage + ";", "");
        }
    };
    SidebarComponent.prototype.GetDebitSummary = function () {
        var _this = this;
        var toDay = new Date();
        var debit = 0;
        // var summaryDebit : any;
        toDay.setDate(toDay.getDate() + 3);
        this.restsolde.getSoldeDebitAmount(this.id_developer.toString(), this.date_developer, toDay).subscribe(function (respond) {
            //const soldes = respond;
            //console.log(respond)
            for (var i = 0; i < respond.length; i++) {
                debit += parseFloat(respond[i].solde);
                _this.summaryDebit = debit.toFixed(3).toString();
            }
            //console.log("this is solde of devp 122");
            // console.log(summaryDebit)
        });
    };
    SidebarComponent.prototype.onLogout = function () {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    };
    // GetDeveloper() {
    //   const toDay = new Date();
    //   toDay.setDate( toDay.getDate() + 3 );
    //   this.restprofil.GetDeveloper(this.keyword,this.id_developer.toString(),this.id_country ,this.create_developer_date ,toDay).subscribe(respond => {
    //     var profil = respond;
    //   });
    // }
    // GetAppDetail ()  {
    //   this.restSettings.GetApplicationDetail (this.id_developer.toString(), '').subscribe(respond => {
    //     var appDetail = respond;
    //     console.log("***************respond*******************");
    //     console.log(respond);
    //     console.log("***************respond*******************");
    //     this.AppTitle =  appDetail[0].title
    //     this.ParentTitle=this.AppTitle;
    //     this.AppDescription = appDetail[0].description;
    //     this.AppUrl = appDetail[0].url;
    //     this.AppStatus = appDetail[0].status;
    //     this.AppDate = appDetail[0].entry_date;
    //     this.AppMode =  appDetail[0].developer_mode;
    //     this.AppLang =  appDetail[0].language_set;
    //     this.AppTypeApp =  appDetail[0].id_type_app;
    //     this.AppTypeAppValue  =  appDetail[0].id_type_app;
    //     this.lstlanguageChecked = appDetail[0].language_set;
    //    });
    // }
    SidebarComponent.prototype.ngOnInit = function () {
        this.GetDebitSummary();
    };
    SidebarComponent = __decorate([
        Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
        }),
        __metadata("design:paramtypes", [NgbModal, ApplicationsService, ToastrManager, Router, SidebarService, SoldeService, LoginService])
    ], SidebarComponent);
    return SidebarComponent;
}(MenuComponent));
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map