"use strict";
exports.id = 586;
exports.ids = [586];
exports.modules = {

/***/ 4342:
/***/ ((module) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js
var require_pad = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js"(exports, module2) {
    module2.exports = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length - size);
    };
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.browser.js
var require_fingerprint_browser = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.browser.js"(exports, module2) {
    var pad = require_pad();
    var env = typeof window === "object" ? window : self;
    var globalCount = Object.keys(env).length;
    var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
    var clientId = pad((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
    module2.exports = function fingerprint() {
      return clientId;
    };
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.browser.js
var require_getRandomValue_browser = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.browser.js"(exports, module2) {
    var getRandomValue;
    var crypto = typeof window !== "undefined" && (window.crypto || window.msCrypto) || typeof self !== "undefined" && self.crypto;
    if (crypto) {
      lim = Math.pow(2, 32) - 1;
      getRandomValue = function() {
        return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
      };
    } else {
      getRandomValue = Math.random;
    }
    var lim;
    module2.exports = getRandomValue;
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js
var require_cuid = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js"(exports, module2) {
    var fingerprint = require_fingerprint_browser();
    var pad = require_pad();
    var getRandomValue = require_getRandomValue_browser();
    var c = 0;
    var blockSize = 4;
    var base = 36;
    var discreteValues = Math.pow(base, blockSize);
    function randomBlock() {
      return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
    }
    function safeCounter() {
      c = c < discreteValues ? c : 0;
      c++;
      return c - 1;
    }
    function cuid3() {
      var letter = "c", timestamp = new Date().getTime().toString(base), counter = pad(safeCounter().toString(base), blockSize), print = fingerprint(), random = randomBlock() + randomBlock();
      return letter + timestamp + counter + print + random;
    }
    cuid3.slug = function slug() {
      var date = new Date().getTime().toString(36), counter = safeCounter().toString(36).slice(-4), print = fingerprint().slice(0, 1) + fingerprint().slice(-1), random = randomBlock().slice(-2);
      return date.slice(-2) + counter + print + random;
    };
    cuid3.isCuid = function isCuid(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      if (stringToCheck.startsWith("c"))
        return true;
      return false;
    };
    cuid3.isSlug = function isSlug(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      var stringLength = stringToCheck.length;
      if (stringLength >= 7 && stringLength <= 10)
        return true;
      return false;
    };
    cuid3.fingerprint = fingerprint;
    module2.exports = cuid3;
  }
});

// ../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/format.js
var require_format = __commonJS({
  "../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.format = void 0;
    var POSITIONALS_EXP = /(%?)(%([sdjo]))/g;
    function serializePositional(positional, flag) {
      switch (flag) {
        case "s":
          return positional;
        case "d":
        case "i":
          return Number(positional);
        case "j":
          return JSON.stringify(positional);
        case "o": {
          if (typeof positional === "string") {
            return positional;
          }
          var json = JSON.stringify(positional);
          if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
            return positional;
          }
          return json;
        }
      }
    }
    function format4(message) {
      var positionals = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        positionals[_i - 1] = arguments[_i];
      }
      if (positionals.length === 0) {
        return message;
      }
      var positionalIndex = 0;
      var formattedMessage = message.replace(POSITIONALS_EXP, function(match, isEscaped, _, flag) {
        var positional = positionals[positionalIndex];
        var value = serializePositional(positional, flag);
        if (!isEscaped) {
          positionalIndex++;
          return value;
        }
        return match;
      });
      if (positionalIndex < positionals.length) {
        formattedMessage += " " + positionals.slice(positionalIndex).join(" ");
      }
      formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
      return formattedMessage;
    }
    exports.format = format4;
  }
});

// ../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/invariant.js
var require_invariant = __commonJS({
  "../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/invariant.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invariant = exports.createInvariantWith = exports.InvariantError = void 0;
    var format_1 = require_format();
    var STACK_FRAMES_TO_IGNORE = 2;
    function cleanErrorStack(error) {
      if (!error.stack) {
        return;
      }
      var nextStack = error.stack.split("\n");
      nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
      error.stack = nextStack.join("\n");
    }
    var InvariantError = function(_super) {
      __extends(InvariantError2, _super);
      function InvariantError2(message) {
        var positionals = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          positionals[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = "Invariant Violation";
        _this.message = format_1.format.apply(void 0, __spreadArray([message], positionals));
        cleanErrorStack(_this);
        return _this;
      }
      return InvariantError2;
    }(Error);
    exports.InvariantError = InvariantError;
    function createInvariantWith(ErrorConstructor) {
      var invariant4 = function(predicate, message) {
        var positionals = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          positionals[_i - 2] = arguments[_i];
        }
        if (!predicate) {
          var resolvedMessage = format_1.format.apply(void 0, __spreadArray([message], positionals));
          var isConstructor = !!ErrorConstructor.prototype.name;
          var error = isConstructor ? new ErrorConstructor(resolvedMessage) : ErrorConstructor(resolvedMessage);
          cleanErrorStack(error);
          throw error;
        }
      };
      return invariant4;
    }
    exports.createInvariantWith = createInvariantWith;
    function polymorphicInvariant(ErrorClass) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return createInvariantWith(ErrorClass).apply(void 0, args);
    }
    exports.invariant = createInvariantWith(InvariantError);
    exports.invariant.as = polymorphicInvariant;
  }
});

// ../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/outvariant@1.3.0/node_modules/outvariant/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_invariant(), exports);
    __exportStar(require_format(), exports);
  }
});

// ../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/createDeferredExecutor.js
var require_createDeferredExecutor = __commonJS({
  "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/createDeferredExecutor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDeferredExecutor = void 0;
    function createDeferredExecutor() {
      const executor = (resolve, reject) => {
        executor.state = "pending";
        executor.resolve = (data) => {
          if (executor.state !== "pending") {
            return;
          }
          executor.result = data;
          const onFulfilled = (value) => {
            executor.state = "fulfilled";
            return value;
          };
          return resolve(data instanceof Promise ? data : Promise.resolve(data).then(onFulfilled));
        };
        executor.reject = (reason) => {
          if (executor.state !== "pending") {
            return;
          }
          queueMicrotask(() => {
            executor.state = "rejected";
          });
          return reject(executor.rejectionReason = reason);
        };
      };
      return executor;
    }
    exports.createDeferredExecutor = createDeferredExecutor;
  }
});

// ../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/DeferredPromise.js
var require_DeferredPromise = __commonJS({
  "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/DeferredPromise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeferredPromise = void 0;
    var createDeferredExecutor_1 = require_createDeferredExecutor();
    var _executor, _decorate, decorate_fn;
    var DeferredPromise4 = class extends Promise {
      constructor(executor = null) {
        const deferredExecutor = (0, createDeferredExecutor_1.createDeferredExecutor)();
        super((originalResolve, originalReject) => {
          deferredExecutor(originalResolve, originalReject);
          executor?.(deferredExecutor.resolve, deferredExecutor.reject);
        });
        __privateAdd(this, _decorate);
        __privateAdd(this, _executor, void 0);
        __publicField(this, "resolve");
        __publicField(this, "reject");
        __privateSet(this, _executor, deferredExecutor);
        this.resolve = __privateGet(this, _executor).resolve;
        this.reject = __privateGet(this, _executor).reject;
      }
      get state() {
        return __privateGet(this, _executor).state;
      }
      get rejectionReason() {
        return __privateGet(this, _executor).rejectionReason;
      }
      then(onFulfilled, onRejected) {
        return __privateMethod(this, _decorate, decorate_fn).call(this, super.then(onFulfilled, onRejected));
      }
      catch(onRejected) {
        return __privateMethod(this, _decorate, decorate_fn).call(this, super.catch(onRejected));
      }
      finally(onfinally) {
        return __privateMethod(this, _decorate, decorate_fn).call(this, super.finally(onfinally));
      }
    };
    _executor = new WeakMap();
    _decorate = new WeakSet();
    decorate_fn = function(promise) {
      return Object.defineProperties(promise, {
        resolve: { configurable: true, value: this.resolve },
        reject: { configurable: true, value: this.reject }
      });
    };
    exports.DeferredPromise = DeferredPromise4;
  }
});

// ../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/index.js
var require_build = __commonJS({
  "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_createDeferredExecutor(), exports);
    __exportStar(require_DeferredPromise(), exports);
  }
});

