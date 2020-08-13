import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApplicationsService extends MasterService {

     url= environment.Baseurl;

      solde: any;
      id_developer: any;
      id_app: any;
      id_devise: any;
      id_module: any;
      prefix: any;
      nbr_sms:any;
      p_begin_date : any;
      p_end_date: any;
      id_app_api: any;
      p_keyword: any;
      title:any;

      id_language:any;
      label:any;
      description:any;

    constructor(private http: Http) {
      super()
    }

    GetApplication (id_developer, id_app, begin_date, end_date): Observable<any[]> {


      return this.http
          .put(this.url + '/solde/application', {id_developer, id_app, begin_date, end_date}, { headers: this.headers})
          .map(this.extractData);     

    }

      GetTypeApplication () {
        return this.http.get(this.url+'/typeApplication', { headers: this.headers}).map(this.extractData);  
      }

        GetLanguage () {
          return this.http.get(this.url+'/language', { headers: this.headers}).map(this.extractData);  
        }

      AddLanguage (id_language,label,description): Observable<any[]> {
      

        return this.http
            .put(this.url + '/language/add/', {id_language,label,description}, { headers: this.headers})
            .map(this.extractData);     

      }

      ViewApplicationsService(id_developer, id_app,begin_date,end_date){
        

          return this.http.put(this.url+'/solde/application',{id_developer,id_app, begin_date,end_date},{headers:this.headers})
            .map(this.extractData);
      }

    AddApplicationsService(id_developer,title ,description,language_set,url,id_type_app){

        return this.http.put(this.url+'/application/Add/',{'id_developer':id_developer,'title':title,
          'description':description,'language_set':language_set,'url':url,'id_type_app':id_type_app}, { headers: this.headers})
          .map(this.extractData);


      }

      AddNotifcationWeb(label,body,type_notif,notif_from,notif_cc,param1){
          return this.http.put(this.url+'/notification/add/',{	'label':label,
              'body':body,
              'type_notif':type_notif,
              'notif_from':notif_from,
              'notif_cc':notif_cc,
              'param1':param1}
              , { headers: this.headers}).map(this.extractData)
      }

      private extractData(res: Response) {
        const body = res.json();
        return body;
      }

}
