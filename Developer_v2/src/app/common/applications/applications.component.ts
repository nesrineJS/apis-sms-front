import {Component, OnInit, } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationsService} from './applications.service';
import {Router} from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import {SettingsService} from '../../application/settings/settings.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { Application } from 'src/app/_model';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';



@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent extends MasterComponent implements OnInit {

  closeResult: string;
  public application : Application ;
  
  end_date=null;
  language_set="" ;
  url="";
  id_type_app:any;
  applications:any;
  type_applications:any;
  languages:any;
  lstlanguageChecked : string = ";";
  id_language="";
  label="";
  description="";
  language:any[];
  show: boolean = true;

  AppLang:any;

  applications_filter:any[]

  languages_filter:any[]
  AppTtile:any;


  constructor(private modalService: NgbModal ,private rest: ApplicationsService, public restService:SettingsService,
    public router:Router, public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService)
  { 
    super(notifierService,notificationService);
    this.application = new Application();

  }

    GetAppSummary ()  {

      const toDay = new Date();
      toDay.setDate( toDay.getDate() + 3 );

      this.rest.GetApplication (this.id_developer.toString(),'',this.date_developer,toDay).subscribe(respond => {
      this.applications = respond; 
          
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


    GetTypeApplication()  {
        this.rest.GetTypeApplication ().subscribe(respond => {
          this.type_applications = respond; 
      });            
    }

    GetLanguage()  {
      this.rest.GetLanguage().subscribe(respond => {
        this.languages = respond;
    });            
    }


PopupAddApplication(title,description,url,id_type_app, event) {
    

  this.rest.AddApplicationsService(this.id_developer.toString(), title, description, this.lstlanguageChecked, url, id_type_app)
      .subscribe(res => {

        
        
        this.application.id_app= res[0].id_app.toString();
        this.application.name= res[0].title; 

      

        sessionStorage.setItem('application',JSON.stringify(this.application));

        let btnClosePopup : HTMLElement = document.getElementById('btnClosePopup') as HTMLElement;
        btnClosePopup.click();

        this.router.navigate (['api/list']);
        this.showNotification('success',   this.application.name + ' successfully added !');

      });
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
    
  }

  GetAppDetail ()  {

    this.restService.GetApplicationDetail (this.id_developer.toString(), this.id_app.toString()).subscribe(respond => {
    
      var appDetail = respond;  
      this.AppLang =  appDetail[0].language_set;
   
     });   
              
  } 
  PopupOpen(content) {

    this.GetLanguage();
    this.GetTypeApplication();
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.PopupClose(reason)}`;

    });
  }

  PopupClose(reason: any): string {


    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';

    } else {
      return  `with: ${reason}`;
    }
  }


  PopupChechBoxChange(chkLanguage, event)
  {
      if(event.target.checked)
    {
      this.lstlanguageChecked = this.lstlanguageChecked + chkLanguage + ";"
    }
    else
    {
      this.lstlanguageChecked = this.lstlanguageChecked.replace(chkLanguage + ";", "") 
    }
  }

  PopupChechBoxCheck(chkLanguage)
  {
    if(this.AppLang.toString().indexOf(";" + chkLanguage +";") > -1)

    {
      return true;
    }    
   
    return false;
  }


  GoToSettings(id_app,title){ 

      this.application.id_app=id_app;
      this.application.name=title;
      sessionStorage.setItem('application',JSON.stringify(this.application));
      this.router.navigate(['/application/settings/'])
  }


  GoToSummary(id_app,title){ 

    this.application.id_app=id_app;
    this.application.name=title;

    sessionStorage.setItem('application',JSON.stringify(this.application));
    
    this.router.navigate(['/application/summary/'])
}

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();

    this.GetAppSummary();
  
  }

}
