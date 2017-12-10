webpackJsonp([15178676390636814000],{

/***/ "./.cache/api-runner-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var plugins = [{
	  plugin: __webpack_require__("./node_modules/gatsby-remark-autolink-headers/gatsby-browser.js"),
	  options: { "plugins": [] }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-google-analytics/gatsby-browser.js"),
	  options: { "plugins": [], "trackingId": "UA-82450300-1 " }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-nprogress/gatsby-browser.js"),
	  options: { "plugins": [], "color": "#c62828" }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-catch-links/gatsby-browser.js"),
	  options: { "plugins": [] }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-twitter/gatsby-browser.js"),
	  options: { "plugins": [] }
	}, {
	  plugin: __webpack_require__("./node_modules/gatsby-plugin-offline/gatsby-browser.js"),
	  options: { "plugins": [] }
	}];
	// During bootstrap, we write requires at top of this file which looks
	// basically like:
	// var plugins = [
	//   require('/path/to/plugin1/gatsby-browser.js'),
	//   require('/path/to/plugin2/gatsby-browser.js'),
	// ]
	
	module.exports = function (api, args, defaultReturn) {
	  // Run each plugin in series.
	  var results = plugins.map(function (plugin) {
	    if (plugin.plugin[api]) {
	      var result = plugin.plugin[api](args, plugin.options);
	      return result;
	    }
	  });
	
	  // Filter out undefined results.
	  results = results.filter(function (result) {
	    return typeof result !== 'undefined';
	  });
	
	  if (results.length > 0) {
	    return results;
	  } else if (defaultReturn) {
	    return [defaultReturn];
	  } else {
	    return [];
	  }
	};

/***/ }),

/***/ "./.cache/async-requires.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _exports$json;
	
	// prefer default export if available
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	
	exports.components = {
	  "component---node-modules-gatsby-plugin-offline-app-shell-js": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---node-modules-gatsby-plugin-offline-app-shell-js!./node_modules/gatsby-plugin-offline/app-shell.js"),
	  "component---src-templates-lesson-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-lesson-jsx!./src/templates/lesson.jsx"),
	  "component---src-templates-post-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-post-jsx!./src/templates/post.jsx"),
	  "component---src-templates-tag-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-tag-jsx!./src/templates/tag.jsx"),
	  "component---src-templates-category-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-category-jsx!./src/templates/category.jsx"),
	  "component---src-pages-about-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-about-jsx!./src/pages/about.jsx"),
	  "component---src-pages-index-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-index-jsx!./src/pages/index.jsx")
	};
	
	exports.json = (_exports$json = {
	  "layout-index.json": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"),
	  "offline-plugin-app-shell-fallback.json": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---offline-plugin-app-shell-fallback!./.cache/json/offline-plugin-app-shell-fallback.json")
	}, _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["lesson-one.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-one!./.cache/json/lesson-one.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["lesson-three.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-three!./.cache/json/lesson-three.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["lesson-two.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-two!./.cache/json/lesson-two.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["post-one.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---post-one!./.cache/json/post-one.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["tags-programming.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-programming!./.cache/json/tags-programming.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["tags-stuff.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-stuff!./.cache/json/tags-stuff.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["tags-other.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-other!./.cache/json/tags-other.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["categories-tech.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---categories-tech!./.cache/json/categories-tech.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["about.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---about!./.cache/json/about.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["index.json"] = __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json"), _exports$json);
	
	exports.layouts = {
	  "component---src-layouts-index-jsx": __webpack_require__("./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-layouts-index-jsx!./.cache/layouts/index.js")
	};

/***/ }),

/***/ "./.cache/component-renderer.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _loader = __webpack_require__("./.cache/loader.js");
	
	var _loader2 = _interopRequireDefault(_loader);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DefaultLayout = function DefaultLayout(_ref) {
	  var children = _ref.children;
	  return _react2.default.createElement(
	    "div",
	    null,
	    children()
	  );
	};
	
	// Pass pathname in as prop.
	// component will try fetching resources. If they exist,
	// will just render, else will render null.
	
	var ComponentRenderer = function (_React$Component) {
	  _inherits(ComponentRenderer, _React$Component);
	
	  function ComponentRenderer(props) {
	    _classCallCheck(this, ComponentRenderer);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));
	
	    _this.state = {
	      location: props.location,
	      pageResources: _loader2.default.getResourcesForPathname(props.location.pathname)
	    };
	    return _this;
	  }
	
	  ComponentRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    if (this.state.location.pathname !== nextProps.location.pathname) {
	      var pageResources = _loader2.default.getResourcesForPathname(nextProps.location.pathname);
	      if (!pageResources) {
	        // Page resources won't be set in cases where the browser back button
	        // or forward button is pushed as we can't wait as normal for resources
	        // to load before changing the page.
	        _loader2.default.getResourcesForPathname(nextProps.location.pathname, function (pageResources) {
	          _this2.setState({
	            location: nextProps.location,
	            pageResources: pageResources
	          });
	        });
	      } else {
	        this.setState({
	          location: nextProps.location,
	          pageResources: pageResources
	        });
	      }
	    }
	  };
	
	  ComponentRenderer.prototype.componentDidMount = function componentDidMount() {
	    var _this3 = this;
	
	    // Listen to events so when our page gets updated, we can transition.
	    // This is only useful on delayed transitions as the page will get rendered
	    // without the necessary page resources and then re-render once those come in.
	    _emitter2.default.on("onPostLoadPageResources", function (e) {
	      if (e.page.path === _loader2.default.getPage(_this3.state.location.pathname).path) {
	        _this3.setState({ pageResources: e.pageResources });
	      }
	    });
	  };
	
	  ComponentRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    // Check if the component or json have changed.
	    if (!this.state.pageResources || nextState.pageResources) {
	      return true;
	    }
	    if (this.state.pageResources.component !== nextState.pageResources.component) {
	      return true;
	    }
	    if (this.state.pageResources.json !== nextState.pageResources.json) {
	      return true;
	    }
	    // Check if location has changed on a page using internal routing
	    // via matchPath configuration.
	    if (this.state.location.key !== nextState.location.key && nextState.pageResources.page && nextState.pageResources.page.matchPath) {
	      return true;
	    }
	    return false;
	  };
	
	  ComponentRenderer.prototype.render = function render() {
	    if (this.props.page) {
	      if (this.state.pageResources) {
	        return (0, _react.createElement)(this.state.pageResources.component, _extends({
	          key: this.props.location.pathname
	        }, this.props, this.state.pageResources.json));
	      } else {
	        return null;
	      }
	    } else if (this.props.layout) {
	      return (0, _react.createElement)(this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : DefaultLayout, _extends({
	        key: this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : "DefaultLayout"
	      }, this.props));
	    } else {
	      return null;
	    }
	  };
	
	  return ComponentRenderer;
	}(_react2.default.Component);
	
	ComponentRenderer.propTypes = {
	  page: _propTypes2.default.bool,
	  layout: _propTypes2.default.bool,
	  location: _propTypes2.default.object
	};
	
	exports.default = ComponentRenderer;
	module.exports = exports["default"];

