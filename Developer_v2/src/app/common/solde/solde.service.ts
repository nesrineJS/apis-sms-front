import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})

export class SoldeService  extends MasterService{


      url= environment.Baseurl;
  
        constructor (private http: Http) {
           super()
        }


        getAppDev (id_developer, id_app, begin_date, end_date): Observable<any[]> {
         
          return this.http
              .put(this.url + '/solde/application', {id_developer, id_app, begin_date, end_date}, { headers: this.headers})
              .map(this.extractData);     
      
        }

        getSoldeDebitAmount (id_developer,begin_date,end_date): Observable<any[]> {
      
                          return this.http
                          .put(this.url+'/solde/developer/debit',{id_developer,begin_date,end_date},{headers:this.headers})
                          .map(this.extractData);
        }


        getSoldeDebitAmountByApplication (id_developer,id_app,begin_date,end_date): Observable<any[]> {
    
  
                          return this.http
                          .put(this.url+'/solde/application',{id_developer,id_app,begin_date,end_date},{headers:this.headers})
                          .map(this.extractData);
        }

        
        GetSoldeSum (id_developer,id_devise): Observable<any[]> {
      
          id_devise= 'DT'
          return this.http
          .put(this.url+'/solde/sum',{id_developer,id_devise},{headers:this.headers})
          .map(this.extractData);
}

      
        private extractData(res: Response) {
          const body = res.json();
          return body;
        }
      
}
