import {Component, OnInit} from '@angular/core';
import { ApiListService } from './api-list.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';


@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent extends MasterComponent implements OnInit {

    allApis:any;
    apirecommanded:any;
    language_set="php;typescript;ts;javascript;c#;java";
    keyword ="";
    id_language="";
    id_type_api= "";
    categ_api="";
  
  
    constructor(public router:Router, private restApi: ApiListService, public nav: NavbarService, public side: SidebarService, 
     notifierService: NotifierService, notificationService: NotificationService) {
      super(notifierService,notificationService);
      this.GetApis(this.keyword, this.id_language,this.id_type_api,this.categ_api);
          this.GetApisRecommandation(this.language_set)
    }
  
    GetApis(keyword, id_language,id_type_api,categ_api) {
      this.restApi.ViewApis(keyword,id_language, id_type_api,categ_api).subscribe(res => {
        this.allApis = res;
      });
    }
  
    GetApisRecommandation(language_set) {
      this.restApi.ViewApisRecommendation(language_set).subscribe(res => {
        this.apirecommanded = res;

      });
    }

    ngOnInit() {

      this.nav.Show();
      this.side.ShowSide();
    
    }
  
    Back() {
      this.router.navigate(['./api/',this.id_app])
    }

    
    GoToApiDetail(id_api){
      
      this.router.navigate(['/api/detail/',id_api])

    }
   
  }
