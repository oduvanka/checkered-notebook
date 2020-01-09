import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [
    { id: 0, coords: { x: 0, y: 0 }, color: "green" },
    
    { id: 1, coords: { x: 180, y: 0 }, color: "red" },
    { id: 2, coords: { x: 140, y: 20 }, color: "red" },
    { id: 3, coords: { x: 180, y: 40 }, color: "red" },

    { id: 5, coords: { x: 180, y: 80 }, color: "lightblue"},
    { id: 6, coords: { x: 100, y: 120 }, color: "lightblue"},
    { id: 7, coords: { x: 140, y: 140 }, color: "lightblue"},
    { id: 8, coords: { x: 100, y: 160 }, color: "lightblue"},
    { id: 9, coords: { x: 180, y: 200 }, color: "lightblue"},
    
    { id: 10, coords: { x: 180, y: 220 }, color: "brown"},
    { id: 11, coords: { x: 80, y: 200 }, color: "brown"},
    { id: 12, coords: { x: 100, y: 260 }, color: "brown"},
    { id: 13, coords: { x: 260, y: 260 }, color: "brown"},
    { id: 14, coords: { x: 280, y: 200 }, color: "brown"},
  ];

  constructor() { }

  getData() {
    return this.data;
  }
}
