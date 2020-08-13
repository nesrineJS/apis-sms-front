import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiDetailService  extends MasterService{

  url= environment.Baseurl;

  constructor(private http: Http) {
    super()
   }

  GetApiDetail(id_api): Observable<any[]>{

  

    return this.http.put(this.url+'/api/detail/',{id_api},{ headers: this.headers})
    .map(this.extractData);     
  }


  ApplicationApiAdd(id_app , id_api ,id_developer ,label): Observable<any[]>{


    return this.http.put(this.url+'/application_api/Add/',{id_app , id_api , id_developer , label},{ headers: this.headers})
    .map(this.extractData);     

  }
  
  ApiDetail (id_developer,id_app_api): Observable<any[]> {

  
    return this.http
        .put(this.url + '/application_api/detail/', {id_developer,id_app_api},{ headers: this.headers})
        .map(this.extractData);     

  }
  
    private extractData(res: Response) {
      const body = res.json();
      return body;
    }

}
