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
  OnEditText() {
    console.log(`${this.front} и ${this.back}`);
    if (this.front !== undefined && this.back !== undefined) {
      this.items[0].name = this.front;
      this.items[1].name = this.back;
    }
  }

  async ngOnInit() {
    await this.repositoty.GetItemsForSelectFolder(1000000, this.items);
  }
}
