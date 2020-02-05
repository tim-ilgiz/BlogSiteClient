import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Post} from "../../components/Models/Post";
import {Folder} from "../../components/Models/Folder";
import {ProgressService} from "./ProgressService";

@Injectable()

export class DataService {
  //private url = 'https://localhost:44343/api/Repository';
  private url = 'https://api.detree.ru/api/repository';

  constructor(private http: HttpClient, public progressService: ProgressService) {
  }

  public getItems() {
      return this.http.get(this.url);
  }

  public GetAllPost(parentId: any) {
      return this.http.get(this.url + "/GetItemsForThisParent", {params: new HttpParams().set("parentId", parentId)});
  }

  public async CreateItem(post: Post) {
    this.progressService.StartLoading();
    this.http.post<Post>(this.url + "/OnAddItem/", post)
             .subscribe((i: Post) => {
               post.id = i.id;
               this.progressService.CompleteLoading();
             });
  }

  public async OnDeleteItem(id: number) {
    this.progressService.StartLoading();
    this.http.delete(this.url + "/OnDeleteItem/", {params: new HttpParams().set("id", `${id}`)}).subscribe();
    this.progressService.CompleteLoading();
  }

  public async OnEditItem(item: Post) {
    this.progressService.StartLoading();
    await this.http.post(this.url + '/OnEditItem/', item).subscribe(() => this.progressService.CompleteLoading());
  }

  public async OnAddFolder(item:Folder) {
    await this.http.post(this.url + "/OnAddFolder/", item)
                   .subscribe((i: Folder) => item.id = i.id);
  }

  public async OnDeleteFolder(id: number) {
    this.http.delete(this.url + "/OnDeleteFolder/", {params: new HttpParams().set("id", `${id}`)}).subscribe();
  }

  public async OnEditFolder(folder: Folder) {
    this.http.post(this.url + "/OnEditFolder/", folder).subscribe();
  }

  public async FillFoldersArray(array: Folder[]) {
    this.progressService.StartLoading();
    await this.getItems().toPromise().then((element: Folder[]) =>
        element.forEach((i: Folder) =>
            array.push(new Folder( i.id, i.folderName, i.parent, i.status))));
    this.progressService.CompleteLoading();
  }

  public async GetItemsForSelectFolder(id: number, items: Post[]) {
    this.progressService.StartLoading();
    await this.GetAllPost(id).toPromise().then((element: Post[]) =>{
        element.forEach((c: Post) =>
            items.push(new Post(c.id, c.name, c.linkUrl, c.image, c.parentId, c.click)));
        this.progressService.CompleteLoading();
    });
  }
}
