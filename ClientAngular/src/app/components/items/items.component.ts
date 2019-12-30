import { NestedTreeControl } from '@angular/cdk/tree';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Item } from '@models/Item';
import { DataService } from '@models/../Services/DataService';
import { TreeItems } from '@models/FreeItems';
import { FillTreeItem } from './Model/FillTreeItems';
import {Post} from "@models/Post";

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
  removeImage = "assets/images/clear.png";

  @Input() animationToLeftRight:boolean = false;
  @Output() selectParentId = new EventEmitter<number>();
  @Output() OnUpdateSelectId = new EventEmitter<TreeItems>();
  @Output() selectedTreeItem: number = undefined;

  treeControl = new NestedTreeControl<TreeItems>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeItems>();

  async ngOnInit() {

    await this._repository.FillFoldersArray(this.FolderItems);
    FillTreeItem.AddParentItems(this.FolderItems, this.TreeItems);
    this.dataSource.data = this.TreeItems;
  }

  constructor(repository: DataService) {
    this._repository = repository;
  }

  hasChild = (_: number, node: TreeItems) => !!node.children && node.children.length > 0;

  OnAddTreeItem(treeItem: TreeItems) {
    let newItem:Item = new Item(0, "new Folder", treeItem.item.id);
    let newTreeItem :TreeItems = new TreeItems(newItem);
    treeItem.children.push(newTreeItem);

    this.dataSource.data = undefined;
    this.dataSource.data = this.TreeItems;
  }

  OnDeleteItem(treeItem: TreeItems) {
    let newItem:Item = new Item(0, "new Folder", treeItem.item.id);
    let newTreeItem :TreeItems = new TreeItems(newItem);
    treeItem.children.push(newTreeItem);

    this.dataSource.data = undefined;
    this.dataSource.data = this.TreeItems;
  }

  OnSelectedTreeItem(post: TreeItems) {
    this.OnUpdateSelectId.emit(post);
    //Добавить все вложенные элементы в это дерво.


    //Выбрать текущий id и сохранить ее в паременную.
    //Она же нужна будет для удаления этого дерево и добавления нового с parentId - this.id ;
  }

  SelectItem(folder: TreeItems) {
    this.selectParentId.emit(folder.item.id);
    this.OnUpdateSelectId.emit(undefined);
  }
}
