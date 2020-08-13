var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragulaModule } from 'ng2-dragula';
import { NgxGaugeModule } from 'ngx-gauge';
import { AppComponent } from './app.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { AccordionsComponent } from './ui-elements/accordions/accordions.component';
import { AlertsComponent } from './ui-elements/alerts/alerts.component';
import { BadgesComponent } from './ui-elements/badges/badges.component';
import { BreadcrumbsComponent } from './ui-elements/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './ui-elements/buttons/buttons.component';
import { CarouselComponent } from './ui-elements/carousel/carousel.component';
import { DropdownComponent } from './ui-elements/dropdown/dropdown.component';
import { PaginationComponent } from './ui-elements/pagination/pagination.component';
import { ProgressbarComponent } from './ui-elements/progressbar/progressbar.component';
import { TablesComponent } from './ui-elements/tables/tables.component';
import { TabsComponent } from './ui-elements/tabs/tabs.component';
import { TooltipsComponent } from './ui-elements/tooltips/tooltips.component';
import { TypographyComponent } from './ui-elements/typography/typography.component';
// import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { Dashboard2Component } from './screens/dashboard-2/dashboard-2.component';
import { WidgetsComponent } from './screens/widgets/widgets.component';
import { FormsComponent } from './forms/forms.component';
import { FlagIconsComponent } from './icons/flag-icons/flag-icons.component';
import { FontAwesomeComponent } from './icons/font-awesome/font-awesome.component';
import { SimpleLineIconsComponent } from './icons/simple-line-icons/simple-line-icons.component';
import { MdiComponent } from './icons/mdi/mdi.component';
import { DragulaComponent } from './advanced-elements/dragula/dragula.component';
import { LoaderComponent } from './advanced-elements/loader/loader.component';
import { EmailComponent } from './apps/email/email.component';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { ChartjsComponent } from './charts/chartjs/chartjs.component';
import { InvoiceComponent } from './sample-pages/invoice/invoice.component';
import { PricingTableComponent } from './sample-pages/pricing-table/pricing-table.component';
import { RegisterComponent } from './sample-pages/register/register.component';
import { Page404Component } from './sample-pages/page404/page404.component';
import { Page500Component } from './sample-pages/page500/page500.component';
import { GeneralStatisticsComponent } from './common/general-statistics/general-statistics.component';
import { ApplicationStatisticsComponent } from './application/application-statistics/application-statistics.component';
import { StatisticsService } from './common/general-statistics/statistics.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BoiteEnvoieComponent } from './common/boite-envoie/boite-envoie.component';
import { SoldeComponent } from './common/solde/solde.component';
import { StatByApplicationComponent } from './common/stat-by-application/stat-by-application.component';
import { StatByDayComponent } from './common/stat-by-day/stat-by-day.component';
import { StatByDlrComponent } from './common/stat-by-dlr/stat-by-dlr.component';
import { StatByCountryComponent } from './common/stat-by-country/stat-by-country.component';
import { StatAppApiComponent } from './application/stat-app-api/stat-app-api.component';
import { StatAppCountryComponent } from './application/stat-app-country/stat-app-country.component';
import { StatAppDlrComponent } from './application/stat-app-dlr/stat-app-dlr.component';
import { StatAppDayComponent } from './application/stat-app-day/stat-app-day.component';
import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DatepickerComponent } from './ui-elements/datepicker/datepicker.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BoiteEnvoiePipe } from './common/boite-envoie/boite-envoie.pipe';
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
import { SignOutComponent } from './account/sign-out/sign-out.component';
import { BoiteEnvoieService } from './common/boite-envoie/boite-envoie.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SoldeService } from './common/solde/solde.service';
import { BoiteEnvoieAppService } from './application/boite-envoie-app/boite-envoie-app.service';
import { SenderService } from './account/sender/sender.service';
import { SoldeAppService } from './application/solde-app/solde-app.service';
import { ExcelService } from './GlobalServices/excel.service';
import { PrintService } from './GlobalServices/print.service';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ApiService } from './application/api/api.service';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ApiListComponent } from './application/api-list/api-list.component';
import { ApiDetailComponent } from './application/api-detail/api-detail.component';
import { ApiListService } from './application/api-list/api-list.service';
import { ApiDocumentationComponent } from './application/api-documentation/api-documentation.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SalesComponent } from './account/sales/sales.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { NavbarService } from './partials/navbar/navbar.service';
import { SidebarService } from './partials/sidebar/sidebar.service';
import { ConditionalDivComponent } from './conditional-div/conditional-div.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToastrModule } from 'ng6-toastr-notifications';
//import {ToastyModule} from 'ng2-toasty';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { NotifierModule } from 'angular-notifier';
import { ApplicationDetailComponent } from './common/application-detail/application-detail.component';
/**
 * Custom angular notifier options
 */
