import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";

/**
 * パーティクルのクラス
 */

export default class SudaParticle {
  public view:SVGUseElement;
  private linePath:SVGPathElement;

  private pathTotalLength:number;

  private _x:number; // 位置X

  get x():number {
    return this._x;
  }

  set x(value:number) {
    this._x = value;

    if (this.view) {
      this.view.setAttribute("x", String(this._x - 12));
    }
  }

  public time:number = 0;

  private _y:number;

  get y():number {
    return this._y;
  }

  set y(value:number) {
    this._y = value;
    if (this.view) {
      this.view.setAttribute("y", String(this._y - 12));
    }
  }

  private _rotate:number;

  get rotate():number {
    return this._rotate;
  }

  set rotate(value:number) {
    this._rotate = value;
    if (this.view) {
      this.view.setAttribute("transform", `rotate(${value})`);
    }
  }

  public constructor(linkId:string, linePath:SVGPathElement, startTime:number = 0) {
    this.view = document.createElementNS(SVGNameSpace.SVG, "use");
    this.view.setAttributeNS(SVGNameSpace.LINK, "href", linkId);
    // this.view.setAttribute("fill", "#005fea");
    this.linePath = linePath;
    this.pathTotalLength = linePath.getTotalLength();
    this.time = startTime;
  }

  public update():void {
    this.time += 2;

    if (this.time >= this.pathTotalLength) {
      this.time = 0;
    }

    const targetPoint = this.linePath.getPointAtLength(this.time);

    let prevTime = this.time - 1;
    if (prevTime < 0) {
      prevTime = this.pathTotalLength - 1;
    }

    const prevPoint = this.linePath.getPointAtLength(prevTime);

    const vx = prevPoint.x - targetPoint.x;
    const vy = prevPoint.y - targetPoint.y;
    const angle = Math.atan2( vy,vx ) * ( 180 / Math.PI ) - 180;

    //const angle = this.time * this.pathTotalLength / 360;


    // this.x = targetPoint.x;
    // this.y = targetPoint.y;

    this.view.setAttribute("transform", `translate(${targetPoint.x}, ${targetPoint.y}) rotate(${angle})`);
    //this.view.setAttribute("transform", `rotate(${angle})`);
    // this.rotate = angle;
  }
}