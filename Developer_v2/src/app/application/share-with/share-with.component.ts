import {Component,  OnInit} from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';

@Component({
  selector: 'app-share-with',
  templateUrl: './share-with.component.html',
  styleUrls: ['./share-with.component.scss']
})
export class ShareWithComponent extends MasterComponent implements OnInit {


  constructor(public nav: NavbarService, public side: SidebarService,notifierService: NotifierService, notificationService: NotificationService) {
    super(notifierService,notificationService);
  }

  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();

  }

}
