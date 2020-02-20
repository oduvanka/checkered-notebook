import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgxRulerComponent, NgxRulerService } from 'ngx-ruler';

@Component({
  selector: 'app-rulers',
  templateUrl: './rulers.component.html',
  styleUrls: ['./rulers.component.css']
})
export class RulersComponent implements OnInit {

  @ViewChild('rulerH', { static: false }) ruler1: NgxRulerComponent;
  @ViewChild('rulerV', { static: false }) ruler2: NgxRulerComponent;
  public unit: number;

  @Input() allWidht: number;
  @Input() allHeight: number;
  private rulerWidth: number;
  private srtAllWidht: string;
  private strAllHeight: string;

  public containerStyle: Object;

  constructor() { }

  ngOnInit() {
    this.unit = 100;
    this.rulerWidth = 30;
    this.srtAllWidht = this.allWidht + "px";
    this.strAllHeight = this.allHeight + "px";

    this.containerStyle = {
      'width': this.srtAllWidht,
      'height': this.strAllHeight,
      'background-color': "#333333"
    }
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
