var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ApiListService = /** @class */ (function () {
    function ApiListService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/core';
    }
    ApiListService.prototype.ViewApis = function (keyword, id_language, id_type_api, categ_api) {
        return this.http.put(this.url + '/api/viewbycriteria/', { 'keyword': keyword, 'id_language': id_language, 'id_type_api': id_type_api,
            'categ_api': categ_api });
    };
    ApiListService.prototype.ViewApisRecommendation = function (language_set) {
        return this.http.put(this.url + '/api/recommendation/', { 'language_set': language_set });
    };
    ApiListService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiListService);
    return ApiListService;
}());
export { ApiListService };
//# sourceMappingURL=api-list.service.js.map