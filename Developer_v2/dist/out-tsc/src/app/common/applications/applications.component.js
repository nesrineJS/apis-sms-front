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
import { Component, } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationsService } from './applications.service';
import swal from 'sweetalert';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { SettingsService } from '../../application/settings/settings.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { Application } from 'src/app/_model';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApplicationsComponent = /** @class */ (function (_super) {
    __extends(ApplicationsComponent, _super);
    function ApplicationsComponent(modalService, rest, restService, toastr, router, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.modalService = modalService;
        _this.rest = rest;
        _this.restService = restService;
        _this.toastr = toastr;
        _this.router = router;
        _this.nav = nav;
        _this.side = side;
        _this.end_date = null;
        _this.language_set = "";
        _this.url = "";
        _this.lstlanguageChecked = ";";
        _this.id_language = "";
        _this.label = "";
        _this.description = "";
        _this.show = true;
        _this.application = new Application();
        return _this;
    }
    ApplicationsComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.rest.GetApplication(this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.applications = respond;
        });
    };
    ApplicationsComponent.prototype.GetTypeApplication = function () {
        var _this = this;
        this.rest.GetTypeApplication().subscribe(function (respond) {
            _this.type_applications = respond;
        });
    };
    ApplicationsComponent.prototype.GetLanguage = function () {
        var _this = this;
        this.rest.GetLanguage().subscribe(function (respond) {
            _this.languages = respond;
        });
    };
    ApplicationsComponent.prototype.PopupAddApplication = function (title, description, url, id_type_app, event) {
        var _this = this;
        this.rest.AddApplicationsService(this.id_developer.toString(), title, description, this.lstlanguageChecked, url, id_type_app)
            .subscribe(function (res) {
            var v_application = res.json();
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
            _this.router.navigate(['/api']);
        });
    };
    ApplicationsComponent.prototype.GetAppDetail = function () {
        var _this = this;
        this.restService.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(function (respond) {
            var appDetail = respond;
            _this.AppLang = appDetail[0].language_set;
        });
    };
    ApplicationsComponent.prototype.PopupOpen = function (content) {
        var _this = this;
        this.GetLanguage();
        this.GetTypeApplication();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.PopupClose(reason);
        });
    };
    ApplicationsComponent.prototype.PopupClose = function (reason) {
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
    ApplicationsComponent.prototype.PopupChechBoxChange = function (chkLanguage, event) {
        if (event.target.checked) {
            this.lstlanguageChecked = this.lstlanguageChecked + chkLanguage + ";";
        }
        else {
            this.lstlanguageChecked = this.lstlanguageChecked.replace(chkLanguage + ";", "");
        }
    };
    ApplicationsComponent.prototype.PopupChechBoxCheck = function (chkLanguage) {
        if (this.AppLang.toString().indexOf(";" + chkLanguage + ";") > -1) {
            return true;
        }
        return false;
    };
    ApplicationsComponent.prototype.GoToSettings = function (id_app, title) {
        this.application.id_app = id_app;
        this.application.name = title;
        console.log(sessionStorage.setItem('application', JSON.stringify(this.application)));
        sessionStorage.setItem('application', JSON.stringify(this.application));
        this.router.navigate(['/settings/', this.application.id_app]);
    };
    ApplicationsComponent.prototype.GoToSummary = function (id_app, title) {
        this.application.id_app = id_app;
        this.application.name = title;
        console.log(sessionStorage.setItem('application', JSON.stringify(this.application)));
        sessionStorage.setItem('application', JSON.stringify(this.application));
        this.router.navigate(['/summary/', this.application.id_app]);
    };
    ApplicationsComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.GetAppSummary();
        // this.restService.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
        //   var appDetail = respond;
        //   this.ParentTitle = appDetail[0].title;
        // })
    };
    ApplicationsComponent = __decorate([
        Component({
            selector: 'app-applications',
            templateUrl: './applications.component.html',
            styleUrls: ['./applications.component.scss']
        }),
        __metadata("design:paramtypes", [NgbModal, ApplicationsService, SettingsService, ToastrManager,
            Router, NavbarService, SidebarService, NotifierService, NotificationService])
    ], ApplicationsComponent);
    return ApplicationsComponent;
}(MasterComponent));
export { ApplicationsComponent };
//# sourceMappingURL=applications.component.js.map