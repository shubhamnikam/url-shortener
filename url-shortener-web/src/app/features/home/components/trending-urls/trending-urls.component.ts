import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUrlModel } from 'src/app/core/interfaces/IUrlModel';
import { ToastrHelperService } from 'src/app/core/services/toastr-helper.service';
import { UrlApiService } from 'src/app/core/services/url-api.service';
import { AppConstants } from 'src/app/core/utilities/AppConstants';

@Component({
  selector: 'app-trending-urls',
  templateUrl: './trending-urls.component.html',
  styleUrls: ['./trending-urls.component.css']
})
export class TrendingUrlsComponent implements OnInit, OnDestroy {

  $getTrendingUrls!: any;
  trendingUrls!: IUrlModel[];

  constructor(private urlApiService: UrlApiService,
    private toastrHelperService: ToastrHelperService) { }
  
  ngOnInit(): void {
    this.getTrendingUrls();
  }
  
  getTrendingUrls(): void {
    this.$getTrendingUrls = this.urlApiService.getTrendingUrls(AppConstants.getTrendingUrlsNoOfResult())
                .subscribe({
                  next:(result: IUrlModel[]) =>{
                    this.trendingUrls = result;
                    this.toastrHelperService.notifySuccess("Success", "Trending url's loaded");
                  },
                  error: (err: Error)=> {
                    console.error(err);
                    
                   this.toastrHelperService.notifyError(err.name, err.message);
                  },
                  complete: () => console.log("completed getTrending api")
                });
  }
  
  ngOnDestroy(): void {
    if(this.$getTrendingUrls){this.$getTrendingUrls.unsubscribe();}
  }
  

}
