import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Item } from '@models/Item';
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

  FolderItems: Item[] = [];
  TreeItems: TreeItems[] = [];
  visible = false;
  animationToLeftRight = false;
  removeImage = "assets/images/clear.png";

  @Output() selectParentId = new EventEmitter<number>();
  treeControl = new NestedTreeControl<TreeItems>(node => node._children);
  dataSource = new MatTreeNestedDataSource<TreeItems>();

  async ngOnInit() {

    await this._repository.FillFoldersArray(this.FolderItems);
    FillTreeItem.AddParentItems(this.FolderItems, this.TreeItems);
    this.dataSource.data = this.TreeItems;
  }

  constructor(repository: DataService)
  {
    this._repository = repository;
  }

  hasChild = (_: number, node: TreeItems) =>
    !!node._children && node._children.length > 0;

  SelectItem(folder: TreeItems) {
    this.selectParentId.emit(folder._item.id);
  }

  OnAddTreeItem(treeItem: TreeItems)
  {
    let newItem:Item = new Item(0, "new Folder", treeItem._item.id);
    let newTreeItem :TreeItems = new TreeItems(newItem);
    treeItem._children.push(newTreeItem);

    this.dataSource.data = undefined;
    this.dataSource.data = this.TreeItems;
  }

  OnDeleteItem(treeItem: TreeItems)
  {
    let newItem:Item = new Item(0, "new Folder", treeItem._item.id);
    let newTreeItem :TreeItems = new TreeItems(newItem);
    treeItem._children.push(newTreeItem);

    this.dataSource.data = undefined;
    this.dataSource.data = this.TreeItems;
  }

  DisableFree() {
    this.animationToLeftRight=!this.animationToLeftRight;
  }
}
