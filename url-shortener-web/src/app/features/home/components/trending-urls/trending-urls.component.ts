import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlEntity } from 'src/app/core/api/models';
import { UrlService } from 'src/app/core/api/services';
import { ToastrHelperService } from 'src/app/core/services/toastr-helper.service';
import { AppConstants } from 'src/app/core/utilities/AppConstants';

@Component({
  selector: 'app-trending-urls',
  templateUrl: './trending-urls.component.html',
  styleUrls: ['./trending-urls.component.css'],
})
export class TrendingUrlsComponent implements OnInit, OnDestroy {
  $getTrendingUrls!: any;
  trendingUrls!: UrlEntity[];
  appDomain!: string;

  constructor(
    private urlService: UrlService,
    private toastrHelperService: ToastrHelperService
  ) {}

  ngOnInit(): void {
    this.appDomain = AppConstants.getDomainName();
    this.getTrendingUrls();
  }

  getTrendingUrls(): void {
    this.$getTrendingUrls = this.urlService
    .apiUrlGetTrendingUrlsNoOfResultGet$Json({noOfResult: 5})
      .subscribe({
        next: (result: UrlEntity[]) => {
          this.trendingUrls = result;
          this.toastrHelperService.notifySuccess(
            'Success',
            "Trending url's loaded"
          );
        },
        error: (err: Error) => {
          console.error(err);

          this.toastrHelperService.notifyError(err.name, err.message);
        },
        complete: () => console.log('completed getTrending api'),
      });
  }

  ngOnDestroy(): void {
    if (this.$getTrendingUrls) {
      this.$getTrendingUrls.unsubscribe();
    }
  }
}
