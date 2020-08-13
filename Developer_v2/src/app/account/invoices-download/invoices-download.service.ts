import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InvoicesDownloadService extends MasterService{

  url= environment.Baseurl;
  
  constructor (private http: Http) {
    super()
  }

  GetSoldeInvoice (id_developer,id_solde): Observable<any[]> {


                    return this.http
                    .put(this.url+'/solde/invoice',{id_developer,id_solde},{headers:this.headers})
                    .map(this.extractData);
  }
        
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }}
