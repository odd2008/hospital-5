(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/healthdoc/healthdoc-edit"],{aea4:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",[a("view",{staticClass:"cu-bar bg-white solid-bottom margin-top"},[a("view",{staticClass:"action"},[a("text",{staticClass:"cuIcon-titles text-orange"}),t._v("基本信息")])]),a("view",[a("view",{staticClass:"cu-form-group align-start margin-top",staticStyle:{height:"300rpx"}},[a("view",{staticClass:"title"},[t._v("住院史")]),a("textarea",{staticStyle:{height:"250rpx"},attrs:{maxlength:"-1",disabled:null!=t.modalName,value:t.basicInfo.hospitalHistory,placeholder:"请输入住院史信息",eventid:"35918998-0"},on:{input:t.hospitalInput}})]),a("view",{staticClass:"cu-form-group align-start margin-top",staticStyle:{height:"300rpx"}},[a("view",{staticClass:"title"},[t._v("手术史")]),a("textarea",{staticStyle:{height:"250rpx"},attrs:{maxlength:"-1",disabled:null!=t.modalName,value:t.basicInfo.operationHistory,placeholder:"请输入手术史信息",eventid:"35918998-1"},on:{input:t.operationInput}})]),a("view",{staticClass:"cu-form-group align-start margin-top",staticStyle:{height:"300rpx"}},[a("view",{staticClass:"title"},[t._v("家族史")]),a("textarea",{staticStyle:{height:"250rpx"},attrs:{maxlength:"-1",disabled:null!=t.modalName,value:t.basicInfo.familyHistory,placeholder:"请输入家族史信息",eventid:"35918998-2"},on:{input:t.familyInput}})])]),a("view",{staticClass:"cu-bar bg-white solid-bottom margin-top"},[a("view",{staticClass:"action"},[a("text",{staticClass:"cuIcon-titles text-orange"}),t._v("病史/报告")])]),a("view",{staticStyle:{"margin-bottom":"60rpx"}},[t._l(t.sickInfo,function(e,i){return a("view",{key:i,staticClass:"cu-card case",attrs:{id:"sick-"+i}},[a("view",{staticClass:"cu-item shadow"},[a("view",{staticClass:"image"},[a("image",{attrs:{src:e.imageUrl,mode:"widthFix",eventid:"35918998-3-"+i},on:{click:function(a){t.previewImage(e.imageUrl)}}}),a("view",{staticClass:"cu-tag bg-yellow text-white"},[t._v(t._s(e.date))]),a("view",{staticClass:"cu-bar bg-shadeBottom"},[a("text",{class:{"text-cut":e.contentCut},attrs:{eventid:"35918998-4-"+i},on:{click:function(e){t.changeCut(i)}}},[t._v(t._s(e.content))])])]),a("view",{staticClass:"cu-list menu-avatar"},[a("view",{staticClass:"padding flex flex-direction"},[a("button",{staticClass:"cu-btn line-red margin-tb-sm lg",attrs:{"data-index":i,eventid:"35918998-5-"+i},on:{tap:function(e){e.stopPropagation(),t.deleteImage(e)}}},[t._v("删除")])],1)])])])}),a("view",{directives:[{name:"show",rawName:"v-show",value:t.showAddSick,expression:"showAddSick"}],staticClass:"cu-card case"},[a("view",{staticClass:"cu-item shadow"},[a("view",{staticClass:"cu-bar bg-white solid-bottom"},[a("view",{staticClass:"action"},[a("text",{staticClass:"cuIcon-pic text-grey"}),t._v("病史图片")])]),a("view",{staticClass:"cu-bar bg-white"},[a("view",{staticClass:"action"},[t._v("图片上传")]),a("view",{staticClass:"action"},[t._v(t._s(t.imgList.length)+"/1")])]),a("view",{staticClass:"cu-form-group",staticStyle:{"padding-bottom":"60rpx"}},[a("view",{staticClass:"grid col-4 grid-square flex-sub"},[t._l(t.imgList,function(e,i){return a("view",{key:i,staticClass:"bg-img",attrs:{"data-url":t.imgList[i],eventid:"35918998-7-"+i},on:{tap:t.ViewImage}},[a("image",{attrs:{src:t.imgList[i],mode:"aspectFill"}}),a("view",{staticClass:"cu-tag bg-red",attrs:{"data-index":i,eventid:"35918998-6-"+i},on:{tap:function(e){e.stopPropagation(),t.DelImg(e)}}},[a("text",{staticClass:"cuIcon-close"})])])}),t.imgList.length<1?a("view",{staticClass:"solids",attrs:{eventid:"35918998-8"},on:{tap:t.ChooseImage}},[a("text",{staticClass:"cuIcon-cameraadd"})]):t._e()],2)]),a("view",{staticClass:"cu-form-group align-start"},[a("view",{staticClass:"title"},[t._v("备注")]),a("textarea",{attrs:{maxlength:"-1",disabled:null!=t.modalName,value:t.remark,placeholder:"请输入备注信息",eventid:"35918998-9"},on:{input:t.remarkInput}})]),a("view",{staticClass:"cu-list menu-avatar"},[a("view",{staticClass:"padding flex flex-direction"},[a("button",{staticClass:"cu-btn line-blue margin-tb-sm lg",attrs:{eventid:"35918998-10"},on:{click:t.saveSickInfo}},[t._v("保存")])],1)])])]),a("view",{staticClass:"padding",staticStyle:{"text-align":"center"}},[a("button",{staticClass:"cu-btn line-cyan lg",staticStyle:{width:"300rpx"},attrs:{eventid:"35918998-11"},on:{click:t.addHealthInfo}},[t._v("添加")])],1)],2),a("view",{staticClass:"load-progress",class:0!=t.loadProgress?"show":"hide",style:[{top:t.CustomBar+"px"}]},[a("view",{staticClass:"load-progress-bar bg-orange",style:[{transform:"translate3d(-"+(100-t.loadProgress)+"%, 0px, 0px)"}]})])])},s=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return s})},b328:function(t,e,a){"use strict";var i=a("b4cb"),s=a.n(i);s.a},b4cb:function(t,e,a){},b534:function(t,e,a){"use strict";a.r(e);var i=a("fabd"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=s.a},c0a7:function(t,e,a){"use strict";a("bc08");var i=n(a("b0ce")),s=n(a("c23e"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(s.default))},c23e:function(t,e,a){"use strict";a.r(e);var i=a("aea4"),s=a("b534");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("b328");var o=a("2877"),c=Object(o["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},fabd:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{basicInfo:{hospitalHistory:"",operationHistory:"",familyHistory:""},CustomBar:this.CustomBar,loadProgress:0,sickInfo:[],imgList:[],showAddSick:!1,modalName:null,remark:""}},onLoad:function(){this.LoadProgress(),this.loadInfo()},methods:{LoadProgress:function(){var t=this;this.loadProgress=this.loadProgress+3,this.loadProgress<100?setTimeout(function(){t.LoadProgress()},40):this.loadProgress=0},genderChanged:function(t){this.index=t.detail.value},DateChange:function(t){this.date=t.detail.value},changeCut:function(t){this.sickInfo[t].contentCut=!this.sickInfo[t].contentCut},previewImage:function(e){t.previewImage({urls:[e],current:e,indicator:"none",loop:!1,fail:function(){t.showToast({title:"预览失败，请重试！",duration:1e3})}})},addHealthInfo:function(){this.showAddSick=!0},saveSickInfo:function(){var e=this,a=new Date,i="".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-").concat(a.getDate());this.$uploadWithoutToken({url:"/healthDoc/uploadReportImage",filePath:this.imgList[0],header:{"Content-Type":"application/x-www-form-urlencoded"},data:{content:this.remark,createDate:i},succeed:function(a){console.log(JSON.stringify(a)),console.log(e.$constants.IMAGE_PUBLIC_PATH+a.data),e.sickInfo.push({date:i,imageUrl:e.imgList[0],content:e.remark,contentCut:!0}),e.imgList=e.imgList.concat(e.imgList),t.showToast({title:"保存成功",icon:"none",duration:1e3}),e.showAddSick=!1,e.imgList=[],e.remark=""}})},deleteImage:function(e){var a=this;t.showModal({title:"删除病史/报告",content:"确定要删除这张图片吗？",cancelText:"取消",confirmText:"确定",success:function(i){if(i.confirm){var s=e.currentTarget.dataset.index;a.$requestWithToken({url:"/healthDoc/deleteHealthImage",header:{"Content-Type":"application/x-www-form-urlencoded"},data:{id:a.sickInfo[s].id},succeed:function(e){"success"===e.status&&(a.sickInfo.splice(s,1),console.log(JSON.stringify(e)),t.showToast({title:"删除成功",icon:"none",duration:1e3}))}})}}})},ChooseImage:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},ViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){var a=this;t.showModal({title:"病史/报告",content:"确定要删除这张图片吗？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&a.imgList.splice(e.currentTarget.dataset.index,1)}})},hospitalInput:function(t){this.basicInfo.hospitalHistory=t.detail.value},operationInput:function(t){this.basicInfo.operationHistory=t.detail.value},familyInput:function(t){this.basicInfo.familyHistory=t.detail.value},remarkInput:function(t){this.remark=t.detail.value},loadInfo:function(){var t=this;this.$requestWithToken({url:"/healthDoc/getHealthDoc",header:{"Content-Type":"application/x-www-form-urlencoded"},succeed:function(e){"success"===e.status&&(t.basicInfo=e.data)}}),this.$requestWithToken({url:"/healthDoc/getHealthImage",header:{"Content-Type":"application/x-www-form-urlencoded"},succeed:function(e){if("success"===e.status){console.log(JSON.stringify(e.data));var a=!0,i=!1,s=void 0;try{for(var n,o=e.data[Symbol.iterator]();!(a=(n=o.next()).done);a=!0){var c=n.value;console.log(JSON.stringify(c)),t.sickInfo.push({id:c.id,date:c.createDate,imageUrl:t.$constants.IMAGE_PUBLIC_PATH+c.imageUrl,content:c.content,contentCut:!0})}}catch(l){i=!0,s=l}finally{try{a||null==o.return||o.return()}finally{if(i)throw s}}}}})}},onNavigationBarButtonTap:function(){this.$requestWithToken({url:"/healthDoc/saveHealthDoc",header:{"Content-Type":"application/x-www-form-urlencoded"},data:this.basicInfo,succeed:function(e){"success"===e.status&&(console.log(JSON.stringify(e)),t.showToast({title:"保存成功",icon:"none",duration:1e3}))}})}};e.default=a}).call(this,a("6e42")["default"])}},[["c0a7","common/runtime","common/vendor"]]]);