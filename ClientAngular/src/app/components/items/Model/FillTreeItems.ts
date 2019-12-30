import { Item } from '@models/Item';
import { TreeItems } from '@models/FreeItems';

export class FillTreeItem
{
  static AddParentItems (repositoryFolderItems:Item[], treeItems:TreeItems[])
  {
    repositoryFolderItems.forEach(i =>
    {
      if (i.parent == 0)
      {
        let item:Item = new Item (i.id, i.folderName, i.parent);
        let treeItem:TreeItems = new TreeItems(item);
        treeItems.push(treeItem);
      }
    });
    this.addItems(treeItems, repositoryFolderItems);
  }

  static addItems (list:TreeItems[], repositoryFolderItems:Item[])
  {
    list.forEach (i =>
    {
      repositoryFolderItems.forEach (c =>
      {
        if (i.item.id == c.parent) i.children.push(new TreeItems(c));
      });

      if (i.children.length > 0) this.addItems(i.children, repositoryFolderItems);
    });
  }
}
