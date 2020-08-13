import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends MasterService {

  url= environment.Baseurl;

  constructor(private http: Http) {
    super()
  }

  getSoldeDebitAmount (id_developer,begin_date,end_date): Observable<any[]> {

                    return this.http
                    .put(this.url+'/solde/developer/debit',{id_developer,begin_date,end_date},{headers:this.headers})
                    .map(this.extractData);
  }

  getAppDev (id_developer, id_app, begin_date, end_date): Observable<any[]> {


    return this.http
        .put(this.url + '/solde/application', {id_developer, id_app, begin_date, end_date}, { headers: this.headers})
        .map(this.extractData);     

  }

  GetStatByAmount (id_developer, id_app, id_app_api, p_begin_date, p_end_date): Observable<any[]> {
 
    return this.http
        .put(this.url + '/smsMt/statByAmount', {id_developer, id_app, id_app_api, p_begin_date, p_end_date}, { headers: this.headers})
        .map(this.extractData);
  }
  GetStatByApplication (id_developer, id_app, id_app_api, p_begin_date, p_end_date): Observable<any[]> {
 

    return this.http
        .put(this.url + '/smsMt/statByApp', {id_developer, id_app, id_app_api, p_begin_date, p_end_date}, { headers: this.headers})
        .map(this.extractData);
  }
  GetStatByDay (id_developer, id_app, id_app_api, p_begin_date, p_end_date): Observable<any[]> {


    return this.http
        .put(this.url + '/smsMt/statByDay', {id_developer, id_app, id_app_api, p_begin_date, p_end_date}, { headers: this.headers})
        .map(this.extractData);
  }
  
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  
}
