import { Component, EventEmitter } from '@angular/core';
import { DataService } from '../../shared/Services/DataService';
import { Post } from "../Models/Post";
import { TreeItems } from "../Models/FreeItems";
import { Folder } from "../Models/Folder";

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css',
              '../../app.component.css',
  ]
})
export class WorkSpaceComponent {
  _repository: DataService;

  selectedTreeItemId: number = 0;
  focusItemId: number = 0;

  loading :boolean;
  CorrectItems:Post[] = new Array<Post>();
  isBool = false;
  currentTreeItem: TreeItems;

  UpdateTreeItemsAction = new EventEmitter<any>();
  RemoveTreeItemAction = new EventEmitter<any>();

  rightArrowIcon = "assets/images/CollapsedIcon.png";
  removeTreeItemIcon = "assets/images/clear.png";
  addTreeItemIcon = "assets/images/add.png";
  editTreeNameIcon = "assets/images/pencil.png";

  constructor(private repository: DataService) {
    this._repository = repository;
  }

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

  OnEditVisibleAppItemComponent(visible: boolean) {
    this.isBool = visible;
  }

  OnUpdateFocusItemId(focusId: number) {
    this.focusItemId = focusId;
  }
}
