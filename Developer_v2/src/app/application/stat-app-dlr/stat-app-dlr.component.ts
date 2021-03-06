import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from '../../common/general-statistics/statistics.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';


@Component({
  selector: 'app-stat-app-dlr',
  templateUrl: './stat-app-dlr.component.html',
  styleUrls: ['./stat-app-dlr.component.scss']
})


export class StatAppDlrComponent extends MasterComponent implements OnInit {

  entry_date = '';
  id_app_api = '';
  items = '';
  p_begin_date: any;
  p_end_date: any;
  resultAppApi: any;
  searchApi = "";
  ddlValueApi: any = 'Select Api';
  date = new Date();
  CountDlr: any;

  list = [];
  selected: any;
  locale: LocaleConfig = {
    format: 'DD/MM/YYYY',
    applyLabel: 'OK',
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
    public weekEnding: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
    public weekEnd = this.datePipe.transform(this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd = this.todayEnd;
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd = this.todayEnd;
    public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
    public yearEnd = this.todayEnd;
    value: any;
    public polarAreaChartData: number[] = [];
    public polarAreaLegend: boolean;
    public polarAreaChartLabels: string[] = [];
    public polarAreaChartType: string;
    lstlanguageChecked: string = ";";

  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe, public nav: NavbarService,
    public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService, notificationService);
    this.alwaysShowCalendars = true;

  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    this.value = [this.todayStart, this.todayEnd];
    this.p_begin_date = this.todayStart;
    this.p_end_date = this.todayEnd;
    this.id_app = this.id_app.toString();
    this.ViewStatByDlr();

    this.GetApplicationApi();
    this.ViewStatByDlr();

  }


  SelectTime(value) {

    this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))

    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.ViewStatByDlr();
  }


  ViewStatByDlr() {
    
    return this.rest.GetStatByDlr(this.id_developer.toString(), this.id_app.toString(), this.searchApi, this.p_begin_date, this.p_end_date)
      .subscribe(res => {

        this.polarAreaChartLabels = [];
        this.polarAreaChartData.splice(0, this.polarAreaChartData.length)
        this.CountDlr = res.length;
        for (let i = 0; i < this.CountDlr; i++) {
          if (res[i].dlr_type == "REJECTED" || res[i].dlr_type == "EXPIRED" || res[i].dlr_type == "DELIVRD" || res[i].dlr_type == "UNKNOWN" || res[i].dlr_type == "UNDELIVRD") {
            res[i].dlr_type = res[i].dlr_type
          }
          else {
            res[i].dlr_type = " IN PROGRESS"
          }

          this.polarAreaChartData.push(parseInt(res[i].nbr_sms, 10))
          this.polarAreaChartLabels.push(res[i].dlr_type)
          if (this.polarAreaChartData.length < this.CountDlr) {
            this.polarAreaChartData.push();
          }
        }
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';

      });
  }


  GetApplicationApi() {
    this.rest.GetApplicationApi(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
      this.resultAppApi = respond;
    });
  }


  SelectApi(id_app_api, label) {

    this.ddlValueApi = label;
    this.searchApi = id_app_api.toString();
    this.ViewStatByDlr();

  }

  back() {

    this.router.navigate(['/application/statistics']);

  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


}
