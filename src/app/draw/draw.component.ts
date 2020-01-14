import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Polyline } from '../polyline';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  // холст
  public height: number;
  public isShowGrid: boolean;
  public isHoverable: boolean;
  public sizePoint: number;
  // точка с меткой
  public rCircle: number;
  public sizeText: number;
  public colorText: string;
  // ломаная и многоугольник
  public borderSize: number;
  // имеющиеся фигуры
  public points: Object[];
  public polygons: Object[];
  // новые фигуры
  public editPolyline: Polyline;
  public polylines: Polyline[];
  public isEditLine: boolean;
  public borderSizeEditLine: number;
  public lengthCoordsEditPolyline: number;

  constructor( public _dataService: DataService ) { }

  ngOnInit() {
    this.height = 300;
    this.isShowGrid = true;
    this.isHoverable = false;
    this.sizePoint = 5;  
    
    this.rCircle = 20;
    this.sizeText = 8;
    this.colorText = "grey";

    this.borderSize = 3;
    
    const dataPoints = this._dataService.getDataPoints();
    this.points = this.createArrOfPointsVsLabels(dataPoints);
    this.polygons = this._dataService.getDataPolygons();

    this.isEditLine = false;
    this.borderSizeEditLine = 5;
    this.lengthCoordsEditPolyline = 0;
    this.editPolyline = {id: "0", coords: [], color: ""};
    this.polylines = [];
  }

  private createArrOfPointsVsLabels(data: Object[]) {
    const newData = [];
    data.map((item) => {
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

      newData.push({
        id, 
        circle: { x: xCircle, y: yCircle, color: bgColorCircle },
        label: {text, x: xText, y: yText }
      });
    });

    return newData;
  }

  onClick(evt) {
    console.log("click canvas", evt);
    this.isEditLine = false;
    this.editPolyline = {id: "0", coords: [], color: ""};
  }

  onDoubleClick(evt) {
    console.log("2-click canvas", evt);
  }

  onMouseMove(evt) {
    console.log("mouse move canvas");
    if (this.isEditLine) {
      let arrCoords = this.editPolyline['coords'];
      
      // если это не первый сдвиг после фиксации
      if (arrCoords.length !== this.lengthCoordsEditPolyline) {
        // удаляем последний имеющийся временный сдвиг, чтобы последним остался последний зафиксированный
        arrCoords.pop();
      }

      const lastCoords = arrCoords[arrCoords.length - 1];
      const cxEl = (evt.x < lastCoords[0]) ? evt.x+1 : evt.x-1;
      const cyEl = (evt.y < lastCoords[1]) ? evt.y+1 : evt.y-1;

      arrCoords.push([cxEl, cyEl]);
    }
  }

  onClickCircle(evt) {
    console.log("click circle", evt);
    const el = evt.target;
    const attrEl = el.attributes;
    const cxEl = attrEl.getNamedItem('cx').value;
    const cyEl = attrEl.getNamedItem('cy').value;
    const fillEl = attrEl.getNamedItem('fill').value;

    if (!this.isEditLine) {
      this.isEditLine = true;
      // создаём новую polyline
      const id = this.polylines.length + "";
      const coords = [[cxEl, cyEl]];
      const color = fillEl;
      this.editPolyline = {id, coords, color};
      this.lengthCoordsEditPolyline = 1;
    }
    else {
      // продолжаем начатую polyline
      let arrCoords = this.editPolyline['coords'];
      const lastCoords = arrCoords[arrCoords.length - 1];
      
      if ((lastCoords[0] !== cxEl) || (lastCoords[1] !== cyEl)) {
        // удаляем временную точку, которая добавлялась при mouseMove
        arrCoords.pop();
        arrCoords.push([cxEl, cyEl]);
        this.lengthCoordsEditPolyline++;
      }
    }
  }

  onClickPolyline(evt) {
    console.log("click polyline", evt);
    const polyline = evt.target;
    const attr = polyline.attributes;
    const points = attr.getNamedItem("points");
    const strPoints = points.value;

    const currentPolyline = this.polylines.find((item) => {
      const coords = item['coords'];
      const strCoords = coords.join(',');
      if (strPoints === strCoords) return item;
    });

    this.editPolyline = currentPolyline;
    this.isEditLine = true;
  }

  onDoubleClickCircle(evt) {
    console.log("2-click circle", evt);
    if (this.isEditLine) {
      // завершаем начатую ранее polyline
      this.isEditLine = false;
      const arrCoords = this.editPolyline['coords'];

      if (arrCoords.length > 1) {
        this.polylines.push(this.editPolyline);
        this.editPolyline = {id: "0", coords: [], color: ""};
      }
    }
  }
}
