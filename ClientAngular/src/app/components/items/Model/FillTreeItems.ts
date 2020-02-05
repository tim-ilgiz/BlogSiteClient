import { Folder } from '../../Models/Folder';
import { TreeItems } from '../../Models/FreeItems';

export class FillTreeItem
{
  static AddParentItems (repositoryFolderItems:Folder[], treeItems:TreeItems[])
  {
    repositoryFolderItems.forEach(i =>
    {
      if (i.parent == 0)
      {
        let item:Folder = new Folder (i.id, i.folderName, i.parent);
        let treeItem:TreeItems = new TreeItems(item);
        treeItems.push(treeItem);
      }
    });
    this.addItems(treeItems, repositoryFolderItems);
  }

  static addItems (list:TreeItems[], repositoryFolderItems:Folder[])
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
