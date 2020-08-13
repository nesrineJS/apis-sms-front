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
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { SettingsService } from '../settings/settings.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ShareWithComponent = /** @class */ (function (_super) {
    __extends(ShareWithComponent, _super);
    /*AppTitle :any;
    AppDescription :any;
    AppUrl :any;
    AppStatus :any;
    AppDate :any;
    AppMode:any;
    AppTypeApp: any;
    AppLang:any;
    AppTypeAppValue: any;
    lstlanguageChecked : string = ";";*/
    function ShareWithComponent(nav, side, restSettings, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.nav = nav;
        _this.side = side;
        _this.restSettings = restSettings;
        return _this;
    }
    ShareWithComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        //this.GetAppDetail();
    };
    ShareWithComponent = __decorate([
        Component({
            selector: 'app-share-with',
            templateUrl: './share-with.component.html',
            styleUrls: ['./share-with.component.scss']
        }),
        __metadata("design:paramtypes", [NavbarService, SidebarService, SettingsService,
            NotifierService, NotificationService])
    ], ShareWithComponent);
    return ShareWithComponent;
}(MasterComponent));
export { ShareWithComponent };
//# sourceMappingURL=share-with.component.js.map