import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SalesService extends MasterService {

  url= environment.Baseurl;

  
        constructor (private http: Http) {
          super()
        }

        GetSoldeDebitAmount (id_developer,begin_date,end_date): Observable<any[]> {
   
  
                          return this.http
                          .put(this.url+'/solde/developer/debit',{id_developer,begin_date,end_date},{headers:this.headers})
                          .map(this.extractData);
        }
              
        private extractData(res: Response) {
          const body = res.json();
          return body;
        }
      
  
}
