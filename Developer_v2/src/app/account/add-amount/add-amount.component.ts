import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';



@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.component.html',
  styleUrls: ['./add-amount.component.scss']
})
export class AddAmountComponent extends MasterComponent implements OnInit {

  constructor(public nav: NavbarService , public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService) { 
    super(notifierService,notificationService);
  }

  ngOnInit() {
    
    this.nav.Show();
    this.side.ShowSide();

  }

}
