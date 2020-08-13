var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
//import { Dashboard2Component } from './screens/dashboard-2/dashboard-2.component';
import { WidgetsComponent } from './screens/widgets/widgets.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { TablesComponent } from './ui-elements/tables/tables.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { AccordionsComponent } from './ui-elements/accordions/accordions.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { ProgressbarComponent } from './ui-elements/progressbar/progressbar.component';
import { BreadcrumbsComponent } from './ui-elements/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { DropdownComponent } from './ui-elements/dropdown/dropdown.component';
import { TooltipsComponent } from './ui-elements/tooltips/tooltips.component';
import { CarouselComponent } from './ui-elements/carousel/carousel.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { DragulaComponent } from './advanced-elements/dragula/dragula.component';
import { LoaderComponent } from './advanced-elements/loader/loader.component';
import { EmailComponent } from './apps/email/email.component';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { FlagIconsComponent } from './icons/flag-icons/flag-icons.component';
import { FontAwesomeComponent } from './icons/font-awesome/font-awesome.component';
import { SimpleLineIconsComponent } from './icons/simple-line-icons/simple-line-icons.component';
import { MdiComponent } from './icons/mdi/mdi.component';
import { FormsComponent } from './forms/forms.component';
import { ChartjsComponent } from './charts/chartjs/chartjs.component';
import { InvoiceComponent } from './sample-pages/invoice/invoice.component';
import { PricingTableComponent } from './sample-pages/pricing-table/pricing-table.component';
import { RegisterComponent } from './sample-pages/register/register.component';
import { Page404Component } from './sample-pages/page404/page404.component';
import { Page500Component } from './sample-pages/page500/page500.component';
import { GeneralStatisticsComponent } from './common/general-statistics/general-statistics.component';
import { ApplicationStatisticsComponent } from './application/application-statistics/application-statistics.component';
import { StatByApplicationComponent } from './common/stat-by-application/stat-by-application.component';
import { StatByDayComponent } from './common/stat-by-day/stat-by-day.component';
//import {SyncAsync} from '@angular/compiler/src/util';
import { StatByCountryComponent } from './common/stat-by-country/stat-by-country.component';
import { StatByDlrComponent } from './common/stat-by-dlr/stat-by-dlr.component';
import { StatAppApiComponent } from './application/stat-app-api/stat-app-api.component';
import { StatAppDayComponent } from './application/stat-app-day/stat-app-day.component';
import { StatAppCountryComponent } from './application/stat-app-country/stat-app-country.component';
import { StatAppDlrComponent } from './application/stat-app-dlr/stat-app-dlr.component';
//import {DatepickerComponent} from './ui-elements/datepicker/datepicker.component';
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
//import { SignOutComponent } from './account/sign-out/sign-out.component';
import { ApiListComponent } from './application/api-list/api-list.component';
import { ApiDetailComponent } from './application/api-detail/api-detail.component';
//import { ApiDocumentationComponent } from './application/api-documentation/api-documentation.component';
import { LoginComponent } from './account/login/login.component';
import { SalesComponent } from './account/sales/sales.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { AuthGuard } from './_services/auth.guard';
import { NotificationsComponent } from './account/notifications/notifications.component';
//import { NavbarComponent } from './partials/navbar/navbar.component';
//import {ApplicationDetailComponent} from './common/application-detail/application-detail.component';
import { AppCustomPreloader } from './app-routing-loader';
//import { AppCustomPreloader } from './app-routing-loader';
//import {PaginationComponent} from './common/pagination/pagination.component';
var routes = [
    //{ path: '', redirectTo: '/login', pathMatch: 'full' , data: { preload: true }},
    // { path: 'dashboard-2', component: Dashboard2Component ,canActivate: [AuthGuard]  },
    /***************************************ROUTAGE MENU APPLICATION***************************************** */
    { path: 'application/summary', component: SummaryComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/message', component: BoiteEnvoieAppComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/api', component: ApiComponent, canActivate: [AuthGuard] },
    { path: 'application/amount', component: SoldeAppComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/statistics', component: ApplicationStatisticsComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/statistics/api', component: StatAppApiComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/statistics/sms', component: StatAppDayComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/statistics/country', component: StatAppCountryComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/statistics/dlr', component: StatAppDlrComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/share', component: ShareWithComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/settings', component: SettingsComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'application/summary/:id_app', component: SummaryComponent, canActivate: [AuthGuard], data: { preload: true } },
    // { path: 'application/:id_app', component: ApplicationDetailComponent ,canActivate: [AuthGuard]  },
    /***************************************ROUTAGE MENU EXEMPLE***************************************** */
    { path: 'widgets', component: WidgetsComponent, canActivate: [AuthGuard] },
    { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
    { path: 'buttons', component: ButtonsComponent, canActivate: [AuthGuard] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
    { path: 'flag-icon', component: FlagIconsComponent, canActivate: [AuthGuard] },
    { path: 'font-awesome', component: FontAwesomeComponent, canActivate: [AuthGuard] },
    { path: 'mdi', component: MdiComponent, canActivate: [AuthGuard] },
    { path: 'simple-line', component: SimpleLineIconsComponent, canActivate: [AuthGuard] },
    { path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] },
    { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
    { path: 'accordions', component: AccordionsComponent, canActivate: [AuthGuard] },
    { path: 'badges', component: BadgesComponent, canActivate: [AuthGuard] },
    { path: 'progressbar', component: ProgressbarComponent, canActivate: [AuthGuard] },
    { path: 'breadcrumbs', component: BreadcrumbsComponent, canActivate: [AuthGuard] },
    { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard] },
    { path: 'dropdowns', component: DropdownComponent, canActivate: [AuthGuard] },
    { path: 'tooltips', component: TooltipsComponent, canActivate: [AuthGuard] },
    { path: 'carousel', component: CarouselComponent, canActivate: [AuthGuard] },
    { path: 'tabs', component: TabsComponent, canActivate: [AuthGuard] },
    { path: 'dragula', component: DragulaComponent, canActivate: [AuthGuard] },
    { path: 'loaders', component: LoaderComponent, canActivate: [AuthGuard] },
    { path: 'email', component: EmailComponent, canActivate: [AuthGuard] },
    { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] },
    { path: 'chartjs', component: ChartjsComponent, canActivate: [AuthGuard] },
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'pricing-table', component: PricingTableComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data: { preload: true } },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: '404-page', component: Page404Component, canActivate: [AuthGuard] },
    { path: '500-page', component: Page500Component, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard], data: { preload: true } },
    /***************************************ROUTAGE MENU GENERAL***************************************** */
    // { path: 'applications', component: ApplicationsComponent,canActivate: [AuthGuard], data: { preload: true }  },
    // { path: 'General_Statistics', component: GeneralStatisticsComponent ,canActivate: [AuthGuard] , data: { preload: true } },
    // { path: 'General_Stat_ByApplication', component: StatByApplicationComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    // { path: 'General_Stat_ByDay', component: StatByDayComponent ,canActivate: [AuthGuard], data: { preload: true } },
    // { path: 'General_Stat_ByCountry', component: StatByCountryComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    // { path: 'General_Stat_ByDlr', component: StatByDlrComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    // { path: 'datepicker', component: DatepickerComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    // { path: 'boite-envoie', component: BoiteEnvoieComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    // { path: 'solde', component: SoldeComponent ,canActivate: [AuthGuard], data: { preload: true } },
    /***************************************ROUTAGE MENU NEW GENERAL***************************************** */
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'message', component: BoiteEnvoieComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'amount', component: SoldeComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'statistics', component: GeneralStatisticsComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'statistics/application', component: StatByApplicationComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'statistics/sms', component: StatByDayComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'statistics/country', component: StatByCountryComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'statistics/dlr', component: StatByDlrComponent, canActivate: [AuthGuard], data: { preload: true } },
    //{path:'pagination-test', component: PaginationComponent,canActivate: [AuthGuard], data: { preload: true } },
    // { path: 'summary/:id_app', component: SummaryComponent,canActivate: [AuthGuard] , data: { preload: true }}, 
    //{ path: 'api/:id_api', component: ApiDetailComponent,canActivate: [AuthGuard] },
    /***************************************ROUTAGE MENU API***************************************** */
    { path: 'api/list', component: ApiListComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'api/:id_app', component: ApiComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'api/detail/:id_api', component: ApiDetailComponent, canActivate: [AuthGuard], data: { preload: true } },
    /***************************************ROUTAGE MENU PROFIL***************************************** */
    { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'sender', component: SenderComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'invoices', component: SalesComponent, canActivate: [AuthGuard], data: { preload: true } },
    { path: 'amount/add', component: AddAmountComponent, canActivate: [AuthGuard], data: { preload: true } },
    //{ path: 'signout', component: SignOutComponent ,canActivate: [AuthGuard] , data: { preload: true } }, 
    //{ path: 'api-detail', component: ApiDetailComponent,canActivate: [AuthGuard]  }, 
    // { path: ':id_app_api/:url', component: ApiDetailComponent ,canActivate: [AuthGuard] , data: { preload: true }},
    //{ path: 'api-documentation', component: ApiDocumentationComponent,canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
            exports: [RouterModule],
            providers: [AppCustomPreloader]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map