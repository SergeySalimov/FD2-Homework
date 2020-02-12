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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.scss */ "./css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/UI */ "./js/UI.js");
/* harmony import */ var _js_Rest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Rest */ "./js/Rest.js");




function eventListener() {
  _js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].btnLoad.addEventListener('click', (event) => {
    event.preventDefault();
    if (_js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].restNotWorking) {
      _js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].restNotWorking = false;
      const rest = new _js_Rest__WEBPACK_IMPORTED_MODULE_2__["Rest"](_js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].latitude.value, _js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].longitude.value);
    }
  });
  _js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].btnClear.addEventListener('click', (event) => {
    event.preventDefault();
    _js_UI__WEBPACK_IMPORTED_MODULE_1__["UI"].clearUI();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventListener();
});


/***/ }),

/***/ "./js/Rest.js":
/*!********************!*\
  !*** ./js/Rest.js ***!
  \********************/
/*! exports provided: Rest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rest", function() { return Rest; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./js/config.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./js/UI.js");



class Rest {
  constructor(latitude = 53.666664, longitude = 23.83333) {
    this.latitude = latitude;
    this.longitude = longitude;
    _UI__WEBPACK_IMPORTED_MODULE_1__["UI"].spinner.classList.add('animate-spin');
    this.getWheather();
  }

  // eslint-disable-next-line class-methods-use-this
  getWheather() {
    const url = _config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].getUrl(this.latitude, this.longitude);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        _UI__WEBPACK_IMPORTED_MODULE_1__["UI"].spinner.classList.remove('animate-spin');
        _UI__WEBPACK_IMPORTED_MODULE_1__["UI"].renderUI(data);
        console.log(data);
        _UI__WEBPACK_IMPORTED_MODULE_1__["UI"].restNotWorking = true;
      });
  }
}


/***/ }),

/***/ "./js/UI.js":
/*!******************!*\
  !*** ./js/UI.js ***!
  \******************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
const UI = {
  latitude: document.getElementById('latitude'),
  longitude: document.getElementById('longitude'),
  btnLoad: document.getElementById('load-from-server'),
  btnClear: document.getElementById('clear-all'),
  summary: document.getElementById('summary'),
  spinner: document.querySelector('.spinner'),
  imageWheather: document.querySelector('.img-weather'),
  displayData: document.querySelector('.display-data'),
  place: document.getElementById('place'),
  temperature: document.getElementById('temperature'),
  humidity: document.getElementById('humidity'),
  pressure: document.getElementById('pressure'),
  windSpeed: document.getElementById('windSpeed'),
  renderUI(data) {
    this.imageWheather.classList.add(data.currently.icon);
    this.place.innerText = data.timezone;
    this.temperature.innerText = data.currently.temperature;
    this.humidity.innerText = data.currently.humidity;
    this.pressure.innerText = data.currently.pressure;
    this.windSpeed.innerText = data.currently.windSpeed;
    this.summary.innerText = data.hourly.summary;
    this.displayData.classList.remove('hide');
  },
  clearUI() {
    this.imageWheather.classList.value = 'img-weather';
    this.summary.innerText = '';
    this.displayData.classList.add('hide');
  },
  restNotWorking: true,
};


/***/ }),

/***/ "./js/config.js":
/*!**********************!*\
  !*** ./js/config.js ***!
  \**********************/
