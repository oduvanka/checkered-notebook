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

  constructor() { }

  ngOnInit() {
  }

  onSelectPolyline(polyline: Polyline): void {
    console.log("list");
    console.log("select polyline N", polyline.id, polyline.color);
    console.log(this.polylines);
    this.selectedPolyline = polyline;
    this.isEditLine = true;
    this.selectedPolylineChange.emit(this.selectedPolyline);
  }

  deletePolyline(polyline: Polyline): void {}

}
