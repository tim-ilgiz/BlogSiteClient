import {EventEmitter, Injectable, Output,} from "@angular/core";

@Injectable()

export class GetSizeService
{
  @Output() getSizeEventEmitter = new EventEmitter<any>();

  getEmitterValue()
  {
    this.getSizeEventEmitter.emit();
  }
}

