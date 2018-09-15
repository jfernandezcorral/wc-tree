(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tree", [], factory);
	else if(typeof exports === 'object')
		exports["tree"] = factory();
	else
		root["tree"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./src/components/BeanCentros.html":
/*!*****************************************!*\
  !*** ./src/components/BeanCentros.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>Centro:</p><input type=\"text\" placeholder=\"00000\" maxlength=\"5\"/><button></button>\r\n";

/***/ }),

/***/ "./src/components/BeanCentros.js":
/*!***************************************!*\
  !*** ./src/components/BeanCentros.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BeanCentros; });
/* harmony import */ var _BeanCentros_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BeanCentros.html */ "./src/components/BeanCentros.html");
/* harmony import */ var _BeanCentros_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_BeanCentros_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BeanCentros_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BeanCentros.scss */ "./src/components/BeanCentros.scss");
/* harmony import */ var _BeanCentros_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_BeanCentros_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var servicios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! servicios */ "./src/components/servicios-mock.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./src/components/Form.js");




const DIGITS_LENGTH = 5;

function fillLeftZeros(value, size) {
  while (value.length < size) {
    value = '0' + value;
  }

  return value;
}

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

function fillModel(data, cuspide, niveles) {
  cuspide = fillLeftZeros(cuspide, DIGITS_LENGTH);
  const index = {};
  const ret = data.map(it => {
    const tmp = {
      id: it['IDCENTRO'],
      text: `${niveles[it.IDNIVEL]['ABREVIATURA']} - ${it['IDCENTRO']} ${it['NOMBRECENTRO']}`,
      padre: it['IDCENTRO'] == cuspide ? null : it["I DCENTROPADRE"],
      payload: it
    };
    index[it['IDCENTRO']] = tmp;
    return tmp;
  });
  return [ret, index];
}

function capitalize(s) {
  return s.replace(/\b\w/g, l => l.toUpperCase());
}

class BeanCentros extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'centro', 'cuspide'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _BeanCentros_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _BeanCentros_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._input = shadowRoot.querySelector('input');
    this._button = shadowRoot.querySelector('button');
    this._keypress = this._keypress.bind(this);
    this._keydown = this._keydown.bind(this);
    this._blur = this._blur.bind(this);
    this._clickInput = this._clickInput.bind(this);
    this._animationend = this._animationend.bind(this);
    this._updateCenter = this._updateCenter.bind(this);
    this._blurButton = this._blurButton.bind(this);
    this._returnModal = this._returnModal.bind(this);
    this._ready = false;
    this._model = [];
    this._modelIndex = {};
    this._niveles = [];
    this._nivelesIndex = {};
  }

  _getModel(cuspide) {
    this._ready = false;
    this.disabled = true;
    Promise.all([Object(servicios__WEBPACK_IMPORTED_MODULE_2__["getCentros"])(cuspide), Object(servicios__WEBPACK_IMPORTED_MODULE_2__["getNiveles"])()]).then(([data, niveles]) => {
      this._ready = true;
      this.disabled = false;
      this._niveles = [{
        CODIGO: 'ALL',
        ABREVIATURA: 'ALL',
        DESCRIPCION: 'Todos'
      }, ...niveles];
      this._nivelesIndex = this._niveles.reduce((a, it) => {
        a[it.CODIGO] = it;
        return a;
      }, {});
      const p = fillModel(data, cuspide, this._nivelesIndex);
      this._model = p[0];
      this._modelIndex = p[1];

      this._updateCenter();
    });
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    this._upgradeProperty('disabled');

    this._upgradeProperty('centro');

    this._upgradeProperty('cuspide');

    this._input.addEventListener('keypress', this._keypress);

    this._input.addEventListener('keydown', this._keydown);

    this._input.addEventListener('blur', this._blur);

    this._input.addEventListener('click', this._clickInput);

    this._input.addEventListener('animationend', this._animationend);

    this._button.addEventListener('click', this._updateCenter);

    this._button.addEventListener('blur', this._blurButton);
  }

  disconnectedCallback() {
    this._input.removeEventListener('keypress', this._keypress);

    this._input.removeEventListener('keydown', this._keydown);

    this._input.removeEventListener('blur', this._blur);

    this._input.removeEventListener('click', this._clickInput);

    this._input.removeEventListener('animationend', this._animationend);

    this._button.removeEventListener('click', this._updateCenter);

    this._button.removeEventListener('blur', this._blurButton);
  }

  _keypress(e) {
    if (e.which == 13) {
      this._updateCenter();
    }
  }

  _keydown(e) {
    this._input.classList.remove('error');

    if (e.keyCode == 27) {
      this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH);
    }
  }

  _blur(e) {
    if (!e.relatedTarget || !is(e.relatedTarget, 'button')) {
      this._input.classList.remove('error');

      this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH);
    }
  }

  _clickInput(e) {
    this._input.select();

    e.stopPropagation();
  }

  _animationend(e) {
    this._input.classList.remove('animation-ok');

    this._input.classList.remove('animation-err');
  }

  _blurButton(e) {
    if (!e.relatedTarget || !is(e.relatedTarget, 'input')) {
      this._input.classList.remove('error');

      this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH);
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get centro() {
    return this.getAttribute('centro');
  }

  set centro(val) {
    this.setAttribute('centro', fillLeftZeros(val, DIGITS_LENGTH));
  }

  get cuspide() {
    return this.getAttribute('cuspide');
  }

  set cuspide(val) {
    this.setAttribute('cuspide', val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name == 'disabled') {
      if (this.disabled) {
        this._button.setAttribute('disabled', "");

        this._input.setAttribute('disabled', "");
      } else {
        this._button.removeAttribute('disabled');

        this._input.removeAttribute('disabled');
      }
    } else if (name == 'centro') {
      this._input.value = newValue;

      this._updateCenter();
    } else if (name == 'cuspide') {
      this._getModel(newValue);
    } //console.log(name, oldValue, newValue, this.disabled, this.centro, this.cuspide)

  }

  _updateCenter() {
    if (!this._ready) {
      return;
    }

    if (this._input.value.trim() == "") {
      this._abrirModal();

      return;
    }

    this._input.value = fillLeftZeros(this._input.value, DIGITS_LENGTH);

    if (this._modelIndex[this._input.value]) {
      this._input.classList.remove('error');

      this._input.classList.add('animation-ok');

      if (this._input.value != this.centro) {
        this.centro = this._input.value;
      }

      this.dispatchEvent(new CustomEvent('bk-change', {
        detail: this._modelIndex[this.centro],
        bubbles: true
      }));
    } else {
      this._input.classList.add('error');

      this._input.classList.add('animation-err');
    }
  }

  _abrirModal() {
    this._modal = new _Form__WEBPACK_IMPORTED_MODULE_3__["default"](this._model, this._niveles, this._returnModal, this._modelIndex[this.cuspide], this._nivelesIndex);

    this._modal.view();
  }

  _returnModal(info) {
    this.centro = info.IDCENTRO;
  }

}

/***/ }),

/***/ "./src/components/BeanCentros.scss":
/*!*****************************************!*\
  !*** ./src/components/BeanCentros.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: inline-block;\n  box-sizing: border-box;\n  --color-caret: yellowgreen; }\n\n* {\n  box-sizing: border-box; }\n\np {\n  padding: .3em .4em .3em .7em;\n  display: inline-block;\n  margin: 0; }\n\ninput {\n  border-radius: 0.2em;\n  width: 4em;\n  outline: none;\n  border: none;\n  line-height: 1.3;\n  caret-color: var(--color-caret); }\n  input.animation-ok {\n    animation: tr .25s;\n    animation-direction: alternate; }\n  input.animation-err {\n    animation: tr-err .25s;\n    animation-direction: alternate; }\n  input.error {\n    outline: 1px solid red; }\n  input::selection {\n    background-color: var(--color-caret); }\n\nbutton {\n  outline: none;\n  margin: 0.3em;\n  padding: .7em;\n  border-radius: 0.3em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/done.svg */ "./src/components/img/done.svg")) + ");\n  background-color: white;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  vertical-align: super;\n  cursor: pointer;\n  transition: opacity, background-color 0.3s ease; }\n  button:not([disabled]):hover {\n    opacity: 0.6;\n    background-color: silver; }\n  button[disabled] {\n    background-color: silver; }\n\n@keyframes tr {\n  0% {\n    /*background-color: white;*/ }\n  100% {\n    background-color: rgba(200, 255, 200, 0.7); } }\n\n@keyframes tr-err {\n  0% {\n    /*background-color: white;*/ }\n  100% {\n    background-color: rgba(255, 200, 200, 0.7); } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Form.html":