/***/ }),

/***/ "./.cache/emitter.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _mitt = __webpack_require__("./node_modules/mitt/dist/mitt.js");
	
	var _mitt2 = _interopRequireDefault(_mitt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emitter = (0, _mitt2.default)();
	module.exports = emitter;

/***/ }),

/***/ "./.cache/find-page.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/index.js");
	
	var pageCache = {}; // TODO add tests especially for handling prefixed links.
	
	
	module.exports = function (pages) {
	  var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  return function (pathname) {
	    // Remove the pathPrefix from the pathname.
	    var trimmedPathname = pathname.slice(pathPrefix.length);
	
	    // Remove any hashfragment
	    if (trimmedPathname.split("#").length > 1) {
	      trimmedPathname = trimmedPathname.split("#").slice(0, -1).join("");
	    }
	
	    if (pageCache[trimmedPathname]) {
	      return pageCache[trimmedPathname];
	    }
	
	    var foundPage = void 0;
	    // Array.prototype.find is not supported in IE so we use this somewhat odd
	    // work around.
	    pages.some(function (page) {
	      if (page.matchPath) {
	        // Try both the path and matchPath
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, { path: page.path }) || (0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.matchPath
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      } else {
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.path,
	          exact: true
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      }
	
	      return false;
	    });
	
	    return foundPage;
	  };
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---about!./.cache/json/about.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17953591736895156000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/about.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---categories-tech!./.cache/json/categories-tech.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5652007798618266000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/categories-tech.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9347362237655822000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/index.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(3954140758598355500, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/layout-index.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-one!./.cache/json/lesson-one.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(4581430811852236000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/lesson-one.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-three!./.cache/json/lesson-three.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(11612916189112730000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/lesson-three.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---lesson-two!./.cache/json/lesson-two.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8107918961698731000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/lesson-two.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---offline-plugin-app-shell-fallback!./.cache/json/offline-plugin-app-shell-fallback.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13784418321228782000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/offline-plugin-app-shell-fallback.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---post-one!./.cache/json/post-one.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(10341856339698252000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/post-one.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-other!./.cache/json/tags-other.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(974125723347106600, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/tags-other.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-programming!./.cache/json/tags-programming.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(1373433643669422000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/tags-programming.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=path---tags-stuff!./.cache/json/tags-stuff.json":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(17877097498839097000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/json-loader/index.js!./.cache/json/tags-stuff.json") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-layouts-index-jsx!./.cache/layouts/index.js":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(5217438866945042000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./.cache/layouts/index.js") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./.cache/loader.js":
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _findPage = __webpack_require__("./.cache/find-page.js");
	
	var _findPage2 = _interopRequireDefault(_findPage);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findPage = void 0;
	
	var syncRequires = {};
	var asyncRequires = {};
	var pathScriptsCache = {};
	var resourceStrCache = {};
	var resourceCache = {};
	var pages = [];
	// Note we're not actively using the path data atm. There
	// could be future optimizations however around trying to ensure
	// we load all resources for likely-to-be-visited paths.
	var pathArray = [];
	var pathCount = {};
	var resourcesArray = [];
	var resourcesCount = {};
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	var prefetcher = void 0;
	var inInitialRender = true;
	
	// Prefetcher logic
	if (true) {
	  prefetcher = __webpack_require__("./.cache/prefetcher.js")({
	    getNextQueuedResources: function getNextQueuedResources() {
	      return resourcesArray.slice(-1)[0];
	    },
	    createResourceDownload: function createResourceDownload(resourceName) {
	      fetchResource(resourceName, function () {
	        resourcesArray = resourcesArray.filter(function (r) {
	          return r !== resourceName;
	        });
	        prefetcher.onResourcedFinished(resourceName);
	      });
	    }
	  });
	  _emitter2.default.on("onPreLoadPageResources", function (e) {
	    prefetcher.onPreLoadPageResources(e);
	  });
	  _emitter2.default.on("onPostLoadPageResources", function (e) {
	    prefetcher.onPostLoadPageResources(e);
	  });
	}
	
	var sortResourcesByCount = function sortResourcesByCount(a, b) {
	  if (resourcesCount[a] > resourcesCount[b]) {
	    return 1;
	  } else if (resourcesCount[a] < resourcesCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var sortPagesByCount = function sortPagesByCount(a, b) {
	  if (pathCount[a] > pathCount[b]) {
	    return 1;
	  } else if (pathCount[a] < pathCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var fetchResource = function fetchResource(resourceName) {
	  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	  if (resourceStrCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceStrCache[resourceName]);
	    });
	  } else {
	    // Find resource
	    var resourceFunction = resourceName.slice(0, 9) === "component" ? asyncRequires.components[resourceName] || asyncRequires.layouts[resourceName] : asyncRequires.json[resourceName];
	
	    // Download the resource
	    resourceFunction(function (err, executeChunk) {
	      resourceStrCache[resourceName] = executeChunk;
	      cb(err, executeChunk);
	    });
	  }
	};
	
	var getResourceModule = function getResourceModule(resourceName, cb) {
	  if (resourceCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceCache[resourceName]);
	    });
	  } else {
	    fetchResource(resourceName, function (err, executeChunk) {
	      if (err) {
	        cb(err);
	      } else {
	        var _module = preferDefault(executeChunk());
	        resourceCache[resourceName] = _module;
	        cb(err, _module);
	      }
	    });
	  }
	};
	
	var mountOrder = 1;
	var queue = {
	  empty: function empty() {
	    pathArray = [];
	    pathCount = {};
	    resourcesCount = {};
	    resourcesArray = [];
	    pages = [];
	  },
	  addPagesArray: function addPagesArray(newPages) {
	    pages = newPages;
	    var pathPrefix = "";
	    if (true) {
	      pathPrefix = ("");
	    }
	    findPage = (0, _findPage2.default)(newPages, pathPrefix);
	  },
	  addDevRequires: function addDevRequires(devRequires) {
	    syncRequires = devRequires;
	  },
	  addProdRequires: function addProdRequires(prodRequires) {
	    asyncRequires = prodRequires;
	  },
	  dequeue: function dequeue(path) {
	    return pathArray.pop();
	  },
	  enqueue: function enqueue(path) {
	    // Check page exists.
	    if (!pages.some(function (p) {
	      return p.path === path;
	    })) {
	      return false;
	    }
	
	    var mountOrderBoost = 1 / mountOrder;
	    mountOrder += 1;
	    // console.log(
	    // `enqueue "${path}", mountOrder: "${mountOrder}, mountOrderBoost: ${mountOrderBoost}`
	    // )
	
	    // Add to path counts.
	    if (!pathCount[path]) {
	      pathCount[path] = 1;
	    } else {
	      pathCount[path] += 1;
	    }
	
	    // Add path to queue.
	    if (!queue.has(path)) {
	      pathArray.unshift(path);
	    }
	
	    // Sort pages by pathCount
	    pathArray.sort(sortPagesByCount);
	
	    // Add resources to queue.
	    var page = findPage(path);
	    if (page.jsonName) {
	      if (!resourcesCount[page.jsonName]) {
	        resourcesCount[page.jsonName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.jsonName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the JSON resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.jsonName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.jsonName);
	      }
	    }
	    if (page.componentChunkName) {
	      if (!resourcesCount[page.componentChunkName]) {
	        resourcesCount[page.componentChunkName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.componentChunkName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the component resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.componentChunkName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.componentChunkName);
	      }
	    }
	
	    // Sort resources by resourcesCount.
	    resourcesArray.sort(sortResourcesByCount);
	    if (true) {
	      prefetcher.onNewResourcesAdded();
	    }
	
	    return true;
	  },
	  getResources: function getResources() {
	    return {
	      resourcesArray: resourcesArray,
	      resourcesCount: resourcesCount
	    };
	  },
	  getPages: function getPages() {
	    return {
	      pathArray: pathArray,
	      pathCount: pathCount
	    };
	  },
	  getPage: function getPage(pathname) {
	    return findPage(pathname);
	  },
	  has: function has(path) {
	    return pathArray.some(function (p) {
	      return p === path;
	    });
	  },
	  getResourcesForPathname: function getResourcesForPathname(path) {
	    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	    if (inInitialRender && navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated") {
	      // If we're loading from a service worker (it's already activated on
	      // this initial render) and we can't find a page, there's a good chance
	      // we're on a new page that this (now old) service worker doesn't know
	      // about so we'll unregister it and reload.
	      if (!findPage(path)) {
	        navigator.serviceWorker.getRegistrations().then(function (registrations) {
	          for (var _iterator = registrations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	              if (_i >= _iterator.length) break;
	              _ref = _iterator[_i++];
	            } else {
	              _i = _iterator.next();
	              if (_i.done) break;
	              _ref = _i.value;
	            }
	
	            var registration = _ref;
	
	            registration.unregister();
	          }
	          window.location.reload();
	        });
	      }
	    }
	    inInitialRender = false;
	    // In development we know the code is loaded already
	    // so we just return with it immediately.
	    if (false) {
	      var page = findPage(path);
	      if (!page) return;
	      var pageResources = {
	        component: syncRequires.components[page.componentChunkName],
	        json: syncRequires.json[page.jsonName],
	        layout: syncRequires.layouts[page.layoutComponentChunkName],
	        page: page
	      };
	      cb(pageResources);
	      return pageResources;
	      // Production code path
	    } else {
	      var _page = findPage(path);
	
	      if (!_page) {
	        console.log("A page wasn't found for \"" + path + "\"");
	        return;
	      }
	
	      // Use the path from the page so the pathScriptsCache uses
	      // the normalized path.
	      path = _page.path;
	
	      // Check if it's in the cache already.
	      if (pathScriptsCache[path]) {
	        process.nextTick(function () {
	          cb(pathScriptsCache[path]);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: pathScriptsCache[path]
	          });
	        });
	        return pathScriptsCache[path];
	      }
	
	      _emitter2.default.emit("onPreLoadPageResources", { path: path });
	      // Nope, we need to load resource(s)
	      var component = void 0;
	      var json = void 0;
	      var layout = void 0;
	      // Load the component/json/layout and parallel and call this
	      // function when they're done loading. When both are loaded,
	      // we move on.
	      var done = function done() {
	        if (component && json && (!_page.layoutComponentChunkName || layout)) {
	          pathScriptsCache[path] = { component: component, json: json, layout: layout };
	          var _pageResources = { component: component, json: json, layout: layout };
	          cb(_pageResources);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: _pageResources
	          });
	        }
	      };
	      getResourceModule(_page.componentChunkName, function (err, c) {
	        if (err) {
	          console.log("Loading the component for " + _page.path + " failed");
	        }
	        component = c;
	        done();
	      });
	      getResourceModule(_page.jsonName, function (err, j) {
	        if (err) {
	          console.log("Loading the JSON for " + _page.path + " failed");
	        }
	        json = j;
	        done();
	      });
	
	      _page.layoutComponentChunkName && getResourceModule(_page.layoutComponentChunkName, function (err, l) {
	        if (err) {
	          console.log("Loading the Layout for " + _page.path + " failed");
	        }
	        layout = l;
	        done();
	      });
	
	      return undefined;
	    }
	  },
	  peek: function peek(path) {
	    return pathArray.slice(-1)[0];
	  },
	  length: function length() {
	    return pathArray.length;
	  },
	  indexOf: function indexOf(path) {
	    return pathArray.length - pathArray.indexOf(path) - 1;
	  }
	};
	
	module.exports = queue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./.cache/pages.json":
