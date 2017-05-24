import {EventName} from "../eventname/EventName";
import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";
import ParticleEmitter from "./ParticleEmitter";
/**
 * メインのレイヤー
 */
export default class ParticleLayer {
  public view:SVGGElement;

  private _isMouseDown:boolean;   // マウスが押されているかどうか
  private _particleEmitter:ParticleEmitter;   // パーティクル発生装置のインスタンス

  private _tickCount:number = 0;
  private mouseX:number = 0;
  private mouseY:number = 0;

  public constructor() {
    this.view = document.createElementNS(SVGNameSpace.SVG, "g");

    this._particleEmitter = new ParticleEmitter();  // パーティクル発生装置のインスタンスを作成
    this.view.appendChild(this._particleEmitter.view);

    window.addEventListener(EventName.MOUSE_DOWN, (event) => this.mouseDownHandler(event));
    window.addEventListener(EventName.MOUSE_MOVE, (event) => this.mouseMoveHandler(event));
    window.addEventListener(EventName.MOUSE_UP, (event) => this.mouseUpHandler(event));

    this.tick();
  }

  private tick():void {
    this.update();
    requestAnimationFrame(() => this.tick())
  }

  /*
   * マウスを押した時の処理
   * */
  private mouseDownHandler(event):void {
    this._isMouseDown = true;
  }

  /*
   * マウスを離した時の処理
   * */
  private mouseUpHandler(event):void {
    this._isMouseDown = false;
  }

  /*
   * Tickイベントで実行される処理
   * */
  private mouseMoveHandler(event:MouseEvent):void {

    // マウスの座標
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  public update():void {
    // パーティクル発生装置の座標を更新
    this._particleEmitter.update(this.mouseX, this.mouseY);

    if (this._isMouseDown) {

      this._particleEmitter.emitParticle();
      this._tickCount++;

      if (this._tickCount >= 1000)
        this._tickCount = 0;
    }
  }
}
