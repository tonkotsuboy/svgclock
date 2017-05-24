import {EventName} from "./eventname/EventName";
import ParticleLayer from "./particle/ParticleLayer";

class Main2 {
  private _svgField:HTMLElement;
  private _particleLayer:ParticleLayer;
  // メインのレイヤー

  constructor() {
    this._svgField = document.getElementById("svgField");
    // メインのレイヤーを配置
    this._particleLayer = new ParticleLayer();
    this._svgField.appendChild(this._particleLayer.view);
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main2());