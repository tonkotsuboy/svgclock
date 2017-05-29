/**
 * パーティクルのクラス
 */

export default class DebugController {

  private _debugArea:HTMLElement;

  /** インスタンス */
  private static _instance:DebugController;

  /** プライベートコンストラクタ */
  private constructor() {
    this._debugArea = document.getElementById("debugArea");
  }

  /** インスタンスの取得 */
  public static get instance():DebugController {
    // _inctanceが存在しない場合に、new Hoge()を実行する。
    if (!this._instance) {
      this._instance = new DebugController();
    }

    // 生成済みのインスタンスを返す
    return this._instance;
  }

  public trace(...strings):void
  {
    if (!this._debugArea)
    {
      return;
    }

    let outputString:string = "";

    for(let value of strings) { // オブジェクトの中のプロパティ名を取り出す。
      outputString += `${value}<br>`;
    }

    this._debugArea.innerHTML = outputString;
  }

}
