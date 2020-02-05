import {Component, OnInit} from '@angular/core';
import {DataService} from 'app/shared/Services/DataService';
import {Post} from '../Models/Post';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  itemsfront: Post[] = [];
  itemsback: Post[] = [];
  front = '';
  back = '';

  repositoty: DataService;
  constructor(repositoty: DataService) {
    this.repositoty = repositoty;
  }

  async OnSave() {
    await this.repositoty.OnEditItem(this.itemsfront[0]).then(r => r);
    await this.repositoty.OnEditItem(this.itemsback[0]).then(r => r);
  }
  OnEditText() {
    console.log(`${this.front} и ${this.back}`);
    if (this.front !== undefined && this.back !== undefined) {
      this.itemsfront[0].name = this.front;
      this.itemsback[0].name = this.back;

      this.OnSave().then(r => r)
    }
  }

  async ngOnInit() {
    await this.repositoty.GetItemsForSelectFolder(1000000, this.itemsfront);
    await this.repositoty.GetItemsForSelectFolder(1000001, this.itemsback);
    this.front = this.itemsfront[0].name;
    this.back = this.itemsback[0].name;
  }
}
