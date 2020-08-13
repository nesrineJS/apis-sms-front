import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SettingsService extends MasterService {

  url= environment.Baseurl;

  constructor(private http: Http) {
    super()
  }


      GetApplicationDetail (id_developer, id_app): Observable<any[]> {
     

        var keyword = '';

        return this.http
            .put(this.url + '/application/dev/', {id_developer, id_app, keyword}, { headers: this.headers})
            .map(this.extractData);     
      }

      ApplicationStatus(id_app): Observable<any[]>{


        return this.http
            .put(this.url + '/application/status/', {id_app},{ headers: this.headers})
            .map(this.extractData); 
      }


      ApplicationMode(id_app): Observable<any[]>{

    

        return this.http
            .put(this.url + '/application/mode/', {id_app},{ headers: this.headers})
            .map(this.extractData); 
      }

      GetTypeApplication () {
        return this.http.get(this.url+'/typeApplication',{ headers: this.headers}).map(this.extractData);  
      }


      GetLanguage () {
        return this.http.get(this.url+'/language',{ headers: this.headers}).map(this.extractData);  
      }
    
      AddLanguage (id_language,label,description): Observable<any[]> {

    
        return this.http
            .put(this.url + '/language/add/', {id_language,label,description}, { headers:this.headers})
            .map(this.extractData);     
    
      }

      SaveDetail(id_app ,id_developer ,title,description ,language_set ,url ,id_type_app): Observable<any[]> {

     
    
        return this.http
            .put(this.url + '/application/Update/', {id_app ,id_developer ,title,description ,language_set ,url ,id_type_app}, { headers: this.headers})
            .map(this.extractData);     
    
      }

    private extractData(res: Response) {
      const body = res.json();
      return body;
    }

}
