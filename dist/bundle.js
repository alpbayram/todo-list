/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 276:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 673:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/fonts.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 772:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/content.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 813:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/leftbar.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 916:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/header.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 950:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/rightbar.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 978:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/style.css
var style = __webpack_require__(276);
;// ./src/styles/style.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(style/* default */.A, options);




       /* harmony default export */ const styles_style = (style/* default */.A && style/* default */.A.locals ? style/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css
var styles_reset = __webpack_require__(978);
;// ./src/styles/reset.css

      
      
      
      
      
      
      
      
      

var reset_options = {};

reset_options.styleTagTransform = (styleTagTransform_default());
reset_options.setAttributes = (setAttributesWithoutAttributes_default());
reset_options.insert = insertBySelector_default().bind(null, "head");
reset_options.domAPI = (styleDomAPI_default());
reset_options.insertStyleElement = (insertStyleElement_default());

var reset_update = injectStylesIntoStyleTag_default()(styles_reset/* default */.A, reset_options);




       /* harmony default export */ const src_styles_reset = (styles_reset/* default */.A && styles_reset/* default */.A.locals ? styles_reset/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/fonts.css
var fonts = __webpack_require__(673);
;// ./src/styles/fonts.css

      
      
      
      
      
      
      
      
      

var fonts_options = {};

fonts_options.styleTagTransform = (styleTagTransform_default());
fonts_options.setAttributes = (setAttributesWithoutAttributes_default());
fonts_options.insert = insertBySelector_default().bind(null, "head");
fonts_options.domAPI = (styleDomAPI_default());
fonts_options.insertStyleElement = (insertStyleElement_default());

var fonts_update = injectStylesIntoStyleTag_default()(fonts/* default */.A, fonts_options);




       /* harmony default export */ const styles_fonts = (fonts/* default */.A && fonts/* default */.A.locals ? fonts/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/leftbar.css
var leftbar = __webpack_require__(813);
;// ./src/styles/leftbar.css

      
      
      
      
      
      
      
      
      

var leftbar_options = {};

leftbar_options.styleTagTransform = (styleTagTransform_default());
leftbar_options.setAttributes = (setAttributesWithoutAttributes_default());
leftbar_options.insert = insertBySelector_default().bind(null, "head");
leftbar_options.domAPI = (styleDomAPI_default());
leftbar_options.insertStyleElement = (insertStyleElement_default());

var leftbar_update = injectStylesIntoStyleTag_default()(leftbar/* default */.A, leftbar_options);




       /* harmony default export */ const styles_leftbar = (leftbar/* default */.A && leftbar/* default */.A.locals ? leftbar/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/rightbar.css
var rightbar = __webpack_require__(950);
;// ./src/styles/rightbar.css

      
      
      
      
      
      
      
      
      

var rightbar_options = {};

rightbar_options.styleTagTransform = (styleTagTransform_default());
rightbar_options.setAttributes = (setAttributesWithoutAttributes_default());
rightbar_options.insert = insertBySelector_default().bind(null, "head");
rightbar_options.domAPI = (styleDomAPI_default());
rightbar_options.insertStyleElement = (insertStyleElement_default());

var rightbar_update = injectStylesIntoStyleTag_default()(rightbar/* default */.A, rightbar_options);




       /* harmony default export */ const styles_rightbar = (rightbar/* default */.A && rightbar/* default */.A.locals ? rightbar/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/header.css
var header = __webpack_require__(916);
;// ./src/styles/header.css

      
      
      
      
      
      
      
      
      

var header_options = {};

header_options.styleTagTransform = (styleTagTransform_default());
header_options.setAttributes = (setAttributesWithoutAttributes_default());
header_options.insert = insertBySelector_default().bind(null, "head");
header_options.domAPI = (styleDomAPI_default());
header_options.insertStyleElement = (insertStyleElement_default());

var header_update = injectStylesIntoStyleTag_default()(header/* default */.A, header_options);




       /* harmony default export */ const styles_header = (header/* default */.A && header/* default */.A.locals ? header/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles/content.css
var content = __webpack_require__(772);
;// ./src/styles/content.css

      
      
      
      
      
      
      
      
      

var content_options = {};

content_options.styleTagTransform = (styleTagTransform_default());
content_options.setAttributes = (setAttributesWithoutAttributes_default());
content_options.insert = insertBySelector_default().bind(null, "head");
content_options.domAPI = (styleDomAPI_default());
content_options.insertStyleElement = (insertStyleElement_default());

var content_update = injectStylesIntoStyleTag_default()(content/* default */.A, content_options);




       /* harmony default export */ const styles_content = (content/* default */.A && content/* default */.A.locals ? content/* default */.A.locals : undefined);

;// ./src/images/checked.svg
const checked_namespaceObject = __webpack_require__.p + "images/checked.1ccf8b8c13252583ad6a.svg";
;// ./src/scripts/model.js
class Projects {
	static projectList = [];
	constructor(title, system, tasks) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.system = system;
		this.tasks = tasks;
		Projects.projectList.push(this);
	}
}
const Inbox = new Projects("Inbox", true, []);
const Inbox2 = new Projects("123Inbox", true, []);

class Todo {
	constructor(title, note, dueDate, important, stepArray, projectIndex, completed) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.note = note;
		this.dueDate = dueDate;
		this.important = important;
		this.stepArray = stepArray;
		this.completed = completed;
		this.projectId = Projects.projectList[projectIndex].id;
		Projects.projectList[projectIndex].tasks.push(this);
	}
}

;// ./src/images/header-inbox.svg
const header_inbox_namespaceObject = __webpack_require__.p + "images/header-inbox.7aa75672d4393c97bb5f.svg";
;// ./src/images/list-ul-alt-svgrepo-com.svg
const list_ul_alt_svgrepo_com_namespaceObject = __webpack_require__.p + "images/list-ul-alt-svgrepo-com.6b5e62b6914644397209.svg";
;// ./src/images/header-important.svg
const header_important_namespaceObject = __webpack_require__.p + "images/header-important.29f393028beb5b35ff45.svg";
;// ./src/images/header-calendar.svg
const header_calendar_namespaceObject = __webpack_require__.p + "images/header-calendar.6ea347d231b382199b4c.svg";
;// ./src/images/header-completed.svg
const header_completed_namespaceObject = __webpack_require__.p + "images/header-completed.9a688f42e88797175505.svg";
;// ./src/images/chevron-right.svg
const chevron_right_namespaceObject = __webpack_require__.p + "images/chevron-right.5761de503fd1971e25f1.svg";
;// ./src/images/header-list.svg
const header_list_namespaceObject = __webpack_require__.p + "images/header-list.e9d7461538b82592f849.svg";
;// ./node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

;// ./node_modules/date-fns/constants.js
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

;// ./node_modules/date-fns/constructFrom.js


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_constructFrom = ((/* unused pure expression or super */ null && (constructFrom)));

;// ./node_modules/date-fns/toDate.js


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_toDate = ((/* unused pure expression or super */ null && (toDate)));

;// ./node_modules/date-fns/formatISO.js



/**
 * The {@link formatISO} function options.
 */

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string (in local time zone)
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
function formatISO(date, options) {
  const date_ = toDate(date, options?.in);

  if (isNaN(+date_)) {
    throw new RangeError("Invalid time value");
  }

  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  let result = "";
  let tzOffset = "";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  // Representation is either 'date' or 'complete'
  if (representation !== "time") {
    const day = addLeadingZeros(date_.getDate(), 2);
    const month = addLeadingZeros(date_.getMonth() + 1, 2);
    const year = addLeadingZeros(date_.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  // Representation is either 'time' or 'complete'
  if (representation !== "date") {
    // Add the timezone.
    const offset = date_.getTimezoneOffset();

    if (offset !== 0) {
      const absoluteOffset = Math.abs(offset);
      const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
      const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      // If less than 0, the sign is +, because it is ahead of time.
      const sign = offset < 0 ? "+" : "-";

      tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
    } else {
      tzOffset = "Z";
    }

    const hour = addLeadingZeros(date_.getHours(), 2);
    const minute = addLeadingZeros(date_.getMinutes(), 2);
    const second = addLeadingZeros(date_.getSeconds(), 2);

    // If there's also date, separate it with time with 'T'
    const separator = result === "" ? "" : "T";

    // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
    const time = [hour, minute, second].join(timeDelimiter);

    // HHmmss or HH:mm:ss.
    result = `${result}${separator}${time}${tzOffset}`;
  }

  return result;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_formatISO = ((/* unused pure expression or super */ null && (formatISO)));

;// ./node_modules/date-fns/constructNow.js


/**
 * @name constructNow
 * @category Generic Helpers
 * @summary Constructs a new current date using the passed value constructor.
 * @pure false
 *
 * @description
 * The function constructs a new current date using the constructor from
 * the reference date. It helps to build generic functions that accept date
 * extensions and use the current date.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @param date - The reference date to take constructor from
 *
 * @returns Current date initialized using the given date constructor
 *
 * @example
 * import { constructNow, isSameDay } from 'date-fns'
 *
 * function isToday<DateType extends Date>(
 *   date: DateArg<DateType>,
 * ): boolean {
 *   // If we were to use `new Date()` directly, the function would  behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
function constructNow(date) {
  return constructFrom(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_constructNow = ((/* unused pure expression or super */ null && (constructNow)));

;// ./node_modules/date-fns/_lib/normalizeDates.js


function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

;// ./node_modules/date-fns/startOfDay.js


/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfDay = ((/* unused pure expression or super */ null && (startOfDay)));

;// ./node_modules/date-fns/isSameDay.js



/**
 * The {@link isSameDay} function options.
 */

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isSameDay = ((/* unused pure expression or super */ null && (isSameDay)));

;// ./node_modules/date-fns/isToday.js




/**
 * The {@link isToday} function options.
 */

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date, options) {
  return isSameDay(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isToday = ((/* unused pure expression or super */ null && (isToday)));

;// ./node_modules/date-fns/parseISO.js




/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const invalidDate = () => constructFrom(options?.in, NaN);

  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(+date)) return invalidDate();

  const timestamp = +date;
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = toDate(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate(),
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds(),
    );
    return result;
  }

  return toDate(timestamp + time + offset, options?.in);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_parseISO = ((/* unused pure expression or super */ null && (parseISO)));

;// ./node_modules/date-fns/addDays.js



/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_addDays = ((/* unused pure expression or super */ null && (addDays)));

;// ./node_modules/date-fns/isTomorrow.js




/**
 * The {@link isTomorrow} function options.
 */

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(date, options) {
  return isSameDay(
    date,
    addDays(constructNow(options?.in || date), 1),
    options,
  );
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isTomorrow = ((/* unused pure expression or super */ null && (isTomorrow)));

;// ./node_modules/date-fns/addMonths.js



/**
 * The {@link addMonths} function options.
 */

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 * @param options - The options object
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_addMonths = ((/* unused pure expression or super */ null && (addMonths)));

;// ./node_modules/date-fns/isWithinInterval.js


/**
 * The {@link isWithinInterval} function options.
 */

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param date - The date to check
 * @param interval - The interval to check
 * @param options - An object with options
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => false
 *
 * @example
 * // For date equal to the interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to the interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
function isWithinInterval(date, interval, options) {
  const time = +toDate(date, options?.in);
  const [startTime, endTime] = [
    +toDate(interval.start, options?.in),
    +toDate(interval.end, options?.in),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isWithinInterval = ((/* unused pure expression or super */ null && (isWithinInterval)));

;// ./src/scripts/inbox.js














function renderProjectTasks(projectId) {
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == projectId) {
			return item;
		}
	});
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	delete mainContent.dataset.view;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	const icon = projectIndex == 0 ? header_inbox_namespaceObject : header_list_namespaceObject;
	headerIconImg.setAttribute("src", icon);
	headerText.textContent = Projects.projectList[projectIndex].title;

	const today = formatISO(new Date(), { representation: "date" });
	const dateInput = document.querySelector(".date-input");
	dateInput.setAttribute("min", today);
	dateInput.removeAttribute("max");
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList[projectIndex].tasks.forEach((item) => {
		renderListItem(item);
	});
}
function renderSortedProjects(projectId, state) {
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	mainContent.dataset.view = state;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	const dateInput = document.querySelector(".date-input");
	if (state == "important") {
		headerIconImg.setAttribute("src", header_important_namespaceObject);
		headerText.textContent = "Important";
		dateInput.removeAttribute("max");
	} else if (state == "upcoming") {
		headerIconImg.setAttribute("src", header_calendar_namespaceObject);
		headerText.textContent = "Upcoming";
		const addOneMonths = formatISO(addMonths(new Date(), 1), { representation: "date" });
		dateInput.setAttribute("max", addOneMonths);
	} else if (state == "completed") {
		headerIconImg.setAttribute("src", header_completed_namespaceObject);
		headerText.textContent = "Completed";
		dateInput.removeAttribute("max");
	}

	const today = formatISO(new Date(), { representation: "date" });

	dateInput.setAttribute("min", today);

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList.forEach(function (itemProject) {
		const isAvailable = itemProject.tasks.find(function (itemTask) {
			if (state == "important") {
				if (itemTask.important == true) {
					return true;
				}
			} else if (state == "upcoming") {
				const addOneMonths = addMonths(new Date(), 1);

				if (itemTask.dueDate != null) {
					const dueDate = parseISO(itemTask.dueDate);
					if (
						isWithinInterval(dueDate, {
							start: new Date(),
							end: addOneMonths,
						})
					) {
						return true;
					}
				}
			} else if (state == "completed") {
				if (itemTask.completed == true) {
					return true;
				}
			}
		});
		if (isAvailable) {
			renderListGroup(itemProject, state);
		}
	});
}
function renderGroupProjectTasks(projectId, state, collapsed, loaded) {
	Projects.projectList.forEach((itemProject) => {
		itemProject.tasks.forEach((itemTask) => {
			if (state == "important") {
				if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					collapsed == false &&
					loaded == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			} else if (state == "upcoming") {
				const addOneMonths = addMonths(new Date(), 1);
				const dueDate = itemTask.dueDate != null ? parseISO(itemTask.dueDate) : null;
				if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == false &&
					collapsed == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			} else if (state == "completed") {
				if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == false &&
					collapsed == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			}
		});
	});
}

function renderListGroup(groupItem, state) {
	const isListGroupExist = document.querySelector(`.task-list-group[data-id="${groupItem.id}"]`);
	const projectIndex = Projects.projectList.findIndex(function (item, index, array) {
		return item == groupItem;
	});
	if (isListGroupExist !== null) {
		UpdateTaskListGroupIndicator(groupItem.tasks[0], state);
		if (!isListGroupExist.classList.contains("collapsed")) {
			renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
		} else if (isListGroupExist.classList.contains("collapsed")) {
			if (isListGroupExist.dataset.loaded == "true") {
				renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				const lastItemDisplay = document.querySelector(
					`[data-list-id="${Projects.projectList[projectIndex].tasks.at(-1).id}"]`
				);
				lastItemDisplay.style.display = "none";
			}
		}
	} else {
		const content = document.querySelector(".content");
		const taskListGroup = document.createElement("div");
		taskListGroup.classList.add("task-list-group", "collapsed");
		taskListGroup.dataset.loaded = false;
		taskListGroup.dataset.id = groupItem.id;
		const taskListGroupIcon = document.createElement("div");
		taskListGroupIcon.classList.add("icon");
		taskListGroup.appendChild(taskListGroupIcon);
		const taskListGroupIconImg = document.createElement("img");
		taskListGroupIconImg.setAttribute("src", chevron_right_namespaceObject);
		taskListGroupIcon.appendChild(taskListGroupIconImg);
		const taskListGroupTextContainer = document.createElement("div");
		taskListGroupTextContainer.classList.add("group-text-container");
		const taskListGroupTextContainerP1 = document.createElement("p");
		const taskListGroupTextContainerP2 = document.createElement("p");

		taskListGroupTextContainerP1.textContent = groupItem.title;

		const availableTaskCount = Projects.projectList.reduce(function (acc, projectItem) {
			const count = projectItem.tasks.filter(function (itemTask) {
				if (groupItem.id == projectItem.id) {
					if (state == "important") {
						if (itemTask.important == true) {
							return itemTask;
						}
					} else if (state == "upcoming") {
						const addOneMonths = addMonths(new Date(), 1);
						const dueDate =
							itemTask.dueDate != null ? parseISO(itemTask.dueDate) : null;
						if (
							itemTask.dueDate != null &&
							isWithinInterval(dueDate, {
								start: new Date(),
								end: addOneMonths,
							})
						) {
							return itemTask;
						}
					} else if (state == "completed") {
						if (itemTask.completed == true) {
							return itemTask;
						}
					}
				}
			}).length;
			return count + acc;
		}, 0);

		taskListGroupTextContainerP2.textContent = availableTaskCount;
		taskListGroupTextContainer.appendChild(taskListGroupTextContainerP1);
		taskListGroupTextContainer.appendChild(taskListGroupTextContainerP2);
		taskListGroup.appendChild(taskListGroupTextContainer);
		content.appendChild(taskListGroup);
	}
}

function renderListItem(listItem) {
	console.log("buraya giriyor mu");
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == listItem.projectId) {
			return item;
		}
	});
	const content = document.querySelector(".content");
	const taskListItem = document.createElement("div");
	taskListItem.classList.add("task-list-item");
	taskListItem.dataset.listId = listItem.id;
	const taskListItemIcon = document.createElement("div");
	const taskListItemTextContainer = document.createElement("div");
	const taskListItemImportant = document.createElement("div");

	taskListItemIcon.classList.add("icon");
	taskListItem.appendChild(taskListItemIcon);
	const taskListItemIconInput = document.createElement("input");

	taskListItemIconInput.setAttribute("type", "checkbox");
	listItem.completed == true
		? (taskListItemIconInput.checked = true)
		: (taskListItemIconInput.checked = false);
	taskListItemIconInput.classList.add("checkbox");
	taskListItemIconInput.id = "checkbox";

	const taskListItemIconLabel = document.createElement("label");
	taskListItemIconLabel.setAttribute("for", "checkbox");
	taskListItemIcon.appendChild(taskListItemIconInput);
	taskListItemIcon.appendChild(taskListItemIconLabel);

	taskListItemTextContainer.classList.add("item-text-container");
	taskListItem.appendChild(taskListItemTextContainer);
	const taskListItemTextContainerP = document.createElement("p");
	taskListItemTextContainerP.textContent = listItem.title;
	const taskListItemTextContainerProjectName = document.createElement("div");

	const projectDetailArray = [];
	projectDetailArray.push(Projects.projectList[projectIndex].title);
	if (listItem.dueDate != null) {
		const result = parseISO(listItem.dueDate);
		if (isToday(result)) {
			projectDetailArray.push("Bugün");
		} else if (isTomorrow(result)) {
			projectDetailArray.push("Yarın");
		} else {
			projectDetailArray.push(listItem.dueDate);
		}
	}

	const joinedProjectDetailArray =
		projectDetailArray.length != 1 ? projectDetailArray.join(" \u2022 ") : projectDetailArray;

	taskListItemTextContainerProjectName.textContent = joinedProjectDetailArray;
	taskListItemTextContainerProjectName.classList.add("project-name");
	taskListItemTextContainer.appendChild(taskListItemTextContainerP);
	taskListItemTextContainer.appendChild(taskListItemTextContainerProjectName);

	taskListItemImportant.classList.add("important");

	const taskListItemImportantInput = document.createElement("input");

	taskListItemImportantInput.setAttribute("type", "checkbox");
	listItem.important == true
		? (taskListItemImportantInput.checked = true)
		: (taskListItemImportantInput.checked = false);
	taskListItemImportantInput.classList.add("important-checkbox");
	taskListItemImportantInput.id = "important-checkbox";

	const taskListItemImportantLabel = document.createElement("label");
	taskListItemImportantLabel.setAttribute("for", "important-checkbox");
	taskListItemImportant.appendChild(taskListItemImportantInput);
	taskListItemImportant.appendChild(taskListItemImportantLabel);
	taskListItem.appendChild(taskListItemImportant);

	const pushToDom = content.querySelector(`[data-id="${Projects.projectList[projectIndex].id}"]`);
	if (pushToDom != null) {
		pushToDom.insertAdjacentElement("afterend", taskListItem);
	} else {
		content.appendChild(taskListItem);
	}
}

function UpdateContent(item, state) {
	if (state == "important" && item.important==false) {
		document.querySelector(`[data-list-id="${item.id}"]`).remove();
		UpdateTaskListGroupIndicator(item, state);
	} else if (state == "upcoming") {
		
	} else if (state == "completed" && item.completed==false) {
		document.querySelector(`[data-list-id="${item.id}"]`).remove();
		UpdateTaskListGroupIndicator(item, state);
	} else {
	}
}
function UpdateTaskListGroupIndicator(item, state) {
	const groupList = document.querySelector(`.task-list-group[data-id="${item.projectId}"]`);
	const indicator = document.querySelector(
		`.task-list-group[data-id="${item.projectId}"] .group-text-container p:nth-child(2)`
	);
	const availableTaskCount = Projects.projectList.reduce(function (acc, projectItem) {
		const count = projectItem.tasks.filter(function (item) {
			if (groupList.dataset.id == projectItem.id) {
				if (state == "important") {
					if (item.important == true) {
						return true;
					}
				} else if (state == "upcoming") {
					const addOneMonths = addMonths(new Date(), 1);
					const dueDate = item.dueDate != null ? parseISO(item.dueDate) : null;
					if (
						item.dueDate != null &&
						isWithinInterval(dueDate, {
							start: new Date(),
							end: addOneMonths,
						})
					) {
						return true;
					}
				} else if (state == "completed") {
					if (item.completed == true) {
						return true;
					}
				}
			}
		}).length;
		return count + acc;
	}, 0);
	if (availableTaskCount == 0) {
		groupList.remove();
	} else {
		indicator.textContent = availableTaskCount;
	}
}

;// ./src/scripts/leftbar.js


function renderProjectList() {
	Projects.projectList.forEach((item, index) => {
		if (index > 0) {
			renderProjectListItem(item);
		}
	});
}

function renderProjectListItem(listItem) {
	const projectList = document.querySelector(".project-list");
	const projectListItem = document.createElement("div");
	projectListItem.classList.add("list-item", "menu-button");
	projectListItem.dataset.id = listItem.id;

	const projectListItemIcon = document.createElement("div");
	projectListItemIcon.classList.add("icon");
	const projectListItemIconImg = document.createElement("img");
	projectListItemIconImg.setAttribute("src", list_ul_alt_svgrepo_com_namespaceObject);
	const projectListItemP = document.createElement("p");
	projectListItemP.textContent = listItem.title;
	projectListItem.appendChild(projectListItemIcon);
	projectListItem.appendChild(projectListItemP);
	projectListItemIcon.appendChild(projectListItemIconImg);
	projectList.appendChild(projectListItem);
}

;// ./src/scripts/helper.js
function toggleRightBar() {
	const rightBar = document.querySelector(".right-bar");
	rightBar.dataset.state == "open"
		? (rightBar.dataset.state = "close")
		: (rightBar.dataset.state = "open");
}

;// ./src/scripts/index.js













("./inbox.js");
renderProjectTasks(Projects.projectList[0].id);
renderProjectList();
const inbox = document.querySelector(".inbox");
const important = document.querySelector(".important");
const upcoming = document.querySelector(".upcoming");
const completed = document.querySelector(".completed");
const leftBar = document.querySelector(".left-bar");
const newInputButton = document.querySelector(".new-list img");
const newInput = document.querySelector(".new-list input");
const addATaskInputWrapper = document.querySelector(".add-a-task-input-wrapper");
const addATaskInput = document.querySelector(".add-a-task-input");
const newProjectInput = document.querySelector(".new-project-input");
const dateInputP = document.querySelector(".add-a-task-submit-wrapper p");
inbox.dataset.id = Projects.projectList[0].id;
important.dataset.id = Projects.projectList[0].id;
upcoming.dataset.id = Projects.projectList[0].id;
completed.dataset.id = Projects.projectList[0].id;
document.addEventListener("click", domControl);
document.addEventListener("keyup", domControl);
const dateIcon = document.querySelector(".add-a-task-submit-wrapper img");
function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	} else if (event.target.matches(".menu-button")) {
		if (event.target.classList.contains("important")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "important");
		} else if (event.target.classList.contains("upcoming")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "upcoming");
		} else if (event.target.classList.contains("completed")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "completed");
		} else {
			renderProjectTasks(event.target.dataset.id);
		}
		if (!event.target.classList.contains("selected")) {
			const menuButtons = document.querySelectorAll(".menu-button");
			menuButtons.forEach(function (item, index) {
				item.classList.remove("selected");
			});
			event.target.classList.add("selected");
		}
		console.log(Projects.projectList);
	} else if (
		event.target.matches(".add-a-task-button") ||
		(event.key === "Enter" && event.target.matches(".add-a-task-input"))
	) {
		const inputText = document.querySelector(".add-a-task-input");
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				console.log(item);
				return item;
			}
		});
		const dateInput = document.querySelector(".date-input");

		const dataView = event.target.closest("[data-view]");
		const dataViewState = dataView ? dataView.dataset.view : null;
		const dateInputValue = dateInput.value !== "" ? dateInput.value : null;

		if (dataViewState == "important") {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, true, [], projectIndex, false);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else if (dataViewState == "upcoming") {
			if (!inputText.checkValidity() || !dateInput.checkValidity()) {
				if (dateInput.validity.rangeOverflow) {
					dateInput.setCustomValidity("Bir ay içinde bir tarih seçmelisinz.");
				} else if (dateInput.validity.rangeUnderflow) {
					dateInput.setCustomValidity("Gelecek bir tarih seçmelisiniz.");
				} else if (dateInput.validity.valueMissing) {
					dateInput.setCustomValidity("Tarih seçmelisiniz.");
				} else {
					dateInput.setCustomValidity("");
				}
				dateInput.reportValidity();
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, false);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else if (dataViewState == "completed") {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, true);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, false);
				renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		}
	} else if (event.target.matches(".checkbox") || event.target.matches(".important-checkbox")) {
		const dataView = event.target.closest("[data-view]");
		const dataViewState = dataView ? dataView.dataset.view : null;

		const indexes = (function index() {
			for (const project of Projects.projectList) {
				for (const task of project.tasks) {
					if (task.id == event.target.closest("[data-list-id]").dataset.listId) {
						return {
							taskIndex: project.tasks.indexOf(task),
							projectIndex: Projects.projectList.indexOf(project),
						};
					}
				}
			}
		})();

		console.log(indexes);

		console.log(event.target.checked);
		if (event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].completed = true;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
			console.log(Projects.projectList);
		} else if (!event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].completed = false;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
			console.log(Projects.projectList);
		} else if (event.target.checked && event.target.matches(".important-checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].important = true;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
		} else {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].important = false;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
		}
	} else if (event.target.matches(".new-list")) {
		console.log("girdi");
	} else if (event.target.matches(".date-input")) {
		// const result = parseISO(dateInputValue);
		// const result2= formatISO(result, { representation: 'date' })
		// console.log(result)
		// console.log(result2)
	} else if (event.target.matches(".task-list-group")) {
		event.target.classList.toggle("collapsed");
		if (
			!event.target.classList.contains("collapsed") &&
			event.target.dataset.loaded == "false"
		) {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				false,
				false
			);

			event.target.dataset.loaded = "true";
		} else if (event.target.classList.contains("collapsed")) {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				true,
				true
			);
		} else {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				false,
				true
			);
		}
	} else if (event.target == newInputButton) {
		newInput.focus();
	} else if (event.target == addATaskInputWrapper) {
		addATaskInput.focus();
	} else if (event.key === "Enter" && event.target.matches(".new-project-input")) {
		if (!newProjectInput.checkValidity()) {
			newProjectInput.reportValidity();
		} else {
			const title = event.target.value;
			new Projects(title, false, []);
			event.target.value = "";
			renderProjectListItem(Projects.projectList.at(-1));
			console.log(Projects.projectList);
		}
	} else if (event.target == dateIcon) {
		const dateInput = document.querySelector(".date-input");
		console.log(dateIcon);

		dateInput.showPicker();
	} else if (event.target.matches(".hide-right-button")) {
		toggleRightBar();
	}
}
const dateInput = document.querySelector(".date-input");
dateInput.addEventListener("change", function () {
	dateInputP.textContent = dateInput.value;
});
console.log(Projects.projectList);

/******/ })()
;
//# sourceMappingURL=bundle.js.map