/*!**********************************!*\
  !*** ./src/components/Form.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=title>\r\n    Selección de centros\r\n    <span class='aspa'></span>\r\n</div>\r\n<div class='cuerpo'>\r\n    <div class='info'>\r\n        Empresa: <span class='empresa'></span>\r\n        Centro: <span class='centro'></span>\r\n        Descripción: <span class='desc'></span>\r\n    </div>\r\n    <div class='principal'>\r\n        <div class='tabs'>\r\n            <div class='tab jerarquia'>Jerarquía</div>\r\n            <div class='tab busqueda disabled'>Búsqueda</div>\r\n        </div>\r\n        <div id='clients'>\r\n            <div id='clientJ' class='client'>\r\n                <bk-wc-ui-tree></bk-wc-ui-tree>\r\n            </div>\r\n            <div id='clientB' class='client disabled'>\r\n                <div class='selectNiveles'>\r\n                    <div class='capNiveles'>\r\n                        <nav class='mostrar'>Mostrar centros de los siguientes niveles:</nav>\r\n                        <nav class='criterios'>Criterios de seleción</nav>\r\n                        <span></span>\r\n                    </div>\r\n                    <div class='niveles'>\r\n                    </div>\r\n                    <div class='query'>\r\n                        <span>Filtrar resultados por centro: </span>\r\n                        <input type='text' id='filterCentro'/>\r\n                        <span>Descripción: </span>\r\n                        <input type='text' id='filterDesc'/>\r\n                        <button id='filtrar' disabled>Filtro</button>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                   <div id='resultados'></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class='botonera'>\r\n   <button class='aceptar' disabled>Aceptar</button>\r\n   <button class='abandonar'>Abandonar</button>\r\n</div>";

/***/ }),

/***/ "./src/components/Form.js":
/*!********************************!*\
  !*** ./src/components/Form.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var _Form_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.html */ "./src/components/Form.html");
/* harmony import */ var _Form_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Form_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Form_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.scss */ "./src/components/Form.scss");
/* harmony import */ var _Form_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Form_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal */ "./src/components/Modal.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const templateNode = document.createElement('template');
templateNode.innerHTML = `<div class='ni'>
                            <input type='checkbox' checked/>
                            <div></div>
                          </div>`;
const templateResult = document.createElement('template');
templateResult.innerHTML = `<div class='result'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>`;

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

function getTargetNivel(e) {
  const target = e.composedPath()[0].closest('div.ni');

  if (target && target.querySelector('input')) {
    return [target.querySelector('input'), e.composedPath()[0] == target.querySelector('input')]; //true si es el mismo input
  }

  return undefined;
}

function getTargetResult(e) {
  return e.composedPath()[0].closest('div.result');
}

class Form {
  constructor(modelo, niveles, cb, cuspide, nivelesIndex) {
    this.modelo = modelo;
    this.niveles = niveles;
    this.cb = cb;
    this.cuspide = cuspide;
    this.nivelesIndex = nivelesIndex;
    this.div = undefined;
    this.tabJerarquia = undefined;
    this.tabBusqueda = undefined;
    this.clientJ = undefined;
    this.clientB = undefined;
    this.tree = undefined;
    this._cerrar = undefined;
    this.panelNiveles = undefined;
    this.toggle = undefined;
    this.selectNiveles = undefined;
    this.clickJerarquia = this.clickJerarquia.bind(this);
    this.clickBusqueda = this.clickBusqueda.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.clickNiveles = this.clickNiveles.bind(this);
    this.querykeyup = this.querykeyup.bind(this);
    this.clean = this.clean.bind(this);
    this.query = undefined;
    this.filter = this.filter.bind(this);
    this.clickResult = this.clickResult.bind(this);
    this.result = undefined;
    this.selected = undefined;
    this.treeChanged = this.treeChanged.bind(this);
    this.aceptar = undefined;
    this.clickAceptar = this.clickAceptar.bind(this);
  }

  clickAceptar() {
    let index = this.selected;

    if (!(typeof this.selected == 'string')) {
      index = this.selected.centro;
    }

    this.cb(_objectSpread({}, this.modelo.find(it => it.id == index).payload));

    this._cerrar();
  }

  treeChanged(e) {
    this.asignSelected(e.detail.id);
    this.result.querySelectorAll('.result.selected').forEach(it => it.classList.remove('selected'));
  }

  asignSelected(v) {
    this.selected = v; //puede ser un string(desde tree) o un nodo(desde resultados)

    this.aceptar.disabled = !this.selected;
  }

  clickResult(e) {
    const target = getTargetResult(e);

    if (!target) {
      return;
    }

    if (this.selected) {
      this.selected.classList.remove('selected');
    }

    this.asignSelected(target);
    this.selected.classList.add('selected');
  }

  filter() {
    this.asignSelected(undefined);
    const checks = [];
    this.panelNiveles.querySelectorAll('input:checked').forEach(input => {
      if (input.codigo !== 'ALL') {
        checks.push(input.codigo.trim());
      }
    });
    const qCentro = this.query.querySelector('#filterCentro').value;
    const qDesc = this.query.querySelector('#filterDesc').value;
    const data = this.modelo.filter(({
      payload
    }) => {
      if (checks.includes(payload.IDNIVEL.trim()) && (qCentro.trim() && payload.IDCENTRO.includes(qCentro.trim()) || qDesc.trim() && payload.NOMBRECENTRO.toLowerCase().includes(qDesc.trim().toLowerCase()))) {
        return true;
      }
    });
    this.result.innerHTML = ''; //clean

    const fragment = document.createDocumentFragment();
    data.forEach(({
      payload
    }) => {
      const tmp = templateResult.content.cloneNode(true);
      tmp.querySelector('.result').centro = payload.IDCENTRO;
      tmp.querySelector("div div:nth-child(1)").innerText = this.nivelesIndex[payload.IDNIVEL].ABREVIATURA;
      tmp.querySelector("div div:nth-child(2)").innerText = payload.IDCENTRO;
      tmp.querySelector("div div:nth-child(3)").innerText = payload.NOMBRECENTRO;
      fragment.appendChild(tmp);
    });
    this.result.appendChild(fragment);
  }

  querykeyup(e) {
    this.setStateFilters();
  }

  handleToggle(e) {
    this.selectNiveles.classList.toggle('oculto');
  }

  clickNiveles(e) {
    const [target, directo] = getTargetNivel(e);

    if (!target) {
      return;
    }

    target.checked = directo ? target.checked : !target.checked;

    if (target.codigo.trim() == 'ALL') {
      this.panelNiveles.querySelectorAll('input').forEach(input => {
        input.checked = target.checked;
      });
    }

    this.setStateFilters();
  }

  setStateFilters() {
    const seleccionados = this.panelNiveles.querySelectorAll('input:checked');
    const fcentro = this.query.querySelector('#filterCentro');
    const fdesc = this.query.querySelector('#filterDesc');
    const filtrar = this.query.querySelector('#filtrar');

    if (seleccionados.length > 1 || seleccionados.length == 1 && seleccionados[0].codigo != 'ALL') {
      fcentro.disabled = false;
      fdesc.disabled = false;
      filtrar.disabled = fcentro.value.length > 1 || fdesc.value.length > 3 ? false : true;
    } else {
      fcentro.disabled = true;
      fdesc.disabled = true;
      filtrar.disabled = true;
    }
  }

