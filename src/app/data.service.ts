import { Injectable } from '@angular/core';

import { POINTS_YACHT } from './mock-data/mock-points';
import { POLYGONS_YACHT } from './mock-data/mock-polygons';
import { Polygon } from './polygon';
import { Point } from './point';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataPoints = POINTS_YACHT;
  private dataPoligons = POLYGONS_YACHT;

  constructor() { }

  getDataPoints(): Observable<Point[]> {
    return of(this.dataPoints);
  }

  getDataPolygons(): Observable<Polygon[]> {
    return of(this.dataPoligons);
  }
}
