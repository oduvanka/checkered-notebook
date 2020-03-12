export class Polygon {
  id: string;
  coords: [number, number][];
  color: string;

  constructor(id: string, coords: [number, number][], color: string) {
    this.id = id;
    this.coords = coords;
    this.color = color;
  }
}
