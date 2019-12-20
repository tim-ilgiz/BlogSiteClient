import { Item } from '@models/Item';

export class TreeItems {
    _item: Item;
    name:string;
    _children?: TreeItems [] = [];

    constructor (item:Item) {
      this._item = item;
      this.name = item.folderName;
    }
  }
