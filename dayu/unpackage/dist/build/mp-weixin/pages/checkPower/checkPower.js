(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/checkPower/checkPower"],{"1a1e":function(e,t,c){},5007:function(e,t,c){"use strict";c.r(t);var n=c("9fa4"),o=c.n(n);for(var a in n)"default"!==a&&function(e){c.d(t,e,function(){return n[e]})}(a);t["default"]=o.a},"907d":function(e,t,c){"use strict";var n=c("1a1e"),o=c.n(n);o.a},"9fa4":function(e,t,c){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=c("2f62");function o(e){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{},n=Object.keys(c);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(c).filter(function(e){return Object.getOwnPropertyDescriptor(c,e).enumerable}))),n.forEach(function(t){a(e,t,c[t])})}return e}function a(e,t,c){return t in e?Object.defineProperty(e,t,{value:c,enumerable:!0,configurable:!0,writable:!0}):e[t]=c,e}var i={data:function(){return{checkType:[{name:"钓鱼券",icon:"../../static/pow_icon_1.png",type:0},{name:"钓鱼",icon:"../../static/pow_icon_1.png",type:1},{name:"活鱼",icon:"../../static/pow_icon_2.png",type:2},{name:"会员礼包",icon:"../../static/pow_icon_3.png",type:3},{name:"岛钓",icon:"../../static/pow_icon_4.png",type:4},{name:"出湖钓鱼",icon:"../../static/pow_icon_7.png",type:5}]}},methods:o({},(0,n.mapActions)(["c_toSaveScanObj"]),{toCheckPower:function(t){var c=this,n=this.checkType[t].type;e.scanCode({onlyFromCamera:!0,success:function(t){if("scanCode:ok"==t.errMsg){var o=JSON.parse(t.result);c.c_toSaveScanObj(o),n<2&&e.navigateTo({url:"/pages/checkPower/toCheck?type=".concat(n)}),2!=n&&3!=n||(o.vip_id>1?e.navigateTo({url:"/pages/checkPower/toCheck?type=".concat(n)}):c.$api.warnNotice("请提升会员等级")),4==n&&(o.vip_id>2?e.navigateTo({url:"/pages/checkPower/toCheck?type=".concat(n)}):c.$api.warnNotice("请提升会员等级")),5==n&&(o.vip_id>3?e.navigateTo({url:"/pages/checkPower/toCheck?type=".concat(n)}):c.$api.warnNotice("请提升会员等级"))}else c.$api.warnNotice("扫码失败")}})}})};t.default=i}).call(this,c("543d")["default"])},afc7:function(e,t,c){"use strict";c.r(t);var n=c("be12"),o=c("5007");for(var a in o)"default"!==a&&function(e){c.d(t,e,function(){return o[e]})}(a);c("907d");var i=c("2877"),r=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,"de87242e",null);t["default"]=r.exports},be12:function(e,t,c){"use strict";var n=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("view",{staticClass:"checkPower"},[c("cu-custom",{attrs:{bgColor:"white",isBack:!0,mpcomid:"7cbbb802-0"}},[c("block",{slot:"content"},[e._v("权益验证")])],1),c("view",{staticClass:"checkPowerBox"},e._l(e.checkType,function(t,n){return c("view",{key:n,staticClass:"itemCheckPower",attrs:{eventid:"7cbbb802-0-"+n},on:{click:function(t){e.toCheckPower(n)}}},[c("view",{staticClass:"itemCheckPowerIcon"},[c("img",{attrs:{src:t.icon,alt:""}})]),c("view",{staticClass:"itemCheckPowerName"},[e._v(e._s(t.name))])])}))],1)},o=[];c.d(t,"a",function(){return n}),c.d(t,"b",function(){return o})},bf81:function(e,t,c){"use strict";c("9010");var n=a(c("b0ce")),o=a(c("afc7"));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(o.default))}},[["bf81","common/runtime","common/vendor"]]]);