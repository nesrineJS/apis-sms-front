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
import { BehaviorSubject } from 'rxjs';
var SuperComponent = /** @class */ (function () {
    function SuperComponent() {
        this.isSlideBar_application = false;
        this.id_app = '0';
        this.id_developer = '';
        this.name_developer = "";
        this.image_developer = "";
        this.sessionToken = "";
        this.isSlideBar_application = false;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('developer')));
        this.currentApplicationSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('application')));
        if (this.currentUserSubject.value && this.currentUserSubject.value.id_developer) {
            this.id_developer = this.currentUserSubject.value.id_developer;
            this.name_developer = this.currentUserSubject.value.name;
            this.image_developer = this.currentUserSubject.value.image;
            this.date_developer = this.currentUserSubject.value.entry_date;
        }
        if (this.currentApplicationSubject.value && this.currentApplicationSubject.value.id_app) {
            this.id_app = this.currentApplicationSubject.value.id_app;
            this.name_app = this.currentApplicationSubject.value.name;
            this.isSlideBar_application = true;
        }
    }
    SuperComponent.prototype.ngOnInit = function () {
    };
    SuperComponent = __decorate([
        Component({
            template: ''
        }),
        __metadata("design:paramtypes", [])
    ], SuperComponent);
    return SuperComponent;
}());
export { SuperComponent };
//# sourceMappingURL=super.component.js.map