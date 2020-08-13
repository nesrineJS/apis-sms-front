import { Component, OnInit,ViewChild  } from '@angular/core'; 
import { ProfilService } from './profil.service';
import { NavbarService } from 'src/app/partials/navbar/navbar.service';
import { SidebarService } from 'src/app/partials/sidebar/sidebar.service';

import { HttpClient, HttpResponse, HttpEventType} from '@angular/common/http';
import { MasterComponent } from 'src/app/_controler/master.component';
import { Developer } from 'src/app/_model';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from '../../_services/';
import { SidebarComponent } from 'src/app/partials/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/partials/navbar/navbar.component';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent  extends MasterComponent implements OnInit {
  @ViewChild(SidebarComponent) Sidchild;
  @ViewChild(NavbarComponent) Navchild;


  selectedGender:any;
  
      developer:Developer;
      response: any;
      errorMessage: any;
      countries:any[];
      keyword="";
      id_country="";

      profilFirstname: any;
      profiLastname : any;
      hiddenFirstname: any;
      hiddenLastname : any;

      profilMobile: any;
      profilEmail : any;
      profilUsername : any;
      profilAddress  : any;
      profilCountry: any;
      profilBirthDay : any;
      profilGender : any;
      profilCompany : any;
      profilWebsite : any;
      profilDevise : any;
      profilTva : any;
      profilPicture : any;
      profilIDCountry:any;
 
      percentDone: number;
      uploadSuccess: boolean;


         constructor(private profilService: ProfilService, public nav: NavbarService, public side: SidebarService,
           private http: HttpClient,  notifierService: NotifierService, notificationService: NotificationService,public router:Router) {
            super(notifierService,notificationService );
            this.developer=new Developer
            
         }
     

          ngOnInit() {

              this.nav.Show();
              this.side.ShowSide();

              this.GetDeveloper();
              this.GetCountryService();
              
          }
         
          selectChangeHandler(event){
            let value = event.target.value;
             this.selectedGender = value;
         }
 
        
         GetDeveloper() {

            const toDay = new Date();
            var credit = 0;
            toDay.setDate( toDay.getDate() + 3 );  

            this.profilService.GetDeveloper(this.keyword,this.id_developer.toString(),this.id_country ,this.date_developer ,toDay)
            .subscribe(respond => {
              var profil = respond;
                  
              this.profilFirstname = profil[0].firstname;
              this.profiLastname = profil[0].lastname;

              this.hiddenFirstname = profil[0].firstname;
              this.hiddenLastname = profil[0].lastname;

              this.profilMobile = profil[0].mobile;
              this.profilEmail = profil[0].email;
              this.profilUsername = profil[0].username;
              this.profilAddress = profil[0].address;  
              this.profilCountry =  profil[0].country_label; 
              this.profilBirthDay =  profil[0].birthday_date; 
              this.profilGender =  profil[0].sexe; 
              this.profilCompany =  profil[0].company; 
              this.profilWebsite =  profil[0].website; 
              this.profilDevise =  profil[0].id_devise; 
              this.profilTva =  profil[0].tva; 
              this.profilPicture =  profil[0].profile_picture;   
              this.profilIDCountry=profil[0].id_country;   
              this.developer.image=this.profilPicture ;            
            });   
          }


          GetCountryService() {
            this.profilService.GetCountry().subscribe(respond => {
              this.countries = respond;
            });
          }
         
          
          SaveDeveloperInfos()
          {
            var p_password='';
            this.profilService.SaveDeveloper (this.id_developer.toString(),this.profilFirstname,this.profiLastname,this.profilMobile,this.profilUsername,
              this.profilEmail,this.profilAddress,this.profilCompany,this.profilWebsite,this.profilBirthDay,
              p_password,this.profilGender, this.profilTva, this.profilIDCountry, this.profilPicture).subscribe(respond => {
               
               
               if(this.hiddenFirstname != this.profilFirstname || this.hiddenLastname != this.profiLastname)
               {
                  var currentDeveloper = new BehaviorSubject<Developer>(JSON.parse(localStorage.getItem('developer')));
                  
                  currentDeveloper.value.name = this.profiLastname + ' ' + this.profilFirstname;

                  localStorage.setItem('developer',JSON.stringify(currentDeveloper.value));
                  
                  this.Sidchild.name_developer = currentDeveloper.value.name;
                  this.Navchild.name_developer = currentDeveloper.value.name;
               
               }
                
                this.showNotification('success', 'Profil successfully updated !');
             
            });   
          }


          public showNotification( type: string, message: string ): void {
            this.notifier.notify( type, message );
            
          }
          
          upload(files: File[]){
            //https://stackblitz.com/edit/angular-file-upload?file=app%2Fapp.module.ts

            this.uploadAndProgress(files);
          }
        
          
          uploadAndProgress(files: File[]){
            var formData = new FormData();
            Array.from(files).forEach(f => formData.append('file',f))

            this.http.post(/*'https://file.io'*/'', formData, {reportProgress: true, observe: 'events'})
              .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.percentDone = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                  this.uploadSuccess = true;
                }
            });   
          }    
        }
    
          