/***/ (function(module, exports) {

	module.exports = [
		{
			"componentChunkName": "component---node-modules-gatsby-plugin-offline-app-shell-js",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "offline-plugin-app-shell-fallback.json",
			"path": "/offline-plugin-app-shell-fallback/"
		},
		{
			"componentChunkName": "component---src-templates-lesson-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "lesson-one.json",
			"path": "/lesson-one"
		},
		{
			"componentChunkName": "component---src-templates-lesson-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "lesson-three.json",
			"path": "/lesson-three"
		},
		{
			"componentChunkName": "component---src-templates-lesson-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "lesson-two.json",
			"path": "/lesson-two"
		},
		{
			"componentChunkName": "component---src-templates-post-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "post-one.json",
			"path": "/post-one"
		},
		{
			"componentChunkName": "component---src-templates-tag-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "tags-programming.json",
			"path": "/tags/programming/"
		},
		{
			"componentChunkName": "component---src-templates-tag-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "tags-stuff.json",
			"path": "/tags/stuff/"
		},
		{
			"componentChunkName": "component---src-templates-tag-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "tags-other.json",
			"path": "/tags/other/"
		},
		{
			"componentChunkName": "component---src-templates-category-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "categories-tech.json",
			"path": "/categories/tech/"
		},
		{
			"componentChunkName": "component---src-pages-about-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "about.json",
			"path": "/about/"
		},
		{
			"componentChunkName": "component---src-pages-index-jsx",
			"layout": "index",
			"layoutComponentChunkName": "component---src-layouts-index-jsx",
			"jsonName": "index.json",
			"path": "/"
		}
	];

/***/ }),

