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
  @Output() selectedPolylineChange = new EventEmitter<Polyline>();
  @Input() isEditLine: boolean;
  @Output() isEditLineToogle = new EventEmitter<boolean>();

  public isDisabledColorPicker: boolean;

  constructor() { }

  ngOnInit() {
    this.isDisabledColorPicker = false;
  }

  onSelectPolyline(polyline: Polyline): void {
    this.selectedPolyline = polyline;
    this.isEditLine = true;
    
    this.selectedPolylineChange.emit(this.selectedPolyline);
    this.isEditLineToogle.emit(this.isEditLine);
  }

  deletePolyline(polyline: Polyline): void {
    const currentIndex = this.polylines.findIndex((item) => item.id === polyline.id);
    if (currentIndex !== -1) this.polylines.splice(currentIndex, 1);

    this.selectedPolyline = {id: "-", coords: [], color: ""};
    this.isEditLine = false;
    
    this.selectedPolylineChange.emit(this.selectedPolyline);
    this.isEditLineToogle.emit(this.isEditLine);
  }

}
