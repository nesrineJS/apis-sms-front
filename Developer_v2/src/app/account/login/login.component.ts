import {Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { LoginService } from './login.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import{Developer} from '../../_model/developer';
import {Md5} from 'ts-md5/dist/md5';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public developer : Developer ;
    public applicationsData:any=[];

    user: SocialUser;
    key:any;
    id_type_auth: any;
    last_date: any;
    email: any;
    mobile: any;
    uid: any;
    token: any;
    firstname: any;
    lastname: any;
    username: any;
    id_country: any;
    address: any;
    company: any;
    birthday_date: any;
    profile_picture: any;
    password: any;
    id_devise: any;
    sexe: any;
    param1: any;
    param2: any;
    AUTH_TYPE_FACEBOOK =1;
    AUTH_TYPE_GOOGLE =2;

    DEFAULT_CURRENCY = 'DT';
    CUURENT_COUNTRY='tn';
    loginGoogle: any;
    loginFacebook: any;

   

    constructor(private authService: AuthService, private loginService: LoginService, public nav: NavbarService, public side: SidebarService,
                private router: Router) {
               this.developer = new Developer();

    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    ngOnInit() {
        this.CkeckDeveloperToken();
    }


    SignUpWithGoogle(): void {

        const toDay = new Date();
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userGoogleData => {

            this.user = userGoogleData;
            this.firstname = userGoogleData.firstName;
            this.lastname = userGoogleData.lastName;
            this.mobile = '';
            this.username = userGoogleData.name;
            this.id_country = this.CUURENT_COUNTRY;
            this.email = userGoogleData.email;
            this.address = '';
            this.company = '';
            this.birthday_date =  '2010-01-01 00:00:00';
            this.profile_picture = userGoogleData.photoUrl;
            this.password = '';
            this.id_devise = this.DEFAULT_CURRENCY;
            this.sexe = '';
            this.id_type_auth = this.AUTH_TYPE_GOOGLE;
            this.uid = userGoogleData.id;
            this.token = userGoogleData.authToken;
            this.param1 = '';
            this.param2 = '';

            this.loginService.GetAuthenticate(this.firstname, this.lastname, this.mobile, this.username, this.id_country, this.email, this.address,
                this.company, this.birthday_date, this.profile_picture, this.password , this.id_devise, this.sexe,
                this.id_type_auth , this.uid, this.token, this.param1 , this.param2).subscribe(respond => {

                    
                this.developer.name = respond.developer_authentication[0].firstname + " " + respond.developer_authentication[0].lastname ;
                this.developer.email = respond.developer_authentication[0].email;
                this.developer.auth_date = toDay;
                this.developer.token = this.token;
                this.developer.id_developer = respond.developer_authentication[0].id_developer;
                this.developer.image=respond.developer_authentication[0].profile_picture;
                this.developer.entry_date = respond.developer_authentication[0].entry_date;

                localStorage.setItem('developer',JSON.stringify(this.developer));
                sessionStorage.getItem('')
                var user_id = Md5.hashStr(this.developer.id_developer)
                sessionStorage.setItem('user_id',user_id.toString());
                sessionStorage.setItem('x-access-token',respond.x_access_token);

                this.router.navigate(['/dashboard/'])

            });

        }));
                this.loggedIn.next(true);

    }

    SignInWithGoogle(): void {

               const toDay = new Date();
                this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userGoogleData => {
                this.user = userGoogleData;
                this.email = userGoogleData.email;
                this.id_type_auth = this.AUTH_TYPE_GOOGLE;
                this.uid = userGoogleData.id;
                this.token = userGoogleData.authToken;
                this.loginService.GetCheckAuthenticate(this.id_type_auth ,this.email, this.uid, this.token).subscribe(respond => {
                this.developer = new Developer();
                this.developer.name = respond.developer_authentication[0].firstname + " " + respond.developer_authentication[0].lastname ;
                this.developer.email = respond.developer_authentication[0].email;
                this.developer.auth_date = toDay;
                this.developer.token = this.token;
                this.developer.id_developer = respond.developer_authentication[0].id_developer;
                this.developer.image=respond.developer_authentication[0].profile_picture;
                this.developer.entry_date = respond.developer_authentication[0].entry_date;
                localStorage.setItem('developer',JSON.stringify(this.developer));
                var user_id = Md5.hashStr(this.developer.id_developer)
                sessionStorage.setItem('user_id',user_id.toString());
                sessionStorage.setItem('x-access-token',respond.x_access_token);
                this.router.navigate(['/dashboard'])
            });
        }));
                 this.loggedIn.next(true);
    }


    SignInWithFacebook(): void {

                const toDay = new Date();
                this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userFacebookData =>
                {this.user = userFacebookData;
                 if(userFacebookData.email ==undefined){
                         this.email = userFacebookData.id+'@Exemple.com'
                }else{
                         this.email=userFacebookData.email
                }
                 this.id_type_auth = this.AUTH_TYPE_FACEBOOK;
                 this.uid = userFacebookData.id;
                 this.token = userFacebookData.authToken;
                 this.loginService.GetCheckAuthenticate(this.id_type_auth ,this.email, this.uid, this.token).subscribe(respond => {
                 this.developer = new Developer();
                 this.developer.name = respond.developer_authentication[0].firstname + " " +respond.developer_authentication[0].lastname ;
                 this.developer.email = respond.developer_authentication[0].email;
                 this.developer.auth_date = toDay;
                 this.developer.token = this.token;
                 this.developer.id_developer = respond.developer_authentication[0].id_developer;
                 this.developer.image=respond.developer_authentication[0].profile_picture;
                 this.developer.entry_date = respond.developer_authentication[0].entry_date;
                 localStorage.setItem('developer',JSON.stringify(this.developer));
                 var user_id = Md5.hashStr(this.developer.id_developer)
                 sessionStorage.setItem('user_id',user_id.toString());
                 sessionStorage.setItem('x-access-token',respond.x_access_token);
                 this.router.navigate(['/dashboard'])
               });
            }));
                 this.loggedIn.next(true);
    }


    SignUpWithFacebook(): void {
                const toDay = new Date();
                this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userFacebookData => {
                this.user = userFacebookData;
                this.firstname = userFacebookData.firstName;
                this.lastname = userFacebookData.lastName;
                this.mobile = '';
                this.username = userFacebookData.name;
                this.id_country = this.CUURENT_COUNTRY;
                if(userFacebookData.email ==undefined){
                       this.email = userFacebookData.id+'@Exemple.com'
                }else{
                        this.email=userFacebookData.email
                }
                this.address = '';
                this.company = '';
                this.birthday_date =  '2010-01-01 00:00:00';
                this.profile_picture = userFacebookData.photoUrl;
                this.password = '';
                this.id_devise = this.DEFAULT_CURRENCY;
                this.sexe = '';
                this.id_type_auth = this.AUTH_TYPE_FACEBOOK;
                this.uid = userFacebookData.id;
                this.token = userFacebookData.authToken;
                this.param1 = '';
                this.param2 = '';
                this.loginService.GetAuthenticate(this.firstname, this.lastname, this.mobile, this.username, this.id_country, this.email, this.address,
                this.company, this.birthday_date, this.profile_picture, this.password , this.id_devise, this.sexe,
                this.id_type_auth , this.uid, this.token, this.param1 , this.param2).subscribe(respond => {

                this.developer.name = respond.developer_authentication[0].firstname + " " +respond.developer_authentication[0].lastname ;
                this.developer.email = respond.developer_authentication[0].email;
                this.developer.auth_date = toDay;
                this.developer.token = this.token;
                this.developer.id_developer = respond.developer_authentication[0].id_developer;
                this.developer.image=respond.developer_authentication[0].profile_picture;
                this.developer.entry_date = respond.developer_authentication[0].entry_date;
                localStorage.setItem('developer',JSON.stringify(this.developer));
                var user_id = Md5.hashStr(this.developer.id_developer)
                sessionStorage.setItem('user_id',user_id.toString());
                sessionStorage.setItem('x-access-token',respond.x_access_token);
                this.router.navigate(['/dashboard/'])
            });
        }));
                this.loggedIn.next(true);

    }

                    SignOut(): void {
                        localStorage.clear();
                        sessionStorage.clear();
                        this.loggedIn.next(false);
                        this.router.navigate(['/login']);
                    }
                    
                    CkeckDeveloperToken(): void {
                        var element = localStorage.getItem('developer');
                        if(element)
                        {
                            this.developer =  new Developer();
                            this.developer = JSON.parse(element);
                            this.loginService.VerifToken(this.developer.id_developer,this.developer.token).subscribe(respond=>{
                                if(respond[0].ctl_developer_authentication_token == 1)
                                {
                                    this.router.navigate(['/dashboard'])
                                }
                            })
                        }

                    }

}
