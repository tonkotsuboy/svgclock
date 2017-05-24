import {SVGNameSpace} from "../svgnamespace/SVGNameSpace";
import Particle from "./Particle";

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

  private _browserNum:number;

  public constructor() {
    this.view = document.createElementNS(SVGNameSpace.SVG, "g");

    this._emitX = 0;
    this._emitY = 0;
    this._vx = 0;
    this._vy = 0;
  }

  /*
   * MainLayerのtickイベント毎に実行される処理
   * */
  public update(goalX:number, goalY:number) {
    // 発生装置はgoalに徐々に近づいていく。
    let dx:number = goalX - this._emitX;
    let dy:number = goalY - this._emitY;

    let d:number = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));  // 斜め方向の移動距離
    let rad:number = Math.atan2(dy, dx);    // 移動角度
    this._vx = Math.cos(rad) * d * 0.1; // 速度の更新
    this._vy = Math.sin(rad) * d * 0.1; // 速度の更新
    this._emitX = this._emitX + this._vx;
    this._emitY = this._emitY + this._vy;

    // アニメーション中のパーティクルの状態を更新
    this.updateParticles();
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
    let windowWidth:number = window.innerWidth;
    let windowHeight:number = window.innerHeight;

    for (let i:number = 0; i < this._animationParticles.length; i++) {
      let particle:Particle = this._animationParticles[i];
      if (!particle.isDead) {
        if (particle.y >= windowHeight - 50) {
          particle.vy *= -0.5;
          particle.y = windowHeight - 50;
        }

        if (particle.x >= windowWidth) {
          particle.vx *= -0.4;
          particle.x = windowWidth;
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


