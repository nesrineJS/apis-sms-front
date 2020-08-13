import {Component, OnInit} from '@angular/core';
import { SidebarService } from './sidebar.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationsService} from '../../common/applications/applications.service';
import {SoldeService} from '../../common/solde/solde.service';
import { MenuComponent } from 'src/app/_controler/';
import {Application} from '../../_model';
import { NotifierService } from 'angular-notifier';


@Component({
    
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],

})

export class SidebarComponent  extends MenuComponent implements OnInit {
    
    closeResult: string;
    public application : Application;
    applications:any;
    type_applications:any;
    languages:any;
    lstlanguageChecked : string = ";"

    sumSolde:any;
    DEFAULT_CURRENCY = 'DT';
    totalSum:any;


    protected notifier: NotifierService;  

    constructor(private modalService: NgbModal ,private rest: ApplicationsService,
        public router:Router, public side: SidebarService, 
        private restsolde: SoldeService ,notifierService: NotifierService)
    {
        super()
        this.application = new Application();
        this.notifier = notifierService;
        
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
                
                this.router.navigate (['/api/list']);

                this.showNotification( 'success', this.application.name + ' successfully added now !');
            });     
    }

    
    public showNotification( type: string, message: string ): void {
        this.notifier.notify( type, message );
        
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

    private PopupChechBoxChange(chkLanguage, event)
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

    GetSum() {
     
        this.restsolde.GetSoldeSum(this.id_developer.toString(),this.DEFAULT_CURRENCY).subscribe(respond => {
            this.sumSolde=respond;
            this.totalSum= this.sumSolde[0].sum
           
        });
    }

    onLogout(){

        localStorage.clear();     
        sessionStorage.clear();        
        this.router.navigate(['/login']);    
      }

    ngOnInit() {
        this.GetSum();
    }


}
