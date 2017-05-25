export default class DeviceInfo {
  public static isTouchDevice:boolean = "ontouchstart" in document;

  public static lowSpecMode:boolean = DeviceInfo.isTouchDevice;

}