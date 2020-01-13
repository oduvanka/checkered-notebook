import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  public height: number;
  public isShowGrid: boolean;
  public isHoverable: boolean;
  public sizePoint: number;

  public rCircle: number;
  public myClasses: string[];
  public sizeText: number;
  public colorText: string;

  public borderSize: number;

  public dataPoints: Object[];
  public points: Object[];
  public polygons: Object[];
  public isNewLine: boolean;
  public polylines: Object[];
  public newPolyline: Object;
  public lengthCoordsNewPolyline: number;

  constructor( public _dataService: DataService ) { }

  ngOnInit() {
    this.height = 300;
    this.isShowGrid = true;
    this.isHoverable = false;
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

    this.isNewLine = false;
    this.newPolyline = {};
    this.lengthCoordsNewPolyline = 0;
    this.polylines = [];
  }

  onClick(evt) {
    console.log("click!", evt);
  }

  onMouseMove(evt) {
    if (this.isNewLine) {
      let arrCoords = this.newPolyline['coords'];
      
      // если это не первый сдвиг после фиксации
      if (arrCoords.length !== this.lengthCoordsNewPolyline) {
        // удаляем последний имеющийся временный сдвиг, чтобы последним остался последний зафиксированный
        arrCoords.pop();
      }

      const lastCoords = arrCoords[arrCoords.length - 1];
      const cxEl = (evt.x < lastCoords[0]) ? evt.x+1 : evt.x-1;
      const cyEl = (evt.y < lastCoords[1]) ? evt.y+1 : evt.y-1;

      arrCoords.push([cxEl, cyEl]);
    }
  }

  onClickEl(evt) {
    const el = evt.target;
    const attrEl = el.attributes;
    const cxEl = attrEl.getNamedItem('cx').value;
    const cyEl = attrEl.getNamedItem('cy').value;

    if (!this.isNewLine) {
      this.isNewLine = true;
      // создаём новую polyline
      const id = this.polylines.length;
      const coords = [[cxEl, cyEl]];
      const color = "#000000";
      this.newPolyline = {id, coords, color};
      this.lengthCoordsNewPolyline = 1;
    }
    else {
      // продолжаем начатую polyline
      let arrCoords = this.newPolyline['coords'];
      const lastCoords = arrCoords[arrCoords.length - 1];
      
      if ((lastCoords[0] !== cxEl) || (lastCoords[1] !== cyEl)) {
        // удаляем временную точку, которая добавлялась при mouseMove
        arrCoords.pop();
        arrCoords.push([cxEl, cyEl]);
        this.lengthCoordsNewPolyline++;
      }
    }
  }

  onDoubleClickEl(evt) {
    if (this.isNewLine) {
      // завершаем начатую ранее polyline
      this.isNewLine = false;
      const arrCoords = this.newPolyline['coords'];

      if (arrCoords.length > 1) {
        this.polylines.push(this.newPolyline);
        this.newPolyline = {};
      }
    }
  }

  onMouseOverEl(evt) {
    //console.log("mouse over to the el ", evt);
    //const el = evt.target;
  }

  onMouseOutEl(evt) {
    //console.log("mouse out to the el ", evt);
    //const el = evt.target;
  }

}
