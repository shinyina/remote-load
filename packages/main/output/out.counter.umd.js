(function (e, t) {
  typeof exports == "object" && typeof module < "u"
    ? (module.exports = t(require("vue")))
    : typeof define == "function" && define.amd
    ? define(["vue"], t)
    : ((e = typeof globalThis < "u" ? globalThis : e || self),
      (e.counter = t(e.Vue)));
})(this, function (e) {
  "use strict";
  return e.defineComponent({
    name: "Counter",
    props: { msg: { type: String, default: "Hello" } },
    setup(o) {
      const r = e.reactive(o.msg),
        n = e.ref(0),
        d = e.computed(() => n.value * 2),
        c = () => {
          n.value++;
        };
      return () =>
        e.createVNode(e.Fragment, null, [
          e.createVNode("h4", null, [r]),
          e.createVNode("div", null, [
            e.createVNode("p", null, [e.createTextVNode("Count: "), n.value]),
            e.createVNode("p", null, [
              e.createTextVNode("Doubled Count: "),
              d.value,
            ]),
            e.createVNode("button", { onClick: c }, [
              e.createTextVNode("Increment"),
            ]),
          ]),
        ]);
    },
  });
});
