import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Polyline } from '../polyline';

@Component({
  selector: 'app-polyline-list',
  templateUrl: './polyline-list.component.html',
  styleUrls: ['./polyline-list.component.css']
})
export class PolylineListComponent implements OnInit {

  @Input() polylines: Polyline[];
  @Input() selectedPolyline: Polyline;
  @Input() selectedPolylineCopyBefore: Polyline;
  @Output() selectedPolylineChange = new EventEmitter<Polyline>();
  @Output() selectedPolylineCopyBeforeChange = new EventEmitter<Polyline>();
  @Input() isEditLine: boolean;
  @Output() isEditLineToogle = new EventEmitter<boolean>();

  public isDisabledColorPicker: boolean;

  constructor() { }

  ngOnInit() {
    this.isDisabledColorPicker = false;
  }

  onSelectPolyline(polyline: Polyline): void {
    //console.log("onSelectPolyline");
    this.selectedPolyline = polyline;
    this.selectedPolylineCopyBefore = new Polyline(polyline.id, [...polyline.coords], polyline.color);
    this.isEditLine = true;
    
    this.selectedPolylineChange.emit(this.selectedPolyline);
    this.selectedPolylineCopyBeforeChange.emit(this.selectedPolylineCopyBefore);
    this.isEditLineToogle.emit(this.isEditLine);
  }

  deletePolyline(polyline: Polyline): void {
    //console.log("deletePolyline");
    const currentIndex = this.polylines.findIndex((item) => item.id === polyline.id);
    if (currentIndex !== -1) this.polylines.splice(currentIndex, 1);

    this.selectedPolyline = Polyline.clear();
    this.selectedPolylineCopyBefore = Polyline.clear();
    this.isEditLine = false;
    
    this.selectedPolylineChange.emit(this.selectedPolyline);
    this.selectedPolylineCopyBeforeChange.emit(this.selectedPolylineCopyBefore);
    this.isEditLineToogle.emit(this.isEditLine);
  }

  deleteFirstCoord(polyline: Polyline) {
    //console.log("deleteFirstCoord");
    polyline.coords.shift();
  }

  deleteLastCoord(polyline: Polyline) {
    //console.log("deleteLastCoord");
    polyline.coords.pop();
  }

}
