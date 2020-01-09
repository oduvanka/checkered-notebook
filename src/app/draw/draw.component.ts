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
  public myClasses: string[];
  private sizeText: number;
  private colorText: string;

  private borderSize: number;

  private dataPoints: Object[];
  private points: Object[];
  private polygons: Object[];

  constructor( private _dataService: DataService ) { }

  ngOnInit() {
    this.height = 300;
    this.isShowGrid = true;
    this.isHoverable = true;
    this.sizePoint = 5;  
    
    this.rCircle = 20;
    this.myClasses = ['test1'];
    this.sizeText = 8;
    this.colorText = "grey";

    this.borderSize = 1;
    
    this.dataPoints = this._dataService.getDataPoints();
    this.points = [];
    this.dataPoints.map((item) => {
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

    this.polygons = this._dataService.getDataPolygons();
  }

  onClick(evt) {
    console.log("click! ", evt);
  }

  onClickEl(evt) {
    console.log("click to el ", evt);
  }

  onMouseOverEl(evt) {
    console.log("mouse over to the el ", evt);
    const el = evt.target;
    /*el.style.stroke="black"
    el.style.strokeWidth="1"*/
  }

  onMouseOutEl(evt) {
    console.log("mouse out to the el ", evt);
    const el = evt.target;
    /*el.style.stroke="none"
    el.style.strokeWidth="none"*/
  }

}
