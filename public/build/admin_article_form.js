(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin_article_form"],{

/***/ "./assets/js/admin_article_form.js":
/*!*****************************************!*\
  !*** ./assets/js/admin_article_form.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_weak_set_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.weak-set.js */ "./node_modules/core-js/modules/es.weak-set.js");
/* harmony import */ var core_js_modules_es_weak_set_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_weak_set_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! dropzone */ "./node_modules/dropzone/dist/dropzone.js");
/* harmony import */ var dropzone__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(dropzone__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var dropzone_dist_dropzone_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! dropzone/dist/dropzone.css */ "./node_modules/dropzone/dist/dropzone.css");
/* harmony import */ var dropzone_dist_dropzone_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(dropzone_dist_dropzone_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/Sortable.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(sortablejs__WEBPACK_IMPORTED_MODULE_14__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
















dropzone__WEBPACK_IMPORTED_MODULE_12___default.a.autoDiscover = false;
jquery__WEBPACK_IMPORTED_MODULE_11___default()(document).ready(function () {
  var $autoComplete = jquery__WEBPACK_IMPORTED_MODULE_11___default()('.js-user-autocomplete');

  if (!$autoComplete.is(':disabled')) {
    Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, /*! ./components/algolia-autocomplete */ "./assets/js/components/algolia-autocomplete.js")).then(function (autocomplete) {
      autocomplete.default($autoComplete, 'users', 'email');
    });
  }

  var $referenceList = jquery__WEBPACK_IMPORTED_MODULE_11___default()('.js-reference-list');

  if ($referenceList[0]) {
    var referenceList = new ReferenceList(jquery__WEBPACK_IMPORTED_MODULE_11___default()('.js-reference-list'));
    initializeDropzone(referenceList);
  }

  var $locationSelect = jquery__WEBPACK_IMPORTED_MODULE_11___default()('.js-article-form-location');
  var $specificLocationTarget = jquery__WEBPACK_IMPORTED_MODULE_11___default()('.js-specific-location-target');
  $locationSelect.on('change', function (e) {
    jquery__WEBPACK_IMPORTED_MODULE_11___default.a.ajax({
      url: $locationSelect.data('specific-location-url'),
      data: {
        location: $locationSelect.val()
      },
      success: function success(html) {
        if (!html) {
          $specificLocationTarget.find('select').remove();
          $specificLocationTarget.addClass('d-none');
          return;
        } // Replace the current field and show


        $specificLocationTarget.html(html).removeClass('d-none');
      }
    });
  });
}); // todo - use Webpack Encore so ES6 syntax is transpiled to ES5

