import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlEntity, UrlLongToShortInputModel, UrlShortToLongInputModel } from 'src/app/core/api/models';
import { UrlService } from 'src/app/core/api/services';
import { ToastrHelperService } from 'src/app/core/services/toastr-helper.service';

@Component({
  selector: 'app-url-short-visit-main',
  templateUrl: './url-short-visit-main.component.html',
  styleUrls: ['./url-short-visit-main.component.css']
})
export default class UrlShortVisitMainComponent implements OnInit, OnDestroy {
  shortToLongUrl$!: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
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
    let inputModel: UrlShortToLongInputModel = {
      shortUrl: shortUrl,
    };

    //api request
    this.shortToLongUrl$ = this.urlService
      .apiUrlGetLongUrlPost$Json({ body: inputModel })
      .subscribe({
        next: (result: UrlEntity) => {
          this.toastrHelperService.notifySuccess(
            'Success',
            'Redirect to Long url success'
          );
          //redirect to new long url
          // this.router.navigateByUrl(result.longUrl);
          this.document.location.href = result.longUrl ?? '';
        },
        error: (err: Error) => {
          this.toastrHelperService.notifyError(
            'Redirect to Long url failed',
            err.message
          );
          console.error(err);
        },
        complete: () => {
          // hide loading
        },
      });
  }



  ngOnDestroy(): void {
    if (this.shortToLongUrl$) { this.shortToLongUrl$.unsubscribe(); }
  }
}
