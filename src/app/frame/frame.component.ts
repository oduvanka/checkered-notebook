import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgxRulerComponent, NgxRulerService } from 'ngx-ruler';
import { Frame } from '../frame';

@Component({
  selector: 'app-rulers',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  @ViewChild('rulerHT', { static: false }) rulerH1: NgxRulerComponent;
  @ViewChild('rulerVR', { static: false }) rulerV1: NgxRulerComponent;
  @ViewChild('rulerHB', { static: false }) rulerH2: NgxRulerComponent;
  @ViewChild('rulerVL', { static: false }) rulerV2: NgxRulerComponent;

  @Input() widht: number;
  @Input() height: number;
  @Input() borders: Frame;

  public containerStyle: Object;

  public htStyle: Object;
  public vlStyle: Object;
  public vrStyle: Object;
  public hbStyle: Object;

  public unit: number;
  public bgColor: string;
  public markColor: string;
  public labelColor: string;

  constructor() { }

  ngOnInit() {
    const pxWidht = this.widht + "px";
    const pxHeight = this.height + "px";

    this.containerStyle = {
      'width': pxWidht,
      'height': pxHeight,
      'background-color': "#FFFFFF",
      'position': 'relative',
    }

    const lenghtRulerH = this.widht - this.borders.vl - this.borders.vr + "px";
    const lenghtRulerV = this.height - this.borders.ht - this.borders.hb + "px";

    const pxWidthHT = this.borders.ht + "px";
    const pxWidthVL = this.borders.vl + "px";
    const pxWidthHB = this.borders.hb + "px";
    const pxWidthVR = this.borders.vr + "px";

    const positionAbsolute = "absolute";
    this.htStyle = {
      'width': lenghtRulerH,
      'height': pxWidthHT,
      'position': positionAbsolute,
      'top': 0,
      'left': (this.borders.vl) ? pxWidthVL : 0,
    };
    this.vlStyle = {
      'width': pxWidthVL,
      'height': lenghtRulerV,
      'position': positionAbsolute,
      'top': (this.borders.ht) ? pxWidthHT : 0,
      'left': 0,
    };
    this.vrStyle = {
      'width': pxWidthVR,
      'height': lenghtRulerV,
      'position': positionAbsolute,
      'top': (this.borders.ht) ? pxWidthHT : 0,
      'right': 0
    };
    this.hbStyle = {
      'width': lenghtRulerH,
      'height': pxWidthHB,
      'position': positionAbsolute,
      'bottom': 0,
      'left': (this.borders.vl) ? pxWidthVL : 0,
    };

    this.unit = 40;
    this.bgColor = "#FFFFFF";
    this.markColor = "#333333";
    this.labelColor = "#333333";
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize); 
    this.onResize();
  }

  onResize = () => {
    if (this.borders.ht) this.rulerH1.resize();
    if (this.borders.hb) this.rulerH2.resize();
    if (this.borders.vr) this.rulerV1.resize();
    if (this.borders.vl) this.rulerV2.resize();
  }

}