/***/ "./.cache/prefetcher.js":
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (_ref) {
	  var getNextQueuedResources = _ref.getNextQueuedResources,
	      createResourceDownload = _ref.createResourceDownload;
	
	  var pagesLoading = [];
	  var resourcesDownloading = [];
	
	  // Do things
	  var startResourceDownloading = function startResourceDownloading() {
	    var nextResource = getNextQueuedResources();
	    if (nextResource) {
	      resourcesDownloading.push(nextResource);
	      createResourceDownload(nextResource);
	    }
	  };
	
	  var reducer = function reducer(action) {
	    switch (action.type) {
	      case "RESOURCE_FINISHED":
	        resourcesDownloading = resourcesDownloading.filter(function (r) {
	          return r !== action.payload;
	        });
	        break;
	      case "ON_PRE_LOAD_PAGE_RESOURCES":
	        pagesLoading.push(action.payload.path);
	        break;
	      case "ON_POST_LOAD_PAGE_RESOURCES":
	        pagesLoading = pagesLoading.filter(function (p) {
	          return p !== action.payload.page.path;
	        });
	        break;
	      case "ON_NEW_RESOURCES_ADDED":
	        break;
	    }
	
	    // Take actions.
	    // Wait for event loop queue to finish.
	    setTimeout(function () {
	      if (resourcesDownloading.length === 0 && pagesLoading.length === 0) {
	        // Start another resource downloading.
	        startResourceDownloading();
	      }
	    }, 0);
	  };
	
	  return {
	    onResourcedFinished: function onResourcedFinished(event) {
	      // Tell prefetcher that the resource finished downloading
	      // so it can grab the next one.
	      reducer({ type: "RESOURCE_FINISHED", payload: event });
	    },
	    onPreLoadPageResources: function onPreLoadPageResources(event) {
	      // Tell prefetcher a page load has started so it should stop
	      // loading anything new
	      reducer({ type: "ON_PRE_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onPostLoadPageResources: function onPostLoadPageResources(event) {
	      // Tell prefetcher a page load has finished so it should start
	      // loading resources again.
	      reducer({ type: "ON_POST_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onNewResourcesAdded: function onNewResourcesAdded() {
	      // Tell prefetcher that more resources to be downloaded have
	      // been added.
	      reducer({ type: "ON_NEW_RESOURCES_ADDED" });
	    },
	    getState: function getState() {
	      return { pagesLoading: pagesLoading, resourcesDownloading: resourcesDownloading };
	    },
	    empty: function empty() {
	      pagesLoading = [];
	      resourcesDownloading = [];
	    }
	  };
	};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _apiRunnerBrowser = __webpack_require__("./.cache/api-runner-browser.js");
	
	var _apiRunnerBrowser2 = _interopRequireDefault(_apiRunnerBrowser);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/index.js");
	
	var _reactRouterScroll = __webpack_require__("./node_modules/react-router-scroll/lib/index.js");
	
	var _createBrowserHistory = __webpack_require__("./node_modules/history/createBrowserHistory.js");
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _domready = __webpack_require__("./node_modules/domready/ready.js");
	
	var _domready2 = _interopRequireDefault(_domready);
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _pages = __webpack_require__("./.cache/pages.json");
	
	var _pages2 = _interopRequireDefault(_pages);
	
	var _componentRenderer = __webpack_require__("./.cache/component-renderer.js");
	
	var _componentRenderer2 = _interopRequireDefault(_componentRenderer);
	
	var _asyncRequires = __webpack_require__("./.cache/async-requires.js");
	
	var _asyncRequires2 = _interopRequireDefault(_asyncRequires);
	
	var _loader = __webpack_require__("./.cache/loader.js");
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.___emitter = _emitter2.default;
	// emitter.on(`*`, (type, e) => console.log(`emitter`, type, e))
	
	_loader2.default.addPagesArray(_pages2.default);
	_loader2.default.addProdRequires(_asyncRequires2.default);
	window.asyncRequires = _asyncRequires2.default;
	
	window.___loader = _loader2.default;
	
	window.matchPath = _reactRouterDom.matchPath;
	// Let the site/plugins run code very early.
	(0, _apiRunnerBrowser2.default)("onClientEntry");
	
	// Let plugins register a service worker. The plugin just needs
	// to return true.
	if ((0, _apiRunnerBrowser2.default)("registerServiceWorker").length > 0) {
	  __webpack_require__("./.cache/register-service-worker.js");
	}
	
	var navigateTo = function navigateTo(pathname) {
	  // If we're already at this path, do nothing.
	  if (window.location.pathname === pathname) {
	    return;
	  }
	
	  // Listen to loading events. If page resources load before
	  // a second, navigate immediately.
	  function eventHandler(e) {
	    if (e.page.path === _loader2.default.getPage(pathname).path) {
	      _emitter2.default.off("onPostLoadPageResources", eventHandler);
	      clearTimeout(timeoutId);
	      window.___history.push(pathname);
	    }
	  }
	
	  // Start a timer to wait for a second before transitioning and showing a
	  // loader in case resources aren't around yet.
	  var timeoutId = setTimeout(function () {
	    _emitter2.default.off("onPostLoadPageResources", eventHandler);
	    _emitter2.default.emit("onDelayedLoadPageResources", { pathname: pathname });
	    window.___history.push(pathname);
	  }, 1000);
	
	  if (_loader2.default.getResourcesForPathname(pathname)) {
	    // The resources are already loaded so off we go.
	    clearTimeout(timeoutId);
	    window.___history.push(pathname);
	  } else {
	    // They're not loaded yet so let's add a listener for when
	    // they finish loading.
	    _emitter2.default.on("onPostLoadPageResources", eventHandler);
	  }
	};
	
	// window.___loadScriptsForPath = loadScriptsForPath
	window.___navigateTo = navigateTo;
	
	var history = (0, _createBrowserHistory2.default)();
	
	// Call onRouteUpdate on the initial page load.
	(0, _apiRunnerBrowser2.default)("onRouteUpdate", {
	  location: history.location,
	  action: history.action
	});
	
	function attachToHistory(history) {
	  if (!window.___history) {
	    window.___history = history;
	
	    history.listen(function (location, action) {
	      (0, _apiRunnerBrowser2.default)("onRouteUpdate", { location: location, action: action });
	    });
	  }
	}
	
	function shouldUpdateScroll(prevRouterProps, _ref) {
	  var pathname = _ref.location.pathname;
	
	  var results = (0, _apiRunnerBrowser2.default)("shouldUpdateScroll", {
	    prevRouterProps: prevRouterProps,
	    pathname: pathname
	  });
	  if (results.length > 0) {
	    return results[0];
	  }
	
	  if (prevRouterProps) {
	    var oldPathname = prevRouterProps.location.pathname;
	
	    if (oldPathname === pathname) {
	      return false;
	    }
	  }
	  return true;
	}
	
	var AltRouter = (0, _apiRunnerBrowser2.default)("replaceRouterComponent", { history: history })[0];
	var DefaultRouter = function DefaultRouter(_ref2) {
	  var children = _ref2.children;
	  return _react2.default.createElement(
	    _reactRouterDom.BrowserRouter,
	    { history: history },
	    children
	  );
	};
	
	_loader2.default.getResourcesForPathname(window.location.pathname, function () {
	  var Root = function Root() {
	    return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_reactRouterScroll.ScrollContext, { shouldUpdateScroll: shouldUpdateScroll }, (0, _react.createElement)((0, _reactRouterDom.withRouter)(_componentRenderer2.default), {
	      layout: true,
	      children: function children(layoutProps) {
	        return (0, _react.createElement)(_reactRouterDom.Route, {
	          render: function render(routeProps) {
	            attachToHistory(routeProps.history);
	            var props = layoutProps ? layoutProps : routeProps;
	
	            if (_loader2.default.getPage(props.location.pathname)) {
	              return (0, _react.createElement)(_componentRenderer2.default, _extends({
	                page: true
	              }, props));
	            } else {
	              return (0, _react.createElement)(_componentRenderer2.default, {
	                location: { page: true, pathname: "/404.html" }
	              });
	            }
	          }
	        });
	      }
	    })));
	  };
	
	  var NewRoot = (0, _apiRunnerBrowser2.default)("wrapRootComponent", { Root: Root }, Root)[0];
	  (0, _domready2.default)(function () {
	    return _reactDom2.default.render(_react2.default.createElement(NewRoot, null), typeof window !== "undefined" ? document.getElementById("___gatsby") : void 0, function () {
	      (0, _apiRunnerBrowser2.default)("onInitialClientRender");
	    });
	  });
	});

/***/ }),

