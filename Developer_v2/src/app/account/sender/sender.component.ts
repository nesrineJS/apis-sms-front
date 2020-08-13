import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SenderService } from './sender.service';
import {Router} from '@angular/router';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';


@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent extends MasterComponent implements OnInit {

          closeResult: string;
          senders:any[];
          senderAdd:any;
          date="";
          nbr_sms: any;
          status: any;
          public errorMessage: string = '';


          constructor(private modalService: NgbModal, private rest: SenderService, 
            public router:Router, public nav: NavbarService, public side: SidebarService,  notifierService: NotifierService, notificationService: NotificationService) {
              super(notifierService,notificationService);
              this.GetSender();
          }

            ngOnInit() {
              this.nav.Show();
              this.side.ShowSide();

            }


            GetSender() {
              var v_id_developer= this.id_developer.toString();
              this.rest.GetSender(v_id_developer).subscribe(respond => {
                this.senders = respond.sort();
              });     
            }
   

            OpenPopUp(content) {
              this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });
            }

            
        PopupAddSender(sender, event) {
              
          this.rest.AddSender(this.id_developer.toString(),sender)
              .subscribe(respond => {
                this.senderAdd = respond;   
                let btnClosePopup : HTMLElement = document.getElementById('btnClosePopup') as HTMLElement;
                btnClosePopup.click();
                this.showNotification('success', this.senderAdd[0].sender+' '+' successfully added !');

              });   
          }

        public showNotification( type: string, message: string ): void {
          this.notifier.notify( type, message );
          
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


      private getDismissReason(reason: any): string {
              if (reason === ModalDismissReasons.ESC) {
                return 'by pressing ESC';
              } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                return 'by clicking on a backdrop';
              } else {
                return  `with: ${reason}`;
              }
            }

  
  getStatusState(status) { 
              switch (status) {
                case '1':
                  return 'activated';
                case '2':
                  return 'not permitted ';
                case '0':
                  return 'not activated';              
              }
            }

  calculateClasses() { 
         return {
              badge: true,
                 'badge-success': true,
                 'badge-danger':true,
                 'badge-warning': true       
              };
          }
}
