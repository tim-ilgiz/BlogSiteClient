import { Folder } from '@models/Folder';

export class TreeItems {
    item: Folder;
    name:string;
    children?: TreeItems [] = [];

    constructor (item:Folder) {
      this.item = item;
      this.name = item.folderName;
    }
  }