/*! exports provided: CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIG", function() { return CONFIG; });
const CONFIG = {
  api: 'https://api.darksky.net/forecast/',
  secretKey: '3b17a34ab62c7680a11ccab7d76900da',
  language: 'lang=ru',
  exlude: 'exclude=daily,flags',
  units: 'units=auto',
  corsProxy: 'https://cors-anywhere.herokuapp.com/',
  getUrl(latitude, longitude) {
    // eslint-disable-next-line max-len
    return `${this.corsProxy + this.api + this.secretKey}/${latitude},${longitude}?${this.units}&${this.language}`;
  },
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3NzL3N0eWxlLnNjc3M/MTJmYSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9SZXN0LmpzIiwid2VicGFjazovLy8uL2pzL1VJLmpzIiwid2VicGFjazovLy8uL2pzL2NvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEI7QUFDRztBQUNJOztBQUVqQztBQUNBLEVBQUUseUNBQUU7QUFDSjtBQUNBLFFBQVEseUNBQUU7QUFDVixNQUFNLHlDQUFFO0FBQ1IsdUJBQXVCLDZDQUFJLENBQUMseUNBQUUsaUJBQWlCLHlDQUFFO0FBQ2pEO0FBQ0EsR0FBRztBQUNILEVBQUUseUNBQUU7QUFDSjtBQUNBLElBQUkseUNBQUU7QUFDTixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwQkQ7QUFBQTtBQUFBO0FBQUE7QUFBa0M7QUFDUjs7QUFFbkI7QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNDQUFFO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLDhDQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsc0NBQUU7QUFDVixRQUFRLHNDQUFFO0FBQ1Y7QUFDQSxRQUFRLHNDQUFFO0FBQ1YsT0FBTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywyQ0FBMkMsR0FBRyxTQUFTLEdBQUcsVUFBVSxHQUFHLFdBQVcsR0FBRyxjQUFjO0FBQ2pILEdBQUc7QUFDSCIsImZpbGUiOiIzYzIzOWVmMDM3OGFhNWQxN2NhZi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICcuL2Nzcy9zdHlsZS5zY3NzJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuL2pzL1VJJztcclxuaW1wb3J0IHsgUmVzdCB9IGZyb20gJy4vanMvUmVzdCc7XHJcblxyXG5mdW5jdGlvbiBldmVudExpc3RlbmVyKCkge1xyXG4gIFVJLmJ0bkxvYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoVUkucmVzdE5vdFdvcmtpbmcpIHtcclxuICAgICAgVUkucmVzdE5vdFdvcmtpbmcgPSBmYWxzZTtcclxuICAgICAgY29uc3QgcmVzdCA9IG5ldyBSZXN0KFVJLmxhdGl0dWRlLnZhbHVlLCBVSS5sb25naXR1ZGUudmFsdWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFVJLmJ0bkNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgVUkuY2xlYXJVSSgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGV2ZW50TGlzdGVuZXIoKTtcclxufSk7XHJcbiIsImltcG9ydCB7IENPTkZJRyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgVUkgfSBmcm9tICcuL1VJJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN0IHtcclxuICBjb25zdHJ1Y3RvcihsYXRpdHVkZSA9IDUzLjY2NjY2NCwgbG9uZ2l0dWRlID0gMjMuODMzMzMpIHtcclxuICAgIHRoaXMubGF0aXR1ZGUgPSBsYXRpdHVkZTtcclxuICAgIHRoaXMubG9uZ2l0dWRlID0gbG9uZ2l0dWRlO1xyXG4gICAgVUkuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLXNwaW4nKTtcclxuICAgIHRoaXMuZ2V0V2hlYXRoZXIoKTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXHJcbiAgZ2V0V2hlYXRoZXIoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBDT05GSUcuZ2V0VXJsKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlKTtcclxuICAgIGZldGNoKHVybCwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgVUkuc3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLXNwaW4nKTtcclxuICAgICAgICBVSS5yZW5kZXJVSShkYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBVSS5yZXN0Tm90V29ya2luZyA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgVUkgPSB7XHJcbiAgbGF0aXR1ZGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYXRpdHVkZScpLFxyXG4gIGxvbmdpdHVkZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvbmdpdHVkZScpLFxyXG4gIGJ0bkxvYWQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkLWZyb20tc2VydmVyJyksXHJcbiAgYnRuQ2xlYXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhci1hbGwnKSxcclxuICBzdW1tYXJ5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VtbWFyeScpLFxyXG4gIHNwaW5uZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyJyksXHJcbiAgaW1hZ2VXaGVhdGhlcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy13ZWF0aGVyJyksXHJcbiAgZGlzcGxheURhdGE6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5LWRhdGEnKSxcclxuICBwbGFjZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlJyksXHJcbiAgdGVtcGVyYXR1cmU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpLFxyXG4gIGh1bWlkaXR5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKSxcclxuICBwcmVzc3VyZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNzdXJlJyksXHJcbiAgd2luZFNwZWVkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZFNwZWVkJyksXHJcbiAgcmVuZGVyVUkoZGF0YSkge1xyXG4gICAgdGhpcy5pbWFnZVdoZWF0aGVyLmNsYXNzTGlzdC5hZGQoZGF0YS5jdXJyZW50bHkuaWNvbik7XHJcbiAgICB0aGlzLnBsYWNlLmlubmVyVGV4dCA9IGRhdGEudGltZXpvbmU7XHJcbiAgICB0aGlzLnRlbXBlcmF0dXJlLmlubmVyVGV4dCA9IGRhdGEuY3VycmVudGx5LnRlbXBlcmF0dXJlO1xyXG4gICAgdGhpcy5odW1pZGl0eS5pbm5lclRleHQgPSBkYXRhLmN1cnJlbnRseS5odW1pZGl0eTtcclxuICAgIHRoaXMucHJlc3N1cmUuaW5uZXJUZXh0ID0gZGF0YS5jdXJyZW50bHkucHJlc3N1cmU7XHJcbiAgICB0aGlzLndpbmRTcGVlZC5pbm5lclRleHQgPSBkYXRhLmN1cnJlbnRseS53aW5kU3BlZWQ7XHJcbiAgICB0aGlzLnN1bW1hcnkuaW5uZXJUZXh0ID0gZGF0YS5ob3VybHkuc3VtbWFyeTtcclxuICAgIHRoaXMuZGlzcGxheURhdGEuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gIH0sXHJcbiAgY2xlYXJVSSgpIHtcclxuICAgIHRoaXMuaW1hZ2VXaGVhdGhlci5jbGFzc0xpc3QudmFsdWUgPSAnaW1nLXdlYXRoZXInO1xyXG4gICAgdGhpcy5zdW1tYXJ5LmlubmVyVGV4dCA9ICcnO1xyXG4gICAgdGhpcy5kaXNwbGF5RGF0YS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgfSxcclxuICByZXN0Tm90V29ya2luZzogdHJ1ZSxcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IENPTkZJRyA9IHtcclxuICBhcGk6ICdodHRwczovL2FwaS5kYXJrc2t5Lm5ldC9mb3JlY2FzdC8nLFxyXG4gIHNlY3JldEtleTogJzNiMTdhMzRhYjYyYzc2ODBhMTFjY2FiN2Q3NjkwMGRhJyxcclxuICBsYW5ndWFnZTogJ2xhbmc9cnUnLFxyXG4gIGV4bHVkZTogJ2V4Y2x1ZGU9ZGFpbHksZmxhZ3MnLFxyXG4gIHVuaXRzOiAndW5pdHM9YXV0bycsXHJcbiAgY29yc1Byb3h5OiAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vJyxcclxuICBnZXRVcmwobGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cclxuICAgIHJldHVybiBgJHt0aGlzLmNvcnNQcm94eSArIHRoaXMuYXBpICsgdGhpcy5zZWNyZXRLZXl9LyR7bGF0aXR1ZGV9LCR7bG9uZ2l0dWRlfT8ke3RoaXMudW5pdHN9JiR7dGhpcy5sYW5ndWFnZX1gO1xyXG4gIH0sXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=