  view() {
    this.div = document.createElement("div");
    const shadowRoot = this.div.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Form_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Form_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    shadowRoot.querySelector('.empresa').innerText = this.cuspide.payload['DESCRIPCIONEMPRESA'];
    shadowRoot.querySelector('.centro').innerText = this.cuspide.payload['IDCENTRO'];
    shadowRoot.querySelector('.desc').innerText = this.cuspide.payload['NOMBRECENTRO']; //eventos

    this.tabJerarquia = shadowRoot.querySelector('.tab.jerarquia');
    this.tabJerarquia.addEventListener('click', this.clickJerarquia);
    this.tabBusqueda = shadowRoot.querySelector('.tab.busqueda');
    this.tabBusqueda.addEventListener('click', this.clickBusqueda);
    this.clientJ = shadowRoot.querySelector('#clientJ');
    this.clientB = shadowRoot.querySelector('#clientB');
    this.tree = shadowRoot.querySelector('bk-wc-ui-tree');
    this.tree.data = this.modelo;
    this.tree.addEventListener('bk-change', this.treeChanged);
    this._cerrar = Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["popup"])(this.div);
    shadowRoot.querySelector('.aspa').addEventListener('click', this._cerrar);
    shadowRoot.querySelector('button.abandonar').addEventListener('click', this._cerrar);
    this.panelNiveles = shadowRoot.querySelector('.niveles');
    this.toggle = shadowRoot.querySelector(".capNiveles");
    this.toggle.addEventListener('click', this.handleToggle);
    this.selectNiveles = shadowRoot.querySelector(".selectNiveles");
    this.panelNiveles.addEventListener('click', this.clickNiveles);
    this.rellenarNiveles();
    this.query = shadowRoot.querySelector('.query');
    this.query.addEventListener('keyup', this.querykeyup);
    this.query.querySelector('#filtrar').addEventListener('click', this.filter);
    this.result = shadowRoot.querySelector('#clientB #resultados');
    this.result.addEventListener('click', this.clickResult);
    this.div.addEventListener('bk-clean', this.clean);
    this.aceptar = shadowRoot.querySelector('button.aceptar');
    this.aceptar.addEventListener('click', this.clickAceptar);
  }

  clean() {
    this.tabJerarquia.removeEventListener('click', this.clickJerarquia);
    this.tabBusqueda.removeEventListener('click', this.clickBusqueda);
    this.div.shadowRoot.querySelector('.aspa').removeEventListener('click', this._cerrar);
    this.div.shadowRoot.querySelector('button.abandonar').removeEventListener('click', this._cerrar);
    this.tree.removeEventListener('bk-change', this.treeChanged);
    this.toggle.removeEventListener('click', this.handleToggle);
    this.panelNiveles.removeEventListener('click', this.clickNiveles);
    this.query.removeEventListener('keyup', this.querykeypress);
    this.query.querySelector('#filtrar').removeEventListener('click', this.filter);
    this.result.removeEventListener('click', this.clickResult);
    this.div.removeEventListener('bk-clean', this.clean);
    this.aceptar.removeEventListener('click', this.clickAceptar);
  }

  clickJerarquia() {
    if (this.tabJerarquia.classList.contains('disabled')) {
      this.tabJerarquia.classList.remove('disabled');
      this.tabBusqueda.classList.add('disabled');
      this.clientJ.classList.remove('disabled');
      this.clientB.classList.add('disabled');
      this.tree.selectedId = this.selected ? this.selected.centro : undefined;
    }
  }

  clickBusqueda() {
    if (this.tabBusqueda.classList.contains('disabled')) {
      this.tabBusqueda.classList.remove('disabled');
      this.tabJerarquia.classList.add('disabled');
      this.clientB.classList.remove('disabled');
      this.clientJ.classList.add('disabled');
      this.tree.selectedId = undefined;

      if (typeof this.selected == 'string') {
        this.asignSelected(undefined);
      }
    }
  }

  rellenarNiveles() {
    const t = this.panelNiveles;
    this.niveles.forEach(n => {
      const tmp = templateNode.content.cloneNode(true);
      const input = tmp.querySelector('input');
      input.codigo = n.CODIGO;
      input.abreviatura = n.ABREVIATURA;
      tmp.querySelector('.ni div').innerHTML = `<span><b>${n.ABREVIATURA}</b>-${n.DESCRIPCION}</span>`;
      t.appendChild(tmp);
    });
  }

}

/***/ }),

