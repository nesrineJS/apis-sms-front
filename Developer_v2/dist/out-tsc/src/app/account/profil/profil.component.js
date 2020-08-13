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
import { ProfilService } from './profil.service';
//import { FileUploader } from 'ng2-file-upload';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import swal from 'sweetalert';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { MasterComponent } from 'src/app/_controler/master.component';
import { Developer } from 'src/app/_model';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
var ProfilComponent = /** @class */ (function (_super) {
    __extends(ProfilComponent, _super);
    function ProfilComponent(rest, nav, side, toastr, http, notifierService, notificationService) {
        var _this = _super.call(this, notifierService, notificationService) || this;
        _this.rest = rest;
        _this.nav = nav;
        _this.side = side;
        _this.toastr = toastr;
        _this.http = http;
        _this.keyword = "";
        _this.id_country = "";
        _this.create_developer_date = "2017-03-07 10:12:26";
        _this.end_date = "2020-01-12 00:00:00";
        _this.developer = new Developer;
        return _this;
    }
    ProfilComponent.prototype.ngOnInit = function () {
        this.GetDeveloper();
        this.GetCountryService();
        this.nav.Show();
        this.side.ShowSide();
    };
    /* onSelectFile(event) {

        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]);

          reader.onload = (event) => {

          }
        }
     }*/
    ProfilComponent.prototype.GetDeveloper = function () {
        var _this = this;
        var toDay = new Date();
        var credit = 0;
        toDay.setDate(toDay.getDate() + 3);
        this.rest.GetDeveloper(this.keyword, this.id_developer.toString(), this.id_country, this.create_developer_date, toDay)
            .subscribe(function (respond) {
            var profil = respond;
            _this.profilFirstname = profil[0].firstname;
            _this.profiLastname = profil[0].lastname;
            _this.profilMobile = profil[0].mobile;
            _this.profilEmail = profil[0].email;
            _this.profilUsername = profil[0].username;
            _this.profilAddress = profil[0].address;
            _this.profilCountry = profil[0].country_label;
            _this.profilBirthDay = profil[0].birthday_date;
            _this.profilGender = profil[0].sexe;
            _this.profilCompany = profil[0].company;
            _this.profilWebsite = profil[0].website;
            _this.profilDevise = profil[0].id_devise;
            _this.profilTva = profil[0].tva;
            _this.profilPicture = profil[0].profile_picture;
            _this.profilIDCountry = profil[0].id_country;
            _this.developer.image = _this.profilPicture;
        });
    };
    ProfilComponent.prototype.GetCountryService = function () {
        var _this = this;
        this.rest.GetCountry().subscribe(function (respond) {
            _this.countries = respond;
        });
    };
    ProfilComponent.prototype.SaveDeveloperInfos = function () {
        var p_password = '';
        this.rest.SaveDeveloper(this.id_developer.toString(), this.profilFirstname, this.profiLastname, this.profilMobile, this.profilUsername, this.profilEmail, this.profilAddress, this.profilCompany, this.profilWebsite, this.profilBirthDay, p_password, this.profilGender, this.profilTva, this.profilIDCountry, this.profilPicture).subscribe(function (respond) {
            var btnClosePopup = document.getElementById('btnClosePopup');
            swal({
                title: '',
                text: 'Profil updated successfully!',
                icon: 'success',
            })
                .then(function () {
                setTimeout(location.reload.bind(location), 200);
            });
        });
    };
    ProfilComponent.prototype.upload = function (files) {
        //https://stackblitz.com/edit/angular-file-upload?file=app%2Fapp.module.ts
        this.uploadAndProgress(files);
    };
    ProfilComponent.prototype.uploadAndProgress = function (files) {
        var _this = this;
        var formData = new FormData();
        Array.from(files).forEach(function (f) { return formData.append('file', f); });
        console.log(files);
        this.http.post(/*'https://file.io'*/ '', formData, { reportProgress: true, observe: 'events' })
            .subscribe(function (event) {
            if (event.type === HttpEventType.UploadProgress) {
                _this.percentDone = Math.round(100 * event.loaded / event.total);
            }
            else if (event instanceof HttpResponse) {
                _this.uploadSuccess = true;
            }
        });
    };
    ProfilComponent = __decorate([
        Component({
            selector: 'app-profil',
            templateUrl: './profil.component.html',
            styleUrls: ['./profil.component.scss']
        }),
        __metadata("design:paramtypes", [ProfilService, NavbarService, SidebarService,
            ToastrManager, HttpClient, NotifierService, NotificationService])
    ], ProfilComponent);
    return ProfilComponent;
}(MasterComponent));
export { ProfilComponent };
//# sourceMappingURL=profil.component.js.map