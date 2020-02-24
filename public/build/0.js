(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./assets/css/algolia-autocomplete.scss":
/*!**********************************************!*\
  !*** ./assets/css/algolia-autocomplete.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/components/algolia-autocomplete.js":
/*!******************************************************!*\
  !*** ./assets/js/components/algolia-autocomplete.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var autocomplete_js_dist_autocomplete_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autocomplete.js/dist/autocomplete.jquery */ "./node_modules/autocomplete.js/dist/autocomplete.jquery.js");
/* harmony import */ var autocomplete_js_dist_autocomplete_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(autocomplete_js_dist_autocomplete_jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_algolia_autocomplete_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css/algolia-autocomplete.scss */ "./assets/css/algolia-autocomplete.scss");
/* harmony import */ var _css_algolia_autocomplete_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_algolia_autocomplete_scss__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function ($elements, dataKey, displayKey) {
  $elements.each(function () {
    var autocompleteUrl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('autocomplete-url');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).autocomplete({
      hint: false
    }, [{
      source: function source(query, cb) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
          url: autocompleteUrl + '?query=' + query
        }).then(function (data) {
          if (dataKey) {
            data = data[dataKey];
          }

          cb(data);
        });
      },
      displayKey: displayKey,
      debounce: 500 // only request every 1/2 second

    }]);
  });
});
;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL2FsZ29saWEtYXV0b2NvbXBsZXRlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbXBvbmVudHMvYWxnb2xpYS1hdXRvY29tcGxldGUuanMiXSwibmFtZXMiOlsiJGVsZW1lbnRzIiwiZGF0YUtleSIsImRpc3BsYXlLZXkiLCJlYWNoIiwiYXV0b2NvbXBsZXRlVXJsIiwiJCIsImRhdGEiLCJhdXRvY29tcGxldGUiLCJoaW50Iiwic291cmNlIiwicXVlcnkiLCJjYiIsImFqYXgiLCJ1cmwiLCJ0aGVuIiwiZGVib3VuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVlLHlFQUFTQSxTQUFULEVBQW9CQyxPQUFwQixFQUE2QkMsVUFBN0IsRUFBeUM7QUFDcERGLFdBQVMsQ0FBQ0csSUFBVixDQUFlLFlBQVc7QUFDdEIsUUFBSUMsZUFBZSxHQUFHQyw2Q0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRQyxJQUFSLENBQWEsa0JBQWIsQ0FBdEI7QUFFQUQsaURBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUUsWUFBUixDQUFxQjtBQUFDQyxVQUFJLEVBQUU7QUFBUCxLQUFyQixFQUFvQyxDQUNoQztBQUNJQyxZQUFNLEVBQUUsZ0JBQVNDLEtBQVQsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3hCTixxREFBQyxDQUFDTyxJQUFGLENBQU87QUFDSEMsYUFBRyxFQUFFVCxlQUFlLEdBQUMsU0FBaEIsR0FBMEJNO0FBRDVCLFNBQVAsRUFFR0ksSUFGSCxDQUVRLFVBQVNSLElBQVQsRUFBZTtBQUNuQixjQUFJTCxPQUFKLEVBQWE7QUFDVEssZ0JBQUksR0FBR0EsSUFBSSxDQUFDTCxPQUFELENBQVg7QUFDSDs7QUFDRFUsWUFBRSxDQUFDTCxJQUFELENBQUY7QUFDSCxTQVBEO0FBUUgsT0FWTDtBQVdJSixnQkFBVSxFQUFFQSxVQVhoQjtBQVlJYSxjQUFRLEVBQUUsR0FaZCxDQVlrQjs7QUFabEIsS0FEZ0MsQ0FBcEM7QUFnQkgsR0FuQkQ7QUFvQkg7QUFBQSxDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0ICdhdXRvY29tcGxldGUuanMvZGlzdC9hdXRvY29tcGxldGUuanF1ZXJ5JztcbmltcG9ydCAnLi4vLi4vY3NzL2FsZ29saWEtYXV0b2NvbXBsZXRlLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudHMsIGRhdGFLZXksIGRpc3BsYXlLZXkpIHtcbiAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGF1dG9jb21wbGV0ZVVybCA9ICQodGhpcykuZGF0YSgnYXV0b2NvbXBsZXRlLXVybCcpO1xuXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtoaW50OiBmYWxzZX0sIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGZ1bmN0aW9uKHF1ZXJ5LCBjYikge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhdXRvY29tcGxldGVVcmwrJz9xdWVyeT0nK3F1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVtkYXRhS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpc3BsYXlLZXk6IGRpc3BsYXlLZXksXG4gICAgICAgICAgICAgICAgZGVib3VuY2U6IDUwMCAvLyBvbmx5IHJlcXVlc3QgZXZlcnkgMS8yIHNlY29uZFxuICAgICAgICAgICAgfVxuICAgICAgICBdKVxuICAgIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=