/***/ "./src/components/Form.scss":
/*!**********************************!*\
  !*** ./src/components/Form.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  box-sizing: border-box;\n  background-color: #eee;\n  padding: .5em;\n  border-radius: .4em;\n  font-size: .8em;\n  min-width: 50vw;\n  --back-claro: #f9f9f9;\n  --borde-std: #bdbdbd; }\n\n* {\n  box-sizing: border-box; }\n\n.aspa {\n  position: absolute;\n  top: 0.2em;\n  right: 0.3em;\n  padding: 1em 0 0 1em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: opacity, background-color 0.3s ease;\n  border-radius: 1em; }\n  .aspa:hover {\n    opacity: 0.6;\n    background-color: silver; }\n\n.title {\n  position: relative;\n  padding: .1em;\n  padding-right: 3em;\n  border-bottom: 1px solid var(--borde-std);\n  border-radius: .4em;\n  background-color: #e5e5e5; }\n\n.cuerpo {\n  margin: 0.4em 0;\n  display: flex;\n  flex-direction: column;\n  max-width: 80vw; }\n\n.botonera {\n  padding: 0.4em;\n  border-top: 1px solid var(--borde-std);\n  display: flex;\n  justify-content: flex-end; }\n\nbutton {\n  outline: none;\n  padding: .2em .7em .2em 1.4em;\n  border-radius: 0.1em;\n  background-color: var(--back-claro);\n  border: 1px solid var(--borde-std);\n  box-shadow: 2px 3px 4px #aaa;\n  cursor: pointer;\n  transition: opacity, background-color 0.3s ease;\n  position: relative; }\n  button:not([disabled]):hover {\n    opacity: 0.6;\n    background-color: #e7e0e0; }\n  button[disabled] {\n    background-color: silver; }\n  button::before {\n    content: '';\n    position: absolute;\n    top: 0.4em;\n    left: 0.2em;\n    padding: .9em 0 0 .9em;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center; }\n  button.aceptar {\n    margin-right: .7em;\n    border-bottom: 3px solid #278827; }\n    button.aceptar::before {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/check.gif */ "./src/components/img/check.gif")) + "); }\n  button.abandonar {\n    border-bottom: 3px solid #a82929; }\n    button.abandonar::before {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/abandonar.gif */ "./src/components/img/abandonar.gif")) + "); }\n  button#filtrar {\n    border-bottom: 3px solid #948b8b;\n    padding-left: .7em; }\n\n.info {\n  background-color: var(--back-claro);\n  padding: .4em .7em;\n  display: flex;\n  border-radius: .2em; }\n  .info span:not(.desc) {\n    margin-right: .5em; }\n  .info span {\n    margin-left: .2em;\n    border-radius: .2em;\n    line-height: 1.5;\n    background-color: #e5e5e5;\n    border: 1px solid var(--borde-std);\n    padding: 0 1em 0 .5em;\n    color: #666;\n    font-size: .8em; }\n\n.principal {\n  margin: .7em 0 .5em 0;\n  /*max-width: 80vw;*/\n  height: 60vh;\n  display: flex;\n  flex-direction: column; }\n\n.tabs {\n  display: flex;\n  position: relative;\n  top: 1px; }\n  .tabs .tab + .tab {\n    margin-left: .5em; }\n  .tabs .tab {\n    border-radius: .3em .3em 0 0;\n    cursor: pointer;\n    padding: .3em 1.3em;\n    background-color: var(--back-claro);\n    border: 1px solid var(--borde-std);\n    border-top: 2px solid #aaddaa;\n    border-bottom: none;\n    transition: background-color .3s ease-out; }\n    .tabs .tab.disabled {\n      border: 1px solid var(--borde-std);\n      background-color: transparent; }\n\n#clients {\n  flex-grow: 1;\n  flex-basis: 0;\n  border-radius: 0 .3em .3em .3em;\n  border: 1px solid var(--borde-std);\n  /*height: 60vh;*/\n  background-color: var(--back-claro);\n  display: flex; }\n  #clients .client {\n    animation: tr .2s ease-in-out;\n    padding: .7em;\n    flex-grow: 1; }\n    #clients .client.disabled {\n      display: none; }\n    #clients .client#clientJ {\n      padding: 0; }\n\nbk-wc-ui-tree {\n  height: 100%;\n  font-size: .9em; }\n\n#clientB {\n  display: flex;\n  flex-direction: column; }\n  #clientB .selectNiveles {\n    max-height: 50%;\n    display: flex;\n    flex-direction: column; }\n    #clientB .selectNiveles.oculto .capNiveles span {\n      transform: rotate(90deg); }\n    #clientB .selectNiveles.oculto nav.mostrar {\n      visibility: hidden; }\n    #clientB .selectNiveles.oculto nav.criterios {\n      visibility: visible; }\n    #clientB .selectNiveles.oculto .niveles, #clientB .selectNiveles.oculto .query {\n      padding: 0;\n      height: 0; }\n  #clientB > div {\n    border: 1px solid var(--borde-std); }\n    #clientB > div + div {\n      margin-top: 1em;\n      overflow: auto;\n      flex-grow: 1;\n      flex-basis: 0; }\n  #clientB .capNiveles {\n    padding: .5em;\n    position: relative; }\n    #clientB .capNiveles span {\n      transform: rotate(0);\n      transition: transform .2s ease-in, opacity .3s ease;\n      position: absolute;\n      top: 0.9em;\n      right: 0.3em;\n      width: 0;\n      height: 0;\n      border-left: .4em solid transparent;\n      border-right: .4em solid transparent;\n      border-top: .4em solid #888;\n      display: block;\n      cursor: pointer; }\n      #clientB .capNiveles span:hover {\n        opacity: 0.6; }\n    #clientB .capNiveles nav.criterios {\n      position: absolute;\n      top: 0.5em;\n      right: 3em;\n      visibility: hidden; }\n  #clientB .niveles, #clientB .query {\n    overflow: hidden;\n    transition: height .3s ease;\n    /*transition: opacity .3s ease, height .3s ease .3s, padding .3s ease .3s;*/\n    /*transition-property: opacity, height, padding;\r\n        transition-duration: .3s, .3s .3s;\r\n        transition-delay: 0s, .3s, .3s;\r\n        transition-timing-function: ease-out;*/ }\n  #clientB .niveles {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap; }\n  #clientB .query {\n    display: flex;\n    align-items: center;\n    padding: 1.1em; }\n    #clientB .query span {\n      padding: .7em 0;\n      margin-right: .3em; }\n    #clientB .query input {\n      border-radius: .2em;\n      margin-right: .7em;\n      border: 1px solid var(--borde-std);\n      outline-color: yellowgreen; }\n      #clientB .query input#filterCentro {\n        width: 6em; }\n      #clientB .query input#filterDesc {\n        flex-grow: 1; }\n\n.ni {\n  /*max-width: 25%;*/\n  padding: .3em .4em;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  cursor: pointer; }\n  .ni input {\n    margin-right: .2em; }\n  .ni > div {\n    display: inline;\n    font-size: .8em;\n    vertical-align: text-top; }\n    .ni > div b {\n      font-weight: bold; }\n\n.resultados {\n  transition: height .3s ease; }\n\n.result {\n  display: flex;\n  margin-bottom: 1px;\n  animation: tr .3s ease-in-out;\n  transition: background-color .2s ease-in-out;\n  cursor: pointer; }\n  .result.selected > div {\n    background-color: yellowgreen; }\n  .result > div {\n    padding: .2em .7em;\n    border-top: 1px solid #f0f0f0;\n    background-color: #eaeaea;\n    border-right: 1px solid #f0f0f0; }\n  .result div:nth-child(1) {\n    min-width: 4em; }\n  .result div:nth-child(2) {\n    min-width: 9em; }\n  .result div:nth-child(3) {\n    flex-grow: 1; }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Modal.html":
/*!***********************************!*\
  !*** ./src/components/Modal.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='popup'>\r\n    <div id='client'>\r\n        <!--<span class='aspa'></span>-->\r\n        <slot></slot>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/*! exports provided: default, popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popup", function() { return popup; });
/* harmony import */ var _Modal_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.html */ "./src/components/Modal.html");
/* harmony import */ var _Modal_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Modal_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.scss */ "./src/components/Modal.scss");
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Modal_scss__WEBPACK_IMPORTED_MODULE_1__);



function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

class Modal extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Modal_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._popup = shadowRoot.querySelector('#popup');
    this._client = shadowRoot.querySelector('#client');
    this._click = this._click.bind(this);
    this.close = this.close.bind(this);
    this._closing = false;
  }

  connectedCallback() {
    this._popup.addEventListener('click', this._click);
  }

  disconnectedCallback() {
    this._popup.removeEventListener('click', this._click);
  }

  _click(e) {
    const target = e.composedPath()[0];

    if (target == this._popup) {
      //if (is(target, '#popup')/* || is(target, '.aspa')*/){
      this.close();
    }
  }

  close() {
    if (this._closing) {
      return;
    }

    this._closing = true;
    this.dispatchEvent(new CustomEvent('bk-close', {
      bubbles: true
    }));
    this._client.style.transform = "scale(0.1)";
    this._popup.style.opacity = '0.1';

    this._client.addEventListener("transitionend", () => {
      this.parentNode && this.parentNode.removeChild(this);
    });
  }

}

function popup(markup) {
  const el = document.createElement('bk-wc-ui-modal');
  el.addEventListener('bk-close', () => markup.dispatchEvent(new CustomEvent('bk-clean', {
    bubbles: true
  })));
  el.appendChild(markup);
  document.body.appendChild(el);
  return el.close;
}



/***/ }),

/***/ "./src/components/Modal.scss":
/*!***********************************!*\
  !*** ./src/components/Modal.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  box-sizing: border-box; }\n\n* {\n  box-sizing: border-box; }\n\n#popup {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: tr .3s ease-in-out;\n  transition: opacity .3s ease-in-out; }\n\n#client {\n  background-color: white;\n  border-radius: 0.3em;\n  box-shadow: 0.2em 0.2em 0.3em #888;\n  padding: .5em;\n  /*padding-top: 2.2em;*/\n  position: relative;\n  animation: pop .5s;\n  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);\n  transition: transform .3s ease-in-out; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.5em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: opacity 0.3s ease; }\n  .aspa:hover {\n    opacity: 0.6; }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 0.8; } }\n\n@keyframes pop {\n  0% {\n    transform: scale(0.1); }\n  100% {\n    transform: scale(1); } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Tree.html":
/*!**********************************!*\
  !*** ./src/components/Tree.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='client'>\r\n\r\n</div>";

/***/ }),

/***/ "./src/components/Tree.js":
/*!********************************!*\
  !*** ./src/components/Tree.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* harmony import */ var _Tree_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tree.html */ "./src/components/Tree.html");
/* harmony import */ var _Tree_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Tree_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Tree_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tree.scss */ "./src/components/Tree.scss");
/* harmony import */ var _Tree_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Tree_scss__WEBPACK_IMPORTED_MODULE_1__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const templateNode = document.createElement('template');
templateNode.innerHTML = `<div class='node'>
                            <div class='caption'><span class='icon'></span><div class='text'></div></div>
                            <div class='hijos'></div>
                          </div>`;

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

