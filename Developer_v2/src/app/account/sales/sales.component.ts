import { Component, OnInit } from '@angular/core';
import { SalesService } from './sales.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';

import {ExcelService} from '../../GlobalServices/excel.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import { ActivatedRoute } from '@angular/router';


declare var jsPDF: any;


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})

export class SalesComponent extends MasterComponent implements OnInit {

      sales:any;
      totalDebit:any;
      summaryDebit:any;
      debit = 0;

      constructor(private rest: SalesService, public nav: NavbarService, public side: SidebarService,
         private excelService: ExcelService, notifierService: NotifierService, 
         notificationService: NotificationService,  private route: ActivatedRoute) {
        super(notifierService,notificationService);
      }

      ngOnInit() {

        this.nav.Show();
        this.side.ShowSide();

        this.DataBindAppAmount(); 

      }

      DataBindAppAmount ()  {

        const toDay = new Date();
        toDay.setDate( toDay.getDate() + 3 ); 
        
        this.rest.GetSoldeDebitAmount(this.id_developer.toString(),this.date_developer,toDay).subscribe(respond => {
          this.sales = respond;
          this.debit = 0;

          for(let i=0; i< this.sales.length; i++){  
           this.summaryDebit += parseFloat(this.sales[i].solde)                
            this.debit += parseFloat(this.sales[i].solde); 
            this.totalDebit = this.debit.toFixed(3).toString();    
          }          
        });
            
    }


      exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.sales, 'Invoices');
    }
   
}
