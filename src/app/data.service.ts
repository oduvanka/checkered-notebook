import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataPoints = [
    { id: 0, coords: { x: 0, y: 0 }, color: "green" },
    
    { id: 1, coords: { x: 180, y: 20 }, color: "red" },
    { id: 2, coords: { x: 140, y: 40 }, color: "red" },
    { id: 3, coords: { x: 180, y: 60 }, color: "red" },

    { id: 5, coords: { x: 180, y: 80 }, color: "lightskyblue"},
    { id: 6, coords: { x: 100, y: 120 }, color: "lightskyblue"},
    { id: 7, coords: { x: 140, y: 140 }, color: "lightskyblue"},
    { id: 8, coords: { x: 100, y: 160 }, color: "lightskyblue"},
    { id: 9, coords: { x: 180, y: 200 }, color: "lightskyblue"},
    
    { id: 10, coords: { x: 180, y: 220 }, color: "brown"},
    { id: 11, coords: { x: 80, y: 200 }, color: "brown"},
    { id: 12, coords: { x: 100, y: 260 }, color: "brown"},
    { id: 13, coords: { x: 260, y: 260 }, color: "brown"},
    { id: 14, coords: { x: 280, y: 200 }, color: "brown"},
  ];

  private dataPoligons = [
    { id: 0, 
      coords: [[0,20], [10,30], [20,20], [10,10]], 
      color: "lightgreen" },
    { id: 1, 
      coords: [[180,20], [140,40], [180,60], [180,20]], 
      color: "orangered" },
    { id: 2, 
      coords: [[180,80], [100,120], [100,160], [180, 200], [140,140], [180,80]], 
      color: "lightblue" },
    { id: 3, 
      coords: [[180,220], [80,200], [100,260], [260,260], [280,200], [180,220]], 
      color: "saddlebrown" },
  ];

  constructor() { }

  getDataPoints() {
    return this.dataPoints;
  }

  getDataPolygons() {
    return this.dataPoligons;
  }
}
