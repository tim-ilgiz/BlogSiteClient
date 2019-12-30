import { Item } from '@models/Item';

export class TreeItems {
    item: Item;
    name:string;
    children?: TreeItems [] = [];

    constructor (item:Item) {
      this.item = item;
      this.name = item.folderName;
    }
  }