/***/ "./.cache/register-service-worker.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _emitter = __webpack_require__("./.cache/emitter.js");
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pathPrefix = "/";
	if (true) {
	  pathPrefix = ("") + "/";
	}
	
	if ("serviceWorker" in navigator) {
	  navigator.serviceWorker.register(pathPrefix + "sw.js").then(function (reg) {
	    reg.addEventListener("updatefound", function () {
	      // The updatefound event implies that reg.installing is set; see
	      // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
	      var installingWorker = reg.installing;
	      console.log("installingWorker", installingWorker);
	      installingWorker.addEventListener("statechange", function () {
	        switch (installingWorker.state) {
	          case "installed":
	            if (navigator.serviceWorker.controller) {
	              // At this point, the old content will have been purged and the fresh content will
	              // have been added to the cache.
	              // We reload immediately so the user sees the new content.
	              // This could/should be made configurable in the future.
	              window.location.reload();
	            } else {
	              // At this point, everything has been precached.
	              // It's the perfect time to display a "Content is cached for offline use." message.
	              console.log("Content is now available offline!");
	              _emitter2.default.emit("sw:installed");
	            }
	            break;
	
	          case "redundant":
	            console.error("The installing service worker became redundant.");
	            break;
	        }
	      });
	    });
	  }).catch(function (e) {
	    console.error("Error during service worker registration:", e);
	  });
	}

/***/ }),

/***/ "./node_modules/domready/ready.js":
/***/ (function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {
	
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	
	}('domready', function () {
	
	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
	
	
	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })
	
	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }
	
	});


/***/ }),

/***/ "./node_modules/gatsby-plugin-catch-links/catch-links.js":
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (root, cb) {
	  root.addEventListener("click", function (ev) {
	    if (ev.button !== 0 || ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
	      return true;
	    }
	
	    var anchor = null;
	    for (var n = ev.target; n.parentNode; n = n.parentNode) {
	      if (n.nodeName === "A") {
	        anchor = n;
	        break;
	      }
	    }
	    if (!anchor) return true;
	
	    // Don't catch links where a target (other than self) is set
	    // e.g. _blank.
	    if (anchor.target && anchor.target.toLowerCase() !== "_self") return true;
	
	    // Don't catch links pointed to the same page but with a hash.
	    if (anchor.pathname === window.location.pathname && anchor.target.hash !== "") {
	      return true;
	    }
	
	    // Don't catch links pointed at what look like file extensions (other than
	    // .htm/html extensions).
	    if (anchor.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i) !== -1) {
	      return true;
	    }
	
	    // IE clears the host value if the anchor href changed after creation, e.g.
	    // in React. Creating a new anchor element to ensure host value is present
	    var a1 = document.createElement("a");
	    a1.href = anchor.href;
	
	    // In IE, the default port is included in the anchor host but excluded from
	    // the location host.  This affects the ability to directly compare
	    // location host to anchor host.  For example: http://example.com would
	    // have a location.host of 'example.com' and an anchor.host of
	    // 'example.com:80' Creating anchor from the location.href to normalize the
	    // host value.
	    var a2 = document.createElement("a");
	    a2.href = window.location.href;
	
	    if (a1.host !== a2.host) return true;
	
	    ev.preventDefault();
	
	    cb(anchor.getAttribute("href"));
	    return false;
	  });
	};

/***/ }),

/***/ "./node_modules/gatsby-plugin-catch-links/gatsby-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _gatsbyLink = __webpack_require__("./node_modules/gatsby-link/index.js");
	
	var _catchLinks = __webpack_require__("./node_modules/gatsby-plugin-catch-links/catch-links.js");
	
	var _catchLinks2 = _interopRequireDefault(_catchLinks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _catchLinks2.default)(window, function (href) {
	  (0, _gatsbyLink.navigateTo)(href);
	});

/***/ }),

