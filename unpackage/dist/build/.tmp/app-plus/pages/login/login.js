(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"03ef":function(t,e,n){"use strict";n("bc08");var o=s(n("b0ce")),a=s(n("b92f"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(a.default))},"1e81":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},[t._m(0),n("view",{staticClass:"list"},[n("view",{staticClass:"list-call"},[n("image",{staticClass:"img",attrs:{src:"/static/shilu-login/1.png"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneno,expression:"phoneno"}],staticClass:"biaoti",attrs:{type:"number",maxlength:"11",placeholder:"输入手机号",eventid:"5957b93d-0"},domProps:{value:t.phoneno},on:{input:function(e){e.target.composing||(t.phoneno=e.target.value)}}})]),n("view",{staticClass:"list-call"},[n("image",{staticClass:"img",attrs:{src:"/static/shilu-login/2.png"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"biaoti",attrs:{type:"text",maxlength:"32",placeholder:"输入密码",password:"true",eventid:"5957b93d-1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),n("view",{staticClass:"dlbutton",attrs:{"hover-class":"dlbutton-hover",eventid:"5957b93d-2"},on:{tap:function(e){t.bindLogin()}}},[n("text",[t._v("登录")])]),n("view",{staticClass:"xieyi"},[n("navigator",{attrs:{url:"forget","open-type":"navigate"}},[t._v("忘记密码")]),n("text",[t._v("|")]),n("navigator",{attrs:{url:"reg","open-type":"navigate"}},[t._v("注册账户")])],1)])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"header"},[n("image",{attrs:{src:"../../static/shilu-login/logo.png"}})])}];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},b298:function(t,e,n){"use strict";var o=n("ee98"),a=n.n(o);a.a},b92f:function(t,e,n){"use strict";n.r(e);var o=n("1e81"),a=n("fdde");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("b298");var i=n("2877"),r=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},ceeb:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){s(t,e,n[e])})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i={onLoad:function(){this},data:function(){return{phoneno:"",password:""}},methods:a({},(0,o.mapMutations)(["login"]),{bindLogin:function(){var e=this;11==this.phoneno.length?this.password.length<6?t.showToast({icon:"none",title:"密码不正确"}):this.$requestWithoutToken({url:"/noToken/login",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{telephone:this.phoneno,password:this.password},succeed:function(n){"success"===n.status?t.setStorage({key:e.$constants.AUTHORIZATION_KEY,data:n.data,success:function(){console.log("缓存成功"),t.showToast({title:"登录成功！",duration:1e3}),t.switchTab({url:"/pages/home/main"})}}):t.showToast({title:n.errMsg,icon:"none",duration:2e3})}}):t.showToast({icon:"none",title:"手机号不正确"})}})};e.default=i}).call(this,n("6e42")["default"])},ee98:function(t,e,n){},fdde:function(t,e,n){"use strict";n.r(e);var o=n("ceeb"),a=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=a.a}},[["03ef","common/runtime","common/vendor"]]]);