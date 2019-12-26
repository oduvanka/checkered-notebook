import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  private pointsPolyline;
  private pointsPolygone;
  private text: string;

  constructor() { }

  ngOnInit() {
    this.pointsPolyline = [[200,200], [250,125], [250,175], [300,100]];
    this.pointsPolygone = [[400,100], [450,150], [500,100], [450,50]];
    this.text = "&!"
  }

  onClick(evt) {
    console.log("click! ", evt);
  }

}
