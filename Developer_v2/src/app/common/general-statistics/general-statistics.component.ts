
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {StatisticsService} from './statistics.service';
import {DatePipe} from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';



@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss']
})
export class GeneralStatisticsComponent  extends MasterComponent implements OnInit {

  id_app_api = '';
  p_begin_date: any;
  p_end_date: any;
  countries: any;
  items =[];
  ApplicationCount:any
  CountryCount:any
  dayCount: any;
  DlrCount:any;

  sms_mt: any;
  date=new Date()

  public weekStarting: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnding: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
  public weekEnd = this.datePipe.transform(this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
  public weekStart = this.datePipe.transform(this.weekStarting, 'yyyy-MM-dd 23:59:59').toString();
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string;
  
  public lineChartType = 'line';
  public barChartLabels: string[] = [];
  public lineChartLabels: string[] = [];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[] = [
    {data: [], label: ' '},
  ];

  public lineChartData: Array<any> = [
    {data: [], label: 'Total SMS'}
  ];

  public polarAreaChartData: number[] = [];
  public polarAreaLegend: boolean;
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartType: string;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 153, 194,0.2)',
      borderColor: 'rgba(255, 0, 102)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(0, 96, 128,0.2)',
      borderColor: 'rgba(0, 153, 204)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(255, 255, 0,0.2)',
      borderColor: 'rgba(204, 204, 0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend: boolean;
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

  constructor(public router: Router, public rest: StatisticsService, private datePipe: DatePipe, public nav: NavbarService, 
    public side: SidebarService,notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService,notificationService);
  }

  ngOnInit() {

      this.nav.Show();
      this.side.ShowSide();

      this.p_begin_date=this.weekStart;
      this.p_end_date=this.weekEnd;

      this.ViewStatByApplication();
      this.ViewStatByCountry();
      this.ViewStatByDay();
      this.ViewStatByDlr();

  }

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
    public chartClicked(e: any): void {}
    public chartHovered(e: any): void {}
    public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    }


    ViewStatByApplication( ) {
      this.barChartData = [
        {data:[1], label:'Your Application' },
       ];
       this.barChartLabels=[''];
        return this.rest.GetStatByApp(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
          .subscribe(res => {
            
             let k=0
            this.ApplicationCount = res.length
            for (let i = 0; i < this.ApplicationCount ; i++) {
            this.barChartData[i].data=((res[i].nbr_sms_agg.split(",")))//.map(Number)))  
            this.barChartData[i].label=(res[i].title);
            this.barChartLabels= res[0].entry_date_agg.split(",")
          
              if (this.barChartData.length < this.ApplicationCount ) {
                this.barChartData.push({data: [0], label: ''});     
          }
         
          this.barChartData;
          this.barChartOptions;
          this.barChartType = 'bar';
          this.barChartLegend = true;


        }});
  }

  ViewStatByCountry() {
    return this.rest.GetStatByCountry(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
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


  ViewStatByDay() {
    return this.rest.GetStatByDay(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
        .subscribe(res => {
          this.sms_mt = res;
          this.dayCount = res.length

          for (let i = 0; i < this.dayCount; i++) {
            this.lineChartLabels.push(res[i].entry_date)
              this.lineChartData[0].data[i] = (parseInt(res[i].nbr_sms, 10));
              if ( this.lineChartData.length < this.dayCount) {
                  parseInt(this.lineChartData[0].data.push(), 10);
              }
          }

          this.lineChartOptions;
          this.lineChartType = 'line';
          this.lineChartLegend = true;
          this.lineChartColors;
        });
  }


  ViewStatByDlr() {
    return this.rest.GetStatByDlr(this.id_developer.toString(), '', '', this.p_begin_date, this.p_end_date)
    .subscribe(res => {

      this.polarAreaChartLabels = [];
      this.polarAreaChartData.splice(0, this.polarAreaChartData.length)
      this.DlrCount= res.length;


      for (let i = 0; i < this.DlrCount; i++) {
        if(res[i].dlr_type =="REJECTED"||res[i].dlr_type =="EXPIRED"||res[i].dlr_type =="DELIVRD"||res[i].dlr_type =="UNKNOWN"||res[i].dlr_type =="UNDELIVRD"){
          res[i].dlr_type =res[i].dlr_type
        }
        else{
          res[i].dlr_type=" IN PROGRESS"
        }
       
        this.polarAreaChartData.push(parseInt(res[i].nbr_sms, 10))
        this.polarAreaChartLabels.push(res[i].dlr_type)
        if (this.polarAreaChartData.length < this.DlrCount) {
          this.polarAreaChartData.push();
        }
      }
      this.polarAreaLegend = true;
      this.polarAreaChartType = 'polarArea';

    });
  }

      StatApplications() {
          this.router.navigate(['/statistics/application']);
      }
      
      StatSms() {
          this.router.navigate(['/statistics/sms']);
      }
        
      StatDlr() {
          this.router.navigate(['/statistics/dlr']);
      }

      StatCountry() {
          this.router.navigate(['/statistics/country']);
      }
  
}
