import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Polyline } from '../polyline';
import { Frame } from '../frame';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Point } from '../point';
import { Polygon } from '../polygon';


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
  public zoom: number;

  // сетка
  public widthGrid: number;
  public heightGrid: number;
  public styleGrid: Object;

  // холст
  private widthCanvas: number;
  public heightCanvas: number;
  public isShowGrid: boolean;
  public isHoverable: boolean;
  public sizePoint: number;
  public viewBoxCanvas: [number, number, number, number];
  // точка с меткой
  public rCircle: number;
  public styleCircle: string[];
  public sizeText: number;
  public colorText: string;
  // ломаная и многоугольник
  public borderSize: number;
  public stylePolygone: string[];
  public stylePolyline: string[];
  public styleEditablePolyline: string[];

  // имеющиеся фигуры по исходным данным модели
  @Input() points: Point[];
  public pointsWithLabels: Object[];
  @Input() polygons: Polygon[];

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
  private nFixedPolylinePoints: number; // кол-во зафиксированных точек в редактируемой полилинии

  private textError: string;

  constructor( private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.widthContent = 650;
    this.heightContent = 350;
    this.rulers = new Frame(30, 30, 30, 30);

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

    this.widthCanvas = this.widthContent - this.rulers.vl - this.rulers.vr;
    this.heightCanvas = this.heightContent - this.rulers.ht - this.rulers.hb;
    this.isShowGrid = true;
    // isHoverable
    // false - нет события клика по холсту, 
    // true - нет события клика любого эл-та, т.к. sizePoint (даже = 0) как бы перекрывает эл-т
    this.isHoverable = true;
    this.sizePoint = 0;
    
    this.rCircle = 18;
    this.styleCircle = ["point"];
    this.sizeText = 8;
    this.colorText = "grey";

    this.borderSize = 3;
    this.stylePolygone = ["polygone"];
    this.stylePolyline = ["polyline"];
    this.styleEditablePolyline = ["polyline", "editable-polyline"];

    this.pointsWithLabels = this.createArrOfPointsVsLabels(this.points);
    this.setZoomRulers(this.widthCanvas, this.heightCanvas);
    this.setViewBoxCanvas(this.widthCanvas, this.heightCanvas, this.zoom);

    this.defaultColorPolyline = "#000000";
    this.turnOffLineDrawing();

    this.textError = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    const isChangeModel = "points" in changes;
    if (isChangeModel) {
      /* Перерисуем точки с метками после смены модели */
      this.pointsWithLabels = this.createArrOfPointsVsLabels(this.points);
      this.setZoomRulers(this.widthCanvas, this.heightCanvas);
      this.setViewBoxCanvas(this.widthCanvas, this.heightCanvas, this.zoom);
    }
  }

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
    const cxEl = (evt.x < lastCoords[0]) ? evt.x+2 : evt.x-2;
    const cyEl = (evt.y < lastCoords[1]) ? evt.y+2 : evt.y-2;

    // добавим новую временную точку
    currentCoords.push([cxEl, cyEl]);
  }

  onMouseOut(evt) {
    if (!this.isEditLine) return;
    this.breakPolyline();
  }

  /* СОБЫТИЯ ТОЧКИ */

  onClickCircle(evt) {
    // чтобы отследить двойной клик, перед которым будет дважды событие одинарного
    if (evt.detail > 1) return;

    const currentCircle = evt.target;
    const attrСurrentCircle = currentCircle.attributes;
    const cx = attrСurrentCircle.getNamedItem('cx').value;
    const cy = attrСurrentCircle.getNamedItem('cy').value;

    if (!this.isEditLine) {
      // создаём новую polyline
      this.isNewLine = true;
      const newId = this.polylines.length.toString();
      const newLine = new Polyline(newId, [[cx, cy]], this.defaultColorPolyline);
      this.polylines.push(newLine);
      const existingLine = this.polylines.find((item) => item.id === newId);
      this.turnOnLineDrawing(existingLine);

      // Переместим первый circle в конец дочерних элементов, чтобы на холсте он оказался выше всех
      let svgContainer = this.getSvgContainer();
      if (svgContainer) {
        setTimeout(() => { svgContainer.appendChild(currentCircle) }, 50)
      }
    }
    else {
      // продолжаем начатую polyline
      let currentCoords = this.editablePolyline.coords;

      const indexPoint = this.getPolylinePointIndex(currentCoords, cx, cy);
      // если точка с таким индексом есть - не поставим её
      const isRepeatingPoint = (indexPoint > -1) ? true : false;
      if (isRepeatingPoint) {
        this.textError = "Нельзя выбрать точку — линия уже проходит через неё";
        setTimeout(() => { this.reportError() }, 500);
        return
      };

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

    const indexPoint = this.getPolylinePointIndex(currentCoords, cx, cy);
    // если точка с таким индексом есть и она не первая - не поставим её
    const isInnerPoint = (indexPoint > 0 && indexPoint < currentCoords.length-1) ? true : false;
    if (isInnerPoint) {
      this.textError = "Нельзя закончить линию — нужна свободная точка или начало линии";
      return
    }

    const duplicatePolyline = this.findDuplicatePolyline(this.editablePolyline);
    const isDuplicatePolyline = (duplicatePolyline) ? true : false;
    if (isDuplicatePolyline) {
      this.textError = "Нельзя закончить линию — она совпадает с другой линией";
      this.reportError();
      return
    }

    this.textError = "";

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
    const polyline = evt.target;
    const attr = polyline.attributes;
    const points = attr.getNamedItem("points");
    const strPoints = points.value;

    if (this.isEditLine) {
      if (this.editablePolyline.coords.join(',') === strPoints) return;
      this.breakPolyline();
    }

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

  public setPolylineStyle(id: string): string[] {
    // Если рисуется редактируемая линия - для неё нужны доп.стили,
    // потому что пока не смогла решить это псевдоселекторами в css
    const result = (this.isEditLine && id === this.editablePolyline.id) ? this.styleEditablePolyline : this.stylePolyline;
    
    return result;
  }

  private createArrOfPointsVsLabels(data: Object[]): Object[] {
    let newData = [];
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

  private findMaxPoint(arrPoints: Point[]): [number, number] {
    /* Ищет самую дальнюю (по x) и самую нижнюю (по y) точки в модели */

    let xCoordMax = 0;
    let yCoordMax = 0;

    arrPoints.map((item) => {
      const xCoord = item.coords.x;
      const yCoord = item.coords.y;
      if (xCoord > xCoordMax) xCoordMax = xCoord;
      if (yCoord > yCoordMax) yCoordMax = yCoord;
    });

    return [xCoordMax, yCoordMax];
  }

  private getRealModelSize(arrPoints: Point[], padding: number): [number, number] {
    /* Вычисляет, какая в идеале нужна область просмотра, чтобы модель с отступами поместилась */
    const maxCoords = this.findMaxPoint(arrPoints);
    const realWidth = maxCoords[0] + 2*padding;
    const realHeight = maxCoords[1] + 2*padding;

    return [realWidth, realHeight];
  }

  private setZoomRulers(maxWidth: number, maxHeight: number) {
    /* Вычисляет масштаб для линейки, который соответствует отмасштабированной модели */
    this.zoom = 1;
    const realModelSize = this.getRealModelSize(this.points, this.rCircle);
    const realWidth = realModelSize[0];
    const realHeight = realModelSize[1];

    // вычислим, насколько желаемая область отличается от имеющейся
    const deltaX = maxWidth - realWidth;
    const deltaY = maxHeight - realHeight;

    /* У нас могут быть варианты:
    1) изображение намного меньше области по x и y - ищем какой размер больший - увеличить масштаб чтобы влез больший размер
    2) изображение занимает всю x и часть y- ничего не делать
    3) изображение занимает часть x и всю y- ничего не делать
    4) изображение не влезает только по x - уменьшить масштаб
    5) изображение не влезает только по y - уменьшить масштаб
    6) изображение не влезает по x и y - ищем какой размер больший - уменьшить масштаб чтобы влез больший размер */

    if ((deltaX  > 0) || (deltaY > 0)) {
      // если модель такая, что на холсте есть свободное место
      this.zoom = (deltaX > deltaY) ? ( maxWidth/realWidth ) : ( maxHeight/realHeight );
    }
    else if ((deltaX < 0) || (deltaY < 0)) {
      // если модель такая, что хотя бы одной стороной не влезает на холст
      this.zoom = (deltaX < deltaY) ? ( maxWidth/realWidth ) : ( maxHeight/realHeight );
    }
  }

  private setViewBoxCanvas(width, height, zoom) {
    this.viewBoxCanvas = [0, 0, width/zoom, height/zoom];
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

  private getPolylinePointIndex(coords: number[][], x: number, y: number) {
    // Проверяет вхождение точки в заданный массив точек
    const index = coords.findIndex((item) => (item[0] === x && item[1] === y));

    return index;
  }

  private findDuplicatePolyline(myPolyline: Polyline) {
    // Проверяет, есть ли такая же линия
    const coords = myPolyline.coords;
    const coordsReverse = [...myPolyline.coords].reverse();
    const duplicatePolyline = this.polylines.find((item) => {
      const strItemCoords = item.coords.join(',');
      if (((coords.join(',') === strItemCoords) || (coordsReverse.join(',') === strItemCoords)) && (myPolyline.id !== item.id)) return true
      else return false;
    });
    return duplicatePolyline;
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

  private reportError() {
    if (this.textError) this._snackBar.open(this.textError, '', {duration: 3000});
    this.textError = "";
  }

  private turnOffLineDrawing() {
    this.isNewLine = false;
    this.isEditLine = false;
    this.editablePolyline = Polyline.clear();
    this.editablePolylineCopyBefore = Polyline.clear();
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
