import { Component, OnInit} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from './navbar.service';
import { LoginService } from 'src/app/account/login/login.service';
import { ApplicationsService } from 'src/app/common/applications/applications.service';
import { MenuComponent } from 'src/app/_controler/';
import { Application } from 'src/app/_model';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent extends MenuComponent implements OnInit {

      applications:any;
      notifications:any;
      countWeb:any;  
      notifDate:any;  
      selectedApplication:any; 
      public loading = false;

      public sidebarOpened = false;
      public application : Application;

      constructor(config: NgbDropdownConfig, public nav: NavbarService, 
        private restApp: ApplicationsService,private router:Router, private restWeb : NavbarService, private route: ActivatedRoute) 
      {
          super();
          config.placement = 'bottom-right';


          this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        };
    
          this.application = new Application();

          
      }
     
      toggleOffcanvas() {

        this.sidebarOpened = !this.sidebarOpened;
        if (this.sidebarOpened) {
          document.querySelector('.sidebar-offcanvas').classList.add('active');
        }
        else {
          document.querySelector('.sidebar-offcanvas').classList.remove('active');
        }
      }

        public iconOnlyToggled = false;
        toggleIconOnlySidebar() {
          
          this.iconOnlyToggled = !this.iconOnlyToggled;
          if (this.iconOnlyToggled) {
            document.querySelector('body').classList.add('sidebar-icon-only');
          }
          else {
            document.querySelector('body').classList.remove('sidebar-icon-only');
          }
        }

      onLogout(){

        localStorage.clear();
        sessionStorage.clear();   
        this.router.navigate(['/login']);        
      }

    GetAppSummary ()  {

      const toDay = new Date();
      toDay.setDate( toDay.getDate() + 3 );
      this.restApp.GetApplication (this.id_developer.toString(),'',this.date_developer,toDay).subscribe(respond => {
      this.applications = respond;
        });
    }

    GetApplication(event){

      sessionStorage.removeItem('application');   

      this.application.id_app= event.target.value;
      this.application.name= event.target.options[event.target.selectedIndex].text;

      sessionStorage.setItem('application',JSON.stringify(this.application));
      this.router.navigate(['/application/summary/', this.application.id_app]); 
  
    }
   
   GetDeveloperNotificationWeb(){

    const toDay = new Date();
    toDay.setDate( toDay.getDate() + 3 );

    this.restWeb.GetNotificationWeb (this.id_developer.toString(),this.date_developer,toDay, status).subscribe(respond => {
    this.notifications = respond;

    this.countWeb= this.notifications.length;    
  });
}

    ngOnInit() {
      
      this.GetAppSummary();
      this.GetDeveloperNotificationWeb();
      if( this.route.snapshot.params['id_app'])
      {
            this.application.id_app = this.route.snapshot.params['id_app'];
      }

      this.selectedApplication = this.id_app;
    }

}
