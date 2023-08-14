import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUrlModel } from 'src/app/core/interfaces/IUrlModel';
import { ToastrHelperService } from 'src/app/core/services/toastr-helper.service';
import { UrlApiService } from 'src/app/core/services/url-api.service';

@Component({
  selector: 'app-url-short-visit-main',
  templateUrl: './url-short-visit-main.component.html',
  styleUrls: ['./url-short-visit-main.component.css']
})
export default class UrlShortVisitMainComponent implements OnInit, OnDestroy {
  shortToLongUrl$!: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private urlApiService: UrlApiService,
    private toastrHelperService: ToastrHelperService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.handleShortUrlRedirect();
  }

  handleShortUrlRedirect() {
    this.route.paramMap.subscribe((paramMap) => {
      const shortUrl = paramMap.get("shortUrl");
      //validate
      if (shortUrl) {
        this.submitRequestShortToLongUrl(shortUrl);
      } else {
        this.toastrHelperService.notifyError("Redirect to Long url failed", "Short url is empty");
      }
    });
  }

  submitRequestShortToLongUrl(shortUrl: string | null): void {
    //create input model
    const inputModel = {
      shortUrl: shortUrl
    }

    //api request
    this.shortToLongUrl$ = this.urlApiService.getLongUrl(inputModel)
      .subscribe({
        next: (result: IUrlModel) => {
          this.toastrHelperService.notifySuccess("Success", "Redirect to Long url success");
          //redirect to new long url
          // this.router.navigateByUrl(result.longUrl);
          this.document.location.href  = result.longUrl;
        },
        error: (err: Error) => {
          this.toastrHelperService.notifyError("Redirect to Long url failed", err.message);
          console.error(err);
        },
        complete: () => {
          // hide loading
        }
      });
  }



  ngOnDestroy(): void {
    if (this.shortToLongUrl$) { this.shortToLongUrl$.unsubscribe(); }
  }
}
