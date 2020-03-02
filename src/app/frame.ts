export class Frame {
  ht: number; // горизонтальная сверху
  hb: number; // горизонтальная снизу
  vl: number; // вертикальная слева
  vr: number; // вертикальная справа

  constructor(horisontalTop: number, horisontalBottom: number, verticalLeft: number, verticalRight: number) {
    this.ht = horisontalTop;
    this.hb = horisontalBottom;
    this.vl = verticalLeft;
    this.vr = verticalRight;
  }
}
