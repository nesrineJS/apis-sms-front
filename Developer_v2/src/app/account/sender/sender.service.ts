import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MasterService} from '../../_services/master.service';
import { environment } from 'src/environments/environment.prod';



@Injectable({
    providedIn: 'root'
})
export class SenderService extends MasterService {

    url= environment.Baseurl;
     
    sender: any;
    id_developer: any;
    id_app: any;
    date: any;
    nbr_sms: any;
    status: any;


    constructor(private http: Http) {
        super();
    }

    GetSender(id_developer): Observable<any[]> {



        return this.http
            .put(this.url + '/sender/dev/', {id_developer}, {headers: this.headers})
            .map(this.extractData);

    }


    AddSender(id_developer, sender): Observable<any[]> {
        

        return this.http
            .put(this.url + '/sender/add/', {id_developer, sender}, {headers: this.headers})
            .map(this.extractData);

    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

}
