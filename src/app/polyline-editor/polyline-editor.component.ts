import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Polyline } from '../polyline';

@Component({
  selector: 'app-polyline-editor',
  templateUrl: './polyline-editor.component.html',
  styleUrls: ['./polyline-editor.component.css']
})
export class PolylineEditorComponent implements OnInit {

  @Input() polyline: Polyline;
  @Output() polylineChange =  new EventEmitter<Polyline>();
  @Input() isEditLine: boolean;
  @Output() isEditLineToogle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.polyline);
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.polylineChange.emit(this.polyline);
    this.isEditLineToogle.emit(false);
  }

  deleteCoord(index) {
    console.log("deleteCoord");
    let coords = this.polyline.coords;
    coords.splice(index, 1);
  }

}
