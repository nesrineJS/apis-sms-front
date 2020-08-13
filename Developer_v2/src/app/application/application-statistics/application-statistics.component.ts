import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../../common/general-statistics/statistics.service';
import {DatePipe} from '@angular/common';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';

@Component({
  selector: 'app-application-statistics',
  templateUrl: './application-statistics.component.html',
  styleUrls: ['./application-statistics.component.scss']
})

export class ApplicationStatisticsComponent  extends MasterComponent implements OnInit {

  entry_date = '';
  id_app_api = '';
  p_begin_date: any;
  p_end_date: any;
  countries: any;
  items = '';
  AppTypeAppValue: any;
  CountApi:any;
  CountSms:any;
  CountDlr:any;
  CountCountries:any

  public weekStarting: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnding: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
  - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
  public weekEnd = this.datePipe.transform(this.weekEnding, 'yyyy-MM-dd 23:59:59').toString();
  public weekStart = this.datePipe.transform(this.weekStarting, 'yyyy-MM-dd 23:59:59').toString();



  public lineChartType = 'line';
  public barChartLabels: string[] = [];
  public lineChartLabels: string[] = [];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[] = [
      { data: [5, 3], label: 'SOAP' },
      { data: [3], label: 'json' },
      { data: [2], label: 'rest' },
   
  ];
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string;
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

  public lineChartLegend: boolean;

  constructor(public router: Router, public rest: StatisticsService,  private datePipe: DatePipe, 
    public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
      super(notifierService,notificationService);
    }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    this.p_begin_date=this.weekStart;
    this.p_end_date=this.weekEnd;
    
      this.ViewStatByApi();
      this.ViewStatByCountry();
      this.ViewStatByDay();
      this.ViewStatByDlr();
     
      this.barChartData = [
          {data: [], label: ' '},
      ];      
  }


  ViewStatByApi() {

    return this.rest.GetStatByApi(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
        .subscribe(res => {
            this.barChartLabels = [];
             this.CountApi=res.length
          for (let i = 0; i < this.CountApi; i++) {
              this.barChartLabels.push(res[i].entry_date)
            this.barChartData[i].data[i] = (parseInt(res[i].nbr_sms, 10))
            this.barChartData[i].label = res[i].label;
            if (this.barChartData.length < this.CountApi) {
              this.barChartData.push({data: [], label: ''});
            }
          }
          this.barChartOptions;
          this.barChartType = 'bar';
          this.barChartLegend = true;
        });
  }


  ViewStatByCountry() {

    return this.rest.GetStatByCountry(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
        .subscribe(res => {
          this.countries = res;
        this.CountCountries=res.length;
          for (let i = 0; i < this.CountCountries; i++) {
            this.items = this.countries[i].label;
          }
          this.doughnutChartLabels.push(this.items)
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

    return this.rest.GetStatByDay(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
        .subscribe(res => {
          this.CountSms=res.length;
          for (let i = 0; i < this.CountSms; i++) {
            this.lineChartLabels.push(res[i].entry_date)
            this.lineChartData[0].data[i] = (parseInt(res[i].nbr_sms, 10));
              if ( this.lineChartData.length < this.CountSms) {
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
    
    return this.rest.GetStatByDlr(this.id_developer.toString(), this.id_app.toString(), this.id_app_api, this.p_begin_date, this.p_end_date)
        .subscribe(res => {
       this.CountDlr=res.length
          for (let i = 0; i < this.CountDlr; i++) {
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


      StatApi() {
        this.router.navigate(['/application/statistics/api']);
      }
      StatSms( ) {
        this.router.navigate(['/application/statistics/sms']);

    }
      StatDlr() {
        this.router.navigate(['/application/statistics/dlr']);
      }
      StatCountry() {
        this.router.navigate(['/application/statistics/country']);
      }

      public chartClicked(e: any): void {}
      public chartHovered(e: any): void {}
      public randomizeType(): void {
      this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
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
  
}
