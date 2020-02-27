import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgxRulerComponent, NgxRulerService } from 'ngx-ruler';

@Component({
  selector: 'app-rulers',
  templateUrl: './rulers.component.html',
  styleUrls: ['./rulers.component.css']
})
export class RulersComponent implements OnInit {

  @ViewChild('rulerHT', { static: false }) rulerH1: NgxRulerComponent;
  @ViewChild('rulerVR', { static: false }) rulerV1: NgxRulerComponent;
  @ViewChild('rulerHB', { static: false }) rulerH2: NgxRulerComponent;
  @ViewChild('rulerVL', { static: false }) rulerV2: NgxRulerComponent;

  @Input() widht: number;
  @Input() height: number;
  @Input() equipment: Object;

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

    const lenghtRulerH = this.widht - this.equipment['vl'] - this.equipment['vr'] + "px";
    const lenghtRulerV = this.height - this.equipment['ht'] - this.equipment['hb'] + "px";

    const pxWidthHT = this.equipment['ht'] + "px";
    const pxWidthVL = this.equipment['vl'] + "px";
    const pxWidthHB = this.equipment['hb'] + "px";
    const pxWidthVR = this.equipment['vr'] + "px";

    this.htStyle = {
      'width': lenghtRulerH,
      'height': pxWidthHT,
      'position': 'absolute',
      'top': 0,
      'left': (this.equipment['vl']) ? pxWidthVL : 0,
    };
    this.vlStyle = {
      'width': pxWidthVL,
      'height': lenghtRulerV,
      'position': 'absolute',
      'top': (this.equipment['ht']) ? pxWidthHT : 0,
      'left': 0,
    };
    this.vrStyle = {
      'width': pxWidthVR,
      'height': lenghtRulerV,
      'position': 'absolute',
      'top': (this.equipment['ht']) ? pxWidthHT : 0,
      'right': 0
    };
    this.hbStyle = {
      'width': lenghtRulerH,
      'height': pxWidthHB,
      'position': 'absolute',
      'bottom': 0,
      'left': (this.equipment['vl']) ? pxWidthVL : 0,
    };

    this.unit = 50;
    this.bgColor = "#FFFFFF";
    this.markColor = "#333333";
    this.labelColor = "#333333";
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize); 
    this.onResize();
  }

  onResize = () => {
    this.rulerH1.resize();
    this.rulerH2.resize();
    this.rulerV1.resize();
    this.rulerV2.resize();
  }

}
