import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  private pointsPolyline: Array<number[]>;
  private pointsPolygone: Array<number[]>;

  constructor() { }

  ngOnInit() {
    this.pointsPolyline = [[50, 50], [60, 80], [90, 75], [100, 70], [110, 85]];
    this.pointsPolygone = [[0, 50], [50, 100], [100, 50], [50, 0]];
  }

  onClick(evt) {
    console.log("click! ", evt);
  }

}
