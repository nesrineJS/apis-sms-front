import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import { BehaviorSubject } from 'rxjs';
import { Application } from 'src/app/_model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends MasterComponent implements OnInit {


  languages: any;
  type_applications: any;

  AppTitle: any;
  appHiddenTitle: any;
  AppDescription: any;
  AppUrl: any;
  AppStatus: any;
  appStatusValue: boolean = false;
  AppDate: any;
  AppMode: any;
  appModeValue: boolean = false;
  AppTypeApp: any;

  AppTypeAppValue: any;
  lstlanguageChecked: string = ";";


  constructor(private rest: SettingsService, public router: Router, public nav: NavbarService, public side: SidebarService,
  notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService, notificationService);

  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();

    this.GetAppDetail();
    this.GetTypeApplication();
    this.GetLanguage();

  }


  GetAppDetail() {

    this.rest.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {

      var appDetail = respond;

      this.AppTitle = appDetail[0].title;
      this.appHiddenTitle = appDetail[0].title;
      this.AppDescription = appDetail[0].description;
      this.AppUrl = appDetail[0].url;
      this.AppStatus = appDetail[0].status;
      this.AppDate = appDetail[0].entry_date;
      this.AppMode = appDetail[0].developer_mode;
      this.AppTypeApp = appDetail[0].id_type_app;
      this.AppTypeAppValue = appDetail[0].id_type_app;
      this.lstlanguageChecked = appDetail[0].language_set;



      if (this.AppStatus == 1) {
        this.appStatusValue = true;
      }

      if (this.AppMode == 1) {
        this.appModeValue = true;
      }
    });

  }

  OnChangeStatus(id_app) {
    var v_id_app = parseInt(this.id_app);

    this.rest.ApplicationStatus(v_id_app).subscribe(respond => {
      if (this.AppStatus == 1) {
        this.AppStatus = 0;
      }
      else {
        this.AppStatus = 1;
      }
    });
  }

  OnChangeMode(id_app) {
    var v_id_app = parseInt(this.id_app);
    this.rest.ApplicationMode(v_id_app).subscribe(respond => {
      if (this.AppMode == 1) {
        this.AppMode = 0;
      }
      else {
        this.AppMode = 1;
      }
    });
  }


  GetTypeApplication() {
    this.rest.GetTypeApplication().subscribe(respond => {
      this.type_applications = respond;
    });
  }

  GetLanguage() {
    this.rest.GetLanguage().subscribe(respond => {
      this.languages = respond;
    });
  }


  private PopupChechBoxChange(chkLanguage, event) {
    if (event.target.checked) {
      this.lstlanguageChecked = this.lstlanguageChecked + chkLanguage + ";"
    }
    else {
      this.lstlanguageChecked = this.lstlanguageChecked.replace(chkLanguage + ";", "")
    }

  }

  private PopupChechBoxCheck(chkLanguage) {
    if (this.lstlanguageChecked.toString().indexOf(";" + chkLanguage + ";") > -1) {
      return true;
    }

    return false;
  }


  PopupUpdateApplication(title, description, url, AppTypeApp, $event) {

    this.rest.SaveDetail(this.id_app.toString(), this.id_developer.toString(), title, description, this.lstlanguageChecked, url, AppTypeApp).subscribe(respond => {

      if (this.appHiddenTitle != this.AppTitle) {
        var currentApplication = new BehaviorSubject<Application>(JSON.parse(sessionStorage.getItem('application')));
        currentApplication.value.name = title;

        sessionStorage.setItem('application', JSON.stringify(currentApplication.value));

      }

      this.showNotification('success', 'Settings successfully updated!, Redirect to summary after 2 secondes');

    },
      err => {
        this.showNotification('error', 'Error to save your data, Redirect to summary after 2 secondes');
      },
      () => {

        setTimeout(() => {
          this.router.navigate(['application/summary']);
        },
          3000);

      },
    );
  }


  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}