import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { SuperComponent } from './super.component';
import { NotificationService} from '../_services';


@Component({
 template:''
})


export class MasterComponent extends SuperComponent {

	protected notifier: NotifierService;  
	protected notificationService : NotificationService;
 	notification:any;

  
  constructor( notifierService: NotifierService, notificationService: NotificationService) {
        
		super();
		this.notificationService =   notificationService;
        this.notifier = notifierService;
      }

      ngAfterViewInit(){
		this.GetNotification();
      }

      ngOnInit() {}
      

	 GetNotification(){ 

		var status = '0';
		var count =0;  
		var notifMessage : any;
		var notifType: any;   
		var notifID: any;  

			
		this.notificationService.GetNotifications(this.id_developer.toString(), status).subscribe(respond => {

			 count= respond.length

			 for(let i=0; i <count;i++){    

				notifMessage =respond[i].body;
				notifType =respond[i].param1;
				notifID = respond[i].id_dev_notif;

				this.showNotification(notifType, notifMessage,notifID);

				this.Status(notifID);
			} 			
		  });            
		}
	

		Status(notifID){
			this.notificationService.Status(notifID).subscribe(respond => {
				});            
			}

		public showNotification( type: string, message: string, ident: string ): void {
			this.notifier.notify( type, message, ident );
			
		}		
	
}
