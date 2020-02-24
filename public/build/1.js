(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/autocomplete.js/dist/autocomplete.jquery.js":
/*!******************************************************************!*\
  !*** ./node_modules/autocomplete.js/dist/autocomplete.jquery.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*!
 * autocomplete.js 0.36.0
 * https://github.com/algolia/autocomplete.js
 * Copyright 2019 Algolia, Inc. and other contributors; Licensed MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// setup DOM element
	var DOM = __webpack_require__(2);
	var $ = __webpack_require__(3);
	DOM.element = $;

	// setup utils functions
	var _ = __webpack_require__(4);
	_.isArray = $.isArray;
	_.isFunction = $.isFunction;
	_.isObject = $.isPlainObject;
	_.bind = $.proxy;
	_.each = function(collection, cb) {
	  // stupid argument order for jQuery.each
	  $.each(collection, reverseArgs);
	  function reverseArgs(index, value) {
	    return cb(value, index);
	  }
	};
	_.map = $.map;
	_.mixin = $.extend;
	_.Event = $.Event;

	var Typeahead = __webpack_require__(5);
	var EventBus = __webpack_require__(6);

	var old;
	var typeaheadKey;
	var methods;

	old = $.fn.autocomplete;

	typeaheadKey = 'aaAutocomplete';

	methods = {
	  // supported signatures:
	  // function(o, dataset, dataset, ...)
	  // function(o, [dataset, dataset, ...])
	  initialize: function initialize(o, datasets) {
	    datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);

	    o = o || {};

	    return this.each(attach);

	    function attach() {
	      var $input = $(this);
	      var eventBus = new EventBus({el: $input});
	      var typeahead;

	      typeahead = new Typeahead({
	        input: $input,
	        eventBus: eventBus,
	        dropdownMenuContainer: o.dropdownMenuContainer,
	        hint: o.hint === undefined ? true : !!o.hint,
	        minLength: o.minLength,
	        autoselect: o.autoselect,
	        autoselectOnBlur: o.autoselectOnBlur,
	        tabAutocomplete: o.tabAutocomplete,
	        openOnFocus: o.openOnFocus,
	        templates: o.templates,
	        debug: o.debug,
	        clearOnSelected: o.clearOnSelected,
	        cssClasses: o.cssClasses,
	        datasets: datasets,
	        keyboardShortcuts: o.keyboardShortcuts,
	        appendTo: o.appendTo,
	        autoWidth: o.autoWidth
	      });

	      $input.data(typeaheadKey, typeahead);
	    }
	  },

	  open: function open() {
	    return this.each(openTypeahead);

	    function openTypeahead() {
	      var $input = $(this);
	      var typeahead;

	      if (typeahead = $input.data(typeaheadKey)) {
	        typeahead.open();
	      }
	    }
	  },

	  close: function close() {
	    return this.each(closeTypeahead);

	    function closeTypeahead() {
	      var $input = $(this);
	      var typeahead;

	      if (typeahead = $input.data(typeaheadKey)) {
	        typeahead.close();
	      }
	    }
	  },

	  val: function val(newVal) {
	    // mirror jQuery#val functionality: read operate on first match,
	    // write operates on all matches
	    return !arguments.length ? getVal(this.first()) : this.each(setVal);

	    function setVal() {
	      var $input = $(this);
	      var typeahead;

	      if (typeahead = $input.data(typeaheadKey)) {
	        typeahead.setVal(newVal);
	      }
	    }

	    function getVal($input) {
	      var typeahead;
	      var query;

	      if (typeahead = $input.data(typeaheadKey)) {
	        query = typeahead.getVal();
	      }

	      return query;
	    }
	  },

	  destroy: function destroy() {
	    return this.each(unattach);

	    function unattach() {
	      var $input = $(this);
	      var typeahead;

	      if (typeahead = $input.data(typeaheadKey)) {
	        typeahead.destroy();
	        $input.removeData(typeaheadKey);
	      }
	    }
	  }
	};

	$.fn.autocomplete = function(method) {
	  var tts;

	  // methods that should only act on intialized typeaheads
	  if (methods[method] && method !== 'initialize') {
	    // filter out non-typeahead inputs
	    tts = this.filter(function() { return !!$(this).data(typeaheadKey); });
	    return methods[method].apply(tts, [].slice.call(arguments, 1));
	  }
	  return methods.initialize.apply(this, arguments);
	};

	$.fn.autocomplete.noConflict = function noConflict() {
	  $.fn.autocomplete = old;
	  return this;
	};

	$.fn.autocomplete.sources = Typeahead.sources;
	$.fn.autocomplete.escapeHighlightedString = _.escapeHighlightedString;

	module.exports = $.fn.autocomplete;


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  element: null
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DOM = __webpack_require__(2);

	function escapeRegExp(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	module.exports = {
	  // those methods are implemented differently
	  // depending on which build it is, using
	  // $... or angular... or Zepto... or require(...)
	  isArray: null,
	  isFunction: null,
	  isObject: null,
	  bind: null,
	  each: null,
	  map: null,
	  mixin: null,

	  isMsie: function(agentString) {
	    if (agentString === undefined) { agentString = navigator.userAgent; }
	    // from https://github.com/ded/bowser/blob/master/bowser.js
	    if ((/(msie|trident)/i).test(agentString)) {
	      var match = agentString.match(/(msie |rv:)(\d+(.\d+)?)/i);
	      if (match) { return match[2]; }
	    }
	    return false;
	  },

	  // http://stackoverflow.com/a/6969486
	  escapeRegExChars: function(str) {
	    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	  },

	  isNumber: function(obj) { return typeof obj === 'number'; },

	  toStr: function toStr(s) {
	    return s === undefined || s === null ? '' : s + '';
	  },

	  cloneDeep: function cloneDeep(obj) {
	    var clone = this.mixin({}, obj);
	    var self = this;
	    this.each(clone, function(value, key) {
	      if (value) {
	        if (self.isArray(value)) {
	          clone[key] = [].concat(value);
	        } else if (self.isObject(value)) {
	          clone[key] = self.cloneDeep(value);
	        }
	      }
	    });
	    return clone;
	  },

	  error: function(msg) {
	    throw new Error(msg);
	  },

	  every: function(obj, test) {
	    var result = true;
	    if (!obj) {
	      return result;
	    }
	    this.each(obj, function(val, key) {
	      if (result) {
	        result = test.call(null, val, key, obj) && result;
	      }
	    });
	    return !!result;
	  },

	  any: function(obj, test) {
	    var found = false;
	    if (!obj) {
	      return found;
	    }
	    this.each(obj, function(val, key) {
	      if (test.call(null, val, key, obj)) {
	        found = true;
	        return false;
	      }
	    });
	    return found;
	  },

	  getUniqueId: (function() {
	    var counter = 0;
	    return function() { return counter++; };
	  })(),

	  templatify: function templatify(obj) {
	    if (this.isFunction(obj)) {
	      return obj;
	    }
	    var $template = DOM.element(obj);
	    if ($template.prop('tagName') === 'SCRIPT') {
	      return function template() { return $template.text(); };
	    }
	    return function template() { return String(obj); };
	  },

	  defer: function(fn) { setTimeout(fn, 0); },

	  noop: function() {},

	  formatPrefix: function(prefix, noPrefix) {
	    return noPrefix ? '' : prefix + '-';
	  },

	  className: function(prefix, clazz, skipDot) {
	    return (skipDot ? '' : '.') + prefix + clazz;
	  },

	  escapeHighlightedString: function(str, highlightPreTag, highlightPostTag) {
	    highlightPreTag = highlightPreTag || '<em>';
	    var pre = document.createElement('div');
	    pre.appendChild(document.createTextNode(highlightPreTag));

	    highlightPostTag = highlightPostTag || '</em>';
	    var post = document.createElement('div');
	    post.appendChild(document.createTextNode(highlightPostTag));

	    var div = document.createElement('div');
	    div.appendChild(document.createTextNode(str));
	    return div.innerHTML
	      .replace(RegExp(escapeRegExp(pre.innerHTML), 'g'), highlightPreTag)
	      .replace(RegExp(escapeRegExp(post.innerHTML), 'g'), highlightPostTag);
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var attrsKey = 'aaAttrs';

	var _ = __webpack_require__(4);
	var DOM = __webpack_require__(2);
	var EventBus = __webpack_require__(6);
	var Input = __webpack_require__(7);
	var Dropdown = __webpack_require__(16);
	var html = __webpack_require__(18);
	var css = __webpack_require__(19);

	// constructor
	// -----------

	// THOUGHT: what if datasets could dynamically be added/removed?
	function Typeahead(o) {
	  var $menu;
	  var $hint;

	  o = o || {};

	  if (!o.input) {
	    _.error('missing input');
	  }

	  this.isActivated = false;
	  this.debug = !!o.debug;
	  this.autoselect = !!o.autoselect;
	  this.autoselectOnBlur = !!o.autoselectOnBlur;
	  this.openOnFocus = !!o.openOnFocus;
	  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
	  this.autoWidth = (o.autoWidth === undefined) ? true : !!o.autoWidth;
	  this.clearOnSelected = !!o.clearOnSelected;
	  this.tabAutocomplete = (o.tabAutocomplete === undefined) ? true : !!o.tabAutocomplete;

	  o.hint = !!o.hint;

	  if (o.hint && o.appendTo) {
	    throw new Error('[autocomplete.js] hint and appendTo options can\'t be used at the same time');
	  }

	  this.css = o.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
	  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	  this.cssClasses.prefix =
	    o.cssClasses.formattedPrefix = _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);
	  this.listboxId = o.listboxId = [this.cssClasses.root, 'listbox', _.getUniqueId()].join('-');

	  var domElts = buildDom(o);

	  this.$node = domElts.wrapper;
	  var $input = this.$input = domElts.input;
	  $menu = domElts.menu;
	  $hint = domElts.hint;

	  if (o.dropdownMenuContainer) {
	    DOM.element(o.dropdownMenuContainer)
	      .css('position', 'relative') // ensure the container has a relative position
	      .append($menu.css('top', '0')); // override the top: 100%
	  }

	  // #705: if there's scrollable overflow, ie doesn't support
	  // blur cancellations when the scrollbar is clicked
	  //
	  // #351: preventDefault won't cancel blurs in ie <= 8
	  $input.on('blur.aa', function($e) {
	    var active = document.activeElement;
	    if (_.isMsie() && ($menu[0] === active || $menu[0].contains(active))) {
	      $e.preventDefault();
	      // stop immediate in order to prevent Input#_onBlur from
	      // getting exectued
	      $e.stopImmediatePropagation();
	      _.defer(function() { $input.focus(); });
	    }
	  });

	  // #351: prevents input blur due to clicks within dropdown menu
	  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });

	  this.eventBus = o.eventBus || new EventBus({el: $input});

	  this.dropdown = new Typeahead.Dropdown({
	    appendTo: o.appendTo,
	    wrapper: this.$node,
	    menu: $menu,
	    datasets: o.datasets,
	    templates: o.templates,
	    cssClasses: o.cssClasses,
	    minLength: this.minLength
	  })
	    .onSync('suggestionClicked', this._onSuggestionClicked, this)
	    .onSync('cursorMoved', this._onCursorMoved, this)
	    .onSync('cursorRemoved', this._onCursorRemoved, this)
	    .onSync('opened', this._onOpened, this)
	    .onSync('closed', this._onClosed, this)
	    .onSync('shown', this._onShown, this)
	    .onSync('empty', this._onEmpty, this)
	    .onSync('redrawn', this._onRedrawn, this)
	    .onAsync('datasetRendered', this._onDatasetRendered, this);

	  this.input = new Typeahead.Input({input: $input, hint: $hint})
	    .onSync('focused', this._onFocused, this)
	    .onSync('blurred', this._onBlurred, this)
	    .onSync('enterKeyed', this._onEnterKeyed, this)
	    .onSync('tabKeyed', this._onTabKeyed, this)
	    .onSync('escKeyed', this._onEscKeyed, this)
	    .onSync('upKeyed', this._onUpKeyed, this)
	    .onSync('downKeyed', this._onDownKeyed, this)
	    .onSync('leftKeyed', this._onLeftKeyed, this)
	    .onSync('rightKeyed', this._onRightKeyed, this)
	    .onSync('queryChanged', this._onQueryChanged, this)
	    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

	  this._bindKeyboardShortcuts(o);

	  this._setLanguageDirection();
	}

	// instance methods
	// ----------------

	_.mixin(Typeahead.prototype, {
	  // ### private

	  _bindKeyboardShortcuts: function(options) {
	    if (!options.keyboardShortcuts) {
	      return;
	    }
	    var $input = this.$input;
	    var keyboardShortcuts = [];
	    _.each(options.keyboardShortcuts, function(key) {
	      if (typeof key === 'string') {
	        key = key.toUpperCase().charCodeAt(0);
	      }
	      keyboardShortcuts.push(key);
	    });
	    DOM.element(document).keydown(function(event) {
	      var elt = (event.target || event.srcElement);
	      var tagName = elt.tagName;
	      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
	        // already in an input
	        return;
	      }

	      var which = event.which || event.keyCode;
	      if (keyboardShortcuts.indexOf(which) === -1) {
	        // not the right shortcut
	        return;
	      }

	      $input.focus();
	      event.stopPropagation();
	      event.preventDefault();
	    });
	  },

	  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
	    var datum;
	    var context = {selectionMethod: 'click'};

	    if (datum = this.dropdown.getDatumForSuggestion($el)) {
	      this._select(datum, context);
	    }
	  },

	  _onCursorMoved: function onCursorMoved(event, updateInput) {
	    var datum = this.dropdown.getDatumForCursor();
	    var currentCursorId = this.dropdown.getCurrentCursor().attr('id');
	    this.input.setActiveDescendant(currentCursorId);

	    if (datum) {
	      if (updateInput) {
	        this.input.setInputValue(datum.value, true);
	      }

	      this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
	    }
	  },

	  _onCursorRemoved: function onCursorRemoved() {
	    this.input.resetInputValue();
	    this._updateHint();
	    this.eventBus.trigger('cursorremoved');
	  },

	  _onDatasetRendered: function onDatasetRendered() {
	    this._updateHint();

	    this.eventBus.trigger('updated');
	  },

	  _onOpened: function onOpened() {
	    this._updateHint();
	    this.input.expand();

	    this.eventBus.trigger('opened');
	  },

	  _onEmpty: function onEmpty() {
	    this.eventBus.trigger('empty');
	  },

	  _onRedrawn: function onRedrawn() {
	    this.$node.css('top', 0 + 'px');
	    this.$node.css('left', 0 + 'px');

	    var inputRect = this.$input[0].getBoundingClientRect();

	    if (this.autoWidth) {
	      this.$node.css('width', inputRect.width + 'px');
	    }

	    var wrapperRect = this.$node[0].getBoundingClientRect();

	    var top = inputRect.bottom - wrapperRect.top;
	    this.$node.css('top', top + 'px');
	    var left = inputRect.left - wrapperRect.left;
	    this.$node.css('left', left + 'px');

	    this.eventBus.trigger('redrawn');
	  },

	  _onShown: function onShown() {
	    this.eventBus.trigger('shown');
	    if (this.autoselect) {
	      this.dropdown.cursorTopSuggestion();
	    }
	  },

	  _onClosed: function onClosed() {
	    this.input.clearHint();
	    this.input.removeActiveDescendant();
	    this.input.collapse();

	    this.eventBus.trigger('closed');
	  },

	  _onFocused: function onFocused() {
	    this.isActivated = true;

	    if (this.openOnFocus) {
	      var query = this.input.getQuery();
	      if (query.length >= this.minLength) {
	        this.dropdown.update(query);
	      } else {
	        this.dropdown.empty();
	      }

	      this.dropdown.open();
	    }
	  },

	  _onBlurred: function onBlurred() {
	    var cursorDatum;
	    var topSuggestionDatum;

	    cursorDatum = this.dropdown.getDatumForCursor();
	    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
	    var context = {selectionMethod: 'blur'};

	    if (!this.debug) {
	      if (this.autoselectOnBlur && cursorDatum) {
	        this._select(cursorDatum, context);
	      } else if (this.autoselectOnBlur && topSuggestionDatum) {
	        this._select(topSuggestionDatum, context);
	      } else {
	        this.isActivated = false;
	        this.dropdown.empty();
	        this.dropdown.close();
	      }
	    }
	  },

	  _onEnterKeyed: function onEnterKeyed(type, $e) {
	    var cursorDatum;
	    var topSuggestionDatum;

	    cursorDatum = this.dropdown.getDatumForCursor();
	    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
	    var context = {selectionMethod: 'enterKey'};

	    if (cursorDatum) {
	      this._select(cursorDatum, context);
	      $e.preventDefault();
	    } else if (this.autoselect && topSuggestionDatum) {
	      this._select(topSuggestionDatum, context);
	      $e.preventDefault();
	    }
	  },

	  _onTabKeyed: function onTabKeyed(type, $e) {
	    if (!this.tabAutocomplete) {
	      // Closing the dropdown enables further tabbing
	      this.dropdown.close();
	      return;
	    }

	    var datum;
	    var context = {selectionMethod: 'tabKey'};

	    if (datum = this.dropdown.getDatumForCursor()) {
	      this._select(datum, context);
	      $e.preventDefault();
	    } else {
	      this._autocomplete(true);
	    }
	  },

	  _onEscKeyed: function onEscKeyed() {
	    this.dropdown.close();
	    this.input.resetInputValue();
	  },

	  _onUpKeyed: function onUpKeyed() {
	    var query = this.input.getQuery();

	    if (this.dropdown.isEmpty && query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.moveCursorUp();
	    }

	    this.dropdown.open();
	  },

	  _onDownKeyed: function onDownKeyed() {
	    var query = this.input.getQuery();

	    if (this.dropdown.isEmpty && query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.moveCursorDown();
	    }

	    this.dropdown.open();
	  },

	  _onLeftKeyed: function onLeftKeyed() {
	    if (this.dir === 'rtl') {
	      this._autocomplete();
	    }
	  },

	  _onRightKeyed: function onRightKeyed() {
	    if (this.dir === 'ltr') {
	      this._autocomplete();
	    }
	  },

	  _onQueryChanged: function onQueryChanged(e, query) {
	    this.input.clearHintIfInvalid();

	    if (query.length >= this.minLength) {
	      this.dropdown.update(query);
	    } else {
	      this.dropdown.empty();
	    }

	    this.dropdown.open();
	    this._setLanguageDirection();
	  },

	  _onWhitespaceChanged: function onWhitespaceChanged() {
	    this._updateHint();
	    this.dropdown.open();
	  },

	  _setLanguageDirection: function setLanguageDirection() {
	    var dir = this.input.getLanguageDirection();

	    if (this.dir !== dir) {
	      this.dir = dir;
	      this.$node.css('direction', dir);
	      this.dropdown.setLanguageDirection(dir);
	    }
	  },

	  _updateHint: function updateHint() {
	    var datum;
	    var val;
	    var query;
	    var escapedQuery;
	    var frontMatchRegEx;
	    var match;

	    datum = this.dropdown.getDatumForTopSuggestion();

	    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
	      val = this.input.getInputValue();
	      query = Input.normalizeQuery(val);
	      escapedQuery = _.escapeRegExChars(query);

	      // match input value, then capture trailing text
	      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
	      match = frontMatchRegEx.exec(datum.value);

	      // clear hint if there's no trailing text
	      if (match) {
	        this.input.setHint(val + match[1]);
	      } else {
	        this.input.clearHint();
	      }
	    } else {
	      this.input.clearHint();
	    }
	  },

	  _autocomplete: function autocomplete(laxCursor) {
	    var hint;
	    var query;
	    var isCursorAtEnd;
	    var datum;

	    hint = this.input.getHint();
	    query = this.input.getQuery();
	    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

	    if (hint && query !== hint && isCursorAtEnd) {
	      datum = this.dropdown.getDatumForTopSuggestion();
	      if (datum) {
	        this.input.setInputValue(datum.value);
	      }

	      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
	    }
	  },

	  _select: function select(datum, context) {
	    if (typeof datum.value !== 'undefined') {
	      this.input.setQuery(datum.value);
	    }
	    if (this.clearOnSelected) {
	      this.setVal('');
	    } else {
	      this.input.setInputValue(datum.value, true);
	    }

	    this._setLanguageDirection();

	    var event = this.eventBus.trigger('selected', datum.raw, datum.datasetName, context);
	    if (event.isDefaultPrevented() === false) {
	      this.dropdown.close();

	      // #118: allow click event to bubble up to the body before removing
	      // the suggestions otherwise we break event delegation
	      _.defer(_.bind(this.dropdown.empty, this.dropdown));
	    }
	  },

	  // ### public

	  open: function open() {
	    // if the menu is not activated yet, we need to update
	    // the underlying dropdown menu to trigger the search
	    // otherwise we're not gonna see anything
	    if (!this.isActivated) {
	      var query = this.input.getInputValue();
	      if (query.length >= this.minLength) {
	        this.dropdown.update(query);
	      } else {
	        this.dropdown.empty();
	      }
	    }
	    this.dropdown.open();
	  },

	  close: function close() {
	    this.dropdown.close();
	  },

	  setVal: function setVal(val) {
	    // expect val to be a string, so be safe, and coerce
	    val = _.toStr(val);

	    if (this.isActivated) {
	      this.input.setInputValue(val);
	    } else {
	      this.input.setQuery(val);
	      this.input.setInputValue(val, true);
	    }

	    this._setLanguageDirection();
	  },

	  getVal: function getVal() {
	    return this.input.getQuery();
	  },

	  destroy: function destroy() {
	    this.input.destroy();
	    this.dropdown.destroy();

	    destroyDomStructure(this.$node, this.cssClasses);

	    this.$node = null;
	  },

	  getWrapper: function getWrapper() {
	    return this.dropdown.$container[0];
	  }
	});

	function buildDom(options) {
	  var $input;
	  var $wrapper;
	  var $dropdown;
	  var $hint;

	  $input = DOM.element(options.input);
	  $wrapper = DOM
	    .element(html.wrapper.replace('%ROOT%', options.cssClasses.root))
	    .css(options.css.wrapper);

	  // override the display property with the table-cell value
	  // if the parent element is a table and the original input was a block
	  //  -> https://github.com/algolia/autocomplete.js/issues/16
	  if (!options.appendTo && $input.css('display') === 'block' && $input.parent().css('display') === 'table') {
	    $wrapper.css('display', 'table-cell');
	  }
	  var dropdownHtml = html.dropdown.
	    replace('%PREFIX%', options.cssClasses.prefix).
	    replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
	  $dropdown = DOM.element(dropdownHtml)
	    .css(options.css.dropdown)
	    .attr({
	      role: 'listbox',
	      id: options.listboxId
	    });
	  if (options.templates && options.templates.dropdownMenu) {
	    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
	  }
	  $hint = $input.clone().css(options.css.hint).css(getBackgroundStyles($input));

	  $hint
	    .val('')
	    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
	    .removeAttr('id name placeholder required')
	    .prop('readonly', true)
	    .attr({
	      'aria-hidden': 'true',
	      autocomplete: 'off',
	      spellcheck: 'false',
	      tabindex: -1
	    });
	  if ($hint.removeData) {
	    $hint.removeData();
	  }

	  // store the original values of the attrs that get modified
	  // so modifications can be reverted on destroy
	  $input.data(attrsKey, {
	    'aria-autocomplete': $input.attr('aria-autocomplete'),
	    'aria-expanded': $input.attr('aria-expanded'),
	    'aria-owns': $input.attr('aria-owns'),
	    autocomplete: $input.attr('autocomplete'),
	    dir: $input.attr('dir'),
	    role: $input.attr('role'),
	    spellcheck: $input.attr('spellcheck'),
	    style: $input.attr('style'),
	    type: $input.attr('type')
	  });

	  $input
	    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
	    .attr({
	      autocomplete: 'off',
	      spellcheck: false,

	      // Accessibility features
	      // Give the field a presentation of a "select".
	      // Combobox is the combined presentation of a single line textfield
	      // with a listbox popup.
	      // https://www.w3.org/WAI/PF/aria/roles#combobox
	      role: 'combobox',
	      // Let the screen reader know the field has an autocomplete
	      // feature to it.
	      'aria-autocomplete': (options.datasets &&
	        options.datasets[0] && options.datasets[0].displayKey ? 'both' : 'list'),
	      // Indicates whether the dropdown it controls is currently expanded or collapsed
	      'aria-expanded': 'false',
	      'aria-label': options.ariaLabel,
	      // Explicitly point to the listbox,
	      // which is a list of suggestions (aka options)
	      'aria-owns': options.listboxId
	    })
	    .css(options.hint ? options.css.input : options.css.inputWithNoHint);

	  // ie7 does not like it when dir is set to auto
	  try {
	    if (!$input.attr('dir')) {
	      $input.attr('dir', 'auto');
	    }
	  } catch (e) {
	    // ignore
	  }

	  $wrapper = options.appendTo
	    ? $wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0)
	    : $input.wrap($wrapper).parent();

	  $wrapper
	    .prepend(options.hint ? $hint : null)
	    .append($dropdown);

	  return {
	    wrapper: $wrapper,
	    input: $input,
	    hint: $hint,
	    menu: $dropdown
	  };
	}

	function getBackgroundStyles($el) {
	  return {
	    backgroundAttachment: $el.css('background-attachment'),
	    backgroundClip: $el.css('background-clip'),
	    backgroundColor: $el.css('background-color'),
	    backgroundImage: $el.css('background-image'),
	    backgroundOrigin: $el.css('background-origin'),
	    backgroundPosition: $el.css('background-position'),
	    backgroundRepeat: $el.css('background-repeat'),
	    backgroundSize: $el.css('background-size')
	  };
	}

	function destroyDomStructure($node, cssClasses) {
	  var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));

	  // need to remove attrs that weren't previously defined and
	  // revert attrs that originally had a value
	  _.each($input.data(attrsKey), function(val, key) {
	    if (val === undefined) {
	      $input.removeAttr(key);
	    } else {
	      $input.attr(key, val);
	    }
	  });

	  $input
	    .detach()
	    .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
	    .insertAfter($node);
	  if ($input.removeData) {
	    $input.removeData(attrsKey);
	  }

	  $node.remove();
	}

	Typeahead.Dropdown = Dropdown;
	Typeahead.Input = Input;
	Typeahead.sources = __webpack_require__(20);

	module.exports = Typeahead;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var namespace = 'autocomplete:';

	var _ = __webpack_require__(4);
	var DOM = __webpack_require__(2);

	// constructor
	// -----------

	function EventBus(o) {
	  if (!o || !o.el) {
	    _.error('EventBus initialized without el');
	  }

	  this.$el = DOM.element(o.el);
	}

	// instance methods
	// ----------------

	_.mixin(EventBus.prototype, {

	  // ### public

	  trigger: function(type, suggestion, dataset, context) {
	    var event = _.Event(namespace + type);
	    this.$el.trigger(event, [suggestion, dataset, context]);
	    return event;
	  }
	});

	module.exports = EventBus;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var specialKeyCodeMap;

	specialKeyCodeMap = {
	  9: 'tab',
	  27: 'esc',
	  37: 'left',
	  39: 'right',
	  13: 'enter',
	  38: 'up',
	  40: 'down'
	};

	var _ = __webpack_require__(4);
	var DOM = __webpack_require__(2);
	var EventEmitter = __webpack_require__(8);

	// constructor
	// -----------

	function Input(o) {
	  var that = this;
	  var onBlur;
	  var onFocus;
	  var onKeydown;
	  var onInput;

	  o = o || {};

	  if (!o.input) {
	    _.error('input is missing');
	  }

	  // bound functions
	  onBlur = _.bind(this._onBlur, this);
	  onFocus = _.bind(this._onFocus, this);
	  onKeydown = _.bind(this._onKeydown, this);
	  onInput = _.bind(this._onInput, this);

	  this.$hint = DOM.element(o.hint);
	  this.$input = DOM.element(o.input)
	    .on('blur.aa', onBlur)
	    .on('focus.aa', onFocus)
	    .on('keydown.aa', onKeydown);

	  // if no hint, noop all the hint related functions
	  if (this.$hint.length === 0) {
	    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
	  }

	  // ie7 and ie8 don't support the input event
	  // ie9 doesn't fire the input event when characters are removed
	  // not sure if ie10 is compatible
	  if (!_.isMsie()) {
	    this.$input.on('input.aa', onInput);
	  } else {
	    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
	      // if a special key triggered this, ignore it
	      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
	        return;
	      }

	      // give the browser a chance to update the value of the input
	      // before checking to see if the query changed
	      _.defer(_.bind(that._onInput, that, $e));
	    });
	  }

	  // the query defaults to whatever the value of the input is
	  // on initialization, it'll most likely be an empty string
	  this.query = this.$input.val();

	  // helps with calculating the width of the input's value
	  this.$overflowHelper = buildOverflowHelper(this.$input);
	}

	// static methods
	// --------------

	Input.normalizeQuery = function(str) {
	  // strips leading whitespace and condenses all whitespace
	  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
	};

	// instance methods
	// ----------------

	_.mixin(Input.prototype, EventEmitter, {

	  // ### private

	  _onBlur: function onBlur() {
	    this.resetInputValue();
	    this.$input.removeAttr('aria-activedescendant');
	    this.trigger('blurred');
	  },

	  _onFocus: function onFocus() {
	    this.trigger('focused');
	  },

	  _onKeydown: function onKeydown($e) {
	    // which is normalized and consistent (but not for ie)
	    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

	    this._managePreventDefault(keyName, $e);
	    if (keyName && this._shouldTrigger(keyName, $e)) {
	      this.trigger(keyName + 'Keyed', $e);
	    }
	  },

	  _onInput: function onInput() {
	    this._checkInputValue();
	  },

	  _managePreventDefault: function managePreventDefault(keyName, $e) {
	    var preventDefault;
	    var hintValue;
	    var inputValue;

	    switch (keyName) {
	    case 'tab':
	      hintValue = this.getHint();
	      inputValue = this.getInputValue();

	      preventDefault = hintValue &&
	        hintValue !== inputValue &&
	        !withModifier($e);
	      break;

	    case 'up':
	    case 'down':
	      preventDefault = !withModifier($e);
	      break;

	    default:
	      preventDefault = false;
	    }

	    if (preventDefault) {
	      $e.preventDefault();
	    }
	  },

	  _shouldTrigger: function shouldTrigger(keyName, $e) {
	    var trigger;

	    switch (keyName) {
	    case 'tab':
	      trigger = !withModifier($e);
	      break;

	    default:
	      trigger = true;
	    }

	    return trigger;
	  },

	  _checkInputValue: function checkInputValue() {
	    var inputValue;
	    var areEquivalent;
	    var hasDifferentWhitespace;

	    inputValue = this.getInputValue();
	    areEquivalent = areQueriesEquivalent(inputValue, this.query);
	    hasDifferentWhitespace = areEquivalent && this.query ?
	      this.query.length !== inputValue.length : false;

	    this.query = inputValue;

	    if (!areEquivalent) {
	      this.trigger('queryChanged', this.query);
	    } else if (hasDifferentWhitespace) {
	      this.trigger('whitespaceChanged', this.query);
	    }
	  },

	  // ### public

	  focus: function focus() {
	    this.$input.focus();
	  },

	  blur: function blur() {
	    this.$input.blur();
	  },

	  getQuery: function getQuery() {
	    return this.query;
	  },

	  setQuery: function setQuery(query) {
	    this.query = query;
	  },

	  getInputValue: function getInputValue() {
	    return this.$input.val();
	  },

	  setInputValue: function setInputValue(value, silent) {
	    if (typeof value === 'undefined') {
	      value = this.query;
	    }
	    this.$input.val(value);

	    // silent prevents any additional events from being triggered
	    if (silent) {
	      this.clearHint();
	    } else {
	      this._checkInputValue();
	    }
	  },

	  expand: function expand() {
	    this.$input.attr('aria-expanded', 'true');
	  },

	  collapse: function collapse() {
	    this.$input.attr('aria-expanded', 'false');
	  },

	  setActiveDescendant: function setActiveDescendant(activedescendantId) {
	    this.$input.attr('aria-activedescendant', activedescendantId);
	  },

	  removeActiveDescendant: function removeActiveDescendant() {
	    this.$input.removeAttr('aria-activedescendant');
	  },

	  resetInputValue: function resetInputValue() {
	    this.setInputValue(this.query, true);
	  },

	  getHint: function getHint() {
	    return this.$hint.val();
	  },

	  setHint: function setHint(value) {
	    this.$hint.val(value);
	  },

	  clearHint: function clearHint() {
	    this.setHint('');
	  },

	  clearHintIfInvalid: function clearHintIfInvalid() {
	    var val;
	    var hint;
	    var valIsPrefixOfHint;
	    var isValid;

	    val = this.getInputValue();
	    hint = this.getHint();
	    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
	    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

	    if (!isValid) {
	      this.clearHint();
	    }
	  },

	  getLanguageDirection: function getLanguageDirection() {
	    return (this.$input.css('direction') || 'ltr').toLowerCase();
	  },

	  hasOverflow: function hasOverflow() {
	    // 2 is arbitrary, just picking a small number to handle edge cases
	    var constraint = this.$input.width() - 2;

	    this.$overflowHelper.text(this.getInputValue());

	    return this.$overflowHelper.width() >= constraint;
	  },

	  isCursorAtEnd: function() {
	    var valueLength;
	    var selectionStart;
	    var range;

	    valueLength = this.$input.val().length;
	    selectionStart = this.$input[0].selectionStart;

	    if (_.isNumber(selectionStart)) {
	      return selectionStart === valueLength;
	    } else if (document.selection) {
	      // NOTE: this won't work unless the input has focus, the good news
	      // is this code should only get called when the input has focus
	      range = document.selection.createRange();
	      range.moveStart('character', -valueLength);

	      return valueLength === range.text.length;
	    }

	    return true;
	  },

	  destroy: function destroy() {
	    this.$hint.off('.aa');
	    this.$input.off('.aa');

	    this.$hint = this.$input = this.$overflowHelper = null;
	  }
	});

	// helper functions
	// ----------------

	function buildOverflowHelper($input) {
	  return DOM.element('<pre aria-hidden="true"></pre>')
	    .css({
	      // position helper off-screen
	      position: 'absolute',
	      visibility: 'hidden',
	      // avoid line breaks and whitespace collapsing
	      whiteSpace: 'pre',
	      // use same font css as input to calculate accurate width
	      fontFamily: $input.css('font-family'),
	      fontSize: $input.css('font-size'),
	      fontStyle: $input.css('font-style'),
	      fontVariant: $input.css('font-variant'),
	      fontWeight: $input.css('font-weight'),
	      wordSpacing: $input.css('word-spacing'),
	      letterSpacing: $input.css('letter-spacing'),
	      textIndent: $input.css('text-indent'),
	      textRendering: $input.css('text-rendering'),
	      textTransform: $input.css('text-transform')
	    })
	    .insertAfter($input);
	}

	function areQueriesEquivalent(a, b) {
	  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
	}

	function withModifier($e) {
	  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
	}

	module.exports = Input;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var immediate = __webpack_require__(9);
	var splitter = /\s+/;

	module.exports = {
	  onSync: onSync,
	  onAsync: onAsync,
	  off: off,
	  trigger: trigger
	};

	function on(method, types, cb, context) {
	  var type;

	  if (!cb) {
	    return this;
	  }

	  types = types.split(splitter);
	  cb = context ? bindContext(cb, context) : cb;

	  this._callbacks = this._callbacks || {};

	  while (type = types.shift()) {
	    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
	    this._callbacks[type][method].push(cb);
	  }

	  return this;
	}

	function onAsync(types, cb, context) {
	  return on.call(this, 'async', types, cb, context);
	}

	function onSync(types, cb, context) {
	  return on.call(this, 'sync', types, cb, context);
	}

	function off(types) {
	  var type;

	  if (!this._callbacks) {
	    return this;
	  }

	  types = types.split(splitter);

	  while (type = types.shift()) {
	    delete this._callbacks[type];
	  }

	  return this;
	}

	function trigger(types) {
	  var type;
	  var callbacks;
	  var args;
	  var syncFlush;
	  var asyncFlush;

	  if (!this._callbacks) {
	    return this;
	  }

	  types = types.split(splitter);
	  args = [].slice.call(arguments, 1);

	  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
	    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
	    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

	    if (syncFlush()) {
	      immediate(asyncFlush);
	    }
	  }

	  return this;
	}

	function getFlush(callbacks, context, args) {
	  return flush;

	  function flush() {
	    var cancelled;

	    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
	      // only cancel if the callback explicitly returns false
	      cancelled = callbacks[i].apply(context, args) === false;
	    }

	    return !cancelled;
	  }
	}

	function bindContext(fn, context) {
	  return fn.bind ?
	    fn.bind(context) :
	    function() { fn.apply(context, [].slice.call(arguments, 0)); };
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var types = [
	  __webpack_require__(10),
	  __webpack_require__(12),
	  __webpack_require__(13),
	  __webpack_require__(14),
	  __webpack_require__(15)
	];
	var draining;
	var currentQueue;
	var queueIndex = -1;
	var queue = [];
	var scheduled = false;
	function cleanUpNextTick() {
	  if (!draining || !currentQueue) {
	    return;
	  }
	  draining = false;
	  if (currentQueue.length) {
	    queue = currentQueue.concat(queue);
	  } else {
	    queueIndex = -1;
	  }
	  if (queue.length) {
	    nextTick();
	  }
	}

	//named nextTick for less confusing stack traces
	function nextTick() {
	  if (draining) {
	    return;
	  }
	  scheduled = false;
	  draining = true;
	  var len = queue.length;
	  var timeout = setTimeout(cleanUpNextTick);
	  while (len) {
	    currentQueue = queue;
	    queue = [];
	    while (currentQueue && ++queueIndex < len) {
	      currentQueue[queueIndex].run();
	    }
	    queueIndex = -1;
	    len = queue.length;
	  }
	  currentQueue = null;
	  queueIndex = -1;
	  draining = false;
	  clearTimeout(timeout);
	}
	var scheduleDrain;
	var i = -1;
	var len = types.length;
	while (++i < len) {
	  if (types[i] && types[i].test && types[i].test()) {
	    scheduleDrain = types[i].install(nextTick);
	    break;
	  }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	  this.fun = fun;
	  this.array = array;
	}
	Item.prototype.run = function () {
	  var fun = this.fun;
	  var array = this.array;
	  switch (array.length) {
	  case 0:
	    return fun();
	  case 1:
	    return fun(array[0]);
	  case 2:
	    return fun(array[0], array[1]);
	  case 3:
	    return fun(array[0], array[1], array[2]);
	  default:
	    return fun.apply(null, array);
	  }

	};
	module.exports = immediate;
	function immediate(task) {
	  var args = new Array(arguments.length - 1);
	  if (arguments.length > 1) {
	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }
	  }
	  queue.push(new Item(task, args));
	  if (!scheduled && !draining) {
	    scheduled = true;
	    scheduleDrain();
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	exports.test = function () {
	  // Don't get fooled by e.g. browserify environments.
	  return (typeof process !== 'undefined') && !process.browser;
	};

	exports.install = function (func) {
	  return function () {
	    process.nextTick(func);
	  };
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	//based off rsvp https://github.com/tildeio/rsvp.js
	//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
	//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

	var Mutation = global.MutationObserver || global.WebKitMutationObserver;

	exports.test = function () {
	  return Mutation;
	};

	exports.install = function (handle) {
	  var called = 0;
	  var observer = new Mutation(handle);
	  var element = global.document.createTextNode('');
	  observer.observe(element, {
	    characterData: true
	  });
	  return function () {
	    element.data = (called = ++called % 2);
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.test = function () {
	  if (global.setImmediate) {
	    // we can only get here in IE10
	    // which doesn't handel postMessage well
	    return false;
	  }
	  return typeof global.MessageChannel !== 'undefined';
	};

	exports.install = function (func) {
	  var channel = new global.MessageChannel();
	  channel.port1.onmessage = func;
	  return function () {
	    channel.port2.postMessage(0);
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.test = function () {
	  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
	};

	exports.install = function (handle) {
	  return function () {

	    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	    var scriptEl = global.document.createElement('script');
	    scriptEl.onreadystatechange = function () {
	      handle();

	      scriptEl.onreadystatechange = null;
	      scriptEl.parentNode.removeChild(scriptEl);
	      scriptEl = null;
	    };
	    global.document.documentElement.appendChild(scriptEl);

	    return handle;
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	exports.test = function () {
	  return true;
	};

	exports.install = function (t) {
	  return function () {
	    setTimeout(t, 0);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(4);
	var DOM = __webpack_require__(2);
	var EventEmitter = __webpack_require__(8);
	var Dataset = __webpack_require__(17);
	var css = __webpack_require__(19);

	// constructor
	// -----------

	function Dropdown(o) {
	  var that = this;
	  var onSuggestionClick;
	  var onSuggestionMouseEnter;
	  var onSuggestionMouseLeave;

	  o = o || {};

	  if (!o.menu) {
	    _.error('menu is required');
	  }

	  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
	    _.error('1 or more datasets required');
	  }
	  if (!o.datasets) {
	    _.error('datasets is required');
	  }

	  this.isOpen = false;
	  this.isEmpty = true;
	  this.minLength = o.minLength || 0;
	  this.templates = {};
	  this.appendTo = o.appendTo || false;
	  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
	  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	  this.cssClasses.prefix =
	    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

	  // bound functions
	  onSuggestionClick = _.bind(this._onSuggestionClick, this);
	  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
	  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

	  var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
	  this.$menu = DOM.element(o.menu)
	    .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
	    .on('mouseleave.aa', cssClass, onSuggestionMouseLeave)
	    .on('click.aa', cssClass, onSuggestionClick);

	  this.$container = o.appendTo ? o.wrapper : this.$menu;

	  if (o.templates && o.templates.header) {
	    this.templates.header = _.templatify(o.templates.header);
	    this.$menu.prepend(this.templates.header());
	  }

	  if (o.templates && o.templates.empty) {
	    this.templates.empty = _.templatify(o.templates.empty);
	    this.$empty = DOM.element('<div class="' +
	      _.className(this.cssClasses.prefix, this.cssClasses.empty, true) + '">' +
	      '</div>');
	    this.$menu.append(this.$empty);
	    this.$empty.hide();
	  }

	  this.datasets = _.map(o.datasets, function(oDataset) {
	    return initializeDataset(that.$menu, oDataset, o.cssClasses);
	  });
	  _.each(this.datasets, function(dataset) {
	    var root = dataset.getRoot();
	    if (root && root.parent().length === 0) {
	      that.$menu.append(root);
	    }
	    dataset.onSync('rendered', that._onRendered, that);
	  });

	  if (o.templates && o.templates.footer) {
	    this.templates.footer = _.templatify(o.templates.footer);
	    this.$menu.append(this.templates.footer());
	  }

	  var self = this;
	  DOM.element(window).resize(function() {
	    self._redraw();
	  });
	}

	// instance methods
	// ----------------

	_.mixin(Dropdown.prototype, EventEmitter, {

	  // ### private

	  _onSuggestionClick: function onSuggestionClick($e) {
	    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
	  },

	  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
	    var elt = DOM.element($e.currentTarget);
	    if (elt.hasClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))) {
	      // we're already on the cursor
	      // => we're probably entering it again after leaving it for a nested div
	      return;
	    }
	    this._removeCursor();

	    // Fixes iOS double tap behaviour, by modifying the DOM right before the
	    // native href clicks happens, iOS will requires another tap to follow
	    // a suggestion that has an <a href> element inside
	    // https://www.google.com/search?q=ios+double+tap+bug+href
	    var suggestion = this;
	    setTimeout(function() {
	      // this exact line, when inside the main loop, will trigger a double tap bug
	      // on iOS devices
	      suggestion._setCursor(elt, false);
	    }, 0);
	  },

	  _onSuggestionMouseLeave: function onSuggestionMouseLeave($e) {
	    // $e.relatedTarget is the `EventTarget` the pointing device entered to
	    if ($e.relatedTarget) {
	      var elt = DOM.element($e.relatedTarget);
	      if (elt.closest('.' + _.className(this.cssClasses.prefix, this.cssClasses.cursor, true)).length > 0) {
	        // our father is a cursor
	        // => it means we're just leaving the suggestion for a nested div
	        return;
	      }
	    }
	    this._removeCursor();
	    this.trigger('cursorRemoved');
	  },

	  _onRendered: function onRendered(e, query) {
	    this.isEmpty = _.every(this.datasets, isDatasetEmpty);

	    if (this.isEmpty) {
	      if (query.length >= this.minLength) {
	        this.trigger('empty');
	      }

	      if (this.$empty) {
	        if (query.length < this.minLength) {
	          this._hide();
	        } else {
	          var html = this.templates.empty({
	            query: this.datasets[0] && this.datasets[0].query
	          });
	          this.$empty.html(html);
	          this.$empty.show();
	          this._show();
	        }
	      } else if (_.any(this.datasets, hasEmptyTemplate)) {
	        if (query.length < this.minLength) {
	          this._hide();
	        } else {
	          this._show();
	        }
	      } else {
	        this._hide();
	      }
	    } else if (this.isOpen) {
	      if (this.$empty) {
	        this.$empty.empty();
	        this.$empty.hide();
	      }

	      if (query.length >= this.minLength) {
	        this._show();
	      } else {
	        this._hide();
	      }
	    }

	    this.trigger('datasetRendered');

	    function isDatasetEmpty(dataset) {
	      return dataset.isEmpty();
	    }

	    function hasEmptyTemplate(dataset) {
	      return dataset.templates && dataset.templates.empty;
	    }
	  },

	  _hide: function() {
	    this.$container.hide();
	  },

	  _show: function() {
	    // can't use jQuery#show because $menu is a span element we want
	    // display: block; not dislay: inline;
	    this.$container.css('display', 'block');

	    this._redraw();

	    this.trigger('shown');
	  },

	  _redraw: function redraw() {
	    if (!this.isOpen || !this.appendTo) return;

	    this.trigger('redrawn');
	  },

	  _getSuggestions: function getSuggestions() {
	    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
	  },

	  _getCursor: function getCursor() {
	    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
	  },

	  _setCursor: function setCursor($el, updateInput) {
	    $el.first()
	      .addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
	      .attr('aria-selected', 'true');
	    this.trigger('cursorMoved', updateInput);
	  },

	  _removeCursor: function removeCursor() {
	    this._getCursor()
	      .removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
	      .removeAttr('aria-selected');
	  },

	  _moveCursor: function moveCursor(increment) {
	    var $suggestions;
	    var $oldCursor;
	    var newCursorIndex;
	    var $newCursor;

	    if (!this.isOpen) {
	      return;
	    }

	    $oldCursor = this._getCursor();
	    $suggestions = this._getSuggestions();

	    this._removeCursor();

	    // shifting before and after modulo to deal with -1 index
	    newCursorIndex = $suggestions.index($oldCursor) + increment;
	    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

	    if (newCursorIndex === -1) {
	      this.trigger('cursorRemoved');

	      return;
	    } else if (newCursorIndex < -1) {
	      newCursorIndex = $suggestions.length - 1;
	    }

	    this._setCursor($newCursor = $suggestions.eq(newCursorIndex), true);

	    // in the case of scrollable overflow
	    // make sure the cursor is visible in the menu
	    this._ensureVisible($newCursor);
	  },

	  _ensureVisible: function ensureVisible($el) {
	    var elTop;
	    var elBottom;
	    var menuScrollTop;
	    var menuHeight;

	    elTop = $el.position().top;
	    elBottom = elTop + $el.height() +
	      parseInt($el.css('margin-top'), 10) +
	      parseInt($el.css('margin-bottom'), 10);
	    menuScrollTop = this.$menu.scrollTop();
	    menuHeight = this.$menu.height() +
	      parseInt(this.$menu.css('padding-top'), 10) +
	      parseInt(this.$menu.css('padding-bottom'), 10);

	    if (elTop < 0) {
	      this.$menu.scrollTop(menuScrollTop + elTop);
	    } else if (menuHeight < elBottom) {
	      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
	    }
	  },

	  // ### public

	  close: function close() {
	    if (this.isOpen) {
	      this.isOpen = false;

	      this._removeCursor();
	      this._hide();

	      this.trigger('closed');
	    }
	  },

	  open: function open() {
	    if (!this.isOpen) {
	      this.isOpen = true;

	      if (!this.isEmpty) {
	        this._show();
	      }

	      this.trigger('opened');
	    }
	  },

	  setLanguageDirection: function setLanguageDirection(dir) {
	    this.$menu.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
	  },

	  moveCursorUp: function moveCursorUp() {
	    this._moveCursor(-1);
	  },

	  moveCursorDown: function moveCursorDown() {
	    this._moveCursor(+1);
	  },

	  getDatumForSuggestion: function getDatumForSuggestion($el) {
	    var datum = null;

	    if ($el.length) {
	      datum = {
	        raw: Dataset.extractDatum($el),
	        value: Dataset.extractValue($el),
	        datasetName: Dataset.extractDatasetName($el)
	      };
	    }

	    return datum;
	  },

	  getCurrentCursor: function getCurrentCursor() {
	    return this._getCursor().first();
	  },

	  getDatumForCursor: function getDatumForCursor() {
	    return this.getDatumForSuggestion(this._getCursor().first());
	  },

	  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
	    return this.getDatumForSuggestion(this._getSuggestions().first());
	  },

	  cursorTopSuggestion: function cursorTopSuggestion() {
	    this._setCursor(this._getSuggestions().first(), false);
	  },

	  update: function update(query) {
	    _.each(this.datasets, updateDataset);

	    function updateDataset(dataset) {
	      dataset.update(query);
	    }
	  },

	  empty: function empty() {
	    _.each(this.datasets, clearDataset);
	    this.isEmpty = true;

	    function clearDataset(dataset) {
	      dataset.clear();
	    }
	  },

	  isVisible: function isVisible() {
	    return this.isOpen && !this.isEmpty;
	  },

	  destroy: function destroy() {
	    this.$menu.off('.aa');

	    this.$menu = null;

	    _.each(this.datasets, destroyDataset);

	    function destroyDataset(dataset) {
	      dataset.destroy();
	    }
	  }
	});

	// helper functions
	// ----------------
	Dropdown.Dataset = Dataset;

	function initializeDataset($menu, oDataset, cssClasses) {
	  return new Dropdown.Dataset(_.mixin({$menu: $menu, cssClasses: cssClasses}, oDataset));
	}

	module.exports = Dropdown;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var datasetKey = 'aaDataset';
	var valueKey = 'aaValue';
	var datumKey = 'aaDatum';

	var _ = __webpack_require__(4);
	var DOM = __webpack_require__(2);
	var html = __webpack_require__(18);
	var css = __webpack_require__(19);
	var EventEmitter = __webpack_require__(8);

	// constructor
	// -----------

	function Dataset(o) {
	  o = o || {};
	  o.templates = o.templates || {};

	  if (!o.source) {
	    _.error('missing source');
	  }

	  if (o.name && !isValidName(o.name)) {
	    _.error('invalid dataset name: ' + o.name);
	  }

	  // tracks the last query the dataset was updated for
	  this.query = null;
	  this._isEmpty = true;

	  this.highlight = !!o.highlight;
	  this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;

	  this.source = o.source;
	  this.displayFn = getDisplayFn(o.display || o.displayKey);

	  this.debounce = o.debounce;

	  this.cache = o.cache !== false;

	  this.templates = getTemplates(o.templates, this.displayFn);

	  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
	  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
	  this.cssClasses.prefix =
	    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

	  var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
	  this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
	    DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
	    DOM.element(
	      html.dataset.replace('%CLASS%', this.name)
	        .replace('%PREFIX%', this.cssClasses.prefix)
	        .replace('%DATASET%', this.cssClasses.dataset)
	    );

	  this.$menu = o.$menu;
	  this.clearCachedSuggestions();
	}

	// static methods
	// --------------

	Dataset.extractDatasetName = function extractDatasetName(el) {
	  return DOM.element(el).data(datasetKey);
	};

	Dataset.extractValue = function extractValue(el) {
	  return DOM.element(el).data(valueKey);
	};

	Dataset.extractDatum = function extractDatum(el) {
	  var datum = DOM.element(el).data(datumKey);
	  if (typeof datum === 'string') {
	    // Zepto has an automatic deserialization of the
	    // JSON encoded data attribute
	    datum = JSON.parse(datum);
	  }
	  return datum;
	};

	// instance methods
	// ----------------

	_.mixin(Dataset.prototype, EventEmitter, {

	  // ### private

	  _render: function render(query, suggestions) {
	    if (!this.$el) {
	      return;
	    }
	    var that = this;

	    var hasSuggestions;
	    var renderArgs = [].slice.call(arguments, 2);
	    this.$el.empty();

	    hasSuggestions = suggestions && suggestions.length;
	    this._isEmpty = !hasSuggestions;

	    if (!hasSuggestions && this.templates.empty) {
	      this.$el
	        .html(getEmptyHtml.apply(this, renderArgs))
	        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
	        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
	    } else if (hasSuggestions) {
	      this.$el
	        .html(getSuggestionsHtml.apply(this, renderArgs))
	        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
	        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
	    } else if (suggestions && !Array.isArray(suggestions)) {
	      throw new TypeError('suggestions must be an array');
	    }

	    if (this.$menu) {
	      this.$menu.addClass(
	        this.cssClasses.prefix + (hasSuggestions ? 'with' : 'without') + '-' + this.name
	      ).removeClass(
	        this.cssClasses.prefix + (hasSuggestions ? 'without' : 'with') + '-' + this.name
	      );
	    }

	    this.trigger('rendered', query);

	    function getEmptyHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: true}].concat(args);
	      return that.templates.empty.apply(this, args);
	    }

	    function getSuggestionsHtml() {
	      var args = [].slice.call(arguments, 0);
	      var $suggestions;
	      var nodes;
	      var self = this;

	      var suggestionsHtml = html.suggestions.
	        replace('%PREFIX%', this.cssClasses.prefix).
	        replace('%SUGGESTIONS%', this.cssClasses.suggestions);
	      $suggestions = DOM
	        .element(suggestionsHtml)
	        .css(this.css.suggestions);

	      // jQuery#append doesn't support arrays as the first argument
	      // until version 1.8, see http://bugs.jquery.com/ticket/11231
	      nodes = _.map(suggestions, getSuggestionNode);
	      $suggestions.append.apply($suggestions, nodes);

	      return $suggestions;

	      function getSuggestionNode(suggestion) {
	        var $el;

	        var suggestionHtml = html.suggestion.
	          replace('%PREFIX%', self.cssClasses.prefix).
	          replace('%SUGGESTION%', self.cssClasses.suggestion);
	        $el = DOM.element(suggestionHtml)
	          .attr({
	            role: 'option',
	            id: ['option', Math.floor(Math.random() * 100000000)].join('-')
	          })
	          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));

	        $el.data(datasetKey, that.name);
	        $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
	        $el.data(datumKey, JSON.stringify(suggestion));
	        $el.children().each(function() { DOM.element(this).css(self.css.suggestionChild); });

	        return $el;
	      }
	    }

	    function getHeaderHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
	      return that.templates.header.apply(this, args);
	    }

	    function getFooterHtml() {
	      var args = [].slice.call(arguments, 0);
	      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
	      return that.templates.footer.apply(this, args);
	    }
	  },

	  // ### public

	  getRoot: function getRoot() {
	    return this.$el;
	  },

	  update: function update(query) {
	    function handleSuggestions(suggestions) {
	      // if the update has been canceled or if the query has changed
	      // do not render the suggestions as they've become outdated
	      if (!this.canceled && query === this.query) {
	        // concat all the other arguments that could have been passed
	        // to the render function, and forward them to _render
	        var extraArgs = [].slice.call(arguments, 1);
	        this.cacheSuggestions(query, suggestions, extraArgs);
	        this._render.apply(this, [query, suggestions].concat(extraArgs));
	      }
	    }

	    this.query = query;
	    this.canceled = false;

	    if (this.shouldFetchFromCache(query)) {
	      handleSuggestions.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
	    } else {
	      var that = this;
	      var execSource = function() {
	        // When the call is debounced the condition avoid to do a useless
	        // request with the last character when the input has been cleared
	        if (!that.canceled) {
	          that.source(query, handleSuggestions.bind(that));
	        }
	      };

	      if (this.debounce) {
	        var later = function() {
	          that.debounceTimeout = null;
	          execSource();
	        };
	        clearTimeout(this.debounceTimeout);
	        this.debounceTimeout = setTimeout(later, this.debounce);
	      } else {
	        execSource();
	      }
	    }
	  },

	  cacheSuggestions: function cacheSuggestions(query, suggestions, extraArgs) {
	    this.cachedQuery = query;
	    this.cachedSuggestions = suggestions;
	    this.cachedRenderExtraArgs = extraArgs;
	  },

	  shouldFetchFromCache: function shouldFetchFromCache(query) {
	    return this.cache &&
	      this.cachedQuery === query &&
	      this.cachedSuggestions &&
	      this.cachedSuggestions.length;
	  },

	  clearCachedSuggestions: function clearCachedSuggestions() {
	    delete this.cachedQuery;
	    delete this.cachedSuggestions;
	    delete this.cachedRenderExtraArgs;
	  },

	  cancel: function cancel() {
	    this.canceled = true;
	  },

	  clear: function clear() {
	    this.cancel();
	    this.$el.empty();
	    this.trigger('rendered', '');
	  },

	  isEmpty: function isEmpty() {
	    return this._isEmpty;
	  },

	  destroy: function destroy() {
	    this.clearCachedSuggestions();
	    this.$el = null;
	  }
	});

	// helper functions
	// ----------------

	function getDisplayFn(display) {
	  display = display || 'value';

	  return _.isFunction(display) ? display : displayFn;

	  function displayFn(obj) {
	    return obj[display];
	  }
	}

	function getTemplates(templates, displayFn) {
	  return {
	    empty: templates.empty && _.templatify(templates.empty),
	    header: templates.header && _.templatify(templates.header),
	    footer: templates.footer && _.templatify(templates.footer),
	    suggestion: templates.suggestion || suggestionTemplate
	  };

	  function suggestionTemplate(context) {
	    return '<p>' + displayFn(context) + '</p>';
	  }
	}

	function isValidName(str) {
	  // dashes, underscores, letters, and numbers
	  return (/^[_a-zA-Z0-9-]+$/).test(str);
	}

	module.exports = Dataset;


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  wrapper: '<span class="%ROOT%"></span>',
	  dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
	  dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
	  suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
	  suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(4);

	var css = {
	  wrapper: {
	    position: 'relative',
	    display: 'inline-block'
	  },
	  hint: {
	    position: 'absolute',
	    top: '0',
	    left: '0',
	    borderColor: 'transparent',
	    boxShadow: 'none',
	    // #741: fix hint opacity issue on iOS
	    opacity: '1'
	  },
	  input: {
	    position: 'relative',
	    verticalAlign: 'top',
	    backgroundColor: 'transparent'
	  },
	  inputWithNoHint: {
	    position: 'relative',
	    verticalAlign: 'top'
	  },
	  dropdown: {
	    position: 'absolute',
	    top: '100%',
	    left: '0',
	    zIndex: '100',
	    display: 'none'
	  },
	  suggestions: {
	    display: 'block'
	  },
	  suggestion: {
	    whiteSpace: 'nowrap',
	    cursor: 'pointer'
	  },
	  suggestionChild: {
	    whiteSpace: 'normal'
	  },
	  ltr: {
	    left: '0',
	    right: 'auto'
	  },
	  rtl: {
	    left: 'auto',
	    right: '0'
	  },
	  defaultClasses: {
	    root: 'algolia-autocomplete',
	    prefix: 'aa',
	    noPrefix: false,
	    dropdownMenu: 'dropdown-menu',
	    input: 'input',
	    hint: 'hint',
	    suggestions: 'suggestions',
	    suggestion: 'suggestion',
	    cursor: 'cursor',
	    dataset: 'dataset',
	    empty: 'empty'
	  },
	  // will be merged with the default ones if appendTo is used
	  appendTo: {
	    wrapper: {
	      position: 'absolute',
	      zIndex: '100',
	      display: 'none'
	    },
	    input: {},
	    inputWithNoHint: {},
	    dropdown: {
	      display: 'block'
	    }
	  }
	};

	// ie specific styling
	if (_.isMsie()) {
	  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
	  // transparent backgrounds, for a workaround, use 1x1 transparent gif
	  _.mixin(css.input, {
	    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
	  });
	}

	// ie7 and under specific styling
	if (_.isMsie() && _.isMsie() <= 7) {
	  // if someone can tell me why this is necessary to align
	  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
	  _.mixin(css.input, {marginTop: '-1px'});
	}

	module.exports = css;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  hits: __webpack_require__(21),
	  popularIn: __webpack_require__(24)
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(4);
	var version = __webpack_require__(22);
	var parseAlgoliaClientVersion = __webpack_require__(23);

	module.exports = function search(index, params) {
	  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
	  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
	    params = params || {};
	    params.additionalUA = 'autocomplete.js ' + version;
	  }
	  return sourceFn;

	  function sourceFn(query, cb) {
	    index.search(query, params, function(error, content) {
	      if (error) {
	        _.error(error.message);
	        return;
	      }
	      cb(content.hits, content);
	    });
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "0.36.0";


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function parseAlgoliaClientVersion(agent) {
	  var parsed = agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);
	  if (parsed) return [parsed[1], parsed[2], parsed[3]];
	  return undefined;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(4);
	var version = __webpack_require__(22);
	var parseAlgoliaClientVersion = __webpack_require__(23);

	module.exports = function popularIn(index, params, details, options) {
	  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
	  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
	    params = params || {};
	    params.additionalUA = 'autocomplete.js ' + version;
	  }
	  if (!details.source) {
	    return _.error("Missing 'source' key");
	  }
	  var source = _.isFunction(details.source) ? details.source : function(hit) { return hit[details.source]; };

	  if (!details.index) {
	    return _.error("Missing 'index' key");
	  }
	  var detailsIndex = details.index;

	  options = options || {};

	  return sourceFn;

	  function sourceFn(query, cb) {
	    index.search(query, params, function(error, content) {
	      if (error) {
	        _.error(error.message);
	        return;
	      }

	      if (content.hits.length > 0) {
	        var first = content.hits[0];

	        var detailsParams = _.mixin({hitsPerPage: 0}, details);
	        delete detailsParams.source; // not a query parameter
	        delete detailsParams.index; // not a query parameter

	        var detailsAlgoliaVersion = parseAlgoliaClientVersion(detailsIndex.as._ua);
	        if (detailsAlgoliaVersion && detailsAlgoliaVersion[0] >= 3 && detailsAlgoliaVersion[1] > 20) {
	          params.additionalUA = 'autocomplete.js ' + version;
	        }

	        detailsIndex.search(source(first), detailsParams, function(error2, content2) {
	          if (error2) {
	            _.error(error2.message);
	            return;
	          }

	          var suggestions = [];

	          // add the 'all department' entry before others
	          if (options.includeAll) {
	            var label = options.allTitle || 'All departments';
	            suggestions.push(_.mixin({
	              facet: {value: label, count: content2.nbHits}
	            }, _.cloneDeep(first)));
	          }

	          // enrich the first hit iterating over the facets
	          _.each(content2.facets, function(values, facet) {
	            _.each(values, function(count, value) {
	              suggestions.push(_.mixin({
	                facet: {facet: facet, value: value, count: count}
	              }, _.cloneDeep(first)));
	            });
	          });

	          // append all other hits
	          for (var i = 1; i < content.hits.length; ++i) {
	            suggestions.push(content.hits[i]);
	          }

	          cb(suggestions, content);
	        });

	        return;
	      }

	      cb([]);
	    });
	  }
	};


/***/ }
/******/ ]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL2Rpc3QvYXV0b2NvbXBsZXRlLmpxdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxxQ0FBcUMsRUFBRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0Esa0NBQWtDLEVBQUU7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0Esb0NBQW9DLEVBQUU7QUFDdEMsSUFBSTs7QUFFSiw0QkFBNEIsZ0NBQWdDLEVBQUU7O0FBRTlEO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQyxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5QkFBeUI7QUFDNUQ7QUFDQSxpQ0FBaUMsb0JBQW9CO0FBQ3JELElBQUk7O0FBRUosd0JBQXdCLG1CQUFtQixFQUFFOztBQUU3QyxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MscUNBQXFDO0FBQ3JFLDhDQUE4Qyx3Q0FBd0M7QUFDdEY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQixFQUFFO0FBQzdDO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLDBDQUEwQyxxQkFBcUIsRUFBRTs7QUFFakUsK0NBQStDLFdBQVc7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQywyQkFBMkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLElBQUk7O0FBRUo7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELEdBQUc7QUFDMUQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwRUFBMEU7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0Q0FBNEMsdUJBQXVCO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdEQUFnRDtBQUNqRTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7O0FBRTdCLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFVBQVU7OztBQUd2QyxPQUFPO0FBQ1A7QUFDQTs7QUFFQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsNEJBQTRCLGFBQWEsRUFBRTs7QUFFeEUsT0FBTztBQUNQO0FBQ0E7O0FBRUEsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRCQUE0QixhQUFhLEVBQUU7O0FBRXhFLE9BQU87QUFDUDtBQUNBOztBQUVBLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRCQUE0QixhQUFhLEVBQUU7O0FBRXhFLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFDQUFxQztBQUM3RCw4Q0FBOEMsd0NBQXdDO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLHFDQUFxQztBQUM3RTs7QUFFQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHdCQUF3QixxQ0FBcUM7QUFDN0QsOENBQThDLHdDQUF3QztBQUN0RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQSxxRUFBcUU7QUFDckU7QUFDQSx5Q0FBeUMsaURBQWlELEVBQUU7O0FBRTVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLHVDQUF1QztBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsdUNBQXVDO0FBQ3ZEO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sY0FBYztBQUNkLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6Qzs7QUFFQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLDRCQUE0Qjs7QUFFM0c7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLGVBQWU7QUFDckQscUNBQXFDO0FBQ3JDLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZCxZQUFZOztBQUVaO0FBQ0EsMEJBQTBCLHlCQUF5QjtBQUNuRDtBQUNBOztBQUVBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7OztBQUdBO0FBQ0EsWSIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBhdXRvY29tcGxldGUuanMgMC4zNi4wXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWxnb2xpYS9hdXRvY29tcGxldGUuanNcbiAqIENvcHlyaWdodCAyMDE5IEFsZ29saWEsIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yczsgTGljZW5zZWQgTUlUXG4gKi9cbi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gc2V0dXAgRE9NIGVsZW1lbnRcblx0dmFyIERPTSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cdHZhciAkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblx0RE9NLmVsZW1lbnQgPSAkO1xuXG5cdC8vIHNldHVwIHV0aWxzIGZ1bmN0aW9uc1xuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cdF8uaXNBcnJheSA9ICQuaXNBcnJheTtcblx0Xy5pc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uO1xuXHRfLmlzT2JqZWN0ID0gJC5pc1BsYWluT2JqZWN0O1xuXHRfLmJpbmQgPSAkLnByb3h5O1xuXHRfLmVhY2ggPSBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuXHQgIC8vIHN0dXBpZCBhcmd1bWVudCBvcmRlciBmb3IgalF1ZXJ5LmVhY2hcblx0ICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuXHQgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuXHQgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG5cdCAgfVxuXHR9O1xuXHRfLm1hcCA9ICQubWFwO1xuXHRfLm1peGluID0gJC5leHRlbmQ7XG5cdF8uRXZlbnQgPSAkLkV2ZW50O1xuXG5cdHZhciBUeXBlYWhlYWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXHR2YXIgRXZlbnRCdXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBvbGQ7XG5cdHZhciB0eXBlYWhlYWRLZXk7XG5cdHZhciBtZXRob2RzO1xuXG5cdG9sZCA9ICQuZm4uYXV0b2NvbXBsZXRlO1xuXG5cdHR5cGVhaGVhZEtleSA9ICdhYUF1dG9jb21wbGV0ZSc7XG5cblx0bWV0aG9kcyA9IHtcblx0ICAvLyBzdXBwb3J0ZWQgc2lnbmF0dXJlczpcblx0ICAvLyBmdW5jdGlvbihvLCBkYXRhc2V0LCBkYXRhc2V0LCAuLi4pXG5cdCAgLy8gZnVuY3Rpb24obywgW2RhdGFzZXQsIGRhdGFzZXQsIC4uLl0pXG5cdCAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvLCBkYXRhc2V0cykge1xuXHQgICAgZGF0YXNldHMgPSBfLmlzQXJyYXkoZGF0YXNldHMpID8gZGF0YXNldHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0ICAgIG8gPSBvIHx8IHt9O1xuXG5cdCAgICByZXR1cm4gdGhpcy5lYWNoKGF0dGFjaCk7XG5cblx0ICAgIGZ1bmN0aW9uIGF0dGFjaCgpIHtcblx0ICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG5cdCAgICAgIHZhciBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyh7ZWw6ICRpbnB1dH0pO1xuXHQgICAgICB2YXIgdHlwZWFoZWFkO1xuXG5cdCAgICAgIHR5cGVhaGVhZCA9IG5ldyBUeXBlYWhlYWQoe1xuXHQgICAgICAgIGlucHV0OiAkaW5wdXQsXG5cdCAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuXHQgICAgICAgIGRyb3Bkb3duTWVudUNvbnRhaW5lcjogby5kcm9wZG93bk1lbnVDb250YWluZXIsXG5cdCAgICAgICAgaGludDogby5oaW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFvLmhpbnQsXG5cdCAgICAgICAgbWluTGVuZ3RoOiBvLm1pbkxlbmd0aCxcblx0ICAgICAgICBhdXRvc2VsZWN0OiBvLmF1dG9zZWxlY3QsXG5cdCAgICAgICAgYXV0b3NlbGVjdE9uQmx1cjogby5hdXRvc2VsZWN0T25CbHVyLFxuXHQgICAgICAgIHRhYkF1dG9jb21wbGV0ZTogby50YWJBdXRvY29tcGxldGUsXG5cdCAgICAgICAgb3Blbk9uRm9jdXM6IG8ub3Blbk9uRm9jdXMsXG5cdCAgICAgICAgdGVtcGxhdGVzOiBvLnRlbXBsYXRlcyxcblx0ICAgICAgICBkZWJ1Zzogby5kZWJ1Zyxcblx0ICAgICAgICBjbGVhck9uU2VsZWN0ZWQ6IG8uY2xlYXJPblNlbGVjdGVkLFxuXHQgICAgICAgIGNzc0NsYXNzZXM6IG8uY3NzQ2xhc3Nlcyxcblx0ICAgICAgICBkYXRhc2V0czogZGF0YXNldHMsXG5cdCAgICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IG8ua2V5Ym9hcmRTaG9ydGN1dHMsXG5cdCAgICAgICAgYXBwZW5kVG86IG8uYXBwZW5kVG8sXG5cdCAgICAgICAgYXV0b1dpZHRoOiBvLmF1dG9XaWR0aFxuXHQgICAgICB9KTtcblxuXHQgICAgICAkaW5wdXQuZGF0YSh0eXBlYWhlYWRLZXksIHR5cGVhaGVhZCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG5cdCAgICByZXR1cm4gdGhpcy5lYWNoKG9wZW5UeXBlYWhlYWQpO1xuXG5cdCAgICBmdW5jdGlvbiBvcGVuVHlwZWFoZWFkKCkge1xuXHQgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcblx0ICAgICAgdmFyIHR5cGVhaGVhZDtcblxuXHQgICAgICBpZiAodHlwZWFoZWFkID0gJGlucHV0LmRhdGEodHlwZWFoZWFkS2V5KSkge1xuXHQgICAgICAgIHR5cGVhaGVhZC5vcGVuKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuZWFjaChjbG9zZVR5cGVhaGVhZCk7XG5cblx0ICAgIGZ1bmN0aW9uIGNsb3NlVHlwZWFoZWFkKCkge1xuXHQgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKTtcblx0ICAgICAgdmFyIHR5cGVhaGVhZDtcblxuXHQgICAgICBpZiAodHlwZWFoZWFkID0gJGlucHV0LmRhdGEodHlwZWFoZWFkS2V5KSkge1xuXHQgICAgICAgIHR5cGVhaGVhZC5jbG9zZSgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHZhbDogZnVuY3Rpb24gdmFsKG5ld1ZhbCkge1xuXHQgICAgLy8gbWlycm9yIGpRdWVyeSN2YWwgZnVuY3Rpb25hbGl0eTogcmVhZCBvcGVyYXRlIG9uIGZpcnN0IG1hdGNoLFxuXHQgICAgLy8gd3JpdGUgb3BlcmF0ZXMgb24gYWxsIG1hdGNoZXNcblx0ICAgIHJldHVybiAhYXJndW1lbnRzLmxlbmd0aCA/IGdldFZhbCh0aGlzLmZpcnN0KCkpIDogdGhpcy5lYWNoKHNldFZhbCk7XG5cblx0ICAgIGZ1bmN0aW9uIHNldFZhbCgpIHtcblx0ICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG5cdCAgICAgIHZhciB0eXBlYWhlYWQ7XG5cblx0ICAgICAgaWYgKHR5cGVhaGVhZCA9ICRpbnB1dC5kYXRhKHR5cGVhaGVhZEtleSkpIHtcblx0ICAgICAgICB0eXBlYWhlYWQuc2V0VmFsKG5ld1ZhbCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZ2V0VmFsKCRpbnB1dCkge1xuXHQgICAgICB2YXIgdHlwZWFoZWFkO1xuXHQgICAgICB2YXIgcXVlcnk7XG5cblx0ICAgICAgaWYgKHR5cGVhaGVhZCA9ICRpbnB1dC5kYXRhKHR5cGVhaGVhZEtleSkpIHtcblx0ICAgICAgICBxdWVyeSA9IHR5cGVhaGVhZC5nZXRWYWwoKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIHJldHVybiBxdWVyeTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0ICAgIHJldHVybiB0aGlzLmVhY2godW5hdHRhY2gpO1xuXG5cdCAgICBmdW5jdGlvbiB1bmF0dGFjaCgpIHtcblx0ICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyk7XG5cdCAgICAgIHZhciB0eXBlYWhlYWQ7XG5cblx0ICAgICAgaWYgKHR5cGVhaGVhZCA9ICRpbnB1dC5kYXRhKHR5cGVhaGVhZEtleSkpIHtcblx0ICAgICAgICB0eXBlYWhlYWQuZGVzdHJveSgpO1xuXHQgICAgICAgICRpbnB1dC5yZW1vdmVEYXRhKHR5cGVhaGVhZEtleSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdH07XG5cblx0JC5mbi5hdXRvY29tcGxldGUgPSBmdW5jdGlvbihtZXRob2QpIHtcblx0ICB2YXIgdHRzO1xuXG5cdCAgLy8gbWV0aG9kcyB0aGF0IHNob3VsZCBvbmx5IGFjdCBvbiBpbnRpYWxpemVkIHR5cGVhaGVhZHNcblx0ICBpZiAobWV0aG9kc1ttZXRob2RdICYmIG1ldGhvZCAhPT0gJ2luaXRpYWxpemUnKSB7XG5cdCAgICAvLyBmaWx0ZXIgb3V0IG5vbi10eXBlYWhlYWQgaW5wdXRzXG5cdCAgICB0dHMgPSB0aGlzLmZpbHRlcihmdW5jdGlvbigpIHsgcmV0dXJuICEhJCh0aGlzKS5kYXRhKHR5cGVhaGVhZEtleSk7IH0pO1xuXHQgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0dHMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdCAgfVxuXHQgIHJldHVybiBtZXRob2RzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0fTtcblxuXHQkLmZuLmF1dG9jb21wbGV0ZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcblx0ICAkLmZuLmF1dG9jb21wbGV0ZSA9IG9sZDtcblx0ICByZXR1cm4gdGhpcztcblx0fTtcblxuXHQkLmZuLmF1dG9jb21wbGV0ZS5zb3VyY2VzID0gVHlwZWFoZWFkLnNvdXJjZXM7XG5cdCQuZm4uYXV0b2NvbXBsZXRlLmVzY2FwZUhpZ2hsaWdodGVkU3RyaW5nID0gXy5lc2NhcGVIaWdobGlnaHRlZFN0cmluZztcblxuXHRtb2R1bGUuZXhwb3J0cyA9ICQuZm4uYXV0b2NvbXBsZXRlO1xuXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgZWxlbWVudDogbnVsbFxuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuLyoqKi8gfSxcbi8qIDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgRE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHRmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XG5cdCAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgLy8gdGhvc2UgbWV0aG9kcyBhcmUgaW1wbGVtZW50ZWQgZGlmZmVyZW50bHlcblx0ICAvLyBkZXBlbmRpbmcgb24gd2hpY2ggYnVpbGQgaXQgaXMsIHVzaW5nXG5cdCAgLy8gJC4uLiBvciBhbmd1bGFyLi4uIG9yIFplcHRvLi4uIG9yIHJlcXVpcmUoLi4uKVxuXHQgIGlzQXJyYXk6IG51bGwsXG5cdCAgaXNGdW5jdGlvbjogbnVsbCxcblx0ICBpc09iamVjdDogbnVsbCxcblx0ICBiaW5kOiBudWxsLFxuXHQgIGVhY2g6IG51bGwsXG5cdCAgbWFwOiBudWxsLFxuXHQgIG1peGluOiBudWxsLFxuXG5cdCAgaXNNc2llOiBmdW5jdGlvbihhZ2VudFN0cmluZykge1xuXHQgICAgaWYgKGFnZW50U3RyaW5nID09PSB1bmRlZmluZWQpIHsgYWdlbnRTdHJpbmcgPSBuYXZpZ2F0b3IudXNlckFnZW50OyB9XG5cdCAgICAvLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm93c2VyL2Jsb2IvbWFzdGVyL2Jvd3Nlci5qc1xuXHQgICAgaWYgKCgvKG1zaWV8dHJpZGVudCkvaSkudGVzdChhZ2VudFN0cmluZykpIHtcblx0ICAgICAgdmFyIG1hdGNoID0gYWdlbnRTdHJpbmcubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSk7XG5cdCAgICAgIGlmIChtYXRjaCkgeyByZXR1cm4gbWF0Y2hbMl07IH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9LFxuXG5cdCAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjk2OTQ4NlxuXHQgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuXHQgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuXHQgIH0sXG5cblx0ICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJzsgfSxcblxuXHQgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG5cdCAgICByZXR1cm4gcyA9PT0gdW5kZWZpbmVkIHx8IHMgPT09IG51bGwgPyAnJyA6IHMgKyAnJztcblx0ICB9LFxuXG5cdCAgY2xvbmVEZWVwOiBmdW5jdGlvbiBjbG9uZURlZXAob2JqKSB7XG5cdCAgICB2YXIgY2xvbmUgPSB0aGlzLm1peGluKHt9LCBvYmopO1xuXHQgICAgdmFyIHNlbGYgPSB0aGlzO1xuXHQgICAgdGhpcy5lYWNoKGNsb25lLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cdCAgICAgIGlmICh2YWx1ZSkge1xuXHQgICAgICAgIGlmIChzZWxmLmlzQXJyYXkodmFsdWUpKSB7XG5cdCAgICAgICAgICBjbG9uZVtrZXldID0gW10uY29uY2F0KHZhbHVlKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKHNlbGYuaXNPYmplY3QodmFsdWUpKSB7XG5cdCAgICAgICAgICBjbG9uZVtrZXldID0gc2VsZi5jbG9uZURlZXAodmFsdWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICByZXR1cm4gY2xvbmU7XG5cdCAgfSxcblxuXHQgIGVycm9yOiBmdW5jdGlvbihtc2cpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuXHQgIH0sXG5cblx0ICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG5cdCAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcblx0ICAgIGlmICghb2JqKSB7XG5cdCAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9XG5cdCAgICB0aGlzLmVhY2gob2JqLCBmdW5jdGlvbih2YWwsIGtleSkge1xuXHQgICAgICBpZiAocmVzdWx0KSB7XG5cdCAgICAgICAgcmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopICYmIHJlc3VsdDtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICByZXR1cm4gISFyZXN1bHQ7XG5cdCAgfSxcblxuXHQgIGFueTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG5cdCAgICB2YXIgZm91bmQgPSBmYWxzZTtcblx0ICAgIGlmICghb2JqKSB7XG5cdCAgICAgIHJldHVybiBmb3VuZDtcblx0ICAgIH1cblx0ICAgIHRoaXMuZWFjaChvYmosIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG5cdCAgICAgIGlmICh0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcblx0ICAgICAgICBmb3VuZCA9IHRydWU7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblx0ICAgIHJldHVybiBmb3VuZDtcblx0ICB9LFxuXG5cdCAgZ2V0VW5pcXVlSWQ6IChmdW5jdGlvbigpIHtcblx0ICAgIHZhciBjb3VudGVyID0gMDtcblx0ICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGNvdW50ZXIrKzsgfTtcblx0ICB9KSgpLFxuXG5cdCAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcblx0ICAgIGlmICh0aGlzLmlzRnVuY3Rpb24ob2JqKSkge1xuXHQgICAgICByZXR1cm4gb2JqO1xuXHQgICAgfVxuXHQgICAgdmFyICR0ZW1wbGF0ZSA9IERPTS5lbGVtZW50KG9iaik7XG5cdCAgICBpZiAoJHRlbXBsYXRlLnByb3AoJ3RhZ05hbWUnKSA9PT0gJ1NDUklQVCcpIHtcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRlbXBsYXRlKCkgeyByZXR1cm4gJHRlbXBsYXRlLnRleHQoKTsgfTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHsgcmV0dXJuIFN0cmluZyhvYmopOyB9O1xuXHQgIH0sXG5cblx0ICBkZWZlcjogZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiwgMCk7IH0sXG5cblx0ICBub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdCAgZm9ybWF0UHJlZml4OiBmdW5jdGlvbihwcmVmaXgsIG5vUHJlZml4KSB7XG5cdCAgICByZXR1cm4gbm9QcmVmaXggPyAnJyA6IHByZWZpeCArICctJztcblx0ICB9LFxuXG5cdCAgY2xhc3NOYW1lOiBmdW5jdGlvbihwcmVmaXgsIGNsYXp6LCBza2lwRG90KSB7XG5cdCAgICByZXR1cm4gKHNraXBEb3QgPyAnJyA6ICcuJykgKyBwcmVmaXggKyBjbGF6ejtcblx0ICB9LFxuXG5cdCAgZXNjYXBlSGlnaGxpZ2h0ZWRTdHJpbmc6IGZ1bmN0aW9uKHN0ciwgaGlnaGxpZ2h0UHJlVGFnLCBoaWdobGlnaHRQb3N0VGFnKSB7XG5cdCAgICBoaWdobGlnaHRQcmVUYWcgPSBoaWdobGlnaHRQcmVUYWcgfHwgJzxlbT4nO1xuXHQgICAgdmFyIHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQgICAgcHJlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhpZ2hsaWdodFByZVRhZykpO1xuXG5cdCAgICBoaWdobGlnaHRQb3N0VGFnID0gaGlnaGxpZ2h0UG9zdFRhZyB8fCAnPC9lbT4nO1xuXHQgICAgdmFyIHBvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ICAgIHBvc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGlnaGxpZ2h0UG9zdFRhZykpO1xuXG5cdCAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG5cdCAgICByZXR1cm4gZGl2LmlubmVySFRNTFxuXHQgICAgICAucmVwbGFjZShSZWdFeHAoZXNjYXBlUmVnRXhwKHByZS5pbm5lckhUTUwpLCAnZycpLCBoaWdobGlnaHRQcmVUYWcpXG5cdCAgICAgIC5yZXBsYWNlKFJlZ0V4cChlc2NhcGVSZWdFeHAocG9zdC5pbm5lckhUTUwpLCAnZycpLCBoaWdobGlnaHRQb3N0VGFnKTtcblx0ICB9XG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgYXR0cnNLZXkgPSAnYWFBdHRycyc7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgRE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0dmFyIEV2ZW50QnVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIElucHV0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblx0dmFyIERyb3Bkb3duID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5cdHZhciBodG1sID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cdHZhciBjc3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxuXHQvLyBjb25zdHJ1Y3RvclxuXHQvLyAtLS0tLS0tLS0tLVxuXG5cdC8vIFRIT1VHSFQ6IHdoYXQgaWYgZGF0YXNldHMgY291bGQgZHluYW1pY2FsbHkgYmUgYWRkZWQvcmVtb3ZlZD9cblx0ZnVuY3Rpb24gVHlwZWFoZWFkKG8pIHtcblx0ICB2YXIgJG1lbnU7XG5cdCAgdmFyICRoaW50O1xuXG5cdCAgbyA9IG8gfHwge307XG5cblx0ICBpZiAoIW8uaW5wdXQpIHtcblx0ICAgIF8uZXJyb3IoJ21pc3NpbmcgaW5wdXQnKTtcblx0ICB9XG5cblx0ICB0aGlzLmlzQWN0aXZhdGVkID0gZmFsc2U7XG5cdCAgdGhpcy5kZWJ1ZyA9ICEhby5kZWJ1Zztcblx0ICB0aGlzLmF1dG9zZWxlY3QgPSAhIW8uYXV0b3NlbGVjdDtcblx0ICB0aGlzLmF1dG9zZWxlY3RPbkJsdXIgPSAhIW8uYXV0b3NlbGVjdE9uQmx1cjtcblx0ICB0aGlzLm9wZW5PbkZvY3VzID0gISFvLm9wZW5PbkZvY3VzO1xuXHQgIHRoaXMubWluTGVuZ3RoID0gXy5pc051bWJlcihvLm1pbkxlbmd0aCkgPyBvLm1pbkxlbmd0aCA6IDE7XG5cdCAgdGhpcy5hdXRvV2lkdGggPSAoby5hdXRvV2lkdGggPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogISFvLmF1dG9XaWR0aDtcblx0ICB0aGlzLmNsZWFyT25TZWxlY3RlZCA9ICEhby5jbGVhck9uU2VsZWN0ZWQ7XG5cdCAgdGhpcy50YWJBdXRvY29tcGxldGUgPSAoby50YWJBdXRvY29tcGxldGUgPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogISFvLnRhYkF1dG9jb21wbGV0ZTtcblxuXHQgIG8uaGludCA9ICEhby5oaW50O1xuXG5cdCAgaWYgKG8uaGludCAmJiBvLmFwcGVuZFRvKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ1thdXRvY29tcGxldGUuanNdIGhpbnQgYW5kIGFwcGVuZFRvIG9wdGlvbnMgY2FuXFwndCBiZSB1c2VkIGF0IHRoZSBzYW1lIHRpbWUnKTtcblx0ICB9XG5cblx0ICB0aGlzLmNzcyA9IG8uY3NzID0gXy5taXhpbih7fSwgY3NzLCBvLmFwcGVuZFRvID8gY3NzLmFwcGVuZFRvIDoge30pO1xuXHQgIHRoaXMuY3NzQ2xhc3NlcyA9IG8uY3NzQ2xhc3NlcyA9IF8ubWl4aW4oe30sIGNzcy5kZWZhdWx0Q2xhc3Nlcywgby5jc3NDbGFzc2VzIHx8IHt9KTtcblx0ICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ID1cblx0ICAgIG8uY3NzQ2xhc3Nlcy5mb3JtYXR0ZWRQcmVmaXggPSBfLmZvcm1hdFByZWZpeCh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMubm9QcmVmaXgpO1xuXHQgIHRoaXMubGlzdGJveElkID0gby5saXN0Ym94SWQgPSBbdGhpcy5jc3NDbGFzc2VzLnJvb3QsICdsaXN0Ym94JywgXy5nZXRVbmlxdWVJZCgpXS5qb2luKCctJyk7XG5cblx0ICB2YXIgZG9tRWx0cyA9IGJ1aWxkRG9tKG8pO1xuXG5cdCAgdGhpcy4kbm9kZSA9IGRvbUVsdHMud3JhcHBlcjtcblx0ICB2YXIgJGlucHV0ID0gdGhpcy4kaW5wdXQgPSBkb21FbHRzLmlucHV0O1xuXHQgICRtZW51ID0gZG9tRWx0cy5tZW51O1xuXHQgICRoaW50ID0gZG9tRWx0cy5oaW50O1xuXG5cdCAgaWYgKG8uZHJvcGRvd25NZW51Q29udGFpbmVyKSB7XG5cdCAgICBET00uZWxlbWVudChvLmRyb3Bkb3duTWVudUNvbnRhaW5lcilcblx0ICAgICAgLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKSAvLyBlbnN1cmUgdGhlIGNvbnRhaW5lciBoYXMgYSByZWxhdGl2ZSBwb3NpdGlvblxuXHQgICAgICAuYXBwZW5kKCRtZW51LmNzcygndG9wJywgJzAnKSk7IC8vIG92ZXJyaWRlIHRoZSB0b3A6IDEwMCVcblx0ICB9XG5cblx0ICAvLyAjNzA1OiBpZiB0aGVyZSdzIHNjcm9sbGFibGUgb3ZlcmZsb3csIGllIGRvZXNuJ3Qgc3VwcG9ydFxuXHQgIC8vIGJsdXIgY2FuY2VsbGF0aW9ucyB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgY2xpY2tlZFxuXHQgIC8vXG5cdCAgLy8gIzM1MTogcHJldmVudERlZmF1bHQgd29uJ3QgY2FuY2VsIGJsdXJzIGluIGllIDw9IDhcblx0ICAkaW5wdXQub24oJ2JsdXIuYWEnLCBmdW5jdGlvbigkZSkge1xuXHQgICAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdCAgICBpZiAoXy5pc01zaWUoKSAmJiAoJG1lbnVbMF0gPT09IGFjdGl2ZSB8fCAkbWVudVswXS5jb250YWlucyhhY3RpdmUpKSkge1xuXHQgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICAvLyBzdG9wIGltbWVkaWF0ZSBpbiBvcmRlciB0byBwcmV2ZW50IElucHV0I19vbkJsdXIgZnJvbVxuXHQgICAgICAvLyBnZXR0aW5nIGV4ZWN0dWVkXG5cdCAgICAgICRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHQgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkgeyAkaW5wdXQuZm9jdXMoKTsgfSk7XG5cdCAgICB9XG5cdCAgfSk7XG5cblx0ICAvLyAjMzUxOiBwcmV2ZW50cyBpbnB1dCBibHVyIGR1ZSB0byBjbGlja3Mgd2l0aGluIGRyb3Bkb3duIG1lbnVcblx0ICAkbWVudS5vbignbW91c2Vkb3duLmFhJywgZnVuY3Rpb24oJGUpIHsgJGUucHJldmVudERlZmF1bHQoKTsgfSk7XG5cblx0ICB0aGlzLmV2ZW50QnVzID0gby5ldmVudEJ1cyB8fCBuZXcgRXZlbnRCdXMoe2VsOiAkaW5wdXR9KTtcblxuXHQgIHRoaXMuZHJvcGRvd24gPSBuZXcgVHlwZWFoZWFkLkRyb3Bkb3duKHtcblx0ICAgIGFwcGVuZFRvOiBvLmFwcGVuZFRvLFxuXHQgICAgd3JhcHBlcjogdGhpcy4kbm9kZSxcblx0ICAgIG1lbnU6ICRtZW51LFxuXHQgICAgZGF0YXNldHM6IG8uZGF0YXNldHMsXG5cdCAgICB0ZW1wbGF0ZXM6IG8udGVtcGxhdGVzLFxuXHQgICAgY3NzQ2xhc3Nlczogby5jc3NDbGFzc2VzLFxuXHQgICAgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aFxuXHQgIH0pXG5cdCAgICAub25TeW5jKCdzdWdnZXN0aW9uQ2xpY2tlZCcsIHRoaXMuX29uU3VnZ2VzdGlvbkNsaWNrZWQsIHRoaXMpXG5cdCAgICAub25TeW5jKCdjdXJzb3JNb3ZlZCcsIHRoaXMuX29uQ3Vyc29yTW92ZWQsIHRoaXMpXG5cdCAgICAub25TeW5jKCdjdXJzb3JSZW1vdmVkJywgdGhpcy5fb25DdXJzb3JSZW1vdmVkLCB0aGlzKVxuXHQgICAgLm9uU3luYygnb3BlbmVkJywgdGhpcy5fb25PcGVuZWQsIHRoaXMpXG5cdCAgICAub25TeW5jKCdjbG9zZWQnLCB0aGlzLl9vbkNsb3NlZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ3Nob3duJywgdGhpcy5fb25TaG93biwgdGhpcylcblx0ICAgIC5vblN5bmMoJ2VtcHR5JywgdGhpcy5fb25FbXB0eSwgdGhpcylcblx0ICAgIC5vblN5bmMoJ3JlZHJhd24nLCB0aGlzLl9vblJlZHJhd24sIHRoaXMpXG5cdCAgICAub25Bc3luYygnZGF0YXNldFJlbmRlcmVkJywgdGhpcy5fb25EYXRhc2V0UmVuZGVyZWQsIHRoaXMpO1xuXG5cdCAgdGhpcy5pbnB1dCA9IG5ldyBUeXBlYWhlYWQuSW5wdXQoe2lucHV0OiAkaW5wdXQsIGhpbnQ6ICRoaW50fSlcblx0ICAgIC5vblN5bmMoJ2ZvY3VzZWQnLCB0aGlzLl9vbkZvY3VzZWQsIHRoaXMpXG5cdCAgICAub25TeW5jKCdibHVycmVkJywgdGhpcy5fb25CbHVycmVkLCB0aGlzKVxuXHQgICAgLm9uU3luYygnZW50ZXJLZXllZCcsIHRoaXMuX29uRW50ZXJLZXllZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ3RhYktleWVkJywgdGhpcy5fb25UYWJLZXllZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ2VzY0tleWVkJywgdGhpcy5fb25Fc2NLZXllZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ3VwS2V5ZWQnLCB0aGlzLl9vblVwS2V5ZWQsIHRoaXMpXG5cdCAgICAub25TeW5jKCdkb3duS2V5ZWQnLCB0aGlzLl9vbkRvd25LZXllZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ2xlZnRLZXllZCcsIHRoaXMuX29uTGVmdEtleWVkLCB0aGlzKVxuXHQgICAgLm9uU3luYygncmlnaHRLZXllZCcsIHRoaXMuX29uUmlnaHRLZXllZCwgdGhpcylcblx0ICAgIC5vblN5bmMoJ3F1ZXJ5Q2hhbmdlZCcsIHRoaXMuX29uUXVlcnlDaGFuZ2VkLCB0aGlzKVxuXHQgICAgLm9uU3luYygnd2hpdGVzcGFjZUNoYW5nZWQnLCB0aGlzLl9vbldoaXRlc3BhY2VDaGFuZ2VkLCB0aGlzKTtcblxuXHQgIHRoaXMuX2JpbmRLZXlib2FyZFNob3J0Y3V0cyhvKTtcblxuXHQgIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG5cdH1cblxuXHQvLyBpbnN0YW5jZSBtZXRob2RzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXHRfLm1peGluKFR5cGVhaGVhZC5wcm90b3R5cGUsIHtcblx0ICAvLyAjIyMgcHJpdmF0ZVxuXG5cdCAgX2JpbmRLZXlib2FyZFNob3J0Y3V0czogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgaWYgKCFvcHRpb25zLmtleWJvYXJkU2hvcnRjdXRzKSB7XG5cdCAgICAgIHJldHVybjtcblx0ICAgIH1cblx0ICAgIHZhciAkaW5wdXQgPSB0aGlzLiRpbnB1dDtcblx0ICAgIHZhciBrZXlib2FyZFNob3J0Y3V0cyA9IFtdO1xuXHQgICAgXy5lYWNoKG9wdGlvbnMua2V5Ym9hcmRTaG9ydGN1dHMsIGZ1bmN0aW9uKGtleSkge1xuXHQgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKS5jaGFyQ29kZUF0KDApO1xuXHQgICAgICB9XG5cdCAgICAgIGtleWJvYXJkU2hvcnRjdXRzLnB1c2goa2V5KTtcblx0ICAgIH0pO1xuXHQgICAgRE9NLmVsZW1lbnQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZXZlbnQpIHtcblx0ICAgICAgdmFyIGVsdCA9IChldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCk7XG5cdCAgICAgIHZhciB0YWdOYW1lID0gZWx0LnRhZ05hbWU7XG5cdCAgICAgIGlmIChlbHQuaXNDb250ZW50RWRpdGFibGUgfHwgdGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YWdOYW1lID09PSAnU0VMRUNUJyB8fCB0YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG5cdCAgICAgICAgLy8gYWxyZWFkeSBpbiBhbiBpbnB1dFxuXHQgICAgICAgIHJldHVybjtcblx0ICAgICAgfVxuXG5cdCAgICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGU7XG5cdCAgICAgIGlmIChrZXlib2FyZFNob3J0Y3V0cy5pbmRleE9mKHdoaWNoKSA9PT0gLTEpIHtcblx0ICAgICAgICAvLyBub3QgdGhlIHJpZ2h0IHNob3J0Y3V0XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cblx0ICAgICAgJGlucHV0LmZvY3VzKCk7XG5cdCAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHQgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgfSk7XG5cdCAgfSxcblxuXHQgIF9vblN1Z2dlc3Rpb25DbGlja2VkOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25DbGlja2VkKHR5cGUsICRlbCkge1xuXHQgICAgdmFyIGRhdHVtO1xuXHQgICAgdmFyIGNvbnRleHQgPSB7c2VsZWN0aW9uTWV0aG9kOiAnY2xpY2snfTtcblxuXHQgICAgaWYgKGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclN1Z2dlc3Rpb24oJGVsKSkge1xuXHQgICAgICB0aGlzLl9zZWxlY3QoZGF0dW0sIGNvbnRleHQpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25DdXJzb3JNb3ZlZDogZnVuY3Rpb24gb25DdXJzb3JNb3ZlZChldmVudCwgdXBkYXRlSW5wdXQpIHtcblx0ICAgIHZhciBkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcblx0ICAgIHZhciBjdXJyZW50Q3Vyc29ySWQgPSB0aGlzLmRyb3Bkb3duLmdldEN1cnJlbnRDdXJzb3IoKS5hdHRyKCdpZCcpO1xuXHQgICAgdGhpcy5pbnB1dC5zZXRBY3RpdmVEZXNjZW5kYW50KGN1cnJlbnRDdXJzb3JJZCk7XG5cblx0ICAgIGlmIChkYXR1bSkge1xuXHQgICAgICBpZiAodXBkYXRlSW5wdXQpIHtcblx0ICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0dW0udmFsdWUsIHRydWUpO1xuXHQgICAgICB9XG5cblx0ICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdjdXJzb3JjaGFuZ2VkJywgZGF0dW0ucmF3LCBkYXR1bS5kYXRhc2V0TmFtZSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkN1cnNvclJlbW92ZWQ6IGZ1bmN0aW9uIG9uQ3Vyc29yUmVtb3ZlZCgpIHtcblx0ICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG5cdCAgICB0aGlzLl91cGRhdGVIaW50KCk7XG5cdCAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2N1cnNvcnJlbW92ZWQnKTtcblx0ICB9LFxuXG5cdCAgX29uRGF0YXNldFJlbmRlcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRSZW5kZXJlZCgpIHtcblx0ICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcblxuXHQgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCd1cGRhdGVkJyk7XG5cdCAgfSxcblxuXHQgIF9vbk9wZW5lZDogZnVuY3Rpb24gb25PcGVuZWQoKSB7XG5cdCAgICB0aGlzLl91cGRhdGVIaW50KCk7XG5cdCAgICB0aGlzLmlucHV0LmV4cGFuZCgpO1xuXG5cdCAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ29wZW5lZCcpO1xuXHQgIH0sXG5cblx0ICBfb25FbXB0eTogZnVuY3Rpb24gb25FbXB0eSgpIHtcblx0ICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZW1wdHknKTtcblx0ICB9LFxuXG5cdCAgX29uUmVkcmF3bjogZnVuY3Rpb24gb25SZWRyYXduKCkge1xuXHQgICAgdGhpcy4kbm9kZS5jc3MoJ3RvcCcsIDAgKyAncHgnKTtcblx0ICAgIHRoaXMuJG5vZGUuY3NzKCdsZWZ0JywgMCArICdweCcpO1xuXG5cdCAgICB2YXIgaW5wdXRSZWN0ID0gdGhpcy4kaW5wdXRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0ICAgIGlmICh0aGlzLmF1dG9XaWR0aCkge1xuXHQgICAgICB0aGlzLiRub2RlLmNzcygnd2lkdGgnLCBpbnB1dFJlY3Qud2lkdGggKyAncHgnKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIHdyYXBwZXJSZWN0ID0gdGhpcy4kbm9kZVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHQgICAgdmFyIHRvcCA9IGlucHV0UmVjdC5ib3R0b20gLSB3cmFwcGVyUmVjdC50b3A7XG5cdCAgICB0aGlzLiRub2RlLmNzcygndG9wJywgdG9wICsgJ3B4Jyk7XG5cdCAgICB2YXIgbGVmdCA9IGlucHV0UmVjdC5sZWZ0IC0gd3JhcHBlclJlY3QubGVmdDtcblx0ICAgIHRoaXMuJG5vZGUuY3NzKCdsZWZ0JywgbGVmdCArICdweCcpO1xuXG5cdCAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3JlZHJhd24nKTtcblx0ICB9LFxuXG5cdCAgX29uU2hvd246IGZ1bmN0aW9uIG9uU2hvd24oKSB7XG5cdCAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ3Nob3duJyk7XG5cdCAgICBpZiAodGhpcy5hdXRvc2VsZWN0KSB7XG5cdCAgICAgIHRoaXMuZHJvcGRvd24uY3Vyc29yVG9wU3VnZ2VzdGlvbigpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25DbG9zZWQ6IGZ1bmN0aW9uIG9uQ2xvc2VkKCkge1xuXHQgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcblx0ICAgIHRoaXMuaW5wdXQucmVtb3ZlQWN0aXZlRGVzY2VuZGFudCgpO1xuXHQgICAgdGhpcy5pbnB1dC5jb2xsYXBzZSgpO1xuXG5cdCAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2Nsb3NlZCcpO1xuXHQgIH0sXG5cblx0ICBfb25Gb2N1c2VkOiBmdW5jdGlvbiBvbkZvY3VzZWQoKSB7XG5cdCAgICB0aGlzLmlzQWN0aXZhdGVkID0gdHJ1ZTtcblxuXHQgICAgaWYgKHRoaXMub3Blbk9uRm9jdXMpIHtcblx0ICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuXHQgICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG5cdCAgICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25CbHVycmVkOiBmdW5jdGlvbiBvbkJsdXJyZWQoKSB7XG5cdCAgICB2YXIgY3Vyc29yRGF0dW07XG5cdCAgICB2YXIgdG9wU3VnZ2VzdGlvbkRhdHVtO1xuXG5cdCAgICBjdXJzb3JEYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcblx0ICAgIHRvcFN1Z2dlc3Rpb25EYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG5cdCAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICdibHVyJ307XG5cblx0ICAgIGlmICghdGhpcy5kZWJ1Zykge1xuXHQgICAgICBpZiAodGhpcy5hdXRvc2VsZWN0T25CbHVyICYmIGN1cnNvckRhdHVtKSB7XG5cdCAgICAgICAgdGhpcy5fc2VsZWN0KGN1cnNvckRhdHVtLCBjb250ZXh0KTtcblx0ICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9zZWxlY3RPbkJsdXIgJiYgdG9wU3VnZ2VzdGlvbkRhdHVtKSB7XG5cdCAgICAgICAgdGhpcy5fc2VsZWN0KHRvcFN1Z2dlc3Rpb25EYXR1bSwgY29udGV4dCk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5pc0FjdGl2YXRlZCA9IGZhbHNlO1xuXHQgICAgICAgIHRoaXMuZHJvcGRvd24uZW1wdHkoKTtcblx0ICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRW50ZXJLZXllZDogZnVuY3Rpb24gb25FbnRlcktleWVkKHR5cGUsICRlKSB7XG5cdCAgICB2YXIgY3Vyc29yRGF0dW07XG5cdCAgICB2YXIgdG9wU3VnZ2VzdGlvbkRhdHVtO1xuXG5cdCAgICBjdXJzb3JEYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcblx0ICAgIHRvcFN1Z2dlc3Rpb25EYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG5cdCAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICdlbnRlcktleSd9O1xuXG5cdCAgICBpZiAoY3Vyc29yRGF0dW0pIHtcblx0ICAgICAgdGhpcy5fc2VsZWN0KGN1cnNvckRhdHVtLCBjb250ZXh0KTtcblx0ICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvc2VsZWN0ICYmIHRvcFN1Z2dlc3Rpb25EYXR1bSkge1xuXHQgICAgICB0aGlzLl9zZWxlY3QodG9wU3VnZ2VzdGlvbkRhdHVtLCBjb250ZXh0KTtcblx0ICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uVGFiS2V5ZWQ6IGZ1bmN0aW9uIG9uVGFiS2V5ZWQodHlwZSwgJGUpIHtcblx0ICAgIGlmICghdGhpcy50YWJBdXRvY29tcGxldGUpIHtcblx0ICAgICAgLy8gQ2xvc2luZyB0aGUgZHJvcGRvd24gZW5hYmxlcyBmdXJ0aGVyIHRhYmJpbmdcblx0ICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuXHQgICAgICByZXR1cm47XG5cdCAgICB9XG5cblx0ICAgIHZhciBkYXR1bTtcblx0ICAgIHZhciBjb250ZXh0ID0ge3NlbGVjdGlvbk1ldGhvZDogJ3RhYktleSd9O1xuXG5cdCAgICBpZiAoZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yQ3Vyc29yKCkpIHtcblx0ICAgICAgdGhpcy5fc2VsZWN0KGRhdHVtLCBjb250ZXh0KTtcblx0ICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZSh0cnVlKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRXNjS2V5ZWQ6IGZ1bmN0aW9uIG9uRXNjS2V5ZWQoKSB7XG5cdCAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG5cdCAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuXHQgIH0sXG5cblx0ICBfb25VcEtleWVkOiBmdW5jdGlvbiBvblVwS2V5ZWQoKSB7XG5cdCAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG5cblx0ICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzRW1wdHkgJiYgcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG5cdCAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUN1cnNvclVwKCk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuXHQgIH0sXG5cblx0ICBfb25Eb3duS2V5ZWQ6IGZ1bmN0aW9uIG9uRG93bktleWVkKCkge1xuXHQgICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuXG5cdCAgICBpZiAodGhpcy5kcm9wZG93bi5pc0VtcHR5ICYmIHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuXHQgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmRyb3Bkb3duLm1vdmVDdXJzb3JEb3duKCk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuXHQgIH0sXG5cblx0ICBfb25MZWZ0S2V5ZWQ6IGZ1bmN0aW9uIG9uTGVmdEtleWVkKCkge1xuXHQgICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuXHQgICAgICB0aGlzLl9hdXRvY29tcGxldGUoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uUmlnaHRLZXllZDogZnVuY3Rpb24gb25SaWdodEtleWVkKCkge1xuXHQgICAgaWYgKHRoaXMuZGlyID09PSAnbHRyJykge1xuXHQgICAgICB0aGlzLl9hdXRvY29tcGxldGUoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uUXVlcnlDaGFuZ2VkOiBmdW5jdGlvbiBvblF1ZXJ5Q2hhbmdlZChlLCBxdWVyeSkge1xuXHQgICAgdGhpcy5pbnB1dC5jbGVhckhpbnRJZkludmFsaWQoKTtcblxuXHQgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuXHQgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmRyb3Bkb3duLmVtcHR5KCk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuXHQgICAgdGhpcy5fc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcblx0ICB9LFxuXG5cdCAgX29uV2hpdGVzcGFjZUNoYW5nZWQ6IGZ1bmN0aW9uIG9uV2hpdGVzcGFjZUNoYW5nZWQoKSB7XG5cdCAgICB0aGlzLl91cGRhdGVIaW50KCk7XG5cdCAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcblx0ICB9LFxuXG5cdCAgX3NldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbigpIHtcblx0ICAgIHZhciBkaXIgPSB0aGlzLmlucHV0LmdldExhbmd1YWdlRGlyZWN0aW9uKCk7XG5cblx0ICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG5cdCAgICAgIHRoaXMuZGlyID0gZGlyO1xuXHQgICAgICB0aGlzLiRub2RlLmNzcygnZGlyZWN0aW9uJywgZGlyKTtcblx0ICAgICAgdGhpcy5kcm9wZG93bi5zZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfdXBkYXRlSGludDogZnVuY3Rpb24gdXBkYXRlSGludCgpIHtcblx0ICAgIHZhciBkYXR1bTtcblx0ICAgIHZhciB2YWw7XG5cdCAgICB2YXIgcXVlcnk7XG5cdCAgICB2YXIgZXNjYXBlZFF1ZXJ5O1xuXHQgICAgdmFyIGZyb250TWF0Y2hSZWdFeDtcblx0ICAgIHZhciBtYXRjaDtcblxuXHQgICAgZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpO1xuXG5cdCAgICBpZiAoZGF0dW0gJiYgdGhpcy5kcm9wZG93bi5pc1Zpc2libGUoKSAmJiAhdGhpcy5pbnB1dC5oYXNPdmVyZmxvdygpKSB7XG5cdCAgICAgIHZhbCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuXHQgICAgICBxdWVyeSA9IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KHZhbCk7XG5cdCAgICAgIGVzY2FwZWRRdWVyeSA9IF8uZXNjYXBlUmVnRXhDaGFycyhxdWVyeSk7XG5cblx0ICAgICAgLy8gbWF0Y2ggaW5wdXQgdmFsdWUsIHRoZW4gY2FwdHVyZSB0cmFpbGluZyB0ZXh0XG5cdCAgICAgIGZyb250TWF0Y2hSZWdFeCA9IG5ldyBSZWdFeHAoJ14oPzonICsgZXNjYXBlZFF1ZXJ5ICsgJykoLiskKScsICdpJyk7XG5cdCAgICAgIG1hdGNoID0gZnJvbnRNYXRjaFJlZ0V4LmV4ZWMoZGF0dW0udmFsdWUpO1xuXG5cdCAgICAgIC8vIGNsZWFyIGhpbnQgaWYgdGhlcmUncyBubyB0cmFpbGluZyB0ZXh0XG5cdCAgICAgIGlmIChtYXRjaCkge1xuXHQgICAgICAgIHRoaXMuaW5wdXQuc2V0SGludCh2YWwgKyBtYXRjaFsxXSk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2F1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKGxheEN1cnNvcikge1xuXHQgICAgdmFyIGhpbnQ7XG5cdCAgICB2YXIgcXVlcnk7XG5cdCAgICB2YXIgaXNDdXJzb3JBdEVuZDtcblx0ICAgIHZhciBkYXR1bTtcblxuXHQgICAgaGludCA9IHRoaXMuaW5wdXQuZ2V0SGludCgpO1xuXHQgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG5cdCAgICBpc0N1cnNvckF0RW5kID0gbGF4Q3Vyc29yIHx8IHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpO1xuXG5cdCAgICBpZiAoaGludCAmJiBxdWVyeSAhPT0gaGludCAmJiBpc0N1cnNvckF0RW5kKSB7XG5cdCAgICAgIGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKTtcblx0ICAgICAgaWYgKGRhdHVtKSB7XG5cdCAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdHVtLnZhbHVlKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignYXV0b2NvbXBsZXRlZCcsIGRhdHVtLnJhdywgZGF0dW0uZGF0YXNldE5hbWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoZGF0dW0sIGNvbnRleHQpIHtcblx0ICAgIGlmICh0eXBlb2YgZGF0dW0udmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0dW0udmFsdWUpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuY2xlYXJPblNlbGVjdGVkKSB7XG5cdCAgICAgIHRoaXMuc2V0VmFsKCcnKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXR1bS52YWx1ZSwgdHJ1ZSk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG5cblx0ICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRCdXMudHJpZ2dlcignc2VsZWN0ZWQnLCBkYXR1bS5yYXcsIGRhdHVtLmRhdGFzZXROYW1lLCBjb250ZXh0KTtcblx0ICAgIGlmIChldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSA9PT0gZmFsc2UpIHtcblx0ICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuXG5cdCAgICAgIC8vICMxMTg6IGFsbG93IGNsaWNrIGV2ZW50IHRvIGJ1YmJsZSB1cCB0byB0aGUgYm9keSBiZWZvcmUgcmVtb3Zpbmdcblx0ICAgICAgLy8gdGhlIHN1Z2dlc3Rpb25zIG90aGVyd2lzZSB3ZSBicmVhayBldmVudCBkZWxlZ2F0aW9uXG5cdCAgICAgIF8uZGVmZXIoXy5iaW5kKHRoaXMuZHJvcGRvd24uZW1wdHksIHRoaXMuZHJvcGRvd24pKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLy8gIyMjIHB1YmxpY1xuXG5cdCAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcblx0ICAgIC8vIGlmIHRoZSBtZW51IGlzIG5vdCBhY3RpdmF0ZWQgeWV0LCB3ZSBuZWVkIHRvIHVwZGF0ZVxuXHQgICAgLy8gdGhlIHVuZGVybHlpbmcgZHJvcGRvd24gbWVudSB0byB0cmlnZ2VyIHRoZSBzZWFyY2hcblx0ICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBub3QgZ29ubmEgc2VlIGFueXRoaW5nXG5cdCAgICBpZiAoIXRoaXMuaXNBY3RpdmF0ZWQpIHtcblx0ICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRJbnB1dFZhbHVlKCk7XG5cdCAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcblx0ICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5kcm9wZG93bi5lbXB0eSgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcblx0ICB9LFxuXG5cdCAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuXHQgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuXHQgIH0sXG5cblx0ICBzZXRWYWw6IGZ1bmN0aW9uIHNldFZhbCh2YWwpIHtcblx0ICAgIC8vIGV4cGVjdCB2YWwgdG8gYmUgYSBzdHJpbmcsIHNvIGJlIHNhZmUsIGFuZCBjb2VyY2Vcblx0ICAgIHZhbCA9IF8udG9TdHIodmFsKTtcblxuXHQgICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcblx0ICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKHZhbCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KHZhbCk7XG5cdCAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZSh2YWwsIHRydWUpO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLl9zZXRMYW5ndWFnZURpcmVjdGlvbigpO1xuXHQgIH0sXG5cblx0ICBnZXRWYWw6IGZ1bmN0aW9uIGdldFZhbCgpIHtcblx0ICAgIHJldHVybiB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG5cdCAgfSxcblxuXHQgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdCAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcblx0ICAgIHRoaXMuZHJvcGRvd24uZGVzdHJveSgpO1xuXG5cdCAgICBkZXN0cm95RG9tU3RydWN0dXJlKHRoaXMuJG5vZGUsIHRoaXMuY3NzQ2xhc3Nlcyk7XG5cblx0ICAgIHRoaXMuJG5vZGUgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBnZXRXcmFwcGVyOiBmdW5jdGlvbiBnZXRXcmFwcGVyKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuZHJvcGRvd24uJGNvbnRhaW5lclswXTtcblx0ICB9XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGJ1aWxkRG9tKG9wdGlvbnMpIHtcblx0ICB2YXIgJGlucHV0O1xuXHQgIHZhciAkd3JhcHBlcjtcblx0ICB2YXIgJGRyb3Bkb3duO1xuXHQgIHZhciAkaGludDtcblxuXHQgICRpbnB1dCA9IERPTS5lbGVtZW50KG9wdGlvbnMuaW5wdXQpO1xuXHQgICR3cmFwcGVyID0gRE9NXG5cdCAgICAuZWxlbWVudChodG1sLndyYXBwZXIucmVwbGFjZSgnJVJPT1QlJywgb3B0aW9ucy5jc3NDbGFzc2VzLnJvb3QpKVxuXHQgICAgLmNzcyhvcHRpb25zLmNzcy53cmFwcGVyKTtcblxuXHQgIC8vIG92ZXJyaWRlIHRoZSBkaXNwbGF5IHByb3BlcnR5IHdpdGggdGhlIHRhYmxlLWNlbGwgdmFsdWVcblx0ICAvLyBpZiB0aGUgcGFyZW50IGVsZW1lbnQgaXMgYSB0YWJsZSBhbmQgdGhlIG9yaWdpbmFsIGlucHV0IHdhcyBhIGJsb2NrXG5cdCAgLy8gIC0+IGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvbGlhL2F1dG9jb21wbGV0ZS5qcy9pc3N1ZXMvMTZcblx0ICBpZiAoIW9wdGlvbnMuYXBwZW5kVG8gJiYgJGlucHV0LmNzcygnZGlzcGxheScpID09PSAnYmxvY2snICYmICRpbnB1dC5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ3RhYmxlJykge1xuXHQgICAgJHdyYXBwZXIuY3NzKCdkaXNwbGF5JywgJ3RhYmxlLWNlbGwnKTtcblx0ICB9XG5cdCAgdmFyIGRyb3Bkb3duSHRtbCA9IGh0bWwuZHJvcGRvd24uXG5cdCAgICByZXBsYWNlKCclUFJFRklYJScsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5wcmVmaXgpLlxuXHQgICAgcmVwbGFjZSgnJURST1BET1dOX01FTlUlJywgb3B0aW9ucy5jc3NDbGFzc2VzLmRyb3Bkb3duTWVudSk7XG5cdCAgJGRyb3Bkb3duID0gRE9NLmVsZW1lbnQoZHJvcGRvd25IdG1sKVxuXHQgICAgLmNzcyhvcHRpb25zLmNzcy5kcm9wZG93bilcblx0ICAgIC5hdHRyKHtcblx0ICAgICAgcm9sZTogJ2xpc3Rib3gnLFxuXHQgICAgICBpZDogb3B0aW9ucy5saXN0Ym94SWRcblx0ICAgIH0pO1xuXHQgIGlmIChvcHRpb25zLnRlbXBsYXRlcyAmJiBvcHRpb25zLnRlbXBsYXRlcy5kcm9wZG93bk1lbnUpIHtcblx0ICAgICRkcm9wZG93bi5odG1sKF8udGVtcGxhdGlmeShvcHRpb25zLnRlbXBsYXRlcy5kcm9wZG93bk1lbnUpKCkpO1xuXHQgIH1cblx0ICAkaGludCA9ICRpbnB1dC5jbG9uZSgpLmNzcyhvcHRpb25zLmNzcy5oaW50KS5jc3MoZ2V0QmFja2dyb3VuZFN0eWxlcygkaW5wdXQpKTtcblxuXHQgICRoaW50XG5cdCAgICAudmFsKCcnKVxuXHQgICAgLmFkZENsYXNzKF8uY2xhc3NOYW1lKG9wdGlvbnMuY3NzQ2xhc3Nlcy5wcmVmaXgsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5oaW50LCB0cnVlKSlcblx0ICAgIC5yZW1vdmVBdHRyKCdpZCBuYW1lIHBsYWNlaG9sZGVyIHJlcXVpcmVkJylcblx0ICAgIC5wcm9wKCdyZWFkb25seScsIHRydWUpXG5cdCAgICAuYXR0cih7XG5cdCAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcblx0ICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcblx0ICAgICAgc3BlbGxjaGVjazogJ2ZhbHNlJyxcblx0ICAgICAgdGFiaW5kZXg6IC0xXG5cdCAgICB9KTtcblx0ICBpZiAoJGhpbnQucmVtb3ZlRGF0YSkge1xuXHQgICAgJGhpbnQucmVtb3ZlRGF0YSgpO1xuXHQgIH1cblxuXHQgIC8vIHN0b3JlIHRoZSBvcmlnaW5hbCB2YWx1ZXMgb2YgdGhlIGF0dHJzIHRoYXQgZ2V0IG1vZGlmaWVkXG5cdCAgLy8gc28gbW9kaWZpY2F0aW9ucyBjYW4gYmUgcmV2ZXJ0ZWQgb24gZGVzdHJveVxuXHQgICRpbnB1dC5kYXRhKGF0dHJzS2V5LCB7XG5cdCAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAkaW5wdXQuYXR0cignYXJpYS1hdXRvY29tcGxldGUnKSxcblx0ICAgICdhcmlhLWV4cGFuZGVkJzogJGlucHV0LmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSxcblx0ICAgICdhcmlhLW93bnMnOiAkaW5wdXQuYXR0cignYXJpYS1vd25zJyksXG5cdCAgICBhdXRvY29tcGxldGU6ICRpbnB1dC5hdHRyKCdhdXRvY29tcGxldGUnKSxcblx0ICAgIGRpcjogJGlucHV0LmF0dHIoJ2RpcicpLFxuXHQgICAgcm9sZTogJGlucHV0LmF0dHIoJ3JvbGUnKSxcblx0ICAgIHNwZWxsY2hlY2s6ICRpbnB1dC5hdHRyKCdzcGVsbGNoZWNrJyksXG5cdCAgICBzdHlsZTogJGlucHV0LmF0dHIoJ3N0eWxlJyksXG5cdCAgICB0eXBlOiAkaW5wdXQuYXR0cigndHlwZScpXG5cdCAgfSk7XG5cblx0ICAkaW5wdXRcblx0ICAgIC5hZGRDbGFzcyhfLmNsYXNzTmFtZShvcHRpb25zLmNzc0NsYXNzZXMucHJlZml4LCBvcHRpb25zLmNzc0NsYXNzZXMuaW5wdXQsIHRydWUpKVxuXHQgICAgLmF0dHIoe1xuXHQgICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuXHQgICAgICBzcGVsbGNoZWNrOiBmYWxzZSxcblxuXHQgICAgICAvLyBBY2Nlc3NpYmlsaXR5IGZlYXR1cmVzXG5cdCAgICAgIC8vIEdpdmUgdGhlIGZpZWxkIGEgcHJlc2VudGF0aW9uIG9mIGEgXCJzZWxlY3RcIi5cblx0ICAgICAgLy8gQ29tYm9ib3ggaXMgdGhlIGNvbWJpbmVkIHByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBsaW5lIHRleHRmaWVsZFxuXHQgICAgICAvLyB3aXRoIGEgbGlzdGJveCBwb3B1cC5cblx0ICAgICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1dBSS9QRi9hcmlhL3JvbGVzI2NvbWJvYm94XG5cdCAgICAgIHJvbGU6ICdjb21ib2JveCcsXG5cdCAgICAgIC8vIExldCB0aGUgc2NyZWVuIHJlYWRlciBrbm93IHRoZSBmaWVsZCBoYXMgYW4gYXV0b2NvbXBsZXRlXG5cdCAgICAgIC8vIGZlYXR1cmUgdG8gaXQuXG5cdCAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IChvcHRpb25zLmRhdGFzZXRzICYmXG5cdCAgICAgICAgb3B0aW9ucy5kYXRhc2V0c1swXSAmJiBvcHRpb25zLmRhdGFzZXRzWzBdLmRpc3BsYXlLZXkgPyAnYm90aCcgOiAnbGlzdCcpLFxuXHQgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZHJvcGRvd24gaXQgY29udHJvbHMgaXMgY3VycmVudGx5IGV4cGFuZGVkIG9yIGNvbGxhcHNlZFxuXHQgICAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG5cdCAgICAgICdhcmlhLWxhYmVsJzogb3B0aW9ucy5hcmlhTGFiZWwsXG5cdCAgICAgIC8vIEV4cGxpY2l0bHkgcG9pbnQgdG8gdGhlIGxpc3Rib3gsXG5cdCAgICAgIC8vIHdoaWNoIGlzIGEgbGlzdCBvZiBzdWdnZXN0aW9ucyAoYWthIG9wdGlvbnMpXG5cdCAgICAgICdhcmlhLW93bnMnOiBvcHRpb25zLmxpc3Rib3hJZFxuXHQgICAgfSlcblx0ICAgIC5jc3Mob3B0aW9ucy5oaW50ID8gb3B0aW9ucy5jc3MuaW5wdXQgOiBvcHRpb25zLmNzcy5pbnB1dFdpdGhOb0hpbnQpO1xuXG5cdCAgLy8gaWU3IGRvZXMgbm90IGxpa2UgaXQgd2hlbiBkaXIgaXMgc2V0IHRvIGF1dG9cblx0ICB0cnkge1xuXHQgICAgaWYgKCEkaW5wdXQuYXR0cignZGlyJykpIHtcblx0ICAgICAgJGlucHV0LmF0dHIoJ2RpcicsICdhdXRvJyk7XG5cdCAgICB9XG5cdCAgfSBjYXRjaCAoZSkge1xuXHQgICAgLy8gaWdub3JlXG5cdCAgfVxuXG5cdCAgJHdyYXBwZXIgPSBvcHRpb25zLmFwcGVuZFRvXG5cdCAgICA/ICR3cmFwcGVyLmFwcGVuZFRvKERPTS5lbGVtZW50KG9wdGlvbnMuYXBwZW5kVG8pLmVxKDApKS5lcSgwKVxuXHQgICAgOiAkaW5wdXQud3JhcCgkd3JhcHBlcikucGFyZW50KCk7XG5cblx0ICAkd3JhcHBlclxuXHQgICAgLnByZXBlbmQob3B0aW9ucy5oaW50ID8gJGhpbnQgOiBudWxsKVxuXHQgICAgLmFwcGVuZCgkZHJvcGRvd24pO1xuXG5cdCAgcmV0dXJuIHtcblx0ICAgIHdyYXBwZXI6ICR3cmFwcGVyLFxuXHQgICAgaW5wdXQ6ICRpbnB1dCxcblx0ICAgIGhpbnQ6ICRoaW50LFxuXHQgICAgbWVudTogJGRyb3Bkb3duXG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEJhY2tncm91bmRTdHlsZXMoJGVsKSB7XG5cdCAgcmV0dXJuIHtcblx0ICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnKSxcblx0ICAgIGJhY2tncm91bmRDbGlwOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWNsaXAnKSxcblx0ICAgIGJhY2tncm91bmRDb2xvcjogJGVsLmNzcygnYmFja2dyb3VuZC1jb2xvcicpLFxuXHQgICAgYmFja2dyb3VuZEltYWdlOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG5cdCAgICBiYWNrZ3JvdW5kT3JpZ2luOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLW9yaWdpbicpLFxuXHQgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJyksXG5cdCAgICBiYWNrZ3JvdW5kUmVwZWF0OiAkZWwuY3NzKCdiYWNrZ3JvdW5kLXJlcGVhdCcpLFxuXHQgICAgYmFja2dyb3VuZFNpemU6ICRlbC5jc3MoJ2JhY2tncm91bmQtc2l6ZScpXG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3lEb21TdHJ1Y3R1cmUoJG5vZGUsIGNzc0NsYXNzZXMpIHtcblx0ICB2YXIgJGlucHV0ID0gJG5vZGUuZmluZChfLmNsYXNzTmFtZShjc3NDbGFzc2VzLnByZWZpeCwgY3NzQ2xhc3Nlcy5pbnB1dCkpO1xuXG5cdCAgLy8gbmVlZCB0byByZW1vdmUgYXR0cnMgdGhhdCB3ZXJlbid0IHByZXZpb3VzbHkgZGVmaW5lZCBhbmRcblx0ICAvLyByZXZlcnQgYXR0cnMgdGhhdCBvcmlnaW5hbGx5IGhhZCBhIHZhbHVlXG5cdCAgXy5lYWNoKCRpbnB1dC5kYXRhKGF0dHJzS2V5KSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcblx0ICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAkaW5wdXQucmVtb3ZlQXR0cihrZXkpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgJGlucHV0LmF0dHIoa2V5LCB2YWwpO1xuXHQgICAgfVxuXHQgIH0pO1xuXG5cdCAgJGlucHV0XG5cdCAgICAuZGV0YWNoKClcblx0ICAgIC5yZW1vdmVDbGFzcyhfLmNsYXNzTmFtZShjc3NDbGFzc2VzLnByZWZpeCwgY3NzQ2xhc3Nlcy5pbnB1dCwgdHJ1ZSkpXG5cdCAgICAuaW5zZXJ0QWZ0ZXIoJG5vZGUpO1xuXHQgIGlmICgkaW5wdXQucmVtb3ZlRGF0YSkge1xuXHQgICAgJGlucHV0LnJlbW92ZURhdGEoYXR0cnNLZXkpO1xuXHQgIH1cblxuXHQgICRub2RlLnJlbW92ZSgpO1xuXHR9XG5cblx0VHlwZWFoZWFkLkRyb3Bkb3duID0gRHJvcGRvd247XG5cdFR5cGVhaGVhZC5JbnB1dCA9IElucHV0O1xuXHRUeXBlYWhlYWQuc291cmNlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gVHlwZWFoZWFkO1xuXG5cbi8qKiovIH0sXG4vKiA2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIG5hbWVzcGFjZSA9ICdhdXRvY29tcGxldGU6JztcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cdHZhciBET00gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdC8vIGNvbnN0cnVjdG9yXG5cdC8vIC0tLS0tLS0tLS0tXG5cblx0ZnVuY3Rpb24gRXZlbnRCdXMobykge1xuXHQgIGlmICghbyB8fCAhby5lbCkge1xuXHQgICAgXy5lcnJvcignRXZlbnRCdXMgaW5pdGlhbGl6ZWQgd2l0aG91dCBlbCcpO1xuXHQgIH1cblxuXHQgIHRoaXMuJGVsID0gRE9NLmVsZW1lbnQoby5lbCk7XG5cdH1cblxuXHQvLyBpbnN0YW5jZSBtZXRob2RzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXHRfLm1peGluKEV2ZW50QnVzLnByb3RvdHlwZSwge1xuXG5cdCAgLy8gIyMjIHB1YmxpY1xuXG5cdCAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgc3VnZ2VzdGlvbiwgZGF0YXNldCwgY29udGV4dCkge1xuXHQgICAgdmFyIGV2ZW50ID0gXy5FdmVudChuYW1lc3BhY2UgKyB0eXBlKTtcblx0ICAgIHRoaXMuJGVsLnRyaWdnZXIoZXZlbnQsIFtzdWdnZXN0aW9uLCBkYXRhc2V0LCBjb250ZXh0XSk7XG5cdCAgICByZXR1cm4gZXZlbnQ7XG5cdCAgfVxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEV2ZW50QnVzO1xuXG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHNwZWNpYWxLZXlDb2RlTWFwO1xuXG5cdHNwZWNpYWxLZXlDb2RlTWFwID0ge1xuXHQgIDk6ICd0YWInLFxuXHQgIDI3OiAnZXNjJyxcblx0ICAzNzogJ2xlZnQnLFxuXHQgIDM5OiAncmlnaHQnLFxuXHQgIDEzOiAnZW50ZXInLFxuXHQgIDM4OiAndXAnLFxuXHQgIDQwOiAnZG93bidcblx0fTtcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cdHZhciBET00gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXHR2YXIgRXZlbnRFbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHQvLyBjb25zdHJ1Y3RvclxuXHQvLyAtLS0tLS0tLS0tLVxuXG5cdGZ1bmN0aW9uIElucHV0KG8pIHtcblx0ICB2YXIgdGhhdCA9IHRoaXM7XG5cdCAgdmFyIG9uQmx1cjtcblx0ICB2YXIgb25Gb2N1cztcblx0ICB2YXIgb25LZXlkb3duO1xuXHQgIHZhciBvbklucHV0O1xuXG5cdCAgbyA9IG8gfHwge307XG5cblx0ICBpZiAoIW8uaW5wdXQpIHtcblx0ICAgIF8uZXJyb3IoJ2lucHV0IGlzIG1pc3NpbmcnKTtcblx0ICB9XG5cblx0ICAvLyBib3VuZCBmdW5jdGlvbnNcblx0ICBvbkJsdXIgPSBfLmJpbmQodGhpcy5fb25CbHVyLCB0aGlzKTtcblx0ICBvbkZvY3VzID0gXy5iaW5kKHRoaXMuX29uRm9jdXMsIHRoaXMpO1xuXHQgIG9uS2V5ZG93biA9IF8uYmluZCh0aGlzLl9vbktleWRvd24sIHRoaXMpO1xuXHQgIG9uSW5wdXQgPSBfLmJpbmQodGhpcy5fb25JbnB1dCwgdGhpcyk7XG5cblx0ICB0aGlzLiRoaW50ID0gRE9NLmVsZW1lbnQoby5oaW50KTtcblx0ICB0aGlzLiRpbnB1dCA9IERPTS5lbGVtZW50KG8uaW5wdXQpXG5cdCAgICAub24oJ2JsdXIuYWEnLCBvbkJsdXIpXG5cdCAgICAub24oJ2ZvY3VzLmFhJywgb25Gb2N1cylcblx0ICAgIC5vbigna2V5ZG93bi5hYScsIG9uS2V5ZG93bik7XG5cblx0ICAvLyBpZiBubyBoaW50LCBub29wIGFsbCB0aGUgaGludCByZWxhdGVkIGZ1bmN0aW9uc1xuXHQgIGlmICh0aGlzLiRoaW50Lmxlbmd0aCA9PT0gMCkge1xuXHQgICAgdGhpcy5zZXRIaW50ID0gdGhpcy5nZXRIaW50ID0gdGhpcy5jbGVhckhpbnQgPSB0aGlzLmNsZWFySGludElmSW52YWxpZCA9IF8ubm9vcDtcblx0ICB9XG5cblx0ICAvLyBpZTcgYW5kIGllOCBkb24ndCBzdXBwb3J0IHRoZSBpbnB1dCBldmVudFxuXHQgIC8vIGllOSBkb2Vzbid0IGZpcmUgdGhlIGlucHV0IGV2ZW50IHdoZW4gY2hhcmFjdGVycyBhcmUgcmVtb3ZlZFxuXHQgIC8vIG5vdCBzdXJlIGlmIGllMTAgaXMgY29tcGF0aWJsZVxuXHQgIGlmICghXy5pc01zaWUoKSkge1xuXHQgICAgdGhpcy4kaW5wdXQub24oJ2lucHV0LmFhJywgb25JbnB1dCk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHRoaXMuJGlucHV0Lm9uKCdrZXlkb3duLmFhIGtleXByZXNzLmFhIGN1dC5hYSBwYXN0ZS5hYScsIGZ1bmN0aW9uKCRlKSB7XG5cdCAgICAgIC8vIGlmIGEgc3BlY2lhbCBrZXkgdHJpZ2dlcmVkIHRoaXMsIGlnbm9yZSBpdFxuXHQgICAgICBpZiAoc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV0pIHtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblxuXHQgICAgICAvLyBnaXZlIHRoZSBicm93c2VyIGEgY2hhbmNlIHRvIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGlucHV0XG5cdCAgICAgIC8vIGJlZm9yZSBjaGVja2luZyB0byBzZWUgaWYgdGhlIHF1ZXJ5IGNoYW5nZWRcblx0ICAgICAgXy5kZWZlcihfLmJpbmQodGhhdC5fb25JbnB1dCwgdGhhdCwgJGUpKTtcblx0ICAgIH0pO1xuXHQgIH1cblxuXHQgIC8vIHRoZSBxdWVyeSBkZWZhdWx0cyB0byB3aGF0ZXZlciB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGlzXG5cdCAgLy8gb24gaW5pdGlhbGl6YXRpb24sIGl0J2xsIG1vc3QgbGlrZWx5IGJlIGFuIGVtcHR5IHN0cmluZ1xuXHQgIHRoaXMucXVlcnkgPSB0aGlzLiRpbnB1dC52YWwoKTtcblxuXHQgIC8vIGhlbHBzIHdpdGggY2FsY3VsYXRpbmcgdGhlIHdpZHRoIG9mIHRoZSBpbnB1dCdzIHZhbHVlXG5cdCAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBidWlsZE92ZXJmbG93SGVscGVyKHRoaXMuJGlucHV0KTtcblx0fVxuXG5cdC8vIHN0YXRpYyBtZXRob2RzXG5cdC8vIC0tLS0tLS0tLS0tLS0tXG5cblx0SW5wdXQubm9ybWFsaXplUXVlcnkgPSBmdW5jdGlvbihzdHIpIHtcblx0ICAvLyBzdHJpcHMgbGVhZGluZyB3aGl0ZXNwYWNlIGFuZCBjb25kZW5zZXMgYWxsIHdoaXRlc3BhY2Vcblx0ICByZXR1cm4gKHN0ciB8fCAnJykucmVwbGFjZSgvXlxccyovZywgJycpLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKTtcblx0fTtcblxuXHQvLyBpbnN0YW5jZSBtZXRob2RzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXHRfLm1peGluKElucHV0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG5cblx0ICAvLyAjIyMgcHJpdmF0ZVxuXG5cdCAgX29uQmx1cjogZnVuY3Rpb24gb25CbHVyKCkge1xuXHQgICAgdGhpcy5yZXNldElucHV0VmFsdWUoKTtcblx0ICAgIHRoaXMuJGlucHV0LnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuXHQgICAgdGhpcy50cmlnZ2VyKCdibHVycmVkJyk7XG5cdCAgfSxcblxuXHQgIF9vbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKCkge1xuXHQgICAgdGhpcy50cmlnZ2VyKCdmb2N1c2VkJyk7XG5cdCAgfSxcblxuXHQgIF9vbktleWRvd246IGZ1bmN0aW9uIG9uS2V5ZG93bigkZSkge1xuXHQgICAgLy8gd2hpY2ggaXMgbm9ybWFsaXplZCBhbmQgY29uc2lzdGVudCAoYnV0IG5vdCBmb3IgaWUpXG5cdCAgICB2YXIga2V5TmFtZSA9IHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdO1xuXG5cdCAgICB0aGlzLl9tYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSk7XG5cdCAgICBpZiAoa2V5TmFtZSAmJiB0aGlzLl9zaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSkge1xuXHQgICAgICB0aGlzLnRyaWdnZXIoa2V5TmFtZSArICdLZXllZCcsICRlKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uSW5wdXQ6IGZ1bmN0aW9uIG9uSW5wdXQoKSB7XG5cdCAgICB0aGlzLl9jaGVja0lucHV0VmFsdWUoKTtcblx0ICB9LFxuXG5cdCAgX21hbmFnZVByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiBtYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSkge1xuXHQgICAgdmFyIHByZXZlbnREZWZhdWx0O1xuXHQgICAgdmFyIGhpbnRWYWx1ZTtcblx0ICAgIHZhciBpbnB1dFZhbHVlO1xuXG5cdCAgICBzd2l0Y2ggKGtleU5hbWUpIHtcblx0ICAgIGNhc2UgJ3RhYic6XG5cdCAgICAgIGhpbnRWYWx1ZSA9IHRoaXMuZ2V0SGludCgpO1xuXHQgICAgICBpbnB1dFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG5cblx0ICAgICAgcHJldmVudERlZmF1bHQgPSBoaW50VmFsdWUgJiZcblx0ICAgICAgICBoaW50VmFsdWUgIT09IGlucHV0VmFsdWUgJiZcblx0ICAgICAgICAhd2l0aE1vZGlmaWVyKCRlKTtcblx0ICAgICAgYnJlYWs7XG5cblx0ICAgIGNhc2UgJ3VwJzpcblx0ICAgIGNhc2UgJ2Rvd24nOlxuXHQgICAgICBwcmV2ZW50RGVmYXVsdCA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuXHQgICAgICBicmVhaztcblxuXHQgICAgZGVmYXVsdDpcblx0ICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG5cdCAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9zaG91bGRUcmlnZ2VyOiBmdW5jdGlvbiBzaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSB7XG5cdCAgICB2YXIgdHJpZ2dlcjtcblxuXHQgICAgc3dpdGNoIChrZXlOYW1lKSB7XG5cdCAgICBjYXNlICd0YWInOlxuXHQgICAgICB0cmlnZ2VyID0gIXdpdGhNb2RpZmllcigkZSk7XG5cdCAgICAgIGJyZWFrO1xuXG5cdCAgICBkZWZhdWx0OlxuXHQgICAgICB0cmlnZ2VyID0gdHJ1ZTtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHRyaWdnZXI7XG5cdCAgfSxcblxuXHQgIF9jaGVja0lucHV0VmFsdWU6IGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcblx0ICAgIHZhciBpbnB1dFZhbHVlO1xuXHQgICAgdmFyIGFyZUVxdWl2YWxlbnQ7XG5cdCAgICB2YXIgaGFzRGlmZmVyZW50V2hpdGVzcGFjZTtcblxuXHQgICAgaW5wdXRWYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuXHQgICAgYXJlRXF1aXZhbGVudCA9IGFyZVF1ZXJpZXNFcXVpdmFsZW50KGlucHV0VmFsdWUsIHRoaXMucXVlcnkpO1xuXHQgICAgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSA9IGFyZUVxdWl2YWxlbnQgJiYgdGhpcy5xdWVyeSA/XG5cdCAgICAgIHRoaXMucXVlcnkubGVuZ3RoICE9PSBpbnB1dFZhbHVlLmxlbmd0aCA6IGZhbHNlO1xuXG5cdCAgICB0aGlzLnF1ZXJ5ID0gaW5wdXRWYWx1ZTtcblxuXHQgICAgaWYgKCFhcmVFcXVpdmFsZW50KSB7XG5cdCAgICAgIHRoaXMudHJpZ2dlcigncXVlcnlDaGFuZ2VkJywgdGhpcy5xdWVyeSk7XG5cdCAgICB9IGVsc2UgaWYgKGhhc0RpZmZlcmVudFdoaXRlc3BhY2UpIHtcblx0ICAgICAgdGhpcy50cmlnZ2VyKCd3aGl0ZXNwYWNlQ2hhbmdlZCcsIHRoaXMucXVlcnkpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvLyAjIyMgcHVibGljXG5cblx0ICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdCAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuXHQgIH0sXG5cblx0ICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuXHQgICAgdGhpcy4kaW5wdXQuYmx1cigpO1xuXHQgIH0sXG5cblx0ICBnZXRRdWVyeTogZnVuY3Rpb24gZ2V0UXVlcnkoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5xdWVyeTtcblx0ICB9LFxuXG5cdCAgc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHF1ZXJ5KSB7XG5cdCAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG5cdCAgfSxcblxuXHQgIGdldElucHV0VmFsdWU6IGZ1bmN0aW9uIGdldElucHV0VmFsdWUoKSB7XG5cdCAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XG5cdCAgfSxcblxuXHQgIHNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHNldElucHV0VmFsdWUodmFsdWUsIHNpbGVudCkge1xuXHQgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgdmFsdWUgPSB0aGlzLnF1ZXJ5O1xuXHQgICAgfVxuXHQgICAgdGhpcy4kaW5wdXQudmFsKHZhbHVlKTtcblxuXHQgICAgLy8gc2lsZW50IHByZXZlbnRzIGFueSBhZGRpdGlvbmFsIGV2ZW50cyBmcm9tIGJlaW5nIHRyaWdnZXJlZFxuXHQgICAgaWYgKHNpbGVudCkge1xuXHQgICAgICB0aGlzLmNsZWFySGludCgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbHVlKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGV4cGFuZDogZnVuY3Rpb24gZXhwYW5kKCkge1xuXHQgICAgdGhpcy4kaW5wdXQuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cdCAgfSxcblxuXHQgIGNvbGxhcHNlOiBmdW5jdGlvbiBjb2xsYXBzZSgpIHtcblx0ICAgIHRoaXMuJGlucHV0LmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblx0ICB9LFxuXG5cdCAgc2V0QWN0aXZlRGVzY2VuZGFudDogZnVuY3Rpb24gc2V0QWN0aXZlRGVzY2VuZGFudChhY3RpdmVkZXNjZW5kYW50SWQpIHtcblx0ICAgIHRoaXMuJGlucHV0LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGFjdGl2ZWRlc2NlbmRhbnRJZCk7XG5cdCAgfSxcblxuXHQgIHJlbW92ZUFjdGl2ZURlc2NlbmRhbnQ6IGZ1bmN0aW9uIHJlbW92ZUFjdGl2ZURlc2NlbmRhbnQoKSB7XG5cdCAgICB0aGlzLiRpbnB1dC5yZW1vdmVBdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcblx0ICB9LFxuXG5cdCAgcmVzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiByZXNldElucHV0VmFsdWUoKSB7XG5cdCAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5xdWVyeSwgdHJ1ZSk7XG5cdCAgfSxcblxuXHQgIGdldEhpbnQ6IGZ1bmN0aW9uIGdldEhpbnQoKSB7XG5cdCAgICByZXR1cm4gdGhpcy4kaGludC52YWwoKTtcblx0ICB9LFxuXG5cdCAgc2V0SGludDogZnVuY3Rpb24gc2V0SGludCh2YWx1ZSkge1xuXHQgICAgdGhpcy4kaGludC52YWwodmFsdWUpO1xuXHQgIH0sXG5cblx0ICBjbGVhckhpbnQ6IGZ1bmN0aW9uIGNsZWFySGludCgpIHtcblx0ICAgIHRoaXMuc2V0SGludCgnJyk7XG5cdCAgfSxcblxuXHQgIGNsZWFySGludElmSW52YWxpZDogZnVuY3Rpb24gY2xlYXJIaW50SWZJbnZhbGlkKCkge1xuXHQgICAgdmFyIHZhbDtcblx0ICAgIHZhciBoaW50O1xuXHQgICAgdmFyIHZhbElzUHJlZml4T2ZIaW50O1xuXHQgICAgdmFyIGlzVmFsaWQ7XG5cblx0ICAgIHZhbCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuXHQgICAgaGludCA9IHRoaXMuZ2V0SGludCgpO1xuXHQgICAgdmFsSXNQcmVmaXhPZkhpbnQgPSB2YWwgIT09IGhpbnQgJiYgaGludC5pbmRleE9mKHZhbCkgPT09IDA7XG5cdCAgICBpc1ZhbGlkID0gdmFsICE9PSAnJyAmJiB2YWxJc1ByZWZpeE9mSGludCAmJiAhdGhpcy5oYXNPdmVyZmxvdygpO1xuXG5cdCAgICBpZiAoIWlzVmFsaWQpIHtcblx0ICAgICAgdGhpcy5jbGVhckhpbnQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgZ2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGdldExhbmd1YWdlRGlyZWN0aW9uKCkge1xuXHQgICAgcmV0dXJuICh0aGlzLiRpbnB1dC5jc3MoJ2RpcmVjdGlvbicpIHx8ICdsdHInKS50b0xvd2VyQ2FzZSgpO1xuXHQgIH0sXG5cblx0ICBoYXNPdmVyZmxvdzogZnVuY3Rpb24gaGFzT3ZlcmZsb3coKSB7XG5cdCAgICAvLyAyIGlzIGFyYml0cmFyeSwganVzdCBwaWNraW5nIGEgc21hbGwgbnVtYmVyIHRvIGhhbmRsZSBlZGdlIGNhc2VzXG5cdCAgICB2YXIgY29uc3RyYWludCA9IHRoaXMuJGlucHV0LndpZHRoKCkgLSAyO1xuXG5cdCAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci50ZXh0KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcblxuXHQgICAgcmV0dXJuIHRoaXMuJG92ZXJmbG93SGVscGVyLndpZHRoKCkgPj0gY29uc3RyYWludDtcblx0ICB9LFxuXG5cdCAgaXNDdXJzb3JBdEVuZDogZnVuY3Rpb24oKSB7XG5cdCAgICB2YXIgdmFsdWVMZW5ndGg7XG5cdCAgICB2YXIgc2VsZWN0aW9uU3RhcnQ7XG5cdCAgICB2YXIgcmFuZ2U7XG5cblx0ICAgIHZhbHVlTGVuZ3RoID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoO1xuXHQgICAgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLiRpbnB1dFswXS5zZWxlY3Rpb25TdGFydDtcblxuXHQgICAgaWYgKF8uaXNOdW1iZXIoc2VsZWN0aW9uU3RhcnQpKSB7XG5cdCAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCA9PT0gdmFsdWVMZW5ndGg7XG5cdCAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuXHQgICAgICAvLyBOT1RFOiB0aGlzIHdvbid0IHdvcmsgdW5sZXNzIHRoZSBpbnB1dCBoYXMgZm9jdXMsIHRoZSBnb29kIG5ld3Ncblx0ICAgICAgLy8gaXMgdGhpcyBjb2RlIHNob3VsZCBvbmx5IGdldCBjYWxsZWQgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXG5cdCAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cdCAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLXZhbHVlTGVuZ3RoKTtcblxuXHQgICAgICByZXR1cm4gdmFsdWVMZW5ndGggPT09IHJhbmdlLnRleHQubGVuZ3RoO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9LFxuXG5cdCAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0ICAgIHRoaXMuJGhpbnQub2ZmKCcuYWEnKTtcblx0ICAgIHRoaXMuJGlucHV0Lm9mZignLmFhJyk7XG5cblx0ICAgIHRoaXMuJGhpbnQgPSB0aGlzLiRpbnB1dCA9IHRoaXMuJG92ZXJmbG93SGVscGVyID0gbnVsbDtcblx0ICB9XG5cdH0pO1xuXG5cdC8vIGhlbHBlciBmdW5jdGlvbnNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGZ1bmN0aW9uIGJ1aWxkT3ZlcmZsb3dIZWxwZXIoJGlucHV0KSB7XG5cdCAgcmV0dXJuIERPTS5lbGVtZW50KCc8cHJlIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvcHJlPicpXG5cdCAgICAuY3NzKHtcblx0ICAgICAgLy8gcG9zaXRpb24gaGVscGVyIG9mZi1zY3JlZW5cblx0ICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdCAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuXHQgICAgICAvLyBhdm9pZCBsaW5lIGJyZWFrcyBhbmQgd2hpdGVzcGFjZSBjb2xsYXBzaW5nXG5cdCAgICAgIHdoaXRlU3BhY2U6ICdwcmUnLFxuXHQgICAgICAvLyB1c2Ugc2FtZSBmb250IGNzcyBhcyBpbnB1dCB0byBjYWxjdWxhdGUgYWNjdXJhdGUgd2lkdGhcblx0ICAgICAgZm9udEZhbWlseTogJGlucHV0LmNzcygnZm9udC1mYW1pbHknKSxcblx0ICAgICAgZm9udFNpemU6ICRpbnB1dC5jc3MoJ2ZvbnQtc2l6ZScpLFxuXHQgICAgICBmb250U3R5bGU6ICRpbnB1dC5jc3MoJ2ZvbnQtc3R5bGUnKSxcblx0ICAgICAgZm9udFZhcmlhbnQ6ICRpbnB1dC5jc3MoJ2ZvbnQtdmFyaWFudCcpLFxuXHQgICAgICBmb250V2VpZ2h0OiAkaW5wdXQuY3NzKCdmb250LXdlaWdodCcpLFxuXHQgICAgICB3b3JkU3BhY2luZzogJGlucHV0LmNzcygnd29yZC1zcGFjaW5nJyksXG5cdCAgICAgIGxldHRlclNwYWNpbmc6ICRpbnB1dC5jc3MoJ2xldHRlci1zcGFjaW5nJyksXG5cdCAgICAgIHRleHRJbmRlbnQ6ICRpbnB1dC5jc3MoJ3RleHQtaW5kZW50JyksXG5cdCAgICAgIHRleHRSZW5kZXJpbmc6ICRpbnB1dC5jc3MoJ3RleHQtcmVuZGVyaW5nJyksXG5cdCAgICAgIHRleHRUcmFuc2Zvcm06ICRpbnB1dC5jc3MoJ3RleHQtdHJhbnNmb3JtJylcblx0ICAgIH0pXG5cdCAgICAuaW5zZXJ0QWZ0ZXIoJGlucHV0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFyZVF1ZXJpZXNFcXVpdmFsZW50KGEsIGIpIHtcblx0ICByZXR1cm4gSW5wdXQubm9ybWFsaXplUXVlcnkoYSkgPT09IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gd2l0aE1vZGlmaWVyKCRlKSB7XG5cdCAgcmV0dXJuICRlLmFsdEtleSB8fCAkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkgfHwgJGUuc2hpZnRLZXk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuXG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGltbWVkaWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cdHZhciBzcGxpdHRlciA9IC9cXHMrLztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICBvblN5bmM6IG9uU3luYyxcblx0ICBvbkFzeW5jOiBvbkFzeW5jLFxuXHQgIG9mZjogb2ZmLFxuXHQgIHRyaWdnZXI6IHRyaWdnZXJcblx0fTtcblxuXHRmdW5jdGlvbiBvbihtZXRob2QsIHR5cGVzLCBjYiwgY29udGV4dCkge1xuXHQgIHZhciB0eXBlO1xuXG5cdCAgaWYgKCFjYikge1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfVxuXG5cdCAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG5cdCAgY2IgPSBjb250ZXh0ID8gYmluZENvbnRleHQoY2IsIGNvbnRleHQpIDogY2I7XG5cblx0ICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cblx0ICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcblx0ICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXSA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSB8fCB7c3luYzogW10sIGFzeW5jOiBbXX07XG5cdCAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV1bbWV0aG9kXS5wdXNoKGNiKTtcblx0ICB9XG5cblx0ICByZXR1cm4gdGhpcztcblx0fVxuXG5cdGZ1bmN0aW9uIG9uQXN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG5cdCAgcmV0dXJuIG9uLmNhbGwodGhpcywgJ2FzeW5jJywgdHlwZXMsIGNiLCBjb250ZXh0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9uU3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcblx0ICByZXR1cm4gb24uY2FsbCh0aGlzLCAnc3luYycsIHR5cGVzLCBjYiwgY29udGV4dCk7XG5cdH1cblxuXHRmdW5jdGlvbiBvZmYodHlwZXMpIHtcblx0ICB2YXIgdHlwZTtcblxuXHQgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9XG5cblx0ICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcblxuXHQgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuXHQgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t0eXBlXTtcblx0ICB9XG5cblx0ICByZXR1cm4gdGhpcztcblx0fVxuXG5cdGZ1bmN0aW9uIHRyaWdnZXIodHlwZXMpIHtcblx0ICB2YXIgdHlwZTtcblx0ICB2YXIgY2FsbGJhY2tzO1xuXHQgIHZhciBhcmdzO1xuXHQgIHZhciBzeW5jRmx1c2g7XG5cdCAgdmFyIGFzeW5jRmx1c2g7XG5cblx0ICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfVxuXG5cdCAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG5cdCAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuXHQgIHdoaWxlICgodHlwZSA9IHR5cGVzLnNoaWZ0KCkpICYmIChjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0pKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0ICAgIHN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5zeW5jLCB0aGlzLCBbdHlwZV0uY29uY2F0KGFyZ3MpKTtcblx0ICAgIGFzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3MuYXN5bmMsIHRoaXMsIFt0eXBlXS5jb25jYXQoYXJncykpO1xuXG5cdCAgICBpZiAoc3luY0ZsdXNoKCkpIHtcblx0ICAgICAgaW1tZWRpYXRlKGFzeW5jRmx1c2gpO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Rmx1c2goY2FsbGJhY2tzLCBjb250ZXh0LCBhcmdzKSB7XG5cdCAgcmV0dXJuIGZsdXNoO1xuXG5cdCAgZnVuY3Rpb24gZmx1c2goKSB7XG5cdCAgICB2YXIgY2FuY2VsbGVkO1xuXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgIWNhbmNlbGxlZCAmJiBpIDwgbGVuOyBpICs9IDEpIHtcblx0ICAgICAgLy8gb25seSBjYW5jZWwgaWYgdGhlIGNhbGxiYWNrIGV4cGxpY2l0bHkgcmV0dXJucyBmYWxzZVxuXHQgICAgICBjYW5jZWxsZWQgPSBjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dCwgYXJncykgPT09IGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gIWNhbmNlbGxlZDtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBiaW5kQ29udGV4dChmbiwgY29udGV4dCkge1xuXHQgIHJldHVybiBmbi5iaW5kID9cblx0ICAgIGZuLmJpbmQoY29udGV4dCkgOlxuXHQgICAgZnVuY3Rpb24oKSB7IGZuLmFwcGx5KGNvbnRleHQsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7IH07XG5cdH1cblxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgdHlwZXMgPSBbXG5cdCAgX193ZWJwYWNrX3JlcXVpcmVfXygxMCksXG5cdCAgX193ZWJwYWNrX3JlcXVpcmVfXygxMiksXG5cdCAgX193ZWJwYWNrX3JlcXVpcmVfXygxMyksXG5cdCAgX193ZWJwYWNrX3JlcXVpcmVfXygxNCksXG5cdCAgX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0XTtcblx0dmFyIGRyYWluaW5nO1xuXHR2YXIgY3VycmVudFF1ZXVlO1xuXHR2YXIgcXVldWVJbmRleCA9IC0xO1xuXHR2YXIgcXVldWUgPSBbXTtcblx0dmFyIHNjaGVkdWxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG5cdCAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG5cdCAgICByZXR1cm47XG5cdCAgfVxuXHQgIGRyYWluaW5nID0gZmFsc2U7XG5cdCAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcblx0ICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHF1ZXVlSW5kZXggPSAtMTtcblx0ICB9XG5cdCAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuXHQgICAgbmV4dFRpY2soKTtcblx0ICB9XG5cdH1cblxuXHQvL25hbWVkIG5leHRUaWNrIGZvciBsZXNzIGNvbmZ1c2luZyBzdGFjayB0cmFjZXNcblx0ZnVuY3Rpb24gbmV4dFRpY2soKSB7XG5cdCAgaWYgKGRyYWluaW5nKSB7XG5cdCAgICByZXR1cm47XG5cdCAgfVxuXHQgIHNjaGVkdWxlZCA9IGZhbHNlO1xuXHQgIGRyYWluaW5nID0gdHJ1ZTtcblx0ICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXHQgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuXHQgIHdoaWxlIChsZW4pIHtcblx0ICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuXHQgICAgcXVldWUgPSBbXTtcblx0ICAgIHdoaWxlIChjdXJyZW50UXVldWUgJiYgKytxdWV1ZUluZGV4IDwgbGVuKSB7XG5cdCAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcblx0ICAgIH1cblx0ICAgIHF1ZXVlSW5kZXggPSAtMTtcblx0ICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblx0ICB9XG5cdCAgY3VycmVudFF1ZXVlID0gbnVsbDtcblx0ICBxdWV1ZUluZGV4ID0gLTE7XG5cdCAgZHJhaW5pbmcgPSBmYWxzZTtcblx0ICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdH1cblx0dmFyIHNjaGVkdWxlRHJhaW47XG5cdHZhciBpID0gLTE7XG5cdHZhciBsZW4gPSB0eXBlcy5sZW5ndGg7XG5cdHdoaWxlICgrK2kgPCBsZW4pIHtcblx0ICBpZiAodHlwZXNbaV0gJiYgdHlwZXNbaV0udGVzdCAmJiB0eXBlc1tpXS50ZXN0KCkpIHtcblx0ICAgIHNjaGVkdWxlRHJhaW4gPSB0eXBlc1tpXS5pbnN0YWxsKG5leHRUaWNrKTtcblx0ICAgIGJyZWFrO1xuXHQgIH1cblx0fVxuXHQvLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5cdGZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuXHQgIHRoaXMuZnVuID0gZnVuO1xuXHQgIHRoaXMuYXJyYXkgPSBhcnJheTtcblx0fVxuXHRJdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgdmFyIGZ1biA9IHRoaXMuZnVuO1xuXHQgIHZhciBhcnJheSA9IHRoaXMuYXJyYXk7XG5cdCAgc3dpdGNoIChhcnJheS5sZW5ndGgpIHtcblx0ICBjYXNlIDA6XG5cdCAgICByZXR1cm4gZnVuKCk7XG5cdCAgY2FzZSAxOlxuXHQgICAgcmV0dXJuIGZ1bihhcnJheVswXSk7XG5cdCAgY2FzZSAyOlxuXHQgICAgcmV0dXJuIGZ1bihhcnJheVswXSwgYXJyYXlbMV0pO1xuXHQgIGNhc2UgMzpcblx0ICAgIHJldHVybiBmdW4oYXJyYXlbMF0sIGFycmF5WzFdLCBhcnJheVsyXSk7XG5cdCAgZGVmYXVsdDpcblx0ICAgIHJldHVybiBmdW4uYXBwbHkobnVsbCwgYXJyYXkpO1xuXHQgIH1cblxuXHR9O1xuXHRtb2R1bGUuZXhwb3J0cyA9IGltbWVkaWF0ZTtcblx0ZnVuY3Rpb24gaW1tZWRpYXRlKHRhc2spIHtcblx0ICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cdCAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcXVldWUucHVzaChuZXcgSXRlbSh0YXNrLCBhcmdzKSk7XG5cdCAgaWYgKCFzY2hlZHVsZWQgJiYgIWRyYWluaW5nKSB7XG5cdCAgICBzY2hlZHVsZWQgPSB0cnVlO1xuXHQgICAgc2NoZWR1bGVEcmFpbigpO1xuXHQgIH1cblx0fVxuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKHByb2Nlc3MpIHsndXNlIHN0cmljdCc7XG5cdGV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG5cdCAgcmV0dXJuICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpICYmICFwcm9jZXNzLmJyb3dzZXI7XG5cdH07XG5cblx0ZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKGZ1bmMpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jKTtcblx0ICB9O1xuXHR9O1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSkpXG5cbi8qKiovIH0sXG4vKiAxMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cdHZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXHQvLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcblx0Ly8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG5cdC8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcblx0Ly8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxuXHR2YXIgY2FjaGVkU2V0VGltZW91dDtcblx0dmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuXHRmdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG5cdH1cblx0ZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xuXHR9XG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICB0cnkge1xuXHQgICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcblx0ICAgICAgICB9XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG5cdCAgICB9XG5cdCAgICB0cnkge1xuXHQgICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuXHQgICAgICAgIH1cblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuXHQgICAgfVxuXHR9ICgpKVxuXHRmdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuXHQgICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcblx0ICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcblx0ICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuXHQgICAgfVxuXHQgICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblx0ICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuXHQgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuXHQgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG5cdCAgICB9XG5cdCAgICB0cnkge1xuXHQgICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3Ncblx0ICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuXHQgICAgfSBjYXRjaChlKXtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcblx0ICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuXHQgICAgICAgIH0gY2F0Y2goZSl7XG5cdCAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG5cdCAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblxuXHR9XG5cdGZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcblx0ICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuXHQgICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuXHQgICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcblx0ICAgIH1cblx0ICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblx0ICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuXHQgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcblx0ICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG5cdCAgICB9XG5cdCAgICB0cnkge1xuXHQgICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3Ncblx0ICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG5cdCAgICB9IGNhdGNoIChlKXtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG5cdCAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGUpe1xuXHQgICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cblx0ICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuXHQgICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblxuXG5cdH1cblx0dmFyIHF1ZXVlID0gW107XG5cdHZhciBkcmFpbmluZyA9IGZhbHNlO1xuXHR2YXIgY3VycmVudFF1ZXVlO1xuXHR2YXIgcXVldWVJbmRleCA9IC0xO1xuXG5cdGZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcblx0ICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgIH1cblx0ICAgIGRyYWluaW5nID0gZmFsc2U7XG5cdCAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuXHQgICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcblx0ICAgIH1cblx0ICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcblx0ICAgICAgICBkcmFpblF1ZXVlKCk7XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuXHQgICAgaWYgKGRyYWluaW5nKSB7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG5cdCAgICBkcmFpbmluZyA9IHRydWU7XG5cblx0ICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cdCAgICB3aGlsZShsZW4pIHtcblx0ICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcblx0ICAgICAgICBxdWV1ZSA9IFtdO1xuXHQgICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcblx0ICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuXHQgICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcblx0ICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cdCAgICB9XG5cdCAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuXHQgICAgZHJhaW5pbmcgPSBmYWxzZTtcblx0ICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0fVxuXG5cdHByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG5cdCAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXHQgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcblx0ICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuXHQgICAgfVxuXHR9O1xuXG5cdC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblx0ZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG5cdCAgICB0aGlzLmZ1biA9IGZ1bjtcblx0ICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcblx0fVxuXHRJdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcblx0fTtcblx0cHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcblx0cHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcblx0cHJvY2Vzcy5lbnYgPSB7fTtcblx0cHJvY2Vzcy5hcmd2ID0gW107XG5cdHByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXHRwcm9jZXNzLnZlcnNpb25zID0ge307XG5cblx0ZnVuY3Rpb24gbm9vcCgpIHt9XG5cblx0cHJvY2Vzcy5vbiA9IG5vb3A7XG5cdHByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xuXHRwcm9jZXNzLm9uY2UgPSBub29wO1xuXHRwcm9jZXNzLm9mZiA9IG5vb3A7XG5cdHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xuXHRwcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5cdHByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cblx0cHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblx0fTtcblxuXHRwcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xuXHRwcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblx0fTtcblx0cHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihnbG9iYWwpIHsndXNlIHN0cmljdCc7XG5cdC8vYmFzZWQgb2ZmIHJzdnAgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qc1xuXHQvL2xpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFXG5cdC8vaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL21hc3Rlci9saWIvcnN2cC9hc2FwLmpzXG5cblx0dmFyIE11dGF0aW9uID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cblx0ZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBNdXRhdGlvbjtcblx0fTtcblxuXHRleHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG5cdCAgdmFyIGNhbGxlZCA9IDA7XG5cdCAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uKGhhbmRsZSk7XG5cdCAgdmFyIGVsZW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXHQgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuXHQgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuXHQgIH0pO1xuXHQgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICBlbGVtZW50LmRhdGEgPSAoY2FsbGVkID0gKytjYWxsZWQgJSAyKTtcblx0ICB9O1xuXHR9O1xuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkgeyd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcblx0ICAgIC8vIHdlIGNhbiBvbmx5IGdldCBoZXJlIGluIElFMTBcblx0ICAgIC8vIHdoaWNoIGRvZXNuJ3QgaGFuZGVsIHBvc3RNZXNzYWdlIHdlbGxcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgcmV0dXJuIHR5cGVvZiBnbG9iYWwuTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXHR9O1xuXG5cdGV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChmdW5jKSB7XG5cdCAgdmFyIGNoYW5uZWwgPSBuZXcgZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKCk7XG5cdCAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jO1xuXHQgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuXHQgIH07XG5cdH07XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMudGVzdCA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gJ2RvY3VtZW50JyBpbiBnbG9iYWwgJiYgJ29ucmVhZHlzdGF0ZWNoYW5nZScgaW4gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHR9O1xuXG5cdGV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdCAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcblx0ICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG5cdCAgICB2YXIgc2NyaXB0RWwgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdCAgICBzY3JpcHRFbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGhhbmRsZSgpO1xuXG5cdCAgICAgIHNjcmlwdEVsLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG5cdCAgICAgIHNjcmlwdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0RWwpO1xuXHQgICAgICBzY3JpcHRFbCA9IG51bGw7XG5cdCAgICB9O1xuXHQgICAgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbCk7XG5cblx0ICAgIHJldHVybiBoYW5kbGU7XG5cdCAgfTtcblx0fTtcblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0oKSkpKVxuXG4vKioqLyB9LFxuLyogMTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0Jztcblx0ZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdGV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uICh0KSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgIHNldFRpbWVvdXQodCwgMCk7XG5cdCAgfTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgRE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0dmFyIEV2ZW50RW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cdHZhciBEYXRhc2V0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cdHZhciBjc3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxuXHQvLyBjb25zdHJ1Y3RvclxuXHQvLyAtLS0tLS0tLS0tLVxuXG5cdGZ1bmN0aW9uIERyb3Bkb3duKG8pIHtcblx0ICB2YXIgdGhhdCA9IHRoaXM7XG5cdCAgdmFyIG9uU3VnZ2VzdGlvbkNsaWNrO1xuXHQgIHZhciBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyO1xuXHQgIHZhciBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlO1xuXG5cdCAgbyA9IG8gfHwge307XG5cblx0ICBpZiAoIW8ubWVudSkge1xuXHQgICAgXy5lcnJvcignbWVudSBpcyByZXF1aXJlZCcpO1xuXHQgIH1cblxuXHQgIGlmICghXy5pc0FycmF5KG8uZGF0YXNldHMpICYmICFfLmlzT2JqZWN0KG8uZGF0YXNldHMpKSB7XG5cdCAgICBfLmVycm9yKCcxIG9yIG1vcmUgZGF0YXNldHMgcmVxdWlyZWQnKTtcblx0ICB9XG5cdCAgaWYgKCFvLmRhdGFzZXRzKSB7XG5cdCAgICBfLmVycm9yKCdkYXRhc2V0cyBpcyByZXF1aXJlZCcpO1xuXHQgIH1cblxuXHQgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cdCAgdGhpcy5pc0VtcHR5ID0gdHJ1ZTtcblx0ICB0aGlzLm1pbkxlbmd0aCA9IG8ubWluTGVuZ3RoIHx8IDA7XG5cdCAgdGhpcy50ZW1wbGF0ZXMgPSB7fTtcblx0ICB0aGlzLmFwcGVuZFRvID0gby5hcHBlbmRUbyB8fCBmYWxzZTtcblx0ICB0aGlzLmNzcyA9IF8ubWl4aW4oe30sIGNzcywgby5hcHBlbmRUbyA/IGNzcy5hcHBlbmRUbyA6IHt9KTtcblx0ICB0aGlzLmNzc0NsYXNzZXMgPSBvLmNzc0NsYXNzZXMgPSBfLm1peGluKHt9LCBjc3MuZGVmYXVsdENsYXNzZXMsIG8uY3NzQ2xhc3NlcyB8fCB7fSk7XG5cdCAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCA9XG5cdCAgICBvLmNzc0NsYXNzZXMuZm9ybWF0dGVkUHJlZml4IHx8IF8uZm9ybWF0UHJlZml4KHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5ub1ByZWZpeCk7XG5cblx0ICAvLyBib3VuZCBmdW5jdGlvbnNcblx0ICBvblN1Z2dlc3Rpb25DbGljayA9IF8uYmluZCh0aGlzLl9vblN1Z2dlc3Rpb25DbGljaywgdGhpcyk7XG5cdCAgb25TdWdnZXN0aW9uTW91c2VFbnRlciA9IF8uYmluZCh0aGlzLl9vblN1Z2dlc3Rpb25Nb3VzZUVudGVyLCB0aGlzKTtcblx0ICBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlID0gXy5iaW5kKHRoaXMuX29uU3VnZ2VzdGlvbk1vdXNlTGVhdmUsIHRoaXMpO1xuXG5cdCAgdmFyIGNzc0NsYXNzID0gXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb24pO1xuXHQgIHRoaXMuJG1lbnUgPSBET00uZWxlbWVudChvLm1lbnUpXG5cdCAgICAub24oJ21vdXNlZW50ZXIuYWEnLCBjc3NDbGFzcywgb25TdWdnZXN0aW9uTW91c2VFbnRlcilcblx0ICAgIC5vbignbW91c2VsZWF2ZS5hYScsIGNzc0NsYXNzLCBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlKVxuXHQgICAgLm9uKCdjbGljay5hYScsIGNzc0NsYXNzLCBvblN1Z2dlc3Rpb25DbGljayk7XG5cblx0ICB0aGlzLiRjb250YWluZXIgPSBvLmFwcGVuZFRvID8gby53cmFwcGVyIDogdGhpcy4kbWVudTtcblxuXHQgIGlmIChvLnRlbXBsYXRlcyAmJiBvLnRlbXBsYXRlcy5oZWFkZXIpIHtcblx0ICAgIHRoaXMudGVtcGxhdGVzLmhlYWRlciA9IF8udGVtcGxhdGlmeShvLnRlbXBsYXRlcy5oZWFkZXIpO1xuXHQgICAgdGhpcy4kbWVudS5wcmVwZW5kKHRoaXMudGVtcGxhdGVzLmhlYWRlcigpKTtcblx0ICB9XG5cblx0ICBpZiAoby50ZW1wbGF0ZXMgJiYgby50ZW1wbGF0ZXMuZW1wdHkpIHtcblx0ICAgIHRoaXMudGVtcGxhdGVzLmVtcHR5ID0gXy50ZW1wbGF0aWZ5KG8udGVtcGxhdGVzLmVtcHR5KTtcblx0ICAgIHRoaXMuJGVtcHR5ID0gRE9NLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCInICtcblx0ICAgICAgXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmVtcHR5LCB0cnVlKSArICdcIj4nICtcblx0ICAgICAgJzwvZGl2PicpO1xuXHQgICAgdGhpcy4kbWVudS5hcHBlbmQodGhpcy4kZW1wdHkpO1xuXHQgICAgdGhpcy4kZW1wdHkuaGlkZSgpO1xuXHQgIH1cblxuXHQgIHRoaXMuZGF0YXNldHMgPSBfLm1hcChvLmRhdGFzZXRzLCBmdW5jdGlvbihvRGF0YXNldCkge1xuXHQgICAgcmV0dXJuIGluaXRpYWxpemVEYXRhc2V0KHRoYXQuJG1lbnUsIG9EYXRhc2V0LCBvLmNzc0NsYXNzZXMpO1xuXHQgIH0pO1xuXHQgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0KSB7XG5cdCAgICB2YXIgcm9vdCA9IGRhdGFzZXQuZ2V0Um9vdCgpO1xuXHQgICAgaWYgKHJvb3QgJiYgcm9vdC5wYXJlbnQoKS5sZW5ndGggPT09IDApIHtcblx0ICAgICAgdGhhdC4kbWVudS5hcHBlbmQocm9vdCk7XG5cdCAgICB9XG5cdCAgICBkYXRhc2V0Lm9uU3luYygncmVuZGVyZWQnLCB0aGF0Ll9vblJlbmRlcmVkLCB0aGF0KTtcblx0ICB9KTtcblxuXHQgIGlmIChvLnRlbXBsYXRlcyAmJiBvLnRlbXBsYXRlcy5mb290ZXIpIHtcblx0ICAgIHRoaXMudGVtcGxhdGVzLmZvb3RlciA9IF8udGVtcGxhdGlmeShvLnRlbXBsYXRlcy5mb290ZXIpO1xuXHQgICAgdGhpcy4kbWVudS5hcHBlbmQodGhpcy50ZW1wbGF0ZXMuZm9vdGVyKCkpO1xuXHQgIH1cblxuXHQgIHZhciBzZWxmID0gdGhpcztcblx0ICBET00uZWxlbWVudCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcblx0ICAgIHNlbGYuX3JlZHJhdygpO1xuXHQgIH0pO1xuXHR9XG5cblx0Ly8gaW5zdGFuY2UgbWV0aG9kc1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXG5cblx0Xy5taXhpbihEcm9wZG93bi5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuXG5cdCAgLy8gIyMjIHByaXZhdGVcblxuXHQgIF9vblN1Z2dlc3Rpb25DbGljazogZnVuY3Rpb24gb25TdWdnZXN0aW9uQ2xpY2soJGUpIHtcblx0ICAgIHRoaXMudHJpZ2dlcignc3VnZ2VzdGlvbkNsaWNrZWQnLCBET00uZWxlbWVudCgkZS5jdXJyZW50VGFyZ2V0KSk7XG5cdCAgfSxcblxuXHQgIF9vblN1Z2dlc3Rpb25Nb3VzZUVudGVyOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyKCRlKSB7XG5cdCAgICB2YXIgZWx0ID0gRE9NLmVsZW1lbnQoJGUuY3VycmVudFRhcmdldCk7XG5cdCAgICBpZiAoZWx0Lmhhc0NsYXNzKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKSkge1xuXHQgICAgICAvLyB3ZSdyZSBhbHJlYWR5IG9uIHRoZSBjdXJzb3Jcblx0ICAgICAgLy8gPT4gd2UncmUgcHJvYmFibHkgZW50ZXJpbmcgaXQgYWdhaW4gYWZ0ZXIgbGVhdmluZyBpdCBmb3IgYSBuZXN0ZWQgZGl2XG5cdCAgICAgIHJldHVybjtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuXG5cdCAgICAvLyBGaXhlcyBpT1MgZG91YmxlIHRhcCBiZWhhdmlvdXIsIGJ5IG1vZGlmeWluZyB0aGUgRE9NIHJpZ2h0IGJlZm9yZSB0aGVcblx0ICAgIC8vIG5hdGl2ZSBocmVmIGNsaWNrcyBoYXBwZW5zLCBpT1Mgd2lsbCByZXF1aXJlcyBhbm90aGVyIHRhcCB0byBmb2xsb3dcblx0ICAgIC8vIGEgc3VnZ2VzdGlvbiB0aGF0IGhhcyBhbiA8YSBocmVmPiBlbGVtZW50IGluc2lkZVxuXHQgICAgLy8gaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT1pb3MrZG91YmxlK3RhcCtidWcraHJlZlxuXHQgICAgdmFyIHN1Z2dlc3Rpb24gPSB0aGlzO1xuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0ICAgICAgLy8gdGhpcyBleGFjdCBsaW5lLCB3aGVuIGluc2lkZSB0aGUgbWFpbiBsb29wLCB3aWxsIHRyaWdnZXIgYSBkb3VibGUgdGFwIGJ1Z1xuXHQgICAgICAvLyBvbiBpT1MgZGV2aWNlc1xuXHQgICAgICBzdWdnZXN0aW9uLl9zZXRDdXJzb3IoZWx0LCBmYWxzZSk7XG5cdCAgICB9LCAwKTtcblx0ICB9LFxuXG5cdCAgX29uU3VnZ2VzdGlvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uIG9uU3VnZ2VzdGlvbk1vdXNlTGVhdmUoJGUpIHtcblx0ICAgIC8vICRlLnJlbGF0ZWRUYXJnZXQgaXMgdGhlIGBFdmVudFRhcmdldGAgdGhlIHBvaW50aW5nIGRldmljZSBlbnRlcmVkIHRvXG5cdCAgICBpZiAoJGUucmVsYXRlZFRhcmdldCkge1xuXHQgICAgICB2YXIgZWx0ID0gRE9NLmVsZW1lbnQoJGUucmVsYXRlZFRhcmdldCk7XG5cdCAgICAgIGlmIChlbHQuY2xvc2VzdCgnLicgKyBfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSkubGVuZ3RoID4gMCkge1xuXHQgICAgICAgIC8vIG91ciBmYXRoZXIgaXMgYSBjdXJzb3Jcblx0ICAgICAgICAvLyA9PiBpdCBtZWFucyB3ZSdyZSBqdXN0IGxlYXZpbmcgdGhlIHN1Z2dlc3Rpb24gZm9yIGEgbmVzdGVkIGRpdlxuXHQgICAgICAgIHJldHVybjtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG5cdCAgICB0aGlzLnRyaWdnZXIoJ2N1cnNvclJlbW92ZWQnKTtcblx0ICB9LFxuXG5cdCAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQoZSwgcXVlcnkpIHtcblx0ICAgIHRoaXMuaXNFbXB0eSA9IF8uZXZlcnkodGhpcy5kYXRhc2V0cywgaXNEYXRhc2V0RW1wdHkpO1xuXG5cdCAgICBpZiAodGhpcy5pc0VtcHR5KSB7XG5cdCAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcblx0ICAgICAgICB0aGlzLnRyaWdnZXIoJ2VtcHR5Jyk7XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAodGhpcy4kZW1wdHkpIHtcblx0ICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcblx0ICAgICAgICAgIHRoaXMuX2hpZGUoKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLnRlbXBsYXRlcy5lbXB0eSh7XG5cdCAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLmRhdGFzZXRzWzBdICYmIHRoaXMuZGF0YXNldHNbMF0ucXVlcnlcblx0ICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgdGhpcy4kZW1wdHkuaHRtbChodG1sKTtcblx0ICAgICAgICAgIHRoaXMuJGVtcHR5LnNob3coKTtcblx0ICAgICAgICAgIHRoaXMuX3Nob3coKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSBpZiAoXy5hbnkodGhpcy5kYXRhc2V0cywgaGFzRW1wdHlUZW1wbGF0ZSkpIHtcblx0ICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcblx0ICAgICAgICAgIHRoaXMuX2hpZGUoKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdGhpcy5fc2hvdygpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9oaWRlKCk7XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAodGhpcy5pc09wZW4pIHtcblx0ICAgICAgaWYgKHRoaXMuJGVtcHR5KSB7XG5cdCAgICAgICAgdGhpcy4kZW1wdHkuZW1wdHkoKTtcblx0ICAgICAgICB0aGlzLiRlbXB0eS5oaWRlKCk7XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG5cdCAgICAgICAgdGhpcy5fc2hvdygpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX2hpZGUoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICB0aGlzLnRyaWdnZXIoJ2RhdGFzZXRSZW5kZXJlZCcpO1xuXG5cdCAgICBmdW5jdGlvbiBpc0RhdGFzZXRFbXB0eShkYXRhc2V0KSB7XG5cdCAgICAgIHJldHVybiBkYXRhc2V0LmlzRW1wdHkoKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gaGFzRW1wdHlUZW1wbGF0ZShkYXRhc2V0KSB7XG5cdCAgICAgIHJldHVybiBkYXRhc2V0LnRlbXBsYXRlcyAmJiBkYXRhc2V0LnRlbXBsYXRlcy5lbXB0eTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hpZGU6IGZ1bmN0aW9uKCkge1xuXHQgICAgdGhpcy4kY29udGFpbmVyLmhpZGUoKTtcblx0ICB9LFxuXG5cdCAgX3Nob3c6IGZ1bmN0aW9uKCkge1xuXHQgICAgLy8gY2FuJ3QgdXNlIGpRdWVyeSNzaG93IGJlY2F1c2UgJG1lbnUgaXMgYSBzcGFuIGVsZW1lbnQgd2Ugd2FudFxuXHQgICAgLy8gZGlzcGxheTogYmxvY2s7IG5vdCBkaXNsYXk6IGlubGluZTtcblx0ICAgIHRoaXMuJGNvbnRhaW5lci5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuXHQgICAgdGhpcy5fcmVkcmF3KCk7XG5cblx0ICAgIHRoaXMudHJpZ2dlcignc2hvd24nKTtcblx0ICB9LFxuXG5cdCAgX3JlZHJhdzogZnVuY3Rpb24gcmVkcmF3KCkge1xuXHQgICAgaWYgKCF0aGlzLmlzT3BlbiB8fCAhdGhpcy5hcHBlbmRUbykgcmV0dXJuO1xuXG5cdCAgICB0aGlzLnRyaWdnZXIoJ3JlZHJhd24nKTtcblx0ICB9LFxuXG5cdCAgX2dldFN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBnZXRTdWdnZXN0aW9ucygpIHtcblx0ICAgIHJldHVybiB0aGlzLiRtZW51LmZpbmQoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb24pKTtcblx0ICB9LFxuXG5cdCAgX2dldEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3Vyc29yKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuJG1lbnUuZmluZChfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yKSkuZmlyc3QoKTtcblx0ICB9LFxuXG5cdCAgX3NldEN1cnNvcjogZnVuY3Rpb24gc2V0Q3Vyc29yKCRlbCwgdXBkYXRlSW5wdXQpIHtcblx0ICAgICRlbC5maXJzdCgpXG5cdCAgICAgIC5hZGRDbGFzcyhfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSlcblx0ICAgICAgLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXHQgICAgdGhpcy50cmlnZ2VyKCdjdXJzb3JNb3ZlZCcsIHVwZGF0ZUlucHV0KTtcblx0ICB9LFxuXG5cdCAgX3JlbW92ZUN1cnNvcjogZnVuY3Rpb24gcmVtb3ZlQ3Vyc29yKCkge1xuXHQgICAgdGhpcy5fZ2V0Q3Vyc29yKClcblx0ICAgICAgLnJlbW92ZUNsYXNzKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKVxuXHQgICAgICAucmVtb3ZlQXR0cignYXJpYS1zZWxlY3RlZCcpO1xuXHQgIH0sXG5cblx0ICBfbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvcihpbmNyZW1lbnQpIHtcblx0ICAgIHZhciAkc3VnZ2VzdGlvbnM7XG5cdCAgICB2YXIgJG9sZEN1cnNvcjtcblx0ICAgIHZhciBuZXdDdXJzb3JJbmRleDtcblx0ICAgIHZhciAkbmV3Q3Vyc29yO1xuXG5cdCAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG5cdCAgICAgIHJldHVybjtcblx0ICAgIH1cblxuXHQgICAgJG9sZEN1cnNvciA9IHRoaXMuX2dldEN1cnNvcigpO1xuXHQgICAgJHN1Z2dlc3Rpb25zID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnMoKTtcblxuXHQgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG5cblx0ICAgIC8vIHNoaWZ0aW5nIGJlZm9yZSBhbmQgYWZ0ZXIgbW9kdWxvIHRvIGRlYWwgd2l0aCAtMSBpbmRleFxuXHQgICAgbmV3Q3Vyc29ySW5kZXggPSAkc3VnZ2VzdGlvbnMuaW5kZXgoJG9sZEN1cnNvcikgKyBpbmNyZW1lbnQ7XG5cdCAgICBuZXdDdXJzb3JJbmRleCA9IChuZXdDdXJzb3JJbmRleCArIDEpICUgKCRzdWdnZXN0aW9ucy5sZW5ndGggKyAxKSAtIDE7XG5cblx0ICAgIGlmIChuZXdDdXJzb3JJbmRleCA9PT0gLTEpIHtcblx0ICAgICAgdGhpcy50cmlnZ2VyKCdjdXJzb3JSZW1vdmVkJyk7XG5cblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfSBlbHNlIGlmIChuZXdDdXJzb3JJbmRleCA8IC0xKSB7XG5cdCAgICAgIG5ld0N1cnNvckluZGV4ID0gJHN1Z2dlc3Rpb25zLmxlbmd0aCAtIDE7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuX3NldEN1cnNvcigkbmV3Q3Vyc29yID0gJHN1Z2dlc3Rpb25zLmVxKG5ld0N1cnNvckluZGV4KSwgdHJ1ZSk7XG5cblx0ICAgIC8vIGluIHRoZSBjYXNlIG9mIHNjcm9sbGFibGUgb3ZlcmZsb3dcblx0ICAgIC8vIG1ha2Ugc3VyZSB0aGUgY3Vyc29yIGlzIHZpc2libGUgaW4gdGhlIG1lbnVcblx0ICAgIHRoaXMuX2Vuc3VyZVZpc2libGUoJG5ld0N1cnNvcik7XG5cdCAgfSxcblxuXHQgIF9lbnN1cmVWaXNpYmxlOiBmdW5jdGlvbiBlbnN1cmVWaXNpYmxlKCRlbCkge1xuXHQgICAgdmFyIGVsVG9wO1xuXHQgICAgdmFyIGVsQm90dG9tO1xuXHQgICAgdmFyIG1lbnVTY3JvbGxUb3A7XG5cdCAgICB2YXIgbWVudUhlaWdodDtcblxuXHQgICAgZWxUb3AgPSAkZWwucG9zaXRpb24oKS50b3A7XG5cdCAgICBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLmhlaWdodCgpICtcblx0ICAgICAgcGFyc2VJbnQoJGVsLmNzcygnbWFyZ2luLXRvcCcpLCAxMCkgK1xuXHQgICAgICBwYXJzZUludCgkZWwuY3NzKCdtYXJnaW4tYm90dG9tJyksIDEwKTtcblx0ICAgIG1lbnVTY3JvbGxUb3AgPSB0aGlzLiRtZW51LnNjcm9sbFRvcCgpO1xuXHQgICAgbWVudUhlaWdodCA9IHRoaXMuJG1lbnUuaGVpZ2h0KCkgK1xuXHQgICAgICBwYXJzZUludCh0aGlzLiRtZW51LmNzcygncGFkZGluZy10b3AnKSwgMTApICtcblx0ICAgICAgcGFyc2VJbnQodGhpcy4kbWVudS5jc3MoJ3BhZGRpbmctYm90dG9tJyksIDEwKTtcblxuXHQgICAgaWYgKGVsVG9wIDwgMCkge1xuXHQgICAgICB0aGlzLiRtZW51LnNjcm9sbFRvcChtZW51U2Nyb2xsVG9wICsgZWxUb3ApO1xuXHQgICAgfSBlbHNlIGlmIChtZW51SGVpZ2h0IDwgZWxCb3R0b20pIHtcblx0ICAgICAgdGhpcy4kbWVudS5zY3JvbGxUb3AobWVudVNjcm9sbFRvcCArIChlbEJvdHRvbSAtIG1lbnVIZWlnaHQpKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLy8gIyMjIHB1YmxpY1xuXG5cdCAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuXHQgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG5cdCAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cblx0ICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG5cdCAgICAgIHRoaXMuX2hpZGUoKTtcblxuXHQgICAgICB0aGlzLnRyaWdnZXIoJ2Nsb3NlZCcpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuXHQgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuXHQgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cblx0ICAgICAgaWYgKCF0aGlzLmlzRW1wdHkpIHtcblx0ICAgICAgICB0aGlzLl9zaG93KCk7XG5cdCAgICAgIH1cblxuXHQgICAgICB0aGlzLnRyaWdnZXIoJ29wZW5lZCcpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG5cdCAgICB0aGlzLiRtZW51LmNzcyhkaXIgPT09ICdsdHInID8gdGhpcy5jc3MubHRyIDogdGhpcy5jc3MucnRsKTtcblx0ICB9LFxuXG5cdCAgbW92ZUN1cnNvclVwOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yVXAoKSB7XG5cdCAgICB0aGlzLl9tb3ZlQ3Vyc29yKC0xKTtcblx0ICB9LFxuXG5cdCAgbW92ZUN1cnNvckRvd246IGZ1bmN0aW9uIG1vdmVDdXJzb3JEb3duKCkge1xuXHQgICAgdGhpcy5fbW92ZUN1cnNvcigrMSk7XG5cdCAgfSxcblxuXHQgIGdldERhdHVtRm9yU3VnZ2VzdGlvbjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKCRlbCkge1xuXHQgICAgdmFyIGRhdHVtID0gbnVsbDtcblxuXHQgICAgaWYgKCRlbC5sZW5ndGgpIHtcblx0ICAgICAgZGF0dW0gPSB7XG5cdCAgICAgICAgcmF3OiBEYXRhc2V0LmV4dHJhY3REYXR1bSgkZWwpLFxuXHQgICAgICAgIHZhbHVlOiBEYXRhc2V0LmV4dHJhY3RWYWx1ZSgkZWwpLFxuXHQgICAgICAgIGRhdGFzZXROYW1lOiBEYXRhc2V0LmV4dHJhY3REYXRhc2V0TmFtZSgkZWwpXG5cdCAgICAgIH07XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBkYXR1bTtcblx0ICB9LFxuXG5cdCAgZ2V0Q3VycmVudEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3VycmVudEN1cnNvcigpIHtcblx0ICAgIHJldHVybiB0aGlzLl9nZXRDdXJzb3IoKS5maXJzdCgpO1xuXHQgIH0sXG5cblx0ICBnZXREYXR1bUZvckN1cnNvcjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JDdXJzb3IoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5nZXREYXR1bUZvclN1Z2dlc3Rpb24odGhpcy5fZ2V0Q3Vyc29yKCkuZmlyc3QoKSk7XG5cdCAgfSxcblxuXHQgIGdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKHRoaXMuX2dldFN1Z2dlc3Rpb25zKCkuZmlyc3QoKSk7XG5cdCAgfSxcblxuXHQgIGN1cnNvclRvcFN1Z2dlc3Rpb246IGZ1bmN0aW9uIGN1cnNvclRvcFN1Z2dlc3Rpb24oKSB7XG5cdCAgICB0aGlzLl9zZXRDdXJzb3IodGhpcy5fZ2V0U3VnZ2VzdGlvbnMoKS5maXJzdCgpLCBmYWxzZSk7XG5cdCAgfSxcblxuXHQgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG5cdCAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgdXBkYXRlRGF0YXNldCk7XG5cblx0ICAgIGZ1bmN0aW9uIHVwZGF0ZURhdGFzZXQoZGF0YXNldCkge1xuXHQgICAgICBkYXRhc2V0LnVwZGF0ZShxdWVyeSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcblx0ICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBjbGVhckRhdGFzZXQpO1xuXHQgICAgdGhpcy5pc0VtcHR5ID0gdHJ1ZTtcblxuXHQgICAgZnVuY3Rpb24gY2xlYXJEYXRhc2V0KGRhdGFzZXQpIHtcblx0ICAgICAgZGF0YXNldC5jbGVhcigpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBpc1Zpc2libGU6IGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcblx0ICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiAhdGhpcy5pc0VtcHR5O1xuXHQgIH0sXG5cblx0ICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuXHQgICAgdGhpcy4kbWVudS5vZmYoJy5hYScpO1xuXG5cdCAgICB0aGlzLiRtZW51ID0gbnVsbDtcblxuXHQgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGRlc3Ryb3lEYXRhc2V0KTtcblxuXHQgICAgZnVuY3Rpb24gZGVzdHJveURhdGFzZXQoZGF0YXNldCkge1xuXHQgICAgICBkYXRhc2V0LmRlc3Ryb3koKTtcblx0ICAgIH1cblx0ICB9XG5cdH0pO1xuXG5cdC8vIGhlbHBlciBmdW5jdGlvbnNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxuXHREcm9wZG93bi5EYXRhc2V0ID0gRGF0YXNldDtcblxuXHRmdW5jdGlvbiBpbml0aWFsaXplRGF0YXNldCgkbWVudSwgb0RhdGFzZXQsIGNzc0NsYXNzZXMpIHtcblx0ICByZXR1cm4gbmV3IERyb3Bkb3duLkRhdGFzZXQoXy5taXhpbih7JG1lbnU6ICRtZW51LCBjc3NDbGFzc2VzOiBjc3NDbGFzc2VzfSwgb0RhdGFzZXQpKTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gRHJvcGRvd247XG5cblxuLyoqKi8gfSxcbi8qIDE3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGRhdGFzZXRLZXkgPSAnYWFEYXRhc2V0Jztcblx0dmFyIHZhbHVlS2V5ID0gJ2FhVmFsdWUnO1xuXHR2YXIgZGF0dW1LZXkgPSAnYWFEYXR1bSc7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgRE9NID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblx0dmFyIGh0bWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblx0dmFyIGNzcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXHR2YXIgRXZlbnRFbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHQvLyBjb25zdHJ1Y3RvclxuXHQvLyAtLS0tLS0tLS0tLVxuXG5cdGZ1bmN0aW9uIERhdGFzZXQobykge1xuXHQgIG8gPSBvIHx8IHt9O1xuXHQgIG8udGVtcGxhdGVzID0gby50ZW1wbGF0ZXMgfHwge307XG5cblx0ICBpZiAoIW8uc291cmNlKSB7XG5cdCAgICBfLmVycm9yKCdtaXNzaW5nIHNvdXJjZScpO1xuXHQgIH1cblxuXHQgIGlmIChvLm5hbWUgJiYgIWlzVmFsaWROYW1lKG8ubmFtZSkpIHtcblx0ICAgIF8uZXJyb3IoJ2ludmFsaWQgZGF0YXNldCBuYW1lOiAnICsgby5uYW1lKTtcblx0ICB9XG5cblx0ICAvLyB0cmFja3MgdGhlIGxhc3QgcXVlcnkgdGhlIGRhdGFzZXQgd2FzIHVwZGF0ZWQgZm9yXG5cdCAgdGhpcy5xdWVyeSA9IG51bGw7XG5cdCAgdGhpcy5faXNFbXB0eSA9IHRydWU7XG5cblx0ICB0aGlzLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG5cdCAgdGhpcy5uYW1lID0gdHlwZW9mIG8ubmFtZSA9PT0gJ3VuZGVmaW5lZCcgfHwgby5uYW1lID09PSBudWxsID8gXy5nZXRVbmlxdWVJZCgpIDogby5uYW1lO1xuXG5cdCAgdGhpcy5zb3VyY2UgPSBvLnNvdXJjZTtcblx0ICB0aGlzLmRpc3BsYXlGbiA9IGdldERpc3BsYXlGbihvLmRpc3BsYXkgfHwgby5kaXNwbGF5S2V5KTtcblxuXHQgIHRoaXMuZGVib3VuY2UgPSBvLmRlYm91bmNlO1xuXG5cdCAgdGhpcy5jYWNoZSA9IG8uY2FjaGUgIT09IGZhbHNlO1xuXG5cdCAgdGhpcy50ZW1wbGF0ZXMgPSBnZXRUZW1wbGF0ZXMoby50ZW1wbGF0ZXMsIHRoaXMuZGlzcGxheUZuKTtcblxuXHQgIHRoaXMuY3NzID0gXy5taXhpbih7fSwgY3NzLCBvLmFwcGVuZFRvID8gY3NzLmFwcGVuZFRvIDoge30pO1xuXHQgIHRoaXMuY3NzQ2xhc3NlcyA9IG8uY3NzQ2xhc3NlcyA9IF8ubWl4aW4oe30sIGNzcy5kZWZhdWx0Q2xhc3Nlcywgby5jc3NDbGFzc2VzIHx8IHt9KTtcblx0ICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ID1cblx0ICAgIG8uY3NzQ2xhc3Nlcy5mb3JtYXR0ZWRQcmVmaXggfHwgXy5mb3JtYXRQcmVmaXgodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLm5vUHJlZml4KTtcblxuXHQgIHZhciBjbGF6eiA9IF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5kYXRhc2V0KTtcblx0ICB0aGlzLiRlbCA9IG8uJG1lbnUgJiYgby4kbWVudS5maW5kKGNsYXp6ICsgJy0nICsgdGhpcy5uYW1lKS5sZW5ndGggPiAwID9cblx0ICAgIERPTS5lbGVtZW50KG8uJG1lbnUuZmluZChjbGF6eiArICctJyArIHRoaXMubmFtZSlbMF0pIDpcblx0ICAgIERPTS5lbGVtZW50KFxuXHQgICAgICBodG1sLmRhdGFzZXQucmVwbGFjZSgnJUNMQVNTJScsIHRoaXMubmFtZSlcblx0ICAgICAgICAucmVwbGFjZSgnJVBSRUZJWCUnLCB0aGlzLmNzc0NsYXNzZXMucHJlZml4KVxuXHQgICAgICAgIC5yZXBsYWNlKCclREFUQVNFVCUnLCB0aGlzLmNzc0NsYXNzZXMuZGF0YXNldClcblx0ICAgICk7XG5cblx0ICB0aGlzLiRtZW51ID0gby4kbWVudTtcblx0ICB0aGlzLmNsZWFyQ2FjaGVkU3VnZ2VzdGlvbnMoKTtcblx0fVxuXG5cdC8vIHN0YXRpYyBtZXRob2RzXG5cdC8vIC0tLS0tLS0tLS0tLS0tXG5cblx0RGF0YXNldC5leHRyYWN0RGF0YXNldE5hbWUgPSBmdW5jdGlvbiBleHRyYWN0RGF0YXNldE5hbWUoZWwpIHtcblx0ICByZXR1cm4gRE9NLmVsZW1lbnQoZWwpLmRhdGEoZGF0YXNldEtleSk7XG5cdH07XG5cblx0RGF0YXNldC5leHRyYWN0VmFsdWUgPSBmdW5jdGlvbiBleHRyYWN0VmFsdWUoZWwpIHtcblx0ICByZXR1cm4gRE9NLmVsZW1lbnQoZWwpLmRhdGEodmFsdWVLZXkpO1xuXHR9O1xuXG5cdERhdGFzZXQuZXh0cmFjdERhdHVtID0gZnVuY3Rpb24gZXh0cmFjdERhdHVtKGVsKSB7XG5cdCAgdmFyIGRhdHVtID0gRE9NLmVsZW1lbnQoZWwpLmRhdGEoZGF0dW1LZXkpO1xuXHQgIGlmICh0eXBlb2YgZGF0dW0gPT09ICdzdHJpbmcnKSB7XG5cdCAgICAvLyBaZXB0byBoYXMgYW4gYXV0b21hdGljIGRlc2VyaWFsaXphdGlvbiBvZiB0aGVcblx0ICAgIC8vIEpTT04gZW5jb2RlZCBkYXRhIGF0dHJpYnV0ZVxuXHQgICAgZGF0dW0gPSBKU09OLnBhcnNlKGRhdHVtKTtcblx0ICB9XG5cdCAgcmV0dXJuIGRhdHVtO1xuXHR9O1xuXG5cdC8vIGluc3RhbmNlIG1ldGhvZHNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF8ubWl4aW4oRGF0YXNldC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuXG5cdCAgLy8gIyMjIHByaXZhdGVcblxuXHQgIF9yZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcblx0ICAgIGlmICghdGhpcy4kZWwpIHtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG5cdCAgICB2YXIgaGFzU3VnZ2VzdGlvbnM7XG5cdCAgICB2YXIgcmVuZGVyQXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblx0ICAgIHRoaXMuJGVsLmVtcHR5KCk7XG5cblx0ICAgIGhhc1N1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgJiYgc3VnZ2VzdGlvbnMubGVuZ3RoO1xuXHQgICAgdGhpcy5faXNFbXB0eSA9ICFoYXNTdWdnZXN0aW9ucztcblxuXHQgICAgaWYgKCFoYXNTdWdnZXN0aW9ucyAmJiB0aGlzLnRlbXBsYXRlcy5lbXB0eSkge1xuXHQgICAgICB0aGlzLiRlbFxuXHQgICAgICAgIC5odG1sKGdldEVtcHR5SHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSlcblx0ICAgICAgICAucHJlcGVuZCh0aGF0LnRlbXBsYXRlcy5oZWFkZXIgPyBnZXRIZWFkZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbClcblx0ICAgICAgICAuYXBwZW5kKHRoYXQudGVtcGxhdGVzLmZvb3RlciA/IGdldEZvb3Rlckh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykgOiBudWxsKTtcblx0ICAgIH0gZWxzZSBpZiAoaGFzU3VnZ2VzdGlvbnMpIHtcblx0ICAgICAgdGhpcy4kZWxcblx0ICAgICAgICAuaHRtbChnZXRTdWdnZXN0aW9uc0h0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykpXG5cdCAgICAgICAgLnByZXBlbmQodGhhdC50ZW1wbGF0ZXMuaGVhZGVyID8gZ2V0SGVhZGVySHRtbC5hcHBseSh0aGlzLCByZW5kZXJBcmdzKSA6IG51bGwpXG5cdCAgICAgICAgLmFwcGVuZCh0aGF0LnRlbXBsYXRlcy5mb290ZXIgPyBnZXRGb290ZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbCk7XG5cdCAgICB9IGVsc2UgaWYgKHN1Z2dlc3Rpb25zICYmICFBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuXHQgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdWdnZXN0aW9ucyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh0aGlzLiRtZW51KSB7XG5cdCAgICAgIHRoaXMuJG1lbnUuYWRkQ2xhc3MoXG5cdCAgICAgICAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCArIChoYXNTdWdnZXN0aW9ucyA/ICd3aXRoJyA6ICd3aXRob3V0JykgKyAnLScgKyB0aGlzLm5hbWVcblx0ICAgICAgKS5yZW1vdmVDbGFzcyhcblx0ICAgICAgICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ICsgKGhhc1N1Z2dlc3Rpb25zID8gJ3dpdGhvdXQnIDogJ3dpdGgnKSArICctJyArIHRoaXMubmFtZVxuXHQgICAgICApO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJywgcXVlcnkpO1xuXG5cdCAgICBmdW5jdGlvbiBnZXRFbXB0eUh0bWwoKSB7XG5cdCAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXHQgICAgICBhcmdzID0gW3txdWVyeTogcXVlcnksIGlzRW1wdHk6IHRydWV9XS5jb25jYXQoYXJncyk7XG5cdCAgICAgIHJldHVybiB0aGF0LnRlbXBsYXRlcy5lbXB0eS5hcHBseSh0aGlzLCBhcmdzKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnNIdG1sKCkge1xuXHQgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblx0ICAgICAgdmFyICRzdWdnZXN0aW9ucztcblx0ICAgICAgdmFyIG5vZGVzO1xuXHQgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cblx0ICAgICAgdmFyIHN1Z2dlc3Rpb25zSHRtbCA9IGh0bWwuc3VnZ2VzdGlvbnMuXG5cdCAgICAgICAgcmVwbGFjZSgnJVBSRUZJWCUnLCB0aGlzLmNzc0NsYXNzZXMucHJlZml4KS5cblx0ICAgICAgICByZXBsYWNlKCclU1VHR0VTVElPTlMlJywgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb25zKTtcblx0ICAgICAgJHN1Z2dlc3Rpb25zID0gRE9NXG5cdCAgICAgICAgLmVsZW1lbnQoc3VnZ2VzdGlvbnNIdG1sKVxuXHQgICAgICAgIC5jc3ModGhpcy5jc3Muc3VnZ2VzdGlvbnMpO1xuXG5cdCAgICAgIC8vIGpRdWVyeSNhcHBlbmQgZG9lc24ndCBzdXBwb3J0IGFycmF5cyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcblx0ICAgICAgLy8gdW50aWwgdmVyc2lvbiAxLjgsIHNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMTIzMVxuXHQgICAgICBub2RlcyA9IF8ubWFwKHN1Z2dlc3Rpb25zLCBnZXRTdWdnZXN0aW9uTm9kZSk7XG5cdCAgICAgICRzdWdnZXN0aW9ucy5hcHBlbmQuYXBwbHkoJHN1Z2dlc3Rpb25zLCBub2Rlcyk7XG5cblx0ICAgICAgcmV0dXJuICRzdWdnZXN0aW9ucztcblxuXHQgICAgICBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uTm9kZShzdWdnZXN0aW9uKSB7XG5cdCAgICAgICAgdmFyICRlbDtcblxuXHQgICAgICAgIHZhciBzdWdnZXN0aW9uSHRtbCA9IGh0bWwuc3VnZ2VzdGlvbi5cblx0ICAgICAgICAgIHJlcGxhY2UoJyVQUkVGSVglJywgc2VsZi5jc3NDbGFzc2VzLnByZWZpeCkuXG5cdCAgICAgICAgICByZXBsYWNlKCclU1VHR0VTVElPTiUnLCBzZWxmLmNzc0NsYXNzZXMuc3VnZ2VzdGlvbik7XG5cdCAgICAgICAgJGVsID0gRE9NLmVsZW1lbnQoc3VnZ2VzdGlvbkh0bWwpXG5cdCAgICAgICAgICAuYXR0cih7XG5cdCAgICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuXHQgICAgICAgICAgICBpZDogWydvcHRpb24nLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApXS5qb2luKCctJylcblx0ICAgICAgICAgIH0pXG5cdCAgICAgICAgICAuYXBwZW5kKHRoYXQudGVtcGxhdGVzLnN1Z2dlc3Rpb24uYXBwbHkodGhpcywgW3N1Z2dlc3Rpb25dLmNvbmNhdChhcmdzKSkpO1xuXG5cdCAgICAgICAgJGVsLmRhdGEoZGF0YXNldEtleSwgdGhhdC5uYW1lKTtcblx0ICAgICAgICAkZWwuZGF0YSh2YWx1ZUtleSwgdGhhdC5kaXNwbGF5Rm4oc3VnZ2VzdGlvbikgfHwgdW5kZWZpbmVkKTsgLy8gdGhpcyBsZWQgdG8gdW5kZWZpbmVkIHJldHVybiB2YWx1ZVxuXHQgICAgICAgICRlbC5kYXRhKGRhdHVtS2V5LCBKU09OLnN0cmluZ2lmeShzdWdnZXN0aW9uKSk7XG5cdCAgICAgICAgJGVsLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbigpIHsgRE9NLmVsZW1lbnQodGhpcykuY3NzKHNlbGYuY3NzLnN1Z2dlc3Rpb25DaGlsZCk7IH0pO1xuXG5cdCAgICAgICAgcmV0dXJuICRlbDtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBnZXRIZWFkZXJIdG1sKCkge1xuXHQgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblx0ICAgICAgYXJncyA9IFt7cXVlcnk6IHF1ZXJ5LCBpc0VtcHR5OiAhaGFzU3VnZ2VzdGlvbnN9XS5jb25jYXQoYXJncyk7XG5cdCAgICAgIHJldHVybiB0aGF0LnRlbXBsYXRlcy5oZWFkZXIuYXBwbHkodGhpcywgYXJncyk7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGdldEZvb3Rlckh0bWwoKSB7XG5cdCAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXHQgICAgICBhcmdzID0gW3txdWVyeTogcXVlcnksIGlzRW1wdHk6ICFoYXNTdWdnZXN0aW9uc31dLmNvbmNhdChhcmdzKTtcblx0ICAgICAgcmV0dXJuIHRoYXQudGVtcGxhdGVzLmZvb3Rlci5hcHBseSh0aGlzLCBhcmdzKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLy8gIyMjIHB1YmxpY1xuXG5cdCAgZ2V0Um9vdDogZnVuY3Rpb24gZ2V0Um9vdCgpIHtcblx0ICAgIHJldHVybiB0aGlzLiRlbDtcblx0ICB9LFxuXG5cdCAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcblx0ICAgIGZ1bmN0aW9uIGhhbmRsZVN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKSB7XG5cdCAgICAgIC8vIGlmIHRoZSB1cGRhdGUgaGFzIGJlZW4gY2FuY2VsZWQgb3IgaWYgdGhlIHF1ZXJ5IGhhcyBjaGFuZ2VkXG5cdCAgICAgIC8vIGRvIG5vdCByZW5kZXIgdGhlIHN1Z2dlc3Rpb25zIGFzIHRoZXkndmUgYmVjb21lIG91dGRhdGVkXG5cdCAgICAgIGlmICghdGhpcy5jYW5jZWxlZCAmJiBxdWVyeSA9PT0gdGhpcy5xdWVyeSkge1xuXHQgICAgICAgIC8vIGNvbmNhdCBhbGwgdGhlIG90aGVyIGFyZ3VtZW50cyB0aGF0IGNvdWxkIGhhdmUgYmVlbiBwYXNzZWRcblx0ICAgICAgICAvLyB0byB0aGUgcmVuZGVyIGZ1bmN0aW9uLCBhbmQgZm9yd2FyZCB0aGVtIHRvIF9yZW5kZXJcblx0ICAgICAgICB2YXIgZXh0cmFBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXHQgICAgICAgIHRoaXMuY2FjaGVTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMsIGV4dHJhQXJncyk7XG5cdCAgICAgICAgdGhpcy5fcmVuZGVyLmFwcGx5KHRoaXMsIFtxdWVyeSwgc3VnZ2VzdGlvbnNdLmNvbmNhdChleHRyYUFyZ3MpKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG5cdCAgICB0aGlzLmNhbmNlbGVkID0gZmFsc2U7XG5cblx0ICAgIGlmICh0aGlzLnNob3VsZEZldGNoRnJvbUNhY2hlKHF1ZXJ5KSkge1xuXHQgICAgICBoYW5kbGVTdWdnZXN0aW9ucy5hcHBseSh0aGlzLCBbdGhpcy5jYWNoZWRTdWdnZXN0aW9uc10uY29uY2F0KHRoaXMuY2FjaGVkUmVuZGVyRXh0cmFBcmdzKSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cdCAgICAgIHZhciBleGVjU291cmNlID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgLy8gV2hlbiB0aGUgY2FsbCBpcyBkZWJvdW5jZWQgdGhlIGNvbmRpdGlvbiBhdm9pZCB0byBkbyBhIHVzZWxlc3Ncblx0ICAgICAgICAvLyByZXF1ZXN0IHdpdGggdGhlIGxhc3QgY2hhcmFjdGVyIHdoZW4gdGhlIGlucHV0IGhhcyBiZWVuIGNsZWFyZWRcblx0ICAgICAgICBpZiAoIXRoYXQuY2FuY2VsZWQpIHtcblx0ICAgICAgICAgIHRoYXQuc291cmNlKHF1ZXJ5LCBoYW5kbGVTdWdnZXN0aW9ucy5iaW5kKHRoYXQpKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH07XG5cblx0ICAgICAgaWYgKHRoaXMuZGVib3VuY2UpIHtcblx0ICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgIHRoYXQuZGVib3VuY2VUaW1lb3V0ID0gbnVsbDtcblx0ICAgICAgICAgIGV4ZWNTb3VyY2UoKTtcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZW91dCk7XG5cdCAgICAgICAgdGhpcy5kZWJvdW5jZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB0aGlzLmRlYm91bmNlKTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBleGVjU291cmNlKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgY2FjaGVTdWdnZXN0aW9uczogZnVuY3Rpb24gY2FjaGVTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMsIGV4dHJhQXJncykge1xuXHQgICAgdGhpcy5jYWNoZWRRdWVyeSA9IHF1ZXJ5O1xuXHQgICAgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuXHQgICAgdGhpcy5jYWNoZWRSZW5kZXJFeHRyYUFyZ3MgPSBleHRyYUFyZ3M7XG5cdCAgfSxcblxuXHQgIHNob3VsZEZldGNoRnJvbUNhY2hlOiBmdW5jdGlvbiBzaG91bGRGZXRjaEZyb21DYWNoZShxdWVyeSkge1xuXHQgICAgcmV0dXJuIHRoaXMuY2FjaGUgJiZcblx0ICAgICAgdGhpcy5jYWNoZWRRdWVyeSA9PT0gcXVlcnkgJiZcblx0ICAgICAgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucyAmJlxuXHQgICAgICB0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zLmxlbmd0aDtcblx0ICB9LFxuXG5cdCAgY2xlYXJDYWNoZWRTdWdnZXN0aW9uczogZnVuY3Rpb24gY2xlYXJDYWNoZWRTdWdnZXN0aW9ucygpIHtcblx0ICAgIGRlbGV0ZSB0aGlzLmNhY2hlZFF1ZXJ5O1xuXHQgICAgZGVsZXRlIHRoaXMuY2FjaGVkU3VnZ2VzdGlvbnM7XG5cdCAgICBkZWxldGUgdGhpcy5jYWNoZWRSZW5kZXJFeHRyYUFyZ3M7XG5cdCAgfSxcblxuXHQgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuXHQgICAgdGhpcy5jYW5jZWxlZCA9IHRydWU7XG5cdCAgfSxcblxuXHQgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcblx0ICAgIHRoaXMuY2FuY2VsKCk7XG5cdCAgICB0aGlzLiRlbC5lbXB0eSgpO1xuXHQgICAgdGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcsICcnKTtcblx0ICB9LFxuXG5cdCAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9pc0VtcHR5O1xuXHQgIH0sXG5cblx0ICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuXHQgICAgdGhpcy5jbGVhckNhY2hlZFN1Z2dlc3Rpb25zKCk7XG5cdCAgICB0aGlzLiRlbCA9IG51bGw7XG5cdCAgfVxuXHR9KTtcblxuXHQvLyBoZWxwZXIgZnVuY3Rpb25zXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXHRmdW5jdGlvbiBnZXREaXNwbGF5Rm4oZGlzcGxheSkge1xuXHQgIGRpc3BsYXkgPSBkaXNwbGF5IHx8ICd2YWx1ZSc7XG5cblx0ICByZXR1cm4gXy5pc0Z1bmN0aW9uKGRpc3BsYXkpID8gZGlzcGxheSA6IGRpc3BsYXlGbjtcblxuXHQgIGZ1bmN0aW9uIGRpc3BsYXlGbihvYmopIHtcblx0ICAgIHJldHVybiBvYmpbZGlzcGxheV07XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKHRlbXBsYXRlcywgZGlzcGxheUZuKSB7XG5cdCAgcmV0dXJuIHtcblx0ICAgIGVtcHR5OiB0ZW1wbGF0ZXMuZW1wdHkgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5lbXB0eSksXG5cdCAgICBoZWFkZXI6IHRlbXBsYXRlcy5oZWFkZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5oZWFkZXIpLFxuXHQgICAgZm9vdGVyOiB0ZW1wbGF0ZXMuZm9vdGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuZm9vdGVyKSxcblx0ICAgIHN1Z2dlc3Rpb246IHRlbXBsYXRlcy5zdWdnZXN0aW9uIHx8IHN1Z2dlc3Rpb25UZW1wbGF0ZVxuXHQgIH07XG5cblx0ICBmdW5jdGlvbiBzdWdnZXN0aW9uVGVtcGxhdGUoY29udGV4dCkge1xuXHQgICAgcmV0dXJuICc8cD4nICsgZGlzcGxheUZuKGNvbnRleHQpICsgJzwvcD4nO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGlzVmFsaWROYW1lKHN0cikge1xuXHQgIC8vIGRhc2hlcywgdW5kZXJzY29yZXMsIGxldHRlcnMsIGFuZCBudW1iZXJzXG5cdCAgcmV0dXJuICgvXltfYS16QS1aMC05LV0rJC8pLnRlc3Qoc3RyKTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gRGF0YXNldDtcblxuXG4vKioqLyB9LFxuLyogMTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICB3cmFwcGVyOiAnPHNwYW4gY2xhc3M9XCIlUk9PVCVcIj48L3NwYW4+Jyxcblx0ICBkcm9wZG93bjogJzxzcGFuIGNsYXNzPVwiJVBSRUZJWCUlRFJPUERPV05fTUVOVSVcIj48L3NwYW4+Jyxcblx0ICBkYXRhc2V0OiAnPGRpdiBjbGFzcz1cIiVQUkVGSVglJURBVEFTRVQlLSVDTEFTUyVcIj48L2Rpdj4nLFxuXHQgIHN1Z2dlc3Rpb25zOiAnPHNwYW4gY2xhc3M9XCIlUFJFRklYJSVTVUdHRVNUSU9OUyVcIj48L3NwYW4+Jyxcblx0ICBzdWdnZXN0aW9uOiAnPGRpdiBjbGFzcz1cIiVQUkVGSVglJVNVR0dFU1RJT04lXCI+PC9kaXY+J1xuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgY3NzID0ge1xuXHQgIHdyYXBwZXI6IHtcblx0ICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHQgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcblx0ICB9LFxuXHQgIGhpbnQ6IHtcblx0ICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHQgICAgdG9wOiAnMCcsXG5cdCAgICBsZWZ0OiAnMCcsXG5cdCAgICBib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50Jyxcblx0ICAgIGJveFNoYWRvdzogJ25vbmUnLFxuXHQgICAgLy8gIzc0MTogZml4IGhpbnQgb3BhY2l0eSBpc3N1ZSBvbiBpT1Ncblx0ICAgIG9wYWNpdHk6ICcxJ1xuXHQgIH0sXG5cdCAgaW5wdXQ6IHtcblx0ICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHQgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG5cdCAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0ICB9LFxuXHQgIGlucHV0V2l0aE5vSGludDoge1xuXHQgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdCAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuXHQgIH0sXG5cdCAgZHJvcGRvd246IHtcblx0ICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHQgICAgdG9wOiAnMTAwJScsXG5cdCAgICBsZWZ0OiAnMCcsXG5cdCAgICB6SW5kZXg6ICcxMDAnLFxuXHQgICAgZGlzcGxheTogJ25vbmUnXG5cdCAgfSxcblx0ICBzdWdnZXN0aW9uczoge1xuXHQgICAgZGlzcGxheTogJ2Jsb2NrJ1xuXHQgIH0sXG5cdCAgc3VnZ2VzdGlvbjoge1xuXHQgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG5cdCAgICBjdXJzb3I6ICdwb2ludGVyJ1xuXHQgIH0sXG5cdCAgc3VnZ2VzdGlvbkNoaWxkOiB7XG5cdCAgICB3aGl0ZVNwYWNlOiAnbm9ybWFsJ1xuXHQgIH0sXG5cdCAgbHRyOiB7XG5cdCAgICBsZWZ0OiAnMCcsXG5cdCAgICByaWdodDogJ2F1dG8nXG5cdCAgfSxcblx0ICBydGw6IHtcblx0ICAgIGxlZnQ6ICdhdXRvJyxcblx0ICAgIHJpZ2h0OiAnMCdcblx0ICB9LFxuXHQgIGRlZmF1bHRDbGFzc2VzOiB7XG5cdCAgICByb290OiAnYWxnb2xpYS1hdXRvY29tcGxldGUnLFxuXHQgICAgcHJlZml4OiAnYWEnLFxuXHQgICAgbm9QcmVmaXg6IGZhbHNlLFxuXHQgICAgZHJvcGRvd25NZW51OiAnZHJvcGRvd24tbWVudScsXG5cdCAgICBpbnB1dDogJ2lucHV0Jyxcblx0ICAgIGhpbnQ6ICdoaW50Jyxcblx0ICAgIHN1Z2dlc3Rpb25zOiAnc3VnZ2VzdGlvbnMnLFxuXHQgICAgc3VnZ2VzdGlvbjogJ3N1Z2dlc3Rpb24nLFxuXHQgICAgY3Vyc29yOiAnY3Vyc29yJyxcblx0ICAgIGRhdGFzZXQ6ICdkYXRhc2V0Jyxcblx0ICAgIGVtcHR5OiAnZW1wdHknXG5cdCAgfSxcblx0ICAvLyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0IG9uZXMgaWYgYXBwZW5kVG8gaXMgdXNlZFxuXHQgIGFwcGVuZFRvOiB7XG5cdCAgICB3cmFwcGVyOiB7XG5cdCAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHQgICAgICB6SW5kZXg6ICcxMDAnLFxuXHQgICAgICBkaXNwbGF5OiAnbm9uZSdcblx0ICAgIH0sXG5cdCAgICBpbnB1dDoge30sXG5cdCAgICBpbnB1dFdpdGhOb0hpbnQ6IHt9LFxuXHQgICAgZHJvcGRvd246IHtcblx0ICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuXHQgICAgfVxuXHQgIH1cblx0fTtcblxuXHQvLyBpZSBzcGVjaWZpYyBzdHlsaW5nXG5cdGlmIChfLmlzTXNpZSgpKSB7XG5cdCAgLy8gaWU2LTggKGFuZCA5PykgZG9lc24ndCBmaXJlIGhvdmVyIGFuZCBjbGljayBldmVudHMgZm9yIGVsZW1lbnRzIHdpdGhcblx0ICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kcywgZm9yIGEgd29ya2Fyb3VuZCwgdXNlIDF4MSB0cmFuc3BhcmVudCBnaWZcblx0ICBfLm1peGluKGNzcy5pbnB1dCwge1xuXHQgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyknXG5cdCAgfSk7XG5cdH1cblxuXHQvLyBpZTcgYW5kIHVuZGVyIHNwZWNpZmljIHN0eWxpbmdcblx0aWYgKF8uaXNNc2llKCkgJiYgXy5pc01zaWUoKSA8PSA3KSB7XG5cdCAgLy8gaWYgc29tZW9uZSBjYW4gdGVsbCBtZSB3aHkgdGhpcyBpcyBuZWNlc3NhcnkgdG8gYWxpZ25cblx0ICAvLyB0aGUgaGludCB3aXRoIHRoZSBxdWVyeSBpbiBpZTcsIGknbGwgc2VuZCB5b3UgJDUgLSBASmFrZUhhcmRpbmdcblx0ICBfLm1peGluKGNzcy5pbnB1dCwge21hcmdpblRvcDogJy0xcHgnfSk7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGNzcztcblxuXG4vKioqLyB9LFxuLyogMjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICBoaXRzOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKSxcblx0ICBwb3B1bGFySW46IF9fd2VicGFja19yZXF1aXJlX18oMjQpXG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXHR2YXIgdmVyc2lvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xuXHR2YXIgcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VhcmNoKGluZGV4LCBwYXJhbXMpIHtcblx0ICB2YXIgYWxnb2xpYVZlcnNpb24gPSBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uKGluZGV4LmFzLl91YSk7XG5cdCAgaWYgKGFsZ29saWFWZXJzaW9uICYmIGFsZ29saWFWZXJzaW9uWzBdID49IDMgJiYgYWxnb2xpYVZlcnNpb25bMV0gPiAyMCkge1xuXHQgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXHQgICAgcGFyYW1zLmFkZGl0aW9uYWxVQSA9ICdhdXRvY29tcGxldGUuanMgJyArIHZlcnNpb247XG5cdCAgfVxuXHQgIHJldHVybiBzb3VyY2VGbjtcblxuXHQgIGZ1bmN0aW9uIHNvdXJjZUZuKHF1ZXJ5LCBjYikge1xuXHQgICAgaW5kZXguc2VhcmNoKHF1ZXJ5LCBwYXJhbXMsIGZ1bmN0aW9uKGVycm9yLCBjb250ZW50KSB7XG5cdCAgICAgIGlmIChlcnJvcikge1xuXHQgICAgICAgIF8uZXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cdCAgICAgIGNiKGNvbnRlbnQuaGl0cywgY29udGVudCk7XG5cdCAgICB9KTtcblx0ICB9XG5cdH07XG5cblxuLyoqKi8gfSxcbi8qIDIyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFwiMC4zNi4wXCI7XG5cblxuLyoqKi8gfSxcbi8qIDIzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihhZ2VudCkge1xuXHQgIHZhciBwYXJzZWQgPSBhZ2VudC5tYXRjaCgvQWxnb2xpYSBmb3IgdmFuaWxsYSBKYXZhU2NyaXB0IChcXGQrXFwuKShcXGQrXFwuKShcXGQrKS8pO1xuXHQgIGlmIChwYXJzZWQpIHJldHVybiBbcGFyc2VkWzFdLCBwYXJzZWRbMl0sIHBhcnNlZFszXV07XG5cdCAgcmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXG4vKioqLyB9LFxuLyogMjQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cdHZhciB2ZXJzaW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XG5cdHZhciBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwb3B1bGFySW4oaW5kZXgsIHBhcmFtcywgZGV0YWlscywgb3B0aW9ucykge1xuXHQgIHZhciBhbGdvbGlhVmVyc2lvbiA9IHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24oaW5kZXguYXMuX3VhKTtcblx0ICBpZiAoYWxnb2xpYVZlcnNpb24gJiYgYWxnb2xpYVZlcnNpb25bMF0gPj0gMyAmJiBhbGdvbGlhVmVyc2lvblsxXSA+IDIwKSB7XG5cdCAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cdCAgICBwYXJhbXMuYWRkaXRpb25hbFVBID0gJ2F1dG9jb21wbGV0ZS5qcyAnICsgdmVyc2lvbjtcblx0ICB9XG5cdCAgaWYgKCFkZXRhaWxzLnNvdXJjZSkge1xuXHQgICAgcmV0dXJuIF8uZXJyb3IoXCJNaXNzaW5nICdzb3VyY2UnIGtleVwiKTtcblx0ICB9XG5cdCAgdmFyIHNvdXJjZSA9IF8uaXNGdW5jdGlvbihkZXRhaWxzLnNvdXJjZSkgPyBkZXRhaWxzLnNvdXJjZSA6IGZ1bmN0aW9uKGhpdCkgeyByZXR1cm4gaGl0W2RldGFpbHMuc291cmNlXTsgfTtcblxuXHQgIGlmICghZGV0YWlscy5pbmRleCkge1xuXHQgICAgcmV0dXJuIF8uZXJyb3IoXCJNaXNzaW5nICdpbmRleCcga2V5XCIpO1xuXHQgIH1cblx0ICB2YXIgZGV0YWlsc0luZGV4ID0gZGV0YWlscy5pbmRleDtcblxuXHQgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdCAgcmV0dXJuIHNvdXJjZUZuO1xuXG5cdCAgZnVuY3Rpb24gc291cmNlRm4ocXVlcnksIGNiKSB7XG5cdCAgICBpbmRleC5zZWFyY2gocXVlcnksIHBhcmFtcywgZnVuY3Rpb24oZXJyb3IsIGNvbnRlbnQpIHtcblx0ICAgICAgaWYgKGVycm9yKSB7XG5cdCAgICAgICAgXy5lcnJvcihlcnJvci5tZXNzYWdlKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAoY29udGVudC5oaXRzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICB2YXIgZmlyc3QgPSBjb250ZW50LmhpdHNbMF07XG5cblx0ICAgICAgICB2YXIgZGV0YWlsc1BhcmFtcyA9IF8ubWl4aW4oe2hpdHNQZXJQYWdlOiAwfSwgZGV0YWlscyk7XG5cdCAgICAgICAgZGVsZXRlIGRldGFpbHNQYXJhbXMuc291cmNlOyAvLyBub3QgYSBxdWVyeSBwYXJhbWV0ZXJcblx0ICAgICAgICBkZWxldGUgZGV0YWlsc1BhcmFtcy5pbmRleDsgLy8gbm90IGEgcXVlcnkgcGFyYW1ldGVyXG5cblx0ICAgICAgICB2YXIgZGV0YWlsc0FsZ29saWFWZXJzaW9uID0gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihkZXRhaWxzSW5kZXguYXMuX3VhKTtcblx0ICAgICAgICBpZiAoZGV0YWlsc0FsZ29saWFWZXJzaW9uICYmIGRldGFpbHNBbGdvbGlhVmVyc2lvblswXSA+PSAzICYmIGRldGFpbHNBbGdvbGlhVmVyc2lvblsxXSA+IDIwKSB7XG5cdCAgICAgICAgICBwYXJhbXMuYWRkaXRpb25hbFVBID0gJ2F1dG9jb21wbGV0ZS5qcyAnICsgdmVyc2lvbjtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBkZXRhaWxzSW5kZXguc2VhcmNoKHNvdXJjZShmaXJzdCksIGRldGFpbHNQYXJhbXMsIGZ1bmN0aW9uKGVycm9yMiwgY29udGVudDIpIHtcblx0ICAgICAgICAgIGlmIChlcnJvcjIpIHtcblx0ICAgICAgICAgICAgXy5lcnJvcihlcnJvcjIubWVzc2FnZSk7XG5cdCAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICAgIH1cblxuXHQgICAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG5cblx0ICAgICAgICAgIC8vIGFkZCB0aGUgJ2FsbCBkZXBhcnRtZW50JyBlbnRyeSBiZWZvcmUgb3RoZXJzXG5cdCAgICAgICAgICBpZiAob3B0aW9ucy5pbmNsdWRlQWxsKSB7XG5cdCAgICAgICAgICAgIHZhciBsYWJlbCA9IG9wdGlvbnMuYWxsVGl0bGUgfHwgJ0FsbCBkZXBhcnRtZW50cyc7XG5cdCAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXy5taXhpbih7XG5cdCAgICAgICAgICAgICAgZmFjZXQ6IHt2YWx1ZTogbGFiZWwsIGNvdW50OiBjb250ZW50Mi5uYkhpdHN9XG5cdCAgICAgICAgICAgIH0sIF8uY2xvbmVEZWVwKGZpcnN0KSkpO1xuXHQgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAvLyBlbnJpY2ggdGhlIGZpcnN0IGhpdCBpdGVyYXRpbmcgb3ZlciB0aGUgZmFjZXRzXG5cdCAgICAgICAgICBfLmVhY2goY29udGVudDIuZmFjZXRzLCBmdW5jdGlvbih2YWx1ZXMsIGZhY2V0KSB7XG5cdCAgICAgICAgICAgIF8uZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uKGNvdW50LCB2YWx1ZSkge1xuXHQgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXy5taXhpbih7XG5cdCAgICAgICAgICAgICAgICBmYWNldDoge2ZhY2V0OiBmYWNldCwgdmFsdWU6IHZhbHVlLCBjb3VudDogY291bnR9XG5cdCAgICAgICAgICAgICAgfSwgXy5jbG9uZURlZXAoZmlyc3QpKSk7XG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgIC8vIGFwcGVuZCBhbGwgb3RoZXIgaGl0c1xuXHQgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBjb250ZW50LmhpdHMubGVuZ3RoOyArK2kpIHtcblx0ICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaChjb250ZW50LmhpdHNbaV0pO1xuXHQgICAgICAgICAgfVxuXG5cdCAgICAgICAgICBjYihzdWdnZXN0aW9ucywgY29udGVudCk7XG5cdCAgICAgICAgfSk7XG5cblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblxuXHQgICAgICBjYihbXSk7XG5cdCAgICB9KTtcblx0ICB9XG5cdH07XG5cblxuLyoqKi8gfVxuLyoqKioqKi8gXSk7Il0sInNvdXJjZVJvb3QiOiIifQ==