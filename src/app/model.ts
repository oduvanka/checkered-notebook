import { Polygon } from './polygon';
import { Point } from './point';

export class Model {
  name: string;
  polygons: Polygon[];
  points: Point[];

  constructor(name: string, polygons: Polygon[], points: Point[]) {
    this.name = name;
    this.polygons = polygons;
    this.points = points;
  }
}
