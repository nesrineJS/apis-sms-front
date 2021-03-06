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
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotificationService } from '../../_services/';
var NotificationsComponent = /** @class */ (function (_super) {
    __extends(NotificationsComponent, _super);
    /**
     * Notifier service
     */
    //private notifier: NotifierService;
    /**
     * Constructor
     *
     * @param {NotifierService} notifier Notifier service
     */
    function NotificationsComponent(nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.nav = nav;
        _this.side = side;
        return _this;
        //this.notifier = notifierService;
    }
    // /**
    //  * Show a specific notification (with a custom notification ID)
    //  *
    //  * @param {string} type    Notification type
    //  * @param {string} message Notification message
    //  * @param {string} id      Notification ID
    //  */
    //         public showSpecificNotification( type: string, message: string, id: string ): void {
    //           this.notifier.show( {
    //             id,
    //             message,
    //             type
    //           } );
    //         }
    //     /**
    //      * Hide a specific notification (by a given notification ID)
    //      *
    //      * @param {string} id Notification ID
    //      */
    //     public hideSpecificNotification( id: string ): void {
    //       this.notifier.hide( id );
    //     }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
    };
    NotificationsComponent = __decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.scss']
        }),
        __metadata("design:paramtypes", [NavbarService, SidebarService, NotifierService, NotificationService])
    ], NotificationsComponent);
    return NotificationsComponent;
}(MasterComponent));
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map