/***/ "./node_modules/gatsby-plugin-google-analytics/gatsby-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.onRouteUpdate = function (_ref) {
	  var location = _ref.location;
	
	  // Don't track while developing.
	  if (("production") === "production" && typeof ga === "function") {
	    ga("set", "page", (location || {}).pathname);
	    ga("send", "pageview");
	  }
	};

/***/ }),

/***/ "./node_modules/gatsby-plugin-nprogress/gatsby-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _nprogress = __webpack_require__("./node_modules/nprogress/nprogress.js");
	
	var _nprogress2 = _interopRequireDefault(_nprogress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.onClientEntry = function (a) {
	    var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { color: "#29d" };
	
	    window.___emitter.on("onDelayedLoadPageResources", function () {
	        _nprogress2.default.start();
	    });
	    window.___emitter.on("onPostLoadPageResources", function () {
	        _nprogress2.default.done();
	    });
	
	    // Inject styles.
	    var styles = "#nprogress {\n    pointer-events: none;\n}\n#nprogress .bar {\n    background: " + pluginOptions.color + ";\n    position: fixed;\n    z-index: 1031;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 2px;\n}\n#nprogress .peg {\n    display: block;\n    position: absolute;\n    right: 0px;\n    width: 100px;\n    height: 100%;\n    box-shadow: 0 0 10px " + pluginOptions.color + ", 0 0 5px " + pluginOptions.color + ";\n    opacity: 1.0;\n    -webkit-transform: rotate(3deg) translate(0px, -4px);\n    -ms-transform: rotate(3deg) translate(0px, -4px);\n    transform: rotate(3deg) translate(0px, -4px);\n}\n#nprogress .spinner {\n    display: block;\n    position: fixed;\n    z-index: 1031;\n    top: 15px;\n    right: 15px;\n}\n#nprogress .spinner-icon {\n    width: 18px;\n    height: 18px;\n    box-sizing: border-box;\n    border: solid 2px transparent;\n    border-top-color: " + pluginOptions.color + ";\n    border-left-color: " + pluginOptions.color + ";\n    border-radius: 50%;\n    -webkit-animation: nprogress-spinner 400ms linear infinite;\n    animation: nprogress-spinner 400ms linear infinite;\n}\n.nprogress-custom-parent {\n    overflow: hidden;\n    position: relative;\n}\n.nprogress-custom-parent #nprogress .spinner,\n.nprogress-custom-parent #nprogress .bar {\n    position: absolute;\n}\n@-webkit-keyframes nprogress-spinner {\n    0% {\n        -webkit-transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n    }\n}\n@keyframes nprogress-spinner {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n";
	
	    var node = document.createElement("style");
	    node.id = "nprogress-styles";
	    node.innerHTML = styles;
	    document.head.appendChild(node);
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---node-modules-gatsby-plugin-offline-app-shell-js!./node_modules/gatsby-plugin-offline/app-shell.js":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(6502461027731969000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/gatsby-plugin-offline/app-shell.js") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby-plugin-offline/gatsby-browser.js":
/***/ (function(module, exports) {

	"use strict";
	
	exports.registerServiceWorker = function () {
	  return true;
	};

/***/ }),

/***/ "./node_modules/gatsby-plugin-twitter/gatsby-browser.js":
/***/ (function(module, exports) {

	"use strict";
	
	exports.onRouteUpdate = function (_ref) {
	  var location = _ref.location;
	
	  if (typeof twttr !== "undefined" && twttr.widgets && typeof twttr.widgets.load === "function") {
	    twttr.widgets.load();
	  }
	};

/***/ }),

/***/ "./node_modules/gatsby-remark-autolink-headers/gatsby-browser.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var scrollToHash = function scrollToHash(offsetY) {
	  // Make sure React has had a change to flush to DOM first.
	  setTimeout(function () {
	    var hash = window.location.hash.replace("#", "");
	    if (hash !== "") {
	      var element = document.getElementById(hash);
	      if (element) {
	        var offset = element.offsetTop;
	        window.scrollTo(0, offset - offsetY);
	      }
	    }
	  }, 10);
	};
	
	exports.onClientEntry = function (args, pluginOptions) {
	  var offsetY = 0;
	  if (pluginOptions.offsetY) {
	    offsetY = pluginOptions.offsetY;
	  }
	  // This code is only so scrolling to header hashes works in development.
	  // For production, the equivalent code is in gatsby-ssr.js.
	  if (false) {
	    scrollToHash(offsetY);
	  }
	};
	
	exports.onRouteUpdate = function (args, pluginOptions) {
	  var offsetY = 0;
	  if (pluginOptions.offsetY) {
	    offsetY = pluginOptions.offsetY;
	  }
	
	  scrollToHash(offsetY);
	};

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js":
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	patch();
	
	function patch() {
	  var head = document.querySelector(`head`);
	  var ensure = __webpack_require__.e;
	  var chunks = __webpack_require__.s;
	  var failures;
	
	  __webpack_require__.e = function (chunkId, callback) {
	    var loaded = false;
	    var immediate = true;
	
	    var handler = function handler(error) {
	      if (!callback) return;
	
	      callback(__webpack_require__, error);
	      callback = null;
	    };
	
	    if (!chunks && failures && failures[chunkId]) {
	      handler(true);
	      return;
	    }
	
	    ensure(chunkId, function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (immediate) {
	        // webpack fires callback immediately if chunk was already loaded
	        // IE also fires callback immediately if script was already
	        // in a cache (AppCache counts too)
	        setTimeout(function () {
	          handler();
	        });
	      } else {
	        handler();
	      }
	    }
	
	    // This is |true| if chunk is already loaded and does not need onError call.
	    // This happens because in such case ensure() is performed in sync way
	    );if (loaded) {
	      return;
	    }
	
	    immediate = false;
	
	    onError(function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (chunks) {
	        chunks[chunkId] = void 0;
	      } else {
	        failures || (failures = {});
	        failures[chunkId] = true;
	      }
	
	      handler(true);
	    });
	  };
	
	  function onError(callback) {
	    var script = head.lastChild;
	
	    if (script.tagName !== `SCRIPT`) {
	      if (typeof console !== `undefined` && console.warn) {
	        console.warn(`Script is not a script`, script);
	      }
	
	      return;
	    }
	
	    script.onload = script.onerror = function () {
	      script.onload = script.onerror = null;
	      setTimeout(callback, 0);
	    };
	  }
	}
	//# sourceMappingURL=patch.js.map

/***/ }),

