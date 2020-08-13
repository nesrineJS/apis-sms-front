import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BoiteEnvoieAppService extends MasterService {

  url= environment.Baseurl;

  sms_mt: any;
  p_keyword: any;
  id_developer: any;
  id_app: any;
  id_api: any;
  id_app_api:any;
  dlr_type: any;
  prefix: any;
  msisdn:any;
  id_country: any;
  status: any;
  p_begin_date : any;
  p_end_date: any;
  label:any;
  title: any;


  constructor (private http: Http) {
    super()
 

  }

      
   GetSmsMt ( p_keyword,id_developer,id_app, id_app_api,  dlr_type, id_country, status,p_begin_date, p_end_date): Observable<any[]> {
        
    const id_api = '';
    const prefix = '';

    


                    return this.http
                    .put(this.url+'/smsMt/developper',{p_keyword,id_developer,id_app, id_api, id_app_api, dlr_type, prefix, 
                      id_country, status, p_begin_date , p_end_date},{headers:this.headers})
                    .map(this.extractData);
  }



 
  
  GetViewByCountry (id_developer): Observable<any[]> {


                    return this.http
                    .put(this.url+'/country/viewbycountry/',{id_developer},{headers:this.headers})
                    .map(this.extractData);
 }

 GetApplicationApi (id_developer, id_app): Observable<any[]> {


                  return this.http
                  .put(this.url+'/application_api/dev/',{id_developer, id_app},{headers:this.headers})
                  .map(this.extractData);
}


    
  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

 }
