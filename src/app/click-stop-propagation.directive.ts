import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stop-propagation-evt]',
  host: {
    "(click)": "onClick($event)"
  }
})
export class ClickStopPropagationDirective {

  constructor() { }

  onClick(evt: any): void {
    evt.stopPropagation();
  }

}
