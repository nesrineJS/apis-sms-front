import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { SettingsService } from '../settings/settings.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})

export class ApiComponent extends MasterComponent implements OnInit {

  closeResult: string;
  title = '';
  url = '';
  appStatusValue: boolean = false;
  applications: any;

  apiDetail: any;
  popupApiLabel: any;
  popupApiTitle: any;
  popupApiKey: any;
  popupApiSecret: any;
  popupApiStatus: any;
  popupApiID: any;
  popupApiUrl: any;

  show = true;

  constructor(private modalService: NgbModal, private rest: ApiService, public router: Router, public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService, notificationService);
    this.show = false;
  }


  ngOnInit() {
    
    this.nav.Show();
    this.side.ShowSide();
    this.GetAppSummary();
  }

  GetAppSummary() {

    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 3);
    this.rest.GetApi(this.id_app.toString(), this.id_developer.toString(), '', this.date_developer, toDay).subscribe(respond => {
      this.applications = respond;

    });
  }

  OnChangeStatus(id_app_api) {

    this.rest.ApplicationApiStatus(id_app_api).subscribe(respond => {
      this.apiDetail = respond;
      if (this.popupApiStatus == 1) {
        this.popupApiStatus = 0;
      }
      else {
        this.popupApiStatus = 1;
      }
    });
  }

  PopupGeneratePassword(id_app_api) {
    this.rest.ApplicationApiGenerateSecretKey(id_app_api)
      .subscribe(respond => {
        this.apiDetail = respond;
        this.GetApiDetail(id_app_api);
      });
  }


  GetApiDetail(id_app_api) {
    const p_id_app_api = id_app_api.toString();

    this.popupApiStatus = 0;
    this.appStatusValue = false;
    
    this.rest.ApiDetail(this.id_developer.toString(), id_app_api.toString())
      .subscribe(respond => {
        this.apiDetail = respond;
        this.popupApiLabel = this.apiDetail[0].label;
        this.popupApiTitle = this.apiDetail[0].api_title;
        this.popupApiKey = this.apiDetail[0].key;
        this.popupApiSecret = this.apiDetail[0].secret;
        this.popupApiStatus = this.apiDetail[0].status;
        this.popupApiID = this.apiDetail[0].id_app_api;
        this.popupApiUrl = this.apiDetail[0].url;

        if (this.popupApiStatus == 1) {
          this.appStatusValue = true;
        }

      });
  }


  public GotoUrlApiDetails(id_api, url) {

    const myurl = `${id_api}/${url}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });

  }

  PopupApiOpen(content, id_app_api) {

    this.GetApiDetail(id_app_api);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.PopupClose(reason)}`;
    });
  }

  
  PopupClose(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';

    } else {
      return `with: ${reason}`;
    }
  }

  PopupCopyInputMessage(inputElement) {

    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }


  PopupViewPassword() {
    this.show = !this.show;
  }

}
