import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import {SoldeService} from '../solde/solde.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class DashboardComponent extends MasterComponent implements OnInit{
     
      summaryDebit : any;
      summaryCredit:any;
      p_begin_date: any;
      p_end_date: any;
      date=new Date();
      summaryCountSms = 0;
      AmountCount:any;
      countsms:any;
      summaryCountApp = 0;
      summaryCountAmount=0;

      public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
      public weekEnding: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
          - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());

      type: string;
      message: string;

      MaxSMS:any;
      Total:any;
      MinSMS:any;
      public AmountBarChartlabels: string[];
      public SmsBarChartlabels: string[];
      public SmsBarChartData: any[] = [
        {data: [], label: ''},
           ];

     public barChartType: string;
     public barChartLegend: boolean;
      public AmountBarChartData: any[] = [
     {data: [], label: ''},
        ];
        applications =[{title:'', solde:0 }]
        sms =[{title:'', number:0 }]

        public ListOfSMS: number[] = [];

        constructor(public nav: NavbarService , public side: SidebarService, private restAmount: SoldeService, notifierService: NotifierService, public DashboardService:DashboardService,
          notificationService: NotificationService) {
            super(notifierService,notificationService);
        }

        ngOnInit() {

          this.nav.Show();
          this.side.ShowSide(); 
          this.SmsBarChartlabels=[''];
         this. SmsBarChartData= [
           {data: [], label: ''}, 
           ];
          this.AmountBarChartData = [
            {data:[], label:'' },
           ];
           this.AmountBarChartlabels=[''];
         
          this.p_begin_date="2010-01-01 00:00:00";
          this.p_begin_date="2023-01-01 00:00:00";
          this.ViewStatByAmount();
          this.ViewStatBySms();
          this.GetDebitSummary (); 
          this.GetAppSummary();
          this.GetPerformance();

        }
        
        
      GetDebitSummary() {

        const toDay = new Date();
        var debit = 0;
        toDay.setDate( toDay.getDate() + 3 ); 
        this.restAmount.getSoldeDebitAmount(this.id_developer.toString(),this.date_developer,toDay).subscribe(respond => { 
        for(let i=0; i< respond.length;i++){ 
        debit += parseFloat(respond[i].solde); 
        this.summaryDebit = debit.toFixed(3).toString() 
              }
           }); 
        }
      

      GetAppSummary ()  {

          const toDay = new Date();
          var credit = 0;
          toDay.setDate( toDay.getDate() + 3 );

          this.restAmount.getAppDev (this.id_developer.toString(),'',this.date_developer,toDay).subscribe(respond => {
          this.summaryCountApp = respond.length          
              
          for(let i=0; i< this.summaryCountApp; i++){  
                        
            this.summaryCountSms += parseInt(respond[i].nbr_sms)    
            credit += parseFloat(respond[i].solde)           
            this.summaryCredit = credit.toFixed(3).toString() 
          }
        });            
      }


        GetPerformance(){

          const toDay = new Date();
          toDay.setDate( toDay.getDate() + 3 );
          const reducer = (accumulator, currentValue) => accumulator + currentValue;

          this.restAmount.getAppDev(this.id_developer.toString(),'',this.date_developer,toDay).subscribe(respond => {

            this.ListOfSMS.splice(0, this.ListOfSMS.length)
            const count = respond.length;
            for (let i = 0; i < count; i++) {
              this.ListOfSMS.push(parseInt(respond[i].nbr_sms, 10))
              if (this.ListOfSMS.length < count) {
                this.ListOfSMS.push();
              }
            }
         
            this.MaxSMS=Math.max.apply(null, this.ListOfSMS);
          
            this.Total=this.ListOfSMS.reduce(reducer);
       
            this.MinSMS=Math.min.apply(null, this.ListOfSMS);
          });            
      }
      AmountBarChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              fontColor: "#bdbcbe"
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: false
            },
            barPercentage: 0.2
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
      dashboardBarChartColors = [
        {
          backgroundColor: '#ff5733',
        },
        {
          backgroundColor: '#af33ff'
        },
        {
          backgroundColor: '#f9ff33'
        },
        {
          backgroundColor: '#86ff33'
        },
        {
          backgroundColor: '#33ffb8'
        },
        {
          backgroundColor: '#3399ff'
        },
        {
          backgroundColor: '#9c33ff'
        },
        {
          backgroundColor: '#ff33d1'
        },
        {
          backgroundColor: '#8b868a'
        },
        {
          backgroundColor: '#ca9dc1'
        },
        {
          backgroundColor: '#87b68a'
        },
        {
          backgroundColor: '#afa1d2'
        }, {
          backgroundColor: '#edbcb6'
        },
    ];



    ViewStatByAmount( ) {

       const toDay = new Date();
       toDay.setDate( toDay.getDate() + 3 );  

        return this.DashboardService.GetStatByAmount(this.id_developer.toString(), '', '',this.date_developer,toDay)
          .subscribe(res => {
            this.AmountCount=res.length 
            for (let i = 0; i < this.AmountCount; i++) {

            this.AmountBarChartData[i].data=((res[i].solde_agg.split(",")))//.map(Number)))  
            let solde=res[i].solde_agg.split(",")
            let total=0

             for(let j=0; j<(solde.length); j++){
              total+=parseFloat(solde[j])
            }

            this.applications[i] = {title:'', solde:0 };

            this.applications[i].title =  res[i].title;
            this.applications[i].solde=total;


            this.AmountBarChartData[i].label=(res[i].title);
            this.AmountBarChartlabels= res[0].entry_date_agg.split(",")
            if (this.AmountBarChartData.length < this.AmountCount) {
              this.AmountBarChartData.push({data: [0], label: ''});     
          }

          this.applications;
          this.AmountBarChartlabels;
          this.AmountBarChartData;
          this.AmountBarChartOptions;
      
        }

       }
      
      );
  }

  ViewStatBySms( ) {
  
         const toDay = new Date();
         toDay.setDate( toDay.getDate() + 3 );  
  
          return this.DashboardService.GetStatByApplication(this.id_developer.toString(), '', '',this.date_developer,toDay)
            .subscribe(res => {
              this.countsms = res.length;
             
              for (let i = 0; i < this.countsms; i++) {
  
              this.SmsBarChartData[i].data=((res[i].nbr_sms_agg.split(",")))//.map(Number)))  
              let Number=res[i].nbr_sms_agg.split(",")
              let totalNumber=0
  
               for(let j=0; j<(Number.length); j++){
                totalNumber+=parseFloat(Number[j])
              }
  
              this.sms[i] = {title:'', number:0 };

              this.sms[i].title =  res[i].title;
              this.sms[i].number=totalNumber;
  
  
              this.SmsBarChartData[i].label=(res[i].title);
              this.SmsBarChartlabels= res[0].entry_date_agg.split(",")
              if (this.SmsBarChartData.length < this.countsms) {
                this.SmsBarChartData.push({data: [0], label: ''});     
            }

            this.sms;
            this.SmsBarChartlabels;
            this.SmsBarChartData;
            this.AmountBarChartOptions;
           
          }
         }
    
        );
    }
  }
