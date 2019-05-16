(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user-info/user-basic-info"],{"465b":function(e,a,t){"use strict";t("bc08");var n=s(t("b0ce")),o=s(t("fdee"));function s(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(o.default))},"5ca5":function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var t={data:function(){return{basicInfo:{name:"",gender:"请选择",birthday:"1996-12-01",height:175,weight:65,job:"",link:"",address:"",hometown:"",emergencyName:"",emergencyLink:""},genders:["男","女"],dateRange:{start:"1900-01-01",end:""},CustomBar:this.CustomBar,loadProgress:0,modalName:null,headPhoto:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"}},onLoad:function(){this.LoadProgress();var e=new Date;this.dateRange.end="".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate()),this.getUserInfo()},methods:{LoadProgress:function(){var e=this;this.loadProgress=this.loadProgress+3,this.loadProgress<100?setTimeout(function(){e.LoadProgress()},40):this.loadProgress=0},genderChanged:function(e){this.basicInfo.gender=this.genders[e.detail.value],console.log(this.basicInfo.gender)},DateChange:function(e){this.basicInfo.birthday=e.detail.value,console.log(this.basicInfo.birthday)},addressInput:function(e){this.basicInfo.address=e.detail.value},hometownInput:function(e){this.basicInfo.hometown=e.detail.value},getUserInfo:function(){var e=this;this.$requestWithToken({url:"/user/getUserInfo",succeed:function(a){"success"===a.status&&(console.log(JSON.stringify(a)),null!==a.data.name?(e.login=!0,e.basicInfo=a.data,null!==a.data.headImageUrl&&0!==a.data.headImageUrl.length&&(e.headPhoto=e.$constants.IMAGE_PUBLIC_PATH+a.data.headImageUrl)):console.log("无信息"))}})},chooseImage:function(){var a=this;e.chooseImage({count:1,sizeType:["original"],sourceType:["album","camera"],success:function(e){a.headPhoto=e.tempFilePaths[0],console.log(a.headPhoto),a.$uploadWithoutToken({url:"/user/uploadHeadImage",filePath:a.headPhoto,succeed:function(e){console.log(JSON.stringify(e)),console.log(a.$constants.IMAGE_PUBLIC_PATH+e.data)}})}})},viewImage:function(a){e.previewImage({urls:[this.headPhoto],current:this.headPhoto})}},onNavigationBarButtonTap:function(){0!==this.basicInfo.name.length?"请选择"!==this.basicInfo.gender?this.$requestWithToken({url:"/user/saveUserInfo",header:{"Content-Type":"application/x-www-form-urlencoded"},data:this.basicInfo,succeed:function(a){"success"===a.status&&(console.log(JSON.stringify(a)),e.showToast({title:"保存成功",icon:"none",duration:1e3}))}}):e.showToast({title:"性别未选择",icon:"none",duration:1e3}):e.showToast({title:"姓名不可为空",icon:"none",duration:1e3})}};a.default=t}).call(this,t("6e42")["default"])},"7d83":function(e,a,t){"use strict";t.r(a);var n=t("5ca5"),o=t.n(n);for(var s in n)"default"!==s&&function(e){t.d(a,e,function(){return n[e]})}(s);a["default"]=o.a},"85b9":function(e,a,t){},a685:function(e,a,t){"use strict";var n=t("85b9"),o=t.n(n);o.a},d512:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("form",[t("view",[t("view",{staticClass:"cu-form-group margin-top",attrs:{eventid:"275a8a0a-2"},on:{click:e.chooseImage}},[t("view",{staticClass:"title"},[e._v("头像")]),t("view",{attrs:{eventid:"275a8a0a-1"},on:{click:function(e){e.stopPropagation()}}},[t("view",{staticClass:"cu-avatar round",style:"background-image:url("+e.headPhoto+")",attrs:{"data-url":e.headPhoto,eventid:"275a8a0a-0"},on:{click:e.viewImage}})])]),t("view",{staticClass:"cu-form-group margin-top"},[t("view",{staticClass:"title"},[e._v("姓名")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.name,expression:"basicInfo.name"}],attrs:{name:"input",placeholder:"请输入姓名",eventid:"275a8a0a-3"},domProps:{value:e.basicInfo.name},on:{input:function(a){a.target.composing||(e.basicInfo.name=a.target.value)}}})]),t("view",{staticClass:"cu-form-group"},[t("view",{staticClass:"title"},[e._v("性别")]),t("picker",{attrs:{value:e.basicInfo.gender,range:e.genders,eventid:"275a8a0a-4"},on:{change:e.genderChanged}},[t("view",{staticClass:"picker"},[e._v(e._s(e.basicInfo.gender))])])],1),t("view",{staticClass:"cu-form-group"},[t("view",{staticClass:"title"},[e._v("出生日期")]),t("picker",{attrs:{mode:"date",value:e.basicInfo.birthday,start:e.dateRange.start,end:e.dateRange.end,eventid:"275a8a0a-5"},on:{change:e.DateChange}},[t("view",{staticClass:"picker"},[e._v(e._s(e.basicInfo.birthday))])])],1),t("view",{staticClass:"cu-form-group margin-top"},[t("view",{staticClass:"title"},[e._v("身高(cm)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.height,expression:"basicInfo.height"}],attrs:{name:"input",type:"digit",placeholder:"请输入身高",eventid:"275a8a0a-6"},domProps:{value:e.basicInfo.height},on:{input:function(a){a.target.composing||(e.basicInfo.height=a.target.value)}}})]),t("view",{staticClass:"cu-form-group"},[t("view",{staticClass:"title"},[e._v("体重(kg)")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.weight,expression:"basicInfo.weight"}],attrs:{name:"input",type:"digit",placeholder:"请输入体重",eventid:"275a8a0a-7"},domProps:{value:e.basicInfo.weight},on:{input:function(a){a.target.composing||(e.basicInfo.weight=a.target.value)}}})]),t("view",{staticClass:"cu-form-group margin-top"},[t("view",{staticClass:"title"},[e._v("职业")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.job,expression:"basicInfo.job"}],attrs:{name:"input",placeholder:"请输入职业",eventid:"275a8a0a-8"},domProps:{value:e.basicInfo.job},on:{input:function(a){a.target.composing||(e.basicInfo.job=a.target.value)}}})]),t("view",{staticClass:"cu-form-group"},[t("view",{staticClass:"title"},[e._v("紧急联系人")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.emergencyName,expression:"basicInfo.emergencyName"}],attrs:{name:"input",placeholder:"请输入紧急联系人",eventid:"275a8a0a-9"},domProps:{value:e.basicInfo.emergencyName},on:{input:function(a){a.target.composing||(e.basicInfo.emergencyName=a.target.value)}}})]),t("view",{staticClass:"cu-form-group"},[t("view",{staticClass:"title"},[e._v("紧急联系电话")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.basicInfo.emergencyLink,expression:"basicInfo.emergencyLink"}],attrs:{name:"input",type:"digit",placeholder:"请输入紧急联系电话",eventid:"275a8a0a-10"},domProps:{value:e.basicInfo.emergencyLink},on:{input:function(a){a.target.composing||(e.basicInfo.emergencyLink=a.target.value)}}})]),t("view",{staticClass:"cu-form-group align-start margin-top"},[t("view",{staticClass:"title"},[e._v("家庭住址")]),t("textarea",{attrs:{maxlength:"-1",disabled:null!=e.modalName,value:e.basicInfo.address,placeholder:"请输入家庭住址",eventid:"275a8a0a-11"},on:{input:e.addressInput}})]),t("view",{staticClass:"cu-form-group align-start margin-bottom"},[t("view",{staticClass:"title"},[e._v("户籍所在地")]),t("textarea",{attrs:{maxlength:"-1",disabled:null!=e.modalName,value:e.basicInfo.hometown,placeholder:"请输入户籍所在地",eventid:"275a8a0a-12"},on:{input:e.hometownInput}})])]),t("view",{staticClass:"load-progress",class:0!=e.loadProgress?"show":"hide",style:[{top:e.CustomBar+"px"}]},[t("view",{staticClass:"load-progress-bar bg-orange",style:[{transform:"translate3d(-"+(100-e.loadProgress)+"%, 0px, 0px)"}]})])])},o=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return o})},fdee:function(e,a,t){"use strict";t.r(a);var n=t("d512"),o=t("7d83");for(var s in o)"default"!==s&&function(e){t.d(a,e,function(){return o[e]})}(s);t("a685");var i=t("2877"),r=Object(i["a"])(o["default"],n["a"],n["b"],!1,null,null,null);a["default"]=r.exports}},[["465b","common/runtime","common/vendor"]]]);