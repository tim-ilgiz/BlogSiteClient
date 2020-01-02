import { NestedTreeControl } from '@angular/cdk/tree';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Folder } from '@models/Folder';
import { DataService } from '@models/../Services/DataService';
import { TreeItems } from '@models/FreeItems';
import { FillTreeItem } from './Model/FillTreeItems';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [DataService]
})
export class ItemsComponent implements OnInit {
  _repository: DataService;

  FolderItems: Folder[] = [];
  TreeItems: TreeItems[] = [];
  visible = false;
  currentTreeItem: TreeItems;
  removeImage = "assets/images/clear.png";

  @Input() updateTreeAction = new EventEmitter<void>();
  @Input() OnRemoveTreeItemAction = new EventEmitter<any>();
  @Input() animationToLeftRight:boolean = false;
  @Output() selectedTreeItem: number = undefined;
  @Output() selectParentId = new EventEmitter<TreeItems>();
  @Output() OnUpdateSelectId = new EventEmitter<TreeItems>();

  treeControl = new NestedTreeControl<TreeItems>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeItems>();

  async ngOnInit() {
    await this._repository.FillFoldersArray(this.FolderItems);
    FillTreeItem.AddParentItems(this.FolderItems, this.TreeItems);

    this.OnUpdateTreeItems();
    this.OnRemoveTreeItemAction.subscribe(() => this.Remove())
    this.updateTreeAction.subscribe(() => this.OnUpdateTreeItems());
  }

  constructor(repository: DataService) {
    this._repository = repository;
  }

  hasChild = (_: number, node: TreeItems) => !!node.children && node.children.length > 0;

  public OnUpdateTreeItems() {
    if (this.dataSource == undefined) return;

    this.dataSource.data = [];
    this.dataSource.data = this.TreeItems;
  }

  OnSelectedTreeItem(treeItem: TreeItems) {
    this.currentTreeItem = treeItem;
    this.OnUpdateSelectId.emit(treeItem);
  }

  private Remove() {
    this.TreeItems.forEach(i =>
    {
      if (i.item.id == this.currentTreeItem.item.id) {
        let index = this.TreeItems.indexOf(i);
        this.TreeItems.splice(index, 1);
      }
      if (i.children == undefined) return;
      this.SearchTreeItem(i);
    });
  }
  private SearchTreeItem(item: TreeItems) {
    item.children.forEach(i => {
      if(i.item.id == this.currentTreeItem.item.id) {
        let index = item.children.indexOf(i);
        item.children.splice(index, 1);
      }
      if (i.children != undefined) return;
      this.SearchTreeItem(i);
    });
  }
}
