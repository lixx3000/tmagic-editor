var page = {
  items: [],
  style: {
    width: "100%",
    height: "100%"
  }
};
var container = {
  items: [],
  style: {
    width: "375",
    height: "100"
  }
};
var button = {
  text: "\u8BF7\u8F93\u5165\u6587\u672C\u5185\u5BB9",
  multiple: true,
  style: {
    width: "270",
    height: "37.5",
    border: 0,
    backgroundColor: "#fb6f00"
  }
};
var text = {
  type: "text",
  text: "\u8BF7\u8F93\u5165\u6587\u672C\u5185\u5BB9",
  multiple: true,
  style: {
    width: "100",
    height: "auto"
  }
};
var img = {
  src: "https://puui.qpic.cn/vupload/0/1573555382625_bhp0wud8l6w.png/0",
  url: "",
  style: {
    position: "absolute",
    left: "57",
    width: "176",
    height: "176"
  }
};
var qrcode = {
  url: "https://m.film.qq.com",
  style: {
    position: "absolute",
    left: "57",
    width: "176",
    height: "176"
  }
};
var overlay = {
  style: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  items: []
};
(function() {
  const values = {
    "page": page,
    "container": container,
    "button": button,
    "text": text,
    "img": img,
    "qrcode": qrcode,
    "overlay": overlay
  };
  window.magicPresetValues = values;
})();
//# sourceMappingURL=value.js.map
