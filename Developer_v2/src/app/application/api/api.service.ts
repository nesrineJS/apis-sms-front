import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';

  @Injectable({
    providedIn: 'root'
  })
  export class ApiService extends MasterService {


    url= environment.Baseurl;

    constructor(private http: Http) {
      super()
    }

    GetApi (id_app,id_developer,id_app_api,begin_date,end_date): Observable<any[]> {

      

      return this.http
          .put(this.url + '/solde/application/api', {id_app,id_developer,id_app_api,begin_date,end_date},{ headers: this.headers})
          .map(this.extractData);     

    }

    ApplicationApiStatus(id_app_api): Observable<any[]>{

  

       return this.http
          .put(this.url + '/application_api/status/', {id_app_api},{ headers: this.headers})
          .map(this.extractData); 
    }

  
    ApplicationApiGenerateSecretKey(id_app_api): Observable<any[]>{


       return this.http
          .put(this.url + '/application_api/Update/Secret', {id_app_api},{ headers: this.headers})
          .map(this.extractData); 
    }


    ApiDetail (id_developer,id_app_api): Observable<any[]> {

 
      return this.http
          .put(this.url + '/application_api/detail/', {id_developer,id_app_api},{ headers: this.headers})
          .map(this.extractData);     
    }
    ApiListByApplication (id_developer,id_app): Observable<any[]> {


      return this.http
          .put(this.url + '/application_api/dev/', {id_developer,id_app},{ headers: this.headers})
          .map(this.extractData);     
    }
    

      private extractData(res: Response) {
        const body = res.json();
        return body;
      }
  
}
