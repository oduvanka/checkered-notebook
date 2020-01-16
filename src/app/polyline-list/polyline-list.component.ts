import { Component, OnInit, Input } from '@angular/core';
import { Polyline } from '../polyline';

@Component({
  selector: 'app-polyline-list',
  templateUrl: './polyline-list.component.html',
  styleUrls: ['./polyline-list.component.css']
})
export class PolylineListComponent implements OnInit {

  @Input() polylines: Polyline[];
  private selectedPolyline: Polyline;

  constructor() { }

  ngOnInit() {
  }

  onSelect(polyline: Polyline): void {
    console.log("click list");
    this.selectedPolyline = polyline;
  }

}
