import React, { Component } from 'react';
import PropTypes from 'prop-types';

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== 'undefined';

function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;
    // end fast-deep-equal

    // start react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element && b instanceof Element)
      return a === b;

    // custom handling for React
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    }
    // end react-fast-compare

    // fast-deep-equal index.js 2.0.1
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

var reactFastCompare = function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DefaultOnSSR = function DefaultOnSSR() {
  return React.createElement('span', null);
};

var NoSSR = function (_Component) {
  inherits(NoSSR, _Component);

  function NoSSR() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, NoSSR);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = NoSSR.__proto__ || Object.getPrototypeOf(NoSSR)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      canRender: false
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(NoSSR, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ canRender: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$onSSR = _props.onSSR,
          onSSR = _props$onSSR === undefined ? React.createElement(DefaultOnSSR, null) : _props$onSSR;


      return React.createElement(
        React.Fragment,
        null,
        this.state.canRender ? children : onSSR
      );
    }
  }]);
  return NoSSR;
}(Component);

var getIsRetina = function getIsRetina() {
  return window.devicePixelRatio > 1;
};

var getFaviconURL = function getFaviconURL() {
  var links = document.getElementsByTagName('link');
  var tag = null;

  for (var i = 0, l = links.length; i < l; i++) {
    if (links[i].getAttribute('rel') === 'icon' || links[i].getAttribute('rel') === 'shortcut icon') {
      tag = links[i];
    }
  }

  return tag ? tag.getAttribute('href') : '/favicon.ico';
};

var removeFaviconTag = function removeFaviconTag() {
  var links = Array.prototype.slice.call(document.getElementsByTagName('link'), 0);
  var head = document.getElementsByTagName('head')[0];

  for (var i = 0, l = links.length; i < l; i++) {
    if (links[i].getAttribute('rel') === 'icon' || links[i].getAttribute('rel') === 'shortcut icon') {
      head.removeChild(links[i]);
    }
  }
};

var setFaviconTag = function setFaviconTag(url) {
  removeFaviconTag();

  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = url;

  document.getElementsByTagName('head')[0].appendChild(link);
};

var getCanvas = function getCanvas() {
  var canvas = document.createElement("canvas");
  if (getIsRetina()) {
    canvas.width = 32;
    canvas.height = 32;
  } else {
    canvas.width = 16;
    canvas.height = 16;
  }

  return canvas;
};

var Pie = function (_React$Component) {
  inherits(Pie, _React$Component);

  function Pie() {
    classCallCheck(this, Pie);
    return possibleConstructorReturn(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).apply(this, arguments));
  }

  createClass(Pie, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawFavicon();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isPropsChanged = !reactFastCompare(this.props, prevProps);
      if (isPropsChanged) {
        this.drawFavicon();
      }
    }
  }, {
    key: 'drawFavicon',
    value: function drawFavicon() {
      var _props = this.props,
          percentage = _props.percentage,
          color = _props.color,
          background = _props.background,
          shadow = _props.shadow;

      var canvas = getCanvas();
      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw shadow
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), 0, Math.PI * 2, false);
        ctx.fillStyle = shadow;
        ctx.fill();

        // Draw background
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false);
        ctx.fillStyle = background;
        ctx.fill();

        // Draw pie
        if (percentage > 0) {
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, canvas.height / 2);
          ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, -0.5 * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      setFaviconTag(canvas.toDataURL());
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Pie;
}(React.Component);

Pie.propTypes = {
  percentage: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  shadow: PropTypes.string
};

var Donut = function (_React$Component) {
  inherits(Donut, _React$Component);

  function Donut() {
    classCallCheck(this, Donut);
    return possibleConstructorReturn(this, (Donut.__proto__ || Object.getPrototypeOf(Donut)).apply(this, arguments));
  }

  createClass(Donut, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawFavicon();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isPropsChanged = !reactFastCompare(this.props, prevProps);
      if (isPropsChanged) {
        this.drawFavicon();
      }
    }
  }, {
    key: 'drawFavicon',
    value: function drawFavicon() {
      var _props = this.props,
          donutWidth = _props.donutWidth,
          percentage = _props.percentage,
          color = _props.color,
          background = _props.background,
          shadow = _props.shadow;

      var canvas = getCanvas();
      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw shadow
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), 0, Math.PI * 2, false);
        ctx.fillStyle = shadow;
        ctx.fill();

        // Draw background
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false);
        ctx.fillStyle = background;
        ctx.fill();

        // Draw donut
        if (percentage > 0) {
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, canvas.height / 2);
          ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, -0.5 * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.fillStyle = color;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, canvas.height / 2);
          ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - donutWidth, -0.5 * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.fillStyle = background;
          ctx.fill();
        }
      }

      setFaviconTag(canvas.toDataURL());
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Donut;
}(React.Component);