/***/ "./node_modules/mitt/dist/mitt.js":
/***/ (function(module, exports) {

	function n(n){return n=n||Object.create(null),{on:function(t,o){(n[t]||(n[t]=[])).push(o)},off:function(t,o){n[t]&&n[t].splice(n[t].indexOf(o)>>>0,1)},emit:function(t,o){(n[t]||[]).map(function(n){n(o)}),(n["*"]||[]).map(function(n){n(t,o)})}}}module.exports=n;
	//# sourceMappingURL=mitt.js.map

/***/ }),

/***/ "./node_modules/nprogress/nprogress.js":
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
	 * @license MIT */
	
	;(function(root, factory) {
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.NProgress = factory();
	  }
	
	})(this, function() {
	  var NProgress = {};
	
	  NProgress.version = '0.2.0';
	
	  var Settings = NProgress.settings = {
	    minimum: 0.08,
	    easing: 'ease',
	    positionUsing: '',
	    speed: 200,
	    trickle: true,
	    trickleRate: 0.02,
	    trickleSpeed: 800,
	    showSpinner: true,
	    barSelector: '[role="bar"]',
	    spinnerSelector: '[role="spinner"]',
	    parent: 'body',
	    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	  };
	
	  /**
	   * Updates configuration.
	   *
	   *     NProgress.configure({
	   *       minimum: 0.1
	   *     });
	   */
	  NProgress.configure = function(options) {
	    var key, value;
	    for (key in options) {
	      value = options[key];
	      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
	    }
	
	    return this;
	  };
	
	  /**
	   * Last number.
	   */
	
	  NProgress.status = null;
	
	  /**
	   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
	   *
	   *     NProgress.set(0.4);
	   *     NProgress.set(1.0);
	   */
	
	  NProgress.set = function(n) {
	    var started = NProgress.isStarted();
	
	    n = clamp(n, Settings.minimum, 1);
	    NProgress.status = (n === 1 ? null : n);
	
	    var progress = NProgress.render(!started),
	        bar      = progress.querySelector(Settings.barSelector),
	        speed    = Settings.speed,
	        ease     = Settings.easing;
	
	    progress.offsetWidth; /* Repaint */
	
	    queue(function(next) {
	      // Set positionUsing if it hasn't already been set
	      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();
	
	      // Add transition
	      css(bar, barPositionCSS(n, speed, ease));
	
	      if (n === 1) {
	        // Fade out
	        css(progress, { 
	          transition: 'none', 
	          opacity: 1 
	        });
	        progress.offsetWidth; /* Repaint */
	
	        setTimeout(function() {
	          css(progress, { 
	            transition: 'all ' + speed + 'ms linear', 
	            opacity: 0 
	          });
	          setTimeout(function() {
	            NProgress.remove();
	            next();
	          }, speed);
	        }, speed);
	      } else {
	        setTimeout(next, speed);
	      }
	    });
	
	    return this;
	  };
	
	  NProgress.isStarted = function() {
	    return typeof NProgress.status === 'number';
	  };
	
	  /**
	   * Shows the progress bar.
	   * This is the same as setting the status to 0%, except that it doesn't go backwards.
	   *
	   *     NProgress.start();
	   *
	   */
	  NProgress.start = function() {
	    if (!NProgress.status) NProgress.set(0);
	
	    var work = function() {
	      setTimeout(function() {
	        if (!NProgress.status) return;
	        NProgress.trickle();
	        work();
	      }, Settings.trickleSpeed);
	    };
	
	    if (Settings.trickle) work();
	
	    return this;
	  };
	
	  /**
	   * Hides the progress bar.
	   * This is the *sort of* the same as setting the status to 100%, with the
	   * difference being `done()` makes some placebo effect of some realistic motion.
	   *
	   *     NProgress.done();
	   *
	   * If `true` is passed, it will show the progress bar even if its hidden.
	   *
	   *     NProgress.done(true);
	   */
	
	  NProgress.done = function(force) {
	    if (!force && !NProgress.status) return this;
	
	    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
	  };
	
	  /**
	   * Increments by a random amount.
	   */
	
	  NProgress.inc = function(amount) {
	    var n = NProgress.status;
	
	    if (!n) {
	      return NProgress.start();
	    } else {
	      if (typeof amount !== 'number') {
	        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
	      }
	
	      n = clamp(n + amount, 0, 0.994);
	      return NProgress.set(n);
	    }
	  };
	
	  NProgress.trickle = function() {
	    return NProgress.inc(Math.random() * Settings.trickleRate);
	  };
	
	  /**
	   * Waits for all supplied jQuery promises and
	   * increases the progress as the promises resolve.
	   *
	   * @param $promise jQUery Promise
	   */
	  (function() {
	    var initial = 0, current = 0;
	
	    NProgress.promise = function($promise) {
	      if (!$promise || $promise.state() === "resolved") {
	        return this;
	      }
	
	      if (current === 0) {
	        NProgress.start();
	      }
	
	      initial++;
	      current++;
	
	      $promise.always(function() {
	        current--;
	        if (current === 0) {
	            initial = 0;
	            NProgress.done();
	        } else {
	            NProgress.set((initial - current) / initial);
	        }
	      });
	
	      return this;
	    };
	
	  })();
	
	  /**
	   * (Internal) renders the progress bar markup based on the `template`
	   * setting.
	   */
	
	  NProgress.render = function(fromStart) {
	    if (NProgress.isRendered()) return document.getElementById('nprogress');
	
	    addClass(document.documentElement, 'nprogress-busy');
	    
	    var progress = document.createElement('div');
	    progress.id = 'nprogress';
	    progress.innerHTML = Settings.template;
	
	    var bar      = progress.querySelector(Settings.barSelector),
	        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
	        parent   = document.querySelector(Settings.parent),
	        spinner;
	    
	    css(bar, {
	      transition: 'all 0 linear',
	      transform: 'translate3d(' + perc + '%,0,0)'
	    });
	
	    if (!Settings.showSpinner) {
	      spinner = progress.querySelector(Settings.spinnerSelector);
	      spinner && removeElement(spinner);
	    }
	
	    if (parent != document.body) {
	      addClass(parent, 'nprogress-custom-parent');
	    }
	
	    parent.appendChild(progress);
	    return progress;
	  };
	
	  /**
	   * Removes the element. Opposite of render().
	   */
	
	  NProgress.remove = function() {
	    removeClass(document.documentElement, 'nprogress-busy');
	    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
	    var progress = document.getElementById('nprogress');
	    progress && removeElement(progress);
	  };
	
	  /**
	   * Checks if the progress bar is rendered.
	   */
	
	  NProgress.isRendered = function() {
	    return !!document.getElementById('nprogress');
	  };
	
	  /**
	   * Determine which positioning CSS rule to use.
	   */
	
	  NProgress.getPositioningCSS = function() {
	    // Sniff on document.body.style
	    var bodyStyle = document.body.style;
	
	    // Sniff prefixes
	    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
	                       ('MozTransform' in bodyStyle) ? 'Moz' :
	                       ('msTransform' in bodyStyle) ? 'ms' :
	                       ('OTransform' in bodyStyle) ? 'O' : '';
	
	    if (vendorPrefix + 'Perspective' in bodyStyle) {
	      // Modern browsers with 3D support, e.g. Webkit, IE10
	      return 'translate3d';
	    } else if (vendorPrefix + 'Transform' in bodyStyle) {
	      // Browsers without 3D support, e.g. IE9
	      return 'translate';
	    } else {
	      // Browsers without translate() support, e.g. IE7-8
	      return 'margin';
	    }
	  };
	
	  /**
	   * Helpers
	   */
	
	  function clamp(n, min, max) {
	    if (n < min) return min;
	    if (n > max) return max;
	    return n;
	  }
	
	  /**
	   * (Internal) converts a percentage (`0..1`) to a bar translateX
	   * percentage (`-100%..0%`).
	   */
	
	  function toBarPerc(n) {
	    return (-1 + n) * 100;
	  }
	
	
	  /**
	   * (Internal) returns the correct CSS for changing the bar's
	   * position given an n percentage, and speed and ease from Settings
	   */
	
	  function barPositionCSS(n, speed, ease) {
	    var barCSS;
	
	    if (Settings.positionUsing === 'translate3d') {
	      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
	    } else if (Settings.positionUsing === 'translate') {
	      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
	    } else {
	      barCSS = { 'margin-left': toBarPerc(n)+'%' };
	    }
	
	    barCSS.transition = 'all '+speed+'ms '+ease;
	
	    return barCSS;
	  }
	
	  /**
	   * (Internal) Queues a function to be executed.
	   */
	
	  var queue = (function() {
	    var pending = [];
	    
	    function next() {
	      var fn = pending.shift();
	      if (fn) {
	        fn(next);
	      }
	    }
	
	    return function(fn) {
	      pending.push(fn);
	      if (pending.length == 1) next();
	    };
	  })();
	
	  /**
	   * (Internal) Applies css properties to an element, similar to the jQuery 
	   * css method.
	   *
	   * While this helper does assist with vendor prefixed property names, it 
	   * does not perform any manipulation of values prior to setting styles.
	   */
	
	  var css = (function() {
	    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
	        cssProps    = {};
	
	    function camelCase(string) {
	      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
	        return letter.toUpperCase();
	      });
	    }
	
	    function getVendorProp(name) {
	      var style = document.body.style;
	      if (name in style) return name;
	
	      var i = cssPrefixes.length,
	          capName = name.charAt(0).toUpperCase() + name.slice(1),
	          vendorName;
	      while (i--) {
	        vendorName = cssPrefixes[i] + capName;
	        if (vendorName in style) return vendorName;
	      }
	
	      return name;
	    }
	
	    function getStyleProp(name) {
	      name = camelCase(name);
	      return cssProps[name] || (cssProps[name] = getVendorProp(name));
	    }
	
	    function applyCss(element, prop, value) {
	      prop = getStyleProp(prop);
	      element.style[prop] = value;
	    }
	
	    return function(element, properties) {
	      var args = arguments,
	          prop, 
	          value;
	
	      if (args.length == 2) {
	        for (prop in properties) {
	          value = properties[prop];
	          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
	        }
	      } else {
	        applyCss(element, args[1], args[2]);
	      }
	    }
	  })();
	
	  /**
	   * (Internal) Determines if an element or space separated list of class names contains a class name.
	   */
	
	  function hasClass(element, name) {
	    var list = typeof element == 'string' ? element : classList(element);
	    return list.indexOf(' ' + name + ' ') >= 0;
	  }
	
	  /**
	   * (Internal) Adds a class to an element.
	   */
	
	  function addClass(element, name) {
	    var oldList = classList(element),
	        newList = oldList + name;
	
	    if (hasClass(oldList, name)) return; 
	
	    // Trim the opening space.
	    element.className = newList.substring(1);
	  }
	
	  /**
	   * (Internal) Removes a class from an element.
	   */
	
	  function removeClass(element, name) {
	    var oldList = classList(element),
	        newList;
	
	    if (!hasClass(element, name)) return;
	
	    // Replace the class name.
	    newList = oldList.replace(' ' + name + ' ', ' ');
	
	    // Trim the opening and closing spaces.
	    element.className = newList.substring(1, newList.length - 1);
	  }
	
	  /**
	   * (Internal) Gets a space separated list of the class names on the element. 
	   * The list is wrapped with a single space on each end to facilitate finding 
	   * matches within the list.
	   */
	
	  function classList(element) {
	    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
	  }
	
	  /**
	   * (Internal) Removes an element from the DOM.
	   */
	
	  function removeElement(element) {
	    element && element.parentNode && element.parentNode.removeChild(element);
	  }
	
	  return NProgress;
	});
	


