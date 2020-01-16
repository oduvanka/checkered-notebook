import { Component, OnInit, Input } from '@angular/core';
import { Polyline } from '../polyline';

@Component({
  selector: 'app-polyline-list',
  templateUrl: './polyline-list.component.html',
  styleUrls: ['./polyline-list.component.css']
})
export class PolylineListComponent implements OnInit {

  @Input() polylines: Polyline[];
  @Input() selectedPolyline: Polyline;
  @Input() isEditLine: boolean;

  constructor() { }

  ngOnInit() {
  }

  onSelect(polyline: Polyline): void {
    console.log("select polyline N", polyline.id, polyline.color);
    this.selectedPolyline = polyline;
    this.isEditLine = true;
  }

  deletePolyline(polyline: Polyline): void {}

}
