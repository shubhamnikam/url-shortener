import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrHelperService {

  constructor(private toastr: ToastrService) { }

  notifySuccess(title: string, message: string):void {
    this.toastr.success(message, title);
  }
  notifyInfo(title: string, message: string):void {
    this.toastr.info(message, title);
  }
  notifyWarning(title: string, message: string):void {
    this.toastr.warning(message, title);
  }
  notifyError(title: string, message: string):void {
    this.toastr.error(message, title);
  }

}
