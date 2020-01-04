import {Component, EventEmitter, OnInit} from '@angular/core';
import {DataService} from '@models/../Services/DataService';
import {Post} from "@models/Post";
import {TreeItems} from "@models/FreeItems";
import {Folder} from "@models/Folder";

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {
  _repository: DataService;

  selectedTreeItemId: number = 0;
  loading :boolean;
  animationToLeftRight :boolean = true;
  CorrectItems:Post[] = new Array<Post>();
  isBool = false;
  currentTreeItem: TreeItems;
  UpdateTreeItemsAction = new EventEmitter<any>();
  RemoveTreeItemAction = new EventEmitter<any>();

  rightArrowIcon = "assets/images/rightArrow.png";
  removeTreeItemIcon = "assets/images/clear.png";
  addTreeItemIcon = "assets/images/add.png";
  editTreeNameIcon = "assets/images/pencil.png";

  constructor(repository: DataService) {
    this._repository = repository;
  }

  ngOnInit() { }

  showLeftPanel() {
    this.isBool = !this.isBool;
  }

  OnRemoveTreeItem() {
    this._repository.OnDeleteFolder(this.selectedTreeItemId).then(r => r);

    this.RemoveTreeItemAction.emit();
    this.UpdateTreeItemsAction.emit();
  }

  OnAddTreeItem() {
    let newItem:Folder = new Folder(0, "new Folder", this.selectedTreeItemId, "status");

    this._repository.OnAddFolder(newItem).then(r => r);

    let newTreeItem :TreeItems = new TreeItems(newItem);
    this.currentTreeItem.children.push(newTreeItem);

    this.UpdateTreeItemsAction.emit();
  }

  OnEditSelectTreeItemIdEvent(treeItem: TreeItems) {
    if (treeItem == undefined) {
      this.selectedTreeItemId = undefined;
      return;
    }
    if (this.currentTreeItem != undefined) {
      this.currentTreeItem.isEdit = false;
    }
    this.currentTreeItem = treeItem;
    let id = this.selectedTreeItemId = treeItem.item.id;
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
    if (treeItems.item != undefined) {
      this._repository.GetItemsForSelectFolder(treeItems.item.id, items).then(r => r);
    }
    treeItems.children.forEach(i => {
      if (i.children==undefined) return;

      this.addTreeItems(i, items);
    });
  }

  OnEditTreeItem() {

    this.currentTreeItem.isEdit = true;
  }
}
