import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Post} from "../Models/Post";
import {DataService} from "../../shared/Services/DataService";
import {EditWindowService} from "../../editWindow/editWindow.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers:[EditWindowService]
})

export class ContentComponent {

  @Input() Posts :Post[] = [];
  @Input() ParentId :number;
  @Input() Loading :boolean;
  @Input() FocusFreeItemId :number = 0;

  SelectedPost: Post;
  backgroundImage = "assets/images/backgroundImage.jpg";
  editWindowId = "edit-window-1";

  style = "";
  name = "";
  url = "";

  constructor(public repository: DataService, private editWindowService: EditWindowService) { }

  Onresize(evt:number, post:Post) {
    post.postSize = evt;
  }

  async OnAddPost() {
    let newPost = new Post(0, "new Post", "not link", "", this.ParentId, 0);
    await this.repository.CreateItem(newPost);

    this.Posts.push(newPost);
  }

  async OnDeletePost(item:Post, index:number){
    await this.repository.OnDeleteItem(item.id);

    this.Posts.splice(index,1);
  }

  async OnEditItem() {
    this.SelectedPost.name = this.name;
    this.SelectedPost.linkUrl = this.url;
    await this.repository.OnEditItem(this.SelectedPost);

    this.editWindowService.close(this.editWindowId);
  }

  OnUpSize(post: Post) {
    this.SelectedPost = post;
    this.name = post.name;
    this.url = post.linkUrl;

    this.editWindowService.open(this.editWindowId);
  }

  CloseEditWindow() {
    this.editWindowService.close(this.editWindowId)
  }

  locationRef(event: any,  path: string) {
    if (event.currentTarget === event.target) {
      open(`${path}`);
    }
    event.stopPropagation();
  }

  OnclickDeleteNumber(post: Post) {
    post.deleteClick ++;
    if (post.deleteClick == 2) {post.deleteClick = 0;}
  }

  OnDroppedMove(post: Post,index: number) {

    if (this.FocusFreeItemId != 0) {
      post.parentId = this.FocusFreeItemId;
      this.repository.OnEditItem(post).then();

      this.Posts.splice(index, 1);
    }
  }
}
