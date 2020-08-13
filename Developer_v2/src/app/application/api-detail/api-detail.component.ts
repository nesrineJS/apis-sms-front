import {Component,OnInit} from '@angular/core';
import { ApiDetailService } from './api-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';


@Component({
selector: 'app-api-detail',
templateUrl: './api-detail.component.html',
styleUrls: ['./api-detail.component.scss']
})

export class ApiDetailComponent extends MasterComponent implements OnInit {

closeResult: string;
apirecommanded:any;
apidetailupdate:any;
language_set="php";

id_api:any
apiTitle : any;
apiTitleToAdd: any;
apiDescription: any;
apiBody : any;
apiVersion: any;
apiDate: any;
apiLogo: any;
apiNbrApp: any;
apiUrl: any;
apiNbrDeveloper: any;
apiID:any;
apiLabel:any;
apiTypeLabel:any;

popupApiName:any;
showDetailApiAdded = false;
popupApiLabel : any;
popupApiTitle : any;
popupApiKey : any;
popupApiSecret : any;
popupApiStatus : any;
popupApiID : any;
popupApiUrl: any;

apiStatus:any;
id_type_api:any;
title:any;
description:any;
body:any;
version:any;
end_date:any;
logo:any;
url:any;
id_api_master:any;
show: boolean = true;

constructor(public router: Router, private rest: ApiDetailService,private route: ActivatedRoute, private modalService: NgbModal, 
    public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService,notificationService);
    this.show = false;
}

ngOnInit() {
    
    this.nav.Show();
    this.side.ShowSide();

    this.id_api = this.route.snapshot.paramMap.get("id_api");
    this.route.paramMap.subscribe(params => {
    this.id_api = params.get("id_api")
    })

    this.GetApiDetailById();
    }


    GetApiDetailById()
        {
            var apirecommanded;
            this.rest.GetApiDetail(this.id_api).subscribe(res => {
            apirecommanded = res;
           this.apiTitle = apirecommanded[0].title;
            this.apiTitleToAdd = apirecommanded[0].title;
            this.apiDescription = apirecommanded[0].description;
            this.apiBody = apirecommanded[0].body;
            this.apiVersion= apirecommanded[0].version;
            this.apiDate= apirecommanded[0].entry_date;
            this.apiLogo= apirecommanded[0].logo;
            this.apiNbrApp= apirecommanded[0].nbr_app;
            this.apiNbrDeveloper= apirecommanded[0].nbr_app;
            this.apiUrl= apirecommanded[0].url;
            this.apiStatus= apirecommanded[0].status;
            this.apiID= apirecommanded[0].id_api;
            this.apiTypeLabel= apirecommanded[0].label_type_api;
    });
    }

        PopupGetApiDetail(id_app_api)
            {
            var p_id_app_api=id_app_api.toString();
            var p_id_developer=this.id_developer.toString();

            this.rest.ApiDetail(p_id_developer,p_id_app_api).subscribe(respond => {
            var apiDetail = respond;
            this.popupApiName = apiDetail[0].label;
            this.popupApiKey = apiDetail[0].key;
            this.popupApiSecret = apiDetail[0].secret;
            this.popupApiStatus = apiDetail[0].status;
            this.popupApiID = apiDetail[0].id_app_api; 
            this.popupApiUrl = apiDetail[0].url; 
            }) 
            }


        PopupApiAdd(label){

        var v_id_api= parseInt(this.id_api);
        var apiDetail;

        this.rest.ApplicationApiAdd(this.id_app.toString() ,v_id_api, this.id_developer.toString(), label) 
        .subscribe(respond => {
        apiDetail = respond;
        this.PopupGetApiDetail(apiDetail[0].id_app_api);
        this.showDetailApiAdded = true;
            })
        }


            PopupApiDetailOpen(content) {

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
                    return `with: ${reason}`;
                    }
            }


            PopupViewPassword() {
                this.show = !this.show;
            }


        PopupCopyInputMessage(inputElement){

            inputElement.select();
            document.execCommand('copy');
            inputElement.setSelectionRange(0, 0);
        }


        back() {
            this.router.navigate(['/api/list']);
          }


}