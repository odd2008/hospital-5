(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/reg"],{"326a":function(t,e,s){"use strict";s("bc08");var i=n(s("b0ce")),o=n(s("e7a9"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(o.default))},"4f0b":function(t,e,s){"use strict";s.r(e);var i=s("a19b"),o=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},"4fb6":function(t,e,s){"use strict";var i=s("c501"),o=s.n(i);o.a},a19b:function(t,e,s){"use strict";(function(t){var s,i;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLoad:function(){s=this},onUnload:function(){clearInterval(i),this.second=0},data:function(){return{phoneno:"",password:"",code:"",mail:"",xieyi:!0,showPassword:!1,second:0,CustomBar:this.CustomBar,modalName:!1,modalContent:""}},computed:{yanzhengma:function(){return 0==this.second?"获取验证码":this.second<10?"重新获取0"+this.second:"重新获取"+this.second}},methods:{display:function(){this.showPassword=!this.showPassword},xieyitong:function(){this.xieyi=!this.xieyi},getcode:function(){if(!(this.second>0)){console.log(this.mail);var e=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;""!==this.mail?e.test(this.mail)?(this.second=60,this.$requestWithoutToken({url:"/noToken/getMailCode",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{mail:this.mail,code_type:this.code_type},succeed:function(e){console.log(JSON.stringify(e)),"success"===e.status?(t.showToast({title:e.data,icon:"none",duration:2e3}),i=setInterval(function(){s.second--,0==s.second&&clearInterval(i)},1e3)):t.showToast({title:e.errMsg,icon:"none",duration:2e3})}})):t.showToast({title:"邮箱格式不正确",icon:"none",duration:1e3}):t.showToast({title:"邮箱不得为空",icon:"none",duration:1e3})}},bindLogin:function(){if(0!=this.xieyi)if(11==this.phoneno.length)if(this.password.length<6)t.showToast({icon:"none",title:"密码不正确"});else{var e=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;""!==this.mail?e.test(this.mail)?6==this.code.length?(this.$requestWithoutToken({url:"/noToken/register",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{telephone:this.phoneno,password:this.password,mail:this.mail,code:this.code,code_type:this.code_type},succeed:function(e){console.log(JSON.stringify(e)),"success"===e.status?(t.showToast({title:"注册成功！",duration:1e3}),t.reLaunch({url:"/pages/login/login"})):t.showToast({title:e.errorMsg,icon:"none",duration:2e3})}}),t.request({url:"http://***/reg.html",data:{phoneno:this.phoneno,password:this.password,code:this.code,invitation:this.invitation},method:"POST",dataType:"json",success:function(e){200!=e.data.code?t.showToast({title:e.data.msg,icon:"none"}):(t.showToast({title:e.data.msg}),setTimeout(function(){t.navigateBack()},1500))}})):t.showToast({icon:"none",title:"验证码不正确"}):t.showToast({title:"邮箱格式不正确",icon:"none",duration:1e3}):t.showToast({title:"邮箱不得为空",icon:"none",duration:1e3})}else t.showToast({icon:"none",title:"手机号不正确"});else t.showToast({icon:"none",title:"请先阅读《软件用户协议》"})}}};e.default=o}).call(this,s("6e42")["default"])},c277:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"content"},[t._m(0),s("view",{staticClass:"list"},[s("view",{staticClass:"list-call"},[s("image",{staticClass:"img",attrs:{src:"/static/shilu-login/1.png"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneno,expression:"phoneno"}],staticClass:"biaoti",attrs:{type:"number",maxlength:"11",placeholder:"手机号",eventid:"0b03e768-0"},domProps:{value:t.phoneno},on:{input:function(e){e.target.composing||(t.phoneno=e.target.value)}}})]),s("view",{staticClass:"list-call"},[s("image",{staticClass:"img",attrs:{src:"/static/shilu-login/2.png"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"biaoti",attrs:{type:"text",maxlength:"32",placeholder:"登录密码",password:!t.showPassword,eventid:"0b03e768-1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("image",{staticClass:"img",attrs:{src:t.showPassword?"/static/shilu-login/op.png":"/static/shilu-login/cl.png",eventid:"0b03e768-2"},on:{tap:t.display}})]),s("view",{staticClass:"list-call"},[s("image",{staticClass:"img",attrs:{src:"/static/shilu-login/mail.png"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.mail,expression:"mail"}],staticClass:"biaoti",attrs:{type:"text",maxlength:"30",placeholder:"邮箱",eventid:"0b03e768-3"},domProps:{value:t.mail},on:{input:function(e){e.target.composing||(t.mail=e.target.value)}}})]),s("view",{staticClass:"list-call"},[s("image",{staticClass:"img",attrs:{src:"/static/shilu-login/3.png"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"biaoti",attrs:{type:"number",maxlength:"6",placeholder:"验证码",eventid:"0b03e768-4"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),s("view",{staticClass:"yzm",class:{yzms:t.second>0},attrs:{eventid:"0b03e768-5"},on:{tap:t.getcode}},[t._v(t._s(t.yanzhengma))])])]),s("view",{staticClass:"dlbutton",attrs:{"hover-class":"dlbutton-hover",eventid:"0b03e768-6"},on:{tap:t.bindLogin}},[s("text",[t._v("注册")])]),s("view",{staticClass:"xieyi"},[s("image",{attrs:{src:1==t.xieyi?"/static/shilu-login/ty1.png":"/static/shilu-login/ty0.png",eventid:"0b03e768-7"},on:{tap:t.xieyitong}}),s("text",{attrs:{eventid:"0b03e768-8"},on:{tap:t.xieyitong}},[t._v("同意")]),s("navigator",{attrs:{url:"/pages/user-info/user-secret","open-type":"navigate"}},[t._v("《软件用户协议》")])],1)])},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"header"},[s("image",{attrs:{src:"../../static/shilu-login/logo.png"}})])}];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return o})},c501:function(t,e,s){},e7a9:function(t,e,s){"use strict";s.r(e);var i=s("c277"),o=s("4f0b");for(var n in o)"default"!==n&&function(t){s.d(e,t,function(){return o[t]})}(n);s("4fb6");var a=s("2877"),l=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=l.exports}},[["326a","common/runtime","common/vendor"]]]);