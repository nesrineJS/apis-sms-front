import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { SoldeService } from 'src/app/common/solde/solde.service';
import { Application } from 'src/app/_model';
import { ApiService } from '../api/api.service';
import { SettingsService } from '../settings/settings.service';
import { NotificationService } from '../../_services/';
import { StatisticsService } from 'src/app/common/general-statistics/statistics.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends MasterComponent implements OnInit {

  public application: Application;
  DlrStatus = [{
    Nbr_DLR: 0,
    pourcentage: 0,
    DlrType: '',
    color: '',

  }]
  CountryStatus = [{
    Nbr_SMS: 0,
    pourcentage: 0,
    countrylabel: '',
    color: ''

  }]
  DlrCount:any;
  CountryCount:any;
  summaryDebit: any;
  summaryCountSms = 0;
  summaryCountApp = 0;
  sms = [{ title: '', number: 0, color: '', }];

  totalApi: any;
  AppTitle: any;
  summaryCredit: any;
  AppStatus: any;
  appStatusValue: boolean = false;
  AppMode: any;
  appModeValue: boolean = false;
  AppDate: any;

  dashboardBarChartlabels: string[];
  conversionBarChartlabels: string[];
  public UsersDoughnutChartlabels = [''];
  public CountryDoughnutChartlabels = [''];
  public UsersDoughnutChartData: any[] = [
    {
      data: [],
      backgroundColor: ["#ff5733",
        "#af33ff",
        "#f9ff33",
        "#86ff33",
        "#33ffb8",
        "#3399ff",
        "#9c33ff",
        "#ff33d1",
        "#8b868a",
        "#ca9dc1",
        "#87b68a",
        "#afa1d2",
        "#edbcb6"]
    }
  ];
  public CountryDoughnutChartData: any[] = [
    {
      data: [],
      backgroundColor: ["#ff5733",
        "#af33ff",
        "#f9ff33",
        "#86ff33",
        "#33ffb8",
        "#3399ff",
        "#9c33ff",
        "#ff33d1",
        "#8b868a",
        "#ca9dc1",
        "#87b68a",
        "#afa1d2",
        "#edbcb6"]
    }
  ];
  UsersDoughnutChartOptions = {
    cutoutPercentage: 70,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };
  UsersDoughnutChartColors = [
    {
      backgroundColor: ["#ff4444",
        "#00C851",
        "#ffbb33",
        "#4285F4"
       ],
      borderColor: ["#ff4444",
        "#00C851",
        "#ffbb33",
        "#4285F4"]
    }
  ];
  public dashboardBarChartData: any[] = [
    { data: [1], label: 'Your Application' },
  ];
  dashboardBarChartOptions = {
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

  constructor(public nav: NavbarService, public side: SidebarService, private ApiService: ApiService, public rest: StatisticsService,
    private restAmount: SoldeService, notifierService: NotifierService, private SettingsService: SettingsService, notificationService: NotificationService) {
    super(notifierService, notificationService);
  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    this.dashboardBarChartlabels = [''];
    this.dashboardBarChartData = [
      { data: [], label: '' },
    ];
    
    this.UsersDoughnutChartlabels = [''];
    this.UsersDoughnutChartData = [
      {
        data: [],
        backgroundColor: ["#ff5733", "#af33ff", "#f9ff33", "#86ff33", "#33ffb8", "#3399ff", "#ff33d1", "#8b868a", "#ca9dc1", "#87b68a", "#afa1d2", "#edbcb6"]
      }
    ];

    this.GetAppSummary();
    this.GetDebitSummary();
    this.GetTotalApi();
    this.GetAppDetail();

    this.ViewStatByDlr();
    this.ViewStatBySms();
    this.ViewStatByCountry();

  }

  GetDebitSummary() {

    const toDay = new Date();
    var debit = 0;
    toDay.setDate(toDay.getDate() + 3);

    this.restAmount.getSoldeDebitAmountByApplication(this.id_developer.toString(), this.id_app.toString(), this.date_developer, toDay).subscribe(respond => {

      for (let i = 0; i < respond.length; i++) {
        debit += parseFloat(respond[i].solde);
        this.summaryDebit = debit.toFixed(3).toString()
      }
    });

  }

  GetAppSummary() {

    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 3);

    this.restAmount.getAppDev(this.id_developer.toString(), this.id_app.toString(), this.date_developer, toDay).subscribe(respond => {
      this.summaryCountApp = respond.length

      for (let i = 0; i < this.summaryCountApp; i++) {
        this.summaryCountSms += parseInt(respond[i].nbr_sms)

      }
    });
  }

  GetTotalApi() {

    this.ApiService.ApiListByApplication(this.id_developer.toString(), this.id_app.toString()).subscribe(Respond => {
      this.totalApi = Respond.length
    })
  }


  OnChangeMode(id_app) {

    var v_id_app = parseInt(this.id_app);

    this.SettingsService.ApplicationMode(v_id_app).subscribe(respond => {
      if (this.AppMode == 1) {
        this.AppMode = 0;
      }
      else {
        this.AppMode = 1;
      }
    });
  }

  OnChangeStatus(id_app) {

    var v_id_app = parseInt(this.id_app);

    this.SettingsService.ApplicationStatus(v_id_app).subscribe(respond => {
      if (this.AppStatus == 1) {
        this.AppStatus = 0;
      }
      else {
        this.AppStatus = 1;
      }

    });
  }


  GetAppDetail() {

    this.SettingsService.GetApplicationDetail(this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {

      var appDetail = respond;
      this.AppTitle = appDetail[0].title
      this.AppDate = appDetail[0].entry_date;
      this.AppMode = appDetail[0].developer_mode;
      this.AppStatus = appDetail[0].status;

      if (this.AppStatus == 1) {
        this.appStatusValue = true;
      }

      if (this.AppMode == 1) {
        this.appModeValue = true;
      }

    });
  }


  filter_array(test_array) {
    var index = -1,
      arr_length = test_array ? test_array.length : 0,
      resIndex = -1,
      result = [];

    while (++index < arr_length) {
      var value = test_array[index];

      if (value) {
        result[++resIndex] = value;
      }
    }

    return result;
  }


  ViewStatByDlr() {

    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 3);

    return this.rest.GetStatByDlr(this.id_developer.toString(), this.id_app.toString(), '', this.date_developer, toDay)
      .subscribe(res => {
        this.DlrCount=res.length;
        for (let i = 0; i < this.DlrCount; i++) {
          this.UsersDoughnutChartData[0].data[i] = (parseInt(res[i].nbr_sms))
          this.UsersDoughnutChartlabels[i] = (res[i].dlr_type)


        }
        let Compteur = this.UsersDoughnutChartData[0].data.length
        let Total = 0;
        for (let j = 0; j < Compteur; j++) {
          Total += this.UsersDoughnutChartData[0].data[j]
        }

        for (let j = 0; j < Compteur; j++) {

          this.DlrStatus[j] = {
            Nbr_DLR: 0,
            pourcentage: 0,
            DlrType: '',
            color: ''

          }
          this.DlrStatus[j].Nbr_DLR = this.UsersDoughnutChartData[0].data[j];
          this.DlrStatus[j].DlrType = this.UsersDoughnutChartlabels[j]
          this.DlrStatus[j].pourcentage = parseFloat(((this.UsersDoughnutChartData[0].data[j] / Total) * 100).toFixed(3))
          this.DlrStatus[j].color = this.UsersDoughnutChartColors[0][j]
        }
      
        this.UsersDoughnutChartData;
        this.UsersDoughnutChartOptions;
        this.UsersDoughnutChartColors;
      });
  }

  ViewStatByCountry() {

    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 3);

    return this.rest.GetStatByCountry(this.id_developer.toString(), this.id_app.toString(), '', this.date_developer, toDay)
      .subscribe(res => {
      this.CountryCount=res.length

        for (let i = 0; i < this.CountryCount; i++) {
          this.CountryDoughnutChartData[0].data[i] = (parseInt(res[i].nbr_sms))
          this.CountryDoughnutChartlabels[i] = (res[i].label)


        }
        let Compteur = this.CountryDoughnutChartData[0].data.length
        let Total = 0;
        for (let j = 0; j < Compteur; j++) {
          Total += this.CountryDoughnutChartData[0].data[j]
        }

        for (let j = 0; j < Compteur; j++) {

          this.CountryStatus[j] = {
            Nbr_SMS: 0,
            pourcentage: 0,
            countrylabel: '',
            color: ''

          }
          this.CountryStatus[j].Nbr_SMS = this.CountryDoughnutChartData[0].data[j];
          this.CountryStatus[j].countrylabel = this.CountryDoughnutChartlabels[j]
          this.CountryStatus[j].pourcentage = parseFloat(((this.CountryDoughnutChartData[0].data[j] / Total) * 100).toFixed(3))
          this.CountryStatus[j].color = this.UsersDoughnutChartColors[0][j]
        }
       
        this.CountryDoughnutChartData;
        this.UsersDoughnutChartOptions;
        this.UsersDoughnutChartColors;
      });
  }


  ViewStatBySms() {

    const toDay = new Date();
    toDay.setDate(toDay.getDate() + 3);

    return this.rest.GetStatByApi(this.id_developer.toString(), this.id_app.toString(), '', this.date_developer, toDay)
      .subscribe(res => {
        const countsms = res.length;

        for (let i = 0; i < countsms; i++) {

          this.dashboardBarChartData[i].data = ((res[i].nbr_sms_agg.split(",")))//.map(Number)))  
          let Number = res[i].nbr_sms_agg.split(",")
          let totalNumber = 0

          for (let j = 0; j < (Number.length); j++) {
            totalNumber += parseFloat(Number[j])
          }

          this.sms[i] = { title: '', number: 0, color: '', };

          this.sms[i].title = res[i].label;
          this.sms[i].number = totalNumber;
          this.sms[i].color = this.dashboardBarChartColors[0][i]


          this.dashboardBarChartData[i].label = (res[i].label);
          this.dashboardBarChartlabels = res[0].entry_date_agg.split(",")
          if (this.dashboardBarChartData.length < countsms) {
            this.dashboardBarChartData.push({ data: [0], label: '' });
          }
        }
      }
      );
  }


  ShowColor(dlr_type) {

    if (dlr_type == "UNDELIVRD") {
      return "progress-bar progress-bar-striped progress-bar-animated bg-danger";
    }

    if (dlr_type =="DELIVRD") {
      return "progress-bar progress-bar-striped progress-bar-animated bg-success";
    }
    if (dlr_type == "EXPIRED") {
      return "progress-bar progress-bar-striped progress-bar-animated bg-info";
    }
    if (dlr_type == "REJECTED") {
      return "progress-bar progress-bar-striped progress-bar-animated bg-warning";
    }
    else {
      return "progress-bar progress-bar-striped progress-bar-animated bg-primary";
    }
  }



}
