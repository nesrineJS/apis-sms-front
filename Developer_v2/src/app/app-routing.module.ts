import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {GeneralStatisticsComponent} from './common/general-statistics/general-statistics.component';
import {ApplicationStatisticsComponent} from './application/application-statistics/application-statistics.component';
import {StatByApplicationComponent} from './common/stat-by-application/stat-by-application.component';
import {StatByDayComponent} from './common/stat-by-day/stat-by-day.component';
import {StatByCountryComponent} from './common/stat-by-country/stat-by-country.component';
import {StatByDlrComponent} from './common/stat-by-dlr/stat-by-dlr.component';
import {StatAppApiComponent} from './application/stat-app-api/stat-app-api.component';
import {StatAppDayComponent} from './application/stat-app-day/stat-app-day.component';
import {StatAppCountryComponent} from './application/stat-app-country/stat-app-country.component';
import {StatAppDlrComponent} from './application/stat-app-dlr/stat-app-dlr.component';
import { BoiteEnvoieComponent } from './common/boite-envoie/boite-envoie.component';
import { SoldeComponent } from './common/solde/solde.component';
import { ApplicationsComponent } from './common/applications/applications.component';
import { SummaryComponent } from './application/summary/summary.component';
import { BoiteEnvoieAppComponent } from './application/boite-envoie-app/boite-envoie-app.component';
import { ApiComponent } from './application/api/api.component';
import { SoldeAppComponent } from './application/solde-app/solde-app.component';
import { ShareWithComponent } from './application/share-with/share-with.component';
import { SettingsComponent } from './application/settings/settings.component';
import { ProfilComponent } from './account/profil/profil.component';
import { PrivacyComponent } from './account/privacy/privacy.component';
import { SenderComponent } from './account/sender/sender.component';
import { AddAmountComponent } from './account/add-amount/add-amount.component';
import { ApiListComponent } from './application/api-list/api-list.component';
import { ApiDetailComponent } from './application/api-detail/api-detail.component';
import { SalesComponent } from './account/sales/sales.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { AuthGuard } from './_services/auth.guard';
import { AppCustomPreloader } from './app-routing-loader'; 
import { InvoicesDownloadComponent } from './account/invoices-download/invoices-download.component';
import { LoginComponent } from './account/login/login.component';


const routes: Routes = [  


  /***************************************ROUTAGE MENU APPLICATION***************************************** */
  { path: 'application/summary', component: SummaryComponent,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'application/message', component: BoiteEnvoieAppComponent,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'application/api', component: ApiComponent,canActivate: [AuthGuard]  },
  { path: 'application/amount', component: SoldeAppComponent ,canActivate: [AuthGuard] , data: { preload: true }},

  { path: 'application/statistics', component: ApplicationStatisticsComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'application/statistics/api', component: StatAppApiComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'application/statistics/sms', component: StatAppDayComponent,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'application/statistics/country', component: StatAppCountryComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'application/statistics/dlr', component: StatAppDlrComponent ,canActivate: [AuthGuard] , data: { preload: true } },

  { path: 'application/share', component: ShareWithComponent,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'application/settings', component: SettingsComponent ,canActivate: [AuthGuard], data: { preload: true } },
  { path: 'application/summary/:id_app', component: SummaryComponent,canActivate: [AuthGuard] , data: { preload: true }},


  /***************************************ROUTAGE MENU GENERAL***************************************** */
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'applications', component: ApplicationsComponent,canActivate: [AuthGuard], data: { preload: true }  },

  { path: 'message', component: BoiteEnvoieComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'amount', component: SoldeComponent ,canActivate: [AuthGuard], data: { preload: true } },
  
  { path: 'statistics', component: GeneralStatisticsComponent ,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'statistics/application', component: StatByApplicationComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'statistics/sms', component: StatByDayComponent ,canActivate: [AuthGuard], data: { preload: true } },
  { path: 'statistics/country', component: StatByCountryComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'statistics/dlr', component: StatByDlrComponent ,canActivate: [AuthGuard] , data: { preload: true }},


/***************************************ROUTAGE MENU API***************************************** */
  { path: 'api/list', component: ApiListComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'api/:id_app', component: ApiComponent ,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'api/detail/:id_api', component: ApiDetailComponent,canActivate: [AuthGuard] , data: { preload: true } },


/***************************************ROUTAGE MENU PROFIL***************************************** */
  { path: 'profil', component: ProfilComponent ,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'privacy', component: PrivacyComponent,canActivate: [AuthGuard] , data: { preload: true } },
  { path: 'sender', component: SenderComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'invoices', component: SalesComponent ,canActivate: [AuthGuard], data: { preload: true } },
  { path: 'invoices/download', component: InvoicesDownloadComponent ,canActivate: [AuthGuard], data: { preload: true } },
  { path: 'invoices/download/:id_solde', component: InvoicesDownloadComponent ,canActivate: [AuthGuard], data: { preload: true } },
  { path: 'amount/add', component: AddAmountComponent ,canActivate: [AuthGuard] , data: { preload: true }},
  { path: 'login', component: LoginComponent , data: { preload: true }},
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AppCustomPreloader]

})
export class AppRoutingModule { }
