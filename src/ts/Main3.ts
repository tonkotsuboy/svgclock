import {EventName} from "./eventname/EventName";
import SudaParticleEmitter from "./particle/SudaParticleEmitter";
import SudaParticle from "./particle/SudaParticle";

class Main3 {
  private sudaEmitter:SudaParticleEmitter;

  constructor() {
    const svgField = <SVGGElement> document.querySelector("#tonkotuField");
    this.sudaEmitter = new SudaParticleEmitter();
    svgField.appendChild(this.sudaEmitter.view);

    this.render()
  }

  private render() {
    if (!this.sudaEmitter)
    {
      return;
    }
    this.sudaEmitter.update();
    requestAnimationFrame(() => this.render());
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main3());
