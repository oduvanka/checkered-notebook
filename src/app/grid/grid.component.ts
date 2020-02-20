import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() widthGrid: number;
  @Input() heightGrid: number;

  public pxWidth: string;
  public pxHeight: string;

  constructor() { }

  ngOnInit() {
    this.pxWidth = this.widthGrid + "px";
    this.pxHeight = this.heightGrid + "px";
  }

}
