import { Injectable } from '@angular/core';

import { POINTS } from './mock-data/mock-points';
import { POLYGONS } from './mock-data/mock-polygons';
import { Polygon } from './polygon';
import { Point } from './point';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataPoints = POINTS;
  private dataPoligons = POLYGONS;

  constructor() { }

  getDataPoints(): Point[] {
    return this.dataPoints;
  }

  getDataPolygons(): Polygon[] {
    return this.dataPoligons;
  }
}
