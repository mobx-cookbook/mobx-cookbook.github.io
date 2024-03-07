"use strict";
exports.id = 191;
exports.ids = [191];
exports.modules = {

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

/***/ 2191:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SandpackRuntime": () => (/* binding */ SandpackRuntime)
/* harmony export */ });
/* harmony import */ var _chunk_E2FK2HAG_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
/* harmony import */ var _chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(110);
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8471);



// src/clients/runtime/index.ts


// src/clients/runtime/file-resolver-protocol.ts
var Protocol = class {
  constructor(type, handleMessage, protocol) {
    this.type = type;
    this.handleMessage = handleMessage;
    this.protocol = protocol;
    this._disposeMessageListener = this.protocol.channelListen(
      async (msg) => {
        if (msg.type === this.getTypeId() && msg.method) {
          const message = msg;
          try {
            const result = await this.handleMessage(message);
            const response = {
              type: this.getTypeId(),
              msgId: message.msgId,
              result
            };
            this.protocol.dispatch(response);
          } catch (err) {
            const response = {
              type: this.getTypeId(),
              msgId: message.msgId,
              error: {
                message: err.message
              }
            };
            this.protocol.dispatch(response);
          }
        }
      }
    );
  }
  getTypeId() {
    return `protocol-${this.type}`;
  }
  dispose() {
    this._disposeMessageListener();
  }
};

// src/clients/runtime/iframe-protocol.ts
var IFrameProtocol = class {
  constructor(iframe, origin) {
    // React to messages from any iframe
    this.globalListeners = {};
    this.globalListenersCount = 0;
    // React to messages from the iframe owned by this instance
    this.channelListeners = {};
    this.channelListenersCount = 0;
    // Random number to identify this instance of the client when messages are coming from multiple iframes
    this.channelId = Math.floor(Math.random() * 1e6);
    this.frameWindow = iframe.contentWindow;
    this.origin = origin;
    this.globalListeners = [];
    this.channelListeners = [];
    this.eventListener = this.eventListener.bind(this);
    if (typeof window !== "undefined") {
      window.addEventListener("message", this.eventListener);
    }
  }
  cleanup() {
    window.removeEventListener("message", this.eventListener);
    this.globalListeners = {};
    this.channelListeners = {};
    this.globalListenersCount = 0;
    this.channelListenersCount = 0;
  }
  // Sends the channelId and triggers an iframeHandshake promise to resolve,
  // so the iframe can start listening for messages (based on the id)
  register() {
    if (!this.frameWindow) {
      return;
    }
    this.frameWindow.postMessage(
      {
        type: "register-frame",
        origin: document.location.origin,
        id: this.channelId
      },
      this.origin
    );
  }
  // Messages are dispatched from the client directly to the instance iframe
  dispatch(message) {
    if (!this.frameWindow) {
      return;
    }
    this.frameWindow.postMessage(
      {
        $id: this.channelId,
        codesandbox: true,
        ...message
      },
      this.origin
    );
  }
  // Add a listener that is called on any message coming from an iframe in the page
  // This is needed for the `initialize` message which comes without a channelId
  globalListen(listener) {
    if (typeof listener !== "function") {
      return () => {
        return;
      };
    }
    const listenerId = this.globalListenersCount;
    this.globalListeners[listenerId] = listener;
    this.globalListenersCount++;
    return () => {
      delete this.globalListeners[listenerId];
    };
  }
  // Add a listener that is called on any message coming from an iframe with the instance channelId
  // All other messages (eg: from other iframes) are ignored
  channelListen(listener) {
    if (typeof listener !== "function") {
      return () => {
        return;
      };
    }
    const listenerId = this.channelListenersCount;
    this.channelListeners[listenerId] = listener;
    this.channelListenersCount++;
    return () => {
      delete this.channelListeners[listenerId];
    };
  }
  // Handles message windows coming from iframes
  eventListener(evt) {
    if (evt.source !== this.frameWindow) {
      return;
    }
    const message = evt.data;
    if (!message.codesandbox) {
      return;
    }
    Object.values(this.globalListeners).forEach(
      (listener) => listener(message)
    );
    if (message.$id !== this.channelId) {
      return;
    }
    Object.values(this.channelListeners).forEach(
      (listener) => listener(message)
    );
  }
};

