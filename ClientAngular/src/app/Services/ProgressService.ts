import {Injectable} from "@angular/core";
import {NgProgressRef} from "@ngx-progressbar/core";

@Injectable()
export class ProgressService
{
  public progressRef: NgProgressRef;

  public StartLoading() {
    this.progressRef.start();
  }

  public CompleteLoading() {
    this.progressRef.complete();
  }
}

