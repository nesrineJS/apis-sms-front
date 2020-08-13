import { Component, OnInit} from '@angular/core';
import { BoiteEnvoieService } from './boite-envoie.service';
import { DatePipe } from '@angular/common';
import {ExcelService} from '../../GlobalServices/excel.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { PagerService, NotificationService } from '../../_services/'
import * as moment from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { extendMoment } from 'moment-range';


@Component({
  selector: 'app-boite-envoie',
  templateUrl: './boite-envoie.component.html',
  styleUrls: ['./boite-envoie.component.scss']
})
export class BoiteEnvoieComponent  extends MasterComponent implements OnInit {

  list = [];
  selected: any;
  p_begin_date: any;
  locale: LocaleConfig = {
  format: 'DD/MM/YYYY',
  applyLabel: 'OK',
  customRangeLabel: ' customRange',
  daysOfWeek: moment.weekdaysMin(),
  monthNames: moment.monthsShort(),
  firstDay: moment.localeData().firstDayOfWeek(),
  }
  p_end_date: any;
  date = new Date();
  
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
      resultSmsMt:any[];

      fixedSizeData = Array(10000).fill(30);
      searchKeyword="";
      searchDlr="";
      searchCountry="";
      searchStatus="";

      nbrMessageMt=0;
      nbrPage = 0;
      PAGE_ROW_LENGTH = 5;
      pager: any = {};

      
      nbrSMS=0;

      countries: any;     
      entry_date: any;
      send_date: any;
      dlr_date: any;
      dlr_type: any;   
      pagination: any;
      countSMS:any;

      p: number[] = [];

      ddlValueCountry: any = 'Select Country' ;
      ddlValueDlrType:any='Select Dlr';
      ddlValueStatus:any='Select Status';
      ddlValueDate: any = 'Today' ;

      toDayDate = new Date();



      public today: Date = new Date(new Date().toDateString());
      public todayStart = this.datePipe.transform(this.date, 'yyyy-MM-dd 00:00:00').toString();
      public todayEnd = this.datePipe.transform(this.date, 'yyyy-MM-dd 23:59:59').toString();    

      public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
      public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()- (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
      
      public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
      public monthEnd: Date = this.today;
     
      public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
      public lastEnd: Date = this.today;
      public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
      public yearEnd: Date = this.today;

      value: any;


      constructor(private rest: BoiteEnvoieService, public datePipe: DatePipe,private excelService: ExcelService, 
        public nav: NavbarService, public side: SidebarService, notifierService: NotifierService,
        private pagerService: PagerService, notificationService: NotificationService) {
          super(notifierService,notificationService);
          this.GetCountryService();
          this.alwaysShowCalendars = true;
      }

    
      ngOnInit() {

        this.nav.Show();
        this.side.ShowSide();

        this.value = [this.todayStart,this.todayEnd];
        this.p_begin_date=this.todayStart;
        this.p_end_date= this.todayEnd;
        this.GetViewByCountry(this.id_developer);

        this.GetViewCountBySMSMT();
                
      }
    
      GetCountryService() {
        this.rest.GetCountry().subscribe(respond => {
          this.countries = respond;
        });
      }
  
      GetViewByCountry(id_developer) {            
       this.rest.GetViewByCountry(id_developer.toString()).subscribe(respond => {
        this.countries = respond;
        });
    }

      GetViewCountBySMSMT() {    
      
        
        this.rest.GetViewCount(this.searchKeyword,this.id_developer.toString(), '','','', this.searchDlr, '', this.searchCountry, this.searchStatus,
        this.p_begin_date, this.p_end_date).subscribe(respond => {
            this.countSMS=respond;


            this.nbrMessageMt = this.countSMS[0].nbr_message;

            this.nbrPage = this.nbrMessageMt / this.PAGE_ROW_LENGTH;

            this.nbrSMS = this.countSMS[0].nbr_sms;
            
            this.setPage(1);
        });
      }

      setPage(page: number) {
        
        this.pager = this.pagerService.getPager(this.nbrMessageMt, page, this.PAGE_ROW_LENGTH);
        
        this.GetViewPaginationBySMSMT(page);
    }


    GetViewPaginationBySMSMT(page) {     
          
    
      this.rest.GetViewPagination(this.searchKeyword,this.id_developer.toString(), '','','', this.searchDlr, '', 
      this.searchCountry, this.searchStatus,this.p_begin_date, this.p_end_date, page, this.PAGE_ROW_LENGTH).subscribe(respond => {
      this.pagination = respond;

     
      });
  }

      GetStatusText(status, send_date) {
        
        switch (status) {
          case '1':
          return 'sent ( '+send_date+' )';
          case '0':
            return 'untreated  ( '+send_date+' )';
          case '2':
            return 'error  ( '+send_date+' )';
          case '3':
            return 'suspended  ( '+send_date+' )';    
        }
      }

      GetDlrText(dlr_type, dlr_date) {

        switch (dlr_type) {
          case 'DELIVRD':
          return 'DELIVRD  ( '+dlr_date+' )';
          case 'UNDELIV':
            return 'UNDELIV  ( '+dlr_date+' )';
          case 'EXPIRED':
            return 'EXPIRED  ( '+dlr_date+' )';
          case 'REJECTED':
            return 'REJECTED  ( '+dlr_date+' )';
        }
      }

     
      SelectTime(value) {

        this.list[0] = (value.startDate.format('YYYY-MM-DD 00:00:00'))
        this.list[1] = (value.endDate.format('YYYY-MM-DD 23:59:59'))
    
        this.p_begin_date = this.list[0]
        this.p_end_date = this.list[1]
        
        this.GetViewCountBySMSMT();
      }


      SelectCountry(id_country, label) {

        this.ddlValueCountry =  label ;
        this.searchCountry = id_country;

        this.GetViewCountBySMSMT();
      }


      SelectDlrType(dlr_type) {

        this.searchDlr = dlr_type;
        if(dlr_type == '')
                dlr_type = 'All Dlr ...'

        this.ddlValueDlrType =  dlr_type ;

        this.GetViewCountBySMSMT();
      }


      SelectStatus(status, label) {

        this.ddlValueStatus =  label ;
        this.searchStatus = status;

        this.GetViewCountBySMSMT();
      }


      SelectKeyWord(keyword)
      {
        this.searchKeyword = keyword;

        this.GetViewCountBySMSMT();
      }


      exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.pagination, 'SMS MT');
    }
 
}

