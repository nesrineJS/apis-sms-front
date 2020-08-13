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
import { SenderService } from './sender.service';
import swal from 'sweetalert';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var SenderComponent = /** @class */ (function (_super) {
    __extends(SenderComponent, _super);
    function SenderComponent(modalService, rest, toastr, router, nav, side, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.modalService = modalService;
        _this.rest = rest;
        _this.toastr = toastr;
        _this.router = router;
        _this.nav = nav;
        _this.side = side;
        _this.date = "";
        _this.errorMessage = '';
        _this.GetSender();
        return _this;
    }
    SenderComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
    };
    SenderComponent.prototype.GetSender = function () {
        var _this = this;
        var v_id_developer = this.id_developer.toString();
        this.rest.GetSender(v_id_developer).subscribe(function (respond) {
            console.log(respond);
            _this.senders = respond;
        });
    };
    SenderComponent.prototype.OpenPopUp = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    SenderComponent.prototype.PopupAddSender = function (sender, event) {
        var _this = this;
        this.rest.AddSender(this.id_developer.toString(), sender)
            .subscribe(function (respond) {
            _this.senderAdd = respond;
            var btnClosePopup = document.getElementById('btnClosePopup');
            btnClosePopup.click();
            swal({
                title: '',
                text: 'Sender Added successfully!',
                icon: 'success',
            })
                .then(function () {
                setTimeout(location.reload.bind(location), 200);
            });
        });
    };
    SenderComponent.prototype.PopupClose = function (reason) {
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
    SenderComponent.prototype.getDismissReason = function (reason) {
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
    SenderComponent.prototype.getStatusState = function (status) {
        switch (status) {
            case '1':
                return 'activated';
            case '2':
                return 'not permitted ';
            case '0':
                return 'not activated';
        }
    };
    SenderComponent.prototype.calculateClasses = function () {
        return {
            badge: true,
            'badge-success': true,
            'badge-danger': true,
            'badge-warning': true /*this.stateFlag*/
        };
    };
    SenderComponent = __decorate([
        Component({
            selector: 'app-sender',
            templateUrl: './sender.component.html',
            styleUrls: ['./sender.component.scss']
        }),
        __metadata("design:paramtypes", [NgbModal, SenderService, ToastrManager,
            Router, NavbarService, SidebarService, NotifierService, NotificationService])
    ], SenderComponent);
    return SenderComponent;
}(MasterComponent));
export { SenderComponent };
//# sourceMappingURL=sender.component.js.map