import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SoldeAppService extends MasterService {

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

    constructor (private http: Http) {
      super()
      }


    getAppDev (id_app,id_developer,begin_date,end_date): Observable<any[]> {
    
      const id_app_api = '';


      return this.http 
          .put(this.url + '/solde/application/api', {id_app,id_developer,id_app_api,begin_date,end_date}, { headers: this.headers})
          .map(this.extractData);     
  
    }

  
    private extractData(res: Response) {
      const body = res.json();
      return body;
    }
      
}
