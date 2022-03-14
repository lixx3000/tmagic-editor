var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { e as events } from "./vendor.f6f849d8.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
class Env {
  constructor(ua = globalThis.navigator.userAgent, options = {}) {
    __publicField(this, "isIos", false);
    __publicField(this, "isIphone", false);
    __publicField(this, "isIpad", false);
    __publicField(this, "isAndroid", false);
    __publicField(this, "isAnroidPad", false);
    __publicField(this, "isMac", false);
    __publicField(this, "isWin", false);
    __publicField(this, "isMqq", false);
    __publicField(this, "isWechat", false);
    __publicField(this, "isWeb", false);
    this.isIphone = ua.indexOf("iPhone") >= 0;
    this.isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
    this.isIos = this.isIphone || this.isIpad;
    this.isAndroid = ua.indexOf("Android") >= 0;
    this.isAnroidPad = this.isAndroid && ua.indexOf("Mobile") < 0;
    this.isMac = ua.indexOf("Macintosh") >= 0;
    this.isWin = ua.indexOf("Windows") >= 0;
    this.isMqq = /QQ\/([\d.]+)/.test(ua);
    this.isWechat = ua.indexOf("MicroMessenger") >= 0 && ua.indexOf("wxwork") < 0;
    this.isWeb = !this.isIos && !this.isAndroid && !/(WebOS|BlackBerry)/.test(ua);
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
const COMMON_EVENT_PREFIX = "magic:common:events:";
const COMMON_METHOD_PREFIX = "magic:common:actions:";
const CommonMethod = {
  SHOW: "show",
  HIDE: "hide",
  SCROLL_TO_VIEW: "scrollIntoView",
  SCROLL_TO_TOP: "scrollToTop"
};
const DEFAULT_EVENTS = [{ label: "\u70B9\u51FB", value: `${COMMON_EVENT_PREFIX}click` }];
const getCommonEventName = (commonEventName, nodeId) => {
  const returnName = `${commonEventName}:${nodeId}`;
  if (commonEventName.startsWith(COMMON_EVENT_PREFIX))
    return returnName;
  return `${COMMON_EVENT_PREFIX}${returnName}`;
};
const isCommonMethod = (methodName) => methodName.startsWith(COMMON_METHOD_PREFIX);
const getDirectComponent = (element, app) => {
  var _a;
  if (!element) {
    return false;
  }
  if (!element.id) {
    return getDirectComponent(element.parentElement, app);
  }
  const node = (_a = app.page) == null ? void 0 : _a.getNode(element.id);
  if (!node) {
    return false;
  }
  return node;
};
const commonClickEventHandler = (app, eventName, e) => {
  const node = getDirectComponent(e.target, app);
  if (node) {
    const { instance, data } = node;
    app.emit(getCommonEventName(eventName, data.id), instance);
  }
};
const bindCommonEventListener = (app) => {
  window.document.body.addEventListener("click", (e) => {
    commonClickEventHandler(app, "click", e);
  });
  window.document.body.addEventListener("click", (e) => {
    commonClickEventHandler(app, "click:capture", e);
  }, true);
};
const triggerCommonMethod = (methodName, node) => {
  const { instance } = node;
  switch (methodName.replace(COMMON_METHOD_PREFIX, "")) {
    case CommonMethod.SHOW:
      instance.show();
      break;
    case CommonMethod.HIDE:
      instance.hide();
      break;
    case CommonMethod.SCROLL_TO_VIEW:
      instance.$el.scrollIntoView({ behavior: "smooth" });
      break;
    case CommonMethod.SCROLL_TO_TOP:
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
  }
};
class Node extends events.exports.EventEmitter {
  constructor(config) {
    super();
    __publicField(this, "data");
    __publicField(this, "style");
    __publicField(this, "events");
    __publicField(this, "instance");
    const { events: events2 } = config;
    this.data = config;
    this.events = events2;
    this.listenLifeSafe();
    this.once("destroy", () => {
      this.instance = null;
      if (typeof this.data.destroy === "function") {
        this.data.destroy(this);
      }
      this.listenLifeSafe();
    });
  }
  listenLifeSafe() {
    this.once("created", (instance) => {
      this.instance = instance;
      if (typeof this.data.created === "function") {
        this.data.created(this);
      }
    });
    this.once("mounted", (instance) => {
      this.instance = instance;
      if (typeof this.data.mounted === "function") {
        this.data.mounted(this);
      }
    });
  }
}
class Page extends Node {
  constructor(options) {
    super(options.config);
    __publicField(this, "nodes", /* @__PURE__ */ new Map());
    this.setNode(options.config.id, this);
    this.initNode(options.config);
  }
  initNode(config) {
    var _a;
    this.setNode(config.id, new Node(config));
    (_a = config.items) == null ? void 0 : _a.forEach((element) => {
      this.initNode(element);
    });
  }
  getNode(id) {
    return this.nodes.get(id);
  }
  setNode(id, node) {
    this.nodes.set(id, node);
  }
  deleteNode(id) {
    this.nodes.delete(id);
  }
}
const style2Obj = (style) => {
  if (typeof style !== "string") {
    return style;
  }
  const obj = {};
  style.split(";").forEach((element) => {
    if (!element) {
      return;
    }
    const items = element.split(":");
    let key = items.shift();
    let value = items.join(":");
    if (!key)
      return;
    key = key.replace(/^\s*/, "").replace(/\s*$/, "");
    value = value.replace(/^\s*/, "").replace(/\s*$/, "");
    key = key.split("-").map((v, i) => i > 0 ? `${v[0].toUpperCase()}${v.substr(1)}` : v).join("");
    obj[key] = value;
  });
  return obj;
};
const fillBackgroundImage = (value) => {
  if (value && !/^url/.test(value) && !/^linear-gradient/.test(value)) {
    return `url(${value})`;
  }
  return value;
};
class App extends events.exports.EventEmitter {
  constructor(options) {
    super();
    __publicField(this, "env");
    __publicField(this, "pages", /* @__PURE__ */ new Map());
    __publicField(this, "page");
    __publicField(this, "platform", "mobile");
    __publicField(this, "jsEngine", "browser");
    __publicField(this, "components", /* @__PURE__ */ new Map());
    this.env = new Env(options.ua);
    options.platform && (this.platform = options.platform);
    options.jsEngine && (this.jsEngine = options.jsEngine);
    if (this.platform === "mobile" || this.platform === "editor") {
      const calcFontsize = () => {
        let { width } = document.documentElement.getBoundingClientRect();
        width = Math.min(800, width);
        const fontSize = width / 3.75;
        document.documentElement.style.fontSize = `${fontSize}px`;
      };
      calcFontsize();
      document.body.style.fontSize = "14px";
      globalThis.addEventListener("resize", calcFontsize);
    }
    if (options.transformStyle) {
      this.transformStyle = options.transformStyle;
    }
    options.config && this.setConfig(options.config, options.curPage);
    bindCommonEventListener(this);
  }
  transformStyle(style) {
    if (!style) {
      return {};
    }
    let styleObj = {};
    const results = {};
    if (typeof style === "string") {
      styleObj = style2Obj(style);
    } else {
      styleObj = __spreadValues({}, style);
    }
    const whiteList = ["zIndex", "opacity", "fontWeight"];
    Object.entries(styleObj).forEach(([key, value]) => {
      if (key === "backgroundImage") {
        value && (results[key] = fillBackgroundImage(value));
      } else if (!whiteList.includes(key) && value && /^[-]?[0-9]*[.]?[0-9]*$/.test(value)) {
        results[key] = `${value / 100}rem`;
      } else {
        results[key] = value;
      }
    });
    return results;
  }
  setConfig(config, curPage) {
    var _a, _b, _c;
    this.pages = /* @__PURE__ */ new Map();
    (_a = config.items) == null ? void 0 : _a.forEach((page) => {
      this.pages.set(page.id, new Page({
        config: page
      }));
    });
    this.setPage(curPage || ((_c = (_b = this.page) == null ? void 0 : _b.data) == null ? void 0 : _c.id));
  }
  setPage(id) {
    let page;
    if (id) {
      page = this.pages.get(id);
    }
    if (!page) {
      page = this.pages.get(this.pages.keys().next().value);
    }
    this.page = page;
    if (this.platform !== "magic") {
      this.bindEvents();
    }
  }
  registerComponent(type, Component) {
    this.components.set(type, Component);
  }
  unregisterComponent(type) {
    this.components.delete(type);
  }
  resolveComponent(type) {
    return this.components.get(type);
  }
  bindEvents() {
    var _a;
    if (!this.page)
      return;
    this.removeAllListeners();
    for (const [, value] of this.page.nodes) {
      (_a = value.events) == null ? void 0 : _a.forEach((event) => {
        let { name: eventName } = event;
        if (DEFAULT_EVENTS.findIndex((defaultEvent) => defaultEvent.value === eventName) > -1) {
          eventName = getCommonEventName(eventName, `${value.data.id}`);
        }
        this.on(eventName, (fromCpt, ...args) => {
          var _a2;
          if (!this.page)
            throw new Error("\u5F53\u524D\u6CA1\u6709\u9875\u9762");
          const toNode = this.page.getNode(event.to);
          if (!toNode)
            throw `ID\u4E3A${event.to}\u7684\u7EC4\u4EF6\u4E0D\u5B58\u5728`;
          const { method: methodName } = event;
          if (isCommonMethod(methodName)) {
            return triggerCommonMethod(methodName, toNode);
          }
          if (typeof ((_a2 = toNode.instance) == null ? void 0 : _a2[methodName]) === "function") {
            toNode.instance[methodName](fromCpt, ...args);
          }
        });
      });
    }
  }
  destroy() {
    this.removeAllListeners();
    this.pages.clear();
  }
}
var resetcss = "";
export { App as A };
//# sourceMappingURL=resetcss.23646bea.js.map