/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-about-jsx!./src/pages/about.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(9453687551911655000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/pages/about.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-pages-index-jsx!./src/pages/index.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13994203391546835000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/pages/index.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-category-jsx!./src/templates/category.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(8503015651353310000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/templates/category.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-lesson-jsx!./src/templates/lesson.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(7356694376651505000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/templates/lesson.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-post-jsx!./src/templates/post.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(13967715268414180000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/templates/post.jsx") })
	        }
	      });
	     }
	    

/***/ }),

/***/ "./node_modules/gatsby/dist/loaders/gatsby-module-loader/index.js?name=component---src-templates-tag-jsx!./src/templates/tag.jsx":
/***/ (function(module, exports, __webpack_require__) {

	
	    __webpack_require__(
	      "./node_modules/gatsby/dist/loaders/gatsby-module-loader/patch.js"
	    );
	    module.exports = function(cb) { 
	     return __webpack_require__.e/* nsure */(12019329299654578000, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"plugins\":[\"/Users/ncthbrt/nact.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-lodash/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-add-module-exports/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"presets\":[[\"/Users/ncthbrt/nact.io/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/ncthbrt/nact.io/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/ncthbrt/nact.io/node_modules/babel-preset-react/lib/index.js\"],\"cacheDirectory\":true}!./src/templates/tag.jsx") })
	        }
	      });
	     }
	    

/***/ })

});
//# sourceMappingURL=app-dcdf9120eec7feeb297d.js.map