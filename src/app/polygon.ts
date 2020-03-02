export class Polygon {
  id: string;
  coords: number[][];
  color: string;

  constructor(id: string, coords: number[][], color: string) {
    this.id = id;
    this.coords = coords;
    this.color = color;
  }
}
