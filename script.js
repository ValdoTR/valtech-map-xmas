/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={733:(e,t,n)=>{n.r(t),n.d(t,{Properties:()=>o,VariableDescriptor:()=>r,bootstrapExtra:()=>J,findLayerBoundaries:()=>u,findLayersBoundaries:()=>p,getAllVariables:()=>i,getLayersMap:()=>c,initDoors:()=>q,initPropertiesTemplates:()=>B,initVariableActionLayer:()=>Y});class o{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const n=this.get(e);if(void 0!==n){if(typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const n=this.get(e);if(void 0===n)throw new Error('Property "'+e+'" is missing');if(typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class r{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new o(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function i(){const e=await WA.room.getTiledMap(),t=new Map;return s(e.layers,t),t}function s(e,t){for(const n of e)if("objectgroup"===n.type)for(const e of n.objects)"variable"===e.type&&t.set(e.name,new r(e));else"group"===n.type&&s(n.layers,t)}let a;async function c(){return void 0===a&&(a=async function(){return function(e){const t=new Map;return l(e.layers,"",t),t}(await WA.room.getTiledMap())}()),a}function l(e,t,n){for(const o of e)"group"===o.type?l(o.layers,t+o.name+"/",n):(o.name=t+o.name,n.set(o.name,o))}function u(e){let t=1/0,n=1/0,o=0,r=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<e.height;s++)for(let a=0;a<e.width;a++)0!==i[a+s*e.width]&&(t=Math.min(t,a),r=Math.max(r,a),n=Math.min(n,s),o=Math.max(o,s));return{top:n,left:t,right:r+1,bottom:o+1}}function p(e){let t=1/0,n=1/0,o=0,r=0;for(const i of e){const e=u(i);e.left<t&&(t=e.left),e.top<n&&(n=e.top),e.right>r&&(r=e.right),e.bottom>o&&(o=e.bottom)}return{top:n,left:t,right:r,bottom:o}}var h=Object.prototype.toString,g=Array.isArray||function(e){return"[object Array]"===h.call(e)};function f(e){return"function"==typeof e}function d(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function y(e,t){return null!=e&&"object"==typeof e&&t in e}var m=RegExp.prototype.test,v=/\S/;var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},w=/\s*/,A=/\s+/,S=/\s*=/,W=/\s*\}/,E=/#|\^|\/|>|\{|&|=|!/;function C(e){this.string=e,this.tail=e,this.pos=0}function x(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function L(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}C.prototype.eos=function(){return""===this.tail},C.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},C.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},x.prototype.push=function(e){return new x(e,this)},x.prototype.lookup=function(e){var t,n,o,r=this.cache;if(r.hasOwnProperty(e))t=r[e];else{for(var i,s,a,c=this,l=!1;c;){if(e.indexOf(".")>0)for(i=c.view,s=e.split("."),a=0;null!=i&&a<s.length;)a===s.length-1&&(l=y(i,s[a])||(n=i,o=s[a],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(o))),i=i[s[a++]];else i=c.view[e],l=y(c.view,e);if(l){t=i;break}c=c.parent}r[e]=t}return f(t)&&(t=t.call(this.view)),t},L.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},L.prototype.parse=function(e,t){var n=this.templateCache,o=e+":"+(t||T.tags).join(":"),r=void 0!==n,i=r?n.get(o):void 0;return null==i&&(i=function(e,t){if(!e)return[];var n,o,r,i,s=!1,a=[],c=[],l=[],u=!1,p=!1,h="",f=0;function y(){if(u&&!p)for(;l.length;)delete c[l.pop()];else l=[];u=!1,p=!1}function b(e){if("string"==typeof e&&(e=e.split(A,2)),!g(e)||2!==e.length)throw new Error("Invalid tags: "+e);n=new RegExp(d(e[0])+"\\s*"),o=new RegExp("\\s*"+d(e[1])),r=new RegExp("\\s*"+d("}"+e[1]))}b(t||T.tags);for(var x,L,M,P,V,B,k=new C(e);!k.eos();){if(x=k.pos,M=k.scanUntil(n))for(var O=0,G=M.length;O<G;++O)i=P=M.charAt(O),function(e,t){return m.call(e,t)}(v,i)?(p=!0,s=!0,h+=" "):(l.push(c.length),h+=P),c.push(["text",P,x,x+1]),x+=1,"\n"===P&&(y(),h="",f=0,s=!1);if(!k.scan(n))break;if(u=!0,L=k.scan(E)||"name",k.scan(w),"="===L?(M=k.scanUntil(S),k.scan(S),k.scanUntil(o)):"{"===L?(M=k.scanUntil(r),k.scan(W),k.scanUntil(o),L="&"):M=k.scanUntil(o),!k.scan(o))throw new Error("Unclosed tag at "+k.pos);if(V=">"==L?[L,M,x,k.pos,h,f,s]:[L,M,x,k.pos],f++,c.push(V),"#"===L||"^"===L)a.push(V);else if("/"===L){if(!(B=a.pop()))throw new Error('Unopened section "'+M+'" at '+x);if(B[1]!==M)throw new Error('Unclosed section "'+B[1]+'" at '+x)}else"name"===L||"{"===L||"&"===L?p=!0:"="===L&&b(M)}if(y(),B=a.pop())throw new Error('Unclosed section "'+B[1]+'" at '+k.pos);return function(e){for(var t,n=[],o=n,r=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":o.push(t),r.push(t),o=t[4]=[];break;case"/":r.pop()[5]=t[2],o=r.length>0?r[r.length-1][4]:n;break;default:o.push(t)}return n}(function(e){for(var t,n,o=[],r=0,i=e.length;r<i;++r)(t=e[r])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(o.push(t),n=t));return o}(c))}(e,t),r&&n.set(o,i)),i},L.prototype.render=function(e,t,n,o){var r=this.getConfigTags(o),i=this.parse(e,r),s=t instanceof x?t:new x(t,void 0);return this.renderTokens(i,s,n,e,o)},L.prototype.renderTokens=function(e,t,n,o,r){for(var i,s,a,c="",l=0,u=e.length;l<u;++l)a=void 0,"#"===(s=(i=e[l])[0])?a=this.renderSection(i,t,n,o,r):"^"===s?a=this.renderInverted(i,t,n,o,r):">"===s?a=this.renderPartial(i,t,n,r):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,r):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(c+=a);return c},L.prototype.renderSection=function(e,t,n,o,r){var i=this,s="",a=t.lookup(e[1]);if(a){if(g(a))for(var c=0,l=a.length;c<l;++c)s+=this.renderTokens(e[4],t.push(a[c]),n,o,r);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)s+=this.renderTokens(e[4],t.push(a),n,o,r);else if(f(a)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,o.slice(e[3],e[5]),(function(e){return i.render(e,t,n,r)})))&&(s+=a)}else s+=this.renderTokens(e[4],t,n,o,r);return s}},L.prototype.renderInverted=function(e,t,n,o,r){var i=t.lookup(e[1]);if(!i||g(i)&&0===i.length)return this.renderTokens(e[4],t,n,o,r)},L.prototype.indentPartial=function(e,t,n){for(var o=t.replace(/[^ \t]/g,""),r=e.split("\n"),i=0;i<r.length;i++)r[i].length&&(i>0||!n)&&(r[i]=o+r[i]);return r.join("\n")},L.prototype.renderPartial=function(e,t,n,o){if(n){var r=this.getConfigTags(o),i=f(n)?n(e[1]):n[e[1]];if(null!=i){var s=e[6],a=e[5],c=e[4],l=i;0==a&&c&&(l=this.indentPartial(i,c,s));var u=this.parse(l,r);return this.renderTokens(u,t,n,l,o)}}},L.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},L.prototype.escapedValue=function(e,t,n){var o=this.getConfigEscape(n)||T.escape,r=t.lookup(e[1]);if(null!=r)return"number"==typeof r&&o===T.escape?String(r):o(r)},L.prototype.rawValue=function(e){return e[1]},L.prototype.getConfigTags=function(e){return g(e)?e:e&&"object"==typeof e?e.tags:void 0},L.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!g(e)?e.escape:void 0};var T={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){M.templateCache=e},get templateCache(){return M.templateCache}},M=new L;T.clearCache=function(){return M.clearCache()},T.parse=function(e,t){return M.parse(e,t)},T.render=function(e,t,n,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(g(r=e)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return M.render(e,t,n,o)},T.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return b[e]}))},T.Scanner=C,T.Context=x,T.Writer=L;const P=T;class V{constructor(e,t){this.template=e,this.state=t,this.ast=P.parse(e)}getValue(){return void 0===this.value&&(this.value=P.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const n of this.getUsedVariables().values())t.push(this.state.onVariableChange(n).subscribe((()=>{const t=P.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const n of e){const e=n[0],o=n[1],r=n[4];["name","&","#","^"].includes(e)&&t.add(o),void 0!==r&&"string"!=typeof r&&this.recursiveGetUsedVariables(r,t)}}}async function B(){var e;const t=await c();for(const[n,o]of t.entries()){const t=null!==(e=o.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new V(e.value,WA.state);if(t.isPureString())continue;const o=t.getValue();k(n,e.name,o),t.onChange((t=>{k(n,e.name,t)}))}}}function k(e,t,n){WA.room.setProperty(e,t,n),"visible"===t&&(n?WA.room.showLayer(e):WA.room.hideLayer(e))}const O="https://unpkg.com/@workadventure/scripting-api-extra@1.1.1/dist";let G,j,U=0,R=0;function z(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function _(e){return e.map((e=>G.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function I(e){const t=p(_(e)),n=32*((t.right-t.left)/2+t.left),o=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(U-n,2)+Math.pow(R-o,2))}function Z(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),n=e.properties.getNumber("soundRadius");let o=1;if(n){const t=I(e.properties.mustGetString("openLayer").split("\n"));if(t>n)return;o=1-t/n}t&&WA.sound.loadSound(t).play({volume:o})}(e):function(e){const t=e.properties.getString("closeSound"),n=e.properties.getNumber("soundRadius");let o=1;if(n){const t=I(e.properties.mustGetString("closeLayer").split("\n"));if(t>n)return;o=1-t/n}t&&WA.sound.loadSound(t).play({volume:o})}(e),z(e)})),z(e)}function N(e,t,n,o){const r=e.name;let i,s,a=!1;const c=n.getString("zone");if(!c)throw new Error('Missing "zone" property on doorstep layer "'+r+'"');const l=n.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const h=!!l;function g(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=n.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,f()}})}function f(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=n.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,g()}})}function d(){s&&(WA.room.website.delete(s.name),s=void 0)}WA.room.onEnterZone(c,(()=>{a=!0,n.getBoolean("autoOpen")&&u?WA.state[t.name]=!0:WA.state[t.name]||(!h||u)&&h||!n.getString("code")&&!n.getString("codeVariable")?u&&(WA.state[t.name]?g():f()):function(e){const n=p(_(t.properties.mustGetString("closeLayer").split("\n")));s=WA.room.website.create({name:"doorKeypad"+e,url:o+"/keypad.html#"+encodeURIComponent(e),position:{x:32*n.right,y:32*n.top,width:96,height:128},allowApi:!0})}(r)})),WA.room.onLeaveZone(c,(()=>{a=!1,n.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),d()})),WA.state.onVariableChange(t.name).subscribe((()=>{a&&(n.getBoolean("autoClose")||!0!==WA.state[t.name]||g(),s&&!0===WA.state[t.name]&&d(),n.getBoolean("autoOpen")||!1!==WA.state[t.name]||f())}))}function D(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),n=e.properties.getNumber("soundRadius");let o=1;if(n){const t=Math.sqrt(Math.pow(e.x-U,2)+Math.pow(e.y-R,2));if(t>n)return;o=1-t/n}WA.sound.loadSound(t).play({volume:o})}(e)}))}function $(e,t){let n;const o=t.mustGetString("zone"),r=t.getString("bellPopup");WA.room.onEnterZone(o,(()=>{var o;r?n=WA.ui.openPopup(r,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveZone(o,(()=>{n&&(n.close(),n=void 0)}))}async function q(e){e=null!=e?e:O;const t=await i();G=await c();for(const e of t.values())e.properties.get("door")&&Z(e),e.properties.get("bell")&&D(e);for(const n of G.values()){const r=new o(n.properties),i=r.getString("doorVariable");if(i&&"tilelayer"===n.type){const o=t.get(i);if(void 0===o)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+n.name+'"');N(n,o,r,e)}const s=r.getString("bellVariable");s&&$(s,r)}WA.player.onPlayerMove((e=>{U=e.x,R=e.y}))}function Y(e){const t=e.getString("bindVariable");if(t){const n=e.getString("zone");if(!n)throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');!function(e,t,n,o,r,i){i&&!WA.player.tags.includes(i)||(void 0!==n&&WA.room.onEnterZone(t,(()=>{r||(WA.state[e]=n)})),void 0!==o&&WA.room.onLeaveZone(t,(()=>{WA.state[e]=o})))}(t,n,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}}function F(e,t){let n;const o=t.getString("zone");if(!o)throw new Error('Missing "zone" property');const r=t.getString("openConfigAdminTag");let i=!0;function s(){WA.nav.closeCoWebSite()}r&&!WA.player.tags.includes(r)&&(i=!1),WA.room.onEnterZone(o,(()=>{const o=t.getString("openConfigTrigger");var r;i&&(o&&"onaction"===o?(n&&n.remove(),n=WA.ui.displayActionMessage({message:null!==(r=t.getString("openConfigTriggerMessage"))&&void 0!==r?r:"Press SPACE or touch here to configure",callback:()=>H(e)})):H(e))})),WA.room.onLeaveZone(o,(()=>{n?(n.remove(),s()):s()}))}function H(e){const t=e?"#"+e:"";WA.nav.openCoWebSite(O+"/configuration.html"+t,!0)}function J(){return WA.onInit().then((()=>{q().catch((e=>console.error(e))),async function(){const e=await c();for(const t of e.values())Y(new o(t.properties))}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:O,j=await c();const n=t.layers.find((e=>"configuration"===e.name));if(n){const t=new o(n.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of j.values()){const t=new o(e.properties),n=t.getString("openConfig");n&&"tilelayer"===e.type&&F(n,t)}}}().catch((e=>console.error(e))),B().catch((e=>console.error(e)))}))}},607:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{c(o.next(e))}catch(e){i(e)}}function a(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=n(733);let i,s;console.log("Script started successfully"),function(){o(this,void 0,void 0,(function*(){try{yield(0,r.bootstrapExtra)(),console.log("Scripting API Extra loaded successfully")}catch(e){console.error("Scripting API Extra ERROR",e)}}))}();const a=[{zone:"hiddenStoneOutdoorBottom",code:"SH9B1",number:1},{zone:"hiddenStoneOutdoorTop",code:"P7DLX",number:2},{zone:"hiddenStoneReception",code:"EG2E3",number:3},{zone:"hiddenStoneMeetings",code:"W4YMJ",number:4},{zone:"hiddenStoneBar",code:"A4L9Q",number:5}];function c(e){i=e;const t=e+"Popup",n=a.find((t=>t.zone==e));void 0!==n&&(s=WA.ui.openPopup(t,`Congratulations!\n\n            You found the Magic Stone ${null==n?void 0:n.number}/5. Send the code below to the event organizer. Catch them all and you will get a special reward!\n\n            CODE: ${null==n?void 0:n.code}`,[{label:"Got it!",className:"normal",callback:e=>{e.close()}}]))}function l(){void 0!==s&&(s.close(),s=void 0)}WA.room.onEnterLayer("hiddenStoneOutdoorTop").subscribe((()=>c("hiddenStoneOutdoorTop"))),WA.room.onLeaveLayer("hiddenStoneOutdoorTop").subscribe(l),WA.room.onEnterLayer("hiddenStoneOutdoorBottom").subscribe((()=>c("hiddenStoneOutdoorBottom"))),WA.room.onLeaveLayer("hiddenStoneOutdoorBottom").subscribe(l),WA.room.onEnterLayer("hiddenStoneReception").subscribe((()=>c("hiddenStoneReception"))),WA.room.onLeaveLayer("hiddenStoneReception").subscribe(l),WA.room.onEnterLayer("hiddenStoneMeetings").subscribe((()=>c("hiddenStoneMeetings"))),WA.room.onLeaveLayer("hiddenStoneMeetings").subscribe(l),WA.room.onEnterLayer("hiddenStoneBar").subscribe((()=>c("hiddenStoneBar"))),WA.room.onLeaveLayer("hiddenStoneBar").subscribe(l)}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(607)})();
//# sourceMappingURL=script.js.map