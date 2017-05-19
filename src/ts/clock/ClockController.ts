import Point from "../point/Point";

/**
 * ClockController
 */
export default class ClockController {
  private view:HTMLElement;
  private centerPoint:Point;

  init(clockId:string, centerPoint:Point) {
    this.centerPoint = centerPoint;
    this.view = document.getElementById(clockId);
  }

  public update(degree:number):void {
    if (!this.view) {
      return;
    }

    this.view.setAttribute("transform", `rotate(${degree}, ${this.centerPoint.x}, ${this.centerPoint.y})`);
  }
}
