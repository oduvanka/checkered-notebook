import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Input() label: string;
  @Input() currentColor: string;
  @Output() currentColorChange = new EventEmitter<string>();
  @Input() isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  onChange(evt) {
    this.currentColor = evt.target.value;
    this.currentColorChange.emit(this.currentColor);
  }

}
