import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {EditWindowService} from "../editWindow.service";

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditWindowComponent implements OnInit, OnDestroy {
  @Input() id: string;
  element: any;

  constructor(private editWindowService: EditWindowService,
              private el: ElementRef) {

    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('window must have an id!');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('mouseup', el => {
      if (el.target.className === 'app-edit-window') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.editWindowService.add(this);
  }

  ngOnDestroy(): void {
    this.editWindowService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('edit-window-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('edit-window-open');
  }
}
