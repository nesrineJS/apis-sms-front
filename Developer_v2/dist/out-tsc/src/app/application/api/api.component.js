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
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { SettingsService } from '../settings/settings.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApiComponent = /** @class */ (function (_super) {
    __extends(ApiComponent, _super);
    /*AppTitle :any;
    AppDescription :any;
    AppUrl :any;
    AppStatus :any;
    AppDate :any;
    AppMode:any;
    AppTypeApp: any;
    AppLang:any;
    AppTypeAppValue: any;
    ParentTitle:any;  */
    function ApiComponent(modalService, rest, router, nav, side, notifierService, restSettings, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.modalService = modalService;
        _this.rest = rest;
        _this.router = router;
        _this.nav = nav;
        _this.side = side;
        _this.restSettings = restSettings;
        _this.title = '';
        _this.language_set = '';
        _this.url = '';
        _this.lstlanguageChecked = '';
        _this.id_language = '';
        _this.label = '';
        _this.description = '';
        _this.solde = '';
        _this.show = true;
        _this.nbrSMS = 0;
        _this.soldeApi = 0;
        _this.show = false;
        return _this;
    }
    ApiComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.GetAppSummary();
        //this.GetAppDetail();
    };
    ApiComponent.prototype.GetAppSummary = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.rest.GetApi(this.id_app.toString(), this.id_developer.toString(), '', this.date_developer, toDay).subscribe(function (respond) {
            _this.applications = respond;
        });
    };
    ApiComponent.prototype.OnChangeStatus = function (id_app_api) {
        var _this = this;
        this.rest.ApplicationApiStatus(id_app_api).subscribe(function (respond) {
            _this.apiDetail = respond;
        });
    };
    ApiComponent.prototype.PopupGeneratePassword = function (id_app_api) {
        var _this = this;
        this.rest.ApplicationApiGenerateSecretKey(id_app_api)
            .subscribe(function (respond) {
            _this.apiDetail = respond;
            _this.GetApiDetail(id_app_api);
        });
    };
    ApiComponent.prototype.GetApiDetail = function (id_app_api) {
        var _this = this;
        var p_id_app_api = id_app_api.toString();
        this.rest.ApiDetail(this.id_developer.toString(), p_id_app_api)
            .subscribe(function (respond) {
            _this.apiDetail = respond;
            _this.popupApiLabel = _this.apiDetail[0].label;
            _this.popupApiTitle = _this.apiDetail[0].title;
            _this.popupApiKey = _this.apiDetail[0].key;
            _this.popupApiSecret = _this.apiDetail[0].secret;
            _this.popupApiStatus = _this.apiDetail[0].status;
            _this.popupApiID = _this.apiDetail[0].id_app_api;
            _this.popupApiUrl = _this.apiDetail[0].url;
        });
    };
    ApiComponent.prototype.GotoUrlApiDetails = function (id_api, url) {
        var myurl = id_api + "/" + url;
        this.router.navigateByUrl(myurl).then(function (e) {
            if (e) {
                console.log('Navigation is successful!');
            }
            else {
                console.log('Navigation has failed!');
            }
        });
    };
    ApiComponent.prototype.PopupApiOpen = function (content, id_app_api) {
        var _this = this;
        this.GetApiDetail(id_app_api);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.PopupClose(reason);
        });
    };
    ApiComponent.prototype.PopupClose = function (reason) {
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
    ApiComponent.prototype.PopupCopyInputMessage = function (inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    };
    ApiComponent.prototype.PopupViewPassword = function () {
        this.show = !this.show;
    };
    ApiComponent = __decorate([
        Component({
            selector: 'app-api',
            templateUrl: './api.component.html',
            styleUrls: ['./api.component.scss']
        }),
        __metadata("design:paramtypes", [NgbModal, ApiService, Router, NavbarService, SidebarService, NotifierService,
            SettingsService, NotificationService])
    ], ApiComponent);
    return ApiComponent;
}(MasterComponent));
export { ApiComponent };
//# sourceMappingURL=api.component.js.map