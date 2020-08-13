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
  selector: 'app-stat-app-api',
  templateUrl: './stat-app-api.component.html',
  styleUrls: ['./stat-app-api.component.scss']
})

export class StatAppApiComponent extends MasterComponent implements OnInit {

  resultAppApi: any;
  searchApi = '';
  p_begin_date: any;
  p_end_date: any;
  ddlValueApi: any;
  date = new Date();
  CountApi: any;

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
  lstlanguageChecked: string = ";";

  public barChartLabels: string[] = [];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
    { data: [0], label: ' ' }
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 20,
          stepSize: 3
        }
      }]
    }
  };


  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe,public nav: NavbarService, public side: SidebarService, private notifierService: NotifierService, notificationService: NotificationService) {
    
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
    this.ViewStatByApi();
    this.barChartData = [
      { data: [], label: ' ' },
    ];
    this.ddlValueApi = 'Select Api';

    this.ViewStatByApi();
  }


  ViewStatByApi() {

    this.barChartData = [
      { data: [0], label: '' }
    ];
    this.barChartLabels = []

    return this.rest.GetStatByApi(this.id_developer.toString(), this.id_app.toString(), this.searchApi, this.p_begin_date, this.p_end_date)
      .subscribe(res => {

        this.CountApi = res.length
        for (let i = 0; i < this.CountApi; i++) {
          this.barChartData[i].data = ((res[i].nbr_sms_agg.split(",").map(Number)))
          this.barChartData[i].label = (res[i].label);
          this.barChartLabels = (res[i].entry_date_agg.split(","));
          if (this.barChartData.length < this.CountApi) {
            this.barChartData.push({ data: [], label: '' });

          }
        }
        this.barChartData;

        this.barChartLabels;
        this.barChartOptions;
        this.barChartType = 'bar';
        this.barChartLegend = true;
      });
  }

  SelectTime(value) {

    this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))

    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.ViewStatByApi();
  }

  back() {

    this.router.navigate(['/application/statistics']);

  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public randomize(): void {
    
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];

    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }


  GetApplicationApi() {
    this.rest.GetApplicationApi(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
      this.resultAppApi = respond;
    });
  }


  SelectApi(id_app_api, label) {

    this.ddlValueApi = label;
    this.searchApi = id_app_api.toString();

    this.ViewStatByApi();

  }
}
