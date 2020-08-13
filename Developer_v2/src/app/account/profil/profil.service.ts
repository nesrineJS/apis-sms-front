import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
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
export class ProfilService extends MasterService {

  url= environment.Baseurl;
  
       id_developer: any;
       id_app: any;
       id_country: any;
       begin_date : any;
       end_date: any;
  
    constructor (private http: Http) {
      super()
    }

     
    GetDeveloper (keyword, id_developer, id_country, begin_date , end_date): Observable<any[]> {
      
 
             return this.http
             .put(this.url +'/developer/viewbycriteria/', {keyword, id_developer, id_country, begin_date , end_date},{headers:this.headers})
             .map(this.extractData);
    }
    
    GetCountry() {
      return this.http.get(this.url+'/country',{headers:this.headers}).map(this.extractData);}

      
    SaveDeveloper (id_developer,firstname,lastname,mobile,username,email,address,company,website,birthday_date,password,sexe,
       tva, id_country, profile_picture): Observable<any[]> {
      
 
             return this.http
             .put(this.url +'/developer/update/', {id_developer,firstname,lastname,mobile,username,email,address,company,website,
              birthday_date,password,sexe,tva, id_country,profile_picture},{headers:this.headers})
             .map(this.extractData);
    }

  
      private extractData(res: Response) {
        const body = res.json();
        return body;
      }
    
}