// ../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/MemoryLeakError.js
var require_MemoryLeakError = __commonJS({
  "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/MemoryLeakError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MemoryLeakError = void 0;
    var MemoryLeakError = class extends Error {
      constructor(emitter, type, count) {
        super(`Possible EventEmitter memory leak detected. ${count} ${type.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`);
        __publicField(this, "emitter");
        __publicField(this, "type");
        __publicField(this, "count");
        this.emitter = emitter;
        this.type = type;
        this.count = count;
        this.name = "MaxListenersExceededWarning";
      }
    };
    exports.MemoryLeakError = MemoryLeakError;
  }
});

// ../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/Emitter.js
var require_Emitter = __commonJS({
  "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/Emitter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Emitter = void 0;
    var MemoryLeakError_1 = require_MemoryLeakError();
    var _events, _maxListeners, _hasWarnedAboutPotentialMemortyLeak, _getListeners, getListeners_fn, _removeListener, removeListener_fn, _wrapOnceListener, wrapOnceListener_fn, _internalEmit, internalEmit_fn;
    var _Emitter = class {
      constructor() {
        __privateAdd(this, _getListeners);
        __privateAdd(this, _removeListener);
        __privateAdd(this, _wrapOnceListener);
        __privateAdd(this, _internalEmit);
        __privateAdd(this, _events, void 0);
        __privateAdd(this, _maxListeners, void 0);
        __privateAdd(this, _hasWarnedAboutPotentialMemortyLeak, void 0);
        __privateSet(this, _events, /* @__PURE__ */ new Map());
        __privateSet(this, _maxListeners, _Emitter.defaultMaxListeners);
        __privateSet(this, _hasWarnedAboutPotentialMemortyLeak, false);
      }
      static listenerCount(emitter, eventName) {
        return emitter.listenerCount(eventName);
      }
      setMaxListeners(maxListeners) {
        __privateSet(this, _maxListeners, maxListeners);
        return this;
      }
      getMaxListeners() {
        return __privateGet(this, _maxListeners);
      }
      eventNames() {
        return Array.from(__privateGet(this, _events).keys());
      }
      emit(eventName, ...data) {
        const listeners = __privateMethod(this, _getListeners, getListeners_fn).call(this, eventName);
        listeners.forEach((listener) => {
          listener.apply(this, data);
        });
        return listeners.length > 0;
      }
      addListener(eventName, listener) {
        __privateMethod(this, _internalEmit, internalEmit_fn).call(this, "newListener", eventName, listener);
        const nextListeners = __privateMethod(this, _getListeners, getListeners_fn).call(this, eventName).concat(listener);
        __privateGet(this, _events).set(eventName, nextListeners);
        if (__privateGet(this, _maxListeners) > 0 && this.listenerCount(eventName) > __privateGet(this, _maxListeners) && !__privateGet(this, _hasWarnedAboutPotentialMemortyLeak)) {
          __privateSet(this, _hasWarnedAboutPotentialMemortyLeak, true);
          const memoryLeakWarning = new MemoryLeakError_1.MemoryLeakError(this, eventName, this.listenerCount(eventName));
          console.warn(memoryLeakWarning);
        }
        return this;
      }
      on(eventName, listener) {
        return this.addListener(eventName, listener);
      }
      once(eventName, listener) {
        return this.addListener(eventName, __privateMethod(this, _wrapOnceListener, wrapOnceListener_fn).call(this, eventName, listener));
      }
      prependListener(eventName, listener) {
        const listeners = __privateMethod(this, _getListeners, getListeners_fn).call(this, eventName);
        if (listeners.length > 0) {
          const nextListeners = [listener].concat(listeners);
          __privateGet(this, _events).set(eventName, nextListeners);
        } else {
          __privateGet(this, _events).set(eventName, listeners.concat(listener));
        }
        return this;
      }
      prependOnceListener(eventName, listener) {
        return this.prependListener(eventName, __privateMethod(this, _wrapOnceListener, wrapOnceListener_fn).call(this, eventName, listener));
      }
      removeListener(eventName, listener) {
        const listeners = __privateMethod(this, _getListeners, getListeners_fn).call(this, eventName);
        if (listeners.length > 0) {
          __privateMethod(this, _removeListener, removeListener_fn).call(this, listeners, listener);
          __privateGet(this, _events).set(eventName, listeners);
          __privateMethod(this, _internalEmit, internalEmit_fn).call(this, "removeListener", eventName, listener);
        }
        return this;
      }
      off(eventName, listener) {
        return this.removeListener(eventName, listener);
      }
      removeAllListeners(eventName) {
        if (eventName) {
          __privateGet(this, _events).delete(eventName);
        } else {
          __privateGet(this, _events).clear();
        }
        return this;
      }
      listeners(eventName) {
        return Array.from(__privateMethod(this, _getListeners, getListeners_fn).call(this, eventName));
      }
      listenerCount(eventName) {
        return __privateMethod(this, _getListeners, getListeners_fn).call(this, eventName).length;
      }
      rawListeners(eventName) {
        return this.listeners(eventName);
      }
    };
    var Emitter2 = _Emitter;
    _events = new WeakMap();
    _maxListeners = new WeakMap();
    _hasWarnedAboutPotentialMemortyLeak = new WeakMap();
    _getListeners = new WeakSet();
    getListeners_fn = function(eventName) {
      return __privateGet(this, _events).get(eventName) || [];
    };
    _removeListener = new WeakSet();
    removeListener_fn = function(listeners, listener) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
      return [];
    };
    _wrapOnceListener = new WeakSet();
    wrapOnceListener_fn = function(eventName, listener) {
      const onceListener = (...data) => {
        this.removeListener(eventName, onceListener);
        listener.apply(this, data);
      };
      return onceListener;
    };
    _internalEmit = new WeakSet();
    internalEmit_fn = function(internalEventName, eventName, listener) {
      this.emit(
        internalEventName,
        ...[eventName, listener]
      );
    };
    __publicField(Emitter2, "defaultMaxListeners", 10);
    exports.Emitter = Emitter2;
  }
});

// ../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Emitter(), exports);
    __exportStar(require_MemoryLeakError(), exports);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  INJECT_MESSAGE_TYPE: () => INJECT_MESSAGE_TYPE,
  MessageReceiver: () => MessageReceiver,
  MessageSender: () => MessageSender,
  Nodebox: () => Nodebox,
  PREVIEW_LOADED_MESSAGE_TYPE: () => PREVIEW_LOADED_MESSAGE_TYPE,
  createDebug: () => createDebug
});
module.exports = __toCommonJS(src_exports);

// src/messages.ts
var import_cuid = __toESM(require_cuid());
var import_outvariant = __toESM(require_lib());
var import_deferred_promise = __toESM(require_build());

// src/logger.ts
var FLAG = window.localStorage["CSB_EMULATOR_DEBUG"];
var DEFAULT = "\x1B[0m";
var GREEN = "\x1B[32;1m";
var RED = "\x1B[31m";
var BLUE = "\x1B[34m";
var YELLOW = "\x1B[33;1m";
var MAGENTA = "\x1B[35;1m";
var CYAN = "\x1B[36;1m";
var COLOR_SCOPE = {
  preview: YELLOW,
  emulator: MAGENTA,
  runtime: CYAN,
  bridge: BLUE,
  "runtime:worker": CYAN
};
function createDebug(scope) {
  return function debug3(message, ...data) {
    if (FLAG === "true") {
      const direction = () => {
        if (message.includes("sender"))
          return `${GREEN}sender`;
        if (message.includes("receiver"))
          return `${RED}receiver`;
        return "";
      };
      const cleanMessage = message.replace(/\[.+\]:/, "");
      console.log(`${COLOR_SCOPE[scope]}${scope}:${direction()}${DEFAULT}:${cleanMessage}`, ...data);
    }
  };
}

