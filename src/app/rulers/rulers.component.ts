import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxRulerComponent, NgxRulerService } from 'ngx-ruler';

@Component({
  selector: 'app-rulers',
  templateUrl: './rulers.component.html',
  styleUrls: ['./rulers.component.css']
})
export class RulersComponent implements OnInit {

  @ViewChild('rulerH', { static: false }) ruler1: NgxRulerComponent;
  @ViewChild('rulerV', { static: false }) ruler2: NgxRulerComponent;
  public unit = 20;
  /*private rulerWidth = "30px";
  private rulerLength = "calc(100% - " + this.rulerWidth + ")";
  public rulerStyleH = { height: this.rulerWidth, width: this.rulerLength, marginLeft: this.rulerWidth };
  public rulerStyleV = { height: this.rulerLength, width: this.rulerWidth };*/

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize); 
    this.onResize();
  }

  onResize = () => {
    this.ruler1.resize();
    this.ruler2.resize();
  }

}
