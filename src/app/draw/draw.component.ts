import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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
  private sizeText: number;
  private colorText: string;

  private pointsPolyline: Array<Array<number>>;
  private pointsPolygone: Array<Array<number>>;

  private fill: string;
  private borderSize: number;

  private borderColorPolygone: string;
  private borderColorPolyline: string;

  private data: Object[];
  private points: Object[];

  constructor( private _dataService: DataService ) { }

  ngOnInit() {
    this.height = 300;
    this.isShowGrid = true;
    this.isHoverable = true;
    this.sizePoint = 5;  
    
    this.rCircle = 10;
    this.sizeText = 8;
    this.colorText = "grey";
    
    this.data = this._dataService.getData();
    this.points = [];

    this.data.map((item) => {
      const id = item['id'];
      const point = item['coords'];
      const xPoint = point['x'];
      const yPoint = point['y'];
      
      // центр круга должен совпадать с переданной точкой, вне зависимости от заданного радиуса
      const xCircle = xPoint - this.rCircle;
      const yCircle =  yPoint - this.rCircle;
      const bgColorCircle = item['color'];

      const text = "P" + id;
      const xText = xPoint + 0.5 * this.rCircle;
      const yText = yPoint;

      this.points.push({
        id, 
        circle: { x: xCircle, y: yCircle, color: bgColorCircle },
        label: {text, x: xText, y: yText }
      });
    }); 

    this.pointsPolyline = [[380,100], [420,220], [540,260], [580,140]];
    
    this.pointsPolygone = [[400,100], [450,150], [500,100], [450,50]];

    this.fill = "rgba(0, 0, 0, 0)"
    this.borderSize = 3;

    this.borderColorPolygone = "blue";
    this.borderColorPolyline = "red";
  }

  onClick(evt) {
    console.log("click! ", evt);
  }

  onClickEl(evt) {
    console.log("click el! ", evt);
  }

}