// src/clients/runtime/utils.ts
var MAX_CLIENT_DEPENDENCY_COUNT = 50;
function getTemplate(pkg, modules) {
  if (!pkg) {
    return "static";
  }
  const { dependencies = {}, devDependencies = {} } = pkg;
  const totalDependencies = [
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies)
  ];
  const moduleNames = Object.keys(modules);
  const adonis = ["@adonisjs/framework", "@adonisjs/core"];
  if (totalDependencies.some((dep) => adonis.indexOf(dep) > -1)) {
    return "adonis";
  }
  const nuxt = ["nuxt", "nuxt-edge", "nuxt-ts", "nuxt-ts-edge", "nuxt3"];
  if (totalDependencies.some((dep) => nuxt.indexOf(dep) > -1)) {
    return "nuxt";
  }
  if (totalDependencies.indexOf("next") > -1) {
    return "next";
  }
  const apollo = [
    "apollo-server",
    "apollo-server-express",
    "apollo-server-hapi",
    "apollo-server-koa",
    "apollo-server-lambda",
    "apollo-server-micro"
  ];
  if (totalDependencies.some((dep) => apollo.indexOf(dep) > -1)) {
    return "apollo";
  }
  if (totalDependencies.indexOf("mdx-deck") > -1) {
    return "mdx-deck";
  }
  if (totalDependencies.indexOf("gridsome") > -1) {
    return "gridsome";
  }
  if (totalDependencies.indexOf("vuepress") > -1) {
    return "vuepress";
  }
  if (totalDependencies.indexOf("ember-cli") > -1) {
    return "ember";
  }
  if (totalDependencies.indexOf("sapper") > -1) {
    return "sapper";
  }
  if (totalDependencies.indexOf("gatsby") > -1) {
    return "gatsby";
  }
  if (totalDependencies.indexOf("quasar") > -1) {
    return "quasar";
  }
  if (totalDependencies.indexOf("@docusaurus/core") > -1) {
    return "docusaurus";
  }
  if (totalDependencies.indexOf("remix") > -1) {
    return "remix";
  }
  if (totalDependencies.indexOf("astro") > -1) {
    return "node";
  }
  if (moduleNames.some((m) => m.endsWith(".re"))) {
    return "reason";
  }
  const parcel = ["parcel-bundler", "parcel"];
  if (totalDependencies.some((dep) => parcel.indexOf(dep) > -1)) {
    return "parcel";
  }
  const dojo = ["@dojo/core", "@dojo/framework"];
  if (totalDependencies.some((dep) => dojo.indexOf(dep) > -1)) {
    return "@dojo/cli-create-app";
  }
  if (totalDependencies.indexOf("@nestjs/core") > -1 || totalDependencies.indexOf("@nestjs/common") > -1) {
    return "nest";
  }
  if (totalDependencies.indexOf("react-styleguidist") > -1) {
    return "styleguidist";
  }
  if (totalDependencies.indexOf("react-scripts") > -1) {
    return "create-react-app";
  }
  if (totalDependencies.indexOf("react-scripts-ts") > -1) {
    return "create-react-app-typescript";
  }
  if (totalDependencies.indexOf("@angular/core") > -1) {
    return "angular-cli";
  }
  if (totalDependencies.indexOf("preact-cli") > -1) {
    return "preact-cli";
  }
  if (totalDependencies.indexOf("@sveltech/routify") > -1 || totalDependencies.indexOf("@roxi/routify") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("vite") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("@frontity/core") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("svelte") > -1) {
    return "svelte";
  }
  if (totalDependencies.indexOf("vue") > -1) {
    return "vue-cli";
  }
  if (totalDependencies.indexOf("cx") > -1) {
    return "cxjs";
  }
  const nodeDeps = [
    "express",
    "koa",
    "nodemon",
    "ts-node",
    "@tensorflow/tfjs-node",
    "webpack-dev-server",
    "snowpack"
  ];
  if (totalDependencies.some((dep) => nodeDeps.indexOf(dep) > -1)) {
    return "node";
  }
  if (Object.keys(dependencies).length >= MAX_CLIENT_DEPENDENCY_COUNT) {
    return "node";
  }
  return void 0;
}

