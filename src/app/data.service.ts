import { Injectable } from '@angular/core';

import { POINTS } from './mock-data/mock-points';
import { POLYGONS } from './mock-data/mock-polygons';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataPoints = POINTS;
  private dataPoligons = POLYGONS;

  constructor() { }

  getDataPoints() {
    return this.dataPoints;
  }

  getDataPolygons() {
    return this.dataPoligons;
  }
}