function getTop(nodo, padre) {
  //!!padre debe ser posicionado!!!
  let tmpnodo = nodo;
  let ret = tmpnodo.offsetTop;

  while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre) {
    tmpnodo = tmpnodo.offsetParent;
    ret += tmpnodo.offsetTop;
  }

  return ret;
}

class Tree extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Tree_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Tree_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._client = shadowRoot.querySelector('#client');
    this._click = this._click.bind(this);
    this._selected = undefined;
  }

  connectedCallback() {
    this._client.addEventListener('click', this._click);
  }

  disconnectedCallback() {
    this._client.removeEventListener('click', this._click);

    this._selected = undefined;
  }

  _select(node) {
    if (this._selected) {
      this._selected.classList.remove('sel');
    }

    node.classList.add('sel');
    this._selected = node;
  }

  _unselect() {
    if (this._selected) {
      this._selected.classList.remove('sel');
    }

    this._selected = undefined;
  }

  _click(e) {
    const target = e.composedPath()[0];
    const node = target.closest('.node');

    if (is(target, '.text')) {
      this._select(target);

      this.dispatchEvent(new CustomEvent('bk-change', {
        detail: this.selected,
        bubbles: true
      }));
    } else if (is(target, '.icon')) {
      this._expandOrCollapse(node);
    }
  }

  _expandOrCollapse(node) {
    if (is(node, '.terminal')) {
      return;
    }

    if (is(node, '.collapsed')) {
      if (node.querySelector('.hijos').childElementCount == 0) {
        const hijosId = this._bd[node.id].hijos;

        this._append(node.querySelector('.hijos'), hijosId);
      }

      node.classList.remove('collapsed');
    } else {
      node.classList.add('collapsed');
    }
  }

  _expand(id) {
    const node = this._client.querySelector(`[id='${id}']`);

    if (node.querySelector('.hijos').childElementCount == 0) {
      const hijosId = this._bd[node.id].hijos;

      this._append(node.querySelector('.hijos'), hijosId);
    }

    node.classList.remove('collapsed');
  }

  get selected() {
    if (this._selected) {
      const id = this._selected.closest('.node').id;

      return _objectSpread({}, this._bd[id]);
    }

    return undefined;
  }

  set selectedId(id) {
    if (!id) {
      this._unselect();

      return;
    }

    if (!this._bd[id]) {
      throw new Error("nodo no existe, " + id);
    }

    const ruta = this._getRutaNodo(id);

    ruta.forEach(it => {
      this._expand(it.id);
    });

    const node = this._client.querySelector(`[id='${id}']`);

    this._select(node.querySelector('.text'));

    this._client.scrollTop = getTop(node, this._client);
  }

  get data() {
    return this._data;
  }

  set data(val) {
    if (this._data === val) {
      return;
    }

    this._data = val;
    this._bd = {};

    this._data.forEach(it => this._bd[it.id] = _objectSpread({}, it, {
      hijos: []
    }));

    Object.entries(this._bd).forEach(([k, v]) => v.padre && this._bd[v.padre].hijos.push(k));

    this._paintInicial();
  }

  _getRutaNodo(id) {
    const ret = [
      /*this._bd[id]*/
    ];
    let padre = this._bd[id].padre;

    while (padre) {
      ret.unshift(this._bd[padre]);
      padre = this._bd[padre].padre;
    }

    return ret;
  }

  _paintInicial() {
    this._client.innerHTML = "";

    const nodosRaiz = this._data.filter(it => it.padre == null).map(it => it.id);

    this._append(this._client, nodosRaiz, true);
  }

  _append(t, ids, root) {
    ids.forEach((it, index) => {
      const item = this._bd[it];
      const tmp = templateNode.content.cloneNode(true);
      tmp.querySelector('.text').innerText = item.text;
      const node = tmp.querySelector('.node');
      node.id = it;

      if (root) {
        node.classList.add('raiz');
      }

      if (item.hijos.length == 0) {
        node.classList.add('terminal');
        node.setAttribute('nivel', root ? '0' : (Number(t.closest('.node').getAttribute('nivel')) + 1).toString());
      } else {
        node.classList.add('collapsed');
        node.setAttribute('nivel', root ? '0' : (Number(t.closest('.node').getAttribute('nivel')) + 1).toString());
      }

      if (index == 0) {
        node.classList.add('ph');
      }

      t.appendChild(tmp);

      this._fixLines(node);
    });
  }

  _ancestro_nivel_i_es_ultimo(i, node) {
    let tmp = node;

    while (Number(tmp.getAttribute('nivel')) > i) {
      tmp = tmp.parentElement.closest('.node');
    }

    if (tmp === node) {
      return false;
    }

    const id = tmp.parentElement.closest('.node').id;

    if (this._bd[id].hijos.indexOf(tmp.id) == this._bd[id].hijos.length - 1) {
      return true;
    }

    return false;
  }

  _fixLines(node) {
    const nivel = Number(node.getAttribute('nivel'));

    for (let i = nivel; i > 0; i--) {
      if (!this._ancestro_nivel_i_es_ultimo(i, node)) {
        this._fix(i, node);
      }
    }
  }

  _fix(i, node) {
    const nivel = Number(node.getAttribute('nivel'));
    const span = document.createElement('span');
    span.style.left = `-${(nivel - i) * 1.4 + .9}em`;

    if (nivel == i && is(node, '.ph')) {
      span.classList.add('ph');
    }

    node.appendChild(span);
  }

}

/***/ }),

/***/ "./src/components/Tree.scss":
/*!**********************************!*\
  !*** ./src/components/Tree.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  box-sizing: border-box;\n  /*--background: var(--background, white);*/ }\n\n#client {\n  height: 100%;\n  overflow: auto;\n  padding: 0.7em;\n  position: relative;\n  box-sizing: border-box; }\n\n.icon {\n  display: inline-block;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/minus.svg */ "./src/components/img/minus.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  width: 0.7em;\n  height: 0.7em;\n  padding: .1em;\n  margin-right: 0.1em;\n  border: 1px solid #aaa;\n  border-radius: 2px;\n  cursor: pointer; }\n  .icon:hover {\n    background-color: #aaa; }\n\n.text {\n  display: inline-block;\n  padding: 0.3em 0.3em;\n  border-radius: 0.2em;\n  cursor: pointer;\n  line-height: 1.3;\n  position: relative;\n  top: -.2em; }\n  .text.sel {\n    background-color: yellowgreen; }\n\n.node {\n  position: relative; }\n  .node > span {\n    position: absolute;\n    border-left: 1px solid #aaa;\n    display: inline-block;\n    height: 1.9em;\n    width: 0;\n    top: -1.1em; }\n    .node > span.ph {\n      top: -.6em;\n      height: 1.4em; }\n  .node:not(.raiz)::before {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    height: 0;\n    width: 0.9em;\n    border-top: 1px solid #aaa;\n    top: 0.7em;\n    left: -0.9em; }\n  .node .hijos {\n    padding-left: 1.4em;\n    position: relative;\n    /*&::before{\r\n            content: '';\r\n            position: absolute;\r\n            display: inline-block;\r\n            height: calc(100% - 0.5em);\r\n            width: 0;\r\n            border-left: 1px solid #aaa;\r\n            top: -0.46em;\r\n            left: 0.45em;\r\n        }*/ }\n  .node.terminal .icon {\n    border-color: transparent;\n    background-color: transparent;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/bullet.svg */ "./src/components/img/bullet.svg")) + ");\n    cursor: default; }\n  .node.terminal .hijos {\n    display: none; }\n  .node.collapsed .icon {\n    background-image: url(" + escape(__webpack_require__(/*! ./img/plus.svg */ "./src/components/img/plus.svg")) + "); }\n  .node.collapsed .hijos {\n    display: none; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/img/abandonar.gif":
