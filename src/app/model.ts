import { Polygon } from './polygon';
import { Point } from './point';
import { Polyline } from './polyline';

export class Model {
  name: string;
  polygons: Polygon[];
  points: Point[];
  polylines: Polyline[];

  constructor(name: string, polygons: Polygon[], points: Point[], polylines: Polyline[]) {
    this.name = name;
    this.polygons = polygons;
    this.points = points;
    this.polylines = polylines;
  }
}
