import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from '../general-statistics/statistics.service';
import { DatePipe } from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { extendMoment } from 'moment-range';


@Component({
  selector: 'app-stat-by-application',
  templateUrl: './stat-by-application.component.html',
  styleUrls: ['./stat-by-application.component.scss']
})

export class StatByApplicationComponent extends MasterComponent implements OnInit {

  entry_date = '';
  id_app_api = '';
  p_begin_date: any;
  p_end_date: any;
  date = new Date();

  ApplicationCount: any;

  list = [];
  selected: any;
  locale: LocaleConfig = {
    format: 'DD/MM/YYYY',
    applyLabel: 'Ok',
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
  public barChartLabels: string[];
  public barChartType: string;
  public barChartLegend: boolean;
  
  public barChartData: any[] = [
    { data: [1], label: 'Your Application' },
  ];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          stepSize: 10
        }
      }]
    }
  };

  value: any;

  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe,
    public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
    
      super(notifierService, notificationService);
    this.alwaysShowCalendars = true;

  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    this.value = [this.todayStart, this.todayEnd];
    this.p_begin_date = this.todayStart;
    this.p_end_date = this.todayEnd;

    this.ViewStatByApplication();
    this.barChartData = [
      { data: [1], label: 'Your Application' },
    ];
    this.barChartLabels = [''];
  }

  ViewStatByApplication() {

    this.barChartData = [
      { data: [1], label: 'Your Application' },
    ];
    this.barChartLabels = [''];
    return this.rest.GetStatByApp(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
      .subscribe(res => {

        let k = 0
        this.ApplicationCount = res.length
        for (let i = 0; i < this.ApplicationCount; i++) {
          this.barChartData[i].data = ((res[i].nbr_sms_agg.split(",")))//.map(Number)))  
          this.barChartData[i].label = (res[i].title);
          this.barChartLabels = res[0].entry_date_agg.split(",")

          if (this.barChartData.length < this.ApplicationCount) {
            this.barChartData.push({ data: [0], label: '' });
          }

          this.barChartData;
          this.barChartOptions;
          this.barChartType = 'bar';
          this.barChartLegend = true;

        }
      });
  }


  back() {

    this.router.navigate(['/statistics']);
  }

    public chartClicked(e: any): void { }
    public chartHovered(e: any): void {

  }


  SelectTime(value) {

    this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))

    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.ViewStatByApplication();
  }

}
