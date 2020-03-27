import { Injectable } from '@angular/core';

import { POINTS_YACHT, POINTS_GRAPE } from './mock-data/mock-points';
import { POLYGONS_YACHT, POLYGONS_GRAPE } from './mock-data/mock-polygons';
import { Observable, of } from 'rxjs';
import { Model } from './model';
import { Models } from './models.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDataModel(modelCode: number): Observable<Model> {
    const modelName = Models[modelCode];
    let dataPoints;
    let dataPolygons;
    let dataPolylines;

    /* Вместо switch в реальности нужно modelName отправлять в запросе на апишку по получению данных модели */
    switch(modelCode) {
      case 0:
        dataPoints = POINTS_YACHT;
        dataPolygons = POLYGONS_YACHT;
        dataPolylines = [];
        break;
      case 1:
        dataPoints = POINTS_GRAPE;
        dataPolygons = POLYGONS_GRAPE;
        dataPolylines = [];
        break;
    };
    const dataModel = new Model(modelName, dataPolygons, dataPoints, dataPolylines);
    
    return of(dataModel);
  }
}
