import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";

/**
 * パーティクルのクラス
 */

export default class Particle {
  private _x:number; // 位置X

  get x():number {
    return this._x;
  }

  set x(value:number) {
    this._x = value;

    if (this.view) {
      this.view.setAttribute("x", String(this._x));
    }

  }

  private _y:number; // 位置Y

  get y():number {
    return this._y;
  }

  set y(value:number) {
    this._y = value;
    if (this.view) {
      this.view.setAttribute("y", String(this._y));
    }
  }

  public view:SVGUseElement;
  private _life:number;   // パーティクルの寿命
  private _count:number;  // パーティクルの年齢。時間経過とともに加算されていく。

  public vx:number; // 速度X
  public vy:number; // 速度Y
  public vr:number; // 回転
  public isDead:boolean;  // パーティクルが寿命を迎えたかどうか。

  public constructor() {
    this.view = document.createElementNS(SVGNameSpace.SVG, "use");
    this.view.setAttributeNS(SVGNameSpace.LINK, "href", "#myCircle");
  }

  /*
   * パーティクルの初期化
   * @param parentVX, parentVY :親コンテナの速度。パーティクルの速度に影響を与える。
   * */
  public init(emitX:number, emitY:number, parentVX:number, parentVY:number):void {
    this.x = emitX;
    this.y = emitY;
    this._life = 200 + Math.random() * 30;
    this._count = 0;
    this.vx = parentVX + (Math.random() - 0.5) * 10;
    this.vy = parentVY - 8 - Math.random() * 10;
    this.vr = (Math.random() - 0.5) * 5;

    this.isDead = false;
    // this.rotation = 50 * Math.PI * (Math.random() - 0.5);
  }

  public setPosition(positionX:number, positionY:number):void {
    if (!this.view) {
      return;
    }
    this.view.setAttribute("_y", String(positionY));

  }

  /*
   * パーティクルの時間経過処理。
   * _countがパーティクルの年齢。
   * _lifeを超えたら死亡する。
   *
   * */
  update():void {
    this._count++;
    if (this._count <= this._life) {
      this.x += this.vx;
      this.vy += 0.6;
      this.y += this.vy;
      // this.rotation += this.vr;

      // 死にそうになったら点滅を開始
      if (this._count >= this._life / 2) {
        // this.alpha = 0.6 + Math.random() * 0.4;
        // this.alpha = (1 - this._count / this._life);
      }

    }
    else {
      // 寿命が来たらフラグを立てる
      this.isDead = true;
    }
  }
}