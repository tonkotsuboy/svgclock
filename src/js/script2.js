/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * イベント名の名前空間
 */
var EventName;
(function (EventName) {
    EventName.RESIZE = "resize";
    EventName.DOM_CONTENT_LOADED = "DOMContentLoaded";
    EventName.MOUSE_DOWN = "mousedown";
    EventName.MOUSE_MOVE = "mousemove";
    EventName.MOUSE_UP = "mouseup";
})(EventName = exports.EventName || (exports.EventName = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * イベント名の名前空間
 */
var SVGNameSpace;
(function (SVGNameSpace) {
    SVGNameSpace.SVG = "http://www.w3.org/2000/svg";
    SVGNameSpace.LINK = "http://www.w3.org/1999/xlink";
})(SVGNameSpace = exports.SVGNameSpace || (exports.SVGNameSpace = {}));


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventName_1 = __webpack_require__(0);
var SVGNameSpace_1 = __webpack_require__(1);
var ParticleEmitter_1 = __webpack_require__(8);
/**
 * メインのレイヤー
 */
var ParticleLayer = (function () {
    function ParticleLayer() {
        var _this = this;
        this._tickCount = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "g");
        this._particleEmitter = new ParticleEmitter_1.default(); // パーティクル発生装置のインスタンスを作成
        this.view.appendChild(this._particleEmitter.view);
        window.addEventListener(EventName_1.EventName.MOUSE_DOWN, function (event) { return _this.mouseDownHandler(event); });
        window.addEventListener(EventName_1.EventName.MOUSE_MOVE, function (event) { return _this.mouseMoveHandler(event); });
        window.addEventListener(EventName_1.EventName.MOUSE_UP, function (event) { return _this.mouseUpHandler(event); });
        this.tick();
    }
    ParticleLayer.prototype.tick = function () {
        var _this = this;
        this.update();
        requestAnimationFrame(function () { return _this.tick(); });
    };
    /*
     * マウスを押した時の処理
     * */
    ParticleLayer.prototype.mouseDownHandler = function (event) {
        this._isMouseDown = true;
    };
    /*
     * マウスを離した時の処理
     * */
    ParticleLayer.prototype.mouseUpHandler = function (event) {
        this._isMouseDown = false;
    };
    /*
     * Tickイベントで実行される処理
     * */
    ParticleLayer.prototype.mouseMoveHandler = function (event) {
        // マウスの座標
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    };
    ParticleLayer.prototype.update = function () {
        // パーティクル発生装置の座標を更新
        this._particleEmitter.update(this.mouseX, this.mouseY);
        if (this._isMouseDown) {
            this._particleEmitter.emitParticle();
            this._tickCount++;
            if (this._tickCount >= 1000)
                this._tickCount = 0;
        }
    };
    return ParticleLayer;
}());
exports.default = ParticleLayer;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventName_1 = __webpack_require__(0);
var ParticleLayer_1 = __webpack_require__(3);
var Main2 = (function () {
    // メインのレイヤー
    function Main2() {
        this._svgField = document.getElementById("svgField");
        // メインのレイヤーを配置
        this._particleLayer = new ParticleLayer_1.default();
        this._svgField.appendChild(this._particleLayer.view);
    }
    return Main2;
}());
window.addEventListener(EventName_1.EventName.DOM_CONTENT_LOADED, function () { return new Main2(); });


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGNameSpace_1 = __webpack_require__(1);
/**
 * パーティクルのクラス
 */
var Particle = (function () {
    function Particle() {
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "use");
        this.view.setAttributeNS(SVGNameSpace_1.SVGNameSpace.LINK, "href", "#myCircle");
    }
    Object.defineProperty(Particle.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            if (this.view) {
                this.view.setAttribute("x", String(this._x));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            if (this.view) {
                this.view.setAttribute("y", String(this._y));
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * パーティクルの初期化
     * @param parentVX, parentVY :親コンテナの速度。パーティクルの速度に影響を与える。
     * */
    Particle.prototype.init = function (emitX, emitY, parentVX, parentVY) {
        this.x = emitX;
        this.y = emitY;
        this._life = 200 + Math.random() * 30;
        this._count = 0;
        this.vx = parentVX + (Math.random() - 0.5) * 10;
        this.vy = parentVY - 8 - Math.random() * 10;
        this.vr = (Math.random() - 0.5) * 5;
        this.isDead = false;
        // this.rotation = 50 * Math.PI * (Math.random() - 0.5);
    };
    Particle.prototype.setPosition = function (positionX, positionY) {
        if (!this.view) {
            return;
        }
        this.view.setAttribute("_y", String(positionY));
    };
    /*
     * パーティクルの時間経過処理。
     * _countがパーティクルの年齢。
     * _lifeを超えたら死亡する。
     *
     * */
    Particle.prototype.update = function () {
        this._count++;
        if (this._count <= this._life) {
            this.x += this.vx;
            this.vy += 0.6;
            this.y += this.vy;
            // this.rotation += this.vr;
            // 死にそうになったら点滅を開始
            if (this._count >= this._life / 2) {
                // this.alpha = 0.6 + Math.random() * 0.4;
                // this.alpha = (1 - this._count / this._life);
            }
        }
        else {
            // 寿命が来たらフラグを立てる
            this.isDead = true;
        }
    };
    return Particle;
}());
exports.default = Particle;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGNameSpace_1 = __webpack_require__(1);
var Particle_1 = __webpack_require__(7);
/**
 * パーティクル発生装置
 */
var ParticleEmitter = (function () {
    function ParticleEmitter() {
        // アニメーション中のパーティクルを格納する配列
        this._animationParticles = [];
        // パーティクルのオブジェクトプール。アニメーションがされていないパーティクルがここに待機している。
        this._particlePool = [];
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "g");
        this._emitX = 0;
        this._emitY = 0;
        this._vx = 0;
        this._vy = 0;
    }
    /*
     * MainLayerのtickイベント毎に実行される処理
     * */
    ParticleEmitter.prototype.update = function (goalX, goalY) {
        // 発生装置はgoalに徐々に近づいていく。
        var dx = goalX - this._emitX;
        var dy = goalY - this._emitY;
        var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); // 斜め方向の移動距離
        var rad = Math.atan2(dy, dx); // 移動角度
        this._vx = Math.cos(rad) * d * 0.1; // 速度の更新
        this._vy = Math.sin(rad) * d * 0.1; // 速度の更新
        this._emitX = this._emitX + this._vx;
        this._emitY = this._emitY + this._vy;
        // アニメーション中のパーティクルの状態を更新
        this.updateParticles();
    };
    /**
     *パーティクルを発生させる
     */
    ParticleEmitter.prototype.emitParticle = function () {
        var particle = this.getParticle();
        particle.init(this._emitX, this._emitY, this._vx, this._vy);
        this.view.appendChild(particle.view);
        // アニメーション中のパーティクルとして設定
        this._animationParticles.push(particle);
    };
    /**
     * パーティクルのアニメーション
     */
    ParticleEmitter.prototype.updateParticles = function () {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        for (var i = 0; i < this._animationParticles.length; i++) {
            var particle = this._animationParticles[i];
            if (!particle.isDead) {
                if (particle.y >= windowHeight - 50) {
                    particle.vy *= -0.5;
                    particle.y = windowHeight - 50;
                }
                if (particle.x >= windowWidth) {
                    particle.vx *= -0.4;
                    particle.x = windowWidth;
                }
                else if (particle.x <= 0) {
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
    };
    /*
     * オブジェクトプールからパーティクルを取得。
     * プールにパーティクルが無ければ新規作成
     */
    ParticleEmitter.prototype.getParticle = function () {
        if (this._particlePool.length > 0) {
            return this._particlePool.shift();
        }
        else {
            return new Particle_1.default();
        }
    };
    /*
     * パーティクルを取り除く。
     * */
    ParticleEmitter.prototype.removeParticle = function (particle, animationIndex) {
        // Containerからパーティクルをremove
        this.view.removeChild(particle.view);
        // アニメーションのパーティクルから取り除く。
        this._animationParticles.splice(animationIndex, 1);
        if (this._particlePool.indexOf(particle) == -1) {
            // プールにパーティクルが無いことを確認して格納
            this._particlePool.push(particle);
        }
    };
    return ParticleEmitter;
}());
exports.default = ParticleEmitter;


/***/ })
/******/ ]);
//# sourceMappingURL=script2.js.map