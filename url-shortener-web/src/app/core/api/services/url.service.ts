/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { UrlEntity } from '../models/url-entity';
import { UrlLongToShortInputModel } from '../models/url-long-to-short-input-model';
import { UrlShortToLongInputModel } from '../models/url-short-to-long-input-model';

@Injectable({ providedIn: 'root' })
export class UrlService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiUrlCreateShortUrlPost()` */
  static readonly ApiUrlCreateShortUrlPostPath = '/api/Url/CreateShortUrl';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUrlCreateShortUrlPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUrlCreateShortUrlPost$Json$Response(
    params?: {
      body?: UrlLongToShortInputModel
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UrlEntity>> {
    const rb = new RequestBuilder(this.rootUrl, UrlService.ApiUrlCreateShortUrlPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UrlEntity>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUrlCreateShortUrlPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUrlCreateShortUrlPost$Json(
    params?: {
      body?: UrlLongToShortInputModel
    },
    context?: HttpContext
  ): Observable<UrlEntity> {
    return this.apiUrlCreateShortUrlPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UrlEntity>): UrlEntity => r.body)
    );
  }

  /** Path part for operation `apiUrlGetLongUrlPost()` */
  static readonly ApiUrlGetLongUrlPostPath = '/api/Url/GetLongUrl';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUrlGetLongUrlPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUrlGetLongUrlPost$Json$Response(
    params?: {
      body?: UrlShortToLongInputModel
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UrlEntity>> {
    const rb = new RequestBuilder(this.rootUrl, UrlService.ApiUrlGetLongUrlPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UrlEntity>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUrlGetLongUrlPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUrlGetLongUrlPost$Json(
    params?: {
      body?: UrlShortToLongInputModel
    },
    context?: HttpContext
  ): Observable<UrlEntity> {
    return this.apiUrlGetLongUrlPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UrlEntity>): UrlEntity => r.body)
    );
  }

  /** Path part for operation `apiUrlGetTrendingUrlsNoOfResultGet()` */
  static readonly ApiUrlGetTrendingUrlsNoOfResultGetPath = '/api/Url/GetTrendingUrls/{noOfResult}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUrlGetTrendingUrlsNoOfResultGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUrlGetTrendingUrlsNoOfResultGet$Json$Response(
    params: {
      noOfResult: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<UrlEntity>>> {
    const rb = new RequestBuilder(this.rootUrl, UrlService.ApiUrlGetTrendingUrlsNoOfResultGetPath, 'get');
    if (params) {
      rb.path('noOfResult', params.noOfResult, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UrlEntity>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiUrlGetTrendingUrlsNoOfResultGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUrlGetTrendingUrlsNoOfResultGet$Json(
    params: {
      noOfResult: number;
    },
    context?: HttpContext
  ): Observable<Array<UrlEntity>> {
    return this.apiUrlGetTrendingUrlsNoOfResultGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UrlEntity>>): Array<UrlEntity> => r.body)
    );
  }

}
