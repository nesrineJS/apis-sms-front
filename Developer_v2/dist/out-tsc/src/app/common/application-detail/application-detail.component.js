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
import { ActivatedRoute } from "@angular/router";
import { ApplicationsService } from '../applications/applications.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ApplicationDetailComponent = /** @class */ (function (_super) {
    __extends(ApplicationDetailComponent, _super);
    //create_developer_date = "2017-03-07 10:12:26"; // Todo: Recuperation a partir du session apres authntification
    function ApplicationDetailComponent(rest, route, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.route = route;
        _this.applications = [];
        _this.application = _this.applications[0];
        return _this;
    }
    ApplicationDetailComponent.prototype.ngOnInit = function () {
        this.GetAllApplication();
        /*this.route.params.subscribe(params => {
              this.applications.forEach((p: ApplicationModel) => {
                  if (p.id_app == params.id) {
                      this.application = p;
                  }
              });
          });*/
    };
    ApplicationDetailComponent.prototype.GetAllApplication = function () {
        var _this = this;
        var toDay = new Date();
        toDay.setDate(toDay.getDate() + 3);
        this.rest.GetApplication(this.id_developer.toString(), this.id_app.toString(), this.date_developer, toDay).subscribe(function (respond) {
            _this.applications = respond;
        });
    };
    ApplicationDetailComponent = __decorate([
        Component({
            selector: 'app-application-detail',
            templateUrl: './application-detail.component.html',
            styleUrls: ['./application-detail.component.scss']
        }),
        __metadata("design:paramtypes", [ApplicationsService, ActivatedRoute, NotifierService, NotificationService])
    ], ApplicationDetailComponent);
    return ApplicationDetailComponent;
}(MasterComponent));
export { ApplicationDetailComponent };
//# sourceMappingURL=application-detail.component.js.map