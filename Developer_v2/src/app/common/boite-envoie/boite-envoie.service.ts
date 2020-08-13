import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BoiteEnvoieService extends MasterService {

      url= environment.Baseurl;

      constructor (private http: Http) {
        super()
      }

      
      GetSmsMt (p_keyword,id_developer,  dlr_type, id_country, status,p_begin_date, p_end_date): Observable<any[]> {
        
        const id_app = '';
        const id_api = '';
        const id_app_api = '';
        const prefix = '';

    

                        return this.http
                        .put(this.url+'/smsMt/developper',{p_keyword,id_developer,id_app, id_api, id_app_api, 
                          dlr_type, prefix, 
                          id_country, status, p_begin_date , p_end_date},{headers:this.headers})
                        .map(this.extractData);
      }
 

      GetCountry() {
          return this.http.get(this.url+'/country',{headers:this.headers}).map(this.extractData);}

         
      GetViewByCountry (id_developer): Observable<any[]> {
       
  
                          return this.http
                          .put(this.url+'/country/viewbycountry/',{id_developer},{headers:this.headers})
                          .map(this.extractData);
       }
       

       GetViewCount (p_keyword,id_developer,id_app,id_api,id_app_api,dlr_type,prefix,id_country,status,p_begin_date,p_end_date): Observable<any[]> {
      

                        return this.http
                        .put(this.url+'/smsMt/developper/count',{p_keyword,id_developer,id_app,id_api,id_app_api,dlr_type,prefix,id_country,status,p_begin_date,p_end_date},{headers:this.headers})
                        .map(this.extractData);
     }


     GetViewPagination (p_keyword,id_developer,id_app,id_api,id_app_api,dlr_type,prefix,id_country,status,p_begin_date,p_end_date, p_rowspage, p_rowslenght): Observable<any[]> {
    

                      return this.http
                      .put(this.url+'/smsMt/developper/pagination',{p_keyword,id_developer,id_app,id_api,id_app_api,dlr_type,prefix,id_country,status,p_begin_date,p_end_date, p_rowspage, p_rowslenght},{headers:this.headers})
                      .map(this.extractData);
   }

      private extractData(res: Response) {
        let body = res.json();
        return body || [];
      }

    }
