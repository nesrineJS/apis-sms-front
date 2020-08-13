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
import { NotifierService } from 'angular-notifier';
import { SuperComponent } from './super.component';
import { NotificationService } from '../_services';
var MasterComponent = /** @class */ (function (_super) {
    __extends(MasterComponent, _super);
    //protected notificationService: NotificationService;  
    function MasterComponent(notifierService, notificationService) {
        var _this = _super.call(this) || this;
        //const injector = AppInjectorService.getInjector(); 
        //this.notificationService = injector.get(NotificationService);  
        _this.notificationService = notificationService;
        _this.notifier = notifierService;
        return _this;
    }
    MasterComponent.prototype.ngAfterViewInit = function () {
        this.GetNotification();
    };
    MasterComponent.prototype.ngOnInit = function () { };
    MasterComponent.prototype.GetNotification = function () {
        var _this = this;
        var status = '0';
        var count = 0;
        var notifMessage;
        var notifType;
        var notifID;
        this.notificationService.GetNotifications(this.id_developer.toString(), status).subscribe(function (respond) {
            count = respond.length;
            for (var i = 0; i < count; i++) {
                notifMessage = respond[i].body;
                notifType = respond[i].param1;
                notifID = respond[i].id_dev_notif;
                _this.showNotification(notifType, notifMessage, notifID);
                //FUNCTION STATUT ==> notifID
                _this.Status(notifID);
            }
        });
    };
    MasterComponent.prototype.Status = function (notifID) {
        this.notificationService.Status(notifID).subscribe(function (respond) {
        });
    };
    MasterComponent.prototype.showNotification = function (type, message, ident) {
        this.notifier.notify(type, message, ident);
    };
    MasterComponent = __decorate([
        Component({
            template: ''
        }),
        __metadata("design:paramtypes", [NotifierService, NotificationService])
    ], MasterComponent);
    return MasterComponent;
}(SuperComponent));
export { MasterComponent };
//# sourceMappingURL=master.component.js.map