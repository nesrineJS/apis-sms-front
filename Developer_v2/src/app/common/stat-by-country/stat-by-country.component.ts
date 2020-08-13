import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StatisticsService} from '../general-statistics/statistics.service';
import {DatePipe} from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { extendMoment } from 'moment-range';


@Component({
  selector: 'app-stat-by-country',
  templateUrl: './stat-by-country.component.html',
  styleUrls: ['./stat-by-country.component.scss']
})

export class StatByCountryComponent extends MasterComponent implements OnInit {

    entry_date = '';
    id_app_api = '';
    p_begin_date: any;
    p_end_date: any;
    countries: any;
    items =[];
    date=new Date()
    CountryCount:any;

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
    public monthEnd= this.todayEnd;
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd =this.todayEnd;
    public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
    public yearEnd =this.todayEnd;
    value:any;
    public doughnutChartLabels: string[] = [];
    public doughnutChartData: number[] = [];
    public doughnutChartType: string;

  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe, 
    public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
      super(notifierService,notificationService);
      this.ViewStatByCountry();
    }


  ngOnInit() {

      this.nav.Show();
      this.side.ShowSide();

      this.value = [this.todayStart,this.todayEnd];
      this.p_begin_date=this.todayStart;
      this.p_end_date= this.todayEnd;

      this.ViewStatByCountry( );
  }

  SelectTime(value) {

    this.list[0]=(value.startDate.format('YYYY-MM-DD 00:00:00'))
    this.list[1]=(value.endDate.format('YYYY-MM-DD 23:59:59' ))
    
    this.p_begin_date = this.list[0]
    this.p_end_date = this.list[1]
    this.ViewStatByCountry();
    }

  ViewStatByCountry( ) {

    return this.rest.GetStatByCountry(this.id_developer.toString(),'', this.id_app_api, this.p_begin_date, this.p_end_date)
        .subscribe(res => {
             this.doughnutChartLabels = [];
             this.doughnutChartData.splice(0, this.doughnutChartData.length)
             this.countries = res;
             this.CountryCount = res.length     
                    for (let i = 0; i < this.CountryCount; i++) {
                this.items[i]= (this.countries[i].label);
                
            }

            const count = res.length
            for (let i = 0; i < count; i++) {

                this.doughnutChartData.push(res[i].nbr_sms)
                this.doughnutChartLabels.push(res[i].label)
                if (this.doughnutChartData.length < count) {
                    this.doughnutChartData.push();

                }
            }
            this.doughnutChartType = 'doughnut';
        });
  }

    public chartClicked(e: any): void {}
    public chartHovered(e: any): void {}
    back() {this.router.navigate(['/statistics']); }


}
