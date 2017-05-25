import {EventName} from "./eventname/EventName";
import ParticleLayer from "./particle/ParticleLayer";

class Main2 {
  constructor() {
    const svgField = <SVGSVGElement><any> document.getElementById("svgField");
    // メインのレイヤーを配置
    const svgPoint = svgField.createSVGPoint();
    const particleLayer = new ParticleLayer(svgField);
    svgField.appendChild(particleLayer.view);
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main2());