// src/clients/runtime/index.ts
var BUNDLER_URL =  false ? 0 : `https://${ false ? 0 : "2.0.17".replace(
  /\./g,
  "-"
)}-sandpack.codesandbox.io/`;
var SandpackRuntime = class extends _chunk_E2FK2HAG_mjs__WEBPACK_IMPORTED_MODULE_1__/* .SandpackClient */ .T {
  constructor(selector, sandboxSetup, options = {}) {
    super(selector, sandboxSetup, options);
    this.getTranspilerContext = () => new Promise((resolve) => {
      const unsubscribe = this.listen((message) => {
        if (message.type === "transpiler-context") {
          resolve(message.data);
          unsubscribe();
        }
      });
      this.dispatch({ type: "get-transpiler-context" });
    });
    this.bundlerURL = options.bundlerURL || BUNDLER_URL;
    this.bundlerState = void 0;
    this.errors = [];
    this.status = "initializing";
    if (typeof selector === "string") {
      this.selector = selector;
      const element = document.querySelector(selector);
      (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nullthrows */ .Wq)(element, `The element '${selector}' was not found`);
      this.element = element;
      this.iframe = document.createElement("iframe");
      this.initializeElement();
    } else {
      this.element = selector;
      this.iframe = selector;
    }
    if (!this.iframe.getAttribute("sandbox")) {
      this.iframe.setAttribute(
        "sandbox",
        "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      );
      this.iframe.setAttribute(
        "allow",
        "accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi;"
      );
    }
    this.setLocationURLIntoIFrame();
    this.iframeProtocol = new IFrameProtocol(this.iframe, this.bundlerURL);
    this.unsubscribeGlobalListener = this.iframeProtocol.globalListen(
      (mes) => {
        if (mes.type !== "initialized" || !this.iframe.contentWindow) {
          return;
        }
        this.iframeProtocol.register();
        if (this.options.fileResolver) {
          this.fileResolverProtocol = new Protocol(
            "fs",
            async (data) => {
              if (data.method === "isFile") {
                return this.options.fileResolver.isFile(data.params[0]);
              } else if (data.method === "readFile") {
                return this.options.fileResolver.readFile(data.params[0]);
              } else {
                throw new Error("Method not supported");
              }
            },
            this.iframeProtocol
          );
        }
        this.updateSandbox(this.sandboxSetup, true);
      }
    );
    this.unsubscribeChannelListener = this.iframeProtocol.channelListen(
      (mes) => {
        switch (mes.type) {
          case "start": {
            this.errors = [];
            break;
          }
          case "status": {
            this.status = mes.status;
            break;
          }
          case "action": {
            if (mes.action === "show-error") {
              this.errors = [...this.errors, (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .extractErrorDetails */ .pp)(mes)];
            }
            break;
          }
          case "state": {
            this.bundlerState = mes.state;
            break;
          }
        }
      }
    );
  }
  setLocationURLIntoIFrame() {
    var _a;
    const urlSource = this.options.startRoute ? new URL(this.options.startRoute, this.bundlerURL).toString() : this.bundlerURL;
    (_a = this.iframe.contentWindow) == null ? void 0 : _a.location.replace(urlSource);
    this.iframe.src = urlSource;
  }
  destroy() {
    this.unsubscribeChannelListener();
    this.unsubscribeGlobalListener();
    this.iframeProtocol.cleanup();
  }
  updateOptions(options) {
    if (!(0,dequal__WEBPACK_IMPORTED_MODULE_0__/* .dequal */ .J)(this.options, options)) {
      this.options = options;
      this.updateSandbox();
    }
  }
  updateSandbox(sandboxSetup = this.sandboxSetup, isInitializationCompile) {
    var _a, _b, _c, _d;
    this.sandboxSetup = {
      ...this.sandboxSetup,
      ...sandboxSetup
    };
    const files = this.getFiles();
    const modules = Object.keys(files).reduce(
      (prev, next) => ({
        ...prev,
        [next]: {
          code: files[next].code,
          path: next
        }
      }),
      {}
    );
    let packageJSON = JSON.parse(
      (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createPackageJSON */ .F3)(
        this.sandboxSetup.dependencies,
        this.sandboxSetup.devDependencies,
        this.sandboxSetup.entry
      )
    );
    try {
      packageJSON = JSON.parse(files["/package.json"].code);
    } catch (e) {
      console.error(
        (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .createError */ .Tr)(
          "could not parse package.json file: " + e.message
        )
      );
    }
    const normalizedModules = Object.keys(files).reduce(
      (prev, next) => ({
        ...prev,
        [next]: {
          content: files[next].code,
          path: next
        }
      }),
      {}
    );
    this.dispatch({
      type: "compile",
      codesandbox: true,
      version: 3,
      isInitializationCompile,
      modules,
      reactDevTools: this.options.reactDevTools,
      externalResources: this.options.externalResources || [],
      hasFileResolver: Boolean(this.options.fileResolver),
      disableDependencyPreprocessing: this.sandboxSetup.disableDependencyPreprocessing,
      template: this.sandboxSetup.template || getTemplate(packageJSON, normalizedModules),
      showOpenInCodeSandbox: (_a = this.options.showOpenInCodeSandbox) != null ? _a : true,
      showErrorScreen: (_b = this.options.showErrorScreen) != null ? _b : true,
      showLoadingScreen: (_c = this.options.showLoadingScreen) != null ? _c : true,
      skipEval: this.options.skipEval || false,
      clearConsoleDisabled: !this.options.clearConsoleOnFirstCompile,
      logLevel: (_d = this.options.logLevel) != null ? _d : 30 /* Info */,
      customNpmRegistries: this.options.customNpmRegistries
    });
  }
  dispatch(message) {
    if (message.type === "refresh") {
      this.setLocationURLIntoIFrame();
    }
    this.iframeProtocol.dispatch(message);
  }
  listen(listener) {
    return this.iframeProtocol.channelListen(listener);
  }
  /**
   * Get the URL of the contents of the current sandbox
   */
  getCodeSandboxURL() {
    const files = this.getFiles();
    const paramFiles = Object.keys(files).reduce(
      (prev, next) => ({
        ...prev,
        [next.replace("/", "")]: {
          content: files[next].code,
          isBinary: false
        }
      }),
      {}
    );
    return fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
      method: "POST",
      body: JSON.stringify({ files: paramFiles }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((x) => x.json()).then((res) => ({
      sandboxId: res.sandbox_id,
      editorUrl: `https://codesandbox.io/s/${res.sandbox_id}`,
      embedUrl: `https://codesandbox.io/embed/${res.sandbox_id}`
    }));
  }
  getFiles() {
    const { sandboxSetup } = this;
    if (sandboxSetup.files["/package.json"] === void 0) {
      return (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .addPackageJSONIfNeeded */ .V0)(
        sandboxSetup.files,
        sandboxSetup.dependencies,
        sandboxSetup.devDependencies,
        sandboxSetup.entry
      );
    }
    return this.sandboxSetup.files;
  }
  initializeElement() {
    this.iframe.style.border = "0";
    this.iframe.style.width = this.options.width || "100%";
    this.iframe.style.height = this.options.height || "100%";
    this.iframe.style.overflow = "hidden";
    (0,_chunk_QEKD4HIZ_mjs__WEBPACK_IMPORTED_MODULE_2__/* .nullthrows */ .Wq)(
      this.element.parentNode,
      "The given iframe does not have a parent."
    );
    this.element.parentNode.replaceChild(this.iframe, this.element);
  }
};

//# sourceMappingURL=index.mjs.map


/***/ })

};
;