import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;

  public pxWidth: string;
  public pxHeight: string;

  constructor() { }

  ngOnInit() {
    this.pxWidth = this.width + "px";
    this.pxHeight = this.height + "px";
  }

}
