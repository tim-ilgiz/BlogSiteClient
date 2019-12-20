import {Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from "@angular/core";
import {ResizeObserver} from "resize-observer";

const entriesMap = new WeakMap();
const ro = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entriesMap.has(entry.target)) {
      const comp = entriesMap.get(entry.target);
      comp._resizeCallback(entry);
    }
  }
});

@Directive({
  selector:'[resizeObserver]'
})

export class StyleDirective implements OnDestroy
{
  @Input('resizeObserver') size : number;
  @Output() getSizeEvent = new EventEmitter<number>();

  element:ElementRef;

  constructor(el:ElementRef, renderer:Renderer2)
  {
    this.element = el;
    const target = this.element.nativeElement;
    entriesMap.set(target, this);
    ro.observe(target);
  }

  _resizeCallback(entry)
  {
    this.size = entry.contentRect.width;
    this.getSizeEvent.emit(entry.contentRect.width);
  }

  ngOnDestroy()
  {
    const target = this.element.nativeElement;
    ro.unobserve(target);
    entriesMap.delete(target);
  }
}
