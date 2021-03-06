import { Component } from '@angular/core';
import { NgProgress } from "@ngx-progressbar/core";
import {ProgressService} from "./shared/Services/ProgressService";
import {DataService} from "./shared/Services/DataService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, ProgressService]
})

export class AppComponent {

  repository: DataService;

  constructor(repository: DataService,
              progress: NgProgress,
              progressService: ProgressService) {

    this.repository = repository;
    progressService.progressRef = progress.ref('progressId');
  }
}
