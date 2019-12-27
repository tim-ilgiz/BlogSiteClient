import {Component, OnInit} from '@angular/core';
import {DataService} from 'app/Services/DataService';
import {Post} from '@models/Post';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  items: Post[] = [];
  front = '';
  back = '';

  repositoty: DataService;
  constructor(repositoty: DataService) {
    this.repositoty = repositoty;
  }

  OnSave() {
    this.repositoty.OnEditItem(this.items[0]);
    this.repositoty.OnEditItem(this.items[1]);
  }
  OnEditText(front: string) {
    console.log(front);
  }
  async ngOnInit() {
    await this.repositoty.GetItemsForSelectFolder(100000, this.items);
  }
}