/*!******************************************!*\
  !*** ./src/components/img/abandonar.gif ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhDQAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////xQRAgAAAP7/VhQPIEaAnEf/BAAAAAAAAAAAAAACAAAARySKfz8BDyFfBlaAxgM3BgIAAABHJFYUPwHcfwAAin8AAF8GfoAODP8E3H9fBv///wAAAC4gAVtkgf8AAgD///8AjIDHCvdeAAACAQ8hPwEFAAAAfiynF34spxcPIT8BkPD4kgAAAADgggIAZAVwACAAzIDKfcSAxz4ABAAAsCS/Cz8BDyE/AbAkvwtXF78L3IAICacXAAQAALAkvwsNCSiBKABvAQAEmSn3vwAAin/6gGUHvAOKfwAAVhQAAPiSFIFPAFcXAAC5K/a/AHBwAGQF+JICAFQARIHTNv8WAAAAAAAAAAAAAJQDAACbUfa/1TZFAEQKAAAAAAAAAAQAAJtR9r9Y9HAAAAAAAJQDAABU8XAAPwElDAAAAAAAAAAAxoQAAJQDAACbUfa/OxdFAAQAAACUAwAAZAUAABIBAABDF0UAlAMAAHD0cABY9HAAxoQAAKL0cABQ83AAyCf3v8kX9r8AcHAA20zzv1YUAAABAAAAiQiFyCADAAAAAAAABAteAIjycACBUrq/kAUAAAzycAAnS/a/BAteAAAAAAAUEQIAAAD+/1YUDyAggi0kVxcAAAEAAAK0BSAA+JICAN8WaIIAAAwAcAAWgsYDNwZWFAAAAAAAAAgCAAAAAAAAdgIAABQAAAAAAAAAAAAAAAAAAAABAAAA7z3vPeoCEgDgggIAHA+QgigAbwGRKpgFnQWcgiAAbwE/K/e/hQEpAAIAo8IQBQAAaAINAID8UAAcAQAAx4L3vwAATgCc/VAAaAINAAAAAACA/FAAAABOAEEAAAAMAE4A4AUAAAAAAABAAAAAgoT3v0EAAACZhPe/AABOAEEAAABM+XAAAAAAAAAAAACdnUgALAEAACwBAAAEj0MAnZ1IAEijTwCE/FAAlvxQAKucSAD/////AQAAACH5BAEAAAcALAAAAAANAAwAAAhAABMIPECwYEGBAQIkMEhw4IGECg0mCMAw4cIDExkStJhR48aEHhtCvMhwIsWHJEWe3EjSpMaTJlcapOgy5IGAAAA7"

/***/ }),

/***/ "./src/components/img/bullet.svg":
/*!***************************************!*\
  !*** ./src/components/img/bullet.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyIgZGlzcGxheT0ibm9uZSI+Cgk8cGF0aCBkaXNwbGF5PSJpbmxpbmUiIGZpbGw9Im5vbmUiIGQ9Ik0wLDBoMjR2MjRIMFYweiIvPgo8L2c+CjxnIGlkPSJSb3VuZGVkIj4KCTxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiLz4KPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/components/img/check.gif":
/*!**************************************!*\
  !*** ./src/components/img/check.gif ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhDgALAPcAAABuJwH/W/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAIALAAAAAAOAAsAAAg4AAUIHEhQYAAABRMeTFhwIcOBBxEKCECxIQCJEy8GgHiRYEQAGyMmvKiR5EOSHR8KMKlSIMaCAQEAOw=="

/***/ }),

/***/ "./src/components/img/cross.svg":
/*!**************************************!*\
  !*** ./src/components/img/cross.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOC4zLDUuNzFMMTguMyw1LjcxYy0wLjM5LTAuMzktMS4wMi0wLjM5LTEuNDEsMEwxMiwxMC41OUw3LjExLDUuN2MtMC4zOS0wLjM5LTEuMDItMC4zOS0xLjQxLDBsMCwwCgkJYy0wLjM5LDAuMzktMC4zOSwxLjAyLDAsMS40MUwxMC41OSwxMkw1LjcsMTYuODljLTAuMzksMC4zOS0wLjM5LDEuMDIsMCwxLjQxaDBjMC4zOSwwLjM5LDEuMDIsMC4zOSwxLjQxLDBMMTIsMTMuNDFsNC44OSw0Ljg5CgkJYzAuMzksMC4zOSwxLjAyLDAuMzksMS40MSwwbDAsMGMwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwxMy40MSwxMmw0Ljg5LTQuODlDMTguNjgsNi43MywxOC42OCw2LjA5LDE4LjMsNS43MXoiLz4KPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/components/img/done.svg":
/*!*************************************!*\
  !*** ./src/components/img/done.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJIZWFkZXJfeDJGX0JHIiBkaXNwbGF5PSJub25lIj4KCTxyZWN0IHg9Ii0xMzgiIHk9Ii0zMTQiIGRpc3BsYXk9ImlubGluZSIgZmlsbD0iI0YxRjFGMiIgd2lkdGg9IjUyMCIgaGVpZ2h0PSI1MjAiLz4KPC9nPgo8ZyBpZD0iQm91bmRpbmdfQm94ZXMiPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV8zIj4KCTwvZz4KCTxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wLDBoMjR2MjRIMFYweiIvPgo8L2c+CjxnIGlkPSJSb3VuZGVkIj4KCTxnIGlkPSJ1aV94NUZfc3BlY194NUZfaGVhZGVyX2NvcHlfNSI+Cgk8L2c+Cgk8cGF0aCBkPSJNMjAuNDcsNS42M0wyMC40Nyw1LjYzYzAuMzksMC4zOSwwLjM5LDEuMDEsMCwxLjRMOS4xMywxOC4zN2MtMC4zOSwwLjM5LTEuMDEsMC4zOS0xLjQsMGwtNC4yLTQuMgoJCWMtMC4zOS0wLjM5LTAuMzktMS4wMSwwLTEuNGwwLDBjMC4zOS0wLjM5LDEuMDEtMC4zOSwxLjQsMGwzLjUsMy41TDE5LjA3LDUuNjNDMTkuNDYsNS4yNCwyMC4wOCw1LjI0LDIwLjQ3LDUuNjN6IE0xOC4zNiwzLjUxCgkJbC05LjkzLDkuOTNsLTIuNzktMi43OWMtMC43OC0wLjc4LTIuMDUtMC43OC0yLjgzLDBsLTEuNCwxLjRjLTAuNzgsMC43OC0wLjc4LDIuMDUsMCwyLjgzbDUuNiw1LjZjMC43OCwwLjc4LDIuMDUsMC43OCwyLjgzLDAKCQlMMjIuNTksNy43NGMwLjc4LTAuNzgsMC43OC0yLjA1LDAtMi44M2wtMS40LTEuNEMyMC40LDIuNzMsMTkuMTQsMi43MywxOC4zNiwzLjUxeiIvPgo8L2c+CjxnIGlkPSJTaGFycCIgZGlzcGxheT0ibm9uZSI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzQiIGRpc3BsYXk9ImlubGluZSI+Cgk8L2c+Cgk8cGF0aCBkaXNwbGF5PSJpbmxpbmUiIGQ9Ik0xOS43Nyw0LjkzbDEuNCwxLjRMOC40MywxOS4wN2wtNS42LTUuNmwxLjQtMS40bDQuMiw0LjJMMTkuNzcsNC45MyBNMTkuNzcsMi4xTDguNDMsMTMuNDRsLTQuMi00LjIKCQlMMCwxMy40N2w4LjQzLDguNDNMMjQsNi4zM0wxOS43NywyLjF6Ii8+CjwvZz4KPGcgaWQ9Ik91dGxpbmUiIGRpc3BsYXk9Im5vbmUiPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXIiIGRpc3BsYXk9ImlubGluZSI+Cgk8L2c+Cgk8cGF0aCBkaXNwbGF5PSJpbmxpbmUiIGQ9Ik0xOS43Nyw0LjkzbDEuNCwxLjRMOC40MywxOS4wN2wtNS42LTUuNmwxLjQtMS40bDQuMiw0LjJMMTkuNzcsNC45MyBNMTkuNzcsMi4xTDguNDMsMTMuNDRsLTQuMi00LjIKCQlMMCwxMy40N2w4LjQzLDguNDNMMjQsNi4zM0wxOS43NywyLjF6Ii8+CjwvZz4KPGcgaWQ9IkR1b3RvbmUiIGRpc3BsYXk9Im5vbmUiPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV8yIiBkaXNwbGF5PSJpbmxpbmUiPgoJPC9nPgoJPHBhdGggZGlzcGxheT0iaW5saW5lIiBkPSJNMTkuNzcsNC45M2wxLjQsMS40TDguNDMsMTkuMDdsLTUuNi01LjZsMS40LTEuNGw0LjIsNC4yTDE5Ljc3LDQuOTMgTTE5Ljc3LDIuMUw4LjQzLDEzLjQ0bC00LjItNC4yCgkJTDAsMTMuNDdsOC40Myw4LjQzTDI0LDYuMzNMMTkuNzcsMi4xeiIvPgo8L2c+CjxnIGlkPSJGaWxsIiBkaXNwbGF5PSJub25lIj4KCTxnIGlkPSJ1aV94NUZfc3BlY194NUZfaGVhZGVyX2NvcHkiIGRpc3BsYXk9ImlubGluZSI+Cgk8L2c+Cgk8cGF0aCBkaXNwbGF5PSJpbmxpbmUiIGQ9Ik0xOS43Nyw0LjkzbDEuNCwxLjRMOC40MywxOS4wN2wtNS42LTUuNmwxLjQtMS40bDQuMiw0LjJMMTkuNzcsNC45MyBNMTkuNzcsMi4xTDguNDMsMTMuNDRsLTQuMi00LjIKCQlMMCwxMy40N2w4LjQzLDguNDNMMjQsNi4zM0wxOS43NywyLjF6Ii8+CjwvZz4KPGcgaWQ9Im55dF94NUZfZXhwb3J0ZXJfeDVGX2luZm8iIGRpc3BsYXk9Im5vbmUiPgo8L2c+Cjwvc3ZnPgo="

/***/ }),