import { FileSelectDirective } from 'ng2-file-upload';
import { AuthGuard } from './_services/auth.guard';
//import { MasterComponent } from './_controler/master.component';
import { DashboardService } from './common/dashboard/dashboard.service';
import { NotificationsService } from 'angular2-notifications';
import { MenuComponent, MasterComponent, SuperComponent } from './_controler/';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
//import { SuperComponent } from './_controler/super.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
//import{PaginationComponent} from './common/pagination/pagination.component';
import { PagerService, NotificationService } from './_services';
var customNotifierOptions = {
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
var config = new AuthServiceConfig([
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                NavbarComponent,
                SidebarComponent,
                FooterComponent,
                FormsComponent,
                ButtonsComponent,
                TablesComponent,
                TypographyComponent,
                AlertsComponent,
                AccordionsComponent,
                BadgesComponent,
                ProgressbarComponent,
                BreadcrumbsComponent,
                PaginationComponent,
                DropdownComponent,
                TooltipsComponent,
                CarouselComponent,
                TabsComponent,
                Dashboard2Component,
                WidgetsComponent,
                DragulaComponent,
                LoaderComponent,
                EmailComponent,
                TodoListComponent,
                ChartjsComponent,
                FontAwesomeComponent,
                FlagIconsComponent,
                SimpleLineIconsComponent,
                MdiComponent,
                InvoiceComponent,
                PricingTableComponent,
                LoginComponent,
                // LoginComponent,
                RegisterComponent,
                Page404Component,
                Page500Component,
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
                DatepickerComponent,
                TimePipe,
                BoiteEnvoiePipe,
                ApplicationsComponent,
                SummaryComponent,
                BoiteEnvoieAppComponent,
                ApiComponent,
                SoldeAppComponent,
                ShareWithComponent,
                SettingsComponent,
                ProfilComponent,
                PrivacyComponent,
                SenderComponent,
                AddAmountComponent,
                SignOutComponent,
                PrintLayoutComponent,
                ApiListComponent,
                ApiDetailComponent,
                ApiDocumentationComponent,
                TimeAgoPipe,
                SalesComponent,
                DashboardComponent,
                ConditionalDivComponent,
                NotificationsComponent,
                ApplicationDetailComponent,
                FileSelectDirective,
                MasterComponent,
                MenuComponent,
                SuperComponent,
            ],
            imports: [
                // DayPilotModule,
                BrowserModule,
                PDFExportModule,
                ScrollingModule,
                StorageServiceModule,
                ToastrModule.forRoot(),
                // ToastyModule.forRoot(),
                DateRangePickerModule,
                NgxDaterangepickerMd.forRoot(),
                NgxPaginationModule,
                NgxGaugeModule,
                RouterModule,
                AppRoutingModule,
                HttpClientModule,
                BsDatepickerModule.forRoot(),
                NgbDatepickerModule,
                DateRangePickerModule,
                HttpModule,
                FormsModule,
                ChartsModule,
                NgxGaugeModule,
                NgbModule.forRoot(),
                DragulaModule.forRoot(),
                Ng2SearchPipeModule,
                UiSwitchModule,
                SocialLoginModule,
                NgCircleProgressModule.forRoot({
                    'radius': 60,
                    'outerStrokeWidth': 10,
                    'innerStrokeWidth': 5,
                    'showBackground': false,
                    'startFromZero': false
                }),
                BsDatepickerModule.forRoot(),
                NotifierModule.withConfig(customNotifierOptions),
            ],
            providers: [StatisticsService, DatePipe, BoiteEnvoieService, SoldeService, AuthGuard,
                BoiteEnvoieAppService, ProfilComponent, SenderService, ExcelService, PrintService,
                SoldeAppService, ApiService, ApiListService, NavbarService, SidebarService, DashboardService,
                NotificationsService, NotificationService, PagerService,
                {
                    provide: AuthServiceConfig,
                    useFactory: provideConfig
                }
            ],
            bootstrap: [AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map