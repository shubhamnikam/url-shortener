import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UrlEntity, UrlLongToShortInputModel, UrlShortToLongInputModel } from 'src/app/core/api/models';
import { UrlService } from 'src/app/core/api/services';
import { ToastrHelperService } from 'src/app/core/services/toastr-helper.service';
import { AppConstants } from 'src/app/core/utilities/AppConstants';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css'],
})
export class UrlShortenerComponent implements OnInit, OnDestroy {
  longToShortUrlForm!: any;
  shortToLongUrlForm!: any;

  longToShortUrl$!: any;
  shortToLongUrl$!: any;

  shortUrlComplete!: string;

  isApiRequestProgress: boolean = false;

  longToShortUrlModel!: UrlEntity | null;
  shortToLongUrlModel!: UrlEntity | null;

  appDomain!: string;
  shortUrlMaxLength: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private urlService: UrlService,
    private toastrHelperService: ToastrHelperService
  ) {}

  ngOnInit(): void {
    this.appDomain = AppConstants.getDomainName();
    this.shortUrlMaxLength = AppConstants.SHORT_URL_MAX_LENGTH;

    this.initLongToShortUrlConvertForm();
    this.initShortToLongUrlConvertForm();
  }

  initLongToShortUrlConvertForm(): void {
    this.longToShortUrlForm = this.formBuilder.group({
      longUrlInput: ['', [Validators.required]],
    });
  }
  initShortToLongUrlConvertForm(): void {
    this.shortToLongUrlForm = this.formBuilder.group({
      shortUrlInputDomain: [this.appDomain, [Validators.required]],
      shortUrlInput: ['', [Validators.required]],
    });
  }
  submitRequestLongToShortUrl(): void {
    //reset
    this.longToShortUrlModel = null;
    //get value & validate
    const longUrl = this.longToShortUrlForm?.get('longUrlInput').value;
    // unhide
    this.isApiRequestProgress = true;
    if (!longUrl) {
      // hide loading
      this.isApiRequestProgress = false;
      return;
    }

    //create input model
    const inputModel: UrlLongToShortInputModel = {
      longUrl: longUrl,
    };

    this.longToShortUrl$ = this.urlService
      .apiUrlCreateShortUrlPost$Json({ body: inputModel })
      .subscribe({
        next: (result: UrlEntity) => {
          this.longToShortUrlModel = result;
          this.shortUrlComplete = `${this.appDomain}${this.longToShortUrlModel?.shortUrl}`;
          this.toastrHelperService.notifySuccess(
            'Success',
            'Create short url success'
          );
        },
        error: (err: Error) => {
          this.isApiRequestProgress = false;
          this.toastrHelperService.notifyError(err.name, err.message);
          console.error(err);
        },
        complete: () => {
          // hide loading
          this.isApiRequestProgress = false;
          console.log('Complete: createShortUrl');
        },
      });
  }
  submitRequestShortToLongUrl(): void {
    //reset
    this.shortToLongUrlModel = null;
    //get value & validate
    const shortUrl = this.shortToLongUrlForm?.get('shortUrlInput').value;
    // unhide
    this.isApiRequestProgress = true;
    if (!shortUrl) {
      // hide loading
      this.isApiRequestProgress = false;
      return;
    }

    //create input model
    const inputModel: UrlShortToLongInputModel = {
      shortUrl: shortUrl,
    };

    //api request
    this.shortToLongUrl$ = this.urlService
      .apiUrlGetLongUrlPost$Json({ body: inputModel })
      .subscribe({
        next: (result: UrlEntity) => {
          this.shortToLongUrlModel = result;
          this.toastrHelperService.notifySuccess(
            'Success',
            'Get Long url success'
          );
        },
        error: (err: Error) => {
          this.isApiRequestProgress = false;
          this.toastrHelperService.notifyError(
            'Get Long url failed',
            err.message
          );
          console.error(err);
        },
        complete: () => {
          // hide loading
          this.isApiRequestProgress = false;
        },
      });
  }

  handleCopyToClipboard(textToCopy: string | null | undefined): void {
    if (textToCopy){
      navigator.clipboard.writeText(textToCopy);
    } 
    navigator.clipboard.writeText("");
  }

  ngOnDestroy(): void {
    if (this.longToShortUrl$) {
      this.longToShortUrl$.unsubscribe();
    }
    if (this.shortToLongUrl$) {
      this.shortToLongUrl$.unsubscribe();
    }
  }
}
