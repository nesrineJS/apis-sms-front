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
import { ApiListService } from './api-list.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApiListComponent = /** @class */ (function (_super) {
    __extends(ApiListComponent, _super);
    /*  AppTitle :any;
      AppDescription :any;
      AppUrl :any;
      AppStatus :any;
      AppDate :any;
      AppMode:any;
      AppTypeApp: any;
      AppLang:any;
      AppTypeAppValue: any;
      ParentTitle:any;
      lstlanguageChecked : string = ";";*/
    function ApiListComponent(router, restApi, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.router = router;
        _this.restApi = restApi;
        _this.nav = nav;
        _this.side = side;
        _this.language_set = "php;typescript;ts;javascript;c#;java";
        _this.keyword = "";
        _this.id_language = "";
        _this.id_type_api = "";
        _this.categ_api = "";
        _this.GetApis(_this.keyword, _this.id_language, _this.id_type_api, _this.categ_api);
        _this.GetApisRecommandation(_this.language_set);
        return _this;
    }
    ApiListComponent.prototype.GetApis = function (keyword, id_language, id_type_api, categ_api) {
        var _this = this;
        this.restApi.ViewApis(keyword, id_language, id_type_api, categ_api).subscribe(function (res) {
            _this.allApis = res;
        });
    };
    ApiListComponent.prototype.GetApisRecommandation = function (language_set) {
        var _this = this;
        this.restApi.ViewApisRecommendation(language_set).subscribe(function (res) {
            _this.apirecommanded = res;
        });
    };
    ApiListComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
        //this.GetAppDetail();
    };
    ApiListComponent.prototype.Back = function () {
        this.router.navigate(['./api/', this.id_app]);
    };
    /*GetAppDetail ()  {

      this.restSettings.GetApplicationDetail (this.id_developer.toString(), ''/*this.id_app.toString()*/ /*).subscribe(respond => {
     /* var appDetail = respond;
    
      this.AppTitle =  appDetail[0].title
      this.ParentTitle=this.AppTitle;
      this.AppDescription = appDetail[0].description;
      this.AppUrl = appDetail[0].url;
      this.AppStatus = appDetail[0].status;
      this.AppDate = appDetail[0].entry_date;
      this.AppMode =  appDetail[0].developer_mode;
      this.AppLang =  appDetail[0].language_set;
      this.AppTypeApp =  appDetail[0].id_type_app;
      this.AppTypeAppValue  =  appDetail[0].id_type_app;
      this.lstlanguageChecked = appDetail[0].language_set;
      console.log(this.ParentTitle);

     });
}*/
    ApiListComponent.prototype.GoToApiDetail = function (id_api) {
        //var id_api_detail=parseInt(id_api);
        this.router.navigate(['/api/detail/', id_api]);
    };
    ApiListComponent = __decorate([
        Component({
            selector: 'app-api-list',
            templateUrl: './api-list.component.html',
            styleUrls: ['./api-list.component.scss']
        }),
        __metadata("design:paramtypes", [Router, ApiListService, NavbarService, SidebarService,
            NotifierService, NotificationService])
    ], ApiListComponent);
    return ApiListComponent;
}(MasterComponent));
export { ApiListComponent };
//# sourceMappingURL=api-list.component.js.map