/***/ "./src/components/img/minus.svg":
/*!**************************************!*\
  !*** ./src/components/img/minus.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOCwxM0g2Yy0wLjU1LDAtMS0wLjQ1LTEtMXYwYzAtMC41NSwwLjQ1LTEsMS0xaDEyYzAuNTUsMCwxLDAuNDUsMSwxdjBDMTksMTIuNTUsMTguNTUsMTMsMTgsMTN6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/components/img/plus.svg":
/*!*************************************!*\
  !*** ./src/components/img/plus.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOCwxM2gtNXY1YzAsMC41NS0wLjQ1LDEtMSwxaDBjLTAuNTUsMC0xLTAuNDUtMS0xdi01SDZjLTAuNTUsMC0xLTAuNDUtMS0xdjBjMC0wLjU1LDAuNDUtMSwxLTFoNVY2YzAtMC41NSwwLjQ1LTEsMS0xaDAKCQljMC41NSwwLDEsMC40NSwxLDF2NWg1YzAuNTUsMCwxLDAuNDUsMSwxdjBDMTksMTIuNTUsMTguNTUsMTMsMTgsMTN6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/components/servicios-mock.js":
/*!******************************************!*\
  !*** ./src/components/servicios-mock.js ***!
  \******************************************/
/*! exports provided: getCentros, getNiveles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCentros", function() { return getCentros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNiveles", function() { return getNiveles; });
const jerarquia = JSON.parse(`[ { "_id" : { "$oid" : "5a534ede4c84b9263bedb8a8"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "71775" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "70671" , "NOMBRECENTRO" : "GESTION DE PROYECTOS Y REMEDIACION " , "TIPOCENTRO" : "A" , "RUTA" : "70671,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedae00"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08187" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "71775" , "NOMBRECENTRO" : "DIR. GESTIÓN DE PROYECTOS Y REMEDIACIÓN " , "TIPOCENTRO" : "E" , "RUTA" : "71775,70671,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "80500"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb04e"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08743" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "72777" , "NOMBRECENTRO" : "DIR. GESTIÓN OPERATIVA DE RED " , "TIPOCENTRO" : "E" , "RUTA" : "72777,73777,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "92840"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb00a"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08717" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "72792" , "NOMBRECENTRO" : "DIR. IMPLANTACIÓN DE GESTIÓN OPERATIVA EN RED " , "TIPOCENTRO" : "E" , "RUTA" : "72792,73792,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "73792"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedba07"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "72777" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "73777" , "NOMBRECENTRO" : "DIRECCION GESTION OPERATIVA DE RED " , "TIPOCENTRO" : "A" , "RUTA" : "73777,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedba11"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "72792" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "73792" , "NOMBRECENTRO" : "IMPLANTACION DE GESTION OPERATIVA EN RED " , "TIPOCENTRO" : "A" , "RUTA" : "73792,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb050"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08721" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "74992" , "NOMBRECENTRO" : "GESTIÓN OPERATIVA EN RED II " , "TIPOCENTRO" : "E" , "RUTA" : "74992,75641,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "75641"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedbd8e"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "74992" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "75641" , "NOMBRECENTRO" : "GESTION OPERATIVA EN RED II " , "TIPOCENTRO" : "A" , "RUTA" : "75641,80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc07f"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76526" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76525" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES CENTRO " , "TIPOCENTRO" : "A" , "RUTA" : "76525,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bed9c3b"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "00930" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "76526" , "NOMBRECENTRO" : "DIR. COORD. MEDIOS MATERIALES CENTRO " , "TIPOCENTRO" : "E" , "RUTA" : "76526,76525,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "76525"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc081"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76528" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76527" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES LEVANTE " , "TIPOCENTRO" : "A" , "RUTA" : "76527,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bed9c21"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "00931" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "76528" , "NOMBRECENTRO" : "DIR. COORD. MEDIOS MATERIALES LEVANTE " , "TIPOCENTRO" : "E" , "RUTA" : "76528,76527,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "76527"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc097"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76530" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76529" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES CATALUÑA " , "TIPOCENTRO" : "A" , "RUTA" : "76529,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bed9c2d"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "00932" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "76530" , "NOMBRECENTRO" : "DIR. COORD. MEDIOS MATERIALES CATALUÑA " , "TIPOCENTRO" : "E" , "RUTA" : "76530,76529,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "76529"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc07b"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76532" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76531" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES NORTE " , "TIPOCENTRO" : "A" , "RUTA" : "76531,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bed9c26"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "00933" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "76532" , "NOMBRECENTRO" : "DIR. COORD. MEDIOS MATERIALES NORTE " , "TIPOCENTRO" : "E" , "RUTA" : "76532,76531,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "76531"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc088"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76534" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76533" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES SUR " , "TIPOCENTRO" : "A" , "RUTA" : "76533,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bed9c29"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "00936" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "76534" , "NOMBRECENTRO" : "DIR. COORD.MEDIOS MATERIALES SUR " , "TIPOCENTRO" : "E" , "RUTA" : "76534,76533,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "76533"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc39d"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "78083" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "76711" , "NOMBRECENTRO" : "DIR COORDINACION MEDIOS MATERIALES " , "TIPOCENTRO" : "A" , "RUTA" : "76711,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc37f"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "77642" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "77641" , "NOMBRECENTRO" : "DIR COORDINACION Y PROYECTOS " , "TIPOCENTRO" : "A" , "RUTA" : "77641,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedadec"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08154" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "77642" , "NOMBRECENTRO" : "DIR. COORDINACIÓN Y PROYECTOS " , "TIPOCENTRO" : "E" , "RUTA" : "77642,77641,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "77641"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc382"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "77644" , "IDSUBSECCION" : "00" , "CODIGO" : "GS08 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "77643" , "NOMBRECENTRO" : "DIR PLANES DE REMEDIACION " , "TIPOCENTRO" : "A" , "RUTA" : "77643,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "12 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb263"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "09590" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "77644" , "NOMBRECENTRO" : "BPO PLANES REMEDIACIÓN " , "TIPOCENTRO" : "E" , "RUTA" : "77644,77643,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedae57"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "08218" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "77644" , "NOMBRECENTRO" : "DIR. PLANES DE REMEDIACIÓN " , "TIPOCENTRO" : "E" , "RUTA" : "77644,77643,80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "77643"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb295"} , "IDEMPRESA" : "00000" , "IDCENTRO" : "09550" , "IDSUBSECCION" : "00" , "CODIGO" : " " , "DESCRIPCIONEMPRESA" : "BANKIA " , "I DCENTROPADRE" : "78083" , "NOMBRECENTRO" : "DIR. COORDINACIÓN MEDIOS MATERIALES " , "TIPOCENTRO" : "E" , "RUTA" : "78083,76711,84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "13 " , "CENTROANALITICO" : "84062"} , { "_id" : { "$oid" : "5a534ede4c84b9263bedbe48"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "75641" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80230" , "NOMBRECENTRO" : "GESTION OPERATIVA EN RED II " , "TIPOCENTRO" : "A" , "RUTA" : "80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedbb35"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "73777" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80230" , "NOMBRECENTRO" : "DIRECCION GESTION OPERATIVA DE RED " , "TIPOCENTRO" : "A" , "RUTA" : "80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedbb0f"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "73792" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80230" , "NOMBRECENTRO" : "IMPLANTACION DE GESTION OPERATIVA EN RED " , "TIPOCENTRO" : "A" , "RUTA" : "80230,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc377"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "77643" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80500" , "NOMBRECENTRO" : "DIR PLANES DE REMEDIACION " , "TIPOCENTRO" : "A" , "RUTA" : "80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc36a"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "77641" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80500" , "NOMBRECENTRO" : "DIR COORDINACION Y PROYECTOS " , "TIPOCENTRO" : "A" , "RUTA" : "80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedb67a"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "70671" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "80500" , "NOMBRECENTRO" : "GESTION DE PROYECTOS Y REMEDIACION " , "TIPOCENTRO" : "A" , "RUTA" : "80500,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc101"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76711" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DIR COORDINACION MEDIOS MATERIALES " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc09a"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76533" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES SUR " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc07a"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76531" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES NORTE " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc077"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76529" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES CATALUÑA " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc076"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76527" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES LEVANTE " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc074"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "76525" , "IDSUBSECCION" : "00" , "CODIGO" : "GS71 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "84062" , "NOMBRECENTRO" : "DPTO COORD MEDIOS MATERIALES CENTRO " , "TIPOCENTRO" : "A" , "RUTA" : "84062,91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "11 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc79b"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "80500" , "IDSUBSECCION" : "00" , "CODIGO" : "GS07 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "91378" , "NOMBRECENTRO" : "OFICINA PROYECTO GESTION OPERATIVA EN RED " , "TIPOCENTRO" : "A" , "RUTA" : "91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "10 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc79a"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "80230" , "IDSUBSECCION" : "00" , "CODIGO" : "GS07 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "91378" , "NOMBRECENTRO" : "DIRECCION GESTION OPERATIVA DE RED " , "TIPOCENTRO" : "A" , "RUTA" : "91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "10 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc8bd"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "84062" , "IDSUBSECCION" : "00" , "CODIGO" : "GS07 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "91378" , "NOMBRECENTRO" : "DIR COORDINACION MEDIOS MATERIALES " , "TIPOCENTRO" : "A" , "RUTA" : "91378,92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "10 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc94f"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "91378" , "IDSUBSECCION" : "00" , "CODIGO" : "GS06 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "92658" , "NOMBRECENTRO" : "DIRECCION GESTION OPERATIVA DE RED " , "TIPOCENTRO" : "A" , "RUTA" : "92658,98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "09 " , "CENTROANALITICO" : " "} , { "_id" : { "$oid" : "5a534ede4c84b9263bedc9e7"} , "IDEMPRESA" : "90001" , "IDCENTRO" : "92658" , "IDSUBSECCION" : "00" , "CODIGO" : "GS05 " , "DESCRIPCIONEMPRESA" : "ESTRUCTURA ORGANIZATIVA DEL GRUPO " , "I DCENTROPADRE" : "98178" , "NOMBRECENTRO" : "DIRECCION GESTION OPERATIVA DE RED " , "TIPOCENTRO" : "A" , "RUTA" : "98178,92840,99008,99964,99020,99991,99999,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000,00000" , "IDNIVEL" : "08 " , "CENTROANALITICO" : " "}]`);
const niveles = JSON.parse(`[ { "_id" : { "$oid" : "5a534df54c84b9263bed9839"} , "CODIGO" : "01 " , "ABREVIATURA" : "TG " , "DESCRIPCION" : "TOTAL GRUPO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983a"} , "CODIGO" : "02 " , "ABREVIATURA" : "E " , "DESCRIPCION" : "ENTIDADES "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983b"} , "CODIGO" : "03 " , "ABREVIATURA" : "DG " , "DESCRIPCION" : "DIRECCIONES GENERALES "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983c"} , "CODIGO" : "04 " , "ABREVIATURA" : "TN " , "DESCRIPCION" : "TOTAL NEGOCIO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983d"} , "CODIGO" : "05 " , "ABREVIATURA" : "D " , "DESCRIPCION" : "DIRECCIONES "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983f"} , "CODIGO" : "06 " , "ABREVIATURA" : "DR " , "DESCRIPCION" : "DIRECCIONES DE RED "} , { "_id" : { "$oid" : "5a534df54c84b9263bed983e"} , "CODIGO" : "07 " , "ABREVIATURA" : "GN " , "DESCRIPCION" : "GRUPO NEGOCIO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9840"} , "CODIGO" : "08 " , "ABREVIATURA" : "DT " , "DESCRIPCION" : "DIR TERRITORIALES/ DIR NEGOCIO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9841"} , "CODIGO" : "09 " , "ABREVIATURA" : "DA " , "DESCRIPCION" : "DIRECCIONES ADJUNTAS "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9842"} , "CODIGO" : "10 " , "ABREVIATURA" : "DZ " , "DESCRIPCION" : "DIRECCIONES DE ZONA "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9843"} , "CODIGO" : "11 " , "ABREVIATURA" : "GD " , "DESCRIPCION" : "GRUPO DISTRITO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9844"} , "CODIGO" : "12 " , "ABREVIATURA" : "D " , "DESCRIPCION" : "DISTRITO "} , { "_id" : { "$oid" : "5a534df54c84b9263bed9845"} , "CODIGO" : "13 " , "ABREVIATURA" : "O " , "DESCRIPCION" : "OFICINA "}]`);

const getCentros = cuspide => {
  return Promise.resolve(jerarquia);
};

const getNiveles = () => {
  return Promise.resolve(niveles);
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Tree, Modal, popup, BeanCentros */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Tree */ "./src/components/Tree.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return _components_Tree__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popup", function() { return _components_Modal__WEBPACK_IMPORTED_MODULE_1__["popup"]; });

/* harmony import */ var _components_BeanCentros__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/BeanCentros */ "./src/components/BeanCentros.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BeanCentros", function() { return _components_BeanCentros__WEBPACK_IMPORTED_MODULE_2__["default"]; });




window.customElements.define('bk-wc-ui-tree', _components_Tree__WEBPACK_IMPORTED_MODULE_0__["default"]);
window.customElements.define('bk-wc-ui-modal', _components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"]);
window.customElements.define('bk-wc-ui-bean-centros', _components_BeanCentros__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ })

/******/ });
});