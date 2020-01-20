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

  constructor() { }

  ngOnInit() {
  }

  onSelectPolyline(polyline: Polyline): void {
    this.selectedPolyline = {
      id: polyline.id,
      coords: [...polyline.coords],
      color: polyline.color
    }
    this.isEditLine = true;
    
    this.selectedPolylineChange.emit(this.selectedPolyline);
    this.isEditLineToogle.emit(this.isEditLine);
  }

  deletePolyline(polyline: Polyline): void {}

}
