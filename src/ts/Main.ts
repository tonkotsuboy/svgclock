import {EventName} from "./eventname/EventName";
import ClockController from "./clock/ClockController";
import Point from "./point/Point";
class Main {
  private second:ClockController;
  private minute:ClockController;
  private hour:ClockController;

  constructor() {
    const centerPoint = new Point(170, 170);

    this.hour = new ClockController();
    this.hour.init("hour", centerPoint);
    this.minute = new ClockController();
    this.minute.init("minute", centerPoint);
    this.second = new ClockController();
    this.second.init("second", centerPoint);

    this.render();
  }

  private render() {
    if (!this.hour || !this.minute || !this.second) {
      return
    }

    const currentTime = new Date();
    const hour = currentTime.getHours() % 12;

    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    this.hour.update((hour / 12) * 360);
    this.minute.update((minute / 60) * 360);
    this.second.update((second / 60) * 360);

    requestAnimationFrame(() => this.render());
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main());
