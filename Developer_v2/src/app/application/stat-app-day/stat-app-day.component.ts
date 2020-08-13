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
  selector: 'app-stat-app-day',
  templateUrl: './stat-app-day.component.html',
  styleUrls: ['./stat-app-day.component.scss']
})
export class StatAppDayComponent extends MasterComponent implements OnInit {

  entry_date = '';
  id_app_api = '';
  items = '';
  p_begin_date: any;
  p_end_date: any;
  resultAppApi: any;
  searchApi = "";
  ddlValueApi: any = 'Select Api';

  date = new Date();
  CountSms: any;

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

  public lineChartType = 'line';
  public lineChartLabels: string[] = [];
  public lineChartData: Array<any> = [
    { data: [], label: 'Total SMS' }

  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // pink
      backgroundColor: 'rgba(255, 153, 194,0.2)',
      borderColor: 'rgba(255, 0, 102)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // blue
      backgroundColor: 'rgba(0, 96, 128,0.2)',
      borderColor: 'rgba(0, 153, 204)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // yellow
      backgroundColor: 'rgba(255, 255, 0,0.2)',
      borderColor: 'rgba(204, 204, 0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];

  public lineChartLegend: boolean;

  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe,public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
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

    this.GetApplicationApi();


    this.ViewStatByDay();

    this.lineChartData = [
      { data: [], label: 'Total SMS' }
    ];
  }


  SelectTime(value) {

    this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))

    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.ViewStatByDay();
  }


  GetApplicationApi() {

    this.rest.GetApplicationApi(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
      this.resultAppApi = respond;
    });
  }

  SelectApi(id_app_api, label) {

    this.ddlValueApi = label;
    this.searchApi = id_app_api.toString();

    this.ViewStatByDay();

  }

  isRange(begin, end) {
    return begin.equals(end) || this.isHovered(begin, end);
  }
  isHovered(begin, end) {
    return end.after(begin) && begin.before(end);
  }


  ViewStatByDay() {

    this.lineChartData = [
      { data: [], label: 'Total SMS' }
    ];
    return this.rest.GetStatByDay(this.id_developer.toString(), this.id_app.toString(), this.searchApi, this.p_begin_date, this.p_end_date)
      .subscribe(res => {
        this.lineChartLabels = [];
        this.CountSms = res.length
        for (let i = 0; i < this.CountSms; i++) {
          this.lineChartLabels.push(res[i].entry_date)
          this.lineChartData[0].data[i] = (parseInt(res[i].nbr_sms, 10));
          if (this.lineChartData.length < this.CountSms) {
            parseInt(this.lineChartData[0].data.push(), 10);
          }
        }
        this.lineChartOptions;
        this.lineChartType = 'line';
        this.lineChartLegend = true;
        this.lineChartColors;
      });
  }


  back() {

    this.router.navigate(['/application/statistics/']);
  }

    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
    public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }


}
