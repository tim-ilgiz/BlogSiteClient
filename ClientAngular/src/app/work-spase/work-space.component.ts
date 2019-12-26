import {Component, OnInit} from '@angular/core';
import {DataService} from '@models/../Services/DataService';
import {Post} from "@models/Post";

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {
  _repository: DataService;

  selectItemId :number;
  loading :boolean;
  animationToLeftRight :boolean = true;
  CorrectItems:Post[]=new Array<Post>();
  isBool = false;
  rightArrowImage = "assets/images/rightArrow.png";

  constructor(repository: DataService) {
    this._repository = repository;
  }

  ngOnInit() { }

  GetCorrectItems(id: number)
  {
    this.CorrectItems = [];
    this.selectItemId = id;

    this._repository.GetItemsForSelectFolder(id, this.CorrectItems).then(r => r);
    this.loading = false;
  }

  showLeftPanel() {
    this.isBool = !this.isBool;
  }
}
