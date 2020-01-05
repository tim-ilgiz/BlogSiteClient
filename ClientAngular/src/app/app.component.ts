import { Component, OnInit } from '@angular/core';
import { DataService } from '@models/../Services/DataService';
import {NgProgress, NgProgressRef} from "@ngx-progressbar/core";
import {ProgressService} from "./Services/ProgressService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, ProgressService]
})

export class AppComponent implements OnInit {

  _repository: DataService;
  progressRef: NgProgressRef;

  loading :boolean;
  constructor(repository: DataService,
              progress: NgProgress,
              progressService: ProgressService) {

    this._repository = repository;
    progressService.progressRef = progress.ref('progressId');
  }

  ngOnInit() { }
}
