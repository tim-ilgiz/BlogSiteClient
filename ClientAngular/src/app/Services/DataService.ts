import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import { Post } from "@models/Post";
import { Item } from "@models/Item";

@Injectable()

export class DataService
{
  //private url = 'https://localhost:44343/api/Repository';
  private url = 'https://api.detree.ru/api/repository';


  constructor (private http: HttpClient) { }

  public getItems ()
  {
      return this.http.get(this.url);
  }

  public GetAllPost(parentId:any)
  {
      return this.http.get(this.url+"/GetItemsForThisParent", {params:new HttpParams().set("", parentId)});
  }

  public async CreateItem(item:Post) {
    this.http.post<Post>(this.url+"/OnAddItem/", item).subscribe((i:Post) => item.id = i.id);
  }

  public async OnDeleteItem(id:number){
    this.http.delete(this.url+"/OnDeleteItem/", {params:new HttpParams().set("", `${id}`)}).subscribe();
  }

  public async OnEditItem(item:Post){
    await this.http.post(this.url + '/OnEditItem/', item).subscribe();
  }

  public async FillFoldersArray (array : Item[] ) {
    await this.getItems().toPromise().then((element:Item[]) =>
        element.forEach((i:Item) =>
            array.push(new Item( i.id, i.folderName,i.parent,i.status))));
  }

  public async GetItemsForSelectFolder (id: number, items:Post[])
  {
    await this.GetAllPost(id).toPromise().then((element:Post[]) =>
        element.forEach((c:Post) =>
            items.push(new Post(c.id, c.name, c.link, c.image, c.parentId))));
  }
}
