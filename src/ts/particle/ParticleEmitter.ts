import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";
import Particle from "./Particle";
import Point from "../point/Point";

/**
 * パーティクル発生装置
 */
export default class ParticleEmitter {
  public view:SVGGElement;

  // パーティクルの発生座標。発生装置そのものの座標ではない。
  private _emitX:number;
  private _emitY:number;
  // 発生座標に近づく速度
  private _vx:number;
  private _vy:number;
  // アニメーション中のパーティクルを格納する配列
  private _animationParticles:Particle[] = [];
  // パーティクルのオブジェクトプール。アニメーションがされていないパーティクルがここに待機している。
  private _particlePool:Particle[] = [];

  private _svgElement:SVGSVGElement;
  private _svgPoint:SVGPoint;

  public constructor(svgElement:SVGSVGElement) {
    this._svgElement = svgElement;

    // SVG上の点を取得
    this._svgPoint = svgElement.createSVGPoint();

    this.view = document.createElementNS(SVGNameSpace.SVG, "g");

    this._emitX = 0;
    this._emitY = 0;
    this._vx = 0;
    this._vy = 0;
  }

  /*
   * MainLayerのtickイベント毎に実行される処理
   * */
  public update(mouseX:number, mouseY:number) {
    const goal:Point = this.getEmitPointFromMouse(mouseX, mouseY)

    // 発生装置はgoalに徐々に近づいていく。
    let dx:number = goal.x - this._emitX;
    let dy:number = goal.y - this._emitY;

    let d:number = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));  // 斜め方向の移動距離
    let rad:number = Math.atan2(dy, dx);    // 移動角度
    this._vx = Math.cos(rad) * d * 0.1; // 速度の更新
    this._vy = Math.sin(rad) * d * 0.1; // 速度の更新
    this._emitX = this._emitX + this._vx;
    this._emitY = this._emitY + this._vy;

    // アニメーション中のパーティクルの状態を更新
    this.updateParticles();
  }

  private getEmitPointFromMouse(mouseX:number, mouseY:number):Point {
    // SVG上の点を取得
    this._svgPoint.x = mouseX - 50;
    this._svgPoint.y = mouseY - 50;
    const goalPoint:SVGPoint = this._svgPoint.matrixTransform(this._svgElement.getScreenCTM().inverse());
    return new Point(goalPoint.x, goalPoint.y);
  }

  /**
   *パーティクルを発生させる
   */
  public emitParticle():void {
    let particle:Particle = this.getParticle();
    particle.init(this._emitX, this._emitY, this._vx, this._vy);

    this.view.appendChild(particle.view);
    // アニメーション中のパーティクルとして設定
    this._animationParticles.push(particle);
  }

  /**
   * パーティクルのアニメーション
   */
  private updateParticles():void {
    // if (!this._svgElement || !this._svgElement.viewport)
    // {
    //   return;
    // }
    //
    // console.log(this._svgElement.viewport)

    const right = 960;
    const bottom = 540;

    for (let i:number = 0; i < this._animationParticles.length; i++) {
      let particle:Particle = this._animationParticles[i];
      if (!particle.isDead) {
        if (particle.y >= bottom) {
          particle.vy *= -0.5;
          particle.y = bottom;
        }

        if (particle.x >= right) {
          particle.vx *= -0.4;
          particle.x = right;
        } else if (particle.x <= 0) {
          particle.vx *= -0.4;
          particle.x = 0;
        }

        particle.update();
      }
      else {
        // particleを取り除く
        this.removeParticle(particle, i);
      }
    }
  }

  /*
   * オブジェクトプールからパーティクルを取得。
   * プールにパーティクルが無ければ新規作成
   */
  private getParticle():Particle {
    if (this._particlePool.length > 0) {
      return this._particlePool.shift();
    }
    else {
      return new Particle();
    }
  }

  /*
   * パーティクルを取り除く。
   * */
  private removeParticle(particle:Particle, animationIndex:number):void {
    // Containerからパーティクルをremove
    this.view.removeChild(particle.view);

    // アニメーションのパーティクルから取り除く。
    this._animationParticles.splice(animationIndex, 1);
    if (this._particlePool.indexOf(particle) == -1) {
      // プールにパーティクルが無いことを確認して格納
      this._particlePool.push(particle);
    }
  }
}


