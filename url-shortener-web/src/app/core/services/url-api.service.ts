import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUrlModel } from '../interfaces/IUrlModel';
import { AppConstants } from '../utilities/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class UrlApiService {

  constructor(private httpClient: HttpClient) { }

  createShortUrl(inputModel: any): Observable<IUrlModel> {
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    return this.httpClient
      .post<IUrlModel>(
        `${AppConstants.getAPIEndpoint()}/api/Url/CreateShortUrl`,
        JSON.stringify(inputModel),
        {
          headers: headers
        }
      );
  }

  getLongUrl(inputModel: any): Observable<IUrlModel>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    return this.httpClient
      .post<IUrlModel>(`${AppConstants.getAPIEndpoint()}/api/Url/GetLongUrl`,
      JSON.stringify(inputModel),
      {
        headers: headers
      }
    );
  }

  getTrendingUrls(noOfResult: number): Observable<IUrlModel[]> {
    return this.httpClient
      .get<IUrlModel[]>(`${AppConstants.getAPIEndpoint()}/api/Url/GetTrendingUrls/${noOfResult}`);
  } 

}
