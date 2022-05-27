var overlay = {
  methods: [
    {
      label: "\u6253\u5F00\u8499\u5C42",
      value: "openOverlay"
    },
    {
      label: "\u5173\u95ED\u8499\u5C42",
      value: "closeOverlay"
    }
  ],
  events: [
    {
      label: "\u6253\u5F00\u8499\u5C42",
      value: "overlay:open"
    },
    {
      label: "\u5173\u95ED\u8499\u5C42",
      value: "overlay:close"
    }
  ]
};
(function() {
  const events = {
    "overlay": overlay
  };
  window.magicPresetEvents = events;
})();
//# sourceMappingURL=event.js.map
