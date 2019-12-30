import {Component, OnInit} from '@angular/core';
import {DataService} from '@models/../Services/DataService';
import {Post} from "@models/Post";
import {TreeItems} from "@models/FreeItems";
import {forEachToken} from "tslint";

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {
  _repository: DataService;

  selectedTreeItemId: number = undefined;
  selectItemId :number;
  hasSelectedItem = false;
  loading :boolean;
  animationToLeftRight :boolean = true;
  CorrectItems:Post[]=new Array<Post>();
  isBool = false;

  rightArrowIcon = "assets/images/rightArrow.png";
  removeTreeItemIcon = "assets/images/clear.png";
  addTreeItemIcon = "assets/images/add.png";

  constructor(repository: DataService) {
    this._repository = repository;
  }

  ngOnInit() { }

  GetCorrectItems(id: number)
  {
    this.CorrectItems = [];
    this.selectItemId = id;

    this._repository.GetItemsForSelectFolder(id, this.CorrectItems).then(r => r);
  }

  showLeftPanel() {
    this.isBool = !this.isBool;
  }

  OnRemoveTreeItem() {

  }

  OnAddTreeItem() {

  }

  OnEditSelectTreeItemIdEvent(treeItem: TreeItems) {
    if (treeItem == undefined) {
      this.selectedTreeItemId = undefined;
      return;
    }

    let id = this.selectedTreeItemId = treeItem.item.id;
    console.log(id);
    let items: Post[] = [];

    this._repository.GetItemsForSelectFolder(id, items).then(r => r);

    treeItem.children.forEach(i => {
        this._repository.GetItemsForSelectFolder(id, items).then(r => r);
        if (i.children==undefined) return;

        this.addTreeItems(i, items);
    });
    this.CorrectItems = items;
  }
  addTreeItems(treeItems: TreeItems, items: Post[]) {
    if (treeItems.item != undefined){
      this._repository.GetItemsForSelectFolder(treeItems.item.id, items).then(r => r);
    }
    treeItems.children.forEach(i => {
      if (i.children==undefined) return;
      this.addTreeItems(i, items);
    });
  }
}
