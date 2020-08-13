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
import { SettingsService } from './settings.service';
import swal from 'sweetalert';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var SettingsComponent = /** @class */ (function (_super) {
    __extends(SettingsComponent, _super);
    function SettingsComponent(rest, toastr, nav, side, route, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.toastr = toastr;
        _this.nav = nav;
        _this.side = side;
        _this.route = route;
        _this.lstlanguageChecked = ";";
        return _this;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        this.id_app = this.id_app.toString();
        this.GetAppDetail();
        this.GetTypeApplication();
        this.GetLanguage();
    };
    SettingsComponent.prototype.GetAppDetail = function () {
        var _this = this;
        this.rest.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(function (respond) {
            var appDetail = respond;
            console.log(respond);
            console.log(appDetail);
            _this.AppTitle = appDetail[0].title;
            _this.AppDescription = appDetail[0].description;
            _this.AppUrl = appDetail[0].url;
            _this.AppStatus = appDetail[0].status;
            _this.AppDate = appDetail[0].entry_date;
            _this.AppMode = appDetail[0].developer_mode;
            _this.AppLang = appDetail[0].language_set;
            _this.AppTypeApp = appDetail[0].id_type_app;
            _this.AppTypeAppValue = appDetail[0].id_type_app;
            _this.lstlanguageChecked = appDetail[0].language_set;
        });
    };
    SettingsComponent.prototype.OnChangeStatus = function (id_app) {
        var _this = this;
        var v_id_app = parseInt(this.id_app);
        this.rest.ApplicationStatus(v_id_app).subscribe(function (respond) {
            _this.appStatus = respond;
        });
    };
    SettingsComponent.prototype.OnChangeMode = function (id_app) {
        var _this = this;
        var v_id_app = parseInt(this.id_app);
        this.rest.ApplicationMode(v_id_app).subscribe(function (respond) {
            _this.appMode = respond;
        });
    };
    SettingsComponent.prototype.GetTypeApplication = function () {
        var _this = this;
        this.rest.GetTypeApplication().subscribe(function (respond) {
            _this.type_applications = respond;
        });
    };
    SettingsComponent.prototype.GetLanguage = function () {
        var _this = this;
        this.rest.GetLanguage().subscribe(function (respond) {
            _this.languages = respond;
        });
    };
    SettingsComponent.prototype.PopupChechBoxChange = function (chkLanguage, event) {
        if (event.target.checked) {
            this.lstlanguageChecked = this.lstlanguageChecked + chkLanguage + ";";
        }
        else {
            this.lstlanguageChecked = this.lstlanguageChecked.replace(chkLanguage + ";", "");
        }
    };
    SettingsComponent.prototype.PopupChechBoxCheck = function (chkLanguage) {
        if (this.AppLang.toString().indexOf(";" + chkLanguage + ";") > -1) {
            return true;
        }
        return false;
    };
    SettingsComponent.prototype.PopupUpdateApplication = function (title, description, url, AppTypeApp, $event) {
        var _this = this;
        this.rest.SaveDetail(this.id_app.toString(), this.id_developer.toString(), title, description, this.lstlanguageChecked, url, AppTypeApp).subscribe(function (respond) {
            _this.saveInfos = respond;
            var btnClosePopup = document.getElementById('btnClosePopup');
            swal({
                title: '',
                text: 'Settings updated successfully!',
                icon: 'success',
            })
                .then(function () {
                setTimeout(location.reload.bind(location), 200);
            });
        });
    };
    SettingsComponent = __decorate([
        Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.scss']
        }),
        __metadata("design:paramtypes", [SettingsService, ToastrManager, NavbarService, SidebarService,
            ActivatedRoute, NotifierService, NotificationService])
    ], SettingsComponent);
    return SettingsComponent;
}(MasterComponent));
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map