import "./vendor.f6f849d8.js";
const toLine = (name = "") => name.replace(/\B([A-Z])/g, "-$1").toLowerCase();
const getNodePath = (id, data = []) => {
  const path = [];
  const get = function(id2, data2) {
    if (!Array.isArray(data2)) {
      return null;
    }
    for (let i = 0, l = data2.length; i < l; i++) {
      const item = data2[i];
      path.push(item);
      if (`${item.id}` === `${id2}`) {
        return item;
      }
      if (item.items) {
        const node = get(id2, item.items);
        if (node) {
          return node;
        }
      }
      path.pop();
    }
    return null;
  };
  get(id, data);
  return path;
};
const filterXSS = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const getUrlParam = (param, url) => {
  const u = url || location.href;
  const reg = new RegExp(`[?&#]${param}=([^&#]+)`, "gi");
  const matches = u.match(reg);
  let strArr;
  if (matches && matches.length > 0) {
    strArr = matches[matches.length - 1].split("=");
    if (strArr && strArr.length > 1) {
      return filterXSS(strArr[1]);
    }
    return "";
  }
  return "";
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
export { _export_sfc as _, getNodePath as a, getUrlParam as g, toLine as t };
//# sourceMappingURL=plugin-vue_export-helper.75d50012.js.map
