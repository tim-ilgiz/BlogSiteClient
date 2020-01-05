import { Component, OnInit } from '@angular/core';
import { DataService } from '@models/../Services/DataService';
import {NgProgress, NgProgressRef} from "@ngx-progressbar/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent implements OnInit {

  _repository: DataService;
  progressRef: NgProgressRef;

  loading :boolean;
  constructor(repository: DataService,
              progress: NgProgress) {

    this._repository = repository;
    this.progressRef = progress.ref('progressId');
    this.progressRef.start();
  }

  StartLoading() {
    this.progressRef.start();
  }

  CompleteLoading() {
    this.progressRef.complete();
  }

  ngOnInit() { }
}
