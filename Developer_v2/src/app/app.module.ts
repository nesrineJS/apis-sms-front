import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppComponent } from './app.component';
import { TimePipe } from './pipes/time.pipe';
import {DatePipe} from '@angular/common';
import {ExcelService} from './GlobalServices/excel.service';
import {PrintService} from './GlobalServices/print.service';
import { UiSwitchModule } from 'ngx-ui-switch';
import {TimeAgoPipe} from 'time-ago-pipe';


import {GeneralStatisticsComponent } from './common/general-statistics/general-statistics.component';
import {StatisticsService} from './common/general-statistics/statistics.service';
import { BoiteEnvoieComponent } from './common/boite-envoie/boite-envoie.component';
import { SoldeComponent } from './common/solde/solde.component';
import { DashboardService } from './common/dashboard/dashboard.service';
import { BoiteEnvoieService } from './common/boite-envoie/boite-envoie.service';
import { SoldeService } from './common/solde/solde.service';
import {ApplicationsComponent} from './common/applications/applications.component';
import { StatByDayComponent } from './common/stat-by-day/stat-by-day.component';
import { StatByDlrComponent } from './common/stat-by-dlr/stat-by-dlr.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { StatByCountryComponent } from './common/stat-by-country/stat-by-country.component';
import { StatByApplicationComponent } from './common/stat-by-application/stat-by-application.component';
import { ApplicationStatisticsComponent } from './application/application-statistics/application-statistics.component';
import { StatAppApiComponent } from './application/stat-app-api/stat-app-api.component';
import { StatAppCountryComponent } from './application/stat-app-country/stat-app-country.component';
import { StatAppDlrComponent } from './application/stat-app-dlr/stat-app-dlr.component';
import { StatAppDayComponent } from './application/stat-app-day/stat-app-day.component';
import {SummaryComponent} from './application/summary/summary.component';
import {BoiteEnvoieAppComponent} from './application/boite-envoie-app/boite-envoie-app.component';
import {ApiComponent} from './application/api/api.component';
import {SoldeAppComponent} from './application/solde-app/solde-app.component';
import {ShareWithComponent} from './application/share-with/share-with.component';
import {SettingsComponent} from './application/settings/settings.component';
import { ApiService } from './application/api/api.service';
import { ApiListComponent } from './application/api-list/api-list.component';
import { ApiDetailComponent } from './application/api-detail/api-detail.component';
import { ApiListService } from './application/api-list/api-list.service';
import { SoldeAppService } from './application/solde-app/solde-app.service';
import { BoiteEnvoieAppService } from './application/boite-envoie-app/boite-envoie-app.service';


import { SenderService } from './account/sender/sender.service';
import {LoginComponent} from './account/login/login.component';
import {PrivacyComponent} from './account/privacy/privacy.component';
import {SenderComponent} from './account/sender/sender.component';
import {AddAmountComponent} from './account/add-amount/add-amount.component';
import {SignOutComponent} from './account/sign-out/sign-out.component';
import { SalesComponent } from './account/sales/sales.component';
import{InvoicesDownloadComponent} from './account/invoices-download/invoices-download.component';
import { ProfilComponent } from './account/profil/profil.component';


import { NavbarService } from './partials/navbar/navbar.service';
import { SidebarService } from './partials/sidebar/sidebar.service';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';



import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AuthGuard } from './_services/auth.guard';
import { MenuComponent, MasterComponent, SuperComponent } from './_controler/';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';


import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { PagerService, NotificationService } from './_services';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 20
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
  },
  
  theme: 'material',
  behaviour: {
    autoHide: 10000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2272083429497265')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('78u2a8mqzf9k16')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    GeneralStatisticsComponent,
    ApplicationStatisticsComponent,
    BoiteEnvoieComponent,
    SoldeComponent,
    StatByApplicationComponent,
    StatByDayComponent,
    StatByDlrComponent,
    StatByCountryComponent,
    StatAppApiComponent,
    StatAppCountryComponent,
    StatAppDlrComponent,
    StatAppDayComponent,
    TimePipe,
    ApplicationsComponent,
    SummaryComponent,
    BoiteEnvoieAppComponent,
    ApiComponent,
    SoldeAppComponent,
    ShareWithComponent,
    SettingsComponent,
    ProfilComponent,
    PrivacyComponent,
    LoginComponent,
    SenderComponent,
    AddAmountComponent,
    SignOutComponent,
    ApiListComponent,
    ApiDetailComponent,
    TimeAgoPipe,
    SalesComponent,
    DashboardComponent,
    MasterComponent,
    MenuComponent,
    SuperComponent,
    InvoicesDownloadComponent,
  ],

  imports: [
    BrowserModule,
    PDFExportModule,
    NgxDaterangepickerMd.forRoot(),
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule.forRoot(),
    UiSwitchModule,
    SocialLoginModule,
    NgCircleProgressModule.forRoot({
      'radius': 60,
      'outerStrokeWidth': 10,
      'innerStrokeWidth': 5,
      'showBackground': false,
      'startFromZero': false
    }),
      NotifierModule.withConfig(customNotifierOptions),
     ],


  providers: [StatisticsService, DatePipe, BoiteEnvoieService, SoldeService,AuthGuard,BoiteEnvoieAppService , SenderService, ExcelService, PrintService,
  SoldeAppService, ApiService, ApiListService, NavbarService, SidebarService, DashboardService, NotificationService,PagerService,
  
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }
],

  bootstrap: [AppComponent],

})

export class AppModule { }
