import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterComponent } from 'src/app/_controler';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from 'src/app/_services';
import { InvoicesDownloadService } from './invoices-download.service';
import * as jspdf from 'jspdf';  

declare var jsPDF: any;



@Component({
  selector: 'app-invoices-download',
  templateUrl: './invoices-download.component.html',
  styleUrls: ['./invoices-download.component.scss']
})
export class InvoicesDownloadComponent extends MasterComponent implements OnInit {

  sales:any;
  id_solde: any;

  adminTitle : any;
  adminCompany : any;
  adminAddress : any;
  adminTVA  : any;
  entryDate  : any;
  clientCompany   : any;
  clientReference   : any;
  clientFirstname   : any;
  clientLastname  : any;
  clientAddress  : any;
  clientWebsite : any;
  clientTVA : any;
  clientSolde: any;

  @ViewChild('content') content: ElementRef;



  constructor(public nav: NavbarService, public side: SidebarService, public router:Router,
    private Invoicesrest: InvoicesDownloadService,  private route: ActivatedRoute, notifierService: NotifierService, notificationService: NotificationService) {
      super(notifierService,notificationService);
    }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();
    
    this.id_solde = this.route.snapshot.paramMap.get("id_solde");

    this.DataBindAppAmount();
  }

  Back() {
    this.router.navigate(['/invoices']);
  }

  DataBindAppAmount ()  {
   
    
    this.Invoicesrest.GetSoldeInvoice (this.id_developer.toString(),this.id_solde).subscribe(respond => {
      this.sales = respond;

      this.adminTitle = this.sales[0].our_title;
      this.adminCompany = this.sales[0].our_company;
      this.adminAddress = this.sales[0].our_address;
      this.adminTVA = this.sales[0].our_tva;
      this.entryDate = new Date(this.sales[0].entry_date);
      this.clientCompany =  this.sales[0].company;  
      this.clientFirstname =  this.sales[0].firstname;  
      this.clientLastname =  this.sales[0].lastname;  
      this.clientAddress =  this.sales[0].address;  
      this.clientWebsite =  this.sales[0].website;  
      this.clientReference = this.sales[0].id_developer;
      this.clientTVA =  this.sales[0].tva;  
      this.clientSolde=this.sales[0].solde        
    });       
  }


  makePdf() { 
    let doc = new jsPDF();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save("Invoices.pdf");
    });
  }

}