// src/messages.ts
var debug = createDebug("emulator");
var MessageReceiver = class {
  constructor() {
    __publicField(this, "emitter");
    __publicField(this, "senderPort", null);
    this.emitter = new EventTarget();
    this.waitForHandshake();
  }
  waitForHandshake() {
    const handshakePromise = new import_deferred_promise.DeferredPromise();
    const handshakeListener = (message) => {
      const { data } = message;
      debug("[message-receiver]: incoming", message);
      if (data.type === "internal/handshake") {
        (0, import_outvariant.invariant)(
          message.ports.length > 0,
          "Failed to confirm a MessageReceiver handshake: received event has no ports"
        );
        this.senderPort = message.ports[0];
        this.addMessageListener();
        debug("[message-receiver]: handshake received!", this.senderPort);
        this.send("internal/handshake/done");
        debug("[message-receiver]: finish handshake");
      }
    };
    window.addEventListener("message", handshakeListener);
    handshakePromise.then(() => {
      window.removeEventListener("message", handshakeListener);
    });
    window.parent.postMessage({ type: "internal/ready" }, "*");
    return handshakePromise;
  }
  addMessageListener() {
    (0, import_outvariant.invariant)(
      this.senderPort,
      "[MessageReceiver] Failed to add a message listener: sender port is not defined. Did you forget to await a handshake?"
    );
    this.senderPort.onmessage = (evt) => {
      const data = evt.data;
      if (data.type == null) {
        return;
      }
      this.emitter.dispatchEvent(
        new MessageEvent(data.type, {
          data: data.payload
        })
      );
    };
  }
  on(event, listener, options) {
    this.emitter.addEventListener(
      event,
      async (message) => {
        if (!(message instanceof MessageEvent)) {
          return;
        }
        const { operationId, payload } = message.data;
        try {
          const listenerPayload = await listener(payload);
          this.send("internal/operation/done", { operationId, listenerPayload });
        } catch (error) {
          if (error instanceof Error) {
            this.send("internal/operation/failed", { operationId, error });
          }
        }
      },
      options
    );
  }
  send(event, ...data) {
    (0, import_outvariant.invariant)(
      this.senderPort,
      '[MessageReceiver] Failed to send a message "%j": sender port is not defined. Did you forget to await a handshake?',
      event
    );
    const payload = data[0] || {};
    debug('[message-receiver]: send "%s"', event, payload);
    this.senderPort.postMessage({ type: event, payload });
  }
};
var MessageSender = class {
  constructor(target) {
    this.target = target;
    __publicField(this, "emitter");
    __publicField(this, "channel");
    __publicField(this, "receiverPort");
    __publicField(this, "receiverReadyPromise");
    this.emitter = new EventTarget();
    this.channel = new MessageChannel();
    this.receiverPort = this.channel.port1;
    const receiverReadyPromise = new import_deferred_promise.DeferredPromise();
    const handshakeListener = (message) => {
      if (message.data.type === "internal/ready") {
        debug("[message-sender]: runtime is ready");
        receiverReadyPromise.resolve();
      }
    };
    window.addEventListener("message", handshakeListener);
    receiverReadyPromise.then(() => {
      window.removeEventListener("message", handshakeListener);
    });
    this.receiverReadyPromise = receiverReadyPromise;
    this.receiverPort.onmessage = (evt) => {
      const data = evt.data;
      if (data.type != null) {
        debug('[message-sender]: emitting "%s" event...', data.type, data.payload);
        this.emitter.dispatchEvent(new MessageEvent(data.type, { data: data.payload }));
      }
    };
  }
  async handshake() {
    const handshakePromise = new import_deferred_promise.DeferredPromise();
    await this.receiverReadyPromise;
    debug("[message-sender]: sending handshake");
    this.target.postMessage(
      {
        type: "internal/handshake"
      },
      "*",
      [this.channel.port2]
    );
    this.on("internal/handshake/done", () => {
      handshakePromise.resolve();
      clearTimeout(rejectionTimeout);
    });
    const rejectionTimeout = setTimeout(() => {
      handshakePromise.reject(new Error("MessageSender: Handshake timeout"));
    }, 5e3);
    return handshakePromise;
  }
  on(event, listener, options) {
    debug('[message-sender]: add listener "%s"', event);
    this.emitter.addEventListener(
      event,
      (message) => {
        if (message instanceof MessageEvent) {
          listener(message);
        }
      },
      options
    );
  }
  off(event, listener, options) {
    this.emitter.removeEventListener(event, listener, options);
  }
  async send(event, ...data) {
    const operationPromise = new import_deferred_promise.DeferredPromise();
    const operationId = (0, import_cuid.default)();
    const payload = data[0] || {};
    debug('[message-sender]: send "%s" (%s)', event, operationId, payload);
    this.receiverPort.postMessage({ type: event, payload: { operationId, payload } });
    debug('[message-sender]: adding done listener for "%s" (%s)', event, operationId);
    const handleOperationDone = (doneEvent) => {
      const { data: data2 } = doneEvent;
      if (data2.operationId === operationId) {
        const listenerPayload = data2.listenerPayload || {};
        debug('[message-sender]: resolving "%s (%s) promise!', event, operationId);
        operationPromise.resolve({
          ...listenerPayload,
          operationId: data2.operationId
        });
      }
    };
    const handleOperationFailed = (failEvent) => {
      const { data: data2 } = failEvent;
      if (data2.operationId === operationId) {
        debug('[message-sender]: rejecting "%s (%s) promise!', event, operationId);
        operationPromise.reject(data2.error);
      }
    };
    this.on("internal/operation/done", handleOperationDone);
    this.on("internal/operation/failed", handleOperationFailed);
    return operationPromise.finally(() => {
      this.emitter.removeEventListener("internal/operation/done", handleOperationDone);
      this.emitter.removeEventListener("internal/operation/failed", handleOperationFailed);
    });
  }
};

// src/Nodebox.ts
var import_outvariant5 = __toESM(require_lib());
var import_deferred_promise3 = __toESM(require_build());

// src/modules/fs.ts
var import_cuid2 = __toESM(require_cuid());
var import_outvariant2 = __toESM(require_lib());
var FileSystemApi = class {
  constructor(channel) {
    this.channel = channel;
  }
  async init(files) {
    await this.channel.send("fs/init", { files });
  }
  async readFile(path, encoding) {
    const response = await this.channel.send("fs/readFile", { path, encoding }).catch((error) => {
      throw new Error((0, import_outvariant2.format)('Failed to read file at path "%s"', path), { cause: error });
    });
    return response ? response.data : void 0;
  }
  async writeFile(path, content, encoding) {
    await this.channel.send("fs/writeFile", { path, content, encoding }).catch((error) => {
      throw new Error((0, import_outvariant2.format)('Failed to write file at path "%s"', path), { cause: error });
    });
  }
  async watch(includes, excludes, listener) {
    const watcherId = (0, import_cuid2.default)();
    await this.channel.send("fs/watch", { watcherId, includes, excludes });
    this.channel.on("fs/watch-event", ({ data }) => {
      if (data.watcherId === watcherId && listener) {
        const evt = { ...data };
        delete evt.watcherId;
        listener(evt);
      }
    });
    return {
      dispose: () => this.channel.send("fs/unwatch", { watcherId })
    };
  }
};

// src/modules/shell.ts
var import_outvariant3 = __toESM(require_lib());
var import_strict_event_emitter = __toESM(require_lib2());
var ShellApi = class {
  constructor(channel) {
    this.channel = channel;
  }
  create() {
    return new ShellProcess(this.channel);
  }
};
var ShellProcess = class {
  constructor(channel) {
    this.channel = channel;
    __publicField(this, "id");
    __publicField(this, "state");
    __publicField(this, "stdout");
    __publicField(this, "stderr");
    this.state = "running";
    this.stdout = new import_strict_event_emitter.Emitter();
    this.stderr = new import_strict_event_emitter.Emitter();
    this.forwardStdEvents();
  }
  forwardStdEvents() {
    this.channel.on("worker/tty", (message) => {
      const { data } = message;
      if (data.workerId !== this.id) {
        return;
      }
      switch (data.payload.type) {
        case "out": {
          this.stdout.emit("data", data.payload.data);
          break;
        }
        case "err": {
          this.stderr.emit("data", data.payload.data);
          break;
        }
      }
    });
  }
  async runCommand(command, args, options = {}) {
    (0, import_outvariant3.invariant)(!this.id, 'Failed to run "runCommand" on a ShellProcess: there is already a process running.');
    const shellInfo = await this.channel.send("shell/runCommand", { command, args, options });
    (0, import_outvariant3.invariant)(shellInfo, 'Failed to run "runCommand" on a ShellProcess: was not able to retrieve a running process.');
    this.id = shellInfo.id;
    this.state = "running";
    return shellInfo;
  }
  async on(message, listener) {
    switch (message) {
      case "progress": {
        this.channel.on("worker/progress", ({ data }) => {
          listener(data.status);
        });
        return;
      }
      case "exit": {
        this.channel.on("worker/exit", ({ data }) => {
          if (data.workerId === this.id) {
            listener(data.exitCode, data.error);
          }
        });
        return;
      }
    }
  }
  async kill() {
    (0, import_outvariant3.invariant)(
      this.id,
      'Failed to run "kill" on a ShellProcess: there is no process running. Did you forget to run it?'
    );
    this.state = "idle";
    await this.channel.send("shell/exit", { id: this.id }).catch((error) => {
      throw new Error((0, import_outvariant3.format)('Failed to kill shell with ID "%s"', this.id), { cause: error });
    });
    this.id = void 0;
  }
};

