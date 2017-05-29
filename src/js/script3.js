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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SudaParticle_1 = __webpack_require__(11);
var SVGNameSpace_1 = __webpack_require__(1);
var SudaParticleEmitter = (function () {
    function SudaParticleEmitter() {
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "g");
        this.particles = [];
        // メインのレイヤーを配置
        this.linePath = document.getElementById("linePath");
        if (!this.linePath) {
            return;
        }
        for (var i = 0; i < 1; i++) {
            var particle = new SudaParticle_1.default("#suda", this.linePath, i * 30);
            this.particles.push(particle);
            this.view.appendChild(particle.view);
        }
    }
    SudaParticleEmitter.prototype.update = function () {
        if (!this.particles || this.particles.length <= 0) {
            return;
        }
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var particle = _a[_i];
            particle.update();
        }
    };
    return SudaParticleEmitter;
}());
exports.default = SudaParticleEmitter;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventName_1 = __webpack_require__(0);
var SudaParticleEmitter_1 = __webpack_require__(5);
var Main3 = (function () {
    function Main3() {
        var svgField = document.querySelector("#tonkotuField");
        this.sudaEmitter = new SudaParticleEmitter_1.default();
        svgField.appendChild(this.sudaEmitter.view);
        this.render();
    }
    Main3.prototype.render = function () {
        var _this = this;
        if (!this.sudaEmitter) {
            return;
        }
        this.sudaEmitter.update();
        requestAnimationFrame(function () { return _this.render(); });
    };
    return Main3;
}());
window.addEventListener(EventName_1.EventName.DOM_CONTENT_LOADED, function () { return new Main3(); });


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGNameSpace_1 = __webpack_require__(1);
/**
 * パーティクルのクラス
 */
var SudaParticle = (function () {
    function SudaParticle(linkId, linePath, startTime) {
        if (startTime === void 0) { startTime = 0; }
        this.time = 0;
        this.view = document.createElementNS(SVGNameSpace_1.SVGNameSpace.SVG, "use");
        this.view.setAttributeNS(SVGNameSpace_1.SVGNameSpace.LINK, "href", linkId);
        // this.view.setAttribute("fill", "#005fea");
        this.linePath = linePath;
        this.pathTotalLength = linePath.getTotalLength();
        this.time = startTime;
    }
    Object.defineProperty(SudaParticle.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            if (this.view) {
                this.view.setAttribute("x", String(this._x - 12));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SudaParticle.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            if (this.view) {
                this.view.setAttribute("y", String(this._y - 12));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SudaParticle.prototype, "rotate", {
        get: function () {
            return this._rotate;
        },
        set: function (value) {
            this._rotate = value;
            if (this.view) {
                this.view.setAttribute("transform", "rotate(" + value + ")");
            }
        },
        enumerable: true,
        configurable: true
    });
    SudaParticle.prototype.update = function () {
        this.time += 2;
        if (this.time >= this.pathTotalLength) {
            this.time = 0;
        }
        var targetPoint = this.linePath.getPointAtLength(this.time);
        var prevTime = this.time - 1;
        if (prevTime < 0) {
            prevTime = this.pathTotalLength - 1;
        }
        var prevPoint = this.linePath.getPointAtLength(prevTime);
        var vx = prevPoint.x - targetPoint.x;
        var vy = prevPoint.y - targetPoint.y;
        var angle = Math.atan2(vy, vx) * (180 / Math.PI) - 180;
        //const angle = this.time * this.pathTotalLength / 360;
        // this.x = targetPoint.x;
        // this.y = targetPoint.y;
        this.view.setAttribute("transform", "translate(" + targetPoint.x + ", " + targetPoint.y + ") rotate(" + angle + ")");
        //this.view.setAttribute("transform", `rotate(${angle})`);
        // this.rotate = angle;
    };
    return SudaParticle;
}());
exports.default = SudaParticle;


/***/ })
/******/ ]);
//# sourceMappingURL=script3.js.map