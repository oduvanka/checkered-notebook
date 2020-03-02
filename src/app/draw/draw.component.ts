import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Polyline } from '../polyline';
import { Frame } from '../frame';

/* TODO: нужно понимать, какие именно линейки и в каком количестве у меня есть */

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  private widthContent: number;
  private heightContent: number;

  // внешний контейнер
  public pxWidthContent: string;
  public pxHeightContent: string;
  public styleContent: Object;

  // линейки
  public rulers: Frame;
  public widthFrame: number;
  public heightFrame: number;
  public styleFrame: Object;

  // сетка
  public widthGrid: number;
  public heightGrid: number;
  public styleGrid: Object;

  // холст
  public heightCanvas: number;
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

  @Input() editablePolyline: Polyline; // ссылка на редактируемый элемент массива polylines
  @Input() editablePolylineCopyBefore: Polyline; // копия редактируемого элемента массива, для отмены изменений
  @Output() editablePolylineChange = new EventEmitter<Polyline>();
  @Output() editablePolylineCopyBeforeChange = new EventEmitter<Polyline>();

  private isNewLine: boolean;
  @Input() isEditLine: boolean;
  @Output() isEditLineToogle = new EventEmitter<boolean>();

  private defaultColorPolyline: string;
  private transparencyColorPolyline: number;
  private nFixedPolylinePoints: number; // кол-во зафиксированных точек в редактируемой полилинии

  constructor( public _dataService: DataService ) { }

  ngOnInit() {
    this.widthContent = 650;
    this.heightContent = 350;
    this.rulers = new Frame(30, 0, 30, 0);

    this.pxWidthContent = this.widthContent - this.rulers.vl - this.rulers.vr + "px";
    this.pxHeightContent = this.heightContent - this.rulers.ht - this.rulers.hb + "px";
    const pxPaddings = this.rulers.ht + "px " + this.rulers.vr + "px " + this.rulers.hb + "px " + this.rulers.vl + "px";
    this.styleContent = {
      'position': "relative",
      'width': this.pxWidthContent,
      'height': this.pxHeightContent,
      'margin-right': "20px",
      'padding': pxPaddings,
    }

    this.widthFrame = this.widthContent;
    this.heightFrame = this.heightContent;
    this.styleFrame = {
      'position': "absolute",
      'top': 0,
      'left': 0,
    }

    this.widthGrid = this.widthContent - this.rulers.vl - this.rulers.vr;
    this.heightGrid = this.heightContent - this.rulers.ht - this.rulers.hb;
    const pxTopGrid = this.rulers.ht + "px";
    const pxLeftGrid = this.rulers.vl + "px";
    this.styleGrid = {
      'position': "absolute",
      'top': pxTopGrid,
      'left': pxLeftGrid,
    }

    this.heightCanvas = this.heightContent - this.rulers.ht - this.rulers.hb;
    this.isShowGrid = false;
    // isHoverable
    // false - нет события клика по холсту, 
    // true - нет события клика любого эл-та, т.к. sizePoint (даже = 0) как бы перекрывает эл-т
    this.isHoverable = true;
    this.sizePoint = 0;  
    
    this.rCircle = 18;
    this.sizeText = 8;
    this.colorText = "grey";

    this.borderSize = 3;
    
    this._dataService.getDataPoints()
      .subscribe(dataPoints => this.points = this.createArrOfPointsVsLabels(dataPoints));
    this._dataService.getDataPolygons()
      .subscribe(dataPolygons => this.polygons = dataPolygons);

    this.defaultColorPolyline = "#000000";
    this.transparencyColorPolyline = 0.5;
    this.turnOffLineDrawing();
  }

  ngOnChanges() { }

  /* СОБЫТИЯ ХОЛСТА */

  onClick(evt) {
    if (!this.isEditLine) return;
    this.breakPolyline();
  }

  onDoubleClick(evt) {
    if (!this.isEditLine) return;
    this.breakPolyline();
  }

  onMouseMove(evt) {
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

  onMouseOut(evt) {
    if (!this.isEditLine) return;
    this.breakPolyline();
  }

  /* СОБЫТИЯ ТОЧКИ */

  onClickCircle(evt) {
    const currentCircle = evt.target;
    const attrСurrentCircle = currentCircle.attributes;
    const cx = attrСurrentCircle.getNamedItem('cx').value;
    const cy = attrСurrentCircle.getNamedItem('cy').value;

    if (!this.isEditLine) {
      // создаём новую polyline
      this.isNewLine = true;
      const newId = this.polylines.length.toString();
      const newLine = {
        id: newId, 
        coords: [[cx, cy]], 
        color: this.defaultColorPolyline
      };
      this.polylines.push(newLine);
      const existingLine = this.polylines.find((item) => item.id === newId);
      this.turnOnLineDrawing(existingLine);

      // Переместим circle в конец дочерних элементов, чтобы на холсте он оказался выше всех
      let svgContainer = this.getSvgContainer();
      if (svgContainer) {
        setTimeout(() => { svgContainer.appendChild(currentCircle) }, 50)
      }
    }
    else {
      // продолжаем начатую polyline
      let currentCoords = this.editablePolyline.coords;

      const indexPoint = this.getpolylinePointIndex(currentCoords, cx, cy);
      // если точка с таким индексом есть - не поставим её
      const isRepeatingPoint = (indexPoint > -1) ? true : false;
      if (isRepeatingPoint) return;

      // удаляем временную точку, которая добавлялась при mouseMove
      currentCoords.pop();
      currentCoords.push([cx, cy]);
      this.nFixedPolylinePoints++;
    }
  }

  onDoubleClickCircle(evt) {
    if (!this.isEditLine) return;
    if (this.editablePolyline.coords.length < 2) return;

    const currentCircle = evt.target;
    const attrСurrentCircle = currentCircle.attributes;
    const cx = attrСurrentCircle.getNamedItem('cx').value;
    const cy = attrСurrentCircle.getNamedItem('cy').value;
    let currentCoords = this.editablePolyline.coords;

    const indexPoint = this.getpolylinePointIndex(currentCoords, cx, cy);
    // если точка с таким индексом есть и она не первая - не поставим её
    const isInnerPoint = (indexPoint > 0 && indexPoint < currentCoords.length-1) ? true : false;
    if (isInnerPoint) return;

    // удаляем временную точку, которая добавлялась при mouseMove
    currentCoords.pop();
    currentCoords.push([cx, cy]);
    this.nFixedPolylinePoints++;

    this.turnOffLineDrawing();
  }

  onMouseOverCircle(evt) {
    this.isHoverable = false;

    // Переместим circle в конец дочерних элементов, чтобы на холсте он оказался выше всех
    let svgContainer = this.getSvgContainer();
    let currentCircle = evt.target;
    if (svgContainer) svgContainer.appendChild(currentCircle);
  }

  onMouseOutCircle() {
    this.isHoverable = true;
  }

  /* СОБЫТИЯ ЛИНИИ */

  onClickPolyline(evt) {
    if (this.isEditLine) this.breakPolyline();

    const polyline = evt.target;
    const attr = polyline.attributes;
    const points = attr.getNamedItem("points");
    const strPoints = points.value;

    const currentLine = this.polylines.find((item) => strPoints === item.coords.join(','));

    this.editablePolylineCopyBefore = {
      id: currentLine.id,
      coords: [...currentLine.coords],
      color: currentLine.color
    }

    this.turnOnLineDrawing(currentLine);
  }
  
  onMouseOverPolyline() {
    this.isHoverable = false;
  }

  onMouseOutPolyline() {
    this.isHoverable = true;
  }

  /* ПРОЧИЕ ФУНКЦИИ */

  public getPolylineBorderSize(id: string, hex: string):number {
    // Если рисуется редактируемая линия - для неё вернётся более толстая граница
    const result = (this.isEditLine && id === this.editablePolyline.id) ? this.borderSize + 2 : this.borderSize;

    return result;
  }

  public getPolylineBorderColor(id: string, hex: string):string {
    // Если рисуется редактируемая линия - для неё вернётся цвет без прозрачности
    const result = (this.isEditLine && id === this.editablePolyline.id) ? hex : this.convertRgbToStrRgba(hex);

    return result;
  }

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
    // Так как для svg не удаётся пока что задать стили, 
    // то в html-шаблонe сделаем polyline прозрачной с помощью rgba-цвета
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

  private getSvgContainer() {
    // Возвращает контейнер, в котором находятся нарисованные на холсте фигуры
    let svgContainer;
    const container = document.getElementById("svg-element");
    if (container) {
      let svg = container.getElementsByTagName("svg");
      svgContainer = svg[0];
    }

    return svgContainer;
  }

  private getpolylinePointIndex(coords: number[][], x: number, y: number) {
    // Проверяет вхождение точки в заданный массив точек
    const index = coords.findIndex((item) => (item[0] === x && item[1] === y));

    return index;
  }

  private breakPolyline() {
    // Прерывает рисование линии и возвращает её к состоянию до начала редактирования, 
    // если был клик по холсту или если курсор ушёл с холста
    if (this.isNewLine) {
      this.polylines.pop();
    }
    else {
      Object.assign(this.editablePolyline, this.editablePolylineCopyBefore);
    }
    
    this.turnOffLineDrawing();
  }

  private turnOffLineDrawing() {
    this.isNewLine = false;
    this.isEditLine = false;
    this.editablePolyline = {id: "-", coords: [], color: ""};
    this.editablePolylineCopyBefore = {id: "-", coords: [], color: ""};
    this.nFixedPolylinePoints = 0;

    this.editablePolylineChange.emit(this.editablePolyline);
    this.editablePolylineCopyBeforeChange.emit(this.editablePolylineCopyBefore);
    this.isEditLineToogle.emit(this.isEditLine);
  }
  private turnOnLineDrawing(currentLine: Polyline) {
    this.isEditLine = true;
    this.editablePolyline = currentLine;
    this.nFixedPolylinePoints = currentLine.coords.length;

    this.editablePolylineChange.emit(this.editablePolyline);
    this.editablePolylineCopyBeforeChange.emit(this.editablePolylineCopyBefore);
    this.isEditLineToogle.emit(this.isEditLine);
  }
}