// src/modules/preview.ts
var import_outvariant4 = __toESM(require_lib());
var import_deferred_promise2 = __toESM(require_build());
var TIMEOUT = 1e4;
var PreviewApi = class {
  constructor(channel) {
    this.channel = channel;
  }
  async waitFor(payload, predicate, timeout = TIMEOUT) {
    const readyPromise = new import_deferred_promise2.DeferredPromise();
    const rejectTimeout = setTimeout(() => {
      readyPromise.reject();
    }, timeout);
    const previewInformation = await this.channel.send("preview/get/info", payload).catch((error) => {
      readyPromise.reject(
        new Error(
          (0, import_outvariant4.format)(
            'Failed to look up preview information for shell ID "%s" (port: %d)',
            payload.sourceShellId,
            payload.port
          )
        )
      );
    });
    const foundPreview = previewInformation && predicate(previewInformation);
    if (foundPreview) {
      readyPromise.resolve({
        url: previewInformation.url,
        port: previewInformation.port,
        sourceShellId: previewInformation.sourceShellId
      });
    }
    this.channel.on("preview/port/ready", ({ data }) => {
      if (!foundPreview && predicate(data)) {
        readyPromise.resolve({
          url: data.url,
          port: data.port,
          sourceShellId: data.sourceShellId
        });
      }
    });
    return readyPromise.finally(() => {
      clearTimeout(rejectTimeout);
    });
  }
  async getByShellId(sourceShellId, timeout) {
    return this.waitFor({ sourceShellId }, (data) => data.sourceShellId === sourceShellId, timeout).catch((error) => {
      throw new Error((0, import_outvariant4.format)('Failed to get shell by ID "%s"', sourceShellId), { cause: error });
    });
  }
  async waitForPort(port, timeout) {
    return this.waitFor({ port }, (data) => data.port === port, timeout).catch((error) => {
      throw new Error((0, import_outvariant4.format)("Failed to await port %d", port), { cause: error });
    });
  }
};

// src/Nodebox.ts
var DEFAULT_RUNTIME_URL = "https://nodebox-runtime.codesandbox.io";
var debug2 = createDebug("emulator");
var Nodebox = class {
  constructor(options) {
    this.options = options;
    __publicField(this, "channel", null);
    __publicField(this, "isConnected");
    __publicField(this, "url");
    __publicField(this, "fileSystemApi", null);
    __publicField(this, "shellApi", null);
    __publicField(this, "previewApi", null);
    (0, import_outvariant5.invariant)(
      this.options.iframe,
      'Failed to create a Nodebox: expected "iframe" argument to be a reference to an <iframe> element but got %j',
      this.options.iframe
    );
    this.url = this.options.runtimeUrl || DEFAULT_RUNTIME_URL;
    this.isConnected = false;
  }
  async connect() {
    const { iframe, cdnUrl } = this.options;
    debug2("[message-sender]: Connecting to node emulator...");
    const connectionPromise = new import_deferred_promise3.DeferredPromise();
    if (!this.url) {
      connectionPromise.reject(
        new Error("Nodebox URL is missing. Did you forget to provide it when creating this Nodebox instance?")
      );
    }
    (0, import_outvariant5.invariant)(
      iframe.contentWindow,
      "Failed to create a MessageChannel with the Nodebox iframe: no content window found"
    );
    this.channel = new MessageSender(iframe.contentWindow);
    const frameLoadPromise = new import_deferred_promise3.DeferredPromise();
    iframe.setAttribute("src", this.url);
    iframe.addEventListener(
      "load",
      () => {
        frameLoadPromise.resolve();
      },
      { once: true }
    );
    iframe.addEventListener(
      "error",
      (event) => {
        frameLoadPromise.reject(event.error);
      },
      { once: true }
    );
    await frameLoadPromise;
    debug2("[message-sender]: IFrame loaded...");
    await this.channel.handshake();
    debug2("[message-sender]: Handshake completed...");
    this.channel.send("connect", {
      cdnUrl
    });
    this.channel.on("runtime/ready", () => {
      connectionPromise.resolve();
    });
    return connectionPromise.then(() => {
      debug2("[message-sender]: Connected to runtime...");
      this.isConnected = true;
    });
  }
  get fs() {
    (0, import_outvariant5.invariant)(
      this.isConnected,
      'Failed to access the File System API: consumer is not connected. Did you forget to run "connect()"?'
    );
    if (this.fileSystemApi) {
      return this.fileSystemApi;
    }
    this.fileSystemApi = new FileSystemApi(this.channel);
    return this.fileSystemApi;
  }
  get shell() {
    (0, import_outvariant5.invariant)(
      this.isConnected,
      'Failed to access the Shell API: consumer is not connected. Did you forget to run "connect()"?'
    );
    if (this.shellApi) {
      return this.shellApi;
    }
    this.shellApi = new ShellApi(this.channel);
    return this.shellApi;
  }
  get preview() {
    (0, import_outvariant5.invariant)(
      this.isConnected,
      'Failed to access the Preview API: consumer is not connected. Did you forget to run "connect()"?'
    );
    if (this.previewApi) {
      return this.previewApi;
    }
    this.previewApi = new PreviewApi(this.channel);
    return this.previewApi;
  }
};

// src/runtime-protocol.types.ts
var INJECT_MESSAGE_TYPE = "INJECT_AND_INVOKE";
var PREVIEW_LOADED_MESSAGE_TYPE = "PREVIEW_LOADED";


/***/ }),

/***/ 66:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ SandpackClient)
/* harmony export */ });
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8471);
// src/clients/base.ts

var SandpackClient = class {
  constructor(iframeSelector, sandboxSetup, options = {}) {
    this.options = options;
    this.sandboxSetup = sandboxSetup;
    this.iframeSelector = iframeSelector;
  }
  /**
   * Clients handles
   */
  updateOptions(options) {
    if (!(0,dequal__WEBPACK_IMPORTED_MODULE_0__/* .dequal */ .J)(this.options, options)) {
      this.options = options;
      this.updateSandbox();
    }
  }
  updateSandbox(_sandboxSetup = this.sandboxSetup, _isInitializationCompile) {
    throw Error("Method not implemented");
  }
  destroy() {
    throw Error("Method not implemented");
  }
  /**
   * Bundler communication
   */
  dispatch(_message) {
    throw Error("Method not implemented");
  }
  listen(_listener) {
    throw Error("Method not implemented");
  }
};


//# sourceMappingURL=chunk-E2FK2HAG.mjs.map


/***/ }),

/***/ 8586:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SandpackNode": () => (/* binding */ SandpackNode)
/* harmony export */ });
/* harmony import */ var _chunk_E2FK2HAG_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);
/* harmony import */ var _chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110);
/* harmony import */ var _codesandbox_nodebox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4342);
/* harmony import */ var outvariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8987);



// src/clients/node/index.ts


// src/clients/node/client.utils.ts

