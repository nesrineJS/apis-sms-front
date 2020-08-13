import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MasterService } from 'src/app/_services/master.service';

@Injectable()
export class NavbarService extends MasterService{

    visible: boolean;
    url: any = 'http://localhost:3000/core';

    constructor (private http: Http) {
      super()
    }

    Hide() { this.visible = false; }
    Show() { this.visible = true; }
  
    GetNotificationWeb (id_developer, begin_date , end_date, status): Observable<any[]> {
      
     

                      return this.http
                      .put(this.url+'/developernotification/web',{id_developer, begin_date , end_date, status},
                        {headers:this.headers})
                      .map(this.extractData);
    }

    private extractData(res: Response) {
      let body = res.json();
      return body || [] ;
    }

}