Donut.propTypes = {
  donutWidth: PropTypes.number,
  percentage: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  shadow: PropTypes.string
};

var Exception = function (_React$Component) {
  inherits(Exception, _React$Component);

  function Exception() {
    classCallCheck(this, Exception);
    return possibleConstructorReturn(this, (Exception.__proto__ || Object.getPrototypeOf(Exception)).apply(this, arguments));
  }

  createClass(Exception, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawFavicon();
    }
  }, {
    key: 'drawFavicon',
    value: function drawFavicon() {
      var color = this.props.color;

      var canvas = getCanvas();
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw cross
      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, canvas.height / 3);
      ctx.lineTo(2 * canvas.width / 3, 2 * canvas.height / 3);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, 2 * canvas.height / 3);
      ctx.lineTo(2 * canvas.width / 3, canvas.height / 3);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      setFaviconTag(canvas.toDataURL());
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Exception;
}(React.Component);

Exception.propTypes = {
  color: PropTypes.string
};

Exception.defaultProps = {
  color: '#ff564e'
};

var Success = function (_React$Component) {
  inherits(Success, _React$Component);

  function Success() {
    classCallCheck(this, Success);
    return possibleConstructorReturn(this, (Success.__proto__ || Object.getPrototypeOf(Success)).apply(this, arguments));
  }

  createClass(Success, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawFavicon();
    }
  }, {
    key: 'drawFavicon',
    value: function drawFavicon() {
      var color = this.props.color;

      var canvas = getCanvas();
      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw tick
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.22, canvas.height * 0.5);
        ctx.lineTo(canvas.width * 0.45, canvas.height * 0.7);
        ctx.lineTo(canvas.width * 0.73, canvas.height * 0.3);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }

      setFaviconTag(canvas.toDataURL());
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Success;
}(React.Component);

Success.propTypes = {
  color: PropTypes.string
};

Success.defaultProps = {
  color: '#25c639'
};

var LoadCon = function (_React$Component) {
  inherits(LoadCon, _React$Component);

  function LoadCon() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, LoadCon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = LoadCon.__proto__ || Object.getPrototypeOf(LoadCon)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      originalFaviconURL: null
    }, _this._renderFavicon = function () {
      switch (_this.props.type) {
        default:
        case 'pie':
          return React.createElement(Pie, _this.props);
        case 'donut':
          return React.createElement(Donut, _this.props);
      }
    }, _this._resetFavicon = function () {
      var originalFaviconURL = _this.state.originalFaviconURL;

      setFaviconTag(originalFaviconURL);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(LoadCon, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        originalFaviconURL: getFaviconURL()
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isPropsChanged = !reactFastCompare(this.props, prevProps);
      if (isPropsChanged) {
        if (this.props.status === 'normal') {
          this._resetFavicon();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.props.status;

      return React.createElement(
        NoSSR,
        null,
        status === 'active' && this._renderFavicon(),
        status === 'exception' && React.createElement(Exception, null),
        status === 'success' && React.createElement(Success, null)
      );
    }
  }]);
  return LoadCon;
}(React.Component);

LoadCon.propTypes = {
  percentage: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['pie', 'donut']),
  status: PropTypes.oneOf(['normal', 'active', 'exception', 'success']),
  color: PropTypes.string,
  background: PropTypes.string,
  shadow: PropTypes.string,
  donutWidth: PropTypes.number
};

LoadCon.defaultProps = {
  percentage: 0,
  type: 'pie',
  status: 'normal',
  color: '#25c639',
  background: '#eee',
  shadow: '#fff',
  donutWidth: 8
};

export default LoadCon;
//# sourceMappingURL=index.es.js.map
