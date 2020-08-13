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
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(nav, side) {
        this.nav = nav;
        this.side = side;
        this.collection = [];
        for (var i = 1; i <= 100; i++) {
            this.collection.push("item " + i);
        }
    }
    PaginationComponent.prototype.ngOnInit = function () {
        this.nav.Show();
        this.side.ShowSide();
    };
    PaginationComponent = __decorate([
        Component({
            selector: 'app-pagination',
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.scss']
        }),
        __metadata("design:paramtypes", [NavbarService, SidebarService])
    ], PaginationComponent);
    return PaginationComponent;
}());
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map