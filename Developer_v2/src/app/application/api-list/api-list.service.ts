import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MasterService } from 'src/app/_services/master.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiListService extends MasterService {

  url= environment.Baseurl;


  constructor(private http: Http) {
    super()
  }

  ViewApis(keyword,id_language,id_type_api,categ_api){

    return this.http.put(this.url+'/api/viewbycriteria/',{'keyword':keyword,'id_language':id_language,'id_type_api':id_type_api,
      'categ_api':categ_api},{headers: this.headers})
      .map(this.extractData);

  }

  ViewApisRecommendation(language_set){

    return this.http.put(this.url+'/api/recommendation/',{'language_set':language_set},{headers: this.headers})
    .map(this.extractData);

  }

   ApiDetail(id_api){
    return this.http.put(this.url+'/api/detail/',{'id_api':id_api},{headers: this.headers})
    .map(this.extractData);

  }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

}
