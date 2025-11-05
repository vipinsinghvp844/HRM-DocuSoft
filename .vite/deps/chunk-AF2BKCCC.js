import {
  _extends,
  _objectWithoutPropertiesLoose
} from "./chunk-H3QGJKSP.js";
import {
  __export
} from "./chunk-2TUXWMP5.js";

// node_modules/devextreme/esm/core/utils/type.js
var types = {
  "[object Array]": "array",
  "[object Date]": "date",
  "[object Object]": "object",
  "[object String]": "string"
};
var type = function(object) {
  if (null === object) {
    return "null";
  }
  var typeOfObject = Object.prototype.toString.call(object);
  return "object" === typeof object ? types[typeOfObject] || "object" : typeof object;
};
var isBoolean = function(object) {
  return "boolean" === typeof object;
};
var isExponential = function(value2) {
  return isNumeric(value2) && -1 !== value2.toString().indexOf("e");
};
var isDate = function(object) {
  return "date" === type(object);
};
var isDefined = function(object) {
  return null !== object && void 0 !== object;
};
var isFunction = function(object) {
  return "function" === typeof object;
};
var isString = function(object) {
  return "string" === typeof object;
};
var isNumeric = function(object) {
  return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object));
};
var isObject = function(object) {
  return "object" === type(object);
};
var isEmptyObject = function(object) {
  var property;
  for (property in object) {
    return false;
  }
  return true;
};
var isPlainObject = function(object) {
  if (!object || "object" !== type(object)) {
    return false;
  }
  var proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  var ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object);
};
var isPrimitive = function(value2) {
  return -1 === ["object", "array", "function"].indexOf(type(value2));
};
var isWindow = function(object) {
  return null != object && object === object.window;
};
var isRenderer = function(object) {
  return !!object && !!(object.jquery || object.dxRenderer);
};
var isPromise = function(object) {
  return !!object && isFunction(object.then);
};
var isDeferred = function(object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
var isEvent = function(object) {
  return !!(object && object.preventDefault);
};

// node_modules/devextreme/esm/core/utils/extend.js
var extendFromObject = function(target, source, overrideExistingValues) {
  target = target || {};
  for (var prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      var value2 = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value2;
      }
    }
  }
  return target;
};
var extend = function extend2(target) {
  target = target || {};
  var i = 1;
  var deep = false;
  if ("boolean" === typeof target) {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    var source = arguments[i];
    if (null == source) {
      continue;
    }
    for (var key in source) {
      var targetValue = target[key];
      var sourceValue = source[key];
      var sourceValueIsArray = false;
      var clone = void 0;
      if ("__proto__" === key || "constructor" === key || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }
        target[key] = extend2(deep, clone, sourceValue);
      } else if (void 0 !== sourceValue) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};

// node_modules/devextreme/esm/core/utils/console.js
var noop = function() {
};
var getConsoleMethod = function(method) {
  if ("undefined" === typeof console || !isFunction(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
var logger = {
  log: getConsoleMethod("log"),
  info: getConsoleMethod("info"),
  warn: getConsoleMethod("warn"),
  error: getConsoleMethod("error")
};

// node_modules/devextreme/esm/core/utils/string.js
var encodeHtml = function() {
  var encodeRegExp = [new RegExp("&", "g"), new RegExp('"', "g"), new RegExp("'", "g"), new RegExp("<", "g"), new RegExp(">", "g")];
  return function(str) {
    return String(str).replace(encodeRegExp[0], "&amp;").replace(encodeRegExp[1], "&quot;").replace(encodeRegExp[2], "&#39;").replace(encodeRegExp[3], "&lt;").replace(encodeRegExp[4], "&gt;");
  };
}();
var splitQuad = function(raw) {
  switch (typeof raw) {
    case "string":
      return raw.split(/\s+/, 4);
    case "object":
      return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];
    case "number":
      return [raw];
    default:
      return raw;
  }
};
var quadToObject = function(raw) {
  var quad = splitQuad(raw);
  var left = parseInt(quad && quad[0], 10);
  var top = parseInt(quad && quad[1], 10);
  var right = parseInt(quad && quad[2], 10);
  var bottom = parseInt(quad && quad[3], 10);
  if (!isFinite(left)) {
    left = 0;
  }
  if (!isFinite(top)) {
    top = left;
  }
  if (!isFinite(right)) {
    right = left;
  }
  if (!isFinite(bottom)) {
    bottom = top;
  }
  return {
    top,
    right,
    bottom,
    left
  };
};
function format(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (isFunction(template)) {
    return template(...values);
  }
  values.forEach((value2, index2) => {
    if (isString(value2)) {
      value2 = value2.replace(/\$/g, "$$$$");
    }
    var placeholderReg = new RegExp("\\{" + index2 + "\\}", "gm");
    template = template.replace(placeholderReg, value2);
  });
  return template;
}
var isEmpty = /* @__PURE__ */ function() {
  var SPACE_REGEXP = /\s/g;
  return function(text) {
    return !text || !text.replace(SPACE_REGEXP, "");
  };
}();

// node_modules/devextreme/esm/core/version.js
var version = "23.2.14";

// node_modules/devextreme/esm/core/utils/error.js
var ERROR_URL = "https://js.devexpress.com/error/" + version.split(".").slice(0, 2).join("_") + "/";
function error_default(baseErrors, errors2) {
  var exports = {
    ERROR_MESSAGES: extend(errors2, baseErrors),
    Error: function() {
      return makeError([].slice.call(arguments));
    },
    log: function(id) {
      var method = "log";
      if (/^E\d+$/.test(id)) {
        method = "error";
      } else if (/^W\d+$/.test(id)) {
        method = "warn";
      }
      logger[method]("log" === method ? id : combineMessage([].slice.call(arguments)));
    }
  };
  function combineMessage(args) {
    var id = args[0];
    args = args.slice(1);
    return formatMessage(id, formatDetails(id, args));
  }
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return format.apply(this, args).replace(/\.*\s*?$/, "");
  }
  function formatMessage(id, details) {
    var kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
    return format.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)]);
  }
  function makeError(args) {
    var id = args[0];
    args = args.slice(1);
    var details = formatDetails(id, args);
    var url = getErrorUrl(id);
    var message = formatMessage(id, details);
    return extend(new Error(message), {
      __id: id,
      __details: details,
      url
    });
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}

// node_modules/devextreme/esm/core/errors.js
var errors_default = error_default({
  E0001: "Method is not implemented",
  E0002: "Member name collision: {0}",
  E0003: "A class must be instantiated using the 'new' keyword",
  E0004: "The NAME property of the component is not specified",
  E0005: "Unknown device",
  E0006: "Unknown endpoint key is requested",
  E0007: "'Invalidate' method is called outside the update transaction",
  E0008: "Type of the option name is not appropriate to create an action",
  E0009: "Component '{0}' has not been initialized for an element",
  E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
  E0011: "Unknown animation type '{0}'",
  E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
  E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
  E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
  E0015: "Queued task returned an unexpected result",
  E0017: "Event namespace is not defined",
  E0018: "DevExpress.ui.DevExpressPopup widget is required",
  E0020: "Template engine '{0}' is not supported",
  E0021: "Unknown theme is set: {0}",
  E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
  E0023: "Template name is not specified",
  E0024: "DevExtreme bundle already included",
  E0025: "Unexpected argument type",
  E0100: "Unknown validation type is detected",
  E0101: "Misconfigured range validation rule is detected",
  E0102: "Misconfigured comparison validation rule is detected",
  E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
  E0110: "Unknown validation group is detected",
  E0120: "Adapter for a DevExpressValidator component cannot be configured",
  E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
  W0000: "'{0}' is deprecated in {1}. {2}",
  W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
  W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
  W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
  W0004: "Timeout for theme loading is over: {0}",
  W0005: "'{0}' event is deprecated in {1}. {2}",
  W0006: "Invalid recurrence rule: '{0}'",
  W0007: "'{0}' Globalize culture is not defined",
  W0008: "Invalid view name: '{0}'",
  W0009: "Invalid time zone name: '{0}'",
  W0010: "{0} is deprecated in {1}. {2}",
  W0011: "Number parsing is invoked while the parser is not defined",
  W0012: "Date parsing is invoked while the parser is not defined",
  W0013: "'{0}' file is deprecated in {1}. {2}",
  W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
  W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
  W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
  W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
  W0018: 'Setting the "position" property with a function is deprecated since v21.2',
  W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.devexpress.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.devexpress.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@devexpress.com.\n\n",
  W0020: "DevExtreme: License Key Has Expired.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n• use a version of DevExtreme linked to your license key: https://www.devexpress.com/ClientCenter/DownloadManager\n• renew your DevExpress Subscription: https://www.devexpress.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@devexpress.com.\n\n",
  W0021: "DevExtreme: License Key Verification Has Failed.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.devexpress.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n",
  W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n",
  W0023: "DevExtreme: the following 'devextreme' package version does not match versions of other DevExpress products used in this application:\n\n{0}\n\nInteroperability between different versions of the products listed herein cannot be guaranteed.\n\n"
});

// node_modules/devextreme/esm/core/config.js
var config = {
  rtlEnabled: false,
  defaultCurrency: "USD",
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: ".",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  useJQuery: void 0,
  editorStylingMode: void 0,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    icon: "add",
    closeIcon: "close",
    label: "",
    position: {
      at: "right bottom",
      my: "right bottom",
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: "auto"
  },
  optionsParser: (optionsString) => {
    if ("{" !== optionsString.trim().charAt(0)) {
      optionsString = "{" + optionsString + "}";
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw errors_default.Error("E3018", ex, optionsString);
      }
    }
  }
};
var normalizeToJSONString = (optionsString) => optionsString.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":');
var deprecatedFields = ["decimalSeparator", "thousandsSeparator"];
var configMethod = function() {
  if (!arguments.length) {
    return config;
  }
  var newConfig = arguments.length <= 0 ? void 0 : arguments[0];
  deprecatedFields.forEach((deprecatedField) => {
    if (newConfig[deprecatedField]) {
      var message = "Now, the ".concat(deprecatedField, " is selected based on the specified locale.");
      errors_default.log("W0003", "config", deprecatedField, "19.2", message);
    }
  });
  extend(config, newConfig);
};
if ("undefined" !== typeof DevExpress && DevExpress.config) {
  configMethod(DevExpress.config);
}
var config_default = configMethod;

// node_modules/devextreme/esm/core/class.js
var wrapOverridden = function(baseProto, methodName, method) {
  return function() {
    var prevCallBase = this.callBase;
    this.callBase = baseProto[methodName];
    try {
      return method.apply(this, arguments);
    } finally {
      this.callBase = prevCallBase;
    }
  };
};
var clonePrototype = function(obj) {
  var func = function() {
  };
  func.prototype = obj.prototype;
  return new func();
};
var redefine = function(members) {
  var overridden;
  var memberName;
  var member;
  if (!members) {
    return this;
  }
  for (memberName in members) {
    member = members[memberName];
    overridden = "function" === typeof this.prototype[memberName] && "function" === typeof member;
    this.prototype[memberName] = overridden ? wrapOverridden(this.parent.prototype, memberName, member) : member;
  }
  return this;
};
var include = function() {
  var classObj = this;
  var argument;
  var name;
  var i;
  var hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
  var isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
  if (isES6Class) {
    classObj._includedCtors = classObj._includedCtors.slice(0);
    classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
  }
  for (i = 0; i < arguments.length; i++) {
    argument = arguments[i];
    if (argument.ctor) {
      classObj._includedCtors.push(argument.ctor);
    }
    if (argument.postCtor) {
      classObj._includedPostCtors.push(argument.postCtor);
    }
    for (name in argument) {
      if ("ctor" === name || "postCtor" === name || "default" === name) {
        continue;
      }
      classObj.prototype[name] = argument[name];
    }
  }
  return classObj;
};
var subclassOf = function(parentClass) {
  var hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
  var isES6Class = !hasParentProperty && this.parent;
  if (isES6Class) {
    var baseClass = Object.getPrototypeOf(this);
    return baseClass === parentClass || baseClass.subclassOf(parentClass);
  } else {
    if (this.parent === parentClass) {
      return true;
    }
    if (!this.parent || !this.parent.subclassOf) {
      return false;
    }
    return this.parent.subclassOf(parentClass);
  }
};
var abstract = function() {
  throw errors_default.Error("E0001");
};
var copyStatic = /* @__PURE__ */ function() {
  var hasOwn = Object.prototype.hasOwnProperty;
  return function(source, destination) {
    for (var key in source) {
      if (!hasOwn.call(source, key)) {
        return;
      }
      destination[key] = source[key];
    }
  };
}();
var classImpl = function() {
};
classImpl.inherit = function(members) {
  var inheritor = function() {
    if (!this || isWindow(this) || "function" !== typeof this.constructor) {
      throw errors_default.Error("E0003");
    }
    var instance = this;
    var ctor = instance.ctor;
    var includedCtors = instance.constructor._includedCtors;
    var includedPostCtors = instance.constructor._includedPostCtors;
    var i;
    for (i = 0; i < includedCtors.length; i++) {
      includedCtors[i].call(instance);
    }
    if (ctor) {
      ctor.apply(instance, arguments);
    }
    for (i = 0; i < includedPostCtors.length; i++) {
      includedPostCtors[i].call(instance);
    }
  };
  inheritor.prototype = clonePrototype(this);
  copyStatic(this, inheritor);
  inheritor.inherit = this.inherit;
  inheritor.abstract = abstract;
  inheritor.redefine = redefine;
  inheritor.include = include;
  inheritor.subclassOf = subclassOf;
  inheritor.parent = this;
  inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  inheritor.prototype.constructor = inheritor;
  inheritor.redefine(members);
  return inheritor;
};
classImpl.abstract = abstract;
var class_default = classImpl;

// node_modules/devextreme/esm/core/guid.js
var Guid = class_default.inherit({
  ctor: function(value2) {
    if (value2) {
      value2 = String(value2);
    }
    this._value = this._normalize(value2 || this._generate());
  },
  _normalize: function(value2) {
    value2 = value2.replace(/[^a-f0-9]/gi, "").toLowerCase();
    while (value2.length < 32) {
      value2 += "0";
    }
    return [value2.substr(0, 8), value2.substr(8, 4), value2.substr(12, 4), value2.substr(16, 4), value2.substr(20, 12)].join("-");
  },
  _generate: function() {
    var value2 = "";
    for (var i = 0; i < 32; i++) {
      value2 += Math.round(15 * Math.random()).toString(16);
    }
    return value2;
  },
  toString: function() {
    return this._value;
  },
  valueOf: function() {
    return this._value;
  },
  toJSON: function() {
    return this._value;
  }
});
var guid_default = Guid;

// node_modules/devextreme/esm/core/utils/callbacks.js
var Callback = function(options) {
  this._options = options || {};
  this._list = [];
  this._queue = [];
  this._firing = false;
  this._fired = false;
  this._firingIndexes = [];
};
Callback.prototype._fireCore = function(context2, args) {
  var firingIndexes = this._firingIndexes;
  var list = this._list;
  var stopOnFalse = this._options.stopOnFalse;
  var step = firingIndexes.length;
  for (firingIndexes[step] = 0; firingIndexes[step] < list.length; firingIndexes[step]++) {
    var result = list[firingIndexes[step]].apply(context2, args);
    if (false === result && stopOnFalse) {
      break;
    }
  }
  firingIndexes.pop();
};
Callback.prototype.add = function(fn) {
  if ("function" === typeof fn && (!this._options.unique || !this.has(fn))) {
    this._list.push(fn);
  }
  return this;
};
Callback.prototype.remove = function(fn) {
  var list = this._list;
  var firingIndexes = this._firingIndexes;
  var index2 = list.indexOf(fn);
  if (index2 > -1) {
    list.splice(index2, 1);
    if (this._firing && firingIndexes.length) {
      for (var step = 0; step < firingIndexes.length; step++) {
        if (index2 <= firingIndexes[step]) {
          firingIndexes[step]--;
        }
      }
    }
  }
  return this;
};
Callback.prototype.has = function(fn) {
  var list = this._list;
  return fn ? list.indexOf(fn) > -1 : !!list.length;
};
Callback.prototype.empty = function(fn) {
  this._list = [];
  return this;
};
Callback.prototype.fireWith = function(context2, args) {
  var queue = this._queue;
  args = args || [];
  args = args.slice ? args.slice() : args;
  if (this._options.syncStrategy) {
    this._firing = true;
    this._fireCore(context2, args);
  } else {
    queue.push([context2, args]);
    if (this._firing) {
      return;
    }
    this._firing = true;
    while (queue.length) {
      var memory = queue.shift();
      this._fireCore(memory[0], memory[1]);
    }
  }
  this._firing = false;
  this._fired = true;
  return this;
};
Callback.prototype.fire = function() {
  this.fireWith(this, arguments);
};
Callback.prototype.fired = function() {
  return this._fired;
};
var Callbacks = function(options) {
  return new Callback(options);
};
var callbacks_default = Callbacks;

// node_modules/devextreme/esm/core/utils/deferred.js
var deferredConfig = [{
  method: "resolve",
  handler: "done",
  state: "resolved"
}, {
  method: "reject",
  handler: "fail",
  state: "rejected"
}, {
  method: "notify",
  handler: "progress"
}];
var _DeferredObj = function() {
  var that = this;
  this._state = "pending";
  this._promise = {};
  deferredConfig.forEach((function(config2) {
    var methodName = config2.method;
    this[methodName + "Callbacks"] = callbacks_default();
    this[methodName] = (function() {
      return this[methodName + "With"](this._promise, arguments);
    }).bind(this);
    this._promise[config2.handler] = function(handler) {
      if (!handler) {
        return this;
      }
      var callbacks2 = that[methodName + "Callbacks"];
      if (callbacks2.fired()) {
        handler.apply(that[methodName + "Context"], that[methodName + "Args"]);
      } else {
        callbacks2.add((function(context2, args) {
          handler.apply(context2, args);
        }).bind(this));
      }
      return this;
    };
  }).bind(this));
  this._promise.always = function(handler) {
    return this.done(handler).fail(handler);
  };
  this._promise.catch = function(handler) {
    return this.then(null, handler);
  };
  this._promise.then = function(resolve, reject) {
    var result = new _DeferredObj();
    ["done", "fail"].forEach((function(method) {
      var callback = "done" === method ? resolve : reject;
      this[method](function() {
        if (!callback) {
          result["done" === method ? "resolve" : "reject"].apply(this, arguments);
          return;
        }
        var callbackResult = callback && callback.apply(this, arguments);
        if (isDeferred(callbackResult)) {
          callbackResult.done(result.resolve).fail(result.reject);
        } else if (isPromise(callbackResult)) {
          callbackResult.then(result.resolve, result.reject);
        } else {
          result.resolve.apply(this, isDefined(callbackResult) ? [callbackResult] : arguments);
        }
      });
    }).bind(this));
    return result.promise();
  };
  this._promise.state = function() {
    return that._state;
  };
  this._promise.promise = function(args) {
    return args ? extend(args, that._promise) : that._promise;
  };
  this._promise.promise(this);
};
deferredConfig.forEach(function(config2) {
  var methodName = config2.method;
  var state = config2.state;
  _DeferredObj.prototype[methodName + "With"] = function(context2, args) {
    var callbacks2 = this[methodName + "Callbacks"];
    if ("pending" === this.state()) {
      this[methodName + "Args"] = args;
      this[methodName + "Context"] = context2;
      if (state) {
        this._state = state;
      }
      callbacks2.fire(context2, args);
      if ("pending" !== state) {
        this.resolveCallbacks.empty();
        this.rejectCallbacks.empty();
      }
    }
    return this;
  };
});
function fromPromise(promise, context2) {
  if (isDeferred(promise)) {
    return promise;
  } else if (isPromise(promise)) {
    var d = new _DeferredObj();
    promise.then(function() {
      d.resolveWith.apply(d, [context2].concat([
        [].slice.call(arguments)
      ]));
    }, function() {
      d.rejectWith.apply(d, [context2].concat([
        [].slice.call(arguments)
      ]));
    });
    return d;
  }
  return new _DeferredObj().resolveWith(context2, [promise]);
}
var whenFunc = function() {
  if (1 === arguments.length) {
    return fromPromise(arguments[0]);
  }
  var values = [].slice.call(arguments);
  var contexts = [];
  var resolvedCount = 0;
  var deferred = new _DeferredObj();
  var updateState = function(i2) {
    return function(value2) {
      contexts[i2] = this;
      values[i2] = arguments.length > 1 ? [].slice.call(arguments) : value2;
      resolvedCount++;
      if (resolvedCount === values.length) {
        deferred.resolveWith(contexts, values);
      }
    };
  };
  for (var i = 0; i < values.length; i++) {
    if (isDeferred(values[i])) {
      values[i].promise().done(updateState(i)).fail(deferred.reject);
    } else {
      resolvedCount++;
    }
  }
  if (resolvedCount === values.length) {
    deferred.resolveWith(contexts, values);
  }
  return deferred.promise();
};
function Deferred() {
  return new _DeferredObj();
}
function when() {
  return whenFunc.apply(this, arguments);
}

// node_modules/devextreme/esm/core/utils/iterator.js
var map = (values, callback) => {
  if (Array.isArray(values)) {
    return values.map(callback);
  }
  var result = [];
  for (var key in values) {
    result.push(callback(values[key], key));
  }
  return result;
};
var each = (values, callback) => {
  if (!values) {
    return;
  }
  if ("length" in values) {
    for (var i = 0; i < values.length; i++) {
      if (false === callback.call(values[i], i, values[i])) {
        break;
      }
    }
  } else {
    for (var key in values) {
      if (false === callback.call(values[key], key, values[key])) {
        break;
      }
    }
  }
  return values;
};

// node_modules/devextreme/esm/core/utils/dependency_injector.js
function dependency_injector_default(object) {
  var BaseClass = class_default.inherit(object);
  var InjectedClass = BaseClass;
  var instance = new InjectedClass(object);
  var initialFields = {};
  var injectFields = function(injectionObject, initial) {
    each(injectionObject, function(key) {
      if (isFunction(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function() {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    });
  };
  injectFields(object, true);
  object.inject = function(injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function() {
    extend(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}

// node_modules/devextreme/esm/core/utils/variable_wrapper.js
var variable_wrapper_default = dependency_injector_default({
  isWrapped: function() {
    return false;
  },
  isWritableWrapped: function() {
    return false;
  },
  wrap: function(value2) {
    return value2;
  },
  unwrap: function(value2) {
    return value2;
  },
  assign: function() {
    logger.error("Method 'assign' should not be used for not wrapped variables. Use 'isWrapped' method for ensuring.");
  }
});

// node_modules/devextreme/esm/core/utils/object.js
var orderEach = function(map2, func) {
  var keys = [];
  var key;
  var i;
  for (key in map2) {
    if (Object.prototype.hasOwnProperty.call(map2, key)) {
      keys.push(key);
    }
  }
  keys.sort(function(x, y) {
    var isNumberX = isNumeric(x);
    var isNumberY = isNumeric(y);
    if (isNumberX && isNumberY) {
      return x - y;
    }
    if (isNumberX && !isNumberY) {
      return -1;
    }
    if (!isNumberX && isNumberY) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    func(key, map2[key]);
  }
};
var assignValueToProperty = function(target, property, value2, assignByReference) {
  if (!assignByReference && variable_wrapper_default.isWrapped(target[property])) {
    variable_wrapper_default.assign(target[property], value2);
  } else {
    target[property] = value2;
  }
};
var deepExtendArraySafe = function deepExtendArraySafe2(target, changes, extendComplexObject, assignByReference) {
  var prevValue;
  var newValue;
  for (var name in changes) {
    prevValue = target[name];
    newValue = changes[name];
    if ("__proto__" === name || "constructor" === name || target === newValue) {
      continue;
    }
    if (isPlainObject(newValue)) {
      var goDeeper = extendComplexObject ? isObject(prevValue) : isPlainObject(prevValue);
      newValue = deepExtendArraySafe2(goDeeper ? prevValue : {}, newValue, extendComplexObject, assignByReference);
    }
    if (void 0 !== newValue && prevValue !== newValue) {
      assignValueToProperty(target, name, newValue, assignByReference);
    }
  }
  return target;
};

// node_modules/devextreme/esm/core/utils/data.js
var unwrapVariable = variable_wrapper_default.unwrap;
var isWrapped = variable_wrapper_default.isWrapped;
var assign = variable_wrapper_default.assign;
var bracketsToDots = function(expr) {
  return expr.replace(/\[/g, ".").replace(/\]/g, "");
};
var getPathParts = function(name) {
  return bracketsToDots(name).split(".");
};
var readPropValue = function(obj, propName, options) {
  options = options || {};
  if ("this" === propName) {
    return unwrap(obj, options);
  }
  return unwrap(obj[propName], options);
};
var assignPropValue = function(obj, propName, value2, options) {
  if ("this" === propName) {
    throw new errors_default.Error("E4016");
  }
  var propValue = obj[propName];
  if (options.unwrapObservables && isWrapped(propValue)) {
    assign(propValue, value2);
  } else {
    obj[propName] = value2;
  }
};
var prepareOptions = function(options) {
  options = options || {};
  options.unwrapObservables = void 0 !== options.unwrapObservables ? options.unwrapObservables : true;
  return options;
};
function unwrap(value2, options) {
  return options.unwrapObservables ? unwrapVariable(value2) : value2;
}
var compileGetter = function(expr) {
  if (arguments.length > 1) {
    expr = [].slice.call(arguments);
  }
  if (!expr || "this" === expr) {
    return function(obj) {
      return obj;
    };
  }
  if ("string" === typeof expr) {
    var path = getPathParts(expr);
    return function(obj, options) {
      options = prepareOptions(options);
      var functionAsIs = options.functionsAsIs;
      var hasDefaultValue = "defaultValue" in options;
      var current2 = unwrap(obj, options);
      for (var i = 0; i < path.length; i++) {
        if (!current2) {
          if (null == current2 && hasDefaultValue) {
            return options.defaultValue;
          }
          break;
        }
        var pathPart = path[i];
        if (hasDefaultValue && isObject(current2) && !(pathPart in current2)) {
          return options.defaultValue;
        }
        var next = unwrap(current2[pathPart], options);
        if (!functionAsIs && isFunction(next)) {
          next = next.call(current2);
        }
        current2 = next;
      }
      return current2;
    };
  }
  if (Array.isArray(expr)) {
    return combineGetters(expr);
  }
  if (isFunction(expr)) {
    return expr;
  }
};
function combineGetters(getters) {
  var compiledGetters = {};
  for (var i = 0, l = getters.length; i < l; i++) {
    var getter = getters[i];
    compiledGetters[getter] = compileGetter(getter);
  }
  return function(obj, options) {
    var result;
    each(compiledGetters, function(name) {
      var value2 = this(obj, options);
      if (void 0 === value2) {
        return;
      }
      var current2 = result || (result = {});
      var path = name.split(".");
      var last = path.length - 1;
      for (var _i = 0; _i < last; _i++) {
        var pathItem = path[_i];
        if (!(pathItem in current2)) {
          current2[pathItem] = {};
        }
        current2 = current2[pathItem];
      }
      current2[path[last]] = value2;
    });
    return result;
  };
}
function toLowerCase(value2, options) {
  return null !== options && void 0 !== options && options.locale ? value2.toLocaleLowerCase(options.locale) : value2.toLowerCase();
}
function toUpperCase(value2, options) {
  return null !== options && void 0 !== options && options.locale ? value2.toLocaleUpperCase(options.locale) : value2.toUpperCase();
}
var ensurePropValueDefined = function(obj, propName, value2, options) {
  if (isDefined(value2)) {
    return value2;
  }
  var newValue = {};
  assignPropValue(obj, propName, newValue, options);
  return newValue;
};
var compileSetter = function(expr) {
  expr = getPathParts(expr || "this");
  var lastLevelIndex = expr.length - 1;
  return function(obj, value2, options) {
    options = prepareOptions(options);
    var currentValue = unwrap(obj, options);
    expr.forEach(function(propertyName, levelIndex) {
      var propertyValue = readPropValue(currentValue, propertyName, options);
      var isPropertyFunc = !options.functionsAsIs && isFunction(propertyValue) && !isWrapped(propertyValue);
      if (levelIndex === lastLevelIndex) {
        if (options.merge && isPlainObject(value2) && (!isDefined(propertyValue) || isPlainObject(propertyValue))) {
          propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
          deepExtendArraySafe(propertyValue, value2, false, true);
        } else if (isPropertyFunc) {
          currentValue[propertyName](value2);
        } else {
          assignPropValue(currentValue, propertyName, value2, options);
        }
      } else {
        propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
        if (isPropertyFunc) {
          propertyValue = propertyValue.call(currentValue);
        }
        currentValue = propertyValue;
      }
    });
  };
};
var toComparable = function(value2, caseSensitive) {
  var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  if (value2 instanceof Date) {
    return value2.getTime();
  }
  if (value2 && value2 instanceof class_default && value2.valueOf) {
    return value2.valueOf();
  }
  if (!caseSensitive && "string" === typeof value2) {
    var _options$collatorOpti, _options$locale;
    if ("base" === (null === options || void 0 === options ? void 0 : null === (_options$collatorOpti = options.collatorOptions) || void 0 === _options$collatorOpti ? void 0 : _options$collatorOpti.sensitivity)) {
      var REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
      value2 = value2.normalize("NFD").replace(REMOVE_DIACRITICAL_MARKS_REGEXP, "");
    }
    var locale = null === options || void 0 === options ? void 0 : null === (_options$locale = options.locale) || void 0 === _options$locale ? void 0 : _options$locale.toLowerCase();
    var useUpperCase = locale && !!["hy", "el"].find((code) => locale === code || locale.startsWith("".concat(code, "-")));
    return (useUpperCase ? toUpperCase : toLowerCase)(value2, options);
  }
  return value2;
};

// node_modules/devextreme/esm/core/utils/common.js
var ensureDefined = function(value2, defaultValue) {
  return isDefined(value2) ? value2 : defaultValue;
};
var executeAsync = function(action, context2) {
  var deferred = new Deferred();
  var normalizedContext = context2 || this;
  var task = {
    promise: deferred.promise(),
    abort: function() {
      clearTimeout(timerId);
      deferred.rejectWith(normalizedContext);
    }
  };
  var callback = function() {
    var result = action.call(normalizedContext);
    if (result && result.done && isFunction(result.done)) {
      result.done(function() {
        deferred.resolveWith(normalizedContext);
      });
    } else {
      deferred.resolveWith(normalizedContext);
    }
  };
  var timerId = (arguments[2] || setTimeout)(callback, "number" === typeof context2 ? context2 : 0);
  return task;
};
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function(name, func, deferred) {
  if (executingName && executingName !== name) {
    delayedFuncs.push(func);
    delayedNames.push(name);
    deferred = deferred || new Deferred();
    delayedDeferreds.push(deferred);
    return deferred;
  } else {
    var oldExecutingName = executingName;
    var currentDelayedCount = delayedDeferreds.length;
    executingName = name;
    var result = func();
    if (!result) {
      if (delayedDeferreds.length > currentDelayedCount) {
        result = when.apply(this, delayedDeferreds.slice(currentDelayedCount));
      } else if (deferred) {
        deferred.resolve();
      }
    }
    executingName = oldExecutingName;
    if (deferred && result && result.done) {
      result.done(deferred.resolve).fail(deferred.reject);
    }
    if (!executingName && delayedFuncs.length) {
      ("render" === delayedNames.shift() ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift());
    }
    return result || when();
  }
};
var deferRender = function(func, deferred) {
  return deferExecute("render", func, deferred);
};
var deferUpdate = function(func, deferred) {
  return deferExecute("update", func, deferred);
};
var deferRenderer = function(func) {
  return function() {
    var that = this;
    return deferExecute("render", function() {
      return func.call(that);
    });
  };
};
var deferUpdater = function(func) {
  return function() {
    var that = this;
    return deferExecute("update", function() {
      return func.call(that);
    });
  };
};
var findBestMatches = function(targetFilter, items, mapFn) {
  var bestMatches = [];
  var maxMatchCount = 0;
  each(items, (index2, itemSrc) => {
    var matchCount = 0;
    var item = mapFn ? mapFn(itemSrc) : itemSrc;
    each(targetFilter, (paramName, targetValue) => {
      var value2 = item[paramName];
      if (void 0 === value2) {
        return;
      }
      if (match(value2, targetValue)) {
        matchCount++;
        return;
      }
      matchCount = -1;
      return false;
    });
    if (matchCount < maxMatchCount) {
      return;
    }
    if (matchCount > maxMatchCount) {
      bestMatches.length = 0;
      maxMatchCount = matchCount;
    }
    bestMatches.push(itemSrc);
  });
  return bestMatches;
};
var match = function(value2, targetValue) {
  if (Array.isArray(value2) && Array.isArray(targetValue)) {
    var mismatch = false;
    each(value2, (index2, valueItem) => {
      if (valueItem !== targetValue[index2]) {
        mismatch = true;
        return false;
      }
    });
    if (mismatch) {
      return false;
    }
    return true;
  }
  if (value2 === targetValue) {
    return true;
  }
  return false;
};
var splitPair = function(raw) {
  var _raw$x, _raw$y;
  switch (type(raw)) {
    case "string":
      return raw.split(/\s+/, 2);
    case "object":
      return [null !== (_raw$x = raw.x) && void 0 !== _raw$x ? _raw$x : raw.h, null !== (_raw$y = raw.y) && void 0 !== _raw$y ? _raw$y : raw.v];
    case "number":
      return [raw];
    case "array":
      return raw;
    default:
      return null;
  }
};
var pairToObject = function(raw, preventRound) {
  var pair = splitPair(raw);
  var h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
  var v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
  if (!isFinite(h)) {
    h = 0;
  }
  if (!isFinite(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getKeyHash = function(key) {
  if (key instanceof guid_default) {
    return key.toString();
  } else if (isObject(key) || Array.isArray(key)) {
    try {
      var keyHash = JSON.stringify(key);
      return "{}" === keyHash ? key : keyHash;
    } catch (e) {
      return key;
    }
  }
  return key;
};
var escapeRegExp = function(string) {
  return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, "\\$&");
};
var applyServerDecimalSeparator = function(value2) {
  var separator = config_default().serverDecimalSeparator;
  if (isDefined(value2)) {
    value2 = value2.toString().replace(".", separator);
  }
  return value2;
};
var noop2 = function() {
};
var asyncNoop = function() {
  return new Deferred().resolve().promise();
};
var grep = function(elements, checkFunction, invert) {
  var result = [];
  var check;
  var expectedCheck = !invert;
  for (var i = 0; i < elements.length; i++) {
    check = !!checkFunction(elements[i], i);
    if (check === expectedCheck) {
      result.push(elements[i]);
    }
  }
  return result;
};
var compareArrays = (array1, array2, depth, options) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return !array1.some((item, idx) => !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
    strict: true
  })));
};
var compareObjects = (object1, object2, depth, options) => {
  var keys1 = Object.keys(object1);
  var keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  var keys2Set = new Set(keys2);
  return !keys1.some((key) => !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options));
};
var DEFAULT_EQUAL_BY_VALUE_OPTS = {
  maxDepth: 3,
  strict: true
};
var compareByValue = (value1, value2, depth, options) => {
  var {
    strict,
    maxDepth
  } = options;
  var comparable1 = toComparable(value1, true);
  var comparable2 = toComparable(value2, true);
  var comparisonResult = strict ? comparable1 === comparable2 : comparable1 == comparable2;
  switch (true) {
    case comparisonResult:
    case depth >= maxDepth:
      return true;
    case (isObject(comparable1) && isObject(comparable2)):
      return compareObjects(comparable1, comparable2, depth, options);
    case (Array.isArray(comparable1) && Array.isArray(comparable2)):
      return compareArrays(comparable1, comparable2, depth, options);
    default:
      return false;
  }
};
var equalByValue = function(value1, value2) {
  var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
  var compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
  return compareByValue(value1, value2, 0, compareOptions);
};

// node_modules/devextreme/esm/core/utils/math.js
var sign = function(value2) {
  if (0 === value2) {
    return 0;
  }
  return value2 / Math.abs(value2);
};
var fitIntoRange = function(value2, minValue, maxValue) {
  var isMinValueUndefined = !minValue && 0 !== minValue;
  var isMaxValueUndefined = !maxValue && 0 !== maxValue;
  isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value2, maxValue) : value2);
  isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value2, minValue) : value2);
  return Math.min(Math.max(value2, minValue), maxValue);
};
var inRange = function(value2, minValue, maxValue) {
  return value2 >= minValue && value2 <= maxValue;
};
function getExponent(value2) {
  return Math.abs(parseInt(value2.toExponential().split("e")[1]));
}
function getExponentialNotation(value2) {
  var parts = value2.toExponential().split("e");
  var mantissa = parseFloat(parts[0]);
  var exponent = parseInt(parts[1]);
  return {
    exponent,
    mantissa
  };
}
function multiplyInExponentialForm(value2, exponentShift) {
  var exponentialNotation = getExponentialNotation(value2);
  return parseFloat("".concat(exponentialNotation.mantissa, "e").concat(exponentialNotation.exponent + exponentShift));
}
function _isEdgeBug() {
  return "0.000300" !== 3e-4.toPrecision(3);
}
function adjust(value2, interval) {
  var precision = getPrecision(interval || 0) + 2;
  var separatedValue = value2.toString().split(".");
  var sourceValue = value2;
  var absValue = Math.abs(value2);
  var separatedAdjustedValue;
  var isExponentValue = isExponential(value2);
  var integerPart = absValue > 1 ? 10 : 0;
  if (1 === separatedValue.length) {
    return value2;
  }
  if (!isExponentValue) {
    if (isExponential(interval)) {
      precision = separatedValue[0].length + getExponent(interval);
    }
    value2 = absValue;
    value2 = value2 - Math.floor(value2) + integerPart;
  }
  precision = _isEdgeBug() && getExponent(value2) > 6 || precision > 7 ? 15 : 7;
  if (!isExponentValue) {
    separatedAdjustedValue = parseFloat(value2.toPrecision(precision)).toString().split(".");
    if (separatedAdjustedValue[0] === integerPart.toString()) {
      return parseFloat(separatedValue[0] + "." + separatedAdjustedValue[1]);
    }
  }
  return parseFloat(sourceValue.toPrecision(precision));
}
function getPrecision(value2) {
  var str = value2.toString();
  if (str.indexOf(".") < 0) {
    return 0;
  }
  var mantissa = str.split(".");
  var positionOfDelimiter = mantissa[1].indexOf("e");
  return positionOfDelimiter >= 0 ? positionOfDelimiter : mantissa[1].length;
}

// node_modules/devextreme/esm/localization/utils.js
var DECIMAL_BASE = 10;
function roundByAbs(value2) {
  var valueSign = sign(value2);
  return valueSign * Math.round(Math.abs(value2));
}
function adjustValue(value2, precision) {
  var precisionMultiplier = Math.pow(DECIMAL_BASE, precision);
  var intermediateValue = multiplyInExponentialForm(value2, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
function toFixed(value2, precision) {
  var valuePrecision = precision || 0;
  var adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value2;
  return adjustedValue.toFixed(valuePrecision);
}

// node_modules/devextreme/esm/localization/ldml/number.js
var DEFAULT_CONFIG = {
  thousandsSeparator: ",",
  decimalSeparator: "."
};
var ESCAPING_CHAR = "'";
var MAXIMUM_NUMBER_LENGTH = 15;
var PERCENT_EXPONENT_SHIFT = 2;
function getGroupSizes(formatString) {
  return formatString.split(",").slice(1).map(function(str) {
    var singleQuotesLeft = 0;
    return str.split("").filter(function(char, index2) {
      singleQuotesLeft += "'" === char;
      var isDigit = "#" === char || "0" === char;
      var isInStub = singleQuotesLeft % 2;
      return isDigit && !isInStub;
    }).length;
  });
}
function getSignParts(format2) {
  var signParts = format2.split(";");
  if (1 === signParts.length) {
    signParts.push("-" + signParts[0]);
  }
  return signParts;
}
function reverseString(str) {
  return str.toString().split("").reverse().join("");
}
function isPercentFormat(format2) {
  return -1 !== format2.indexOf("%") && !format2.match(/'[^']*%[^']*'/g);
}
function removeStubs(str) {
  return str.replace(/'.+'/g, "");
}
function getNonRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  var format2 = removeStubs(floatFormat);
  return format2.length - format2.replace(/[#]/g, "").length;
}
function getRequiredDigitCount(floatFormat) {
  if (!floatFormat) {
    return 0;
  }
  var format2 = removeStubs(floatFormat);
  return format2.length - format2.replace(/[0]/g, "").length;
}
function normalizeValueString(valuePart, minDigitCount, maxDigitCount) {
  if (!valuePart) {
    return "";
  }
  if (valuePart.length > maxDigitCount) {
    valuePart = valuePart.substr(0, maxDigitCount);
  }
  while (valuePart.length > minDigitCount && "0" === valuePart.slice(-1)) {
    valuePart = valuePart.substr(0, valuePart.length - 1);
  }
  while (valuePart.length < minDigitCount) {
    valuePart += "0";
  }
  return valuePart;
}
function applyGroups(valueString, groupSizes, thousandsSeparator) {
  if (!groupSizes.length) {
    return valueString;
  }
  var groups = [];
  var index2 = 0;
  while (valueString) {
    var groupSize = groupSizes[index2];
    if (!groupSize) {
      break;
    }
    groups.push(valueString.slice(0, groupSize));
    valueString = valueString.slice(groupSize);
    if (index2 < groupSizes.length - 1) {
      index2++;
    }
  }
  return groups.join(thousandsSeparator);
}
function formatNumberPart(format2, valueString) {
  return format2.split(ESCAPING_CHAR).map(function(formatPart, escapeIndex) {
    var isEscape = escapeIndex % 2;
    if (!formatPart && isEscape) {
      return ESCAPING_CHAR;
    }
    return isEscape ? formatPart : formatPart.replace(/[,#0]+/, valueString);
  }).join("");
}
function getFloatPointIndex(format2) {
  var isEscape = false;
  for (var index2 = 0; index2 < format2.length; index2++) {
    if ("'" === format2[index2]) {
      isEscape = !isEscape;
    }
    if ("." === format2[index2] && !isEscape) {
      return index2;
    }
  }
  return format2.length;
}
function getFormatter(format2, config2) {
  config2 = config2 || DEFAULT_CONFIG;
  return function(value2) {
    if ("number" !== typeof value2 || isNaN(value2)) {
      return "";
    }
    var signFormatParts = getSignParts(format2);
    var isPositiveZero = 1 / value2 === 1 / 0;
    var isPositive = value2 > 0 || isPositiveZero;
    var numberFormat = signFormatParts[isPositive ? 0 : 1];
    var floatPointIndex = getFloatPointIndex(numberFormat);
    var floatFormatParts = [numberFormat.substr(0, floatPointIndex), numberFormat.substr(floatPointIndex + 1)];
    var minFloatPrecision = getRequiredDigitCount(floatFormatParts[1]);
    var maxFloatPrecision = minFloatPrecision + getNonRequiredDigitCount(floatFormatParts[1]);
    if (isPercentFormat(numberFormat)) {
      value2 = multiplyInExponentialForm(value2, PERCENT_EXPONENT_SHIFT);
    }
    if (!isPositive) {
      value2 = -value2;
    }
    var minIntegerPrecision = getRequiredDigitCount(floatFormatParts[0]);
    var maxIntegerPrecision = getNonRequiredDigitCount(floatFormatParts[0]) || config2.unlimitedIntegerDigits ? void 0 : minIntegerPrecision;
    var integerLength = Math.floor(value2).toString().length;
    var floatPrecision = fitIntoRange(maxFloatPrecision, 0, MAXIMUM_NUMBER_LENGTH - integerLength);
    var groupSizes = getGroupSizes(floatFormatParts[0]).reverse();
    var valueParts = toFixed(value2, floatPrecision < 0 ? 0 : floatPrecision).split(".");
    var valueIntegerPart = normalizeValueString(reverseString(valueParts[0]), minIntegerPrecision, maxIntegerPrecision);
    var valueFloatPart = normalizeValueString(valueParts[1], minFloatPrecision, maxFloatPrecision);
    valueIntegerPart = applyGroups(valueIntegerPart, groupSizes, config2.thousandsSeparator);
    var integerString = reverseString(formatNumberPart(reverseString(floatFormatParts[0]), valueIntegerPart));
    var floatString = maxFloatPrecision ? formatNumberPart(floatFormatParts[1], valueFloatPart) : "";
    var result = integerString + (floatString.match(/\d/) ? config2.decimalSeparator : "") + floatString;
    return result;
  };
}
function parseValue(text, isPercent, isNegative) {
  var value2 = (isPercent ? 0.01 : 1) * parseFloat(text) || 0;
  return isNegative ? -value2 : value2;
}
function prepareValueText(valueText, formatter, isPercent, isIntegerPart) {
  var nextValueText = valueText;
  var char;
  var text;
  var nextText;
  do {
    if (nextText) {
      char = text.length === nextText.length ? "0" : "1";
      valueText = isIntegerPart ? char + valueText : valueText + char;
    }
    text = nextText || formatter(parseValue(nextValueText, isPercent));
    nextValueText = isIntegerPart ? "1" + nextValueText : nextValueText + "1";
    nextText = formatter(parseValue(nextValueText, isPercent));
  } while (text !== nextText && (isIntegerPart ? text.length === nextText.length : text.length <= nextText.length));
  if (isIntegerPart && nextText.length > text.length) {
    var hasGroups = -1 === formatter(12345).indexOf("12345");
    do {
      valueText = "1" + valueText;
    } while (hasGroups && parseValue(valueText, isPercent) < 1e5);
  }
  return valueText;
}
function getFormatByValueText(valueText, formatter, isPercent, isNegative) {
  var format2 = formatter(parseValue(valueText, isPercent, isNegative));
  var valueTextParts = valueText.split(".");
  var valueTextWithModifiedFloat = valueTextParts[0] + ".3" + valueTextParts[1].slice(1);
  var valueWithModifiedFloat = parseValue(valueTextWithModifiedFloat, isPercent, isNegative);
  var decimalSeparatorIndex = formatter(valueWithModifiedFloat).indexOf("3") - 1;
  format2 = format2.replace(/(\d)\D(\d)/g, "$1,$2");
  if (decimalSeparatorIndex >= 0) {
    format2 = format2.slice(0, decimalSeparatorIndex) + "." + format2.slice(decimalSeparatorIndex + 1);
  }
  format2 = format2.replace(/1+/, "1").replace(/1/g, "#");
  if (!isPercent) {
    format2 = format2.replace(/%/g, "'%'");
  }
  return format2;
}
function getFormat(formatter) {
  var valueText = ".";
  var isPercent = formatter(1).indexOf("100") >= 0;
  valueText = prepareValueText(valueText, formatter, isPercent, true);
  valueText = prepareValueText(valueText, formatter, isPercent, false);
  var positiveFormat = getFormatByValueText(valueText, formatter, isPercent, false);
  var negativeFormat = getFormatByValueText(valueText, formatter, isPercent, true);
  return negativeFormat === "-" + positiveFormat ? positiveFormat : positiveFormat + ";" + negativeFormat;
}

// node_modules/devextreme/esm/localization/currency.js
var currency_default = {
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("currency" === format2) {
      formatConfig.precision = formatConfig.precision || 0;
      var result = this.format(value2, extend({}, formatConfig, {
        type: "fixedpoint"
      }));
      var currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
      result = result.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
      return result;
    }
    return this.callBase.apply(this, arguments);
  },
  getCurrencySymbol: function() {
    return {
      symbol: "$"
    };
  },
  getOpenXmlCurrencyFormat: function() {
    return "$#,##0{0}_);\\($#,##0{0}\\)";
  }
};

// node_modules/devextreme/esm/localization/cldr-data/parent_locales.js
var parent_locales_default = {
  "en-150": "en-001",
  "en-AG": "en-001",
  "en-AI": "en-001",
  "en-AU": "en-001",
  "en-BB": "en-001",
  "en-BM": "en-001",
  "en-BS": "en-001",
  "en-BW": "en-001",
  "en-BZ": "en-001",
  "en-CC": "en-001",
  "en-CK": "en-001",
  "en-CM": "en-001",
  "en-CX": "en-001",
  "en-CY": "en-001",
  "en-DG": "en-001",
  "en-DM": "en-001",
  "en-ER": "en-001",
  "en-FJ": "en-001",
  "en-FK": "en-001",
  "en-FM": "en-001",
  "en-GB": "en-001",
  "en-GD": "en-001",
  "en-GG": "en-001",
  "en-GH": "en-001",
  "en-GI": "en-001",
  "en-GM": "en-001",
  "en-GY": "en-001",
  "en-HK": "en-001",
  "en-IE": "en-001",
  "en-IL": "en-001",
  "en-IM": "en-001",
  "en-IN": "en-001",
  "en-IO": "en-001",
  "en-JE": "en-001",
  "en-JM": "en-001",
  "en-KE": "en-001",
  "en-KI": "en-001",
  "en-KN": "en-001",
  "en-KY": "en-001",
  "en-LC": "en-001",
  "en-LR": "en-001",
  "en-LS": "en-001",
  "en-MG": "en-001",
  "en-MO": "en-001",
  "en-MS": "en-001",
  "en-MT": "en-001",
  "en-MU": "en-001",
  "en-MV": "en-001",
  "en-MW": "en-001",
  "en-MY": "en-001",
  "en-NA": "en-001",
  "en-NF": "en-001",
  "en-NG": "en-001",
  "en-NR": "en-001",
  "en-NU": "en-001",
  "en-NZ": "en-001",
  "en-PG": "en-001",
  "en-PK": "en-001",
  "en-PN": "en-001",
  "en-PW": "en-001",
  "en-RW": "en-001",
  "en-SB": "en-001",
  "en-SC": "en-001",
  "en-SD": "en-001",
  "en-SG": "en-001",
  "en-SH": "en-001",
  "en-SL": "en-001",
  "en-SS": "en-001",
  "en-SX": "en-001",
  "en-SZ": "en-001",
  "en-TC": "en-001",
  "en-TK": "en-001",
  "en-TO": "en-001",
  "en-TT": "en-001",
  "en-TV": "en-001",
  "en-TZ": "en-001",
  "en-UG": "en-001",
  "en-VC": "en-001",
  "en-VG": "en-001",
  "en-VU": "en-001",
  "en-WS": "en-001",
  "en-ZA": "en-001",
  "en-ZM": "en-001",
  "en-ZW": "en-001",
  "en-AT": "en-150",
  "en-BE": "en-150",
  "en-CH": "en-150",
  "en-DE": "en-150",
  "en-DK": "en-150",
  "en-FI": "en-150",
  "en-NL": "en-150",
  "en-SE": "en-150",
  "en-SI": "en-150",
  "hi-Latn": "en-IN",
  "es-AR": "es-419",
  "es-BO": "es-419",
  "es-BR": "es-419",
  "es-BZ": "es-419",
  "es-CL": "es-419",
  "es-CO": "es-419",
  "es-CR": "es-419",
  "es-CU": "es-419",
  "es-DO": "es-419",
  "es-EC": "es-419",
  "es-GT": "es-419",
  "es-HN": "es-419",
  "es-MX": "es-419",
  "es-NI": "es-419",
  "es-PA": "es-419",
  "es-PE": "es-419",
  "es-PR": "es-419",
  "es-PY": "es-419",
  "es-SV": "es-419",
  "es-US": "es-419",
  "es-UY": "es-419",
  "es-VE": "es-419",
  nb: "no",
  nn: "no",
  "pt-AO": "pt-PT",
  "pt-CH": "pt-PT",
  "pt-CV": "pt-PT",
  "pt-FR": "pt-PT",
  "pt-GQ": "pt-PT",
  "pt-GW": "pt-PT",
  "pt-LU": "pt-PT",
  "pt-MO": "pt-PT",
  "pt-MZ": "pt-PT",
  "pt-ST": "pt-PT",
  "pt-TL": "pt-PT",
  "az-Arab": "und",
  "az-Cyrl": "und",
  "bal-Latn": "und",
  "blt-Latn": "und",
  "bm-Nkoo": "und",
  "bs-Cyrl": "und",
  "byn-Latn": "und",
  "cu-Glag": "und",
  "dje-Arab": "und",
  "dyo-Arab": "und",
  "en-Dsrt": "und",
  "en-Shaw": "und",
  "ff-Adlm": "und",
  "ff-Arab": "und",
  "ha-Arab": "und",
  "iu-Latn": "und",
  "kk-Arab": "und",
  "ks-Deva": "und",
  "ku-Arab": "und",
  "ky-Arab": "und",
  "ky-Latn": "und",
  "ml-Arab": "und",
  "mn-Mong": "und",
  "mni-Mtei": "und",
  "ms-Arab": "und",
  "pa-Arab": "und",
  "sat-Deva": "und",
  "sd-Deva": "und",
  "sd-Khoj": "und",
  "sd-Sind": "und",
  "shi-Latn": "und",
  "so-Arab": "und",
  "sr-Latn": "und",
  "sw-Arab": "und",
  "tg-Arab": "und",
  "ug-Cyrl": "und",
  "uz-Arab": "und",
  "uz-Cyrl": "und",
  "vai-Latn": "und",
  "wo-Arab": "und",
  "yo-Arab": "und",
  "yue-Hans": "und",
  "zh-Hant": "und",
  "zh-Hant-MO": "zh-Hant-HK"
};

// node_modules/devextreme/esm/localization/parentLocale.js
var PARENT_LOCALE_SEPARATOR = "-";
var parentLocale_default = (parentLocales, locale) => {
  var parentLocale = parentLocales[locale];
  if (parentLocale) {
    return "root" !== parentLocale && parentLocale;
  }
  return locale.substr(0, locale.lastIndexOf(PARENT_LOCALE_SEPARATOR));
};

// node_modules/devextreme/esm/localization/core.js
var DEFAULT_LOCALE = "en";
var core_default = dependency_injector_default({
  locale: /* @__PURE__ */ (() => {
    var currentLocale = DEFAULT_LOCALE;
    return (locale) => {
      if (!locale) {
        return currentLocale;
      }
      currentLocale = locale;
    };
  })(),
  getValueByClosestLocale: function(getter) {
    var locale = this.locale();
    var value2 = getter(locale);
    var isRootLocale;
    while (!value2 && !isRootLocale) {
      locale = parentLocale_default(parent_locales_default, locale);
      if (locale) {
        value2 = getter(locale);
      } else {
        isRootLocale = true;
      }
    }
    if (void 0 === value2 && locale !== DEFAULT_LOCALE) {
      return getter(DEFAULT_LOCALE);
    }
    return value2;
  }
});

// node_modules/devextreme/esm/localization/open_xml_currency_format.js
var open_xml_currency_format_default = (currencySymbol, accountingFormat) => {
  if (!accountingFormat) {
    return;
  }
  var encodedCurrencySymbol = currencySymbol;
  if ("string" === typeof currencySymbol) {
    encodedCurrencySymbol = "";
    for (var i = 0; i < currencySymbol.length; i++) {
      if ("$" !== currencySymbol[i]) {
        encodedCurrencySymbol += "\\";
      }
      encodedCurrencySymbol += currencySymbol[i];
    }
  }
  var encodeSymbols = {
    ".00": "{0}",
    "'": "\\'",
    "\\(": "\\(",
    "\\)": "\\)",
    " ": "\\ ",
    '"': "&quot;",
    "\\¤": encodedCurrencySymbol
  };
  var result = accountingFormat.split(";");
  for (var _i = 0; _i < result.length; _i++) {
    for (var symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result[_i] = result[_i].replace(new RegExp(symbol, "g"), encodeSymbols[symbol]);
      }
    }
  }
  return 2 === result.length ? result[0] + "_);" + result[1] : result[0];
};

// node_modules/devextreme/esm/localization/cldr-data/accounting_formats.js
var accounting_formats_default = {
  af: "¤#,##0.00;(¤#,##0.00)",
  "af-NA": "¤#,##0.00;(¤#,##0.00)",
  agq: "#,##0.00¤",
  ak: "¤#,##0.00",
  am: "¤#,##0.00;(¤#,##0.00)",
  ar: "¤#,##0.00;(¤#,##0.00)",
  "ar-AE": "¤#,##0.00;(¤#,##0.00)",
  "ar-BH": "¤#,##0.00;(¤#,##0.00)",
  "ar-DJ": "¤#,##0.00;(¤#,##0.00)",
  "ar-DZ": "¤#,##0.00;(¤#,##0.00)",
  "ar-EG": "¤#,##0.00;(¤#,##0.00)",
  "ar-EH": "¤#,##0.00;(¤#,##0.00)",
  "ar-ER": "¤#,##0.00;(¤#,##0.00)",
  "ar-IL": "¤#,##0.00;(¤#,##0.00)",
  "ar-IQ": "¤#,##0.00;(¤#,##0.00)",
  "ar-JO": "¤#,##0.00;(¤#,##0.00)",
  "ar-KM": "¤#,##0.00;(¤#,##0.00)",
  "ar-KW": "¤#,##0.00;(¤#,##0.00)",
  "ar-LB": "¤#,##0.00;(¤#,##0.00)",
  "ar-LY": "¤#,##0.00;(¤#,##0.00)",
  "ar-MA": "¤#,##0.00;(¤#,##0.00)",
  "ar-MR": "¤#,##0.00;(¤#,##0.00)",
  "ar-OM": "¤#,##0.00;(¤#,##0.00)",
  "ar-PS": "¤#,##0.00;(¤#,##0.00)",
  "ar-QA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SA": "¤#,##0.00;(¤#,##0.00)",
  "ar-SD": "¤#,##0.00;(¤#,##0.00)",
  "ar-SO": "¤#,##0.00;(¤#,##0.00)",
  "ar-SS": "¤#,##0.00;(¤#,##0.00)",
  "ar-SY": "¤#,##0.00;(¤#,##0.00)",
  "ar-TD": "¤#,##0.00;(¤#,##0.00)",
  "ar-TN": "¤#,##0.00;(¤#,##0.00)",
  "ar-YE": "¤#,##0.00;(¤#,##0.00)",
  as: "¤ #,##,##0.00",
  asa: "#,##0.00 ¤",
  ast: "#,##0.00 ¤",
  az: "#,##0.00 ¤",
  "az-Cyrl": "#,##0.00 ¤",
  "az-Latn": "#,##0.00 ¤",
  bas: "#,##0.00 ¤",
  be: "#,##0.00 ¤",
  "be-tarask": "#,##0.00 ¤",
  bem: "¤#,##0.00;(¤#,##0.00)",
  bez: "#,##0.00¤",
  bg: "0.00 ¤;(0.00 ¤)",
  bm: "¤#,##0.00;(¤#,##0.00)",
  bn: "#,##,##0.00¤;(#,##,##0.00¤)",
  "bn-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  bo: "¤ #,##0.00",
  "bo-IN": "¤ #,##0.00",
  br: "#,##0.00 ¤",
  brx: "¤ #,##,##0.00",
  bs: "#,##0.00 ¤",
  "bs-Cyrl": "#,##0.00 ¤",
  "bs-Latn": "#,##0.00 ¤",
  ca: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-AD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-ES-valencia": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-FR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "ca-IT": "#,##0.00 ¤;(#,##0.00 ¤)",
  ccp: "#,##,##0.00¤;(#,##,##0.00¤)",
  "ccp-IN": "#,##,##0.00¤;(#,##,##0.00¤)",
  ce: "#,##0.00 ¤",
  ceb: "¤#,##0.00;(¤#,##0.00)",
  cgg: "¤#,##0.00",
  chr: "¤#,##0.00;(¤#,##0.00)",
  ckb: "¤ #,##0.00",
  "ckb-IR": "¤ #,##0.00",
  cs: "#,##0.00 ¤",
  cy: "¤#,##0.00;(¤#,##0.00)",
  da: "#,##0.00 ¤",
  "da-GL": "#,##0.00 ¤",
  dav: "¤#,##0.00;(¤#,##0.00)",
  de: "#,##0.00 ¤",
  "de-AT": "#,##0.00 ¤",
  "de-BE": "#,##0.00 ¤",
  "de-CH": "#,##0.00 ¤",
  "de-IT": "#,##0.00 ¤",
  "de-LI": "#,##0.00 ¤",
  "de-LU": "#,##0.00 ¤",
  dje: "#,##0.00¤",
  doi: "¤#,##0.00",
  dsb: "#,##0.00 ¤",
  dua: "#,##0.00 ¤",
  dyo: "#,##0.00 ¤",
  dz: "¤#,##,##0.00",
  ebu: "¤#,##0.00;(¤#,##0.00)",
  ee: "¤#,##0.00;(¤#,##0.00)",
  "ee-TG": "¤#,##0.00;(¤#,##0.00)",
  el: "#,##0.00 ¤",
  "el-CY": "#,##0.00 ¤",
  en: "¤#,##0.00;(¤#,##0.00)",
  "en-001": "¤#,##0.00;(¤#,##0.00)",
  "en-150": "#,##0.00 ¤",
  "en-AE": "¤#,##0.00;(¤#,##0.00)",
  "en-AG": "¤#,##0.00;(¤#,##0.00)",
  "en-AI": "¤#,##0.00;(¤#,##0.00)",
  "en-AS": "¤#,##0.00;(¤#,##0.00)",
  "en-AT": "¤ #,##0.00",
  "en-AU": "¤#,##0.00;(¤#,##0.00)",
  "en-BB": "¤#,##0.00;(¤#,##0.00)",
  "en-BE": "#,##0.00 ¤",
  "en-BI": "¤#,##0.00;(¤#,##0.00)",
  "en-BM": "¤#,##0.00;(¤#,##0.00)",
  "en-BS": "¤#,##0.00;(¤#,##0.00)",
  "en-BW": "¤#,##0.00;(¤#,##0.00)",
  "en-BZ": "¤#,##0.00;(¤#,##0.00)",
  "en-CA": "¤#,##0.00;(¤#,##0.00)",
  "en-CC": "¤#,##0.00;(¤#,##0.00)",
  "en-CH": "¤ #,##0.00;¤-#,##0.00",
  "en-CK": "¤#,##0.00;(¤#,##0.00)",
  "en-CM": "¤#,##0.00;(¤#,##0.00)",
  "en-CX": "¤#,##0.00;(¤#,##0.00)",
  "en-CY": "¤#,##0.00;(¤#,##0.00)",
  "en-DE": "#,##0.00 ¤",
  "en-DG": "¤#,##0.00;(¤#,##0.00)",
  "en-DK": "#,##0.00 ¤",
  "en-DM": "¤#,##0.00;(¤#,##0.00)",
  "en-ER": "¤#,##0.00;(¤#,##0.00)",
  "en-FI": "#,##0.00 ¤",
  "en-FJ": "¤#,##0.00;(¤#,##0.00)",
  "en-FK": "¤#,##0.00;(¤#,##0.00)",
  "en-FM": "¤#,##0.00;(¤#,##0.00)",
  "en-GB": "¤#,##0.00;(¤#,##0.00)",
  "en-GD": "¤#,##0.00;(¤#,##0.00)",
  "en-GG": "¤#,##0.00;(¤#,##0.00)",
  "en-GH": "¤#,##0.00;(¤#,##0.00)",
  "en-GI": "¤#,##0.00;(¤#,##0.00)",
  "en-GM": "¤#,##0.00;(¤#,##0.00)",
  "en-GU": "¤#,##0.00;(¤#,##0.00)",
  "en-GY": "¤#,##0.00;(¤#,##0.00)",
  "en-HK": "¤#,##0.00;(¤#,##0.00)",
  "en-IE": "¤#,##0.00;(¤#,##0.00)",
  "en-IL": "¤#,##0.00;(¤#,##0.00)",
  "en-IM": "¤#,##0.00;(¤#,##0.00)",
  "en-IN": "¤#,##0.00;(¤#,##0.00)",
  "en-IO": "¤#,##0.00;(¤#,##0.00)",
  "en-JE": "¤#,##0.00;(¤#,##0.00)",
  "en-JM": "¤#,##0.00;(¤#,##0.00)",
  "en-KE": "¤#,##0.00;(¤#,##0.00)",
  "en-KI": "¤#,##0.00;(¤#,##0.00)",
  "en-KN": "¤#,##0.00;(¤#,##0.00)",
  "en-KY": "¤#,##0.00;(¤#,##0.00)",
  "en-LC": "¤#,##0.00;(¤#,##0.00)",
  "en-LR": "¤#,##0.00;(¤#,##0.00)",
  "en-LS": "¤#,##0.00;(¤#,##0.00)",
  "en-MG": "¤#,##0.00;(¤#,##0.00)",
  "en-MH": "¤#,##0.00;(¤#,##0.00)",
  "en-MO": "¤#,##0.00;(¤#,##0.00)",
  "en-MP": "¤#,##0.00;(¤#,##0.00)",
  "en-MS": "¤#,##0.00;(¤#,##0.00)",
  "en-MT": "¤#,##0.00;(¤#,##0.00)",
  "en-MU": "¤#,##0.00;(¤#,##0.00)",
  "en-MV": "¤ #,##0.00",
  "en-MW": "¤#,##0.00;(¤#,##0.00)",
  "en-MY": "¤#,##0.00;(¤#,##0.00)",
  "en-NA": "¤#,##0.00;(¤#,##0.00)",
  "en-NF": "¤#,##0.00;(¤#,##0.00)",
  "en-NG": "¤#,##0.00;(¤#,##0.00)",
  "en-NL": "¤ #,##0.00;(¤ #,##0.00)",
  "en-NR": "¤#,##0.00;(¤#,##0.00)",
  "en-NU": "¤#,##0.00;(¤#,##0.00)",
  "en-NZ": "¤#,##0.00;(¤#,##0.00)",
  "en-PG": "¤#,##0.00;(¤#,##0.00)",
  "en-PH": "¤#,##0.00;(¤#,##0.00)",
  "en-PK": "¤#,##0.00;(¤#,##0.00)",
  "en-PN": "¤#,##0.00;(¤#,##0.00)",
  "en-PR": "¤#,##0.00;(¤#,##0.00)",
  "en-PW": "¤#,##0.00;(¤#,##0.00)",
  "en-RW": "¤#,##0.00;(¤#,##0.00)",
  "en-SB": "¤#,##0.00;(¤#,##0.00)",
  "en-SC": "¤#,##0.00;(¤#,##0.00)",
  "en-SD": "¤#,##0.00;(¤#,##0.00)",
  "en-SE": "#,##0.00 ¤",
  "en-SG": "¤#,##0.00;(¤#,##0.00)",
  "en-SH": "¤#,##0.00;(¤#,##0.00)",
  "en-SI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "en-SL": "¤#,##0.00;(¤#,##0.00)",
  "en-SS": "¤#,##0.00;(¤#,##0.00)",
  "en-SX": "¤#,##0.00;(¤#,##0.00)",
  "en-SZ": "¤#,##0.00;(¤#,##0.00)",
  "en-TC": "¤#,##0.00;(¤#,##0.00)",
  "en-TK": "¤#,##0.00;(¤#,##0.00)",
  "en-TO": "¤#,##0.00;(¤#,##0.00)",
  "en-TT": "¤#,##0.00;(¤#,##0.00)",
  "en-TV": "¤#,##0.00;(¤#,##0.00)",
  "en-TZ": "¤#,##0.00;(¤#,##0.00)",
  "en-UG": "¤#,##0.00;(¤#,##0.00)",
  "en-UM": "¤#,##0.00;(¤#,##0.00)",
  "en-VC": "¤#,##0.00;(¤#,##0.00)",
  "en-VG": "¤#,##0.00;(¤#,##0.00)",
  "en-VI": "¤#,##0.00;(¤#,##0.00)",
  "en-VU": "¤#,##0.00;(¤#,##0.00)",
  "en-WS": "¤#,##0.00;(¤#,##0.00)",
  "en-ZA": "¤#,##0.00;(¤#,##0.00)",
  "en-ZM": "¤#,##0.00;(¤#,##0.00)",
  "en-ZW": "¤#,##0.00;(¤#,##0.00)",
  eo: "¤ #,##0.00",
  es: "#,##0.00 ¤",
  "es-419": "¤#,##0.00",
  "es-AR": "¤ #,##0.00;(¤ #,##0.00)",
  "es-BO": "¤#,##0.00",
  "es-BR": "¤#,##0.00",
  "es-BZ": "¤#,##0.00",
  "es-CL": "¤#,##0.00",
  "es-CO": "¤#,##0.00",
  "es-CR": "¤#,##0.00",
  "es-CU": "¤#,##0.00",
  "es-DO": "¤#,##0.00;(¤#,##0.00)",
  "es-EA": "#,##0.00 ¤",
  "es-EC": "¤#,##0.00",
  "es-GQ": "#,##0.00 ¤",
  "es-GT": "¤#,##0.00",
  "es-HN": "¤#,##0.00",
  "es-IC": "#,##0.00 ¤",
  "es-MX": "¤#,##0.00",
  "es-NI": "¤#,##0.00",
  "es-PA": "¤#,##0.00",
  "es-PE": "¤#,##0.00",
  "es-PH": "#,##0.00 ¤",
  "es-PR": "¤#,##0.00",
  "es-PY": "¤#,##0.00",
  "es-SV": "¤#,##0.00",
  "es-US": "¤#,##0.00",
  "es-UY": "¤ #,##0.00;(¤ #,##0.00)",
  "es-VE": "¤#,##0.00",
  et: "#,##0.00 ¤;(#,##0.00 ¤)",
  eu: "#,##0.00 ¤;(#,##0.00 ¤)",
  ewo: "#,##0.00 ¤",
  fa: "‎¤ #,##0.00;‎(¤ #,##0.00)",
  "fa-AF": "¤ #,##0.00;‎(¤ #,##0.00)",
  ff: "#,##0.00 ¤",
  "ff-Adlm": "¤ #,##0.00",
  "ff-Adlm-BF": "¤ #,##0.00",
  "ff-Adlm-CM": "¤ #,##0.00",
  "ff-Adlm-GH": "¤ #,##0.00",
  "ff-Adlm-GM": "¤ #,##0.00",
  "ff-Adlm-GW": "¤ #,##0.00",
  "ff-Adlm-LR": "¤ #,##0.00",
  "ff-Adlm-MR": "¤ #,##0.00",
  "ff-Adlm-NE": "¤ #,##0.00",
  "ff-Adlm-NG": "¤ #,##0.00",
  "ff-Adlm-SL": "¤ #,##0.00",
  "ff-Adlm-SN": "¤ #,##0.00",
  "ff-Latn": "#,##0.00 ¤",
  "ff-Latn-BF": "#,##0.00 ¤",
  "ff-Latn-CM": "#,##0.00 ¤",
  "ff-Latn-GH": "#,##0.00 ¤",
  "ff-Latn-GM": "#,##0.00 ¤",
  "ff-Latn-GN": "#,##0.00 ¤",
  "ff-Latn-GW": "#,##0.00 ¤",
  "ff-Latn-LR": "#,##0.00 ¤",
  "ff-Latn-MR": "#,##0.00 ¤",
  "ff-Latn-NE": "#,##0.00 ¤",
  "ff-Latn-NG": "#,##0.00 ¤",
  "ff-Latn-SL": "#,##0.00 ¤",
  fi: "#,##0.00 ¤",
  fil: "¤#,##0.00;(¤#,##0.00)",
  fo: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fo-DK": "#,##0.00 ¤;(#,##0.00 ¤)",
  fr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-BL": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CI": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-CM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DJ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-DZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GP": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-HT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-KM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-ML": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MR": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-MU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-NE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-PM": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RE": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-RW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SC": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-SY": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TD": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TG": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-TN": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-VU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-WF": "#,##0.00 ¤;(#,##0.00 ¤)",
  "fr-YT": "#,##0.00 ¤;(#,##0.00 ¤)",
  fur: "¤ #,##0.00",
  fy: "¤ #,##0.00;(¤ #,##0.00)",
  ga: "¤#,##0.00;(¤#,##0.00)",
  "ga-GB": "¤#,##0.00;(¤#,##0.00)",
  gd: "¤#,##0.00;(¤#,##0.00)",
  gl: "#,##0.00 ¤",
  gsw: "#,##0.00 ¤",
  "gsw-FR": "#,##0.00 ¤",
  "gsw-LI": "#,##0.00 ¤",
  gu: "¤#,##,##0.00;(¤#,##,##0.00)",
  guz: "¤#,##0.00;(¤#,##0.00)",
  gv: "¤#,##0.00",
  ha: "¤ #,##0.00",
  "ha-GH": "¤ #,##0.00",
  "ha-NE": "¤ #,##0.00",
  haw: "¤#,##0.00;(¤#,##0.00)",
  he: "#,##0.00 ¤",
  hi: "¤#,##,##0.00",
  "hi-Latn": "¤#,##,##0.00",
  hr: "#,##0.00 ¤",
  "hr-BA": "#,##0.00 ¤",
  hsb: "#,##0.00 ¤",
  hu: "#,##0.00 ¤",
  hy: "#,##0.00 ¤",
  ia: "¤ #,##0.00;(¤ #,##0.00)",
  id: "¤#,##0.00",
  ig: "¤#,##0.00;(¤#,##0.00)",
  ii: "¤ #,##0.00",
  is: "#,##0.00 ¤",
  it: "#,##0.00 ¤",
  "it-CH": "#,##0.00 ¤",
  "it-SM": "#,##0.00 ¤",
  "it-VA": "#,##0.00 ¤",
  ja: "¤#,##0.00;(¤#,##0.00)",
  jgo: "¤ #,##0.00",
  jmc: "¤#,##0.00",
  jv: "¤ #,##0.00",
  ka: "#,##0.00 ¤",
  kab: "#,##0.00¤",
  kam: "¤#,##0.00;(¤#,##0.00)",
  kde: "¤#,##0.00;(¤#,##0.00)",
  kea: "#,##0.00 ¤;(#,##0.00 ¤)",
  kgp: "¤ #,##0.00",
  khq: "#,##0.00¤",
  ki: "¤#,##0.00;(¤#,##0.00)",
  kk: "#,##0.00 ¤",
  kkj: "¤ #,##0.00",
  kl: "¤#,##0.00;¤-#,##0.00",
  kln: "¤#,##0.00;(¤#,##0.00)",
  km: "#,##0.00¤;(#,##0.00¤)",
  kn: "¤#,##0.00;(¤#,##0.00)",
  ko: "¤#,##0.00;(¤#,##0.00)",
  "ko-KP": "¤#,##0.00;(¤#,##0.00)",
  kok: "¤#,##0.00;(¤#,##0.00)",
  ks: "¤#,##0.00",
  "ks-Arab": "¤#,##0.00",
  "ks-Deva": "¤ #,##0.00",
  ksb: "#,##0.00¤",
  ksf: "#,##0.00 ¤",
  ksh: "#,##0.00 ¤",
  ku: "#,##0.00 ¤;(#,##0.00 ¤)",
  kw: "¤#,##0.00",
  ky: "#,##0.00 ¤",
  lag: "¤ #,##0.00",
  lb: "#,##0.00 ¤",
  lg: "#,##0.00¤",
  lkt: "¤ #,##0.00",
  ln: "#,##0.00 ¤",
  "ln-AO": "#,##0.00 ¤",
  "ln-CF": "#,##0.00 ¤",
  "ln-CG": "#,##0.00 ¤",
  lo: "¤#,##0.00;¤-#,##0.00",
  lrc: "¤ #,##0.00",
  "lrc-IQ": "¤ #,##0.00",
  lt: "#,##0.00 ¤",
  lu: "#,##0.00¤",
  luo: "#,##0.00¤",
  luy: "¤#,##0.00;¤- #,##0.00",
  lv: "#,##0.00 ¤",
  mai: "¤ #,##0.00",
  mas: "¤#,##0.00;(¤#,##0.00)",
  "mas-TZ": "¤#,##0.00;(¤#,##0.00)",
  mer: "¤#,##0.00;(¤#,##0.00)",
  mfe: "¤ #,##0.00",
  mg: "¤#,##0.00",
  mgh: "¤ #,##0.00",
  mgo: "¤ #,##0.00",
  mi: "¤ #,##0.00",
  mk: "#,##0.00 ¤",
  ml: "¤#,##0.00;(¤#,##0.00)",
  mn: "¤ #,##0.00",
  mni: "¤ #,##0.00",
  "mni-Beng": "¤ #,##0.00",
  mr: "¤#,##0.00;(¤#,##0.00)",
  ms: "¤#,##0.00;(¤#,##0.00)",
  "ms-BN": "¤#,##0.00;(¤#,##0.00)",
  "ms-ID": "¤#,##0.00",
  "ms-SG": "¤#,##0.00;(¤#,##0.00)",
  mt: "¤#,##0.00",
  mua: "¤#,##0.00;(¤#,##0.00)",
  my: "¤ #,##0.00",
  mzn: "¤ #,##0.00",
  naq: "¤#,##0.00",
  nb: "¤ #,##0.00;(¤ #,##0.00)",
  "nb-SJ": "¤ #,##0.00;(¤ #,##0.00)",
  nd: "¤#,##0.00;(¤#,##0.00)",
  nds: "¤ #,##0.00",
  "nds-NL": "¤ #,##0.00",
  ne: "¤ #,##,##0.00",
  "ne-IN": "¤ #,##,##0.00",
  nl: "¤ #,##0.00;(¤ #,##0.00)",
  "nl-AW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BE": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-BQ": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-CW": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SR": "¤ #,##0.00;(¤ #,##0.00)",
  "nl-SX": "¤ #,##0.00;(¤ #,##0.00)",
  nmg: "#,##0.00 ¤",
  nn: "#,##0.00 ¤",
  nnh: "¤ #,##0.00",
  no: "¤ #,##0.00;(¤ #,##0.00)",
  nus: "¤#,##0.00;(¤#,##0.00)",
  nyn: "¤#,##0.00",
  om: "¤#,##0.00",
  "om-KE": "¤#,##0.00",
  or: "¤#,##0.00;(¤#,##0.00)",
  os: "¤ #,##0.00",
  "os-RU": "¤ #,##0.00",
  pa: "¤ #,##0.00",
  "pa-Arab": "¤ #,##0.00",
  "pa-Guru": "¤ #,##0.00",
  pcm: "¤#,##0.00",
  pl: "#,##0.00 ¤;(#,##0.00 ¤)",
  ps: "¤#,##0.00;(¤#,##0.00)",
  "ps-PK": "¤#,##0.00;(¤#,##0.00)",
  pt: "¤ #,##0.00",
  "pt-AO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CH": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-CV": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GQ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-GW": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-LU": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MO": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-MZ": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-PT": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-ST": "#,##0.00 ¤;(#,##0.00 ¤)",
  "pt-TL": "#,##0.00 ¤;(#,##0.00 ¤)",
  qu: "¤ #,##0.00",
  "qu-BO": "¤ #,##0.00",
  "qu-EC": "¤ #,##0.00",
  rm: "#,##0.00 ¤",
  rn: "#,##0.00¤",
  ro: "#,##0.00 ¤;(#,##0.00 ¤)",
  "ro-MD": "#,##0.00 ¤;(#,##0.00 ¤)",
  rof: "¤#,##0.00",
  ru: "#,##0.00 ¤",
  "ru-BY": "#,##0.00 ¤",
  "ru-KG": "#,##0.00 ¤",
  "ru-KZ": "#,##0.00 ¤",
  "ru-MD": "#,##0.00 ¤",
  "ru-UA": "#,##0.00 ¤",
  rw: "¤ #,##0.00",
  rwk: "#,##0.00¤",
  sa: "¤ #,##0.00",
  sah: "#,##0.00 ¤",
  saq: "¤#,##0.00;(¤#,##0.00)",
  sat: "¤ #,##0.00",
  "sat-Olck": "¤ #,##0.00",
  sbp: "#,##0.00¤",
  sc: "#,##0.00 ¤",
  sd: "¤ #,##0.00",
  "sd-Arab": "¤ #,##0.00",
  "sd-Deva": "¤ #,##0.00",
  se: "#,##0.00 ¤",
  "se-FI": "#,##0.00 ¤",
  "se-SE": "#,##0.00 ¤",
  seh: "#,##0.00¤",
  ses: "#,##0.00¤",
  sg: "¤#,##0.00;¤-#,##0.00",
  shi: "#,##0.00¤",
  "shi-Latn": "#,##0.00¤",
  "shi-Tfng": "#,##0.00¤",
  si: "¤#,##0.00;(¤#,##0.00)",
  sk: "#,##0.00 ¤;(#,##0.00 ¤)",
  sl: "#,##0.00 ¤;(#,##0.00 ¤)",
  smn: "#,##0.00 ¤",
  sn: "¤#,##0.00;(¤#,##0.00)",
  so: "¤#,##0.00;(¤#,##0.00)",
  "so-DJ": "¤#,##0.00;(¤#,##0.00)",
  "so-ET": "¤#,##0.00;(¤#,##0.00)",
  "so-KE": "¤#,##0.00;(¤#,##0.00)",
  sq: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-MK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sq-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  sr: "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Cyrl-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-BA": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-ME": "#,##0.00 ¤;(#,##0.00 ¤)",
  "sr-Latn-XK": "#,##0.00 ¤;(#,##0.00 ¤)",
  su: "¤#,##0.00",
  "su-Latn": "¤#,##0.00",
  sv: "#,##0.00 ¤",
  "sv-AX": "#,##0.00 ¤",
  "sv-FI": "#,##0.00 ¤",
  sw: "¤ #,##0.00",
  "sw-CD": "¤ #,##0.00",
  "sw-KE": "¤ #,##0.00",
  "sw-UG": "¤ #,##0.00",
  ta: "¤#,##0.00;(¤#,##0.00)",
  "ta-LK": "¤#,##0.00;(¤#,##0.00)",
  "ta-MY": "¤#,##0.00;(¤#,##0.00)",
  "ta-SG": "¤#,##0.00;(¤#,##0.00)",
  te: "¤#,##0.00;(¤#,##0.00)",
  teo: "¤#,##0.00;(¤#,##0.00)",
  "teo-KE": "¤#,##0.00;(¤#,##0.00)",
  tg: "#,##0.00 ¤",
  th: "¤#,##0.00;(¤#,##0.00)",
  ti: "¤#,##0.00",
  "ti-ER": "¤#,##0.00",
  tk: "#,##0.00 ¤",
  to: "¤ #,##0.00",
  tr: "¤#,##0.00;(¤#,##0.00)",
  "tr-CY": "¤#,##0.00;(¤#,##0.00)",
  tt: "#,##0.00 ¤",
  twq: "#,##0.00¤",
  tzm: "#,##0.00 ¤",
  ug: "¤#,##0.00;(¤#,##0.00)",
  uk: "#,##0.00 ¤",
  und: "¤ #,##0.00",
  ur: "¤#,##0.00;(¤#,##0.00)",
  "ur-IN": "¤#,##0.00;(¤#,##0.00)",
  uz: "#,##0.00 ¤",
  "uz-Arab": "¤ #,##0.00",
  "uz-Cyrl": "#,##0.00 ¤",
  "uz-Latn": "#,##0.00 ¤",
  vai: "¤#,##0.00;(¤#,##0.00)",
  "vai-Latn": "¤#,##0.00;(¤#,##0.00)",
  "vai-Vaii": "¤#,##0.00;(¤#,##0.00)",
  vi: "#,##0.00 ¤",
  vun: "¤#,##0.00",
  wae: "¤ #,##0.00",
  wo: "¤ #,##0.00",
  xh: "¤#,##0.00",
  xog: "#,##0.00 ¤",
  yav: "#,##0.00 ¤;(#,##0.00 ¤)",
  yi: "¤ #,##0.00",
  yo: "¤#,##0.00;(¤#,##0.00)",
  "yo-BJ": "¤#,##0.00;(¤#,##0.00)",
  yrl: "¤ #,##0.00",
  "yrl-CO": "¤ #,##0.00",
  "yrl-VE": "¤ #,##0.00",
  yue: "¤#,##0.00;(¤#,##0.00)",
  "yue-Hans": "¤#,##0.00;(¤#,##0.00)",
  "yue-Hant": "¤#,##0.00;(¤#,##0.00)",
  zgh: "#,##0.00¤",
  zh: "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-MO": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hans-SG": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-HK": "¤#,##0.00;(¤#,##0.00)",
  "zh-Hant-MO": "¤#,##0.00;(¤#,##0.00)",
  zu: "¤#,##0.00;(¤#,##0.00)"
};

// node_modules/devextreme/esm/localization/intl/number.js
var CURRENCY_STYLES = ["standard", "accounting"];
var MAX_FRACTION_DIGITS = 20;
var detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var formattersCache = {};
var getFormatter2 = (format2) => {
  var key = core_default.locale() + "/" + JSON.stringify(format2);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.NumberFormat(core_default.locale(), format2).format;
  }
  return formattersCache[key];
};
var getCurrencyFormatter = (currency) => new Intl.NumberFormat(core_default.locale(), {
  style: "currency",
  currency
});
var number_default = {
  engine: function() {
    return "intl";
  },
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("exponential" === format2) {
      return this.callBase.apply(this, arguments);
    }
    return getFormatter2(this._normalizeFormatConfig(format2, formatConfig, value2))(value2);
  },
  _normalizeFormatConfig: function(format2, formatConfig, value2) {
    var config2;
    if ("decimal" === format2) {
      var fractionDigits = String(value2).split(".")[1];
      config2 = {
        minimumIntegerDigits: formatConfig.precision || void 0,
        useGrouping: false,
        maximumFractionDigits: fractionDigits && fractionDigits.length,
        round: value2 < 0 ? "ceil" : "floor"
      };
    } else {
      config2 = this._getPrecisionConfig(formatConfig.precision);
    }
    if ("percent" === format2) {
      config2.style = "percent";
    } else if ("currency" === format2) {
      var _formatConfig$useCurr;
      var useAccountingStyle = null !== (_formatConfig$useCurr = formatConfig.useCurrencyAccountingStyle) && void 0 !== _formatConfig$useCurr ? _formatConfig$useCurr : config_default().defaultUseCurrencyAccountingStyle;
      config2.style = "currency";
      config2.currency = formatConfig.currency || config_default().defaultCurrency;
      config2.currencySign = CURRENCY_STYLES[+useAccountingStyle];
    }
    return config2;
  },
  _getPrecisionConfig: function(precision) {
    var config2;
    if (null === precision) {
      config2 = {
        minimumFractionDigits: 0,
        maximumFractionDigits: MAX_FRACTION_DIGITS
      };
    } else {
      config2 = {
        minimumFractionDigits: precision || 0,
        maximumFractionDigits: precision || 0
      };
    }
    return config2;
  },
  format: function(value2, _format) {
    if ("number" !== typeof value2) {
      return value2;
    }
    _format = this._normalizeFormat(_format);
    if ("default" === _format.currency) {
      _format.currency = config_default().defaultCurrency;
    }
    if (!_format || "function" !== typeof _format && !_format.type && !_format.formatter) {
      return getFormatter2(_format)(value2);
    }
    return this.callBase.apply(this, arguments);
  },
  _getCurrencySymbolInfo: function(currency) {
    var formatter = getCurrencyFormatter(currency);
    return this._extractCurrencySymbolInfo(formatter.format(0));
  },
  _extractCurrencySymbolInfo: function(currencyValueString) {
    var match2 = detectCurrencySymbolRegex.exec(currencyValueString) || [];
    var position2 = match2[1] ? "before" : "after";
    var symbol = match2[1] || match2[4] || "";
    var delimiter = match2[2] || match2[3] || "";
    return {
      position: position2,
      symbol,
      delimiter
    };
  },
  getCurrencySymbol: function(currency) {
    if (!currency) {
      currency = config_default().defaultCurrency;
    }
    var symbolInfo = this._getCurrencySymbolInfo(currency);
    return {
      symbol: symbolInfo.symbol
    };
  },
  getOpenXmlCurrencyFormat: function(currency) {
    var targetCurrency = currency || config_default().defaultCurrency;
    var currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
    var closestAccountingFormat = core_default.getValueByClosestLocale((locale) => accounting_formats_default[locale]);
    return open_xml_currency_format_default(currencySymbol, closestAccountingFormat);
  }
};

// node_modules/devextreme/esm/localization/number.js
var hasIntl = "undefined" !== typeof Intl;
var MAX_LARGE_NUMBER_POWER = 4;
var DECIMAL_BASE2 = 10;
var NUMERIC_FORMATS = ["currency", "fixedpoint", "exponential", "percent", "decimal"];
var LargeNumberFormatPostfixes = {
  1: "K",
  2: "M",
  3: "B",
  4: "T"
};
var LargeNumberFormatPowers = {
  largenumber: "auto",
  thousands: 1,
  millions: 2,
  billions: 3,
  trillions: 4
};
var numberLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  numericFormats: NUMERIC_FORMATS,
  defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
  _parseNumberFormatString: function(formatType) {
    var formatObject = {};
    if (!formatType || "string" !== typeof formatType) {
      return;
    }
    var formatList = formatType.toLowerCase().split(" ");
    each(formatList, (index2, value2) => {
      if (NUMERIC_FORMATS.includes(value2)) {
        formatObject.formatType = value2;
      } else if (value2 in LargeNumberFormatPowers) {
        formatObject.power = LargeNumberFormatPowers[value2];
      }
    });
    if (formatObject.power && !formatObject.formatType) {
      formatObject.formatType = "fixedpoint";
    }
    if (formatObject.formatType) {
      return formatObject;
    }
  },
  _calculateNumberPower: function(value2, base2, minPower, maxPower) {
    var number = Math.abs(value2);
    var power = 0;
    if (number > 1) {
      while (number && number >= base2 && (void 0 === maxPower || power < maxPower)) {
        power++;
        number /= base2;
      }
    } else if (number > 0 && number < 1) {
      while (number < 1 && (void 0 === minPower || power > minPower)) {
        power--;
        number *= base2;
      }
    }
    return power;
  },
  _getNumberByPower: function(number, power, base2) {
    var result = number;
    while (power > 0) {
      result /= base2;
      power--;
    }
    while (power < 0) {
      result *= base2;
      power++;
    }
    return result;
  },
  _formatNumber: function(value2, formatObject, formatConfig) {
    if ("auto" === formatObject.power) {
      formatObject.power = this._calculateNumberPower(value2, 1e3, 0, MAX_LARGE_NUMBER_POWER);
    }
    if (formatObject.power) {
      value2 = this._getNumberByPower(value2, formatObject.power, 1e3);
    }
    var powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || "";
    var result = this._formatNumberCore(value2, formatObject.formatType, formatConfig);
    result = result.replace(/(\d|.$)(\D*)$/, "$1" + powerPostfix + "$2");
    return result;
  },
  _formatNumberExponential: function(value2, formatConfig) {
    var power = this._calculateNumberPower(value2, DECIMAL_BASE2);
    var number = this._getNumberByPower(value2, power, DECIMAL_BASE2);
    if (void 0 === formatConfig.precision) {
      formatConfig.precision = 1;
    }
    if (number.toFixed(formatConfig.precision || 0) >= DECIMAL_BASE2) {
      power++;
      number /= DECIMAL_BASE2;
    }
    var powString = (power >= 0 ? "+" : "") + power.toString();
    return this._formatNumberCore(number, "fixedpoint", formatConfig) + "E" + powString;
  },
  _addZeroes: function(value2, precision) {
    var multiplier = Math.pow(10, precision);
    var sign2 = value2 < 0 ? "-" : "";
    value2 = (Math.abs(value2) * multiplier >>> 0) / multiplier;
    var result = value2.toString();
    while (result.length < precision) {
      result = "0" + result;
    }
    return sign2 + result;
  },
  _addGroupSeparators: function(value2) {
    var parts = value2.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config_default().thousandsSeparator) + (parts[1] ? config_default().decimalSeparator + parts[1] : "");
  },
  _formatNumberCore: function(value2, format2, formatConfig) {
    if ("exponential" === format2) {
      return this._formatNumberExponential(value2, formatConfig);
    }
    if ("decimal" !== format2 && null !== formatConfig.precision) {
      formatConfig.precision = formatConfig.precision || 0;
    }
    if ("percent" === format2) {
      value2 *= 100;
    }
    if (void 0 !== formatConfig.precision) {
      if ("decimal" === format2) {
        value2 = this._addZeroes(value2, formatConfig.precision);
      } else {
        value2 = null === formatConfig.precision ? value2.toPrecision() : toFixed(value2, formatConfig.precision);
      }
    }
    if ("decimal" !== format2) {
      value2 = this._addGroupSeparators(value2);
    } else {
      value2 = value2.toString().replace(".", config_default().decimalSeparator);
    }
    if ("percent" === format2) {
      value2 += "%";
    }
    return value2;
  },
  _normalizeFormat: function(format2) {
    if (!format2) {
      return {};
    }
    if ("function" === typeof format2) {
      return format2;
    }
    if (!isPlainObject(format2)) {
      format2 = {
        type: format2
      };
    }
    return format2;
  },
  _getSeparators: function() {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator: function() {
    return this.format(1e4, "fixedPoint")[2];
  },
  getDecimalSeparator: function() {
    return this.format(1.2, {
      type: "fixedPoint",
      precision: 1
    })[1];
  },
  convertDigits: function(value2, toStandard) {
    var digits = this.format(90, "decimal");
    if ("string" !== typeof value2 || "0" === digits[1]) {
      return value2;
    }
    var fromFirstDigit = toStandard ? digits[1] : "0";
    var toFirstDigit = toStandard ? "0" : digits[1];
    var fromLastDigit = toStandard ? digits[0] : "9";
    var regExp = new RegExp("[" + fromFirstDigit + "-" + fromLastDigit + "]", "g");
    return value2.replace(regExp, (char) => String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0))));
  },
  getNegativeEtalonRegExp: function(format2) {
    var separators = this._getSeparators();
    var digitalRegExp = new RegExp("[0-9" + escapeRegExp(separators.decimalSeparator + separators.thousandsSeparator) + "]+", "g");
    var negativeEtalon = this.format(-1, format2).replace(digitalRegExp, "1");
    ["\\", "(", ")", "[", "]", "*", "+", "$", "^", "?", "|", "{", "}"].forEach((char) => {
      negativeEtalon = negativeEtalon.replace(new RegExp("\\".concat(char), "g"), "\\".concat(char));
    });
    negativeEtalon = negativeEtalon.replace(/ /g, "\\s");
    negativeEtalon = negativeEtalon.replace(/1/g, ".*");
    return new RegExp(negativeEtalon, "g");
  },
  getSign: function(text, format2) {
    if (!format2) {
      if ("-" === text.replace(/[^0-9-]/g, "").charAt(0)) {
        return -1;
      }
      return 1;
    }
    var negativeEtalon = this.getNegativeEtalonRegExp(format2);
    return text.match(negativeEtalon) ? -1 : 1;
  },
  format: function(value2, _format) {
    if ("number" !== typeof value2) {
      return value2;
    }
    if ("number" === typeof _format) {
      return value2;
    }
    _format = _format && _format.formatter || _format;
    if ("function" === typeof _format) {
      return _format(value2);
    }
    _format = this._normalizeFormat(_format);
    if (!_format.type) {
      _format.type = "decimal";
    }
    var numberConfig = this._parseNumberFormatString(_format.type);
    if (!numberConfig) {
      var formatterConfig = this._getSeparators();
      formatterConfig.unlimitedIntegerDigits = _format.unlimitedIntegerDigits;
      return this.convertDigits(getFormatter(_format.type, formatterConfig)(value2));
    }
    return this._formatNumber(value2, numberConfig, _format);
  },
  parse: function(text, format2) {
    if (!text) {
      return;
    }
    if (format2 && format2.parser) {
      return format2.parser(text);
    }
    text = this.convertDigits(text, true);
    if (format2 && "string" !== typeof format2) {
      errors_default.log("W0011");
    }
    var decimalSeparator = this.getDecimalSeparator();
    var regExp = new RegExp("[^0-9" + escapeRegExp(decimalSeparator) + "]", "g");
    var cleanedText = text.replace(regExp, "").replace(decimalSeparator, ".").replace(/\.$/g, "");
    if ("." === cleanedText || "" === cleanedText) {
      return null;
    }
    if (this._calcSignificantDigits(cleanedText) > 15) {
      return NaN;
    }
    var parsed = +cleanedText * this.getSign(text, format2);
    format2 = this._normalizeFormat(format2);
    var formatConfig = this._parseNumberFormatString(format2.type);
    var power = null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.power;
    if (power) {
      if ("auto" === power) {
        var match2 = text.match(/\d(K|M|B|T)/);
        if (match2) {
          power = Object.keys(LargeNumberFormatPostfixes).find((power2) => LargeNumberFormatPostfixes[power2] === match2[1]);
        }
      }
      parsed *= Math.pow(10, 3 * power);
    }
    if ("percent" === (null === formatConfig || void 0 === formatConfig ? void 0 : formatConfig.formatType)) {
      parsed /= 100;
    }
    return parsed;
  },
  _calcSignificantDigits: function(text) {
    var [integer, fractional] = text.split(".");
    var calcDigitsAfterLeadingZeros = (digits) => {
      var index2 = -1;
      for (var i = 0; i < digits.length; i++) {
        if ("0" !== digits[i]) {
          index2 = i;
          break;
        }
      }
      return index2 > -1 ? digits.length - index2 : 0;
    };
    var result = 0;
    if (integer) {
      result += calcDigitsAfterLeadingZeros(integer.split(""));
    }
    if (fractional) {
      result += calcDigitsAfterLeadingZeros(fractional.split("").reverse());
    }
    return result;
  }
});
numberLocalization.inject(currency_default);
if (hasIntl) {
  numberLocalization.inject(number_default);
}
var number_default2 = numberLocalization;

// node_modules/devextreme/esm/localization/ldml/date.formatter.js
function leftPad(text, length) {
  while (text.length < length) {
    text = "0" + text;
  }
  return text;
}
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var LDML_FORMATTERS = {
  y: function(date, count, useUtc) {
    var year = date[useUtc ? "getUTCFullYear" : "getFullYear"]();
    if (2 === count) {
      year %= 100;
    }
    return leftPad(year.toString(), count);
  },
  M: function(date, count, useUtc, dateParts) {
    var month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "format")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  L: function(date, count, useUtc, dateParts) {
    var month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "standalone")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  Q: function(date, count, useUtc, dateParts) {
    var month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    var quarter = Math.floor(month / 3);
    var formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getQuarterNames(formatType)[quarter];
    }
    return leftPad((quarter + 1).toString(), Math.min(count, 2));
  },
  E: function(date, count, useUtc, dateParts) {
    var day = date[useUtc ? "getUTCDay" : "getDay"]();
    var formatType = FORMAT_TYPES[count < 3 ? 3 : count];
    return dateParts.getDayNames(formatType)[day];
  },
  a: function(date, count, useUtc, dateParts) {
    var hours = date[useUtc ? "getUTCHours" : "getHours"]();
    var period = hours < 12 ? 0 : 1;
    var formatType = FORMAT_TYPES[count];
    return dateParts.getPeriodNames(formatType)[period];
  },
  d: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCDate" : "getDate"]().toString(), Math.min(count, 2));
  },
  H: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCHours" : "getHours"]().toString(), Math.min(count, 2));
  },
  h: function(date, count, useUtc) {
    var hours = date[useUtc ? "getUTCHours" : "getHours"]();
    return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
  },
  m: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMinutes" : "getMinutes"]().toString(), Math.min(count, 2));
  },
  s: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCSeconds" : "getSeconds"]().toString(), Math.min(count, 2));
  },
  S: function(date, count, useUtc) {
    return leftPad(date[useUtc ? "getUTCMilliseconds" : "getMilliseconds"]().toString(), 3).substr(0, count);
  },
  x: function(date, count, useUtc) {
    var timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
    var signPart = timezoneOffset > 0 ? "-" : "+";
    var timezoneOffsetAbs = Math.abs(timezoneOffset);
    var hours = Math.floor(timezoneOffsetAbs / 60);
    var minutes = timezoneOffsetAbs % 60;
    var hoursPart = leftPad(hours.toString(), 2);
    var minutesPart = leftPad(minutes.toString(), 2);
    return signPart + hoursPart + (count >= 3 ? ":" : "") + (count > 1 || minutes ? minutesPart : "");
  },
  X: function(date, count, useUtc) {
    if (useUtc || !date.getTimezoneOffset()) {
      return "Z";
    }
    return LDML_FORMATTERS.x(date, count, useUtc);
  },
  Z: function(date, count, useUtc) {
    return LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc);
  }
};
var getFormatter3 = function(format2, dateParts) {
  return function(date) {
    var charIndex;
    var formatter;
    var char;
    var charCount = 0;
    var isEscaping = false;
    var isCurrentCharEqualsNext;
    var result = "";
    if (!date) {
      return null;
    }
    if (!format2) {
      return date;
    }
    var useUtc = "Z" === format2[format2.length - 1] || "'Z'" === format2.slice(-3);
    for (charIndex = 0; charIndex < format2.length; charIndex++) {
      char = format2[charIndex];
      formatter = LDML_FORMATTERS[char];
      isCurrentCharEqualsNext = char === format2[charIndex + 1];
      charCount++;
      if (!isCurrentCharEqualsNext) {
        if (formatter && !isEscaping) {
          result += formatter(date, charCount, useUtc, dateParts);
        }
        charCount = 0;
      }
      if ("'" === char && !isCurrentCharEqualsNext) {
        isEscaping = !isEscaping;
      } else if (isEscaping || !formatter) {
        result += char;
      }
      if ("'" === char && isCurrentCharEqualsNext) {
        charIndex++;
      }
    }
    return result;
  };
};

// node_modules/devextreme/esm/localization/ldml/date.format.js
var ARABIC_COMMA = "،";
var FORMAT_SEPARATORS = " .,:;/\\<>()-[]" + ARABIC_COMMA;
var AM_PM_PATTERN = ". m.";
var checkDigit = function(char) {
  var code = char && number_default2.convertDigits(char, false).charCodeAt(0);
  var zeroCode = number_default2.convertDigits("0", false).charCodeAt(0);
  return zeroCode <= code && code < zeroCode + 10;
};
var checkPatternContinue = function(text, patterns, index2, isDigit) {
  var char = text[index2];
  var nextChar = text[index2 + 1];
  if (!isDigit) {
    if ("." === char || " " === char && text.slice(index2 - 1, index2 + 3) === AM_PM_PATTERN) {
      return true;
    }
    if ("-" === char && !checkDigit(nextChar)) {
      return true;
    }
  }
  var isDigitChanged = isDigit && patterns.some((pattern) => text[index2] !== pattern[index2]);
  return FORMAT_SEPARATORS.indexOf(char) < 0 && isDigit === checkDigit(char) && (!isDigit || isDigitChanged);
};
var getPatternStartIndex = function(defaultPattern, index2) {
  if (!checkDigit(defaultPattern[index2])) {
    while (index2 > 0 && !checkDigit(defaultPattern[index2 - 1]) && ("." === defaultPattern[index2 - 1] || FORMAT_SEPARATORS.indexOf(defaultPattern[index2 - 1]) < 0)) {
      index2--;
    }
  }
  return index2;
};
var getDifference = function(defaultPattern, patterns, processedIndexes, isDigit) {
  var i = 0;
  var result = [];
  var patternsFilter = function(pattern) {
    return defaultPattern[i] !== pattern[i] && (void 0 === isDigit || checkDigit(defaultPattern[i]) === isDigit);
  };
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }
  for (i = 0; i < defaultPattern.length; i++) {
    if (processedIndexes.indexOf(i) < 0 && patterns.filter(patternsFilter).length) {
      i = getPatternStartIndex(defaultPattern, i);
      do {
        isDigit = checkDigit(defaultPattern[i]);
        if (!result.length && !isDigit && checkDigit(patterns[0][i])) {
          break;
        }
        result.push(i);
        processedIndexes.unshift(i);
        i++;
      } while (defaultPattern[i] && checkPatternContinue(defaultPattern, patterns, i, isDigit));
      break;
    }
  }
  if (1 === result.length && ("0" === defaultPattern[processedIndexes[0] - 1] || "٠" === defaultPattern[processedIndexes[0] - 1])) {
    processedIndexes.unshift(processedIndexes[0] - 1);
  }
  return result;
};
var replaceCharsCore = function(pattern, indexes, char, patternPositions) {
  var baseCharIndex = indexes[0];
  var patternIndex = baseCharIndex < patternPositions.length ? patternPositions[baseCharIndex] : baseCharIndex;
  indexes.forEach(function(_, index2) {
    pattern = pattern.substr(0, patternIndex + index2) + (char.length > 1 ? char[index2] : char) + pattern.substr(patternIndex + index2 + 1);
  });
  if (1 === indexes.length) {
    pattern = pattern.replace("0" + char, char + char);
    pattern = pattern.replace("٠" + char, char + char);
  }
  return pattern;
};
var replaceChars = function(pattern, indexes, char, patternPositions) {
  var i;
  var index2;
  var patternIndex;
  if (!checkDigit(pattern[indexes[0]] || "0")) {
    var letterCount = Math.max(indexes.length <= 3 ? 3 : 4, char.length);
    while (indexes.length > letterCount) {
      index2 = indexes.pop();
      patternIndex = patternPositions[index2];
      patternPositions[index2] = -1;
      for (i = index2 + 1; i < patternPositions.length; i++) {
        patternPositions[i]--;
      }
      pattern = pattern.substr(0, patternIndex) + pattern.substr(patternIndex + 1);
    }
    index2 = indexes[indexes.length - 1] + 1, patternIndex = index2 < patternPositions.length ? patternPositions[index2] : index2;
    while (indexes.length < letterCount) {
      indexes.push(indexes[indexes.length - 1] + 1);
      for (i = index2; i < patternPositions.length; i++) {
        patternPositions[i]++;
      }
      pattern = pattern.substr(0, patternIndex) + " " + pattern.substr(patternIndex);
    }
  }
  pattern = replaceCharsCore(pattern, indexes, char, patternPositions);
  return pattern;
};
var formatValue = function(value2, formatter) {
  if (Array.isArray(value2)) {
    return value2.map(function(value3) {
      return (formatter(value3) || "").toString();
    });
  }
  return (formatter(value2) || "").toString();
};
var ESCAPE_CHARS_REGEXP = /[a-zA-Z]/g;
var escapeChars = function(pattern, defaultPattern, processedIndexes, patternPositions) {
  var escapeIndexes = defaultPattern.split("").map(function(char, index2) {
    if (processedIndexes.indexOf(index2) < 0 && (char.match(ESCAPE_CHARS_REGEXP) || "'" === char)) {
      return patternPositions[index2];
    }
    return -1;
  });
  pattern = pattern.split("").map(function(char, index2) {
    var result = char;
    var isCurrentCharEscaped = escapeIndexes.indexOf(index2) >= 0;
    var isPrevCharEscaped = index2 > 0 && escapeIndexes.indexOf(index2 - 1) >= 0;
    var isNextCharEscaped = escapeIndexes.indexOf(index2 + 1) >= 0;
    if (isCurrentCharEscaped) {
      if (!isPrevCharEscaped) {
        result = "'" + result;
      }
      if (!isNextCharEscaped) {
        result += "'";
      }
    }
    return result;
  }).join("");
  return pattern;
};
var getFormat2 = function(formatter) {
  var processedIndexes = [];
  var defaultPattern = formatValue(new Date(2009, 8, 8, 6, 5, 4), formatter);
  var patternPositions = defaultPattern.split("").map(function(_, index2) {
    return index2;
  });
  var result = defaultPattern;
  var replacedPatterns = {};
  var datePatterns = [{
    date: new Date(2009, 8, 8, 6, 5, 4, 111),
    pattern: "S"
  }, {
    date: new Date(2009, 8, 8, 6, 5, 2),
    pattern: "s"
  }, {
    date: new Date(2009, 8, 8, 6, 2, 4),
    pattern: "m"
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "H",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 2, 5, 4),
    pattern: "h",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "a",
    isDigit: false
  }, {
    date: new Date(2009, 8, 1, 6, 5, 4),
    pattern: "d"
  }, {
    date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
    pattern: "E"
  }, {
    date: new Date(2009, 9, 6, 6, 5, 4),
    pattern: "M"
  }, {
    date: new Date(1998, 8, 8, 6, 5, 4),
    pattern: "y"
  }];
  if (!result) {
    return;
  }
  datePatterns.forEach(function(test) {
    var diff = getDifference(defaultPattern, formatValue(test.date, formatter), processedIndexes, test.isDigit);
    var pattern = "M" === test.pattern && !replacedPatterns.d ? "L" : test.pattern;
    result = replaceChars(result, diff, pattern, patternPositions);
    replacedPatterns[pattern] = diff.length;
  });
  result = escapeChars(result, defaultPattern, processedIndexes, patternPositions);
  if (processedIndexes.length) {
    return result;
  }
};

// node_modules/devextreme/esm/localization/ldml/date.parser.js
var FORMAT_TYPES2 = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var monthRegExpGenerator = function(count, dateParts) {
  if (count > 2) {
    return Object.keys(FORMAT_TYPES2).map(function(count2) {
      return ["format", "standalone"].map(function(type2) {
        return dateParts.getMonthNames(FORMAT_TYPES2[count2], type2).join("|");
      }).join("|");
    }).join("|");
  }
  return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
};
var PATTERN_REGEXPS = {
  ":": function(count, dateParts) {
    var countSuffix = count > 1 ? "{".concat(count, "}") : "";
    var timeSeparator = escapeRegExp(dateParts.getTimeSeparator());
    ":" !== timeSeparator && (timeSeparator = "".concat(timeSeparator, "|:"));
    return "".concat(timeSeparator).concat(countSuffix);
  },
  y: function(count) {
    return 2 === count ? "[0-9]{".concat(count, "}") : "[0-9]+?";
  },
  M: monthRegExpGenerator,
  L: monthRegExpGenerator,
  Q: function(count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES2[count], "format").join("|");
    }
    return "0?[1-4]";
  },
  E: function(count, dateParts) {
    return "\\D*";
  },
  a: function(count, dateParts) {
    return dateParts.getPeriodNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format").join("|");
  },
  d: function(count) {
    return 2 === count ? "3[01]|[12][0-9]|0?[1-9]" : "0??[1-9]|[12][0-9]|3[01]";
  },
  H: function(count) {
    return 2 === count ? "2[0-3]|1[0-9]|0?[0-9]" : "0??[0-9]|1[0-9]|2[0-3]";
  },
  h: function(count) {
    return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]";
  },
  m: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  s: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  S: function(count) {
    return "[0-9]{1,".concat(count, "}");
  },
  w: function(count) {
    return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]";
  },
  x: function(count) {
    return 3 === count ? "[+-](?:2[0-3]|[01][0-9]):(?:[0-5][0-9])|Z" : "[+-](?:2[0-3]|[01][0-9])(?:[0-5][0-9])|Z";
  }
};
var parseNumber = Number;
var caseInsensitiveIndexOf = function(array, value2) {
  return array.map((item) => item.toLowerCase()).indexOf(value2.toLowerCase());
};
var monthPatternParser = function(text, count, dateParts) {
  if (count > 2) {
    return ["format", "standalone"].map(function(type2) {
      return Object.keys(FORMAT_TYPES2).map(function(count2) {
        var monthNames = dateParts.getMonthNames(FORMAT_TYPES2[count2], type2);
        return caseInsensitiveIndexOf(monthNames, text);
      });
    }).reduce(function(a, b) {
      return a.concat(b);
    }).filter(function(index2) {
      return index2 >= 0;
    })[0];
  }
  return parseNumber(text) - 1;
};
var PATTERN_PARSERS = {
  y: function(text, count) {
    var year = parseNumber(text);
    if (2 === count) {
      return year < 30 ? 2e3 + year : 1900 + year;
    }
    return year;
  },
  M: monthPatternParser,
  L: monthPatternParser,
  Q: function(text, count, dateParts) {
    if (count > 2) {
      return dateParts.getQuarterNames(FORMAT_TYPES2[count], "format").indexOf(text);
    }
    return parseNumber(text) - 1;
  },
  E: function(text, count, dateParts) {
    var dayNames = dateParts.getDayNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(dayNames, text);
  },
  a: function(text, count, dateParts) {
    var periodNames = dateParts.getPeriodNames(FORMAT_TYPES2[count < 3 ? 3 : count], "format");
    return caseInsensitiveIndexOf(periodNames, text);
  },
  d: parseNumber,
  H: parseNumber,
  h: parseNumber,
  m: parseNumber,
  s: parseNumber,
  S: function(text, count) {
    count = Math.max(count, 3);
    text = text.slice(0, 3);
    while (count < 3) {
      text += "0";
      count++;
    }
    return parseNumber(text);
  }
};
var ORDERED_PATTERNS = ["y", "M", "d", "h", "m", "s", "S"];
var PATTERN_SETTERS = {
  y: "setFullYear",
  M: "setMonth",
  L: "setMonth",
  a: function(date, value2, datePartValues) {
    var hours = date.getHours();
    var hourPartValue = datePartValues.h;
    if (void 0 !== hourPartValue && hourPartValue !== hours) {
      hours--;
    }
    if (!value2 && 12 === hours) {
      hours = 0;
    } else if (value2 && 12 !== hours) {
      hours += 12;
    }
    date.setHours(hours);
  },
  d: "setDate",
  H: "setHours",
  h: "setHours",
  m: "setMinutes",
  s: "setSeconds",
  S: "setMilliseconds"
};
var getSameCharCount = function(text, index2) {
  var char = text[index2];
  if (!char) {
    return 0;
  }
  var count = 0;
  do {
    index2++;
    count++;
  } while (text[index2] === char);
  return count;
};
var createPattern = function(char, count) {
  var result = "";
  for (var i = 0; i < count; i++) {
    result += char;
  }
  return result;
};
var getRegExpInfo = function(format2, dateParts) {
  var regexpText = "";
  var stubText = "";
  var isEscaping;
  var patterns = [];
  var addPreviousStub = function() {
    if (stubText) {
      patterns.push("'".concat(stubText, "'"));
      regexpText += "".concat(escapeRegExp(stubText), ")");
      stubText = "";
    }
  };
  for (var i = 0; i < format2.length; i++) {
    var char = format2[i];
    var isEscapeChar = "'" === char;
    var regexpPart = PATTERN_REGEXPS[char];
    if (isEscapeChar) {
      isEscaping = !isEscaping;
      if ("'" !== format2[i - 1]) {
        continue;
      }
    }
    if (regexpPart && !isEscaping) {
      var count = getSameCharCount(format2, i);
      var pattern = createPattern(char, count);
      addPreviousStub();
      patterns.push(pattern);
      regexpText += "(".concat(regexpPart(count, dateParts), ")");
      i += count - 1;
    } else {
      if (!stubText) {
        regexpText += "(";
      }
      stubText += char;
    }
  }
  addPreviousStub();
  if (!isPossibleForParsingFormat(patterns)) {
    logger.warn("The following format may be parsed incorrectly: ".concat(format2, "."));
  }
  return {
    patterns,
    regexp: new RegExp("^".concat(regexpText, "$"), "i")
  };
};
var digitFieldSymbols = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
var isPossibleForParsingFormat = function(patterns) {
  var isDigitPattern = (pattern) => {
    if (!pattern) {
      return false;
    }
    var char = pattern[0];
    return ["y", "S"].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3;
  };
  var possibleForParsing = true;
  var ambiguousDigitPatternsCount = 0;
  return patterns.every((pattern, index2, patterns2) => {
    if (isDigitPattern(pattern)) {
      if (((pattern2) => "S" !== pattern2[0] && 2 !== pattern2.length)(pattern)) {
        possibleForParsing = ++ambiguousDigitPatternsCount < 2;
      }
      if (!isDigitPattern(patterns2[index2 + 1])) {
        ambiguousDigitPatternsCount = 0;
      }
    }
    return possibleForParsing;
  });
};
var getPatternSetters = function() {
  return PATTERN_SETTERS;
};
var setPatternPart = function(date, pattern, text, dateParts, datePartValues) {
  var patternChar = pattern[0];
  var partSetter = PATTERN_SETTERS[patternChar];
  var partParser = PATTERN_PARSERS[patternChar];
  if (partSetter && partParser) {
    var value2 = partParser(text, pattern.length, dateParts);
    datePartValues[pattern] = value2;
    if (date[partSetter]) {
      date[partSetter](value2);
    } else {
      partSetter(date, value2, datePartValues);
    }
  }
};
var setPatternPartFromNow = function(date, pattern, now) {
  var setterName = PATTERN_SETTERS[pattern];
  var getterName = "g" + setterName.substr(1);
  var value2 = now[getterName]();
  date[setterName](value2);
};
var getShortPatterns = function(fullPatterns) {
  return fullPatterns.map(function(pattern) {
    if ("'" === pattern[0]) {
      return "";
    } else {
      return "H" === pattern[0] ? "h" : pattern[0];
    }
  });
};
var getMaxOrderedPatternIndex = function(patterns) {
  var indexes = patterns.map(function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern);
  });
  return Math.max.apply(Math, indexes);
};
var getOrderedFormatPatterns = function(formatPatterns) {
  var otherPatterns = formatPatterns.filter(function(pattern) {
    return ORDERED_PATTERNS.indexOf(pattern) < 0;
  });
  return ORDERED_PATTERNS.concat(otherPatterns);
};
var getParser = function(format2, dateParts) {
  var regExpInfo = getRegExpInfo(format2, dateParts);
  return function(text) {
    var regExpResult = regExpInfo.regexp.exec(text);
    if (regExpResult) {
      var now = /* @__PURE__ */ new Date();
      var date = new Date(now.getFullYear(), 0, 1);
      var formatPatterns = getShortPatterns(regExpInfo.patterns);
      var maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
      var orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
      var datePartValues = {};
      orderedFormatPatterns.forEach(function(pattern, index2) {
        if (!pattern || index2 < ORDERED_PATTERNS.length && index2 > maxPatternIndex) {
          return;
        }
        var patternIndex = formatPatterns.indexOf(pattern);
        if (patternIndex >= 0) {
          var regExpPattern = regExpInfo.patterns[patternIndex];
          var regExpText = regExpResult[patternIndex + 1];
          setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues);
        } else {
          setPatternPartFromNow(date, pattern, now);
        }
      });
      return date;
    }
    return null;
  };
};

// node_modules/devextreme/esm/localization/default_date_names.js
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var PERIODS = ["AM", "PM"];
var QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
var cutCaptions = (captions, format2) => {
  var lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return map(captions, (caption) => caption.substr(0, lengthByFormat[format2]));
};
var default_date_names_default = {
  getMonthNames: function(format2) {
    return cutCaptions(MONTHS, format2);
  },
  getDayNames: function(format2) {
    return cutCaptions(DAYS, format2);
  },
  getQuarterNames: function(format2) {
    return QUARTERS;
  },
  getPeriodNames: function(format2) {
    return PERIODS;
  }
};

// node_modules/devextreme/esm/localization/cldr-data/first_day_of_week_data.js
var first_day_of_week_data_default = {
  "af-NA": 1,
  agq: 1,
  ak: 1,
  ar: 6,
  "ar-EH": 1,
  "ar-ER": 1,
  "ar-KM": 1,
  "ar-LB": 1,
  "ar-MA": 1,
  "ar-MR": 1,
  "ar-PS": 1,
  "ar-SO": 1,
  "ar-SS": 1,
  "ar-TD": 1,
  "ar-TN": 1,
  asa: 1,
  ast: 1,
  az: 1,
  "az-Cyrl": 1,
  bas: 1,
  be: 1,
  bem: 1,
  bez: 1,
  bg: 1,
  bm: 1,
  br: 1,
  bs: 1,
  "bs-Cyrl": 1,
  ca: 1,
  ce: 1,
  cgg: 1,
  ckb: 6,
  cs: 1,
  cy: 1,
  da: 1,
  de: 1,
  dje: 1,
  dsb: 1,
  dua: 1,
  dyo: 1,
  ee: 1,
  el: 1,
  "en-001": 1,
  "en-AE": 6,
  "en-BI": 1,
  "en-MP": 1,
  "en-MV": 5,
  "en-SD": 6,
  eo: 1,
  es: 1,
  et: 1,
  eu: 1,
  ewo: 1,
  fa: 6,
  ff: 1,
  "ff-Adlm": 1,
  fi: 1,
  fo: 1,
  fr: 1,
  "fr-DJ": 6,
  "fr-DZ": 6,
  "fr-SY": 6,
  fur: 1,
  fy: 1,
  ga: 1,
  gd: 1,
  gl: 1,
  gsw: 1,
  gv: 1,
  ha: 1,
  hr: 1,
  hsb: 1,
  hu: 1,
  hy: 1,
  ia: 1,
  ig: 1,
  is: 1,
  it: 1,
  jgo: 1,
  jmc: 1,
  ka: 1,
  kab: 6,
  kde: 1,
  kea: 1,
  khq: 1,
  kk: 1,
  kkj: 1,
  kl: 1,
  "ko-KP": 1,
  ksb: 1,
  ksf: 1,
  ksh: 1,
  ku: 1,
  kw: 1,
  ky: 1,
  lag: 1,
  lb: 1,
  lg: 1,
  ln: 1,
  lrc: 6,
  lt: 1,
  lu: 1,
  lv: 1,
  "mas-TZ": 1,
  mfe: 1,
  mg: 1,
  mgo: 1,
  mi: 1,
  mk: 1,
  mn: 1,
  ms: 1,
  mua: 1,
  mzn: 6,
  naq: 1,
  nds: 1,
  nl: 1,
  nmg: 1,
  nnh: 1,
  no: 1,
  nus: 1,
  nyn: 1,
  os: 1,
  pcm: 1,
  pl: 1,
  ps: 6,
  "pt-AO": 1,
  "pt-CH": 1,
  "pt-CV": 1,
  "pt-GQ": 1,
  "pt-GW": 1,
  "pt-LU": 1,
  "pt-ST": 1,
  "pt-TL": 1,
  "qu-BO": 1,
  "qu-EC": 1,
  rm: 1,
  rn: 1,
  ro: 1,
  rof: 1,
  ru: 1,
  rw: 1,
  rwk: 1,
  sah: 1,
  sbp: 1,
  sc: 1,
  se: 1,
  ses: 1,
  sg: 1,
  shi: 1,
  "shi-Latn": 1,
  si: 1,
  sk: 1,
  sl: 1,
  smn: 1,
  so: 1,
  "so-DJ": 6,
  sq: 1,
  sr: 1,
  "sr-Latn": 1,
  sv: 1,
  sw: 1,
  "ta-LK": 1,
  "ta-MY": 1,
  teo: 1,
  tg: 1,
  "ti-ER": 1,
  tk: 1,
  to: 1,
  tr: 1,
  tt: 1,
  twq: 1,
  tzm: 1,
  uk: 1,
  uz: 1,
  "uz-Arab": 6,
  "uz-Cyrl": 1,
  vai: 1,
  "vai-Latn": 1,
  vi: 1,
  vun: 1,
  wae: 1,
  wo: 1,
  xog: 1,
  yav: 1,
  yi: 1,
  yo: 1,
  zgh: 1
};

// node_modules/devextreme/esm/localization/intl/date.js
var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
var getIntlFormatter = (format2) => (date) => {
  if (!format2.timeZoneName) {
    var year = date.getFullYear();
    var recognizableAsTwentyCentury = String(year).length < 3;
    var temporaryYearValue = recognizableAsTwentyCentury ? year + 400 : year;
    var utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    if (recognizableAsTwentyCentury) {
      utcDate.setFullYear(year);
    }
    var utcFormat = extend({
      timeZone: "UTC"
    }, format2);
    return formatDateTime(utcDate, utcFormat);
  }
  return formatDateTime(date, format2);
};
var formattersCache2 = {};
var getFormatter4 = (format2) => {
  var key = core_default.locale() + "/" + JSON.stringify(format2);
  if (!formattersCache2[key]) {
    formattersCache2[key] = new Intl.DateTimeFormat(core_default.locale(), format2).format;
  }
  return formattersCache2[key];
};
function formatDateTime(date, format2) {
  return getFormatter4(format2)(date).replace(SYMBOLS_TO_REMOVE_REGEX, "").replace(NARROW_NO_BREAK_SPACE_REGEX, " ");
}
var formatNumber = (number) => new Intl.NumberFormat(core_default.locale()).format(number);
var getAlternativeNumeralsMap = /* @__PURE__ */ (() => {
  var numeralsMapCache = {};
  return (locale) => {
    if (!(locale in numeralsMapCache)) {
      if ("0" === formatNumber(0)) {
        numeralsMapCache[locale] = false;
        return false;
      }
      numeralsMapCache[locale] = {};
      for (var i = 0; i < 10; ++i) {
        numeralsMapCache[locale][formatNumber(i)] = i;
      }
    }
    return numeralsMapCache[locale];
  };
})();
var normalizeNumerals = (dateString) => {
  var alternativeNumeralsMap = getAlternativeNumeralsMap(core_default.locale());
  if (!alternativeNumeralsMap) {
    return dateString;
  }
  return dateString.split("").map((sign2) => sign2 in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign2]) : sign2).join("");
};
var removeLeadingZeroes = (str) => str.replace(/(\D)0+(\d)/g, "$1$2");
var dateStringEquals = (actual, expected) => removeLeadingZeroes(actual) === removeLeadingZeroes(expected);
var normalizeMonth = (text) => text.replace("d’", "de ");
var intlFormats = {
  day: {
    day: "numeric"
  },
  dayofweek: {
    weekday: "long"
  },
  longdate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  longdatelongtime: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  longtime: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  month: {
    month: "long"
  },
  monthandday: {
    month: "long",
    day: "numeric"
  },
  monthandyear: {
    year: "numeric",
    month: "long"
  },
  shortdate: {},
  shorttime: {
    hour: "numeric",
    minute: "numeric"
  },
  shortyear: {
    year: "2-digit"
  },
  year: {
    year: "numeric"
  }
};
Object.defineProperty(intlFormats, "shortdateshorttime", {
  get: function() {
    var defaultOptions = Intl.DateTimeFormat(core_default.locale()).resolvedOptions();
    return {
      year: defaultOptions.year,
      month: defaultOptions.month,
      day: defaultOptions.day,
      hour: "numeric",
      minute: "numeric"
    };
  }
});
var getIntlFormat = (format2) => "string" === typeof format2 && intlFormats[format2.toLowerCase()];
var monthNameStrategies = {
  standalone: function(monthIndex, monthFormat) {
    var date = new Date(1999, monthIndex, 13, 1);
    var dateString = getIntlFormatter({
      month: monthFormat
    })(date);
    return dateString;
  },
  format: function(monthIndex, monthFormat) {
    var date = new Date(0, monthIndex, 13, 1);
    var dateString = normalizeMonth(getIntlFormatter({
      day: "numeric",
      month: monthFormat
    })(date));
    var parts = dateString.split(" ").filter((part) => part.indexOf("13") < 0);
    if (1 === parts.length) {
      return parts[0];
    } else if (2 === parts.length) {
      return parts[0].length > parts[1].length ? parts[0] : parts[1];
    }
    return monthNameStrategies.standalone(monthIndex, monthFormat);
  }
};
var date_default = {
  engine: function() {
    return "intl";
  },
  getMonthNames: function(format2, type2) {
    var monthFormat = {
      wide: "long",
      abbreviated: "short",
      narrow: "narrow"
    }[format2 || "wide"];
    type2 = "format" === type2 ? type2 : "standalone";
    return Array.apply(null, new Array(12)).map((_, monthIndex) => monthNameStrategies[type2](monthIndex, monthFormat));
  },
  getDayNames: function(format2) {
    var result = ((format3) => Array.apply(null, new Array(7)).map((_, dayIndex) => getIntlFormatter({
      weekday: format3
    })(new Date(0, 0, dayIndex))))({
      wide: "long",
      abbreviated: "short",
      short: "narrow",
      narrow: "narrow"
    }[format2 || "wide"]);
    return result;
  },
  getPeriodNames: function() {
    var hour12Formatter = getIntlFormatter({
      hour: "numeric",
      hour12: true
    });
    return [1, 13].map((hours) => {
      var hourNumberText = formatNumber(1);
      var timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
      if (2 !== timeParts.length) {
        return "";
      }
      var biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
      return biggerPart.trim();
    });
  },
  format: function(date, _format) {
    if (!date) {
      return;
    }
    if (!_format) {
      return date;
    }
    if ("function" !== typeof _format && !_format.formatter) {
      _format = _format.type || _format;
    }
    var intlFormat = getIntlFormat(_format);
    if (intlFormat) {
      return getIntlFormatter(intlFormat)(date);
    }
    var formatType = typeof _format;
    if (_format.formatter || "function" === formatType || "string" === formatType) {
      return this.callBase.apply(this, arguments);
    }
    return getIntlFormatter(_format)(date);
  },
  parse: function(dateString, format2) {
    var formatter;
    if (format2 && !format2.parser && "string" === typeof dateString) {
      dateString = normalizeMonth(dateString);
      formatter = (date) => normalizeMonth(this.format(date, format2));
    }
    return this.callBase(dateString, formatter || format2);
  },
  _parseDateBySimpleFormat: function(dateString, format2) {
    dateString = normalizeNumerals(dateString);
    var formatParts = this.getFormatParts(format2);
    var dateParts = dateString.split(/\D+/).filter((part) => part.length > 0);
    if (formatParts.length !== dateParts.length) {
      return;
    }
    var dateArgs = this._generateDateArgs(formatParts, dateParts);
    var constructValidDate = (ampmShift) => {
      var parsedDate = ((dateArgs2, ampmShift2) => {
        var hoursShift = ampmShift2 ? 12 : 0;
        return new Date(dateArgs2.year, dateArgs2.month, dateArgs2.day, (dateArgs2.hours + hoursShift) % 24, dateArgs2.minutes, dateArgs2.seconds);
      })(dateArgs, ampmShift);
      if (dateStringEquals(normalizeNumerals(this.format(parsedDate, format2)), dateString)) {
        return parsedDate;
      }
    };
    return constructValidDate(false) || constructValidDate(true);
  },
  _generateDateArgs: function(formatParts, dateParts) {
    var currentDate = /* @__PURE__ */ new Date();
    var dateArgs = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    formatParts.forEach((formatPart, index2) => {
      var datePart = dateParts[index2];
      var parsed = parseInt(datePart, 10);
      if ("month" === formatPart) {
        parsed -= 1;
      }
      dateArgs[formatPart] = parsed;
    });
    return dateArgs;
  },
  formatUsesMonthName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.month;
    }
    return this.callBase.apply(this, arguments);
  },
  formatUsesDayName: function(format2) {
    if ("object" === typeof format2 && !(format2.type || format2.format)) {
      return "long" === format2.weekday;
    }
    return this.callBase.apply(this, arguments);
  },
  getTimeSeparator: function() {
    return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })).replace(/\d/g, "");
  },
  getFormatParts: function(format2) {
    if ("string" === typeof format2) {
      return this.callBase(format2);
    }
    var intlFormat = extend({}, intlFormats[format2.toLowerCase()]);
    var date = new Date(2001, 2, 4, 5, 6, 7);
    var formattedDate = getIntlFormatter(intlFormat)(date);
    formattedDate = normalizeNumerals(formattedDate);
    return [{
      name: "year",
      value: 1
    }, {
      name: "month",
      value: 3
    }, {
      name: "day",
      value: 4
    }, {
      name: "hours",
      value: 5
    }, {
      name: "minutes",
      value: 6
    }, {
      name: "seconds",
      value: 7
    }].map((part) => ({
      name: part.name,
      index: formattedDate.indexOf(part.value)
    })).filter((part) => part.index > -1).sort((a, b) => a.index - b.index).map((part) => part.name);
  }
};

// node_modules/devextreme/esm/localization/date.js
var DEFAULT_DAY_OF_WEEK_INDEX = 0;
var hasIntl2 = "undefined" !== typeof Intl;
var FORMATS_TO_PATTERN_MAP = {
  shortdate: "M/d/y",
  shorttime: "h:mm a",
  longdate: "EEEE, MMMM d, y",
  longtime: "h:mm:ss a",
  monthandday: "MMMM d",
  monthandyear: "MMMM y",
  quarterandyear: "QQQ y",
  day: "d",
  year: "y",
  shortdateshorttime: "M/d/y, h:mm a",
  longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
  month: "LLLL",
  shortyear: "yy",
  dayofweek: "EEEE",
  quarter: "QQQ",
  hour: "HH",
  minute: "mm",
  second: "ss",
  millisecond: "SSS",
  "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var possiblePartPatterns = {
  year: ["y", "yy", "yyyy"],
  day: ["d", "dd"],
  month: ["M", "MM", "MMM", "MMMM"],
  hours: ["H", "HH", "h", "hh", "ah"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  milliseconds: ["S", "SS", "SSS"]
};
var dateLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _getPatternByFormat: function(format2) {
    return FORMATS_TO_PATTERN_MAP[format2.toLowerCase()];
  },
  _expandPattern: function(pattern) {
    return this._getPatternByFormat(pattern) || pattern;
  },
  formatUsesMonthName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("MMMM");
  },
  formatUsesDayName: function(format2) {
    return -1 !== this._expandPattern(format2).indexOf("EEEE");
  },
  getFormatParts: function(format2) {
    var pattern = this._getPatternByFormat(format2) || format2;
    var result = [];
    each(pattern.split(/\W+/), (_, formatPart) => {
      each(possiblePartPatterns, (partName, possiblePatterns) => {
        if (possiblePatterns.includes(formatPart)) {
          result.push(partName);
        }
      });
    });
    return result;
  },
  getMonthNames: function(format2) {
    return default_date_names_default.getMonthNames(format2);
  },
  getDayNames: function(format2) {
    return default_date_names_default.getDayNames(format2);
  },
  getQuarterNames: function(format2) {
    return default_date_names_default.getQuarterNames(format2);
  },
  getPeriodNames: function(format2) {
    return default_date_names_default.getPeriodNames(format2);
  },
  getTimeSeparator: function() {
    return ":";
  },
  is24HourFormat: function(format2) {
    var amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
    var pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
    var amTimeFormatted = this.format(amTime, format2);
    var pmTimeFormatted = this.format(pmTime, format2);
    for (var i = 0; i < amTimeFormatted.length; i++) {
      if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
        return !isNaN(parseInt(amTimeFormatted[i]));
      }
    }
  },
  format: function(date, _format) {
    if (!date) {
      return;
    }
    if (!_format) {
      return date;
    }
    var formatter;
    if ("function" === typeof _format) {
      formatter = _format;
    } else if (_format.formatter) {
      formatter = _format.formatter;
    } else {
      _format = _format.type || _format;
      if (isString(_format)) {
        _format = FORMATS_TO_PATTERN_MAP[_format.toLowerCase()] || _format;
        return number_default2.convertDigits(getFormatter3(_format, this)(date));
      }
    }
    if (!formatter) {
      return;
    }
    return formatter(date);
  },
  parse: function(text, format2) {
    var that = this;
    var ldmlFormat;
    var formatter;
    if (!text) {
      return;
    }
    if (!format2) {
      return this.parse(text, "shortdate");
    }
    if (format2.parser) {
      return format2.parser(text);
    }
    if ("string" === typeof format2 && !FORMATS_TO_PATTERN_MAP[format2.toLowerCase()]) {
      ldmlFormat = format2;
    } else {
      formatter = (value2) => {
        var text2 = that.format(value2, format2);
        return number_default2.convertDigits(text2, true);
      };
      try {
        ldmlFormat = getFormat2(formatter);
      } catch (e) {
      }
    }
    if (ldmlFormat) {
      text = number_default2.convertDigits(text, true);
      return getParser(ldmlFormat, this)(text);
    }
    errors_default.log("W0012");
    var result = new Date(text);
    if (!result || isNaN(result.getTime())) {
      return;
    }
    return result;
  },
  firstDayOfWeekIndex: function() {
    var index2 = core_default.getValueByClosestLocale((locale) => first_day_of_week_data_default[locale]);
    return void 0 === index2 ? DEFAULT_DAY_OF_WEEK_INDEX : index2;
  }
});
if (hasIntl2) {
  dateLocalization.inject(date_default);
}
var date_default2 = dateLocalization;

// node_modules/devextreme/esm/core/utils/inflector.js
var _normalize = function(text) {
  if (void 0 === text || null === text) {
    return "";
  }
  return String(text);
};
var _upperCaseFirst = function(text) {
  return _normalize(text).charAt(0).toUpperCase() + text.substr(1);
};
var _chop = function(text) {
  return _normalize(text).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
};
var dasherize = function(text) {
  return map(_chop(text), function(p) {
    return p.toLowerCase();
  }).join("-");
};
var camelize = function(text, upperFirst) {
  return map(_chop(text), function(p, i) {
    p = p.toLowerCase();
    if (upperFirst || i > 0) {
      p = _upperCaseFirst(p);
    }
    return p;
  }).join("");
};
var humanize = function(text) {
  return _upperCaseFirst(dasherize(text).replace(/-/g, " "));
};
var titleize = function(text) {
  return map(_chop(text), function(p) {
    return _upperCaseFirst(p.toLowerCase());
  }).join(" ");
};
var DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var captionize = function(name) {
  var captionList = [];
  var i;
  var char;
  var isPrevCharNewWord = false;
  var isNewWord = false;
  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord = char === char.toUpperCase() && "-" !== char && ")" !== char && "/" !== char || char in DIGIT_CHARS;
    if ("_" === char || "." === char) {
      char = " ";
      isNewWord = true;
    } else if (0 === i) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(" ");
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join("");
};

// node_modules/devextreme/esm/localization/default_messages.js
var defaultMessages = {
  en: {
    Yes: "Yes",
    No: "No",
    Cancel: "Cancel",
    CheckState: "Check state",
    Close: "Close",
    Clear: "Clear",
    Done: "Done",
    Loading: "Loading...",
    Select: "Select...",
    Search: "Search",
    Back: "Back",
    OK: "OK",
    "dxCollectionWidget-noDataText": "No data to display",
    "dxDropDownEditor-selectLabel": "Select",
    "validation-required": "Required",
    "validation-required-formatted": "{0} is required",
    "validation-numeric": "Value must be a number",
    "validation-numeric-formatted": "{0} must be a number",
    "validation-range": "Value is out of range",
    "validation-range-formatted": "{0} is out of range",
    "validation-stringLength": "The length of the value is not correct",
    "validation-stringLength-formatted": "The length of {0} is not correct",
    "validation-custom": "Value is invalid",
    "validation-custom-formatted": "{0} is invalid",
    "validation-async": "Value is invalid",
    "validation-async-formatted": "{0} is invalid",
    "validation-compare": "Values do not match",
    "validation-compare-formatted": "{0} does not match",
    "validation-pattern": "Value does not match pattern",
    "validation-pattern-formatted": "{0} does not match pattern",
    "validation-email": "Email is invalid",
    "validation-email-formatted": "{0} is invalid",
    "validation-mask": "Value is invalid",
    "dxLookup-searchPlaceholder": "Minimum character number: {0}",
    "dxList-pullingDownText": "Pull down to refresh...",
    "dxList-pulledDownText": "Release to refresh...",
    "dxList-refreshingText": "Refreshing...",
    "dxList-pageLoadingText": "Loading...",
    "dxList-nextButtonText": "More",
    "dxList-selectAll": "Select All",
    "dxListEditDecorator-delete": "Delete",
    "dxListEditDecorator-more": "More",
    "dxScrollView-pullingDownText": "Pull down to refresh...",
    "dxScrollView-pulledDownText": "Release to refresh...",
    "dxScrollView-refreshingText": "Refreshing...",
    "dxScrollView-reachBottomText": "Loading...",
    "dxDateBox-simulatedDataPickerTitleTime": "Select time",
    "dxDateBox-simulatedDataPickerTitleDate": "Select date",
    "dxDateBox-simulatedDataPickerTitleDateTime": "Select date and time",
    "dxDateBox-validation-datetime": "Value must be a date or time",
    "dxDateRangeBox-invalidStartDateMessage": "Start value must be a date",
    "dxDateRangeBox-invalidEndDateMessage": "End value must be a date",
    "dxDateRangeBox-startDateOutOfRangeMessage": "Start date is out of range",
    "dxDateRangeBox-endDateOutOfRangeMessage": "End date is out of range",
    "dxDateRangeBox-startDateLabel": "Start Date",
    "dxDateRangeBox-endDateLabel": "End Date",
    "dxFileUploader-selectFile": "Select a file",
    "dxFileUploader-dropFile": "or Drop a file here",
    "dxFileUploader-bytes": "bytes",
    "dxFileUploader-kb": "KB",
    "dxFileUploader-Mb": "MB",
    "dxFileUploader-Gb": "GB",
    "dxFileUploader-upload": "Upload",
    "dxFileUploader-uploaded": "Uploaded",
    "dxFileUploader-readyToUpload": "Ready to upload",
    "dxFileUploader-uploadAbortedMessage": "Upload cancelled",
    "dxFileUploader-uploadFailedMessage": "Upload failed",
    "dxFileUploader-invalidFileExtension": "File type is not allowed",
    "dxFileUploader-invalidMaxFileSize": "File is too large",
    "dxFileUploader-invalidMinFileSize": "File is too small",
    "dxRangeSlider-ariaFrom": "From",
    "dxRangeSlider-ariaTill": "Till",
    "dxSwitch-switchedOnText": "ON",
    "dxSwitch-switchedOffText": "OFF",
    "dxForm-optionalMark": "optional",
    "dxForm-requiredMessage": "{0} is required",
    "dxNumberBox-invalidValueMessage": "Value must be a number",
    "dxNumberBox-noDataText": "No data",
    "dxDataGrid-emptyHeaderWithColumnChooserText": "Use {0} to display columns",
    "dxDataGrid-emptyHeaderWithGroupPanelText": "Drag a column from the group panel here",
    "dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText": "Use {0} or drag a column from the group panel",
    "dxDataGrid-emptyHeaderColumnChooserText": "column chooser",
    "dxDataGrid-columnChooserTitle": "Column Chooser",
    "dxDataGrid-columnChooserEmptyText": "Drag a column here to hide it",
    "dxDataGrid-groupContinuesMessage": "Continues on the next page",
    "dxDataGrid-groupContinuedMessage": "Continued from the previous page",
    "dxDataGrid-groupHeaderText": "Group by This Column",
    "dxDataGrid-ungroupHeaderText": "Ungroup",
    "dxDataGrid-ungroupAllText": "Ungroup All",
    "dxDataGrid-editingEditRow": "Edit",
    "dxDataGrid-editingSaveRowChanges": "Save",
    "dxDataGrid-editingCancelRowChanges": "Cancel",
    "dxDataGrid-editingDeleteRow": "Delete",
    "dxDataGrid-editingUndeleteRow": "Undelete",
    "dxDataGrid-editingConfirmDeleteMessage": "Are you sure you want to delete this record?",
    "dxDataGrid-validationCancelChanges": "Cancel changes",
    "dxDataGrid-groupPanelEmptyText": "Drag a column header here to group by that column",
    "dxDataGrid-noDataText": "No data",
    "dxDataGrid-searchPanelPlaceholder": "Search...",
    "dxDataGrid-filterRowShowAllText": "(All)",
    "dxDataGrid-filterRowResetOperationText": "Reset",
    "dxDataGrid-filterRowOperationEquals": "Equals",
    "dxDataGrid-filterRowOperationNotEquals": "Does not equal",
    "dxDataGrid-filterRowOperationLess": "Less than",
    "dxDataGrid-filterRowOperationLessOrEquals": "Less than or equal to",
    "dxDataGrid-filterRowOperationGreater": "Greater than",
    "dxDataGrid-filterRowOperationGreaterOrEquals": "Greater than or equal to",
    "dxDataGrid-filterRowOperationStartsWith": "Starts with",
    "dxDataGrid-filterRowOperationContains": "Contains",
    "dxDataGrid-filterRowOperationNotContains": "Does not contain",
    "dxDataGrid-filterRowOperationEndsWith": "Ends with",
    "dxDataGrid-filterRowOperationBetween": "Between",
    "dxDataGrid-filterRowOperationBetweenStartText": "Start",
    "dxDataGrid-filterRowOperationBetweenEndText": "End",
    "dxDataGrid-ariaSearchBox": "Search box",
    "dxDataGrid-applyFilterText": "Apply filter",
    "dxDataGrid-trueText": "true",
    "dxDataGrid-falseText": "false",
    "dxDataGrid-sortingAscendingText": "Sort Ascending",
    "dxDataGrid-sortingDescendingText": "Sort Descending",
    "dxDataGrid-sortingClearText": "Clear Sorting",
    "dxDataGrid-ariaNotSortedColumn": "Not sorted column",
    "dxDataGrid-ariaSortedAscendingColumn": "Column sorted in ascending order",
    "dxDataGrid-ariaSortedDescendingColumn": "Column sorted in descending order",
    "dxDataGrid-ariaSortIndex": "Sort index {0}",
    "dxDataGrid-editingSaveAllChanges": "Save changes",
    "dxDataGrid-editingCancelAllChanges": "Discard changes",
    "dxDataGrid-editingAddRow": "Add a row",
    "dxDataGrid-summaryMin": "Min: {0}",
    "dxDataGrid-summaryMinOtherColumn": "Min of {1} is {0}",
    "dxDataGrid-summaryMax": "Max: {0}",
    "dxDataGrid-summaryMaxOtherColumn": "Max of {1} is {0}",
    "dxDataGrid-summaryAvg": "Avg: {0}",
    "dxDataGrid-summaryAvgOtherColumn": "Avg of {1} is {0}",
    "dxDataGrid-summarySum": "Sum: {0}",
    "dxDataGrid-summarySumOtherColumn": "Sum of {1} is {0}",
    "dxDataGrid-summaryCount": "Count: {0}",
    "dxDataGrid-columnFixingFix": "Fix",
    "dxDataGrid-columnFixingUnfix": "Unfix",
    "dxDataGrid-columnFixingLeftPosition": "To the left",
    "dxDataGrid-columnFixingRightPosition": "To the right",
    "dxDataGrid-exportTo": "Export",
    "dxDataGrid-exportToExcel": "Export to Excel file",
    "dxDataGrid-exporting": "Exporting...",
    "dxDataGrid-excelFormat": "Excel file",
    "dxDataGrid-selectedRows": "Selected rows",
    "dxDataGrid-exportSelectedRows": "Export selected rows to {0}",
    "dxDataGrid-exportAll": "Export all data to {0}",
    "dxDataGrid-headerFilterLabel": "Filter options",
    "dxDataGrid-headerFilterIndicatorLabel": "Show filter options for column '{0}'",
    "dxDataGrid-headerFilterEmptyValue": "(Blanks)",
    "dxDataGrid-headerFilterOK": "OK",
    "dxDataGrid-headerFilterCancel": "Cancel",
    "dxDataGrid-ariaAdaptiveCollapse": "Hide additional data",
    "dxDataGrid-ariaAdaptiveExpand": "Display additional data",
    "dxDataGrid-ariaColumn": "Column",
    "dxDataGrid-ariaColumnHeader": "Column header",
    "dxDataGrid-ariaValue": "Value",
    "dxDataGrid-ariaError": "Error",
    "dxDataGrid-ariaRevertButton": "Press Escape to discard the changes",
    "dxDataGrid-ariaFilterCell": "Filter cell",
    "dxDataGrid-ariaCollapse": "Collapse",
    "dxDataGrid-ariaModifiedCell": "Modified",
    "dxDataGrid-ariaDeletedCell": "Deleted",
    "dxDataGrid-ariaEditableCell": "Editable",
    "dxDataGrid-ariaExpand": "Expand",
    "dxDataGrid-ariaCollapsedRow": "Collapsed row",
    "dxDataGrid-ariaExpandedRow": "Expanded row",
    "dxDataGrid-ariaDataGrid": "Data grid with {0} rows and {1} columns",
    "dxDataGrid-ariaSearchInGrid": "Search in the data grid",
    "dxDataGrid-ariaSelectAll": "Select all",
    "dxDataGrid-ariaSelectRow": "Select row",
    "dxDataGrid-ariaToolbar": "Data grid toolbar",
    "dxDataGrid-ariaEditForm": "Edit form",
    "dxDataGrid-filterBuilderPopupTitle": "Filter Builder",
    "dxDataGrid-filterPanelCreateFilter": "Create Filter",
    "dxDataGrid-filterPanelClearFilter": "Clear",
    "dxDataGrid-filterPanelFilterEnabledHint": "Enable the filter",
    "dxTreeList-ariaTreeList": "Tree list with {0} rows and {1} columns",
    "dxTreeList-ariaSearchInGrid": "Search in the tree list",
    "dxTreeList-ariaToolbar": "Tree list toolbar",
    "dxTreeList-editingAddRowToNode": "Add",
    "dxPager-infoText": "Page {0} of {1} ({2} items)",
    "dxPager-pagesCountText": "of",
    "dxPager-pageSize": "Items per page: {0}",
    "dxPager-pageSizesAllText": "All",
    "dxPager-page": "Page {0}",
    "dxPager-prevPage": "Previous Page",
    "dxPager-nextPage": "Next Page",
    "dxPager-ariaLabel": "Page Navigation",
    "dxPager-ariaPageSize": "Page size",
    "dxPager-ariaPageNumber": "Page number",
    "dxPivotGrid-grandTotal": "Grand Total",
    "dxPivotGrid-total": "{0} Total",
    "dxPivotGrid-fieldChooserTitle": "Field Chooser",
    "dxPivotGrid-showFieldChooser": "Show Field Chooser",
    "dxPivotGrid-expandAll": "Expand All",
    "dxPivotGrid-collapseAll": "Collapse All",
    "dxPivotGrid-sortColumnBySummary": 'Sort "{0}" by This Column',
    "dxPivotGrid-sortRowBySummary": 'Sort "{0}" by This Row',
    "dxPivotGrid-removeAllSorting": "Remove All Sorting",
    "dxPivotGrid-dataNotAvailable": "N/A",
    "dxPivotGrid-rowFields": "Row Fields",
    "dxPivotGrid-columnFields": "Column Fields",
    "dxPivotGrid-dataFields": "Data Fields",
    "dxPivotGrid-filterFields": "Filter Fields",
    "dxPivotGrid-allFields": "All Fields",
    "dxPivotGrid-columnFieldArea": "Drop Column Fields Here",
    "dxPivotGrid-dataFieldArea": "Drop Data Fields Here",
    "dxPivotGrid-rowFieldArea": "Drop Row Fields Here",
    "dxPivotGrid-filterFieldArea": "Drop Filter Fields Here",
    "dxScheduler-editorLabelTitle": "Subject",
    "dxScheduler-editorLabelStartDate": "Start Date",
    "dxScheduler-editorLabelEndDate": "End Date",
    "dxScheduler-editorLabelDescription": "Description",
    "dxScheduler-editorLabelRecurrence": "Repeat",
    "dxScheduler-openAppointment": "Open appointment",
    "dxScheduler-recurrenceNever": "Never",
    "dxScheduler-recurrenceMinutely": "Every minute",
    "dxScheduler-recurrenceHourly": "Hourly",
    "dxScheduler-recurrenceDaily": "Daily",
    "dxScheduler-recurrenceWeekly": "Weekly",
    "dxScheduler-recurrenceMonthly": "Monthly",
    "dxScheduler-recurrenceYearly": "Yearly",
    "dxScheduler-recurrenceRepeatEvery": "Repeat Every",
    "dxScheduler-recurrenceRepeatOn": "Repeat On",
    "dxScheduler-recurrenceEnd": "End repeat",
    "dxScheduler-recurrenceAfter": "After",
    "dxScheduler-recurrenceOn": "On",
    "dxScheduler-recurrenceRepeatMinutely": "minute(s)",
    "dxScheduler-recurrenceRepeatHourly": "hour(s)",
    "dxScheduler-recurrenceRepeatDaily": "day(s)",
    "dxScheduler-recurrenceRepeatWeekly": "week(s)",
    "dxScheduler-recurrenceRepeatMonthly": "month(s)",
    "dxScheduler-recurrenceRepeatYearly": "year(s)",
    "dxScheduler-switcherDay": "Day",
    "dxScheduler-switcherWeek": "Week",
    "dxScheduler-switcherWorkWeek": "Work Week",
    "dxScheduler-switcherMonth": "Month",
    "dxScheduler-switcherAgenda": "Agenda",
    "dxScheduler-switcherTimelineDay": "Timeline Day",
    "dxScheduler-switcherTimelineWeek": "Timeline Week",
    "dxScheduler-switcherTimelineWorkWeek": "Timeline Work Week",
    "dxScheduler-switcherTimelineMonth": "Timeline Month",
    "dxScheduler-recurrenceRepeatOnDate": "on date",
    "dxScheduler-recurrenceRepeatCount": "occurrence(s)",
    "dxScheduler-allDay": "All day",
    "dxScheduler-confirmRecurrenceEditTitle": "Edit Recurring Appointment",
    "dxScheduler-confirmRecurrenceDeleteTitle": "Delete Recurring Appointment",
    "dxScheduler-confirmRecurrenceEditMessage": "Do you want to edit only this appointment or the whole series?",
    "dxScheduler-confirmRecurrenceDeleteMessage": "Do you want to delete only this appointment or the whole series?",
    "dxScheduler-confirmRecurrenceEditSeries": "Edit series",
    "dxScheduler-confirmRecurrenceDeleteSeries": "Delete series",
    "dxScheduler-confirmRecurrenceEditOccurrence": "Edit appointment",
    "dxScheduler-confirmRecurrenceDeleteOccurrence": "Delete appointment",
    "dxScheduler-noTimezoneTitle": "No timezone",
    "dxScheduler-moreAppointments": "{0} more",
    "dxCalendar-todayButtonText": "Today",
    "dxCalendar-ariaWidgetName": "Calendar",
    "dxCalendar-previousMonthButtonLabel": "Previous month",
    "dxCalendar-previousYearButtonLabel": "Previous year",
    "dxCalendar-previousDecadeButtonLabel": "Previous decade",
    "dxCalendar-previousCenturyButtonLabel": "Previous century",
    "dxCalendar-nextMonthButtonLabel": "Next month",
    "dxCalendar-nextYearButtonLabel": "Next year",
    "dxCalendar-nextDecadeButtonLabel": "Next decade",
    "dxCalendar-nextCenturyButtonLabel": "Next century",
    "dxCalendar-captionMonthLabel": "Month selection",
    "dxCalendar-captionYearLabel": "Year selection",
    "dxCalendar-captionDecadeLabel": "Decade selection",
    "dxCalendar-captionCenturyLabel": "Century selection",
    "dxColorView-ariaRed": "Red",
    "dxColorView-ariaGreen": "Green",
    "dxColorView-ariaBlue": "Blue",
    "dxColorView-ariaAlpha": "Transparency",
    "dxColorView-ariaHex": "Color code",
    "dxTagBox-selected": "{0} selected",
    "dxTagBox-allSelected": "All selected ({0})",
    "dxTagBox-moreSelected": "{0} more",
    "vizExport-printingButtonText": "Print",
    "vizExport-titleMenuText": "Exporting/Printing",
    "vizExport-exportButtonText": "{0} file",
    "dxFilterBuilder-and": "And",
    "dxFilterBuilder-or": "Or",
    "dxFilterBuilder-notAnd": "Not And",
    "dxFilterBuilder-notOr": "Not Or",
    "dxFilterBuilder-addCondition": "Add Condition",
    "dxFilterBuilder-addGroup": "Add Group",
    "dxFilterBuilder-enterValueText": "<enter a value>",
    "dxFilterBuilder-filterOperationEquals": "Equals",
    "dxFilterBuilder-filterOperationNotEquals": "Does not equal",
    "dxFilterBuilder-filterOperationLess": "Is less than",
    "dxFilterBuilder-filterOperationLessOrEquals": "Is less than or equal to",
    "dxFilterBuilder-filterOperationGreater": "Is greater than",
    "dxFilterBuilder-filterOperationGreaterOrEquals": "Is greater than or equal to",
    "dxFilterBuilder-filterOperationStartsWith": "Starts with",
    "dxFilterBuilder-filterOperationContains": "Contains",
    "dxFilterBuilder-filterOperationNotContains": "Does not contain",
    "dxFilterBuilder-filterOperationEndsWith": "Ends with",
    "dxFilterBuilder-filterOperationIsBlank": "Is blank",
    "dxFilterBuilder-filterOperationIsNotBlank": "Is not blank",
    "dxFilterBuilder-filterOperationBetween": "Is between",
    "dxFilterBuilder-filterOperationAnyOf": "Is any of",
    "dxFilterBuilder-filterOperationNoneOf": "Is none of",
    "dxHtmlEditor-dialogColorCaption": "Change Font Color",
    "dxHtmlEditor-dialogBackgroundCaption": "Change Background Color",
    "dxHtmlEditor-dialogLinkCaption": "Add Link",
    "dxHtmlEditor-dialogLinkUrlField": "URL",
    "dxHtmlEditor-dialogLinkTextField": "Text",
    "dxHtmlEditor-dialogLinkTargetField": "Open link in new window",
    "dxHtmlEditor-dialogImageCaption": "Add Image",
    "dxHtmlEditor-dialogImageUrlField": "URL",
    "dxHtmlEditor-dialogImageAltField": "Alternate text",
    "dxHtmlEditor-dialogImageWidthField": "Width (px)",
    "dxHtmlEditor-dialogImageHeightField": "Height (px)",
    "dxHtmlEditor-dialogInsertTableRowsField": "Rows",
    "dxHtmlEditor-dialogInsertTableColumnsField": "Columns",
    "dxHtmlEditor-dialogInsertTableCaption": "Insert Table",
    "dxHtmlEditor-dialogUpdateImageCaption": "Update Image",
    "dxHtmlEditor-dialogImageUpdateButton": "Update",
    "dxHtmlEditor-dialogImageAddButton": "Add",
    "dxHtmlEditor-dialogImageSpecifyUrl": "From the Web",
    "dxHtmlEditor-dialogImageSelectFile": "From This Device",
    "dxHtmlEditor-dialogImageKeepAspectRatio": "Keep Aspect Ratio",
    "dxHtmlEditor-dialogImageEncodeToBase64": "Encode to Base64",
    "dxHtmlEditor-heading": "Heading",
    "dxHtmlEditor-normalText": "Normal text",
    "dxHtmlEditor-background": "Background Color",
    "dxHtmlEditor-bold": "Bold",
    "dxHtmlEditor-color": "Font Color",
    "dxHtmlEditor-font": "Font",
    "dxHtmlEditor-italic": "Italic",
    "dxHtmlEditor-link": "Add Link",
    "dxHtmlEditor-image": "Add Image",
    "dxHtmlEditor-size": "Size",
    "dxHtmlEditor-strike": "Strikethrough",
    "dxHtmlEditor-subscript": "Subscript",
    "dxHtmlEditor-superscript": "Superscript",
    "dxHtmlEditor-underline": "Underline",
    "dxHtmlEditor-blockquote": "Blockquote",
    "dxHtmlEditor-header": "Header",
    "dxHtmlEditor-increaseIndent": "Increase Indent",
    "dxHtmlEditor-decreaseIndent": "Decrease Indent",
    "dxHtmlEditor-orderedList": "Ordered List",
    "dxHtmlEditor-bulletList": "Bullet List",
    "dxHtmlEditor-alignLeft": "Align Left",
    "dxHtmlEditor-alignCenter": "Align Center",
    "dxHtmlEditor-alignRight": "Align Right",
    "dxHtmlEditor-alignJustify": "Align Justify",
    "dxHtmlEditor-codeBlock": "Code Block",
    "dxHtmlEditor-variable": "Add Variable",
    "dxHtmlEditor-undo": "Undo",
    "dxHtmlEditor-redo": "Redo",
    "dxHtmlEditor-clear": "Clear Formatting",
    "dxHtmlEditor-insertTable": "Insert Table",
    "dxHtmlEditor-insertHeaderRow": "Insert Header Row",
    "dxHtmlEditor-insertRowAbove": "Insert Row Above",
    "dxHtmlEditor-insertRowBelow": "Insert Row Below",
    "dxHtmlEditor-insertColumnLeft": "Insert Column Left",
    "dxHtmlEditor-insertColumnRight": "Insert Column Right",
    "dxHtmlEditor-deleteColumn": "Delete Column",
    "dxHtmlEditor-deleteRow": "Delete Row",
    "dxHtmlEditor-deleteTable": "Delete Table",
    "dxHtmlEditor-cellProperties": "Cell Properties",
    "dxHtmlEditor-tableProperties": "Table Properties",
    "dxHtmlEditor-insert": "Insert",
    "dxHtmlEditor-delete": "Delete",
    "dxHtmlEditor-border": "Border",
    "dxHtmlEditor-style": "Style",
    "dxHtmlEditor-width": "Width",
    "dxHtmlEditor-height": "Height",
    "dxHtmlEditor-borderColor": "Color",
    "dxHtmlEditor-borderWidth": "Border Width",
    "dxHtmlEditor-tableBackground": "Background",
    "dxHtmlEditor-dimensions": "Dimensions",
    "dxHtmlEditor-alignment": "Alignment",
    "dxHtmlEditor-horizontal": "Horizontal",
    "dxHtmlEditor-vertical": "Vertical",
    "dxHtmlEditor-paddingVertical": "Vertical Padding",
    "dxHtmlEditor-paddingHorizontal": "Horizontal Padding",
    "dxHtmlEditor-pixels": "Pixels",
    "dxHtmlEditor-list": "List",
    "dxHtmlEditor-ordered": "Ordered",
    "dxHtmlEditor-bullet": "Bullet",
    "dxHtmlEditor-align": "Align",
    "dxHtmlEditor-center": "Center",
    "dxHtmlEditor-left": "Left",
    "dxHtmlEditor-right": "Right",
    "dxHtmlEditor-indent": "Indent",
    "dxHtmlEditor-justify": "Justify",
    "dxHtmlEditor-borderStyleNone": "none",
    "dxHtmlEditor-borderStyleHidden": "hidden",
    "dxHtmlEditor-borderStyleDotted": "dotted",
    "dxHtmlEditor-borderStyleDashed": "dashed",
    "dxHtmlEditor-borderStyleSolid": "solid",
    "dxHtmlEditor-borderStyleDouble": "double",
    "dxHtmlEditor-borderStyleGroove": "groove",
    "dxHtmlEditor-borderStyleRidge": "ridge",
    "dxHtmlEditor-borderStyleInset": "inset",
    "dxHtmlEditor-borderStyleOutset": "outset",
    "dxFileManager-newDirectoryName": "Untitled directory",
    "dxFileManager-rootDirectoryName": "Files",
    "dxFileManager-errorNoAccess": "Access Denied. Operation could not be completed.",
    "dxFileManager-errorDirectoryExistsFormat": "Directory '{0}' already exists.",
    "dxFileManager-errorFileExistsFormat": "File '{0}' already exists.",
    "dxFileManager-errorFileNotFoundFormat": "File '{0}' not found.",
    "dxFileManager-errorDirectoryNotFoundFormat": "Directory '{0}' not found.",
    "dxFileManager-errorWrongFileExtension": "File extension is not allowed.",
    "dxFileManager-errorMaxFileSizeExceeded": "File size exceeds the maximum allowed size.",
    "dxFileManager-errorInvalidSymbols": "This name contains invalid characters.",
    "dxFileManager-errorDefault": "Unspecified error.",
    "dxFileManager-errorDirectoryOpenFailed": "The directory cannot be opened",
    "dxFileManager-commandCreate": "New directory",
    "dxFileManager-commandRename": "Rename",
    "dxFileManager-commandMove": "Move to",
    "dxFileManager-commandCopy": "Copy to",
    "dxFileManager-commandDelete": "Delete",
    "dxFileManager-commandDownload": "Download",
    "dxFileManager-commandUpload": "Upload files",
    "dxFileManager-commandRefresh": "Refresh",
    "dxFileManager-commandThumbnails": "Thumbnails View",
    "dxFileManager-commandDetails": "Details View",
    "dxFileManager-commandClearSelection": "Clear selection",
    "dxFileManager-commandShowNavPane": "Toggle navigation pane",
    "dxFileManager-dialogDirectoryChooserMoveTitle": "Move to",
    "dxFileManager-dialogDirectoryChooserMoveButtonText": "Move",
    "dxFileManager-dialogDirectoryChooserCopyTitle": "Copy to",
    "dxFileManager-dialogDirectoryChooserCopyButtonText": "Copy",
    "dxFileManager-dialogRenameItemTitle": "Rename",
    "dxFileManager-dialogRenameItemButtonText": "Save",
    "dxFileManager-dialogCreateDirectoryTitle": "New directory",
    "dxFileManager-dialogCreateDirectoryButtonText": "Create",
    "dxFileManager-dialogDeleteItemTitle": "Delete",
    "dxFileManager-dialogDeleteItemButtonText": "Delete",
    "dxFileManager-dialogDeleteItemSingleItemConfirmation": "Are you sure you want to delete {0}?",
    "dxFileManager-dialogDeleteItemMultipleItemsConfirmation": "Are you sure you want to delete {0} items?",
    "dxFileManager-dialogButtonCancel": "Cancel",
    "dxFileManager-editingCreateSingleItemProcessingMessage": "Creating a directory inside {0}",
    "dxFileManager-editingCreateSingleItemSuccessMessage": "Created a directory inside {0}",
    "dxFileManager-editingCreateSingleItemErrorMessage": "Directory was not created",
    "dxFileManager-editingCreateCommonErrorMessage": "Directory was not created",
    "dxFileManager-editingRenameSingleItemProcessingMessage": "Renaming an item inside {0}",
    "dxFileManager-editingRenameSingleItemSuccessMessage": "Renamed an item inside {0}",
    "dxFileManager-editingRenameSingleItemErrorMessage": "Item was not renamed",
    "dxFileManager-editingRenameCommonErrorMessage": "Item was not renamed",
    "dxFileManager-editingDeleteSingleItemProcessingMessage": "Deleting an item from {0}",
    "dxFileManager-editingDeleteMultipleItemsProcessingMessage": "Deleting {0} items from {1}",
    "dxFileManager-editingDeleteSingleItemSuccessMessage": "Deleted an item from {0}",
    "dxFileManager-editingDeleteMultipleItemsSuccessMessage": "Deleted {0} items from {1}",
    "dxFileManager-editingDeleteSingleItemErrorMessage": "Item was not deleted",
    "dxFileManager-editingDeleteMultipleItemsErrorMessage": "{0} items were not deleted",
    "dxFileManager-editingDeleteCommonErrorMessage": "Some items were not deleted",
    "dxFileManager-editingMoveSingleItemProcessingMessage": "Moving an item to {0}",
    "dxFileManager-editingMoveMultipleItemsProcessingMessage": "Moving {0} items to {1}",
    "dxFileManager-editingMoveSingleItemSuccessMessage": "Moved an item to {0}",
    "dxFileManager-editingMoveMultipleItemsSuccessMessage": "Moved {0} items to {1}",
    "dxFileManager-editingMoveSingleItemErrorMessage": "Item was not moved",
    "dxFileManager-editingMoveMultipleItemsErrorMessage": "{0} items were not moved",
    "dxFileManager-editingMoveCommonErrorMessage": "Some items were not moved",
    "dxFileManager-editingCopySingleItemProcessingMessage": "Copying an item to {0}",
    "dxFileManager-editingCopyMultipleItemsProcessingMessage": "Copying {0} items to {1}",
    "dxFileManager-editingCopySingleItemSuccessMessage": "Copied an item to {0}",
    "dxFileManager-editingCopyMultipleItemsSuccessMessage": "Copied {0} items to {1}",
    "dxFileManager-editingCopySingleItemErrorMessage": "Item was not copied",
    "dxFileManager-editingCopyMultipleItemsErrorMessage": "{0} items were not copied",
    "dxFileManager-editingCopyCommonErrorMessage": "Some items were not copied",
    "dxFileManager-editingUploadSingleItemProcessingMessage": "Uploading an item to {0}",
    "dxFileManager-editingUploadMultipleItemsProcessingMessage": "Uploading {0} items to {1}",
    "dxFileManager-editingUploadSingleItemSuccessMessage": "Uploaded an item to {0}",
    "dxFileManager-editingUploadMultipleItemsSuccessMessage": "Uploaded {0} items to {1}",
    "dxFileManager-editingUploadSingleItemErrorMessage": "Item was not uploaded",
    "dxFileManager-editingUploadMultipleItemsErrorMessage": "{0} items were not uploaded",
    "dxFileManager-editingUploadCanceledMessage": "Canceled",
    "dxFileManager-editingDownloadSingleItemErrorMessage": "Item was not downloaded",
    "dxFileManager-editingDownloadMultipleItemsErrorMessage": "{0} items were not downloaded",
    "dxFileManager-listDetailsColumnCaptionName": "Name",
    "dxFileManager-listDetailsColumnCaptionDateModified": "Date Modified",
    "dxFileManager-listDetailsColumnCaptionFileSize": "File Size",
    "dxFileManager-listThumbnailsTooltipTextSize": "Size",
    "dxFileManager-listThumbnailsTooltipTextDateModified": "Date Modified",
    "dxFileManager-notificationProgressPanelTitle": "Progress",
    "dxFileManager-notificationProgressPanelEmptyListText": "No operations",
    "dxFileManager-notificationProgressPanelOperationCanceled": "Canceled",
    "dxDiagram-categoryGeneral": "General",
    "dxDiagram-categoryFlowchart": "Flowchart",
    "dxDiagram-categoryOrgChart": "Org Chart",
    "dxDiagram-categoryContainers": "Containers",
    "dxDiagram-categoryCustom": "Custom",
    "dxDiagram-commandExportToSvg": "Export to SVG",
    "dxDiagram-commandExportToPng": "Export to PNG",
    "dxDiagram-commandExportToJpg": "Export to JPEG",
    "dxDiagram-commandUndo": "Undo",
    "dxDiagram-commandRedo": "Redo",
    "dxDiagram-commandFontName": "Font Name",
    "dxDiagram-commandFontSize": "Font Size",
    "dxDiagram-commandBold": "Bold",
    "dxDiagram-commandItalic": "Italic",
    "dxDiagram-commandUnderline": "Underline",
    "dxDiagram-commandTextColor": "Font Color",
    "dxDiagram-commandLineColor": "Line Color",
    "dxDiagram-commandLineWidth": "Line Width",
    "dxDiagram-commandLineStyle": "Line Style",
    "dxDiagram-commandLineStyleSolid": "Solid",
    "dxDiagram-commandLineStyleDotted": "Dotted",
    "dxDiagram-commandLineStyleDashed": "Dashed",
    "dxDiagram-commandFillColor": "Fill Color",
    "dxDiagram-commandAlignLeft": "Align Left",
    "dxDiagram-commandAlignCenter": "Align Center",
    "dxDiagram-commandAlignRight": "Align Right",
    "dxDiagram-commandConnectorLineType": "Connector Line Type",
    "dxDiagram-commandConnectorLineStraight": "Straight",
    "dxDiagram-commandConnectorLineOrthogonal": "Orthogonal",
    "dxDiagram-commandConnectorLineStart": "Connector Line Start",
    "dxDiagram-commandConnectorLineEnd": "Connector Line End",
    "dxDiagram-commandConnectorLineNone": "None",
    "dxDiagram-commandConnectorLineArrow": "Arrow",
    "dxDiagram-commandFullscreen": "Full Screen",
    "dxDiagram-commandUnits": "Units",
    "dxDiagram-commandPageSize": "Page Size",
    "dxDiagram-commandPageOrientation": "Page Orientation",
    "dxDiagram-commandPageOrientationLandscape": "Landscape",
    "dxDiagram-commandPageOrientationPortrait": "Portrait",
    "dxDiagram-commandPageColor": "Page Color",
    "dxDiagram-commandShowGrid": "Show Grid",
    "dxDiagram-commandSnapToGrid": "Snap to Grid",
    "dxDiagram-commandGridSize": "Grid Size",
    "dxDiagram-commandZoomLevel": "Zoom Level",
    "dxDiagram-commandAutoZoom": "Auto Zoom",
    "dxDiagram-commandFitToContent": "Fit to Content",
    "dxDiagram-commandFitToWidth": "Fit to Width",
    "dxDiagram-commandAutoZoomByContent": "Auto Zoom by Content",
    "dxDiagram-commandAutoZoomByWidth": "Auto Zoom by Width",
    "dxDiagram-commandSimpleView": "Simple View",
    "dxDiagram-commandCut": "Cut",
    "dxDiagram-commandCopy": "Copy",
    "dxDiagram-commandPaste": "Paste",
    "dxDiagram-commandSelectAll": "Select All",
    "dxDiagram-commandDelete": "Delete",
    "dxDiagram-commandBringToFront": "Bring to Front",
    "dxDiagram-commandSendToBack": "Send to Back",
    "dxDiagram-commandLock": "Lock",
    "dxDiagram-commandUnlock": "Unlock",
    "dxDiagram-commandInsertShapeImage": "Insert Image...",
    "dxDiagram-commandEditShapeImage": "Change Image...",
    "dxDiagram-commandDeleteShapeImage": "Delete Image",
    "dxDiagram-commandLayoutLeftToRight": "Left-to-right",
    "dxDiagram-commandLayoutRightToLeft": "Right-to-left",
    "dxDiagram-commandLayoutTopToBottom": "Top-to-bottom",
    "dxDiagram-commandLayoutBottomToTop": "Bottom-to-top",
    "dxDiagram-unitIn": "in",
    "dxDiagram-unitCm": "cm",
    "dxDiagram-unitPx": "px",
    "dxDiagram-dialogButtonOK": "OK",
    "dxDiagram-dialogButtonCancel": "Cancel",
    "dxDiagram-dialogInsertShapeImageTitle": "Insert Image",
    "dxDiagram-dialogEditShapeImageTitle": "Change Image",
    "dxDiagram-dialogEditShapeImageSelectButton": "Select image",
    "dxDiagram-dialogEditShapeImageLabelText": "or drop a file here",
    "dxDiagram-uiExport": "Export",
    "dxDiagram-uiProperties": "Properties",
    "dxDiagram-uiSettings": "Settings",
    "dxDiagram-uiShowToolbox": "Show Toolbox",
    "dxDiagram-uiSearch": "Search",
    "dxDiagram-uiStyle": "Style",
    "dxDiagram-uiLayout": "Layout",
    "dxDiagram-uiLayoutTree": "Tree",
    "dxDiagram-uiLayoutLayered": "Layered",
    "dxDiagram-uiDiagram": "Diagram",
    "dxDiagram-uiText": "Text",
    "dxDiagram-uiObject": "Object",
    "dxDiagram-uiConnector": "Connector",
    "dxDiagram-uiPage": "Page",
    "dxDiagram-shapeText": "Text",
    "dxDiagram-shapeRectangle": "Rectangle",
    "dxDiagram-shapeEllipse": "Ellipse",
    "dxDiagram-shapeCross": "Cross",
    "dxDiagram-shapeTriangle": "Triangle",
    "dxDiagram-shapeDiamond": "Diamond",
    "dxDiagram-shapeHeart": "Heart",
    "dxDiagram-shapePentagon": "Pentagon",
    "dxDiagram-shapeHexagon": "Hexagon",
    "dxDiagram-shapeOctagon": "Octagon",
    "dxDiagram-shapeStar": "Star",
    "dxDiagram-shapeArrowLeft": "Left Arrow",
    "dxDiagram-shapeArrowUp": "Up Arrow",
    "dxDiagram-shapeArrowRight": "Right Arrow",
    "dxDiagram-shapeArrowDown": "Down Arrow",
    "dxDiagram-shapeArrowUpDown": "Up Down Arrow",
    "dxDiagram-shapeArrowLeftRight": "Left Right Arrow",
    "dxDiagram-shapeProcess": "Process",
    "dxDiagram-shapeDecision": "Decision",
    "dxDiagram-shapeTerminator": "Terminator",
    "dxDiagram-shapePredefinedProcess": "Predefined Process",
    "dxDiagram-shapeDocument": "Document",
    "dxDiagram-shapeMultipleDocuments": "Multiple Documents",
    "dxDiagram-shapeManualInput": "Manual Input",
    "dxDiagram-shapePreparation": "Preparation",
    "dxDiagram-shapeData": "Data",
    "dxDiagram-shapeDatabase": "Database",
    "dxDiagram-shapeHardDisk": "Hard Disk",
    "dxDiagram-shapeInternalStorage": "Internal Storage",
    "dxDiagram-shapePaperTape": "Paper Tape",
    "dxDiagram-shapeManualOperation": "Manual Operation",
    "dxDiagram-shapeDelay": "Delay",
    "dxDiagram-shapeStoredData": "Stored Data",
    "dxDiagram-shapeDisplay": "Display",
    "dxDiagram-shapeMerge": "Merge",
    "dxDiagram-shapeConnector": "Connector",
    "dxDiagram-shapeOr": "Or",
    "dxDiagram-shapeSummingJunction": "Summing Junction",
    "dxDiagram-shapeContainerDefaultText": "Container",
    "dxDiagram-shapeVerticalContainer": "Vertical Container",
    "dxDiagram-shapeHorizontalContainer": "Horizontal Container",
    "dxDiagram-shapeCardDefaultText": "Person's Name",
    "dxDiagram-shapeCardWithImageOnLeft": "Card with Image on the Left",
    "dxDiagram-shapeCardWithImageOnTop": "Card with Image on the Top",
    "dxDiagram-shapeCardWithImageOnRight": "Card with Image on the Right",
    "dxGantt-dialogTitle": "Title",
    "dxGantt-dialogStartTitle": "Start",
    "dxGantt-dialogEndTitle": "End",
    "dxGantt-dialogProgressTitle": "Progress",
    "dxGantt-dialogResourcesTitle": "Resources",
    "dxGantt-dialogResourceManagerTitle": "Resource Manager",
    "dxGantt-dialogTaskDetailsTitle": "Task Details",
    "dxGantt-dialogEditResourceListHint": "Edit Resource List",
    "dxGantt-dialogEditNoResources": "No resources",
    "dxGantt-dialogButtonAdd": "Add",
    "dxGantt-contextMenuNewTask": "New Task",
    "dxGantt-contextMenuNewSubtask": "New Subtask",
    "dxGantt-contextMenuDeleteTask": "Delete Task",
    "dxGantt-contextMenuDeleteDependency": "Delete Dependency",
    "dxGantt-dialogTaskDeleteConfirmation": "Deleting a task also deletes all its dependencies and subtasks. Are you sure you want to delete this task?",
    "dxGantt-dialogDependencyDeleteConfirmation": "Are you sure you want to delete the dependency from the task?",
    "dxGantt-dialogResourcesDeleteConfirmation": "Deleting a resource also deletes it from tasks to which this resource is assigned. Are you sure you want to delete these resources? Resources: {0}",
    "dxGantt-dialogConstraintCriticalViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. This change would conflict with dependency rules. How would you like to proceed?",
    "dxGantt-dialogConstraintViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. How would you like to proceed?",
    "dxGantt-dialogCancelOperationMessage": "Cancel the operation",
    "dxGantt-dialogDeleteDependencyMessage": "Delete the dependency",
    "dxGantt-dialogMoveTaskAndKeepDependencyMessage": "Move the task and keep the dependency",
    "dxGantt-dialogConstraintCriticalViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. This change would conflict with dependency rules. How would you like to proceed?",
    "dxGantt-dialogConstraintViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. How would you like to proceed?",
    "dxGantt-dialogDeleteDependenciesMessage": "Delete the dependency relations",
    "dxGantt-dialogMoveTaskAndKeepDependenciesMessage": "Move the task and keep the dependencies",
    "dxGantt-undo": "Undo",
    "dxGantt-redo": "Redo",
    "dxGantt-expandAll": "Expand All",
    "dxGantt-collapseAll": "Collapse All",
    "dxGantt-addNewTask": "Add New Task",
    "dxGantt-deleteSelectedTask": "Delete Selected Task",
    "dxGantt-zoomIn": "Zoom In",
    "dxGantt-zoomOut": "Zoom Out",
    "dxGantt-fullScreen": "Full Screen",
    "dxGantt-quarter": "Q{0}",
    "dxGantt-sortingAscendingText": "Sort Ascending",
    "dxGantt-sortingDescendingText": "Sort Descending",
    "dxGantt-sortingClearText": "Clear Sorting",
    "dxGantt-showResources": "Show Resources",
    "dxGantt-showDependencies": "Show Dependencies",
    "dxGantt-dialogStartDateValidation": "Start date must be after {0}",
    "dxGantt-dialogEndDateValidation": "End date must be after {0}",
    "dxGallery-itemName": "Gallery item",
    "dxMultiView-elementAriaRoleDescription": "MultiView",
    "dxMultiView-elementAriaLabel": "Use the arrow keys or swipe to navigate between views",
    "dxMultiView-itemAriaRoleDescription": "View",
    "dxMultiView-itemAriaLabel": "{0} of {1}"
  }
};

// node_modules/devextreme/esm/localization/message.js
var baseDictionary = extend(true, {}, defaultMessages);
var getDataByLocale = (localeData, locale) => {
  var _Object$entries$find;
  return localeData[locale] || (null === locale || void 0 === locale ? void 0 : locale.toLowerCase) && (null === (_Object$entries$find = Object.entries(localeData).find((_ref) => {
    var [key] = _ref;
    return key.toLowerCase() === locale.toLowerCase();
  })) || void 0 === _Object$entries$find ? void 0 : _Object$entries$find[1]) || {};
};
var newMessages = {};
var messageLocalization = dependency_injector_default({
  engine: function() {
    return "base";
  },
  _dictionary: baseDictionary,
  load: function(messages) {
    extend(true, this._dictionary, messages);
  },
  _localizablePrefix: "@",
  setup: function(localizablePrefix) {
    this._localizablePrefix = localizablePrefix;
  },
  localizeString: function(text) {
    var that = this;
    var regex = new RegExp("(^|[^a-zA-Z_0-9" + that._localizablePrefix + "-]+)(" + that._localizablePrefix + "{1,2})([a-zA-Z_0-9-]+)", "g");
    var escapeString = that._localizablePrefix + that._localizablePrefix;
    return text.replace(regex, (str, prefix, escape, localizationKey) => {
      var defaultResult = that._localizablePrefix + localizationKey;
      var result;
      if (escape !== escapeString) {
        result = that.format(localizationKey);
      }
      if (!result) {
        newMessages[localizationKey] = humanize(localizationKey);
      }
      return prefix + (result || defaultResult);
    });
  },
  getMessagesByLocales: function() {
    return this._dictionary;
  },
  getDictionary: function(onlyNew) {
    if (onlyNew) {
      return newMessages;
    }
    return extend({}, newMessages, this.getMessagesByLocales()[core_default.locale()]);
  },
  getFormatter: function(key) {
    return this._getFormatterBase(key) || this._getFormatterBase(key, "en");
  },
  _getFormatterBase: function(key, locale) {
    var message = core_default.getValueByClosestLocale((locale2) => getDataByLocale(this._dictionary, locale2)[key]);
    if (message) {
      return function() {
        var args = 1 === arguments.length && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        args.unshift(message);
        return format.apply(this, args);
      };
    }
  },
  format: function(key) {
    var formatter = this.getFormatter(key);
    var values = Array.prototype.slice.call(arguments, 1);
    return formatter && formatter.apply(this, values) || "";
  }
});
var message_default = messageLocalization;

// node_modules/devextreme/esm/core/utils/shadow_dom.js
var DX_RULE_PREFIX = "dx-";
var ownerDocumentStyleSheet = null;
function createConstructedStyleSheet(rootNode) {
  try {
    return new CSSStyleSheet();
  } catch (err) {
    var styleElement = rootNode.ownerDocument.createElement("style");
    rootNode.appendChild(styleElement);
    return styleElement.sheet;
  }
}
function processRules(targetStyleSheet, styleSheets, needApplyAllStyles) {
  for (var i = 0; i < styleSheets.length; i++) {
    var sheet = styleSheets[i];
    try {
      for (var j = 0; j < sheet.cssRules.length; j++) {
        insertRule(targetStyleSheet, sheet.cssRules[j], needApplyAllStyles);
      }
    } catch (err) {
    }
  }
}
function insertRule(targetStyleSheet, rule, needApplyAllStyles) {
  var _rule$selectorText, _rule$cssRules, _rule$cssRules$, _rule$cssRules$$selec, _rule$name, _rule$style;
  var isDxRule = needApplyAllStyles || (null === (_rule$selectorText = rule.selectorText) || void 0 === _rule$selectorText ? void 0 : _rule$selectorText.includes(DX_RULE_PREFIX)) || (null === (_rule$cssRules = rule.cssRules) || void 0 === _rule$cssRules ? void 0 : null === (_rule$cssRules$ = _rule$cssRules[0]) || void 0 === _rule$cssRules$ ? void 0 : null === (_rule$cssRules$$selec = _rule$cssRules$.selectorText) || void 0 === _rule$cssRules$$selec ? void 0 : _rule$cssRules$$selec.includes(DX_RULE_PREFIX)) || (null === (_rule$name = rule.name) || void 0 === _rule$name ? void 0 : _rule$name.startsWith(DX_RULE_PREFIX)) || "DXIcons" === (null === (_rule$style = rule.style) || void 0 === _rule$style ? void 0 : _rule$style.fontFamily);
  if (isDxRule) {
    targetStyleSheet.insertRule(rule.cssText, targetStyleSheet.cssRules.length);
  }
}
function addShadowDomStyles($element) {
  var _el$getRootNode;
  var el = $element.get(0);
  var root = null === (_el$getRootNode = el.getRootNode) || void 0 === _el$getRootNode ? void 0 : _el$getRootNode.call(el);
  if (!(null !== root && void 0 !== root && root.host)) {
    return;
  }
  if (!ownerDocumentStyleSheet) {
    ownerDocumentStyleSheet = createConstructedStyleSheet(root);
    processRules(ownerDocumentStyleSheet, el.ownerDocument.styleSheets, false);
  }
  var currentShadowDomStyleSheet = createConstructedStyleSheet(root);
  processRules(currentShadowDomStyleSheet, root.styleSheets, true);
  root.adoptedStyleSheets = [ownerDocumentStyleSheet, currentShadowDomStyleSheet];
}
function isPositionInElementRectangle(element, x, y) {
  var _element$getBoundingC;
  var rect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
  return rect && x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}
function createQueue() {
  var shiftIndex = 0;
  var items = [];
  return {
    push(item) {
      items.push(item);
      return this;
    },
    shift() {
      shiftIndex++;
      return items[shiftIndex - 1];
    },
    get length() {
      return items.length - shiftIndex;
    },
    get items() {
      return items;
    }
  };
}
function getShadowElementsFromPoint(x, y, root) {
  var elementQueue = createQueue().push(root);
  while (elementQueue.length) {
    var el = elementQueue.shift();
    for (var i = 0; i < el.childNodes.length; i++) {
      var childNode = el.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE && isPositionInElementRectangle(childNode, x, y) && "none" !== getComputedStyle(childNode).pointerEvents) {
        elementQueue.push(childNode);
      }
    }
  }
  var result = elementQueue.items.reverse();
  result.pop();
  return result;
}

// node_modules/devextreme/esm/core/dom_adapter.js
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var nativeDOMAdapterStrategy = {
  querySelectorAll: (element, selector) => element.querySelectorAll(selector),
  elementMatches(element, selector) {
    var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || ((selector2) => {
      var doc = element.document || element.ownerDocument;
      if (!doc) {
        return false;
      }
      var items = this.querySelectorAll(doc, selector2);
      for (var i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    });
    return matches.call(element, selector);
  },
  createElement(tagName, context2) {
    context2 = context2 || this._document;
    return context2.createElement(tagName);
  },
  createElementNS(ns, tagName, context2) {
    context2 = context2 || this._document;
    return context2.createElementNS(ns, tagName);
  },
  createTextNode(text, context2) {
    context2 = context2 || this._document;
    return context2.createTextNode(text);
  },
  createAttribute(text, context2) {
    context2 = context2 || this._document;
    return context2.createAttribute(text);
  },
  isNode: (element) => element && "object" === typeof element && "nodeType" in element && "nodeName" in element,
  isElementNode: (element) => element && element.nodeType === ELEMENT_NODE,
  isTextNode: (element) => element && element.nodeType === TEXT_NODE,
  isDocument: (element) => element && element.nodeType === DOCUMENT_NODE,
  isDocumentFragment: (element) => element && element.nodeType === DOCUMENT_FRAGMENT_NODE,
  removeElement(element) {
    var parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute: (element, name) => element.getAttribute(name),
  setAttribute(element, name, value2) {
    if ("style" === name) {
      element.style.cssText = value2;
    } else {
      element.setAttribute(name, value2);
    }
  },
  removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty(element, name, value2) {
    element[name] = value2;
  },
  setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass(element, className, isAdd) {
    if (1 === element.nodeType && className) {
      isAdd ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  setStyle(element, name, value2) {
    element.style[name] = value2 || "";
  },
  _document: "undefined" === typeof document ? void 0 : document,
  getDocument() {
    return this._document;
  },
  getActiveElement(element) {
    var activeElementHolder = this.getRootNode(element);
    return activeElementHolder.activeElement;
  },
  getRootNode(element) {
    var _element$getRootNode, _element$getRootNode2;
    return null !== (_element$getRootNode = null === element || void 0 === element ? void 0 : null === (_element$getRootNode2 = element.getRootNode) || void 0 === _element$getRootNode2 ? void 0 : _element$getRootNode2.call(element)) && void 0 !== _element$getRootNode ? _element$getRootNode : this._document;
  },
  getBody() {
    return this._document.body;
  },
  createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation() {
    return this._document.location;
  },
  getSelection() {
    return this._document.selection;
  },
  getReadyState() {
    return this._document.readyState;
  },
  getHead() {
    return this._document.head;
  },
  hasDocumentProperty(property) {
    return property in this._document;
  },
  listen(element, event, callback, options) {
    if (!element || !("addEventListener" in element)) {
      return noop2;
    }
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback);
    };
  },
  elementsFromPoint(x, y, element) {
    var activeElementHolder = this.getRootNode(element);
    if (activeElementHolder.host) {
      return getShadowElementsFromPoint(x, y, activeElementHolder);
    }
    return activeElementHolder.elementsFromPoint(x, y);
  }
};
var dom_adapter_default = dependency_injector_default(nativeDOMAdapterStrategy);

// node_modules/devextreme/esm/core/utils/window.js
var hasWindowValue = "undefined" !== typeof window;
var hasWindow = () => hasWindowValue;
var windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}
var getWindow = () => windowObject;
var hasProperty = (prop) => hasWindow() && prop in windowObject;
var defaultScreenFactorFunc = (width) => {
  if (width < 768) {
    return "xs";
  } else if (width < 992) {
    return "sm";
  } else if (width < 1200) {
    return "md";
  } else {
    return "lg";
  }
};
var getCurrentScreenFactor = (screenFactorCallback) => {
  var screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
  var windowWidth = dom_adapter_default.getDocumentElement().clientWidth;
  return screenFactorFunc(windowWidth);
};
var getNavigator = () => hasWindow() ? windowObject.navigator : {
  userAgent: ""
};

// node_modules/devextreme/esm/core/utils/call_once.js
var callOnce = function(handler) {
  var result;
  var _wrappedHandler = function() {
    result = handler.apply(this, arguments);
    _wrappedHandler = function() {
      return result;
    };
    return result;
  };
  return function() {
    return _wrappedHandler.apply(this, arguments);
  };
};
var call_once_default = callOnce;

// node_modules/devextreme/esm/animation/frame.js
var window2 = hasWindow() ? getWindow() : {};
var FRAME_ANIMATION_STEP_TIME = 1e3 / 60;
var request = function(callback) {
  return setTimeout(callback, FRAME_ANIMATION_STEP_TIME);
};
var cancel = function(requestID) {
  clearTimeout(requestID);
};
var setAnimationFrameMethods = call_once_default(function() {
  var nativeRequest = window2.requestAnimationFrame || window2.webkitRequestAnimationFrame || window2.mozRequestAnimationFrame || window2.oRequestAnimationFrame || window2.msRequestAnimationFrame;
  var nativeCancel = window2.cancelAnimationFrame || window2.webkitCancelAnimationFrame || window2.mozCancelAnimationFrame || window2.oCancelAnimationFrame || window2.msCancelAnimationFrame;
  if (nativeRequest && nativeCancel) {
    request = nativeRequest;
    cancel = nativeCancel;
  }
});
function requestAnimationFrame() {
  setAnimationFrameMethods();
  return request.apply(window2, arguments);
}
function cancelAnimationFrame() {
  setAnimationFrameMethods();
  cancel.apply(window2, arguments);
}

// node_modules/devextreme/esm/core/memorized_callbacks.js
var MemorizedCallbacks = class {
  constructor() {
    this.memory = [];
    this.callbacks = callbacks_default();
  }
  add(fn) {
    each(this.memory, (_, item) => fn.apply(fn, item));
    this.callbacks.add(fn);
  }
  remove(fn) {
    this.callbacks.remove(fn);
  }
  fire() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
};

// node_modules/devextreme/esm/events/core/event_registrator_callbacks.js
var event_registrator_callbacks_default = new MemorizedCallbacks();

// node_modules/devextreme/esm/events/core/hook_touch_props.js
var touchPropsToHook = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
var touchPropHook = function(name, event) {
  if (event[name] && !event.touches || !event.touches) {
    return event[name];
  }
  var touches = event.touches.length ? event.touches : event.changedTouches;
  if (!touches.length) {
    return;
  }
  return touches[0][name];
};
function hook_touch_props_default(callback) {
  touchPropsToHook.forEach(function(name) {
    callback(name, function(event) {
      return touchPropHook(name, event);
    });
  }, this);
}

// node_modules/devextreme/esm/events/core/events_engine.js
var window3 = getWindow();
var EMPTY_EVENT_NAME = "dxEmptyEventType";
var NATIVE_EVENTS_TO_SUBSCRIBE = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
};
var NATIVE_EVENTS_TO_TRIGGER = {
  focusin: "focus",
  focusout: "blur"
};
var NO_BUBBLE_EVENTS = ["blur", "focus", "load"];
var forcePassiveFalseEventNames = ["touchmove", "wheel", "mousewheel", "touchstart"];
var EVENT_PROPERTIES = ["target", "relatedTarget", "delegateTarget", "altKey", "bubbles", "cancelable", "changedTouches", "ctrlKey", "detail", "eventPhase", "metaKey", "shiftKey", "view", "char", "code", "charCode", "key", "keyCode", "button", "buttons", "offsetX", "offsetY", "pointerId", "pointerType", "targetTouches", "toElement", "touches"];
function matchesSafe(target, selector) {
  return !isWindow(target) && "#document" !== target.nodeName && dom_adapter_default.elementMatches(target, selector);
}
var elementDataMap = /* @__PURE__ */ new WeakMap();
var guid = 0;
var skipEvent;
var special = function() {
  var specialData = {};
  event_registrator_callbacks_default.add(function(eventName, eventObject) {
    specialData[eventName] = eventObject;
  });
  return {
    getField: function(eventName, field) {
      return specialData[eventName] && specialData[eventName][field];
    },
    callMethod: function(eventName, methodName, context2, args) {
      return specialData[eventName] && specialData[eventName][methodName] && specialData[eventName][methodName].apply(context2, args);
    }
  };
}();
var eventsEngine = dependency_injector_default({
  on: getHandler(normalizeOnArguments(iterate(function(element, eventName, selector, data2, handler) {
    var handlersController = getHandlersController(element, eventName);
    handlersController.addHandler(handler, selector, data2);
  }))),
  one: getHandler(normalizeOnArguments(function(element, eventName, selector, data2, handler) {
    eventsEngine.on(element, eventName, selector, data2, function oneTimeHandler() {
      eventsEngine.off(element, eventName, selector, oneTimeHandler);
      handler.apply(this, arguments);
    });
  })),
  off: getHandler(normalizeOffArguments(iterate(function(element, eventName, selector, handler) {
    var handlersController = getHandlersController(element, eventName);
    handlersController.removeHandler(handler, selector);
  }))),
  trigger: getHandler(normalizeTriggerArguments(function(element, event, extraParameters) {
    var eventName = event.type;
    var handlersController = getHandlersController(element, event.type);
    special.callMethod(eventName, "trigger", element, [event, extraParameters]);
    handlersController.callHandlers(event, extraParameters);
    var noBubble = special.getField(eventName, "noBubble") || event.isPropagationStopped() || -1 !== NO_BUBBLE_EVENTS.indexOf(eventName);
    if (!noBubble) {
      var parents = [];
      !function getParents(element2) {
        var _element$parentNode;
        var parent = null !== (_element$parentNode = element2.parentNode) && void 0 !== _element$parentNode ? _element$parentNode : isObject(element2.host) ? element2.host : null;
        if (parent) {
          parents.push(parent);
          getParents(parent);
        }
      }(element);
      parents.push(window3);
      var i = 0;
      while (parents[i] && !event.isPropagationStopped()) {
        var parentDataByEvent = getHandlersController(parents[i], event.type);
        parentDataByEvent.callHandlers(extend(event, {
          currentTarget: parents[i]
        }), extraParameters);
        i++;
      }
    }
    if (element.nodeType || isWindow(element)) {
      special.callMethod(eventName, "_default", element, [event, extraParameters]);
      callNativeMethod(eventName, element);
    }
  })),
  triggerHandler: getHandler(normalizeTriggerArguments(function(element, event, extraParameters) {
    var handlersController = getHandlersController(element, event.type);
    handlersController.callHandlers(event, extraParameters);
  }))
});
function applyForEach(args, method) {
  var element = args[0];
  if (!element) {
    return;
  }
  if (dom_adapter_default.isNode(element) || isWindow(element)) {
    method.apply(eventsEngine, args);
  } else if (!isString(element) && "length" in element) {
    var itemArgs = Array.prototype.slice.call(args, 0);
    Array.prototype.forEach.call(element, function(itemElement) {
      itemArgs[0] = itemElement;
      applyForEach(itemArgs, method);
    });
  } else {
    throw errors_default.Error("E0025");
  }
}
function getHandler(method) {
  return function() {
    applyForEach(arguments, method);
  };
}
function detectPassiveEventHandlersSupport() {
  var isSupported = false;
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        isSupported = true;
        return true;
      }
    });
    window3.addEventListener("test", null, options);
  } catch (e) {
  }
  return isSupported;
}
var passiveEventHandlersSupported = call_once_default(detectPassiveEventHandlersSupport);
var contains = (container, element) => {
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS);
};
function getHandlersController(element, eventName) {
  var elementData = elementDataMap.get(element);
  eventName = eventName || "";
  var eventNameParts = eventName.split(".");
  var namespaces = eventNameParts.slice(1);
  var eventNameIsDefined = !!eventNameParts[0];
  eventName = eventNameParts[0] || EMPTY_EVENT_NAME;
  if (!elementData) {
    elementData = {};
    elementDataMap.set(element, elementData);
  }
  if (!elementData[eventName]) {
    elementData[eventName] = {
      handleObjects: [],
      nativeHandler: null
    };
  }
  var eventData2 = elementData[eventName];
  return {
    addHandler: function(handler, selector, data2) {
      var callHandler = function(e, extraParameters) {
        var handlerArgs = [e];
        var target = e.currentTarget;
        var relatedTarget = e.relatedTarget;
        var secondaryTargetIsInside;
        var result;
        if (eventName in NATIVE_EVENTS_TO_SUBSCRIBE) {
          secondaryTargetIsInside = relatedTarget && target && (relatedTarget === target || contains(target, relatedTarget));
        }
        if (void 0 !== extraParameters) {
          handlerArgs.push(extraParameters);
        }
        special.callMethod(eventName, "handle", element, [e, data2]);
        if (!secondaryTargetIsInside) {
          result = handler.apply(target, handlerArgs);
        }
        if (false === result) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      var handleObject = {
        handler,
        wrappedHandler: function(e, extraParameters) {
          if (skipEvent && e.type === skipEvent) {
            return;
          }
          e.data = data2;
          e.delegateTarget = element;
          if (selector) {
            var currentTarget = e.target;
            while (currentTarget && currentTarget !== element) {
              if (matchesSafe(currentTarget, selector)) {
                e.currentTarget = currentTarget;
                callHandler(e, extraParameters);
              }
              currentTarget = currentTarget.parentNode;
            }
          } else {
            e.currentTarget = e.delegateTarget || e.target;
            callHandler(e, extraParameters);
          }
        },
        selector,
        type: eventName,
        data: data2,
        namespace: namespaces.join("."),
        namespaces,
        guid: ++guid
      };
      eventData2.handleObjects.push(handleObject);
      var firstHandlerForTheType = 1 === eventData2.handleObjects.length;
      var shouldAddNativeListener = firstHandlerForTheType && eventNameIsDefined;
      var nativeListenerOptions;
      if (shouldAddNativeListener) {
        shouldAddNativeListener = !special.callMethod(eventName, "setup", element, [data2, namespaces, handler]);
      }
      if (shouldAddNativeListener) {
        eventData2.nativeHandler = getNativeHandler(eventName);
        if (passiveEventHandlersSupported() && forcePassiveFalseEventNames.indexOf(eventName) > -1) {
          nativeListenerOptions = {
            passive: false
          };
        }
        eventData2.removeListener = dom_adapter_default.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData2.nativeHandler, nativeListenerOptions);
      }
      special.callMethod(eventName, "add", element, [handleObject]);
    },
    removeHandler: function(handler, selector) {
      var removeByEventName = function(eventName2) {
        var eventData3 = elementData[eventName2];
        if (!eventData3.handleObjects.length) {
          delete elementData[eventName2];
          return;
        }
        var removedHandler;
        eventData3.handleObjects = eventData3.handleObjects.filter(function(handleObject) {
          var skip = namespaces.length && !isSubset(handleObject.namespaces, namespaces) || handler && handleObject.handler !== handler || selector && handleObject.selector !== selector;
          if (!skip) {
            removedHandler = handleObject.handler;
            special.callMethod(eventName2, "remove", element, [handleObject]);
          }
          return skip;
        });
        var lastHandlerForTheType = !eventData3.handleObjects.length;
        var shouldRemoveNativeListener = lastHandlerForTheType && eventName2 !== EMPTY_EVENT_NAME;
        if (shouldRemoveNativeListener) {
          special.callMethod(eventName2, "teardown", element, [namespaces, removedHandler]);
          if (eventData3.nativeHandler) {
            eventData3.removeListener();
          }
          delete elementData[eventName2];
        }
      };
      if (eventNameIsDefined) {
        removeByEventName(eventName);
      } else {
        for (var name in elementData) {
          removeByEventName(name);
        }
      }
      var elementDataIsEmpty = 0 === Object.keys(elementData).length;
      if (elementDataIsEmpty) {
        elementDataMap.delete(element);
      }
    },
    callHandlers: function(event, extraParameters) {
      var forceStop = false;
      var handleCallback = function(handleObject) {
        if (forceStop) {
          return;
        }
        if (!namespaces.length || isSubset(handleObject.namespaces, namespaces)) {
          handleObject.wrappedHandler(event, extraParameters);
          forceStop = event.isImmediatePropagationStopped();
        }
      };
      eventData2.handleObjects.forEach(handleCallback);
      if (namespaces.length && elementData[EMPTY_EVENT_NAME]) {
        elementData[EMPTY_EVENT_NAME].handleObjects.forEach(handleCallback);
      }
    }
  };
}
function getNativeHandler(subscribeName) {
  return function(event, extraParameters) {
    var handlersController = getHandlersController(this, subscribeName);
    event = eventsEngine.Event(event);
    handlersController.callHandlers(event, extraParameters);
  };
}
function isSubset(original, checked) {
  for (var i = 0; i < checked.length; i++) {
    if (original.indexOf(checked[i]) < 0) {
      return false;
    }
  }
  return true;
}
function normalizeOnArguments(callback) {
  return function(element, eventName, selector, data2, handler) {
    if (!handler) {
      handler = data2;
      data2 = void 0;
    }
    if ("string" !== typeof selector) {
      data2 = selector;
      selector = void 0;
    }
    if (!handler && "string" === typeof eventName) {
      handler = data2 || selector;
      selector = void 0;
      data2 = void 0;
    }
    callback(element, eventName, selector, data2, handler);
  };
}
function normalizeOffArguments(callback) {
  return function(element, eventName, selector, handler) {
    if ("function" === typeof selector) {
      handler = selector;
      selector = void 0;
    }
    callback(element, eventName, selector, handler);
  };
}
function normalizeTriggerArguments(callback) {
  return function(element, src, extraParameters) {
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!src.target) {
      src.target = element;
    }
    src.currentTarget = element;
    if (!src.delegateTarget) {
      src.delegateTarget = element;
    }
    if (!src.type && src.originalEvent) {
      src.type = src.originalEvent.type;
    }
    callback(element, src instanceof eventsEngine.Event ? src : eventsEngine.Event(src), extraParameters);
  };
}
function normalizeEventArguments(callback) {
  eventsEngine.Event = function(src, config2) {
    if (!(this instanceof eventsEngine.Event)) {
      return new eventsEngine.Event(src, config2);
    }
    if (!src) {
      src = {};
    }
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!config2) {
      config2 = {};
    }
    callback.call(this, src, config2);
  };
  _extends(eventsEngine.Event.prototype, {
    _propagationStopped: false,
    _immediatePropagationStopped: false,
    _defaultPrevented: false,
    isPropagationStopped: function() {
      return !!(this._propagationStopped || this.originalEvent && this.originalEvent.propagationStopped);
    },
    stopPropagation: function() {
      this._propagationStopped = true;
      this.originalEvent && this.originalEvent.stopPropagation();
    },
    isImmediatePropagationStopped: function() {
      return this._immediatePropagationStopped;
    },
    stopImmediatePropagation: function() {
      this.stopPropagation();
      this._immediatePropagationStopped = true;
      this.originalEvent && this.originalEvent.stopImmediatePropagation();
    },
    isDefaultPrevented: function() {
      return !!(this._defaultPrevented || this.originalEvent && this.originalEvent.defaultPrevented);
    },
    preventDefault: function() {
      this._defaultPrevented = true;
      this.originalEvent && this.originalEvent.preventDefault();
    }
  });
  return eventsEngine.Event;
}
function iterate(callback) {
  var iterateEventNames = function(element, eventName) {
    if (eventName && eventName.indexOf(" ") > -1) {
      var args = Array.prototype.slice.call(arguments, 0);
      eventName.split(" ").forEach(function(eventName2) {
        args[1] = eventName2;
        callback.apply(this, args);
      });
    } else {
      callback.apply(this, arguments);
    }
  };
  return function(element, eventName) {
    if ("object" === typeof eventName) {
      var args = Array.prototype.slice.call(arguments, 0);
      for (var name in eventName) {
        args[1] = name;
        args[args.length - 1] = eventName[name];
        iterateEventNames.apply(this, args);
      }
    } else {
      iterateEventNames.apply(this, arguments);
    }
  };
}
function callNativeMethod(eventName, element) {
  var nativeMethodName = NATIVE_EVENTS_TO_TRIGGER[eventName] || eventName;
  if (function(eventName2, element2) {
    return "click" === eventName2 && "a" === element2.localName;
  }(eventName, element)) {
    return;
  }
  if (isFunction(element[nativeMethodName])) {
    skipEvent = eventName;
    element[nativeMethodName]();
    skipEvent = void 0;
  }
}
function calculateWhich(event) {
  if (function(event2) {
    return null == event2.which && 0 === event2.type.indexOf("key");
  }(event)) {
    return null != event.charCode ? event.charCode : event.keyCode;
  }
  if (function(event2) {
    return !event2.which && void 0 !== event2.button && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(event2.type);
  }(event)) {
    return {
      1: 1,
      2: 3,
      3: 1,
      4: 2
    }[event.button];
  }
  return event.which;
}
function initEvent(EventClass) {
  if (EventClass) {
    eventsEngine.Event = EventClass;
    eventsEngine.Event.prototype = EventClass.prototype;
  }
}
initEvent(normalizeEventArguments(function(src, config2) {
  var _src$view;
  var srcIsEvent = src instanceof eventsEngine.Event || hasWindow() && src instanceof window3.Event || (null === (_src$view = src.view) || void 0 === _src$view ? void 0 : _src$view.Event) && src instanceof src.view.Event;
  if (srcIsEvent) {
    this.originalEvent = src;
    this.type = src.type;
    this.currentTarget = void 0;
    if (Object.prototype.hasOwnProperty.call(src, "isTrusted")) {
      this.isTrusted = src.isTrusted;
    }
    this.timeStamp = src.timeStamp || Date.now();
  } else {
    _extends(this, src);
  }
  addProperty("which", calculateWhich, this);
  if (0 === src.type.indexOf("touch")) {
    delete config2.pageX;
    delete config2.pageY;
  }
  _extends(this, config2);
  this.guid = ++guid;
}));
function addProperty(propName, hook, eventInstance) {
  Object.defineProperty(eventInstance || eventsEngine.Event.prototype, propName, {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.originalEvent && hook(this.originalEvent);
    },
    set: function(value2) {
      Object.defineProperty(this, propName, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value2
      });
    }
  });
}
EVENT_PROPERTIES.forEach((prop) => addProperty(prop, (event) => event[prop]));
hook_touch_props_default(addProperty);
var beforeSetStrategy = callbacks_default();
var afterSetStrategy = callbacks_default();
eventsEngine.set = function(engine) {
  beforeSetStrategy.fire();
  eventsEngine.inject(engine);
  initEvent(engine.Event);
  afterSetStrategy.fire();
};
eventsEngine.subscribeGlobal = function() {
  applyForEach(arguments, normalizeOnArguments(function() {
    var args = arguments;
    eventsEngine.on.apply(this, args);
    beforeSetStrategy.add(function() {
      var offArgs = Array.prototype.slice.call(args, 0);
      offArgs.splice(3, 1);
      eventsEngine.off.apply(this, offArgs);
    });
    afterSetStrategy.add(function() {
      eventsEngine.on.apply(this, args);
    });
  }));
};
eventsEngine.forcePassiveFalseEventNames = forcePassiveFalseEventNames;
eventsEngine.passiveEventHandlersSupported = passiveEventHandlersSupported;
var events_engine_default = eventsEngine;

// node_modules/devextreme/esm/core/utils/size.js
var window4 = getWindow();
var SPECIAL_HEIGHT_VALUES = ["auto", "none", "inherit", "initial"];
var getSizeByStyles = function(elementStyles, styles) {
  var result = 0;
  styles.forEach(function(style) {
    result += parseFloat(elementStyles[style]) || 0;
  });
  return result;
};
var getElementBoxParams = function(name, elementStyles) {
  var beforeName = "width" === name ? "Left" : "Top";
  var afterName = "width" === name ? "Right" : "Bottom";
  return {
    padding: getSizeByStyles(elementStyles, ["padding" + beforeName, "padding" + afterName]),
    border: getSizeByStyles(elementStyles, ["border" + beforeName + "Width", "border" + afterName + "Width"]),
    margin: getSizeByStyles(elementStyles, ["margin" + beforeName, "margin" + afterName])
  };
};
var getElementComputedStyle = function(element) {
  var _element$ownerDocumen;
  var view = (null === element || void 0 === element ? void 0 : null === (_element$ownerDocumen = element.ownerDocument) || void 0 === _element$ownerDocumen ? void 0 : _element$ownerDocumen.defaultView) || window4;
  return view.getComputedStyle && view.getComputedStyle(element);
};
var getCSSProperty = function(element, styles, name, defaultValue) {
  var _element$style;
  return (null === styles || void 0 === styles ? void 0 : styles[name]) || (null === (_element$style = element.style) || void 0 === _element$style ? void 0 : _element$style[name]) || defaultValue;
};
var boxIndices = {
  content: 0,
  padding: 1,
  border: 2,
  margin: 3,
  "content-box": 0,
  "border-box": 2
};
var dimensionComponents = {
  width: ["left", "right"],
  height: ["top", "bottom"]
};
function getComponentThickness(elem, dimension, component, styles) {
  var get = (elem2, styles2, field) => parseFloat(getCSSProperty(elem2, styles2, field, "0")) || 0;
  var suffix = "border" === component ? "-width" : "";
  return get(elem, styles, "".concat(component, "-").concat(dimensionComponents[dimension][0]).concat(suffix)) + get(elem, styles, "".concat(component, "-").concat(dimensionComponents[dimension][1]).concat(suffix));
}
var getSize = function(element, dimension, box) {
  var offsetFieldName = "width" === dimension ? "offsetWidth" : "offsetHeight";
  var styles = getElementComputedStyle(element);
  var result = getCSSProperty(element, styles, dimension);
  if ("" === result || "auto" === result) {
    result = element[offsetFieldName];
  }
  result = parseFloat(result) || 0;
  var currentBox = getCSSProperty(element, styles, "boxSizing", "content-box");
  var targetBox = box || currentBox;
  var targetBoxIndex = boxIndices[targetBox];
  var currentBoxIndex = boxIndices[currentBox];
  if (void 0 === targetBoxIndex || void 0 === currentBoxIndex) {
    throw new Error();
  }
  if (currentBoxIndex === targetBoxIndex) {
    return result;
  }
  var coeff = Math.sign(targetBoxIndex - currentBoxIndex);
  var padding = false;
  var border = false;
  var margin = false;
  var scrollThickness = false;
  if (1 === coeff) {
    targetBoxIndex += 1;
    currentBoxIndex += 1;
  }
  for (var boxPart = currentBoxIndex; boxPart !== targetBoxIndex; boxPart += coeff) {
    switch (boxPart) {
      case boxIndices.content:
        break;
      case boxIndices.padding:
        padding = coeff * getComponentThickness(element, dimension, "padding", styles);
        break;
      case boxIndices.border:
        border = coeff * getComponentThickness(element, dimension, "border", styles);
        break;
      case boxIndices.margin:
        margin = coeff * getComponentThickness(element, dimension, "margin", styles);
    }
  }
  if (padding || border) {
    var paddingAndBorder = (false === padding ? coeff * getComponentThickness(element, dimension, "padding", styles) : padding) + (false === border ? coeff * getComponentThickness(element, dimension, "border", styles) : border);
    scrollThickness = coeff * Math.max(0, Math.floor(element[offsetFieldName] - result - coeff * paddingAndBorder)) || 0;
  }
  return result + margin + padding + border + scrollThickness;
};
var getContainerHeight = function(container) {
  return isWindow(container) ? container.innerHeight : container.offsetHeight;
};
var parseHeight = function(value2, container, element) {
  if (value2.indexOf("px") > 0) {
    value2 = parseInt(value2.replace("px", ""));
  } else if (value2.indexOf("%") > 0) {
    value2 = parseInt(value2.replace("%", "")) * getContainerHeight(container) / 100;
  } else if (!isNaN(value2)) {
    value2 = parseInt(value2);
  } else if (value2.indexOf("vh") > 0) {
    value2 = window4.innerHeight / 100 * parseInt(value2.replace("vh", ""));
  } else if (element && value2.indexOf("em") > 0) {
    value2 = parseFloat(value2.replace("em", "")) * parseFloat(window4.getComputedStyle(element).fontSize);
  }
  return value2;
};
var getHeightWithOffset = function(value2, offset2, container) {
  if (!value2) {
    return null;
  }
  if (SPECIAL_HEIGHT_VALUES.indexOf(value2) > -1) {
    return offset2 ? null : value2;
  }
  if (isString(value2)) {
    value2 = parseHeight(value2, container);
  }
  if (isNumeric(value2)) {
    return Math.max(0, value2 + offset2);
  }
  var operationString = offset2 < 0 ? " - " : " ";
  return "calc(" + value2 + operationString + Math.abs(offset2) + "px)";
};
var addOffsetToMaxHeight = function(value2, offset2, container) {
  var maxHeight = getHeightWithOffset(value2, offset2, container);
  return null !== maxHeight ? maxHeight : "none";
};
var addOffsetToMinHeight = function(value2, offset2, container) {
  var minHeight = getHeightWithOffset(value2, offset2, container);
  return null !== minHeight ? minHeight : 0;
};
var getVerticalOffsets = function(element, withMargins) {
  if (!element) {
    return 0;
  }
  var boxParams = getElementBoxParams("height", window4.getComputedStyle(element));
  return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
};
var getVisibleHeight = function(element) {
  if (element) {
    var _element$getBoundingC;
    var boundingClientRect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
    if (null !== boundingClientRect && void 0 !== boundingClientRect && boundingClientRect.height) {
      return boundingClientRect.height;
    }
  }
  return 0;
};
var implementationsMap = {
  getWidth: function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return elementSizeHelper("width", ...args);
  },
  setWidth: function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return elementSizeHelper("width", ...args);
  },
  getHeight: function() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return elementSizeHelper("height", ...args);
  },
  setHeight: function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return elementSizeHelper("height", ...args);
  },
  getOuterWidth: function() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  setOuterWidth: function() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  getOuterHeight: function() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  setOuterHeight: function() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  getInnerWidth: function() {
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  setInnerWidth: function() {
    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  getInnerHeight: function() {
    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }
    return elementSizeHelper("innerHeight", ...args);
  },
  setInnerHeight: function() {
    for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }
    return elementSizeHelper("innerHeight", ...args);
  }
};
function elementSizeHelper(sizeProperty, el, value2) {
  return 2 === arguments.length ? elementSize(el, sizeProperty) : elementSize(el, sizeProperty, value2);
}
var getWidth = (el) => implementationsMap.getWidth(el);
var setWidth = (el, value2) => implementationsMap.setWidth(el, value2);
var getHeight = (el) => implementationsMap.getHeight(el);
var setHeight = (el, value2) => implementationsMap.setHeight(el, value2);
var getOuterWidth = (el, includeMargin) => implementationsMap.getOuterWidth(el, includeMargin || false);
var setOuterWidth = (el, value2) => implementationsMap.setOuterWidth(el, value2);
var getOuterHeight = (el, includeMargin) => implementationsMap.getOuterHeight(el, includeMargin || false);
var setOuterHeight = (el, value2) => implementationsMap.setOuterHeight(el, value2);
var getInnerWidth = (el) => implementationsMap.getInnerWidth(el);
var getInnerHeight = (el) => implementationsMap.getInnerHeight(el);
var elementSize = function elementSize2(el, sizeProperty, value2) {
  var partialName = sizeProperty.toLowerCase().indexOf("width") >= 0 ? "Width" : "Height";
  var propName = partialName.toLowerCase();
  var isOuter = 0 === sizeProperty.indexOf("outer");
  var isInner = 0 === sizeProperty.indexOf("inner");
  var isGetter = 2 === arguments.length || "boolean" === typeof value2;
  if (isRenderer(el)) {
    if (el.length > 1 && !isGetter) {
      for (var i = 0; i < el.length; i++) {
        elementSize2(el[i], sizeProperty, value2);
      }
      return;
    }
    el = el[0];
  }
  if (!el) {
    return;
  }
  if (isWindow(el)) {
    return isOuter ? el["inner" + partialName] : dom_adapter_default.getDocumentElement()["client" + partialName];
  }
  if (dom_adapter_default.isDocument(el)) {
    var documentElement = dom_adapter_default.getDocumentElement();
    var body = dom_adapter_default.getBody();
    return Math.max(body["scroll" + partialName], body["offset" + partialName], documentElement["scroll" + partialName], documentElement["offset" + partialName], documentElement["client" + partialName]);
  }
  if (isGetter) {
    var box = "content";
    if (isOuter) {
      box = value2 ? "margin" : "border";
    }
    if (isInner) {
      box = "padding";
    }
    return getSize(el, propName, box);
  }
  if (isNumeric(value2)) {
    var elementStyles = getElementComputedStyle(el);
    var sizeAdjustment = getElementBoxParams(propName, elementStyles);
    var isBorderBox = "border-box" === elementStyles.boxSizing;
    value2 = Number(value2);
    if (isOuter) {
      value2 -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding;
    } else if (isInner) {
      value2 += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding;
    } else if (isBorderBox) {
      value2 += sizeAdjustment.border + sizeAdjustment.padding;
    }
  }
  value2 += isNumeric(value2) ? "px" : "";
  dom_adapter_default.setStyle(el, propName, value2);
  return null;
};
var getWindowByElement = (el) => isWindow(el) ? el : el.defaultView;
var getOffset = (el) => {
  var _el$getClientRects;
  if (!(null !== (_el$getClientRects = el.getClientRects) && void 0 !== _el$getClientRects && _el$getClientRects.call(el).length)) {
    return {
      top: 0,
      left: 0
    };
  }
  var rect = el.getBoundingClientRect();
  var win = getWindowByElement(el.ownerDocument);
  var docElem = el.ownerDocument.documentElement;
  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  };
};

// node_modules/devextreme/esm/core/element_data.js
var dataMap = /* @__PURE__ */ new WeakMap();
var strategy;
var strategyChanging = new MemorizedCallbacks();
var beforeCleanDataFunc = function() {
};
var afterCleanDataFunc = function() {
};
var setDataStrategy = function(value2) {
  strategyChanging.fire(value2);
  strategy = value2;
  var cleanData = strategy.cleanData;
  strategy.cleanData = function(nodes) {
    beforeCleanDataFunc(nodes);
    var result = cleanData.call(this, nodes);
    afterCleanDataFunc(nodes);
    return result;
  };
};
setDataStrategy({
  data: function() {
    var element = arguments[0];
    var key = arguments[1];
    var value2 = arguments[2];
    if (!element) {
      return;
    }
    var elementData = dataMap.get(element);
    if (!elementData) {
      elementData = {};
      dataMap.set(element, elementData);
    }
    if (void 0 === key) {
      return elementData;
    }
    if (2 === arguments.length) {
      return elementData[key];
    }
    elementData[key] = value2;
    return value2;
  },
  removeData: function(element, key) {
    if (!element) {
      return;
    }
    if (void 0 === key) {
      dataMap.delete(element);
    } else {
      var elementData = dataMap.get(element);
      if (elementData) {
        delete elementData[key];
      }
    }
  },
  cleanData: function(elements) {
    for (var i = 0; i < elements.length; i++) {
      events_engine_default.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
function data() {
  return strategy.data.apply(this, arguments);
}
function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
function cleanDataRecursive(element, cleanSelf) {
  if (!dom_adapter_default.isElementNode(element)) {
    return;
  }
  var childElements = element.getElementsByTagName("*");
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}

// node_modules/devextreme/esm/core/utils/style.js
var jsPrefixes = ["", "Webkit", "Moz", "O", "Ms"];
var cssPrefixes = {
  "": "",
  Webkit: "-webkit-",
  Moz: "-moz-",
  O: "-o-",
  ms: "-ms-"
};
var getStyles = call_once_default(function() {
  return dom_adapter_default.createElement("dx").style;
});
var forEachPrefixes = function(prop, callBack) {
  prop = camelize(prop, true);
  var result;
  for (var i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
    var jsPrefix = jsPrefixes[i];
    var prefixedProp = jsPrefix + prop;
    var lowerPrefixedProp = camelize(prefixedProp);
    result = callBack(lowerPrefixedProp, jsPrefix);
    if (void 0 === result) {
      result = callBack(prefixedProp, jsPrefix);
    }
    if (void 0 !== result) {
      break;
    }
  }
  return result || "";
};
var styleProp = function(name) {
  if (name in getStyles()) {
    return name;
  }
  var originalName = name;
  name = name.charAt(0).toUpperCase() + name.substr(1);
  for (var i = 1; i < jsPrefixes.length; i++) {
    var prefixedProp = jsPrefixes[i].toLowerCase() + name;
    if (prefixedProp in getStyles()) {
      return prefixedProp;
    }
  }
  return originalName;
};
var stylePropPrefix = function(prop) {
  return forEachPrefixes(prop, function(specific, jsPrefix) {
    if (specific in getStyles()) {
      return cssPrefixes[jsPrefix];
    }
  });
};
var pxExceptions = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
var normalizeStyleProp = function(prop, value2) {
  if (isNumeric(value2) && -1 === pxExceptions.indexOf(prop)) {
    value2 += "px";
  }
  return value2;
};
var setDimensionProperty = function(elements, propertyName, value2) {
  if (elements) {
    value2 = isNumeric(value2) ? value2 += "px" : value2;
    for (var i = 0; i < elements.length; ++i) {
      elements[i].style[propertyName] = value2;
    }
  }
};
var setWidth2 = function(elements, value2) {
  setDimensionProperty(elements, "width", value2);
};
var setHeight2 = function(elements, value2) {
  setDimensionProperty(elements, "height", value2);
};
var setStyle = function(element, styleString) {
  var resetStyle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
  if (resetStyle) {
    var styleList = [].slice.call(element.style);
    styleList.forEach((propertyName) => {
      element.style.removeProperty(propertyName);
    });
  }
  styleString.split(";").forEach((style) => {
    var parts = style.split(":").map((stylePart) => stylePart.trim());
    if (2 === parts.length) {
      var [property, value2] = parts;
      element.style[property] = value2;
    }
  });
};

// node_modules/devextreme/esm/core/utils/html_parser.js
var isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var tagWrappers = {
  default: {
    tagsCount: 0,
    startTags: "",
    endTags: ""
  },
  thead: {
    tagsCount: 1,
    startTags: "<table>",
    endTags: "</table>"
  },
  td: {
    tagsCount: 3,
    startTags: "<table><tbody><tr>",
    endTags: "</tr></tbody></table>"
  },
  col: {
    tagsCount: 2,
    startTags: "<table><colgroup>",
    endTags: "</colgroup></table>"
  },
  tr: {
    tagsCount: 2,
    startTags: "<table><tbody>",
    endTags: "</tbody></table>"
  }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
var parseHTML = function(html) {
  if ("string" !== typeof html) {
    return null;
  }
  var fragment = dom_adapter_default.createDocumentFragment();
  var container = fragment.appendChild(dom_adapter_default.createElement("div"));
  var tags = isTagName.exec(html);
  var firstRootTag = tags && tags[1].toLowerCase();
  var tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (var i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
var isTablePart = function(html) {
  var tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};

// node_modules/devextreme/esm/core/renderer_base.js
var window5 = getWindow();
var renderer;
var initRender = function(selector, context2) {
  if (!selector) {
    this.length = 0;
    return this;
  }
  if ("string" === typeof selector) {
    if ("body" === selector) {
      this[0] = context2 ? context2.body : dom_adapter_default.getBody();
      this.length = 1;
      return this;
    }
    context2 = context2 || dom_adapter_default.getDocument();
    if ("<" === selector[0]) {
      this[0] = dom_adapter_default.createElement(selector.slice(1, -1), context2);
      this.length = 1;
      return this;
    }
    [].push.apply(this, dom_adapter_default.querySelectorAll(context2, selector));
    return this;
  } else if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
    this[0] = selector;
    this.length = 1;
    return this;
  } else if (Array.isArray(selector)) {
    [].push.apply(this, selector);
    return this;
  }
  return renderer(selector.toArray ? selector.toArray() : [selector]);
};
renderer = function(selector, context2) {
  return new initRender(selector, context2);
};
renderer.fn = {
  dxRenderer: true
};
initRender.prototype = renderer.fn;
var repeatMethod = function(methodName, args) {
  for (var i = 0; i < this.length; i++) {
    var item = renderer(this[i]);
    item[methodName].apply(item, args);
  }
  return this;
};
var setAttributeValue = function(element, attrName, value2) {
  if (void 0 !== value2 && null !== value2 && false !== value2) {
    dom_adapter_default.setAttribute(element, attrName, value2);
  } else {
    dom_adapter_default.removeAttribute(element, attrName);
  }
};
initRender.prototype.show = function() {
  return this.toggle(true);
};
initRender.prototype.hide = function() {
  return this.toggle(false);
};
initRender.prototype.toggle = function(value2) {
  if (this[0]) {
    this.toggleClass("dx-state-invisible", !value2);
  }
  return this;
};
initRender.prototype.attr = function(attrName, value2) {
  if (this.length > 1 && arguments.length > 1) {
    return repeatMethod.call(this, "attr", arguments);
  }
  if (!this[0]) {
    if (isObject(attrName) || void 0 !== value2) {
      return this;
    } else {
      return;
    }
  }
  if (!this[0].getAttribute) {
    return this.prop(attrName, value2);
  }
  if ("string" === typeof attrName && 1 === arguments.length) {
    var result = this[0].getAttribute(attrName);
    return null == result ? void 0 : result;
  } else if (isPlainObject(attrName)) {
    for (var key in attrName) {
      this.attr(key, attrName[key]);
    }
  } else {
    setAttributeValue(this[0], attrName, value2);
  }
  return this;
};
initRender.prototype.removeAttr = function(attrName) {
  this[0] && dom_adapter_default.removeAttribute(this[0], attrName);
  return this;
};
initRender.prototype.prop = function(propName, value2) {
  if (!this[0]) {
    return this;
  }
  if ("string" === typeof propName && 1 === arguments.length) {
    return this[0][propName];
  } else if (isPlainObject(propName)) {
    for (var key in propName) {
      this.prop(key, propName[key]);
    }
  } else {
    dom_adapter_default.setProperty(this[0], propName, value2);
  }
  return this;
};
initRender.prototype.addClass = function(className) {
  return this.toggleClass(className, true);
};
initRender.prototype.removeClass = function(className) {
  return this.toggleClass(className, false);
};
initRender.prototype.hasClass = function(className) {
  if (!this[0] || void 0 === this[0].className) {
    return false;
  }
  var classNames = className.split(" ");
  for (var i = 0; i < classNames.length; i++) {
    if (this[0].classList) {
      if (this[0].classList.contains(classNames[i])) {
        return true;
      }
    } else {
      var _className = isString(this[0].className) ? this[0].className : dom_adapter_default.getAttribute(this[0], "class");
      if ((_className || "").split(" ").indexOf(classNames[i]) >= 0) {
        return true;
      }
    }
  }
  return false;
};
initRender.prototype.toggleClass = function(className, value2) {
  if (this.length > 1) {
    return repeatMethod.call(this, "toggleClass", arguments);
  }
  if (!this[0] || !className) {
    return this;
  }
  value2 = void 0 === value2 ? !this.hasClass(className) : value2;
  var classNames = className.split(" ");
  for (var i = 0; i < classNames.length; i++) {
    dom_adapter_default.setClass(this[0], classNames[i], value2);
  }
  return this;
};
initRender.prototype.html = function(value2) {
  if (!arguments.length) {
    return this[0].innerHTML;
  }
  this.empty();
  if ("string" === typeof value2 && !isTablePart(value2) || "number" === typeof value2) {
    this[0].innerHTML = value2;
    return this;
  }
  return this.append(parseHTML(value2));
};
var appendElements = function(element, nextSibling) {
  if (!this[0] || !element) {
    return;
  }
  if ("string" === typeof element) {
    element = parseHTML(element);
  } else if (element.nodeType) {
    element = [element];
  } else if (isNumeric(element)) {
    element = [dom_adapter_default.createTextNode(element)];
  }
  for (var i = 0; i < element.length; i++) {
    var item = element[i];
    var container = this[0];
    var wrapTR = "TABLE" === container.tagName && "TR" === item.tagName;
    if (wrapTR && container.tBodies && container.tBodies.length) {
      container = container.tBodies[0];
    }
    dom_adapter_default.insertElement(container, item.nodeType ? item : item[0], nextSibling);
  }
};
var setCss = function(name, value2) {
  if (!this[0] || !this[0].style) {
    return;
  }
  if (null === value2 || "number" === typeof value2 && isNaN(value2)) {
    return;
  }
  name = styleProp(name);
  for (var i = 0; i < this.length; i++) {
    this[i].style[name] = normalizeStyleProp(name, value2);
  }
};
initRender.prototype.css = function(name, value2) {
  if (isString(name)) {
    if (2 === arguments.length) {
      setCss.call(this, name, value2);
    } else {
      if (!this[0]) {
        return;
      }
      name = styleProp(name);
      var result = window5.getComputedStyle(this[0])[name] || this[0].style[name];
      return isNumeric(result) ? result.toString() : result;
    }
  } else if (isPlainObject(name)) {
    for (var key in name) {
      setCss.call(this, key, name[key]);
    }
  }
  return this;
};
initRender.prototype.prepend = function(element) {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.prepend(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element, this[0].firstChild]);
  return this;
};
initRender.prototype.append = function(element) {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      this.append(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element]);
  return this;
};
initRender.prototype.prependTo = function(element) {
  if (this.length > 1) {
    for (var i = this.length - 1; i >= 0; i--) {
      renderer(this[i]).prependTo(element);
    }
    return this;
  }
  element = renderer(element);
  if (element[0]) {
    dom_adapter_default.insertElement(element[0], this[0], element[0].firstChild);
  }
  return this;
};
initRender.prototype.appendTo = function(element) {
  if (this.length > 1) {
    return repeatMethod.call(this, "appendTo", arguments);
  }
  dom_adapter_default.insertElement(renderer(element)[0], this[0]);
  return this;
};
initRender.prototype.insertBefore = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0]);
  }
  return this;
};
initRender.prototype.insertAfter = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0].nextSibling);
  }
  return this;
};
initRender.prototype.before = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0]);
  }
  return this;
};
initRender.prototype.after = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0].nextSibling);
  }
  return this;
};
initRender.prototype.wrap = function(wrapper) {
  if (this[0]) {
    var wrap = renderer(wrapper);
    wrap.insertBefore(this);
    wrap.append(this);
  }
  return this;
};
initRender.prototype.wrapInner = function(wrapper) {
  var contents = this.contents();
  if (contents.length) {
    contents.wrap(wrapper);
  } else {
    this.append(wrapper);
  }
  return this;
};
initRender.prototype.replaceWith = function(element) {
  if (!(element && element[0])) {
    return;
  }
  if (element.is(this)) {
    return this;
  }
  element.insertBefore(this);
  this.remove();
  return element;
};
initRender.prototype.remove = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "remove", arguments);
  }
  cleanDataRecursive(this[0], true);
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.detach = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "detach", arguments);
  }
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.empty = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "empty", arguments);
  }
  cleanDataRecursive(this[0]);
  dom_adapter_default.setText(this[0], "");
  return this;
};
initRender.prototype.clone = function() {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    result.push(this[i].cloneNode(true));
  }
  return renderer(result);
};
initRender.prototype.text = function(value2) {
  if (!arguments.length) {
    var result = "";
    for (var i = 0; i < this.length; i++) {
      result += this[i] && this[i].textContent || "";
    }
    return result;
  }
  var text = isFunction(value2) ? value2() : value2;
  cleanDataRecursive(this[0], false);
  dom_adapter_default.setText(this[0], isDefined(text) ? text : "");
  return this;
};
initRender.prototype.val = function(value2) {
  if (1 === arguments.length) {
    return this.prop("value", isDefined(value2) ? value2 : "");
  }
  return this.prop("value");
};
initRender.prototype.contents = function() {
  if (!this[0]) {
    return renderer();
  }
  var result = [];
  result.push.apply(result, this[0].childNodes);
  return renderer(result);
};
initRender.prototype.find = function(selector) {
  var result = renderer();
  if (!selector) {
    return result;
  }
  var nodes = [];
  var i;
  if ("string" === typeof selector) {
    selector = selector.trim();
    for (i = 0; i < this.length; i++) {
      var element = this[i];
      if (dom_adapter_default.isElementNode(element)) {
        var elementId = element.getAttribute("id");
        var queryId = elementId || "dx-query-children";
        if (!elementId) {
          setAttributeValue(element, "id", queryId);
        }
        queryId = "[id='" + queryId + "'] ";
        var querySelector = queryId + selector.replace(/([^\\])(,)/g, "$1, " + queryId);
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, querySelector));
        setAttributeValue(element, "id", elementId);
      } else if (dom_adapter_default.isDocument(element) || dom_adapter_default.isDocumentFragment(element)) {
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, selector));
      }
    }
  } else {
    for (i = 0; i < this.length; i++) {
      selector = dom_adapter_default.isNode(selector) ? selector : selector[0];
      if (this[i] !== selector && this[i].contains(selector)) {
        nodes.push(selector);
      }
    }
  }
  return result.add(nodes);
};
var isVisible = function(_, element) {
  var _element$host, _element$getClientRec, _element;
  element = null !== (_element$host = element.host) && void 0 !== _element$host ? _element$host : element;
  if (!element.nodeType) {
    return true;
  }
  return !!(element.offsetWidth || element.offsetHeight || null !== (_element$getClientRec = (_element = element).getClientRects) && void 0 !== _element$getClientRec && _element$getClientRec.call(_element).length);
};
initRender.prototype.filter = function(selector) {
  if (!selector) {
    return renderer();
  }
  if (":visible" === selector) {
    return this.filter(isVisible);
  } else if (":hidden" === selector) {
    return this.filter(function(_, element) {
      return !isVisible(_, element);
    });
  }
  var result = [];
  for (var i = 0; i < this.length; i++) {
    var item = this[i];
    if (dom_adapter_default.isElementNode(item) && "string" === type(selector)) {
      dom_adapter_default.elementMatches(item, selector) && result.push(item);
    } else if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
      selector === item && result.push(item);
    } else if (isFunction(selector)) {
      selector.call(item, i, item) && result.push(item);
    } else {
      for (var j = 0; j < selector.length; j++) {
        selector[j] === item && result.push(item);
      }
    }
  }
  return renderer(result);
};
initRender.prototype.not = function(selector) {
  var result = [];
  var nodes = this.filter(selector).toArray();
  for (var i = 0; i < this.length; i++) {
    if (-1 === nodes.indexOf(this[i])) {
      result.push(this[i]);
    }
  }
  return renderer(result);
};
initRender.prototype.is = function(selector) {
  return !!this.filter(selector).length;
};
initRender.prototype.children = function(selector) {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    var nodes = this[i] ? this[i].childNodes : [];
    for (var j = 0; j < nodes.length; j++) {
      if (dom_adapter_default.isElementNode(nodes[j])) {
        result.push(nodes[j]);
      }
    }
  }
  result = renderer(result);
  return selector ? result.filter(selector) : result;
};
initRender.prototype.siblings = function() {
  var element = this[0];
  if (!element || !element.parentNode) {
    return renderer();
  }
  var result = [];
  var parentChildNodes = element.parentNode.childNodes || [];
  for (var i = 0; i < parentChildNodes.length; i++) {
    var node = parentChildNodes[i];
    if (dom_adapter_default.isElementNode(node) && node !== element) {
      result.push(node);
    }
  }
  return renderer(result);
};
initRender.prototype.each = function(callback) {
  for (var i = 0; i < this.length; i++) {
    if (false === callback.call(this[i], i, this[i])) {
      break;
    }
  }
};
initRender.prototype.index = function(element) {
  if (!element) {
    return this.parent().children().index(this);
  }
  element = renderer(element);
  return this.toArray().indexOf(element[0]);
};
initRender.prototype.get = function(index2) {
  return this[index2 < 0 ? this.length + index2 : index2];
};
initRender.prototype.eq = function(index2) {
  index2 = index2 < 0 ? this.length + index2 : index2;
  return renderer(this[index2]);
};
initRender.prototype.first = function() {
  return this.eq(0);
};
initRender.prototype.last = function() {
  return this.eq(-1);
};
initRender.prototype.select = function() {
  for (var i = 0; i < this.length; i += 1) {
    this[i].select && this[i].select();
  }
  return this;
};
initRender.prototype.parent = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  var result = renderer(this[0].parentNode);
  return !selector || result.is(selector) ? result : renderer();
};
initRender.prototype.parents = function(selector) {
  var result = [];
  var parent = this.parent();
  while (parent && parent[0] && !dom_adapter_default.isDocument(parent[0])) {
    if (dom_adapter_default.isElementNode(parent[0])) {
      if (!selector || parent.is(selector)) {
        result.push(parent.get(0));
      }
    }
    parent = parent.parent();
  }
  return renderer(result);
};
initRender.prototype.closest = function(selector) {
  if (this.is(selector)) {
    return this;
  }
  var parent = this.parent();
  while (parent && parent.length) {
    if (parent.is(selector)) {
      return parent;
    }
    parent = parent.parent();
  }
  return renderer();
};
initRender.prototype.next = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  var next = renderer(this[0].nextSibling);
  if (!arguments.length) {
    return next;
  }
  while (next && next.length) {
    if (next.is(selector)) {
      return next;
    }
    next = next.next();
  }
  return renderer();
};
initRender.prototype.prev = function() {
  if (!this[0]) {
    return renderer();
  }
  return renderer(this[0].previousSibling);
};
initRender.prototype.add = function(selector) {
  var targets = renderer(selector);
  var result = this.toArray();
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];
    if (-1 === result.indexOf(target)) {
      result.push(target);
    }
  }
  return renderer(result);
};
var emptyArray = [];
initRender.prototype.splice = function() {
  return renderer(emptyArray.splice.apply(this, arguments));
};
initRender.prototype.slice = function() {
  return renderer(emptyArray.slice.apply(this, arguments));
};
initRender.prototype.toArray = function() {
  return emptyArray.slice.call(this);
};
initRender.prototype.offset = function() {
  if (!this[0]) {
    return;
  }
  return getOffset(this[0]);
};
initRender.prototype.offsetParent = function() {
  if (!this[0]) {
    return renderer();
  }
  var offsetParent = renderer(this[0].offsetParent);
  while (offsetParent[0] && "static" === offsetParent.css("position")) {
    offsetParent = renderer(offsetParent[0].offsetParent);
  }
  offsetParent = offsetParent[0] ? offsetParent : renderer(dom_adapter_default.getDocumentElement());
  return offsetParent;
};
initRender.prototype.position = function() {
  if (!this[0]) {
    return;
  }
  var offset2;
  var marginTop = parseFloat(this.css("marginTop"));
  var marginLeft = parseFloat(this.css("marginLeft"));
  if ("fixed" === this.css("position")) {
    offset2 = this[0].getBoundingClientRect();
    return {
      top: offset2.top - marginTop,
      left: offset2.left - marginLeft
    };
  }
  offset2 = this.offset();
  var offsetParent = this.offsetParent();
  var parentOffset = {
    top: 0,
    left: 0
  };
  if ("HTML" !== offsetParent[0].nodeName) {
    parentOffset = offsetParent.offset();
  }
  parentOffset = {
    top: parentOffset.top + parseFloat(offsetParent.css("borderTopWidth")),
    left: parentOffset.left + parseFloat(offsetParent.css("borderLeftWidth"))
  };
  return {
    top: offset2.top - parentOffset.top - marginTop,
    left: offset2.left - parentOffset.left - marginLeft
  };
};
[{
  name: "scrollLeft",
  offsetProp: "pageXOffset",
  scrollWindow: function(win, value2) {
    win.scrollTo(value2, win.pageYOffset);
  }
}, {
  name: "scrollTop",
  offsetProp: "pageYOffset",
  scrollWindow: function(win, value2) {
    win.scrollTo(win.pageXOffset, value2);
  }
}].forEach(function(directionStrategy) {
  var propName = directionStrategy.name;
  initRender.prototype[propName] = function(value2) {
    if (!this[0]) {
      return;
    }
    var window16 = getWindowByElement(this[0]);
    if (void 0 === value2) {
      return window16 ? window16[directionStrategy.offsetProp] : this[0][propName];
    }
    if (window16) {
      directionStrategy.scrollWindow(window16, value2);
    } else {
      this[0][propName] = value2;
    }
    return this;
  };
});
initRender.prototype.data = function(key, value2) {
  if (!this[0]) {
    return;
  }
  if (arguments.length < 2) {
    return data.call(renderer, this[0], key);
  }
  data.call(renderer, this[0], key, value2);
  return this;
};
initRender.prototype.removeData = function(key) {
  this[0] && removeData(this[0], key);
  return this;
};
var rendererWrapper = function() {
  return renderer.apply(this, arguments);
};
Object.defineProperty(rendererWrapper, "fn", {
  enumerable: true,
  configurable: true,
  get: function() {
    return renderer.fn;
  },
  set: function(value2) {
    renderer.fn = value2;
  }
});
var renderer_base_default = {
  set: function(strategy3) {
    renderer = strategy3;
  },
  get: function() {
    return rendererWrapper;
  }
};

// node_modules/devextreme/esm/core/renderer.js
var renderer_default = renderer_base_default.get();

// node_modules/devextreme/esm/core/component_registrator_callbacks.js
var component_registrator_callbacks_default = new MemorizedCallbacks();

// node_modules/devextreme/esm/events/core/event_registrator.js
var registerEvent = function(name, eventObject) {
  var strategy3 = {};
  if ("noBubble" in eventObject) {
    strategy3.noBubble = eventObject.noBubble;
  }
  if ("bindType" in eventObject) {
    strategy3.bindType = eventObject.bindType;
  }
  if ("delegateType" in eventObject) {
    strategy3.delegateType = eventObject.delegateType;
  }
  each(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], function(_, methodName) {
    if (!eventObject[methodName]) {
      return;
    }
    strategy3[methodName] = function() {
      var args = [].slice.call(arguments);
      args.unshift(this);
      return eventObject[methodName].apply(eventObject, args);
    };
  });
  event_registrator_callbacks_default.fire(name, strategy3);
};
registerEvent.callbacks = event_registrator_callbacks_default;
var event_registrator_default = registerEvent;

// node_modules/devextreme/esm/events/remove.js
var removeEvent = "dxremove";
var eventPropName = "dxRemoveEvent";
beforeCleanData(function(elements) {
  elements = [].slice.call(elements);
  for (var i = 0; i < elements.length; i++) {
    var $element = renderer_default(elements[i]);
    if ($element.prop(eventPropName)) {
      $element[0][eventPropName] = null;
      events_engine_default.triggerHandler($element, removeEvent);
    }
  }
});
event_registrator_default(removeEvent, {
  noBubble: true,
  setup: function(element) {
    renderer_default(element).prop(eventPropName, true);
  }
});

// node_modules/devextreme/esm/core/utils/public_component.js
var COMPONENT_NAMES_DATA_KEY = "dxComponents";
var ANONYMOUS_COMPONENT_DATA_KEY = "dxPrivateComponent";
var componentNames = /* @__PURE__ */ new WeakMap();
var nextAnonymousComponent = 0;
var getName = function(componentClass, newName) {
  if (isDefined(newName)) {
    componentNames.set(componentClass, newName);
    return;
  }
  if (!componentNames.has(componentClass)) {
    var generatedName = ANONYMOUS_COMPONENT_DATA_KEY + nextAnonymousComponent++;
    componentNames.set(componentClass, generatedName);
    return generatedName;
  }
  return componentNames.get(componentClass);
};
function attachInstanceToElement($element, componentInstance, disposeFn) {
  var data2 = data($element.get(0));
  var name = getName(componentInstance.constructor);
  data2[name] = componentInstance;
  if (disposeFn) {
    events_engine_default.one($element, removeEvent, function() {
      disposeFn.call(componentInstance);
    });
  }
  if (!data2[COMPONENT_NAMES_DATA_KEY]) {
    data2[COMPONENT_NAMES_DATA_KEY] = [];
  }
  data2[COMPONENT_NAMES_DATA_KEY].push(name);
}
function getInstanceByElement($element, componentClass) {
  var name = getName(componentClass);
  return data($element.get(0), name);
}

// node_modules/devextreme/esm/core/component_registrator.js
var registerComponent = function(name, namespace, componentClass) {
  if (!componentClass) {
    componentClass = namespace;
  } else {
    namespace[name] = componentClass;
  }
  getName(componentClass, name);
  component_registrator_callbacks_default.fire(name, componentClass);
};
var registerRendererComponent = function(name, componentClass) {
  renderer_default.fn[name] = function(options) {
    var isMemberInvoke = "string" === typeof options;
    var result;
    if (isMemberInvoke) {
      var memberName = options;
      var memberArgs = [].slice.call(arguments).slice(1);
      this.each(function() {
        var instance = componentClass.getInstance(this);
        if (!instance) {
          throw errors_default.Error("E0009", name);
        }
        var member = instance[memberName];
        var memberValue = member.apply(instance, memberArgs);
        if (void 0 === result) {
          result = memberValue;
        }
      });
    } else {
      this.each(function() {
        var instance = componentClass.getInstance(this);
        if (instance) {
          instance.option(options);
        } else {
          new componentClass(this, options);
        }
      });
      result = this;
    }
    return result;
  };
};
component_registrator_callbacks_default.add(registerRendererComponent);
var component_registrator_default = registerComponent;

// node_modules/devextreme/esm/core/utils/ready_callbacks.js
var callbacks = [];
var subscribeReady = call_once_default(() => {
  var removeListener = dom_adapter_default.listen(dom_adapter_default.getDocument(), "DOMContentLoaded", () => {
    readyCallbacks.fire();
    removeListener();
  });
});
var readyCallbacks = {
  add: (callback) => {
    var windowExists = hasWindow();
    if (windowExists && "loading" !== dom_adapter_default.getReadyState()) {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach((callback) => callback());
    callbacks = [];
  }
};
var ready_callbacks_default = dependency_injector_default(readyCallbacks);

// node_modules/devextreme/esm/core/utils/resize_callbacks.js
var resizeCallbacks = function() {
  var prevSize;
  var callbacks2 = callbacks_default();
  var originalCallbacksAdd = callbacks2.add;
  var originalCallbacksRemove = callbacks2.remove;
  if (!hasWindow()) {
    return callbacks2;
  }
  var formatSize = function() {
    var window16 = getWindow();
    return {
      width: window16.innerWidth,
      height: window16.innerHeight
    };
  };
  var handleResize = function() {
    var now = formatSize();
    if (now.width === prevSize.width && now.height === prevSize.height) {
      return;
    }
    var changedDimension;
    if (now.width === prevSize.width) {
      changedDimension = "height";
    }
    if (now.height === prevSize.height) {
      changedDimension = "width";
    }
    prevSize = now;
    callbacks2.fire(changedDimension);
  };
  var setPrevSize = call_once_default(function() {
    prevSize = formatSize();
  });
  var removeListener;
  callbacks2.add = function() {
    var result = originalCallbacksAdd.apply(callbacks2, arguments);
    setPrevSize();
    ready_callbacks_default.add(function() {
      if (!removeListener && callbacks2.has()) {
        removeListener = dom_adapter_default.listen(getWindow(), "resize", handleResize);
      }
    });
    return result;
  };
  callbacks2.remove = function() {
    var result = originalCallbacksRemove.apply(callbacks2, arguments);
    if (!callbacks2.has() && removeListener) {
      removeListener();
      removeListener = void 0;
    }
    return result;
  };
  return callbacks2;
}();
var resize_callbacks_default = resizeCallbacks;

// node_modules/devextreme/esm/core/events_strategy.js
var EventsStrategy = class _EventsStrategy {
  constructor(owner) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    this._events = {};
    this._owner = owner;
    this._options = options;
  }
  static create(owner, strategy3) {
    if (strategy3) {
      return isFunction(strategy3) ? strategy3(owner) : strategy3;
    } else {
      return new _EventsStrategy(owner);
    }
  }
  hasEvent(eventName) {
    var callbacks2 = this._events[eventName];
    return callbacks2 ? callbacks2.has() : false;
  }
  fireEvent(eventName, eventArgs) {
    var callbacks2 = this._events[eventName];
    if (callbacks2) {
      callbacks2.fireWith(this._owner, eventArgs);
    }
    return this._owner;
  }
  on(eventName, eventHandler) {
    if (isPlainObject(eventName)) {
      each(eventName, (e, h) => {
        this.on(e, h);
      });
    } else {
      var callbacks2 = this._events[eventName];
      if (!callbacks2) {
        callbacks2 = callbacks_default({
          syncStrategy: this._options.syncStrategy
        });
        this._events[eventName] = callbacks2;
      }
      var addFn = callbacks2.originalAdd || callbacks2.add;
      addFn.call(callbacks2, eventHandler);
    }
  }
  off(eventName, eventHandler) {
    var callbacks2 = this._events[eventName];
    if (callbacks2) {
      if (isFunction(eventHandler)) {
        callbacks2.remove(eventHandler);
      } else {
        callbacks2.empty();
      }
    }
  }
  dispose() {
    each(this._events, (eventName, event) => {
      event.empty();
    });
  }
};

// node_modules/devextreme/esm/core/utils/storage.js
var window6 = getWindow();
var getSessionStorage = function() {
  var sessionStorage;
  try {
    sessionStorage = window6.sessionStorage;
  } catch (e) {
  }
  return sessionStorage;
};

// node_modules/devextreme/esm/core/utils/view_port.js
var ready = ready_callbacks_default.add;
var changeCallback = callbacks_default();
var $originalViewPort = renderer_default();
var value = /* @__PURE__ */ function() {
  var $current;
  return function(element) {
    if (!arguments.length) {
      return $current;
    }
    var $element = renderer_default(element);
    $originalViewPort = $element;
    var isNewViewportFound = !!$element.length;
    var prevViewPort = value();
    $current = isNewViewportFound ? $element : renderer_default("body");
    changeCallback.fire(isNewViewportFound ? value() : renderer_default(), prevViewPort);
  };
}();
ready(function() {
  value(".dx-viewport");
});
function originalViewPort() {
  return $originalViewPort;
}

// node_modules/devextreme/esm/core/devices.js
var window7 = getWindow();
var KNOWN_UA_TABLE = {
  iPhone: "iPhone",
  iPhone5: "iPhone",
  iPhone6: "iPhone",
  iPhone6plus: "iPhone",
  iPad: "iPad",
  iPadMini: "iPad Mini",
  androidPhone: "Android Mobile",
  androidTablet: "Android",
  msSurface: "Windows ARM Tablet PC",
  desktop: "desktop"
};
var DEFAULT_DEVICE = {
  deviceType: "desktop",
  platform: "generic",
  version: [],
  phone: false,
  tablet: false,
  android: false,
  ios: false,
  generic: true,
  grade: "A",
  mac: false
};
var UA_PARSERS = {
  generic(userAgent) {
    var isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
    var isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
    var isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
    var isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
    if (!(isPhone || isTablet || isDesktop || isMac)) {
      return null;
    }
    return {
      deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
      platform: "generic",
      version: [],
      grade: "A",
      mac: isMac
    };
  },
  appleTouchDevice(userAgent) {
    var navigator3 = getNavigator();
    var isIpadOs = /Macintosh/i.test(userAgent) && (null === navigator3 || void 0 === navigator3 ? void 0 : navigator3.maxTouchPoints) > 2;
    var isAppleDevice = /ip(hone|od|ad)/i.test(userAgent);
    if (!isAppleDevice && !isIpadOs) {
      return null;
    }
    var isPhone = /ip(hone|od)/i.test(userAgent);
    var matches = userAgent.match(/os\s{0,}X? (\d+)_(\d+)_?(\d+)?/i);
    var version2 = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
    var isIPhone4 = 480 === window7.screen.height;
    var grade = isIPhone4 ? "B" : "A";
    return {
      deviceType: isPhone ? "phone" : "tablet",
      platform: "ios",
      version: version2,
      grade
    };
  },
  android(userAgent) {
    var isAndroid = /android|htc_|silk/i.test(userAgent);
    var isWinPhone = /windows phone/i.test(userAgent);
    if (!isAndroid || isWinPhone) {
      return null;
    }
    var isPhone = /mobile/i.test(userAgent);
    var matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
    var version2 = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
    var worseThan4_4 = version2.length > 1 && (version2[0] < 4 || 4 === version2[0] && version2[1] < 4);
    var grade = worseThan4_4 ? "B" : "A";
    return {
      deviceType: isPhone ? "phone" : "tablet",
      platform: "android",
      version: version2,
      grade
    };
  }
};
var UA_PARSERS_ARRAY = [UA_PARSERS.appleTouchDevice, UA_PARSERS.android, UA_PARSERS.generic];
var Devices = class {
  constructor(options) {
    this._window = (null === options || void 0 === options ? void 0 : options.window) || window7;
    this._realDevice = this._getDevice();
    this._currentDevice = void 0;
    this._currentOrientation = void 0;
    this._eventsStrategy = new EventsStrategy(this);
    this.changed = callbacks_default();
    if (hasWindow()) {
      ready_callbacks_default.add(this._recalculateOrientation.bind(this));
      resize_callbacks_default.add(this._recalculateOrientation.bind(this));
    }
  }
  current(deviceOrName) {
    if (deviceOrName) {
      this._currentDevice = this._getDevice(deviceOrName);
      this._forced = true;
      this.changed.fire();
      return;
    }
    if (!this._currentDevice) {
      deviceOrName = void 0;
      try {
        deviceOrName = this._getDeviceOrNameFromWindowScope();
      } catch (e) {
        deviceOrName = this._getDeviceNameFromSessionStorage();
      } finally {
        if (!deviceOrName) {
          deviceOrName = this._getDeviceNameFromSessionStorage();
        }
        if (deviceOrName) {
          this._forced = true;
        }
      }
      this._currentDevice = this._getDevice(deviceOrName);
    }
    return this._currentDevice;
  }
  real(forceDevice) {
    return extend({}, this._realDevice);
  }
  orientation() {
    return this._currentOrientation;
  }
  isForced() {
    return this._forced;
  }
  isRippleEmulator() {
    return !!this._window.tinyHippos;
  }
  _getCssClasses(device) {
    var result = [];
    var realDevice = this._realDevice;
    device = device || this.current();
    if (device.deviceType) {
      result.push("dx-device-".concat(device.deviceType));
      if ("desktop" !== device.deviceType) {
        result.push("dx-device-mobile");
      }
    }
    result.push("dx-device-".concat(realDevice.platform));
    if (realDevice.version && realDevice.version.length) {
      result.push("dx-device-".concat(realDevice.platform, "-").concat(realDevice.version[0]));
    }
    if (this.isSimulator()) {
      result.push("dx-simulator");
    }
    if (config_default().rtlEnabled) {
      result.push("dx-rtl");
    }
    return result;
  }
  attachCssClasses(element, device) {
    this._deviceClasses = this._getCssClasses(device).join(" ");
    renderer_default(element).addClass(this._deviceClasses);
  }
  detachCssClasses(element) {
    renderer_default(element).removeClass(this._deviceClasses);
  }
  isSimulator() {
    try {
      return this._isSimulator || hasWindow() && this._window.top !== this._window.self && this._window.top["dx-force-device"] || this.isRippleEmulator();
    } catch (e) {
      return false;
    }
  }
  forceSimulator() {
    this._isSimulator = true;
  }
  _getDevice(deviceName) {
    if ("genericPhone" === deviceName) {
      deviceName = {
        deviceType: "phone",
        platform: "generic",
        generic: true
      };
    }
    if (isPlainObject(deviceName)) {
      return this._fromConfig(deviceName);
    } else {
      var ua;
      if (deviceName) {
        ua = KNOWN_UA_TABLE[deviceName];
        if (!ua) {
          throw errors_default.Error("E0005");
        }
      } else {
        var navigator3 = getNavigator();
        ua = navigator3.userAgent;
      }
      return this._fromUA(ua);
    }
  }
  _getDeviceOrNameFromWindowScope() {
    var result;
    if (hasWindow() && (this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"])) {
      result = this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"];
    }
    return result;
  }
  _getDeviceNameFromSessionStorage() {
    var sessionStorage = getSessionStorage();
    if (!sessionStorage) {
      return;
    }
    var deviceOrName = sessionStorage.getItem("dx-force-device");
    try {
      return JSON.parse(deviceOrName);
    } catch (ex) {
      return deviceOrName;
    }
  }
  _fromConfig(config2) {
    var result = extend({}, DEFAULT_DEVICE, this._currentDevice, config2);
    var shortcuts = {
      phone: "phone" === result.deviceType,
      tablet: "tablet" === result.deviceType,
      android: "android" === result.platform,
      ios: "ios" === result.platform,
      generic: "generic" === result.platform
    };
    return extend(result, shortcuts);
  }
  _fromUA(ua) {
    for (var idx = 0; idx < UA_PARSERS_ARRAY.length; idx += 1) {
      var parser = UA_PARSERS_ARRAY[idx];
      var config2 = parser(ua);
      if (config2) {
        return this._fromConfig(config2);
      }
    }
    return DEFAULT_DEVICE;
  }
  _changeOrientation() {
    var $window = renderer_default(this._window);
    var orientation = getHeight($window) > getWidth($window) ? "portrait" : "landscape";
    if (this._currentOrientation === orientation) {
      return;
    }
    this._currentOrientation = orientation;
    this._eventsStrategy.fireEvent("orientationChanged", [{
      orientation
    }]);
  }
  _recalculateOrientation() {
    var windowWidth = getWidth(this._window);
    if (this._currentWidth === windowWidth) {
      return;
    }
    this._currentWidth = windowWidth;
    this._changeOrientation();
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
};
var devices = new Devices();
var viewPortElement = value();
if (viewPortElement) {
  devices.attachCssClasses(viewPortElement);
}
changeCallback.add((viewPort2, prevViewport) => {
  devices.detachCssClasses(prevViewport);
  devices.attachCssClasses(viewPort2);
});
var devices_default = devices;

// node_modules/devextreme/esm/ui/widget/ui.errors.js
var ui_errors_default = error_default(errors_default.ERROR_MESSAGES, {
  E1001: "Module '{0}'. Controller '{1}' is already registered",
  E1002: "Module '{0}'. Controller '{1}' does not inherit from DevExpress.ui.dxDataGrid.Controller",
  E1003: "Module '{0}'. View '{1}' is already registered",
  E1004: "Module '{0}'. View '{1}' does not inherit from DevExpress.ui.dxDataGrid.View",
  E1005: "Public method '{0}' is already registered",
  E1006: "Public method '{0}.{1}' does not exist",
  E1007: "State storing cannot be provided due to the restrictions of the browser",
  E1010: "The template does not contain the TextBox widget",
  E1011: 'Items cannot be deleted from the List. Implement the "remove" function in the data store',
  E1012: "Editing type '{0}' with the name '{1}' is unsupported",
  E1016: "Unexpected type of data source is provided for a lookup column",
  E1018: "The 'collapseAll' method cannot be called if you use a remote data source",
  E1019: "Search mode '{0}' is unavailable",
  E1020: "The type cannot be changed after initialization",
  E1021: "{0} '{1}' you are trying to remove does not exist",
  E1022: 'The "markers" option is given an invalid value. Assign an array instead',
  E1023: 'The "routes" option is given an invalid value. Assign an array instead',
  E1025: "This layout is too complex to render",
  E1026: 'The "calculateCustomSummary" function is missing from a field whose "summaryType" option is set to "custom"',
  E1031: "Unknown subscription in the Scheduler widget: '{0}'",
  E1032: "Unknown start date in an appointment: '{0}'",
  E1033: "Unknown step in the date navigator: '{0}'",
  E1034: "The browser does not implement an API for saving files",
  E1035: "The editor cannot be created: {0}",
  E1037: "Invalid structure of grouped data",
  E1038: "The browser does not support local storages for local web pages",
  E1039: "A cell's position cannot be calculated",
  E1040: "The '{0}' key value is not unique within the data array",
  E1041: "The '{0}' script is referenced after the DevExtreme scripts or not referenced at all",
  E1042: "{0} requires the key field to be specified",
  E1043: "Changes cannot be processed due to the incorrectly set key",
  E1044: "The key field specified by the keyExpr option does not match the key field specified in the data store",
  E1045: "Editing requires the key field to be specified in the data store",
  E1046: "The '{0}' key field is not found in data objects",
  E1047: 'The "{0}" field is not found in the fields array',
  E1048: 'The "{0}" operation is not found in the filterOperations array',
  E1049: "Column '{0}': filtering is allowed but the 'dataField' or 'name' option is not specified",
  E1050: "The validationRules option does not apply to third-party editors defined in the editCellTemplate",
  E1051: `HtmlEditor's valueType is "{0}", but the {0} converter was not imported.`,
  E1052: '{0} should have the "dataSource" option specified',
  E1053: 'The "buttons" option accepts an array that contains only objects or string values',
  E1054: "All text editor buttons must have names",
  E1055: 'One or several text editor buttons have invalid or non-unique "name" values',
  E1056: 'The {0} widget does not support buttons of the "{1}" type',
  E1058: 'The "startDayHour" and "endDayHour" options must be integers in the [0, 24] range, with "endDayHour" being greater than "startDayHour".',
  E1059: "The following column names are not unique: {0}",
  E1060: "All editable columns must have names",
  E1061: 'The "offset" option must be an integer in the [-1440, 1440] range, divisible by 5 without a remainder.',
  E1062: 'The "cellDuration" must be a positive integer, evenly dividing the ("endDayHour" - "startDayHour") interval into minutes.',
  W1001: 'The "key" option cannot be modified after initialization',
  W1002: "An item with the key '{0}' does not exist",
  W1003: "A group with the key '{0}' in which you are trying to select items does not exist",
  W1004: "The item '{0}' you are trying to select in the group '{1}' does not exist",
  W1005: "Due to column data types being unspecified, data has been loaded twice in order to apply initial filter settings. To resolve this issue, specify data types for all grid columns.",
  W1006: "The map service returned the following error: '{0}'",
  W1007: "No item with key {0} was found in the data source, but this key was used as the parent key for item {1}",
  W1008: "Cannot scroll to the '{0}' date because it does not exist on the current view",
  W1009: "Searching works only if data is specified using the dataSource option",
  W1010: "The capability to select all items works with source data of plain structure only",
  W1011: 'The "keyExpr" option is not applied when dataSource is not an array',
  W1012: "The '{0}' key field is not found in data objects",
  W1013: 'The "message" field in the dialog component was renamed to "messageHtml". Change your code correspondingly. In addition, if you used HTML code in the message, make sure that it is secure',
  W1014: "The Floating Action Button exceeds the recommended speed dial action count. If you need to display more speed dial actions, increase the maxSpeedDialActionCount option value in the global config.",
  W1016: "The '{0}' field in the HTML Editor toolbar item configuration was renamed to '{1}'. Please make a corresponding change in your code.",
  W1017: "The 'key' property is not specified for a lookup data source. Please specify it to prevent requests for the entire dataset when users filter data.",
  W1018: "Infinite scrolling may not work properly with multiple selection. To use these features together, set 'selection.deferred' to true or set 'selection.selectAllMode' to 'page'.",
  W1019: "Filter query string exceeds maximum length limit of {0} characters.",
  W1020: "hideEvent is ignored when the shading property is true",
  W1021: `The '{0}' is not rendered because none of the DOM elements match the value of the "container" property.`,
  W1022: "{0} JSON parsing error: '{1}'",
  W1023: "Appointments require unique keys. Otherwise, the agenda view may not work correctly.",
  W1024: "The client-side export is enabled. Implement the 'onExporting' function.",
  W1025: "'scrolling.mode' is set to 'virtual' or 'infinite'. Specify the height of the component."
});

// node_modules/devextreme/esm/ui/themes_callback.js
var themeReadyCallback = callbacks_default();

// node_modules/devextreme/esm/ui/themes.js
var window8 = getWindow();
var ready2 = ready_callbacks_default.add;
var viewPort = value;
var viewPortChanged = changeCallback;
var initDeferred = new Deferred();
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var DX_HAIRLINES_CLASS = "dx-hairlines";
var ANY_THEME = "any";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15e3;
var THEME_MARKER_PREFIX = "dx.";
function readThemeMarker() {
  if (!hasWindow()) {
    return null;
  }
  var element = renderer_default("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
  var result;
  try {
    result = window8.getComputedStyle(element.get(0)).fontFamily;
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, "");
    if (result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {
      return null;
    }
    return result.substr(THEME_MARKER_PREFIX.length);
  } finally {
    element.remove();
  }
}
function waitForThemeLoad(themeName) {
  var waitStartTime;
  var timerId;
  var intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    themeReadyCallback.fire();
    themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval(function() {
      var isLoaded = isPendingThemeLoaded();
      var isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        ui_errors_default.log("W0004", pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }, 10);
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  var anyThemePending = pendingThemeName === ANY_THEME;
  if ("resolved" === initDeferred.state() && anyThemePending) {
    return true;
  }
  var themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function processMarkup() {
  var $allThemeLinks = renderer_default(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = renderer_default(parseHTML("<link rel=stylesheet>"), context);
  $allThemeLinks.each(function() {
    var link = renderer_default(this, context);
    var fullThemeName = link.attr(THEME_ATTR);
    var url = link.attr("href");
    var isActive = "true" === link.attr(ACTIVE_ATTR);
    knownThemes[fullThemeName] = {
      url,
      isActive
    };
  });
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  var desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
  var result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    each(knownThemes, function(knownThemeName, themeData) {
      var knownThemeParts = knownThemeName.split(".");
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    });
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    knownThemes = null;
  }
  context = newContext;
}
function init(options) {
  options = options || {};
  initContext(options.context || dom_adapter_default.getDocument());
  if (!context) {
    return;
  }
  processMarkup();
  currentThemeName = void 0;
  current(options);
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if ("string" === typeof options) {
    options = {
      theme: options
    };
  }
  var isAutoInit = options._autoInit;
  var loadCallback = options.loadCallback;
  var currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
    if (themeReadyCallback.has() || "resolved" !== initDeferred.state() || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else if (isAutoInit) {
    if (hasWindow()) {
      waitForThemeLoad(ANY_THEME);
    }
    themeReadyCallback.fire();
    themeReadyCallback.empty();
  } else {
    throw ui_errors_default.Error("E0021", currentThemeName);
  }
  initDeferred.done(() => attachCssClasses(originalViewPort(), currentThemeName));
}
function getCssClasses(themeName) {
  themeName = themeName || current();
  var result = [];
  var themeNameParts = themeName && themeName.split(".");
  if (themeNameParts) {
    result.push("dx-theme-" + themeNameParts[0], "dx-theme-" + themeNameParts[0] + "-typography");
    if (themeNameParts.length > 1) {
      result.push("dx-color-scheme-" + themeNameParts[1] + (isMaterialBased(themeName) ? "-" + themeNameParts[2] : ""));
    }
  }
  return result;
}
var themeClasses;
function attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(" ");
  renderer_default(element).addClass(themeClasses);
  !function() {
    var pixelRatio = hasWindow() && window8.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    var $tester = renderer_default("<div>");
    $tester.css("border", ".5px solid transparent");
    renderer_default("body").append($tester);
    if (1 === getOuterHeight($tester)) {
      renderer_default(element).addClass(DX_HAIRLINES_CLASS);
      themeClasses += " " + DX_HAIRLINES_CLASS;
    }
    $tester.remove();
  }();
}
function detachCssClasses(element) {
  renderer_default(element).removeClass(themeClasses);
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterialBased(themeName) {
  return isMaterial(themeName) || isFluent(themeName);
}
function isMaterial(themeName) {
  return isTheme("material", themeName);
}
function isFluent(themeName) {
  return isTheme("fluent", themeName);
}
function isGeneric(themeName) {
  return isTheme("generic", themeName);
}
function isCompact(themeName) {
  return isTheme("compact", themeName);
}
function isWebFontLoaded(text, fontWeight) {
  var document2 = dom_adapter_default.getDocument();
  var testElement = document2.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = "-9999px";
  testElement.style.left = "-9999px";
  testElement.style.visibility = "hidden";
  testElement.style.fontFamily = "Arial";
  testElement.style.fontSize = "250px";
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document2.body.appendChild(testElement);
  var etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = "Roboto, RobotoFallback, Arial";
  var testedFontWidth = testElement.offsetWidth;
  testElement.parentNode.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  return new Promise((resolve) => {
    var clear = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    var intervalId = setInterval(() => {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    }, 15);
    var timeoutId = setTimeout(clear, 2e3);
  });
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if (renderer_default(DX_LINK_SELECTOR, context).length) {
    throw ui_errors_default.Error("E0022");
  }
}
if (hasWindow()) {
  autoInit();
} else {
  ready2(autoInit);
}
viewPortChanged.add(function(viewPort2, prevViewPort) {
  initDeferred.done(function() {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort2);
  });
});
devices_default.changed.add(function() {
  init({
    _autoInit: true
  });
});

// node_modules/devextreme/esm/events/utils/add_namespace.js
var addNamespace = (eventNames, namespace) => {
  if (!namespace) {
    throw errors_default.Error("E0017");
  }
  if (Array.isArray(eventNames)) {
    return eventNames.map((eventName) => addNamespace(eventName, namespace)).join(" ");
  }
  if (-1 !== eventNames.indexOf(" ")) {
    return addNamespace(eventNames.split(/\s+/g), namespace);
  }
  return "".concat(eventNames, ".").concat(namespace);
};
var add_namespace_default = addNamespace;

// node_modules/devextreme/esm/ui/widget/selectors.js
var focusableFn = function(element, tabIndex) {
  if (!visible(element)) {
    return false;
  }
  var nodeName = element.nodeName.toLowerCase();
  var isTabIndexNotNaN = !isNaN(tabIndex);
  var isDisabled = element.disabled;
  var isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
  var isHyperlink = "a" === nodeName;
  var isFocusable;
  var isContentEditable = element.isContentEditable;
  if (isDefaultFocus || isContentEditable) {
    isFocusable = !isDisabled;
  } else if (isHyperlink) {
    isFocusable = element.href || isTabIndexNotNaN;
  } else {
    isFocusable = isTabIndexNotNaN;
  }
  return isFocusable;
};
function visible(element) {
  var $element = renderer_default(element);
  return $element.is(":visible") && "hidden" !== $element.css("visibility") && "hidden" !== $element.parents().css("visibility");
}
var focusable = function(index2, element) {
  return focusableFn(element, renderer_default(element).attr("tabIndex"));
};
var tabbable = function(index2, element) {
  var tabIndex = renderer_default(element).attr("tabIndex");
  return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex);
};
var focused = function($element) {
  var element = renderer_default($element).get(0);
  return dom_adapter_default.getActiveElement(element) === element;
};

// node_modules/devextreme/esm/events/utils/index.js
var KEY_MAP = {
  backspace: "backspace",
  tab: "tab",
  enter: "enter",
  escape: "escape",
  pageup: "pageUp",
  pagedown: "pageDown",
  end: "end",
  home: "home",
  arrowleft: "leftArrow",
  arrowup: "upArrow",
  arrowright: "rightArrow",
  arrowdown: "downArrow",
  delete: "del",
  " ": "space",
  f: "F",
  a: "A",
  "*": "asterisk",
  "-": "minus",
  alt: "alt",
  control: "control",
  shift: "shift"
};
var LEGACY_KEY_CODES = {
  8: "backspace",
  9: "tab",
  13: "enter",
  27: "escape",
  33: "pageUp",
  34: "pageDown",
  35: "end",
  36: "home",
  37: "leftArrow",
  38: "upArrow",
  39: "rightArrow",
  40: "downArrow",
  46: "del",
  32: "space",
  70: "F",
  65: "A",
  106: "asterisk",
  109: "minus",
  189: "minus",
  173: "minus",
  16: "shift",
  17: "control",
  18: "alt"
};
var EVENT_SOURCES_REGEX = {
  dx: /^dx/i,
  mouse: /(mouse|wheel)/i,
  touch: /^touch/i,
  keyboard: /^key/i,
  pointer: /^(ms)?pointer/i
};
var fixMethod = (e) => e;
var copyEvent = (originalEvent) => fixMethod(events_engine_default.Event(originalEvent, originalEvent), originalEvent);
var isDxEvent = (e) => "dx" === eventSource(e);
var isNativeMouseEvent = (e) => "mouse" === eventSource(e);
var isNativeTouchEvent = (e) => "touch" === eventSource(e);
var eventSource = (_ref) => {
  var {
    type: type2
  } = _ref;
  var result = "other";
  each(EVENT_SOURCES_REGEX, function(key) {
    if (this.test(type2)) {
      result = key;
      return false;
    }
  });
  return result;
};
var isPointerEvent = (e) => "pointer" === eventSource(e);
var isMouseEvent = (e) => isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "mouse" === e.pointerType;
var isDxMouseWheelEvent = (e) => e && "dxmousewheel" === e.type;
var isTouchEvent = (e) => isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && "touch" === e.pointerType;
var eventData = (_ref3) => {
  var {
    pageX,
    pageY,
    timeStamp
  } = _ref3;
  return {
    x: pageX,
    y: pageY,
    time: timeStamp
  };
};
var eventDelta = (from, to) => ({
  x: to.x - from.x,
  y: to.y - from.y,
  time: to.time - from.time || 1
});
var hasTouches = (e) => {
  var {
    originalEvent,
    pointers
  } = e;
  if (isNativeTouchEvent(e)) {
    return (originalEvent.touches || []).length;
  }
  if (isDxEvent(e)) {
    return (pointers || []).length;
  }
  return 0;
};
var skipEvents = false;
var needSkipEvent = (e) => {
  if (skipEvents) {
    return true;
  }
  var {
    target
  } = e;
  var $target = renderer_default(target);
  var isContentEditable = (null === target || void 0 === target ? void 0 : target.isContentEditable) || (null === target || void 0 === target ? void 0 : target.hasAttribute("contenteditable"));
  var touchInEditable = $target.is("input, textarea, select") || isContentEditable;
  if (isDxMouseWheelEvent(e)) {
    var isTextArea = $target.is("textarea") && $target.hasClass("dx-texteditor-input");
    if (isTextArea || isContentEditable) {
      return false;
    }
    var isInputFocused = $target.is("input[type='number'], textarea, select") && $target.is(":focus");
    return isInputFocused;
  }
  if (isMouseEvent(e)) {
    return touchInEditable || e.which > 1;
  }
  if (isTouchEvent(e)) {
    return touchInEditable && focused($target);
  }
};
var createEvent = (originalEvent, args) => {
  var event = copyEvent(originalEvent);
  args && extend(event, args);
  return event;
};
var fireEvent = (props) => {
  var {
    originalEvent,
    delegateTarget
  } = props;
  var event = createEvent(originalEvent, props);
  events_engine_default.trigger(delegateTarget || event.target, event);
  return event;
};
var normalizeKeyName = (_ref4) => {
  var {
    key,
    which
  } = _ref4;
  var normalizedKey = KEY_MAP[null === key || void 0 === key ? void 0 : key.toLowerCase()] || key;
  var normalizedKeyFromWhich = LEGACY_KEY_CODES[which];
  if (normalizedKeyFromWhich && normalizedKey === key) {
    return normalizedKeyFromWhich;
  } else if (!normalizedKey && which) {
    return String.fromCharCode(which);
  }
  return normalizedKey;
};
var getChar = (_ref5) => {
  var {
    key,
    which
  } = _ref5;
  return key || String.fromCharCode(which);
};
var addNamespace2 = add_namespace_default;
var isCommandKeyPressed = (_ref6) => {
  var {
    ctrlKey,
    metaKey
  } = _ref6;
  return ctrlKey || metaKey;
};

// node_modules/devextreme/esm/core/utils/browser.js
var navigator = getNavigator();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;
var browserFromUA = (ua) => {
  ua = ua.toLowerCase();
  var result = {};
  var matches = webkitRegExp.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || [];
  var browserName = matches[1];
  var browserVersion = matches[2];
  if ("webkit" === browserName) {
    result.webkit = true;
    if (ua.indexOf("chrome") >= 0 || ua.indexOf("crios") >= 0) {
      browserName = "chrome";
      browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("fxios") >= 0) {
      browserName = "mozilla";
      browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else if (ua.indexOf("safari") >= 0 && /version|phantomjs/.test(ua)) {
      browserName = "safari";
      browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    } else {
      browserName = "unknown";
      browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
      browserVersion = browserVersion && browserVersion[1];
    }
  }
  if (browserName) {
    result[browserName] = true;
    result.version = browserVersion;
  }
  return result;
};
var browser_default = extend({
  _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent));

// node_modules/devextreme/esm/core/action.js
var Action = class _Action {
  constructor(action, config2) {
    config2 = config2 || {};
    this._action = action;
    this._context = config2.context || getWindow();
    this._beforeExecute = config2.beforeExecute;
    this._afterExecute = config2.afterExecute;
    this._component = config2.component;
    this._validatingTargetName = config2.validatingTargetName;
    var excludeValidators = this._excludeValidators = {};
    if (config2.excludeValidators) {
      for (var i = 0; i < config2.excludeValidators.length; i++) {
        excludeValidators[config2.excludeValidators[i]] = true;
      }
    }
  }
  execute() {
    var e = {
      action: this._action,
      args: Array.prototype.slice.call(arguments),
      context: this._context,
      component: this._component,
      validatingTargetName: this._validatingTargetName,
      cancel: false,
      handled: false
    };
    var beforeExecute = this._beforeExecute;
    var afterExecute = this._afterExecute;
    var argsBag = e.args[0] || {};
    if (!this._validateAction(e)) {
      return;
    }
    null === beforeExecute || void 0 === beforeExecute ? void 0 : beforeExecute.call(this._context, e);
    if (e.cancel) {
      return;
    }
    var result = this._executeAction(e);
    if (argsBag.cancel) {
      return;
    }
    null === afterExecute || void 0 === afterExecute ? void 0 : afterExecute.call(this._context, e);
    return result;
  }
  _validateAction(e) {
    var excludeValidators = this._excludeValidators;
    var {
      executors
    } = _Action;
    for (var name in executors) {
      if (!excludeValidators[name]) {
        var _executor$validate;
        var executor = executors[name];
        null === (_executor$validate = executor.validate) || void 0 === _executor$validate ? void 0 : _executor$validate.call(executor, e);
        if (e.cancel) {
          return false;
        }
      }
    }
    return true;
  }
  _executeAction(e) {
    var result;
    var {
      executors
    } = _Action;
    for (var name in executors) {
      var _executor$execute;
      var executor = executors[name];
      null === (_executor$execute = executor.execute) || void 0 === _executor$execute ? void 0 : _executor$execute.call(executor, e);
      if (e.handled) {
        result = e.result;
        break;
      }
    }
    return result;
  }
  static registerExecutor(name, executor) {
    if (isPlainObject(name)) {
      each(name, _Action.registerExecutor);
      return;
    }
    _Action.executors[name] = executor;
  }
  static unregisterExecutor() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    each(args, function() {
      delete _Action.executors[this];
    });
  }
};
Action.executors = {};
var createValidatorByTargetElement = (condition) => (e) => {
  if (!e.args.length) {
    return;
  }
  var args = e.args[0];
  var element = args[e.validatingTargetName] || args.element;
  if (element && condition(renderer_default(element))) {
    e.cancel = true;
  }
};
Action.registerExecutor({
  disabled: {
    validate: createValidatorByTargetElement(($target) => $target.is(".dx-state-disabled, .dx-state-disabled *"))
  },
  readOnly: {
    validate: createValidatorByTargetElement(($target) => $target.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)"))
  },
  undefined: {
    execute: (e) => {
      if (!e.action) {
        e.result = void 0;
        e.handled = true;
      }
    }
  },
  func: {
    execute: (e) => {
      if (isFunction(e.action)) {
        e.result = e.action.call(e.context, e.args[0]);
        e.handled = true;
      }
    }
  }
});

// node_modules/devextreme/esm/core/utils/comparator.js
var hasNegation = function(oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
var equals = function(oldValue, newValue) {
  oldValue = toComparable(oldValue, true);
  newValue = toComparable(newValue, true);
  if (oldValue && newValue && isRenderer(oldValue) && isRenderer(newValue)) {
    return newValue.is(oldValue);
  }
  var oldValueIsNaN = oldValue !== oldValue;
  var newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (0 === oldValue && 0 === newValue) {
    return hasNegation(oldValue, newValue);
  }
  if (null === oldValue || "object" !== typeof oldValue || dom_adapter_default.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};

// node_modules/devextreme/esm/core/options/utils.js
var cachedGetters = {};
var convertRulesToOptions = (rules) => {
  var currentDevice = devices_default.current();
  return rules.reduce((options, _ref) => {
    var {
      device,
      options: ruleOptions
    } = _ref;
    var deviceFilter = device || {};
    var match2 = isFunction(deviceFilter) ? deviceFilter(currentDevice) : deviceMatch(currentDevice, deviceFilter);
    if (match2) {
      extend(true, options, ruleOptions);
    }
    return options;
  }, {});
};
var normalizeOptions = (options, value2) => "string" !== typeof options ? options : {
  [options]: value2
};
var deviceMatch = (device, filter) => isEmptyObject(filter) || findBestMatches(device, [filter]).length > 0;
var getFieldName = (fullName) => fullName.substr(fullName.lastIndexOf(".") + 1);
var getParentName = (fullName) => fullName.substr(0, fullName.lastIndexOf("."));
var getNestedOptionValue = function(optionsObject, name) {
  cachedGetters[name] = cachedGetters[name] || compileGetter(name);
  return cachedGetters[name](optionsObject, {
    functionsAsIs: true
  });
};
var createDefaultOptionRules = function() {
  var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  return options;
};

// node_modules/devextreme/esm/core/options/option_manager.js
var cachedGetters2 = {};
var cachedSetters = {};
var OptionManager = class {
  constructor(options, optionsByReference) {
    this._options = options;
    this._optionsByReference = optionsByReference;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
  }
  _setByReference(options, rulesOptions) {
    extend(true, options, rulesOptions);
    for (var fieldName in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(rulesOptions, fieldName)) {
        options[fieldName] = rulesOptions[fieldName];
      }
    }
  }
  _setPreparedValue(name, value2, merge, silent) {
    var previousValue = this.get(this._options, name, false);
    if (!equals(previousValue, value2)) {
      var path = getPathParts(name);
      !silent && this._changingCallback(name, previousValue, value2);
      cachedSetters[name] = cachedSetters[name] || compileSetter(name);
      cachedSetters[name](this._options, value2, {
        functionsAsIs: true,
        merge: isDefined(merge) ? merge : !this._optionsByReference[name],
        unwrapObservables: path.length > 1 && !!this._optionsByReference[path[0]]
      });
      !silent && this._changedCallback(name, value2, previousValue);
    }
  }
  _prepareRelevantNames(options, name, value2, silent) {
    if (isPlainObject(value2)) {
      for (var valueName in value2) {
        this._prepareRelevantNames(options, "".concat(name, ".").concat(valueName), value2[valueName]);
      }
    }
    this._namePreparedCallbacks(options, name, value2, silent);
  }
  get() {
    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._options;
    var name = arguments.length > 1 ? arguments[1] : void 0;
    var unwrapObservables = arguments.length > 2 ? arguments[2] : void 0;
    cachedGetters2[name] = cachedGetters2[name] || compileGetter(name);
    return cachedGetters2[name](options, {
      functionsAsIs: true,
      unwrapObservables
    });
  }
  set(options, value2, merge, silent) {
    options = normalizeOptions(options, value2);
    for (var name in options) {
      this._prepareRelevantNames(options, name, options[name], silent);
    }
    for (var _name in options) {
      this._setPreparedValue(_name, options[_name], merge, silent);
    }
  }
  onRelevantNamesPrepared(callBack) {
    this._namePreparedCallbacks = callBack;
  }
  onChanging(callBack) {
    this._changingCallback = callBack;
  }
  onChanged(callBack) {
    this._changedCallback = callBack;
  }
  dispose() {
    this._changingCallback = noop2;
    this._changedCallback = noop2;
  }
};

// node_modules/devextreme/esm/core/options/index.js
var Options = class {
  constructor(options, defaultOptions, optionsByReference, deprecatedOptions) {
    this._deprecatedCallback;
    this._startChangeCallback;
    this._endChangeCallback;
    this._default = defaultOptions;
    this._deprecated = deprecatedOptions;
    this._deprecatedNames = [];
    this._initDeprecatedNames();
    this._optionManager = new OptionManager(options, optionsByReference);
    this._optionManager.onRelevantNamesPrepared((options2, name, value2, silent) => this._setRelevantNames(options2, name, value2, silent));
    this._cachedOptions = {};
    this._rules = [];
  }
  set _initial(value2) {
    this._initialOptions = value2;
  }
  get _initial() {
    if (!this._initialOptions) {
      var rulesOptions = this._getByRules(this.silent("defaultOptionsRules"));
      this._initialOptions = this._default;
      this._optionManager._setByReference(this._initialOptions, rulesOptions);
    }
    return this._initialOptions;
  }
  _initDeprecatedNames() {
    for (var optionName in this._deprecated) {
      this._deprecatedNames.push(optionName);
    }
  }
  _getByRules(rules) {
    rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
    return convertRulesToOptions(rules);
  }
  _notifyDeprecated(option) {
    var info = this._deprecated[option];
    if (info) {
      this._deprecatedCallback(option, info);
    }
  }
  _setRelevantNames(options, name, value2, silent) {
    if (name) {
      var normalizedName = this._normalizeName(name, silent);
      if (normalizedName && normalizedName !== name) {
        this._setField(options, normalizedName, value2);
        this._clearField(options, name);
      }
    }
  }
  _setField(options, fullName, value2) {
    var fieldName = "";
    var fieldObject = null;
    do {
      fieldName = fieldName ? ".".concat(fieldName) : "";
      fieldName = getFieldName(fullName) + fieldName;
      fullName = getParentName(fullName);
      fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options;
    } while (!fieldObject);
    fieldObject[fieldName] = value2;
  }
  _clearField(options, name) {
    delete options[name];
    var previousFieldName = getParentName(name);
    var fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
    if (fieldObject) {
      delete fieldObject[getFieldName(name)];
    }
  }
  _normalizeName(name, silent) {
    if (this._deprecatedNames.length && name) {
      for (var i = 0; i < this._deprecatedNames.length; i++) {
        if (this._deprecatedNames[i] === name) {
          var deprecate = this._deprecated[name];
          if (deprecate) {
            !silent && this._notifyDeprecated(name);
            return deprecate.alias || name;
          }
        }
      }
    }
    return name;
  }
  addRules(rules) {
    this._rules = rules.concat(this._rules);
  }
  applyRules(rules) {
    var options = this._getByRules(rules);
    this.silent(options);
  }
  dispose() {
    this._deprecatedCallback = noop2;
    this._startChangeCallback = noop2;
    this._endChangeCallback = noop2;
    this._optionManager.dispose();
  }
  onChanging(callBack) {
    this._optionManager.onChanging(callBack);
  }
  onChanged(callBack) {
    this._optionManager.onChanged(callBack);
  }
  onDeprecated(callBack) {
    this._deprecatedCallback = callBack;
  }
  onStartChange(callBack) {
    this._startChangeCallback = callBack;
  }
  onEndChange(callBack) {
    this._endChangeCallback = callBack;
  }
  isInitial(name) {
    var value2 = this.silent(name);
    var initialValue = this.initial(name);
    var areFunctions = isFunction(value2) && isFunction(initialValue);
    return areFunctions ? value2.toString() === initialValue.toString() : equalByValue(value2, initialValue);
  }
  initial(name) {
    return getNestedOptionValue(this._initial, name);
  }
  option(options, value2) {
    var isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, this._normalizeName(options));
    } else {
      this._startChangeCallback();
      try {
        this._optionManager.set(options, value2);
      } finally {
        this._endChangeCallback();
      }
    }
  }
  silent(options, value2) {
    var isGetter = arguments.length < 2 && "object" !== type(options);
    if (isGetter) {
      return this._optionManager.get(void 0, options, void 0, true);
    } else {
      this._optionManager.set(options, value2, void 0, true);
    }
  }
  reset(name) {
    if (name) {
      var fullPath = getPathParts(name);
      var value2 = fullPath.reduce((value3, field) => value3 ? value3[field] : this.initial(field), null);
      var defaultValue = isObject(value2) ? _extends({}, value2) : value2;
      this._optionManager.set(name, defaultValue, false);
    }
  }
  getAliasesByName(name) {
    return Object.keys(this._deprecated).filter((aliasName) => name === this._deprecated[aliasName].alias);
  }
  isDeprecated(name) {
    return Object.prototype.hasOwnProperty.call(this._deprecated, name);
  }
  cache(name, options) {
    var isGetter = arguments.length < 2;
    if (isGetter) {
      return this._cachedOptions[name];
    } else {
      this._cachedOptions[name] = extend(this._cachedOptions[name], options);
    }
  }
};

// node_modules/devextreme/esm/core/postponed_operations.js
var PostponedOperations = class {
  constructor() {
    this._postponedOperations = {};
  }
  add(key, fn, postponedPromise) {
    if (key in this._postponedOperations) {
      postponedPromise && this._postponedOperations[key].promises.push(postponedPromise);
    } else {
      var completePromise = new Deferred();
      this._postponedOperations[key] = {
        fn,
        completePromise,
        promises: postponedPromise ? [postponedPromise] : []
      };
    }
    return this._postponedOperations[key].completePromise.promise();
  }
  callPostponedOperations() {
    for (var key in this._postponedOperations) {
      var operation = this._postponedOperations[key];
      if (isDefined(operation)) {
        if (operation.promises && operation.promises.length) {
          when(...operation.promises).done(operation.fn).then(operation.completePromise.resolve);
        } else {
          operation.fn().done(operation.completePromise.resolve);
        }
      }
    }
    this._postponedOperations = {};
  }
};

// node_modules/devextreme/esm/core/component.js
var getEventName = (actionName) => actionName.charAt(2).toLowerCase() + actionName.substr(3);
var isInnerOption = (optionName) => 0 === optionName.indexOf("_", 0);
var Component = class_default.inherit({
  _setDeprecatedOptions() {
    this._deprecatedOptions = {};
  },
  _getDeprecatedOptions() {
    return this._deprecatedOptions;
  },
  _getDefaultOptions: () => ({
    onInitialized: null,
    onOptionChanged: null,
    onDisposing: null,
    defaultOptionsRules: null
  }),
  _defaultOptionsRules: () => [],
  _setOptionsByDevice(rules) {
    this._options.applyRules(rules);
  },
  _convertRulesToOptions: (rules) => convertRulesToOptions(rules),
  _isInitialOptionValue(name) {
    return this._options.isInitial(name);
  },
  _setOptionsByReference() {
    this._optionsByReference = {};
  },
  _getOptionsByReference() {
    return this._optionsByReference;
  },
  ctor() {
    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var {
      _optionChangedCallbacks,
      _disposingCallbacks
    } = options;
    this.NAME = getName(this.constructor);
    this._eventsStrategy = EventsStrategy.create(this, options.eventsStrategy);
    this._updateLockCount = 0;
    this._optionChangedCallbacks = _optionChangedCallbacks || callbacks_default();
    this._disposingCallbacks = _disposingCallbacks || callbacks_default();
    this.postponedOperations = new PostponedOperations();
    this._createOptions(options);
  },
  _createOptions(options) {
    this.beginUpdate();
    try {
      this._setOptionsByReference();
      this._setDeprecatedOptions();
      this._options = new Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
      this._options.onChanging((name, previousValue, value2) => this._initialized && this._optionChanging(name, previousValue, value2));
      this._options.onDeprecated((option, info) => this._logDeprecatedOptionWarning(option, info));
      this._options.onChanged((name, value2, previousValue) => this._notifyOptionChanged(name, value2, previousValue));
      this._options.onStartChange(() => this.beginUpdate());
      this._options.onEndChange(() => this.endUpdate());
      this._options.addRules(this._defaultOptionsRules());
      if (options && options.onInitializing) {
        options.onInitializing.apply(this, [options]);
      }
      this._setOptionsByDevice(options.defaultOptionsRules);
      this._initOptions(options);
    } finally {
      this.endUpdate();
    }
  },
  _initOptions(options) {
    this.option(options);
  },
  _init() {
    this._createOptionChangedAction();
    this.on("disposing", (args) => {
      this._disposingCallbacks.fireWith(this, [args]);
    });
  },
  _logDeprecatedOptionWarning(option, info) {
    var message = info.message || "Use the '".concat(info.alias, "' option instead");
    errors_default.log("W0001", this.NAME, option, info.since, message);
  },
  _logDeprecatedComponentWarning(since, alias) {
    errors_default.log("W0000", this.NAME, since, "Use the '".concat(alias, "' widget instead"));
  },
  _createOptionChangedAction() {
    this._optionChangedAction = this._createActionByOption("onOptionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _createDisposingAction() {
    this._disposingAction = this._createActionByOption("onDisposing", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _optionChanged(args) {
    switch (args.name) {
      case "onDisposing":
      case "onInitialized":
        break;
      case "onOptionChanged":
        this._createOptionChangedAction();
    }
  },
  _dispose() {
    this._optionChangedCallbacks.empty();
    this._createDisposingAction();
    this._disposingAction();
    this._eventsStrategy.dispose();
    this._options.dispose();
    this._disposed = true;
  },
  _lockUpdate() {
    this._updateLockCount++;
  },
  _unlockUpdate() {
    this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
  },
  _isUpdateAllowed() {
    return 0 === this._updateLockCount;
  },
  _isInitializingRequired() {
    return !this._initializing && !this._initialized;
  },
  isInitialized() {
    return this._initialized;
  },
  _commitUpdate() {
    this.postponedOperations.callPostponedOperations();
    this._isInitializingRequired() && this._initializeComponent();
  },
  _initializeComponent() {
    this._initializing = true;
    try {
      this._init();
    } finally {
      this._initializing = false;
      this._lockUpdate();
      this._createActionByOption("onInitialized", {
        excludeValidators: ["disabled", "readOnly"]
      })();
      this._unlockUpdate();
      this._initialized = true;
    }
  },
  instance() {
    return this;
  },
  beginUpdate: function() {
    this._lockUpdate();
  },
  endUpdate: function() {
    this._unlockUpdate();
    this._isUpdateAllowed() && this._commitUpdate();
  },
  _optionChanging: noop2,
  _notifyOptionChanged(option, value2, previousValue) {
    if (this._initialized) {
      var optionNames = [option].concat(this._options.getAliasesByName(option));
      for (var i = 0; i < optionNames.length; i++) {
        var name = optionNames[i];
        var args = {
          name: getPathParts(name)[0],
          fullName: name,
          value: value2,
          previousValue
        };
        if (!isInnerOption(name)) {
          this._optionChangedCallbacks.fireWith(this, [extend(this._defaultActionArgs(), args)]);
          this._optionChangedAction(extend({}, args));
        }
        if (!this._disposed && this._cancelOptionChange !== name) {
          this._optionChanged(args);
        }
      }
    }
  },
  initialOption(name) {
    return this._options.initial(name);
  },
  _defaultActionConfig() {
    return {
      context: this,
      component: this
    };
  },
  _defaultActionArgs() {
    return {
      component: this
    };
  },
  _createAction(actionSource, config2) {
    var action;
    return (e) => {
      if (!isDefined(e)) {
        e = {};
      }
      if (!isPlainObject(e)) {
        e = {
          actionValue: e
        };
      }
      action = action || new Action(actionSource, extend({}, config2, this._defaultActionConfig()));
      return action.execute.call(action, extend(e, this._defaultActionArgs()));
    };
  },
  _createActionByOption(optionName, config2) {
    var _this = this;
    var action;
    var eventName;
    var actionFunc;
    config2 = extend({}, config2);
    var result = function() {
      if (!eventName) {
        config2 = config2 || {};
        if ("string" !== typeof optionName) {
          throw errors_default.Error("E0008");
        }
        if (0 === optionName.indexOf("on")) {
          eventName = getEventName(optionName);
        }
        actionFunc = _this.option(optionName);
      }
      if (!action && !actionFunc && !config2.beforeExecute && !config2.afterExecute && !_this._eventsStrategy.hasEvent(eventName)) {
        return;
      }
      if (!action) {
        var beforeExecute = config2.beforeExecute;
        config2.beforeExecute = function() {
          for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            props[_key2] = arguments[_key2];
          }
          beforeExecute && beforeExecute.apply(_this, props);
          _this._eventsStrategy.fireEvent(eventName, props[0].args);
        };
        action = _this._createAction(actionFunc, config2);
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (config_default().wrapActionsBeforeExecute) {
        var beforeActionExecute = _this.option("beforeActionExecute") || noop2;
        var wrappedAction = beforeActionExecute(_this, action, config2) || action;
        return wrappedAction.apply(_this, args);
      }
      return action.apply(_this, args);
    };
    if (config_default().wrapActionsBeforeExecute) {
      return result;
    }
    var onActionCreated = this.option("onActionCreated") || noop2;
    return onActionCreated(this, result, config2) || result;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  },
  hasActionSubscription: function(actionName) {
    return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName));
  },
  isOptionDeprecated(name) {
    return this._options.isDeprecated(name);
  },
  _setOptionWithoutOptionChange(name, value2) {
    this._cancelOptionChange = name;
    this.option(name, value2);
    this._cancelOptionChange = false;
  },
  _getOptionValue(name, context2) {
    var value2 = this.option(name);
    if (isFunction(value2)) {
      return value2.bind(context2)();
    }
    return value2;
  },
  option() {
    return this._options.option(...arguments);
  },
  resetOption(name) {
    this.beginUpdate();
    this._options.reset(name);
    this.endUpdate();
  }
});

// node_modules/devextreme/esm/core/utils/dom.js
var window9 = getWindow();
var getRootNodeHost = (element) => {
  if (!element.getRootNode) {
    return;
  }
  var host = element.getRootNode().host;
  if (isString(host)) {
    return;
  }
  return host;
};
var resetActiveElement = () => {
  var activeElement = dom_adapter_default.getActiveElement();
  if (activeElement && activeElement !== dom_adapter_default.getBody()) {
    var _activeElement$blur;
    null === (_activeElement$blur = activeElement.blur) || void 0 === _activeElement$blur ? void 0 : _activeElement$blur.call(activeElement);
  }
};
var clearSelection = () => {
  var selection = window9.getSelection();
  if (!selection) {
    return;
  }
  if ("Caret" === selection.type) {
    return;
  }
  if (selection.empty) {
    selection.empty();
  } else if (selection.removeAllRanges) {
    try {
      selection.removeAllRanges();
    } catch (e) {
    }
  }
};
var closestCommonParent = (startTarget, endTarget) => {
  var $startTarget = renderer_default(startTarget);
  var $endTarget = renderer_default(endTarget);
  if ($startTarget[0] === $endTarget[0]) {
    return $startTarget[0];
  }
  var $startParents = $startTarget.parents();
  var $endParents = $endTarget.parents();
  var startingParent = Math.min($startParents.length, $endParents.length);
  for (var i = -startingParent; i < 0; i++) {
    if ($startParents.get(i) === $endParents.get(i)) {
      return $startParents.get(i);
    }
  }
};
var normalizeTemplateElement = (element) => {
  var $element = isDefined(element) && (element.nodeType || isRenderer(element)) ? renderer_default(element) : renderer_default("<div>").html(element).contents();
  if (1 === $element.length) {
    if ($element.is("script")) {
      $element = normalizeTemplateElement($element.html().trim());
    } else if ($element.is("table")) {
      $element = $element.children("tbody").contents();
    }
  }
  return $element;
};
var clipboardText = (event, text) => {
  var clipboard = event.originalEvent && event.originalEvent.clipboardData || window9.clipboardData;
  if (!text) {
    return clipboard && clipboard.getData("Text");
  }
  clipboard && clipboard.setData("Text", text);
};
var contains2 = (container, element) => {
  if (!element) {
    return false;
  }
  if (isWindow(container)) {
    return contains2(container.document, element);
  }
  return container.contains(element) || contains2(container, getRootNodeHost(element));
};
var createTextElementHiddenCopy = (element, text, options) => {
  var elementStyles = window9.getComputedStyle(renderer_default(element).get(0));
  var includePaddings = options && options.includePaddings;
  return renderer_default("<div>").text(text).css({
    fontStyle: elementStyles.fontStyle,
    fontVariant: elementStyles.fontVariant,
    fontWeight: elementStyles.fontWeight,
    fontSize: elementStyles.fontSize,
    fontFamily: elementStyles.fontFamily,
    letterSpacing: elementStyles.letterSpacing,
    border: elementStyles.border,
    paddingTop: includePaddings ? elementStyles.paddingTop : "",
    paddingRight: includePaddings ? elementStyles.paddingRight : "",
    paddingBottom: includePaddings ? elementStyles.paddingBottom : "",
    paddingLeft: includePaddings ? elementStyles.paddingLeft : "",
    visibility: "hidden",
    whiteSpace: "pre",
    position: "absolute",
    float: "left"
  });
};
var insertBefore = (element, newElement) => {
  if (newElement) {
    dom_adapter_default.insertElement(element.parentNode, newElement, element);
  }
  return element;
};
var replaceWith = (element, newElement) => {
  if (!(newElement && newElement[0])) {
    return;
  }
  if (newElement.is(element)) {
    return element;
  }
  each(newElement, (_, currentElement) => {
    insertBefore(element[0], currentElement);
  });
  element.remove();
  return newElement;
};
var isElementInDom = ($element) => {
  var element = null === $element || void 0 === $element ? void 0 : $element.get(0);
  var shadowHost = null === element || void 0 === element ? void 0 : element.getRootNode().host;
  return !!renderer_default(shadowHost || element).closest(getWindow().document).length;
};

// node_modules/devextreme/esm/events/visibility_change.js
var triggerVisibilityChangeEvent = function(eventName) {
  return function(element) {
    var $element = renderer_default(element || "body");
    var changeHandlers = $element.filter(".dx-visibility-change-handler").add($element.find(".dx-visibility-change-handler"));
    for (var i = 0; i < changeHandlers.length; i++) {
      events_engine_default.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
var triggerShownEvent = triggerVisibilityChangeEvent("dxshown");
var triggerHidingEvent = triggerVisibilityChangeEvent("dxhiding");
var triggerResizeEvent = triggerVisibilityChangeEvent("dxresize");

// node_modules/devextreme/esm/core/templates/template_base.js
var renderedCallbacks = callbacks_default({
  syncStrategy: true
});
var TemplateBase = class {
  render(options) {
    options = options || {};
    var onRendered = options.onRendered;
    delete options.onRendered;
    var $result;
    if (options.renovated && options.transclude && this._element) {
      $result = renderer_default("<div>").append(this._element).contents();
    } else {
      $result = this._renderCore(options);
    }
    this._ensureResultInContainer($result, options.container);
    renderedCallbacks.fire($result, options.container);
    onRendered && onRendered();
    return $result;
  }
  _ensureResultInContainer($result, container) {
    if (!container) {
      return;
    }
    var $container = renderer_default(container);
    var resultInContainer = contains2($container.get(0), $result.get(0));
    $container.append($result);
    if (resultInContainer) {
      return;
    }
    var resultInBody = dom_adapter_default.getBody().contains($container.get(0));
    if (!resultInBody) {
      return;
    }
    triggerShownEvent($result);
  }
  _renderCore() {
    throw errors_default.Error("E0001");
  }
};

// node_modules/devextreme/esm/core/templates/function_template.js
var FunctionTemplate = class extends TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  _renderCore(options) {
    return normalizeTemplateElement(this._render(options));
  }
};

// node_modules/devextreme/esm/core/templates/empty_template.js
var EmptyTemplate = class extends TemplateBase {
  _renderCore() {
    return renderer_default();
  }
};

// node_modules/devextreme/esm/core/element.js
function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
var strategy2 = getPublicElementNonJquery;
function getPublicElement(element) {
  return strategy2(element);
}

// node_modules/devextreme/esm/core/templates/child_default_template.js
var ChildDefaultTemplate = class extends TemplateBase {
  constructor(name) {
    super();
    this.name = name;
  }
};

// node_modules/devextreme/esm/core/templates/template_engine_registry.js
var templateEngines = {};
var currentTemplateEngine;
function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
function setTemplateEngine(templateEngine) {
  if (isString(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];
    if (!currentTemplateEngine) {
      throw errors_default.Error("E0020", templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}

// node_modules/devextreme/esm/core/templates/template.js
registerTemplateEngine("default", {
  compile: (element) => normalizeTemplateElement(element),
  render: (template, model, index2) => template.clone()
});
setTemplateEngine("default");
var Template = class extends TemplateBase {
  constructor(element) {
    super();
    this._element = element;
  }
  _renderCore(options) {
    var transclude = options.transclude;
    if (!transclude && !this._compiledTemplate) {
      this._compiledTemplate = getCurrentTemplateEngine().compile(this._element);
    }
    return renderer_default("<div>").append(transclude ? this._element : getCurrentTemplateEngine().render(this._compiledTemplate, options.model, options.index)).contents();
  }
  source() {
    return renderer_default(this._element).clone();
  }
};

// node_modules/devextreme/esm/core/utils/array.js
function createOccurrenceMap(array) {
  return array.reduce((map2, value2) => {
    var _map$get;
    var count = (null !== (_map$get = map2.get(value2)) && void 0 !== _map$get ? _map$get : 0) + 1;
    map2.set(value2, count);
    return map2;
  }, /* @__PURE__ */ new Map());
}
var wrapToArray = function(item) {
  return Array.isArray(item) ? item : [item];
};
var getUniqueValues = function(values) {
  return [...new Set(values)];
};
var removeDuplicates = function() {
  var from = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
  var toRemove = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
  var toRemoveMap = createOccurrenceMap(toRemove);
  return from.filter((value2) => {
    var occurrencesCount = toRemoveMap.get(value2);
    occurrencesCount && toRemoveMap.set(value2, occurrencesCount - 1);
    return !occurrencesCount;
  });
};
var normalizeIndexes = function(items, indexPropName, currentItem, needIndexCallback) {
  var indexedItems = {};
  var {
    useLegacyVisibleIndex
  } = config_default();
  var currentIndex = 0;
  var shouldUpdateIndex = (item) => !isDefined(item[indexPropName]) && (!needIndexCallback || needIndexCallback(item));
  items.forEach((item) => {
    var index2 = item[indexPropName];
    if (index2 >= 0) {
      indexedItems[index2] = indexedItems[index2] || [];
      if (item === currentItem) {
        indexedItems[index2].unshift(item);
      } else {
        indexedItems[index2].push(item);
      }
    } else {
      item[indexPropName] = void 0;
    }
  });
  if (!useLegacyVisibleIndex) {
    items.forEach((item) => {
      if (shouldUpdateIndex(item)) {
        while (indexedItems[currentIndex]) {
          currentIndex++;
        }
        indexedItems[currentIndex] = [item];
        currentIndex++;
      }
    });
  }
  currentIndex = 0;
  orderEach(indexedItems, function(index2, items2) {
    items2.forEach((item) => {
      if (index2 >= 0) {
        item[indexPropName] = currentIndex++;
      }
    });
  });
  if (useLegacyVisibleIndex) {
    items.forEach((item) => {
      if (shouldUpdateIndex(item)) {
        item[indexPropName] = currentIndex++;
      }
    });
  }
};
var groupBy = (array, getGroupName) => array.reduce((groupedResult, item) => {
  var _groupedResult$groupN;
  var groupName = getGroupName(item);
  groupedResult[groupName] = null !== (_groupedResult$groupN = groupedResult[groupName]) && void 0 !== _groupedResult$groupN ? _groupedResult$groupN : [];
  groupedResult[groupName].push(item);
  return groupedResult;
}, {});

// node_modules/devextreme/esm/core/utils/template_manager.js
var findTemplates = (element, name) => {
  var templates = renderer_default(element).contents().filter("[".concat("data-options", '*="').concat(name, '"]'));
  return [].slice.call(templates).map((element2) => {
    var optionsString = renderer_default(element2).attr("data-options") || "";
    return {
      element: element2,
      options: config_default().optionsParser(optionsString)[name]
    };
  }).filter((template) => !!template.options);
};
var suitableTemplatesByName = (rawTemplates) => {
  var templatesMap = groupBy(rawTemplates, (template) => template.options.name);
  if (templatesMap[void 0]) {
    throw errors_default.Error("E0023");
  }
  var result = {};
  Object.keys(templatesMap).forEach((name) => {
    var _findBestMatches$;
    var suitableTemplate = null === (_findBestMatches$ = findBestMatches(devices_default.current(), templatesMap[name], (template) => template.options)[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
    if (suitableTemplate) {
      result[name] = suitableTemplate;
    }
  });
  return result;
};
var addOneRenderedCall = (template) => {
  var render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      var templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
var addPublicElementNormalization = (template) => {
  var render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      var $container = renderer_default(options.container);
      return render(_extends({}, options, {
        container: getPublicElement($container)
      }));
    }
  });
};
var getNormalizedTemplateArgs = (options) => {
  var args = [];
  if ("model" in options) {
    args.push(options.model);
  }
  if ("index" in options) {
    args.push(options.index);
  }
  args.push(options.container);
  return args;
};
var validateTemplateSource = (templateSource) => "string" === typeof templateSource ? normalizeTemplateElement(templateSource) : templateSource;
var templateKey = (templateSource) => isRenderer(templateSource) && templateSource[0] || templateSource;
var defaultCreateElement = (element) => new Template(element);
var acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
  var integrationTemplate = null;
  if (!skipTemplates || -1 === skipTemplates.indexOf(templateSource)) {
    integrationTemplate = templates[templateSource];
    if (integrationTemplate && !(integrationTemplate instanceof TemplateBase)) {
      if (isFunction(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
  }
  return integrationTemplate;
};
var acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
  if (null == templateSource) {
    return new EmptyTemplate();
  }
  if (templateSource instanceof ChildDefaultTemplate) {
    return defaultTemplates[templateSource.name];
  }
  if (templateSource instanceof TemplateBase) {
    return templateSource;
  }
  if (isFunction(templateSource.render) && !isRenderer(templateSource)) {
    return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
  }
  if (templateSource.nodeType || isRenderer(templateSource)) {
    return createTemplate(renderer_default(templateSource));
  }
  return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
};

// node_modules/devextreme/esm/core/template_manager.js
var TEXT_NODE2 = 3;
var ANONYMOUS_TEMPLATE_NAME = "template";
var TEMPLATE_OPTIONS_NAME = "dxTemplate";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var DX_POLYMORPH_WIDGET_TEMPLATE = new FunctionTemplate((_ref) => {
  var {
    model,
    parent
  } = _ref;
  var widgetName = model.widget;
  if (!widgetName) {
    return renderer_default();
  }
  var widgetElement = renderer_default("<div>");
  var widgetOptions = model.options || {};
  if (parent) {
    parent._createComponent(widgetElement, widgetName, widgetOptions);
  } else {
    widgetElement[widgetName](widgetOptions);
  }
  return widgetElement;
});
var TemplateManager = class {
  constructor(createElement, anonymousTemplateName) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
    this._createElement = createElement || defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  static createDefaultOptions() {
    return {
      integrationOptions: {
        watchMethod: function(fn, callback) {
          var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          if (!options.skipImmediate) {
            callback(fn());
          }
          return noop2;
        },
        templates: {
          "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
        },
        useDeferUpdateForTemplates: true
      }
    };
  }
  get anonymousTemplateName() {
    return this._anonymousTemplateName;
  }
  addDefaultTemplates(templates) {
    this._defaultTemplates = extend({}, this._defaultTemplates, templates);
  }
  dispose() {
    this._tempTemplates.forEach((tempTemplate) => {
      tempTemplate.template.dispose && tempTemplate.template.dispose();
    });
    this._tempTemplates = [];
  }
  extractTemplates($el) {
    var templates = this._extractTemplates($el);
    var anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    var templates = findTemplates($el, TEMPLATE_OPTIONS_NAME);
    var suitableTemplates = suitableTemplatesByName(templates);
    templates.forEach((_ref2) => {
      var {
        element,
        options: {
          name
        }
      } = _ref2;
      if (element === suitableTemplates[name]) {
        renderer_default(element).addClass(TEMPLATE_WRAPPER_CLASS).detach();
      } else {
        renderer_default(element).remove();
      }
    });
    return Object.keys(suitableTemplates).map((name) => ({
      name,
      template: this._createTemplate(suitableTemplates[name])
    }));
  }
  _extractAnonymousTemplate($el) {
    var $anonymousTemplate = $el.contents().detach();
    var $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
      var isTextNode = element.nodeType === TEXT_NODE2;
      var isEmptyText = renderer_default(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    });
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    var cachedTemplate = this._tempTemplates.filter((tempTemplate) => tempTemplate.source === templateKey(templateSource))[0];
    if (cachedTemplate) {
      return cachedTemplate.template;
    }
    var template = this._createTemplate(templateSource);
    this._tempTemplates.push({
      template,
      source: templateKey(templateSource)
    });
    return template;
  }
  _createTemplate(templateSource) {
    return this._createElement(validateTemplateSource(templateSource));
  }
  getTemplate(templateSource, templates, _ref3, context2) {
    var {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!isFunction(templateSource)) {
      return acquireTemplate(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    return new FunctionTemplate((options) => {
      var templateSourceResult = templateSource.apply(context2, getNormalizedTemplateArgs(options));
      if (!isDefined(templateSourceResult)) {
        return new EmptyTemplate();
      }
      var dispose = false;
      var template = acquireTemplate(templateSourceResult, (templateSource2) => {
        if (templateSource2.nodeType || isRenderer(templateSource2) && !renderer_default(templateSource2).is("script")) {
          return new FunctionTemplate(() => templateSource2);
        }
        dispose = true;
        return this._createTemplate(templateSource2);
      }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      var result = template.render(options);
      dispose && template.dispose && template.dispose();
      return result;
    });
  }
};

// node_modules/devextreme/esm/events/core/keyboard_processor.js
var COMPOSITION_START_EVENT = "compositionstart";
var COMPOSITION_END_EVENT = "compositionend";
var KEYDOWN_EVENT = "keydown";
var NAMESPACE = "KeyboardProcessor";
var createKeyDownOptions = (e) => ({
  keyName: normalizeKeyName(e),
  key: e.key,
  code: e.code,
  ctrl: e.ctrlKey,
  location: e.location,
  metaKey: e.metaKey,
  shift: e.shiftKey,
  alt: e.altKey,
  which: e.which,
  originalEvent: e
});
var KeyboardProcessor = class_default.inherit({
  _keydown: addNamespace2(KEYDOWN_EVENT, NAMESPACE),
  _compositionStart: addNamespace2(COMPOSITION_START_EVENT, NAMESPACE),
  _compositionEnd: addNamespace2(COMPOSITION_END_EVENT, NAMESPACE),
  ctor: function(options) {
    options = options || {};
    if (options.element) {
      this._element = renderer_default(options.element);
    }
    if (options.focusTarget) {
      this._focusTarget = options.focusTarget;
    }
    this._handler = options.handler;
    if (this._element) {
      this._processFunction = (e) => {
        var focusTargets = renderer_default(this._focusTarget).toArray();
        var isNotFocusTarget = this._focusTarget && this._focusTarget !== e.target && !focusTargets.includes(e.target);
        var shouldSkipProcessing = this._isComposingJustFinished && 229 === e.which || this._isComposing || isNotFocusTarget;
        this._isComposingJustFinished = false;
        if (!shouldSkipProcessing) {
          this.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      events_engine_default.on(this._element, this._keydown, this._processFunction);
      events_engine_default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      events_engine_default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose: function() {
    if (this._element) {
      events_engine_default.off(this._element, this._keydown, this._processFunction);
      events_engine_default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      events_engine_default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = void 0;
    this._handler = void 0;
  },
  process: function(e) {
    this._handler(createKeyDownOptions(e));
  },
  toggleProcessing: function(_ref) {
    var {
      type: type2
    } = _ref;
    this._isComposing = type2 === COMPOSITION_START_EVENT;
    this._isComposingJustFinished = !this._isComposing;
  }
});
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
var keyboard_processor_default = KeyboardProcessor;

// node_modules/devextreme/esm/events/short.js
function addNamespace3(event, namespace) {
  return namespace ? addNamespace2(event, namespace) : event;
}
function executeAction(action, args) {
  return "function" === typeof action ? action(args) : action.execute(args);
}
var active = {
  on: ($el, active2, inactive, opts) => {
    var {
      selector,
      showTimeout,
      hideTimeout,
      namespace
    } = opts;
    events_engine_default.on($el, addNamespace3("dxactive", namespace), selector, {
      timeout: showTimeout
    }, (event) => executeAction(active2, {
      event,
      element: event.currentTarget
    }));
    events_engine_default.on($el, addNamespace3("dxinactive", namespace), selector, {
      timeout: hideTimeout
    }, (event) => executeAction(inactive, {
      event,
      element: event.currentTarget
    }));
  },
  off: ($el, _ref) => {
    var {
      namespace,
      selector
    } = _ref;
    events_engine_default.off($el, addNamespace3("dxactive", namespace), selector);
    events_engine_default.off($el, addNamespace3("dxinactive", namespace), selector);
  }
};
var resize = {
  on: function($el, resize2) {
    var {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    events_engine_default.on($el, addNamespace3("dxresize", namespace), resize2);
  },
  off: function($el) {
    var {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    events_engine_default.off($el, addNamespace3("dxresize", namespace));
  }
};
var hover = {
  on: ($el, start, end, _ref2) => {
    var {
      selector,
      namespace
    } = _ref2;
    events_engine_default.on($el, addNamespace3("dxhoverend", namespace), selector, (event) => end(event));
    events_engine_default.on($el, addNamespace3("dxhoverstart", namespace), selector, (event) => executeAction(start, {
      element: event.target,
      event
    }));
  },
  off: ($el, _ref3) => {
    var {
      selector,
      namespace
    } = _ref3;
    events_engine_default.off($el, addNamespace3("dxhoverstart", namespace), selector);
    events_engine_default.off($el, addNamespace3("dxhoverend", namespace), selector);
  }
};
var visibility = {
  on: ($el, shown, hiding, _ref4) => {
    var {
      namespace
    } = _ref4;
    events_engine_default.on($el, addNamespace3("dxhiding", namespace), hiding);
    events_engine_default.on($el, addNamespace3("dxshown", namespace), shown);
  },
  off: ($el, _ref5) => {
    var {
      namespace
    } = _ref5;
    events_engine_default.off($el, addNamespace3("dxhiding", namespace));
    events_engine_default.off($el, addNamespace3("dxshown", namespace));
  }
};
var focus = {
  on: ($el, focusIn, focusOut, _ref6) => {
    var {
      namespace
    } = _ref6;
    events_engine_default.on($el, addNamespace3("focusin", namespace), focusIn);
    events_engine_default.on($el, addNamespace3("focusout", namespace), focusOut);
  },
  off: ($el, _ref7) => {
    var {
      namespace
    } = _ref7;
    events_engine_default.off($el, addNamespace3("focusin", namespace));
    events_engine_default.off($el, addNamespace3("focusout", namespace));
  },
  trigger: ($el) => events_engine_default.trigger($el, "focus")
};
var dxClick = {
  on: function($el, click2) {
    var {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    events_engine_default.on($el, addNamespace3("dxclick", namespace), click2);
  },
  off: function($el) {
    var {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    events_engine_default.off($el, addNamespace3("dxclick", namespace));
  }
};
var click = {
  on: function($el, click2) {
    var {
      namespace
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    events_engine_default.on($el, addNamespace3("click", namespace), click2);
  },
  off: function($el) {
    var {
      namespace
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    events_engine_default.off($el, addNamespace3("click", namespace));
  }
};
var index = 0;
var keyboardProcessors = {};
var generateListenerId = () => "keyboardProcessorId".concat(index++);
var keyboard = {
  on: (element, focusTarget, handler) => {
    var listenerId = generateListenerId();
    keyboardProcessors[listenerId] = new keyboard_processor_default({
      element,
      focusTarget,
      handler
    });
    return listenerId;
  },
  off: (listenerId) => {
    if (listenerId && keyboardProcessors[listenerId]) {
      keyboardProcessors[listenerId].dispose();
      delete keyboardProcessors[listenerId];
    }
  },
  _getProcessor: (listenerId) => keyboardProcessors[listenerId]
};

// node_modules/devextreme/esm/__internal/utils/version.js
var assertedVersions = [];
var VERSION_SPLITTER = ".";
function stringifyVersion(version2) {
  var {
    major,
    minor,
    patch
  } = version2;
  return [major, minor, patch].join(VERSION_SPLITTER);
}
function parseVersion(version2) {
  var [major, minor, patch] = version2.split(".").map(Number);
  return {
    major,
    minor,
    patch
  };
}
function stringifyVersionList(assertedVersionList) {
  return assertedVersionList.map((assertedVersion) => "".concat(assertedVersion.packageName, ": ").concat(assertedVersion.version)).join("\n");
}
function versionsEqual(versionA, versionB) {
  return versionA.major === versionB.major && versionA.minor === versionB.minor && versionA.patch === versionB.patch;
}
function assertedVersionsCompatible(currentVersion) {
  var mismatchingVersions = assertedVersions.filter((assertedVersion) => !versionsEqual(parseVersion(assertedVersion.version), currentVersion));
  if (mismatchingVersions.length) {
    errors_default.log("W0023", stringifyVersionList([{
      packageName: "devextreme",
      version: stringifyVersion(currentVersion)
    }, ...mismatchingVersions]));
    return false;
  }
  return true;
}

// node_modules/devextreme/esm/__internal/core/license/byte_utils.js
function base64ToBytes(base64) {
  return new Uint8Array(atob(base64).split("").map((s) => s.charCodeAt(0)));
}
function hexToBytes(string) {
  var _a, _b;
  return new Uint8Array(null !== (_b = null === (_a = string.match(/.{1,2}/g)) || void 0 === _a ? void 0 : _a.map((byte) => parseInt(byte, 16))) && void 0 !== _b ? _b : []);
}
function stringToBytes(string) {
  var bytes = new Uint8Array(string.length);
  for (var k = 0; k < string.length; k += 1) {
    bytes[k] = 255 & string.charCodeAt(k);
  }
  return bytes;
}
function wordsToBytes(words) {
  var bytes = new Uint8Array(4 * words.length);
  for (var k = 0; k < bytes.length; k += 1) {
    bytes[k] = words[k >> 2] >>> 8 * (3 - k % 4);
  }
  return bytes;
}
function bytesToWords(bytes) {
  var words = new Uint32Array(1 + (bytes.length - 1 >> 2));
  for (var k = 0; k < bytes.length; k += 1) {
    words[k >> 2] |= bytes[k] << 8 * (3 - k % 4);
  }
  return words;
}
function leftRotate(x, n) {
  return (x << n | x >>> 32 - n) >>> 0;
}
function concatBytes(a, b) {
  var result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}

// node_modules/devextreme/esm/__internal/core/license/key.js
var PUBLIC_KEY = {
  e: 65537,
  n: new Uint8Array([200, 219, 153, 203, 140, 7, 228, 253, 193, 243, 62, 137, 139, 60, 68, 242, 48, 142, 113, 88, 185, 235, 253, 105, 80, 74, 32, 170, 96, 74, 111, 250, 7, 205, 154, 3, 146, 115, 153, 53, 45, 132, 123, 56, 61, 208, 184, 201, 63, 24, 109, 223, 0, 179, 169, 102, 139, 224, 73, 233, 45, 173, 138, 66, 98, 88, 69, 76, 177, 111, 113, 218, 192, 33, 101, 152, 25, 134, 34, 173, 32, 82, 230, 44, 247, 200, 253, 170, 192, 246, 30, 12, 96, 205, 100, 249, 181, 93, 0, 231])
};
var INTERNAL_USAGE_ID = "e2XRM3Y9TxudL2xjwDH9nk";

// node_modules/devextreme/esm/__internal/core/license/pkcs1.js
var ASN1_SHA1 = "3021300906052b0e03021a05000414";
function pad(hash) {
  var dataLength = (8 * PUBLIC_KEY.n.length + 6) / 8;
  var data2 = concatBytes(hexToBytes(ASN1_SHA1), hash);
  if (data2.length + 10 > dataLength) {
    throw Error("Key is too short for SHA1 signing algorithm");
  }
  var padding = new Uint8Array(dataLength - data2.length);
  padding.fill(255, 0, padding.length - 1);
  padding[0] = 0;
  padding[1] = 1;
  padding[padding.length - 1] = 0;
  return concatBytes(padding, data2);
}

// node_modules/devextreme/esm/__internal/core/license/rsa_bigint.js
function compareSignatures(args) {
  try {
    var zero = BigInt(0);
    var one = BigInt(1);
    var eight = BigInt(8);
    var bigIntFromBytes = (bytes) => bytes.reduce((acc, cur) => (acc << eight) + BigInt(cur), zero);
    var actual = bigIntFromBytes(args.actual);
    var signature = bigIntFromBytes(args.signature);
    var exponent = BigInt(args.key.e);
    var modulus = bigIntFromBytes(args.key.n);
    var expected = ((base2, exponent2, modulus2) => {
      var result = one;
      var b = base2;
      var e = exponent2;
      while (e) {
        if (e & one) {
          result = result * b % modulus2;
        }
        b = b * b % modulus2;
        e >>= one;
      }
      return result;
    })(signature, exponent, modulus);
    return expected === actual;
  } catch (_a) {
    return true;
  }
}

// node_modules/devextreme/esm/__internal/core/license/sha1.js
function preprocess(text) {
  var bytes = new Uint8Array(text.length + 1);
  bytes.set(stringToBytes(text));
  bytes[bytes.length - 1] = 128;
  var words = bytesToWords(new Uint8Array(bytes));
  var result = new Uint32Array(16 * Math.ceil((words.length + 2) / 16));
  result.set(words, 0);
  result[result.length - 1] = 8 * (bytes.length - 1);
  return result;
}
function sha1(text) {
  var message = preprocess(text);
  var h = new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
  for (var i = 0; i < message.length; i += 16) {
    var w = new Uint32Array(80);
    for (var j = 0; j < 16; j += 1) {
      w[j] = message[i + j];
    }
    for (var _j = 16; _j < 80; _j += 1) {
      var n = w[_j - 3] ^ w[_j - 8] ^ w[_j - 14] ^ w[_j - 16];
      w[_j] = n << 1 | n >>> 31;
    }
    var a = h[0];
    var b = h[1];
    var c = h[2];
    var d = h[3];
    var e = h[4];
    for (var _j2 = 0; _j2 < 80; _j2 += 1) {
      var [f, k] = _j2 < 20 ? [b & c | ~b & d, 1518500249] : _j2 < 40 ? [b ^ c ^ d, 1859775393] : _j2 < 60 ? [b & c | b & d | c & d, 2400959708] : [b ^ c ^ d, 3395469782];
      var temp = leftRotate(a, 5) + f + e + k + w[_j2];
      e = d;
      d = c;
      c = leftRotate(b, 30);
      b = a;
      a = temp;
    }
    h[0] += a;
    h[1] += b;
    h[2] += c;
    h[3] += d;
    h[4] += e;
  }
  return wordsToBytes(h);
}

// node_modules/devextreme/esm/__internal/core/license/types.js
var TokenKind;
!function(TokenKind2) {
  TokenKind2.corrupted = "corrupted";
  TokenKind2.verified = "verified";
  TokenKind2.internal = "internal";
}(TokenKind || (TokenKind = {}));

// node_modules/devextreme/esm/__internal/core/license/license_validation.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
      t[p] = s[p];
    }
  }
  if (null != s && "function" === typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) {
        t[p[i]] = s[p[i]];
      }
    }
  }
  return t;
};
var SPLITTER = ".";
var FORMAT = 1;
var RTM_MIN_PATCH_VERSION = 3;
var GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: "general"
};
var VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "verification"
};
var DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: "decoding"
};
var DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: "deserialization"
};
var PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: "payload"
};
var VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: "version"
};
var validationPerformed = false;
function verifySignature(_ref) {
  var {
    text,
    signature: encodedSignature
  } = _ref;
  return compareSignatures({
    key: PUBLIC_KEY,
    signature: base64ToBytes(encodedSignature),
    actual: pad(sha1(text))
  });
}
function isPreview(patch) {
  return isNaN(patch) || patch < RTM_MIN_PATCH_VERSION;
}
function parseLicenseKey(encodedKey) {
  if (void 0 === encodedKey) {
    return GENERAL_ERROR;
  }
  var parts = encodedKey.split(SPLITTER);
  if (2 !== parts.length || 0 === parts[0].length || 0 === parts[1].length) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  var decodedPayload = "";
  try {
    decodedPayload = atob(parts[0]);
  } catch (_a) {
    return DECODING_ERROR;
  }
  var payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch (_b) {
    return DESERIALIZATION_ERROR;
  }
  var {
    customerId,
    maxVersionAllowed,
    format: format2,
    internalUsageId
  } = payload, rest = __rest(payload, ["customerId", "maxVersionAllowed", "format", "internalUsageId"]);
  if (void 0 !== internalUsageId) {
    return {
      kind: TokenKind.internal,
      internalUsageId
    };
  }
  if (void 0 === customerId || void 0 === maxVersionAllowed || void 0 === format2) {
    return PAYLOAD_ERROR;
  }
  if (format2 !== FORMAT) {
    return VERSION_ERROR;
  }
  return {
    kind: TokenKind.verified,
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
function getLicenseCheckParams(_ref2) {
  var {
    licenseKey,
    version: version2
  } = _ref2;
  var preview = false;
  try {
    preview = isPreview(version2.patch);
    var {
      major,
      minor
    } = version2;
    if (!licenseKey) {
      return {
        preview,
        error: "W0019"
      };
    }
    var license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (license.kind === TokenKind.internal) {
      return {
        preview,
        internal: true,
        error: license.internalUsageId === INTERNAL_USAGE_ID ? void 0 : "W0020"
      };
    }
    if (!(major && minor)) {
      return {
        preview,
        error: "W0021"
      };
    }
    if (10 * major + minor > license.payload.maxVersionAllowed) {
      return {
        preview,
        error: "W0020"
      };
    }
    return {
      preview,
      error: void 0
    };
  } catch (_a) {
    return {
      preview,
      error: "W0021"
    };
  }
}
function validateLicense(licenseKey) {
  var versionStr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : version;
  if (validationPerformed) {
    return;
  }
  validationPerformed = true;
  var version2 = parseVersion(versionStr);
  var versionsCompatible = assertedVersionsCompatible(version2);
  var {
    preview,
    internal,
    error
  } = getLicenseCheckParams({
    licenseKey,
    version: version2
  });
  if (!versionsCompatible && internal) {
    return;
  }
  if (error) {
    errors_default.log(preview ? "W0022" : error);
    return;
  }
  if (preview && !internal) {
    errors_default.log("W0022");
  }
}
function peekValidationPerformed() {
  return validationPerformed;
}
var license_validation_default = {
  validateLicense
};

// node_modules/devextreme/esm/core/dom_component.js
var {
  abstract: abstract2
} = Component;
var DOMComponent = Component.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      width: void 0,
      height: void 0,
      rtlEnabled: config_default().rtlEnabled,
      elementAttr: {},
      disabled: false,
      integrationOptions: {}
    }, this._useTemplates() ? TemplateManager.createDefaultOptions() : {});
  },
  ctor(element, options) {
    this._customClass = null;
    this._createElement(element);
    attachInstanceToElement(this._$element, this, this._dispose);
    this.callBase(options);
    var validationAlreadyPerformed = peekValidationPerformed();
    license_validation_default.validateLicense(config_default().licenseKey);
    if (!validationAlreadyPerformed && peekValidationPerformed()) {
      config_default({
        licenseKey: ""
      });
    }
  },
  _createElement(element) {
    this._$element = renderer_default(element);
  },
  _getSynchronizableOptionsForCreateComponent: () => ["rtlEnabled", "disabled", "templatesRenderAsynchronously"],
  _checkFunctionValueDeprecation: function(optionNames) {
    if (!this.option("_ignoreFunctionValueDeprecation")) {
      optionNames.forEach((optionName) => {
        if (isFunction(this.option(optionName))) {
          errors_default.log("W0017", optionName);
        }
      });
    }
  },
  _visibilityChanged: abstract2,
  _dimensionChanged: abstract2,
  _init() {
    this.callBase();
    this._checkFunctionValueDeprecation(["width", "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "popupHeight", "popupWidth"]);
    this._attachWindowResizeCallback();
    this._initTemplateManager();
  },
  _setOptionsByDevice(instanceCustomRules) {
    this.callBase([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []));
  },
  _isInitialOptionValue(name) {
    var isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
    return !isCustomOption && this.callBase(name);
  },
  _attachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      var windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
      resize_callbacks_default.add(windowResizeCallBack);
    }
  },
  _isDimensionChangeSupported() {
    return this._dimensionChanged !== abstract2;
  },
  _renderComponent() {
    this._initMarkup();
    hasWindow() && this._render();
  },
  _initMarkup() {
    var {
      rtlEnabled
    } = this.option() || {};
    this._renderElementAttributes();
    this._toggleRTLDirection(rtlEnabled);
    this._renderVisibilityChange();
    this._renderDimensions();
  },
  _render() {
    this._attachVisibilityChangeHandlers();
    addShadowDomStyles(this.$element());
  },
  _renderElementAttributes() {
    var {
      elementAttr
    } = this.option() || {};
    var attributes = extend({}, elementAttr);
    var classNames = attributes.class;
    delete attributes.class;
    this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
    this._customClass = classNames;
  },
  _renderVisibilityChange() {
    if (this._isDimensionChangeSupported()) {
      this._attachDimensionChangeHandlers();
    }
    if (this._isVisibilityChangeSupported()) {
      var $element = this.$element();
      $element.addClass("dx-visibility-change-handler");
    }
  },
  _renderDimensions() {
    var $element = this.$element();
    var element = $element.get(0);
    var width = this._getOptionValue("width", element);
    var height = this._getOptionValue("height", element);
    if (this._isCssUpdateRequired(element, height, width)) {
      $element.css({
        width: null === width ? "" : width,
        height: null === height ? "" : height
      });
    }
  },
  _isCssUpdateRequired: (element, height, width) => !!(isDefined(width) || isDefined(height) || element.style.width || element.style.height),
  _attachDimensionChangeHandlers() {
    var $el = this.$element();
    var namespace = "".concat(this.NAME, "VisibilityChange");
    resize.off($el, {
      namespace
    });
    resize.on($el, () => this._dimensionChanged(), {
      namespace
    });
  },
  _attachVisibilityChangeHandlers() {
    if (this._isVisibilityChangeSupported()) {
      var $el = this.$element();
      var namespace = "".concat(this.NAME, "VisibilityChange");
      this._isHidden = !this._isVisible();
      visibility.off($el, {
        namespace
      });
      visibility.on($el, () => this._checkVisibilityChanged("shown"), () => this._checkVisibilityChanged("hiding"), {
        namespace
      });
    }
  },
  _isVisible() {
    var $element = this.$element();
    return $element.is(":visible");
  },
  _checkVisibilityChanged(action) {
    var isVisible2 = this._isVisible();
    if (isVisible2) {
      if ("hiding" === action && !this._isHidden) {
        this._visibilityChanged(false);
        this._isHidden = true;
      } else if ("shown" === action && this._isHidden) {
        this._isHidden = false;
        this._visibilityChanged(true);
      }
    }
  },
  _isVisibilityChangeSupported() {
    return this._visibilityChanged !== abstract2 && hasWindow();
  },
  _clean: noop2,
  _modelByElement() {
    var {
      modelByElement
    } = this.option();
    var $element = this.$element();
    return modelByElement ? modelByElement($element) : void 0;
  },
  _invalidate() {
    if (this._isUpdateAllowed()) {
      throw errors_default.Error("E0007");
    }
    this._requireRefresh = true;
  },
  _refresh() {
    this._clean();
    this._renderComponent();
  },
  _dispose() {
    this._templateManager && this._templateManager.dispose();
    this.callBase();
    this._clean();
    this._detachWindowResizeCallback();
  },
  _detachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      resize_callbacks_default.remove(this._windowResizeCallBack);
    }
  },
  _toggleRTLDirection(rtl) {
    var $element = this.$element();
    $element.toggleClass("dx-rtl", rtl);
  },
  _createComponent(element, component) {
    var config2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var synchronizableOptions = grep(this._getSynchronizableOptionsForCreateComponent(), (value2) => !(value2 in config2));
    var {
      integrationOptions
    } = this.option();
    var {
      nestedComponentOptions
    } = this.option();
    nestedComponentOptions = nestedComponentOptions || noop2;
    var nestedComponentConfig = extend({
      integrationOptions
    }, nestedComponentOptions(this));
    synchronizableOptions.forEach((optionName) => nestedComponentConfig[optionName] = this.option(optionName));
    this._extendConfig(config2, nestedComponentConfig);
    var instance = void 0;
    if (isString(component)) {
      var $element = renderer_default(element)[component](config2);
      instance = $element[component]("instance");
    } else if (element) {
      instance = component.getInstance(element);
      if (instance) {
        instance.option(config2);
      } else {
        instance = new component(element, config2);
      }
    }
    if (instance) {
      var optionChangedHandler = (_ref) => {
        var {
          name,
          value: value2
        } = _ref;
        if (synchronizableOptions.includes(name)) {
          instance.option(name, value2);
        }
      };
      this.on("optionChanged", optionChangedHandler);
      instance.on("disposing", () => this.off("optionChanged", optionChangedHandler));
    }
    return instance;
  },
  _extendConfig(config2, extendConfig) {
    each(extendConfig, (key, value2) => {
      !Object.prototype.hasOwnProperty.call(config2, key) && (config2[key] = value2);
    });
  },
  _defaultActionConfig() {
    var $element = this.$element();
    var context2 = this._modelByElement($element);
    return extend(this.callBase(), {
      context: context2
    });
  },
  _defaultActionArgs() {
    var $element = this.$element();
    var model = this._modelByElement($element);
    var element = this.element();
    return extend(this.callBase(), {
      element,
      model
    });
  },
  _optionChanged(args) {
    switch (args.name) {
      case "width":
      case "height":
        this._renderDimensions();
        break;
      case "rtlEnabled":
        this._invalidate();
        break;
      case "elementAttr":
        this._renderElementAttributes();
        break;
      case "disabled":
      case "integrationOptions":
        break;
      default:
        this.callBase(args);
    }
  },
  _removeAttributes(element) {
    var attrs = element.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      var attr = attrs[i];
      if (attr) {
        var {
          name
        } = attr;
        if (!name.indexOf("aria-") || -1 !== name.indexOf("dx-") || "role" === name || "style" === name || "tabindex" === name) {
          element.removeAttribute(name);
        }
      }
    }
  },
  _removeClasses(element) {
    element.className = element.className.split(" ").filter((cssClass) => 0 !== cssClass.lastIndexOf("dx-", 0)).join(" ");
  },
  _updateDOMComponent(renderRequired) {
    if (renderRequired) {
      this._renderComponent();
    } else if (this._requireRefresh) {
      this._requireRefresh = false;
      this._refresh();
    }
  },
  endUpdate() {
    var renderRequired = this._isInitializingRequired();
    this.callBase();
    this._isUpdateAllowed() && this._updateDOMComponent(renderRequired);
  },
  $element() {
    return this._$element;
  },
  element() {
    var $element = this.$element();
    return getPublicElement($element);
  },
  dispose() {
    var element = this.$element().get(0);
    cleanDataRecursive(element, true);
    element.textContent = "";
    this._removeAttributes(element);
    this._removeClasses(element);
  },
  resetOption(optionName) {
    this.callBase(optionName);
    if ("width" === optionName || "height" === optionName) {
      var initialOption = this.initialOption(optionName);
      !isDefined(initialOption) && this.$element().css(optionName, "");
    }
  },
  _getAnonymousTemplateName() {
    return;
  },
  _initTemplateManager() {
    if (this._templateManager || !this._useTemplates()) {
      return;
    }
    var {
      integrationOptions = {}
    } = this.option();
    var {
      createTemplate
    } = integrationOptions;
    this._templateManager = new TemplateManager(createTemplate, this._getAnonymousTemplateName());
    this._initTemplates();
  },
  _initTemplates() {
    var {
      templates,
      anonymousTemplateMeta
    } = this._templateManager.extractTemplates(this.$element());
    var anonymousTemplate = this.option("integrationOptions.templates.".concat(anonymousTemplateMeta.name));
    templates.forEach((_ref2) => {
      var {
        name,
        template
      } = _ref2;
      this._options.silent("integrationOptions.templates.".concat(name), template);
    });
    if (anonymousTemplateMeta.name && !anonymousTemplate) {
      this._options.silent("integrationOptions.templates.".concat(anonymousTemplateMeta.name), anonymousTemplateMeta.template);
      this._options.silent("_hasAnonymousTemplateContent", true);
    }
  },
  _getTemplateByOption(optionName) {
    return this._getTemplate(this.option(optionName));
  },
  _getTemplate(templateSource) {
    var templates = this.option("integrationOptions.templates");
    var isAsyncTemplate = this.option("templatesRenderAsynchronously");
    var skipTemplates = this.option("integrationOptions.skipTemplates");
    return this._templateManager.getTemplate(templateSource, templates, {
      isAsyncTemplate,
      skipTemplates
    }, this);
  },
  _saveTemplate(name, template) {
    this._setOptionWithoutOptionChange("integrationOptions.templates." + name, this._templateManager._createTemplate(template));
  },
  _useTemplates: () => true
});
DOMComponent.getInstance = function(element) {
  return getInstanceByElement(renderer_default(element), this);
};
DOMComponent.defaultOptions = function(rule) {
  this._classCustomRules = this._classCustomRules || [];
  this._classCustomRules.push(rule);
};
var dom_component_default = DOMComponent;

// node_modules/devextreme/esm/core/utils/version.js
function compare(x, y, maxLevel) {
  function normalizeArg(value2) {
    if ("string" === typeof value2) {
      return value2.split(".");
    }
    if ("number" === typeof value2) {
      return [value2];
    }
    return value2;
  }
  x = normalizeArg(x);
  y = normalizeArg(y);
  var length = Math.max(x.length, y.length);
  if (isFinite(maxLevel)) {
    length = Math.min(length, maxLevel);
  }
  for (var i = 0; i < length; i++) {
    var xItem = parseInt(x[i] || 0, 10);
    var yItem = parseInt(y[i] || 0, 10);
    if (xItem < yItem) {
      return -1;
    }
    if (xItem > yItem) {
      return 1;
    }
  }
  return 0;
}

// node_modules/devextreme/esm/events/utils/event_nodes_disposing.js
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter((node) => !!node);
}
var subscribeNodesDisposing = (event, callback) => {
  events_engine_default.one(nodesByEvent(event), removeEvent, callback);
};
var unsubscribeNodesDisposing = (event, callback) => {
  events_engine_default.off(nodesByEvent(event), removeEvent, callback);
};

// node_modules/devextreme/esm/core/utils/support.js
var support_exports = {};
__export(support_exports, {
  animation: () => animation,
  inputType: () => inputType,
  nativeScrolling: () => nativeScrolling,
  pointerEvents: () => pointerEvents,
  styleProp: () => styleProp,
  stylePropPrefix: () => stylePropPrefix,
  supportProp: () => supportProp,
  touch: () => touch,
  touchEvents: () => touchEvents,
  transition: () => transition,
  transitionEndEventName: () => transitionEndEventName
});
var {
  maxTouchPoints
} = getNavigator();
var transitionEndEventNames = {
  webkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  transition: "transitionend"
};
var supportProp = function(prop) {
  return !!styleProp(prop);
};
var isNativeScrollingSupported = function() {
  var {
    platform,
    mac: isMac
  } = devices_default.real();
  var isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
  return isNativeScrollDevice;
};
var inputType = function(type2) {
  if ("text" === type2) {
    return true;
  }
  var input = dom_adapter_default.createElement("input");
  try {
    input.setAttribute("type", type2);
    input.value = "wrongValue";
    return !input.value;
  } catch (e) {
    return false;
  }
};
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints2) {
  return (hasWindowProperty("ontouchstart") || !!maxTouchPoints2) && !hasWindowProperty("callPhantom");
};
var detectPointerEvent = function(hasWindowProperty) {
  return hasWindowProperty("PointerEvent");
};
var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty);
var touchPointersPresent = !!maxTouchPoints;
var touch = touchEvents || pointerEvents && touchPointersPresent;
var transition = call_once_default(function() {
  return supportProp("transition");
});
var transitionEndEventName = call_once_default(function() {
  return transitionEndEventNames[styleProp("transition")];
});
var animation = call_once_default(function() {
  return supportProp("animation");
});
var nativeScrolling = isNativeScrollingSupported();

// node_modules/devextreme/esm/events/pointer/base.js
var POINTER_EVENTS_NAMESPACE = "dxPointerEvents";
var BaseStrategy = class_default.inherit({
  ctor: function(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = addNamespace2(originalEvents, POINTER_EVENTS_NAMESPACE);
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble: function() {
    var eventName = this._eventName;
    return "dxpointerenter" === eventName || "dxpointerleave" === eventName;
  },
  _handler: function(e) {
    var _originalEvent$target;
    var delegateTarget = this._getDelegateTarget(e);
    var event = {
      type: this._eventName,
      pointerType: e.pointerType || eventSource(e),
      originalEvent: e,
      delegateTarget,
      timeStamp: browser_default.mozilla ? (/* @__PURE__ */ new Date()).getTime() : e.timeStamp
    };
    var originalEvent = e.originalEvent;
    if (null !== originalEvent && void 0 !== originalEvent && null !== (_originalEvent$target = originalEvent.target) && void 0 !== _originalEvent$target && _originalEvent$target.shadowRoot) {
      var _originalEvent$path, _originalEvent$compos;
      var path = null !== (_originalEvent$path = originalEvent.path) && void 0 !== _originalEvent$path ? _originalEvent$path : null === (_originalEvent$compos = originalEvent.composedPath) || void 0 === _originalEvent$compos ? void 0 : _originalEvent$compos.call(originalEvent);
      event.target = path[0];
    }
    return this._fireEvent(event);
  },
  _getDelegateTarget: function(e) {
    var delegateTarget;
    if (this.noBubble) {
      delegateTarget = e.delegateTarget;
    }
    return delegateTarget;
  },
  _fireEvent: function(args) {
    return fireEvent(args);
  },
  _setSelector: function(handleObj) {
    this._selector = this.noBubble && handleObj ? handleObj.selector : null;
  },
  _getSelector: function() {
    return this._selector;
  },
  setup: function() {
    return true;
  },
  add: function(element, handleObj) {
    if (this._handlerCount <= 0 || this.noBubble) {
      element = this.noBubble ? element : dom_adapter_default.getDocument();
      this._setSelector(handleObj);
      var that = this;
      events_engine_default.on(element, this._originalEvents, this._getSelector(), function(e) {
        that._handler(e);
      });
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove: function(handleObj) {
    this._setSelector(handleObj);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown: function(element) {
    if (this._handlerCount && !this.noBubble) {
      return;
    }
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    if (this._originalEvents !== "." + POINTER_EVENTS_NAMESPACE) {
      events_engine_default.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose: function(element) {
    element = this.noBubble ? element : dom_adapter_default.getDocument();
    events_engine_default.off(element, this._originalEvents);
  }
});
var base_default = BaseStrategy;

// node_modules/devextreme/esm/events/pointer/touch.js
var eventMap = {
  dxpointerdown: "touchstart",
  dxpointermove: "touchmove",
  dxpointerup: "touchend",
  dxpointercancel: "touchcancel",
  dxpointerover: "",
  dxpointerout: "",
  dxpointerenter: "",
  dxpointerleave: ""
};
var normalizeTouchEvent = function(e) {
  var pointers = [];
  each(e.touches, function(_, touch2) {
    pointers.push(extend({
      pointerId: touch2.identifier
    }, touch2));
  });
  return {
    pointers,
    pointerId: e.changedTouches[0].identifier
  };
};
var skipTouchWithSameIdentifier = function(pointerEvent) {
  return "ios" === devices_default.real().platform && ("dxpointerdown" === pointerEvent || "dxpointerup" === pointerEvent);
};
var TouchStrategy = base_default.inherit({
  ctor: function() {
    this.callBase.apply(this, arguments);
    this._pointerId = 0;
  },
  _handler: function(e) {
    if (skipTouchWithSameIdentifier(this._eventName)) {
      var touch2 = e.changedTouches[0];
      if (this._pointerId === touch2.identifier && 0 !== this._pointerId) {
        return;
      }
      this._pointerId = touch2.identifier;
    }
    return this.callBase.apply(this, arguments);
  },
  _fireEvent: function(args) {
    return this.callBase(extend(normalizeTouchEvent(args.originalEvent), args));
  }
});
TouchStrategy.map = eventMap;
TouchStrategy.normalize = normalizeTouchEvent;
var touch_default = TouchStrategy;

// node_modules/devextreme/esm/events/pointer/observer.js
var addEventsListener = function(events, handler) {
  ready_callbacks_default.add(function() {
    events.split(" ").forEach(function(event) {
      dom_adapter_default.listen(dom_adapter_default.getDocument(), event, handler, true);
    });
  });
};
var Observer = function(eventMap4, pointerEquals, onPointerAdding) {
  onPointerAdding = onPointerAdding || function() {
  };
  var pointers = [];
  var getPointerIndex = function(e) {
    var index2 = -1;
    each(pointers, function(i, pointer2) {
      if (!pointerEquals(e, pointer2)) {
        return true;
      }
      index2 = i;
      return false;
    });
    return index2;
  };
  var removePointer = function(e) {
    var index2 = getPointerIndex(e);
    if (index2 > -1) {
      pointers.splice(index2, 1);
    }
  };
  addEventsListener(eventMap4.dxpointerdown, function(e) {
    if (-1 === getPointerIndex(e)) {
      onPointerAdding(e);
      pointers.push(e);
    }
  });
  addEventsListener(eventMap4.dxpointermove, function(e) {
    pointers[getPointerIndex(e)] = e;
  });
  addEventsListener(eventMap4.dxpointerup, removePointer);
  addEventsListener(eventMap4.dxpointercancel, removePointer);
  this.pointers = function() {
    return pointers;
  };
  this.reset = function() {
    pointers = [];
  };
};
var observer_default = Observer;

// node_modules/devextreme/esm/events/pointer/mouse.js
var eventMap2 = {
  dxpointerdown: "mousedown",
  dxpointermove: "mousemove",
  dxpointerup: "mouseup",
  dxpointercancel: "",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
var normalizeMouseEvent = function(e) {
  e.pointerId = 1;
  return {
    pointers: observer.pointers(),
    pointerId: 1
  };
};
var observer;
var activated = false;
var activateStrategy = function() {
  if (activated) {
    return;
  }
  observer = new observer_default(eventMap2, function() {
    return true;
  });
  activated = true;
};
var MouseStrategy = base_default.inherit({
  ctor: function() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _fireEvent: function(args) {
    return this.callBase(extend(normalizeMouseEvent(args.originalEvent), args));
  }
});
MouseStrategy.map = eventMap2;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function() {
  observer.reset();
};
var mouse_default = MouseStrategy;

// node_modules/devextreme/esm/events/pointer/mouse_and_touch.js
var eventMap3 = {
  dxpointerdown: "touchstart mousedown",
  dxpointermove: "touchmove mousemove",
  dxpointerup: "touchend mouseup",
  dxpointercancel: "touchcancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
var activated2 = false;
var activateStrategy2 = function() {
  if (activated2) {
    return;
  }
  mouse_default.activate();
  activated2 = true;
};
var MouseAndTouchStrategy = base_default.inherit({
  EVENT_LOCK_TIMEOUT: 100,
  ctor: function() {
    this.callBase.apply(this, arguments);
    activateStrategy2();
  },
  _handler: function(e) {
    var isMouse = isMouseEvent(e);
    if (!isMouse) {
      this._skipNextEvents = true;
    }
    if (isMouse && this._mouseLocked) {
      return;
    }
    if (isMouse && this._skipNextEvents) {
      this._skipNextEvents = false;
      this._mouseLocked = true;
      clearTimeout(this._unlockMouseTimer);
      var that = this;
      this._unlockMouseTimer = setTimeout(function() {
        that._mouseLocked = false;
      }, this.EVENT_LOCK_TIMEOUT);
      return;
    }
    return this.callBase(e);
  },
  _fireEvent: function(args) {
    var normalizer = isMouseEvent(args.originalEvent) ? mouse_default.normalize : touch_default.normalize;
    return this.callBase(extend(normalizer(args.originalEvent), args));
  },
  dispose: function() {
    this.callBase();
    this._skipNextEvents = false;
    this._mouseLocked = false;
    clearTimeout(this._unlockMouseTimer);
  }
});
MouseAndTouchStrategy.map = eventMap3;
MouseAndTouchStrategy.resetObserver = mouse_default.resetObserver;
var mouse_and_touch_default = MouseAndTouchStrategy;

// node_modules/devextreme/esm/events/pointer.js
var getStrategy = (support, _ref) => {
  var {
    tablet,
    phone
  } = _ref;
  var pointerEventStrategy = getStrategyFromGlobalConfig();
  if (pointerEventStrategy) {
    return pointerEventStrategy;
  }
  if (support.touch && !(tablet || phone)) {
    return mouse_and_touch_default;
  }
  if (support.touch) {
    return touch_default;
  }
  return mouse_default;
};
var EventStrategy = getStrategy(support_exports, devices_default.real());
each(EventStrategy.map, (pointerEvent, originalEvents) => {
  event_registrator_default(pointerEvent, new EventStrategy(pointerEvent, originalEvents));
});
var pointer = {
  down: "dxpointerdown",
  up: "dxpointerup",
  move: "dxpointermove",
  cancel: "dxpointercancel",
  enter: "dxpointerenter",
  leave: "dxpointerleave",
  over: "dxpointerover",
  out: "dxpointerout"
};
function getStrategyFromGlobalConfig() {
  var eventStrategyName = config_default().pointerEventStrategy;
  return {
    "mouse-and-touch": mouse_and_touch_default,
    touch: touch_default,
    mouse: mouse_default
  }[eventStrategyName];
}
var pointer_default = pointer;

// node_modules/devextreme/esm/events/core/emitter.js
var Emitter = class_default.inherit({
  ctor: function(element) {
    this._$element = renderer_default(element);
    this._cancelCallback = callbacks_default();
    this._acceptCallback = callbacks_default();
  },
  getElement: function() {
    return this._$element;
  },
  validate: function(e) {
    return !isDxMouseWheelEvent(e);
  },
  validatePointers: function(e) {
    return 1 === hasTouches(e);
  },
  allowInterruptionByMouseWheel: function() {
    return true;
  },
  configure: function(data2) {
    extend(this, data2);
  },
  addCancelCallback: function(callback) {
    this._cancelCallback.add(callback);
  },
  removeCancelCallback: function() {
    this._cancelCallback.empty();
  },
  _cancel: function(e) {
    this._cancelCallback.fire(this, e);
  },
  addAcceptCallback: function(callback) {
    this._acceptCallback.add(callback);
  },
  removeAcceptCallback: function() {
    this._acceptCallback.empty();
  },
  _accept: function(e) {
    this._acceptCallback.fire(this, e);
  },
  _requestAccept: function(e) {
    this._acceptRequestEvent = e;
  },
  _forgetAccept: function() {
    this._accept(this._acceptRequestEvent);
    this._acceptRequestEvent = null;
  },
  start: noop2,
  move: noop2,
  end: noop2,
  cancel: noop2,
  reset: function() {
    if (this._acceptRequestEvent) {
      this._accept(this._acceptRequestEvent);
    }
  },
  _fireEvent: function(eventName, e, params) {
    var eventData2 = extend({
      type: eventName,
      originalEvent: e,
      target: this._getEmitterTarget(e),
      delegateTarget: this.getElement().get(0)
    }, params);
    e = fireEvent(eventData2);
    if (e.cancel) {
      this._cancel(e);
    }
    return e;
  },
  _getEmitterTarget: function(e) {
    return (this.delegateSelector ? renderer_default(e.target).closest(this.delegateSelector) : this.getElement()).get(0);
  },
  dispose: noop2
});
var emitter_default = Emitter;

// node_modules/devextreme/esm/events/core/wheel.js
var EVENT_NAME = "dxmousewheel";
var EVENT_NAMESPACE = "dxWheel";
var NATIVE_EVENT_NAME = "wheel";
var PIXEL_MODE = 0;
var DELTA_MUTLIPLIER = 30;
var wheel = {
  setup: function(element) {
    var $element = renderer_default(element);
    events_engine_default.on($element, addNamespace2(NATIVE_EVENT_NAME, EVENT_NAMESPACE), wheel._wheelHandler.bind(wheel));
  },
  teardown: function(element) {
    events_engine_default.off(element, ".".concat(EVENT_NAMESPACE));
  },
  _wheelHandler: function(e) {
    var {
      deltaMode,
      deltaY,
      deltaX,
      deltaZ
    } = e.originalEvent;
    fireEvent({
      type: EVENT_NAME,
      originalEvent: e,
      delta: this._normalizeDelta(deltaY, deltaMode),
      deltaX,
      deltaY,
      deltaZ,
      deltaMode,
      pointerType: "mouse"
    });
    e.stopPropagation();
  },
  _normalizeDelta(delta) {
    var deltaMode = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : PIXEL_MODE;
    if (deltaMode === PIXEL_MODE) {
      return -delta;
    } else {
      return -DELTA_MUTLIPLIER * delta;
    }
  }
};
event_registrator_default(EVENT_NAME, wheel);

// node_modules/devextreme/esm/events/core/emitter_registrator.js
var MANAGER_EVENT = "dxEventManager";
var EMITTER_DATA = "dxEmitter";
var EventManager = class_default.inherit({
  ctor: function() {
    this._attachHandlers();
    this.reset();
    this._proxiedCancelHandler = this._cancelHandler.bind(this);
    this._proxiedAcceptHandler = this._acceptHandler.bind(this);
  },
  _attachHandlers: function() {
    ready_callbacks_default.add((function() {
      var document2 = dom_adapter_default.getDocument();
      events_engine_default.subscribeGlobal(document2, addNamespace2(pointer_default.down, MANAGER_EVENT), this._pointerDownHandler.bind(this));
      events_engine_default.subscribeGlobal(document2, addNamespace2(pointer_default.move, MANAGER_EVENT), this._pointerMoveHandler.bind(this));
      events_engine_default.subscribeGlobal(document2, addNamespace2([pointer_default.up, pointer_default.cancel].join(" "), MANAGER_EVENT), this._pointerUpHandler.bind(this));
      events_engine_default.subscribeGlobal(document2, addNamespace2(EVENT_NAME, MANAGER_EVENT), this._mouseWheelHandler.bind(this));
    }).bind(this));
  },
  _eachEmitter: function(callback) {
    var activeEmitters = this._activeEmitters || [];
    var i = 0;
    while (activeEmitters.length > i) {
      var emitter = activeEmitters[i];
      if (false === callback(emitter)) {
        break;
      }
      if (activeEmitters[i] === emitter) {
        i++;
      }
    }
  },
  _applyToEmitters: function(method, arg) {
    this._eachEmitter(function(emitter) {
      emitter[method].call(emitter, arg);
    });
  },
  reset: function() {
    this._eachEmitter(this._proxiedCancelHandler);
    this._activeEmitters = [];
  },
  resetEmitter: function(emitter) {
    this._proxiedCancelHandler(emitter);
  },
  _pointerDownHandler: function(e) {
    if (isMouseEvent(e) && e.which > 1) {
      return;
    }
    this._updateEmitters(e);
  },
  _updateEmitters: function(e) {
    if (!this._isSetChanged(e)) {
      return;
    }
    this._cleanEmitters(e);
    this._fetchEmitters(e);
  },
  _isSetChanged: function(e) {
    var currentSet = this._closestEmitter(e);
    var previousSet = this._emittersSet || [];
    var setChanged = currentSet.length !== previousSet.length;
    each(currentSet, function(index2, emitter) {
      setChanged = setChanged || previousSet[index2] !== emitter;
      return !setChanged;
    });
    this._emittersSet = currentSet;
    return setChanged;
  },
  _closestEmitter: function(e) {
    var that = this;
    var result = [];
    var $element = renderer_default(e.target);
    function handleEmitter(_, emitter) {
      if (!!emitter && emitter.validatePointers(e) && emitter.validate(e)) {
        emitter.addCancelCallback(that._proxiedCancelHandler);
        emitter.addAcceptCallback(that._proxiedAcceptHandler);
        result.push(emitter);
      }
    }
    while ($element.length) {
      var emitters = data($element.get(0), EMITTER_DATA) || [];
      each(emitters, handleEmitter);
      $element = $element.parent();
    }
    return result;
  },
  _acceptHandler: function(acceptedEmitter, e) {
    var that = this;
    this._eachEmitter(function(emitter) {
      if (emitter !== acceptedEmitter) {
        that._cancelEmitter(emitter, e);
      }
    });
  },
  _cancelHandler: function(canceledEmitter, e) {
    this._cancelEmitter(canceledEmitter, e);
  },
  _cancelEmitter: function(emitter, e) {
    var activeEmitters = this._activeEmitters;
    if (e) {
      emitter.cancel(e);
    } else {
      emitter.reset();
    }
    emitter.removeCancelCallback();
    emitter.removeAcceptCallback();
    var emitterIndex = activeEmitters.indexOf(emitter);
    if (emitterIndex > -1) {
      activeEmitters.splice(emitterIndex, 1);
    }
  },
  _cleanEmitters: function(e) {
    this._applyToEmitters("end", e);
    this.reset(e);
  },
  _fetchEmitters: function(e) {
    this._activeEmitters = this._emittersSet.slice();
    this._applyToEmitters("start", e);
  },
  _pointerMoveHandler: function(e) {
    this._applyToEmitters("move", e);
  },
  _pointerUpHandler: function(e) {
    this._updateEmitters(e);
  },
  _mouseWheelHandler: function(e) {
    if (!this._allowInterruptionByMouseWheel()) {
      return;
    }
    e.pointers = [null];
    this._pointerDownHandler(e);
    this._adjustWheelEvent(e);
    this._pointerMoveHandler(e);
    e.pointers = [];
    this._pointerUpHandler(e);
  },
  _allowInterruptionByMouseWheel: function() {
    var allowInterruption = true;
    this._eachEmitter(function(emitter) {
      allowInterruption = emitter.allowInterruptionByMouseWheel() && allowInterruption;
      return allowInterruption;
    });
    return allowInterruption;
  },
  _adjustWheelEvent: function(e) {
    var closestGestureEmitter = null;
    this._eachEmitter(function(emitter) {
      if (!emitter.gesture) {
        return;
      }
      var direction2 = emitter.getDirection(e);
      if ("horizontal" !== direction2 && !e.shiftKey || "vertical" !== direction2 && e.shiftKey) {
        closestGestureEmitter = emitter;
        return false;
      }
    });
    if (!closestGestureEmitter) {
      return;
    }
    var direction = closestGestureEmitter.getDirection(e);
    var verticalGestureDirection = "both" === direction && !e.shiftKey || "vertical" === direction;
    var prop = verticalGestureDirection ? "pageY" : "pageX";
    e[prop] += e.delta;
  },
  isActive: function(element) {
    var result = false;
    this._eachEmitter(function(emitter) {
      result = result || emitter.getElement().is(element);
    });
    return result;
  }
});
var eventManager = new EventManager();
var EMITTER_SUBSCRIPTION_DATA = "dxEmitterSubscription";
var registerEmitter = function(emitterConfig) {
  var emitterClass = emitterConfig.emitter;
  var emitterName = emitterConfig.events[0];
  var emitterEvents = emitterConfig.events;
  each(emitterEvents, function(_, eventName) {
    event_registrator_default(eventName, {
      noBubble: !emitterConfig.bubble,
      setup: function(element) {
        var subscriptions = data(element, EMITTER_SUBSCRIPTION_DATA) || {};
        var emitters = data(element, EMITTER_DATA) || {};
        var emitter = emitters[emitterName] || new emitterClass(element);
        subscriptions[eventName] = true;
        emitters[emitterName] = emitter;
        data(element, EMITTER_DATA, emitters);
        data(element, EMITTER_SUBSCRIPTION_DATA, subscriptions);
      },
      add: function(element, handleObj) {
        var emitters = data(element, EMITTER_DATA);
        var emitter = emitters[emitterName];
        emitter.configure(extend({
          delegateSelector: handleObj.selector
        }, handleObj.data), handleObj.type);
      },
      teardown: function(element) {
        var subscriptions = data(element, EMITTER_SUBSCRIPTION_DATA);
        var emitters = data(element, EMITTER_DATA);
        var emitter = emitters[emitterName];
        delete subscriptions[eventName];
        var disposeEmitter = true;
        each(emitterEvents, function(_2, eventName2) {
          disposeEmitter = disposeEmitter && !subscriptions[eventName2];
          return disposeEmitter;
        });
        if (disposeEmitter) {
          if (eventManager.isActive(element)) {
            eventManager.resetEmitter(emitter);
          }
          emitter && emitter.dispose();
          delete emitters[emitterName];
        }
      }
    });
  });
};
var emitter_registrator_default = registerEmitter;

// node_modules/devextreme/esm/events/click.js
var CLICK_EVENT_NAME = "dxclick";
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = () => {
  lastFiredEvent = null;
};
var clickHandler = function(e) {
  var originalEvent = e.originalEvent;
  var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
  var leftButton = !e.which || 1 === e.which;
  if (leftButton && !prevented && !eventAlreadyFired) {
    if (originalEvent) {
      originalEvent.DXCLICK_FIRED = true;
    }
    unsubscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    lastFiredEvent = originalEvent;
    subscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    fireEvent({
      type: CLICK_EVENT_NAME,
      originalEvent: e
    });
  }
};
var ClickEmitter = emitter_default.inherit({
  ctor: function(element) {
    this.callBase(element);
    events_engine_default.on(this.getElement(), "click", clickHandler);
  },
  start: function(e) {
    prevented = null;
  },
  cancel: function() {
    prevented = true;
  },
  dispose: function() {
    events_engine_default.off(this.getElement(), "click", clickHandler);
  }
});
!function() {
  var desktopDevice = devices_default.real().generic;
  if (!desktopDevice) {
    var startTarget = null;
    var blurPrevented = false;
    var document2 = dom_adapter_default.getDocument();
    events_engine_default.subscribeGlobal(document2, addNamespace2(pointer_default.down, "NATIVE_CLICK_FIXER"), function(e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    });
    events_engine_default.subscribeGlobal(document2, addNamespace2("click", "NATIVE_CLICK_FIXER"), function(e) {
      var $target = function(e2) {
        var _originalEvent$target;
        var originalEvent = e2.originalEvent;
        if (null !== originalEvent && void 0 !== originalEvent && null !== (_originalEvent$target = originalEvent.target) && void 0 !== _originalEvent$target && _originalEvent$target.shadowRoot) {
          var _originalEvent$path, _originalEvent$compos;
          var path = null !== (_originalEvent$path = originalEvent.path) && void 0 !== _originalEvent$path ? _originalEvent$path : null === (_originalEvent$compos = originalEvent.composedPath) || void 0 === _originalEvent$compos ? void 0 : _originalEvent$compos.call(originalEvent);
          return renderer_default(path[0]);
        }
        return renderer_default(e2.target);
      }(e);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !renderer_default(startTarget).is("label") && (element = $target, renderer_default(element).is("input, textarea, select, button ,:focus, :focus *"))) {
        resetActiveElement();
      }
      var element;
      startTarget = null;
      blurPrevented = false;
    });
  }
}();
emitter_registrator_default({
  emitter: ClickEmitter,
  bubble: true,
  events: [CLICK_EVENT_NAME]
});

// node_modules/devextreme/esm/events/core/emitter.feedback.js
var ACTIVE_EVENT_NAME = "dxactive";
var INACTIVE_EVENT_NAME = "dxinactive";
var ACTIVE_TIMEOUT = 30;
var INACTIVE_TIMEOUT = 400;
var FeedbackEvent = class_default.inherit({
  ctor: function(timeout, fire) {
    this._timeout = timeout;
    this._fire = fire;
  },
  start: function() {
    var that = this;
    this._schedule(function() {
      that.force();
    });
  },
  _schedule: function(fn) {
    this.stop();
    this._timer = setTimeout(fn, this._timeout);
  },
  stop: function() {
    clearTimeout(this._timer);
  },
  force: function() {
    if (this._fired) {
      return;
    }
    this.stop();
    this._fire();
    this._fired = true;
  },
  fired: function() {
    return this._fired;
  }
});
var activeFeedback;
var FeedbackEmitter = emitter_default.inherit({
  ctor: function() {
    this.callBase.apply(this, arguments);
    this._active = new FeedbackEvent(0, noop2);
    this._inactive = new FeedbackEvent(0, noop2);
  },
  configure: function(data2, eventName) {
    switch (eventName) {
      case ACTIVE_EVENT_NAME:
        data2.activeTimeout = data2.timeout;
        break;
      case INACTIVE_EVENT_NAME:
        data2.inactiveTimeout = data2.timeout;
    }
    this.callBase(data2);
  },
  start: function(e) {
    if (activeFeedback) {
      var activeChildExists = contains2(this.getElement().get(0), activeFeedback.getElement().get(0));
      var childJustActivated = !activeFeedback._active.fired();
      if (activeChildExists && childJustActivated) {
        this._cancel();
        return;
      }
      activeFeedback._inactive.force();
    }
    activeFeedback = this;
    this._initEvents(e);
    this._active.start();
  },
  _initEvents: function(e) {
    var that = this;
    var eventTarget = this._getEmitterTarget(e);
    var mouseEvent = isMouseEvent(e);
    var isSimulator = devices_default.isSimulator();
    var deferFeedback = isSimulator || !mouseEvent;
    var activeTimeout = ensureDefined(this.activeTimeout, ACTIVE_TIMEOUT);
    var inactiveTimeout = ensureDefined(this.inactiveTimeout, INACTIVE_TIMEOUT);
    this._active = new FeedbackEvent(deferFeedback ? activeTimeout : 0, function() {
      that._fireEvent(ACTIVE_EVENT_NAME, e, {
        target: eventTarget
      });
    });
    this._inactive = new FeedbackEvent(deferFeedback ? inactiveTimeout : 0, function() {
      that._fireEvent(INACTIVE_EVENT_NAME, e, {
        target: eventTarget
      });
      activeFeedback = null;
    });
  },
  cancel: function(e) {
    this.end(e);
  },
  end: function(e) {
    var skipTimers = e.type !== pointer_default.up;
    if (skipTimers) {
      this._active.stop();
    } else {
      this._active.force();
    }
    this._inactive.start();
    if (skipTimers) {
      this._inactive.force();
    }
  },
  dispose: function() {
    this._active.stop();
    this._inactive.stop();
    if (activeFeedback === this) {
      activeFeedback = null;
    }
    this.callBase();
  },
  lockInactive: function() {
    this._active.force();
    this._inactive.stop();
    activeFeedback = null;
    this._cancel();
    return this._inactive.force.bind(this._inactive);
  }
});
FeedbackEmitter.lock = function(deferred) {
  var lockInactive = activeFeedback ? activeFeedback.lockInactive() : noop2;
  deferred.done(lockInactive);
};
emitter_registrator_default({
  emitter: FeedbackEmitter,
  events: [ACTIVE_EVENT_NAME, INACTIVE_EVENT_NAME]
});
var lock = FeedbackEmitter.lock;

// node_modules/devextreme/esm/events/hover.js
var HOVERSTART_NAMESPACE = "dxHoverStart";
var HOVERSTART = "dxhoverstart";
var POINTERENTER_NAMESPACED_EVENT_NAME = addNamespace2(pointer_default.enter, HOVERSTART_NAMESPACE);
var HOVEREND_NAMESPACE = "dxHoverEnd";
var HOVEREND = "dxhoverend";
var POINTERLEAVE_NAMESPACED_EVENT_NAME = addNamespace2(pointer_default.leave, HOVEREND_NAMESPACE);
var Hover = class_default.inherit({
  noBubble: true,
  ctor: function() {
    this._handlerArrayKeyPath = this._eventNamespace + "_HandlerStore";
  },
  setup: function(element) {
    data(element, this._handlerArrayKeyPath, {});
  },
  add: function(element, handleObj) {
    var that = this;
    var handler = function(e) {
      that._handler(e);
    };
    events_engine_default.on(element, this._originalEventName, handleObj.selector, handler);
    data(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
  },
  _handler: function(e) {
    if (isTouchEvent(e) || devices_default.isSimulator()) {
      return;
    }
    fireEvent({
      type: this._eventName,
      originalEvent: e,
      delegateTarget: e.delegateTarget
    });
  },
  remove: function(element, handleObj) {
    var handler = data(element, this._handlerArrayKeyPath)[handleObj.guid];
    events_engine_default.off(element, this._originalEventName, handleObj.selector, handler);
  },
  teardown: function(element) {
    removeData(element, this._handlerArrayKeyPath);
  }
});
var HoverStart = Hover.inherit({
  ctor: function() {
    this._eventNamespace = HOVERSTART_NAMESPACE;
    this._eventName = HOVERSTART;
    this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
    this.callBase();
  },
  _handler: function(e) {
    var pointers = e.pointers || [];
    if (!pointers.length) {
      this.callBase(e);
    }
  }
});
var HoverEnd = Hover.inherit({
  ctor: function() {
    this._eventNamespace = HOVEREND_NAMESPACE;
    this._eventName = HOVEREND;
    this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
    this.callBase();
  }
});
event_registrator_default(HOVERSTART, new HoverStart());
event_registrator_default(HOVEREND, new HoverEnd());

// node_modules/devextreme/esm/ui/widget/ui.widget.js
function setAttribute(name, value2, target) {
  name = "role" === name || "id" === name ? name : "aria-".concat(name);
  value2 = isDefined(value2) ? value2.toString() : null;
  target.attr(name, value2);
}
var Widget = dom_component_default.inherit({
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  _supportedKeys: () => ({}),
  _getDefaultOptions() {
    return extend(this.callBase(), {
      hoveredElement: null,
      isActive: false,
      disabled: false,
      visible: true,
      hint: void 0,
      activeStateEnabled: false,
      onContentReady: null,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      tabIndex: 0,
      accessKey: void 0,
      onFocusIn: null,
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  },
  _defaultOptionsRules: function() {
    return this.callBase().concat([{
      device: function() {
        var device = devices_default.real();
        var platform = device.platform;
        var version2 = device.version;
        return "ios" === platform && compare(version2, "13.3") <= 0;
      },
      options: {
        useResizeObserver: false
      }
    }]);
  },
  _init() {
    this.callBase();
    this._initContentReadyAction();
  },
  _innerWidgetOptionChanged: function(innerWidget, args) {
    var options = Widget.getOptionsFromContainer(args);
    innerWidget && innerWidget.option(options);
    this._options.cache(args.name, options);
  },
  _bindInnerWidgetOptions(innerWidget, optionsContainer) {
    var syncOptions = () => this._options.silent(optionsContainer, extend({}, innerWidget.option()));
    syncOptions();
    innerWidget.on("optionChanged", syncOptions);
  },
  _getAriaTarget() {
    return this._focusTarget();
  },
  _initContentReadyAction() {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initMarkup() {
    var {
      disabled,
      visible: visible2
    } = this.option();
    this.$element().addClass("dx-widget");
    this._toggleDisabledState(disabled);
    this._toggleVisibility(visible2);
    this._renderHint();
    this._isFocusable() && this._renderFocusTarget();
    this.callBase();
  },
  _render() {
    this.callBase();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  },
  _renderHint() {
    var {
      hint
    } = this.option();
    this.$element().attr("title", hint || null);
  },
  _renderContent() {
    deferRender(() => !this._disposed ? this._renderContentImpl() : void 0).done(() => !this._disposed ? this._fireContentReadyAction() : void 0);
  },
  _renderContentImpl: noop2,
  _fireContentReadyAction: deferRenderer(function() {
    return this._contentReadyAction();
  }),
  _dispose() {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    this.callBase();
  },
  _resetActiveState() {
    this._toggleActiveState(this._eventBindingTarget(), false);
  },
  _clean() {
    this._cleanFocusState();
    this._resetActiveState();
    this.callBase();
    this.$element().empty();
  },
  _toggleVisibility(visible2) {
    this.$element().toggleClass("dx-state-invisible", !visible2);
  },
  _renderFocusState() {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  },
  _renderAccessKey() {
    var $el = this._focusTarget();
    var {
      accessKey
    } = this.option();
    $el.attr("accesskey", accessKey);
  },
  _isFocusable() {
    var {
      focusStateEnabled,
      disabled
    } = this.option();
    return focusStateEnabled && !disabled;
  },
  _eventBindingTarget() {
    return this.$element();
  },
  _focusTarget() {
    return this._getActiveElement();
  },
  _isFocusTarget: function(element) {
    var focusTargets = renderer_default(this._focusTarget()).toArray();
    return focusTargets.includes(element);
  },
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit).not(".dx-state-disabled");
  },
  _getActiveElement() {
    var activeElement = this._eventBindingTarget();
    if (this._activeStateUnit) {
      return this._findActiveTarget(activeElement);
    }
    return activeElement;
  },
  _renderFocusTarget() {
    var {
      tabIndex
    } = this.option();
    this._focusTarget().attr("tabIndex", tabIndex);
  },
  _keyboardEventBindingTarget() {
    return this._eventBindingTarget();
  },
  _refreshFocusEvent() {
    this._detachFocusEvents();
    this._attachFocusEvents();
  },
  _focusEventTarget() {
    return this._focusTarget();
  },
  _focusInHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusIn", {
        beforeExecute: () => this._updateFocusState(event, true),
        excludeValidators: ["readOnly"]
      })({
        event
      });
    }
  },
  _focusOutHandler(event) {
    if (!event.isDefaultPrevented()) {
      this._createActionByOption("onFocusOut", {
        beforeExecute: () => this._updateFocusState(event, false),
        excludeValidators: ["readOnly", "disabled"]
      })({
        event
      });
    }
  },
  _updateFocusState(_ref, isFocused) {
    var {
      target
    } = _ref;
    if (this._isFocusTarget(target)) {
      this._toggleFocusClass(isFocused, renderer_default(target));
    }
  },
  _toggleFocusClass(isFocused, $element) {
    var $focusTarget = $element && $element.length ? $element : this._focusTarget();
    $focusTarget.toggleClass("dx-state-focused", isFocused);
  },
  _hasFocusClass(element) {
    var $focusTarget = renderer_default(element || this._focusTarget());
    return $focusTarget.hasClass("dx-state-focused");
  },
  _isFocused() {
    return this._hasFocusClass();
  },
  _getKeyboardListeners: () => [],
  _attachKeyboardEvents() {
    this._detachKeyboardEvents();
    var {
      focusStateEnabled,
      onKeyboardHandled
    } = this.option();
    var hasChildListeners = this._getKeyboardListeners().length;
    var hasKeyboardEventHandler = !!onKeyboardHandled;
    var shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
    if (shouldAttach) {
      this._keyboardListenerId = keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), (opts) => this._keyboardHandler(opts));
    }
  },
  _keyboardHandler(options, onlyChildProcessing) {
    if (!onlyChildProcessing) {
      var {
        originalEvent,
        keyName,
        which
      } = options;
      var keys = this._supportedKeys(originalEvent);
      var func = keys[keyName] || keys[which];
      if (void 0 !== func) {
        var handler = func.bind(this);
        var result = handler(originalEvent, options);
        if (!result) {
          return false;
        }
      }
    }
    var keyboardListeners = this._getKeyboardListeners();
    var {
      onKeyboardHandled
    } = this.option();
    keyboardListeners.forEach((listener) => listener && listener._keyboardHandler(options));
    onKeyboardHandled && onKeyboardHandled(options);
    return true;
  },
  _refreshFocusState() {
    this._cleanFocusState();
    this._renderFocusState();
  },
  _cleanFocusState() {
    var $element = this._focusTarget();
    $element.removeAttr("tabIndex");
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  },
  _detachKeyboardEvents() {
    keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  },
  _attachHoverEvents() {
    var {
      hoverStateEnabled
    } = this.option();
    var selector = this._activeStateUnit;
    var $el = this._eventBindingTarget();
    hover.off($el, {
      selector,
      namespace: "UIFeedback"
    });
    if (hoverStateEnabled) {
      hover.on($el, new Action((_ref2) => {
        var {
          event,
          element
        } = _ref2;
        this._hoverStartHandler(event);
        this.option("hoveredElement", renderer_default(element));
      }, {
        excludeValidators: ["readOnly"]
      }), (event) => {
        this.option("hoveredElement", null);
        this._hoverEndHandler(event);
      }, {
        selector,
        namespace: "UIFeedback"
      });
    }
  },
  _attachFeedbackEvents() {
    var {
      activeStateEnabled
    } = this.option();
    var selector = this._activeStateUnit;
    var $el = this._eventBindingTarget();
    active.off($el, {
      namespace: "UIFeedback",
      selector
    });
    if (activeStateEnabled) {
      active.on($el, new Action((_ref3) => {
        var {
          event,
          element
        } = _ref3;
        return this._toggleActiveState(renderer_default(element), true, event);
      }), new Action((_ref4) => {
        var {
          event,
          element
        } = _ref4;
        return this._toggleActiveState(renderer_default(element), false, event);
      }, {
        excludeValidators: ["disabled", "readOnly"]
      }), {
        showTimeout: this._feedbackShowTimeout,
        hideTimeout: this._feedbackHideTimeout,
        selector,
        namespace: "UIFeedback"
      });
    }
  },
  _detachFocusEvents() {
    var $el = this._focusEventTarget();
    focus.off($el, {
      namespace: "".concat(this.NAME, "Focus")
    });
  },
  _attachFocusEvents() {
    var $el = this._focusEventTarget();
    focus.on($el, (e) => this._focusInHandler(e), (e) => this._focusOutHandler(e), {
      namespace: "".concat(this.NAME, "Focus"),
      isFocusable: (index2, el) => renderer_default(el).is(focusable)
    });
  },
  _hoverStartHandler: noop2,
  _hoverEndHandler: noop2,
  _toggleActiveState($element, value2) {
    this.option("isActive", value2);
    $element.toggleClass("dx-state-active", value2);
  },
  _updatedHover() {
    var hoveredElement = this._options.silent("hoveredElement");
    this._hover(hoveredElement, hoveredElement);
  },
  _findHoverTarget($el) {
    return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget());
  },
  _hover($el, $previous) {
    var {
      hoverStateEnabled,
      disabled,
      isActive
    } = this.option();
    $previous = this._findHoverTarget($previous);
    $previous && $previous.toggleClass("dx-state-hover", false);
    if ($el && hoverStateEnabled && !disabled && !isActive) {
      var newHoveredElement = this._findHoverTarget($el);
      newHoveredElement && newHoveredElement.toggleClass("dx-state-hover", true);
    }
  },
  _toggleDisabledState(value2) {
    this.$element().toggleClass("dx-state-disabled", Boolean(value2));
    this.setAria("disabled", value2 || void 0);
  },
  _toggleIndependentState() {
    this.$element().toggleClass("dx-state-independent", this.option("ignoreParentReadOnly"));
  },
  _setWidgetOption(widgetName, args) {
    if (!this[widgetName]) {
      return;
    }
    if (isPlainObject(args[0])) {
      each(args[0], (option, value3) => this._setWidgetOption(widgetName, [option, value3]));
      return;
    }
    var optionName = args[0];
    var value2 = args[1];
    if (1 === args.length) {
      value2 = this.option(optionName);
    }
    var widgetOptionMap = this["".concat(widgetName, "OptionMap")];
    this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value2);
  },
  _optionChanged(args) {
    var {
      name,
      value: value2,
      previousValue
    } = args;
    switch (name) {
      case "disabled":
        this._toggleDisabledState(value2);
        this._updatedHover();
        this._refreshFocusState();
        break;
      case "hint":
        this._renderHint();
        break;
      case "ignoreParentReadOnly":
        this._toggleIndependentState();
        break;
      case "activeStateEnabled":
        this._attachFeedbackEvents();
        break;
      case "hoverStateEnabled":
        this._attachHoverEvents();
        this._updatedHover();
        break;
      case "tabIndex":
      case "focusStateEnabled":
        this._refreshFocusState();
        break;
      case "onFocusIn":
      case "onFocusOut":
      case "useResizeObserver":
        break;
      case "accessKey":
        this._renderAccessKey();
        break;
      case "hoveredElement":
        this._hover(value2, previousValue);
        break;
      case "isActive":
        this._updatedHover();
        break;
      case "visible":
        this._toggleVisibility(value2);
        if (this._isVisibilityChangeSupported()) {
          this._checkVisibilityChanged(value2 ? "shown" : "hiding");
        }
        break;
      case "onKeyboardHandled":
        this._attachKeyboardEvents();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      default:
        this.callBase(args);
    }
  },
  _isVisible() {
    var {
      visible: visible2
    } = this.option();
    return this.callBase() && visible2;
  },
  beginUpdate() {
    this._ready(false);
    this.callBase();
  },
  endUpdate() {
    this.callBase();
    if (this._initialized) {
      this._ready(true);
    }
  },
  _ready(value2) {
    if (0 === arguments.length) {
      return this._isReady;
    }
    this._isReady = value2;
  },
  setAria() {
    if (!isPlainObject(arguments.length <= 0 ? void 0 : arguments[0])) {
      setAttribute(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 2 ? void 0 : arguments[2]) || this._getAriaTarget());
    } else {
      var target = (arguments.length <= 1 ? void 0 : arguments[1]) || this._getAriaTarget();
      each(arguments.length <= 0 ? void 0 : arguments[0], (name, value2) => setAttribute(name, value2, target));
    }
  },
  isReady() {
    return this._ready();
  },
  repaint() {
    this._refresh();
  },
  focus() {
    focus.trigger(this._focusTarget());
  },
  registerKeyHandler(key, handler) {
    var currentKeys = this._supportedKeys();
    this._supportedKeys = () => extend(currentKeys, {
      [key]: handler
    });
  }
});
Widget.getOptionsFromContainer = (_ref5) => {
  var {
    name,
    fullName,
    value: value2
  } = _ref5;
  var options = {};
  if (name === fullName) {
    options = value2;
  } else {
    var option = fullName.split(".").pop();
    options[option] = value2;
  }
  return options;
};
var ui_widget_default = Widget;

// node_modules/devextreme/esm/core/utils/position.js
var getDefaultAlignment = (isRtlEnabled) => {
  var rtlEnabled = null !== isRtlEnabled && void 0 !== isRtlEnabled ? isRtlEnabled : config_default().rtlEnabled;
  return rtlEnabled ? "right" : "left";
};
var getBoundingRect = (element) => {
  var _element$getBoundingC;
  if (isWindow(element)) {
    return {
      width: element.outerWidth,
      height: element.outerHeight
    };
  }
  return null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
};

// node_modules/devextreme/esm/__internal/ui/m_load_indicator.js
var navigator2 = getNavigator();
var LOADINDICATOR_CLASS = "dx-loadindicator";
var LOADINDICATOR_WRAPPER_CLASS = "dx-loadindicator-wrapper";
var LOADINDICATOR_CONTENT_CLASS = "dx-loadindicator-content";
var LOADINDICATOR_ICON_CLASS = "dx-loadindicator-icon";
var LOADINDICATOR_SEGMENT_CLASS = "dx-loadindicator-segment";
var LOADINDICATOR_SEGMENT_INNER_CLASS = "dx-loadindicator-segment-inner";
var LOADINDICATOR_IMAGE_CLASS = "dx-loadindicator-image";
var LoadIndicator = ui_widget_default.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      indicatorSrc: "",
      activeStateEnabled: false,
      hoverStateEnabled: false,
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false
    });
  },
  _defaultOptionsRules() {
    var themeName = current();
    return this.callBase().concat([{
      device() {
        var realDevice = devices_default.real();
        var obsoleteAndroid = "android" === realDevice.platform && !/chrome/i.test(navigator2.userAgent);
        return obsoleteAndroid;
      },
      options: {
        viaImage: true
      }
    }, {
      device: () => isMaterialBased(themeName),
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device: () => isGeneric(themeName),
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  },
  _useTemplates: () => false,
  _init() {
    this.callBase();
    this.$element().addClass(LOADINDICATOR_CLASS);
  },
  _initMarkup() {
    this.callBase();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  },
  _renderWrapper() {
    this._$wrapper = renderer_default("<div>").addClass(LOADINDICATOR_WRAPPER_CLASS);
    this.$element().append(this._$wrapper);
  },
  _renderIndicatorContent() {
    this._$content = renderer_default("<div>").addClass(LOADINDICATOR_CONTENT_CLASS);
    this._$wrapper.append(this._$content);
  },
  _renderMarkup() {
    var {
      viaImage,
      indicatorSrc
    } = this.option();
    if (animation() && !viaImage && !indicatorSrc) {
      this._renderMarkupForAnimation();
    } else {
      this._renderMarkupForImage();
    }
  },
  _renderMarkupForAnimation() {
    var animatingSegmentInner = this.option("_animatingSegmentInner");
    this._$indicator = renderer_default("<div>").addClass(LOADINDICATOR_ICON_CLASS);
    this._$content.append(this._$indicator);
    for (var i = this.option("_animatingSegmentCount"); i >= 0; --i) {
      var $segment = renderer_default("<div>").addClass(LOADINDICATOR_SEGMENT_CLASS).addClass(LOADINDICATOR_SEGMENT_CLASS + i);
      if (animatingSegmentInner) {
        $segment.append(renderer_default("<div>").addClass(LOADINDICATOR_SEGMENT_INNER_CLASS));
      }
      this._$indicator.append($segment);
    }
  },
  _renderMarkupForImage() {
    var {
      indicatorSrc
    } = this.option();
    if (indicatorSrc) {
      this._$wrapper.addClass(LOADINDICATOR_IMAGE_CLASS);
      this._$wrapper.css("backgroundImage", "url(".concat(indicatorSrc, ")"));
    } else if (animation()) {
      this._renderMarkupForAnimation();
    }
  },
  _renderDimensions() {
    this.callBase();
    this._updateContentSizeForAnimation();
  },
  _updateContentSizeForAnimation() {
    if (!this._$indicator) {
      return;
    }
    var width = this.option("width");
    var height = this.option("height");
    if (width || height) {
      width = getWidth(this.$element());
      height = getHeight(this.$element());
      var minDimension = Math.min(height, width);
      this._$wrapper.css({
        height: minDimension,
        width: minDimension,
        fontSize: minDimension
      });
    }
  },
  _clean() {
    this.callBase();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  },
  _removeMarkupForAnimation() {
    if (!this._$indicator) {
      return;
    }
    this._$indicator.remove();
    delete this._$indicator;
  },
  _removeMarkupForImage() {
    this._$wrapper.css("backgroundImage", "none");
  },
  _optionChanged(args) {
    switch (args.name) {
      case "_animatingSegmentCount":
      case "_animatingSegmentInner":
      case "indicatorSrc":
        this._invalidate();
        break;
      default:
        this.callBase(args);
    }
  }
});
component_registrator_default("dxLoadIndicator", LoadIndicator);
var m_load_indicator_default = LoadIndicator;

// node_modules/devextreme/esm/ui/load_indicator.js
var load_indicator_default = m_load_indicator_default;

// node_modules/devextreme/esm/animation/translator.js
var TRANSLATOR_DATA_KEY = "dxTranslator";
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
  $element = renderer_default($element);
  var translate = getTranslate($element);
  return {
    left: translate.x,
    top: translate.y
  };
};
function isPercentValue(value2) {
  return "string" === type(value2) && "%" === value2[value2.length - 1];
}
function cacheTranslate($element, translate) {
  if ($element.length) {
    data($element.get(0), TRANSLATOR_DATA_KEY, translate);
  }
}
var clearCache = function($element) {
  if ($element.length) {
    removeData($element.get(0), TRANSLATOR_DATA_KEY);
  }
};
var getTranslateCss = function(translate) {
  translate.x = translate.x || 0;
  translate.y = translate.y || 0;
  var xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
  var yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
  return "translate(" + xValueString + ", " + yValueString + ")";
};
var getTranslate = function($element) {
  var result = $element.length ? data($element.get(0), TRANSLATOR_DATA_KEY) : null;
  if (!result) {
    var transformValue = $element.css("transform") || getTranslateCss({
      x: 0,
      y: 0
    });
    var matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
    var is3D = matrix && matrix[1];
    if (matrix) {
      matrix = matrix[2].split(",");
      if ("3d" === is3D) {
        matrix = matrix.slice(12, 15);
      } else {
        matrix.push(0);
        matrix = matrix.slice(4, 7);
      }
    } else {
      matrix = [0, 0, 0];
    }
    result = {
      x: parseFloat(matrix[0]),
      y: parseFloat(matrix[1]),
      z: parseFloat(matrix[2])
    };
    cacheTranslate($element, result);
  }
  return result;
};
var move = function($element, position2) {
  $element = renderer_default($element);
  var left = position2.left;
  var top = position2.top;
  var translate;
  if (void 0 === left) {
    translate = getTranslate($element);
    translate.y = top || 0;
  } else if (void 0 === top) {
    translate = getTranslate($element);
    translate.x = left || 0;
  } else {
    translate = {
      x: left || 0,
      y: top || 0,
      z: 0
    };
    cacheTranslate($element, translate);
  }
  $element.css({
    transform: getTranslateCss(translate)
  });
  if (isPercentValue(left) || isPercentValue(top)) {
    clearCache($element);
  }
};
var resetPosition = function($element, finishTransition) {
  $element = renderer_default($element);
  var originalTransition;
  var stylesConfig = {
    left: 0,
    top: 0,
    transform: "none"
  };
  if (finishTransition) {
    originalTransition = $element.css("transition");
    stylesConfig.transition = "none";
  }
  $element.css(stylesConfig);
  clearCache($element);
  if (finishTransition) {
    $element.get(0).offsetHeight;
    $element.css("transition", originalTransition);
  }
};
var parseTranslate = function(translateString) {
  var result = translateString.match(TRANSLATE_REGEX);
  if (!result || !result[1]) {
    return;
  }
  result = result[1].split(",");
  result = {
    x: parseFloat(result[0]),
    y: parseFloat(result[1]),
    z: parseFloat(result[2])
  };
  return result;
};

// node_modules/devextreme/esm/animation/easing.js
var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var TransitionTimingFuncMap = {
  linear: "cubic-bezier(0, 0, 1, 1)",
  swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
  "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
var polynomBezier = function(x1, y1, x2, y2) {
  var Cx = 3 * x1;
  var Bx = 3 * (x2 - x1) - Cx;
  var Ax = 1 - Cx - Bx;
  var Cy = 3 * y1;
  var By = 3 * (y2 - y1) - Cy;
  var Ay = 1 - Cy - By;
  var bezierX = function(t) {
    return t * (Cx + t * (Bx + t * Ax));
  };
  var derivativeX = function(t) {
    return Cx + t * (2 * Bx + 3 * t * Ax);
  };
  return function(t) {
    return function(t2) {
      return t2 * (Cy + t2 * (By + t2 * Ay));
    }(function(t2) {
      var x = t2;
      var i = 0;
      var z;
      while (i < 14) {
        z = bezierX(x) - t2;
        if (Math.abs(z) < 1e-3) {
          break;
        }
        x -= z / derivativeX(x);
        i++;
      }
      return x;
    }(t));
  };
};
var easing = {};
var convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
  cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
  var coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
  var forceName;
  if (!coeffs) {
    forceName = "linear";
    coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX);
  }
  coeffs = coeffs.slice(1, 5);
  for (var i = 0; i < coeffs.length; i++) {
    coeffs[i] = parseFloat(coeffs[i]);
  }
  var easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
  if (!isFunction(easing[easingName])) {
    easing[easingName] = function(x, t, b, c, d) {
      return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b;
    };
  }
  return easingName;
};
function getEasing(name) {
  return easing[name];
}

// node_modules/devextreme/esm/animation/position.js
var window10 = getWindow();
var horzRe = /left|right/;
var vertRe = /top|bottom/;
var collisionRe = /fit|flip|none/;
var scaleRe = /scale\(.+?\)/;
var IS_SAFARI = browser_default.safari;
var normalizeAlign = function(raw) {
  var result = {
    h: "center",
    v: "center"
  };
  var pair = splitPair(raw);
  if (pair) {
    each(pair, function() {
      var w = String(this).toLowerCase();
      if (horzRe.test(w)) {
        result.h = w;
      } else if (vertRe.test(w)) {
        result.v = w;
      }
    });
  }
  return result;
};
var normalizeOffset = function(raw, preventRound) {
  return pairToObject(raw, preventRound);
};
var normalizeCollision = function(raw) {
  var pair = splitPair(raw);
  var h = String(pair && pair[0]).toLowerCase();
  var v = String(pair && pair[1]).toLowerCase();
  if (!collisionRe.test(h)) {
    h = "none";
  }
  if (!collisionRe.test(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getAlignFactor = function(align) {
  switch (align) {
    case "center":
      return 0.5;
    case "right":
    case "bottom":
      return 1;
    default:
      return 0;
  }
};
var inverseAlign = function(align) {
  switch (align) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    default:
      return align;
  }
};
var calculateOversize = function(data2, bounds) {
  var oversize = 0;
  if (data2.myLocation < bounds.min) {
    oversize += bounds.min - data2.myLocation;
  }
  if (data2.myLocation > bounds.max) {
    oversize += data2.myLocation - bounds.max;
  }
  return oversize;
};
var collisionSide = function(direction, data2, bounds) {
  if (data2.myLocation < bounds.min) {
    return "h" === direction ? "left" : "top";
  }
  if (data2.myLocation > bounds.max) {
    return "h" === direction ? "right" : "bottom";
  }
  return "none";
};
var initMyLocation = function(data2) {
  data2.myLocation = data2.atLocation + getAlignFactor(data2.atAlign) * data2.atSize - getAlignFactor(data2.myAlign) * data2.mySize + data2.offset;
};
var collisionResolvers = {
  fit: function(data2, bounds) {
    var result = false;
    if (data2.myLocation > bounds.max) {
      data2.myLocation = bounds.max;
      result = true;
    }
    if (data2.myLocation < bounds.min) {
      data2.myLocation = bounds.min;
      result = true;
    }
    data2.fit = result;
  },
  flip: function(data2, bounds) {
    data2.flip = false;
    if ("center" === data2.myAlign && "center" === data2.atAlign) {
      return;
    }
    if (data2.myLocation < bounds.min || data2.myLocation > bounds.max) {
      var inverseData = extend({}, data2, {
        myAlign: inverseAlign(data2.myAlign),
        atAlign: inverseAlign(data2.atAlign),
        offset: -data2.offset
      });
      initMyLocation(inverseData);
      inverseData.oversize = calculateOversize(inverseData, bounds);
      if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data2.oversize > inverseData.oversize) {
        data2.myLocation = inverseData.myLocation;
        data2.oversize = inverseData.oversize;
        data2.flip = true;
      }
    }
  },
  flipfit: function(data2, bounds) {
    this.flip(data2, bounds);
    this.fit(data2, bounds);
  },
  none: function(data2) {
    data2.oversize = 0;
  }
};
var scrollbarWidth;
var calculateScrollbarWidth = function() {
  var $scrollDiv = renderer_default("<div>").css({
    width: 100,
    height: 100,
    overflow: "scroll",
    position: "absolute",
    top: -9999
  }).appendTo(renderer_default("body"));
  var result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
  $scrollDiv.remove();
  scrollbarWidth = result;
};
var defaultPositionResult = {
  h: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  },
  v: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  }
};
var calculatePosition = function(what, options) {
  var $what = renderer_default(what);
  var currentOffset = $what.offset();
  var result = extend(true, {}, defaultPositionResult, {
    h: {
      location: currentOffset.left
    },
    v: {
      location: currentOffset.top
    }
  });
  if (!options) {
    return result;
  }
  var my = normalizeAlign(options.my);
  var at = normalizeAlign(options.at);
  var of = renderer_default(options.of).length && options.of || window10;
  var offset2 = normalizeOffset(options.offset, options.precise);
  var collision = normalizeCollision(options.collision);
  var boundary = options.boundary;
  var boundaryOffset = normalizeOffset(options.boundaryOffset, options.precise);
  var h = {
    mySize: getOuterWidth($what),
    myAlign: my.h,
    atAlign: at.h,
    offset: offset2.h,
    collision: collision.h,
    boundaryOffset: boundaryOffset.h
  };
  var v = {
    mySize: getOuterHeight($what),
    myAlign: my.v,
    atAlign: at.v,
    offset: offset2.v,
    collision: collision.v,
    boundaryOffset: boundaryOffset.v
  };
  if (of.preventDefault) {
    h.atLocation = of.pageX;
    v.atLocation = of.pageY;
    h.atSize = 0;
    v.atSize = 0;
  } else {
    of = renderer_default(of);
    if (isWindow(of[0])) {
      h.atLocation = of.scrollLeft();
      v.atLocation = of.scrollTop();
      if ("phone" === devices_default.real().deviceType && of[0].visualViewport) {
        h.atLocation = Math.max(h.atLocation, of[0].visualViewport.offsetLeft);
        v.atLocation = Math.max(v.atLocation, of[0].visualViewport.offsetTop);
        h.atSize = of[0].visualViewport.width;
        v.atSize = of[0].visualViewport.height;
      } else {
        h.atSize = of[0].innerWidth > of[0].outerWidth ? of[0].innerWidth : getWidth(of);
        v.atSize = of[0].innerHeight > of[0].outerHeight || IS_SAFARI ? of[0].innerHeight : getHeight(of);
      }
    } else if (9 === of[0].nodeType) {
      h.atLocation = 0;
      v.atLocation = 0;
      h.atSize = getWidth(of);
      v.atSize = getHeight(of);
    } else {
      var ofRect = getBoundingRect(of.get(0));
      var o = getOffsetWithoutScale(of);
      h.atLocation = o.left;
      v.atLocation = o.top;
      h.atSize = Math.max(ofRect.width, getOuterWidth(of));
      v.atSize = Math.max(ofRect.height, getOuterHeight(of));
    }
  }
  initMyLocation(h);
  initMyLocation(v);
  var bounds = function() {
    var win = renderer_default(window10);
    var windowWidth = getWidth(win);
    var windowHeight = getHeight(win);
    var left = win.scrollLeft();
    var top = win.scrollTop();
    var documentElement = dom_adapter_default.getDocumentElement();
    var hZoomLevel = touch ? documentElement.clientWidth / windowWidth : 1;
    var vZoomLevel = touch ? documentElement.clientHeight / windowHeight : 1;
    if (void 0 === scrollbarWidth) {
      calculateScrollbarWidth();
    }
    var boundaryWidth = windowWidth;
    var boundaryHeight = windowHeight;
    if (boundary && !isWindow(boundary)) {
      var $boundary = renderer_default(boundary);
      var boundaryPosition = $boundary.offset();
      left = boundaryPosition.left;
      top = boundaryPosition.top;
      boundaryWidth = getWidth($boundary);
      boundaryHeight = getHeight($boundary);
    }
    return {
      h: {
        min: left + h.boundaryOffset,
        max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
      },
      v: {
        min: top + v.boundaryOffset,
        max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
      }
    };
  }();
  h.oversize = calculateOversize(h, bounds.h);
  v.oversize = calculateOversize(v, bounds.v);
  h.collisionSide = collisionSide("h", h, bounds.h);
  v.collisionSide = collisionSide("v", v, bounds.v);
  if (collisionResolvers[h.collision]) {
    collisionResolvers[h.collision](h, bounds.h);
  }
  if (collisionResolvers[v.collision]) {
    collisionResolvers[v.collision](v, bounds.v);
  }
  var preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  extend(true, result, {
    h: {
      location: preciser(h.myLocation),
      oversize: preciser(h.oversize),
      fit: h.fit,
      flip: h.flip,
      collisionSide: h.collisionSide
    },
    v: {
      location: preciser(v.myLocation),
      oversize: preciser(v.oversize),
      fit: v.fit,
      flip: v.flip,
      collisionSide: v.collisionSide
    },
    precise: options.precise
  });
  return result;
};
var setScaleProperty = function(element, scale, styleAttr, isEmpty2) {
  var stylePropIsValid = isDefined(element.style) && !dom_adapter_default.isNode(element.style);
  var newStyleValue = isEmpty2 ? styleAttr.replace(scale, "") : styleAttr;
  if (stylePropIsValid) {
    setStyle(element, newStyleValue, false);
  } else {
    var styleAttributeNode = dom_adapter_default.createAttribute("style");
    styleAttributeNode.value = newStyleValue;
    element.setAttributeNode(styleAttributeNode);
  }
};
var getOffsetWithoutScale = function getOffsetWithoutScale2($startElement) {
  var _currentElement$getAt, _style$match;
  var $currentElement = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $startElement;
  var currentElement = $currentElement.get(0);
  if (!currentElement) {
    return $startElement.offset();
  }
  var style = (null === (_currentElement$getAt = currentElement.getAttribute) || void 0 === _currentElement$getAt ? void 0 : _currentElement$getAt.call(currentElement, "style")) || "";
  var scale = null === (_style$match = style.match(scaleRe)) || void 0 === _style$match ? void 0 : _style$match[0];
  var offset2;
  if (scale) {
    setScaleProperty(currentElement, scale, style, true);
    offset2 = getOffsetWithoutScale2($startElement, $currentElement.parent());
    setScaleProperty(currentElement, scale, style, false);
  } else {
    offset2 = getOffsetWithoutScale2($startElement, $currentElement.parent());
  }
  return offset2;
};
var position = function(what, options) {
  var $what = renderer_default(what);
  if (!options) {
    return $what.offset();
  }
  resetPosition($what, true);
  var offset2 = getOffsetWithoutScale($what);
  var targetPosition = options.h && options.v ? options : calculatePosition($what, options);
  var preciser = function(number) {
    return options.precise ? number : Math.round(number);
  };
  move($what, {
    left: targetPosition.h.location - preciser(offset2.left),
    top: targetPosition.v.location - preciser(offset2.top)
  });
  return targetPosition;
};
var offset = function(element) {
  element = renderer_default(element).get(0);
  if (isWindow(element)) {
    return null;
  } else if (element && "pageY" in element && "pageX" in element) {
    return {
      top: element.pageY,
      left: element.pageX
    };
  }
  return renderer_default(element).offset();
};
if (!position.inverseAlign) {
  position.inverseAlign = inverseAlign;
}
if (!position.normalizeAlign) {
  position.normalizeAlign = normalizeAlign;
}
var position_default = {
  calculateScrollbarWidth,
  calculate: calculatePosition,
  setup: position,
  offset
};

// node_modules/devextreme/esm/animation/fx.js
var window11 = getWindow();
var removeEventName = addNamespace2(removeEvent, "dxFX");
var RELATIVE_VALUE_REGEX = /^([+-])=(.*)/i;
var ANIM_DATA_KEY = "dxAnimData";
var ANIM_QUEUE_KEY = "dxAnimQueue";
var TRANSFORM_PROP = "transform";
var TransitionAnimationStrategy = {
  initAnimation: function($element, config2) {
    $element.css({
      transitionProperty: "none"
    });
    if ("string" === typeof config2.from) {
      $element.addClass(config2.from);
    } else {
      setProps($element, config2.from);
    }
    var that = this;
    var deferred = new Deferred();
    var cleanupWhen = config2.cleanupWhen;
    config2.transitionAnimation = {
      deferred,
      finish: function() {
        that._finishTransition($element);
        if (cleanupWhen) {
          when(deferred, cleanupWhen).always(function() {
            that._cleanup($element, config2);
          });
        } else {
          that._cleanup($element, config2);
        }
        deferred.resolveWith($element, [config2, $element]);
      }
    };
    this._completeAnimationCallback($element, config2).done(function() {
      config2.transitionAnimation.finish();
    }).fail(function() {
      deferred.rejectWith($element, [config2, $element]);
    });
    if (!config2.duration) {
      config2.transitionAnimation.finish();
    }
    $element.css("transform");
  },
  animate: function($element, config2) {
    this._startAnimation($element, config2);
    return config2.transitionAnimation.deferred.promise();
  },
  _completeAnimationCallback: function($element, config2) {
    var that = this;
    var startTime = Date.now() + config2.delay;
    var deferred = new Deferred();
    var transitionEndFired = new Deferred();
    var simulatedTransitionEndFired = new Deferred();
    var simulatedEndEventTimer;
    var transitionEndEventFullName = transitionEndEventName() + ".dxFX";
    config2.transitionAnimation.cleanup = function() {
      clearTimeout(simulatedEndEventTimer);
      clearTimeout(waitForJSCompleteTimer);
      events_engine_default.off($element, transitionEndEventFullName);
      events_engine_default.off($element, removeEventName);
    };
    events_engine_default.one($element, transitionEndEventFullName, function() {
      if (Date.now() - startTime >= config2.duration) {
        transitionEndFired.reject();
      }
    });
    events_engine_default.off($element, removeEventName);
    events_engine_default.on($element, removeEventName, function() {
      that.stop($element, config2);
      deferred.reject();
    });
    var waitForJSCompleteTimer = setTimeout(function() {
      simulatedEndEventTimer = setTimeout(function() {
        simulatedTransitionEndFired.reject();
      }, config2.duration + config2.delay + fx._simulatedTransitionEndDelay);
      when(transitionEndFired, simulatedTransitionEndFired).fail((function() {
        deferred.resolve();
      }).bind(this));
    });
    return deferred.promise();
  },
  _startAnimation: function($element, config2) {
    $element.css({
      transitionProperty: "all",
      transitionDelay: config2.delay + "ms",
      transitionDuration: config2.duration + "ms",
      transitionTimingFunction: config2.easing
    });
    if ("string" === typeof config2.to) {
      $element[0].className += " " + config2.to;
    } else if (config2.to) {
      setProps($element, config2.to);
    }
  },
  _finishTransition: function($element) {
    $element.css("transition", "none");
  },
  _cleanup: function($element, config2) {
    config2.transitionAnimation.cleanup();
    if ("string" === typeof config2.from) {
      $element.removeClass(config2.from);
      $element.removeClass(config2.to);
    }
  },
  stop: function($element, config2, jumpToEnd) {
    if (!config2) {
      return;
    }
    if (jumpToEnd) {
      config2.transitionAnimation.finish();
    } else {
      if (isPlainObject(config2.to)) {
        each(config2.to, function(key) {
          $element.css(key, $element.css(key));
        });
      }
      this._finishTransition($element);
      this._cleanup($element, config2);
    }
  }
};
var FrameAnimationStrategy = {
  initAnimation: function($element, config2) {
    setProps($element, config2.from);
  },
  animate: function($element, config2) {
    var deferred = new Deferred();
    var that = this;
    if (!config2) {
      return deferred.reject().promise();
    }
    each(config2.to, function(prop) {
      if (void 0 === config2.from[prop]) {
        config2.from[prop] = that._normalizeValue($element.css(prop));
      }
    });
    if (config2.to[TRANSFORM_PROP]) {
      config2.from[TRANSFORM_PROP] = that._parseTransform(config2.from[TRANSFORM_PROP]);
      config2.to[TRANSFORM_PROP] = that._parseTransform(config2.to[TRANSFORM_PROP]);
    }
    config2.frameAnimation = {
      to: config2.to,
      from: config2.from,
      currentValue: config2.from,
      easing: convertTransitionTimingFuncToEasing(config2.easing),
      duration: config2.duration,
      startTime: (/* @__PURE__ */ new Date()).valueOf(),
      finish: function() {
        this.currentValue = this.to;
        this.draw();
        cancelAnimationFrame(config2.frameAnimation.animationFrameId);
        deferred.resolve();
      },
      draw: function() {
        if (config2.draw) {
          config2.draw(this.currentValue);
          return;
        }
        var currentValue = extend({}, this.currentValue);
        if (currentValue[TRANSFORM_PROP]) {
          currentValue[TRANSFORM_PROP] = map(currentValue[TRANSFORM_PROP], function(value2, prop) {
            if ("translate" === prop) {
              return getTranslateCss(value2);
            } else if ("scale" === prop) {
              return "scale(" + value2 + ")";
            } else if ("rotate" === prop.substr(0, prop.length - 1)) {
              return prop + "(" + value2 + "deg)";
            }
          }).join(" ");
        }
        $element.css(currentValue);
      }
    };
    if (config2.delay) {
      config2.frameAnimation.startTime += config2.delay;
      config2.frameAnimation.delayTimeout = setTimeout(function() {
        that._startAnimation($element, config2);
      }, config2.delay);
    } else {
      that._startAnimation($element, config2);
    }
    return deferred.promise();
  },
  _startAnimation: function($element, config2) {
    events_engine_default.off($element, removeEventName);
    events_engine_default.on($element, removeEventName, function() {
      if (config2.frameAnimation) {
        cancelAnimationFrame(config2.frameAnimation.animationFrameId);
      }
    });
    this._animationStep($element, config2);
  },
  _parseTransform: function(transformString) {
    var result = {};
    each(transformString.match(/\w+\d*\w*\([^)]*\)\s*/g), function(i, part) {
      var translateData = parseTranslate(part);
      var scaleData = part.match(/scale\((.+?)\)/);
      var rotateData = part.match(/(rotate.)\((.+)deg\)/);
      if (translateData) {
        result.translate = translateData;
      }
      if (scaleData && scaleData[1]) {
        result.scale = parseFloat(scaleData[1]);
      }
      if (rotateData && rotateData[1]) {
        result[rotateData[1]] = parseFloat(rotateData[2]);
      }
    });
    return result;
  },
  stop: function($element, config2, jumpToEnd) {
    var frameAnimation = config2 && config2.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    cancelAnimationFrame(frameAnimation.animationFrameId);
    clearTimeout(frameAnimation.delayTimeout);
    if (jumpToEnd) {
      frameAnimation.finish();
    }
    delete config2.frameAnimation;
  },
  _animationStep: function($element, config2) {
    var frameAnimation = config2 && config2.frameAnimation;
    if (!frameAnimation) {
      return;
    }
    var now = (/* @__PURE__ */ new Date()).valueOf();
    if (now >= frameAnimation.startTime + frameAnimation.duration) {
      frameAnimation.finish();
      return;
    }
    frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
    frameAnimation.draw();
    var that = this;
    frameAnimation.animationFrameId = requestAnimationFrame(function() {
      that._animationStep($element, config2);
    });
  },
  _calcStepValue: function(frameAnimation, currentDuration) {
    return function calcValueRecursively(from, to) {
      var result = Array.isArray(to) ? [] : {};
      each(to, function(propName, endPropValue) {
        if ("string" === typeof endPropValue && false === parseFloat(endPropValue)) {
          return true;
        }
        result[propName] = "object" === typeof endPropValue ? calcValueRecursively(from[propName], endPropValue) : function(propName2) {
          var x = currentDuration / frameAnimation.duration;
          var t = currentDuration;
          var b = 1 * from[propName2];
          var c = to[propName2] - from[propName2];
          var d = frameAnimation.duration;
          return getEasing(frameAnimation.easing)(x, t, b, c, d);
        }(propName);
      });
      return result;
    }(frameAnimation.from, frameAnimation.to);
  },
  _normalizeValue: function(value2) {
    var numericValue = parseFloat(value2);
    if (false === numericValue) {
      return value2;
    }
    return numericValue;
  }
};
var FallbackToNoAnimationStrategy = {
  initAnimation: function() {
  },
  animate: function() {
    return new Deferred().resolve().promise();
  },
  stop: noop2,
  isSynchronous: true
};
var getAnimationStrategy = function(config2) {
  config2 = config2 || {};
  var animationStrategies = {
    transition: transition() ? TransitionAnimationStrategy : FrameAnimationStrategy,
    frame: FrameAnimationStrategy,
    noAnimation: FallbackToNoAnimationStrategy
  };
  var strategy3 = config2.strategy || "transition";
  if ("css" === config2.type && !transition()) {
    strategy3 = "noAnimation";
  }
  return animationStrategies[strategy3];
};
var baseConfigValidator = function(config2, animationType, validate, typeMessage) {
  each(["from", "to"], function() {
    if (!validate(config2[this])) {
      throw errors_default.Error("E0010", animationType, this, typeMessage);
    }
  });
};
var isObjectConfigValidator = function(config2, animationType) {
  return baseConfigValidator(config2, animationType, function(target) {
    return isPlainObject(target);
  }, "a plain object");
};
var isStringConfigValidator = function(config2, animationType) {
  return baseConfigValidator(config2, animationType, function(target) {
    return "string" === typeof target;
  }, "a string");
};
var CustomAnimationConfigurator = {
  setup: function() {
  }
};
var CssAnimationConfigurator = {
  validateConfig: function(config2) {
    isStringConfigValidator(config2, "css");
  },
  setup: function() {
  }
};
var positionAliases = {
  top: {
    my: "bottom center",
    at: "top center"
  },
  bottom: {
    my: "top center",
    at: "bottom center"
  },
  right: {
    my: "left center",
    at: "right center"
  },
  left: {
    my: "right center",
    at: "left center"
  }
};
var SlideAnimationConfigurator = {
  validateConfig: function(config2) {
    isObjectConfigValidator(config2, "slide");
  },
  setup: function($element, config2) {
    var location = locate($element);
    if ("slide" !== config2.type) {
      var positioningConfig = "slideIn" === config2.type ? config2.from : config2.to;
      positioningConfig.position = extend({
        of: window11
      }, positionAliases[config2.direction]);
      setupPosition($element, positioningConfig);
    }
    this._setUpConfig(location, config2.from);
    this._setUpConfig(location, config2.to);
    clearCache($element);
  },
  _setUpConfig: function(location, config2) {
    config2.left = "left" in config2 ? config2.left : "+=0";
    config2.top = "top" in config2 ? config2.top : "+=0";
    this._initNewPosition(location, config2);
  },
  _initNewPosition: function(location, config2) {
    var position2 = {
      left: config2.left,
      top: config2.top
    };
    delete config2.left;
    delete config2.top;
    var relativeValue = this._getRelativeValue(position2.left);
    if (void 0 !== relativeValue) {
      position2.left = relativeValue + location.left;
    } else {
      config2.left = 0;
    }
    relativeValue = this._getRelativeValue(position2.top);
    if (void 0 !== relativeValue) {
      position2.top = relativeValue + location.top;
    } else {
      config2.top = 0;
    }
    config2[TRANSFORM_PROP] = getTranslateCss({
      x: position2.left,
      y: position2.top
    });
  },
  _getRelativeValue: function(value2) {
    var relativeValue;
    if ("string" === typeof value2 && (relativeValue = RELATIVE_VALUE_REGEX.exec(value2))) {
      return parseInt(relativeValue[1] + "1") * relativeValue[2];
    }
  }
};
var FadeAnimationConfigurator = {
  setup: function($element, config2) {
    var _from$opacity, _to$opacity;
    var from = config2.from;
    var to = config2.to;
    var defaultFromOpacity = "fadeOut" === config2.type ? 1 : 0;
    var defaultToOpacity = "fadeOut" === config2.type ? 0 : 1;
    var fromOpacity = isPlainObject(from) ? String(null !== (_from$opacity = from.opacity) && void 0 !== _from$opacity ? _from$opacity : defaultFromOpacity) : String(from);
    var toOpacity = isPlainObject(to) ? String(null !== (_to$opacity = to.opacity) && void 0 !== _to$opacity ? _to$opacity : defaultToOpacity) : String(to);
    if (!config2.skipElementInitialStyles) {
      fromOpacity = $element.css("opacity");
    }
    switch (config2.type) {
      case "fadeIn":
        toOpacity = 1;
        break;
      case "fadeOut":
        toOpacity = 0;
    }
    config2.from = {
      visibility: "visible",
      opacity: fromOpacity
    };
    config2.to = {
      opacity: toOpacity
    };
  }
};
var PopAnimationConfigurator = {
  validateConfig: function(config2) {
    isObjectConfigValidator(config2, "pop");
  },
  setup: function($element, config2) {
    var from = config2.from;
    var to = config2.to;
    var fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity");
    var toOpacity = "opacity" in to ? to.opacity : 1;
    var fromScale = "scale" in from ? from.scale : 0;
    var toScale = "scale" in to ? to.scale : 1;
    config2.from = {
      opacity: fromOpacity
    };
    var translate = getTranslate($element);
    config2.from[TRANSFORM_PROP] = this._getCssTransform(translate, fromScale);
    config2.to = {
      opacity: toOpacity
    };
    config2.to[TRANSFORM_PROP] = this._getCssTransform(translate, toScale);
  },
  _getCssTransform: function(translate, scale) {
    return getTranslateCss(translate) + "scale(" + scale + ")";
  }
};
var animationConfigurators = {
  custom: CustomAnimationConfigurator,
  slide: SlideAnimationConfigurator,
  slideIn: SlideAnimationConfigurator,
  slideOut: SlideAnimationConfigurator,
  fade: FadeAnimationConfigurator,
  fadeIn: FadeAnimationConfigurator,
  fadeOut: FadeAnimationConfigurator,
  pop: PopAnimationConfigurator,
  css: CssAnimationConfigurator
};
var getAnimationConfigurator = function(config2) {
  var result = animationConfigurators[config2.type];
  if (!result) {
    throw errors_default.Error("E0011", config2.type);
  }
  return result;
};
var defaultJSConfig = {
  type: "custom",
  from: {},
  to: {},
  duration: 400,
  start: noop2,
  complete: noop2,
  easing: "ease",
  delay: 0
};
var defaultCssConfig = {
  duration: 400,
  easing: "ease",
  delay: 0
};
function setupAnimationOnElement() {
  var $element = this.element;
  var config2 = this.config;
  setupPosition($element, config2.from);
  setupPosition($element, config2.to);
  this.configurator.setup($element, config2);
  $element.data(ANIM_DATA_KEY, this);
  if (fx.off) {
    config2.duration = 0;
    config2.delay = 0;
  }
  this.strategy.initAnimation($element, config2);
  if (config2.start) {
    var element = getPublicElement($element);
    config2.start.apply(this, [element, config2]);
  }
}
var onElementAnimationComplete = function(animation2) {
  var $element = animation2.element;
  var config2 = animation2.config;
  $element.removeData(ANIM_DATA_KEY);
  if (config2.complete) {
    var element = getPublicElement($element);
    config2.complete.apply(this, [element, config2]);
  }
  animation2.deferred.resolveWith(this, [$element, config2]);
};
var startAnimationOnElement = function() {
  var animation2 = this;
  var $element = animation2.element;
  var config2 = animation2.config;
  animation2.isStarted = true;
  return animation2.strategy.animate($element, config2).done(function() {
    onElementAnimationComplete(animation2);
  }).fail(function() {
    animation2.deferred.rejectWith(this, [$element, config2]);
  });
};
var stopAnimationOnElement = function(jumpToEnd) {
  var $element = this.element;
  var config2 = this.config;
  clearTimeout(this.startTimeout);
  if (!this.isStarted) {
    this.start();
  }
  this.strategy.stop($element, config2, jumpToEnd);
};
var scopedRemoveEvent = addNamespace2(removeEvent, "dxFXStartAnimation");
var subscribeToRemoveEvent = function(animation2) {
  events_engine_default.off(animation2.element, scopedRemoveEvent);
  events_engine_default.on(animation2.element, scopedRemoveEvent, function() {
    fx.stop(animation2.element);
  });
  animation2.deferred.always(function() {
    events_engine_default.off(animation2.element, scopedRemoveEvent);
  });
};
var createAnimation = function(element, initialConfig) {
  var defaultConfig = "css" === initialConfig.type ? defaultCssConfig : defaultJSConfig;
  var config2 = extend(true, {}, defaultConfig, initialConfig);
  var configurator = getAnimationConfigurator(config2);
  var strategy3 = getAnimationStrategy(config2);
  var animation2 = {
    element: renderer_default(element),
    config: config2,
    configurator,
    strategy: strategy3,
    isSynchronous: strategy3.isSynchronous,
    setup: setupAnimationOnElement,
    start: startAnimationOnElement,
    stop: stopAnimationOnElement,
    deferred: new Deferred()
  };
  if (isFunction(configurator.validateConfig)) {
    configurator.validateConfig(config2);
  }
  subscribeToRemoveEvent(animation2);
  return animation2;
};
var animate = function(element, config2) {
  var $element = renderer_default(element);
  if (!$element.length) {
    return new Deferred().resolve().promise();
  }
  var animation2 = createAnimation($element, config2);
  pushInAnimationQueue($element, animation2);
  return animation2.deferred.promise();
};
function pushInAnimationQueue($element, animation2) {
  var queueData = getAnimQueueData($element);
  writeAnimQueueData($element, queueData);
  queueData.push(animation2);
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
}
function getAnimQueueData($element) {
  return $element.data(ANIM_QUEUE_KEY) || [];
}
function writeAnimQueueData($element, queueData) {
  $element.data(ANIM_QUEUE_KEY, queueData);
}
var destroyAnimQueueData = function($element) {
  $element.removeData(ANIM_QUEUE_KEY);
};
function isAnimating($element) {
  return !!$element.data(ANIM_DATA_KEY);
}
function shiftFromAnimationQueue($element, queueData) {
  queueData = getAnimQueueData($element);
  if (!queueData.length) {
    return;
  }
  var animation2 = queueData.shift();
  if (0 === queueData.length) {
    destroyAnimQueueData($element);
  }
  executeAnimation(animation2).done(function() {
    if (!isAnimating($element)) {
      shiftFromAnimationQueue($element);
    }
  });
}
function executeAnimation(animation2) {
  animation2.setup();
  if (fx.off || animation2.isSynchronous) {
    animation2.start();
  } else {
    animation2.startTimeout = setTimeout(function() {
      animation2.start();
    });
  }
  return animation2.deferred.promise();
}
function setupPosition($element, config2) {
  if (!config2 || !config2.position) {
    return;
  }
  var win = renderer_default(window11);
  var left = 0;
  var top = 0;
  var position2 = position_default.calculate($element, config2.position);
  var offset2 = $element.offset();
  var currentPosition = $element.position();
  if (currentPosition.top > offset2.top) {
    top = win.scrollTop();
  }
  if (currentPosition.left > offset2.left) {
    left = win.scrollLeft();
  }
  extend(config2, {
    left: position2.h.location - offset2.left + currentPosition.left - left,
    top: position2.v.location - offset2.top + currentPosition.top - top
  });
  delete config2.position;
}
function setProps($element, props) {
  each(props, function(key, value2) {
    try {
      $element.css(key, isFunction(value2) ? value2() : value2);
    } catch (e) {
    }
  });
}
var stop = function(element, jumpToEnd) {
  var $element = renderer_default(element);
  var queueData = getAnimQueueData($element);
  each(queueData, function(_, animation3) {
    animation3.config.delay = 0;
    animation3.config.duration = 0;
    animation3.isSynchronous = true;
  });
  if (!isAnimating($element)) {
    shiftFromAnimationQueue($element, queueData);
  }
  var animation2 = $element.data(ANIM_DATA_KEY);
  if (animation2) {
    animation2.stop(jumpToEnd);
  }
  $element.removeData(ANIM_DATA_KEY);
  destroyAnimQueueData($element);
};
var fx = {
  off: false,
  animationTypes: animationConfigurators,
  animate,
  createAnimation,
  isAnimating,
  stop,
  _simulatedTransitionEndDelay: 100
};
var fx_default = fx;

// node_modules/devextreme/esm/events/gesture/emitter.gesture.js
var ready3 = ready_callbacks_default.add;
var abs = Math.abs;
var SLEEP = 0;
var INITED = 1;
var STARTED = 2;
var TOUCH_BOUNDARY = 10;
var IMMEDIATE_TOUCH_BOUNDARY = 0;
var IMMEDIATE_TIMEOUT = 180;
var supportPointerEvents = function() {
  return styleProp("pointer-events");
};
var setGestureCover = call_once_default(function() {
  var isDesktop = "desktop" === devices_default.real().deviceType;
  if (!supportPointerEvents() || !isDesktop) {
    return noop2;
  }
  var $cover = renderer_default("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
  events_engine_default.subscribeGlobal($cover, "dxmousewheel", function(e) {
    e.preventDefault();
  });
  ready3(function() {
    $cover.appendTo("body");
  });
  return function(toggle, cursor) {
    $cover.css("pointerEvents", toggle ? "all" : "none");
    toggle && $cover.css("cursor", cursor);
  };
});
var gestureCover = function(toggle, cursor) {
  var gestureCoverStrategy = setGestureCover();
  gestureCoverStrategy(toggle, cursor);
};
var GestureEmitter = emitter_default.inherit({
  gesture: true,
  configure: function(data2) {
    this.getElement().css("msTouchAction", data2.immediate ? "pinch-zoom" : "");
    this.callBase(data2);
  },
  allowInterruptionByMouseWheel: function() {
    return this._stage !== STARTED;
  },
  getDirection: function() {
    return this.direction;
  },
  _cancel: function() {
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
    this._stage = SLEEP;
  },
  start: function(e) {
    if (e._needSkipEvent || needSkipEvent(e)) {
      this._cancel(e);
      return;
    }
    this._startEvent = createEvent(e);
    this._startEventData = eventData(e);
    this._stage = INITED;
    this._init(e);
    this._setupImmediateTimer();
  },
  _setupImmediateTimer: function() {
    var _this$immediateTimeou;
    clearTimeout(this._immediateTimer);
    this._immediateAccepted = false;
    if (!this.immediate) {
      return;
    }
    if (0 === this.immediateTimeout) {
      this._immediateAccepted = true;
      return;
    }
    this._immediateTimer = setTimeout((function() {
      this._immediateAccepted = true;
    }).bind(this), null !== (_this$immediateTimeou = this.immediateTimeout) && void 0 !== _this$immediateTimeou ? _this$immediateTimeou : IMMEDIATE_TIMEOUT);
  },
  move: function(e) {
    if (this._stage === INITED && this._directionConfirmed(e)) {
      this._stage = STARTED;
      this._resetActiveElement();
      this._toggleGestureCover(true);
      this._clearSelection(e);
      this._adjustStartEvent(e);
      this._start(this._startEvent);
      if (this._stage === SLEEP) {
        return;
      }
      this._requestAccept(e);
      this._move(e);
      this._forgetAccept();
    } else if (this._stage === STARTED) {
      this._clearSelection(e);
      this._move(e);
    }
  },
  _directionConfirmed: function(e) {
    var touchBoundary = this._getTouchBoundary(e);
    var delta = eventDelta(this._startEventData, eventData(e));
    var deltaX = abs(delta.x);
    var deltaY = abs(delta.y);
    var horizontalMove = this._validateMove(touchBoundary, deltaX, deltaY);
    var verticalMove = this._validateMove(touchBoundary, deltaY, deltaX);
    var direction = this.getDirection(e);
    var bothAccepted = "both" === direction && (horizontalMove || verticalMove);
    var horizontalAccepted = "horizontal" === direction && horizontalMove;
    var verticalAccepted = "vertical" === direction && verticalMove;
    return bothAccepted || horizontalAccepted || verticalAccepted || this._immediateAccepted;
  },
  _validateMove: function(touchBoundary, mainAxis, crossAxis) {
    return mainAxis && mainAxis >= touchBoundary && (this.immediate ? mainAxis >= crossAxis : true);
  },
  _getTouchBoundary: function(e) {
    return this.immediate || isDxMouseWheelEvent(e) ? IMMEDIATE_TOUCH_BOUNDARY : TOUCH_BOUNDARY;
  },
  _adjustStartEvent: function(e) {
    var touchBoundary = this._getTouchBoundary(e);
    var delta = eventDelta(this._startEventData, eventData(e));
    this._startEvent.pageX += sign(delta.x) * touchBoundary;
    this._startEvent.pageY += sign(delta.y) * touchBoundary;
  },
  _resetActiveElement: function() {
    if ("ios" === devices_default.real().platform && this.getElement().find(":focus").length) {
      resetActiveElement();
    }
  },
  _toggleGestureCover: function(toggle) {
    this._toggleGestureCoverImpl(toggle);
  },
  _toggleGestureCoverImpl: function(toggle) {
    var isStarted = this._stage === STARTED;
    if (isStarted) {
      gestureCover(toggle, this.getElement().css("cursor"));
    }
  },
  _clearSelection: function(e) {
    if (isDxMouseWheelEvent(e) || isTouchEvent(e)) {
      return;
    }
    clearSelection();
  },
  end: function(e) {
    this._toggleGestureCover(false);
    if (this._stage === STARTED) {
      this._end(e);
    } else if (this._stage === INITED) {
      this._stop(e);
    }
    this._stage = SLEEP;
  },
  dispose: function() {
    clearTimeout(this._immediateTimer);
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
  },
  _init: noop2,
  _start: noop2,
  _move: noop2,
  _stop: noop2,
  _end: noop2
});
GestureEmitter.initialTouchBoundary = TOUCH_BOUNDARY;
GestureEmitter.touchBoundary = function(newBoundary) {
  if (isDefined(newBoundary)) {
    TOUCH_BOUNDARY = newBoundary;
    return;
  }
  return TOUCH_BOUNDARY;
};
var emitter_gesture_default = GestureEmitter;

// node_modules/devextreme/esm/events/drag.js
var DRAG_START_EVENT = "dxdragstart";
var DRAG_EVENT = "dxdrag";
var DRAG_END_EVENT = "dxdragend";
var DRAG_ENTER_EVENT = "dxdragenter";
var DRAG_LEAVE_EVENT = "dxdragleave";
var DROP_EVENT = "dxdrop";
var DX_DRAG_EVENTS_COUNT_KEY = "dxDragEventsCount";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
  setup: function(element, data2) {
    var knownDropTarget = knownDropTargets.includes(element);
    if (!knownDropTarget) {
      knownDropTargets.push(element);
      knownDropTargetSelectors.push([]);
      knownDropTargetConfigs.push(data2 || {});
    }
  },
  add: function(element, handleObj) {
    var index2 = knownDropTargets.indexOf(element);
    this.updateEventsCounter(element, handleObj.type, 1);
    var selector = handleObj.selector;
    if (!knownDropTargetSelectors[index2].includes(selector)) {
      knownDropTargetSelectors[index2].push(selector);
    }
  },
  updateEventsCounter: function(element, event, value2) {
    if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].indexOf(event) > -1) {
      var eventsCount = data(element, DX_DRAG_EVENTS_COUNT_KEY) || 0;
      data(element, DX_DRAG_EVENTS_COUNT_KEY, Math.max(0, eventsCount + value2));
    }
  },
  remove: function(element, handleObj) {
    this.updateEventsCounter(element, handleObj.type, -1);
  },
  teardown: function(element) {
    var handlersCount = data(element, DX_DRAG_EVENTS_COUNT_KEY);
    if (!handlersCount) {
      var index2 = knownDropTargets.indexOf(element);
      knownDropTargets.splice(index2, 1);
      knownDropTargetSelectors.splice(index2, 1);
      knownDropTargetConfigs.splice(index2, 1);
      removeData(element, DX_DRAG_EVENTS_COUNT_KEY);
    }
  }
};
event_registrator_default(DRAG_ENTER_EVENT, dropTargetRegistration);
event_registrator_default(DRAG_LEAVE_EVENT, dropTargetRegistration);
event_registrator_default(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
  var dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  var dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter((selector) => selector);
  var $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
  if (knownDropTargetSelectors[dropTargetIndex].includes(void 0)) {
    $delegatedTargets = $delegatedTargets.add($element);
  }
  return $delegatedTargets;
};
var getItemConfig = function($element) {
  var dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  return knownDropTargetConfigs[dropTargetIndex];
};
var getItemPosition = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemPositionFunc) {
    return dropTargetConfig.itemPositionFunc($element);
  } else {
    return $element.offset();
  }
};
var getItemSize = function(dropTargetConfig, $element) {
  if (dropTargetConfig.itemSizeFunc) {
    return dropTargetConfig.itemSizeFunc($element);
  }
  return {
    width: $element.get(0).getBoundingClientRect().width,
    height: $element.get(0).getBoundingClientRect().height
  };
};
var DragEmitter = emitter_gesture_default.inherit({
  ctor: function(element) {
    this.callBase(element);
    this.direction = "both";
  },
  _init: function(e) {
    this._initEvent = e;
  },
  _start: function(e) {
    e = this._fireEvent(DRAG_START_EVENT, this._initEvent);
    this._maxLeftOffset = e.maxLeftOffset;
    this._maxRightOffset = e.maxRightOffset;
    this._maxTopOffset = e.maxTopOffset;
    this._maxBottomOffset = e.maxBottomOffset;
    if (e.targetElements || null === e.targetElements) {
      var dropTargets = wrapToArray(e.targetElements || []);
      this._dropTargets = map(dropTargets, function(element) {
        return renderer_default(element).get(0);
      });
    } else {
      this._dropTargets = knownDropTargets;
    }
  },
  _move: function(e) {
    var eventData2 = eventData(e);
    var dragOffset = this._calculateOffset(eventData2);
    e = this._fireEvent(DRAG_EVENT, e, {
      offset: dragOffset
    });
    this._processDropTargets(e);
    if (!e._cancelPreventDefault) {
      e.preventDefault();
    }
  },
  _calculateOffset: function(eventData2) {
    return {
      x: this._calculateXOffset(eventData2),
      y: this._calculateYOffset(eventData2)
    };
  },
  _calculateXOffset: function(eventData2) {
    if ("vertical" !== this.direction) {
      var offset2 = eventData2.x - this._startEventData.x;
      return this._fitOffset(offset2, this._maxLeftOffset, this._maxRightOffset);
    }
    return 0;
  },
  _calculateYOffset: function(eventData2) {
    if ("horizontal" !== this.direction) {
      var offset2 = eventData2.y - this._startEventData.y;
      return this._fitOffset(offset2, this._maxTopOffset, this._maxBottomOffset);
    }
    return 0;
  },
  _fitOffset: function(offset2, minOffset, maxOffset) {
    if (null != minOffset) {
      offset2 = Math.max(offset2, -minOffset);
    }
    if (null != maxOffset) {
      offset2 = Math.min(offset2, maxOffset);
    }
    return offset2;
  },
  _processDropTargets: function(e) {
    var target = this._findDropTarget(e);
    var sameTarget = target === this._currentDropTarget;
    if (!sameTarget) {
      this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
      this._currentDropTarget = target;
      this._fireDropTargetEvent(e, DRAG_ENTER_EVENT);
    }
  },
  _fireDropTargetEvent: function(event, eventName) {
    if (!this._currentDropTarget) {
      return;
    }
    var eventData2 = {
      type: eventName,
      originalEvent: event,
      draggingElement: this._$element.get(0),
      target: this._currentDropTarget
    };
    fireEvent(eventData2);
  },
  _findDropTarget: function(e) {
    var that = this;
    var result;
    each(knownDropTargets, function(_, target) {
      if (!that._checkDropTargetActive(target)) {
        return;
      }
      var $target = renderer_default(target);
      each(getItemDelegatedTargets($target), function(_2, delegatedTarget) {
        var $delegatedTarget = renderer_default(delegatedTarget);
        if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, renderer_default(result), e)) {
          result = delegatedTarget;
        }
      });
    });
    return result;
  },
  _checkDropTargetActive: function(target) {
    var active2 = false;
    each(this._dropTargets, function(_, activeTarget) {
      active2 = active2 || activeTarget === target || contains2(activeTarget, target);
      return !active2;
    });
    return active2;
  },
  _checkDropTarget: function(config2, $target, $prevTarget, e) {
    var isDraggingElement = $target.get(0) === renderer_default(e.target).get(0);
    if (isDraggingElement) {
      return false;
    }
    var targetPosition = getItemPosition(config2, $target);
    if (e.pageX < targetPosition.left) {
      return false;
    }
    if (e.pageY < targetPosition.top) {
      return false;
    }
    var targetSize = getItemSize(config2, $target);
    if (e.pageX > targetPosition.left + targetSize.width) {
      return false;
    }
    if (e.pageY > targetPosition.top + targetSize.height) {
      return false;
    }
    if ($prevTarget.length && $prevTarget.closest($target).length) {
      return false;
    }
    if (config2.checkDropTarget && !config2.checkDropTarget($target, e)) {
      return false;
    }
    return $target;
  },
  _end: function(e) {
    var eventData2 = eventData(e);
    this._fireEvent(DRAG_END_EVENT, e, {
      offset: this._calculateOffset(eventData2)
    });
    this._fireDropTargetEvent(e, DROP_EVENT);
    delete this._currentDropTarget;
  }
});
emitter_registrator_default({
  emitter: DragEmitter,
  events: [DRAG_START_EVENT, DRAG_EVENT, DRAG_END_EVENT]
});

// node_modules/devextreme/esm/mobile/hide_callback.js
var hideCallback = /* @__PURE__ */ function() {
  var callbacks2 = [];
  return {
    add: function(callback) {
      if (!callbacks2.includes(callback)) {
        callbacks2.push(callback);
      }
    },
    remove: function(callback) {
      var indexOfCallback = callbacks2.indexOf(callback);
      if (-1 !== indexOfCallback) {
        callbacks2.splice(indexOfCallback, 1);
      }
    },
    fire: function() {
      var callback = callbacks2.pop();
      var result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: function() {
      return callbacks2.length > 0;
    }
  };
}();

// node_modules/devextreme/esm/ui/widget/swatch_container.js
var SWATCH_CONTAINER_CLASS_PREFIX = "dx-swatch-";
var getSwatchContainer = (element) => {
  var $element = renderer_default(element);
  var swatchContainer = $element.closest('[class^="'.concat(SWATCH_CONTAINER_CLASS_PREFIX, '"], [class*=" ').concat(SWATCH_CONTAINER_CLASS_PREFIX, '"]'));
  var viewport = value();
  if (!swatchContainer.length) {
    return viewport;
  }
  var swatchClassRegex = new RegExp("(\\s|^)(".concat(SWATCH_CONTAINER_CLASS_PREFIX, ".*?)(\\s|$)"));
  var swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  var viewportSwatchContainer = viewport.children("." + swatchClass);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = renderer_default("<div>").addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
var swatch_container_default = {
  getSwatchContainer
};

// node_modules/devextreme/esm/__internal/ui/overlay/m_overlay_position_controller.js
var window12 = getWindow();
var OVERLAY_POSITION_ALIASES = {
  top: {
    my: "top center",
    at: "top center"
  },
  bottom: {
    my: "bottom center",
    at: "bottom center"
  },
  right: {
    my: "right center",
    at: "right center"
  },
  left: {
    my: "left center",
    at: "left center"
  },
  center: {
    my: "center",
    at: "center"
  },
  "right bottom": {
    my: "right bottom",
    at: "right bottom"
  },
  "right top": {
    my: "right top",
    at: "right top"
  },
  "left bottom": {
    my: "left bottom",
    at: "left bottom"
  },
  "left top": {
    my: "left top",
    at: "left top"
  }
};
var OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
var OverlayPositionController = class {
  constructor(_ref) {
    var {
      position: position2,
      container,
      visualContainer,
      $root,
      $content,
      $wrapper,
      onPositioned,
      onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning
    } = _ref;
    this._props = {
      position: position2,
      container,
      visualContainer,
      restorePosition,
      onPositioned,
      onVisualPositionChanged,
      _fixWrapperPosition,
      _skipContentPositioning
    };
    this._$root = $root;
    this._$content = $content;
    this._$wrapper = $wrapper;
    this._$markupContainer = void 0;
    this._$visualContainer = void 0;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = void 0;
    this._initialPosition = void 0;
    this._previousVisualPosition = void 0;
    this.updateContainer(container);
    this.updatePosition(position2);
    this.updateVisualContainer(visualContainer);
  }
  get $container() {
    this.updateContainer();
    return this._$markupContainer;
  }
  get $visualContainer() {
    return this._$visualContainer;
  }
  get position() {
    return this._position;
  }
  set fixWrapperPosition(fixWrapperPosition) {
    this._props._fixWrapperPosition = fixWrapperPosition;
    this.styleWrapperPosition();
  }
  set restorePosition(restorePosition) {
    this._props.restorePosition = restorePosition;
  }
  restorePositionOnNextRender(value2) {
    this._shouldRenderContentInitialPosition = value2 || !this._visualPosition;
  }
  openingHandled() {
    var shouldRestorePosition = this._props.restorePosition;
    this.restorePositionOnNextRender(shouldRestorePosition);
  }
  updatePosition(positionProp) {
    this._props.position = positionProp;
    this._position = this._normalizePosition(positionProp);
    this.updateVisualContainer();
  }
  updateContainer() {
    var containerProp = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._props.container;
    this._props.container = containerProp;
    this._$markupContainer = containerProp ? renderer_default(containerProp) : swatch_container_default.getSwatchContainer(this._$root);
    this.updateVisualContainer(this._props.visualContainer);
  }
  updateVisualContainer() {
    var visualContainer = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._props.visualContainer;
    this._props.visualContainer = visualContainer;
    this._$visualContainer = this._getVisualContainer();
  }
  detectVisualPositionChange(event) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(event);
  }
  positionContent() {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      move(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  }
  positionWrapper() {
    if (this._$visualContainer) {
      position_default.setup(this._$wrapper, {
        my: "top left",
        at: "top left",
        of: this._$visualContainer
      });
    }
  }
  styleWrapperPosition() {
    var useFixed = isWindow(this.$visualContainer.get(0)) || this._props._fixWrapperPosition;
    var positionStyle = useFixed ? "fixed" : "absolute";
    this._$wrapper.css("position", positionStyle);
  }
  _updateVisualPositionValue() {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = locate(this._$content);
  }
  _renderContentInitialPosition() {
    this._renderBoundaryOffset();
    resetPosition(this._$content);
    var wrapperOverflow = this._$wrapper.css("overflow");
    this._$wrapper.css("overflow", "hidden");
    if (!this._props._skipContentPositioning) {
      var resultPosition = position_default.setup(this._$content, this._position);
      this._initialPosition = resultPosition;
    }
    this._$wrapper.css("overflow", wrapperOverflow);
    this.detectVisualPositionChange();
  }
  _raisePositionedEvents(event) {
    var previousPosition = this._previousVisualPosition;
    var newPosition = this._visualPosition;
    var isVisualPositionChanged = (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.top) !== newPosition.top || (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.left) !== newPosition.left;
    if (isVisualPositionChanged) {
      this._props.onVisualPositionChanged({
        previousPosition,
        position: newPosition,
        event
      });
    }
    this._props.onPositioned({
      position: this._initialPosition
    });
  }
  _renderBoundaryOffset() {
    var _a;
    var boundaryOffset = null !== (_a = this._position) && void 0 !== _a ? _a : {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    this._$content.css("margin", "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"));
  }
  _getVisualContainer() {
    var _a, _b;
    var containerProp = this._props.container;
    var visualContainerProp = this._props.visualContainer;
    var positionOf = isEvent(null === (_a = this._props.position) || void 0 === _a ? void 0 : _a.of) ? this._props.position.of.target : null === (_b = this._props.position) || void 0 === _b ? void 0 : _b.of;
    if (visualContainerProp) {
      return renderer_default(visualContainerProp);
    }
    if (containerProp) {
      return renderer_default(containerProp);
    }
    if (positionOf) {
      return renderer_default(positionOf);
    }
    return renderer_default(window12);
  }
  _normalizePosition(positionProp) {
    var defaultPositionConfig = {
      boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
    };
    if (isDefined(positionProp)) {
      return extend(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
    }
    return defaultPositionConfig;
  }
  _positionToObject(position2) {
    if (isString(position2)) {
      return extend({}, OVERLAY_POSITION_ALIASES[position2]);
    }
    return position2;
  }
};

// node_modules/devextreme/esm/__internal/ui/overlay/m_z_index.js
var baseZIndex = 1500;
var zIndexStack = [];
var base = (ZIndex) => {
  baseZIndex = ensureDefined(ZIndex, baseZIndex);
  return baseZIndex;
};
var create = function() {
  var baseIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : baseZIndex;
  var {
    length
  } = zIndexStack;
  var index2 = (length ? zIndexStack[length - 1] : baseIndex) + 1;
  zIndexStack.push(index2);
  return index2;
};
var remove = (zIndex) => {
  var position2 = zIndexStack.indexOf(zIndex);
  if (position2 >= 0) {
    zIndexStack.splice(position2, 1);
  }
};
var isLastZIndexInStack = (zIndex) => zIndexStack.length && zIndexStack[zIndexStack.length - 1] === zIndex;

// node_modules/devextreme/esm/__internal/ui/overlay/m_overlay.js
var ready4 = ready_callbacks_default.add;
var window13 = getWindow();
var viewPortChanged2 = changeCallback;
var OVERLAY_CLASS = "dx-overlay";
var OVERLAY_WRAPPER_CLASS = "dx-overlay-wrapper";
var OVERLAY_CONTENT_CLASS = "dx-overlay-content";
var OVERLAY_SHADER_CLASS = "dx-overlay-shader";
var INNER_OVERLAY_CLASS = "dx-inner-overlay";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var ANONYMOUS_TEMPLATE_NAME2 = "content";
var RTL_DIRECTION_CLASS = "dx-rtl";
var OVERLAY_STACK = [];
var PREVENT_SAFARI_SCROLLING_CLASS = "dx-prevent-safari-scrolling";
var TAB_KEY = "tab";
ready4(() => {
  events_engine_default.subscribeGlobal(dom_adapter_default.getDocument(), pointer_default.down, (e) => {
    for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
      if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var Overlay = ui_widget_default.inherit({
  _supportedKeys() {
    return extend(this.callBase(), {
      escape() {
        this.hide();
      }
    });
  },
  _getDefaultOptions() {
    return extend(this.callBase(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: "",
      wrapperAttr: {},
      width: "80vw",
      minWidth: null,
      maxWidth: null,
      height: "80vh",
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: "pop",
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: "pop",
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      closeOnOutsideClick: false,
      hideOnOutsideClick: false,
      copyRootClassesToWrapper: false,
      _ignoreCopyRootClassesToWrapperDeprecation: false,
      _ignoreElementAttrDeprecation: false,
      _ignorePreventScrollEventsDeprecation: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: "content",
      innerOverlay: false,
      restorePosition: true,
      container: void 0,
      visualContainer: void 0,
      hideTopOverlayHandler: () => {
        this.hide();
      },
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _hideOnParentScrollTarget: void 0,
      _fixWrapperPosition: false
    });
  },
  _defaultOptionsRules() {
    return this.callBase().concat([{
      device: () => !hasWindow(),
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }]);
  },
  _setOptionsByReference() {
    this.callBase();
    extend(this._optionsByReference, {
      animation: true
    });
  },
  $wrapper() {
    return this._$wrapper;
  },
  _eventBindingTarget() {
    return this._$content;
  },
  _setDeprecatedOptions() {
    this.callBase();
    extend(this._deprecatedOptions, {
      closeOnOutsideClick: {
        since: "22.1",
        alias: "hideOnOutsideClick"
      }
    });
  },
  ctor(element, options) {
    this.callBase(element, options);
    if (options) {
      if (options.copyRootClassesToWrapper && !options._ignoreCopyRootClassesToWrapperDeprecation) {
        this._logDeprecatedOptionWarning("copyRootClassesToWrapper", {
          since: "21.2",
          message: 'Use the "wrapperAttr" option instead'
        });
      }
      if (options.elementAttr && !options._ignoreElementAttrDeprecation) {
        this._logDeprecatedOptionWarning("elementAttr", {
          since: "21.2",
          message: 'Use the "wrapperAttr" option instead'
        });
      }
      if ("preventScrollEvents" in options && !options._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  },
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning("preventScrollEvents", {
      since: "23.1",
      message: "If you enable this option, end-users may experience scrolling issues."
    });
  },
  _init() {
    this.callBase();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = renderer_default("<div>").addClass(OVERLAY_WRAPPER_CLASS);
    this._$content = renderer_default("<div>").addClass(OVERLAY_CONTENT_CLASS);
    this._initInnerOverlayClass();
    var $element = this.$element();
    if (this.option("copyRootClassesToWrapper")) {
      this._$wrapper.addClass($element.attr("class"));
    }
    $element.addClass(OVERLAY_CLASS);
    this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
    this._toggleViewPortSubscription(true);
    this._initHideTopOverlayHandler(this.option("hideTopOverlayHandler"));
    this._parentsScrollSubscriptionInfo = {
      handler: (e) => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  },
  warnPositionAsFunction() {
    if (isFunction(this.option("position"))) {
      errors_default.log("W0018");
    }
  },
  _initInnerOverlayClass() {
    this._$content.toggleClass(INNER_OVERLAY_CLASS, this.option("innerOverlay"));
  },
  _initHideTopOverlayHandler(handler) {
    this._hideTopOverlayHandler = handler;
  },
  _getActionsList: () => ["onShowing", "onShown", "onHiding", "onHidden", "onPositioned", "onVisualPositionChanged"],
  _initActions() {
    this._actions = {};
    var actions = this._getActionsList();
    each(actions, (_, action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ["disabled", "readOnly"]
      }) || noop2;
    });
  },
  _initHideOnOutsideClickHandler() {
    var _this = this;
    this._proxiedDocumentDownHandler = function() {
      return _this._documentDownHandler(...arguments);
    };
  },
  _initMarkup() {
    this.callBase();
    this._renderWrapperAttributes();
    this._initPositionController();
  },
  _documentDownHandler(e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    var isAttachedTarget = renderer_default(window13.document).is(e.target) || contains2(window13.document, e.target);
    var isInnerOverlay = renderer_default(e.target).closest(".".concat(INNER_OVERLAY_CLASS)).length;
    var outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || contains2(this._$content.get(0), e.target));
    if (outsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    return this.option("propagateOutsideClick");
  },
  _shouldHideOnOutsideClick(e) {
    var {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  },
  _outsideClickHandler(e) {
    if (this.option("shading")) {
      e.preventDefault();
    }
    this.hide();
  },
  _getAnonymousTemplateName: () => ANONYMOUS_TEMPLATE_NAME2,
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new EmptyTemplate()
    });
    this.callBase();
  },
  _isTopOverlay() {
    var overlayStack = this._overlayStack();
    for (var i = overlayStack.length - 1; i >= 0; i--) {
      var tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.first || tabbableElements.last) {
        return overlayStack[i] === this;
      }
    }
    return false;
  },
  _overlayStack: () => OVERLAY_STACK,
  _zIndexInitValue: () => Overlay.baseZIndex(),
  _toggleViewPortSubscription(toggle) {
    var _this2 = this;
    viewPortChanged2.remove(this._viewPortChangeHandle);
    if (toggle) {
      this._viewPortChangeHandle = function() {
        _this2._viewPortChangeHandler(...arguments);
      };
      viewPortChanged2.add(this._viewPortChangeHandle);
    }
  },
  _viewPortChangeHandler() {
    this._positionController.updateContainer(this.option("container"));
    this._refresh();
  },
  _renderWrapperAttributes() {
    var {
      wrapperAttr
    } = this.option();
    var attributes = extend({}, wrapperAttr);
    var classNames = attributes.class;
    delete attributes.class;
    this.$wrapper().attr(attributes).removeClass(this._customWrapperClass).addClass(classNames);
    this._customWrapperClass = classNames;
  },
  _renderVisibilityAnimate(visible2) {
    this._stopAnimation();
    return visible2 ? this._show() : this._hide();
  },
  _getAnimationConfig() {
    return this._getOptionValue("animation", this);
  },
  _toggleBodyScroll: noop2,
  _animateShowing() {
    var _this3 = this;
    var _a, _b, _c;
    var animation2 = null !== (_a = this._getAnimationConfig()) && void 0 !== _a ? _a : {};
    var showAnimation = this._normalizeAnimation(animation2.show, "to");
    var startShowAnimation = null !== (_b = null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.start) && void 0 !== _b ? _b : noop2;
    var completeShowAnimation = null !== (_c = null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.complete) && void 0 !== _c ? _c : noop2;
    this._animate(showAnimation, function() {
      if (_this3._isAnimationPaused) {
        return;
      }
      if (_this3.option("focusStateEnabled")) {
        events_engine_default.trigger(_this3._focusTarget(), "focus");
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      completeShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = false;
      _this3._isHidden = false;
      _this3._actions.onShown();
      _this3._toggleSafariScrolling();
      _this3._showingDeferred.resolve();
    }, function() {
      if (_this3._isAnimationPaused) {
        return;
      }
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      startShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = true;
    });
  },
  _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if (isPromise(cancelArg)) {
      cancelArg.then((shouldCancel) => {
        if (shouldCancel) {
          cancelFunction();
        } else {
          applyFunction();
        }
      }).catch(() => applyFunction());
    } else {
      cancelArg ? cancelFunction() : applyFunction();
    }
  },
  _show() {
    this._showingDeferred = Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      var show = () => {
        this._stopAnimation();
        this._toggleBodyScroll(this.option("enableBodyScroll"));
        this._toggleVisibility(true);
        this._$content.css("visibility", "hidden");
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        var showingArgs = {
          cancel: false
        };
        this._actions.onShowing(showingArgs);
        this._processShowingHidingCancel(showingArgs.cancel, () => {
          this._$content.css("visibility", "");
          this._renderVisibility(true);
          this._animateShowing();
        }, () => {
          this._toggleVisibility(false);
          this._$content.css("visibility", "");
          this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option("visible", false);
          this._showingDeferred.resolve();
        });
      };
      if (this.option("templatesRenderAsynchronously")) {
        this._stopShowTimer();
        this._asyncShowTimeout = setTimeout(show);
      } else {
        show();
      }
    }
    return this._showingDeferred.promise();
  },
  _normalizeAnimation(showHideConfig, direction) {
    if (showHideConfig) {
      showHideConfig = extend({
        type: "slide",
        skipElementInitialStyles: true
      }, showHideConfig);
      if (isObject(showHideConfig[direction])) {
        extend(showHideConfig[direction], {
          position: this._positionController.position
        });
      }
    }
    return showHideConfig;
  },
  _animateHiding() {
    var _this4 = this;
    var _a, _b, _c;
    var animation2 = null !== (_a = this._getAnimationConfig()) && void 0 !== _a ? _a : {};
    var hideAnimation = this._normalizeAnimation(animation2.hide, "from");
    var startHideAnimation = null !== (_b = null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.start) && void 0 !== _b ? _b : noop2;
    var completeHideAnimation = null !== (_c = null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.complete) && void 0 !== _c ? _c : noop2;
    this._animate(hideAnimation, function() {
      var _a2;
      _this4._$content.css("pointerEvents", "");
      _this4._renderVisibility(false);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      completeHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = false;
      null === (_a2 = _this4._actions) || void 0 === _a2 ? void 0 : _a2.onHidden();
      _this4._hidingDeferred.resolve();
    }, function() {
      _this4._$content.css("pointerEvents", "none");
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      startHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = true;
    });
  },
  _hide() {
    if (!this._currentVisible) {
      return Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = Deferred();
    var hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      this._actions.onHiding(hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      this._processShowingHidingCancel(hidingArgs.cancel, () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._stopShowTimer();
        this._animateHiding();
      }, () => {
        this._isHidingActionCanceled = true;
        this._toggleBodyScroll(this.option("enableBodyScroll"));
        this.option("visible", true);
        this._hidingDeferred.resolve();
      });
    }
    return this._hidingDeferred.promise();
  },
  _forceFocusLost() {
    var activeElement = dom_adapter_default.getActiveElement();
    var shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      resetActiveElement();
    }
  },
  _animate(animation2, completeCallback, startCallback) {
    if (animation2) {
      startCallback = startCallback || animation2.start || noop2;
      fx_default.animate(this._$content, extend({}, animation2, {
        start: startCallback,
        complete: completeCallback
      }));
    } else {
      completeCallback();
    }
  },
  _stopAnimation() {
    fx_default.stop(this._$content, true);
  },
  _renderVisibility(visible2) {
    if (visible2 && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible2;
    this._stopAnimation();
    if (!visible2) {
      triggerHidingEvent(this._$content);
    }
    if (visible2) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      triggerShownEvent(this._$content);
      triggerResizeEvent(this._$content);
    } else {
      this._toggleVisibility(visible2);
      this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible2);
      this._updateZIndexStackPosition(visible2);
      this._moveFromContainer();
    }
    this._toggleShading(visible2);
    this._toggleSubscriptions(visible2);
  },
  _updateZIndexStackPosition(pushToStack) {
    var overlayStack = this._overlayStack();
    var index2 = overlayStack.indexOf(this);
    if (pushToStack) {
      if (-1 === index2) {
        this._zIndex = create(this._zIndexInitValue());
        overlayStack.push(this);
      }
      this._$wrapper.css("zIndex", this._zIndex);
      this._$content.css("zIndex", this._zIndex);
    } else if (-1 !== index2) {
      overlayStack.splice(index2, 1);
      remove(this._zIndex);
    }
  },
  _toggleShading(visible2) {
    this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible2 && this.option("shading"));
    this._$wrapper.css("backgroundColor", this.option("shading") ? this.option("shadingColor") : "");
    this._toggleTabTerminator(visible2 && this.option("shading"));
  },
  _initTabTerminatorHandler() {
    var _this5 = this;
    this._proxiedTabTerminatorHandler = function() {
      _this5._tabKeyHandler(...arguments);
    };
  },
  _toggleTabTerminator(enabled) {
    var eventName = addNamespace2("keydown", this.NAME);
    if (enabled) {
      events_engine_default.on(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      events_engine_default.off(dom_adapter_default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    }
  },
  _findTabbableBounds() {
    var $elements = this._$wrapper.find("*");
    var elementsCount = $elements.length - 1;
    var result = {
      first: null,
      last: null
    };
    for (var i = 0; i <= elementsCount; i++) {
      if (!result.first && $elements.eq(i).is(tabbable)) {
        result.first = $elements.eq(i);
      }
      if (!result.last && $elements.eq(elementsCount - i).is(tabbable)) {
        result.last = $elements.eq(elementsCount - i);
      }
      if (result.first && result.last) {
        break;
      }
    }
    return result;
  },
  _tabKeyHandler(e) {
    if (normalizeKeyName(e) !== TAB_KEY || !this._isTopOverlay()) {
      return;
    }
    var tabbableElements = this._findTabbableBounds();
    var $firstTabbable = tabbableElements.first;
    var $lastTabbable = tabbableElements.last;
    var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
    var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
    var isEmptyTabList = 0 === tabbableElements.length;
    var isOutsideTarget = !contains2(this._$wrapper.get(0), e.target);
    if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
      e.preventDefault();
      var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      events_engine_default.trigger($focusElement, "focusin");
      events_engine_default.trigger($focusElement, "focus");
    }
  },
  _toggleSubscriptions(enabled) {
    if (hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  },
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      hideCallback.add(this._hideTopOverlayHandler);
    } else {
      hideCallback.remove(this._hideTopOverlayHandler);
    }
  },
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    var _a;
    var scrollEvent = addNamespace2("scroll", this.NAME);
    var {
      prevTargets,
      handler
    } = null !== (_a = this._parentsScrollSubscriptionInfo) && void 0 !== _a ? _a : {};
    events_engine_default.off(prevTargets, scrollEvent, handler);
    var hideOnScroll = this.option("hideOnParentScroll");
    if (needSubscribe && hideOnScroll) {
      var $parents = this._getHideOnParentScrollTarget().parents();
      if ("desktop" === devices_default.real().deviceType) {
        $parents = $parents.add(window13);
      }
      events_engine_default.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo.prevTargets = $parents;
    }
  },
  _hideOnParentsScrollHandler(e) {
    var hideHandled = false;
    var hideOnScroll = this.option("hideOnParentScroll");
    if (isFunction(hideOnScroll)) {
      hideHandled = hideOnScroll(e);
    }
    if (!hideHandled && !this._showAnimationProcessing) {
      this.hide();
    }
  },
  _getHideOnParentScrollTarget() {
    var $hideOnParentScrollTarget = renderer_default(this.option("_hideOnParentScrollTarget"));
    if ($hideOnParentScrollTarget.length) {
      return $hideOnParentScrollTarget;
    }
    return this._$wrapper;
  },
  _render() {
    this.callBase();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this.option("visible"));
  },
  _appendContentToElement() {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  },
  _renderContent() {
    var shouldDeferRendering = !this._currentVisible && this.option("deferRendering");
    var isParentHidden = this.option("visible") && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    this.callBase();
  },
  _isParentHidden() {
    if (!this.option("_checkParentVisibility")) {
      return false;
    }
    if (void 0 !== this._parentHidden) {
      return this._parentHidden;
    }
    var $parent = this.$element().parent();
    if ($parent.is(":visible")) {
      return false;
    }
    var isHidden = false;
    $parent.add($parent.parents()).each((index2, element) => {
      var $element = renderer_default(element);
      if ("none" === $element.css("display")) {
        isHidden = true;
        return false;
      }
    });
    return isHidden || !dom_adapter_default.getBody().contains($parent.get(0));
  },
  _renderContentImpl() {
    var whenContentRendered = Deferred();
    var contentTemplateOption = this.option("contentTemplate");
    var contentTemplate = this._getTemplate(contentTemplateOption);
    var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    contentTemplate && contentTemplate.render({
      container: getPublicElement(this.$content()),
      noModel: true,
      transclude,
      onRendered: () => {
        whenContentRendered.resolve();
        if (this.option("templatesRenderAsynchronously")) {
          this._dimensionChanged();
        }
      }
    });
    this._toggleWrapperScrollEventsSubscription(this.option("preventScrollEvents"));
    whenContentRendered.done(() => {
      if (this.option("visible")) {
        this._moveToContainer();
      }
    });
    return whenContentRendered.promise();
  },
  _getPositionControllerConfig() {
    var {
      container,
      visualContainer,
      _fixWrapperPosition,
      restorePosition,
      _skipContentPositioning
    } = this.option();
    return {
      container,
      visualContainer,
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper,
      onPositioned: this._actions.onPositioned,
      onVisualPositionChanged: this._actions.onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition,
      _skipContentPositioning
    };
  },
  _initPositionController() {
    this._positionController = new OverlayPositionController(this._getPositionControllerConfig());
  },
  _toggleWrapperScrollEventsSubscription(enabled) {
    var eventName = addNamespace2(DRAG_EVENT, this.NAME);
    events_engine_default.off(this._$wrapper, eventName);
    if (enabled) {
      events_engine_default.on(this._$wrapper, eventName, {
        validate: () => true,
        getDirection: () => "both",
        _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: noop2,
        isNative: true
      }, (e) => {
        var {
          originalEvent
        } = e.originalEvent;
        var {
          type: type2
        } = originalEvent || {};
        var isWheel = "wheel" === type2;
        var isMouseMove = "mousemove" === type2;
        var isScrollByWheel = isWheel && !isCommandKeyPressed(e);
        e._cancelPreventDefault = true;
        if (originalEvent && false !== e.cancelable && (!isMouseMove && !isWheel || isScrollByWheel)) {
          e.preventDefault();
        }
      });
    }
  },
  _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  },
  _checkContainerExists() {
    var $wrapperContainer = this._positionController.$container;
    if (void 0 === $wrapperContainer) {
      return;
    }
    var containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      ui_errors_default.log("W1021", this.NAME);
    }
  },
  _moveToContainer() {
    var $wrapperContainer = this._positionController.$container;
    this._$wrapper.appendTo($wrapperContainer);
    this._$content.appendTo(this._$wrapper);
  },
  _renderGeometry(options) {
    var {
      visible: visible2
    } = this.option();
    if (visible2 && hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  },
  _renderGeometryImpl() {
    this._positionController.updatePosition(this._getOptionValue("position"));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  },
  _renderPosition() {
    this._positionController.positionContent();
  },
  _isAllWindowCovered() {
    return isWindow(this._positionController.$visualContainer.get(0)) && this.option("shading");
  },
  _toggleSafariScrolling() {
    var visible2 = this.option("visible");
    var $body = renderer_default(dom_adapter_default.getBody());
    var isIosSafari = "ios" === devices_default.real().platform && browser_default.safari;
    var isAllWindowCovered = this._isAllWindowCovered();
    var isScrollingPrevented = $body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS);
    var shouldPreventScrolling = !isScrollingPrevented && visible2 && isAllWindowCovered;
    var shouldEnableScrolling = isScrollingPrevented && (!visible2 || !isAllWindowCovered || this._disposed);
    if (isIosSafari) {
      if (shouldEnableScrolling) {
        $body.removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
        window13.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = void 0;
      } else if (shouldPreventScrolling) {
        this._cachedBodyScrollTop = window13.pageYOffset;
        $body.addClass(PREVENT_SAFARI_SCROLLING_CLASS);
      }
    }
  },
  _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  },
  _renderWrapperDimensions() {
    var {
      $visualContainer
    } = this._positionController;
    var documentElement = dom_adapter_default.getDocumentElement();
    var isVisualContainerWindow = isWindow($visualContainer.get(0));
    var wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : getOuterWidth($visualContainer);
    var wrapperHeight = isVisualContainerWindow ? window13.innerHeight : getOuterHeight($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  },
  _renderDimensions() {
    var content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue("minWidth", content),
      maxWidth: this._getOptionValue("maxWidth", content),
      minHeight: this._getOptionValue("minHeight", content),
      maxHeight: this._getOptionValue("maxHeight", content),
      width: this._getOptionValue("width", content),
      height: this._getOptionValue("height", content)
    });
  },
  _focusTarget() {
    return this._$content;
  },
  _attachKeyboardEvents() {
    this._keyboardListenerId = keyboard.on(this._$content, null, (opts) => this._keyboardHandler(opts));
  },
  _keyboardHandler(options) {
    var e = options.originalEvent;
    var $target = renderer_default(e.target);
    if ($target.is(this._$content) || !this.option("ignoreChildEvents")) {
      this.callBase(...arguments);
    }
  },
  _isVisible() {
    return this.option("visible");
  },
  _visibilityChanged(visible2) {
    if (visible2) {
      if (this.option("visible")) {
        this._renderVisibilityAnimate(visible2);
      }
    } else {
      this._renderVisibilityAnimate(visible2);
    }
  },
  _dimensionChanged() {
    this._renderGeometry();
  },
  _clean() {
    var options = this.option();
    if (!this._contentAlreadyRendered && !options.isRenovated) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._stopShowTimer();
    this._cleanFocusState();
  },
  _stopShowTimer() {
    if (this._asyncShowTimeout) {
      clearTimeout(this._asyncShowTimeout);
    }
    this._asyncShowTimeout = null;
  },
  _dispose() {
    fx_default.stop(this._$content, false);
    clearTimeout(this._deferShowTimer);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._toggleTabTerminator(false);
    this._actions = null;
    this._parentsScrollSubscriptionInfo = null;
    this.callBase();
    this._toggleSafariScrolling();
    this.option("visible") && remove(this._zIndex);
    this._$wrapper.remove();
    this._$content.remove();
  },
  _toggleRTLDirection(rtl) {
    this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl);
  },
  _optionChanged(args) {
    var {
      value: value2,
      name
    } = args;
    if (this._getActionsList().includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case "animation":
        break;
      case "shading":
        this._toggleShading(this.option("visible"));
        this._toggleSafariScrolling();
        break;
      case "shadingColor":
        this._toggleShading(this.option("visible"));
        break;
      case "width":
      case "height":
        this._renderGeometry();
        break;
      case "minWidth":
      case "maxWidth":
      case "minHeight":
      case "maxHeight":
        this._renderGeometry();
        break;
      case "position":
        this._positionController.updatePosition(this.option("position"));
        this._positionController.restorePositionOnNextRender(true);
        this._renderGeometry();
        this._toggleSafariScrolling();
        break;
      case "visible":
        this._renderVisibilityAnimate(value2).done(() => {
          var _a;
          return null === (_a = this._animateDeferred) || void 0 === _a ? void 0 : _a.resolveWith(this);
        }).fail(() => {
          var _a;
          return null === (_a = this._animateDeferred) || void 0 === _a ? void 0 : _a.reject();
        });
        break;
      case "container":
        this._positionController.updateContainer(value2);
        this._invalidate();
        this._toggleSafariScrolling();
        break;
      case "visualContainer":
        this._positionController.updateVisualContainer(value2);
        this._renderWrapper();
        this._toggleSafariScrolling();
        break;
      case "innerOverlay":
        this._initInnerOverlayClass();
        break;
      case "deferRendering":
      case "contentTemplate":
        this._contentAlreadyRendered = false;
        this._clean();
        this._invalidate();
        break;
      case "hideTopOverlayHandler":
        this._toggleHideTopOverlayCallback(false);
        this._initHideTopOverlayHandler(value2);
        this._toggleHideTopOverlayCallback(this.option("visible"));
        break;
      case "hideOnParentScroll":
      case "_hideOnParentScrollTarget":
        this._toggleHideOnParentsScrollSubscription(this.option("visible"));
        break;
      case "closeOnOutsideClick":
      case "hideOnOutsideClick":
      case "propagateOutsideClick":
        break;
      case "rtlEnabled":
        this._contentAlreadyRendered = false;
        this.callBase(args);
        break;
      case "_fixWrapperPosition":
        this._positionController.fixWrapperPosition = value2;
        break;
      case "wrapperAttr":
        this._renderWrapperAttributes();
        break;
      case "restorePosition":
        this._positionController.restorePosition = value2;
        break;
      case "preventScrollEvents":
        this._logDeprecatedPreventScrollEventsInfo();
        this._toggleWrapperScrollEventsSubscription(value2);
        break;
      default:
        this.callBase(args);
    }
  },
  toggle(showing) {
    showing = void 0 === showing ? !this.option("visible") : showing;
    var result = Deferred();
    if (showing === this.option("visible")) {
      return result.resolveWith(this, [showing]).promise();
    }
    var animateDeferred = Deferred();
    this._animateDeferred = animateDeferred;
    this.option("visible", showing);
    animateDeferred.promise().done(() => {
      delete this._animateDeferred;
      result.resolveWith(this, [this.option("visible")]);
    }).fail(() => {
      delete this._animateDeferred;
      result.reject();
    });
    return result.promise();
  },
  $content() {
    return this._$content;
  },
  show() {
    return this.toggle(true);
  },
  hide() {
    return this.toggle(false);
  },
  content() {
    return getPublicElement(this._$content);
  },
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      triggerResizeEvent(this._$content);
    } else {
      this.callBase();
    }
  }
});
Overlay.baseZIndex = (zIndex) => base(zIndex);
component_registrator_default("dxOverlay", Overlay);
var m_overlay_default = Overlay;

// node_modules/devextreme/esm/ui/overlay/ui.overlay.js
var ui_overlay_default = m_overlay_default;

// node_modules/devextreme/esm/__internal/ui/m_load_panel.js
var LOADPANEL_CLASS = "dx-loadpanel";
var LOADPANEL_WRAPPER_CLASS = "dx-loadpanel-wrapper";
var LOADPANEL_INDICATOR_CLASS = "dx-loadpanel-indicator";
var LOADPANEL_MESSAGE_CLASS = "dx-loadpanel-message";
var LOADPANEL_CONTENT_CLASS = "dx-loadpanel-content";
var LOADPANEL_CONTENT_WRAPPER_CLASS = "dx-loadpanel-content-wrapper";
var LOADPANEL_PANE_HIDDEN_CLASS = "dx-loadpanel-pane-hidden";
var LoadPanel = ui_overlay_default.inherit({
  _supportedKeys() {
    return extend(this.callBase(), {
      escape: noop2
    });
  },
  _getDefaultOptions() {
    return extend(this.callBase(), {
      message: message_default.format("Loading"),
      width: 222,
      height: 90,
      animation: null,
      showIndicator: true,
      indicatorSrc: "",
      showPane: true,
      delay: 0,
      templatesRenderAsynchronously: false,
      hideTopOverlayHandler: null,
      focusStateEnabled: false,
      propagateOutsideClick: true,
      preventScrollEvents: false
    });
  },
  _defaultOptionsRules() {
    return this.callBase().concat([{
      device: {
        platform: "generic"
      },
      options: {
        shadingColor: "transparent"
      }
    }, {
      device: () => isMaterial(),
      options: {
        message: "",
        width: 60,
        height: 60,
        maxHeight: 60,
        maxWidth: 60
      }
    }, {
      device: () => isFluent(),
      options: {
        width: "auto",
        height: "auto"
      }
    }]);
  },
  _init() {
    this.callBase.apply(this, arguments);
  },
  _render() {
    this.callBase();
    this.$element().addClass(LOADPANEL_CLASS);
    this.$wrapper().addClass(LOADPANEL_WRAPPER_CLASS);
    this._setWrapperAria();
  },
  _setWrapperAria() {
    var {
      message
    } = this.option();
    var defaultLabel = isMaterialBased() ? message : null;
    var label = message ? defaultLabel : message_default.format("Loading");
    var aria = {
      role: "alert",
      label
    };
    this.setAria(aria, this.$wrapper());
  },
  _renderContentImpl() {
    this.callBase();
    this.$content().addClass(LOADPANEL_CONTENT_CLASS);
    this._$loadPanelContentWrapper = renderer_default("<div>").addClass(LOADPANEL_CONTENT_WRAPPER_CLASS);
    this._$loadPanelContentWrapper.appendTo(this.$content());
    this._togglePaneVisible();
    this._cleanPreviousContent();
    this._renderLoadIndicator();
    this._renderMessage();
  },
  _show() {
    var delay = this.option("delay");
    if (!delay) {
      return this.callBase();
    }
    var deferred = Deferred();
    var callBase = this.callBase.bind(this);
    this._clearShowTimeout();
    this._showTimeout = setTimeout(() => {
      callBase().done(() => {
        deferred.resolve();
      });
    }, delay);
    return deferred.promise();
  },
  _hide() {
    this._clearShowTimeout();
    return this.callBase();
  },
  _clearShowTimeout() {
    clearTimeout(this._showTimeout);
  },
  _renderMessage() {
    if (!this._$loadPanelContentWrapper) {
      return;
    }
    var message = this.option("message");
    if (!message) {
      return;
    }
    var $message = renderer_default("<div>").addClass(LOADPANEL_MESSAGE_CLASS).text(message);
    this._$loadPanelContentWrapper.append($message);
  },
  _renderLoadIndicator() {
    if (!this._$loadPanelContentWrapper || !this.option("showIndicator")) {
      return;
    }
    if (!this._$indicator) {
      this._$indicator = renderer_default("<div>").addClass(LOADPANEL_INDICATOR_CLASS).appendTo(this._$loadPanelContentWrapper);
    }
    this._createComponent(this._$indicator, load_indicator_default, {
      indicatorSrc: this.option("indicatorSrc")
    });
  },
  _cleanPreviousContent() {
    this.$content().find(".".concat(LOADPANEL_MESSAGE_CLASS)).remove();
    this.$content().find(".".concat(LOADPANEL_INDICATOR_CLASS)).remove();
    delete this._$indicator;
  },
  _togglePaneVisible() {
    this.$content().toggleClass(LOADPANEL_PANE_HIDDEN_CLASS, !this.option("showPane"));
  },
  _optionChanged(args) {
    switch (args.name) {
      case "delay":
        break;
      case "message":
      case "showIndicator":
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage();
        this._setWrapperAria();
        break;
      case "showPane":
        this._togglePaneVisible();
        break;
      case "indicatorSrc":
        this._renderLoadIndicator();
        break;
      default:
        this.callBase(args);
    }
  },
  _dispose() {
    this._clearShowTimeout();
    this.callBase();
  }
});
component_registrator_default("dxLoadPanel", LoadPanel);
var m_load_panel_default = LoadPanel;

// node_modules/devextreme/esm/ui/load_panel.js
var load_panel_default = m_load_panel_default;

// node_modules/devextreme/esm/data/utils.js
var ready5 = ready_callbacks_default.add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
  return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
var normalizeSortingInfo = function(info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return map(info, function(i) {
    var result = {
      selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
    };
    if (i.compare) {
      result.compare = i.compare;
    }
    return result;
  });
};
var errorMessageFromXhr = function() {
  var textStatusMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
  };
  var unloading;
  ready5(function() {
    var window16 = getWindow();
    dom_adapter_default.listen(window16, "beforeunload", function() {
      unloading = true;
    });
  });
  return function(xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return function(textStatus2) {
        var result = textStatusMessages[textStatus2];
        if (!result) {
          return textStatus2;
        }
        return result;
      }(textStatus);
    }
    return xhr.statusText;
  };
}();
var aggregators = {
  count: {
    seed: 0,
    step: function(count) {
      return 1 + count;
    }
  },
  sum: {
    seed: 0,
    step: function(sum, item) {
      return sum + item;
    }
  },
  min: {
    step: function(min, item) {
      return item < min ? item : min;
    }
  },
  max: {
    step: function(max, item) {
      return item > max ? item : max;
    }
  },
  avg: {
    seed: [0, 0],
    step: function(pair, value2) {
      return [pair[0] + value2, pair[1] + 1];
    },
    finalize: function(pair) {
      return pair[1] ? pair[0] / pair[1] : NaN;
    }
  }
};
var processRequestResultLock = /* @__PURE__ */ function() {
  var lockCount = 0;
  var lockDeferred;
  return {
    obtain: function() {
      if (0 === lockCount) {
        lockDeferred = new Deferred();
      }
      lockCount++;
    },
    release: function() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    },
    promise: function() {
      var deferred = 0 === lockCount ? new Deferred().resolve() : lockDeferred;
      return deferred.promise();
    },
    reset: function() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    }
  };
}();
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
var keysEqual = function(keyExpr, key1, key2) {
  if (Array.isArray(keyExpr)) {
    var names = map(key1, function(v, k) {
      return k;
    });
    var name;
    for (var i = 0; i < names.length; i++) {
      name = names[i];
      if (!equalByValue(key1[name], key2[name], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return equalByValue(key1, key2, {
    strict: false
  });
};
var isUnaryOperation = function(crit) {
  return "!" === crit[0] && Array.isArray(crit[1]);
};
var isGroupOperator = function(value2) {
  return "and" === value2 || "or" === value2;
};
var isUniformEqualsByOr = function(crit) {
  if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
    var [prop] = crit[0];
    return !crit.find((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]);
  }
  return false;
};
var isGroupCriterion = function(crit) {
  var first = crit[0];
  var second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if (isFunction(first)) {
    if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
var trivialPromise = function() {
  var d = new Deferred();
  return d.resolve.apply(d, arguments).promise();
};
var rejectedPromise = function() {
  var d = new Deferred();
  return d.reject.apply(d, arguments).promise();
};
function throttle(func, timeout) {
  var timeoutId;
  return function() {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = void 0;
        func.call(this);
      }, isFunction(timeout) ? timeout() : timeout);
    }
    return timeoutId;
  };
}
function throttleChanges(func, timeout) {
  var cache = [];
  var throttled = throttle(function() {
    func.call(this, cache);
    cache = [];
  }, timeout);
  return function(changes) {
    if (Array.isArray(changes)) {
      cache.push(...changes);
    }
    return throttled.call(this, cache);
  };
}

// node_modules/devextreme/esm/data/errors.js
var errors = error_default(errors_default.ERROR_MESSAGES, {
  E4000: "[DevExpress.data]: {0}",
  E4001: "Unknown aggregating function is detected: '{0}'",
  E4002: "Unsupported OData protocol version is used",
  E4003: "Unknown filter operation is used: {0}",
  E4004: "The thenby() method is called before the sortby() method",
  E4005: "Store requires a key expression for this operation",
  E4006: "ArrayStore 'data' option must be an array",
  E4007: "Compound keys cannot be auto-generated",
  E4008: "Attempt to insert an item with a duplicated key",
  E4009: "Data item cannot be found",
  E4010: "CustomStore does not support creating queries",
  E4011: "Custom Store method is not implemented or is not a function: {0}",
  E4012: "Custom Store method returns an invalid value: {0}",
  E4013: "Local Store requires the 'name' configuration option is specified",
  E4014: "Unknown data type is specified for ODataStore: {0}",
  E4015: "Unknown entity name or alias is used: {0}",
  E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
  E4017: "Keys cannot be modified",
  E4018: "The server has returned a non-numeric value in a response to an item count request",
  E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
  E4020: "Unknown store type is detected: {0}",
  E4021: "The server response does not provide the totalCount value",
  E4022: "The server response does not provide the groupCount value",
  E4023: "Could not parse the following XML: {0}",
  E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
  W4000: "Data returned from the server has an incorrect structure",
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
  var _errorHandler;
  null === (_errorHandler = errorHandler) || void 0 === _errorHandler ? void 0 : _errorHandler(error);
};

// node_modules/devextreme/esm/data/array_query.js
var Iterator = class_default.inherit({
  toArray: function() {
    var result = [];
    this.reset();
    while (this.next()) {
      result.push(this.current());
    }
    return result;
  },
  countable: function() {
    return false;
  }
});
var ArrayIterator = Iterator.inherit({
  ctor: function(array) {
    this.array = array;
    this.index = -1;
  },
  next: function() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      return true;
    }
    return false;
  },
  current: function() {
    return this.array[this.index];
  },
  reset: function() {
    this.index = -1;
  },
  toArray: function() {
    return this.array.slice(0);
  },
  countable: function() {
    return true;
  },
  count: function() {
    return this.array.length;
  }
});
var WrappedIterator = Iterator.inherit({
  ctor: function(iter) {
    this.iter = iter;
  },
  next: function() {
    return this.iter.next();
  },
  current: function() {
    return this.iter.current();
  },
  reset: function() {
    return this.iter.reset();
  }
});
var MapIterator = WrappedIterator.inherit({
  ctor: function(iter, mapper) {
    this.callBase(iter);
    this.index = -1;
    this.mapper = mapper;
  },
  current: function() {
    return this.mapper(this.callBase(), this.index);
  },
  next: function() {
    var hasNext = this.callBase();
    if (hasNext) {
      this.index++;
    }
    return hasNext;
  }
});
var defaultCompare = function(xValue, yValue, options) {
  if (isString(xValue) && isString(yValue) && (null !== options && void 0 !== options && options.locale || null !== options && void 0 !== options && options.collatorOptions)) {
    return new Intl.Collator((null === options || void 0 === options ? void 0 : options.locale) || void 0, (null === options || void 0 === options ? void 0 : options.collatorOptions) || void 0).compare(xValue, yValue);
  }
  xValue = toComparable(xValue, false, options);
  yValue = toComparable(yValue, false, options);
  if (null === xValue && null !== yValue) {
    return -1;
  }
  if (null !== xValue && null === yValue) {
    return 1;
  }
  if (void 0 === xValue && void 0 !== yValue) {
    return 1;
  }
  if (void 0 !== xValue && void 0 === yValue) {
    return -1;
  }
  if (xValue < yValue) {
    return -1;
  }
  if (xValue > yValue) {
    return 1;
  }
  return 0;
};
var SortIterator = Iterator.inherit({
  ctor: function(iter, getter, desc, compare2) {
    this.langParams = iter.langParams;
    if (!(iter instanceof MapIterator)) {
      iter = new MapIterator(iter, this._wrap);
      iter.langParams = this.langParams;
    }
    this.iter = iter;
    this.rules = [{
      getter,
      desc,
      compare: compare2,
      langParams: this.langParams
    }];
  },
  thenBy: function(getter, desc, compare2) {
    var result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare2);
    if (!this.sortedIter) {
      result.rules = this.rules.concat(result.rules);
    }
    return result;
  },
  next: function() {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current: function() {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset: function() {
    delete this.sortedIter;
  },
  countable: function() {
    return this.sortedIter || this.iter.countable();
  },
  count: function() {
    if (this.sortedIter) {
      return this.sortedIter.count();
    }
    return this.iter.count();
  },
  _ensureSorted: function() {
    var that = this;
    if (that.sortedIter) {
      return;
    }
    each(that.rules, function() {
      this.getter = compileGetter(this.getter);
    });
    that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort(function(x, y) {
      return that._compare(x, y);
    })), that._unwrap);
  },
  _wrap: function(record, index2) {
    return {
      index: index2,
      value: record
    };
  },
  _unwrap: function(wrappedItem) {
    return wrappedItem.value;
  },
  _getDefaultCompare: (langParams) => (xValue, yValue) => defaultCompare(xValue, yValue, langParams),
  _compare: function(x, y) {
    var xIndex = x.index;
    var yIndex = y.index;
    x = x.value;
    y = y.value;
    if (x === y) {
      return xIndex - yIndex;
    }
    for (var i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
      var rule = this.rules[i];
      var xValue = rule.getter(x);
      var yValue = rule.getter(y);
      var compare2 = rule.compare || this._getDefaultCompare(rule.langParams);
      var compareResult = compare2(xValue, yValue);
      if (compareResult) {
        return rule.desc ? -compareResult : compareResult;
      }
    }
    return xIndex - yIndex;
  }
});
var compileCriteria = /* @__PURE__ */ function() {
  var langParams = {};
  var _toComparable = (value2) => toComparable(value2, false, langParams);
  var compileGroup = function(crit) {
    if (isUniformEqualsByOr(crit)) {
      return ((crit2) => {
        var getter = compileGetter(crit2[0][0]);
        var filterValues = crit2.reduce((acc, item, i) => {
          if (i % 2 === 0) {
            acc.push(_toComparable(item[2]));
          }
          return acc;
        }, []);
        return (obj) => {
          var value2 = _toComparable(getter(obj));
          return filterValues.some((filterValue) => useStrictComparison(filterValue) ? value2 === filterValue : value2 == filterValue);
        };
      })(crit);
    }
    var ops = [];
    var isConjunctiveOperator2 = false;
    var isConjunctiveNextOperator = false;
    each(crit, function() {
      if (Array.isArray(this) || isFunction(this)) {
        if (ops.length > 1 && isConjunctiveOperator2 !== isConjunctiveNextOperator) {
          throw new errors.Error("E4019");
        }
        ops.push(compileCriteria(this, langParams));
        isConjunctiveOperator2 = isConjunctiveNextOperator;
        isConjunctiveNextOperator = true;
      } else {
        isConjunctiveNextOperator = isConjunctiveOperator(this);
      }
    });
    return function(d) {
      var result = isConjunctiveOperator2;
      for (var i = 0; i < ops.length; i++) {
        if (ops[i](d) !== isConjunctiveOperator2) {
          result = !isConjunctiveOperator2;
          break;
        }
      }
      return result;
    };
  };
  var toString = function(value2) {
    var _langParams;
    return isDefined(value2) ? null !== (_langParams = langParams) && void 0 !== _langParams && _langParams.locale ? value2.toLocaleString(langParams.locale) : value2.toString() : "";
  };
  function compileEquals(getter, value2, negate) {
    return function(obj) {
      obj = _toComparable(getter(obj));
      var result = useStrictComparison(value2) ? obj === value2 : obj == value2;
      if (negate) {
        result = !result;
      }
      return result;
    };
  }
  function useStrictComparison(value2) {
    return "" === value2 || 0 === value2 || false === value2;
  }
  return function(crit, options) {
    langParams = options || {};
    if (isFunction(crit)) {
      return crit;
    }
    if (isGroupCriterion(crit)) {
      return compileGroup(crit);
    }
    if (isUnaryOperation(crit)) {
      return function(crit2) {
        var op = crit2[0];
        var criteria = compileCriteria(crit2[1], langParams);
        if ("!" === op) {
          return function(obj) {
            return !criteria(obj);
          };
        }
        throw errors.Error("E4003", op);
      }(crit);
    }
    return function(crit2) {
      crit2 = normalizeBinaryCriterion(crit2);
      var getter = compileGetter(crit2[0]);
      var op = crit2[1];
      var value2 = crit2[2];
      value2 = _toComparable(value2);
      var compare2 = (obj, operatorFn) => {
        obj = _toComparable(getter(obj));
        return (null == value2 || null == obj) && value2 !== obj ? false : operatorFn(obj, value2);
      };
      switch (op.toLowerCase()) {
        case "=":
          return compileEquals(getter, value2);
        case "<>":
          return compileEquals(getter, value2, true);
        case ">":
          return (obj) => compare2(obj, (a, b) => a > b);
        case "<":
          return (obj) => compare2(obj, (a, b) => a < b);
        case ">=":
          return (obj) => compare2(obj, (a, b) => a >= b);
        case "<=":
          return (obj) => compare2(obj, (a, b) => a <= b);
        case "startswith":
          return function(obj) {
            return 0 === _toComparable(toString(getter(obj))).indexOf(value2);
          };
        case "endswith":
          return function(obj) {
            var getterValue = _toComparable(toString(getter(obj)));
            var searchValue = toString(value2);
            if (getterValue.length < searchValue.length) {
              return false;
            }
            var index2 = getterValue.lastIndexOf(value2);
            return -1 !== index2 && index2 === getterValue.length - value2.length;
          };
        case "contains":
          return function(obj) {
            return _toComparable(toString(getter(obj))).indexOf(value2) > -1;
          };
        case "notcontains":
          return function(obj) {
            return -1 === _toComparable(toString(getter(obj))).indexOf(value2);
          };
      }
      throw errors.Error("E4003", op);
    }(crit);
  };
}();
var FilterIterator = WrappedIterator.inherit({
  ctor: function(iter, criteria) {
    this.callBase(iter);
    this.langParams = iter.langParams;
    this.criteria = compileCriteria(criteria, this.langParams);
  },
  next: function() {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var GroupIterator = Iterator.inherit({
  ctor: function(iter, getter) {
    this.iter = iter;
    this.getter = getter;
  },
  next: function() {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current: function() {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset: function() {
    delete this.groupedIter;
  },
  countable: function() {
    return !!this.groupedIter;
  },
  count: function() {
    return this.groupedIter.count();
  },
  _ensureGrouped: function() {
    if (this.groupedIter) {
      return;
    }
    var hash = {};
    var keys = [];
    var iter = this.iter;
    var getter = compileGetter(this.getter);
    iter.reset();
    while (iter.next()) {
      var current2 = iter.current();
      var key = getter(current2);
      if (key in hash) {
        hash[key].push(current2);
      } else {
        hash[key] = [current2];
        keys.push(key);
      }
    }
    this.groupedIter = new ArrayIterator(map(keys, function(key2) {
      return {
        key: key2,
        items: hash[key2]
      };
    }));
  }
});
var SelectIterator = WrappedIterator.inherit({
  ctor: function(iter, getter) {
    this.callBase(iter);
    this.getter = compileGetter(getter);
  },
  current: function() {
    return this.getter(this.callBase());
  },
  countable: function() {
    return this.iter.countable();
  },
  count: function() {
    return this.iter.count();
  }
});
var SliceIterator = WrappedIterator.inherit({
  ctor: function(iter, skip, take) {
    this.callBase(iter);
    this.skip = Math.max(0, skip);
    this.take = Math.max(0, take);
    this.pos = 0;
  },
  next: function() {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset: function() {
    this.callBase();
    this.pos = 0;
  },
  countable: function() {
    return this.iter.countable();
  },
  count: function() {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var arrayQueryImpl = function arrayQueryImpl2(iter, queryOptions) {
  queryOptions = queryOptions || {};
  if (!(iter instanceof Iterator)) {
    iter = new ArrayIterator(iter);
  }
  if (queryOptions.langParams) {
    iter.langParams = queryOptions.langParams;
  }
  var handleError2 = function(error) {
    var handler = queryOptions.errorHandler;
    if (handler) {
      handler(error);
    }
    handleError(error);
  };
  var aggregateCore = function(aggregator) {
    var d = new Deferred().fail(handleError2);
    var seed;
    var step = aggregator.step;
    var finalize = aggregator.finalize;
    try {
      iter.reset();
      if ("seed" in aggregator) {
        seed = aggregator.seed;
      } else {
        seed = iter.next() ? iter.current() : NaN;
      }
      var accumulator = seed;
      while (iter.next()) {
        accumulator = step(accumulator, iter.current());
      }
      d.resolve(finalize ? finalize(accumulator) : accumulator);
    } catch (x) {
      d.reject(x);
    }
    return d.promise();
  };
  var standardAggregate = function(name) {
    return aggregateCore(aggregators[name]);
  };
  var select = function(getter) {
    if (!isFunction(getter) && !Array.isArray(getter)) {
      getter = [].slice.call(arguments);
    }
    return chainQuery(new SelectIterator(iter, getter));
  };
  var selectProp = function(name) {
    return select(compileGetter(name));
  };
  function chainQuery(iter2) {
    return arrayQueryImpl2(iter2, queryOptions);
  }
  return {
    toArray: function() {
      return iter.toArray();
    },
    enumerate: function() {
      var d = new Deferred().fail(handleError2);
      try {
        d.resolve(iter.toArray());
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    },
    setLangParams(options) {
      iter.langParams = options;
    },
    sortBy: function(getter, desc, compare2) {
      return chainQuery(new SortIterator(iter, getter, desc, compare2));
    },
    thenBy: function(getter, desc, compare2) {
      if (iter instanceof SortIterator) {
        return chainQuery(iter.thenBy(getter, desc, compare2));
      }
      throw errors.Error("E4004");
    },
    filter: function(criteria) {
      if (!Array.isArray(criteria)) {
        criteria = [].slice.call(arguments);
      }
      return chainQuery(new FilterIterator(iter, criteria));
    },
    slice: function(skip, take) {
      if (void 0 === take) {
        take = Number.MAX_VALUE;
      }
      return chainQuery(new SliceIterator(iter, skip, take));
    },
    select,
    groupBy: function(getter) {
      return chainQuery(new GroupIterator(iter, getter));
    },
    aggregate: function(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed,
        step,
        finalize
      });
    },
    count: function() {
      if (iter.countable()) {
        var d = new Deferred().fail(handleError2);
        try {
          d.resolve(iter.count());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      }
      return standardAggregate("count");
    },
    sum: function(getter) {
      if (getter) {
        return selectProp(getter).sum();
      }
      return standardAggregate("sum");
    },
    min: function(getter) {
      if (getter) {
        return selectProp(getter).min();
      }
      return standardAggregate("min");
    },
    max: function(getter) {
      if (getter) {
        return selectProp(getter).max();
      }
      return standardAggregate("max");
    },
    avg: function(getter) {
      if (getter) {
        return selectProp(getter).avg();
      }
      return standardAggregate("avg");
    }
  };
};
var array_query_default = arrayQueryImpl;

// node_modules/devextreme/esm/data/store_helper.js
function multiLevelGroup(query2, groupInfo) {
  query2 = query2.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query2 = query2.select(function(g) {
      return extend({}, g, {
        items: multiLevelGroup(array_query_default(g.items), groupInfo.slice(1)).toArray()
      });
    });
  }
  return query2;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  var filteredGroup = [];
  each(groupInfo, function(_, group) {
    var collision = grep(sortInfo, function(sort) {
      return group.selector === sort.selector;
    });
    if (collision.length < 1) {
      filteredGroup.push(group);
    }
  });
  return filteredGroup.concat(sortInfo);
}
function queryByOptions(query2, options, isCountQuery) {
  var _options;
  options = options || {};
  var filter = options.filter;
  if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
    var _query$setLangParams, _query;
    null === (_query$setLangParams = (_query = query2).setLangParams) || void 0 === _query$setLangParams ? void 0 : _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query2 = query2.filter(filter);
  }
  if (isCountQuery) {
    return query2;
  }
  var sort = options.sort;
  var select = options.select;
  var group = options.group;
  var skip = options.skip;
  var take = options.take;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, function(index2) {
      query2 = query2[index2 ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
    });
  }
  if (select) {
    query2 = query2.select(select);
  }
  if (group) {
    query2 = multiLevelGroup(query2, group);
  }
  if (take || skip) {
    query2 = query2.slice(skip || 0, take);
  }
  return query2;
}
var store_helper_default = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};

// node_modules/devextreme/esm/data/query_adapters.js
var query_adapters_default = {};

// node_modules/devextreme/esm/data/remote_query.js
var remoteQueryImpl = function remoteQueryImpl2(url, queryOptions, tasks) {
  tasks = tasks || [];
  queryOptions = queryOptions || {};
  var createTask = function(name, args) {
    return {
      name,
      args
    };
  };
  var exec = function(executorTask) {
    var d = new Deferred();
    var _adapterFactory;
    var _adapter;
    var _taskQueue;
    var _currentTask;
    var _mergedSortArgs;
    var rejectWithNotify = function(error) {
      var handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      handleError(error);
      d.reject(error);
    };
    function mergeSortTask(task) {
      switch (task.name) {
        case "sortBy":
          _mergedSortArgs = [task.args];
          return true;
        case "thenBy":
          if (!_mergedSortArgs) {
            throw errors.Error("E4004");
          }
          _mergedSortArgs.push(task.args);
          return true;
      }
      return false;
    }
    try {
      _adapterFactory = queryOptions.adapter;
      if (!isFunction(_adapterFactory)) {
        _adapterFactory = query_adapters_default[_adapterFactory];
      }
      _adapter = _adapterFactory(queryOptions);
      _taskQueue = [].concat(tasks).concat(executorTask);
      var optimize = _adapter.optimize;
      if (optimize) {
        optimize(_taskQueue);
      }
      while (_taskQueue.length) {
        _currentTask = _taskQueue[0];
        if (!mergeSortTask(_currentTask)) {
          if (_mergedSortArgs) {
            _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
            _mergedSortArgs = null;
            continue;
          }
          if ("enumerate" !== String(_currentTask.name)) {
            if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
              break;
            }
          }
        }
        _taskQueue.shift();
      }
      !function() {
        var head = _taskQueue[0];
        var unmergedTasks = [];
        if (head && "multiSort" === head.name) {
          _taskQueue.shift();
          each(head.args[0], function() {
            unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this));
          });
        }
        _taskQueue = unmergedTasks.concat(_taskQueue);
      }();
      _adapter.exec(url).done(function(result, extra) {
        if (!_taskQueue.length) {
          d.resolve(result, extra);
        } else {
          var clientChain = array_query_default(result, {
            errorHandler: queryOptions.errorHandler
          });
          each(_taskQueue, function() {
            clientChain = clientChain[this.name].apply(clientChain, this.args);
          });
          clientChain.done(d.resolve).fail(d.reject);
        }
      }).fail(rejectWithNotify);
    } catch (x) {
      rejectWithNotify(x);
    }
    return d.promise();
  };
  var query2 = {};
  each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
    var name = String(this);
    query2[name] = function() {
      return remoteQueryImpl2(url, queryOptions, tasks.concat(createTask(name, arguments)));
    };
  });
  each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
    var name = String(this);
    query2[name] = function() {
      return exec.call(this, createTask(name, arguments));
    };
  });
  return query2;
};
var remote_query_default = remoteQueryImpl;

// node_modules/devextreme/esm/data/query_implementation.js
var queryImpl = {
  array: array_query_default,
  remote: remote_query_default
};

// node_modules/devextreme/esm/data/query.js
var query = function() {
  var impl = Array.isArray(arguments[0]) ? "array" : "remote";
  return queryImpl[impl].apply(this, arguments);
};
var query_default = query;

// node_modules/devextreme/esm/data/array_utils.js
function hasKey(target, keyOrKeys) {
  var key;
  var keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
  while (keys.length) {
    key = keys.shift();
    if (key in target) {
      return true;
    }
  }
  return false;
}
function findItems(keyInfo, items, key, groupCount) {
  var childItems;
  var result;
  if (groupCount) {
    for (var i = 0; i < items.length; i++) {
      childItems = items[i].items || items[i].collapsedItems || [];
      result = findItems(keyInfo, childItems || [], key, groupCount - 1);
      if (result) {
        return result;
      }
    }
  } else if (indexByKey(keyInfo, items, key) >= 0) {
    return items;
  }
}
function getItems(keyInfo, items, key, groupCount) {
  if (groupCount) {
    return findItems(keyInfo, items, key, groupCount) || [];
  }
  return items;
}
function generateDataByKeyMap(keyInfo, array) {
  if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
    var dataByKeyMap = {};
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
      dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i];
    }
    array._dataByKeyMap = dataByKeyMap;
    array._dataByKeyMapLength = arrayLength;
  }
}
function getCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
}
function getHasKeyCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
  return true;
}
function setDataByKeyMapValue(array, key, data2) {
  if (array._dataByKeyMap) {
    array._dataByKeyMap[JSON.stringify(key)] = data2;
    array._dataByKeyMapLength += data2 ? 1 : -1;
  }
}
function cloneInstanceWithChangedPaths(instance, changes, clonedInstances) {
  clonedInstances = clonedInstances || /* @__PURE__ */ new WeakMap();
  var result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
  if (instance) {
    clonedInstances.set(instance, result);
  }
  var instanceWithoutPrototype = _extends({}, instance);
  deepExtendArraySafe(result, instanceWithoutPrototype, true, true);
  for (var name in instanceWithoutPrototype) {
    var value2 = instanceWithoutPrototype[name];
    var change = null === changes || void 0 === changes ? void 0 : changes[name];
    if (isObject(value2) && !isPlainObject(value2) && isObject(change) && !clonedInstances.has(value2)) {
      result[name] = cloneInstanceWithChangedPaths(value2, change, clonedInstances);
    }
  }
  for (var _name in result) {
    var prop = result[_name];
    if (isObject(prop) && clonedInstances.has(prop)) {
      result[_name] = clonedInstances.get(prop);
    }
  }
  return result;
}
function createObjectWithChanges(target, changes) {
  var result = cloneInstanceWithChangedPaths(target, changes);
  return deepExtendArraySafe(result, changes, true, true);
}
function applyBatch(_ref) {
  var {
    keyInfo,
    data: data2,
    changes,
    groupCount,
    useInsertIndex,
    immutable,
    disableCache,
    logError,
    skipCopying
  } = _ref;
  var resultItems = true === immutable ? [...data2] : data2;
  changes.forEach((item) => {
    var items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
    !disableCache && generateDataByKeyMap(keyInfo, items);
    switch (item.type) {
      case "update":
        update(keyInfo, items, item.key, item.data, true, immutable, logError);
        break;
      case "insert":
        insert(keyInfo, items, item.data, useInsertIndex && isDefined(item.index) ? item.index : -1, true, logError, skipCopying);
        break;
      case "remove":
        remove2(keyInfo, items, item.key, true, logError);
    }
  });
  return resultItems;
}
function getErrorResult(isBatch, logError, errorCode) {
  return !isBatch ? rejectedPromise(errors.Error(errorCode)) : logError && errors.log(errorCode);
}
function update(keyInfo, array, key, data2, isBatch, immutable, logError) {
  var target;
  var keyExpr = keyInfo.key();
  if (keyExpr) {
    if (hasKey(data2, keyExpr) && !keysEqual(keyExpr, key, keyInfo.keyOf(data2))) {
      return getErrorResult(isBatch, logError, "E4017");
    }
    target = getCacheValue(array, key);
    if (!target) {
      var index2 = indexByKey(keyInfo, array, key);
      if (index2 < 0) {
        return getErrorResult(isBatch, logError, "E4009");
      }
      target = array[index2];
      if (true === immutable && isDefined(target)) {
        var newTarget = createObjectWithChanges(target, data2);
        array[index2] = newTarget;
        return !isBatch && trivialPromise(newTarget, key);
      }
    }
  } else {
    target = key;
  }
  deepExtendArraySafe(target, data2, true);
  if (!isBatch) {
    if (config_default().useLegacyStoreResult) {
      return trivialPromise(key, data2);
    } else {
      return trivialPromise(target, key);
    }
  }
}
function insert(keyInfo, array, data2, index2, isBatch, logError, skipCopying) {
  var keyValue;
  var keyExpr = keyInfo.key();
  var obj = isPlainObject(data2) && !skipCopying ? extend({}, data2) : data2;
  if (keyExpr) {
    keyValue = keyInfo.keyOf(obj);
    if (void 0 === keyValue || "object" === typeof keyValue && isEmptyObject(keyValue)) {
      if (Array.isArray(keyExpr)) {
        throw errors.Error("E4007");
      }
      keyValue = obj[keyExpr] = String(new guid_default());
    } else if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
      return getErrorResult(isBatch, logError, "E4008");
    }
  } else {
    keyValue = obj;
  }
  if (index2 >= 0) {
    array.splice(index2, 0, obj);
  } else {
    array.push(obj);
  }
  setDataByKeyMapValue(array, keyValue, obj);
  if (!isBatch) {
    return trivialPromise(config_default().useLegacyStoreResult ? data2 : obj, keyValue);
  }
}
function remove2(keyInfo, array, key, isBatch, logError) {
  var index2 = indexByKey(keyInfo, array, key);
  if (index2 > -1) {
    array.splice(index2, 1);
    setDataByKeyMapValue(array, key, null);
  }
  if (!isBatch) {
    return trivialPromise(key);
  } else if (index2 < 0) {
    return getErrorResult(isBatch, logError, "E4009");
  }
}
function indexByKey(keyInfo, array, key) {
  var keyExpr = keyInfo.key();
  if (!getHasKeyCacheValue(array, key)) {
    return -1;
  }
  for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
    if (keysEqual(keyExpr, keyInfo.keyOf(array[i]), key)) {
      return i;
    }
  }
  return -1;
}

// node_modules/devextreme/esm/data/abstract_store.js
var abstract3 = class_default.abstract;
var queryByOptions2 = store_helper_default.queryByOptions;
var storeImpl = {};
var Store = class_default.inherit({
  _langParams: {},
  ctor: function(options) {
    var that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], function(_, optionName) {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    });
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: noop2,
  _customLoadOptions: function() {
    return null;
  },
  key: function() {
    return this._key;
  },
  keyOf: function(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }
    return this._keyGetter(obj);
  },
  _requireKey: function() {
    if (!this.key()) {
      throw errors.Error("E4005");
    }
  },
  load: function(options) {
    var that = this;
    options = options || {};
    this._eventsStrategy.fireEvent("loading", [options]);
    return this._withLock(this._loadImpl(options)).done(function(result) {
      that._eventsStrategy.fireEvent("loaded", [result, options]);
    });
  },
  _loadImpl: function(options) {
    if (!isEmptyObject(this._langParams)) {
      options = options || {};
      options._langParams = _extends({}, this._langParams, options._langParams);
    }
    return queryByOptions2(this.createQuery(options), options).enumerate();
  },
  _withLock: function(task) {
    var result = new Deferred();
    task.done(function() {
      var that = this;
      var args = arguments;
      processRequestResultLock.promise().done(function() {
        result.resolveWith(that, args);
      });
    }).fail(function() {
      result.rejectWith(this, arguments);
    });
    return result;
  },
  createQuery: abstract3,
  totalCount: function(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl: function(options) {
    return queryByOptions2(this.createQuery(options), options, true).count();
  },
  byKey: function(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract3,
  insert: function(values) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("inserting", [values]);
    return that._addFailHandlers(that._insertImpl(values).done(function(callbackValues, callbackKey) {
      that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _insertImpl: abstract3,
  update: function(key, values) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("updating", [key, values]);
    return that._addFailHandlers(that._updateImpl(key, values).done(function() {
      that._eventsStrategy.fireEvent("updated", [key, values]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _updateImpl: abstract3,
  push: function(changes) {
    var beforePushArgs = {
      changes,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePushAggregation", [beforePushArgs]);
    when(...beforePushArgs.waitFor).done(() => {
      this._pushImpl(changes);
      this._eventsStrategy.fireEvent("beforePush", [{
        changes
      }]);
      this._eventsStrategy.fireEvent("push", [changes]);
    });
  },
  _pushImpl: noop2,
  remove: function(key) {
    var that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("removing", [key]);
    return that._addFailHandlers(that._removeImpl(key).done(function(callbackKey) {
      that._eventsStrategy.fireEvent("removed", [callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _removeImpl: abstract3,
  _addFailHandlers: function(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
Store.create = function(alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error("E4020", alias);
  }
  return new storeImpl[alias](options);
};
Store.registerClass = function(type2, alias) {
  if (alias) {
    storeImpl[alias] = type2;
  }
  return type2;
};
Store.inherit = /* @__PURE__ */ function(inheritor) {
  return function(members, alias) {
    var type2 = inheritor.apply(this, [members]);
    Store.registerClass(type2, alias);
    return type2;
  };
}(Store.inherit);
var abstract_store_default = Store;

// node_modules/devextreme/esm/data/custom_store.js
var TOTAL_COUNT = "totalCount";
var LOAD = "load";
var BY_KEY = "byKey";
var INSERT = "insert";
var UPDATE = "update";
var REMOVE = "remove";
function isPromise2(obj) {
  return obj && isFunction(obj.then);
}
function trivialPromise2(value2) {
  return new Deferred().resolve(value2).promise();
}
function ensureRequiredFuncOption(name, obj) {
  if (!isFunction(obj)) {
    throw errors.Error("E4011", name);
  }
}
function throwInvalidUserFuncResult(name) {
  throw errors.Error("E4012", name);
}
function createUserFuncFailureHandler(pendingDeferred) {
  function errorMessageFromXhr2(promiseArguments) {
    var xhr = promiseArguments[0];
    var textStatus = promiseArguments[1];
    if (!xhr || !xhr.getResponseHeader) {
      return null;
    }
    return errorMessageFromXhr(xhr, textStatus);
  }
  return function(arg) {
    var error;
    if (arg instanceof Error) {
      error = arg;
    } else {
      error = new Error(errorMessageFromXhr2(arguments) || arg && String(arg) || "Unknown error");
    }
    if (error.message !== XHR_ERROR_UNLOAD) {
      pendingDeferred.reject(error);
    }
  };
}
function invokeUserLoad(store, options) {
  var userFunc = store._loadFunc;
  var userResult;
  ensureRequiredFuncOption(LOAD, userFunc);
  userResult = userFunc.apply(store, [options]);
  if (Array.isArray(userResult)) {
    userResult = trivialPromise2(userResult);
  } else if (null === userResult || void 0 === userResult) {
    userResult = trivialPromise2([]);
  } else if (!isPromise2(userResult)) {
    throwInvalidUserFuncResult(LOAD);
  }
  return fromPromise(userResult);
}
function invokeUserTotalCountFunc(store, options) {
  var userFunc = store._totalCountFunc;
  var userResult;
  if (!isFunction(userFunc)) {
    throw errors.Error("E4021");
  }
  userResult = userFunc.apply(store, [options]);
  if (!isPromise2(userResult)) {
    userResult = Number(userResult);
    if (!isFinite(userResult)) {
      throwInvalidUserFuncResult(TOTAL_COUNT);
    }
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function invokeUserByKeyFunc(store, key, extraOptions) {
  var userFunc = store._byKeyFunc;
  var userResult;
  ensureRequiredFuncOption(BY_KEY, userFunc);
  userResult = userFunc.apply(store, [key, extraOptions]);
  if (!isPromise2(userResult)) {
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
  if (store.__rawData) {
    continuation(store.__rawData);
  } else {
    var loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
    if (store._cacheRawData) {
      store.__rawDataPromise = loadPromise;
    }
    loadPromise.always(function() {
      delete store.__rawDataPromise;
    }).done(function(rawData) {
      if (store._cacheRawData) {
        store.__rawData = rawData;
      }
      continuation(rawData);
    }).fail((error) => {
      var _store$_errorHandler;
      var userFuncFailureHandler = createUserFuncFailureHandler(pendingDeferred);
      null === (_store$_errorHandler = store._errorHandler) || void 0 === _store$_errorHandler ? void 0 : _store$_errorHandler.call(store, error);
      userFuncFailureHandler(error);
    });
  }
}
function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
  options = options || {};
  var userFuncOptions = {};
  if ("userData" in options) {
    userFuncOptions.userData = options.userData;
  }
  runRawLoad(pendingDeferred, store, userFuncOptions, function(rawData) {
    var rawDataQuery = array_query_default(rawData, {
      errorHandler: store._errorHandler
    });
    var itemsQuery;
    var totalCountQuery;
    var waitList = [];
    var items;
    var totalCount;
    if (!countOnly) {
      itemsQuery = store_helper_default.queryByOptions(rawDataQuery, options);
      if (itemsQuery === rawDataQuery) {
        items = rawData.slice(0);
      } else {
        waitList.push(itemsQuery.enumerate().done(function(asyncResult) {
          items = asyncResult;
        }));
      }
    }
    if (options.requireTotalCount || countOnly) {
      totalCountQuery = store_helper_default.queryByOptions(rawDataQuery, options, true);
      if (totalCountQuery === rawDataQuery) {
        totalCount = rawData.length;
      } else {
        waitList.push(totalCountQuery.count().done(function(asyncResult) {
          totalCount = asyncResult;
        }));
      }
    }
    when.apply(renderer_default, waitList).done(function() {
      if (countOnly) {
        pendingDeferred.resolve(totalCount);
      } else if (options.requireTotalCount) {
        pendingDeferred.resolve(items, {
          totalCount
        });
      } else {
        pendingDeferred.resolve(items);
      }
    }).fail(function(x) {
      pendingDeferred.reject(x);
    });
  });
}
function runRawLoadWithKey(pendingDeferred, store, key) {
  runRawLoad(pendingDeferred, store, {}, function(rawData) {
    var keyExpr = store.key();
    var item;
    for (var i = 0, len = rawData.length; i < len; i++) {
      item = rawData[i];
      if (keysEqual(keyExpr, store.keyOf(rawData[i]), key)) {
        pendingDeferred.resolve(item);
        return;
      }
    }
    pendingDeferred.reject(errors.Error("E4009"));
  });
}
var CustomStore = abstract_store_default.inherit({
  ctor: function(options) {
    options = options || {};
    this.callBase(options);
    this._useDefaultSearch = !!options.useDefaultSearch || "raw" === options.loadMode;
    this._loadMode = options.loadMode;
    this._cacheRawData = false !== options.cacheRawData;
    this._loadFunc = options[LOAD];
    this._totalCountFunc = options[TOTAL_COUNT];
    this._byKeyFunc = options[BY_KEY];
    this._insertFunc = options[INSERT];
    this._updateFunc = options[UPDATE];
    this._removeFunc = options[REMOVE];
  },
  _clearCache() {
    delete this.__rawData;
  },
  createQuery: function() {
    throw errors.Error("E4010");
  },
  clearRawDataCache: function() {
    this._clearCache();
  },
  _totalCountImpl: function(options) {
    var d = new Deferred();
    if ("raw" === this._loadMode && !this._totalCountFunc) {
      runRawLoadWithQuery(d, this, options, true);
    } else {
      invokeUserTotalCountFunc(this, options).done(function(count) {
        d.resolve(Number(count));
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _pushImpl: function(changes) {
    if (this.__rawData) {
      applyBatch({
        keyInfo: this,
        data: this.__rawData,
        changes
      });
    }
  },
  _loadImpl: function(options) {
    var d = new Deferred();
    if ("raw" === this._loadMode) {
      runRawLoadWithQuery(d, this, options, false);
    } else {
      invokeUserLoad(this, options).done(function(data2, extra) {
        d.resolve(data2, extra);
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _byKeyImpl: function(key, extraOptions) {
    var d = new Deferred();
    if (this._byKeyViaLoad()) {
      this._requireKey();
      runRawLoadWithKey(d, this, key);
    } else {
      invokeUserByKeyFunc(this, key, extraOptions).done(function(obj) {
        d.resolve(obj);
      }).fail(createUserFuncFailureHandler(d));
    }
    return d.promise();
  },
  _byKeyViaLoad: function() {
    return "raw" === this._loadMode && !this._byKeyFunc;
  },
  _insertImpl: function(values) {
    var that = this;
    var userFunc = that._insertFunc;
    var userResult;
    var d = new Deferred();
    ensureRequiredFuncOption(INSERT, userFunc);
    userResult = userFunc.apply(that, [values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done(function(serverResponse) {
      if (config_default().useLegacyStoreResult) {
        d.resolve(values, serverResponse);
      } else {
        d.resolve(serverResponse || values, that.keyOf(serverResponse));
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _updateImpl: function(key, values) {
    var userFunc = this._updateFunc;
    var userResult;
    var d = new Deferred();
    ensureRequiredFuncOption(UPDATE, userFunc);
    userResult = userFunc.apply(this, [key, values]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done(function(serverResponse) {
      if (config_default().useLegacyStoreResult) {
        d.resolve(key, values);
      } else {
        d.resolve(serverResponse || values, key);
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _removeImpl: function(key) {
    var userFunc = this._removeFunc;
    var userResult;
    var d = new Deferred();
    ensureRequiredFuncOption(REMOVE, userFunc);
    userResult = userFunc.apply(this, [key]);
    if (!isPromise2(userResult)) {
      userResult = trivialPromise2();
    }
    fromPromise(userResult).done(function() {
      d.resolve(key);
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  }
});
var custom_store_default = CustomStore;

// node_modules/devextreme/esm/core/utils/queue.js
function createQueue2(discardPendingTasks) {
  var _tasks = [];
  var _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      var task = _tasks.shift();
      var result = task();
      if (void 0 === result) {
        continue;
      }
      if (result.then) {
        when(result).always(exec);
        return;
      }
      throw errors_default.Error("E0015");
    }
    _busy = false;
  }
  return {
    add: function(task, removeTaskCallback) {
      if (!discardPendingTasks) {
        _tasks.push(task);
      } else {
        if (_tasks[0] && removeTaskCallback) {
          removeTaskCallback(_tasks[0]);
        }
        _tasks = [task];
      }
      if (!_busy) {
        exec();
      }
    },
    busy: function() {
      return _busy;
    }
  };
}
var enqueue = createQueue2().add;

// node_modules/devextreme/esm/core/http_request.js
var window14 = getWindow();
var nativeXMLHttpRequest = {
  getXhr: function() {
    return new window14.XMLHttpRequest();
  }
};
var http_request_default = dependency_injector_default(nativeXMLHttpRequest);

// node_modules/devextreme/esm/core/utils/ajax.js
var window15 = getWindow();
var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
  return 200 <= status && status < 300;
};
var hasContent = function(status) {
  return 204 !== status;
};
var paramsConvert = function(params) {
  var result = [];
  for (var name in params) {
    var value2 = params[name];
    if (void 0 === value2) {
      continue;
    }
    if (null === value2) {
      value2 = "";
    }
    if ("function" === typeof value2) {
      value2 = value2();
    }
    result.push(encodeURIComponent(name) + "=" + encodeURIComponent(value2));
  }
  return result.join("&");
};
var createScript = function(options) {
  var script = dom_adapter_default.createElement("script");
  for (var name in options) {
    script[name] = options[name];
  }
  return script;
};
var removeScript = function(scriptNode) {
  scriptNode.parentNode.removeChild(scriptNode);
};
var appendToHead = function(element) {
  return dom_adapter_default.getHead().appendChild(element);
};
var evalScript = function(code) {
  var script = createScript({
    text: code
  });
  appendToHead(script);
  removeScript(script);
};
var evalCrossDomainScript = function(url) {
  var script = createScript({
    src: url
  });
  return new Promise(function(resolve, reject) {
    var events = {
      load: resolve,
      error: reject
    };
    var loadHandler = function(e) {
      events[e.type]();
      removeScript(script);
    };
    for (var event in events) {
      dom_adapter_default.listen(script, event, loadHandler);
    }
    appendToHead(script);
  });
};
var getAcceptHeader = function(options) {
  var dataType = options.dataType || "*";
  var scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
  var accepts = {
    "*": "*/*",
    text: "text/plain",
    html: "text/html",
    xml: "application/xml, text/xml",
    json: "application/json, text/javascript",
    jsonp: scriptAccept,
    script: scriptAccept
  };
  extendFromObject(accepts, options.accepts, true);
  return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"];
};
var getContentTypeHeader = function(options) {
  var defaultContentType;
  if (options.data && !options.upload && "GET" !== getMethod(options)) {
    defaultContentType = "application/x-www-form-urlencoded;charset=utf-8";
  }
  return options.contentType || defaultContentType;
};
var getDataFromResponse = function(xhr) {
  return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText;
};
var postProcess = function(deferred, xhr, dataType) {
  var data2 = getDataFromResponse(xhr);
  switch (dataType) {
    case "jsonp":
      evalScript(data2);
      break;
    case "script":
      evalScript(data2);
      deferred.resolve(data2, SUCCESS, xhr);
      break;
    case "json":
      try {
        deferred.resolve(JSON.parse(data2), SUCCESS, xhr);
      } catch (e) {
        deferred.reject(xhr, PARSER_ERROR, e);
      }
      break;
    default:
      deferred.resolve(data2, SUCCESS, xhr);
  }
};
var isCrossDomain = function(url) {
  if (!hasWindow()) {
    return true;
  }
  var crossDomain = false;
  var originAnchor = dom_adapter_default.createElement("a");
  var urlAnchor = dom_adapter_default.createElement("a");
  originAnchor.href = window15.location.href;
  try {
    urlAnchor.href = url;
    urlAnchor.href = urlAnchor.href;
    crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
  } catch (e) {
    crossDomain = true;
  }
  return crossDomain;
};
var setHttpTimeout = function(timeout, xhr) {
  return timeout && setTimeout(function() {
    xhr.customStatus = TIMEOUT;
    xhr.abort();
  }, timeout);
};
var getJsonpOptions = function(options) {
  if ("jsonp" === options.dataType) {
    var random = Math.random().toString().replace(/\D/g, "");
    var callbackName = options.jsonpCallback || "dxCallback" + Date.now() + "_" + random;
    var callbackParameter = options.jsonp || "callback";
    options.data = options.data || {};
    options.data[callbackParameter] = callbackName;
    return callbackName;
  }
};
var getRequestOptions = function(options, headers) {
  var params = options.data;
  var paramsAlreadyString = "string" === typeof params;
  var url = options.url || window15.location.href;
  if (!paramsAlreadyString && !options.cache) {
    params = params || {};
    params._ = Date.now();
  }
  if (params && !options.upload) {
    if (!paramsAlreadyString) {
      params = paramsConvert(params);
    }
    if ("GET" === getMethod(options)) {
      if ("" !== params) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + params;
      }
      params = null;
    } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
      params = params.replace(/%20/g, "+");
    }
  }
  return {
    url,
    parameters: params
  };
};
function getMethod(options) {
  return (options.method || "GET").toUpperCase();
}
var getRequestHeaders = function(options) {
  var headers = options.headers || {};
  headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
  headers.Accept = headers.Accept || getAcceptHeader(options);
  if (!options.crossDomain && !headers["X-Requested-With"]) {
    headers["X-Requested-With"] = "XMLHttpRequest";
  }
  return headers;
};
var sendRequest = function(options) {
  var xhr = http_request_default.getXhr();
  var d = new Deferred();
  var result = d.promise();
  var async = isDefined(options.async) ? options.async : true;
  var dataType = options.dataType;
  var timeout = options.timeout || 0;
  var timeoutId;
  options.crossDomain = isCrossDomain(options.url);
  var needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
  if (void 0 === options.cache) {
    options.cache = !needScriptEvaluation;
  }
  var callbackName = getJsonpOptions(options);
  var headers = getRequestHeaders(options);
  var requestOptions = getRequestOptions(options, headers);
  var url = requestOptions.url;
  var parameters = requestOptions.parameters;
  if (callbackName) {
    window15[callbackName] = function(data2) {
      d.resolve(data2, SUCCESS, xhr);
    };
  }
  if (options.crossDomain && needScriptEvaluation) {
    evalCrossDomainScript(url).then(function() {
      if ("jsonp" === dataType) {
        return;
      }
      d.resolve(null, SUCCESS, xhr);
    }, function() {
      d.reject(xhr, ERROR);
    });
    return result;
  }
  if (options.crossDomain && !("withCredentials" in xhr)) {
    d.reject(xhr, ERROR);
    return result;
  }
  xhr.open(getMethod(options), url, async, options.username, options.password);
  if (async) {
    xhr.timeout = timeout;
    timeoutId = setHttpTimeout(timeout, xhr);
  }
  xhr.onreadystatechange = function(e) {
    if (4 === xhr.readyState) {
      clearTimeout(timeoutId);
      if (isStatusSuccess(xhr.status)) {
        if (hasContent(xhr.status)) {
          postProcess(d, xhr, dataType);
        } else {
          d.resolve(null, NO_CONTENT, xhr);
        }
      } else {
        d.reject(xhr, xhr.customStatus || ERROR);
      }
    }
  };
  if (options.upload) {
    xhr.upload.onprogress = options.upload.onprogress;
    xhr.upload.onloadstart = options.upload.onloadstart;
    xhr.upload.onabort = options.upload.onabort;
  }
  if (options.xhrFields) {
    for (var field in options.xhrFields) {
      xhr[field] = options.xhrFields[field];
    }
  }
  if ("arraybuffer" === options.responseType) {
    xhr.responseType = options.responseType;
  }
  for (var name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name) && isDefined(headers[name])) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  if (options.beforeSend) {
    options.beforeSend(xhr);
  }
  xhr.send(parameters);
  result.abort = function() {
    xhr.abort();
  };
  return result;
};
var ajax_default = dependency_injector_default({
  sendRequest
});

// node_modules/devextreme/esm/data/array_store.js
var ArrayStore = abstract_store_default.inherit({
  ctor: function(options) {
    if (Array.isArray(options)) {
      options = {
        data: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    var initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw errors.Error("E4006");
    }
    this._array = initialArray || [];
  },
  createQuery: function() {
    return query_default(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl: function(key) {
    var index2 = indexByKey(this, this._array, key);
    if (-1 === index2) {
      return rejectedPromise(errors.Error("E4009"));
    }
    return trivialPromise(this._array[index2]);
  },
  _insertImpl: function(values) {
    return insert(this, this._array, values);
  },
  _pushImpl: function(changes) {
    applyBatch({
      keyInfo: this,
      data: this._array,
      changes
    });
  },
  _updateImpl: function(key, values) {
    return update(this, this._array, key, values);
  },
  _removeImpl: function(key) {
    return remove2(this, this._array, key);
  },
  clear: function() {
    this._eventsStrategy.fireEvent("modifying");
    this._array = [];
    this._eventsStrategy.fireEvent("modified");
  }
}, "array");
var array_store_default = ArrayStore;

// node_modules/devextreme/esm/data/data_source/utils.js
var _excluded = ["items"];
var CANCELED_TOKEN = "canceled";
var isPending = (deferred) => "pending" === deferred.state();
var normalizeStoreLoadOptionAccessorArguments = (originalArguments) => {
  switch (originalArguments.length) {
    case 0:
      return;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
var mapGroup = (group, level, mapper) => map(group, (item) => {
  var restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
var mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) {
    return items;
  }
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  var level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
var normalizeLoadResult = (data2, extra) => {
  var _data;
  if (null !== (_data = data2) && void 0 !== _data && _data.data) {
    extra = data2;
    data2 = data2.data;
  }
  if (!Array.isArray(data2)) {
    data2 = [data2];
  }
  return {
    data: data2,
    extra
  };
};
var createCustomStoreFromLoadFunc = (options) => {
  var storeConfig = {};
  each(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
    storeConfig[this] = options[this];
    delete options[this];
  });
  return new custom_store_default(storeConfig);
};
var createStoreFromConfig = (storeConfig) => {
  var alias = storeConfig.type;
  delete storeConfig.type;
  return abstract_store_default.create(alias, storeConfig);
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new custom_store_default({
  load: () => ajax_default.sendRequest({
    url,
    dataType: "json"
  }),
  loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
var normalizeDataSourceOptions = (options, normalizationOptions) => {
  var store;
  if ("string" === typeof options) {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (void 0 === options) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof abstract_store_default) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (void 0 === options.store) {
    options.store = [];
  }
  store = options.store;
  if ("load" in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new array_store_default(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};

// node_modules/devextreme/esm/data/data_source/operation_manager.js
var OperationManager = class {
  constructor() {
    this._counter = -1;
    this._deferreds = {};
  }
  add(deferred) {
    this._counter++;
    this._deferreds[this._counter] = deferred;
    return this._counter;
  }
  remove(operationId) {
    return delete this._deferreds[operationId];
  }
  cancel(operationId) {
    if (operationId in this._deferreds) {
      this._deferreds[operationId].reject(CANCELED_TOKEN);
      return true;
    }
    return false;
  }
  cancelAll() {
    while (this._counter > -1) {
      this.cancel(this._counter);
      this._counter--;
    }
  }
};

// node_modules/devextreme/esm/data/data_source/data_source.js
var DataSource = class_default.inherit({
  ctor(options) {
    var _options$reshapeOnPus;
    options = normalizeDataSourceOptions(options);
    this._eventsStrategy = new EventsStrategy(this, {
      syncStrategy: true
    });
    this._store = options.store;
    this._changedTime = 0;
    var needThrottling = 0 !== options.pushAggregationTimeout;
    if (needThrottling) {
      var throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
      var pushDeferred;
      var lastPushWaiters;
      var throttlingPushHandler = throttleChanges((changes) => {
        pushDeferred.resolve();
        var storePushPending = when(...lastPushWaiters);
        storePushPending.done(() => this._onPush(changes));
        lastPushWaiters = void 0;
        pushDeferred = void 0;
      }, throttlingTimeout);
      this._onPushHandler = (args) => {
        this._aggregationTimeoutId = throttlingPushHandler(args.changes);
        if (!pushDeferred) {
          pushDeferred = new Deferred();
        }
        lastPushWaiters = args.waitFor;
        args.waitFor.push(pushDeferred.promise());
      };
      this._store.on("beforePushAggregation", this._onPushHandler);
    } else {
      this._onPushHandler = (changes) => this._onPush(changes);
      this._store.on("push", this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(options);
    this._mapFunc = options.map;
    this._postProcessFunc = options.postProcess;
    this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
    this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = "searchValue" in options ? options.searchValue : null;
    this._searchOperation = options.searchOperation || "contains";
    this._searchExpr = options.searchExpr;
    this._paginate = options.paginate;
    this._reshapeOnPush = null !== (_options$reshapeOnPus = options.reshapeOnPush) && void 0 !== _options$reshapeOnPus ? _options$reshapeOnPus : false;
    each(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], (_, optionName) => {
      if (optionName in options) {
        this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName]);
      }
    });
    this._operationManager = new OperationManager();
    this._init();
  },
  _init() {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!isDefined(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose() {
    var _this$_delayedLoadTas;
    this._store.off("beforePushAggregation", this._onPushHandler);
    this._store.off("push", this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas ? void 0 : _this$_delayedLoadTas.abort();
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions(options) {
    var result = {};
    var names = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
    var customNames = this._store._customLoadOptions();
    if (customNames) {
      names = names.concat(customNames);
    }
    each(names, function() {
      result[this] = options[this];
    });
    return result;
  },
  loadOptions() {
    return this._storeLoadOptions;
  },
  items() {
    return this._items;
  },
  pageIndex(newIndex) {
    if (!isNumeric(newIndex)) {
      return this._pageIndex;
    }
    this._pageIndex = newIndex;
    this._isLastPage = !this._paginate;
  },
  paginate(value2) {
    if (!isBoolean(value2)) {
      return this._paginate;
    }
    if (this._paginate !== value2) {
      this._paginate = value2;
      this.pageIndex(0);
    }
  },
  pageSize(value2) {
    if (!isNumeric(value2)) {
      return this._pageSize;
    }
    this._pageSize = value2;
  },
  isLastPage() {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor(optionName) {
    return (args) => {
      var normalizedArgs = normalizeStoreLoadOptionAccessorArguments(args);
      if (void 0 === normalizedArgs) {
        return this._storeLoadOptions[optionName];
      }
      this._storeLoadOptions[optionName] = normalizedArgs;
    };
  },
  sort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.generateStoreLoadOptionAccessor("sort")(args);
  },
  filter() {
    var newFilter = normalizeStoreLoadOptionAccessorArguments(arguments);
    if (void 0 === newFilter) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = newFilter;
    this.pageIndex(0);
  },
  group() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.generateStoreLoadOptionAccessor("group")(args);
  },
  select() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.generateStoreLoadOptionAccessor("select")(args);
  },
  requireTotalCount(value2) {
    if (!isBoolean(value2)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = value2;
  },
  searchValue(value2) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = value2;
    this.pageIndex(0);
  },
  searchOperation(op) {
    if (!isString(op)) {
      return this._searchOperation;
    }
    this._searchOperation = op;
    this.pageIndex(0);
  },
  searchExpr(expr) {
    var argc = arguments.length;
    if (0 === argc) {
      return this._searchExpr;
    }
    if (argc > 1) {
      expr = [].slice.call(arguments);
    }
    this._searchExpr = expr;
    this.pageIndex(0);
  },
  store() {
    return this._store;
  },
  key() {
    var _this$_store;
    return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key();
  },
  totalCount() {
    return this._totalCount;
  },
  isLoaded() {
    return this._isLoaded;
  },
  isLoading() {
    return this._loadingCount > 0;
  },
  beginLoading() {
    this._changeLoadingCount(1);
  },
  endLoading() {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue: () => createQueue2(),
  _changeLoadingCount(increment) {
    var oldLoading = this.isLoading();
    this._loadingCount += increment;
    var newLoading = this.isLoading();
    if (oldLoading ^ newLoading) {
      this._eventsStrategy.fireEvent("loadingChanged", [newLoading]);
    }
  },
  _scheduleLoadCallbacks(deferred) {
    this.beginLoading();
    deferred.always(() => {
      this.endLoading();
    });
  },
  _scheduleFailCallbacks(deferred) {
    var _this = this;
    deferred.fail(function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args[0] === CANCELED_TOKEN) {
        return;
      }
      _this._eventsStrategy.fireEvent("loadError", args);
    });
  },
  _fireChanged(args) {
    var date = /* @__PURE__ */ new Date();
    this._eventsStrategy.fireEvent("changed", args);
    this._changedTime = /* @__PURE__ */ new Date() - date;
  },
  _scheduleChangedCallbacks(deferred) {
    deferred.done(() => this._fireChanged());
  },
  loadSingle(propName, propValue) {
    var d = new Deferred();
    var key = this.key();
    var store = this._store;
    var options = this._createStoreLoadOptions();
    this._scheduleFailCallbacks(d);
    if (arguments.length < 2) {
      propValue = propName;
      propName = key;
    }
    delete options.skip;
    delete options.group;
    delete options.refresh;
    delete options.pageIndex;
    delete options.searchString;
    (() => {
      if (propName === key || store instanceof custom_store_default && !store._byKeyViaLoad()) {
        return store.byKey(propValue, options);
      }
      options.take = 1;
      options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
      return store.load(options);
    })().fail(d.reject).done((data2) => {
      var isEmptyArray = Array.isArray(data2) && !data2.length;
      if (!isDefined(data2) || isEmptyArray) {
        d.reject(new errors.Error("E4009"));
      } else {
        if (!Array.isArray(data2)) {
          data2 = [data2];
        }
        d.resolve(this._applyMapFunction(data2)[0]);
      }
    });
    return d.promise();
  },
  load() {
    var d = new Deferred();
    var loadTask = () => {
      if (this._disposed) {
        return;
      }
      if (!isPending(d)) {
        return;
      }
      return this._loadFromStore(loadOperation, d);
    };
    this._scheduleLoadCallbacks(d);
    this._scheduleFailCallbacks(d);
    this._scheduleChangedCallbacks(d);
    var loadOperation = this._createLoadOperation(d);
    this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
    this._loadQueue.add(() => {
      if ("number" === typeof loadOperation.delay) {
        this._delayedLoadTask = executeAsync(loadTask, loadOperation.delay);
      } else {
        loadTask();
      }
      return d.promise();
    });
    return d.promise({
      operationId: loadOperation.operationId
    });
  },
  _onPush(changes) {
    if (this._reshapeOnPush) {
      this.load();
    } else {
      var changingArgs = {
        changes
      };
      this._eventsStrategy.fireEvent("changing", [changingArgs]);
      var group = this.group();
      var items = this.items();
      var groupLevel = 0;
      var dataSourceChanges = this.paginate() || group ? changes.filter((item) => "update" === item.type) : changes;
      if (group) {
        groupLevel = Array.isArray(group) ? group.length : 1;
      }
      if (this._mapFunc) {
        dataSourceChanges.forEach((item) => {
          if ("insert" === item.type) {
            item.data = this._mapFunc(item.data);
          }
        });
      }
      if (changingArgs.postProcessChanges) {
        dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges);
      }
      applyBatch({
        keyInfo: this.store(),
        data: items,
        changes: dataSourceChanges,
        groupCount: groupLevel,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes
      }]);
    }
  },
  _createLoadOperation(deferred) {
    var operationId = this._operationManager.add(deferred);
    var storeLoadOptions = this._createStoreLoadOptions();
    if (this._store && !isEmptyObject(null === storeLoadOptions || void 0 === storeLoadOptions ? void 0 : storeLoadOptions.langParams)) {
      this._store._langParams = _extends({}, this._store._langParams, storeLoadOptions.langParams);
    }
    deferred.always(() => this._operationManager.remove(operationId));
    return {
      operationId,
      storeLoadOptions
    };
  },
  reload() {
    var store = this.store();
    store._clearCache();
    this._init();
    return this.load();
  },
  cancel(operationId) {
    return this._operationManager.cancel(operationId);
  },
  cancelAll() {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions(storeLoadOptions) {
    if (this._disposed) {
      return;
    }
    if (this.store()._useDefaultSearch) {
      this._addSearchFilter(storeLoadOptions);
    } else {
      storeLoadOptions.searchOperation = this._searchOperation;
      storeLoadOptions.searchValue = this._searchValue;
      storeLoadOptions.searchExpr = this._searchExpr;
    }
  },
  _createStoreLoadOptions() {
    var result = extend({}, this._storeLoadOptions);
    this._addSearchOptions(result);
    if (this._paginate) {
      if (this._pageSize) {
        result.skip = this._pageIndex * this._pageSize;
        result.take = this._pageSize;
      }
    }
    result.userData = this._userData;
    return result;
  },
  _addSearchFilter(storeLoadOptions) {
    var value2 = this._searchValue;
    var op = this._searchOperation;
    var selector = this._searchExpr;
    var searchFilter = [];
    if (!value2) {
      return;
    }
    if (!selector) {
      selector = "this";
    }
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    each(selector, function(i, item) {
      if (searchFilter.length) {
        searchFilter.push("or");
      }
      searchFilter.push([item, op, value2]);
    });
    if (storeLoadOptions.filter) {
      storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
    } else {
      storeLoadOptions.filter = searchFilter;
    }
  },
  _loadFromStore(loadOptions, pendingDeferred) {
    var handleSuccess = (data2, extra) => {
      if (this._disposed) {
        return;
      }
      if (!isPending(pendingDeferred)) {
        return;
      }
      var loadResult = extend(normalizeLoadResult(data2, extra), loadOptions);
      this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
      when(loadResult.data).done((data3) => {
        loadResult.data = data3;
        this._processStoreLoadResult(loadResult, pendingDeferred);
      }).fail(pendingDeferred.reject);
    };
    if (loadOptions.data) {
      return new Deferred().resolve(loadOptions.data).done(handleSuccess);
    }
    return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject);
  },
  _processStoreLoadResult(loadResult, pendingDeferred) {
    var data2 = loadResult.data;
    var extra = loadResult.extra;
    var storeLoadOptions = loadResult.storeLoadOptions;
    var resolvePendingDeferred = () => {
      this._isLoaded = true;
      this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
      return pendingDeferred.resolve(data2, extra);
    };
    if (this._disposed) {
      return;
    }
    data2 = this._applyPostProcessFunction(this._applyMapFunction(data2));
    if (!isObject(extra)) {
      extra = {};
    }
    this._items = data2;
    if (!data2.length || !this._paginate || this._pageSize && data2.length < this._pageSize) {
      this._isLastPage = true;
    }
    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
      (() => {
        this.store().totalCount(storeLoadOptions).done(function(count) {
          extra.totalCount = count;
          resolvePendingDeferred();
        }).fail(pendingDeferred.reject);
      })();
    } else {
      resolvePendingDeferred();
    }
  },
  _applyMapFunction(data2) {
    if (this._mapFunc) {
      return mapDataRespectingGrouping(data2, this._mapFunc, this.group());
    }
    return data2;
  },
  _applyPostProcessFunction(data2) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(data2);
    }
    return data2;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});

// node_modules/devextreme/esm/renovation/ui/common/utils/date/toMilliseconds.js
var timeIntervals = {
  millisecond: 1,
  second: 1e3,
  minute: 6e4,
  hour: 36e5,
  day: 864e5,
  week: 6048e5,
  month: 2592e6,
  quarter: 7776e6,
  year: 31536e6
};
function toMilliseconds(value2) {
  return timeIntervals[value2];
}

// node_modules/devextreme/esm/core/utils/date.js
var DAYS_IN_WEEK = 7;
var THURSDAY_WEEK_NUMBER = 4;
var SUNDAY_WEEK_NUMBER = 7;
var USUAL_WEEK_COUNT_IN_YEAR = 52;
var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"];
var getDatesInterval = function(startDate, endDate, intervalUnit) {
  var delta = endDate.getTime() - startDate.getTime();
  var millisecondCount = toMilliseconds(intervalUnit) || 1;
  return Math.floor(delta / millisecondCount);
};
var getNextDateUnit = function(unit, withWeeks) {
  var interval = getDateUnitInterval(unit);
  switch (interval) {
    case "millisecond":
      return "second";
    case "second":
      return "minute";
    case "minute":
      return "hour";
    case "hour":
      return "day";
    case "day":
      return withWeeks ? "week" : "month";
    case "week":
      return "month";
    case "month":
      return "quarter";
    case "quarter":
    case "year":
      return "year";
    default:
      return 0;
  }
};
var convertMillisecondsToDateUnits = function(value2) {
  var i;
  var dateUnitCount;
  var dateUnitInterval;
  var dateUnitIntervals2 = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
  var result = {};
  for (i = dateUnitIntervals2.length - 1; i >= 0; i--) {
    dateUnitInterval = dateUnitIntervals2[i];
    dateUnitCount = Math.floor(value2 / toMilliseconds(dateUnitInterval));
    if (dateUnitCount > 0) {
      result[dateUnitInterval + "s"] = dateUnitCount;
      value2 -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount);
    }
  }
  return result;
};
var dateToMilliseconds = function(tickInterval) {
  var milliseconds = 0;
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value2);
    });
  }
  if (isString(tickInterval)) {
    milliseconds = convertDateUnitToMilliseconds(tickInterval, 1);
  }
  return milliseconds;
};
function convertDateUnitToMilliseconds(dateUnit, count) {
  return toMilliseconds(dateUnit) * count;
}
function getDateUnitInterval(tickInterval) {
  var maxInterval = -1;
  var i;
  if (isString(tickInterval)) {
    return tickInterval;
  }
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      for (i = 0; i < dateUnitIntervals.length; i++) {
        if (value2 && (key === dateUnitIntervals[i] + "s" || key === dateUnitIntervals[i]) && maxInterval < i) {
          maxInterval = i;
        }
      }
    });
    return dateUnitIntervals[maxInterval];
  }
  return "";
}
var tickIntervalToFormatMap = {
  millisecond: "millisecond",
  second: "longtime",
  minute: "shorttime",
  hour: "shorttime",
  day: "day",
  week: "day",
  month: "month",
  quarter: "quarter",
  year: "year"
};
function getDateFormatByTickInterval(tickInterval) {
  return tickIntervalToFormatMap[getDateUnitInterval(tickInterval)] || "";
}
var getQuarter = function(month) {
  return Math.floor(month / 3);
};
var getFirstQuarterMonth = function(month) {
  return 3 * getQuarter(month);
};
function correctDateWithUnitBeginning(date, dateInterval, withCorrection, firstDayOfWeek) {
  date = new Date(date.getTime());
  var oldDate = new Date(date.getTime());
  var firstQuarterMonth;
  var month;
  var dateUnitInterval = getDateUnitInterval(dateInterval);
  switch (dateUnitInterval) {
    case "second":
      date = new Date(1e3 * Math.floor(oldDate.getTime() / 1e3));
      break;
    case "minute":
      date = new Date(6e4 * Math.floor(oldDate.getTime() / 6e4));
      break;
    case "hour":
      date = new Date(36e5 * Math.floor(oldDate.getTime() / 36e5));
      break;
    case "year":
      date.setMonth(0);
    case "month":
      date.setDate(1);
    case "day":
      date.setHours(0, 0, 0, 0);
      break;
    case "week":
      date = getFirstWeekDate(date, firstDayOfWeek || 0);
      date.setHours(0, 0, 0, 0);
      break;
    case "quarter":
      firstQuarterMonth = getFirstQuarterMonth(date.getMonth());
      month = date.getMonth();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      if (month !== firstQuarterMonth) {
        date.setMonth(firstQuarterMonth);
      }
  }
  if (withCorrection && "hour" !== dateUnitInterval && "minute" !== dateUnitInterval && "second" !== dateUnitInterval) {
    fixTimezoneGap(oldDate, date);
  }
  return date;
}
function trimTime(date) {
  return correctDateWithUnitBeginning(date, "day");
}
var setToDayEnd = function(date) {
  var result = trimTime(date);
  result.setDate(result.getDate() + 1);
  return new Date(result.getTime() - 1);
};
var getDatesDifferences = function(date1, date2) {
  var counter = 0;
  var differences = {
    year: date1.getFullYear() !== date2.getFullYear(),
    month: date1.getMonth() !== date2.getMonth(),
    day: date1.getDate() !== date2.getDate(),
    hour: date1.getHours() !== date2.getHours(),
    minute: date1.getMinutes() !== date2.getMinutes(),
    second: date1.getSeconds() !== date2.getSeconds(),
    millisecond: date1.getMilliseconds() !== date2.getMilliseconds()
  };
  each(differences, function(key, value2) {
    if (value2) {
      counter++;
    }
  });
  if (0 === counter && 0 !== getTimezonesDifference(date1, date2)) {
    differences.hour = true;
    counter++;
  }
  differences.count = counter;
  return differences;
};
function addDateInterval(value2, interval, dir) {
  var result = new Date(value2.getTime());
  var intervalObject = isString(interval) ? getDateIntervalByString(interval.toLowerCase()) : isNumeric(interval) ? convertMillisecondsToDateUnits(interval) : interval;
  if (intervalObject.years) {
    result.setFullYear(result.getFullYear() + intervalObject.years * dir);
  }
  if (intervalObject.quarters) {
    result.setMonth(result.getMonth() + 3 * intervalObject.quarters * dir);
  }
  if (intervalObject.months) {
    result.setMonth(result.getMonth() + intervalObject.months * dir);
  }
  if (intervalObject.weeks) {
    result.setDate(result.getDate() + 7 * intervalObject.weeks * dir);
  }
  if (intervalObject.days) {
    result.setDate(result.getDate() + intervalObject.days * dir);
  }
  if (intervalObject.hours) {
    result.setTime(result.getTime() + 36e5 * intervalObject.hours * dir);
  }
  if (intervalObject.minutes) {
    result.setTime(result.getTime() + 6e4 * intervalObject.minutes * dir);
  }
  if (intervalObject.seconds) {
    result.setTime(result.getTime() + 1e3 * intervalObject.seconds * dir);
  }
  if (intervalObject.milliseconds) {
    result.setTime(result.getTime() + intervalObject.milliseconds * dir);
  }
  return result;
}
var addInterval = function(value2, interval, isNegative) {
  var dir = isNegative ? -1 : 1;
  return isDate(value2) ? addDateInterval(value2, interval, dir) : adjust(value2 + interval * dir, interval);
};
var getSequenceByInterval = function(min, max, interval) {
  var intervals = [];
  var cur;
  intervals.push(isDate(min) ? new Date(min.getTime()) : min);
  cur = min;
  while (cur < max) {
    cur = addInterval(cur, interval);
    intervals.push(cur);
  }
  return intervals;
};
var getViewFirstCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 0, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date), date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date), date.getMonth(), date.getDate());
  }
};
var getViewLastCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), getLastMonthDay(date));
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 11, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate());
  }
};
var getViewMinBoundaryDate = function(viewType, date) {
  var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(0);
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date));
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date));
  }
  return resultDate;
};
var getViewMaxBoundaryDate = function(viewType, date) {
  var resultDate = new Date(date);
  resultDate.setDate(getLastMonthDay(date));
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(11);
  resultDate.setDate(getLastMonthDay(resultDate));
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date) + 9);
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date) + 99);
  }
  return resultDate;
};
function getLastMonthDay(date) {
  var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  return resultDate.getDate();
}
var getViewUp = function(typeView) {
  switch (typeView) {
    case "month":
      return "year";
    case "year":
      return "decade";
    case "decade":
      return "century";
  }
};
var getViewDown = function(typeView) {
  switch (typeView) {
    case "century":
      return "decade";
    case "decade":
      return "year";
    case "year":
      return "month";
  }
};
var getDifferenceInMonth = function(typeView) {
  var difference = 1;
  if ("year" === typeView) {
    difference = 12;
  }
  if ("decade" === typeView) {
    difference = 120;
  }
  if ("century" === typeView) {
    difference = 1200;
  }
  return difference;
};
var getDifferenceInMonthForCells = function(typeView) {
  var difference = 1;
  if ("decade" === typeView) {
    difference = 12;
  }
  if ("century" === typeView) {
    difference = 120;
  }
  return difference;
};
function getDateIntervalByString(intervalString) {
  var result = {};
  switch (intervalString) {
    case "year":
      result.years = 1;
      break;
    case "month":
      result.months = 1;
      break;
    case "quarter":
      result.months = 3;
      break;
    case "week":
      result.weeks = 1;
      break;
    case "day":
      result.days = 1;
      break;
    case "hour":
      result.hours = 1;
      break;
    case "minute":
      result.minutes = 1;
      break;
    case "second":
      result.seconds = 1;
      break;
    case "millisecond":
      result.milliseconds = 1;
  }
  return result;
}
function sameDate(date1, date2) {
  return sameMonthAndYear(date1, date2) && date1.getDate() === date2.getDate();
}
function sameMonthAndYear(date1, date2) {
  return sameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}
function sameYear(date1, date2) {
  return date1 && date2 && date1.getFullYear() === date2.getFullYear();
}
function sameHoursAndMinutes(date1, date2) {
  return date1 && date2 && date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}
var sameDecade = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return;
  }
  var startDecadeDate1 = date1.getFullYear() - date1.getFullYear() % 10;
  var startDecadeDate2 = date2.getFullYear() - date2.getFullYear() % 10;
  return date1 && date2 && startDecadeDate1 === startDecadeDate2;
};
var sameCentury = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return;
  }
  var startCenturyDate1 = date1.getFullYear() - date1.getFullYear() % 100;
  var startCenturyDate2 = date2.getFullYear() - date2.getFullYear() % 100;
  return date1 && date2 && startCenturyDate1 === startCenturyDate2;
};
function getFirstDecadeInCentury(date) {
  return date && date.getFullYear() - date.getFullYear() % 100;
}
function getFirstYearInDecade(date) {
  return date && date.getFullYear() - date.getFullYear() % 10;
}
var getShortDateFormat = function() {
  return "yyyy/MM/dd";
};
var getFirstMonthDate = function(date) {
  var offset2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  var currentDate = new Date(date.getTime());
  var month = currentDate.getMonth() + offset2;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month, 1);
};
var getLastMonthDate = function(date) {
  var offset2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  var currentDate = new Date(date.getTime());
  var month = currentDate.getMonth() + offset2;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month + 1, 0);
};
function getFirstWeekDate(date, firstDayOfWeek) {
  var delta = (date.getDay() - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK;
  var result = new Date(date);
  result.setDate(date.getDate() - delta);
  return result;
}
function getUTCTime(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}
function getDayNumber(date) {
  var ms = getUTCTime(date) - getUTCTime(getFirstDateInYear(date.getFullYear()));
  return 1 + Math.floor(ms / toMilliseconds("day"));
}
function getFirstDateInYear(year) {
  return new Date(year, 0, 1);
}
function getLastDateInYear(year) {
  return new Date(year, 11, 31);
}
function getDayWeekNumber(date, firstDayOfWeek) {
  var day = date.getDay() - firstDayOfWeek + 1;
  if (day <= 0) {
    day += DAYS_IN_WEEK;
  }
  return day;
}
function getWeekNumber(date, firstDayOfWeek, rule) {
  var firstWeekDayInYear = getDayWeekNumber(getFirstDateInYear(date.getFullYear()), firstDayOfWeek);
  var lastWeekDayInYear = getDayWeekNumber(getLastDateInYear(date.getFullYear()), firstDayOfWeek);
  var daysInFirstWeek = DAYS_IN_WEEK - firstWeekDayInYear + 1;
  var weekNumber = Math.ceil((getDayNumber(date) - daysInFirstWeek) / 7);
  switch (rule) {
    case "fullWeek":
      if (daysInFirstWeek === DAYS_IN_WEEK) {
        weekNumber++;
      }
      if (0 === weekNumber) {
        var lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
    case "firstDay":
      if (daysInFirstWeek > 0) {
        weekNumber++;
      }
      var isSunday = firstWeekDayInYear === SUNDAY_WEEK_NUMBER || lastWeekDayInYear === SUNDAY_WEEK_NUMBER;
      if (weekNumber > USUAL_WEEK_COUNT_IN_YEAR && !isSunday || 54 === weekNumber) {
        weekNumber = 1;
      }
      return weekNumber;
    case "firstFourDays":
      if (daysInFirstWeek > 3) {
        weekNumber++;
      }
      var isThursday = firstWeekDayInYear === THURSDAY_WEEK_NUMBER || lastWeekDayInYear === THURSDAY_WEEK_NUMBER;
      if (weekNumber > USUAL_WEEK_COUNT_IN_YEAR && !isThursday) {
        weekNumber = 1;
      }
      if (0 === weekNumber) {
        var _lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(_lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
  }
}
var normalizeDateByWeek = function(date, currentDate) {
  var differenceInDays = dateUtils.getDatesInterval(date, currentDate, "day");
  var resultDate = new Date(date);
  if (differenceInDays >= 6) {
    resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7));
  }
  return resultDate;
};
var dateInRange = function(date, min, max, format2) {
  if ("date" === format2) {
    min = min && dateUtils.correctDateWithUnitBeginning(min, "day");
    max = max && dateUtils.correctDateWithUnitBeginning(max, "day");
    date = date && dateUtils.correctDateWithUnitBeginning(date, "day");
  }
  return normalizeDate(date, min, max) === date;
};
var intervalsOverlap = function(options) {
  var {
    firstMin,
    firstMax,
    secondMin,
    secondMax
  } = options;
  return firstMin <= secondMin && secondMin <= firstMax || firstMin > secondMin && firstMin < secondMax || firstMin < secondMax && firstMax > secondMax;
};
var dateTimeFromDecimal = function(number) {
  var hours = Math.floor(number);
  var minutes = number % 1 * 60;
  return {
    hours,
    minutes
  };
};
var roundDateByStartDayHour = function(date, startDayHour) {
  var startTime = this.dateTimeFromDecimal(startDayHour);
  var result = new Date(date);
  if (date.getHours() === startTime.hours && date.getMinutes() < startTime.minutes || date.getHours() < startTime.hours) {
    result.setHours(startTime.hours, startTime.minutes, 0, 0);
  }
  return result;
};
function normalizeDate(date, min, max) {
  var normalizedDate = date;
  if (!isDefined(date)) {
    return date;
  }
  if (isDefined(min) && date < min) {
    normalizedDate = min;
  }
  if (isDefined(max) && date > max) {
    normalizedDate = max;
  }
  return normalizedDate;
}
function fixTimezoneGap(oldDate, newDate) {
  if (!isDefined(oldDate)) {
    return;
  }
  var diff = newDate.getHours() - oldDate.getHours();
  if (0 === diff) {
    return;
  }
  var sign2 = 1 === diff || -23 === diff ? -1 : 1;
  var trial = new Date(newDate.getTime() + 36e5 * sign2);
  if (sign2 > 0 || trial.getDate() === newDate.getDate()) {
    newDate.setTime(trial.getTime());
  }
}
var roundToHour = function(date) {
  var result = new Date(date.getTime());
  result.setHours(result.getHours() + 1);
  result.setMinutes(0);
  return result;
};
function getTimezonesDifference(min, max) {
  return 60 * (max.getTimezoneOffset() - min.getTimezoneOffset()) * 1e3;
}
var makeDate = function(date) {
  return new Date(date);
};
var getDatesOfInterval = function(startDate, endDate, step) {
  var result = [];
  var currentDate = new Date(startDate.getTime());
  while (currentDate < endDate) {
    result.push(new Date(currentDate.getTime()));
    currentDate = this.addInterval(currentDate, step);
  }
  return result;
};
var createDateWithFullYear = function(year) {
  var result = new Date(...arguments);
  result.setFullYear(year);
  return result;
};
var getMachineTimezoneName = () => {
  var hasIntl3 = "undefined" !== typeof Intl;
  return hasIntl3 ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
};
var dateUtils = {
  dateUnitIntervals,
  convertMillisecondsToDateUnits,
  dateToMilliseconds,
  getNextDateUnit,
  convertDateUnitToMilliseconds,
  getDateUnitInterval,
  getDateFormatByTickInterval,
  getDatesDifferences,
  correctDateWithUnitBeginning,
  trimTime,
  setToDayEnd,
  roundDateByStartDayHour,
  dateTimeFromDecimal,
  addDateInterval,
  addInterval,
  getSequenceByInterval,
  getDateIntervalByString,
  sameHoursAndMinutes,
  sameDate,
  sameMonthAndYear,
  sameMonth: sameMonthAndYear,
  sameYear,
  sameDecade,
  sameCentury,
  getDifferenceInMonth,
  getDifferenceInMonthForCells,
  getFirstYearInDecade,
  getFirstDecadeInCentury,
  getShortDateFormat,
  getViewFirstCellDate,
  getViewLastCellDate,
  getViewDown,
  getViewUp,
  getLastMonthDay,
  getLastMonthDate,
  getFirstMonthDate,
  getFirstWeekDate,
  getWeekNumber,
  normalizeDateByWeek,
  getQuarter,
  getFirstQuarterMonth,
  dateInRange,
  intervalsOverlap,
  roundToHour,
  normalizeDate,
  getViewMinBoundaryDate,
  getViewMaxBoundaryDate,
  fixTimezoneGap,
  getTimezonesDifference,
  makeDate,
  getDatesInterval,
  getDatesOfInterval,
  createDateWithFullYear,
  getMachineTimezoneName
};
dateUtils.sameView = function(view, date1, date2) {
  return dateUtils[camelize("same " + view)](date1, date2);
};
var date_default3 = dateUtils;

// node_modules/devextreme/esm/format_helper.js
var format_helper_default = dependency_injector_default({
  format: function(value2, _format) {
    var formatIsValid = isString(_format) && "" !== _format || isPlainObject(_format) || isFunction(_format);
    var valueIsValid = isNumeric(value2) || isDate(value2);
    if (!formatIsValid || !valueIsValid) {
      return isDefined(value2) ? value2.toString() : "";
    }
    if (isFunction(_format)) {
      return _format(value2);
    }
    if (isString(_format)) {
      _format = {
        type: _format
      };
    }
    if (isNumeric(value2)) {
      return number_default2.format(value2, _format);
    }
    if (isDate(value2)) {
      return date_default2.format(value2, _format);
    }
  },
  getTimeFormat: function(showSecond) {
    return showSecond ? "longtime" : "shorttime";
  },
  _normalizeFormat: function(format2) {
    if (!Array.isArray(format2)) {
      return format2;
    }
    if (1 === format2.length) {
      return format2[0];
    }
    return function(date) {
      return format2.map(function(formatPart) {
        return date_default2.format(date, formatPart);
      }).join(" ");
    };
  },
  getDateFormatByDifferences: function(dateDifferences, intervalFormat) {
    var resultFormat = [];
    var needSpecialSecondFormatter = intervalFormat && dateDifferences.millisecond && !(dateDifferences.year || dateDifferences.month || dateDifferences.day);
    if (needSpecialSecondFormatter) {
      resultFormat.push(function(date) {
        return date.getSeconds() + date.getMilliseconds() / 1e3 + "s";
      });
    } else if (dateDifferences.millisecond) {
      resultFormat.push("millisecond");
    }
    if (dateDifferences.hour || dateDifferences.minute || !needSpecialSecondFormatter && dateDifferences.second) {
      resultFormat.unshift(this.getTimeFormat(dateDifferences.second));
    }
    if (dateDifferences.year && dateDifferences.month && dateDifferences.day) {
      if (intervalFormat && "month" === intervalFormat) {
        return "monthandyear";
      } else {
        resultFormat.unshift("shortdate");
        return this._normalizeFormat(resultFormat);
      }
    }
    if (dateDifferences.year && dateDifferences.month) {
      return "monthandyear";
    }
    if (dateDifferences.year && dateDifferences.quarter) {
      return "quarterandyear";
    }
    if (dateDifferences.year) {
      return "year";
    }
    if (dateDifferences.quarter) {
      return "quarter";
    }
    if (dateDifferences.month && dateDifferences.day) {
      if (intervalFormat) {
        resultFormat.unshift(function(date) {
          return date_default2.getMonthNames("abbreviated")[date.getMonth()] + " " + date_default2.format(date, "day");
        });
      } else {
        resultFormat.unshift("monthandday");
      }
      return this._normalizeFormat(resultFormat);
    }
    if (dateDifferences.month) {
      return "month";
    }
    if (dateDifferences.day) {
      if (intervalFormat) {
        resultFormat.unshift("day");
      } else {
        resultFormat.unshift(function(date) {
          return date_default2.format(date, "dayofweek") + ", " + date_default2.format(date, "day");
        });
      }
      return this._normalizeFormat(resultFormat);
    }
    return this._normalizeFormat(resultFormat);
  },
  getDateFormatByTicks: function(ticks) {
    var maxDiff;
    var currentDiff;
    var i;
    if (ticks.length > 1) {
      maxDiff = date_default3.getDatesDifferences(ticks[0], ticks[1]);
      for (i = 1; i < ticks.length - 1; i++) {
        currentDiff = date_default3.getDatesDifferences(ticks[i], ticks[i + 1]);
        if (maxDiff.count < currentDiff.count) {
          maxDiff = currentDiff;
        }
      }
    } else {
      maxDiff = {
        year: true,
        month: true,
        day: true,
        hour: ticks[0].getHours() > 0,
        minute: ticks[0].getMinutes() > 0,
        second: ticks[0].getSeconds() > 0,
        millisecond: ticks[0].getMilliseconds() > 0
      };
    }
    var resultFormat = this.getDateFormatByDifferences(maxDiff);
    return resultFormat;
  },
  getDateFormatByTickInterval: function(startValue, endValue, tickInterval) {
    var dateUnitInterval;
    var correctDateDifferences = function(dateDifferences2, tickInterval2, value2) {
      switch (tickInterval2) {
        case "year":
        case "quarter":
          dateDifferences2.month = value2;
        case "month":
          dateDifferences2.day = value2;
        case "week":
        case "day":
          dateDifferences2.hour = value2;
        case "hour":
          dateDifferences2.minute = value2;
        case "minute":
          dateDifferences2.second = value2;
        case "second":
          dateDifferences2.millisecond = value2;
      }
    };
    tickInterval = isString(tickInterval) ? tickInterval.toLowerCase() : tickInterval;
    var dateDifferences = date_default3.getDatesDifferences(startValue, endValue);
    if (startValue !== endValue) {
      !function(differences, minDate, maxDate) {
        if (!maxDate.getMilliseconds() && maxDate.getSeconds()) {
          if (maxDate.getSeconds() - minDate.getSeconds() === 1) {
            differences.millisecond = true;
            differences.second = false;
          }
        } else if (!maxDate.getSeconds() && maxDate.getMinutes()) {
          if (maxDate.getMinutes() - minDate.getMinutes() === 1) {
            differences.second = true;
            differences.minute = false;
          }
        } else if (!maxDate.getMinutes() && maxDate.getHours()) {
          if (maxDate.getHours() - minDate.getHours() === 1) {
            differences.minute = true;
            differences.hour = false;
          }
        } else if (!maxDate.getHours() && maxDate.getDate() > 1) {
          if (maxDate.getDate() - minDate.getDate() === 1) {
            differences.hour = true;
            differences.day = false;
          }
        } else if (1 === maxDate.getDate() && maxDate.getMonth()) {
          if (maxDate.getMonth() - minDate.getMonth() === 1) {
            differences.day = true;
            differences.month = false;
          }
        } else if (!maxDate.getMonth() && maxDate.getFullYear()) {
          if (maxDate.getFullYear() - minDate.getFullYear() === 1) {
            differences.month = true;
            differences.year = false;
          }
        }
      }(dateDifferences, startValue > endValue ? endValue : startValue, startValue > endValue ? startValue : endValue);
    }
    dateUnitInterval = date_default3.getDateUnitInterval(dateDifferences);
    correctDateDifferences(dateDifferences, dateUnitInterval, true);
    dateUnitInterval = date_default3.getDateUnitInterval(tickInterval || "second");
    correctDateDifferences(dateDifferences, dateUnitInterval, false);
    dateDifferences[{
      week: "day"
    }[dateUnitInterval] || dateUnitInterval] = true;
    var resultFormat = this.getDateFormatByDifferences(dateDifferences);
    return resultFormat;
  }
});

// node_modules/devextreme/esm/ui/shared/filtering.js
var DEFAULT_DATE_INTERVAL = ["year", "month", "day"];
var DEFAULT_DATETIME_INTERVAL = ["year", "month", "day", "hour", "minute"];
var isDateType = function(dataType) {
  return "date" === dataType || "datetime" === dataType;
};
var getGroupInterval = function(column) {
  var index2;
  var result = [];
  var dateIntervals = ["year", "month", "day", "hour", "minute", "second"];
  var groupInterval = column.headerFilter && column.headerFilter.groupInterval;
  var interval = "quarter" === groupInterval ? "month" : groupInterval;
  if (isDateType(column.dataType) && null !== groupInterval) {
    result = "datetime" === column.dataType ? DEFAULT_DATETIME_INTERVAL : DEFAULT_DATE_INTERVAL;
    index2 = dateIntervals.indexOf(interval);
    if (index2 >= 0) {
      result = dateIntervals.slice(0, index2);
      result.push(groupInterval);
      return result;
    }
    return result;
  } else if (isDefined(groupInterval)) {
    return Array.isArray(groupInterval) ? groupInterval : [groupInterval];
  }
};
var filtering_default = /* @__PURE__ */ function() {
  var getFilterSelector = function(column, target) {
    var selector = column.dataField || column.selector;
    if ("search" === target) {
      selector = column.displayField || column.calculateDisplayValue || selector;
    }
    return selector;
  };
  var getFilterExpressionByRange = function(filterValue, target) {
    var endFilterValue;
    var startFilterExpression;
    var endFilterExpression;
    var selector = getFilterSelector(this, target);
    if (Array.isArray(filterValue) && isDefined(filterValue[0]) && isDefined(filterValue[1])) {
      startFilterExpression = [selector, ">=", filterValue[0]];
      endFilterExpression = [selector, "<=", filterValue[1]];
      if (isDateType(this.dataType) && (date = filterValue[1], date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1)) {
        endFilterValue = new Date(filterValue[1].getTime());
        if ("date" === this.dataType) {
          endFilterValue.setDate(filterValue[1].getDate() + 1);
        }
        endFilterExpression = [selector, "<", endFilterValue];
      }
      return [startFilterExpression, "and", endFilterExpression];
    }
    var date;
  };
  var getFilterExpressionForDate = function(filterValue, selectedFilterOperation, target) {
    var dateStart;
    var dateEnd;
    var dateInterval;
    var values = function(dateValue) {
      if (isDate(dateValue)) {
        return [dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
      }
      return map(("" + dateValue).split("/"), function(value2, index2) {
        return 1 === index2 ? Number(value2) - 1 : Number(value2);
      });
    }(filterValue);
    var selector = getFilterSelector(this, target);
    if ("headerFilter" === target) {
      dateInterval = getGroupInterval(this)[values.length - 1];
    } else if ("datetime" === this.dataType) {
      dateInterval = "minute";
    }
    switch (dateInterval) {
      case "year":
        dateStart = new Date(values[0], 0, 1);
        dateEnd = new Date(values[0] + 1, 0, 1);
        break;
      case "month":
        dateStart = new Date(values[0], values[1], 1);
        dateEnd = new Date(values[0], values[1] + 1, 1);
        break;
      case "quarter":
        dateStart = new Date(values[0], 3 * values[1], 1);
        dateEnd = new Date(values[0], 3 * values[1] + 3, 1);
        break;
      case "hour":
        dateStart = new Date(values[0], values[1], values[2], values[3]);
        dateEnd = new Date(values[0], values[1], values[2], values[3] + 1);
        break;
      case "minute":
        dateStart = new Date(values[0], values[1], values[2], values[3], values[4]);
        dateEnd = new Date(values[0], values[1], values[2], values[3], values[4] + 1);
        break;
      case "second":
        dateStart = new Date(values[0], values[1], values[2], values[3], values[4], values[5]);
        dateEnd = new Date(values[0], values[1], values[2], values[3], values[4], values[5] + 1);
        break;
      default:
        dateStart = new Date(values[0], values[1], values[2]);
        dateEnd = new Date(values[0], values[1], values[2] + 1);
    }
    switch (selectedFilterOperation) {
      case "<":
        return [selector, "<", dateStart];
      case "<=":
        return [selector, "<", dateEnd];
      case ">":
        return [selector, ">=", dateEnd];
      case ">=":
        return [selector, ">=", dateStart];
      case "<>":
        return [
          [selector, "<", dateStart],
          "or",
          [selector, ">=", dateEnd]
        ];
      default:
        return [
          [selector, ">=", dateStart],
          "and",
          [selector, "<", dateEnd]
        ];
    }
  };
  var getFilterExpressionForNumber = function(filterValue, selectedFilterOperation, target) {
    var selector = getFilterSelector(this, target);
    var groupInterval = getGroupInterval(this);
    if ("headerFilter" === target && groupInterval && isDefined(filterValue)) {
      var values = ("" + filterValue).split("/");
      var value2 = Number(values[values.length - 1]);
      var interval = groupInterval[values.length - 1];
      var startFilterValue = [selector, ">=", value2];
      var endFilterValue = [selector, "<", value2 + interval];
      var condition = [startFilterValue, "and", endFilterValue];
      return condition;
    }
    return [selector, selectedFilterOperation || "=", filterValue];
  };
  return {
    defaultCalculateFilterExpression: function(filterValue, selectedFilterOperation, target) {
      var column = this;
      var selector = getFilterSelector(column, target);
      var isSearchByDisplayValue = column.calculateDisplayValue && "search" === target;
      var dataType = isSearchByDisplayValue && column.lookup && column.lookup.dataType || column.dataType;
      var filter = null;
      if (("headerFilter" === target || "filterBuilder" === target) && null === filterValue) {
        filter = [selector, selectedFilterOperation || "=", null];
        if ("string" === dataType) {
          filter = [filter, "=" === selectedFilterOperation ? "or" : "and", [selector, selectedFilterOperation || "=", ""]];
        }
      } else if ("string" === dataType && (!column.lookup || isSearchByDisplayValue)) {
        filter = [selector, selectedFilterOperation || "contains", filterValue];
      } else if ("between" === selectedFilterOperation) {
        return getFilterExpressionByRange.apply(column, [filterValue, target]);
      } else if (isDateType(dataType) && isDefined(filterValue)) {
        return getFilterExpressionForDate.apply(column, arguments);
      } else if ("number" === dataType) {
        return getFilterExpressionForNumber.apply(column, arguments);
      } else {
        filter = [selector, selectedFilterOperation || "=", filterValue];
      }
      return filter;
    },
    getGroupInterval
  };
}();

// node_modules/devextreme/esm/__internal/grids/grid_core/m_utils.js
var DATAGRID_SELECTION_DISABLED_CLASS = "dx-selection-disabled";
var DATAGRID_GROUP_OPENED_CLASS = "dx-datagrid-group-opened";
var DATAGRID_GROUP_CLOSED_CLASS = "dx-datagrid-group-closed";
var DATAGRID_EXPAND_CLASS = "dx-datagrid-expand";
var NO_DATA_CLASS = "nodata";
var SCROLLING_MODE_INFINITE = "infinite";
var SCROLLING_MODE_VIRTUAL = "virtual";
var LEGACY_SCROLLING_MODE = "scrolling.legacyMode";
var SCROLLING_MODE_OPTION = "scrolling.mode";
var ROW_RENDERING_MODE_OPTION = "scrolling.rowRenderingMode";
var DATE_INTERVAL_SELECTORS = {
  year: (value2) => value2 && value2.getFullYear(),
  month: (value2) => value2 && value2.getMonth() + 1,
  day: (value2) => value2 && value2.getDate(),
  quarter: (value2) => value2 && Math.floor(value2.getMonth() / 3) + 1,
  hour: (value2) => value2 && value2.getHours(),
  minute: (value2) => value2 && value2.getMinutes(),
  second: (value2) => value2 && value2.getSeconds()
};
var getIntervalSelector = function() {
  var data2 = arguments[1];
  var value2 = this.calculateCellValue(data2);
  if (!isDefined(value2)) {
    return null;
  }
  if (isDateType2(this.dataType)) {
    var nameIntervalSelector = arguments[0];
    return DATE_INTERVAL_SELECTORS[nameIntervalSelector](value2);
  }
  if ("number" === this.dataType) {
    var groupInterval = arguments[0];
    return Math.floor(Number(value2) / groupInterval) * groupInterval;
  }
};
var equalSelectors = function(selector1, selector2) {
  if (isFunction(selector1) && isFunction(selector2)) {
    if (selector1.originalCallback && selector2.originalCallback) {
      return selector1.originalCallback === selector2.originalCallback && selector1.columnIndex === selector2.columnIndex;
    }
  }
  return selector1 === selector2;
};
function isDateType2(dataType) {
  return "date" === dataType || "datetime" === dataType;
}
var setEmptyText = function($container) {
  $container.get(0).textContent = " ";
};
var normalizeSortingInfo2 = function(sort) {
  sort = sort || [];
  var result = normalizeSortingInfo(sort);
  for (var i = 0; i < sort.length; i++) {
    if (sort && sort[i] && void 0 !== sort[i].isExpanded) {
      result[i].isExpanded = sort[i].isExpanded;
    }
    if (sort && sort[i] && void 0 !== sort[i].groupInterval) {
      result[i].groupInterval = sort[i].groupInterval;
    }
  }
  return result;
};
var formatValue2 = function(value2, options) {
  var valueText = format_helper_default.format(value2, options.format) || value2 && value2.toString() || "";
  var formatObject = {
    value: value2,
    valueText: options.getDisplayFormat ? options.getDisplayFormat(valueText) : valueText,
    target: options.target || "row",
    groupInterval: options.groupInterval
  };
  return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText;
};
var getSummaryText = function(summaryItem, summaryTexts) {
  var displayFormat = summaryItem.displayFormat || summaryItem.columnCaption && summaryTexts["".concat(summaryItem.summaryType, "OtherColumn")] || summaryTexts[summaryItem.summaryType];
  return formatValue2(summaryItem.value, {
    format: summaryItem.valueFormat,
    getDisplayFormat: (valueText) => displayFormat ? format(displayFormat, valueText, summaryItem.columnCaption) : valueText,
    customizeText: summaryItem.customizeText
  });
};
var getWidgetInstance = function($element) {
  var editorData = $element.data && $element.data();
  var dxComponents = editorData && editorData.dxComponents;
  var widgetName = dxComponents && dxComponents[0];
  return widgetName && editorData[widgetName];
};
var equalFilterParameters = function equalFilterParameters2(filter1, filter2) {
  if (Array.isArray(filter1) && Array.isArray(filter2)) {
    if (filter1.length !== filter2.length) {
      return false;
    }
    for (var i = 0; i < filter1.length; i++) {
      if (!equalFilterParameters2(filter1[i], filter2[i])) {
        return false;
      }
    }
    return true;
  }
  if (isFunction(filter1) && filter1.columnIndex >= 0 && isFunction(filter2) && filter2.columnIndex >= 0) {
    return filter1.columnIndex === filter2.columnIndex && toComparable(filter1.filterValue) === toComparable(filter2.filterValue) && toComparable(filter1.selectedFilterOperation) === toComparable(filter2.selectedFilterOperation);
  }
  return toComparable(filter1) == toComparable(filter2);
};
function normalizeGroupingLoadOptions(group) {
  if (!Array.isArray(group)) {
    group = [group];
  }
  return group.map((item, i) => {
    if (isString(item)) {
      return {
        selector: item,
        isExpanded: i < group.length - 1
      };
    }
    return item;
  });
}
var m_utils_default = {
  renderNoDataText($element) {
    $element = $element || this.element();
    if (!$element) {
      return;
    }
    var noDataClass = this.addWidgetPrefix(NO_DATA_CLASS);
    var noDataElement = $element.find(".".concat(noDataClass)).last();
    var isVisible2 = this._dataController.isEmpty();
    var isLoading = this._dataController.isLoading();
    if (!noDataElement.length) {
      noDataElement = renderer_default("<span>").addClass(noDataClass);
    }
    if (!noDataElement.parent().is($element)) {
      noDataElement.appendTo($element);
    }
    if (isVisible2 && !isLoading) {
      noDataElement.removeClass("dx-hidden").text(this._getNoDataText());
    } else {
      noDataElement.addClass("dx-hidden");
    }
  },
  renderLoadPanel($element, $container, isLocalStore) {
    var loadPanelOptions;
    this._loadPanel && this._loadPanel.$element().remove();
    loadPanelOptions = this.option("loadPanel");
    if (loadPanelOptions && ("auto" === loadPanelOptions.enabled ? !isLocalStore : loadPanelOptions.enabled)) {
      loadPanelOptions = extend({
        shading: false,
        message: loadPanelOptions.text,
        container: $container
      }, loadPanelOptions);
      this._loadPanel = this._createComponent(renderer_default("<div>").appendTo($container), load_panel_default, loadPanelOptions);
    } else {
      this._loadPanel = null;
    }
  },
  calculateLoadPanelPosition($element) {
    var $window = renderer_default(getWindow());
    if (getHeight($element) > getHeight($window)) {
      return {
        of: $window,
        boundary: $element,
        collision: "fit"
      };
    }
    return {
      of: $element
    };
  },
  getIndexByKey(key, items, keyName) {
    var index2 = -1;
    if (void 0 !== key && Array.isArray(items)) {
      keyName = arguments.length <= 2 ? "key" : keyName;
      for (var i = 0; i < items.length; i++) {
        var item = isDefined(keyName) ? items[i][keyName] : items[i];
        if (equalByValue(key, item)) {
          index2 = i;
          break;
        }
      }
    }
    return index2;
  },
  combineFilters(filters, operation) {
    var _a;
    var resultFilter = [];
    operation = operation || "and";
    for (var i = 0; i < filters.length; i++) {
      if (!filters[i]) {
        continue;
      }
      if (1 === (null === (_a = filters[i]) || void 0 === _a ? void 0 : _a.length) && "!" === filters[i][0]) {
        if ("and" === operation) {
          return ["!"];
        }
        if ("or" === operation) {
          continue;
        }
      }
      if (resultFilter.length) {
        resultFilter.push(operation);
      }
      resultFilter.push(filters[i]);
    }
    if (1 === resultFilter.length) {
      resultFilter = resultFilter[0];
    }
    if (resultFilter.length) {
      return resultFilter;
    }
    return;
  },
  checkChanges(changes, changeNames) {
    var changesWithChangeNamesCount = 0;
    for (var i = 0; i < changeNames.length; i++) {
      if (changes[changeNames[i]]) {
        changesWithChangeNamesCount++;
      }
    }
    return changes.length && changes.length === changesWithChangeNamesCount;
  },
  equalFilterParameters,
  proxyMethod(instance, methodName, defaultResult) {
    if (!instance[methodName]) {
      instance[methodName] = function() {
        var dataSource = this._dataSource;
        return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
      };
    }
  },
  formatValue: formatValue2,
  getFormatOptionsByColumn: (column, target) => ({
    format: column.format,
    getDisplayFormat: column.getDisplayFormat,
    customizeText: column.customizeText,
    target,
    trueText: column.trueText,
    falseText: column.falseText
  }),
  getDisplayValue(column, value2, data2, rowType) {
    if (column.displayValueMap && void 0 !== column.displayValueMap[value2]) {
      return column.displayValueMap[value2];
    }
    if (column.calculateDisplayValue && data2 && "group" !== rowType) {
      return column.calculateDisplayValue(data2);
    }
    if (column.lookup && !("group" === rowType && (column.calculateGroupValue || column.calculateDisplayValue))) {
      return column.lookup.calculateCellValue(value2);
    }
    return value2;
  },
  getGroupRowSummaryText(summaryItems, summaryTexts) {
    var result = "(";
    for (var i = 0; i < summaryItems.length; i++) {
      var summaryItem = summaryItems[i];
      result += (i > 0 ? ", " : "") + getSummaryText(summaryItem, summaryTexts);
    }
    return result + ")";
  },
  getSummaryText,
  normalizeSortingInfo: normalizeSortingInfo2,
  getFormatByDataType(dataType) {
    switch (dataType) {
      case "date":
        return "shortDate";
      case "datetime":
        return "shortDateShortTime";
      default:
        return;
    }
  },
  getHeaderFilterGroupParameters(column, remoteGrouping) {
    var result = [];
    var dataField = column.dataField || column.name;
    var groupInterval = filtering_default.getGroupInterval(column);
    if (groupInterval) {
      each(groupInterval, (index2, interval) => {
        result.push(remoteGrouping ? {
          selector: dataField,
          groupInterval: interval,
          isExpanded: index2 < groupInterval.length - 1
        } : getIntervalSelector.bind(column, interval));
      });
      return result;
    }
    if (remoteGrouping) {
      result = [{
        selector: dataField,
        isExpanded: false
      }];
    } else {
      result = function(data2) {
        var result2 = column.calculateCellValue(data2);
        if (void 0 === result2 || "" === result2) {
          result2 = null;
        }
        return result2;
      };
      if (column.sortingMethod) {
        result = [{
          selector: result,
          compare: column.sortingMethod.bind(column)
        }];
      }
    }
    return result;
  },
  equalSortParameters(sortParameters1, sortParameters2, ignoreIsExpanded) {
    sortParameters1 = normalizeSortingInfo2(sortParameters1);
    sortParameters2 = normalizeSortingInfo2(sortParameters2);
    if (Array.isArray(sortParameters1) && Array.isArray(sortParameters2)) {
      if (sortParameters1.length !== sortParameters2.length) {
        return false;
      }
      for (var i = 0; i < sortParameters1.length; i++) {
        if (!equalSelectors(sortParameters1[i].selector, sortParameters2[i].selector) || sortParameters1[i].desc !== sortParameters2[i].desc || sortParameters1[i].groupInterval !== sortParameters2[i].groupInterval || !ignoreIsExpanded && Boolean(sortParameters1[i].isExpanded) !== Boolean(sortParameters2[i].isExpanded)) {
          return false;
        }
      }
      return true;
    }
    return (!sortParameters1 || !sortParameters1.length) === (!sortParameters2 || !sortParameters2.length);
  },
  getPointsByColumns(items, pointCreated, isVertical, startColumnIndex) {
    var cellsLength = items.length;
    var notCreatePoint = false;
    var item;
    var offset2;
    var columnIndex = startColumnIndex || 0;
    var result = [];
    var rtlEnabled;
    for (var i = 0; i <= cellsLength; i++) {
      if (i < cellsLength) {
        item = items.eq(i);
        offset2 = item.offset();
        rtlEnabled = "rtl" === item.css("direction");
      }
      var point = {
        index: columnIndex,
        x: offset2 ? offset2.left + (!isVertical && rtlEnabled ^ i === cellsLength ? getBoundingRect(item[0]).width : 0) : 0,
        y: offset2 ? offset2.top + (isVertical && i === cellsLength ? getBoundingRect(item[0]).height : 0) : 0,
        columnIndex
      };
      if (!isVertical && i > 0) {
        var prevItemOffset = items.eq(i - 1).offset();
        if (prevItemOffset.top < point.y) {
          point.y = prevItemOffset.top;
        }
      }
      if (pointCreated) {
        notCreatePoint = pointCreated(point);
      }
      if (!notCreatePoint) {
        result.push(point);
      }
      columnIndex++;
    }
    return result;
  },
  getExpandCellTemplate: () => ({
    allowRenderToDetachedContainer: true,
    render(container, options) {
      var $container = renderer_default(container);
      if (isDefined(options.value) && !(options.data && options.data.isContinuation) && !options.row.isNewRow) {
        var rowsView = options.component.getView("rowsView");
        $container.addClass(DATAGRID_EXPAND_CLASS).addClass(DATAGRID_SELECTION_DISABLED_CLASS);
        renderer_default("<div>").addClass(options.value ? DATAGRID_GROUP_OPENED_CLASS : DATAGRID_GROUP_CLOSED_CLASS).appendTo($container);
        rowsView.setAria("label", options.value ? rowsView.localize("dxDataGrid-ariaCollapse") : rowsView.localize("dxDataGrid-ariaExpand"), $container);
      } else {
        setEmptyText($container);
      }
    }
  }),
  setEmptyText,
  isDateType: isDateType2,
  getSelectionRange(focusedElement) {
    try {
      if (focusedElement) {
        return {
          selectionStart: focusedElement.selectionStart,
          selectionEnd: focusedElement.selectionEnd
        };
      }
    } catch (e) {
    }
    return {};
  },
  setSelectionRange(focusedElement, selectionRange) {
    try {
      if (focusedElement && focusedElement.setSelectionRange) {
        focusedElement.setSelectionRange(selectionRange.selectionStart, selectionRange.selectionEnd);
      }
    } catch (e) {
    }
  },
  focusAndSelectElement(component, $element) {
    var isFocused = $element.is(":focus");
    events_engine_default.trigger($element, "focus");
    var isSelectTextOnEditingStart = component.option("editing.selectTextOnEditStart");
    var element = $element.get(0);
    if (!isFocused && isSelectTextOnEditingStart && $element.is(".dx-texteditor-input") && !$element.is("[readonly]")) {
      var editor = getWidgetInstance($element.closest(".dx-texteditor"));
      when(editor && editor._loadItemDeferred).done(() => {
        element.select();
      });
    }
  },
  getWidgetInstance,
  getLastResizableColumnIndex(columns, resultWidths) {
    var hasResizableColumns = columns.some((column2) => column2 && !column2.command && !column2.fixed && false !== column2.allowResizing);
    var lastColumnIndex;
    for (lastColumnIndex = columns.length - 1; columns[lastColumnIndex]; lastColumnIndex--) {
      var column = columns[lastColumnIndex];
      var width = resultWidths && resultWidths[lastColumnIndex];
      var allowResizing = !hasResizableColumns || false !== column.allowResizing;
      if (!column.command && !column.fixed && "adaptiveHidden" !== width && allowResizing) {
        break;
      }
    }
    return lastColumnIndex;
  },
  isElementInCurrentGrid(controller, $element) {
    if ($element && $element.length) {
      var $grid = $element.closest(".".concat(controller.getWidgetContainerClass())).parent();
      return $grid.is(controller.component.$element());
    }
    return false;
  },
  isVirtualRowRendering(that) {
    var rowRenderingMode = that.option(ROW_RENDERING_MODE_OPTION);
    var isVirtualMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_VIRTUAL;
    var isAppendMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_INFINITE;
    if (false === that.option(LEGACY_SCROLLING_MODE) && (isVirtualMode || isAppendMode)) {
      return true;
    }
    return rowRenderingMode === SCROLLING_MODE_VIRTUAL;
  },
  getPixelRatio: (window16) => window16.devicePixelRatio || 1,
  getContentHeightLimit(browser) {
    if (browser.mozilla) {
      return 8e6;
    }
    return 15e6 / this.getPixelRatio(getWindow());
  },
  normalizeLookupDataSource(lookup) {
    var lookupDataSourceOptions;
    if (lookup.items) {
      lookupDataSourceOptions = lookup.items;
    } else {
      lookupDataSourceOptions = lookup.dataSource;
      if (isFunction(lookupDataSourceOptions) && !variable_wrapper_default.isWrapped(lookupDataSourceOptions)) {
        lookupDataSourceOptions = lookupDataSourceOptions({});
      }
    }
    return normalizeDataSourceOptions(lookupDataSourceOptions);
  },
  getWrappedLookupDataSource(column, dataSource, filter) {
    if (!dataSource) {
      return [];
    }
    var lookupDataSourceOptions = this.normalizeLookupDataSource(column.lookup);
    if (column.calculateCellValue !== column.defaultCalculateCellValue) {
      return lookupDataSourceOptions;
    }
    var hasGroupPaging = dataSource.remoteOperations().groupPaging;
    var hasLookupOptimization = column.displayField && isString(column.displayField);
    var cachedUniqueRelevantItems;
    var previousTake;
    var previousSkip;
    var sliceItems = (items, loadOptions) => {
      var _a;
      var start = null !== (_a = loadOptions.skip) && void 0 !== _a ? _a : 0;
      var end = loadOptions.take ? start + loadOptions.take : items.length;
      return items.slice(start, end);
    };
    var lookupDataSource = _extends(_extends({}, lookupDataSourceOptions), {
      __dataGridSourceFilter: filter,
      load: (loadOptions) => {
        var d = new Deferred();
        ((loadOptions2) => {
          var group = normalizeGroupingLoadOptions(hasLookupOptimization ? [column.dataField, column.displayField] : column.dataField);
          var d2 = new Deferred();
          var canUseCache = cachedUniqueRelevantItems && (!hasGroupPaging || loadOptions2.skip === previousSkip && loadOptions2.take === previousTake);
          if (canUseCache) {
            d2.resolve(sliceItems(cachedUniqueRelevantItems, loadOptions2));
          } else {
            previousSkip = loadOptions2.skip;
            previousTake = loadOptions2.take;
            dataSource.load({
              filter,
              group,
              take: hasGroupPaging ? loadOptions2.take : void 0,
              skip: hasGroupPaging ? loadOptions2.skip : void 0
            }).done((items) => {
              cachedUniqueRelevantItems = items;
              d2.resolve(hasGroupPaging ? items : sliceItems(items, loadOptions2));
            }).fail(d2.fail);
          }
          return d2;
        })(loadOptions).done((items) => {
          if (0 === items.length) {
            d.resolve([]);
            return;
          }
          var filter2 = this.combineFilters(items.flatMap((data2) => data2.key).map((key) => [column.lookup.valueExpr, key]), "or");
          var newDataSource = new DataSource(_extends(_extends(_extends({}, lookupDataSourceOptions), loadOptions), {
            filter: this.combineFilters([filter2, loadOptions.filter], "and"),
            paginate: false
          }));
          newDataSource.load().done(d.resolve).fail(d.fail);
        }).fail(d.fail);
        return d;
      },
      key: column.lookup.valueExpr,
      byKey(key) {
        var d = Deferred();
        this.load({
          filter: [column.lookup.valueExpr, "=", key]
        }).done((arr) => {
          d.resolve(arr[0]);
        });
        return d.promise();
      }
    });
    return lookupDataSource;
  },
  logHeaderFilterDeprecatedWarningIfNeed(component) {
    var logWarning = component._logDeprecatedOptionWarning.bind(component);
    if (isDefined(component.option("headerFilter.allowSearch"))) {
      logWarning("headerFilter.allowSearch", {
        since: "23.1",
        alias: "headerFilter.search.enabled"
      });
    }
    if (isDefined(component.option("headerFilter.searchTimeout"))) {
      logWarning("headerFilter.searchTimeout", {
        since: "23.1",
        alias: "headerFilter.search.timeout"
      });
    }
    var specificName = "dxPivotGrid" === component.NAME ? "dataSource.fields" : "columns";
    var columns = component.option(specificName);
    if (!Array.isArray(columns)) {
      return;
    }
    var logSpecificDeprecatedWarningIfNeed = (columns2) => {
      columns2.forEach((column) => {
        var _a;
        var headerFilter = column.headerFilter || {};
        if (isDefined(headerFilter.allowSearch)) {
          logWarning("".concat(specificName, "[].headerFilter.allowSearch"), {
            since: "23.1",
            alias: "".concat(specificName, "[].headerFilter.search.enabled")
          });
        }
        if (isDefined(headerFilter.searchMode)) {
          logWarning("".concat(specificName, "[].headerFilter.searchMode"), {
            since: "23.1",
            alias: "".concat(specificName, "[].headerFilter.search.mode")
          });
        }
        if (null === (_a = column.columns) || void 0 === _a ? void 0 : _a.length) {
          logSpecificDeprecatedWarningIfNeed(column.columns);
        }
      });
    };
    logSpecificDeprecatedWarningIfNeed(columns);
  }
};

export {
  type,
  isBoolean,
  isDate,
  isDefined,
  isFunction,
  isString,
  isNumeric,
  isObject,
  isEmptyObject,
  isPlainObject,
  isPrimitive,
  isWindow,
  isRenderer,
  isPromise,
  isDeferred,
  extend,
  logger,
  encodeHtml,
  quadToObject,
  format,
  isEmpty,
  errors_default,
  map,
  each,
  class_default,
  dependency_injector_default,
  getFormatter3 as getFormatter,
  config_default,
  guid_default,
  callbacks_default,
  fromPromise,
  Deferred,
  when,
  variable_wrapper_default,
  orderEach,
  deepExtendArraySafe,
  getPathParts,
  compileGetter,
  compileSetter,
  toComparable,
  ensureDefined,
  executeAsync,
  deferRender,
  deferUpdate,
  deferRenderer,
  deferUpdater,
  splitPair,
  pairToObject,
  getKeyHash,
  escapeRegExp,
  applyServerDecimalSeparator,
  noop2 as noop,
  asyncNoop,
  grep,
  equalByValue,
  sign,
  fitIntoRange,
  inRange,
  adjust,
  getFormat,
  number_default2 as number_default,
  getFormat2,
  getRegExpInfo,
  getPatternSetters,
  default_date_names_default,
  date_default2 as date_default,
  dasherize,
  camelize,
  titleize,
  captionize,
  message_default,
  dom_adapter_default,
  hasWindow,
  getWindow,
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  events_engine_default,
  data,
  cleanDataRecursive,
  styleProp,
  stylePropPrefix,
  normalizeStyleProp,
  setWidth2 as setWidth,
  setHeight2 as setHeight,
  setStyle,
  addOffsetToMaxHeight,
  addOffsetToMinHeight,
  getVerticalOffsets,
  getVisibleHeight,
  getWidth,
  setWidth as setWidth2,
  getHeight,
  setHeight as setHeight2,
  getOuterWidth,
  setOuterWidth,
  getOuterHeight,
  setOuterHeight,
  getInnerWidth,
  getInnerHeight,
  getOffset,
  renderer_default,
  event_registrator_default,
  removeEvent,
  getName,
  attachInstanceToElement,
  getInstanceByElement,
  component_registrator_default,
  ready_callbacks_default,
  resize_callbacks_default,
  EventsStrategy,
  getSessionStorage,
  value,
  originalViewPort,
  devices_default,
  inputType,
  touch,
  nativeScrolling,
  ui_errors_default,
  current,
  isMaterialBased,
  isMaterial,
  isFluent,
  isGeneric,
  isCompact,
  waitWebFont,
  Action,
  convertRulesToOptions,
  createDefaultOptionRules,
  resetActiveElement,
  closestCommonParent,
  clipboardText,
  contains2 as contains,
  createTextElementHiddenCopy,
  replaceWith,
  isElementInDom,
  triggerShownEvent,
  triggerResizeEvent,
  TemplateBase,
  FunctionTemplate,
  EmptyTemplate,
  getPublicElement,
  ChildDefaultTemplate,
  getUniqueValues,
  removeDuplicates,
  normalizeIndexes,
  findTemplates,
  focusable,
  focused,
  isMouseEvent,
  isDxMouseWheelEvent,
  isTouchEvent,
  eventData,
  eventDelta,
  needSkipEvent,
  createEvent,
  fireEvent,
  normalizeKeyName,
  getChar,
  addNamespace2 as addNamespace,
  isCommandKeyPressed,
  keyboard_processor_default,
  resize,
  visibility,
  focus,
  dxClick,
  click,
  keyboard,
  dom_component_default,
  compare,
  requestAnimationFrame,
  cancelAnimationFrame,
  browser_default,
  pointer_default,
  emitter_default,
  EVENT_NAME,
  emitter_registrator_default,
  CLICK_EVENT_NAME,
  ACTIVE_EVENT_NAME,
  lock,
  HOVERSTART,
  HOVEREND,
  ui_widget_default,
  load_indicator_default,
  locate,
  move,
  resetPosition,
  getDefaultAlignment,
  getBoundingRect,
  position_default,
  fx_default,
  emitter_gesture_default,
  DRAG_START_EVENT,
  DRAG_EVENT,
  DRAG_END_EVENT,
  DRAG_ENTER_EVENT,
  DRAG_LEAVE_EVENT,
  swatch_container_default,
  OverlayPositionController,
  create,
  remove,
  isLastZIndexInStack,
  ui_overlay_default,
  load_panel_default,
  normalizeSortingInfo,
  aggregators,
  keysEqual,
  errors,
  createObjectWithChanges,
  applyBatch,
  update,
  insert,
  indexByKey,
  store_helper_default,
  abstract_store_default,
  custom_store_default,
  query_default,
  array_store_default,
  normalizeLoadResult,
  normalizeDataSourceOptions,
  DataSource,
  date_default3 as date_default2,
  format_helper_default,
  filtering_default,
  m_utils_default
};
//# sourceMappingURL=chunk-AF2BKCCC.js.map
