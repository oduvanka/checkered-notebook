import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  private height: number;
  private isShowGrid: boolean;
  private isHoverable: boolean;
  private sizePoint: number;

  private rCircle: number;
  private xCircle: number;
  private yCircle: number;
  private bgColorCircle: string;

  private pointsPolyline: Array<Array<number>>;
  private pointsPolygone: Array<Array<number>>;

  private fill: string;
  private borderSize: number;

  private borderColorPolygone: string;
  private borderColorPolyline: string;

  private text: string;
  private xText: number;
  private yText: number;
  private sizeText: number;
  private colorText: string;

  constructor() { }

  ngOnInit() {
    const point = { x: 20, y: 20 };
    const xPoint = point['x'];
    const yPoint = point['y'];

    this.height = 300;
    this.isShowGrid = true;
    this.isHoverable = true;
    this.sizePoint = 5;
    
    this.rCircle = 40;
    /* центр круга должен совпадать с переданной точкой 20, вне зависимости от заданного радиуса */
    this.xCircle = xPoint - this.rCircle;
    this.yCircle =  yPoint - this.rCircle;
    this.bgColorCircle = "rgba(0, 0, 0, 0.5)";

    this.pointsPolyline = [[100,100], [150,220], [250,250], [300,150]];
    
    this.pointsPolygone = [[400,100], [450,150], [500,100], [450,50]];

    this.fill = "rgba(0, 0, 0, 0)"
    this.borderSize = 3;

    this.borderColorPolygone = "blue";
    this.borderColorPolyline = "red";

    this.text = "Point N"
    this.sizeText = 24;
    /* Так как x и y у нас координаты верхнего левого угла круга, то ??? */
    this.xText = this.xCircle + this.rCircle;
    this.yText = this.yCircle + this.rCircle + this.sizeText;
    this.colorText = "grey";
  }

  onClick(evt) {
    console.log("click! ", evt);
  }

  onClickEl(evt) {
    console.log("click el! ", evt);
  }

}
