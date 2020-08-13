import { Component, OnInit } from "@angular/core";
import { SoldeAppService } from "./solde-app.service";
import { DatePipe } from '@angular/common';
import { NavbarService } from "src/app/partials/navbar/navbar.service";
import { SidebarService } from "src/app/partials/sidebar/sidebar.service";
import { SettingsService } from "../settings/settings.service";
import { ActivatedRoute } from "@angular/router";
import { MasterComponent } from "src/app/_controler/master.component";
import { NotifierService } from "angular-notifier";
import { NotificationService } from '../../_services/';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';


@Component({
  selector: 'app-solde-app',
  templateUrl: './solde-app.component.html',
  styleUrls: ['./solde-app.component.scss']
})

export class SoldeAppComponent extends MasterComponent implements OnInit {

  summaryCredit: any;
  summaryCountSms = 0;
  summaryCountApp = 0;

  totalSms = 0;
  totalBilling = 0;
  totalApi = 0;

  soldes: any;
  databindCredit: any;
  lstlanguageChecked: string = ";";
  AppTitle: any;
  AppDescription: any;
  AppUrl: any;
  AppStatus: any;
  AppDate: any;
  AppMode: any;
  AppTypeApp: any;
  AppLang: any;
  AppTypeAppValue: any;

  p_begin_date: any;
  p_end_date: any;

  date = new Date();

  list = [];
  selected: any;
  locale: LocaleConfig = {
  format: 'DD-MM-YYYY',
  applyLabel: 'Appliquer',
  customRangeLabel: ' customRange',
  daysOfWeek: moment.weekdaysMin(),
  monthNames: moment.monthsShort(),
  firstDay: moment.localeData().firstDayOfWeek(),
  }

  alwaysShowCalendars: boolean;

  ranges: any = {
  'Today': [moment(), moment()],
  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
  return this.invalidDates.some(d => d.isSame(m, 'day'))

}

  public today: Date = new Date(new Date().toDateString());
  public todayStart = this.datePipe.transform(this.date, 'yyyy-MM-dd 00:00:00').toString();
  public todayEnd = this.datePipe.transform(this.date, 'yyyy-MM-dd 23:59:59').toString();

  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate() - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;

  value: any;


  constructor(private rest: SoldeAppService, private datePipe: DatePipe, public nav: NavbarService, public side: SidebarService, private restSettings: SettingsService,  notifierService: NotifierService, notificationService: NotificationService) {
    
      super(notifierService, notificationService);
    this.alwaysShowCalendars = true;

  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    this.value = [this.todayStart, this.todayEnd];
    this.p_begin_date = this.todayStart;
    this.p_end_date = this.todayEnd;

    this.DataBindAppAmount();
    this.GetAppSummary();

  }

  DataBindAppAmount() {

    this.rest.getAppDev(this.id_app.toString(), this.id_developer.toString(), this.p_begin_date, this.p_end_date).subscribe(respond => {
      this.soldes = respond;
      this.totalSms = 0;
      this.totalBilling = 0;
      this.totalApi = 0;

      for (let i = 0; i < this.soldes.length; i++) {
        this.totalSms += parseInt(this.soldes[i].nbr_sms)
        this.totalBilling += parseFloat(this.soldes[i].solde)
        this.totalApi += parseInt(this.soldes[i].id_api)
        this.databindCredit = this.totalBilling.toFixed(3).toString()
      }
    });

  }

  GetAppSummary() {

    const toDay = new Date();
    var credit = 0;
    toDay.setDate(toDay.getDate() + 3);
    this.rest.getAppDev(this.id_app.toString(), this.id_developer.toString(), this.date_developer, toDay).subscribe(respond => {
      this.summaryCountApp = respond.length;


      for (let i = 0; i < this.summaryCountApp; i++) {
        this.summaryCountSms += parseInt(respond[i].nbr_sms)
        credit += parseFloat(respond[i].solde)

        this.summaryCredit = credit.toFixed(3).toString()
      }

    });
  }


  SelectTime(value) {

    this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))
    
    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.DataBindAppAmount();
    }

  CalculatePourcentage(value, total) {

    var pourcentage: number = 0;

    if (total > 0) {
      pourcentage = Math.round((value * 100) / total);
    }

    return pourcentage;
  }


  CalculatePourcentageWidth(value, total) {

    var pourcentage: number = 0;

    if (total > 0) {
      pourcentage = Math.round((value * 100) / total);
    }

    var style = pourcentage.toString() + "%";

    return style;
  }


  CalculatePourcentageColor(value, total) {

    var pourcentage: number = 0;

    if (total > 0) {
      pourcentage = Math.round((value * 100) / total);
    }

    if (pourcentage < 20) {
      return "progress-bar bg-info";
    }
    else if (pourcentage < 50) {
      return "progress-bar bg-primary";
    }
    else if (pourcentage < 70) {
      return "progress-bar bg-warning";
    }
    else {
      return "progress-bar bg-danger";
    }
  }


  GetAppDetail() {

    this.restSettings.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
      this.AppTitle = respond[0].title
      this.AppDescription = respond[0].description;
      this.AppUrl = respond[0].url;
      this.AppStatus = respond[0].status;
      this.AppDate = respond[0].entry_date;
      this.AppMode = respond[0].developer_mode;
      this.AppLang = respond[0].language_set;
      this.AppTypeApp = respond[0].id_type_app;
      this.AppTypeAppValue = respond[0].id_type_app;
      this.lstlanguageChecked = respond[0].language_set;

    });

  }
}








