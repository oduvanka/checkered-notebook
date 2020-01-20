import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() polylines: Polyline[];
  @Input() editablePolyline: Polyline;
  @Output() editablePolylineChange = new EventEmitter<Polyline>();
  @Input() isEditLine: boolean;
  @Output() isEditLineToogle = new EventEmitter<boolean>();
  private defaultColorPolyline: string;
  private transparencyColorPolyline: number;
  public nFixedPolylinePoints: number; // кол-во зафиксированных точек в редактируемой полилинии

  constructor( public _dataService: DataService ) { }

  ngOnInit() {
    this.height = 300;
    this.isShowGrid = true;
    /* isHoverable
    false - нет события клика по холсту, 
    true - нет события клика любого эл-та, т.к. sizePoint (даже = 0) как бы перекрывает эл-т */
    this.isHoverable = true;
    this.sizePoint = 0;  
    
    this.rCircle = 18;
    this.sizeText = 8;
    this.colorText = "grey";

    this.borderSize = 3;
    
    const dataPoints = this._dataService.getDataPoints();
    this.points = this.createArrOfPointsVsLabels(dataPoints);
    this.polygons = this._dataService.getDataPolygons();

    this.defaultColorPolyline = "#000000";
    this.transparencyColorPolyline = 0.5;
    this.turnOffLineDrawing();
  }

  /* СОБЫТИЯ ХОЛСТА */

  onClick(evt) {
    //console.log("click canvas");
    if (!this.isEditLine) return;

    let currentCoords = this.editablePolyline.coords;
    currentCoords.pop();
    this.turnOffLineDrawing();
  }

  onDoubleClick(evt) {
    //console.log("2-click canvas");
    if (!this.isEditLine) return;

    let currentCoords = this.editablePolyline.coords;
    currentCoords.pop();
    this.turnOffLineDrawing();
  }

  onMouseMove(evt) {
    //console.log("mouse move canvas");
    if (!this.isEditLine) return;

    let currentCoords = this.editablePolyline.coords;

    if (this.nFixedPolylinePoints === 0) {
      //если редактирование вызвано из списка
      this.nFixedPolylinePoints = currentCoords.length;
    }
    if (this.nFixedPolylinePoints < currentCoords.length) {
      // если после фиксации уже была добавлена временная точка, удалим её
      currentCoords.pop();
    }

    const lastCoords = currentCoords[currentCoords.length - 1];
    const cxEl = (evt.x < lastCoords[0]) ? evt.x+1 : evt.x-1;
    const cyEl = (evt.y < lastCoords[1]) ? evt.y+1 : evt.y-1;

    // добавим новую временную точку
    currentCoords.push([cxEl, cyEl]);
  }

  /* СОБЫТИЯ ТОЧКИ */

  onClickCircle(evt) {
    //console.log("click circle");
    const el = evt.target;
    const attrEl = el.attributes;
    const cxEl = attrEl.getNamedItem('cx').value;
    const cyEl = attrEl.getNamedItem('cy').value;

    if (this.isEditLine) {
      // продолжаем начатую polyline
      let currentCoords = this.editablePolyline.coords;
      const isRepeating = currentCoords.find((item) => (item[0] === cxEl && item[1] === cyEl));
      
      if (isRepeating) {
        //console.log("Линия уже проходит через эту точку");
      }
      else {
        // удаляем временную точку, которая добавлялась при mouseMove
        currentCoords.pop();
        currentCoords.push([cxEl, cyEl]);
        this.nFixedPolylinePoints++;
      }
    }
    else {
      this.turnOnLineDrawing();
      // создаём первую точку новой polyline
      const id = this.polylines.length + "";
      const coords = [[cxEl, cyEl]];
      const color = this.defaultColorPolyline;
      this.editablePolyline = {id, coords, color};
      this.nFixedPolylinePoints = 1;
    }
  }

  onDoubleClickCircle(evt) {
    //console.log("2-click circle");
    if (!this.isEditLine) return;

    // завершаем начатую ранее polyline
    const lengthCurrentPolyline = this.editablePolyline.coords.length;

    if (lengthCurrentPolyline > 1) {
      const currentId = this.editablePolyline.id;
      let existingLine = this.polylines.find((item) => item.id === currentId);
      if (existingLine) {
        // если редактировали существующую линию
        Object.assign(existingLine, this.editablePolyline);
      }
      else {
        // если новая линия
        this.polylines.push(this.editablePolyline);
      }
    }
    this.turnOffLineDrawing();
  }

  onMouseOverCircle() {
    this.isHoverable = false;
  }

  onMouseOutCircle() {
    this.isHoverable = true;
  }

  /* СОБЫТИЯ ЛИНИИ */

  onClickPolyline(evt) {
    //console.log("click polyline");
    const polyline = evt.target;
    const attr = polyline.attributes;
    const points = attr.getNamedItem("points");
    const strPoints = points.value;

    const currentPolyline = this.polylines.find((item) => {
      const strCoords = item.coords.join(',');
      if (strPoints === strCoords) return item;
    });

    this.editablePolyline = {
      id: currentPolyline.id,
      coords: [...currentPolyline.coords],
      color: currentPolyline.color
    }

    this.turnOnLineDrawing();
  }
  
  onMouseOverPolyline() {
    this.isHoverable = false;
  }

  onMouseOutPolyline() {
    this.isHoverable = true;
  }

  /* ПРОЧИЕ ФУНКЦИИ */

  private convertHexToRgb(hex: string) {
    const regexp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const result = regexp ? {
      r: parseInt(regexp[1], 16),
      g: parseInt(regexp[2], 16),
      b: parseInt(regexp[3], 16)
    } : null;

    return result
  }

  private convertRgbToStrRgba(hex: string):string {
    /* Так как для svg не удаётся пока что задать стили, 
    то в html-шаблонe сделаем polyline прозрачной с помощью rgba-цвета  */

    const rgb = this.convertHexToRgb(hex);
    const result = rgb ? "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + this.transparencyColorPolyline + ")" : hex;

    return result
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

  private turnOffLineDrawing() {
    this.isEditLine = false;
    this.editablePolyline = {id: "-", coords: [], color: ""};
    this.nFixedPolylinePoints = 0;

    this.editablePolylineChange.emit(this.editablePolyline);
    this.isEditLineToogle.emit(this.isEditLine);

    setTimeout(() => {
      /* Переместим все polyline до circle, чтобы на холсте circle ничего не перекрывало */
      const container = document.getElementById("svg-element");
      if (container) {
        let svg = container.getElementsByTagName("svg");
        let svgContainer = svg[0];
        let firstCircle = svgContainer.querySelector("circle");
        let polylines = svgContainer.querySelectorAll("polyline");

        polylines.forEach((item) => {
          svgContainer.insertBefore(item, firstCircle);
        });
      }
    }, 100);
    
  }
  private turnOnLineDrawing() {
    this.isEditLine = true;
    this.nFixedPolylinePoints = this.editablePolyline.coords.length;

    this.editablePolylineChange.emit(this.editablePolyline);
    this.isEditLineToogle.emit(this.isEditLine);
  }
}