var ReferenceList = /*#__PURE__*/function () {
  function ReferenceList($element) {
    var _this = this;

    _classCallCheck(this, ReferenceList);

    var stuff = new WeakSet([]);
    this.$element = $element;
    this.sortable = sortablejs__WEBPACK_IMPORTED_MODULE_14___default.a.create(this.$element[0], {
      handle: '.drag-handle',
      animation: 150,
      onEnd: function onEnd() {
        jquery__WEBPACK_IMPORTED_MODULE_11___default.a.ajax({
          url: _this.$element.data('url') + '/reorder',
          method: 'POST',
          data: JSON.stringify(_this.sortable.toArray())
        });
      }
    });
    this.references = [];
    this.render();
    this.$element.on('click', '.js-reference-delete', function (event) {
      _this.handleReferenceDelete(event);
    });
    this.$element.on('blur', '.js-edit-filename', function (event) {
      _this.handleReferenceEditFilename(event);
    });
    jquery__WEBPACK_IMPORTED_MODULE_11___default.a.ajax({
      url: this.$element.data('url')
    }).then(function (data) {
      _this.references = data;

      _this.render();
    });
  }

  _createClass(ReferenceList, [{
    key: "addReference",
    value: function addReference(reference) {
      this.references.push(reference);
      this.render();
    }
  }, {
    key: "handleReferenceDelete",
    value: function handleReferenceDelete(event) {
      var _this2 = this;

      var $li = jquery__WEBPACK_IMPORTED_MODULE_11___default()(event.currentTarget).closest('.list-group-item');
      var id = $li.data('id');
      $li.addClass('disabled');
      jquery__WEBPACK_IMPORTED_MODULE_11___default.a.ajax({
        url: '/admin/article/references/' + id,
        method: 'DELETE'
      }).then(function () {
        _this2.references = _this2.references.filter(function (reference) {
          return reference.id !== id;
        });

        _this2.render();
      });
    }
  }, {
    key: "handleReferenceEditFilename",
    value: function handleReferenceEditFilename(event) {
      var $li = jquery__WEBPACK_IMPORTED_MODULE_11___default()(event.currentTarget).closest('.list-group-item');
      var id = $li.data('id');
      var reference = this.references.find(function (reference) {
        return reference.id === id;
      });
      reference.originalFilename = jquery__WEBPACK_IMPORTED_MODULE_11___default()(event.currentTarget).val();
      jquery__WEBPACK_IMPORTED_MODULE_11___default.a.ajax({
        url: '/admin/article/references/' + id,
        method: 'PUT',
        data: JSON.stringify(reference)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var itemsHtml = this.references.map(function (reference) {
        return "\n<li class=\"list-group-item d-flex justify-content-between align-items-center\" data-id=\"".concat(reference.id, "\">\n    <span class=\"drag-handle fa fa-reorder\"></span>\n    <input type=\"text\" value=\"").concat(reference.originalFilename, "\" class=\"form-control js-edit-filename\" style=\"width: auto;\">\n\n    <span>\n        <a href=\"/admin/article/references/").concat(reference.id, "/download\" class=\"btn btn-link btn-sm\"><span class=\"fa fa-download\" style=\"vertical-align: middle\"></span></a>\n        <button class=\"js-reference-delete btn btn-link btn-sm\"><span class=\"fa fa-trash\"></span></button>\n    </span>\n</li>\n");
      });
      this.$element.html(itemsHtml.join(''));
    }
  }]);

  return ReferenceList;
}();
/**
 * @param {ReferenceList} referenceList
 */


function initializeDropzone(referenceList) {
  var formElement = document.querySelector('.js-reference-dropzone');

  if (!formElement) {
    return;
  }

  var dropzone = new dropzone__WEBPACK_IMPORTED_MODULE_12___default.a(formElement, {
    paramName: 'reference',
    init: function init() {
      this.on('success', function (file, data) {
        referenceList.addReference(data);
      });
      this.on('error', function (file, data) {
        if (data.detail) {
          this.emit('error', file, data.detail);
        }
      });
    }
  });
}

/***/ })

},[["./assets/js/admin_article_form.js","runtime","vendors~admin_article_form~app~article_show","vendors~admin_article_form~app","vendors~admin_article_form"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYWRtaW5fYXJ0aWNsZV9mb3JtLmpzIl0sIm5hbWVzIjpbIkRyb3B6b25lIiwiYXV0b0Rpc2NvdmVyIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCIkYXV0b0NvbXBsZXRlIiwiaXMiLCJ0aGVuIiwiYXV0b2NvbXBsZXRlIiwiZGVmYXVsdCIsIiRyZWZlcmVuY2VMaXN0IiwicmVmZXJlbmNlTGlzdCIsIlJlZmVyZW5jZUxpc3QiLCJpbml0aWFsaXplRHJvcHpvbmUiLCIkbG9jYXRpb25TZWxlY3QiLCIkc3BlY2lmaWNMb2NhdGlvblRhcmdldCIsIm9uIiwiZSIsImFqYXgiLCJ1cmwiLCJkYXRhIiwibG9jYXRpb24iLCJ2YWwiLCJzdWNjZXNzIiwiaHRtbCIsImZpbmQiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiJGVsZW1lbnQiLCJzdHVmZiIsIldlYWtTZXQiLCJzb3J0YWJsZSIsIlNvcnRhYmxlIiwiY3JlYXRlIiwiaGFuZGxlIiwiYW5pbWF0aW9uIiwib25FbmQiLCJtZXRob2QiLCJKU09OIiwic3RyaW5naWZ5IiwidG9BcnJheSIsInJlZmVyZW5jZXMiLCJyZW5kZXIiLCJldmVudCIsImhhbmRsZVJlZmVyZW5jZURlbGV0ZSIsImhhbmRsZVJlZmVyZW5jZUVkaXRGaWxlbmFtZSIsInJlZmVyZW5jZSIsInB1c2giLCIkbGkiLCJjdXJyZW50VGFyZ2V0IiwiY2xvc2VzdCIsImlkIiwiZmlsdGVyIiwib3JpZ2luYWxGaWxlbmFtZSIsIml0ZW1zSHRtbCIsIm1hcCIsImpvaW4iLCJmb3JtRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wem9uZSIsInBhcmFtTmFtZSIsImluaXQiLCJmaWxlIiwiYWRkUmVmZXJlbmNlIiwiZGV0YWlsIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7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STVELGdEQUFKLENBQWEwRCxXQUFiLEVBQTBCO0FBQ3JDRyxhQUFTLEVBQUUsV0FEMEI7QUFFckNDLFFBQUksRUFBRSxnQkFBVztBQUNiLFdBQUs5QyxFQUFMLENBQVEsU0FBUixFQUFtQixVQUFTK0MsSUFBVCxFQUFlM0MsSUFBZixFQUFxQjtBQUNwQ1QscUJBQWEsQ0FBQ3FELFlBQWQsQ0FBMkI1QyxJQUEzQjtBQUNILE9BRkQ7QUFJQSxXQUFLSixFQUFMLENBQVEsT0FBUixFQUFpQixVQUFTK0MsSUFBVCxFQUFlM0MsSUFBZixFQUFxQjtBQUNsQyxZQUFJQSxJQUFJLENBQUM2QyxNQUFULEVBQWlCO0FBQ2IsZUFBS0MsSUFBTCxDQUFVLE9BQVYsRUFBbUJILElBQW5CLEVBQXlCM0MsSUFBSSxDQUFDNkMsTUFBOUI7QUFDSDtBQUNKLE9BSkQ7QUFLSDtBQVpvQyxHQUExQixDQUFmO0FBY0gsQyIsImZpbGUiOiJhZG1pbl9hcnRpY2xlX2Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2Ryb3B6b25lJztcbmltcG9ydCAnZHJvcHpvbmUvZGlzdC9kcm9wem9uZS5jc3MnXG5pbXBvcnQgU29ydGFibGUgZnJvbSAnc29ydGFibGVqcyc7XG5cbkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBjb25zdCAkYXV0b0NvbXBsZXRlID0gJCgnLmpzLXVzZXItYXV0b2NvbXBsZXRlJyk7XG4gICAgaWYgKCEkYXV0b0NvbXBsZXRlLmlzKCc6ZGlzYWJsZWQnKSkge1xuICAgICAgICBpbXBvcnQoJy4vY29tcG9uZW50cy9hbGdvbGlhLWF1dG9jb21wbGV0ZScpLnRoZW4oKGF1dG9jb21wbGV0ZSkgPT4ge1xuICAgICAgICAgICAgYXV0b2NvbXBsZXRlLmRlZmF1bHQoJGF1dG9Db21wbGV0ZSwgJ3VzZXJzJywgJ2VtYWlsJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0ICRyZWZlcmVuY2VMaXN0ID0gJCgnLmpzLXJlZmVyZW5jZS1saXN0Jyk7XG4gICAgaWYgKCRyZWZlcmVuY2VMaXN0WzBdKSB7XG4gICAgICAgIHZhciByZWZlcmVuY2VMaXN0ID0gbmV3IFJlZmVyZW5jZUxpc3QoJCgnLmpzLXJlZmVyZW5jZS1saXN0JykpO1xuICAgICAgICBpbml0aWFsaXplRHJvcHpvbmUocmVmZXJlbmNlTGlzdCk7XG4gICAgfVxuXG4gICAgdmFyICRsb2NhdGlvblNlbGVjdCA9ICQoJy5qcy1hcnRpY2xlLWZvcm0tbG9jYXRpb24nKTtcbiAgICB2YXIgJHNwZWNpZmljTG9jYXRpb25UYXJnZXQgPSAkKCcuanMtc3BlY2lmaWMtbG9jYXRpb24tdGFyZ2V0Jyk7XG5cbiAgICAkbG9jYXRpb25TZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJGxvY2F0aW9uU2VsZWN0LmRhdGEoJ3NwZWNpZmljLWxvY2F0aW9uLXVybCcpLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAkbG9jYXRpb25TZWxlY3QudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIGlmICghaHRtbCkge1xuICAgICAgICAgICAgICAgICAgICAkc3BlY2lmaWNMb2NhdGlvblRhcmdldC5maW5kKCdzZWxlY3QnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJHNwZWNpZmljTG9jYXRpb25UYXJnZXQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjdXJyZW50IGZpZWxkIGFuZCBzaG93XG4gICAgICAgICAgICAgICAgJHNwZWNpZmljTG9jYXRpb25UYXJnZXRcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoaHRtbClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdkLW5vbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG4vLyB0b2RvIC0gdXNlIFdlYnBhY2sgRW5jb3JlIHNvIEVTNiBzeW50YXggaXMgdHJhbnNwaWxlZCB0byBFUzVcbmNsYXNzIFJlZmVyZW5jZUxpc3RcbntcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB2YXIgc3R1ZmYgPSBuZXcgV2Vha1NldChbXSk7XG5cbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgICAgICB0aGlzLnNvcnRhYmxlID0gU29ydGFibGUuY3JlYXRlKHRoaXMuJGVsZW1lbnRbMF0sIHtcbiAgICAgICAgICAgIGhhbmRsZTogJy5kcmFnLWhhbmRsZScsXG4gICAgICAgICAgICBhbmltYXRpb246IDE1MCxcbiAgICAgICAgICAgIG9uRW5kOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLiRlbGVtZW50LmRhdGEoJ3VybCcpKycvcmVvcmRlcicsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnNvcnRhYmxlLnRvQXJyYXkoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlcyA9IFtdO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrJywgJy5qcy1yZWZlcmVuY2UtZGVsZXRlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJlZmVyZW5jZURlbGV0ZShldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2JsdXInLCAnLmpzLWVkaXQtZmlsZW5hbWUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVmZXJlbmNlRWRpdEZpbGVuYW1lKGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdGhpcy4kZWxlbWVudC5kYXRhKCd1cmwnKVxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZlcmVuY2VzID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkUmVmZXJlbmNlKHJlZmVyZW5jZSkge1xuICAgICAgICB0aGlzLnJlZmVyZW5jZXMucHVzaChyZWZlcmVuY2UpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGhhbmRsZVJlZmVyZW5jZURlbGV0ZShldmVudCkge1xuICAgICAgICBjb25zdCAkbGkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5saXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgY29uc3QgaWQgPSAkbGkuZGF0YSgnaWQnKTtcbiAgICAgICAgJGxpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYXJ0aWNsZS9yZWZlcmVuY2VzLycraWQsXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZlcmVuY2VzID0gdGhpcy5yZWZlcmVuY2VzLmZpbHRlcihyZWZlcmVuY2UgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWZlcmVuY2UuaWQgIT09IGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVSZWZlcmVuY2VFZGl0RmlsZW5hbWUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGxpID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcubGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IGlkID0gJGxpLmRhdGEoJ2lkJyk7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlcy5maW5kKHJlZmVyZW5jZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVmZXJlbmNlLmlkID09PSBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlZmVyZW5jZS5vcmlnaW5hbEZpbGVuYW1lID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FkbWluL2FydGljbGUvcmVmZXJlbmNlcy8nK2lkLFxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHJlZmVyZW5jZSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBpdGVtc0h0bWwgPSB0aGlzLnJlZmVyZW5jZXMubWFwKHJlZmVyZW5jZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYFxuPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXJcIiBkYXRhLWlkPVwiJHtyZWZlcmVuY2UuaWR9XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJkcmFnLWhhbmRsZSBmYSBmYS1yZW9yZGVyXCI+PC9zcGFuPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHtyZWZlcmVuY2Uub3JpZ2luYWxGaWxlbmFtZX1cIiBjbGFzcz1cImZvcm0tY29udHJvbCBqcy1lZGl0LWZpbGVuYW1lXCIgc3R5bGU9XCJ3aWR0aDogYXV0bztcIj5cblxuICAgIDxzcGFuPlxuICAgICAgICA8YSBocmVmPVwiL2FkbWluL2FydGljbGUvcmVmZXJlbmNlcy8ke3JlZmVyZW5jZS5pZH0vZG93bmxvYWRcIiBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIj48c3BhbiBjbGFzcz1cImZhIGZhLWRvd25sb2FkXCIgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImpzLXJlZmVyZW5jZS1kZWxldGUgYnRuIGJ0bi1saW5rIGJ0bi1zbVwiPjxzcGFuIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L3NwYW4+PC9idXR0b24+XG4gICAgPC9zcGFuPlxuPC9saT5cbmBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5odG1sKGl0ZW1zSHRtbC5qb2luKCcnKSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVmZXJlbmNlTGlzdH0gcmVmZXJlbmNlTGlzdFxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRHJvcHpvbmUocmVmZXJlbmNlTGlzdCkge1xuICAgIHZhciBmb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZWZlcmVuY2UtZHJvcHpvbmUnKTtcbiAgICBpZiAoIWZvcm1FbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZHJvcHpvbmUgPSBuZXcgRHJvcHpvbmUoZm9ybUVsZW1lbnQsIHtcbiAgICAgICAgcGFyYW1OYW1lOiAncmVmZXJlbmNlJyxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24oZmlsZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZUxpc3QuYWRkUmVmZXJlbmNlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMub24oJ2Vycm9yJywgZnVuY3Rpb24oZmlsZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZmlsZSwgZGF0YS5kZXRhaWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9