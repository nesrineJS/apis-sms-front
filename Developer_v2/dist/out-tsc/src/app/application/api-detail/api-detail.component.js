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
import { ApiDetailService } from './api-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApiDetailComponent = /** @class */ (function (_super) {
    __extends(ApiDetailComponent, _super);
    //lstlanguageChecked : string = ";";
    function ApiDetailComponent(rest, route, modalService, toastr, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.route = route;
        _this.modalService = modalService;
        _this.toastr = toastr;
        _this.nav = nav;
        _this.side = side;
        _this.language_set = "php";
        _this.showDetailApiAdded = false;
        /*AppTitle :any;
        AppDescription :any;
        AppUrl :any;
        AppStatus :any;
        AppDate :any;
        AppMode:any;
        AppTypeApp: any;
        AppLang:any;
        AppTypeAppValue: any;
        ParentTitle: any;*/
        _this.show = true;
        _this.show = false;
        return _this;
    }
    ApiDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nav.Show();
        this.side.ShowSide();
        this.id_api = this.route.snapshot.paramMap.get("id_api");
        this.route.paramMap.subscribe(function (params) {
            _this.id_api = params.get("id_api");
        });
        this.GetApiDetailById();
    };
    ApiDetailComponent.prototype.GetApiDetailById = function () {
        var _this = this;
        var apirecommanded;
        this.rest.GetApiDetail(this.id_api).subscribe(function (res) {
            apirecommanded = res;
            _this.apiTitle = apirecommanded[0].title;
            _this.apiTitleToAdd = apirecommanded[0].title;
            _this.apiDescription = apirecommanded[0].description;
            _this.apiBody = apirecommanded[0].body;
            _this.apiVersion = apirecommanded[0].version;
            _this.apiDate = apirecommanded[0].entry_date;
            _this.apiLogo = apirecommanded[0].logo;
            _this.apiNbrApp = apirecommanded[0].nbr_app;
            _this.apiNbrDeveloper = apirecommanded[0].nbr_app;
            _this.apiUrl = apirecommanded[0].url;
            _this.apiStatus = apirecommanded[0].status;
            _this.apiID = apirecommanded[0].id_api;
            _this.apiTypeLabel = apirecommanded[0].label_type_api;
        });
    };
    ApiDetailComponent.prototype.PopupGetApiDetail = function (id_app_api) {
        var _this = this;
        var p_id_app_api = id_app_api.toString();
        var p_id_developer = this.id_developer.toString();
        this.rest.ApiDetail(p_id_developer, p_id_app_api).subscribe(function (respond) {
            var apiDetail = respond;
            _this.popupApiName = apiDetail[0].label;
            _this.popupApiKey = apiDetail[0].key;
            _this.popupApiSecret = apiDetail[0].secret;
            _this.popupApiStatus = apiDetail[0].status;
            _this.popupApiID = apiDetail[0].id_app_api;
            _this.popupApiUrl = apiDetail[0].url;
        });
    };
    ApiDetailComponent.prototype.PopupApiAdd = function (label) {
        var _this = this;
        var v_id_api = parseInt(this.id_api);
        var apiDetail;
        this.rest.ApplicationApiAdd(this.id_app.toString(), v_id_api, this.id_developer.toString(), label)
            .subscribe(function (respond) {
            apiDetail = respond;
            _this.PopupGetApiDetail(apiDetail[0].id_app_api);
            _this.showDetailApiAdded = true;
        });
    };
    ApiDetailComponent.prototype.PopupApiDetailOpen = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.PopupClose(reason);
        });
    };
    ApiDetailComponent.prototype.PopupClose = function (reason) {
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
    ApiDetailComponent.prototype.PopupViewPassword = function () {
        this.show = !this.show;
    };
    ApiDetailComponent.prototype.PopupCopyInputMessage = function (inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    };
    ApiDetailComponent = __decorate([
        Component({
            selector: 'app-api-detail',
            templateUrl: './api-detail.component.html',
            styleUrls: ['./api-detail.component.scss']
        }),
        __metadata("design:paramtypes", [ApiDetailService, ActivatedRoute, NgbModal, ToastrManager,
            NavbarService, SidebarService, NotifierService, NotificationService])
    ], ApiDetailComponent);
    return ApiDetailComponent;
}(MasterComponent));
export { ApiDetailComponent };
//# sourceMappingURL=api-detail.component.js.map