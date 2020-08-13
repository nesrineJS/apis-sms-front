import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { MasterComponent } from 'src/app/_controler/master.component';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import { PrivacyService } from './privacy.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Developer } from 'src/app/_model';
import { BehaviorSubject } from 'rxjs';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})

export class PrivacyComponent extends MasterComponent implements OnInit {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  type: any;
  views: any;

  public developer: Developer;
  public applicationsData: any = [];
  user: SocialUser;

  key: any;
  id_type_auth: any;
  last_date: any;
  email: any;
  mobile: any;
  uid: any;
  token: any;

  param1: any;
  param2: any;

  verif_type_facebook = false;
  verif_type_google = false;
  AUTH_TYPE_FACEBOOK = 1;
  AUTH_TYPE_GOOGLE = 2;

  loginGoogle: any;
  loginFacebook: any;

  compteur_verif_status = 0;
  compteur_verif = 0;

  constructor(private router: Router, private authService: AuthService, public nav: NavbarService, public side: SidebarService, notifierService: NotifierService, notificationService: NotificationService, private restType: PrivacyService) {
    super(notifierService, notificationService);
  }


  ngOnInit() {

    this.nav.Show();
    this.side.ShowSide();


    this.ViewAllDeveloperTypeAuthentication();
    this.compteur_verif;

  }


  SignUpWithGoogle(): void {

    const toDay = new Date();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userGoogleData => {

      this.user = userGoogleData;
      this.param1 = userGoogleData.firstName;
      this.param2 = userGoogleData.lastName;
      this.email = userGoogleData.email;
      this.id_type_auth = this.AUTH_TYPE_GOOGLE;
      this.uid = userGoogleData.id;
      this.token = userGoogleData.authToken;
      this.mobile = '';

      this.AddTypeAuthConnection(this.id_developer, this.id_type_auth, toDay, this.email, this.mobile, this.uid,
        this.token, this.param1, this.param2);
    }));
    this.loggedIn.next(true);

  }


  SignUpWithFacebook(): void {

    const toDay = new Date();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userFacebookData => {
      this.user = userFacebookData;
      this.param1 = userFacebookData.firstName;
      this.param2 = userFacebookData.lastName;
      this.mobile = '';
      this.id_type_auth = this.AUTH_TYPE_FACEBOOK;
      if (userFacebookData.email == undefined) {
        this.email = userFacebookData.id + '@Exemple.com'
      } else {
        this.email = userFacebookData.email
      }
      this.uid = userFacebookData.id;
      this.token = userFacebookData.authToken;

      this.AddTypeAuthConnection(this.id_developer, this.id_type_auth, toDay, this.email, this.mobile, this.uid,
        this.token, this.param1, this.param2);
    }));

    this.loggedIn.next(true);

  }


  ViewAllDeveloperTypeAuthentication() {

    this.compteur_verif_status = 0;
    this.restType.ViewTypeAuth(this.id_developer).subscribe(respond => {
      this.views = respond;
      this.compteur_verif = this.views.length;
      for (let i = 0; i < this.compteur_verif; i++) {
        if (this.views[i].id_type_auth == 1 && this.views[i].status == "1") {
          this.verif_type_facebook = true;
          this.compteur_verif_status += 1

        }
        else if (this.views[i].id_type_auth == 2 && this.views[i].status == "1") {
          this.verif_type_google = true;
          this.compteur_verif_status += 1
        }

      }
    });
  }


  AddTypeAuthConnection(id_developer, id_type_auth, last_date, email, mobile, uid,
    token, param1, param2) {


    this.restType.AddTypeAuth(id_developer, id_type_auth, last_date, email, mobile, uid,
      token, param1, param2).subscribe(respond => {
        this.type = respond;
        this.router.navigate(['/privacy'])
        this.ViewAllDeveloperTypeAuthentication();

      });
  }


  DeleteAuthenticationType(id_developer, id_type_auth) {
    this.restType.DeleteAuthenticationType(id_developer, id_type_auth).subscribe(respond => {


      this.router.navigate(['/privacy']);
      if (id_type_auth == 1) {
        this.verif_type_facebook = false;

      }
      else if (id_type_auth == 2) {
        this.verif_type_google = false;

      }
      this.ViewAllDeveloperTypeAuthentication();
    })
  }


  ReloadAuthenticationType(id_developer, id_type_auth) {
    
    this.restType.ReloadAuthenticationType(id_developer, id_type_auth).subscribe(respond => {
      console.log(respond);

    })
  }

}