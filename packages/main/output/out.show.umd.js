(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue")):typeof define=="function"&&define.amd?define(["vue"],n):(e=typeof globalThis<"u"?globalThis:e||self,e.show=n(e.Vue))})(this,function(e){"use strict";return e.defineComponent({name:"Show",setup(t,{slots:o}){return()=>e.createVNode("div",null,[e.createVNode("h1",null,[e.createTextVNode("Hello")]),e.createVNode("hr",null,null),e.createVNode("strong",null,[e.createTextVNode("World")]),o.default()])}})});