var writeBuffer = (content, encoding = "utf8") => {
  if (typeof content === "string") {
    return _chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Buffer.from */ .lW.from(content, encoding);
  } else {
    return content;
  }
};
var readBuffer = (content) => {
  if (typeof content === "string")
    return content;
  return _chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Buffer.from */ .lW.from(content).toString("utf-8");
};
var fromBundlerFilesToFS = (files) => {
  return Object.entries(files).reduce(
    (acc, [key, value]) => {
      acc[key] = writeBuffer(value.code);
      return acc;
    },
    {}
  );
};
var findStartScriptPackageJson = (packageJson) => {
  var _a;
  let scripts2 = {};
  const possibleKeys = ["dev", "start"];
  try {
    scripts2 = JSON.parse(packageJson).scripts;
  } catch (e) {
    throw (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(
      "Could not parse package.json file: " + e.message
    );
  }
  (0,outvariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(
    scripts2,
    "Failed to start. Please provide a `start` or `dev` script on the package.json"
  );
  for (let index = 0; index < possibleKeys.length; index++) {
    if (possibleKeys[index] in scripts2) {
      const script = possibleKeys[index];
      const candidate = scripts2[script];
      const env = (_a = candidate.match(/(\w+=\w+;)*\w+=\w+/g)) == null ? void 0 : _a.reduce((acc, curr) => {
        const [key, value] = curr.split("=");
        acc[key] = value;
        return acc;
      }, {});
      const [command, ...args] = candidate.replace(/(\w+=\w+;)*\w+=\w+/g, "").trim().split(" ");
      return [command, args, { env }];
    }
  }
  throw (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(
    "Failed to start. Please provide a `start` or `dev` script on the package.json"
  );
};
var getMessageFromError = (error) => {
  if (typeof error === "string")
    return error;
  if (typeof error === "object" && "message" in error) {
    return error.message;
  }
  return (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(
    "The server could not be reached. Make sure that the node script is running and that a port has been started."
  );
};

// src/clients/node/event-emitter.ts
var EventEmitter = class {
  constructor() {
    this.listeners = {};
    this.listenersCount = 0;
    this.channelId = Math.floor(Math.random() * 1e6);
    this.listeners = [];
  }
  cleanup() {
    this.listeners = {};
    this.listenersCount = 0;
  }
  dispatch(message) {
    Object.values(this.listeners).forEach((listener) => listener(message));
  }
  listener(listener) {
    if (typeof listener !== "function") {
      return () => {
        return;
      };
    }
    const listenerId = this.listenersCount;
    this.listeners[listenerId] = listener;
    this.listenersCount++;
    return () => {
      delete this.listeners[listenerId];
    };
  }
};

// src/clients/node/iframe.utils.ts
async function loadPreviewIframe(iframe, url) {
  const { contentWindow } = iframe;
  (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nullthrows */ .Wq)(
    contentWindow,
    "Failed to await preview iframe: no content window found"
  );
  const TIME_OUT = 2e3;
  const MAX_MANY_TIRES = 10;
  let tries = 0;
  let timeout;
  return new Promise((resolve, reject) => {
    const triesToSetUrl = () => {
      var _a, _b;
      const onLoadPage = () => {
        clearTimeout(timeout);
        tries = MAX_MANY_TIRES;
        resolve();
        iframe.removeEventListener("load", onLoadPage);
      };
      if (tries >= MAX_MANY_TIRES) {
        reject((0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(`Could not able to connect to preview.`));
        return;
      }
      (_a = iframe.contentWindow) == null ? void 0 : _a.location.replace("about:blank");
      (_b = iframe.contentWindow) == null ? void 0 : _b.location.replace(url);
      timeout = setTimeout(() => {
        triesToSetUrl();
        iframe.removeEventListener("load", onLoadPage);
      }, TIME_OUT);
      tries = tries + 1;
      iframe.addEventListener("load", onLoadPage);
    };
    iframe.addEventListener("error", () => reject(new Error("Iframe error")));
    iframe.addEventListener("abort", () => reject(new Error("Aborted")));
    triesToSetUrl();
  });
}
var setPreviewIframeProperties = (iframe, options) => {
  iframe.style.border = "0";
  iframe.style.width = options.width || "100%";
  iframe.style.height = options.height || "100%";
  iframe.style.overflow = "hidden";
  iframe.allow = "cross-origin-isolated";
};

// src/clients/node/inject-scripts/index.ts


// src/clients/node/inject-scripts/dist/consoleHook.txt
var consoleHook_default = `"use strict";var Mr=Object.create;var K=Object.defineProperty;var Or=Object.getOwnPropertyDescriptor;var Er=Object.getOwnPropertyNames;var Ar=Object.getPrototypeOf,wr=Object.prototype.hasOwnProperty;var s=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var Dr=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Er(e))!wr.call(r,a)&&a!==t&&K(r,a,{get:()=>e[a],enumerable:!(n=Or(e,a))||n.enumerable});return r};var Q=(r,e,t)=>(t=r!=null?Mr(Ar(r)):{},Dr(e||!r||!r.__esModule?K(t,"default",{value:r,enumerable:!0}):t,r));var $=s(N=>{"use strict";N.__esModule=!0;var Rr=["log","debug","info","warn","error","table","clear","time","timeEnd","count","assert","command","result"];N.default=Rr});var W=s(P=>{"use strict";P.__esModule=!0;function zr(){var r=function(){return((1+Math.random())*65536|0).toString(16).substring(1)};return r()+r()+"-"+r()+"-"+r()+"-"+r()+"-"+r()+"-"+Date.now()}P.default=zr});var z=s(b=>{"use strict";b.__esModule=!0;b.update=b.state=void 0;function Cr(r){b.state=r}b.update=Cr});var x=s(h=>{"use strict";var c=h&&h.__assign||function(){return c=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++){e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},c.apply(this,arguments)};h.__esModule=!0;h.initialState=void 0;h.initialState={timings:{},count:{}};var X=function(){return typeof performance!="undefined"&&performance.now?performance.now():Date.now()};h.default=function(r,e){var t,n,a;switch(r===void 0&&(r=h.initialState),e.type){case"COUNT":{var i=r.count[e.name]||0;return c(c({},r),{count:c(c({},r.count),(t={},t[e.name]=i+1,t))})}case"TIME_START":return c(c({},r),{timings:c(c({},r.timings),(n={},n[e.name]={start:X()},n))});case"TIME_END":{var u=r.timings[e.name],f=X(),d=u.start,o=f-d;return c(c({},r),{timings:c(c({},r.timings),(a={},a[e.name]=c(c({},u),{end:f,time:o}),a))})}default:return r}}});var q=s(M=>{"use strict";var Ir=M&&M.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};M.__esModule=!0;var Nr=Ir(x()),rr=z();function Pr(r){rr.update(Nr.default(rr.state,r))}M.default=Pr});var V=s(p=>{"use strict";p.__esModule=!0;p.timeEnd=p.timeStart=p.count=void 0;function qr(r){return{type:"COUNT",name:r}}p.count=qr;function Vr(r){return{type:"TIME_START",name:r}}p.timeStart=Vr;function Ur(r){return{type:"TIME_END",name:r}}p.timeEnd=Ur});var nr=s(v=>{"use strict";var Lr=v&&v.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};v.__esModule=!0;v.stop=v.start=void 0;var C=z(),er=Lr(q()),tr=V();function Br(r){er.default(tr.timeStart(r))}v.start=Br;function Hr(r){var e=C.state===null||C.state===void 0?void 0:C.state.timings[r];if(e&&!e.end){er.default(tr.timeEnd(r));var t=C.state.timings[r].time;return{method:"log",data:[r+": "+t+"ms"]}}return{method:"warn",data:["Timer '"+r+"' does not exist"]}}v.stop=Hr});var ar=s(T=>{"use strict";var jr=T&&T.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};T.__esModule=!0;T.increment=void 0;var kr=z(),Fr=jr(q()),Jr=V();function Gr(r){Fr.default(Jr.count(r));var e=kr.state.count[r];return{method:"log",data:[r+": "+e]}}T.increment=Gr});var ir=s(S=>{"use strict";var Yr=S&&S.__spreadArrays||function(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var n=Array(r),a=0,e=0;e<t;e++)for(var i=arguments[e],u=0,f=i.length;u<f;u++,a++)n[a]=i[u];return n};S.__esModule=!0;S.test=void 0;function Zr(r){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];return r?!1:(e.length===0&&e.push("console.assert"),{method:"error",data:Yr(["Assertion failed:"],e)})}S.test=Zr});var sr=s(l=>{"use strict";var m=l&&l.__assign||function(){return m=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++){e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},m.apply(this,arguments)},Kr=l&&l.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t),Object.defineProperty(r,n,{enumerable:!0,get:function(){return e[t]}})}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),Qr=l&&l.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),U=l&&l.__importStar||function(r){if(r&&r.__esModule)return r;var e={};if(r!=null)for(var t in r)t!=="default"&&Object.prototype.hasOwnProperty.call(r,t)&&Kr(e,r,t);return Qr(e,r),e},$r=l&&l.__spreadArrays||function(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var n=Array(r),a=0,e=0;e<t;e++)for(var i=arguments[e],u=0,f=i.length;u<f;u++,a++)n[a]=i[u];return n},Wr=l&&l.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};l.__esModule=!0;var Xr=Wr(W()),ur=U(nr()),xr=U(ar()),or=U(ir());function re(r,e,t){var n=t||Xr.default();switch(r){case"clear":return{method:r,id:n};case"count":{var a=typeof e[0]=="string"?e[0]:"default";return a?m(m({},xr.increment(a)),{id:n}):!1}case"time":case"timeEnd":{var a=typeof e[0]=="string"?e[0]:"default";return a?r==="time"?(ur.start(a),!1):m(m({},ur.stop(a)),{id:n}):!1}case"assert":{var i=e.length!==0;if(i){var u=or.test.apply(or,$r([e[0]],e.slice(1)));if(u)return m(m({},u),{id:n})}return!1}case"error":{var f=e.map(function(d){try{return d.stack||d}catch(o){return d}});return{method:r,id:n,data:f}}default:return{method:r,id:n,data:e}}}l.default=re});var fr=s(L=>{"use strict";L.__esModule=!0;var _;(function(r){r[r.infinity=0]="infinity",r[r.minusInfinity=1]="minusInfinity",r[r.minusZero=2]="minusZero"})(_||(_={}));function ee(r){return 1/r===-1/0}L.default={type:"Arithmetic",lookup:Number,shouldTransform:function(r,e){return r==="number"&&(e===1/0||e===-1/0||ee(e))},toSerializable:function(r){return r===1/0?_.infinity:r===-1/0?_.minusInfinity:_.minusZero},fromSerializable:function(r){return r===_.infinity?1/0:r===_.minusInfinity?-1/0:r===_.minusZero?-0:r}}});var cr=s(B=>{"use strict";B.__esModule=!0;B.default={type:"Function",lookup:Function,shouldTransform:function(r,e){return typeof e=="function"},toSerializable:function(r){var e="";try{e=r.toString().substring(e.indexOf("{")+1,e.lastIndexOf("}"))}catch(t){}return{name:r.name,body:e,proto:Object.getPrototypeOf(r).constructor.name}},fromSerializable:function(r){try{var e=function(){};return typeof r.name=="string"&&Object.defineProperty(e,"name",{value:r.name,writable:!1}),typeof r.body=="string"&&Object.defineProperty(e,"body",{value:r.body,writable:!1}),typeof r.proto=="string"&&(e.constructor={name:r.proto}),e}catch(t){return r}}}});var dr=s(H=>{"use strict";H.__esModule=!0;var lr;function te(){return lr||(lr=document.implementation.createHTMLDocument("sandbox"))}function ne(r){for(var e={},t=0,n=r.attributes;t<n.length;t++){var a=n[t];e[a.name]=a.value}return e}H.default={type:"HTMLElement",shouldTransform:function(r,e){return e&&e.children&&typeof e.innerHTML=="string"&&typeof e.tagName=="string"},toSerializable:function(r){return{tagName:r.tagName.toLowerCase(),attributes:ne(r),innerHTML:r.innerHTML}},fromSerializable:function(r){try{var e=te().createElement(r.tagName);e.innerHTML=r.innerHTML;for(var t=0,n=Object.keys(r.attributes);t<n.length;t++){var a=n[t];try{e.setAttribute(a,r.attributes[a])}catch(i){}}return e}catch(i){return r}}}});var hr=s(O=>{"use strict";var j=O&&O.__assign||function(){return j=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++){e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},j.apply(this,arguments)};O.__esModule=!0;O.default={type:"Map",shouldTransform:function(r,e){return e&&e.constructor&&e.constructor.name==="Map"},toSerializable:function(r){var e={};return r.forEach(function(t,n){var a=typeof n=="object"?JSON.stringify(n):n;e[a]=t}),{name:"Map",body:e,proto:Object.getPrototypeOf(r).constructor.name}},fromSerializable:function(r){var e=r.body,t=j({},e);return typeof r.proto=="string"&&(t.constructor={name:r.proto}),t}}});var _r=s(J=>{"use strict";J.__esModule=!0;var F="@t",vr="@r",mr=/^#*@(t|r)$/,E=function(){var e=eval;return e("this")}(),I=typeof ArrayBuffer=="function",A=typeof Map=="function",k=typeof Set=="function",ae=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],pr=Array.prototype.slice,ie={serialize:function(r){return JSON.stringify(r)},deserialize:function(r){return JSON.parse(r)}},ue=function(){function r(e,t){this.references=e,this.transforms=t,this.transformsMap=this._makeTransformsMap(),this.circularCandidates=[],this.circularCandidatesDescrs=[],this.circularRefCount=0}return r._createRefMark=function(e){var t=Object.create(null);return t[vr]=e,t},r.prototype._createCircularCandidate=function(e,t,n){this.circularCandidates.push(e),this.circularCandidatesDescrs.push({parent:t,key:n,refIdx:-1})},r.prototype._applyTransform=function(e,t,n,a){var i=Object.create(null),u=a.toSerializable(e);return typeof u=="object"&&this._createCircularCandidate(e,t,n),i[F]=a.type,i.data=this._handleValue(function(){return u},t,n),i},r.prototype._handleArray=function(e){for(var t=[],n=function(u){t[u]=a._handleValue(function(){return e[u]},t,u)},a=this,i=0;i<e.length;i++)n(i);return t},r.prototype._handlePlainObject=function(e){var t,n,a=Object.create(null),i=function(o){if(Reflect.has(e,o)){var g=mr.test(o)?"#"+o:o;a[g]=u._handleValue(function(){return e[o]},a,g)}},u=this;for(var f in e)i(f);var d=(n=(t=e==null?void 0:e.__proto__)===null||t===void 0?void 0:t.constructor)===null||n===void 0?void 0:n.name;return d&&d!=="Object"&&(a.constructor={name:d}),a},r.prototype._handleObject=function(e,t,n){return this._createCircularCandidate(e,t,n),Array.isArray(e)?this._handleArray(e):this._handlePlainObject(e)},r.prototype._ensureCircularReference=function(e){var t=this.circularCandidates.indexOf(e);if(t>-1){var n=this.circularCandidatesDescrs[t];return n.refIdx===-1&&(n.refIdx=n.parent?++this.circularRefCount:0),r._createRefMark(n.refIdx)}return null},r.prototype._handleValue=function(e,t,n){try{var a=e(),i=typeof a,u=i==="object"&&a!==null;if(u){var f=this._ensureCircularReference(a);if(f)return f}var d=this._findTransform(i,a);return d?this._applyTransform(a,t,n,d):u?this._handleObject(a,t,n):a}catch(o){try{return this._handleValue(function(){return o instanceof Error?o:new Error(o)},t,n)}catch(g){return null}}},r.prototype._makeTransformsMap=function(){if(A){var e=new Map;return this.transforms.forEach(function(t){t.lookup&&e.set(t.lookup,t)}),e}},r.prototype._findTransform=function(e,t){if(A&&t&&t.constructor){var n=this.transformsMap.get(t.constructor);if(n!=null&&n.shouldTransform(e,t))return n}for(var a=0,i=this.transforms;a<i.length;a++){var n=i[a];if(n.shouldTransform(e,t))return n}},r.prototype.transform=function(){for(var e=this,t=[this._handleValue(function(){return e.references},null,null)],n=0,a=this.circularCandidatesDescrs;n<a.length;n++){var i=a[n];i.refIdx>0&&(t[i.refIdx]=i.parent[i.key],i.parent[i.key]=r._createRefMark(i.refIdx))}return t},r}(),oe=function(){function r(e,t){this.activeTransformsStack=[],this.visitedRefs=Object.create(null),this.references=e,this.transformMap=t}return r.prototype._handlePlainObject=function(e){var t=Object.create(null);"constructor"in e&&(!e.constructor||typeof e.constructor.name!="string")&&(e.constructor={name:"Object"});for(var n in e)e.hasOwnProperty(n)&&(this._handleValue(e[n],e,n),mr.test(n)&&(t[n.substring(1)]=e[n],delete e[n]));for(var a in t)e[a]=t[a]},r.prototype._handleTransformedObject=function(e,t,n){var a=e[F],i=this.transformMap[a];if(!i)throw new Error(\`Can't find transform for "\`+a+'" type.');this.activeTransformsStack.push(e),this._handleValue(e.data,e,"data"),this.activeTransformsStack.pop(),t[n]=i.fromSerializable(e.data)},r.prototype._handleCircularSelfRefDuringTransform=function(e,t,n){var a=this.references;Object.defineProperty(t,n,{val:void 0,configurable:!0,enumerable:!0,get:function(){return this.val===void 0&&(this.val=a[e]),this.val},set:function(i){this.val=i}})},r.prototype._handleCircularRef=function(e,t,n){this.activeTransformsStack.includes(this.references[e])?this._handleCircularSelfRefDuringTransform(e,t,n):(this.visitedRefs[e]||(this.visitedRefs[e]=!0,this._handleValue(this.references[e],this.references,e)),t[n]=this.references[e])},r.prototype._handleValue=function(e,t,n){if(!(typeof e!="object"||e===null)){var a=e[vr];if(a!==void 0)this._handleCircularRef(a,t,n);else if(e[F])this._handleTransformedObject(e,t,n);else if(Array.isArray(e))for(var i=0;i<e.length;i++)this._handleValue(e[i],e,i);else this._handlePlainObject(e)}},r.prototype.transform=function(){return this.visitedRefs[0]=!0,this._handleValue(this.references[0],this.references,0),this.references[0]},r}(),se=[{type:"[[NaN]]",shouldTransform:function(r,e){return r==="number"&&isNaN(e)},toSerializable:function(){return""},fromSerializable:function(){return NaN}},{type:"[[undefined]]",shouldTransform:function(r){return r==="undefined"},toSerializable:function(){return""},fromSerializable:function(){}},{type:"[[Date]]",lookup:Date,shouldTransform:function(r,e){return e instanceof Date},toSerializable:function(r){return r.getTime()},fromSerializable:function(r){var e=new Date;return e.setTime(r),e}},{type:"[[RegExp]]",lookup:RegExp,shouldTransform:function(r,e){return e instanceof RegExp},toSerializable:function(r){var e={src:r.source,flags:""};return r.global&&(e.flags+="g"),r.ignoreCase&&(e.flags+="i"),r.multiline&&(e.flags+="m"),e},fromSerializable:function(r){return new RegExp(r.src,r.flags)}},{type:"[[Error]]",lookup:Error,shouldTransform:function(r,e){return e instanceof Error},toSerializable:function(r){var e,t;return r.stack||(t=(e=Error).captureStackTrace)===null||t===void 0||t.call(e,r),{name:r.name,message:r.message,stack:r.stack}},fromSerializable:function(r){var e=E[r.name]||Error,t=new e(r.message);return t.stack=r.stack,t}},{type:"[[ArrayBuffer]]",lookup:I&&ArrayBuffer,shouldTransform:function(r,e){return I&&e instanceof ArrayBuffer},toSerializable:function(r){var e=new Int8Array(r);return pr.call(e)},fromSerializable:function(r){if(I){var e=new ArrayBuffer(r.length),t=new Int8Array(e);return t.set(r),e}return r}},{type:"[[TypedArray]]",shouldTransform:function(r,e){if(I)return ArrayBuffer.isView(e)&&!(e instanceof DataView);for(var t=0,n=ae;t<n.length;t++){var a=n[t];if(typeof E[a]=="function"&&e instanceof E[a])return!0}return!1},toSerializable:function(r){return{ctorName:r.constructor.name,arr:pr.call(r)}},fromSerializable:function(r){return typeof E[r.ctorName]=="function"?new E[r.ctorName](r.arr):r.arr}},{type:"[[Map]]",lookup:A&&Map,shouldTransform:function(r,e){return A&&e instanceof Map},toSerializable:function(r){var e=[];return r.forEach(function(t,n){e.push(n),e.push(t)}),e},fromSerializable:function(r){if(A){for(var e=new Map,t=0;t<r.length;t+=2)e.set(r[t],r[t+1]);return e}for(var n=[],a=0;a<r.length;a+=2)n.push([r[t],r[t+1]]);return n}},{type:"[[Set]]",lookup:k&&Set,shouldTransform:function(r,e){return k&&e instanceof Set},toSerializable:function(r){var e=[];return r.forEach(function(t){e.push(t)}),e},fromSerializable:function(r){if(k){for(var e=new Set,t=0;t<r.length;t++)e.add(r[t]);return e}return r}}],fe=function(){function r(e){this.transforms=[],this.transformsMap=Object.create(null),this.serializer=e||ie,this.addTransforms(se)}return r.prototype.addTransforms=function(e){e=Array.isArray(e)?e:[e];for(var t=0,n=e;t<n.length;t++){var a=n[t];if(this.transformsMap[a.type])throw new Error('Transform with type "'+a.type+'" was already added.');this.transforms.push(a),this.transformsMap[a.type]=a}return this},r.prototype.removeTransforms=function(e){e=Array.isArray(e)?e:[e];for(var t=0,n=e;t<n.length;t++){var a=n[t],i=this.transforms.indexOf(a);i>-1&&this.transforms.splice(i,1),delete this.transformsMap[a.type]}return this},r.prototype.encode=function(e){var t=new ue(e,this.transforms),n=t.transform();return this.serializer.serialize(n)},r.prototype.decode=function(e){var t=this.serializer.deserialize(e),n=new oe(t,this.transformsMap);return n.transform()},r}();J.default=fe});var Y=s(y=>{"use strict";var w=y&&y.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};y.__esModule=!0;y.Decode=y.Encode=void 0;var ce=w(fr()),le=w(cr()),de=w(dr()),he=w(hr()),pe=w(_r()),ve=[de.default,le.default,ce.default,he.default],G=new pe.default;G.addTransforms(ve);function me(r){return JSON.parse(G.encode(r))}y.Encode=me;function _e(r){return G.decode(JSON.stringify(r))}y.Decode=_e});var gr=s(D=>{"use strict";var yr=D&&D.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};D.__esModule=!0;var ye=yr($()),ge=yr(sr()),be=Y();function Te(r,e,t){t===void 0&&(t=!0);for(var n=r,a={pointers:{},src:{npm:"https://npmjs.com/package/console-feed",github:"https://github.com/samdenty99/console-feed"}},i=function(o){var g=n[o];n[o]=function(){g.apply(this,arguments);var Sr=[].slice.call(arguments);setTimeout(function(){var R=ge.default(o,Sr);if(R){var Z=R;t&&(Z=be.Encode(R)),e(Z,R)}})},a.pointers[o]=g},u=0,f=ye.default;u<f.length;u++){var d=f[u];i(d)}return n.feed=a,n}D.default=Te});var br=Q(gr()),Tr=Q(Y());(0,br.default)(window.console,r=>{let e=(0,Tr.Encode)(r);parent.postMessage({type:"console",codesandbox:!0,log:Array.isArray(e)?e[0]:e},"*")});
`;

// src/clients/node/inject-scripts/historyListener.ts
function setupHistoryListeners() {
  const origHistoryProto = window.history.__proto__;
  const historyList = [];
  let historyPosition = 0;
  const dispatchMessage = (url) => {
    parent.postMessage(
      {
        type: "urlchange",
        url,
        back: historyPosition > 0,
        forward: historyPosition < historyList.length - 1
      },
      "*"
    );
  };
  function pushHistory(url, state) {
    historyList.splice(historyPosition + 1);
    historyList.push({ url, state });
    historyPosition = historyList.length - 1;
  }
  Object.assign(window.history, {
    go(delta) {
      const newPos = historyPosition + delta;
      if (newPos >= 0 && newPos <= historyList.length - 1) {
        historyPosition = newPos;
        const { url, state } = historyList[historyPosition];
        origHistoryProto.replaceState.call(window.history, state, "", url);
        const newURL = document.location.href;
        dispatchMessage(newURL);
        window.dispatchEvent(new PopStateEvent("popstate", { state }));
      }
    },
    back() {
      window.history.go(-1);
    },
    forward() {
      window.history.go(1);
    },
    pushState(state, title, url) {
      origHistoryProto.replaceState.call(window.history, state, title, url);
      pushHistory(url, state);
      dispatchMessage(document.location.href);
    },
    replaceState(state, title, url) {
      origHistoryProto.replaceState.call(window.history, state, title, url);
      historyList[historyPosition] = { state, url };
      dispatchMessage(document.location.href);
    }
  });
  function handleMessage({ data }) {
    if (data.type === "urlback") {
      history.back();
    } else if (data.type === "urlforward") {
      history.forward();
    } else if (data.type === "refresh") {
      document.location.reload();
    }
  }
  window.addEventListener("message", handleMessage);
}

// src/clients/node/inject-scripts/index.ts
var scripts = [
  { code: setupHistoryListeners.toString(), id: "historyListener" },
  {
    code: "function consoleHook() {" + consoleHook_default + "\n};",
    id: "consoleHook"
  }
];
var injectScriptToIframe = (iframe) => {
  scripts.forEach(({ code, id }) => {
    var _a;
    const message = {
      uid: id,
      type: _codesandbox_nodebox__WEBPACK_IMPORTED_MODULE_0__.INJECT_MESSAGE_TYPE,
      code: `exports.activate = ${code}`,
      scope: {}
    };
    (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(message, "*");
  });
};

// src/clients/node/index.ts
var SandpackNode = class extends _chunk_E2FK2HAG_mjs__WEBPACK_IMPORTED_MODULE_3__/* .SandpackClient */ .T {
  constructor(selector, sandboxInfo, options = {}) {
    super(selector, sandboxInfo, {
      ...options,
      bundlerURL: options.bundlerURL
    });
    this._modulesCache = /* @__PURE__ */ new Map();
    this.emitter = new EventEmitter();
    this.manageIframes(selector);
    this.createNodebox();
  }
  createNodebox() {
    this.emulator = new _codesandbox_nodebox__WEBPACK_IMPORTED_MODULE_0__.Nodebox({
      iframe: this.emulatorIframe,
      runtimeUrl: this.options.bundlerURL
    });
  }
  /**
   * It initializes the emulator and provide it with files, template and script to run
   */
  async compile(files) {
    try {
      this.dispatch({ type: "start", firstLoad: true });
      await this.emulator.connect();
      await this.emulator.fs.init(files);
      await this.globalListeners();
      const { id: shellId } = await this.createShellProcessFromTask(files);
      await this.createPreviewURLFromId(shellId);
      await this.setLocationURLIntoIFrame();
      this.dispatchDoneMessage();
    } catch (err) {
      this.dispatch({
        type: "action",
        action: "notification",
        notificationType: "error",
        title: getMessageFromError(err)
      });
      this.dispatch({ type: "done", compilatonError: true });
    }
  }
  /**
   * It creates a new shell and run the starting task
   */
  async createShellProcessFromTask(files) {
    const packageJsonContent = readBuffer(files["/package.json"]);
    this.emulatorCommand = findStartScriptPackageJson(packageJsonContent);
    this.emulatorShellProcess = this.emulator.shell.create();
    await this.emulatorShellProcess.on("exit", (exitCode) => {
      this.dispatch({
        type: "action",
        action: "notification",
        notificationType: "error",
        title: (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(`Error: process.exit(${exitCode}) called.`)
      });
    });
    await this.emulatorShellProcess.on("progress", (data) => {
      var _a, _b;
      if (data.state === "command_running" || data.state === "starting_command") {
        this.dispatch({
          type: "shell/progress",
          data: {
            ...data,
            command: [
              (_a = this.emulatorCommand) == null ? void 0 : _a[0],
              (_b = this.emulatorCommand) == null ? void 0 : _b[1].join(" ")
            ].join(" ")
          }
        });
        return;
      }
      this.dispatch({ type: "shell/progress", data });
    });
    this.emulatorShellProcess.stdout.on("data", (data) => {
      this.dispatch({ type: "stdout", payload: { data, type: "out" } });
    });
    this.emulatorShellProcess.stderr.on("data", (data) => {
      this.dispatch({ type: "stdout", payload: { data, type: "err" } });
    });
    return await this.emulatorShellProcess.runCommand(...this.emulatorCommand);
  }
  async createPreviewURLFromId(id) {
    try {
      this.iframePreviewUrl = void 0;
      const { url } = await this.emulator.preview.getByShellId(id);
      this.iframePreviewUrl = url;
    } catch {
    }
  }
  /**
   * Nodebox needs to handle two types of iframes at the same time:
   *
   * 1. Runtime iframe: where the emulator process runs, which is responsible
   *    for creating the other iframes (hidden);
   * 2. Preview iframes: any other node process that contains a PORT (public);
   */
  manageIframes(selector) {
    var _a;
    if (typeof selector === "string") {
      const element = document.querySelector(selector);
      (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nullthrows */ .Wq)(element, `The element '${selector}' was not found`);
      this.iframe = document.createElement("iframe");
    } else {
      this.iframe = selector;
    }
    setPreviewIframeProperties(this.iframe, this.options);
    (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nullthrows */ .Wq)(
      this.iframe.parentNode,
      `The given iframe does not have a parent.`
    );
    this.emulatorIframe = document.createElement("iframe");
    this.emulatorIframe.classList.add("sp-bridge-frame");
    (_a = this.iframe.parentNode) == null ? void 0 : _a.appendChild(this.emulatorIframe);
  }
  async setLocationURLIntoIFrame() {
    if (this.iframePreviewUrl) {
      await loadPreviewIframe(this.iframe, this.iframePreviewUrl);
    }
  }
  /**
   * Send all messages and events to tell to the
   * consumer that the bundler is ready without any error
   */
  dispatchDoneMessage() {
    this.dispatch({ type: "done", compilatonError: false });
    if (this.iframePreviewUrl) {
      this.dispatch({
        type: "urlchange",
        url: this.iframePreviewUrl,
        back: false,
        forward: false
      });
    }
  }
  async globalListeners() {
    window.addEventListener("message", (event) => {
      if (event.data.type === _codesandbox_nodebox__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_LOADED_MESSAGE_TYPE) {
        injectScriptToIframe(this.iframe);
      }
      if (event.data.type === "urlchange") {
        this.dispatch({
          type: "urlchange",
          url: event.data.url,
          back: event.data.back,
          forward: event.data.forward
        });
      }
      this.dispatch(event.data);
    });
    await this.emulator.fs.watch(
      ["*"],
      [
        ".next",
        "node_modules",
        "build",
        "dist",
        "vendor",
        ".config",
        ".vuepress"
      ],
      async (message) => {
        if (!message)
          return;
        const event = message;
        try {
          switch (event.type) {
            case "change":
            case "create": {
              const content = await this.emulator.fs.readFile(
                event.path,
                "utf8"
              );
              this.dispatch({
                type: "fs/change",
                path: event.path,
                content
              });
              this._modulesCache.set(event.path, writeBuffer(content));
              break;
            }
            case "remove":
              this.dispatch({
                type: "fs/remove",
                path: event.path
              });
              this._modulesCache.delete(event.path);
              break;
            case "rename": {
              this.dispatch({
                type: "fs/remove",
                path: event.oldPath
              });
              this._modulesCache.delete(event.oldPath);
              const newContent = await this.emulator.fs.readFile(
                event.newPath,
                "utf8"
              );
              this.dispatch({
                type: "fs/change",
                path: event.newPath,
                content: newContent
              });
              this._modulesCache.set(event.newPath, writeBuffer(newContent));
              break;
            }
            case "close":
              break;
          }
        } catch (err) {
          this.dispatch({
            type: "action",
            action: "notification",
            notificationType: "error",
            title: getMessageFromError(err)
          });
        }
      }
    );
  }
  /**
   * PUBLIC Methods
   */
  async restartShellProcess() {
    var _a, _b;
    if (this.emulatorShellProcess && this.emulatorCommand) {
      this.dispatch({ type: "start", firstLoad: true });
      await this.emulatorShellProcess.kill();
      (_b = (_a = this.iframe) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.location.replace("about:blank");
      this.createNodebox();
      await this.compile(Object.fromEntries(this._modulesCache));
    }
  }
  updateSandbox(setup) {
    var _a;
    const modules = fromBundlerFilesToFS(setup.files);
    if (((_a = this.emulatorShellProcess) == null ? void 0 : _a.state) === "running") {
      Object.entries(modules).forEach(([key, value]) => {
        if (_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Buffer.compare */ .lW.compare(value, this._modulesCache.get(key)) !== 0) {
          this.emulator.fs.writeFile(key, value);
        }
      });
      return;
    }
    this.dispatch({
      codesandbox: true,
      modules,
      template: setup.template,
      type: "compile"
    });
    Object.entries(modules).forEach(([key, value]) => {
      this._modulesCache.set(key, writeBuffer(value));
    });
  }
  async dispatch(message) {
    var _a, _b;
    switch (message.type) {
      case "compile":
        this.compile(message.modules);
        break;
      case "refresh":
        await this.setLocationURLIntoIFrame();
        break;
      case "urlback":
      case "urlforward":
        (_b = (_a = this.iframe) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage(message, "*");
        break;
      case "shell/restart":
        this.restartShellProcess();
        break;
      case "shell/openPreview":
        window.open(this.iframePreviewUrl, "_blank");
        break;
      default:
        this.emitter.dispatch(message);
    }
  }
  listen(listener) {
    return this.emitter.listener(listener);
  }
  destroy() {
    this.emitter.cleanup();
  }
};

//# sourceMappingURL=index.mjs.map


/***/ })

};
;