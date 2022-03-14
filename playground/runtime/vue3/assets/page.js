import { A as App } from "./resetcss.23646bea.js";
import { _ as _export_sfc, g as getUrlParam } from "./plugin-vue_export-helper.75d50012.js";
import { e as entry } from "./components.js";
import { a as axios } from "./vendor.f6f849d8.js";
const getLocalConfig = () => {
  const configStr = localStorage.getItem("magicUiConfig");
  if (!configStr)
    return [];
  try {
    return [eval(`(${configStr})`)];
  } catch (err) {
    return [];
  }
};
const service = axios.create({
  withCredentials: true,
  timeout: 7e3
});
const requestHandler = function(config) {
  return config;
};
const responseHandler = function(response) {
  return response;
};
service.interceptors.request.use(requestHandler);
service.interceptors.response.use(responseHandler);
var request = {
  install(app2) {
    app2.provide("request", service);
  }
};
var App_vue_vue_type_style_index_0_lang = "";
const _sfc_main = Vue.defineComponent({
  name: "App",
  setup() {
    var _a;
    const app2 = Vue.inject("app");
    const pageConfig = Vue.reactive(((_a = app2 == null ? void 0 : app2.page) == null ? void 0 : _a.data) || {});
    return {
      pageConfig
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_magic_ui_page = Vue.resolveComponent("magic-ui-page");
  return Vue.openBlock(), Vue.createBlock(_component_magic_ui_page, { config: _ctx.pageConfig }, null, 8, ["config"]);
}
var AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const magicApp = Vue.createApp(AppComponent);
magicApp.use(request);
Object.values(entry.components).forEach((component) => {
  magicApp.component(component.name, component);
});
Object.values(entry.plugins).forEach((plugin) => {
  magicApp.use(plugin);
});
const app = new App({
  config: ((getUrlParam("localPreview") ? getLocalConfig() : window.magicUiConfig) || [])[0] || {},
  curPage: getUrlParam("page")
});
magicApp.config.globalProperties.app = app;
magicApp.provide("app", app);
magicApp.mount("#app");
//# sourceMappingURL=page.js.map
