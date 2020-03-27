import { Component } from '@angular/core';
import { Polyline } from './polyline';
import { Models } from './models.enum';
import { DataService } from './data.service';
import { Point } from './point';
import { Polygon } from './polygon';

interface Model {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title: string = 'testDraw10';
  models: Model[] = [
    { value: Models.Yacht, viewValue: "Яхта" },
    { value: Models.Grape, viewValue: "Виноград" },
  ];

  selectedModelNumber: number = Models.Yacht;
  selectedModelPoints: Point[] = [];
  selectedModelPolygons: Polygon[] = [];
  selectedModelPolylines: Polyline[] = [];
  isEditPolyLine: boolean = false;

  // ссылка на редактируемый элемент массива polylines
  selectedPolyline: Polyline = Polyline.clear();

  // копия редактируемого элемента массива, для отмены изменений
  selectedPolylineCopyBefore: Polyline = Polyline.clear();

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getDataModel(this.selectedModelNumber)
    .subscribe(dataModel => {
      this.selectedModelPolygons = dataModel.polygons;
      this.selectedModelPoints = dataModel.points;
      this.selectedModelPolylines = dataModel.polylines;
    });
  }

  onChangeModel() {
    this._dataService.getDataModel(this.selectedModelNumber)
    .subscribe(dataModel => {
      this.selectedModelPolygons = dataModel.polygons;
      this.selectedModelPoints = dataModel.points;
      this.selectedModelPolylines = dataModel.polylines;
    });
  }
}
