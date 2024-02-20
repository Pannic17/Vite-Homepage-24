var Pg=Object.defineProperty;var Dg=(n,e,t)=>e in n?Pg(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Sn=(n,e,t)=>(Dg(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kc(n,e){const t=new Set(n.split(","));return e?i=>t.has(i.toLowerCase()):i=>t.has(i)}const ht={},Hs=[],vn=()=>{},Ng=()=>!1,Ao=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Uc=n=>n.startsWith("onUpdate:"),Nt=Object.assign,Bc=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Og=Object.prototype.hasOwnProperty,Ke=(n,e)=>Og.call(n,e),Fe=Array.isArray,Ws=n=>Co(n)==="[object Map]",Zd=n=>Co(n)==="[object Set]",Be=n=>typeof n=="function",wt=n=>typeof n=="string",ur=n=>typeof n=="symbol",dt=n=>n!==null&&typeof n=="object",ep=n=>(dt(n)||Be(n))&&Be(n.then)&&Be(n.catch),tp=Object.prototype.toString,Co=n=>tp.call(n),Fg=n=>Co(n).slice(8,-1),np=n=>Co(n)==="[object Object]",Vc=n=>wt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,kr=kc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Lo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},kg=/-(\w)/g,jn=Lo(n=>n.replace(kg,(e,t)=>t?t.toUpperCase():"")),Ug=/\B([A-Z])/g,hr=Lo(n=>n.replace(Ug,"-$1").toLowerCase()),Ro=Lo(n=>n.charAt(0).toUpperCase()+n.slice(1)),Zo=Lo(n=>n?`on${Ro(n)}`:""),Oi=(n,e)=>!Object.is(n,e),el=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},_o=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},Bg=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Fu;const ip=()=>Fu||(Fu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Xr(n){if(Fe(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=wt(i)?Wg(i):Xr(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(wt(n)||dt(n))return n}const Vg=/;(?![^(]*\))/g,zg=/:([^]+)/,Hg=/\/\*[^]*?\*\//g;function Wg(n){const e={};return n.replace(Hg,"").split(Vg).forEach(t=>{if(t){const i=t.split(zg);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Yr(n){let e="";if(wt(n))e=n;else if(Fe(n))for(let t=0;t<n.length;t++){const i=Yr(n[t]);i&&(e+=i+" ")}else if(dt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Gg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",jg=kc(Gg);function sp(n){return!!n||n===""}const on=n=>wt(n)?n:n==null?"":Fe(n)||dt(n)&&(n.toString===tp||!Be(n.toString))?JSON.stringify(n,rp,2):String(n),rp=(n,e)=>e&&e.__v_isRef?rp(n,e.value):Ws(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[tl(i,r)+" =>"]=s,t),{})}:Zd(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>tl(t))}:ur(e)?tl(e):dt(e)&&!Fe(e)&&!np(e)?String(e):e,tl=(n,e="")=>{var t;return ur(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let An;class ap{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=An,!e&&An&&(this.index=(An.scopes||(An.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=An;try{return An=this,e()}finally{An=t}}}on(){An=this}off(){An=this.parent}stop(e){if(this._active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function Xg(n){return new ap(n)}function Yg(n,e=An){e&&e.active&&e.effects.push(n)}function qg(){return An}let is;class zc{constructor(e,t,i,s){this.fn=e,this.trigger=t,this.scheduler=i,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Yg(this,s)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,ps();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&($g(t.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),ms()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Pi,t=is;try{return Pi=!0,is=this,this._runnings++,ku(this),this.fn()}finally{Uu(this),this._runnings--,is=t,Pi=e}}stop(){var e;this.active&&(ku(this),Uu(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function $g(n){return n.value}function ku(n){n._trackId++,n._depsLength=0}function Uu(n){if(n.deps.length>n._depsLength){for(let e=n._depsLength;e<n.deps.length;e++)op(n.deps[e],n);n.deps.length=n._depsLength}}function op(n,e){const t=n.get(e);t!==void 0&&e._trackId!==t&&(n.delete(e),n.size===0&&n.cleanup())}let Pi=!0,Kl=0;const lp=[];function ps(){lp.push(Pi),Pi=!1}function ms(){const n=lp.pop();Pi=n===void 0?!0:n}function Hc(){Kl++}function Wc(){for(Kl--;!Kl&&Ql.length;)Ql.shift()()}function cp(n,e,t){if(e.get(n)!==n._trackId){e.set(n,n._trackId);const i=n.deps[n._depsLength];i!==e?(i&&op(i,n),n.deps[n._depsLength++]=e):n._depsLength++}}const Ql=[];function up(n,e,t){Hc();for(const i of n.keys()){let s;i._dirtyLevel<e&&(s??(s=n.get(i)===i._trackId))&&(i._shouldSchedule||(i._shouldSchedule=i._dirtyLevel===0),i._dirtyLevel=e),i._shouldSchedule&&(s??(s=n.get(i)===i._trackId))&&(i.trigger(),(!i._runnings||i.allowRecurse)&&i._dirtyLevel!==2&&(i._shouldSchedule=!1,i.scheduler&&Ql.push(i.scheduler)))}Wc()}const hp=(n,e)=>{const t=new Map;return t.cleanup=n,t.computed=e,t},Jl=new WeakMap,ss=Symbol(""),Zl=Symbol("");function en(n,e,t){if(Pi&&is){let i=Jl.get(n);i||Jl.set(n,i=new Map);let s=i.get(t);s||i.set(t,s=hp(()=>i.delete(t))),cp(is,s)}}function li(n,e,t,i,s,r){const a=Jl.get(n);if(!a)return;let o=[];if(e==="clear")o=[...a.values()];else if(t==="length"&&Fe(n)){const l=Number(i);a.forEach((c,u)=>{(u==="length"||!ur(u)&&u>=l)&&o.push(c)})}else switch(t!==void 0&&o.push(a.get(t)),e){case"add":Fe(n)?Vc(t)&&o.push(a.get("length")):(o.push(a.get(ss)),Ws(n)&&o.push(a.get(Zl)));break;case"delete":Fe(n)||(o.push(a.get(ss)),Ws(n)&&o.push(a.get(Zl)));break;case"set":Ws(n)&&o.push(a.get(ss));break}Hc();for(const l of o)l&&up(l,4);Wc()}const Kg=kc("__proto__,__v_isRef,__isVue"),fp=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ur)),Bu=Qg();function Qg(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const i=et(this);for(let r=0,a=this.length;r<a;r++)en(i,"get",r+"");const s=i[e](...t);return s===-1||s===!1?i[e](...t.map(et)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){ps(),Hc();const i=et(this)[e].apply(this,t);return Wc(),ms(),i}}),n}function Jg(n){const e=et(this);return en(e,"has",n),e.hasOwnProperty(n)}class dp{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t}get(e,t,i){const s=this._isReadonly,r=this._shallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?h_:_p:r?gp:mp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Fe(e);if(!s){if(a&&Ke(Bu,t))return Reflect.get(Bu,t,i);if(t==="hasOwnProperty")return Jg}const o=Reflect.get(e,t,i);return(ur(t)?fp.has(t):Kg(t))||(s||en(e,"get",t),r)?o:$t(o)?a&&Vc(t)?o:o.value:dt(o)?s?xp(o):Po(o):o}}class pp extends dp{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._shallow){const l=Ks(r);if(!vo(i)&&!Ks(i)&&(r=et(r),i=et(i)),!Fe(e)&&$t(r)&&!$t(i))return l?!1:(r.value=i,!0)}const a=Fe(e)&&Vc(t)?Number(t)<e.length:Ke(e,t),o=Reflect.set(e,t,i,s);return e===et(s)&&(a?Oi(i,r)&&li(e,"set",t,i):li(e,"add",t,i)),o}deleteProperty(e,t){const i=Ke(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&li(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!ur(t)||!fp.has(t))&&en(e,"has",t),i}ownKeys(e){return en(e,"iterate",Fe(e)?"length":ss),Reflect.ownKeys(e)}}class Zg extends dp{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const e_=new pp,t_=new Zg,n_=new pp(!0),Gc=n=>n,Io=n=>Reflect.getPrototypeOf(n);function Ea(n,e,t=!1,i=!1){n=n.__v_raw;const s=et(n),r=et(e);t||(Oi(e,r)&&en(s,"get",e),en(s,"get",r));const{has:a}=Io(s),o=i?Gc:t?Yc:qr;if(a.call(s,e))return o(n.get(e));if(a.call(s,r))return o(n.get(r));n!==s&&n.get(e)}function Ta(n,e=!1){const t=this.__v_raw,i=et(t),s=et(n);return e||(Oi(n,s)&&en(i,"has",n),en(i,"has",s)),n===s?t.has(n):t.has(n)||t.has(s)}function Aa(n,e=!1){return n=n.__v_raw,!e&&en(et(n),"iterate",ss),Reflect.get(n,"size",n)}function Vu(n){n=et(n);const e=et(this);return Io(e).has.call(e,n)||(e.add(n),li(e,"add",n,n)),this}function zu(n,e){e=et(e);const t=et(this),{has:i,get:s}=Io(t);let r=i.call(t,n);r||(n=et(n),r=i.call(t,n));const a=s.call(t,n);return t.set(n,e),r?Oi(e,a)&&li(t,"set",n,e):li(t,"add",n,e),this}function Hu(n){const e=et(this),{has:t,get:i}=Io(e);let s=t.call(e,n);s||(n=et(n),s=t.call(e,n)),i&&i.call(e,n);const r=e.delete(n);return s&&li(e,"delete",n,void 0),r}function Wu(){const n=et(this),e=n.size!==0,t=n.clear();return e&&li(n,"clear",void 0,void 0),t}function Ca(n,e){return function(i,s){const r=this,a=r.__v_raw,o=et(a),l=e?Gc:n?Yc:qr;return!n&&en(o,"iterate",ss),a.forEach((c,u)=>i.call(s,l(c),l(u),r))}}function La(n,e,t){return function(...i){const s=this.__v_raw,r=et(s),a=Ws(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?Gc:e?Yc:qr;return!e&&en(r,"iterate",l?Zl:ss),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function fi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function i_(){const n={get(r){return Ea(this,r)},get size(){return Aa(this)},has:Ta,add:Vu,set:zu,delete:Hu,clear:Wu,forEach:Ca(!1,!1)},e={get(r){return Ea(this,r,!1,!0)},get size(){return Aa(this)},has:Ta,add:Vu,set:zu,delete:Hu,clear:Wu,forEach:Ca(!1,!0)},t={get(r){return Ea(this,r,!0)},get size(){return Aa(this,!0)},has(r){return Ta.call(this,r,!0)},add:fi("add"),set:fi("set"),delete:fi("delete"),clear:fi("clear"),forEach:Ca(!0,!1)},i={get(r){return Ea(this,r,!0,!0)},get size(){return Aa(this,!0)},has(r){return Ta.call(this,r,!0)},add:fi("add"),set:fi("set"),delete:fi("delete"),clear:fi("clear"),forEach:Ca(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=La(r,!1,!1),t[r]=La(r,!0,!1),e[r]=La(r,!1,!0),i[r]=La(r,!0,!0)}),[n,t,e,i]}const[s_,r_,a_,o_]=i_();function jc(n,e){const t=e?n?o_:a_:n?r_:s_;return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(Ke(t,s)&&s in i?t:i,s,r)}const l_={get:jc(!1,!1)},c_={get:jc(!1,!0)},u_={get:jc(!0,!1)},mp=new WeakMap,gp=new WeakMap,_p=new WeakMap,h_=new WeakMap;function f_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function d_(n){return n.__v_skip||!Object.isExtensible(n)?0:f_(Fg(n))}function Po(n){return Ks(n)?n:Xc(n,!1,e_,l_,mp)}function vp(n){return Xc(n,!1,n_,c_,gp)}function xp(n){return Xc(n,!0,t_,u_,_p)}function Xc(n,e,t,i,s){if(!dt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=s.get(n);if(r)return r;const a=d_(n);if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Gs(n){return Ks(n)?Gs(n.__v_raw):!!(n&&n.__v_isReactive)}function Ks(n){return!!(n&&n.__v_isReadonly)}function vo(n){return!!(n&&n.__v_isShallow)}function yp(n){return Gs(n)||Ks(n)}function et(n){const e=n&&n.__v_raw;return e?et(e):n}function bp(n){return Object.isExtensible(n)&&_o(n,"__v_skip",!0),n}const qr=n=>dt(n)?Po(n):n,Yc=n=>dt(n)?xp(n):n;class Mp{constructor(e,t,i,s){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new zc(()=>e(this._value),()=>lo(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=i}get value(){const e=et(this);return(!e._cacheable||e.effect.dirty)&&Oi(e._value,e._value=e.effect.run())&&lo(e,4),Sp(e),e.effect._dirtyLevel>=2&&lo(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function p_(n,e,t=!1){let i,s;const r=Be(n);return r?(i=n,s=vn):(i=n.get,s=n.set),new Mp(i,s,r||!s,t)}function Sp(n){var e;Pi&&is&&(n=et(n),cp(is,(e=n.dep)!=null?e:n.dep=hp(()=>n.dep=void 0,n instanceof Mp?n:void 0)))}function lo(n,e=4,t){n=et(n);const i=n.dep;i&&up(i,e)}function $t(n){return!!(n&&n.__v_isRef===!0)}function Ri(n){return wp(n,!1)}function qc(n){return wp(n,!0)}function wp(n,e){return $t(n)?n:new m_(n,e)}class m_{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:et(e),this._value=t?e:qr(e)}get value(){return Sp(this),this._value}set value(e){const t=this.__v_isShallow||vo(e)||Ks(e);e=t?e:et(e),Oi(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:qr(e),lo(this,4))}}function js(n){return $t(n)?n.value:n}const g_={get:(n,e,t)=>js(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return $t(s)&&!$t(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Ep(n){return Gs(n)?n:new Proxy(n,g_)}/**
* @vue/runtime-core v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Di(n,e,t,i){try{return i?n(...i):n()}catch(s){Do(s,e,t)}}function In(n,e,t,i){if(Be(n)){const r=Di(n,e,t,i);return r&&ep(r)&&r.catch(a=>{Do(a,e,t)}),r}const s=[];for(let r=0;r<n.length;r++)s.push(In(n[r],e,t,i));return s}function Do(n,e,t,i=!0){const s=e?e.vnode:null;if(e){let r=e.parent;const a=e.proxy,o=`https://vuejs.org/error-reference/#runtime-${t}`;for(;r;){const c=r.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,a,o)===!1)return}r=r.parent}const l=e.appContext.config.errorHandler;if(l){Di(l,null,10,[n,a,o]);return}}__(n,t,s,i)}function __(n,e,t,i=!0){console.error(n)}let $r=!1,ec=!1;const Ut=[];let Vn=0;const Xs=[];let Ei=null,Zi=0;const Tp=Promise.resolve();let $c=null;function Ap(n){const e=$c||Tp;return n?e.then(this?n.bind(this):n):e}function v_(n){let e=Vn+1,t=Ut.length;for(;e<t;){const i=e+t>>>1,s=Ut[i],r=Kr(s);r<n||r===n&&s.pre?e=i+1:t=i}return e}function Kc(n){(!Ut.length||!Ut.includes(n,$r&&n.allowRecurse?Vn+1:Vn))&&(n.id==null?Ut.push(n):Ut.splice(v_(n.id),0,n),Cp())}function Cp(){!$r&&!ec&&(ec=!0,$c=Tp.then(Rp))}function x_(n){const e=Ut.indexOf(n);e>Vn&&Ut.splice(e,1)}function y_(n){Fe(n)?Xs.push(...n):(!Ei||!Ei.includes(n,n.allowRecurse?Zi+1:Zi))&&Xs.push(n),Cp()}function Gu(n,e,t=$r?Vn+1:0){for(;t<Ut.length;t++){const i=Ut[t];if(i&&i.pre){if(n&&i.id!==n.uid)continue;Ut.splice(t,1),t--,i()}}}function Lp(n){if(Xs.length){const e=[...new Set(Xs)].sort((t,i)=>Kr(t)-Kr(i));if(Xs.length=0,Ei){Ei.push(...e);return}for(Ei=e,Zi=0;Zi<Ei.length;Zi++)Ei[Zi]();Ei=null,Zi=0}}const Kr=n=>n.id==null?1/0:n.id,b_=(n,e)=>{const t=Kr(n)-Kr(e);if(t===0){if(n.pre&&!e.pre)return-1;if(e.pre&&!n.pre)return 1}return t};function Rp(n){ec=!1,$r=!0,Ut.sort(b_);try{for(Vn=0;Vn<Ut.length;Vn++){const e=Ut[Vn];e&&e.active!==!1&&Di(e,null,14)}}finally{Vn=0,Ut.length=0,Lp(),$r=!1,$c=null,(Ut.length||Xs.length)&&Rp()}}function M_(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ht;let s=t;const r=e.startsWith("update:"),a=r&&e.slice(7);if(a&&a in i){const u=`${a==="modelValue"?"model":a}Modifiers`,{number:h,trim:f}=i[u]||ht;f&&(s=t.map(p=>wt(p)?p.trim():p)),h&&(s=t.map(Bg))}let o,l=i[o=Zo(e)]||i[o=Zo(jn(e))];!l&&r&&(l=i[o=Zo(hr(e))]),l&&In(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,In(c,n,6,s)}}function Ip(n,e,t=!1){const i=e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!Be(n)){const l=c=>{const u=Ip(c,e,!0);u&&(o=!0,Nt(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(dt(n)&&i.set(n,null),null):(Fe(r)?r.forEach(l=>a[l]=null):Nt(a,r),dt(n)&&i.set(n,a),a)}function No(n,e){return!n||!Ao(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ke(n,e[0].toLowerCase()+e.slice(1))||Ke(n,hr(e))||Ke(n,e))}let xn=null,Oo=null;function xo(n){const e=xn;return xn=n,Oo=n&&n.type.__scopeId||null,e}function fa(n){Oo=n}function da(){Oo=null}function S_(n,e=xn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&th(-1);const r=xo(e);let a;try{a=n(...s)}finally{xo(r),i._d&&th(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function nl(n){const{type:e,vnode:t,proxy:i,withProxy:s,props:r,propsOptions:[a],slots:o,attrs:l,emit:c,render:u,renderCache:h,data:f,setupState:p,ctx:v,inheritAttrs:m}=n;let d,g;const b=xo(n);try{if(t.shapeFlag&4){const y=s||i,w=y;d=Un(u.call(w,y,h,r,p,f,v)),g=l}else{const y=e;d=Un(y.length>1?y(r,{attrs:l,slots:o,emit:c}):y(r,null)),g=e.props?l:w_(l)}}catch(y){Vr.length=0,Do(y,n,1),d=Ze(Qr)}let S=d;if(g&&m!==!1){const y=Object.keys(g),{shapeFlag:w}=S;y.length&&w&7&&(a&&y.some(Uc)&&(g=E_(g,a)),S=Qs(S,g))}return t.dirs&&(S=Qs(S),S.dirs=S.dirs?S.dirs.concat(t.dirs):t.dirs),t.transition&&(S.transition=t.transition),d=S,xo(b),d}const w_=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ao(t))&&((e||(e={}))[t]=n[t]);return e},E_=(n,e)=>{const t={};for(const i in n)(!Uc(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function T_(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?ju(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(a[f]!==i[f]&&!No(c,f))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?ju(i,a,c):!0:!!a;return!1}function ju(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!No(t,r))return!0}return!1}function A_({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Pp="components";function C_(n,e){return R_(Pp,n,!0,e)||n}const L_=Symbol.for("v-ndc");function R_(n,e,t=!0,i=!1){const s=xn||It;if(s){const r=s.type;if(n===Pp){const o=Sv(r,!1);if(o&&(o===e||o===jn(e)||o===Ro(jn(e))))return r}const a=Xu(s[n]||r[n],e)||Xu(s.appContext[n],e);return!a&&i?r:a}}function Xu(n,e){return n&&(n[e]||n[jn(e)]||n[Ro(jn(e))])}const I_=n=>n.__isSuspense;function P_(n,e){e&&e.pendingBranch?Fe(n)?e.effects.push(...n):e.effects.push(n):y_(n)}const D_=Symbol.for("v-scx"),N_=()=>Hn(D_),Ra={};function rs(n,e,t){return Dp(n,e,t)}function Dp(n,e,{immediate:t,deep:i,flush:s,once:r,onTrack:a,onTrigger:o}=ht){if(e&&r){const A=e;e=(...P)=>{A(...P),w()}}const l=It,c=A=>i===!0?A:Us(A,i===!1?1:void 0);let u,h=!1,f=!1;if($t(n)?(u=()=>n.value,h=vo(n)):Gs(n)?(u=()=>c(n),h=!0):Fe(n)?(f=!0,h=n.some(A=>Gs(A)||vo(A)),u=()=>n.map(A=>{if($t(A))return A.value;if(Gs(A))return c(A);if(Be(A))return Di(A,l,2)})):Be(n)?e?u=()=>Di(n,l,2):u=()=>(p&&p(),In(n,l,3,[v])):u=vn,e&&i){const A=u;u=()=>Us(A())}let p,v=A=>{p=S.onStop=()=>{Di(A,l,4),p=S.onStop=void 0}},m;if(Bo)if(v=vn,e?t&&In(e,l,3,[u(),f?[]:void 0,v]):u(),s==="sync"){const A=N_();m=A.__watcherHandles||(A.__watcherHandles=[])}else return vn;let d=f?new Array(n.length).fill(Ra):Ra;const g=()=>{if(!(!S.active||!S.dirty))if(e){const A=S.run();(i||h||(f?A.some((P,M)=>Oi(P,d[M])):Oi(A,d)))&&(p&&p(),In(e,l,3,[A,d===Ra?void 0:f&&d[0]===Ra?[]:d,v]),d=A)}else S.run()};g.allowRecurse=!!e;let b;s==="sync"?b=g:s==="post"?b=()=>Qt(g,l&&l.suspense):(g.pre=!0,l&&(g.id=l.uid),b=()=>Kc(g));const S=new zc(u,vn,b),y=qg(),w=()=>{S.stop(),y&&Bc(y.effects,S)};return e?t?g():d=S.run():s==="post"?Qt(S.run.bind(S),l&&l.suspense):S.run(),m&&m.push(w),w}function O_(n,e,t){const i=this.proxy,s=wt(n)?n.includes(".")?Np(i,n):()=>i[n]:n.bind(i,i);let r;Be(e)?r=e:(r=e.handler,t=e);const a=ga(this),o=Dp(s,r.bind(i),t);return a(),o}function Np(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}function Us(n,e,t=0,i){if(!dt(n)||n.__v_skip)return n;if(e&&e>0){if(t>=e)return n;t++}if(i=i||new Set,i.has(n))return n;if(i.add(n),$t(n))Us(n.value,e,t,i);else if(Fe(n))for(let s=0;s<n.length;s++)Us(n[s],e,t,i);else if(Zd(n)||Ws(n))n.forEach(s=>{Us(s,e,t,i)});else if(np(n))for(const s in n)Us(n[s],e,t,i);return n}function ji(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(ps(),In(l,t,8,[n.el,o,n,e]),ms())}}/*! #__NO_SIDE_EFFECTS__ */function pa(n,e){return Be(n)?Nt({name:n.name},e,{setup:n}):n}const co=n=>!!n.type.__asyncLoader,Op=n=>n.type.__isKeepAlive;function F_(n,e){Fp(n,"a",e)}function k_(n,e){Fp(n,"da",e)}function Fp(n,e,t=It){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Fo(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Op(s.parent.vnode)&&U_(i,e,t,s),s=s.parent}}function U_(n,e,t,i){const s=Fo(e,n,i,!0);ko(()=>{Bc(i[e],s)},t)}function Fo(n,e,t=It,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{if(t.isUnmounted)return;ps();const o=ga(t),l=In(e,t,n,a);return o(),ms(),l});return i?s.unshift(r):s.push(r),r}}const hi=n=>(e,t=It)=>(!Bo||n==="sp")&&Fo(n,(...i)=>e(...i),t),kp=hi("bm"),fr=hi("m"),B_=hi("bu"),V_=hi("u"),z_=hi("bum"),ko=hi("um"),H_=hi("sp"),W_=hi("rtg"),G_=hi("rtc");function j_(n,e=It){Fo("ec",n,e)}function X_(n,e,t,i){let s;const r=t&&t[i];if(Fe(n)||wt(n)){s=new Array(n.length);for(let a=0,o=n.length;a<o;a++)s[a]=e(n[a],a,void 0,r&&r[a])}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r&&r[a])}else if(dt(n))if(n[Symbol.iterator])s=Array.from(n,(a,o)=>e(a,o,void 0,r&&r[o]));else{const a=Object.keys(n);s=new Array(a.length);for(let o=0,l=a.length;o<l;o++){const c=a[o];s[o]=e(n[c],c,o,r&&r[o])}}else s=[];return t&&(t[i]=s),s}const tc=n=>n?Kp(n)?eu(n)||n.proxy:tc(n.parent):null,Ur=Nt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>tc(n.parent),$root:n=>tc(n.root),$emit:n=>n.emit,$options:n=>Qc(n),$forceUpdate:n=>n.f||(n.f=()=>{n.effect.dirty=!0,Kc(n.update)}),$nextTick:n=>n.n||(n.n=Ap.bind(n.proxy)),$watch:n=>O_.bind(n)}),il=(n,e)=>n!==ht&&!n.__isScriptSetup&&Ke(n,e),Y_={get({_:n},e){const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const p=a[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(il(i,e))return a[e]=1,i[e];if(s!==ht&&Ke(s,e))return a[e]=2,s[e];if((c=n.propsOptions[0])&&Ke(c,e))return a[e]=3,r[e];if(t!==ht&&Ke(t,e))return a[e]=4,t[e];nc&&(a[e]=0)}}const u=Ur[e];let h,f;if(u)return e==="$attrs"&&en(n,"get",e),u(n);if((h=o.__cssModules)&&(h=h[e]))return h;if(t!==ht&&Ke(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,Ke(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return il(s,e)?(s[e]=t,!0):i!==ht&&Ke(i,e)?(i[e]=t,!0):Ke(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r}},a){let o;return!!t[a]||n!==ht&&Ke(n,a)||il(e,a)||(o=r[0])&&Ke(o,a)||Ke(i,a)||Ke(Ur,a)||Ke(s.config.globalProperties,a)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ke(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Yu(n){return Fe(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let nc=!0;function q_(n){const e=Qc(n),t=n.proxy,i=n.ctx;nc=!1,e.beforeCreate&&qu(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:v,activated:m,deactivated:d,beforeDestroy:g,beforeUnmount:b,destroyed:S,unmounted:y,render:w,renderTracked:A,renderTriggered:P,errorCaptured:M,serverPrefetch:I,expose:O,inheritAttrs:Q,components:ue,directives:H,filters:V}=e;if(c&&$_(c,i,null),a)for(const ne in a){const G=a[ne];Be(G)&&(i[ne]=G.bind(t))}if(s){const ne=s.call(t,t);dt(ne)&&(n.data=Po(ne))}if(nc=!0,r)for(const ne in r){const G=r[ne],pe=Be(G)?G.bind(t,t):Be(G.get)?G.get.bind(t,t):vn,ce=!Be(G)&&Be(G.set)?G.set.bind(t):vn,X=_t({get:pe,set:ce});Object.defineProperty(i,ne,{enumerable:!0,configurable:!0,get:()=>X.value,set:Y=>X.value=Y})}if(o)for(const ne in o)Up(o[ne],i,t,ne);if(l){const ne=Be(l)?l.call(t):l;Reflect.ownKeys(ne).forEach(G=>{uo(G,ne[G])})}u&&qu(u,n,"c");function re(ne,G){Fe(G)?G.forEach(pe=>ne(pe.bind(t))):G&&ne(G.bind(t))}if(re(kp,h),re(fr,f),re(B_,p),re(V_,v),re(F_,m),re(k_,d),re(j_,M),re(G_,A),re(W_,P),re(z_,b),re(ko,y),re(H_,I),Fe(O))if(O.length){const ne=n.exposed||(n.exposed={});O.forEach(G=>{Object.defineProperty(ne,G,{get:()=>t[G],set:pe=>t[G]=pe})})}else n.exposed||(n.exposed={});w&&n.render===vn&&(n.render=w),Q!=null&&(n.inheritAttrs=Q),ue&&(n.components=ue),H&&(n.directives=H)}function $_(n,e,t=vn){Fe(n)&&(n=ic(n));for(const i in n){const s=n[i];let r;dt(s)?"default"in s?r=Hn(s.from||i,s.default,!0):r=Hn(s.from||i):r=Hn(s),$t(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function qu(n,e,t){In(Fe(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Up(n,e,t,i){const s=i.includes(".")?Np(t,i):()=>t[i];if(wt(n)){const r=e[n];Be(r)&&rs(s,r)}else if(Be(n))rs(s,n.bind(t));else if(dt(n))if(Fe(n))n.forEach(r=>Up(r,e,t,i));else{const r=Be(n.handler)?n.handler.bind(t):e[n.handler];Be(r)&&rs(s,r,n)}}function Qc(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>yo(l,c,a,!0)),yo(l,e,a)),dt(e)&&r.set(e,l),l}function yo(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&yo(n,r,t,!0),s&&s.forEach(a=>yo(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=K_[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const K_={data:$u,props:Ku,emits:Ku,methods:Nr,computed:Nr,beforeCreate:Wt,created:Wt,beforeMount:Wt,mounted:Wt,beforeUpdate:Wt,updated:Wt,beforeDestroy:Wt,beforeUnmount:Wt,destroyed:Wt,unmounted:Wt,activated:Wt,deactivated:Wt,errorCaptured:Wt,serverPrefetch:Wt,components:Nr,directives:Nr,watch:J_,provide:$u,inject:Q_};function $u(n,e){return e?n?function(){return Nt(Be(n)?n.call(this,this):n,Be(e)?e.call(this,this):e)}:e:n}function Q_(n,e){return Nr(ic(n),ic(e))}function ic(n){if(Fe(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Wt(n,e){return n?[...new Set([].concat(n,e))]:e}function Nr(n,e){return n?Nt(Object.create(null),n,e):e}function Ku(n,e){return n?Fe(n)&&Fe(e)?[...new Set([...n,...e])]:Nt(Object.create(null),Yu(n),Yu(e??{})):e}function J_(n,e){if(!n)return e;if(!e)return n;const t=Nt(Object.create(null),n);for(const i in e)t[i]=Wt(n[i],e[i]);return t}function Bp(){return{app:null,config:{isNativeTag:Ng,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Z_=0;function ev(n,e){return function(i,s=null){Be(i)||(i=Nt({},i)),s!=null&&!dt(s)&&(s=null);const r=Bp(),a=new WeakSet;let o=!1;const l=r.app={_uid:Z_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Ev,get config(){return r.config},set config(c){},use(c,...u){return a.has(c)||(c&&Be(c.install)?(a.add(c),c.install(l,...u)):Be(c)&&(a.add(c),c(l,...u))),l},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),l},component(c,u){return u?(r.components[c]=u,l):r.components[c]},directive(c,u){return u?(r.directives[c]=u,l):r.directives[c]},mount(c,u,h){if(!o){const f=Ze(i,s);return f.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),u&&e?e(f,c):n(f,c,h),o=!0,l._container=c,c.__vue_app__=l,eu(f.component)||f.component.proxy}},unmount(){o&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return r.provides[c]=u,l},runWithContext(c){const u=Br;Br=l;try{return c()}finally{Br=u}}};return l}}let Br=null;function uo(n,e){if(It){let t=It.provides;const i=It.parent&&It.parent.provides;i===t&&(t=It.provides=Object.create(i)),t[n]=e}}function Hn(n,e,t=!1){const i=It||xn;if(i||Br){const s=i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:Br._context.provides;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Be(e)?e.call(i&&i.proxy):e}}function tv(n,e,t,i=!1){const s={},r={};_o(r,Uo,1),n.propsDefaults=Object.create(null),Vp(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:vp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function nv(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=et(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(No(n.emitsOptions,f))continue;const p=e[f];if(l)if(Ke(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const v=jn(f);s[v]=sc(l,o,v,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Vp(n,e,s,r)&&(c=!0);let u;for(const h in o)(!e||!Ke(e,h)&&((u=hr(h))===h||!Ke(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=sc(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!Ke(e,h))&&(delete r[h],c=!0)}c&&li(n,"set","$attrs")}function Vp(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(kr(l))continue;const c=e[l];let u;s&&Ke(s,u=jn(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:No(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=et(t),c=o||ht;for(let u=0;u<r.length;u++){const h=r[u];t[h]=sc(s,l,h,c[h],n,!Ke(c,h))}}return a}function sc(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=Ke(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Be(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=ga(s);i=c[t]=l.call(null,e),u()}}else i=l}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===hr(t))&&(i=!0))}return i}function zp(n,e,t=!1){const i=e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!Be(n)){const u=h=>{l=!0;const[f,p]=zp(h,e,!0);Nt(a,f),p&&o.push(...p)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return dt(n)&&i.set(n,Hs),Hs;if(Fe(r))for(let u=0;u<r.length;u++){const h=jn(r[u]);Qu(h)&&(a[h]=ht)}else if(r)for(const u in r){const h=jn(u);if(Qu(h)){const f=r[u],p=a[h]=Fe(f)||Be(f)?{type:f}:Nt({},f);if(p){const v=eh(Boolean,p.type),m=eh(String,p.type);p[0]=v>-1,p[1]=m<0||v<m,(v>-1||Ke(p,"default"))&&o.push(h)}}}const c=[a,o];return dt(n)&&i.set(n,c),c}function Qu(n){return n[0]!=="$"&&!kr(n)}function Ju(n){return n===null?"null":typeof n=="function"?n.name||"":typeof n=="object"&&n.constructor&&n.constructor.name||""}function Zu(n,e){return Ju(n)===Ju(e)}function eh(n,e){return Fe(e)?e.findIndex(t=>Zu(t,n)):Be(e)&&Zu(e,n)?0:-1}const Hp=n=>n[0]==="_"||n==="$stable",Jc=n=>Fe(n)?n.map(Un):[Un(n)],iv=(n,e,t)=>{if(e._n)return e;const i=S_((...s)=>Jc(e(...s)),t);return i._c=!1,i},Wp=(n,e,t)=>{const i=n._ctx;for(const s in n){if(Hp(s))continue;const r=n[s];if(Be(r))e[s]=iv(s,r,i);else if(r!=null){const a=Jc(r);e[s]=()=>a}}},Gp=(n,e)=>{const t=Jc(e);n.slots.default=()=>t},sv=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=et(e),_o(e,"_",t)):Wp(e,n.slots={})}else n.slots={},e&&Gp(n,e);_o(n.slots,Uo,1)},rv=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=ht;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:(Nt(s,e),!t&&o===1&&delete s._):(r=!e.$stable,Wp(e,s)),a=e}else e&&(Gp(n,e),a={default:1});if(r)for(const o in s)!Hp(o)&&a[o]==null&&delete s[o]};function rc(n,e,t,i,s=!1){if(Fe(n)){n.forEach((f,p)=>rc(f,e&&(Fe(e)?e[p]:e),t,i,s));return}if(co(i)&&!s)return;const r=i.shapeFlag&4?eu(i.component)||i.component.proxy:i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===ht?o.refs={}:o.refs,h=o.setupState;if(c!=null&&c!==l&&(wt(c)?(u[c]=null,Ke(h,c)&&(h[c]=null)):$t(c)&&(c.value=null)),Be(l))Di(l,o,12,[a,u]);else{const f=wt(l),p=$t(l);if(f||p){const v=()=>{if(n.f){const m=f?Ke(h,l)?h[l]:u[l]:l.value;s?Fe(m)&&Bc(m,r):Fe(m)?m.includes(r)||m.push(r):f?(u[l]=[r],Ke(h,l)&&(h[l]=u[l])):(l.value=[r],n.k&&(u[n.k]=l.value))}else f?(u[l]=a,Ke(h,l)&&(h[l]=a)):p&&(l.value=a,n.k&&(u[n.k]=a))};a?(v.id=-1,Qt(v,t)):v()}}}const Qt=P_;function av(n){return ov(n)}function ov(n,e){const t=ip();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=vn,insertStaticContent:v}=n,m=(_,x,C,N=null,B=null,$=null,le=void 0,he=null,_e=!!x.dynamicChildren)=>{if(_===x)return;_&&!Sr(_,x)&&(N=W(_),Y(_,B,$,!0),_=null),x.patchFlag===-2&&(_e=!1,x.dynamicChildren=null);const{type:T,ref:E,shapeFlag:F}=x;switch(T){case ma:d(_,x,C,N);break;case Qr:g(_,x,C,N);break;case ho:_==null&&b(x,C,N,le);break;case kt:ue(_,x,C,N,B,$,le,he,_e);break;default:F&1?w(_,x,C,N,B,$,le,he,_e):F&6?H(_,x,C,N,B,$,le,he,_e):(F&64||F&128)&&T.process(_,x,C,N,B,$,le,he,_e,ee)}E!=null&&B&&rc(E,_&&_.ref,$,x||_,!x)},d=(_,x,C,N)=>{if(_==null)i(x.el=o(x.children),C,N);else{const B=x.el=_.el;x.children!==_.children&&c(B,x.children)}},g=(_,x,C,N)=>{_==null?i(x.el=l(x.children||""),C,N):x.el=_.el},b=(_,x,C,N)=>{[_.el,_.anchor]=v(_.children,x,C,N,_.el,_.anchor)},S=({el:_,anchor:x},C,N)=>{let B;for(;_&&_!==x;)B=f(_),i(_,C,N),_=B;i(x,C,N)},y=({el:_,anchor:x})=>{let C;for(;_&&_!==x;)C=f(_),s(_),_=C;s(x)},w=(_,x,C,N,B,$,le,he,_e)=>{x.type==="svg"?le="svg":x.type==="math"&&(le="mathml"),_==null?A(x,C,N,B,$,le,he,_e):I(_,x,B,$,le,he,_e)},A=(_,x,C,N,B,$,le,he)=>{let _e,T;const{props:E,shapeFlag:F,transition:R,dirs:D}=_;if(_e=_.el=a(_.type,$,E&&E.is,E),F&8?u(_e,_.children):F&16&&M(_.children,_e,null,N,B,sl(_,$),le,he),D&&ji(_,null,N,"created"),P(_e,_,_.scopeId,le,N),E){for(const ge in E)ge!=="value"&&!kr(ge)&&r(_e,ge,null,E[ge],$,_.children,N,B,q);"value"in E&&r(_e,"value",null,E.value,$),(T=E.onVnodeBeforeMount)&&On(T,N,_)}D&&ji(_,null,N,"beforeMount");const Z=lv(B,R);Z&&R.beforeEnter(_e),i(_e,x,C),((T=E&&E.onVnodeMounted)||Z||D)&&Qt(()=>{T&&On(T,N,_),Z&&R.enter(_e),D&&ji(_,null,N,"mounted")},B)},P=(_,x,C,N,B)=>{if(C&&p(_,C),N)for(let $=0;$<N.length;$++)p(_,N[$]);if(B){let $=B.subTree;if(x===$){const le=B.vnode;P(_,le,le.scopeId,le.slotScopeIds,B.parent)}}},M=(_,x,C,N,B,$,le,he,_e=0)=>{for(let T=_e;T<_.length;T++){const E=_[T]=he?Ti(_[T]):Un(_[T]);m(null,E,x,C,N,B,$,le,he)}},I=(_,x,C,N,B,$,le)=>{const he=x.el=_.el;let{patchFlag:_e,dynamicChildren:T,dirs:E}=x;_e|=_.patchFlag&16;const F=_.props||ht,R=x.props||ht;let D;if(C&&Xi(C,!1),(D=R.onVnodeBeforeUpdate)&&On(D,C,x,_),E&&ji(x,_,C,"beforeUpdate"),C&&Xi(C,!0),T?O(_.dynamicChildren,T,he,C,N,sl(x,B),$):le||G(_,x,he,null,C,N,sl(x,B),$,!1),_e>0){if(_e&16)Q(he,x,F,R,C,N,B);else if(_e&2&&F.class!==R.class&&r(he,"class",null,R.class,B),_e&4&&r(he,"style",F.style,R.style,B),_e&8){const Z=x.dynamicProps;for(let ge=0;ge<Z.length;ge++){const de=Z[ge],K=F[de],Se=R[de];(Se!==K||de==="value")&&r(he,de,K,Se,B,_.children,C,N,q)}}_e&1&&_.children!==x.children&&u(he,x.children)}else!le&&T==null&&Q(he,x,F,R,C,N,B);((D=R.onVnodeUpdated)||E)&&Qt(()=>{D&&On(D,C,x,_),E&&ji(x,_,C,"updated")},N)},O=(_,x,C,N,B,$,le)=>{for(let he=0;he<x.length;he++){const _e=_[he],T=x[he],E=_e.el&&(_e.type===kt||!Sr(_e,T)||_e.shapeFlag&70)?h(_e.el):C;m(_e,T,E,null,N,B,$,le,!0)}},Q=(_,x,C,N,B,$,le)=>{if(C!==N){if(C!==ht)for(const he in C)!kr(he)&&!(he in N)&&r(_,he,C[he],null,le,x.children,B,$,q);for(const he in N){if(kr(he))continue;const _e=N[he],T=C[he];_e!==T&&he!=="value"&&r(_,he,T,_e,le,x.children,B,$,q)}"value"in N&&r(_,"value",C.value,N.value,le)}},ue=(_,x,C,N,B,$,le,he,_e)=>{const T=x.el=_?_.el:o(""),E=x.anchor=_?_.anchor:o("");let{patchFlag:F,dynamicChildren:R,slotScopeIds:D}=x;D&&(he=he?he.concat(D):D),_==null?(i(T,C,N),i(E,C,N),M(x.children||[],C,E,B,$,le,he,_e)):F>0&&F&64&&R&&_.dynamicChildren?(O(_.dynamicChildren,R,C,B,$,le,he),(x.key!=null||B&&x===B.subTree)&&jp(_,x,!0)):G(_,x,C,E,B,$,le,he,_e)},H=(_,x,C,N,B,$,le,he,_e)=>{x.slotScopeIds=he,_==null?x.shapeFlag&512?B.ctx.activate(x,C,N,le,_e):V(x,C,N,B,$,le,_e):te(_,x,_e)},V=(_,x,C,N,B,$,le)=>{const he=_.component=vv(_,N,B);if(Op(_)&&(he.ctx.renderer=ee),xv(he),he.asyncDep){if(B&&B.registerDep(he,re),!_.el){const _e=he.subTree=Ze(Qr);g(null,_e,x,C)}}else re(he,_,x,C,B,$,le)},te=(_,x,C)=>{const N=x.component=_.component;if(T_(_,x,C))if(N.asyncDep&&!N.asyncResolved){ne(N,x,C);return}else N.next=x,x_(N.update),N.effect.dirty=!0,N.update();else x.el=_.el,N.vnode=x},re=(_,x,C,N,B,$,le)=>{const he=()=>{if(_.isMounted){let{next:E,bu:F,u:R,parent:D,vnode:Z}=_;{const Ce=Xp(_);if(Ce){E&&(E.el=Z.el,ne(_,E,le)),Ce.asyncDep.then(()=>{_.isUnmounted||he()});return}}let ge=E,de;Xi(_,!1),E?(E.el=Z.el,ne(_,E,le)):E=Z,F&&el(F),(de=E.props&&E.props.onVnodeBeforeUpdate)&&On(de,D,E,Z),Xi(_,!0);const K=nl(_),Se=_.subTree;_.subTree=K,m(Se,K,h(Se.el),W(Se),_,B,$),E.el=K.el,ge===null&&A_(_,K.el),R&&Qt(R,B),(de=E.props&&E.props.onVnodeUpdated)&&Qt(()=>On(de,D,E,Z),B)}else{let E;const{el:F,props:R}=x,{bm:D,m:Z,parent:ge}=_,de=co(x);if(Xi(_,!1),D&&el(D),!de&&(E=R&&R.onVnodeBeforeMount)&&On(E,ge,x),Xi(_,!0),F&&Me){const K=()=>{_.subTree=nl(_),Me(F,_.subTree,_,B,null)};de?x.type.__asyncLoader().then(()=>!_.isUnmounted&&K()):K()}else{const K=_.subTree=nl(_);m(null,K,C,N,_,B,$),x.el=K.el}if(Z&&Qt(Z,B),!de&&(E=R&&R.onVnodeMounted)){const K=x;Qt(()=>On(E,ge,K),B)}(x.shapeFlag&256||ge&&co(ge.vnode)&&ge.vnode.shapeFlag&256)&&_.a&&Qt(_.a,B),_.isMounted=!0,x=C=N=null}},_e=_.effect=new zc(he,vn,()=>Kc(T),_.scope),T=_.update=()=>{_e.dirty&&_e.run()};T.id=_.uid,Xi(_,!0),T()},ne=(_,x,C)=>{x.component=_;const N=_.vnode.props;_.vnode=x,_.next=null,nv(_,x.props,N,C),rv(_,x.children,C),ps(),Gu(_),ms()},G=(_,x,C,N,B,$,le,he,_e=!1)=>{const T=_&&_.children,E=_?_.shapeFlag:0,F=x.children,{patchFlag:R,shapeFlag:D}=x;if(R>0){if(R&128){ce(T,F,C,N,B,$,le,he,_e);return}else if(R&256){pe(T,F,C,N,B,$,le,he,_e);return}}D&8?(E&16&&q(T,B,$),F!==T&&u(C,F)):E&16?D&16?ce(T,F,C,N,B,$,le,he,_e):q(T,B,$,!0):(E&8&&u(C,""),D&16&&M(F,C,N,B,$,le,he,_e))},pe=(_,x,C,N,B,$,le,he,_e)=>{_=_||Hs,x=x||Hs;const T=_.length,E=x.length,F=Math.min(T,E);let R;for(R=0;R<F;R++){const D=x[R]=_e?Ti(x[R]):Un(x[R]);m(_[R],D,C,null,B,$,le,he,_e)}T>E?q(_,B,$,!0,!1,F):M(x,C,N,B,$,le,he,_e,F)},ce=(_,x,C,N,B,$,le,he,_e)=>{let T=0;const E=x.length;let F=_.length-1,R=E-1;for(;T<=F&&T<=R;){const D=_[T],Z=x[T]=_e?Ti(x[T]):Un(x[T]);if(Sr(D,Z))m(D,Z,C,null,B,$,le,he,_e);else break;T++}for(;T<=F&&T<=R;){const D=_[F],Z=x[R]=_e?Ti(x[R]):Un(x[R]);if(Sr(D,Z))m(D,Z,C,null,B,$,le,he,_e);else break;F--,R--}if(T>F){if(T<=R){const D=R+1,Z=D<E?x[D].el:N;for(;T<=R;)m(null,x[T]=_e?Ti(x[T]):Un(x[T]),C,Z,B,$,le,he,_e),T++}}else if(T>R)for(;T<=F;)Y(_[T],B,$,!0),T++;else{const D=T,Z=T,ge=new Map;for(T=Z;T<=R;T++){const Ne=x[T]=_e?Ti(x[T]):Un(x[T]);Ne.key!=null&&ge.set(Ne.key,T)}let de,K=0;const Se=R-Z+1;let Ce=!1,Ae=0;const Le=new Array(Se);for(T=0;T<Se;T++)Le[T]=0;for(T=D;T<=F;T++){const Ne=_[T];if(K>=Se){Y(Ne,B,$,!0);continue}let Xe;if(Ne.key!=null)Xe=ge.get(Ne.key);else for(de=Z;de<=R;de++)if(Le[de-Z]===0&&Sr(Ne,x[de])){Xe=de;break}Xe===void 0?Y(Ne,B,$,!0):(Le[Xe-Z]=T+1,Xe>=Ae?Ae=Xe:Ce=!0,m(Ne,x[Xe],C,null,B,$,le,he,_e),K++)}const Re=Ce?cv(Le):Hs;for(de=Re.length-1,T=Se-1;T>=0;T--){const Ne=Z+T,Xe=x[Ne],mt=Ne+1<E?x[Ne+1].el:N;Le[T]===0?m(null,Xe,C,mt,B,$,le,he,_e):Ce&&(de<0||T!==Re[de]?X(Xe,C,mt,2):de--)}}},X=(_,x,C,N,B=null)=>{const{el:$,type:le,transition:he,children:_e,shapeFlag:T}=_;if(T&6){X(_.component.subTree,x,C,N);return}if(T&128){_.suspense.move(x,C,N);return}if(T&64){le.move(_,x,C,ee);return}if(le===kt){i($,x,C);for(let F=0;F<_e.length;F++)X(_e[F],x,C,N);i(_.anchor,x,C);return}if(le===ho){S(_,x,C);return}if(N!==2&&T&1&&he)if(N===0)he.beforeEnter($),i($,x,C),Qt(()=>he.enter($),B);else{const{leave:F,delayLeave:R,afterLeave:D}=he,Z=()=>i($,x,C),ge=()=>{F($,()=>{Z(),D&&D()})};R?R($,Z,ge):ge()}else i($,x,C)},Y=(_,x,C,N=!1,B=!1)=>{const{type:$,props:le,ref:he,children:_e,dynamicChildren:T,shapeFlag:E,patchFlag:F,dirs:R}=_;if(he!=null&&rc(he,null,C,_,!0),E&256){x.ctx.deactivate(_);return}const D=E&1&&R,Z=!co(_);let ge;if(Z&&(ge=le&&le.onVnodeBeforeUnmount)&&On(ge,x,_),E&6)xe(_.component,C,N);else{if(E&128){_.suspense.unmount(C,N);return}D&&ji(_,null,x,"beforeUnmount"),E&64?_.type.remove(_,x,C,B,ee,N):T&&($!==kt||F>0&&F&64)?q(T,x,C,!1,!0):($===kt&&F&384||!B&&E&16)&&q(_e,x,C),N&&fe(_)}(Z&&(ge=le&&le.onVnodeUnmounted)||D)&&Qt(()=>{ge&&On(ge,x,_),D&&ji(_,null,x,"unmounted")},C)},fe=_=>{const{type:x,el:C,anchor:N,transition:B}=_;if(x===kt){me(C,N);return}if(x===ho){y(_);return}const $=()=>{s(C),B&&!B.persisted&&B.afterLeave&&B.afterLeave()};if(_.shapeFlag&1&&B&&!B.persisted){const{leave:le,delayLeave:he}=B,_e=()=>le(C,$);he?he(_.el,$,_e):_e()}else $()},me=(_,x)=>{let C;for(;_!==x;)C=f(_),s(_),_=C;s(x)},xe=(_,x,C)=>{const{bum:N,scope:B,update:$,subTree:le,um:he}=_;N&&el(N),B.stop(),$&&($.active=!1,Y(le,_,x,C)),he&&Qt(he,x),Qt(()=>{_.isUnmounted=!0},x),x&&x.pendingBranch&&!x.isUnmounted&&_.asyncDep&&!_.asyncResolved&&_.suspenseId===x.pendingId&&(x.deps--,x.deps===0&&x.resolve())},q=(_,x,C,N=!1,B=!1,$=0)=>{for(let le=$;le<_.length;le++)Y(_[le],x,C,N,B)},W=_=>_.shapeFlag&6?W(_.component.subTree):_.shapeFlag&128?_.suspense.next():f(_.anchor||_.el);let J=!1;const ie=(_,x,C)=>{_==null?x._vnode&&Y(x._vnode,null,null,!0):m(x._vnode||null,_,x,null,null,null,C),J||(J=!0,Gu(),Lp(),J=!1),x._vnode=_},ee={p:m,um:Y,m:X,r:fe,mt:V,mc:M,pc:G,pbc:O,n:W,o:n};let Ee,Me;return e&&([Ee,Me]=e(ee)),{render:ie,hydrate:Ee,createApp:ev(ie,Ee)}}function sl({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Xi({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function lv(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function jp(n,e,t=!1){const i=n.children,s=e.children;if(Fe(i)&&Fe(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=Ti(s[r]),o.el=a.el),t||jp(a,o)),o.type===ma&&(o.el=a.el)}}function cv(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function Xp(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Xp(e)}const uv=n=>n.__isTeleport,kt=Symbol.for("v-fgt"),ma=Symbol.for("v-txt"),Qr=Symbol.for("v-cmt"),ho=Symbol.for("v-stc"),Vr=[];let Cn=null;function Wn(n=!1){Vr.push(Cn=n?null:[])}function hv(){Vr.pop(),Cn=Vr[Vr.length-1]||null}let Jr=1;function th(n){Jr+=n}function Yp(n){return n.dynamicChildren=Jr>0?Cn||Hs:null,hv(),Jr>0&&Cn&&Cn.push(n),n}function ci(n,e,t,i,s,r){return Yp(we(n,e,t,i,s,r,!0))}function fv(n,e,t,i,s){return Yp(Ze(n,e,t,i,s,!0))}function ac(n){return n?n.__v_isVNode===!0:!1}function Sr(n,e){return n.type===e.type&&n.key===e.key}const Uo="__vInternal",qp=({key:n})=>n??null,fo=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?wt(n)||$t(n)||Be(n)?{i:xn,r:n,k:e,f:!!t}:n:null);function we(n,e=null,t=null,i=0,s=null,r=n===kt?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&qp(e),ref:e&&fo(e),scopeId:Oo,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:xn};return o?(Zc(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=wt(t)?8:16),Jr>0&&!a&&Cn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Cn.push(l),l}const Ze=dv;function dv(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===L_)&&(n=Qr),ac(n)){const o=Qs(n,e,!0);return t&&Zc(o,t),Jr>0&&!r&&Cn&&(o.shapeFlag&6?Cn[Cn.indexOf(n)]=o:Cn.push(o)),o.patchFlag|=-2,o}if(wv(n)&&(n=n.__vccOpts),e){e=pv(e);let{class:o,style:l}=e;o&&!wt(o)&&(e.class=Yr(o)),dt(l)&&(yp(l)&&!Fe(l)&&(l=Nt({},l)),e.style=Xr(l))}const a=wt(n)?1:I_(n)?128:uv(n)?64:dt(n)?4:Be(n)?2:0;return we(n,e,t,i,s,a,r,!0)}function pv(n){return n?yp(n)||Uo in n?Nt({},n):n:null}function Qs(n,e,t=!1){const{props:i,ref:s,patchFlag:r,children:a}=n,o=e?mv(i||{},e):i;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:o,key:o&&qp(o),ref:e&&e.ref?t&&s?Fe(s)?s.concat(fo(e)):[s,fo(e)]:fo(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==kt?r===-1?16:r|16:r,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Qs(n.ssContent),ssFallback:n.ssFallback&&Qs(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function Ln(n=" ",e=0){return Ze(ma,null,n,e)}function $p(n,e){const t=Ze(ho,null,n);return t.staticCount=e,t}function Un(n){return n==null||typeof n=="boolean"?Ze(Qr):Fe(n)?Ze(kt,null,n.slice()):typeof n=="object"?Ti(n):Ze(ma,null,String(n))}function Ti(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Qs(n)}function Zc(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Fe(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Zc(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!(Uo in e)?e._ctx=xn:s===3&&xn&&(xn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Be(e)?(e={default:e,_ctx:xn},t=32):(e=String(e),i&64?(t=16,e=[Ln(e)]):t=8);n.children=e,n.shapeFlag|=t}function mv(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Yr([e.class,i.class]));else if(s==="style")e.style=Xr([e.style,i.style]);else if(Ao(s)){const r=e[s],a=i[s];a&&r!==a&&!(Fe(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=i[s])}return e}function On(n,e,t,i=null){In(n,e,7,[t,i])}const gv=Bp();let _v=0;function vv(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||gv,r={uid:_v++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new ap(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:zp(i,s),emitsOptions:Ip(i,s),emit:null,emitted:null,propsDefaults:ht,inheritAttrs:i.inheritAttrs,ctx:ht,data:ht,props:ht,attrs:ht,slots:ht,refs:ht,setupState:ht,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=M_.bind(null,r),n.ce&&n.ce(r),r}let It=null;const Zr=()=>It||xn;let bo,oc;{const n=ip(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};bo=e("__VUE_INSTANCE_SETTERS__",t=>It=t),oc=e("__VUE_SSR_SETTERS__",t=>Bo=t)}const ga=n=>{const e=It;return bo(n),n.scope.on(),()=>{n.scope.off(),bo(e)}},nh=()=>{It&&It.scope.off(),bo(null)};function Kp(n){return n.vnode.shapeFlag&4}let Bo=!1;function xv(n,e=!1){e&&oc(e);const{props:t,children:i}=n.vnode,s=Kp(n);tv(n,t,s,e),sv(n,i);const r=s?yv(n,e):void 0;return e&&oc(!1),r}function yv(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=bp(new Proxy(n.ctx,Y_));const{setup:i}=t;if(i){const s=n.setupContext=i.length>1?Mv(n):null,r=ga(n);ps();const a=Di(i,n,0,[n.props,s]);if(ms(),r(),ep(a)){if(a.then(nh,nh),e)return a.then(o=>{ih(n,o,e)}).catch(o=>{Do(o,n,0)});n.asyncDep=a}else ih(n,a,e)}else Qp(n,e)}function ih(n,e,t){Be(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:dt(e)&&(n.setupState=Ep(e)),Qp(n,t)}let sh;function Qp(n,e,t){const i=n.type;if(!n.render){if(!e&&sh&&!i.render){const s=i.template||Qc(n).template;if(s){const{isCustomElement:r,compilerOptions:a}=n.appContext.config,{delimiters:o,compilerOptions:l}=i,c=Nt(Nt({isCustomElement:r,delimiters:o},a),l);i.render=sh(s,c)}}n.render=i.render||vn}{const s=ga(n);ps();try{q_(n)}finally{ms(),s()}}}function bv(n){return n.attrsProxy||(n.attrsProxy=new Proxy(n.attrs,{get(e,t){return en(n,"get","$attrs"),e[t]}}))}function Mv(n){const e=t=>{n.exposed=t||{}};return{get attrs(){return bv(n)},slots:n.slots,emit:n.emit,expose:e}}function eu(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(Ep(bp(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ur)return Ur[t](n)},has(e,t){return t in e||t in Ur}}))}function Sv(n,e=!0){return Be(n)?n.displayName||n.name:n.name||e&&n.__name}function wv(n){return Be(n)&&"__vccOpts"in n}const _t=(n,e)=>p_(n,e,Bo);function Vo(n,e,t){const i=arguments.length;return i===2?dt(e)&&!Fe(e)?ac(e)?Ze(n,null,[e]):Ze(n,e):Ze(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&ac(t)&&(t=[t]),Ze(n,e,t))}const Ev="3.4.19";/**
* @vue/runtime-dom v3.4.19
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Tv="http://www.w3.org/2000/svg",Av="http://www.w3.org/1998/Math/MathML",Ai=typeof document<"u"?document:null,rh=Ai&&Ai.createElement("template"),Cv={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Ai.createElementNS(Tv,n):e==="mathml"?Ai.createElementNS(Av,n):Ai.createElement(n,t?{is:t}:void 0);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ai.createTextNode(n),createComment:n=>Ai.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ai.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{rh.innerHTML=i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n;const o=rh.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Lv=Symbol("_vtc");function Rv(n,e,t){const i=n[Lv];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const ah=Symbol("_vod"),Iv=Symbol(""),Pv=/(^|;)\s*display\s*:/;function Dv(n,e,t){const i=n.style,s=wt(t),r=i.display;let a=!1;if(t&&!s){if(e&&!wt(e))for(const o in e)t[o]==null&&lc(i,o,"");for(const o in t)o==="display"&&(a=!0),lc(i,o,t[o])}else if(s){if(e!==t){const o=i[Iv];o&&(t+=";"+o),i.cssText=t,a=Pv.test(t)}}else e&&n.removeAttribute("style");ah in n&&(n[ah]=a?i.display:"",i.display=r)}const oh=/\s*!important$/;function lc(n,e,t){if(Fe(t))t.forEach(i=>lc(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=Nv(n,e);oh.test(t)?n.setProperty(hr(i),t.replace(oh,""),"important"):n[i]=t}}const lh=["Webkit","Moz","ms"],rl={};function Nv(n,e){const t=rl[e];if(t)return t;let i=jn(e);if(i!=="filter"&&i in n)return rl[e]=i;i=Ro(i);for(let s=0;s<lh.length;s++){const r=lh[s]+i;if(r in n)return rl[e]=r}return e}const ch="http://www.w3.org/1999/xlink";function Ov(n,e,t,i,s){if(i&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(ch,e.slice(6,e.length)):n.setAttributeNS(ch,e,t);else{const r=jg(e);t==null||r&&!sp(t)?n.removeAttribute(e):n.setAttribute(e,r?"":t)}}function Fv(n,e,t,i,s,r,a){if(e==="innerHTML"||e==="textContent"){i&&a(i,s,r),n[e]=t??"";return}const o=n.tagName;if(e==="value"&&o!=="PROGRESS"&&!o.includes("-")){n._value=t;const c=o==="OPTION"?n.getAttribute("value"):n.value,u=t??"";c!==u&&(n.value=u),t==null&&n.removeAttribute(e);return}let l=!1;if(t===""||t==null){const c=typeof n[e];c==="boolean"?t=sp(t):t==null&&c==="string"?(t="",l=!0):c==="number"&&(t=0,l=!0)}try{n[e]=t}catch{}l&&n.removeAttribute(e)}function kv(n,e,t,i){n.addEventListener(e,t,i)}function Uv(n,e,t,i){n.removeEventListener(e,t,i)}const uh=Symbol("_vei");function Bv(n,e,t,i,s=null){const r=n[uh]||(n[uh]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=Vv(e);if(i){const c=r[e]=Wv(i,s);kv(n,o,c,l)}else a&&(Uv(n,o,a,l),r[e]=void 0)}}const hh=/(?:Once|Passive|Capture)$/;function Vv(n){let e;if(hh.test(n)){e={};let i;for(;i=n.match(hh);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):hr(n.slice(2)),e]}let al=0;const zv=Promise.resolve(),Hv=()=>al||(zv.then(()=>al=0),al=Date.now());function Wv(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;In(Gv(i,t.value),e,5,[i])};return t.value=n,t.attached=Hv(),t}function Gv(n,e){if(Fe(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const fh=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,jv=(n,e,t,i,s,r,a,o,l)=>{const c=s==="svg";e==="class"?Rv(n,i,c):e==="style"?Dv(n,t,i):Ao(e)?Uc(e)||Bv(n,e,t,i,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Xv(n,e,i,c))?Fv(n,e,i,r,a,o,l):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Ov(n,e,i,c))};function Xv(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&fh(e)&&Be(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return fh(e)&&wt(t)?!1:e in n}const Yv=Nt({patchProp:jv},Cv);let dh;function qv(){return dh||(dh=av(Yv))}const $v=(...n)=>{const e=qv().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=Qv(i);if(!s)return;const r=e._component;!Be(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.innerHTML="";const a=t(s,!1,Kv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function Kv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Qv(n){return wt(n)?document.querySelector(n):n}const ki=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},Jv={__name:"App",setup(n){return(e,t)=>{const i=C_("router-view");return Wn(),fv(i)}}},Jp=ki(Jv,[["__scopeId","data-v-f80a2ebf"]]);/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Ns=typeof window<"u";function Zv(n){return n.__esModule||n[Symbol.toStringTag]==="Module"}const it=Object.assign;function ol(n,e){const t={};for(const i in e){const s=e[i];t[i]=Nn(s)?s.map(n):n(s)}return t}const zr=()=>{},Nn=Array.isArray,e0=/\/$/,t0=n=>n.replace(e0,"");function ll(n,e,t="/"){let i,s={},r="",a="";const o=e.indexOf("#");let l=e.indexOf("?");return o<l&&o>=0&&(l=-1),l>-1&&(i=e.slice(0,l),r=e.slice(l+1,o>-1?o:e.length),s=n(r)),o>-1&&(i=i||e.slice(0,o),a=e.slice(o,e.length)),i=r0(i??e,t),{fullPath:i+(r&&"?")+r+a,path:i,query:s,hash:a}}function n0(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function ph(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function i0(n,e,t){const i=e.matched.length-1,s=t.matched.length-1;return i>-1&&i===s&&Js(e.matched[i],t.matched[s])&&Zp(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Js(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Zp(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!s0(n[t],e[t]))return!1;return!0}function s0(n,e){return Nn(n)?mh(n,e):Nn(e)?mh(e,n):n===e}function mh(n,e){return Nn(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function r0(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=t.length-1,a,o;for(a=0;a<i.length;a++)if(o=i[a],o!==".")if(o==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+i.slice(a-(a===i.length?1:0)).join("/")}var ea;(function(n){n.pop="pop",n.push="push"})(ea||(ea={}));var Hr;(function(n){n.back="back",n.forward="forward",n.unknown=""})(Hr||(Hr={}));function a0(n){if(!n)if(Ns){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),t0(n)}const o0=/^[^#]+#/;function l0(n,e){return n.replace(o0,"#")+e}function c0(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const zo=()=>({left:window.pageXOffset,top:window.pageYOffset});function u0(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;e=c0(s,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function gh(n,e){return(history.state?history.state.position-e:-1)+n}const cc=new Map;function h0(n,e){cc.set(n,e)}function f0(n){const e=cc.get(n);return cc.delete(n),e}let d0=()=>location.protocol+"//"+location.host;function em(n,e){const{pathname:t,search:i,hash:s}=e,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,l=s.slice(o);return l[0]!=="/"&&(l="/"+l),ph(l,"")}return ph(t,n)+i+s}function p0(n,e,t,i){let s=[],r=[],a=null;const o=({state:f})=>{const p=em(n,location),v=t.value,m=e.value;let d=0;if(f){if(t.value=p,e.value=f,a&&a===v){a=null;return}d=m?f.position-m.position:0}else i(p);s.forEach(g=>{g(t.value,v,{delta:d,type:ea.pop,direction:d?d>0?Hr.forward:Hr.back:Hr.unknown})})};function l(){a=t.value}function c(f){s.push(f);const p=()=>{const v=s.indexOf(f);v>-1&&s.splice(v,1)};return r.push(p),p}function u(){const{history:f}=window;f.state&&f.replaceState(it({},f.state,{scroll:zo()}),"")}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",o),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",o),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:h}}function _h(n,e,t,i=!1,s=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:s?zo():null}}function m0(n){const{history:e,location:t}=window,i={value:em(n,t)},s={value:e.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(t.host&&document.querySelector("base")?n:n.slice(h))+l:d0()+n+l;try{e[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),t[u?"replace":"assign"](f)}}function a(l,c){const u=it({},e.state,_h(s.value.back,l,s.value.forward,!0),c,{position:s.value.position});r(l,u,!0),i.value=l}function o(l,c){const u=it({},s.value,e.state,{forward:l,scroll:zo()});r(u.current,u,!0);const h=it({},_h(i.value,l,null),{position:u.position+1},c);r(l,h,!1),i.value=l}return{location:i,state:s,push:o,replace:a}}function g0(n){n=a0(n);const e=m0(n),t=p0(n,e.state,e.location,e.replace);function i(r,a=!0){a||t.pauseListeners(),history.go(r)}const s=it({location:"",base:n,go:i,createHref:l0.bind(null,n)},e,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function _0(n){return typeof n=="string"||n&&typeof n=="object"}function tm(n){return typeof n=="string"||typeof n=="symbol"}const di={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},nm=Symbol("");var vh;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(vh||(vh={}));function Zs(n,e){return it(new Error,{type:n,[nm]:!0},e)}function $n(n,e){return n instanceof Error&&nm in n&&(e==null||!!(n.type&e))}const xh="[^/]+?",v0={sensitive:!1,strict:!1,start:!0,end:!0},x0=/[.+*?^${}()[\]/\\]/g;function y0(n,e){const t=it({},v0,e),i=[];let s=t.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=40+(t.sensitive?.25:0);if(f.type===0)h||(s+="/"),s+=f.value.replace(x0,"\\$&"),p+=40;else if(f.type===1){const{value:v,repeatable:m,optional:d,regexp:g}=f;r.push({name:v,repeatable:m,optional:d});const b=g||xh;if(b!==xh){p+=10;try{new RegExp(`(${b})`)}catch(y){throw new Error(`Invalid custom RegExp for param "${v}" (${b}): `+y.message)}}let S=m?`((?:${b})(?:/(?:${b}))*)`:`(${b})`;h||(S=d&&c.length<2?`(?:/${S})`:"/"+S),d&&(S+="?"),s+=S,p+=20,d&&(p+=-8),m&&(p+=-20),b===".*"&&(p+=-50)}u.push(p)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(s+="/?"),t.end?s+="$":t.strict&&(s+="(?:/|$)");const a=new RegExp(s,t.sensitive?"":"i");function o(c){const u=c.match(a),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",v=r[f-1];h[v.name]=p&&v.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===0)u+=p.value;else if(p.type===1){const{value:v,repeatable:m,optional:d}=p,g=v in c?c[v]:"";if(Nn(g)&&!m)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const b=Nn(g)?g.join("/"):g;if(!b)if(d)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${v}"`);u+=b}}return u||"/"}return{re:a,score:i,keys:r,parse:o,stringify:l}}function b0(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function M0(n,e){let t=0;const i=n.score,s=e.score;for(;t<i.length&&t<s.length;){const r=b0(i[t],s[t]);if(r)return r;t++}if(Math.abs(s.length-i.length)===1){if(yh(i))return 1;if(yh(s))return-1}return s.length-i.length}function yh(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const S0={type:0,value:""},w0=/[a-zA-Z0-9_]/;function E0(n){if(!n)return[[]];if(n==="/")return[[S0]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(p){throw new Error(`ERR (${t})/"${c}": ${p}`)}let t=0,i=t;const s=[];let r;function a(){r&&s.push(r),r=[]}let o=0,l,c="",u="";function h(){c&&(t===0?r.push({type:0,value:c}):t===1||t===2||t===3?(r.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;o<n.length;){if(l=n[o++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&h(),a()):l===":"?(h(),t=1):f();break;case 4:f(),t=i;break;case 1:l==="("?t=2:w0.test(l)?f():(h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&o--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:h(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&o--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),a(),s}function T0(n,e,t){const i=y0(E0(n.path),t),s=it(i,{record:n,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function A0(n,e){const t=[],i=new Map;e=Sh({strict:!1,end:!0,sensitive:!1},e);function s(u){return i.get(u)}function r(u,h,f){const p=!f,v=C0(u);v.aliasOf=f&&f.record;const m=Sh(e,u),d=[v];if("alias"in u){const S=typeof u.alias=="string"?[u.alias]:u.alias;for(const y of S)d.push(it({},v,{components:f?f.record.components:v.components,path:y,aliasOf:f?f.record:v}))}let g,b;for(const S of d){const{path:y}=S;if(h&&y[0]!=="/"){const w=h.record.path,A=w[w.length-1]==="/"?"":"/";S.path=h.record.path+(y&&A+y)}if(g=T0(S,h,m),f?f.alias.push(g):(b=b||g,b!==g&&b.alias.push(g),p&&u.name&&!Mh(g)&&a(u.name)),v.children){const w=v.children;for(let A=0;A<w.length;A++)r(w[A],g,f&&f.children[A])}f=f||g,(g.record.components&&Object.keys(g.record.components).length||g.record.name||g.record.redirect)&&l(g)}return b?()=>{a(b)}:zr}function a(u){if(tm(u)){const h=i.get(u);h&&(i.delete(u),t.splice(t.indexOf(h),1),h.children.forEach(a),h.alias.forEach(a))}else{const h=t.indexOf(u);h>-1&&(t.splice(h,1),u.record.name&&i.delete(u.record.name),u.children.forEach(a),u.alias.forEach(a))}}function o(){return t}function l(u){let h=0;for(;h<t.length&&M0(u,t[h])>=0&&(u.record.path!==t[h].record.path||!im(u,t[h]));)h++;t.splice(h,0,u),u.record.name&&!Mh(u)&&i.set(u.record.name,u)}function c(u,h){let f,p={},v,m;if("name"in u&&u.name){if(f=i.get(u.name),!f)throw Zs(1,{location:u});m=f.record.name,p=it(bh(h.params,f.keys.filter(b=>!b.optional).map(b=>b.name)),u.params&&bh(u.params,f.keys.map(b=>b.name))),v=f.stringify(p)}else if("path"in u)v=u.path,f=t.find(b=>b.re.test(v)),f&&(p=f.parse(v),m=f.record.name);else{if(f=h.name?i.get(h.name):t.find(b=>b.re.test(h.path)),!f)throw Zs(1,{location:u,currentLocation:h});m=f.record.name,p=it({},h.params,u.params),v=f.stringify(p)}const d=[];let g=f;for(;g;)d.unshift(g.record),g=g.parent;return{name:m,path:v,params:p,matched:d,meta:R0(d)}}return n.forEach(u=>r(u)),{addRoute:r,resolve:c,removeRoute:a,getRoutes:o,getRecordMatcher:s}}function bh(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function C0(n){return{path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:void 0,beforeEnter:n.beforeEnter,props:L0(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}}}function L0(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function Mh(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function R0(n){return n.reduce((e,t)=>it(e,t.meta),{})}function Sh(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function im(n,e){return e.children.some(t=>t===n||im(n,t))}const sm=/#/g,I0=/&/g,P0=/\//g,D0=/=/g,N0=/\?/g,rm=/\+/g,O0=/%5B/g,F0=/%5D/g,am=/%5E/g,k0=/%60/g,om=/%7B/g,U0=/%7C/g,lm=/%7D/g,B0=/%20/g;function tu(n){return encodeURI(""+n).replace(U0,"|").replace(O0,"[").replace(F0,"]")}function V0(n){return tu(n).replace(om,"{").replace(lm,"}").replace(am,"^")}function uc(n){return tu(n).replace(rm,"%2B").replace(B0,"+").replace(sm,"%23").replace(I0,"%26").replace(k0,"`").replace(om,"{").replace(lm,"}").replace(am,"^")}function z0(n){return uc(n).replace(D0,"%3D")}function H0(n){return tu(n).replace(sm,"%23").replace(N0,"%3F")}function W0(n){return n==null?"":H0(n).replace(P0,"%2F")}function Mo(n){try{return decodeURIComponent(""+n)}catch{}return""+n}function G0(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<i.length;++s){const r=i[s].replace(rm," "),a=r.indexOf("="),o=Mo(a<0?r:r.slice(0,a)),l=a<0?null:Mo(r.slice(a+1));if(o in e){let c=e[o];Nn(c)||(c=e[o]=[c]),c.push(l)}else e[o]=l}return e}function wh(n){let e="";for(let t in n){const i=n[t];if(t=z0(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(Nn(i)?i.map(r=>r&&uc(r)):[i&&uc(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function j0(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=Nn(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return e}const X0=Symbol(""),Eh=Symbol(""),nu=Symbol(""),cm=Symbol(""),hc=Symbol("");function wr(){let n=[];function e(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Ci(n,e,t,i,s){const r=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,o)=>{const l=h=>{h===!1?o(Zs(4,{from:t,to:e})):h instanceof Error?o(h):_0(h)?o(Zs(2,{from:e,to:h})):(r&&i.enterCallbacks[s]===r&&typeof h=="function"&&r.push(h),a())},c=n.call(i&&i.instances[s],e,t,l);let u=Promise.resolve(c);n.length<3&&(u=u.then(l)),u.catch(h=>o(h))})}function cl(n,e,t,i){const s=[];for(const r of n)for(const a in r.components){let o=r.components[a];if(!(e!=="beforeRouteEnter"&&!r.instances[a]))if(Y0(o)){const c=(o.__vccOpts||o)[e];c&&s.push(Ci(c,t,i,r,a))}else{let l=o();s.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${r.path}"`));const u=Zv(c)?c.default:c;r.components[a]=u;const f=(u.__vccOpts||u)[e];return f&&Ci(f,t,i,r,a)()}))}}return s}function Y0(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function Th(n){const e=Hn(nu),t=Hn(cm),i=_t(()=>e.resolve(js(n.to))),s=_t(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=t.matched;if(!u||!h.length)return-1;const f=h.findIndex(Js.bind(null,u));if(f>-1)return f;const p=Ah(l[c-2]);return c>1&&Ah(u)===p&&h[h.length-1].path!==p?h.findIndex(Js.bind(null,l[c-2])):f}),r=_t(()=>s.value>-1&&Q0(t.params,i.value.params)),a=_t(()=>s.value>-1&&s.value===t.matched.length-1&&Zp(t.params,i.value.params));function o(l={}){return K0(l)?e[js(n.replace)?"replace":"push"](js(n.to)).catch(zr):Promise.resolve()}return{route:i,href:_t(()=>i.value.href),isActive:r,isExactActive:a,navigate:o}}const q0=pa({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Th,setup(n,{slots:e}){const t=Po(Th(n)),{options:i}=Hn(nu),s=_t(()=>({[Ch(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[Ch(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&e.default(t);return n.custom?r:Vo("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},r)}}}),$0=q0;function K0(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function Q0(n,e){for(const t in e){const i=e[t],s=n[t];if(typeof i=="string"){if(i!==s)return!1}else if(!Nn(s)||s.length!==i.length||i.some((r,a)=>r!==s[a]))return!1}return!0}function Ah(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Ch=(n,e,t)=>n??e??t,J0=pa({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=Hn(hc),s=_t(()=>n.route||i.value),r=Hn(Eh,0),a=_t(()=>{let c=js(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),o=_t(()=>s.value.matched[a.value]);uo(Eh,_t(()=>a.value+1)),uo(X0,o),uo(hc,s);const l=Ri();return rs(()=>[l.value,o.value,n.name],([c,u,h],[f,p,v])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Js(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(m=>m(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=o.value,f=h&&h.components[u];if(!f)return Lh(t.default,{Component:f,route:c});const p=h.props[u],v=p?p===!0?c.params:typeof p=="function"?p(c):p:null,d=Vo(f,it({},v,e,{onVnodeUnmounted:g=>{g.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return Lh(t.default,{Component:d,route:c})||d}}});function Lh(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const Z0=J0;function ex(n){const e=A0(n.routes,n),t=n.parseQuery||G0,i=n.stringifyQuery||wh,s=n.history,r=wr(),a=wr(),o=wr(),l=qc(di);let c=di;Ns&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=ol.bind(null,W=>""+W),h=ol.bind(null,W0),f=ol.bind(null,Mo);function p(W,J){let ie,ee;return tm(W)?(ie=e.getRecordMatcher(W),ee=J):ee=W,e.addRoute(ee,ie)}function v(W){const J=e.getRecordMatcher(W);J&&e.removeRoute(J)}function m(){return e.getRoutes().map(W=>W.record)}function d(W){return!!e.getRecordMatcher(W)}function g(W,J){if(J=it({},J||l.value),typeof W=="string"){const x=ll(t,W,J.path),C=e.resolve({path:x.path},J),N=s.createHref(x.fullPath);return it(x,C,{params:f(C.params),hash:Mo(x.hash),redirectedFrom:void 0,href:N})}let ie;if("path"in W)ie=it({},W,{path:ll(t,W.path,J.path).path});else{const x=it({},W.params);for(const C in x)x[C]==null&&delete x[C];ie=it({},W,{params:h(x)}),J.params=h(J.params)}const ee=e.resolve(ie,J),Ee=W.hash||"";ee.params=u(f(ee.params));const Me=n0(i,it({},W,{hash:V0(Ee),path:ee.path})),_=s.createHref(Me);return it({fullPath:Me,hash:Ee,query:i===wh?j0(W.query):W.query||{}},ee,{redirectedFrom:void 0,href:_})}function b(W){return typeof W=="string"?ll(t,W,l.value.path):it({},W)}function S(W,J){if(c!==W)return Zs(8,{from:J,to:W})}function y(W){return P(W)}function w(W){return y(it(b(W),{replace:!0}))}function A(W){const J=W.matched[W.matched.length-1];if(J&&J.redirect){const{redirect:ie}=J;let ee=typeof ie=="function"?ie(W):ie;return typeof ee=="string"&&(ee=ee.includes("?")||ee.includes("#")?ee=b(ee):{path:ee},ee.params={}),it({query:W.query,hash:W.hash,params:"path"in ee?{}:W.params},ee)}}function P(W,J){const ie=c=g(W),ee=l.value,Ee=W.state,Me=W.force,_=W.replace===!0,x=A(ie);if(x)return P(it(b(x),{state:typeof x=="object"?it({},Ee,x.state):Ee,force:Me,replace:_}),J||ie);const C=ie;C.redirectedFrom=J;let N;return!Me&&i0(i,ee,ie)&&(N=Zs(16,{to:C,from:ee}),X(ee,ee,!0,!1)),(N?Promise.resolve(N):O(C,ee)).catch(B=>$n(B)?$n(B,2)?B:ce(B):G(B,C,ee)).then(B=>{if(B){if($n(B,2))return P(it({replace:_},b(B.to),{state:typeof B.to=="object"?it({},Ee,B.to.state):Ee,force:Me}),J||C)}else B=ue(C,ee,!0,_,Ee);return Q(C,ee,B),B})}function M(W,J){const ie=S(W,J);return ie?Promise.reject(ie):Promise.resolve()}function I(W){const J=me.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(W):W()}function O(W,J){let ie;const[ee,Ee,Me]=tx(W,J);ie=cl(ee.reverse(),"beforeRouteLeave",W,J);for(const x of ee)x.leaveGuards.forEach(C=>{ie.push(Ci(C,W,J))});const _=M.bind(null,W,J);return ie.push(_),q(ie).then(()=>{ie=[];for(const x of r.list())ie.push(Ci(x,W,J));return ie.push(_),q(ie)}).then(()=>{ie=cl(Ee,"beforeRouteUpdate",W,J);for(const x of Ee)x.updateGuards.forEach(C=>{ie.push(Ci(C,W,J))});return ie.push(_),q(ie)}).then(()=>{ie=[];for(const x of Me)if(x.beforeEnter)if(Nn(x.beforeEnter))for(const C of x.beforeEnter)ie.push(Ci(C,W,J));else ie.push(Ci(x.beforeEnter,W,J));return ie.push(_),q(ie)}).then(()=>(W.matched.forEach(x=>x.enterCallbacks={}),ie=cl(Me,"beforeRouteEnter",W,J),ie.push(_),q(ie))).then(()=>{ie=[];for(const x of a.list())ie.push(Ci(x,W,J));return ie.push(_),q(ie)}).catch(x=>$n(x,8)?x:Promise.reject(x))}function Q(W,J,ie){o.list().forEach(ee=>I(()=>ee(W,J,ie)))}function ue(W,J,ie,ee,Ee){const Me=S(W,J);if(Me)return Me;const _=J===di,x=Ns?history.state:{};ie&&(ee||_?s.replace(W.fullPath,it({scroll:_&&x&&x.scroll},Ee)):s.push(W.fullPath,Ee)),l.value=W,X(W,J,ie,_),ce()}let H;function V(){H||(H=s.listen((W,J,ie)=>{if(!xe.listening)return;const ee=g(W),Ee=A(ee);if(Ee){P(it(Ee,{replace:!0}),ee).catch(zr);return}c=ee;const Me=l.value;Ns&&h0(gh(Me.fullPath,ie.delta),zo()),O(ee,Me).catch(_=>$n(_,12)?_:$n(_,2)?(P(_.to,ee).then(x=>{$n(x,20)&&!ie.delta&&ie.type===ea.pop&&s.go(-1,!1)}).catch(zr),Promise.reject()):(ie.delta&&s.go(-ie.delta,!1),G(_,ee,Me))).then(_=>{_=_||ue(ee,Me,!1),_&&(ie.delta&&!$n(_,8)?s.go(-ie.delta,!1):ie.type===ea.pop&&$n(_,20)&&s.go(-1,!1)),Q(ee,Me,_)}).catch(zr)}))}let te=wr(),re=wr(),ne;function G(W,J,ie){ce(W);const ee=re.list();return ee.length?ee.forEach(Ee=>Ee(W,J,ie)):console.error(W),Promise.reject(W)}function pe(){return ne&&l.value!==di?Promise.resolve():new Promise((W,J)=>{te.add([W,J])})}function ce(W){return ne||(ne=!W,V(),te.list().forEach(([J,ie])=>W?ie(W):J()),te.reset()),W}function X(W,J,ie,ee){const{scrollBehavior:Ee}=n;if(!Ns||!Ee)return Promise.resolve();const Me=!ie&&f0(gh(W.fullPath,0))||(ee||!ie)&&history.state&&history.state.scroll||null;return Ap().then(()=>Ee(W,J,Me)).then(_=>_&&u0(_)).catch(_=>G(_,W,J))}const Y=W=>s.go(W);let fe;const me=new Set,xe={currentRoute:l,listening:!0,addRoute:p,removeRoute:v,hasRoute:d,getRoutes:m,resolve:g,options:n,push:y,replace:w,go:Y,back:()=>Y(-1),forward:()=>Y(1),beforeEach:r.add,beforeResolve:a.add,afterEach:o.add,onError:re.add,isReady:pe,install(W){const J=this;W.component("RouterLink",$0),W.component("RouterView",Z0),W.config.globalProperties.$router=J,Object.defineProperty(W.config.globalProperties,"$route",{enumerable:!0,get:()=>js(l)}),Ns&&!fe&&l.value===di&&(fe=!0,y(s.location).catch(Ee=>{}));const ie={};for(const Ee in di)Object.defineProperty(ie,Ee,{get:()=>l.value[Ee],enumerable:!0});W.provide(nu,J),W.provide(cm,vp(ie)),W.provide(hc,l);const ee=W.unmount;me.add(W),W.unmount=function(){me.delete(W),me.size<1&&(c=di,H&&H(),H=null,l.value=di,fe=!1,ne=!1),ee()}}};function q(W){return W.reduce((J,ie)=>J.then(()=>I(ie)),Promise.resolve())}return xe}function tx(n,e){const t=[],i=[],s=[],r=Math.max(e.matched.length,n.matched.length);for(let a=0;a<r;a++){const o=e.matched[a];o&&(n.matched.find(c=>Js(c,o))?i.push(o):t.push(o));const l=n.matched[a];l&&(e.matched.find(c=>Js(c,l))||s.push(l))}return[t,i,s]}const um="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAMaklEQVR4nO3dW3IjNxJAUWii978RL1LzYcuWKD6qWHhkIs+JmPD8uFUEgcsEu21/fH5+NoAM/rTW2l9//bX6Ocjjs7X28c9fr/jo8CwU82f1AxDK0Qj1GMvP/hoCh2AVlPU7gGfPLWZFCNbessbprHuvU8Q2JFj7qBKno27XQ8A2IFi5idRxArYBwcpFoPoRsIQEKz6RmuP7OotXUIIVk0itJV5BCVYcIhWTeAUiWOsJVR5f75VwLSJYa4hUbqauRQRrLqHaj6lrIsGaQ6j2J1wTCNY4IlWTcA0kWP0JFa0J1xCC1Y9QcY8v6Dv63+oH2MBnEyuOsU8uMmG9z+bjHa6KF5iw3iNWXGUyf4MJ6xwbjN5MXCcI1jFCxWjCdYAr4WtixUz22xMmrMdsHFYxbT1gwvrNl6FEYR/eEKyfbBCi8QH6jWD9zaYgOvuzCVZrNgJ5lP9grR6s0m8+aZXdt1V/l7DsG842Sv5OYsUJS6zYSan9XC1Ypd5cyiizr6sEq/yXlWyvxP6uEKwSbyS0Ah/Muwdr6zcPHth23+8crG3fNDhgy/2/Y7C2H4vhoO3OwW7B2u4Ngou2OhM7BWurNwY62uZs7BKsbd4QGGSLr0p2CFb6NwEmSn1esgcr9eLDImnPTeZgpV10CCDl+ckarJSLDcGkO0cZg5VukSGwVOcpW7BSLS4kkeZcZQpWmkWFhFKcryzBSrGYkFz4c5YhWOEXETYS+rxFD1boxQPmihwssYI1wp69qMEKu2BQRMgzGDVYwHrhohUxWOEWCQoLdR6jBSvU4gCttUDnMlKwwiwK8EuI8xklWCEWA4gtQrDECnJYflYjBAvIY2m0VgdrebGB05ad25XBEivIa8n5XRUssQJOW30lBPKaPnisCJbpCvYx9TzPDpZYAW9zJQSumjaIzAyW6Qr2NeV8zwqWWAGXuRICvQwfTGYEy3QFdQw976ODJVZAN66EQG/DBpWRwTJdQV1Dzr8JC0hjVLBMV0D3DowIllgBQ7gSAiN1HWB6B8t0BQxjwgJG6zbI9AyW6Qp4pEsfTFhAGr2CZboCXrncieoT1sfqBwCO+9Ph18g6XX3c/BUyynb+PtuFM1d5wvps+d5s+K7c/r0arB0WbIfXQC3ZP2zffvbKE9Z3md98aim9V68Ea7eFy/6pxf7K708T1m/lNwUh7bYv33o97wZrt8W7tfvrIw+T/zcmrMdsElbbfQ+efn2C9ZxPN1ax7+54J1gVF7Lia2aNah+Sp16rCeu4SpuINeyxF84Gq/qCVvv0Yx776gAT1ntsLnrxIXji9QvW+6pvMq6zh046EyyL+5tPR95l3/x0aD1MWH3YfBzlQ+6Co8GywK9ZI16xRy4yYfVlQ/KIvfHayzUSrP6M/NyyHzo5EqwdF/ujjf9XI++4bpwz+sNrxj4OpfqEJVqMMvq93zVUT9eterBamxMt4apFrAZ5FawqB80VkR5mfDiVjVVrJqxbosW7ZoSqSqwerqVg/eaKyFmmqkkE6z5XRI5wBZzsWbAcKNHiMVfABUxYr4kWt0xV491dY8E6xvdatOYKuJxgHed7rdpmvDdi9cKjYDk4j4lWPb6vCsKE9R5XxDpcAdf5tfaC9T5XxL35viogwbpOtPbjChjUvWA5IOe5Iu7DVBWYCasfV8TcXAFj+vGeCFZ/opWPK2ASgjWGaOVhqkrkNlgOQj++14rNFTAhE9ZYvteKyRUwKcGaQ7TiMFXl8+97JljzuCKu5Qq4AcGayxVxDf/g8iYEaw3Rmsf3VRsRrHVcEcdzBdzM92BV39wruCKO4fuqTZmwYhCtflwBNyZYcbgiXmeq2tdna4IVzYwDsWO0XAGLEKx4fK91jitgIYIVl2i9ZqoqRrBi873Wfa6ARQlWfK6IP/lT64V9BSvThq1KtHxfVZ4JK5fKV0RXQAQroWpXRN9X8S/ByqtCtFwB+UGwctv5imiq4hfBym+3K6IrII98ChZHzYiWP7LAU4K1h1kT0MjpZ4fXwGCCld+Kw9fzZ64KiGglJFi5rTx0PX726mis/vmcJFh5RThsV54hwvO3Fuc5OECwcop0yM5e6SJ+hxTteXhAsPKJeriOPFfUZ28t9rPxD8HKJfqhevZ80Z+9tRzPWJpg5ZHlMN278mV59tZyPWs5gpXDiEM06x/ryRiAjM9cgmDFNzJWmf/U98fN/3oTrYAEK7YZk1XGaN17ZtEqQLDimnkNzBStZ88qWpsTrJhWfGcV/d8NdfT5RGtjghXP6i/YI0br7DOJ1qYEK5bVsbry94zy7rOI1n4+BCuOKLH6/veuDFePny9amxGsGKLFasSvs+pnitZGBGu9yLEa9etF+Vkk82f1AxSXIVa3v+6o6WJkqEY8+9evJbATfU1YFn2+TLEa/TMy7z/Xw4lcCdfIGqsRP2v2c/tOKzHBmi97rL7/zIi/i7fq54rWBII11y6xuvrzV/+Ria9n6E20BhOseXaM1Zesf5JetJIRrDl2jtWXVf+c31WilYhgjVchVl8eXfUiXAGfEa0kBGusSrH67uPB/49MtGL7aE2wRqoaqy/Rp6p7RCu478HKtrkiqx6rzEQrMBNWf2KVn2gFJVh9idU+RCsgwepHrPYjWsEIVh9itS/RCkSwrhOr/YnWWv+u/22wHJRzxKoO0QrAhPU+sapHtBYTrPeIVV2itZBgnSdWiNYignWOWPFFtOb4sc73guUA3SdW3BKtyUxYx4gVj4jWRIL1mljximhNIljPiRVHiVZ/v9b0UbAcKrHiPNEazIR1n1jxLtEaSLB+EyuuEq1BBOsnsaIX0brm7vo9C1a1gyZW9CZanZmw/iZWjCJaHQmWWDGeaJ3zcL1eBWv3gydWzGJfdPBn9QMsMurTyabkmY/Wd+/tPGXd5UrYj1hxhH1ywZFgWeDXrBFn2C+PPV0bE9Z1Nh/vsG/eIFjX2HRcYf+cdDRYFvY3a0IP9tF/Xq6FCes9Nhk92U8HCdZ5NhcjVN9Xh17/mWBVX9DWrAFj2V8vmLCOs5mYwT57QrCOsYmYqdp+O/x6zwar2kK2VvM1s559d4cJ6zmbhpXsvxvvBKvKIlZ5ncS2+z489fpMWPftvknIxX78x7vB2nkBd35t5LXjvjz9mkxYP+24KdhH+f0pWP8pvxlIYZd9+tbruBKsXRautb1eC/sru19NWIXffFLLvG/ffvarwcq+aJmfH8rtXxMWMNOlyPb4r+b0/i+BzJLxmaE0ExYwy+UrbK9glbtLA/OZsIAZugw1PYNlygKGMmEBo3UbZnoHy5QFDDNiwhIt4EvXHrgSAmmMCpYpC+jeARMWMMKQoWVksExZQFejJyzRgnqGnXtXQiCNGcEyZUEdQ8/7rAlLtGB/w8+5KyGQxsxgmbJgX1PO9+wJS7RgP9POtSshkMaKYJmyYB9Tz/OqCUu0IL/p59iVEHjHkqFjZbBMWcApqycs0YJ8lp3b1cFqTbQgk6XnNUKwWhMtyGD5OY0SLCC25bFqLVawQiwIEFekYLUmWhBRmHMZLVitBVocINZ5jBis1oItEhQV7hxGDVZrARcLCgl5/iIHC1gjZKxaix+ssAsHmwp95qIHq7XgCwgbCX/WMgSrtQQLCcmlOGNZgtVakgUFxskUrNZEC0ZIc66yBau1RIsLCaQ6TxmD1VqyRYaAPlrCc5Q1WK0lXGwIIu3ZyRys1hIvPCyS+sxkD1Zryd8AmCj9WdkhWK0lvY/DRFucj12C9WWLNwU62+Zc7Bas1jZ6c6CDrc7DjsFqbbM3Cd603TnYNVitbfhmwUHbfqe7c7Ba2/RNgye23vO7B6u1jT9t4Mb2+7xCsL5s/2ZSWon9XSlYrRV5Uyml1A2iWrBaK/YGs7Vy+7hisL6Ue7PZSsn9WzlYrRV900mt9A2herBaK74BSKX8PhWs/5TfDITlQ/UfgvWTjUE09uM3gnWfTcJqPjzvEKzHbBhWse8e+LP6ARL42jyfS5+CCoTqBRPWcTYTo5jmDxKsc2wserOfTnAlfI9rIlcJ1RsE6xrh4iyhukCw+hAuXhGqDgSrL+HillB1JFhjCBdCNYBgjSVc9QjVQII1h3DtTaQmEay5vm9s8cpPqCYTrHVMXXkJ1SKCtZ6pKweRCkCwYhGvWEQqGMGKS7zWEKnABCsH8RpHoBIRrHxuD5iAnSdSSQlWfgL2mkBtQrD2Uz1g4rQxwdrfowO8Q8jEqRjBquvZYY8UM1HiXx+fn5H2JsBj/we00fe9kLckkQAAAABJRU5ErkJggg==",hm="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAL7UlEQVR4nO3dWZbbOBIFUKRP738htcnsD5fKSlkDRRFEDPd++rjKIhDxGND49c8//wy48b36Afzra/UDIJb/rX4ALBElkF559TgFWjMCq74s4bTHvWsTYoUJrHoqB9QWQqwwgZVb93Da6nadBFhSAisfIfW56zUUXokIrByE1DzCKxGBFZeQOp+jY3ACKxYhFYvpKxiBtZ6QyuGyT4JrIYG1hpDKy9S1kMA6l6CqxdR1MoF1DkFVm+A6icCaS1D14rg4mcCaQ1Bh6ppAYB1LUHFLcB1IYB1DUPGK4DrAr9UPILnvIax4j3r5gAlrH0XHJ0xbOwms9wgqjiS43iSwthFUzCS4NvIc1mvCirOotRdMWI8pHlYwbT1hwrpPWLGaV6DvEFg/KRKiUY9XBNYfCoOo3Ej/JbAUA3m0r9PugdW+AEindc12fZWw9aaTXttXEjtOWMKKKtrVcrfAarfBlNfqOdgugdVqU2mpRX13CKwWGwmjQa1XD6zyGwg3Std85cAqvXHwRNnar/i2hrKbBW8o+daHahOWsIKfSvVEpcAqtTFwoDK9USWwymwITFKiRyoEVomNgBOk75XsgZV+A+BkqXsmc2ClXnhYKG3vZA2stAsOQaTsoYyBlXKhIaB0vZQtsNItMASXqqcyBVaqhYVE0vRWlsBKs6CQVIoeyxBYKRYSCgjfa9EDK/wCQjGhey5yYIVeOCgsbO9FDaywCwZNhOzBiIEVcqGgoXC9GC2wwi0QNBeqJ6MFFsBDkQIrVJID/wnTm1ECK8yCAHeF6NEIgRViIYCXlvfq6sBavgDAW5b27OrAAthsZWCZriCnZb27KrCEFeS2pIdXBJawghpO7+WKP1U/w+3PfQtdjnDvZ+TV1hNnB1bGzbhXVPf+bIyc18c5HtXMvb+XqY6+x/Zr+9iZgZVpEy7e3QiTGBenNXEAp4WWtzXM9TV6FW53X+OYPc9YM6fcnM+asLpPGtcF2H0tKsoYMCmdMWFlbdBZRWjqquGoaerZ/z+b6b3uSLiO4MrJvj03NbRmHwmzTldnuhS/tYpNSAUwc8LK3IAritOdOyb78r5pve9IGI8GiWP1Pqz+98OZFViZp6soBNc61v5zUzLAR3Pii/Qc18wmrn59HR3+htIZgRWh8Cqa/ZGN1c265d+vfP1scHRgVQiryIV7xLQV+fpemfEZzszrkcGhU5YjYU5bp60uzbjnWw+yrE22D0NPdWRgWdRz3Zu2sjThGZ59EN06neuwKcuElZ/m28Y6rXVIaB31tgbTFTCdN44CZ/l4sDkisExXwClMWMCZPhpwPg0s0xVwGhMWcLbdg84ngWW6Ak5lwgLS2BtYpivgE7syxIQFpLEnsExXwBHezhITFpDGu4FlugKO9FammLCANN4JLNMVnK9D322+RhPW3zoUCKQksIA0tgaWqQOYaVPGmLCANATWfSZKIuhWhy+vd0tgdVs0ICgTFpCGwHrMZMlKXevv6XW/CqyuiwYE5IdU7/Ojm6x275e923MkBKJ5GNLPAqtrspuuiEQ9XjFh/aQ4iEhd/ktg/aEoiEx9jseB1fU4CMRwN4NMWL+5e5FB+zoVWIqAXFrX673AchwEIvgri7pPWK3vVqTVtm47B1bbTYesOgcWZNbyhnsbWF2ev2q52ZTToY5/ZJIJC0ijY2B1uCtBSR0DCyppdQMWWEB0/z2P9eveHxbW6m5EG23q2oQFpCGwgDQ6BVabsZmWWtR3p8ACkhNYQAbfY/wJrOqvELYYl2mvfJ2bsIA0BBaQhsAC0ugQWOXP9dBFh8CCTkrfoAUWkMX3r1H/LQ1AESYsIA2BBaQhsIA0BBaQhsAC0qgeWKXfkwLdVA8soBCBBaQhsIA0BBaQhsAC0hBYQBoCC0ijemD5JgoopHpgAYUILCANgQWkIbCANAQWkIbAAtIQWEAaAgtIQ2ABaQgsIA2BBbWU/jhah8AqvYHQSYfAAooQWEAaAgtIQ2ABaQgsqKP8C0xdAqv8RkIHXQILKODXGONr9YMA2MKEBWTx1SmwPI9FZS3qu1NgAckJLCCNboHVYmymnTZ13S2wgMQEFpDGJbA6vRerzfhMC13q+WsMExaQiMAC0ugaWF3GaGprV8ddAwtI6DqwOj3xPkbDuxOltKxfExYQ3X/DVPfAanmXIr22dds9sIBEBFbjuxUpta7X28Dq9sQ7ENuPTDJh/db6rkUa7etUYP3RvhgITX0OgQUkci+wOj+P5S5GRF3r8q8sMmH9rWtxEJN6vCKwIC5hdeNRYHU+Fo6hUCAkE9ZjQouVutff3aFJYD3XvWhYQ9098Cywuh8LLxQPZ1JvT5iwtlFEnEGd/fZwWBJY2ykmZlJfG7wKLMfCnxQVM6irjUxY71NcHOV7qKdbT4ckgbWPQuNT6meHLYHlWPiYomMPdbOTCetzio+tTObPvRyOBNYxFCKvqI8DbA0sx8JtBBe31MQ2mzLGhDWHAkVQTSCw5lGwfdn3Sf73xt/9GjZij8uaOVbXpjf229wb7wQWn7kuaOFVh6A60buBtXrKetXoWYrH1JVfllqL7q0eyDJhbb2o67+XoaBMXblkqKnS9gTW2VPW3ka+/HdZikx4xZOldtrIMGF9j88aOFtwjfH3YxVg58lUJ9m9Xdd7A2v1c1l7ZAyuCwE2T8Z6aCvDhDXG51PWtYxhe+ve4xdiz2Xf82p21esngXV24wut57ZeT8Vgq7aXPJDtne5Hvnu8YuNCBrt7L1tgXQitfapeb9Xr4sangbWyUI6atjoU+9eof53Vr6+Kj/Yp64R1TWhxYR+LOyKwIhSJ0Hqs6nU90u16M/l4b46asCIUidD6W7Xr2arrdZdX4Uh4zcvbENMhN5EjAyvKXe3T0IpyHZ+qch17db/+SA7bi2oT1kX30Mr++OGuowMrUqM4HhKpHrs6dA+qTlhHUOwQzIzAitToHY+GGR/zTNZjncPXftaEFalIHA2hCEfC1yKFL2QxpW9mBlakRu9yNMzyOM9mXc41bb07TVhdQgvKmh1Y1Zq82vXA0ab2yBkTVqQm93lDmGd6b3Q6Eh4pYmhFfExwqLMCK1Iz+bbSnuzXXKes75kTVsWC6fBNnvDKaT1w9pEwSnMf/WbSlcElNGkjy+8SZnHmj7UKKSI4tQ5XBFaU3wQ88ncOb80ILgFFNKfX5KoJK0pozXZvQ7dct3AiuiU1uvJIGCG0Zk5Zjwgj2Mn7sIB3Lbvprg6sCNPG6ikPMlnas6sDa4wYoQW8trxXIwTWGOsXwpQFz63u0TFGnMAaI8iCAHFFCqzVTFlwX5hhIlpgrV4YoQU/re7JH6IF1hjrF0howW+re/EvEQNrjPULJbTobnUP3hU1sMZYv2BCi65W995DkQNrjPUL9z0EF72s7rmnogfWGDEWUGjRQYReeypDYI0RYyFNW1QWocdeyhJYY8RZUMFFNVF666VMgTVGrIX9HnHCK8JjIKdIPfVSxq9IjvA9WrduH8/MIoh27XCajIE1RszQunb2Y0t1lySElDWT7Uh4LeWCQwBpeydzYI2ReOFhkdQ9kz2wxki+AXCi9L1SIbDGKLARMFmJHqkSWGMU2RCYoExvVAqsMQptDBykVE9UC6wxfm9QqU2Cncr1QcXAuii3WfCGkvVfObDGKLpp8ETpE0b1wBqj8ObBjfK13iGwxih+14HRpL67BNZFi02llVY3426BNUajzaW8drXcMbDGaHZXoqSW9ds1sC5abjqptb7Zdg+sMRpvPum0r9WsX+B3tEshRP5SQPpqH1QXJqyfFAbRqMkrJqy/mbaIQFDdYcJ6rPWTmyyl7h4QWK8pHs7iJvmCI+E2jonMJKQ2MmG9xx2Qo6mnNwisfaIVmckvHze/HRwJ93NMZA8h9QGB9TnBxRaC6gAC6ziCi3sE1YEE1vFWBJemiMeeTCCw5rkuWFNXH4JqIq8SnsMrQjHM3AN7fAIT1rlmHBc1yTrW/mQCaw3HxXW+xudrLqgWEVjr7Q0vTbPfntCy3gEIrFi2Hhk1z+e2hJZ1Dubr+9uJBMjBq4RAGgILSENgAWkILCANgQWkIbCANP4PzGR64hA9Nb8AAAAASUVORK5CYII=",fm="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAANWklEQVR4nO3d25LbRgyEYciV938Qv+TmItEuxSUlHuaAbvzfTVIVx6ZmgCaG1kqPv3//BnDR1///fCz+fctj9WuBS/6ZfQFI6V34XPn1Xzv//gnhhhcEVk1nA2mWT9dJoBVDYPlTCacrtl4bIWaMwPLjHFBHrF8/AWaEwNJWPZyOYAozQmDpIaTuW64h4SWEwMqPgOqLI6QQAisvgmoOpq/ECKxcCKlceLNrMgTWfIRUfkxdSRBYcxBSugiviQissQgqLxwZByOwxiCovBFcgxBYfRFUtRBcnRFY7RFS4DlXJ39mX4AZwgpr1ERDTFhtUJR4h4mrEQLrOkIKV3wFoXUZR8JrCCvc8RXU0CVMWOdQZGiJv1U8icA6hqBCTwTXQRwJPyOsMAq19gET1j6KBzMwbb3BhLWNsMJs1OAGJqxXFAkyYdpaIbD+Q1AhM4LrfxwJCSvoKF+r1QOrfAFATumarXokLL3pkFf2iFhxwiKs4KJcLVcLrHIbDHularrKkbDUpqKcMkfEChMWYYUq7GvdPbDsNxBYsa5558Cy3jjgDdvad3yGZbtZwAmWz7XcJizCCnhl1RNOgWW1MUBDNr3hElg2GwJ0YtEjDoFlsRHAAPK9oh5Y8hsADCbdM8qBJb3wwESyvaMaWLILDiQh2UOKgSW50EBCcr2kFlhyCwwkJ9VTSoEltbCAEJneUgksmQUFREn0mEJgSSwkYCB9r2UPrPQLCJhJ3XOZAyv1wgHG0vZe1sBKu2BAESl7MGNgpVwooKB0vZgxsABgU7bASpfoQHGpejJTYKVaGADf0vRmlsBKsyAANqXo0SyBBSC/6aGVIbCmLwIADbMDi7ACtEzt2ZnfS0hYvbL6/jhD1OuPr5hUr7MCq/rmE056tvasch1PCS3Hb37OipDys9zTyuE1zIzAqrSxhFQdFcNr+JQ1+qF7lY18BGFVWaX9H9rTIwOrQlhVKlR8VqUehvX27Lc1OKlQmLiG2mhkVGA5T1dV7qK4x71OhvQ4E9Y9zgWIPqiZG0YEluN05X63RF+u9dO913sHlmtYAS041lLXnudIeI5jgWEuauqEnoHlNl1RWOjFrba69X6vwCKsgHPcaqxLBnAk/MytkJAXtfZBj8Bymq4oIIzmVHPNs4AJa59T4UALtbejdWC5TFcUDGZzqcGmmdAysAgroC2XWmyWDRwJAcjgE0dfZbqjuUysijLVwSOohW+tAsthQWcWqcP6Odnbj1k14hBaTT6dtMWRUH0hZ/oK1k8J+3XP7bXjGdZ/Rt85KXxtM/Yv0zF1mruBRdOdQ1B5YT/Pu7VeTFjj7lwUtq9Re1t+yiKwxiCs/LHHA9wJLIcN6n3H4shQy4j9dpiyLq8RE1Y/BFVd7H0nVwPLYUMc7lSoyaF2L2UIE1YfDoGOe6iBDq68052NeI/10bU3uVzd0ybv7jZ2en2qTlgUEZY+fe1Wxq/lynY9Q5wNLKaH91gfLWeD6EpwURPvnVqfqhNWDxSmljsTCqE1CYGFilocp0oeyWY7E1gudwkKrTan/Xd5LYezhQmrDZcwxzlnAoMaaYDAQiU9JhKXKUfC0cDi7gCgp0MZw4R1H2GOo6iVmwgsADKOBJbTXYHnDXDjVNMfs4YJCz1k/FEWGPj0w89O0xXaORpGn34d9YW1tz8QzRep4ohe09L69yXA8BaBhT0zjnTLP5Pwwi8EFpYyPXfqEV49Pp+KYB3o3UN3NqKO7A/Js18f2trNHv6WsDa1IGhxvS1vxNzUByOw6lIKqrUMoUVYTbAXWGyGL7Wpas/d13GnxumP/jbXmAmrFoegWhsZWnwx7mT8LWENjkG19Hx9V8Jk+f+0/tYcNEZg+XMPq6VHcNSzxpHQW6Wweqr4msvYCizuMh4qN27l1+7kVxYxYXmiYVkDSwSWHxr1B2thhsDyQoP+xpoYWQcWz6900Zj7WBtdL5nEhOWBhvyMNTJAYOmjEY9jrcQRWABk8E53bVkmhqPPPjNc7913w2OiZWCxiVpmNv/VWln/f7NeA6Gl5fuTYpmwcEbrJn/+fhkmLwjgGZam0Q3e+2NVZnxsCyEpiAkL74wOESYuvMWEpWdUM898xjPqzyYYxRBY2JLhgXSGa0AyBJaWERNBpqAYcS1MWUIILCxlCqunjNeE8b4ifgKLosiv9ySQuQZ6XxtTlggmLETkDqsnhWtEZwQWlIJA6VrRAYGlgSNLf6yxAAKrNsWJRfGa0QiBVZdy4ytfO24gsPLjqDIOa50cgVWTw4Ti8BpwEoEFQAaBBUDGn2C0BqDhiwkrtx4PgZ1uUD1eCw/eEyOwAMj4E9xRAGh48AwLgAqeYQHQQWABkEFgAZBBYAGQQWABkMHbGgDI4G0NAFQ8OBICUMH7sADo4BlWbvxw73v8cHgtHAkB6CCwAMggsGpyOBY6vAacRGABP3h+lRyBlV+vJlKeUJSvHTcQWABkEFi1KU4qiteMRggsDTxb6Y81FkBgQWliUbpWdPAMLAohv54TgML+97xGpisRTFh4yhxama8NYzwiCCy8yhgMGa8JkxBYWkYcXTIFxIhr4TgohMDClgyhleEakAyBpWfURDAzMEb92UxXYv6ZfQFI7RkcFUISApiwNI2eDB7RN0x6//5bmK4ELSesR7CJSr5ifJMv/7y7tTJzmqLOtXzXCkdCXLUXOOsw4JiHZggsbTOmrE+yXc8a05UwnmHpowGPY63EEVgAZKwDK/s4j21MDp+xRppeMokJywcNuY+1MUFgeaExf2NNjBBYfmjQH6yFma3A4jmWPhqVNXDwK4uYsHxVbtjKr90ageWtYuNWfM1l8E53f88Gdj/qE1QFMGHV4dzQzq8NC3uB5X43rsqxsR1fE3YyiCNhPS5HRIKqIAKrLtXgIqgKe/cMS62QcY1KAHyFzrXint3sYcJCxGsQZLtREVL4RmBhLctRkaDCLwQW9syYuggpvPUpsPhiCkT0+5x2agtrb2uLCQtXEDSY4sg73Wc/y2iJRoMbp5r+mDXVfjTHKXyBiGI1XS2wnO5GQESxmj4aWKVS/CTWBkdRK/sOrU21CQuAMAILgIwzgcU4u4+1wSfUyL7Da1Nxwir1kBLWytVyxcDqhTso9lAbjZwNLBYeQEunMoUJqy0CHWvURENXAsthA8qd/WHHoYZPZwkTVnsOgY42qIXGrgaWw0b0vEM5rA/u6VkDJaerCCasngitutj7Tu4EFpvyGWtUD3v+2eU1qj5hjRitKeA6Ruy1w3HwsuqBNQqh5Y89HuBuYDls0qg7lsNaYRtf0nHcrbXiM93Hem6WQ+GBm9BwLY6EDps2OkAe4bFuVc3YP4eb3O01Y8Kaa7mBDgXpjBtMAq0Cy+H7C79iblHSENij3lsRjeq75d8SOjScQ2HAi0NNNssG3tbwm0OBwAO1uNI6sBymLADtNM0EJqxt3NkwGzW4oUdguUxZFAxmcam95lnAhPWeS+FABzX3Rq/AcpmyIiggjONUa10yoOeERWgBxznVWLfe50h4nFNBIRdq66DegeU0ZUVQWGjPraa69vyICcsxtNyKDHO41VH3XudIeJ1bsWEcbnoXjQostynriaLDWa41M6TH+XiZ+54F6BrKaMM1qIYaeSR0b2gKEnvca2NYb49+hlUhtNyLE8dVqIehPT3jSOjwYX+fLF+fe0jjlXttLw2vbZ5h9Ud4+asUUlPNCqwKU9YWwstHxfpdmlK/MyesqqH1tH7tBFhulWt1bVqtzj4SVg+tJdYBCqbeWDO8053JAsAhGQILgIbpw0WWwJq+EADeStGjWQIrIsmCAPglTW9mCqyIRAsDICKS9WS2wAKAXRkDK1WiA4Wl68WMgRWRcKGAYlL2YNbAiki6YEABaXsvc2BFJF44wFTqnsseWBHJFxAwkr7XFAIrQmAhAXESPaYSWBEiCwoIkuktpcCKEFpYQIRUT6kFVoTYAgOJyfWSYmBFCC40kIxkD6kGVoToggMJyPaOcmBFCC88MIl0z6gHVoT4BgADyfeKQ2BFGGwE0JlFj7gEVoTJhgAd2PSGU2BFGG0M0IhVT8z+mq8enhvE12ahMqugenKbsJYsNww4wLb2nQMrwnjjgB3WNe8eWBHmGwgs2Ne64zOsLTzXgjP7oHqqMGEtldlYlFGqpqsFVkSxDYa1crVc5Ui4xhERysoF1VPFCWup7MZDVumarR5YEcULAFLK12rVI+EaR0RkVj6ongisVwQXMiGoVjgSbqNQMBs1uIEJax/TFmYgqN5gwvqMAsIo1NoHTFjHMG2hJ4LqIALrHIILLRFUJ3EkvIZCwx2PoIYuYcK6bllwTFw4iqC6gcBqg6Mi3iGkGuFI2BaFiTVqoiEmrPY4KoKQ6oTA6oujYi0EVWcE1hgElzeCahACayyCywtBNRiBNQfPuXQRUhMRWPMRXvkRUkkQWLkQXnkQUgkRWHnxvGsOgioxAiu/dQMRYG0RUEIILD0cG+8jpEQRWNq2Go8Qe0U4GSGw/FQ/QhJQxggsf85TGOFUDIFV07tGzxZmhBK+EVhYOxMQy3B7xH7Ybf03ggin/Qs3vb4gW1t8pAAAAABJRU5ErkJggg==";/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const iu="147",nx=0,Rh=1,ix=2,dm=1,sx=2,Or=3,cs=0,yn=1,ri=2,Ni=0,Ys=1,Ih=2,Ph=3,Dh=4,rx=5,Os=100,ax=101,ox=102,Nh=103,Oh=104,lx=200,cx=201,ux=202,hx=203,pm=204,mm=205,fx=206,dx=207,px=208,mx=209,gx=210,_x=0,vx=1,xx=2,fc=3,yx=4,bx=5,Mx=6,Sx=7,gm=0,wx=1,Ex=2,ui=0,Tx=1,Ax=2,Cx=3,Lx=4,Rx=5,_m=300,er=301,tr=302,dc=303,pc=304,Ho=306,nr=1e3,gn=1001,So=1002,pt=1003,mc=1004,gc=1005,Jt=1006,vm=1007,dr=1008,us=1009,Ix=1010,Px=1011,xm=1012,Dx=1013,ts=1014,Ii=1015,ta=1016,Nx=1017,Ox=1018,qs=1020,Fx=1021,kx=1022,_n=1023,Ux=1024,Bx=1025,as=1026,ir=1027,Vx=1028,zx=1029,Hx=1030,Wx=1031,Gx=1033,ul=33776,hl=33777,fl=33778,dl=33779,Fh=35840,kh=35841,Uh=35842,Bh=35843,jx=36196,Vh=37492,zh=37496,Hh=37808,Wh=37809,Gh=37810,jh=37811,Xh=37812,Yh=37813,qh=37814,$h=37815,Kh=37816,Qh=37817,Jh=37818,Zh=37819,ef=37820,tf=37821,nf=36492,na=2300,sr=2301,pl=2302,sf=2400,rf=2401,af=2402,Xx=2500,Yx=1,ym=2,hs=3e3,rt=3001,qx=3200,$x=3201,su=0,Kx=1,kn="srgb",ia="srgb-linear",ml=7680,Qx=519,_c=35044,of="300 es",vc=1035;class pr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lf=1234567;const Wr=Math.PI/180,sa=180/Math.PI;function Pn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function ru(n,e){return(n%e+e)%e}function Jx(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Zx(n,e,t){return n!==e?(t-n)/(e-n):0}function Gr(n,e,t){return(1-t)*n+t*e}function ey(n,e,t,i){return Gr(n,e,1-Math.exp(-t*i))}function ty(n,e=1){return e-Math.abs(ru(n,e*2)-e)}function ny(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function iy(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function sy(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ry(n,e){return n+Math.random()*(e-n)}function ay(n){return n*(.5-Math.random())}function oy(n){n!==void 0&&(lf=n);let e=lf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ly(n){return n*Wr}function cy(n){return n*sa}function xc(n){return(n&n-1)===0&&n!==0}function bm(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function wo(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function uy(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),h=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),v=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*h,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*v,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*v,o*c);break;case"ZYZ":n.set(l*v,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ai(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ot(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var hy=Object.freeze({__proto__:null,DEG2RAD:Wr,RAD2DEG:sa,generateUUID:Pn,clamp:Xt,euclideanModulo:ru,mapLinear:Jx,inverseLerp:Zx,lerp:Gr,damp:ey,pingpong:ty,smoothstep:ny,smootherstep:iy,randInt:sy,randFloat:ry,randFloatSpread:ay,seededRandom:oy,degToRad:ly,radToDeg:cy,isPowerOfTwo:xc,ceilPowerOfTwo:bm,floorPowerOfTwo:wo,setQuaternionFromProperEuler:uy,normalize:ot,denormalize:ai});class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ln{constructor(){ln.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],v=i[8],m=s[0],d=s[3],g=s[6],b=s[1],S=s[4],y=s[7],w=s[2],A=s[5],P=s[8];return r[0]=a*m+o*b+l*w,r[3]=a*d+o*S+l*A,r[6]=a*g+o*y+l*P,r[1]=c*m+u*b+h*w,r[4]=c*d+u*S+h*A,r[7]=c*g+u*y+h*P,r[2]=f*m+p*b+v*w,r[5]=f*d+p*S+v*A,r[8]=f*g+p*y+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,p=c*r-a*l,v=t*h+i*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/v;return e[0]=h*m,e[1]=(s*c-u*i)*m,e[2]=(o*i-s*a)*m,e[3]=f*m,e[4]=(u*t-s*l)*m,e[5]=(s*r-o*t)*m,e[6]=p*m,e[7]=(i*l-c*t)*m,e[8]=(a*t-i*r)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(gl.makeScale(e,t)),this}rotate(e){return this.premultiply(gl.makeRotation(-e)),this}translate(e,t){return this.premultiply(gl.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gl=new ln;function Mm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ra(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function os(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function po(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const _l={[kn]:{[ia]:os},[ia]:{[kn]:po}},zt={legacyMode:!0,get workingColorSpace(){return ia},set workingColorSpace(n){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(n,e,t){if(this.legacyMode||e===t||!e||!t)return n;if(_l[e]&&_l[e][t]!==void 0){const i=_l[e][t];return n.r=i(n.r),n.g=i(n.g),n.b=i(n.b),n}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)}},Sm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bt={r:0,g:0,b:0},wn={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function vl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function Pa(n,e){return e.r=n.r,e.g=n.g,e.b=n.b,e}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=zt.workingColorSpace){return this.r=e,this.g=t,this.b=i,zt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=zt.workingColorSpace){if(e=ru(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=vl(a,r,e+1/3),this.g=vl(a,r,e),this.b=vl(a,r,e-1/3)}return zt.toWorkingColorSpace(this,s),this}setStyle(e,t=kn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,zt.toWorkingColorSpace(this,t),i(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,zt.toWorkingColorSpace(this,t),i(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(r[1])/360,c=parseFloat(r[2])/100,u=parseFloat(r[3])/100;return i(r[4]),this.setHSL(l,c,u,t)}break}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,zt.toWorkingColorSpace(this,t),this;if(a===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,zt.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=kn){const i=Sm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=os(e.r),this.g=os(e.g),this.b=os(e.b),this}copyLinearToSRGB(e){return this.r=po(e.r),this.g=po(e.g),this.b=po(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kn){return zt.fromWorkingColorSpace(Pa(this,bt),e),Xt(bt.r*255,0,255)<<16^Xt(bt.g*255,0,255)<<8^Xt(bt.b*255,0,255)<<0}getHexString(e=kn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zt.workingColorSpace){zt.fromWorkingColorSpace(Pa(this,bt),t);const i=bt.r,s=bt.g,r=bt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=zt.workingColorSpace){return zt.fromWorkingColorSpace(Pa(this,bt),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=kn){return zt.fromWorkingColorSpace(Pa(this,bt),e),e!==kn?`color(${e} ${bt.r} ${bt.g} ${bt.b})`:`rgb(${bt.r*255|0},${bt.g*255|0},${bt.b*255|0})`}offsetHSL(e,t,i){return this.getHSL(wn),wn.h+=e,wn.s+=t,wn.l+=i,this.setHSL(wn.h,wn.s,wn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(Ia);const i=Gr(wn.h,Ia.h,t),s=Gr(wn.s,Ia.s,t),r=Gr(wn.l,Ia.l,t);return this.setHSL(i,s,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Ve.NAMES=Sm;let xs;class wm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{xs===void 0&&(xs=ra("canvas")),xs.width=e.width,xs.height=e.height;const i=xs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=xs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ra("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=os(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(os(t[i]/255)*255):t[i]=os(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Em{constructor(e=null){this.isSource=!0,this.uuid=Pn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xl(s[a].image)):r.push(xl(s[a]))}else r=xl(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function xl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?wm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fy=0;class Pt extends pr{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=gn,s=gn,r=Jt,a=dr,o=_n,l=us,c=Pt.DEFAULT_ANISOTROPY,u=hs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fy++}),this.uuid=Pn(),this.name="",this.source=new Em(e),this.mipmaps=[],this.mapping=t,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ln,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_m)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nr:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case So:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nr:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case So:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=_m;Pt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,i=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],v=l[9],m=l[2],d=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-m)<.01&&Math.abs(v-d)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+m)<.1&&Math.abs(v+d)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,y=(p+1)/2,w=(g+1)/2,A=(u+f)/4,P=(h+m)/4,M=(v+d)/4;return S>y&&S>w?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=A/i,r=P/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=M/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=P/r,s=M/r),this.set(i,s,r,t),this}let b=Math.sqrt((d-v)*(d-v)+(h-m)*(h-m)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(d-v)/b,this.y=(h-m)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bn extends pr{constructor(e=1,t=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};this.texture=new Pt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Jt,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Em(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tm extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=pt,this.minFilter=pt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dy extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=pt,this.minFilter=pt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[a+0],p=r[a+1],v=r[a+2],m=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=m;return}if(h!==m||l!==f||c!==p||u!==v){let d=1-o;const g=l*f+c*p+u*v+h*m,b=g>=0?1:-1,S=1-g*g;if(S>Number.EPSILON){const w=Math.sqrt(S),A=Math.atan2(w,g*b);d=Math.sin(d*A)/w,o=Math.sin(o*A)/w}const y=o*b;if(l=l*d+f*y,c=c*d+p*y,u=u*d+v*y,h=h*d+m*y,d===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],f=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*h+l*p-c*f,e[t+1]=l*v+u*f+c*h-o*p,e[t+2]=c*v+u*p+o*f-l*h,e[t+3]=u*v-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),f=l(i/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"YXZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"ZXY":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"ZYX":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"YZX":this._x=f*u*h+c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h-f*p*v;break;case"XZY":this._x=f*u*h-c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*s-o*i,u=l*i+o*t-r*s,h=l*s+r*i-a*t,f=-r*t-a*i-o*s;return this.x=c*l+f*-r+u*-o-h*-a,this.y=u*l+f*-a+h*-r-c*-o,this.z=h*l+f*-o+c*-a-u*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yl.copy(this).projectOnVector(e),this.sub(yl)}reflect(e){return this.sub(yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yl=new U,cf=new Ui;class mr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,i=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],f=e[l+2];u<t&&(t=u),h<i&&(i=h),f<s&&(s=f),u>r&&(r=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(t,i,s),this.max.set(r,a,o),this}setFromBufferAttribute(e){let t=1/0,i=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),f=e.getZ(l);u<t&&(t=u),h<i&&(i=h),f<s&&(s=f),u>r&&(r=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(t,i,s),this.max.set(r,a,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0)if(t&&i.attributes!=null&&i.attributes.position!==void 0){const r=i.attributes.position;for(let a=0,o=r.count;a<o;a++)Yi.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Yi)}else i.boundingBox===null&&i.computeBoundingBox(),bl.copy(i.boundingBox),bl.applyMatrix4(e.matrixWorld),this.union(bl);const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yi),Yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Er),Da.subVectors(this.max,Er),ys.subVectors(e.a,Er),bs.subVectors(e.b,Er),Ms.subVectors(e.c,Er),pi.subVectors(bs,ys),mi.subVectors(Ms,bs),qi.subVectors(ys,Ms);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-qi.z,qi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,qi.z,0,-qi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-qi.y,qi.x,0];return!Ml(t,ys,bs,Ms,Da)||(t=[1,0,0,0,1,0,0,0,1],!Ml(t,ys,bs,Ms,Da))?!1:(Na.crossVectors(pi,mi),t=[Na.x,Na.y,Na.z],Ml(t,ys,bs,Ms,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return Yi.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(Yi).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Kn=[new U,new U,new U,new U,new U,new U,new U,new U],Yi=new U,bl=new mr,ys=new U,bs=new U,Ms=new U,pi=new U,mi=new U,qi=new U,Er=new U,Da=new U,Na=new U,$i=new U;function Ml(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){$i.fromArray(n,r);const o=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),l=e.dot($i),c=t.dot($i),u=i.dot($i);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const py=new mr,Tr=new U,Sl=new U;class gr{constructor(e=new U,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):py.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Tr.subVectors(e,this.center);const t=Tr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Tr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Tr.copy(e.center).add(Sl)),this.expandByPoint(Tr.copy(e.center).sub(Sl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new U,wl=new U,Oa=new U,gi=new U,El=new U,Fa=new U,Tl=new U;class au{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.direction).multiplyScalar(t).add(this.origin),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){wl.copy(e).add(t).multiplyScalar(.5),Oa.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(wl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Oa),o=gi.dot(this.direction),l=-gi.dot(Oa),c=gi.lengthSq(),u=Math.abs(1-a*a);let h,f,p,v;if(u>0)if(h=a*l-o,f=a*o-l,v=r*u,h>=0)if(f>=-v)if(f<=v){const m=1/u;h*=m,f*=m,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.direction).multiplyScalar(h).add(this.origin),s&&s.copy(Oa).multiplyScalar(f).add(wl),p}intersectSphere(e,t){Qn.subVectors(e.center,this.origin);const i=Qn.dot(this.direction),s=Qn.dot(Qn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return o<0&&l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,i,s,r){El.subVectors(t,e),Fa.subVectors(i,e),Tl.crossVectors(El,Fa);let a=this.direction.dot(Tl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gi.subVectors(this.origin,e);const l=o*this.direction.dot(Fa.crossVectors(gi,Fa));if(l<0)return null;const c=o*this.direction.dot(El.cross(gi));if(c<0||l+c>a)return null;const u=-o*gi.dot(Tl);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class je{constructor(){je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,i,s,r,a,o,l,c,u,h,f,p,v,m,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=f,g[3]=p,g[7]=v,g[11]=m,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new je().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ss.setFromMatrixColumn(e,0).length(),r=1/Ss.setFromMatrixColumn(e,1).length(),a=1/Ss.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,p=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=f-m*c,t[9]=-o*l,t[2]=m-f*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,v=c*u,m=c*h;t[0]=f+m*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=m+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,v=c*u,m=c*h;t[0]=f-m*o,t[4]=-a*h,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=m-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=v*c-p,t[8]=f*c+m,t[1]=l*h,t[5]=m*c+f,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=m-f*h,t[8]=v*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+v,t[10]=f-m*h}else if(e.order==="XZY"){const f=a*l,p=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+m,t[5]=a*u,t[9]=p*h-v,t[2]=v*h-p,t[6]=o*u,t[10]=m*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(my,e,gy)}lookAt(e,t,i){const s=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),_i.crossVectors(i,sn),_i.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),_i.crossVectors(i,sn)),_i.normalize(),ka.crossVectors(sn,_i),s[0]=_i.x,s[4]=ka.x,s[8]=sn.x,s[1]=_i.y,s[5]=ka.y,s[9]=sn.y,s[2]=_i.z,s[6]=ka.z,s[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],v=i[2],m=i[6],d=i[10],g=i[14],b=i[3],S=i[7],y=i[11],w=i[15],A=s[0],P=s[4],M=s[8],I=s[12],O=s[1],Q=s[5],ue=s[9],H=s[13],V=s[2],te=s[6],re=s[10],ne=s[14],G=s[3],pe=s[7],ce=s[11],X=s[15];return r[0]=a*A+o*O+l*V+c*G,r[4]=a*P+o*Q+l*te+c*pe,r[8]=a*M+o*ue+l*re+c*ce,r[12]=a*I+o*H+l*ne+c*X,r[1]=u*A+h*O+f*V+p*G,r[5]=u*P+h*Q+f*te+p*pe,r[9]=u*M+h*ue+f*re+p*ce,r[13]=u*I+h*H+f*ne+p*X,r[2]=v*A+m*O+d*V+g*G,r[6]=v*P+m*Q+d*te+g*pe,r[10]=v*M+m*ue+d*re+g*ce,r[14]=v*I+m*H+d*ne+g*X,r[3]=b*A+S*O+y*V+w*G,r[7]=b*P+S*Q+y*te+w*pe,r[11]=b*M+S*ue+y*re+w*ce,r[15]=b*I+S*H+y*ne+w*X,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],v=e[3],m=e[7],d=e[11],g=e[15];return v*(+r*l*h-s*c*h-r*o*f+i*c*f+s*o*p-i*l*p)+m*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*u-r*l*u)+d*(+t*c*h-t*o*p-r*a*h+i*a*p+r*o*u-i*c*u)+g*(-s*o*u-t*l*h+t*o*f+s*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],v=e[12],m=e[13],d=e[14],g=e[15],b=h*d*c-m*f*c+m*l*p-o*d*p-h*l*g+o*f*g,S=v*f*c-u*d*c-v*l*p+a*d*p+u*l*g-a*f*g,y=u*m*c-v*h*c+v*o*p-a*m*p-u*o*g+a*h*g,w=v*h*l-u*m*l-v*o*f+a*m*f+u*o*d-a*h*d,A=t*b+i*S+s*y+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=b*P,e[1]=(m*f*r-h*d*r-m*s*p+i*d*p+h*s*g-i*f*g)*P,e[2]=(o*d*r-m*l*r+m*s*c-i*d*c-o*s*g+i*l*g)*P,e[3]=(h*l*r-o*f*r-h*s*c+i*f*c+o*s*p-i*l*p)*P,e[4]=S*P,e[5]=(u*d*r-v*f*r+v*s*p-t*d*p-u*s*g+t*f*g)*P,e[6]=(v*l*r-a*d*r-v*s*c+t*d*c+a*s*g-t*l*g)*P,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*p+t*l*p)*P,e[8]=y*P,e[9]=(v*h*r-u*m*r-v*i*p+t*m*p+u*i*g-t*h*g)*P,e[10]=(a*m*r-v*o*r+v*i*c-t*m*c-a*i*g+t*o*g)*P,e[11]=(u*o*r-a*h*r-u*i*c+t*h*c+a*i*p-t*o*p)*P,e[12]=w*P,e[13]=(u*m*s-v*h*s+v*i*f-t*m*f-u*i*d+t*h*d)*P,e[14]=(v*o*s-a*m*s-v*i*l+t*m*l+a*i*d-t*o*d)*P,e[15]=(a*h*s-u*o*s+u*i*l-t*h*l-a*i*f+t*o*f)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,p=r*u,v=r*h,m=a*u,d=a*h,g=o*h,b=l*c,S=l*u,y=l*h,w=i.x,A=i.y,P=i.z;return s[0]=(1-(m+g))*w,s[1]=(p+y)*w,s[2]=(v-S)*w,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(f+g))*A,s[6]=(d+b)*A,s[7]=0,s[8]=(v+S)*P,s[9]=(d-b)*P,s[10]=(1-(f+m))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ss.set(s[0],s[1],s[2]).length();const a=Ss.set(s[4],s[5],s[6]).length(),o=Ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],En.copy(this);const c=1/r,u=1/a,h=1/o;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=h,En.elements[9]*=h,En.elements[10]*=h,t.setFromRotationMatrix(En),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a){const o=this.elements,l=2*r/(t-e),c=2*r/(i-s),u=(t+e)/(t-e),h=(i+s)/(i-s),f=-(a+r)/(a-r),p=-2*a*r/(a-r);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,i,s,r,a){const o=this.elements,l=1/(t-e),c=1/(i-s),u=1/(a-r),h=(t+e)*l,f=(i+s)*c,p=(a+r)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ss=new U,En=new je,my=new U(0,0,0),gy=new U(1,1,1),_i=new U,ka=new U,sn=new U,uf=new je,hf=new Ui;class _a{constructor(e=0,t=0,i=0,s=_a.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return uf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hf.setFromEuler(this),this.setFromQuaternion(hf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}_a.DefaultOrder="XYZ";_a.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Am{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _y=0;const ff=new U,ws=new Ui,Jn=new je,Ua=new U,Ar=new U,vy=new U,xy=new Ui,df=new U(1,0,0),pf=new U(0,1,0),mf=new U(0,0,1),yy={type:"added"},gf={type:"removed"};class ft extends pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DefaultUp.clone();const e=new U,t=new _a,i=new Ui,s=new U(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new je},normalMatrix:{value:new ln}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=ft.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ft.DefaultMatrixWorldAutoUpdate,this.layers=new Am,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(df,e)}rotateY(e){return this.rotateOnAxis(pf,e)}rotateZ(e){return this.rotateOnAxis(mf,e)}translateOnAxis(e,t){return ff.copy(e).applyQuaternion(this.quaternion),this.position.add(ff.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(df,e)}translateY(e){return this.translateOnAxis(pf,e)}translateZ(e){return this.translateOnAxis(mf,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ua.copy(e):Ua.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Ar,Ua,this.up):Jn.lookAt(Ua,Ar,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(Jn),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(yy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gf)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(gf)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,vy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,xy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}ft.DefaultUp=new U(0,1,0);ft.DefaultMatrixAutoUpdate=!0;ft.DefaultMatrixWorldAutoUpdate=!0;const Tn=new U,Zn=new U,Al=new U,ei=new U,Es=new U,Ts=new U,_f=new U,Cl=new U,Ll=new U,Rl=new U;class ii{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Tn.subVectors(e,t),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Tn.subVectors(s,t),Zn.subVectors(i,t),Al.subVectors(e,t);const a=Tn.dot(Tn),o=Tn.dot(Zn),l=Tn.dot(Al),c=Zn.dot(Zn),u=Zn.dot(Al),h=a*c-o*o;if(h===0)return r.set(-2,-1,-1);const f=1/h,p=(c*l-o*u)*f,v=(a*u-o*l)*f;return r.set(1-p-v,v,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ei),ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getUV(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,ei),l.set(0,0),l.addScaledVector(r,ei.x),l.addScaledVector(a,ei.y),l.addScaledVector(o,ei.z),l}static isFrontFacing(e,t,i,s){return Tn.subVectors(i,t),Zn.subVectors(e,t),Tn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Tn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ii.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return ii.getUV(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Es.subVectors(s,i),Ts.subVectors(r,i),Cl.subVectors(e,i);const l=Es.dot(Cl),c=Ts.dot(Cl);if(l<=0&&c<=0)return t.copy(i);Ll.subVectors(e,s);const u=Es.dot(Ll),h=Ts.dot(Ll);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Es,a);Rl.subVectors(e,r);const p=Es.dot(Rl),v=Ts.dot(Rl);if(v>=0&&p<=v)return t.copy(r);const m=p*c-l*v;if(m<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(Ts,o);const d=u*v-p*h;if(d<=0&&h-u>=0&&p-v>=0)return _f.subVectors(r,s),o=(h-u)/(h-u+(p-v)),t.copy(s).addScaledVector(_f,o);const g=1/(d+m+f);return a=m*g,o=f*g,t.copy(i).addScaledVector(Es,a).addScaledVector(Ts,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let by=0;class Dn extends pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:by++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=Ys,this.side=cs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=pm,this.blendDst=mm,this.blendEquation=Os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=fc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qx,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ml,this.stencilZFail=ml,this.stencilZPass=ml,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const s=this[t];if(s===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(i.blending=this.blending),this.side!==cs&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class oi extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=gm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new U,Ba=new Ue;class qt{constructor(e,t,i){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i===!0,this.usage=_c,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_c&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Cm extends qt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Lm extends qt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bt extends qt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let My=0;const fn=new je,Il=new ft,As=new U,rn=new mr,Cr=new mr,Lt=new U;class un extends pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:My++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mm(e)?Lm:Cm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ln().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return Il.lookAt(e),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Bt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(rn.min,Cr.min),rn.expandByPoint(Lt),Lt.addVectors(rn.max,Cr.max),rn.expandByPoint(Lt)):(rn.expandByPoint(Cr.min),rn.expandByPoint(Cr.max))}rn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Lt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Lt.fromBufferAttribute(o,c),l&&(As.fromBufferAttribute(e,c),Lt.add(As)),s=Math.max(s,i.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let O=0;O<o;O++)c[O]=new U,u[O]=new U;const h=new U,f=new U,p=new U,v=new Ue,m=new Ue,d=new Ue,g=new U,b=new U;function S(O,Q,ue){h.fromArray(s,O*3),f.fromArray(s,Q*3),p.fromArray(s,ue*3),v.fromArray(a,O*2),m.fromArray(a,Q*2),d.fromArray(a,ue*2),f.sub(h),p.sub(h),m.sub(v),d.sub(v);const H=1/(m.x*d.y-d.x*m.y);isFinite(H)&&(g.copy(f).multiplyScalar(d.y).addScaledVector(p,-m.y).multiplyScalar(H),b.copy(p).multiplyScalar(m.x).addScaledVector(f,-d.x).multiplyScalar(H),c[O].add(g),c[Q].add(g),c[ue].add(g),u[O].add(b),u[Q].add(b),u[ue].add(b))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let O=0,Q=y.length;O<Q;++O){const ue=y[O],H=ue.start,V=ue.count;for(let te=H,re=H+V;te<re;te+=3)S(i[te+0],i[te+1],i[te+2])}const w=new U,A=new U,P=new U,M=new U;function I(O){P.fromArray(r,O*3),M.copy(P);const Q=c[O];w.copy(Q),w.sub(P.multiplyScalar(P.dot(Q))).normalize(),A.crossVectors(M,Q);const H=A.dot(u[O])<0?-1:1;l[O*4]=w.x,l[O*4+1]=w.y,l[O*4+2]=w.z,l[O*4+3]=H}for(let O=0,Q=y.length;O<Q;++O){const ue=y[O],H=ue.start,V=ue.count;for(let te=H,re=H+V;te<re;te+=3)I(i[te+0]),I(i[te+1]),I(i[te+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,u=new U,h=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),m=e.getX(f+1),d=e.getX(f+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,d),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),c.fromBufferAttribute(i,d),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(m,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,v=0;for(let m=0,d=l.length;m<d;m++){o.isInterleavedBufferAttribute?p=l[m]*o.data.stride+o.offset:p=l[m]*u;for(let g=0;g<u;g++)f[v++]=c[p++]}return new qt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new un,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const vf=new je,Cs=new au,Pl=new gr,vi=new U,xi=new U,yi=new U,Dl=new U,Nl=new U,Ol=new U,Va=new U,za=new U,Ha=new U,Wa=new Ue,Ga=new Ue,ja=new Ue,Fl=new U,Xa=new U;class Zt extends ft{constructor(e=new un,t=new oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;if(s===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),Pl.copy(i.boundingSphere),Pl.applyMatrix4(r),e.ray.intersectsSphere(Pl)===!1)||(vf.copy(r).invert(),Cs.copy(e.ray).applyMatrix4(vf),i.boundingBox!==null&&Cs.intersectsBox(i.boundingBox)===!1))return;let a;const o=i.index,l=i.attributes.position,c=i.morphAttributes.position,u=i.morphTargetsRelative,h=i.attributes.uv,f=i.attributes.uv2,p=i.groups,v=i.drawRange;if(o!==null)if(Array.isArray(s))for(let m=0,d=p.length;m<d;m++){const g=p[m],b=s[g.materialIndex],S=Math.max(g.start,v.start),y=Math.min(o.count,Math.min(g.start+g.count,v.start+v.count));for(let w=S,A=y;w<A;w+=3){const P=o.getX(w),M=o.getX(w+1),I=o.getX(w+2);a=Ya(this,b,e,Cs,l,c,u,h,f,P,M,I),a&&(a.faceIndex=Math.floor(w/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const m=Math.max(0,v.start),d=Math.min(o.count,v.start+v.count);for(let g=m,b=d;g<b;g+=3){const S=o.getX(g),y=o.getX(g+1),w=o.getX(g+2);a=Ya(this,s,e,Cs,l,c,u,h,f,S,y,w),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,d=p.length;m<d;m++){const g=p[m],b=s[g.materialIndex],S=Math.max(g.start,v.start),y=Math.min(l.count,Math.min(g.start+g.count,v.start+v.count));for(let w=S,A=y;w<A;w+=3){const P=w,M=w+1,I=w+2;a=Ya(this,b,e,Cs,l,c,u,h,f,P,M,I),a&&(a.faceIndex=Math.floor(w/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const m=Math.max(0,v.start),d=Math.min(l.count,v.start+v.count);for(let g=m,b=d;g<b;g+=3){const S=g,y=g+1,w=g+2;a=Ya(this,s,e,Cs,l,c,u,h,f,S,y,w),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}}}function Sy(n,e,t,i,s,r,a,o){let l;if(e.side===yn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side!==ri,o),l===null)return null;Xa.copy(o),Xa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:n}}function Ya(n,e,t,i,s,r,a,o,l,c,u,h){vi.fromBufferAttribute(s,c),xi.fromBufferAttribute(s,u),yi.fromBufferAttribute(s,h);const f=n.morphTargetInfluences;if(r&&f){Va.set(0,0,0),za.set(0,0,0),Ha.set(0,0,0);for(let v=0,m=r.length;v<m;v++){const d=f[v],g=r[v];d!==0&&(Dl.fromBufferAttribute(g,c),Nl.fromBufferAttribute(g,u),Ol.fromBufferAttribute(g,h),a?(Va.addScaledVector(Dl,d),za.addScaledVector(Nl,d),Ha.addScaledVector(Ol,d)):(Va.addScaledVector(Dl.sub(vi),d),za.addScaledVector(Nl.sub(xi),d),Ha.addScaledVector(Ol.sub(yi),d)))}vi.add(Va),xi.add(za),yi.add(Ha)}n.isSkinnedMesh&&(n.boneTransform(c,vi),n.boneTransform(u,xi),n.boneTransform(h,yi));const p=Sy(n,e,t,i,vi,xi,yi,Fl);if(p){o&&(Wa.fromBufferAttribute(o,c),Ga.fromBufferAttribute(o,u),ja.fromBufferAttribute(o,h),p.uv=ii.getUV(Fl,vi,xi,yi,Wa,Ga,ja,new Ue)),l&&(Wa.fromBufferAttribute(l,c),Ga.fromBufferAttribute(l,u),ja.fromBufferAttribute(l,h),p.uv2=ii.getUV(Fl,vi,xi,yi,Wa,Ga,ja,new Ue));const v={a:c,b:u,c:h,normal:new U,materialIndex:0};ii.getNormal(vi,xi,yi,v.normal),p.face=v}return p}class va extends un{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,t,e,a,r,0),v("z","y","x",1,-1,i,t,-e,a,r,1),v("x","z","y",1,1,e,i,t,s,a,2),v("x","z","y",1,-1,e,i,-t,s,a,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(h,2));function v(m,d,g,b,S,y,w,A,P,M,I){const O=y/P,Q=w/M,ue=y/2,H=w/2,V=A/2,te=P+1,re=M+1;let ne=0,G=0;const pe=new U;for(let ce=0;ce<re;ce++){const X=ce*Q-H;for(let Y=0;Y<te;Y++){const fe=Y*O-ue;pe[m]=fe*b,pe[d]=X*S,pe[g]=V,c.push(pe.x,pe.y,pe.z),pe[m]=0,pe[d]=0,pe[g]=A>0?1:-1,u.push(pe.x,pe.y,pe.z),h.push(Y/P),h.push(1-ce/M),ne+=1}}for(let ce=0;ce<M;ce++)for(let X=0;X<P;X++){const Y=f+X+te*ce,fe=f+X+te*(ce+1),me=f+(X+1)+te*(ce+1),xe=f+(X+1)+te*ce;l.push(Y,fe,xe),l.push(fe,me,xe),G+=6}o.addGroup(p,G,I),p+=G,f+=ne}}static fromJSON(e){return new va(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Gt(n){const e={};for(let t=0;t<n.length;t++){const i=rr(n[t]);for(const s in i)e[s]=i[s]}return e}function wy(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Rm(n){return n.getRenderTarget()===null&&n.outputEncoding===rt?kn:ia}const Wo={clone:rr,merge:Gt};var Ey=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ty=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ey,this.fragmentShader=Ty,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rr(e.uniforms),this.uniformsGroups=wy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Im extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Yt extends Im{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sa*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ls=-90,Rs=1;class Ay extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i;const s=new Yt(Ls,Rs,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(1,0,0),this.add(s);const r=new Yt(Ls,Rs,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(-1,0,0),this.add(r);const a=new Yt(Ls,Rs,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new Yt(Ls,Rs,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new Yt(Ls,Rs,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Yt(Ls,Rs,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[s,r,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,f=e.xr.enabled;e.toneMapping=ui,e.xr.enabled=!1;const p=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,s),e.setRenderTarget(i,1),e.render(t,r),e.setRenderTarget(i,2),e.render(t,a),e.setRenderTarget(i,3),e.render(t,o),e.setRenderTarget(i,4),e.render(t,l),i.texture.generateMipmaps=p,e.setRenderTarget(i,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=f,i.texture.needsPMREMUpdate=!0}}class Pm extends Pt{constructor(e,t,i,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:er,super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cy extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Pm(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new va(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:Ni});r.uniforms.tEquirect.value=t;const a=new Zt(s,r),o=t.minFilter;return t.minFilter===dr&&(t.minFilter=Jt),new Ay(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const kl=new U,Ly=new U,Ry=new ln;class Qi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=kl.subVectors(i,t).cross(Ly.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const i=e.delta(kl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(i).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ry.getNormalMatrix(e),s=this.coplanarPoint(kl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Is=new gr,qa=new U;class ou{constructor(e=new Qi,t=new Qi,i=new Qi,s=new Qi,r=new Qi,a=new Qi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const t=this.planes,i=e.elements,s=i[0],r=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],f=i[8],p=i[9],v=i[10],m=i[11],d=i[12],g=i[13],b=i[14],S=i[15];return t[0].setComponents(o-s,h-l,m-f,S-d).normalize(),t[1].setComponents(o+s,h+l,m+f,S+d).normalize(),t[2].setComponents(o+r,h+c,m+p,S+g).normalize(),t[3].setComponents(o-r,h-c,m-p,S-g).normalize(),t[4].setComponents(o-a,h-u,m-v,S-b).normalize(),t[5].setComponents(o+a,h+u,m+v,S+b).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Is)}intersectsSprite(e){return Is.center.set(0,0,0),Is.radius=.7071067811865476,Is.applyMatrix4(e.matrixWorld),this.intersectsSphere(Is)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(qa.x=s.normal.x>0?e.max.x:e.min.x,qa.y=s.normal.y>0?e.max.y:e.min.y,qa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dm(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Iy(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,u){const h=c.array,f=c.usage,p=n.createBuffer();n.bindBuffer(u,p),n.bufferData(u,h,f),c.onUploadCallback();let v;if(h instanceof Float32Array)v=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=5123;else if(h instanceof Int16Array)v=5122;else if(h instanceof Uint32Array)v=5125;else if(h instanceof Int32Array)v=5124;else if(h instanceof Int8Array)v=5120;else if(h instanceof Uint8Array)v=5121;else if(h instanceof Uint8ClampedArray)v=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function r(c,u,h){const f=u.array,p=u.updateRange;n.bindBuffer(h,c),p.count===-1?n.bufferSubData(h,0,f):(t?n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h===void 0?i.set(c,s(c,u)):h.version<c.version&&(r(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class lu extends un{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,p=[],v=[],m=[],d=[];for(let g=0;g<u;g++){const b=g*f-a;for(let S=0;S<c;S++){const y=S*h-r;v.push(y,-b,0),m.push(0,0,1),d.push(S/o),d.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<o;b++){const S=b+c*g,y=b+c*(g+1),w=b+1+c*(g+1),A=b+1+c*g;p.push(S,y,A),p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Bt(v,3)),this.setAttribute("normal",new Bt(m,3)),this.setAttribute("uv",new Bt(d,2))}static fromJSON(e){return new lu(e.width,e.height,e.widthSegments,e.heightSegments)}}var Py=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Dy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ny=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Oy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ky=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uy="vec3 transformed = vec3( position );",By=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vy=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,zy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Gy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$y=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ky=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Qy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Jy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zy=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,eb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,nb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ib=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sb="gl_FragColor = linearToOutputTexel( gl_FragColor );",rb=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ob=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ub=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,db=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gb=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,_b=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bb=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Mb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,Ab=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cb=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Ib=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pb=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Db=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nb=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ob=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ub=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zb=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wb=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Gb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,jb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Xb=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$b=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Qb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Jb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Zb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,eM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,iM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,aM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cM=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,uM=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hM=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,fM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,mM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_M=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,MM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,SM=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,wM=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,EM=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,TM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,AM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,CM=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,LM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const RM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,IM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,PM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,NM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,FM=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,UM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,BM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,VM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,HM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,WM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,GM=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$M=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,QM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,JM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aS=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,lS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ze={alphamap_fragment:Py,alphamap_pars_fragment:Dy,alphatest_fragment:Ny,alphatest_pars_fragment:Oy,aomap_fragment:Fy,aomap_pars_fragment:ky,begin_vertex:Uy,beginnormal_vertex:By,bsdfs:Vy,iridescence_fragment:zy,bumpmap_pars_fragment:Hy,clipping_planes_fragment:Wy,clipping_planes_pars_fragment:Gy,clipping_planes_pars_vertex:jy,clipping_planes_vertex:Xy,color_fragment:Yy,color_pars_fragment:qy,color_pars_vertex:$y,color_vertex:Ky,common:Qy,cube_uv_reflection_fragment:Jy,defaultnormal_vertex:Zy,displacementmap_pars_vertex:eb,displacementmap_vertex:tb,emissivemap_fragment:nb,emissivemap_pars_fragment:ib,encodings_fragment:sb,encodings_pars_fragment:rb,envmap_fragment:ab,envmap_common_pars_fragment:ob,envmap_pars_fragment:lb,envmap_pars_vertex:cb,envmap_physical_pars_fragment:bb,envmap_vertex:ub,fog_vertex:hb,fog_pars_vertex:fb,fog_fragment:db,fog_pars_fragment:pb,gradientmap_pars_fragment:mb,lightmap_fragment:gb,lightmap_pars_fragment:_b,lights_lambert_fragment:vb,lights_lambert_pars_fragment:xb,lights_pars_begin:yb,lights_toon_fragment:Mb,lights_toon_pars_fragment:Sb,lights_phong_fragment:wb,lights_phong_pars_fragment:Eb,lights_physical_fragment:Tb,lights_physical_pars_fragment:Ab,lights_fragment_begin:Cb,lights_fragment_maps:Lb,lights_fragment_end:Rb,logdepthbuf_fragment:Ib,logdepthbuf_pars_fragment:Pb,logdepthbuf_pars_vertex:Db,logdepthbuf_vertex:Nb,map_fragment:Ob,map_pars_fragment:Fb,map_particle_fragment:kb,map_particle_pars_fragment:Ub,metalnessmap_fragment:Bb,metalnessmap_pars_fragment:Vb,morphcolor_vertex:zb,morphnormal_vertex:Hb,morphtarget_pars_vertex:Wb,morphtarget_vertex:Gb,normal_fragment_begin:jb,normal_fragment_maps:Xb,normal_pars_fragment:Yb,normal_pars_vertex:qb,normal_vertex:$b,normalmap_pars_fragment:Kb,clearcoat_normal_fragment_begin:Qb,clearcoat_normal_fragment_maps:Jb,clearcoat_pars_fragment:Zb,iridescence_pars_fragment:eM,output_fragment:tM,packing:nM,premultiplied_alpha_fragment:iM,project_vertex:sM,dithering_fragment:rM,dithering_pars_fragment:aM,roughnessmap_fragment:oM,roughnessmap_pars_fragment:lM,shadowmap_pars_fragment:cM,shadowmap_pars_vertex:uM,shadowmap_vertex:hM,shadowmask_pars_fragment:fM,skinbase_vertex:dM,skinning_pars_vertex:pM,skinning_vertex:mM,skinnormal_vertex:gM,specularmap_fragment:_M,specularmap_pars_fragment:vM,tonemapping_fragment:xM,tonemapping_pars_fragment:yM,transmission_fragment:bM,transmission_pars_fragment:MM,uv_pars_fragment:SM,uv_pars_vertex:wM,uv_vertex:EM,uv2_pars_fragment:TM,uv2_pars_vertex:AM,uv2_vertex:CM,worldpos_vertex:LM,background_vert:RM,background_frag:IM,backgroundCube_vert:PM,backgroundCube_frag:DM,cube_vert:NM,cube_frag:OM,depth_vert:FM,depth_frag:kM,distanceRGBA_vert:UM,distanceRGBA_frag:BM,equirect_vert:VM,equirect_frag:zM,linedashed_vert:HM,linedashed_frag:WM,meshbasic_vert:GM,meshbasic_frag:jM,meshlambert_vert:XM,meshlambert_frag:YM,meshmatcap_vert:qM,meshmatcap_frag:$M,meshnormal_vert:KM,meshnormal_frag:QM,meshphong_vert:JM,meshphong_frag:ZM,meshphysical_vert:eS,meshphysical_frag:tS,meshtoon_vert:nS,meshtoon_frag:iS,points_vert:sS,points_frag:rS,shadow_vert:aS,shadow_frag:oS,sprite_vert:lS,sprite_frag:cS},ye={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new ln},uv2Transform:{value:new ln},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new ln}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new ln}}},Bn={basic:{uniforms:Gt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Gt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Gt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Gt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Gt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Gt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Gt([ye.points,ye.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Gt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Gt([ye.common,ye.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Gt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Gt([ye.sprite,ye.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ln},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Gt([ye.common,ye.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Gt([ye.lights,ye.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Bn.physical={uniforms:Gt([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const $a={r:0,b:0,g:0};function uS(n,e,t,i,s,r,a){const o=new Ve(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function v(d,g){let b=!1,S=g.isScene===!0?g.background:null;S&&S.isTexture&&(S=(g.backgroundBlurriness>0?t:e).get(S));const y=n.xr,w=y.getSession&&y.getSession();w&&w.environmentBlendMode==="additive"&&(S=null),S===null?m(o,l):S&&S.isColor&&(m(S,1),b=!0),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),S&&(S.isCubeTexture||S.mapping===Ho)?(u===void 0&&(u=new Zt(new va(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:rr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,P,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,(h!==S||f!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=S,f=S.version,p=n.toneMapping),u.layers.enableAll(),d.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Zt(new lu(2,2),new Mn({name:"BackgroundMaterial",uniforms:rr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:cs,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function m(d,g){d.getRGB($a,Rm(n)),i.buffers.color.setClear($a.r,$a.g,$a.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(d,g=1){o.set(d),l=g,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,m(o,l)},render:v}}function hS(n,e,t,i){const s=n.getParameter(34921),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=d(null);let c=l,u=!1;function h(V,te,re,ne,G){let pe=!1;if(a){const ce=m(ne,re,te);c!==ce&&(c=ce,p(c.object)),pe=g(V,ne,re,G),pe&&b(V,ne,re,G)}else{const ce=te.wireframe===!0;(c.geometry!==ne.id||c.program!==re.id||c.wireframe!==ce)&&(c.geometry=ne.id,c.program=re.id,c.wireframe=ce,pe=!0)}G!==null&&t.update(G,34963),(pe||u)&&(u=!1,M(V,te,re,ne),G!==null&&n.bindBuffer(34963,t.get(G).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(V){return i.isWebGL2?n.bindVertexArray(V):r.bindVertexArrayOES(V)}function v(V){return i.isWebGL2?n.deleteVertexArray(V):r.deleteVertexArrayOES(V)}function m(V,te,re){const ne=re.wireframe===!0;let G=o[V.id];G===void 0&&(G={},o[V.id]=G);let pe=G[te.id];pe===void 0&&(pe={},G[te.id]=pe);let ce=pe[ne];return ce===void 0&&(ce=d(f()),pe[ne]=ce),ce}function d(V){const te=[],re=[],ne=[];for(let G=0;G<s;G++)te[G]=0,re[G]=0,ne[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:te,enabledAttributes:re,attributeDivisors:ne,object:V,attributes:{},index:null}}function g(V,te,re,ne){const G=c.attributes,pe=te.attributes;let ce=0;const X=re.getAttributes();for(const Y in X)if(X[Y].location>=0){const me=G[Y];let xe=pe[Y];if(xe===void 0&&(Y==="instanceMatrix"&&V.instanceMatrix&&(xe=V.instanceMatrix),Y==="instanceColor"&&V.instanceColor&&(xe=V.instanceColor)),me===void 0||me.attribute!==xe||xe&&me.data!==xe.data)return!0;ce++}return c.attributesNum!==ce||c.index!==ne}function b(V,te,re,ne){const G={},pe=te.attributes;let ce=0;const X=re.getAttributes();for(const Y in X)if(X[Y].location>=0){let me=pe[Y];me===void 0&&(Y==="instanceMatrix"&&V.instanceMatrix&&(me=V.instanceMatrix),Y==="instanceColor"&&V.instanceColor&&(me=V.instanceColor));const xe={};xe.attribute=me,me&&me.data&&(xe.data=me.data),G[Y]=xe,ce++}c.attributes=G,c.attributesNum=ce,c.index=ne}function S(){const V=c.newAttributes;for(let te=0,re=V.length;te<re;te++)V[te]=0}function y(V){w(V,0)}function w(V,te){const re=c.newAttributes,ne=c.enabledAttributes,G=c.attributeDivisors;re[V]=1,ne[V]===0&&(n.enableVertexAttribArray(V),ne[V]=1),G[V]!==te&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,te),G[V]=te)}function A(){const V=c.newAttributes,te=c.enabledAttributes;for(let re=0,ne=te.length;re<ne;re++)te[re]!==V[re]&&(n.disableVertexAttribArray(re),te[re]=0)}function P(V,te,re,ne,G,pe){i.isWebGL2===!0&&(re===5124||re===5125)?n.vertexAttribIPointer(V,te,re,G,pe):n.vertexAttribPointer(V,te,re,ne,G,pe)}function M(V,te,re,ne){if(i.isWebGL2===!1&&(V.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const G=ne.attributes,pe=re.getAttributes(),ce=te.defaultAttributeValues;for(const X in pe){const Y=pe[X];if(Y.location>=0){let fe=G[X];if(fe===void 0&&(X==="instanceMatrix"&&V.instanceMatrix&&(fe=V.instanceMatrix),X==="instanceColor"&&V.instanceColor&&(fe=V.instanceColor)),fe!==void 0){const me=fe.normalized,xe=fe.itemSize,q=t.get(fe);if(q===void 0)continue;const W=q.buffer,J=q.type,ie=q.bytesPerElement;if(fe.isInterleavedBufferAttribute){const ee=fe.data,Ee=ee.stride,Me=fe.offset;if(ee.isInstancedInterleavedBuffer){for(let _=0;_<Y.locationSize;_++)w(Y.location+_,ee.meshPerAttribute);V.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let _=0;_<Y.locationSize;_++)y(Y.location+_);n.bindBuffer(34962,W);for(let _=0;_<Y.locationSize;_++)P(Y.location+_,xe/Y.locationSize,J,me,Ee*ie,(Me+xe/Y.locationSize*_)*ie)}else{if(fe.isInstancedBufferAttribute){for(let ee=0;ee<Y.locationSize;ee++)w(Y.location+ee,fe.meshPerAttribute);V.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ee=0;ee<Y.locationSize;ee++)y(Y.location+ee);n.bindBuffer(34962,W);for(let ee=0;ee<Y.locationSize;ee++)P(Y.location+ee,xe/Y.locationSize,J,me,xe*ie,xe/Y.locationSize*ee*ie)}}else if(ce!==void 0){const me=ce[X];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(Y.location,me);break;case 3:n.vertexAttrib3fv(Y.location,me);break;case 4:n.vertexAttrib4fv(Y.location,me);break;default:n.vertexAttrib1fv(Y.location,me)}}}}A()}function I(){ue();for(const V in o){const te=o[V];for(const re in te){const ne=te[re];for(const G in ne)v(ne[G].object),delete ne[G];delete te[re]}delete o[V]}}function O(V){if(o[V.id]===void 0)return;const te=o[V.id];for(const re in te){const ne=te[re];for(const G in ne)v(ne[G].object),delete ne[G];delete te[re]}delete o[V.id]}function Q(V){for(const te in o){const re=o[te];if(re[V.id]===void 0)continue;const ne=re[V.id];for(const G in ne)v(ne[G].object),delete ne[G];delete re[V.id]}}function ue(){H(),u=!0,c!==l&&(c=l,p(c.object))}function H(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:ue,resetDefaultState:H,dispose:I,releaseStatesOfGeometry:O,releaseStatesOfProgram:Q,initAttributes:S,enableAttribute:y,disableUnusedAttributes:A}}function fS(n,e,t,i){const s=i.isWebGL2;let r;function a(c){r=c}function o(c,u){n.drawArrays(r,c,u),t.update(u,r,1)}function l(c,u,h){if(h===0)return;let f,p;if(s)f=n,p="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](r,c,u,h),t.update(u,r,h)}this.setMode=a,this.render=o,this.renderInstances=l}function dS(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(P){if(P==="highp"){if(n.getShaderPrecisionFormat(35633,36338).precision>0&&n.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(35633,36337).precision>0&&n.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&n instanceof WebGL2ComputeRenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(34930),f=n.getParameter(35660),p=n.getParameter(3379),v=n.getParameter(34076),m=n.getParameter(34921),d=n.getParameter(36347),g=n.getParameter(36348),b=n.getParameter(36349),S=f>0,y=a||e.has("OES_texture_float"),w=S&&y,A=a?n.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:v,maxAttributes:m,maxVertexUniforms:d,maxVaryings:g,maxFragmentUniforms:b,vertexTextures:S,floatFragmentTextures:y,floatVertexTextures:w,maxSamples:A}}function pS(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Qi,o=new ln,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,p){const v=h.length!==0||f||i!==0||s;return s=f,t=u(h,p,0),i=h.length,v},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1,c()},this.setState=function(h,f,p){const v=h.clippingPlanes,m=h.clipIntersection,d=h.clipShadows,g=n.get(h);if(!s||v===null||v.length===0||r&&!d)r?u(null):c();else{const b=r?0:i,S=b*4;let y=g.clippingState||null;l.value=y,y=u(v,f,S,p);for(let w=0;w!==S;++w)y[w]=t[w];g.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,v){const m=h!==null?h.length:0;let d=null;if(m!==0){if(d=l.value,v!==!0||d===null){const g=p+m*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(d===null||d.length<g)&&(d=new Float32Array(g));for(let S=0,y=p;S!==m;++S,y+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(d,y),d[y+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function mS(n){let e=new WeakMap;function t(a,o){return o===dc?a.mapping=er:o===pc&&(a.mapping=tr),a}function i(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===dc||o===pc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Cy(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class xa extends Im{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Bs=4,xf=[.125,.215,.35,.446,.526,.582],es=20,Ul=new xa,yf=new Ve;let Bl=null;const Ji=(1+Math.sqrt(5))/2,Ps=1/Ji,bf=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Ji,Ps),new U(0,Ji,-Ps),new U(Ps,0,Ji),new U(-Ps,0,Ji),new U(Ji,Ps,0),new U(-Ji,Ps,0)];class Mf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Bl=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bl),e.scissorTest=!1,Ka(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===er||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bl=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:ta,format:_n,encoding:hs,depthBuffer:!1},s=Sf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sf(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gS(r)),this._blurMaterial=_S(r,e,t)}return s}_compileMaterial(e){const t=new Zt(this._lodPlanes[0],e);this._renderer.compile(t,Ul)}_sceneToCubeUV(e,t,i,s){const o=new Yt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(yf),u.toneMapping=ui,u.autoClear=!1;const p=new oi({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1}),v=new Zt(new va,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(yf),m=!0);for(let g=0;g<6;g++){const b=g%3;b===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):b===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));const S=this._cubeSize;Ka(s,b*S,g>2?S:0,S,S),u.setRenderTarget(s),m&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===er||e.mapping===tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ef()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Zt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ka(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ul)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=bf[(s-1)%bf.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Zt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*es-1),m=r/v,d=isFinite(r)?1+Math.floor(u*m):es;d>es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${es}`);const g=[];let b=0;for(let P=0;P<es;++P){const M=P/m,I=Math.exp(-M*M/2);g.push(I),P===0?b+=I:P<d&&(b+=2*I)}for(let P=0;P<g.length;P++)g[P]=g[P]/b;f.envMap.value=e.texture,f.samples.value=d,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=v,f.mipInt.value=S-i;const y=this._sizeLods[s],w=3*y*(s>S-Bs?s-S+Bs:0),A=4*(this._cubeSize-y);Ka(t,w,A,3*y,2*y),l.setRenderTarget(t),l.render(h,Ul)}}function gS(n){const e=[],t=[],i=[];let s=n;const r=n-Bs+1+xf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Bs?l=xf[a-n+Bs-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,v=6,m=3,d=2,g=1,b=new Float32Array(m*v*p),S=new Float32Array(d*v*p),y=new Float32Array(g*v*p);for(let A=0;A<p;A++){const P=A%3*2/3-1,M=A>2?0:-1,I=[P,M,0,P+2/3,M,0,P+2/3,M+1,0,P,M,0,P+2/3,M+1,0,P,M+1,0];b.set(I,m*v*A),S.set(f,d*v*A);const O=[A,A,A,A,A,A];y.set(O,g*v*A)}const w=new un;w.setAttribute("position",new qt(b,m)),w.setAttribute("uv",new qt(S,d)),w.setAttribute("faceIndex",new qt(y,g)),e.push(w),s>Bs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Sf(n,e,t){const i=new bn(n,e,t);return i.texture.mapping=Ho,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ka(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function _S(n,e,t){const i=new Float32Array(es),s=new U(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function wf(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Ef(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function cu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===dc||l===pc,u=l===er||l===tr;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Mf(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new Mf(n));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function xS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function yS(n,e,t,i){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const v in f)e.update(f[v],34962);const p=h.morphAttributes;for(const v in p){const m=p[v];for(let d=0,g=m.length;d<g;d++)e.update(m[d],34962)}}function c(h){const f=[],p=h.index,v=h.attributes.position;let m=0;if(p!==null){const b=p.array;m=p.version;for(let S=0,y=b.length;S<y;S+=3){const w=b[S+0],A=b[S+1],P=b[S+2];f.push(w,A,A,P,P,w)}}else{const b=v.array;m=v.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const w=S+0,A=S+1,P=S+2;f.push(w,A,A,P,P,w)}}const d=new(Mm(f)?Lm:Cm)(f,1);d.version=m;const g=r.get(h);g&&e.remove(g),r.set(h,d)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function bS(n,e,t,i){const s=i.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,p){n.drawElements(r,p,o,f*l),t.update(p,r,1)}function h(f,p,v){if(v===0)return;let m,d;if(s)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,p,o,f*l,v),t.update(p,r,v)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function MS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(r/3);break;case 1:t.lines+=o*(r/2);break;case 3:t.lines+=o*(r-1);break;case 2:t.lines+=o*r;break;case 0:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function SS(n,e){return n[0]-e[0]}function wS(n,e){return Math.abs(e[1])-Math.abs(n[1])}function ES(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new at,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h,f){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,d=m!==void 0?m.length:0;let g=r.get(u);if(g===void 0||g.count!==d){let re=function(){V.dispose(),r.delete(u),u.removeEventListener("dispose",re)};var v=re;g!==void 0&&g.texture.dispose();const y=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,A=u.morphAttributes.color!==void 0,P=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let O=0;y===!0&&(O=1),w===!0&&(O=2),A===!0&&(O=3);let Q=u.attributes.position.count*O,ue=1;Q>e.maxTextureSize&&(ue=Math.ceil(Q/e.maxTextureSize),Q=e.maxTextureSize);const H=new Float32Array(Q*ue*4*d),V=new Tm(H,Q,ue,d);V.type=Ii,V.needsUpdate=!0;const te=O*4;for(let ne=0;ne<d;ne++){const G=P[ne],pe=M[ne],ce=I[ne],X=Q*ue*4*ne;for(let Y=0;Y<G.count;Y++){const fe=Y*te;y===!0&&(a.fromBufferAttribute(G,Y),H[X+fe+0]=a.x,H[X+fe+1]=a.y,H[X+fe+2]=a.z,H[X+fe+3]=0),w===!0&&(a.fromBufferAttribute(pe,Y),H[X+fe+4]=a.x,H[X+fe+5]=a.y,H[X+fe+6]=a.z,H[X+fe+7]=0),A===!0&&(a.fromBufferAttribute(ce,Y),H[X+fe+8]=a.x,H[X+fe+9]=a.y,H[X+fe+10]=a.z,H[X+fe+11]=ce.itemSize===4?a.w:1)}}g={count:d,texture:V,size:new Ue(Q,ue)},r.set(u,g),u.addEventListener("dispose",re)}let b=0;for(let y=0;y<p.length;y++)b+=p[y];const S=u.morphTargetsRelative?1:1-b;f.getUniforms().setValue(n,"morphTargetBaseInfluence",S),f.getUniforms().setValue(n,"morphTargetInfluences",p),f.getUniforms().setValue(n,"morphTargetsTexture",g.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const m=p===void 0?0:p.length;let d=i[u.id];if(d===void 0||d.length!==m){d=[];for(let w=0;w<m;w++)d[w]=[w,0];i[u.id]=d}for(let w=0;w<m;w++){const A=d[w];A[0]=w,A[1]=p[w]}d.sort(wS);for(let w=0;w<8;w++)w<m&&d[w][1]?(o[w][0]=d[w][0],o[w][1]=d[w][1]):(o[w][0]=Number.MAX_SAFE_INTEGER,o[w][1]=0);o.sort(SS);const g=u.morphAttributes.position,b=u.morphAttributes.normal;let S=0;for(let w=0;w<8;w++){const A=o[w],P=A[0],M=A[1];P!==Number.MAX_SAFE_INTEGER&&M?(g&&u.getAttribute("morphTarget"+w)!==g[P]&&u.setAttribute("morphTarget"+w,g[P]),b&&u.getAttribute("morphNormal"+w)!==b[P]&&u.setAttribute("morphNormal"+w,b[P]),s[w]=M,S+=M):(g&&u.hasAttribute("morphTarget"+w)===!0&&u.deleteAttribute("morphTarget"+w),b&&u.hasAttribute("morphNormal"+w)===!0&&u.deleteAttribute("morphNormal"+w),s[w]=0)}const y=u.morphTargetsRelative?1:1-S;f.getUniforms().setValue(n,"morphTargetBaseInfluence",y),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function TS(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);return s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Nm=new Pt,Om=new Tm,Fm=new dy,km=new Pm,Tf=[],Af=[],Cf=new Float32Array(16),Lf=new Float32Array(9),Rf=new Float32Array(4);function _r(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Tf[s];if(r===void 0&&(r=new Float32Array(s),Tf[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Et(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Go(n,e){let t=Af[e];t===void 0&&(t=new Int32Array(e),Af[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function AS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function CS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function LS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function RS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function IS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Rf.set(i),n.uniformMatrix2fv(this.addr,!1,Rf),Tt(t,i)}}function PS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Lf.set(i),n.uniformMatrix3fv(this.addr,!1,Lf),Tt(t,i)}}function DS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,i))return;Cf.set(i),n.uniformMatrix4fv(this.addr,!1,Cf),Tt(t,i)}}function NS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function OS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function FS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function kS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function US(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function BS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function VS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function zS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function HS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2D(e||Nm,s)}function WS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Fm,s)}function GS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||km,s)}function jS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Om,s)}function XS(n){switch(n){case 5126:return AS;case 35664:return CS;case 35665:return LS;case 35666:return RS;case 35674:return IS;case 35675:return PS;case 35676:return DS;case 5124:case 35670:return NS;case 35667:case 35671:return OS;case 35668:case 35672:return FS;case 35669:case 35673:return kS;case 5125:return US;case 36294:return BS;case 36295:return VS;case 36296:return zS;case 35678:case 36198:case 36298:case 36306:case 35682:return HS;case 35679:case 36299:case 36307:return WS;case 35680:case 36300:case 36308:case 36293:return GS;case 36289:case 36303:case 36311:case 36292:return jS}}function YS(n,e){n.uniform1fv(this.addr,e)}function qS(n,e){const t=_r(e,this.size,2);n.uniform2fv(this.addr,t)}function $S(n,e){const t=_r(e,this.size,3);n.uniform3fv(this.addr,t)}function KS(n,e){const t=_r(e,this.size,4);n.uniform4fv(this.addr,t)}function QS(n,e){const t=_r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function JS(n,e){const t=_r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ZS(n,e){const t=_r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ew(n,e){n.uniform1iv(this.addr,e)}function tw(n,e){n.uniform2iv(this.addr,e)}function nw(n,e){n.uniform3iv(this.addr,e)}function iw(n,e){n.uniform4iv(this.addr,e)}function sw(n,e){n.uniform1uiv(this.addr,e)}function rw(n,e){n.uniform2uiv(this.addr,e)}function aw(n,e){n.uniform3uiv(this.addr,e)}function ow(n,e){n.uniform4uiv(this.addr,e)}function lw(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Nm,r[a])}function cw(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Fm,r[a])}function uw(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||km,r[a])}function hw(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);Et(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Om,r[a])}function fw(n){switch(n){case 5126:return YS;case 35664:return qS;case 35665:return $S;case 35666:return KS;case 35674:return QS;case 35675:return JS;case 35676:return ZS;case 5124:case 35670:return ew;case 35667:case 35671:return tw;case 35668:case 35672:return nw;case 35669:case 35673:return iw;case 5125:return sw;case 36294:return rw;case 36295:return aw;case 36296:return ow;case 35678:case 36198:case 36298:case 36306:case 35682:return lw;case 35679:case 36299:case 36307:return cw;case 35680:case 36300:case 36308:case 36293:return uw;case 36289:case 36303:case 36311:case 36292:return hw}}class dw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=XS(t.type)}}class pw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=fw(t.type)}}class mw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Vl=/(\w+)(\])?(\[|\.)?/g;function If(n,e){n.seq.push(e),n.map[e.id]=e}function gw(n,e,t){const i=n.name,s=i.length;for(Vl.lastIndex=0;;){const r=Vl.exec(i),a=Vl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){If(t,c===void 0?new dw(o,n,e):new pw(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new mw(o),If(t,h)),t=h}}}class mo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,35718);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);gw(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Pf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}let _w=0;function vw(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function xw(n){switch(n){case hs:return["Linear","( value )"];case rt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}}function Df(n,e,t){const i=n.getShaderParameter(e,35713),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+vw(n.getShaderSource(e),a)}else return s}function yw(n,e){const t=xw(e);return"vec4 "+n+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function bw(n,e){let t;switch(e){case Tx:t="Linear";break;case Ax:t="Reinhard";break;case Cx:t="OptimizedCineon";break;case Lx:t="ACESFilmic";break;case Rx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mw(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.tangentSpaceNormalMap||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fr).join(`
`)}function Sw(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ww(n,e){const t={},i=n.getProgramParameter(e,35721);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Fr(n){return n!==""}function Nf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Of(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ew=/^[ \t]*#include +<([\w\d./]+)>/gm;function yc(n){return n.replace(Ew,Tw)}function Tw(n,e){const t=ze[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return yc(t)}const Aw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ff(n){return n.replace(Aw,Cw)}function Cw(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kf(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Lw(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===dm?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===sx?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Or&&(e="SHADOWMAP_TYPE_VSM"),e}function Rw(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case er:case tr:e="ENVMAP_TYPE_CUBE";break;case Ho:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Iw(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case tr:e="ENVMAP_MODE_REFRACTION";break}return e}function Pw(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case gm:e="ENVMAP_BLENDING_MULTIPLY";break;case wx:e="ENVMAP_BLENDING_MIX";break;case Ex:e="ENVMAP_BLENDING_ADD";break}return e}function Dw(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Nw(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Lw(t),c=Rw(t),u=Iw(t),h=Pw(t),f=Dw(t),p=t.isWebGL2?"":Mw(t),v=Sw(r),m=s.createProgram();let d,g,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=[v].filter(Fr).join(`
`),d.length>0&&(d+=`
`),g=[p,v].filter(Fr).join(`
`),g.length>0&&(g+=`
`)):(d=[kf(t),"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fr).join(`
`),g=[p,kf(t),"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?ze.tonemapping_pars_fragment:"",t.toneMapping!==ui?bw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.encodings_pars_fragment,yw("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fr).join(`
`)),a=yc(a),a=Nf(a,t),a=Of(a,t),o=yc(o),o=Nf(o,t),o=Of(o,t),a=Ff(a),o=Ff(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===of?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===of?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=b+d+a,y=b+g+o,w=Pf(s,35633,S),A=Pf(s,35632,y);if(s.attachShader(m,w),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m),n.debug.checkShaderErrors){const I=s.getProgramInfoLog(m).trim(),O=s.getShaderInfoLog(w).trim(),Q=s.getShaderInfoLog(A).trim();let ue=!0,H=!0;if(s.getProgramParameter(m,35714)===!1){ue=!1;const V=Df(s,w,"vertex"),te=Df(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,35715)+`

Program Info Log: `+I+`
`+V+`
`+te)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(O===""||Q==="")&&(H=!1);H&&(this.diagnostics={runnable:ue,programLog:I,vertexShader:{log:O,prefix:d},fragmentShader:{log:Q,prefix:g}})}s.deleteShader(w),s.deleteShader(A);let P;this.getUniforms=function(){return P===void 0&&(P=new mo(s,m)),P};let M;return this.getAttributes=function(){return M===void 0&&(M=ww(s,m)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=_w++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Ow=0;class Fw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new kw(e),t.set(e,i)),i}}class kw{constructor(e){this.id=Ow++,this.code=e,this.usedTimes=0}}function Uw(n,e,t,i,s,r,a){const o=new Am,l=new Fw,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(M,I,O,Q,ue){const H=Q.fog,V=ue.geometry,te=M.isMeshStandardMaterial?Q.environment:null,re=(M.isMeshStandardMaterial?t:e).get(M.envMap||te),ne=re&&re.mapping===Ho?re.image.height:null,G=v[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const pe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ce=pe!==void 0?pe.length:0;let X=0;V.morphAttributes.position!==void 0&&(X=1),V.morphAttributes.normal!==void 0&&(X=2),V.morphAttributes.color!==void 0&&(X=3);let Y,fe,me,xe;if(G){const Ee=Bn[G];Y=Ee.vertexShader,fe=Ee.fragmentShader}else Y=M.vertexShader,fe=M.fragmentShader,l.update(M),me=l.getVertexShaderID(M),xe=l.getFragmentShaderID(M);const q=n.getRenderTarget(),W=M.alphaTest>0,J=M.clearcoat>0,ie=M.iridescence>0;return{isWebGL2:u,shaderID:G,shaderName:M.type,vertexShader:Y,fragmentShader:fe,defines:M.defines,customVertexShaderID:me,customFragmentShaderID:xe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,instancing:ue.isInstancedMesh===!0,instancingColor:ue.isInstancedMesh===!0&&ue.instanceColor!==null,supportsVertexTextures:f,outputEncoding:q===null?n.outputEncoding:q.isXRRenderTarget===!0?q.texture.encoding:hs,map:!!M.map,matcap:!!M.matcap,envMap:!!re,envMapMode:re&&re.mapping,envMapCubeUVHeight:ne,lightMap:!!M.lightMap,aoMap:!!M.aoMap,emissiveMap:!!M.emissiveMap,bumpMap:!!M.bumpMap,normalMap:!!M.normalMap,objectSpaceNormalMap:M.normalMapType===Kx,tangentSpaceNormalMap:M.normalMapType===su,decodeVideoTexture:!!M.map&&M.map.isVideoTexture===!0&&M.map.encoding===rt,clearcoat:J,clearcoatMap:J&&!!M.clearcoatMap,clearcoatRoughnessMap:J&&!!M.clearcoatRoughnessMap,clearcoatNormalMap:J&&!!M.clearcoatNormalMap,iridescence:ie,iridescenceMap:ie&&!!M.iridescenceMap,iridescenceThicknessMap:ie&&!!M.iridescenceThicknessMap,displacementMap:!!M.displacementMap,roughnessMap:!!M.roughnessMap,metalnessMap:!!M.metalnessMap,specularMap:!!M.specularMap,specularIntensityMap:!!M.specularIntensityMap,specularColorMap:!!M.specularColorMap,opaque:M.transparent===!1&&M.blending===Ys,alphaMap:!!M.alphaMap,alphaTest:W,gradientMap:!!M.gradientMap,sheen:M.sheen>0,sheenColorMap:!!M.sheenColorMap,sheenRoughnessMap:!!M.sheenRoughnessMap,transmission:M.transmission>0,transmissionMap:!!M.transmissionMap,thicknessMap:!!M.thicknessMap,combine:M.combine,vertexTangents:!!M.normalMap&&!!V.attributes.tangent,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUvs:!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatMap||!!M.clearcoatRoughnessMap||!!M.clearcoatNormalMap||!!M.iridescenceMap||!!M.iridescenceThicknessMap||!!M.displacementMap||!!M.transmissionMap||!!M.thicknessMap||!!M.specularIntensityMap||!!M.specularColorMap||!!M.sheenColorMap||!!M.sheenRoughnessMap,uvsVertexOnly:!(M.map||M.bumpMap||M.normalMap||M.specularMap||M.alphaMap||M.emissiveMap||M.roughnessMap||M.metalnessMap||M.clearcoatNormalMap||M.iridescenceMap||M.iridescenceThicknessMap||M.transmission>0||M.transmissionMap||M.thicknessMap||M.specularIntensityMap||M.specularColorMap||M.sheen>0||M.sheenColorMap||M.sheenRoughnessMap)&&!!M.displacementMap,fog:!!H,useFog:M.fog===!0,fogExp2:H&&H.isFogExp2,flatShading:!!M.flatShading,sizeAttenuation:M.sizeAttenuation,logarithmicDepthBuffer:h,skinning:ue.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:X,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&O.length>0,shadowMapType:n.shadowMap.type,toneMapping:M.toneMapped?n.toneMapping:ui,physicallyCorrectLights:n.physicallyCorrectLights,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ri,flipSided:M.side===yn,useDepthPacking:!!M.depthPacking,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:M.extensions&&M.extensions.derivatives,extensionFragDepth:M.extensions&&M.extensions.fragDepth,extensionDrawBuffers:M.extensions&&M.extensions.drawBuffers,extensionShaderTextureLOD:M.extensions&&M.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const I=[];if(M.shaderID?I.push(M.shaderID):(I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID)),M.defines!==void 0)for(const O in M.defines)I.push(O),I.push(M.defines[O]);return M.isRawShaderMaterial===!1&&(g(I,M),b(I,M),I.push(n.outputEncoding)),I.push(M.customProgramCacheKey),I.join()}function g(M,I){M.push(I.precision),M.push(I.outputEncoding),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.combine),M.push(I.vertexUvs),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function b(M,I){o.disableAll(),I.isWebGL2&&o.enable(0),I.supportsVertexTextures&&o.enable(1),I.instancing&&o.enable(2),I.instancingColor&&o.enable(3),I.map&&o.enable(4),I.matcap&&o.enable(5),I.envMap&&o.enable(6),I.lightMap&&o.enable(7),I.aoMap&&o.enable(8),I.emissiveMap&&o.enable(9),I.bumpMap&&o.enable(10),I.normalMap&&o.enable(11),I.objectSpaceNormalMap&&o.enable(12),I.tangentSpaceNormalMap&&o.enable(13),I.clearcoat&&o.enable(14),I.clearcoatMap&&o.enable(15),I.clearcoatRoughnessMap&&o.enable(16),I.clearcoatNormalMap&&o.enable(17),I.iridescence&&o.enable(18),I.iridescenceMap&&o.enable(19),I.iridescenceThicknessMap&&o.enable(20),I.displacementMap&&o.enable(21),I.specularMap&&o.enable(22),I.roughnessMap&&o.enable(23),I.metalnessMap&&o.enable(24),I.gradientMap&&o.enable(25),I.alphaMap&&o.enable(26),I.alphaTest&&o.enable(27),I.vertexColors&&o.enable(28),I.vertexAlphas&&o.enable(29),I.vertexUvs&&o.enable(30),I.vertexTangents&&o.enable(31),I.uvsVertexOnly&&o.enable(32),M.push(o.mask),o.disableAll(),I.fog&&o.enable(0),I.useFog&&o.enable(1),I.flatShading&&o.enable(2),I.logarithmicDepthBuffer&&o.enable(3),I.skinning&&o.enable(4),I.morphTargets&&o.enable(5),I.morphNormals&&o.enable(6),I.morphColors&&o.enable(7),I.premultipliedAlpha&&o.enable(8),I.shadowMapEnabled&&o.enable(9),I.physicallyCorrectLights&&o.enable(10),I.doubleSided&&o.enable(11),I.flipSided&&o.enable(12),I.useDepthPacking&&o.enable(13),I.dithering&&o.enable(14),I.specularIntensityMap&&o.enable(15),I.specularColorMap&&o.enable(16),I.transmission&&o.enable(17),I.transmissionMap&&o.enable(18),I.thicknessMap&&o.enable(19),I.sheen&&o.enable(20),I.sheenColorMap&&o.enable(21),I.sheenRoughnessMap&&o.enable(22),I.decodeVideoTexture&&o.enable(23),I.opaque&&o.enable(24),M.push(o.mask)}function S(M){const I=v[M.type];let O;if(I){const Q=Bn[I];O=Wo.clone(Q.uniforms)}else O=M.uniforms;return O}function y(M,I){let O;for(let Q=0,ue=c.length;Q<ue;Q++){const H=c[Q];if(H.cacheKey===I){O=H,++O.usedTimes;break}}return O===void 0&&(O=new Nw(n,I,M,r),c.push(O)),O}function w(M){if(--M.usedTimes===0){const I=c.indexOf(M);c[I]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:y,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:P}}function Bw(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function Vw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Uf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bf(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h,f,p,v,m,d){let g=n[e];return g===void 0?(g={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:m,group:d},n[e]=g):(g.id=h.id,g.object=h,g.geometry=f,g.material=p,g.groupOrder=v,g.renderOrder=h.renderOrder,g.z=m,g.group=d),e++,g}function o(h,f,p,v,m,d){const g=a(h,f,p,v,m,d);p.transmission>0?i.push(g):p.transparent===!0?s.push(g):t.push(g)}function l(h,f,p,v,m,d){const g=a(h,f,p,v,m,d);p.transmission>0?i.unshift(g):p.transparent===!0?s.unshift(g):t.unshift(g)}function c(h,f){t.length>1&&t.sort(h||Vw),i.length>1&&i.sort(f||Uf),s.length>1&&s.sort(f||Uf)}function u(){for(let h=e,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function zw(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Bf,n.set(i,[a])):s>=r.length?(a=new Bf,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Hw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ve};break;case"SpotLight":t={position:new U,direction:new U,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function Ww(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Gw=0;function jw(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Xw(n,e){const t=new Hw,i=Ww(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)s.probe.push(new U);const r=new U,a=new je,o=new je;function l(u,h){let f=0,p=0,v=0;for(let Q=0;Q<9;Q++)s.probe[Q].set(0,0,0);let m=0,d=0,g=0,b=0,S=0,y=0,w=0,A=0,P=0,M=0;u.sort(jw);const I=h!==!0?Math.PI:1;for(let Q=0,ue=u.length;Q<ue;Q++){const H=u[Q],V=H.color,te=H.intensity,re=H.distance,ne=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)f+=V.r*te*I,p+=V.g*te*I,v+=V.b*te*I;else if(H.isLightProbe)for(let G=0;G<9;G++)s.probe[G].addScaledVector(H.sh.coefficients[G],te);else if(H.isDirectionalLight){const G=t.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity*I),H.castShadow){const pe=H.shadow,ce=i.get(H);ce.shadowBias=pe.bias,ce.shadowNormalBias=pe.normalBias,ce.shadowRadius=pe.radius,ce.shadowMapSize=pe.mapSize,s.directionalShadow[m]=ce,s.directionalShadowMap[m]=ne,s.directionalShadowMatrix[m]=H.shadow.matrix,y++}s.directional[m]=G,m++}else if(H.isSpotLight){const G=t.get(H);G.position.setFromMatrixPosition(H.matrixWorld),G.color.copy(V).multiplyScalar(te*I),G.distance=re,G.coneCos=Math.cos(H.angle),G.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),G.decay=H.decay,s.spot[g]=G;const pe=H.shadow;if(H.map&&(s.spotLightMap[P]=H.map,P++,pe.updateMatrices(H),H.castShadow&&M++),s.spotLightMatrix[g]=pe.matrix,H.castShadow){const ce=i.get(H);ce.shadowBias=pe.bias,ce.shadowNormalBias=pe.normalBias,ce.shadowRadius=pe.radius,ce.shadowMapSize=pe.mapSize,s.spotShadow[g]=ce,s.spotShadowMap[g]=ne,A++}g++}else if(H.isRectAreaLight){const G=t.get(H);G.color.copy(V).multiplyScalar(te),G.halfWidth.set(H.width*.5,0,0),G.halfHeight.set(0,H.height*.5,0),s.rectArea[b]=G,b++}else if(H.isPointLight){const G=t.get(H);if(G.color.copy(H.color).multiplyScalar(H.intensity*I),G.distance=H.distance,G.decay=H.decay,H.castShadow){const pe=H.shadow,ce=i.get(H);ce.shadowBias=pe.bias,ce.shadowNormalBias=pe.normalBias,ce.shadowRadius=pe.radius,ce.shadowMapSize=pe.mapSize,ce.shadowCameraNear=pe.camera.near,ce.shadowCameraFar=pe.camera.far,s.pointShadow[d]=ce,s.pointShadowMap[d]=ne,s.pointShadowMatrix[d]=H.shadow.matrix,w++}s.point[d]=G,d++}else if(H.isHemisphereLight){const G=t.get(H);G.skyColor.copy(H.color).multiplyScalar(te*I),G.groundColor.copy(H.groundColor).multiplyScalar(te*I),s.hemi[S]=G,S++}}b>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_FLOAT_1,s.rectAreaLTC2=ye.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ye.LTC_HALF_1,s.rectAreaLTC2=ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=v;const O=s.hash;(O.directionalLength!==m||O.pointLength!==d||O.spotLength!==g||O.rectAreaLength!==b||O.hemiLength!==S||O.numDirectionalShadows!==y||O.numPointShadows!==w||O.numSpotShadows!==A||O.numSpotMaps!==P)&&(s.directional.length=m,s.spot.length=g,s.rectArea.length=b,s.point.length=d,s.hemi.length=S,s.directionalShadow.length=y,s.directionalShadowMap.length=y,s.pointShadow.length=w,s.pointShadowMap.length=w,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=y,s.pointShadowMatrix.length=w,s.spotLightMatrix.length=A+P-M,s.spotLightMap.length=P,s.numSpotLightShadowsWithMaps=M,O.directionalLength=m,O.pointLength=d,O.spotLength=g,O.rectAreaLength=b,O.hemiLength=S,O.numDirectionalShadows=y,O.numPointShadows=w,O.numSpotShadows=A,O.numSpotMaps=P,s.version=Gw++)}function c(u,h){let f=0,p=0,v=0,m=0,d=0;const g=h.matrixWorldInverse;for(let b=0,S=u.length;b<S;b++){const y=u[b];if(y.isDirectionalLight){const w=s.directional[f];w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),f++}else if(y.isSpotLight){const w=s.spot[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),v++}else if(y.isRectAreaLight){const w=s.rectArea[m];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),o.identity(),a.copy(y.matrixWorld),a.premultiply(g),o.extractRotation(a),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const w=s.point[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),p++}else if(y.isHemisphereLight){const w=s.hemi[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),d++}}}return{setup:l,setupView:c,state:s}}function Vf(n,e){const t=new Xw(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Yw(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Vf(n,e),t.set(r,[l])):a>=o.length?(l=new Vf(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class qw extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $w extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new U,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Kw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jw(n,e,t){let i=new ou;const s=new Ue,r=new Ue,a=new at,o=new qw({depthPacking:$x}),l=new $w,c={},u=t.maxTextureSize,h={0:yn,1:cs,2:ri},f=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Kw,fragmentShader:Qw}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new un;v.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new Zt(v,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dm,this.render=function(y,w,A){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||y.length===0)return;const P=n.getRenderTarget(),M=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Ni),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);for(let Q=0,ue=y.length;Q<ue;Q++){const H=y[Q],V=H.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const te=V.getFrameExtents();if(s.multiply(te),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,V.mapSize.y=r.y)),V.map===null){const ne=this.type!==Or?{minFilter:pt,magFilter:pt}:{};V.map=new bn(s.x,s.y,ne),V.map.texture.name=H.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const re=V.getViewportCount();for(let ne=0;ne<re;ne++){const G=V.getViewport(ne);a.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),O.viewport(a),V.updateMatrices(H,ne),i=V.getFrustum(),S(w,A,V.camera,H,this.type)}V.isPointLightShadow!==!0&&this.type===Or&&g(V,A),V.needsUpdate=!1}d.needsUpdate=!1,n.setRenderTarget(P,M,I)};function g(y,w){const A=e.update(m);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new bn(s.x,s.y)),f.uniforms.shadow_pass.value=y.map.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(w,null,A,f,m,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(w,null,A,p,m,null)}function b(y,w,A,P,M,I){let O=null;const Q=A.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(Q!==void 0?O=Q:O=A.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const ue=O.uuid,H=w.uuid;let V=c[ue];V===void 0&&(V={},c[ue]=V);let te=V[H];te===void 0&&(te=O.clone(),V[H]=te),O=te}return O.visible=w.visible,O.wireframe=w.wireframe,I===Or?O.side=w.shadowSide!==null?w.shadowSide:w.side:O.side=w.shadowSide!==null?w.shadowSide:h[w.side],O.alphaMap=w.alphaMap,O.alphaTest=w.alphaTest,O.map=w.map,O.clipShadows=w.clipShadows,O.clippingPlanes=w.clippingPlanes,O.clipIntersection=w.clipIntersection,O.displacementMap=w.displacementMap,O.displacementScale=w.displacementScale,O.displacementBias=w.displacementBias,O.wireframeLinewidth=w.wireframeLinewidth,O.linewidth=w.linewidth,A.isPointLight===!0&&O.isMeshDistanceMaterial===!0&&(O.referencePosition.setFromMatrixPosition(A.matrixWorld),O.nearDistance=P,O.farDistance=M),O}function S(y,w,A,P,M){if(y.visible===!1)return;if(y.layers.test(w.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===Or)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,y.matrixWorld);const Q=e.update(y),ue=y.material;if(Array.isArray(ue)){const H=Q.groups;for(let V=0,te=H.length;V<te;V++){const re=H[V],ne=ue[re.materialIndex];if(ne&&ne.visible){const G=b(y,ne,P,A.near,A.far,M);n.renderBufferDirect(A,null,Q,G,y,re)}}}else if(ue.visible){const H=b(y,ue,P,A.near,A.far,M);n.renderBufferDirect(A,null,Q,H,y,null)}}const O=y.children;for(let Q=0,ue=O.length;Q<ue;Q++)S(O[Q],w,A,P,M)}}function Zw(n,e,t){const i=t.isWebGL2;function s(){let k=!1;const ae=new at;let ve=null;const Te=new at(0,0,0,0);return{setMask:function(Ie){ve!==Ie&&!k&&(n.colorMask(Ie,Ie,Ie,Ie),ve=Ie)},setLocked:function(Ie){k=Ie},setClear:function(Ie,tt,At,Ot,zi){zi===!0&&(Ie*=Ot,tt*=Ot,At*=Ot),ae.set(Ie,tt,At,Ot),Te.equals(ae)===!1&&(n.clearColor(Ie,tt,At,Ot),Te.copy(ae))},reset:function(){k=!1,ve=null,Te.set(-1,0,0,0)}}}function r(){let k=!1,ae=null,ve=null,Te=null;return{setTest:function(Ie){Ie?W(2929):J(2929)},setMask:function(Ie){ae!==Ie&&!k&&(n.depthMask(Ie),ae=Ie)},setFunc:function(Ie){if(ve!==Ie){switch(Ie){case _x:n.depthFunc(512);break;case vx:n.depthFunc(519);break;case xx:n.depthFunc(513);break;case fc:n.depthFunc(515);break;case yx:n.depthFunc(514);break;case bx:n.depthFunc(518);break;case Mx:n.depthFunc(516);break;case Sx:n.depthFunc(517);break;default:n.depthFunc(515)}ve=Ie}},setLocked:function(Ie){k=Ie},setClear:function(Ie){Te!==Ie&&(n.clearDepth(Ie),Te=Ie)},reset:function(){k=!1,ae=null,ve=null,Te=null}}}function a(){let k=!1,ae=null,ve=null,Te=null,Ie=null,tt=null,At=null,Ot=null,zi=null;return{setTest:function(ut){k||(ut?W(2960):J(2960))},setMask:function(ut){ae!==ut&&!k&&(n.stencilMask(ut),ae=ut)},setFunc:function(ut,Yn,hn){(ve!==ut||Te!==Yn||Ie!==hn)&&(n.stencilFunc(ut,Yn,hn),ve=ut,Te=Yn,Ie=hn)},setOp:function(ut,Yn,hn){(tt!==ut||At!==Yn||Ot!==hn)&&(n.stencilOp(ut,Yn,hn),tt=ut,At=Yn,Ot=hn)},setLocked:function(ut){k=ut},setClear:function(ut){zi!==ut&&(n.clearStencil(ut),zi=ut)},reset:function(){k=!1,ae=null,ve=null,Te=null,Ie=null,tt=null,At=null,Ot=null,zi=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,h=new WeakMap;let f={},p={},v=new WeakMap,m=[],d=null,g=!1,b=null,S=null,y=null,w=null,A=null,P=null,M=null,I=!1,O=null,Q=null,ue=null,H=null,V=null;const te=n.getParameter(35661);let re=!1,ne=0;const G=n.getParameter(7938);G.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(G)[1]),re=ne>=1):G.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),re=ne>=2);let pe=null,ce={};const X=n.getParameter(3088),Y=n.getParameter(2978),fe=new at().fromArray(X),me=new at().fromArray(Y);function xe(k,ae,ve){const Te=new Uint8Array(4),Ie=n.createTexture();n.bindTexture(k,Ie),n.texParameteri(k,10241,9728),n.texParameteri(k,10240,9728);for(let tt=0;tt<ve;tt++)n.texImage2D(ae+tt,0,6408,1,1,0,6408,5121,Te);return Ie}const q={};q[3553]=xe(3553,3553,1),q[34067]=xe(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),W(2929),l.setFunc(fc),N(!1),B(Rh),W(2884),x(Ni);function W(k){f[k]!==!0&&(n.enable(k),f[k]=!0)}function J(k){f[k]!==!1&&(n.disable(k),f[k]=!1)}function ie(k,ae){return p[k]!==ae?(n.bindFramebuffer(k,ae),p[k]=ae,i&&(k===36009&&(p[36160]=ae),k===36160&&(p[36009]=ae)),!0):!1}function ee(k,ae){let ve=m,Te=!1;if(k)if(ve=v.get(ae),ve===void 0&&(ve=[],v.set(ae,ve)),k.isWebGLMultipleRenderTargets){const Ie=k.texture;if(ve.length!==Ie.length||ve[0]!==36064){for(let tt=0,At=Ie.length;tt<At;tt++)ve[tt]=36064+tt;ve.length=Ie.length,Te=!0}}else ve[0]!==36064&&(ve[0]=36064,Te=!0);else ve[0]!==1029&&(ve[0]=1029,Te=!0);Te&&(t.isWebGL2?n.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function Ee(k){return d!==k?(n.useProgram(k),d=k,!0):!1}const Me={[Os]:32774,[ax]:32778,[ox]:32779};if(i)Me[Nh]=32775,Me[Oh]=32776;else{const k=e.get("EXT_blend_minmax");k!==null&&(Me[Nh]=k.MIN_EXT,Me[Oh]=k.MAX_EXT)}const _={[lx]:0,[cx]:1,[ux]:768,[pm]:770,[gx]:776,[px]:774,[fx]:772,[hx]:769,[mm]:771,[mx]:775,[dx]:773};function x(k,ae,ve,Te,Ie,tt,At,Ot){if(k===Ni){g===!0&&(J(3042),g=!1);return}if(g===!1&&(W(3042),g=!0),k!==rx){if(k!==b||Ot!==I){if((S!==Os||A!==Os)&&(n.blendEquation(32774),S=Os,A=Os),Ot)switch(k){case Ys:n.blendFuncSeparate(1,771,1,771);break;case Ih:n.blendFunc(1,1);break;case Ph:n.blendFuncSeparate(0,769,0,1);break;case Dh:n.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Ys:n.blendFuncSeparate(770,771,1,771);break;case Ih:n.blendFunc(770,1);break;case Ph:n.blendFuncSeparate(0,769,0,1);break;case Dh:n.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,w=null,P=null,M=null,b=k,I=Ot}return}Ie=Ie||ae,tt=tt||ve,At=At||Te,(ae!==S||Ie!==A)&&(n.blendEquationSeparate(Me[ae],Me[Ie]),S=ae,A=Ie),(ve!==y||Te!==w||tt!==P||At!==M)&&(n.blendFuncSeparate(_[ve],_[Te],_[tt],_[At]),y=ve,w=Te,P=tt,M=At),b=k,I=!1}function C(k,ae){k.side===ri?J(2884):W(2884);let ve=k.side===yn;ae&&(ve=!ve),N(ve),k.blending===Ys&&k.transparent===!1?x(Ni):x(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),o.setMask(k.colorWrite);const Te=k.stencilWrite;c.setTest(Te),Te&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),le(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?W(32926):J(32926)}function N(k){O!==k&&(k?n.frontFace(2304):n.frontFace(2305),O=k)}function B(k){k!==nx?(W(2884),k!==Q&&(k===Rh?n.cullFace(1029):k===ix?n.cullFace(1028):n.cullFace(1032))):J(2884),Q=k}function $(k){k!==ue&&(re&&n.lineWidth(k),ue=k)}function le(k,ae,ve){k?(W(32823),(H!==ae||V!==ve)&&(n.polygonOffset(ae,ve),H=ae,V=ve)):J(32823)}function he(k){k?W(3089):J(3089)}function _e(k){k===void 0&&(k=33984+te-1),pe!==k&&(n.activeTexture(k),pe=k)}function T(k,ae,ve){ve===void 0&&(pe===null?ve=33984+te-1:ve=pe);let Te=ce[ve];Te===void 0&&(Te={type:void 0,texture:void 0},ce[ve]=Te),(Te.type!==k||Te.texture!==ae)&&(pe!==ve&&(n.activeTexture(ve),pe=ve),n.bindTexture(k,ae||q[k]),Te.type=k,Te.texture=ae)}function E(){const k=ce[pe];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function F(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function R(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function D(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Z(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function K(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ce(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(k){fe.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),fe.copy(k))}function Re(k){me.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),me.copy(k))}function Ne(k,ae){let ve=h.get(ae);ve===void 0&&(ve=new WeakMap,h.set(ae,ve));let Te=ve.get(k);Te===void 0&&(Te=n.getUniformBlockIndex(ae,k.name),ve.set(k,Te))}function Xe(k,ae){const Te=h.get(ae).get(k);u.get(k)!==Te&&(n.uniformBlockBinding(ae,Te,k.__bindingPointIndex),u.set(k,Te))}function mt(){n.disable(3042),n.disable(2884),n.disable(2929),n.disable(32823),n.disable(3089),n.disable(2960),n.disable(32926),n.blendEquation(32774),n.blendFunc(1,0),n.blendFuncSeparate(1,0,1,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(513),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(519,0,4294967295),n.stencilOp(7680,7680,7680),n.clearStencil(0),n.cullFace(1029),n.frontFace(2305),n.polygonOffset(0,0),n.activeTexture(33984),n.bindFramebuffer(36160,null),i===!0&&(n.bindFramebuffer(36009,null),n.bindFramebuffer(36008,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},pe=null,ce={},p={},v=new WeakMap,m=[],d=null,g=!1,b=null,S=null,y=null,w=null,A=null,P=null,M=null,I=!1,O=null,Q=null,ue=null,H=null,V=null,fe.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:W,disable:J,bindFramebuffer:ie,drawBuffers:ee,useProgram:Ee,setBlending:x,setMaterial:C,setFlipSided:N,setCullFace:B,setLineWidth:$,setPolygonOffset:le,setScissorTest:he,activeTexture:_e,bindTexture:T,unbindTexture:E,compressedTexImage2D:F,compressedTexImage3D:R,texImage2D:Ce,texImage3D:Ae,updateUBOMapping:Ne,uniformBlockBinding:Xe,texStorage2D:K,texStorage3D:Se,texSubImage2D:D,texSubImage3D:Z,compressedTexSubImage2D:ge,compressedTexSubImage3D:de,scissor:Le,viewport:Re,reset:mt}}function eE(n,e,t,i,s,r,a){const o=s.isWebGL2,l=s.maxTextures,c=s.maxCubemapSize,u=s.maxTextureSize,h=s.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let m;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(T,E){return g?new OffscreenCanvas(T,E):ra("canvas")}function S(T,E,F,R){let D=1;if((T.width>R||T.height>R)&&(D=R/Math.max(T.width,T.height)),D<1||E===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const Z=E?wo:Math.floor,ge=Z(D*T.width),de=Z(D*T.height);m===void 0&&(m=b(ge,de));const K=F?b(ge,de):m;return K.width=ge,K.height=de,K.getContext("2d").drawImage(T,0,0,ge,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+ge+"x"+de+")."),K}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function y(T){return xc(T.width)&&xc(T.height)}function w(T){return o?!1:T.wrapS!==gn||T.wrapT!==gn||T.minFilter!==pt&&T.minFilter!==Jt}function A(T,E){return T.generateMipmaps&&E&&T.minFilter!==pt&&T.minFilter!==Jt}function P(T){n.generateMipmap(T)}function M(T,E,F,R,D=!1){if(o===!1)return E;if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Z=E;return E===6403&&(F===5126&&(Z=33326),F===5131&&(Z=33325),F===5121&&(Z=33321)),E===33319&&(F===5126&&(Z=33328),F===5131&&(Z=33327),F===5121&&(Z=33323)),E===6408&&(F===5126&&(Z=34836),F===5131&&(Z=34842),F===5121&&(Z=R===rt&&D===!1?35907:32856),F===32819&&(Z=32854),F===32820&&(Z=32855)),(Z===33325||Z===33326||Z===33327||Z===33328||Z===34842||Z===34836)&&e.get("EXT_color_buffer_float"),Z}function I(T,E,F){return A(T,F)===!0||T.isFramebufferTexture&&T.minFilter!==pt&&T.minFilter!==Jt?Math.log2(Math.max(E.width,E.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?E.mipmaps.length:1}function O(T){return T===pt||T===mc||T===gc?9728:9729}function Q(T){const E=T.target;E.removeEventListener("dispose",Q),H(E),E.isVideoTexture&&v.delete(E)}function ue(T){const E=T.target;E.removeEventListener("dispose",ue),te(E)}function H(T){const E=i.get(T);if(E.__webglInit===void 0)return;const F=T.source,R=d.get(F);if(R){const D=R[E.__cacheKey];D.usedTimes--,D.usedTimes===0&&V(T),Object.keys(R).length===0&&d.delete(F)}i.remove(T)}function V(T){const E=i.get(T);n.deleteTexture(E.__webglTexture);const F=T.source,R=d.get(F);delete R[E.__cacheKey],a.memory.textures--}function te(T){const E=T.texture,F=i.get(T),R=i.get(E);if(R.__webglTexture!==void 0&&(n.deleteTexture(R.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let D=0;D<6;D++)n.deleteFramebuffer(F.__webglFramebuffer[D]),F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer[D]);else{if(n.deleteFramebuffer(F.__webglFramebuffer),F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&n.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let D=0;D<F.__webglColorRenderbuffer.length;D++)F.__webglColorRenderbuffer[D]&&n.deleteRenderbuffer(F.__webglColorRenderbuffer[D]);F.__webglDepthRenderbuffer&&n.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let D=0,Z=E.length;D<Z;D++){const ge=i.get(E[D]);ge.__webglTexture&&(n.deleteTexture(ge.__webglTexture),a.memory.textures--),i.remove(E[D])}i.remove(E),i.remove(T)}let re=0;function ne(){re=0}function G(){const T=re;return T>=l&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+l),re+=1,T}function pe(T){const E=[];return E.push(T.wrapS),E.push(T.wrapT),E.push(T.wrapR||0),E.push(T.magFilter),E.push(T.minFilter),E.push(T.anisotropy),E.push(T.internalFormat),E.push(T.format),E.push(T.type),E.push(T.generateMipmaps),E.push(T.premultiplyAlpha),E.push(T.flipY),E.push(T.unpackAlignment),E.push(T.encoding),E.join()}function ce(T,E){const F=i.get(T);if(T.isVideoTexture&&he(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const R=T.image;if(R===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(R.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(F,T,E);return}}t.bindTexture(3553,F.__webglTexture,33984+E)}function X(T,E){const F=i.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,E);return}t.bindTexture(35866,F.__webglTexture,33984+E)}function Y(T,E){const F=i.get(T);if(T.version>0&&F.__version!==T.version){J(F,T,E);return}t.bindTexture(32879,F.__webglTexture,33984+E)}function fe(T,E){const F=i.get(T);if(T.version>0&&F.__version!==T.version){ie(F,T,E);return}t.bindTexture(34067,F.__webglTexture,33984+E)}const me={[nr]:10497,[gn]:33071,[So]:33648},xe={[pt]:9728,[mc]:9984,[gc]:9986,[Jt]:9729,[vm]:9985,[dr]:9987};function q(T,E,F){if(F?(n.texParameteri(T,10242,me[E.wrapS]),n.texParameteri(T,10243,me[E.wrapT]),(T===32879||T===35866)&&n.texParameteri(T,32882,me[E.wrapR]),n.texParameteri(T,10240,xe[E.magFilter]),n.texParameteri(T,10241,xe[E.minFilter])):(n.texParameteri(T,10242,33071),n.texParameteri(T,10243,33071),(T===32879||T===35866)&&n.texParameteri(T,32882,33071),(E.wrapS!==gn||E.wrapT!==gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(T,10240,O(E.magFilter)),n.texParameteri(T,10241,O(E.minFilter)),E.minFilter!==pt&&E.minFilter!==Jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");if(E.type===Ii&&e.has("OES_texture_float_linear")===!1||o===!1&&E.type===ta&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(n.texParameterf(T,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function W(T,E){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,E.addEventListener("dispose",Q));const R=E.source;let D=d.get(R);D===void 0&&(D={},d.set(R,D));const Z=pe(E);if(Z!==T.__cacheKey){D[Z]===void 0&&(D[Z]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),D[Z].usedTimes++;const ge=D[T.__cacheKey];ge!==void 0&&(D[T.__cacheKey].usedTimes--,ge.usedTimes===0&&V(E)),T.__cacheKey=Z,T.__webglTexture=D[Z].texture}return F}function J(T,E,F){let R=3553;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(R=35866),E.isData3DTexture&&(R=32879);const D=W(T,E),Z=E.source;t.bindTexture(R,T.__webglTexture,33984+F);const ge=i.get(Z);if(Z.version!==ge.__version||D===!0){t.activeTexture(33984+F),n.pixelStorei(37440,E.flipY),n.pixelStorei(37441,E.premultiplyAlpha),n.pixelStorei(3317,E.unpackAlignment),n.pixelStorei(37443,0);const de=w(E)&&y(E.image)===!1;let K=S(E.image,de,!1,u);K=_e(E,K);const Se=y(K)||o,Ce=r.convert(E.format,E.encoding);let Ae=r.convert(E.type),Le=M(E.internalFormat,Ce,Ae,E.encoding,E.isVideoTexture);q(R,E,Se);let Re;const Ne=E.mipmaps,Xe=o&&E.isVideoTexture!==!0,mt=ge.__version===void 0||D===!0,k=I(E,K,Se);if(E.isDepthTexture)Le=6402,o?E.type===Ii?Le=36012:E.type===ts?Le=33190:E.type===qs?Le=35056:Le=33189:E.type===Ii&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===as&&Le===6402&&E.type!==xm&&E.type!==ts&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=ts,Ae=r.convert(E.type)),E.format===ir&&Le===6402&&(Le=34041,E.type!==qs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=qs,Ae=r.convert(E.type))),mt&&(Xe?t.texStorage2D(3553,1,Le,K.width,K.height):t.texImage2D(3553,0,Le,K.width,K.height,0,Ce,Ae,null));else if(E.isDataTexture)if(Ne.length>0&&Se){Xe&&mt&&t.texStorage2D(3553,k,Le,Ne[0].width,Ne[0].height);for(let ae=0,ve=Ne.length;ae<ve;ae++)Re=Ne[ae],Xe?t.texSubImage2D(3553,ae,0,0,Re.width,Re.height,Ce,Ae,Re.data):t.texImage2D(3553,ae,Le,Re.width,Re.height,0,Ce,Ae,Re.data);E.generateMipmaps=!1}else Xe?(mt&&t.texStorage2D(3553,k,Le,K.width,K.height),t.texSubImage2D(3553,0,0,0,K.width,K.height,Ce,Ae,K.data)):t.texImage2D(3553,0,Le,K.width,K.height,0,Ce,Ae,K.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Xe&&mt&&t.texStorage3D(35866,k,Le,Ne[0].width,Ne[0].height,K.depth);for(let ae=0,ve=Ne.length;ae<ve;ae++)Re=Ne[ae],E.format!==_n?Ce!==null?Xe?t.compressedTexSubImage3D(35866,ae,0,0,0,Re.width,Re.height,K.depth,Ce,Re.data,0,0):t.compressedTexImage3D(35866,ae,Le,Re.width,Re.height,K.depth,0,Re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(35866,ae,0,0,0,Re.width,Re.height,K.depth,Ce,Ae,Re.data):t.texImage3D(35866,ae,Le,Re.width,Re.height,K.depth,0,Ce,Ae,Re.data)}else{Xe&&mt&&t.texStorage2D(3553,k,Le,Ne[0].width,Ne[0].height);for(let ae=0,ve=Ne.length;ae<ve;ae++)Re=Ne[ae],E.format!==_n?Ce!==null?Xe?t.compressedTexSubImage2D(3553,ae,0,0,Re.width,Re.height,Ce,Re.data):t.compressedTexImage2D(3553,ae,Le,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(3553,ae,0,0,Re.width,Re.height,Ce,Ae,Re.data):t.texImage2D(3553,ae,Le,Re.width,Re.height,0,Ce,Ae,Re.data)}else if(E.isDataArrayTexture)Xe?(mt&&t.texStorage3D(35866,k,Le,K.width,K.height,K.depth),t.texSubImage3D(35866,0,0,0,0,K.width,K.height,K.depth,Ce,Ae,K.data)):t.texImage3D(35866,0,Le,K.width,K.height,K.depth,0,Ce,Ae,K.data);else if(E.isData3DTexture)Xe?(mt&&t.texStorage3D(32879,k,Le,K.width,K.height,K.depth),t.texSubImage3D(32879,0,0,0,0,K.width,K.height,K.depth,Ce,Ae,K.data)):t.texImage3D(32879,0,Le,K.width,K.height,K.depth,0,Ce,Ae,K.data);else if(E.isFramebufferTexture){if(mt)if(Xe)t.texStorage2D(3553,k,Le,K.width,K.height);else{let ae=K.width,ve=K.height;for(let Te=0;Te<k;Te++)t.texImage2D(3553,Te,Le,ae,ve,0,Ce,Ae,null),ae>>=1,ve>>=1}}else if(Ne.length>0&&Se){Xe&&mt&&t.texStorage2D(3553,k,Le,Ne[0].width,Ne[0].height);for(let ae=0,ve=Ne.length;ae<ve;ae++)Re=Ne[ae],Xe?t.texSubImage2D(3553,ae,0,0,Ce,Ae,Re):t.texImage2D(3553,ae,Le,Ce,Ae,Re);E.generateMipmaps=!1}else Xe?(mt&&t.texStorage2D(3553,k,Le,K.width,K.height),t.texSubImage2D(3553,0,0,0,Ce,Ae,K)):t.texImage2D(3553,0,Le,Ce,Ae,K);A(E,Se)&&P(R),ge.__version=Z.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function ie(T,E,F){if(E.image.length!==6)return;const R=W(T,E),D=E.source;t.bindTexture(34067,T.__webglTexture,33984+F);const Z=i.get(D);if(D.version!==Z.__version||R===!0){t.activeTexture(33984+F),n.pixelStorei(37440,E.flipY),n.pixelStorei(37441,E.premultiplyAlpha),n.pixelStorei(3317,E.unpackAlignment),n.pixelStorei(37443,0);const ge=E.isCompressedTexture||E.image[0].isCompressedTexture,de=E.image[0]&&E.image[0].isDataTexture,K=[];for(let ae=0;ae<6;ae++)!ge&&!de?K[ae]=S(E.image[ae],!1,!0,c):K[ae]=de?E.image[ae].image:E.image[ae],K[ae]=_e(E,K[ae]);const Se=K[0],Ce=y(Se)||o,Ae=r.convert(E.format,E.encoding),Le=r.convert(E.type),Re=M(E.internalFormat,Ae,Le,E.encoding),Ne=o&&E.isVideoTexture!==!0,Xe=Z.__version===void 0||R===!0;let mt=I(E,Se,Ce);q(34067,E,Ce);let k;if(ge){Ne&&Xe&&t.texStorage2D(34067,mt,Re,Se.width,Se.height);for(let ae=0;ae<6;ae++){k=K[ae].mipmaps;for(let ve=0;ve<k.length;ve++){const Te=k[ve];E.format!==_n?Ae!==null?Ne?t.compressedTexSubImage2D(34069+ae,ve,0,0,Te.width,Te.height,Ae,Te.data):t.compressedTexImage2D(34069+ae,ve,Re,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(34069+ae,ve,0,0,Te.width,Te.height,Ae,Le,Te.data):t.texImage2D(34069+ae,ve,Re,Te.width,Te.height,0,Ae,Le,Te.data)}}}else{k=E.mipmaps,Ne&&Xe&&(k.length>0&&mt++,t.texStorage2D(34067,mt,Re,K[0].width,K[0].height));for(let ae=0;ae<6;ae++)if(de){Ne?t.texSubImage2D(34069+ae,0,0,0,K[ae].width,K[ae].height,Ae,Le,K[ae].data):t.texImage2D(34069+ae,0,Re,K[ae].width,K[ae].height,0,Ae,Le,K[ae].data);for(let ve=0;ve<k.length;ve++){const Ie=k[ve].image[ae].image;Ne?t.texSubImage2D(34069+ae,ve+1,0,0,Ie.width,Ie.height,Ae,Le,Ie.data):t.texImage2D(34069+ae,ve+1,Re,Ie.width,Ie.height,0,Ae,Le,Ie.data)}}else{Ne?t.texSubImage2D(34069+ae,0,0,0,Ae,Le,K[ae]):t.texImage2D(34069+ae,0,Re,Ae,Le,K[ae]);for(let ve=0;ve<k.length;ve++){const Te=k[ve];Ne?t.texSubImage2D(34069+ae,ve+1,0,0,Ae,Le,Te.image[ae]):t.texImage2D(34069+ae,ve+1,Re,Ae,Le,Te.image[ae])}}}A(E,Ce)&&P(34067),Z.__version=D.version,E.onUpdate&&E.onUpdate(E)}T.__version=E.version}function ee(T,E,F,R,D){const Z=r.convert(F.format,F.encoding),ge=r.convert(F.type),de=M(F.internalFormat,Z,ge,F.encoding);i.get(E).__hasExternalTextures||(D===32879||D===35866?t.texImage3D(D,0,de,E.width,E.height,E.depth,0,Z,ge,null):t.texImage2D(D,0,de,E.width,E.height,0,Z,ge,null)),t.bindFramebuffer(36160,T),le(E)?f.framebufferTexture2DMultisampleEXT(36160,R,D,i.get(F).__webglTexture,0,$(E)):(D===3553||D>=34069&&D<=34074)&&n.framebufferTexture2D(36160,R,D,i.get(F).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ee(T,E,F){if(n.bindRenderbuffer(36161,T),E.depthBuffer&&!E.stencilBuffer){let R=33189;if(F||le(E)){const D=E.depthTexture;D&&D.isDepthTexture&&(D.type===Ii?R=36012:D.type===ts&&(R=33190));const Z=$(E);le(E)?f.renderbufferStorageMultisampleEXT(36161,Z,R,E.width,E.height):n.renderbufferStorageMultisample(36161,Z,R,E.width,E.height)}else n.renderbufferStorage(36161,R,E.width,E.height);n.framebufferRenderbuffer(36160,36096,36161,T)}else if(E.depthBuffer&&E.stencilBuffer){const R=$(E);F&&le(E)===!1?n.renderbufferStorageMultisample(36161,R,35056,E.width,E.height):le(E)?f.renderbufferStorageMultisampleEXT(36161,R,35056,E.width,E.height):n.renderbufferStorage(36161,34041,E.width,E.height),n.framebufferRenderbuffer(36160,33306,36161,T)}else{const R=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let D=0;D<R.length;D++){const Z=R[D],ge=r.convert(Z.format,Z.encoding),de=r.convert(Z.type),K=M(Z.internalFormat,ge,de,Z.encoding),Se=$(E);F&&le(E)===!1?n.renderbufferStorageMultisample(36161,Se,K,E.width,E.height):le(E)?f.renderbufferStorageMultisampleEXT(36161,Se,K,E.width,E.height):n.renderbufferStorage(36161,K,E.width,E.height)}}n.bindRenderbuffer(36161,null)}function Me(T,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,T),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ce(E.depthTexture,0);const R=i.get(E.depthTexture).__webglTexture,D=$(E);if(E.depthTexture.format===as)le(E)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,R,0,D):n.framebufferTexture2D(36160,36096,3553,R,0);else if(E.depthTexture.format===ir)le(E)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,R,0,D):n.framebufferTexture2D(36160,33306,3553,R,0);else throw new Error("Unknown depthTexture format")}function _(T){const E=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!E.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Me(E.__webglFramebuffer,T)}else if(F){E.__webglDepthbuffer=[];for(let R=0;R<6;R++)t.bindFramebuffer(36160,E.__webglFramebuffer[R]),E.__webglDepthbuffer[R]=n.createRenderbuffer(),Ee(E.__webglDepthbuffer[R],T,!1)}else t.bindFramebuffer(36160,E.__webglFramebuffer),E.__webglDepthbuffer=n.createRenderbuffer(),Ee(E.__webglDepthbuffer,T,!1);t.bindFramebuffer(36160,null)}function x(T,E,F){const R=i.get(T);E!==void 0&&ee(R.__webglFramebuffer,T,T.texture,36064,3553),F!==void 0&&_(T)}function C(T){const E=T.texture,F=i.get(T),R=i.get(E);T.addEventListener("dispose",ue),T.isWebGLMultipleRenderTargets!==!0&&(R.__webglTexture===void 0&&(R.__webglTexture=n.createTexture()),R.__version=E.version,a.memory.textures++);const D=T.isWebGLCubeRenderTarget===!0,Z=T.isWebGLMultipleRenderTargets===!0,ge=y(T)||o;if(D){F.__webglFramebuffer=[];for(let de=0;de<6;de++)F.__webglFramebuffer[de]=n.createFramebuffer()}else{if(F.__webglFramebuffer=n.createFramebuffer(),Z)if(s.drawBuffers){const de=T.texture;for(let K=0,Se=de.length;K<Se;K++){const Ce=i.get(de[K]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&le(T)===!1){const de=Z?E:[E];F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,F.__webglMultisampledFramebuffer);for(let K=0;K<de.length;K++){const Se=de[K];F.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(36161,F.__webglColorRenderbuffer[K]);const Ce=r.convert(Se.format,Se.encoding),Ae=r.convert(Se.type),Le=M(Se.internalFormat,Ce,Ae,Se.encoding,T.isXRRenderTarget===!0),Re=$(T);n.renderbufferStorageMultisample(36161,Re,Le,T.width,T.height),n.framebufferRenderbuffer(36160,36064+K,36161,F.__webglColorRenderbuffer[K])}n.bindRenderbuffer(36161,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Ee(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(36160,null)}}if(D){t.bindTexture(34067,R.__webglTexture),q(34067,E,ge);for(let de=0;de<6;de++)ee(F.__webglFramebuffer[de],T,E,36064,34069+de);A(E,ge)&&P(34067),t.unbindTexture()}else if(Z){const de=T.texture;for(let K=0,Se=de.length;K<Se;K++){const Ce=de[K],Ae=i.get(Ce);t.bindTexture(3553,Ae.__webglTexture),q(3553,Ce,ge),ee(F.__webglFramebuffer,T,Ce,36064+K,3553),A(Ce,ge)&&P(3553)}t.unbindTexture()}else{let de=3553;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?de=T.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,R.__webglTexture),q(de,E,ge),ee(F.__webglFramebuffer,T,E,36064,de),A(E,ge)&&P(de),t.unbindTexture()}T.depthBuffer&&_(T)}function N(T){const E=y(T)||o,F=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let R=0,D=F.length;R<D;R++){const Z=F[R];if(A(Z,E)){const ge=T.isWebGLCubeRenderTarget?34067:3553,de=i.get(Z).__webglTexture;t.bindTexture(ge,de),P(ge),t.unbindTexture()}}}function B(T){if(o&&T.samples>0&&le(T)===!1){const E=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],F=T.width,R=T.height;let D=16384;const Z=[],ge=T.stencilBuffer?33306:36096,de=i.get(T),K=T.isWebGLMultipleRenderTargets===!0;if(K)for(let Se=0;Se<E.length;Se++)t.bindFramebuffer(36160,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+Se,36161,null),t.bindFramebuffer(36160,de.__webglFramebuffer),n.framebufferTexture2D(36009,36064+Se,3553,null,0);t.bindFramebuffer(36008,de.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,de.__webglFramebuffer);for(let Se=0;Se<E.length;Se++){Z.push(36064+Se),T.depthBuffer&&Z.push(ge);const Ce=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(Ce===!1&&(T.depthBuffer&&(D|=256),T.stencilBuffer&&(D|=1024)),K&&n.framebufferRenderbuffer(36008,36064,36161,de.__webglColorRenderbuffer[Se]),Ce===!0&&(n.invalidateFramebuffer(36008,[ge]),n.invalidateFramebuffer(36009,[ge])),K){const Ae=i.get(E[Se]).__webglTexture;n.framebufferTexture2D(36009,36064,3553,Ae,0)}n.blitFramebuffer(0,0,F,R,0,0,F,R,D,9728),p&&n.invalidateFramebuffer(36008,Z)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),K)for(let Se=0;Se<E.length;Se++){t.bindFramebuffer(36160,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+Se,36161,de.__webglColorRenderbuffer[Se]);const Ce=i.get(E[Se]).__webglTexture;t.bindFramebuffer(36160,de.__webglFramebuffer),n.framebufferTexture2D(36009,36064+Se,3553,Ce,0)}t.bindFramebuffer(36009,de.__webglMultisampledFramebuffer)}}function $(T){return Math.min(h,T.samples)}function le(T){const E=i.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function he(T){const E=a.render.frame;v.get(T)!==E&&(v.set(T,E),T.update())}function _e(T,E){const F=T.encoding,R=T.format,D=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===vc||F!==hs&&(F===rt?o===!1?e.has("EXT_sRGB")===!0&&R===_n?(T.format=vc,T.minFilter=Jt,T.generateMipmaps=!1):E=wm.sRGBToLinear(E):(R!==_n||D!==us)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",F)),E}this.allocateTextureUnit=G,this.resetTextureUnits=ne,this.setTexture2D=ce,this.setTexture2DArray=X,this.setTexture3D=Y,this.setTextureCube=fe,this.rebindTextures=x,this.setupRenderTarget=C,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=B,this.setupDepthRenderbuffer=_,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=le}function tE(n,e,t){const i=t.isWebGL2;function s(r,a=null){let o;if(r===us)return 5121;if(r===Nx)return 32819;if(r===Ox)return 32820;if(r===Ix)return 5120;if(r===Px)return 5122;if(r===xm)return 5123;if(r===Dx)return 5124;if(r===ts)return 5125;if(r===Ii)return 5126;if(r===ta)return i?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Fx)return 6406;if(r===_n)return 6408;if(r===Ux)return 6409;if(r===Bx)return 6410;if(r===as)return 6402;if(r===ir)return 34041;if(r===kx)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(r===vc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Vx)return 6403;if(r===zx)return 36244;if(r===Hx)return 33319;if(r===Wx)return 33320;if(r===Gx)return 36249;if(r===ul||r===hl||r===fl||r===dl)if(a===rt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===ul)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===hl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===fl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===dl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===ul)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===hl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===fl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===dl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Fh||r===kh||r===Uh||r===Bh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Fh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===kh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Uh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Bh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===jx)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Vh||r===zh)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Vh)return a===rt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===zh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Hh||r===Wh||r===Gh||r===jh||r===Xh||r===Yh||r===qh||r===$h||r===Kh||r===Qh||r===Jh||r===Zh||r===ef||r===tf)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Hh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Wh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Gh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===jh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Xh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Yh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===qh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===$h)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Kh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Qh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Jh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Zh)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ef)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===tf)return a===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===nf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===nf)return a===rt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return r===qs?i?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class nE extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ns extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iE={type:"move"};class zl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ns,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ns,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ns,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const m of e.hand.values()){const d=t.getJointPose(m,i),g=this._getHandJoint(c,m);d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.jointRadius=d.radius),g.visible=d!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(iE)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ns;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Um extends Pt{constructor(e,t,i,s,r,a,o,l,c,u){if(u=u!==void 0?u:as,u!==as&&u!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===as&&(i=ts),i===void 0&&u===ir&&(i=qs),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:pt,this.minFilter=l!==void 0?l:pt,this.flipY=!1,this.generateMipmaps=!1}}class sE extends pr{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=null,c=null,u=null,h=null,f=null,p=null;const v=t.getContextAttributes();let m=null,d=null;const g=[],b=[],S=new Set,y=new Map,w=new Yt;w.layers.enable(1),w.viewport=new at;const A=new Yt;A.layers.enable(2),A.viewport=new at;const P=[w,A],M=new nE;M.layers.enable(1),M.layers.enable(2);let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=g[X];return Y===void 0&&(Y=new zl,g[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=g[X];return Y===void 0&&(Y=new zl,g[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=g[X];return Y===void 0&&(Y=new zl,g[X]=Y),Y.getHandSpace()};function Q(X){const Y=b.indexOf(X.inputSource);if(Y===-1)return;const fe=g[Y];fe!==void 0&&fe.dispatchEvent({type:X.type,data:X.inputSource})}function ue(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",ue),s.removeEventListener("inputsourceschange",H);for(let X=0;X<g.length;X++){const Y=b[X];Y!==null&&(b[X]=null,g[X].disconnect(Y))}I=null,O=null,e.setRenderTarget(m),f=null,h=null,u=null,s=null,d=null,ce.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",ue),s.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:v.alpha,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:f}),d=new bn(f.framebufferWidth,f.framebufferHeight,{format:_n,type:us,encoding:e.outputEncoding,stencilBuffer:v.stencil})}else{let Y=null,fe=null,me=null;v.depth&&(me=v.stencil?35056:33190,Y=v.stencil?ir:as,fe=v.stencil?qs:ts);const xe={colorFormat:32856,depthFormat:me,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(xe),s.updateRenderState({layers:[h]}),d=new bn(h.textureWidth,h.textureHeight,{format:_n,type:us,depthTexture:new Um(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:v.stencil,encoding:e.outputEncoding,samples:v.antialias?4:0});const q=e.properties.get(d);q.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),l=null,a=await s.requestReferenceSpace(o),ce.setContext(s),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function H(X){for(let Y=0;Y<X.removed.length;Y++){const fe=X.removed[Y],me=b.indexOf(fe);me>=0&&(b[me]=null,g[me].disconnect(fe))}for(let Y=0;Y<X.added.length;Y++){const fe=X.added[Y];let me=b.indexOf(fe);if(me===-1){for(let q=0;q<g.length;q++)if(q>=b.length){b.push(fe),me=q;break}else if(b[q]===null){b[q]=fe,me=q;break}if(me===-1)break}const xe=g[me];xe&&xe.connect(fe)}}const V=new U,te=new U;function re(X,Y,fe){V.setFromMatrixPosition(Y.matrixWorld),te.setFromMatrixPosition(fe.matrixWorld);const me=V.distanceTo(te),xe=Y.projectionMatrix.elements,q=fe.projectionMatrix.elements,W=xe[14]/(xe[10]-1),J=xe[14]/(xe[10]+1),ie=(xe[9]+1)/xe[5],ee=(xe[9]-1)/xe[5],Ee=(xe[8]-1)/xe[0],Me=(q[8]+1)/q[0],_=W*Ee,x=W*Me,C=me/(-Ee+Me),N=C*-Ee;Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(N),X.translateZ(C),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const B=W+C,$=J+C,le=_-N,he=x+(me-N),_e=ie*J/$*B,T=ee*J/$*B;X.projectionMatrix.makePerspective(le,he,_e,T,B,$)}function ne(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;M.near=A.near=w.near=X.near,M.far=A.far=w.far=X.far,(I!==M.near||O!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,O=M.far);const Y=X.parent,fe=M.cameras;ne(M,Y);for(let xe=0;xe<fe.length;xe++)ne(fe[xe],Y);M.matrixWorld.decompose(M.position,M.quaternion,M.scale),X.matrix.copy(M.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale);const me=X.children;for(let xe=0,q=me.length;xe<q;xe++)me[xe].updateMatrixWorld(!0);fe.length===2?re(M,w,A):M.projectionMatrix.copy(w.projectionMatrix)},this.getCamera=function(){return M},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(X){h!==null&&(h.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.getPlanes=function(){return S};let G=null;function pe(X,Y){if(c=Y.getViewerPose(l||a),p=Y,c!==null){const fe=c.views;f!==null&&(e.setRenderTargetFramebuffer(d,f.framebuffer),e.setRenderTarget(d));let me=!1;fe.length!==M.cameras.length&&(M.cameras.length=0,me=!0);for(let xe=0;xe<fe.length;xe++){const q=fe[xe];let W=null;if(f!==null)W=f.getViewport(q);else{const ie=u.getViewSubImage(h,q);W=ie.viewport,xe===0&&(e.setRenderTargetTextures(d,ie.colorTexture,h.ignoreDepthValues?void 0:ie.depthStencilTexture),e.setRenderTarget(d))}let J=P[xe];J===void 0&&(J=new Yt,J.layers.enable(xe),J.viewport=new at,P[xe]=J),J.matrix.fromArray(q.transform.matrix),J.projectionMatrix.fromArray(q.projectionMatrix),J.viewport.set(W.x,W.y,W.width,W.height),xe===0&&M.matrix.copy(J.matrix),me===!0&&M.cameras.push(J)}}for(let fe=0;fe<g.length;fe++){const me=b[fe],xe=g[fe];me!==null&&xe!==void 0&&xe.update(me,Y,l||a)}if(G&&G(X,Y),Y.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:Y.detectedPlanes});let fe=null;for(const me of S)Y.detectedPlanes.has(me)||(fe===null&&(fe=[]),fe.push(me));if(fe!==null)for(const me of fe)S.delete(me),y.delete(me),i.dispatchEvent({type:"planeremoved",data:me});for(const me of Y.detectedPlanes)if(!S.has(me))S.add(me),y.set(me,Y.lastChangedTime),i.dispatchEvent({type:"planeadded",data:me});else{const xe=y.get(me);me.lastChangedTime>xe&&(y.set(me,me.lastChangedTime),i.dispatchEvent({type:"planechanged",data:me}))}}p=null}const ce=new Dm;ce.setAnimationLoop(pe),this.setAnimationLoop=function(X){G=X},this.dispose=function(){}}}function rE(n,e){function t(m,d){d.color.getRGB(m.fogColor.value,Rm(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,g,b,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),u(m,d)):d.isMeshPhongMaterial?(s(m,d),c(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&f(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),p(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(r(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?o(m,d,g,b):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.bumpMap&&(m.bumpMap.value=d.bumpMap,m.bumpScale.value=d.bumpScale,d.side===yn&&(m.bumpScale.value*=-1)),d.displacementMap&&(m.displacementMap.value=d.displacementMap,m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap),d.normalMap&&(m.normalMap.value=d.normalMap,m.normalScale.value.copy(d.normalScale),d.side===yn&&m.normalScale.value.negate()),d.specularMap&&(m.specularMap.value=d.specularMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const g=e.get(d).envMap;if(g&&(m.envMap.value=g,m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const y=n.physicallyCorrectLights!==!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*y}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity);let b;d.map?b=d.map:d.specularMap?b=d.specularMap:d.displacementMap?b=d.displacementMap:d.normalMap?b=d.normalMap:d.bumpMap?b=d.bumpMap:d.roughnessMap?b=d.roughnessMap:d.metalnessMap?b=d.metalnessMap:d.alphaMap?b=d.alphaMap:d.emissiveMap?b=d.emissiveMap:d.clearcoatMap?b=d.clearcoatMap:d.clearcoatNormalMap?b=d.clearcoatNormalMap:d.clearcoatRoughnessMap?b=d.clearcoatRoughnessMap:d.iridescenceMap?b=d.iridescenceMap:d.iridescenceThicknessMap?b=d.iridescenceThicknessMap:d.specularIntensityMap?b=d.specularIntensityMap:d.specularColorMap?b=d.specularColorMap:d.transmissionMap?b=d.transmissionMap:d.thicknessMap?b=d.thicknessMap:d.sheenColorMap?b=d.sheenColorMap:d.sheenRoughnessMap&&(b=d.sheenRoughnessMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),m.uvTransform.value.copy(b.matrix));let S;d.aoMap?S=d.aoMap:d.lightMap&&(S=d.lightMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),m.uv2Transform.value.copy(S.matrix))}function r(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function o(m,d,g,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*g,m.scale.value=b*.5,d.map&&(m.map.value=d.map),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let S;d.map?S=d.map:d.alphaMap&&(S=d.alphaMap),S!==void 0&&(S.matrixAutoUpdate===!0&&S.updateMatrix(),m.uvTransform.value.copy(S.matrix))}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let g;d.map?g=d.map:d.alphaMap&&(g=d.alphaMap),g!==void 0&&(g.matrixAutoUpdate===!0&&g.updateMatrix(),m.uvTransform.value.copy(g.matrix))}function c(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.roughness.value=d.roughness,m.metalness.value=d.metalness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function f(m,d,g){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),m.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===yn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap)}function p(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){m.referencePosition.value.copy(d.referencePosition),m.nearDistance.value=d.nearDistance,m.farDistance.value=d.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function aE(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(35375):0;function l(b,S){const y=S.program;i.uniformBlockBinding(b,y)}function c(b,S){let y=s[b.id];y===void 0&&(v(b),y=u(b),s[b.id]=y,b.addEventListener("dispose",d));const w=S.program;i.updateUBOMapping(b,w);const A=e.render.frame;r[b.id]!==A&&(f(b),r[b.id]=A)}function u(b){const S=h();b.__bindingPointIndex=S;const y=n.createBuffer(),w=b.__size,A=b.usage;return n.bindBuffer(35345,y),n.bufferData(35345,w,A),n.bindBuffer(35345,null),n.bindBufferBase(35345,S,y),y}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=s[b.id],y=b.uniforms,w=b.__cache;n.bindBuffer(35345,S);for(let A=0,P=y.length;A<P;A++){const M=y[A];if(p(M,A,w)===!0){const I=M.value,O=M.__offset;typeof I=="number"?(M.__data[0]=I,n.bufferSubData(35345,O,M.__data)):(M.value.isMatrix3?(M.__data[0]=M.value.elements[0],M.__data[1]=M.value.elements[1],M.__data[2]=M.value.elements[2],M.__data[3]=M.value.elements[0],M.__data[4]=M.value.elements[3],M.__data[5]=M.value.elements[4],M.__data[6]=M.value.elements[5],M.__data[7]=M.value.elements[0],M.__data[8]=M.value.elements[6],M.__data[9]=M.value.elements[7],M.__data[10]=M.value.elements[8],M.__data[11]=M.value.elements[0]):I.toArray(M.__data),n.bufferSubData(35345,O,M.__data))}}n.bindBuffer(35345,null)}function p(b,S,y){const w=b.value;if(y[S]===void 0)return typeof w=="number"?y[S]=w:y[S]=w.clone(),!0;if(typeof w=="number"){if(y[S]!==w)return y[S]=w,!0}else{const A=y[S];if(A.equals(w)===!1)return A.copy(w),!0}return!1}function v(b){const S=b.uniforms;let y=0;const w=16;let A=0;for(let P=0,M=S.length;P<M;P++){const I=S[P],O=m(I);if(I.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,P>0){A=y%w;const Q=w-A;A!==0&&Q-O.boundary<0&&(y+=w-A,I.__offset=y)}y+=O.storage}return A=y%w,A>0&&(y+=w-A),b.__size=y,b.__cache={},this}function m(b){const S=b.value,y={boundary:0,storage:0};return typeof S=="number"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function d(b){const S=b.target;S.removeEventListener("dispose",d);const y=a.indexOf(S.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function g(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}function oE(){const n=ra("canvas");return n.style.display="block",n}function Bm(n={}){this.isWebGLRenderer=!0;const e=n.canvas!==void 0?n.canvas:oE(),t=n.context!==void 0?n.context:null,i=n.depth!==void 0?n.depth:!0,s=n.stencil!==void 0?n.stencil:!0,r=n.antialias!==void 0?n.antialias:!1,a=n.premultipliedAlpha!==void 0?n.premultipliedAlpha:!0,o=n.preserveDrawingBuffer!==void 0?n.preserveDrawingBuffer:!1,l=n.powerPreference!==void 0?n.powerPreference:"default",c=n.failIfMajorPerformanceCaveat!==void 0?n.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=n.alpha!==void 0?n.alpha:!1;let h=null,f=null;const p=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=hs,this.physicallyCorrectLights=!1,this.toneMapping=ui,this.toneMappingExposure=1;const m=this;let d=!1,g=0,b=0,S=null,y=-1,w=null;const A=new at,P=new at;let M=null,I=e.width,O=e.height,Q=1,ue=null,H=null;const V=new at(0,0,I,O),te=new at(0,0,I,O);let re=!1;const ne=new ou;let G=!1,pe=!1,ce=null;const X=new je,Y=new Ue,fe=new U,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function xe(){return S===null?Q:1}let q=t;function W(L,j){for(let se=0;se<L.length;se++){const z=L[se],oe=e.getContext(z,j);if(oe!==null)return oe}return null}try{const L={alpha:!0,depth:i,stencil:s,antialias:r,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${iu}`),e.addEventListener("webglcontextlost",Le,!1),e.addEventListener("webglcontextrestored",Re,!1),e.addEventListener("webglcontextcreationerror",Ne,!1),q===null){const j=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&j.shift(),q=W(j,L),q===null)throw W(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}q.getShaderPrecisionFormat===void 0&&(q.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let J,ie,ee,Ee,Me,_,x,C,N,B,$,le,he,_e,T,E,F,R,D,Z,ge,de,K,Se;function Ce(){J=new xS(q),ie=new dS(q,J,n),J.init(ie),de=new tE(q,J,ie),ee=new Zw(q,J,ie),Ee=new MS,Me=new Bw,_=new eE(q,J,ee,Me,ie,de,Ee),x=new mS(m),C=new vS(m),N=new Iy(q,ie),K=new hS(q,J,N,ie),B=new yS(q,N,Ee,K),$=new TS(q,B,N,Ee),D=new ES(q,ie,_),E=new pS(Me),le=new Uw(m,x,C,J,ie,K,E),he=new rE(m,Me),_e=new zw,T=new Yw(J,ie),R=new uS(m,x,C,ee,$,u,a),F=new Jw(m,$,ie),Se=new aE(q,Ee,ie,ee),Z=new fS(q,J,Ee,ie),ge=new bS(q,J,Ee,ie),Ee.programs=le.programs,m.capabilities=ie,m.extensions=J,m.properties=Me,m.renderLists=_e,m.shadowMap=F,m.state=ee,m.info=Ee}Ce();const Ae=new sE(m,q);this.xr=Ae,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const L=J.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=J.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(L){L!==void 0&&(Q=L,this.setSize(I,O,!1))},this.getSize=function(L){return L.set(I,O)},this.setSize=function(L,j,se){if(Ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=L,O=j,e.width=Math.floor(L*Q),e.height=Math.floor(j*Q),se!==!1&&(e.style.width=L+"px",e.style.height=j+"px"),this.setViewport(0,0,L,j)},this.getDrawingBufferSize=function(L){return L.set(I*Q,O*Q).floor()},this.setDrawingBufferSize=function(L,j,se){I=L,O=j,Q=se,e.width=Math.floor(L*se),e.height=Math.floor(j*se),this.setViewport(0,0,L,j)},this.getCurrentViewport=function(L){return L.copy(A)},this.getViewport=function(L){return L.copy(V)},this.setViewport=function(L,j,se,z){L.isVector4?V.set(L.x,L.y,L.z,L.w):V.set(L,j,se,z),ee.viewport(A.copy(V).multiplyScalar(Q).floor())},this.getScissor=function(L){return L.copy(te)},this.setScissor=function(L,j,se,z){L.isVector4?te.set(L.x,L.y,L.z,L.w):te.set(L,j,se,z),ee.scissor(P.copy(te).multiplyScalar(Q).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(L){ee.setScissorTest(re=L)},this.setOpaqueSort=function(L){ue=L},this.setTransparentSort=function(L){H=L},this.getClearColor=function(L){return L.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor.apply(R,arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha.apply(R,arguments)},this.clear=function(L=!0,j=!0,se=!0){let z=0;L&&(z|=16384),j&&(z|=256),se&&(z|=1024),q.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Le,!1),e.removeEventListener("webglcontextrestored",Re,!1),e.removeEventListener("webglcontextcreationerror",Ne,!1),_e.dispose(),T.dispose(),Me.dispose(),x.dispose(),C.dispose(),$.dispose(),K.dispose(),Se.dispose(),le.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",Te),Ae.removeEventListener("sessionend",Ie),ce&&(ce.dispose(),ce=null),tt.stop()};function Le(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function Re(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;const L=Ee.autoReset,j=F.enabled,se=F.autoUpdate,z=F.needsUpdate,oe=F.type;Ce(),Ee.autoReset=L,F.enabled=j,F.autoUpdate=se,F.needsUpdate=z,F.type=oe}function Ne(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Xe(L){const j=L.target;j.removeEventListener("dispose",Xe),mt(j)}function mt(L){k(L),Me.remove(L)}function k(L){const j=Me.get(L).programs;j!==void 0&&(j.forEach(function(se){le.releaseProgram(se)}),L.isShaderMaterial&&le.releaseShaderCache(L))}this.renderBufferDirect=function(L,j,se,z,oe,Pe){j===null&&(j=me);const ke=oe.isMesh&&oe.matrixWorld.determinant()<0,He=Cg(L,j,se,z,oe);ee.setMaterial(z,ke);let Ge=se.index,Je=1;z.wireframe===!0&&(Ge=B.getWireframeAttribute(se),Je=2);const Ye=se.drawRange,qe=se.attributes.position;let vt=Ye.start*Je,tn=(Ye.start+Ye.count)*Je;Pe!==null&&(vt=Math.max(vt,Pe.start*Je),tn=Math.min(tn,(Pe.start+Pe.count)*Je)),Ge!==null?(vt=Math.max(vt,0),tn=Math.min(tn,Ge.count)):qe!=null&&(vt=Math.max(vt,0),tn=Math.min(tn,qe.count));const qn=tn-vt;if(qn<0||qn===1/0)return;K.setup(oe,z,He,se,Ge);let Hi,xt=Z;if(Ge!==null&&(Hi=N.get(Ge),xt=ge,xt.setIndex(Hi)),oe.isMesh)z.wireframe===!0?(ee.setLineWidth(z.wireframeLinewidth*xe()),xt.setMode(1)):xt.setMode(4);else if(oe.isLine){let $e=z.linewidth;$e===void 0&&($e=1),ee.setLineWidth($e*xe()),oe.isLineSegments?xt.setMode(1):oe.isLineLoop?xt.setMode(2):xt.setMode(3)}else oe.isPoints?xt.setMode(0):oe.isSprite&&xt.setMode(4);if(oe.isInstancedMesh)xt.renderInstances(vt,qn,oe.count);else if(se.isInstancedBufferGeometry){const $e=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,$o=Math.min(se.instanceCount,$e);xt.renderInstances(vt,qn,$o)}else xt.render(vt,qn)},this.compile=function(L,j){function se(z,oe,Pe){z.transparent===!0&&z.side===ri?(z.side=yn,z.needsUpdate=!0,hn(z,oe,Pe),z.side=cs,z.needsUpdate=!0,hn(z,oe,Pe),z.side=ri):hn(z,oe,Pe)}f=T.get(L),f.init(),v.push(f),L.traverseVisible(function(z){z.isLight&&z.layers.test(j.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights(m.physicallyCorrectLights),L.traverse(function(z){const oe=z.material;if(oe)if(Array.isArray(oe))for(let Pe=0;Pe<oe.length;Pe++){const ke=oe[Pe];se(ke,L,z)}else se(oe,L,z)}),v.pop(),f=null};let ae=null;function ve(L){ae&&ae(L)}function Te(){tt.stop()}function Ie(){tt.start()}const tt=new Dm;tt.setAnimationLoop(ve),typeof self<"u"&&tt.setContext(self),this.setAnimationLoop=function(L){ae=L,Ae.setAnimationLoop(L),L===null?tt.stop():tt.start()},Ae.addEventListener("sessionstart",Te),Ae.addEventListener("sessionend",Ie),this.render=function(L,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(j),j=Ae.getCamera()),L.isScene===!0&&L.onBeforeRender(m,L,j,S),f=T.get(L,v.length),f.init(),v.push(f),X.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ne.setFromProjectionMatrix(X),pe=this.localClippingEnabled,G=E.init(this.clippingPlanes,pe,j),h=_e.get(L,p.length),h.init(),p.push(h),At(L,j,0,m.sortObjects),h.finish(),m.sortObjects===!0&&h.sort(ue,H),G===!0&&E.beginShadows();const se=f.state.shadowsArray;if(F.render(se,L,j),G===!0&&E.endShadows(),this.info.autoReset===!0&&this.info.reset(),R.render(h,L),f.setupLights(m.physicallyCorrectLights),j.isArrayCamera){const z=j.cameras;for(let oe=0,Pe=z.length;oe<Pe;oe++){const ke=z[oe];Ot(h,L,ke,ke.viewport)}}else Ot(h,L,j);S!==null&&(_.updateMultisampleRenderTarget(S),_.updateRenderTargetMipmap(S)),L.isScene===!0&&L.onAfterRender(m,L,j),K.resetDefaultState(),y=-1,w=null,v.pop(),v.length>0?f=v[v.length-1]:f=null,p.pop(),p.length>0?h=p[p.length-1]:h=null};function At(L,j,se,z){if(L.visible===!1)return;if(L.layers.test(j.layers)){if(L.isGroup)se=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(j);else if(L.isLight)f.pushLight(L),L.castShadow&&f.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||ne.intersectsSprite(L)){z&&fe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(X);const ke=$.update(L),He=L.material;He.visible&&h.push(L,ke,He,se,fe.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(L.isSkinnedMesh&&L.skeleton.frame!==Ee.render.frame&&(L.skeleton.update(),L.skeleton.frame=Ee.render.frame),!L.frustumCulled||ne.intersectsObject(L))){z&&fe.setFromMatrixPosition(L.matrixWorld).applyMatrix4(X);const ke=$.update(L),He=L.material;if(Array.isArray(He)){const Ge=ke.groups;for(let Je=0,Ye=Ge.length;Je<Ye;Je++){const qe=Ge[Je],vt=He[qe.materialIndex];vt&&vt.visible&&h.push(L,ke,vt,se,fe.z,qe)}}else He.visible&&h.push(L,ke,He,se,fe.z,null)}}const Pe=L.children;for(let ke=0,He=Pe.length;ke<He;ke++)At(Pe[ke],j,se,z)}function Ot(L,j,se,z){const oe=L.opaque,Pe=L.transmissive,ke=L.transparent;f.setupLightsView(se),Pe.length>0&&zi(oe,j,se),z&&ee.viewport(A.copy(z)),oe.length>0&&ut(oe,j,se),Pe.length>0&&ut(Pe,j,se),ke.length>0&&ut(ke,j,se),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function zi(L,j,se){const z=ie.isWebGL2;ce===null&&(ce=new bn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")?ta:us,minFilter:dr,samples:z&&r===!0?4:0})),m.getDrawingBufferSize(Y),z?ce.setSize(Y.x,Y.y):ce.setSize(wo(Y.x),wo(Y.y));const oe=m.getRenderTarget();m.setRenderTarget(ce),m.clear();const Pe=m.toneMapping;m.toneMapping=ui,ut(L,j,se),m.toneMapping=Pe,_.updateMultisampleRenderTarget(ce),_.updateRenderTargetMipmap(ce),m.setRenderTarget(oe)}function ut(L,j,se){const z=j.isScene===!0?j.overrideMaterial:null;for(let oe=0,Pe=L.length;oe<Pe;oe++){const ke=L[oe],He=ke.object,Ge=ke.geometry,Je=z===null?ke.material:z,Ye=ke.group;He.layers.test(se.layers)&&Yn(He,j,se,Ge,Je,Ye)}}function Yn(L,j,se,z,oe,Pe){L.onBeforeRender(m,j,se,z,oe,Pe),L.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),oe.onBeforeRender(m,j,se,z,L,Pe),oe.transparent===!0&&oe.side===ri?(oe.side=yn,oe.needsUpdate=!0,m.renderBufferDirect(se,j,z,oe,L,Pe),oe.side=cs,oe.needsUpdate=!0,m.renderBufferDirect(se,j,z,oe,L,Pe),oe.side=ri):m.renderBufferDirect(se,j,z,oe,L,Pe),L.onAfterRender(m,j,se,z,oe,Pe)}function hn(L,j,se){j.isScene!==!0&&(j=me);const z=Me.get(L),oe=f.state.lights,Pe=f.state.shadowsArray,ke=oe.state.version,He=le.getParameters(L,oe.state,Pe,j,se),Ge=le.getProgramCacheKey(He);let Je=z.programs;z.environment=L.isMeshStandardMaterial?j.environment:null,z.fog=j.fog,z.envMap=(L.isMeshStandardMaterial?C:x).get(L.envMap||z.environment),Je===void 0&&(L.addEventListener("dispose",Xe),Je=new Map,z.programs=Je);let Ye=Je.get(Ge);if(Ye!==void 0){if(z.currentProgram===Ye&&z.lightsStateVersion===ke)return Du(L,He),Ye}else He.uniforms=le.getUniforms(L),L.onBuild(se,He,m),L.onBeforeCompile(He,m),Ye=le.acquireProgram(He,Ge),Je.set(Ge,Ye),z.uniforms=He.uniforms;const qe=z.uniforms;(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(qe.clippingPlanes=E.uniform),Du(L,He),z.needsLights=Rg(L),z.lightsStateVersion=ke,z.needsLights&&(qe.ambientLightColor.value=oe.state.ambient,qe.lightProbe.value=oe.state.probe,qe.directionalLights.value=oe.state.directional,qe.directionalLightShadows.value=oe.state.directionalShadow,qe.spotLights.value=oe.state.spot,qe.spotLightShadows.value=oe.state.spotShadow,qe.rectAreaLights.value=oe.state.rectArea,qe.ltc_1.value=oe.state.rectAreaLTC1,qe.ltc_2.value=oe.state.rectAreaLTC2,qe.pointLights.value=oe.state.point,qe.pointLightShadows.value=oe.state.pointShadow,qe.hemisphereLights.value=oe.state.hemi,qe.directionalShadowMap.value=oe.state.directionalShadowMap,qe.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,qe.spotShadowMap.value=oe.state.spotShadowMap,qe.spotLightMatrix.value=oe.state.spotLightMatrix,qe.spotLightMap.value=oe.state.spotLightMap,qe.pointShadowMap.value=oe.state.pointShadowMap,qe.pointShadowMatrix.value=oe.state.pointShadowMatrix);const vt=Ye.getUniforms(),tn=mo.seqWithValue(vt.seq,qe);return z.currentProgram=Ye,z.uniformsList=tn,Ye}function Du(L,j){const se=Me.get(L);se.outputEncoding=j.outputEncoding,se.instancing=j.instancing,se.skinning=j.skinning,se.morphTargets=j.morphTargets,se.morphNormals=j.morphNormals,se.morphColors=j.morphColors,se.morphTargetsCount=j.morphTargetsCount,se.numClippingPlanes=j.numClippingPlanes,se.numIntersection=j.numClipIntersection,se.vertexAlphas=j.vertexAlphas,se.vertexTangents=j.vertexTangents,se.toneMapping=j.toneMapping}function Cg(L,j,se,z,oe){j.isScene!==!0&&(j=me),_.resetTextureUnits();const Pe=j.fog,ke=z.isMeshStandardMaterial?j.environment:null,He=S===null?m.outputEncoding:S.isXRRenderTarget===!0?S.texture.encoding:hs,Ge=(z.isMeshStandardMaterial?C:x).get(z.envMap||ke),Je=z.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,Ye=!!z.normalMap&&!!se.attributes.tangent,qe=!!se.morphAttributes.position,vt=!!se.morphAttributes.normal,tn=!!se.morphAttributes.color,qn=z.toneMapped?m.toneMapping:ui,Hi=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,xt=Hi!==void 0?Hi.length:0,$e=Me.get(z),$o=f.state.lights;if(G===!0&&(pe===!0||L!==w)){const nn=L===w&&z.id===y;E.setState(z,L,nn)}let Ct=!1;z.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==$o.state.version||$e.outputEncoding!==He||oe.isInstancedMesh&&$e.instancing===!1||!oe.isInstancedMesh&&$e.instancing===!0||oe.isSkinnedMesh&&$e.skinning===!1||!oe.isSkinnedMesh&&$e.skinning===!0||$e.envMap!==Ge||z.fog===!0&&$e.fog!==Pe||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==E.numPlanes||$e.numIntersection!==E.numIntersection)||$e.vertexAlphas!==Je||$e.vertexTangents!==Ye||$e.morphTargets!==qe||$e.morphNormals!==vt||$e.morphColors!==tn||$e.toneMapping!==qn||ie.isWebGL2===!0&&$e.morphTargetsCount!==xt)&&(Ct=!0):(Ct=!0,$e.__version=z.version);let Wi=$e.currentProgram;Ct===!0&&(Wi=hn(z,j,oe));let Nu=!1,Mr=!1,Ko=!1;const Vt=Wi.getUniforms(),Gi=$e.uniforms;if(ee.useProgram(Wi.program)&&(Nu=!0,Mr=!0,Ko=!0),z.id!==y&&(y=z.id,Mr=!0),Nu||w!==L){if(Vt.setValue(q,"projectionMatrix",L.projectionMatrix),ie.logarithmicDepthBuffer&&Vt.setValue(q,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),w!==L&&(w=L,Mr=!0,Ko=!0),z.isShaderMaterial||z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshStandardMaterial||z.envMap){const nn=Vt.map.cameraPosition;nn!==void 0&&nn.setValue(q,fe.setFromMatrixPosition(L.matrixWorld))}(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Vt.setValue(q,"isOrthographic",L.isOrthographicCamera===!0),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial||z.isShadowMaterial||oe.isSkinnedMesh)&&Vt.setValue(q,"viewMatrix",L.matrixWorldInverse)}if(oe.isSkinnedMesh){Vt.setOptional(q,oe,"bindMatrix"),Vt.setOptional(q,oe,"bindMatrixInverse");const nn=oe.skeleton;nn&&(ie.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Vt.setValue(q,"boneTexture",nn.boneTexture,_),Vt.setValue(q,"boneTextureSize",nn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Qo=se.morphAttributes;if((Qo.position!==void 0||Qo.normal!==void 0||Qo.color!==void 0&&ie.isWebGL2===!0)&&D.update(oe,se,z,Wi),(Mr||$e.receiveShadow!==oe.receiveShadow)&&($e.receiveShadow=oe.receiveShadow,Vt.setValue(q,"receiveShadow",oe.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Gi.envMap.value=Ge,Gi.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),Mr&&(Vt.setValue(q,"toneMappingExposure",m.toneMappingExposure),$e.needsLights&&Lg(Gi,Ko),Pe&&z.fog===!0&&he.refreshFogUniforms(Gi,Pe),he.refreshMaterialUniforms(Gi,z,Q,O,ce),mo.upload(q,$e.uniformsList,Gi,_)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(mo.upload(q,$e.uniformsList,Gi,_),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Vt.setValue(q,"center",oe.center),Vt.setValue(q,"modelViewMatrix",oe.modelViewMatrix),Vt.setValue(q,"normalMatrix",oe.normalMatrix),Vt.setValue(q,"modelMatrix",oe.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const nn=z.uniformsGroups;for(let Jo=0,Ig=nn.length;Jo<Ig;Jo++)if(ie.isWebGL2){const Ou=nn[Jo];Se.update(Ou,Wi),Se.bind(Ou,Wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Wi}function Lg(L,j){L.ambientLightColor.needsUpdate=j,L.lightProbe.needsUpdate=j,L.directionalLights.needsUpdate=j,L.directionalLightShadows.needsUpdate=j,L.pointLights.needsUpdate=j,L.pointLightShadows.needsUpdate=j,L.spotLights.needsUpdate=j,L.spotLightShadows.needsUpdate=j,L.rectAreaLights.needsUpdate=j,L.hemisphereLights.needsUpdate=j}function Rg(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(L,j,se){Me.get(L.texture).__webglTexture=j,Me.get(L.depthTexture).__webglTexture=se;const z=Me.get(L);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=se===void 0,z.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,j){const se=Me.get(L);se.__webglFramebuffer=j,se.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(L,j=0,se=0){S=L,g=j,b=se;let z=!0,oe=null,Pe=!1,ke=!1;if(L){const Ge=Me.get(L);Ge.__useDefaultFramebuffer!==void 0?(ee.bindFramebuffer(36160,null),z=!1):Ge.__webglFramebuffer===void 0?_.setupRenderTarget(L):Ge.__hasExternalTextures&&_.rebindTextures(L,Me.get(L.texture).__webglTexture,Me.get(L.depthTexture).__webglTexture);const Je=L.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(ke=!0);const Ye=Me.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(oe=Ye[j],Pe=!0):ie.isWebGL2&&L.samples>0&&_.useMultisampledRTT(L)===!1?oe=Me.get(L).__webglMultisampledFramebuffer:oe=Ye,A.copy(L.viewport),P.copy(L.scissor),M=L.scissorTest}else A.copy(V).multiplyScalar(Q).floor(),P.copy(te).multiplyScalar(Q).floor(),M=re;if(ee.bindFramebuffer(36160,oe)&&ie.drawBuffers&&z&&ee.drawBuffers(L,oe),ee.viewport(A),ee.scissor(P),ee.setScissorTest(M),Pe){const Ge=Me.get(L.texture);q.framebufferTexture2D(36160,36064,34069+j,Ge.__webglTexture,se)}else if(ke){const Ge=Me.get(L.texture),Je=j||0;q.framebufferTextureLayer(36160,36064,Ge.__webglTexture,se||0,Je)}y=-1},this.readRenderTargetPixels=function(L,j,se,z,oe,Pe,ke){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=Me.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&ke!==void 0&&(He=He[ke]),He){ee.bindFramebuffer(36160,He);try{const Ge=L.texture,Je=Ge.format,Ye=Ge.type;if(Je!==_n&&de.convert(Je)!==q.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qe=Ye===ta&&(J.has("EXT_color_buffer_half_float")||ie.isWebGL2&&J.has("EXT_color_buffer_float"));if(Ye!==us&&de.convert(Ye)!==q.getParameter(35738)&&!(Ye===Ii&&(ie.isWebGL2||J.has("OES_texture_float")||J.has("WEBGL_color_buffer_float")))&&!qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=L.width-z&&se>=0&&se<=L.height-oe&&q.readPixels(j,se,z,oe,de.convert(Je),de.convert(Ye),Pe)}finally{const Ge=S!==null?Me.get(S).__webglFramebuffer:null;ee.bindFramebuffer(36160,Ge)}}},this.copyFramebufferToTexture=function(L,j,se=0){const z=Math.pow(2,-se),oe=Math.floor(j.image.width*z),Pe=Math.floor(j.image.height*z);_.setTexture2D(j,0),q.copyTexSubImage2D(3553,se,0,0,L.x,L.y,oe,Pe),ee.unbindTexture()},this.copyTextureToTexture=function(L,j,se,z=0){const oe=j.image.width,Pe=j.image.height,ke=de.convert(se.format),He=de.convert(se.type);_.setTexture2D(se,0),q.pixelStorei(37440,se.flipY),q.pixelStorei(37441,se.premultiplyAlpha),q.pixelStorei(3317,se.unpackAlignment),j.isDataTexture?q.texSubImage2D(3553,z,L.x,L.y,oe,Pe,ke,He,j.image.data):j.isCompressedTexture?q.compressedTexSubImage2D(3553,z,L.x,L.y,j.mipmaps[0].width,j.mipmaps[0].height,ke,j.mipmaps[0].data):q.texSubImage2D(3553,z,L.x,L.y,ke,He,j.image),z===0&&se.generateMipmaps&&q.generateMipmap(3553),ee.unbindTexture()},this.copyTextureToTexture3D=function(L,j,se,z,oe=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Pe=L.max.x-L.min.x+1,ke=L.max.y-L.min.y+1,He=L.max.z-L.min.z+1,Ge=de.convert(z.format),Je=de.convert(z.type);let Ye;if(z.isData3DTexture)_.setTexture3D(z,0),Ye=32879;else if(z.isDataArrayTexture)_.setTexture2DArray(z,0),Ye=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}q.pixelStorei(37440,z.flipY),q.pixelStorei(37441,z.premultiplyAlpha),q.pixelStorei(3317,z.unpackAlignment);const qe=q.getParameter(3314),vt=q.getParameter(32878),tn=q.getParameter(3316),qn=q.getParameter(3315),Hi=q.getParameter(32877),xt=se.isCompressedTexture?se.mipmaps[0]:se.image;q.pixelStorei(3314,xt.width),q.pixelStorei(32878,xt.height),q.pixelStorei(3316,L.min.x),q.pixelStorei(3315,L.min.y),q.pixelStorei(32877,L.min.z),se.isDataTexture||se.isData3DTexture?q.texSubImage3D(Ye,oe,j.x,j.y,j.z,Pe,ke,He,Ge,Je,xt.data):se.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),q.compressedTexSubImage3D(Ye,oe,j.x,j.y,j.z,Pe,ke,He,Ge,xt.data)):q.texSubImage3D(Ye,oe,j.x,j.y,j.z,Pe,ke,He,Ge,Je,xt),q.pixelStorei(3314,qe),q.pixelStorei(32878,vt),q.pixelStorei(3316,tn),q.pixelStorei(3315,qn),q.pixelStorei(32877,Hi),oe===0&&z.generateMipmaps&&q.generateMipmap(Ye),ee.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?_.setTextureCube(L,0):L.isData3DTexture?_.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?_.setTexture2DArray(L,0):_.setTexture2D(L,0),ee.unbindTexture()},this.resetState=function(){g=0,b=0,S=null,ee.reset(),K.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class lE extends Bm{}lE.prototype.isWebGL1Renderer=!0;class uu{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ve(e),this.near=t,this.far=i}clone(){return new uu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}}class cE extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class uE{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=_c,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ht=new U;class hu{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ai(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const zf=new U,Hf=new at,Wf=new at,hE=new U,Gf=new je;class fE extends Zt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new je,this.bindMatrixInverse=new je}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const i=this.skeleton,s=this.geometry;Hf.fromBufferAttribute(s.attributes.skinIndex,e),Wf.fromBufferAttribute(s.attributes.skinWeight,e),zf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Wf.getComponent(r);if(a!==0){const o=Hf.getComponent(r);Gf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(hE.copy(zf).applyMatrix4(Gf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Vm extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class dE extends Pt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=pt,u=pt,h,f){super(null,a,o,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jf=new je,pE=new je;class fu{constructor(e=[],t=[]){this.uuid=Pn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new je;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:pE;jf.multiplyMatrices(o,t[r]),jf.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new fu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=bm(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new dE(t,e,e,_n,Ii);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Vm),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class Xf extends qt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yf=new je,qf=new je,Qa=[],mE=new je,Lr=new Zt;class gE extends Zt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xf(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.frustumCulled=!1;for(let s=0;s<i;s++)this.setMatrixAt(s,mE)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Lr.geometry=this.geometry,Lr.material=this.material,Lr.material!==void 0)for(let r=0;r<s;r++){this.getMatrixAt(r,Yf),qf.multiplyMatrices(i,Yf),Lr.matrixWorld=qf,Lr.raycast(e,Qa);for(let a=0,o=Qa.length;a<o;a++){const l=Qa[a];l.instanceId=r,l.object=this,t.push(l)}Qa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xf(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class zm extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $f=new U,Kf=new U,Qf=new je,Hl=new au,Ja=new gr;class du extends ft{constructor(e=new un,t=new zm){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)$f.fromBufferAttribute(t,s-1),Kf.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=$f.distanceTo(Kf);e.setAttribute("lineDistance",new Bt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ja.copy(i.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;Qf.copy(s).invert(),Hl.copy(e.ray).applyMatrix4(Qf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new U,u=new U,h=new U,f=new U,p=this.isLineSegments?2:1,v=i.index,d=i.attributes.position;if(v!==null){const g=Math.max(0,a.start),b=Math.min(v.count,a.start+a.count);for(let S=g,y=b-1;S<y;S+=p){const w=v.getX(S),A=v.getX(S+1);if(c.fromBufferAttribute(d,w),u.fromBufferAttribute(d,A),Hl.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const M=e.ray.origin.distanceTo(f);M<e.near||M>e.far||t.push({distance:M,point:h.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,a.start),b=Math.min(d.count,a.start+a.count);for(let S=g,y=b-1;S<y;S+=p){if(c.fromBufferAttribute(d,S),u.fromBufferAttribute(d,S+1),Hl.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Jf=new U,Zf=new U;class _E extends du{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Jf.fromBufferAttribute(t,s),Zf.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Jf.distanceTo(Zf);e.setAttribute("lineDistance",new Bt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class vE extends du{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Hm extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ed=new je,bc=new au,Za=new gr,eo=new U;class xE extends ft{constructor(e=new un,t=new Hm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Za.copy(i.boundingSphere),Za.applyMatrix4(s),Za.radius+=r,e.ray.intersectsSphere(Za)===!1)return;ed.copy(s).invert(),bc.copy(e.ray).applyMatrix4(ed);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=f,m=p;v<m;v++){const d=c.getX(v);eo.fromBufferAttribute(h,d),td(eo,d,l,s,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=f,m=p;v<m;v++)eo.fromBufferAttribute(h,v),td(eo,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function td(n,e,t,i,s,r,a){const o=bc.distanceSqToPoint(n);if(o<t){const l=new U;bc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class pu extends un{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new Bt(r,3)),this.setAttribute("normal",new Bt(r.slice(),3)),this.setAttribute("uv",new Bt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const S=new U,y=new U,w=new U;for(let A=0;A<t.length;A+=3)p(t[A+0],S),p(t[A+1],y),p(t[A+2],w),l(S,y,w,b)}function l(b,S,y,w){const A=w+1,P=[];for(let M=0;M<=A;M++){P[M]=[];const I=b.clone().lerp(y,M/A),O=S.clone().lerp(y,M/A),Q=A-M;for(let ue=0;ue<=Q;ue++)ue===0&&M===A?P[M][ue]=I:P[M][ue]=I.clone().lerp(O,ue/Q)}for(let M=0;M<A;M++)for(let I=0;I<2*(A-M)-1;I++){const O=Math.floor(I/2);I%2===0?(f(P[M][O+1]),f(P[M+1][O]),f(P[M][O])):(f(P[M][O+1]),f(P[M+1][O+1]),f(P[M+1][O]))}}function c(b){const S=new U;for(let y=0;y<r.length;y+=3)S.x=r[y+0],S.y=r[y+1],S.z=r[y+2],S.normalize().multiplyScalar(b),r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z}function u(){const b=new U;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];const y=d(b)/2/Math.PI+.5,w=g(b)/Math.PI+.5;a.push(y,1-w)}v(),h()}function h(){for(let b=0;b<a.length;b+=6){const S=a[b+0],y=a[b+2],w=a[b+4],A=Math.max(S,y,w),P=Math.min(S,y,w);A>.9&&P<.1&&(S<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,S){const y=b*3;S.x=e[y+0],S.y=e[y+1],S.z=e[y+2]}function v(){const b=new U,S=new U,y=new U,w=new U,A=new Ue,P=new Ue,M=new Ue;for(let I=0,O=0;I<r.length;I+=9,O+=6){b.set(r[I+0],r[I+1],r[I+2]),S.set(r[I+3],r[I+4],r[I+5]),y.set(r[I+6],r[I+7],r[I+8]),A.set(a[O+0],a[O+1]),P.set(a[O+2],a[O+3]),M.set(a[O+4],a[O+5]),w.copy(b).add(S).add(y).divideScalar(3);const Q=d(w);m(A,O+0,b,Q),m(P,O+2,S,Q),m(M,O+4,y,Q)}}function m(b,S,y,w){w<0&&b.x===1&&(a[S]=b.x-1),y.x===0&&y.z===0&&(a[S]=w/2/Math.PI+.5)}function d(b){return Math.atan2(b.z,-b.x)}function g(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}static fromJSON(e){return new pu(e.vertices,e.indices,e.radius,e.details)}}class mu extends pu{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new mu(e.radius,e.detail)}}class gu extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=su,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gs extends gu{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class yE extends Dn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=su,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}function bi(n,e,t){return Wm(n)?new n.constructor(n.subarray(e,t!==void 0?t:n.length)):n.slice(e,t)}function to(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Wm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function bE(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function nd(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function Gm(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}class ya{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ME extends ya{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sf,endingEnd:sf}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case rf:r=e,o=2*t-i;break;case af:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case rf:a=e,l=2*i-t;break;case af:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,v=(i-t)/(s-t),m=v*v,d=m*v,g=-f*d+2*f*m-f*v,b=(1+f)*d+(-1.5-2*f)*m+(-.5+f)*v+1,S=(-1-p)*d+(1.5+p)*m+.5*v,y=p*d-p*m;for(let w=0;w!==o;++w)r[w]=g*a[u+w]+b*a[c+w]+S*a[l+w]+y*a[h+w];return r}}class SE extends ya{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*h+a[l+f]*u;return r}}class wE extends ya{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Xn{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=to(t,this.TimeBufferType),this.values=to(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:to(e.times,Array),values:to(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new wE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new SE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ME(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case na:t=this.InterpolantFactoryMethodDiscrete;break;case sr:t=this.InterpolantFactoryMethodLinear;break;case pl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return na;case this.InterpolantFactoryMethodLinear:return sr;case this.InterpolantFactoryMethodSmooth:return pl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=bi(i,r,a),this.values=bi(this.values,r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Wm(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=bi(this.times),t=bi(this.values),i=this.getValueSize(),s=this.getInterpolation()===pl,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{const h=o*i,f=h-i,p=h+i;for(let v=0;v!==i;++v){const m=t[h+v];if(m!==t[f+v]||m!==t[p+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*i,f=a*i;for(let p=0;p!==i;++p)t[f+p]=t[h+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=bi(e,0,a),this.values=bi(t,0,a*i)):(this.times=e,this.values=t),this}clone(){const e=bi(this.times,0),t=bi(this.values,0),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=sr;class vr extends Xn{}vr.prototype.ValueTypeName="bool";vr.prototype.ValueBufferType=Array;vr.prototype.DefaultInterpolation=na;vr.prototype.InterpolantFactoryMethodLinear=void 0;vr.prototype.InterpolantFactoryMethodSmooth=void 0;class jm extends Xn{}jm.prototype.ValueTypeName="color";class aa extends Xn{}aa.prototype.ValueTypeName="number";class EE extends ya{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let u=c+o;c!==u;c+=4)Ui.slerpFlat(r,0,a,c-o,a,c,l);return r}}class fs extends Xn{InterpolantFactoryMethodLinear(e){return new EE(this.times,this.values,this.getValueSize(),e)}}fs.prototype.ValueTypeName="quaternion";fs.prototype.DefaultInterpolation=sr;fs.prototype.InterpolantFactoryMethodSmooth=void 0;class xr extends Xn{}xr.prototype.ValueTypeName="string";xr.prototype.ValueBufferType=Array;xr.prototype.DefaultInterpolation=na;xr.prototype.InterpolantFactoryMethodLinear=void 0;xr.prototype.InterpolantFactoryMethodSmooth=void 0;class oa extends Xn{}oa.prototype.ValueTypeName="vector";class TE{constructor(e,t=-1,i,s=Xx){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Pn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(CE(i[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=i.length;r!==a;++r)t.push(Xn.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const u=bE(l);l=nd(l,1,u),c=nd(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new aa(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let f=s[h];f||(s[h]=f=[]),f.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(h,f,p,v,m){if(p.length!==0){const d=[],g=[];Gm(p,d,g,v),d.length!==0&&m.push(new h(f,d,g))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const p={};let v;for(v=0;v<f.length;v++)if(f[v].morphTargets)for(let m=0;m<f[v].morphTargets.length;m++)p[f[v].morphTargets[m]]=-1;for(const m in p){const d=[],g=[];for(let b=0;b!==f[v].morphTargets.length;++b){const S=f[v];d.push(S.time),g.push(S.morphTarget===m?1:0)}s.push(new aa(".morphTargetInfluence["+m+"]",d,g))}l=p.length*a}else{const p=".bones["+t[h].name+"]";i(oa,p+".position",f,"pos",s),i(fs,p+".quaternion",f,"rot",s),i(oa,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function AE(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return aa;case"vector":case"vector2":case"vector3":case"vector4":return oa;case"color":return jm;case"quaternion":return fs;case"bool":case"boolean":return vr;case"string":return xr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function CE(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=AE(n.type);if(n.times===void 0){const t=[],i=[];Gm(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const ar={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class LE{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}}const RE=new LE;class ba{constructor(e){this.manager=e!==void 0?e:RE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const ti={};class IE extends Error{constructor(e,t){super(e),this.response=t}}class Xm extends ba{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ar.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:i,onError:s});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=ti[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=f?parseInt(f):0,v=p!==0;let m=0;const d=new ReadableStream({start(g){b();function b(){h.read().then(({done:S,value:y})=>{if(S)g.close();else{m+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:v,loaded:m,total:p});for(let A=0,P=u.length;A<P;A++){const M=u[A];M.onProgress&&M.onProgress(w)}g.enqueue(y),b()}})}}});return new Response(d)}else throw new IE(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(f);return c.arrayBuffer().then(v=>p.decode(v))}}}).then(c=>{ar.add(e,c);const u=ti[e];delete ti[e];for(let h=0,f=u.length;h<f;h++){const p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=ti[e];if(u===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let h=0,f=u.length;h<f;h++){const p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class PE extends ba{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ar.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ra("img");function l(){u(),ar.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class DE extends ba{constructor(e){super(e)}load(e,t,i,s){const r=new Pt,a=new PE(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class Ma extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class NE extends Ma{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DefaultUp),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Wl=new je,id=new U,sd=new U;class _u{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ou,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;id.setFromMatrixPosition(e.matrixWorld),t.position.copy(id),sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sd),t.updateMatrixWorld(),Wl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class OE extends _u{constructor(){super(new Yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=sa*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class FE extends Ma{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DefaultUp),this.updateMatrix(),this.target=new ft,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new OE}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const rd=new je,Rr=new U,Gl=new U;class kE extends _u{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ue(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Rr.setFromMatrixPosition(e.matrixWorld),i.position.copy(Rr),Gl.copy(i.position),Gl.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Gl),i.updateMatrixWorld(),s.makeTranslation(-Rr.x,-Rr.y,-Rr.z),rd.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rd)}}class Ym extends Ma{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new kE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class UE extends _u{constructor(){super(new xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vu extends Ma{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DefaultUp),this.updateMatrix(),this.target=new ft,this.shadow=new UE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class BE extends Ma{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ls{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,s=e.length;i<s;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class VE extends ba{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ar.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){ar.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){s&&s(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}class zE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ad(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ad();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ad(){return(typeof performance>"u"?Date:performance).now()}const xu="\\[\\]\\.:\\/",HE=new RegExp("["+xu+"]","g"),yu="[^"+xu+"]",WE="[^"+xu.replace("\\.","")+"]",GE=/((?:WC+[\/:])*)/.source.replace("WC",yu),jE=/(WCOD+)?/.source.replace("WCOD",WE),XE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yu),YE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yu),qE=new RegExp("^"+GE+jE+XE+YE+"$"),$E=["material","materials","bones","map"];class KE{constructor(e,t,i){const s=i||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class st{constructor(e,t,i){this.path=t,this.parsedPath=i||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,i):new st(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(HE,"")}static parseTrackName(e){const t=qE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);$E.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=KE;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:iu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=iu);/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.16.0
 * @author George Michael Brower
 * @license MIT
 */class Gn{constructor(e,t,i,s,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),Gn.nextNameID=Gn.nextNameID||0,this.$name.id="lil-gui-name-"+ ++Gn.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback),this.updateDisplay()}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class QE extends Gn{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Mc(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!t&&"#"+t}const JE={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:Mc,toHexString:Mc},la={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},ZE={isPrimitive:!1,match:Array.isArray,fromHexString(n,e,t=1){const i=la.fromHexString(n);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(255&i)/255*t},toHexString:([n,e,t],i=1)=>la.toHexString(n*(i=255/i)<<16^e*i<<8^t*i<<0)},e1={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const i=la.fromHexString(n);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(255&i)/255*t},toHexString:({r:n,g:e,b:t},i=1)=>la.toHexString(n*(i=255/i)<<16^e*i<<8^t*i<<0)},t1=[JE,la,ZE,e1];class n1 extends Gn{constructor(e,t,i,s){var r;super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,t1.find(a=>a.match(r))),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=Mc(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class jl extends Gn{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{}),this.$disable=this.$button}}class i1 extends Gn{constructor(e,t,i,s,r,a){super(e,t,i,"number"),this._initInput(),this.min(s),this.max(r);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=100*t+"%"}return this._inputFocused||(this.$input.value=e),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=u=>{const h=parseFloat(this.$input.value);isNaN(h)||(this._snapClampSetValue(h+u),this.$input.value=this.getValue())};let t,i,s,r,a,o=!1;const l=u=>{if(o){const h=u.clientX-t,f=u.clientY-i;Math.abs(f)>5?(u.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(h)>5&&c()}if(!o){const h=u.clientY-s;a-=h*this._step*this._arrowKeyMultiplier(u),r+a>this._max?a=this._max-r:r+a<this._min&&(a=this._min-r),this._snapClampSetValue(r+a)}s=u.clientY},c=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",c)};this.$input.addEventListener("input",()=>{const u=parseFloat(this.$input.value);isNaN(u)||this.setValue(this._clamp(u))}),this.$input.addEventListener("keydown",u=>{u.code==="Enter"&&this.$input.blur(),u.code==="ArrowUp"&&(u.preventDefault(),e(this._step*this._arrowKeyMultiplier(u))),u.code==="ArrowDown"&&(u.preventDefault(),e(this._step*this._arrowKeyMultiplier(u)*-1))}),this.$input.addEventListener("wheel",u=>{this._inputFocused&&(u.preventDefault(),e(this._step*this._normalizeMouseWheel(u)))}),this.$input.addEventListener("mousedown",u=>{t=u.clientX,i=s=u.clientY,o=!0,r=this.getValue(),a=0,window.addEventListener("mousemove",l),window.addEventListener("mouseup",c)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=f=>{const p=this.$slider.getBoundingClientRect();let v=(m=f,d=p.left,g=p.right,b=this._min,S=this._max,(m-d)/(g-d)*(S-b)+b);var m,d,g,b,S;this._snapClampSetValue(v)},t=f=>{e(f.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",i)};let s,r,a=!1;const o=f=>{f.preventDefault(),this._setDraggingStyle(!0),e(f.touches[0].clientX),a=!1},l=f=>{if(a){const p=f.touches[0].clientX-s,v=f.touches[0].clientY-r;Math.abs(p)>Math.abs(v)?o(f):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c))}else f.preventDefault(),e(f.touches[0].clientX)},c=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c)},u=this._callOnFinishChange.bind(this);let h;this.$slider.addEventListener("mousedown",f=>{this._setDraggingStyle(!0),e(f.clientX),window.addEventListener("mousemove",t),window.addEventListener("mouseup",i)}),this.$slider.addEventListener("touchstart",f=>{f.touches.length>1||(this._hasScrollBar?(s=f.touches[0].clientX,r=f.touches[0].clientY,a=!0):o(f),window.addEventListener("touchmove",l),window.addEventListener("touchend",c))}),this.$slider.addEventListener("wheel",f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const p=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+p),this.$input.value=this.getValue(),clearTimeout(h),h=setTimeout(u,400)})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+t,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class s1 extends Gn{constructor(e,t,i,s){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(s)?s:Object.values(s),this._names=Array.isArray(s)?s:Object.keys(s),this._names.forEach(r=>{const a=document.createElement("option");a.innerHTML=r,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class r1 extends Gn{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let od=!1;class bu{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:s,title:r="Controls",injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{l.code!=="Enter"&&l.code!=="Space"||(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),o&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!od&&a&&(function(l){const c=document.createElement("style");c.innerHTML=l;const u=document.querySelector("head link[rel=stylesheet], head style");u?document.head.insertBefore(c,u):document.head.appendChild(c)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),od=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,i,s,r){if(Object(i)===i)return new s1(this,e,t,i);const a=e[t];switch(typeof a){case"number":return new i1(this,e,t,i,s,r);case"boolean":return new QE(this,e,t);case"string":return new r1(this,e,t);case"function":return new jl(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,i=1){return new n1(this,e,t,i)}addFolder(e){return new bu({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof jl||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof jl)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(t=>t.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function ld(n){let e=document.getElementById("three-canvas");const t=new cE,i=new Bm({antialias:!0,alpha:!0}),s=new Yt(45,window.innerWidth/window.innerHeight,1);s.position.z=5,s.position.y=0,i.setSize(window.innerWidth,window.innerHeight);let r=e.lastElementChild;for(;r;)e.removeChild(r),r=e.lastElementChild;return e.appendChild(i.domElement),t.fog=new uu(742292,5,180),{scene:t,camera:s,renderer:i}}class gt{constructor(e,t){Sn(this,"scene");this.lights=[];let i=this;this.scene=e,this.gui=t.addFolder("Lights").close(),this.addEnable=!0,this.addSelection={selection:gt.TYPE.None,add:s},this.addMenu();function s(){i.addLight(i.addSelection.selection),i.lights.length>=3&&i.addEnable.disable()}e.add(new BE(10066329))}addShadow(e){e.castShadow=!0,e.shadow.camera.near=.1,e.shadow.camera.far=500,e.shadow.radius=4,e.shadow.blurSamples=8,e.shadow.camera.right=15,e.shadow.camera.left=-15,e.shadow.camera.top=15,e.shadow.camera.bottom=-15,e.shadow.mapSize.width=512,e.shadow.mapSize.height=512,e.shadow.bias=-5e-4}addMenu(){const e=this.gui.addFolder("Add Light");e.add(this.addSelection,"selection",{None:gt.TYPE.None,Point:gt.TYPE.Point,Directional:gt.TYPE.Directional,Hemisphere:gt.TYPE.Hemisphere}).name("Light Type"),this.addEnable=e.add(this.addSelection,"add").name("Add")}addLight(e,t){switch(e){case gt.TYPE.None:break;case gt.TYPE.Point:this.initPointLight(t||gt.PointLIGHT);break;case gt.TYPE.Directional:this.initDirLight(t||gt.DirLIGHT);break;case gt.TYPE.Hemisphere:this.initHemiLight(t||gt.HemiLIGHT);break}}removeLight(e,t){this.scene.remove(e),e.dispose(),t.destroy()}initPointLight(e){let t=new Ym(e.color,e.intensity,e.distance);t.position.set(3,3,3),this.addShadow(t),this.scene.add(t),this.lights.push(e);let i=this.lights.length-1;return this.pointLightGUI(i,t),t}initDirLight(e){let t=new vu(e.color),i=e.rotate.r*Math.cos(e.rotate.a*Math.PI/180),s=e.rotate.r*Math.sin(e.rotate.a*Math.PI/180);t.position.set(i,e.rotate.h,s),t.intensity=e.intensity,this.addShadow(t),this.scene.add(t),this.lights.push(e);let r=this.lights.length-1;return this.dirLightGUI(r,t),t}initHemiLight(e){let t=new NE(e.color,e.groundColor);this.scene.add(t),this.lights.push(e);let i=this.lights.length-1;return this.hemiLightGUI(i,t),t}pointLightGUI(e,t){let i=this,s="#"+e+" PointLight";const r=this.gui.addFolder(s);r.add(this.lights[e],"intensity",0,100).name("Intensity").onChange(function(l){t.intensity=l}),r.add(this.lights[e],"distance",0,500).name("Distance").onChange(function(l){t.distance=l}),r.addColor(t,"color").name("Color").onChange(function(){i.lights[e].color=t.color}),r.add(this.lights[e].position,"x",-20,20).onChange(function(l){t.position.x=l}),r.add(this.lights[e].position,"y",-20,20).onChange(function(l){t.position.y=l}),r.add(this.lights[e].position,"z",-20,20).onChange(function(l){t.position.z=l}),r.add(this.lights[e],"decay",1,5).name("Decay").onChange(function(l){t.decay=l}),r.add(this.lights[e],"power",1,1e3).name("Power").onChange(function(l){t.power=l}),r.add(this.lights[e].shadow,"radius",0,10).name("Shadow Radius").onChange(function(l){t.shadow.radius=l}),r.add(this.lights[e].shadow,"blurSamples",1,10,1).name("Blur Samples").onChange(function(l){t.shadow.blurSamples=l});let a={Enable:!0,Remove:o};r.add(a,"Enable").onChange(function(){a.Enable?(i.scene.add(t),i.lights[e].enable=!0):(i.scene.remove(t),i.lights[e].enable=!1)});function o(){i.addEnable.enable(),i.removeLight(t,r),i.lights.splice(e,1)}r.add(a,"Remove")}dirLightGUI(e,t){let i=this,s="#"+e+" Directional Light";const r=this.gui.addFolder(s);r.add(this.lights[e],"intensity",0,20).name("Intensity").onChange(function(l){t.intensity=l}),r.addColor(t,"color").name("Color").onChange(function(){i.lights[e].color=t.color}),r.add(this.lights[e].rotate,"r",0,50).onChange(function(l){let c=l*Math.cos(i.lights[e].rotate.a*Math.PI/180),u=l*Math.sin(i.lights[e].rotate.a*Math.PI/180);t.position.set(c,i.lights[e].rotate.h,u)}).name("Rotate Radius"),r.add(this.lights[e].rotate,"a",-360,360).onChange(function(l){let c=i.lights[e].rotate.r*Math.cos(l*Math.PI/180),u=i.lights[e].rotate.r*Math.sin(l*Math.PI/180);t.position.set(c,i.lights[e].rotate.h,u)}).name("Rotate Angle"),r.add(this.lights[e].rotate,"h",1,20).onChange(function(l){t.position.y=l}).name("Light Height"),r.add(this.lights[e].shadow,"radius",0,10).name("Shadow Radius").onChange(function(l){t.shadow.radius=l}),r.add(this.lights[e].shadow,"blurSamples",1,10,1).name("Blur Samples").onChange(function(l){t.shadow.blurSamples=l});let a={Enable:!0,Remove:o};r.add(a,"Enable").onChange(function(){a.Enable?(i.scene.add(t),i.lights[e].enable=!0):(i.scene.remove(t),i.lights[e].enable=!1)});function o(){i.addEnable.enable(),i.removeLight(t,r),i.lights.splice(e,1)}r.add(a,"Remove")}hemiLightGUI(e,t){let i=this,s="#"+e+" Hemisphere Light";const r=this.gui.addFolder(s);r.add(this.lights[e],"intensity",0,20).name("Intensity").onChange(function(l){t.intensity=l}),r.addColor(t,"color").name("Sky Color").onChange(function(){i.lights[e].color=t.color}),r.addColor(t,"groundColor").name("Ground Color").onChange(function(){i.lights[e].groundColor=t.groundColor});let a={Enable:!0,Remove:o};r.add(a,"Enable").onChange(function(){a.Enable?(i.scene.add(t),i.lights[e].enable=!0):(i.scene.remove(t),i.lights[e].enable=!1)});function o(){i.addEnable.enable(),i.removeLight(t,r),i.lights.splice(e,1)}r.add(a,"Remove")}}gt.TYPE={None:0,Point:1,Directional:2,Hemisphere:3,Spot:4};gt.PointLIGHT={type:gt.TYPE.Point,intensity:40,distance:100,color:16776960,position:{x:3,y:3,z:3},decay:1,power:500,shadow:{radius:4,blurSamples:8},enable:!0};gt.DirLIGHT={type:gt.TYPE.Directional,intensity:1,color:65535,rotate:{r:20,a:90,h:15},shadow:{radius:4,blurSamples:8},enable:!0};gt.HemiLIGHT={type:gt.TYPE.Hemisphere,intensity:1,color:16777215,groundColor:1184307,enable:!0};class a1 extends ba{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new h1(t)}),this.register(function(t){return new v1(t)}),this.register(function(t){return new x1(t)}),this.register(function(t){return new d1(t)}),this.register(function(t){return new p1(t)}),this.register(function(t){return new m1(t)}),this.register(function(t){return new g1(t)}),this.register(function(t){return new u1(t)}),this.register(function(t){return new _1(t)}),this.register(function(t){return new f1(t)}),this.register(function(t){return new l1(t)}),this.register(function(t){return new y1(t)}),this.register(function(t){return new b1(t)})}load(e,t,i,s){const r=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=ls.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Xm(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const a={},o={};if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(ls.decodeText(new Uint8Array(e,0,4))===qm){try{a[Qe.KHR_BINARY_GLTF]=new M1(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(ls.decodeText(new Uint8Array(e)));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new N1(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const u=this.pluginCallbacks[c](l);o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let c=0;c<r.extensionsUsed.length;++c){const u=r.extensionsUsed[c],h=r.extensionsRequired||[];switch(u){case Qe.KHR_MATERIALS_UNLIT:a[u]=new c1;break;case Qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new S1(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:a[u]=new w1;break;case Qe.KHR_MESH_QUANTIZATION:a[u]=new E1;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function o1(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class l1{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ve(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new vu(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ym(u),c.distance=h;break;case"spot":c=new FE(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Li(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class c1{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return oi}extendParams(e,t,i){const s=[];e.color=new Ve(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,rt))}return Promise.all(s)}}class u1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class h1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ue(o,o)}return Promise.all(r)}}class f1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class d1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ve(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",a.sheenColorTexture,rt)),a.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class p1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class m1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ve(o[0],o[1],o[2]),Promise.all(r)}}class g1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class _1{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:gs}extendMaterialParams(e,t){const i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ve(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",a.specularColorTexture,rt)),Promise.all(r)}}class v1{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class x1{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class y1{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,f,s.mode,s.filter),p})})}else return null}}class b1{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==dn.TRIANGLES&&c.mode!==dn.TRIANGLE_STRIP&&c.mode!==dn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],f=c[0].count,p=[];for(const v of h){const m=new je,d=new U,g=new Ui,b=new U(1,1,1),S=new gE(v.geometry,v.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&d.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),S.setMatrixAt(y,m.compose(d,g,b));for(const y in l)y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&v.geometry.setAttribute(y,l[y]);ft.prototype.copy.call(S,v),S.frustumCulled=!1,this.parser.assignFinalMaterial(S),p.push(S)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const qm="glTF",Ir=12,cd={JSON:1313821514,BIN:5130562};class M1{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ir);if(this.header={magic:ls.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==qm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ir,s=new DataView(e,Ir);let r=0;for(;r<i;){const a=s.getUint32(r,!0);r+=4;const o=s.getUint32(r,!0);if(r+=4,o===cd.JSON){const l=new Uint8Array(e,Ir+r,a);this.content=ls.decodeText(l)}else if(o===cd.BIN){const l=Ir+r;this.body=e.slice(l,l+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class S1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const h=Sc[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Sc[u]||u.toLowerCase();if(a[u]!==void 0){const f=i.accessors[e.attributes[u]],p=$s[f.componentType];c[h]=p.name,l[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h){s.decodeDracoFile(u,function(f){for(const p in f.attributes){const v=f.attributes[p],m=l[p];m!==void 0&&(v.normalized=m)}h(f)},o,c)})})}}class w1{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class E1{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class $m extends ya{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,h=(i-t)/u,f=h*h,p=f*h,v=e*c,m=v-c,d=-2*p+3*f,g=p-f,b=1-d,S=g-f+h;for(let y=0;y!==o;y++){const w=a[m+y+o],A=a[m+y+l]*u,P=a[v+y+o],M=a[v+y]*u;r[y]=b*w+S*A+d*P+g*M}return r}}const T1=new Ui;class A1 extends $m{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return T1.fromArray(r).normalize().toArray(r),r}}const dn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},$s={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ud={9728:pt,9729:Jt,9984:mc,9985:vm,9986:gc,9987:dr},hd={33071:gn,33648:So,10497:nr},Xl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Sc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},C1={CUBICSPLINE:void 0,LINEAR:sr,STEP:na},Yl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function L1(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new gu({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:cs})),n.DefaultMaterial}function Pr(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Li(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function R1(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(i){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;a.push(f)}if(s){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;o.push(f)}if(r){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;l.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2];return i&&(n.morphAttributes.position=u),s&&(n.morphAttributes.normal=h),r&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function I1(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function P1(n){const e=n.extensions&&n.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+fd(e.attributes):t=n.indices+":"+fd(n.attributes)+":"+n.mode,t}function fd(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function wc(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function D1(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}class N1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new o1,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=!1,r=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,r=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||s&&r<98?this.textureLoader=new DE(this.options.manager):this.textureLoader=new VE(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xm(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};Pr(r,o,s),Li(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())r(u,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this.loadNode(t);break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(ls.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Xl[s.type],o=$s[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new qt(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Xl[s.type],c=$s[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,f=s.byteOffset||0,p=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,v=s.normalized===!0;let m,d;if(p&&p!==h){const g=Math.floor(f/p),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let S=t.cache.get(b);S||(m=new c(o,g*p,s.count*p/u),S=new uE(m,p/u),t.cache.add(b,S)),d=new hu(S,l,f%p/u,v)}else o===null?m=new c(s.count*l):m=new c(o,f,s.count*l),d=new qt(m,l,v);if(s.sparse!==void 0){const g=Xl.SCALAR,b=$s[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,w=new b(a[1],S,s.sparse.count*g),A=new c(a[2],y,s.sparse.count*l);o!==null&&(d=new qt(d.array.slice(),d.itemSize,d.normalized));for(let P=0,M=w.length;P<M;P++){const I=w[P];if(d.setX(I,A[P*l]),l>=2&&d.setY(I,A[P*l+1]),l>=3&&d.setZ(I,A[P*l+2]),l>=4&&d.setW(I,A[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return d})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"";const f=(r.samplers||{})[a.sampler]||{};return u.magFilter=ud[f.magFilter]||Jt,u.minFilter=ud[f.minFilter]||dr,u.wrapS=hd[f.wrapS]||nr,u.wrapT=hd[f.wrapT]||nr,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const f=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(f),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(f,p){let v=f;t.isImageBitmapLoader===!0&&(v=function(m){const d=new Pt(m);d.needsUpdate=!0,f(d)}),t.load(ls.resolveURL(h,r.path),v,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),h.userData.mimeType=a.mimeType||D1(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord!=0&&!(t==="aoMap"&&i.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+i.texCoord+" for texture "+t+" not yet supported."),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.encoding=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new Hm,Dn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new zm,Dn.prototype.copy.call(l,i),l.color.copy(i.color),this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}i.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=i}getMaterialType(){return gu}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Qe.KHR_MATERIALS_UNLIT]){const h=s[Qe.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Ve(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;o.color.fromArray(f),o.opacity=f[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,rt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=ri);const u=r.alphaMode||Yl.OPAQUE;if(u===Yl.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Yl.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==oi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Ue(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}return r.occlusionTexture!==void 0&&a!==oi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==oi&&(o.emissive=new Ve().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&a!==oi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,rt)),Promise.all(c).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Li(h,r),t.associations.set(h,{materials:e}),r.extensions&&Pr(s,h,r),h})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");let i=t;for(let s=1;this.nodeNamesUsed[i];++s)i=t+"_"+s;return this.nodeNamesUsed[i]=!0,i}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return dd(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=P1(c),h=s[u];if(h)a.push(h.promise);else{let f;c.extensions&&c.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=dd(new un,c,t),s[u]={primitive:c,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?L1(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,v=u.length;p<v;p++){const m=u[p],d=a[p];let g;const b=c[p];if(d.mode===dn.TRIANGLES||d.mode===dn.TRIANGLE_STRIP||d.mode===dn.TRIANGLE_FAN||d.mode===void 0)g=r.isSkinnedMesh===!0?new fE(m,b):new Zt(m,b),g.isSkinnedMesh===!0&&!g.geometry.attributes.skinWeight.normalized&&g.normalizeSkinWeights(),d.mode===dn.TRIANGLE_STRIP?g.geometry=pd(g.geometry,Yx):d.mode===dn.TRIANGLE_FAN&&(g.geometry=pd(g.geometry,ym));else if(d.mode===dn.LINES)g=new _E(m,b);else if(d.mode===dn.LINE_STRIP)g=new du(m,b);else if(d.mode===dn.LINE_LOOP)g=new vE(m,b);else if(d.mode===dn.POINTS)g=new xE(m,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(g.geometry.morphAttributes).length>0&&I1(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Li(g,r),d.extensions&&Pr(s,g,d),t.assignFinalMaterial(g),h.push(g)}for(let p=0,v=h.length;p<v;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return h[0];const f=new ns;t.associations.set(f,{meshes:e});for(let p=0,v=h.length;p<v;p++)f.add(h[p]);return f})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Yt(hy.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new xa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Li(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this.getDependency("node",t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){const h=a[c];if(h){o.push(h);const f=new je;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new fu(o,l)})}loadAnimation(e){const i=this.json.animations[e],s=[],r=[],a=[],o=[],l=[];for(let c=0,u=i.channels.length;c<u;c++){const h=i.channels[c],f=i.samplers[h.sampler],p=h.target,v=p.node,m=i.parameters!==void 0?i.parameters[f.input]:f.input,d=i.parameters!==void 0?i.parameters[f.output]:f.output;s.push(this.getDependency("node",v)),r.push(this.getDependency("accessor",m)),a.push(this.getDependency("accessor",d)),o.push(f),l.push(p)}return Promise.all([Promise.all(s),Promise.all(r),Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2],p=c[3],v=c[4],m=[];for(let g=0,b=u.length;g<b;g++){const S=u[g],y=h[g],w=f[g],A=p[g],P=v[g];if(S===void 0)continue;S.updateMatrix();let M;switch(Mi[P.path]){case Mi.weights:M=aa;break;case Mi.rotation:M=fs;break;case Mi.position:case Mi.scale:default:M=oa;break}const I=S.name?S.name:S.uuid,O=A.interpolation!==void 0?C1[A.interpolation]:sr,Q=[];Mi[P.path]===Mi.weights?S.traverse(function(H){H.morphTargetInfluences&&Q.push(H.name?H.name:H.uuid)}):Q.push(I);let ue=w.array;if(w.normalized){const H=wc(ue.constructor),V=new Float32Array(ue.length);for(let te=0,re=ue.length;te<re;te++)V[te]=ue[te]*H;ue=V}for(let H=0,V=Q.length;H<V;H++){const te=new M(Q[H]+"."+Mi[P.path],y.array,ue,O);A.interpolation==="CUBICSPLINE"&&(te.createInterpolant=function(ne){const G=this instanceof fs?A1:$m;return new G(this.times,this.values,this.getValueSize()/3,ne)},te.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(te)}}const d=i.name?i.name:"animation_"+e;return new TE(d,void 0,m)})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this.extensions,s=this,r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"";return function(){const o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),Promise.all(o)}().then(function(o){let l;if(r.isBone===!0?l=new Vm:o.length>1?l=new ns:o.length===1?l=o[0]:l=new ft,l!==o[0])for(let c=0,u=o.length;c<u;c++)l.add(o[c]);if(r.name&&(l.userData.name=r.name,l.name=a),Li(l,r),r.extensions&&Pr(i,l,r),r.matrix!==void 0){const c=new je;c.fromArray(r.matrix),l.applyMatrix4(c)}else r.translation!==void 0&&l.position.fromArray(r.translation),r.rotation!==void 0&&l.quaternion.fromArray(r.rotation),r.scale!==void 0&&l.scale.fromArray(r.scale);return s.associations.has(l)||s.associations.set(l,{}),s.associations.get(l).nodes=e,l})}loadScene(e){const t=this.json,i=this.extensions,s=this.json.scenes[e],r=this,a=new ns;s.name&&(a.name=r.createUniqueName(s.name)),Li(a,s),s.extensions&&Pr(i,a,s);const o=s.nodes||[],l=[];for(let c=0,u=o.length;c<u;c++)l.push(Km(o[c],a,t,r));return Promise.all(l).then(function(){const c=u=>{const h=new Map;for(const[f,p]of r.associations)(f instanceof Dn||f instanceof Pt)&&h.set(f,p);return u.traverse(f=>{const p=r.associations.get(f);p!=null&&h.set(f,p)}),h};return r.associations=c(a),a})}}function Km(n,e,t,i){const s=t.nodes[n];return i.getDependency("node",n).then(function(r){return s.skin===void 0?r:i.getDependency("skin",s.skin).then(function(a){return r.traverse(function(o){o.isSkinnedMesh&&o.bind(a,o.matrixWorld)}),r})}).then(function(r){e.add(r);const a=[];if(s.children){const o=s.children;for(let l=0,c=o.length;l<c;l++){const u=o[l];a.push(Km(u,r,t,i))}}return Promise.all(a)})}function O1(n,e,t){const i=e.attributes,s=new mr;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new U(l[0],l[1],l[2]),new U(c[0],c[1],c[2])),o.normalized){const u=wc($s[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new U,l=new U;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],p=f.min,v=f.max;if(p!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(v[2]))),f.normalized){const m=wc($s[f.componentType]);l.multiplyScalar(m)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const a=new gr;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function dd(n,e,t){const i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(const a in i){const o=Sc[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){const a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return Li(n,e),O1(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?R1(n,e.targets,t):n})}function pd(n,e){let t=n.getIndex();if(t===null){const a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===ym)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r}const md={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class _s{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const F1=new xa(-1,1,1,-1,0,1),Mu=new un;Mu.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3));Mu.setAttribute("uv",new Bt([0,2,0,0,2,0],2));class ca{constructor(e){this._mesh=new Zt(Mu,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,F1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class cn extends _s{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Mn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Wo.clone(e.uniforms),this.material=new Mn({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ca(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class gd extends _s{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class k1 extends _s{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class U1{constructor(e,t){if(this.renderer=e,t===void 0){const i=e.getSize(new Ue);this._pixelRatio=e.getPixelRatio(),this._width=i.width,this._height=i.height,t=new bn(this._width*this._pixelRatio,this._height*this._pixelRatio),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],md===void 0&&console.error("THREE.EffectComposer relies on CopyShader"),cn===void 0&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new cn(md),this.clock=new zE}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}gd!==void 0&&(a instanceof gd?i=!0:a instanceof k1&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}new xa(-1,1,1,-1,0,1);const Qm=new un;Qm.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3));Qm.setAttribute("uv",new Bt([0,2,0,0,2,0],2));class B1 extends _s{constructor(e,t,i,s,r){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r!==void 0?r:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ve}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),r=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,r),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),e.autoClear=s}}const Su={uniforms:{tDiffuse:{value:null},amount:{value:.005},angle:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float amount;
		uniform float angle;

		varying vec2 vUv;

		void main() {

			vec2 offset = amount * vec2( cos(angle), sin(angle));
			vec4 cr = texture2D(tDiffuse, vUv + offset);
			vec4 cga = texture2D(tDiffuse, vUv);
			vec4 cb = texture2D(tDiffuse, vUv - offset);
			gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

		}`};function ds(n){let e=n*(1-n);return(e*(1+-1.4168*e)+n)**2}class V1{constructor(e,t,i,s){Sn(this,"time",0);this.composer=e,this.max=t,this.amount=i,this.fadeTP=s;const r=new cn(Su);r.uniforms.amount.value=i,this.pass=r}add(){document.createElement("audio"),this.time=0,this.composer.addPass(this.pass)}end(){this.composer.removePass(this.pass)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<=this.fadeTP){let t=ds(this.time/this.fadeTP)*(this.amount-.005);this.pass.uniforms.amount.value=t+.005}else this.time==this.fadeTP+1&&(this.pass.uniforms.amount.value=this.amount);this.time+=1}}}const z1={uniforms:{time:{value:0},tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

        #define PI 3.1415926

		uniform float time;
		
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		
		void main() {
		
	        vec2 p = -1.0 + 2.0 * vUv;

            float len = length(p);
            vec2 tex = vUv + (p / len) * cos(len * 12.0 - time * 4.0) * 0.03;
            vec4 col = texture2D(tDiffuse, tex);
            gl_FragColor = col;

        }`};class H1{constructor(e,t){Sn(this,"time",0);this.composer=e,this.max=t;const i=new cn(z1);this.pass=i}add(){document.createElement("audio"),this.time=0,this.composer.addPass(this.pass)}end(){this.composer.removePass(this.pass)}animate(e){this.time==this.max?(this.end(),this.time=0,e()):(this.pass.uniforms.time.value=2*this.time/this.max,this.time+=1)}}const W1={uniforms:{height:{value:0},width:{value:0},kernelX:{value:[3,0,-3,10,0,-10,3,0,-3]},kernelY:{value:[-3,-10,-3,0,0,0,3,10,3]},amount:{value:.1},tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		
		uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float width;
        uniform float height;
        uniform float kernelX[9];
        uniform float kernelY[9];
        uniform float amount;

        void main(){
            float step_w = 1.0/width;
            float step_h = 1.0/height;
            vec2 offset[9];
            float alpha = 0.0;
            offset[0] = vec2(-step_w, -step_h);
            offset[1] = vec2(0.0, -step_h);
            offset[2] = vec2(step_w, -step_h);
            offset[3] = vec2(-step_w, 0.0);
            offset[4] = vec2(0.0, 0.0);
            offset[5] = vec2(step_w, 0.0);
            offset[6] = vec2(-step_w, step_h);
            offset[7] = vec2(0.0, step_h);
            offset[8] = vec2(step_w, step_h);
            vec3 x = vec3(0.0);
            vec3 y = vec3(0.0);
            for (int i = 0; i < 9; i++) {
                x += texture2D(tDiffuse, vUv + offset[i]).rgb * kernelX[i];
                y += texture2D(tDiffuse, vUv + offset[i]).rgb * kernelY[i];
            }
            vec4 tex = texture2D(tDiffuse, vUv);
            vec3 color = sqrt((x*x)+(y*y));
            float r = color.r + tex.r * amount;
            float g = color.g + tex.g * amount;
            float b = color.b + tex.b * amount;
            alpha = tex.a;
            gl_FragColor = vec4(vec3(r, g, b), alpha);
        }
    `};class G1{constructor(e,t,i,s,r){Sn(this,"time",0);this.composer=e,this.max=t,this.fadeTP=r;const a=new cn(W1);a.uniforms.width.value=i,a.uniforms.height.value=s,this.pass=a}add(){document.createElement("audio"),this.time=0,this.composer.addPass(this.pass)}end(){this.composer.removePass(this.pass)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<=this.fadeTP){let t=ds(this.time/this.fadeTP);this.pass.uniforms.amount.value=1-t}else this.time==this.fadeTP+1&&(this.pass.uniforms.amount.value=0);this.time+=1}}}const j1={uniforms:{height:{value:0},width:{value:0},size:{value:20},tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float height;
		uniform float width;
        uniform float size;
        
        const float factor = 1.2;

        void main() {
            vec4 tex = texture2D(tDiffuse, vUv);
            vec3 col = pow(tex.xyz, vec3(factor));
            float c = mod(float(vUv.x * height + vUv.y * width), size);
            vec3 color = clamp(col * size - c, vec3(0.0), vec3(1.0));
            gl_FragColor = vec4(pow(color, vec3(1.0/factor)), tex.a);
               
        }
    `};class X1{constructor(e,t,i,s){Sn(this,"time",0);this.composer=e,this.max=t,this.size=15;const r=new cn(j1);r.uniforms.width.value=i,r.uniforms.height.value=s,this.pass=r}add(e){document.createElement("audio"),this.time=0,this.size=Math.random()*10+10,this.composer.addPass(this.pass)}end(){this.composer.removePass(this.pass)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<20){let t=ds(this.time/20);this.pass.uniforms.size.value=this.size+3-t*3}else this.time==10&&(this.pass.uniforms.size.value=this.size);this.time+=1}}}const no={uniforms:{tDiffuse:{value:null},shape:{value:1},radius:{value:4},rotateR:{value:Math.PI/12*1},rotateG:{value:Math.PI/12*2},rotateB:{value:Math.PI/12*3},scatter:{value:0},width:{value:1},height:{value:1},blending:{value:1},blendingMode:{value:1},greyscale:{value:!1},disable:{value:!1}},vertexShader:`

		varying vec2 vUV;

		void main() {

			vUV = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		}`,fragmentShader:`

		#define SQRT2_MINUS_ONE 0.41421356
		#define SQRT2_HALF_MINUS_ONE 0.20710678
		#define PI2 6.28318531
		#define SHAPE_DOT 1
		#define SHAPE_ELLIPSE 2
		#define SHAPE_LINE 3
		#define SHAPE_SQUARE 4
		#define BLENDING_LINEAR 1
		#define BLENDING_MULTIPLY 2
		#define BLENDING_ADD 3
		#define BLENDING_LIGHTER 4
		#define BLENDING_DARKER 5
		uniform sampler2D tDiffuse;
		uniform float radius;
		uniform float rotateR;
		uniform float rotateG;
		uniform float rotateB;
		uniform float scatter;
		uniform float width;
		uniform float height;
		uniform int shape;
		uniform bool disable;
		uniform float blending;
		uniform int blendingMode;
		varying vec2 vUV;
		uniform bool greyscale;
		const int samples = 8;

		float blend( float a, float b, float t ) {

		// linear blend
			return a * ( 1.0 - t ) + b * t;

		}

		float hypot( float x, float y ) {

		// vector magnitude
			return sqrt( x * x + y * y );

		}

		float rand( vec2 seed ){

		// get pseudo-random number
			return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

		}

		float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {

		// apply shape-specific transforms
			float dist = hypot( coord.x - p.x, coord.y - p.y );
			float rad = channel;

			if ( shape == SHAPE_DOT ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

			} else if ( shape == SHAPE_ELLIPSE ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

				if ( dist != 0.0 ) {
					float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );
					dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;
				}

			} else if ( shape == SHAPE_LINE ) {

				rad = pow( abs( rad ), 1.5) * rad_max;
				float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;
				dist = hypot( normal.x * dot_p, normal.y * dot_p );

			} else if ( shape == SHAPE_SQUARE ) {

				float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;
				float sin_t = abs( sin( theta ) );
				float cos_t = abs( cos( theta ) );
				rad = pow( abs( rad ), 1.4 );
				rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );

			}

			return rad - dist;

		}

		struct Cell {

		// grid sample positions
			vec2 normal;
			vec2 p1;
			vec2 p2;
			vec2 p3;
			vec2 p4;
			float samp2;
			float samp1;
			float samp3;
			float samp4;

		};

		vec4 getSample( vec2 point ) {

		// multi-sampled point
			vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );
			float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;
			float step = PI2 / float( samples );
			float dist = radius * 0.66;

			for ( int i = 0; i < samples; ++i ) {

				float r = base + step * float( i );
				vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );
				tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );

			}

			tex /= float( samples ) + 1.0;
			return tex;

		}

		float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {

		// get colour for given point
			float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;

			if ( channel == 0 ) {

				c.samp1 = getSample( c.p1 ).r;
				c.samp2 = getSample( c.p2 ).r;
				c.samp3 = getSample( c.p3 ).r;
				c.samp4 = getSample( c.p4 ).r;

			} else if (channel == 1) {

				c.samp1 = getSample( c.p1 ).g;
				c.samp2 = getSample( c.p2 ).g;
				c.samp3 = getSample( c.p3 ).g;
				c.samp4 = getSample( c.p4 ).g;

			} else {

				c.samp1 = getSample( c.p1 ).b;
				c.samp3 = getSample( c.p3 ).b;
				c.samp2 = getSample( c.p2 ).b;
				c.samp4 = getSample( c.p4 ).b;

			}

			dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );
			dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );
			dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );
			dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );
			res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;
			res = clamp( res, 0.0, 1.0 );

			return res;

		}

		Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {

		// get containing cell
			Cell c;

		// calc grid
			vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );
			float threshold = step * 0.5;
			float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );
			float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );
			vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );
			float offset_normal = mod( hypot( offset.x, offset.y ), step );
			float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;
			float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;
			float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );
			float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;
			float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;

		// get closest corner
			c.normal = n;
			c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
			c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

		// scatter
			if ( scatter != 0.0 ) {

				float off_mag = scatter * threshold * 0.5;
				float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;
				c.p1.x += cos( off_angle ) * off_mag;
				c.p1.y += sin( off_angle ) * off_mag;

			}

		// find corners
			float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );
			float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );
			c.p2.x = c.p1.x - n.x * normal_step;
			c.p2.y = c.p1.y - n.y * normal_step;
			c.p3.x = c.p1.x + n.y * line_step;
			c.p3.y = c.p1.y - n.x * line_step;
			c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
			c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;

			return c;

		}

		float blendColour( float a, float b, float t ) {

		// blend colours
			if ( blendingMode == BLENDING_LINEAR ) {
				return blend( a, b, 1.0 - t );
			} else if ( blendingMode == BLENDING_ADD ) {
				return blend( a, min( 1.0, a + b ), t );
			} else if ( blendingMode == BLENDING_MULTIPLY ) {
				return blend( a, max( 0.0, a * b ), t );
			} else if ( blendingMode == BLENDING_LIGHTER ) {
				return blend( a, max( a, b ), t );
			} else if ( blendingMode == BLENDING_DARKER ) {
				return blend( a, min( a, b ), t );
			} else {
				return blend( a, b, 1.0 - t );
			}

		}

		void main() {

			if ( ! disable ) {

		// setup
				vec2 p = vec2( vUV.x * width, vUV.y * height );
				vec2 origin = vec2( 0, 0 );
				float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;

		// get channel samples
				Cell cell_r = getReferenceCell( p, origin, rotateR, radius );
				Cell cell_g = getReferenceCell( p, origin, rotateG, radius );
				Cell cell_b = getReferenceCell( p, origin, rotateB, radius );
				float r = getDotColour( cell_r, p, 0, rotateR, aa );
				float g = getDotColour( cell_g, p, 1, rotateG, aa );
				float b = getDotColour( cell_b, p, 2, rotateB, aa );

		// blend with original
				vec4 colour = texture2D( tDiffuse, vUV );
				r = blendColour( r, colour.r, blending );
				g = blendColour( g, colour.g, blending );
				b = blendColour( b, colour.b, blending );

				if ( greyscale ) {
					r = g = b = (r + b + g) / 3.0;
				}

				gl_FragColor = vec4( r, g, b, 1.0 );

			} else {

				gl_FragColor = texture2D( tDiffuse, vUV );

			}

		}`};class Y1 extends _s{constructor(e,t,i){super(),no===void 0&&console.error("THREE.HalftonePass requires HalftoneShader"),this.uniforms=Wo.clone(no.uniforms),this.material=new Mn({uniforms:this.uniforms,fragmentShader:no.fragmentShader,vertexShader:no.vertexShader}),this.uniforms.width.value=e,this.uniforms.height.value=t;for(const s in i)i.hasOwnProperty(s)&&this.uniforms.hasOwnProperty(s)&&(this.uniforms[s].value=i[s]);this.fsQuad=new ca(this.material)}render(e,t,i){this.material.uniforms.tDiffuse.value=i.texture,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.uniforms.width.value=e,this.uniforms.height.value=t}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const wu={uniforms:{tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
        varying vec2 vUv;

        void main() {
            vec4 tex = texture2D(tDiffuse, vUv);
            if (tex.r <= 0.1 && tex.g <= 0.1 && tex.b <= 0.1) {
                gl_FragColor = vec4(tex.xyz, 0.0);
            } else {
                gl_FragColor = tex;
            }   
        }
    `};class q1{constructor(e,t,i,s){Sn(this,"time",0);this.composer=e,this.max=t;const r={shape:1,radius:2,rotateR:Math.PI/12,rotateB:Math.PI/12*2,rotateG:Math.PI/12*3,scatter:0,blending:1,blendingMode:3,greyscale:!1,disable:!1};this.mask=new cn(wu),this.pass=new Y1(i,s,r),this.fadeTP1=50,this.fadeTP2=100}add(){document.createElement("audio"),this.time=0,this.size=Math.random()*10+15,this.composer.addPass(this.pass),this.composer.addPass(this.mask),this.pass.uniforms.shape.value=Math.round(Math.random()*3)+1}end(){this.composer.removePass(this.pass),this.composer.removePass(this.mask)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<=this.fadeTP1){let t=ds(this.time/this.fadeTP1);this.pass.uniforms.blending.value=t}else this.time==this.fadeTP1+1&&(this.pass.uniforms.blending.value=1);if(this.time<=this.fadeTP2){let t=ds(this.time/this.fadeTP2)*(this.size-6);this.pass.uniforms.radius.value=t+6}else this.time==this.fadeTP1+1&&(this.pass.uniforms.radius.value=this.size);this.time+=1}}}const $1={uniforms:{tDiffuse:{value:null},tSize:{value:new Ue(256,256)},center:{value:new Ue(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`};class K1{constructor(e,t,i){Sn(this,"time",0);this.composer=e,this.max=t,this.size=4,this.fadeTP=i;const s=new cn($1);s.uniforms.scale.value=this.size,this.p1=s;const r=new cn(Su);r.uniforms.amount.value=.0015,this.p2=r}add(){document.createElement("audio"),this.time=0,this.size=2+Math.random(),this.composer.addPass(this.p1),this.composer.addPass(this.p2)}end(){this.composer.removePass(this.p1),this.composer.removePass(this.p2)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<this.fadeTP){let t=ds(this.time/this.fadeTP);this.p1.uniforms.scale.value=this.size+1-t}else this.time==this.fadeTP&&(this.p1.uniforms.scale.value=this.size);this.time+=1}}}class Q1 extends _s{constructor(e,t,i,s={}){super(),this.pixelSize=e,this.resolution=new Ue,this.renderResolution=new Ue,this.pixelatedMaterial=this.createPixelatedMaterial(),this.normalMaterial=new yE,this.fsQuad=new ca(this.pixelatedMaterial),this.scene=t,this.camera=i,this.normalEdgeStrength=s.normalEdgeStrength||.3,this.depthEdgeStrength=s.depthEdgeStrength||.4,this.beautyRenderTarget=new bn,this.beautyRenderTarget.texture.minFilter=pt,this.beautyRenderTarget.texture.magFilter=pt,this.beautyRenderTarget.depthTexture=new Um,this.normalRenderTarget=new bn,this.normalRenderTarget.texture.minFilter=pt,this.normalRenderTarget.texture.magFilter=pt}dispose(){this.beautyRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.pixelatedMaterial.dispose(),this.normalMaterial.dispose(),this.fsQuad.dispose()}setSize(e,t){this.resolution.set(e,t),this.renderResolution.set(e/this.pixelSize|0,t/this.pixelSize|0);const{x:i,y:s}=this.renderResolution;this.beautyRenderTarget.setSize(i,s),this.normalRenderTarget.setSize(i,s),this.fsQuad.material.uniforms.resolution.value.set(i,s,1/i,1/s)}setPixelSize(e){this.pixelSize=e,this.setSize(this.resolution.x,this.resolution.y)}render(e,t){const i=this.fsQuad.material.uniforms;i.normalEdgeStrength.value=this.normalEdgeStrength,i.depthEdgeStrength.value=this.depthEdgeStrength,e.setRenderTarget(this.beautyRenderTarget),e.render(this.scene,this.camera);const s=this.scene.overrideMaterial;e.setRenderTarget(this.normalRenderTarget),this.scene.overrideMaterial=this.normalMaterial,e.render(this.scene,this.camera),this.scene.overrideMaterial=s,i.tDiffuse.value=this.beautyRenderTarget.texture,i.tDepth.value=this.beautyRenderTarget.depthTexture,i.tNormal.value=this.normalRenderTarget.texture,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this.fsQuad.render(e)}createPixelatedMaterial(){return new Mn({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tNormal:{value:null},resolution:{value:new at(this.renderResolution.x,this.renderResolution.y,1/this.renderResolution.x,1/this.renderResolution.y)},normalEdgeStrength:{value:0},depthEdgeStrength:{value:0}},vertexShader:`
				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D tDiffuse;
				uniform sampler2D tDepth;
				uniform sampler2D tNormal;
				uniform vec4 resolution;
				uniform float normalEdgeStrength;
				uniform float depthEdgeStrength;
				varying vec2 vUv;

				float getDepth(int x, int y) {

					return texture2D( tDepth, vUv + vec2(x, y) * resolution.zw ).r;

				}

				vec3 getNormal(int x, int y) {

					return texture2D( tNormal, vUv + vec2(x, y) * resolution.zw ).rgb * 2.0 - 1.0;

				}

				float depthEdgeIndicator(float depth, vec3 normal) {

					float diff = 0.0;
					diff += clamp(getDepth(1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(-1, 0) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, 1) - depth, 0.0, 1.0);
					diff += clamp(getDepth(0, -1) - depth, 0.0, 1.0);
					return floor(smoothstep(0.01, 0.02, diff) * 2.) / 2.;

				}

				float neighborNormalEdgeIndicator(int x, int y, float depth, vec3 normal) {

					float depthDiff = getDepth(x, y) - depth;
					vec3 neighborNormal = getNormal(x, y);

					// Edge pixels should yield to faces who's normals are closer to the bias normal.
					vec3 normalEdgeBias = vec3(1., 1., 1.); // This should probably be a parameter.
					float normalDiff = dot(normal - neighborNormal, normalEdgeBias);
					float normalIndicator = clamp(smoothstep(-.01, .01, normalDiff), 0.0, 1.0);

					// Only the shallower pixel should detect the normal edge.
					float depthIndicator = clamp(sign(depthDiff * .25 + .0025), 0.0, 1.0);

					return (1.0 - dot(normal, neighborNormal)) * depthIndicator * normalIndicator;

				}

				float normalEdgeIndicator(float depth, vec3 normal) {

					float indicator = 0.0;

					indicator += neighborNormalEdgeIndicator(0, -1, depth, normal);
					indicator += neighborNormalEdgeIndicator(0, 1, depth, normal);
					indicator += neighborNormalEdgeIndicator(-1, 0, depth, normal);
					indicator += neighborNormalEdgeIndicator(1, 0, depth, normal);

					return step(0.1, indicator);

				}

				void main() {

					vec4 texel = texture2D( tDiffuse, vUv );

					float depth = 0.0;
					vec3 normal = vec3(0.0);

					if (depthEdgeStrength > 0.0 || normalEdgeStrength > 0.0) {

						depth = getDepth(0, 0);
						normal = getNormal(0, 0);

					}

					float dei = 0.0;
					if (depthEdgeStrength > 0.0)
						dei = depthEdgeIndicator(depth, normal);

					float nei = 0.0;
					if (normalEdgeStrength > 0.0)
						nei = normalEdgeIndicator(depth, normal);

					float Strength = dei > 0.0 ? (1.0 - depthEdgeStrength * dei) : (1.0 + normalEdgeStrength * nei);

					gl_FragColor = texel * Strength;

				}
			`})}}class J1{constructor(e,t,i,s,r){Sn(this,"time",0);this.composer=e,this.max=t,this.pass=new Q1(32,i,s),this.fadeTP=r}add(){document.createElement("audio"),this.time=0,this.size=Math.random()*16+32,this.composer.addPass(this.pass)}end(){this.composer.removePass(this.pass)}animate(e){if(this.time==this.max)this.end(),this.time=0,e();else{if(this.time<this.fadeTP){let t=ds(this.time/this.fadeTP)*this.fadeTP;this.pass.pixelSize=Math.floor(t)}else this.time==this.fadeTP&&(this.pass.pixelSize=this.size);this.time+=1}}}const _d={uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};class Z1 extends _s{constructor(e=.96){super(),_d===void 0&&console.error("THREE.AfterimagePass relies on AfterimageShader"),this.shader=_d,this.uniforms=Wo.clone(this.shader.uniforms),this.uniforms.damp.value=e,this.textureComp=new bn(window.innerWidth,window.innerHeight,{magFilter:pt}),this.textureOld=new bn(window.innerWidth,window.innerHeight,{magFilter:pt}),this.compFsMaterial=new Mn({uniforms:this.uniforms,vertexShader:this.shader.vertexShader,fragmentShader:this.shader.fragmentShader}),this.compFsQuad=new ca(this.compFsMaterial),this.copyFsMaterial=new oi,this.copyFsQuad=new ca(this.copyFsMaterial)}render(e,t,i){this.uniforms.tOld.value=this.textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this.textureComp),this.compFsQuad.render(e),this.copyFsQuad.material.map=this.textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this.copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.copyFsQuad.render(e));const s=this.textureOld;this.textureOld=this.textureComp,this.textureComp=s}setSize(e,t){this.textureComp.setSize(e,t),this.textureOld.setSize(e,t)}dispose(){this.textureComp.dispose(),this.textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this.compFsQuad.dispose(),this.copyFsQuad.dispose()}}class eT{constructor(e,t){Sn(this,"time",0);this.composer=e,this.max=t,this.mask=new cn(wu),this.pass=new Z1}add(){document.createElement("audio"),this.time=0,this.composer.addPass(this.pass),this.composer.addPass(this.mask)}end(){this.composer.removePass(this.pass),this.composer.removePass(this.mask)}animate(e){this.time==this.max?(this.end(),this.time=0,e()):this.time+=1}}const tT={uniforms:{amount:{value:.3},speed:{value:.005},iTime:{value:0},tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

        uniform float amount;
        uniform float speed;
        uniform float iTime;

		uniform sampler2D tDiffuse;
        varying vec2 vUv;

        //2D (returns 0 - 1)
        float random2d(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float randomRange (in vec2 seed, in float min, in float max) {
            return min + random2d(seed) * (max - min);
        }

        // return 1 if v inside 1d range
        float insideRange(float v, float bottom, float top) {
           return step(bottom, v) - step(top, v);
        }

        //inputs
        // float AMT = 0.2; //0 - 1 glitch amount
        // float SPEED = 0.6; //0 - 1 speed


        void main() {
            float time = floor(iTime * speed * 60.0);    
            vec2 uv = vUv;
        
            //copy orig
            vec3 outCol = texture(tDiffuse, uv).rgb;
        
            //randomly offset slices horizontally
            float maxOffset = amount/2.0;
            for (float i = 0.0; i < 10.0 * amount; i += 1.0) {
                float sliceY = random2d(vec2(time , 2345.0 + float(i)));
                float sliceH = random2d(vec2(time , 9035.0 + float(i))) * 0.25;
                float hOffset = randomRange(vec2(time , 9625.0 + float(i)), -maxOffset, maxOffset);
                vec2 uvOff = uv;
                uvOff.x += hOffset;
                if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){
                    outCol = texture(tDiffuse, uvOff).rgb;
                }
            }
        
            //do slight offset on one entire channel
            float maxColOffset = amount/6.0;
            float rnd = random2d(vec2(time , 9545.0));
            vec2 colOffset = vec2(randomRange(vec2(time , 9545.0),-maxColOffset,maxColOffset), 
                               randomRange(vec2(time , 7205.0),-maxColOffset,maxColOffset));
            if (rnd < 0.33) {
                outCol.r = texture(tDiffuse, uv + colOffset).r;
            } else if (rnd < 0.66) {
                outCol.g = texture(tDiffuse, uv + colOffset).g;
            } else{
                outCol.b = texture(tDiffuse, uv + colOffset).b;  
            }
           
            gl_FragColor = vec4(outCol,1.0);

        }
    `};class nT{constructor(e,t){Sn(this,"time",0);this.composer=e,this.max=t,this.pass=new cn(tT),this.mask=new cn(wu)}add(){document.createElement("audio"),this.time=0,this.pass.uniforms.amount.value=Math.random()*.1+.2,this.composer.addPass(this.pass),this.composer.addPass(this.mask)}end(){this.composer.removePass(this.pass),this.composer.removePass(this.mask)}animate(e){this.time==this.max?(this.end(),this.time=0,e()):(this.pass.uniforms.iTime.value=this.time,this.time+=1)}}let Ds,io,vd,so,an,ro,Vs,Fs=[],ao,Ec=[],Jm;function Tc(n){n.end(),n.add(),Fs.push(n),console.log(n)}function iT(){let n=document.getElementById("background");console.log(n),ld();let e=ld();Ds=e.scene,io=e.camera,vd=e.renderer,so=new bu,an=new U1(vd),an.addPass(new B1(Ds,io));const t=new V1(an,200,.025,30);new H1(an,300);const i=new G1(an,200,innerWidth,innerHeight,30),s=new X1(an,200,innerWidth,innerHeight),r=new q1(an,200,innerWidth,innerHeight,Math.random()*6+6),a=new K1(an,100,20),o=new J1(an,120,Ds,io,50),l=new eT(an,200),c=new nT(an,100);Ec=[t,i,s,r,a,o,l,c];let u={Log:h};so.add(u,"Log"),so.domElement.style.display="none";function h(){console.log(io)}ro=new gt(Ds,so),ro=new vu(16777215),ro.position.set(1,1,1),Ds.add(ro),new Zt(new mu(.5,8),new oi({color:"cyan"})).position.set(1.2,0,1),document.ondblclick=function(m){Tc(t),Tc(i)},new a1().load("./cat.gltf",function(m){Vs=m.scene,Vs.position.y=0,console.log(Vs),Ds.add(Vs),Zm()},function(m){console.log(m.loaded/m.total*100+"% loaded")},function(m){console.log("An error happened")});const v=new cn(Su);v.uniforms.amount.value=.0015,v.renderToScreen=!0,an.addPass(v)}function Zm(){const n=Date.now();if(Vs.position.y=Math.cos(n/100)*.02,Vs.rotation.y+=.005,!ao)ao=n;else{const e=Math.random()*5e3+1e4;if(n-ao>e){let t=Ec[Math.floor(Math.random()*Ec.length)];Tc(t),ao=n,console.log("ADD")}}for(let e=0;e<Fs.length;e++)Fs[e].animate(function(){Fs=Fs.filter(function(t){return t!=Fs[e]})});an.render(),Jm=requestAnimationFrame(Zm)}function sT(){cancelAnimationFrame(Jm)}/*!
  * shared v9.9.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */const Eo=typeof window<"u",Bi=(n,e=!1)=>e?Symbol.for(n):Symbol(n),rT=(n,e,t)=>aT({l:n,k:e,s:t}),aT=n=>JSON.stringify(n).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),Mt=n=>typeof n=="number"&&isFinite(n),oT=n=>tg(n)==="[object Date]",Fi=n=>tg(n)==="[object RegExp]",jo=n=>Oe(n)&&Object.keys(n).length===0,Dt=Object.assign;let xd;const si=()=>xd||(xd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function yd(n){return n.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const lT=Object.prototype.hasOwnProperty;function To(n,e){return lT.call(n,e)}const ct=Array.isArray,lt=n=>typeof n=="function",be=n=>typeof n=="string",We=n=>typeof n=="boolean",nt=n=>n!==null&&typeof n=="object",cT=n=>nt(n)&&lt(n.then)&&lt(n.catch),eg=Object.prototype.toString,tg=n=>eg.call(n),Oe=n=>{if(!nt(n))return!1;const e=Object.getPrototypeOf(n);return e===null||e.constructor===Object},uT=n=>n==null?"":ct(n)||Oe(n)&&n.toString===eg?JSON.stringify(n,null,2):String(n);function hT(n,e=""){return n.reduce((t,i,s)=>s===0?t+i:t+e+i,"")}function Eu(n){let e=n;return()=>++e}function fT(n,e){typeof console<"u"&&(console.warn("[intlify] "+n),e&&console.warn(e.stack))}const oo=n=>!nt(n)||ct(n);function go(n,e){if(oo(n)||oo(e))throw new Error("Invalid value");const t=[{src:n,des:e}];for(;t.length;){const{src:i,des:s}=t.pop();Object.keys(i).forEach(r=>{oo(i[r])||oo(s[r])?s[r]=i[r]:t.push({src:i[r],des:s[r]})})}}/*!
  * message-compiler v9.9.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */function dT(n,e,t){return{line:n,column:e,offset:t}}function Ac(n,e,t){const i={start:n,end:e};return t!=null&&(i.source=t),i}const pT=/\{([0-9a-zA-Z]+)\}/g;function mT(n,...e){return e.length===1&&gT(e[0])&&(e=e[0]),(!e||!e.hasOwnProperty)&&(e={}),n.replace(pT,(t,i)=>e.hasOwnProperty(i)?e[i]:"")}const ng=Object.assign,bd=n=>typeof n=="string",gT=n=>n!==null&&typeof n=="object";function ig(n,e=""){return n.reduce((t,i,s)=>s===0?t+i:t+e+i,"")}const De={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,UNHANDLED_CODEGEN_NODE_TYPE:15,UNHANDLED_MINIFIER_NODE_TYPE:16,__EXTEND_POINT__:17},_T={[De.EXPECTED_TOKEN]:"Expected token: '{0}'",[De.INVALID_TOKEN_IN_PLACEHOLDER]:"Invalid token in placeholder: '{0}'",[De.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]:"Unterminated single quote in placeholder",[De.UNKNOWN_ESCAPE_SEQUENCE]:"Unknown escape sequence: \\{0}",[De.INVALID_UNICODE_ESCAPE_SEQUENCE]:"Invalid unicode escape sequence: {0}",[De.UNBALANCED_CLOSING_BRACE]:"Unbalanced closing brace",[De.UNTERMINATED_CLOSING_BRACE]:"Unterminated closing brace",[De.EMPTY_PLACEHOLDER]:"Empty placeholder",[De.NOT_ALLOW_NEST_PLACEHOLDER]:"Not allowed nest placeholder",[De.INVALID_LINKED_FORMAT]:"Invalid linked format",[De.MUST_HAVE_MESSAGES_IN_PLURAL]:"Plural must have messages",[De.UNEXPECTED_EMPTY_LINKED_MODIFIER]:"Unexpected empty linked modifier",[De.UNEXPECTED_EMPTY_LINKED_KEY]:"Unexpected empty linked key",[De.UNEXPECTED_LEXICAL_ANALYSIS]:"Unexpected lexical analysis in token: '{0}'",[De.UNHANDLED_CODEGEN_NODE_TYPE]:"unhandled codegen node type: '{0}'",[De.UNHANDLED_MINIFIER_NODE_TYPE]:"unhandled mimifier node type: '{0}'"};function yr(n,e,t={}){const{domain:i,messages:s,args:r}=t,a=mT((s||_T)[n]||"",...r||[]),o=new SyntaxError(String(a));return o.code=n,e&&(o.location=e),o.domain=i,o}function vT(n){throw n}const ni=" ",xT="\r",jt=`
`,yT="\u2028",bT="\u2029";function MT(n){const e=n;let t=0,i=1,s=1,r=0;const a=P=>e[P]===xT&&e[P+1]===jt,o=P=>e[P]===jt,l=P=>e[P]===bT,c=P=>e[P]===yT,u=P=>a(P)||o(P)||l(P)||c(P),h=()=>t,f=()=>i,p=()=>s,v=()=>r,m=P=>a(P)||l(P)||c(P)?jt:e[P],d=()=>m(t),g=()=>m(t+r);function b(){return r=0,u(t)&&(i++,s=0),a(t)&&t++,t++,s++,e[t]}function S(){return a(t+r)&&r++,r++,e[t+r]}function y(){t=0,i=1,s=1,r=0}function w(P=0){r=P}function A(){const P=t+r;for(;P!==t;)b();r=0}return{index:h,line:f,column:p,peekOffset:v,charAt:m,currentChar:d,currentPeek:g,next:b,peek:S,reset:y,resetPeek:w,skipToPeek:A}}const Si=void 0,ST=".",Md="'",wT="tokenizer";function ET(n,e={}){const t=e.location!==!1,i=MT(n),s=()=>i.index(),r=()=>dT(i.line(),i.column(),i.index()),a=r(),o=s(),l={currentType:14,offset:o,startLoc:a,endLoc:a,lastType:14,lastOffset:o,lastStartLoc:a,lastEndLoc:a,braceNest:0,inLinked:!1,text:""},c=()=>l,{onError:u}=e;function h(_,x,C,...N){const B=c();if(x.column+=C,x.offset+=C,u){const $=t?Ac(B.startLoc,x):null,le=yr(_,$,{domain:wT,args:N});u(le)}}function f(_,x,C){_.endLoc=r(),_.currentType=x;const N={type:x};return t&&(N.loc=Ac(_.startLoc,_.endLoc)),C!=null&&(N.value=C),N}const p=_=>f(_,14);function v(_,x){return _.currentChar()===x?(_.next(),x):(h(De.EXPECTED_TOKEN,r(),0,x),"")}function m(_){let x="";for(;_.currentPeek()===ni||_.currentPeek()===jt;)x+=_.currentPeek(),_.peek();return x}function d(_){const x=m(_);return _.skipToPeek(),x}function g(_){if(_===Si)return!1;const x=_.charCodeAt(0);return x>=97&&x<=122||x>=65&&x<=90||x===95}function b(_){if(_===Si)return!1;const x=_.charCodeAt(0);return x>=48&&x<=57}function S(_,x){const{currentType:C}=x;if(C!==2)return!1;m(_);const N=g(_.currentPeek());return _.resetPeek(),N}function y(_,x){const{currentType:C}=x;if(C!==2)return!1;m(_);const N=_.currentPeek()==="-"?_.peek():_.currentPeek(),B=b(N);return _.resetPeek(),B}function w(_,x){const{currentType:C}=x;if(C!==2)return!1;m(_);const N=_.currentPeek()===Md;return _.resetPeek(),N}function A(_,x){const{currentType:C}=x;if(C!==8)return!1;m(_);const N=_.currentPeek()===".";return _.resetPeek(),N}function P(_,x){const{currentType:C}=x;if(C!==9)return!1;m(_);const N=g(_.currentPeek());return _.resetPeek(),N}function M(_,x){const{currentType:C}=x;if(!(C===8||C===12))return!1;m(_);const N=_.currentPeek()===":";return _.resetPeek(),N}function I(_,x){const{currentType:C}=x;if(C!==10)return!1;const N=()=>{const $=_.currentPeek();return $==="{"?g(_.peek()):$==="@"||$==="%"||$==="|"||$===":"||$==="."||$===ni||!$?!1:$===jt?(_.peek(),N()):g($)},B=N();return _.resetPeek(),B}function O(_){m(_);const x=_.currentPeek()==="|";return _.resetPeek(),x}function Q(_){const x=m(_),C=_.currentPeek()==="%"&&_.peek()==="{";return _.resetPeek(),{isModulo:C,hasSpace:x.length>0}}function ue(_,x=!0){const C=(B=!1,$="",le=!1)=>{const he=_.currentPeek();return he==="{"?$==="%"?!1:B:he==="@"||!he?$==="%"?!0:B:he==="%"?(_.peek(),C(B,"%",!0)):he==="|"?$==="%"||le?!0:!($===ni||$===jt):he===ni?(_.peek(),C(!0,ni,le)):he===jt?(_.peek(),C(!0,jt,le)):!0},N=C();return x&&_.resetPeek(),N}function H(_,x){const C=_.currentChar();return C===Si?Si:x(C)?(_.next(),C):null}function V(_){return H(_,C=>{const N=C.charCodeAt(0);return N>=97&&N<=122||N>=65&&N<=90||N>=48&&N<=57||N===95||N===36})}function te(_){return H(_,C=>{const N=C.charCodeAt(0);return N>=48&&N<=57})}function re(_){return H(_,C=>{const N=C.charCodeAt(0);return N>=48&&N<=57||N>=65&&N<=70||N>=97&&N<=102})}function ne(_){let x="",C="";for(;x=te(_);)C+=x;return C}function G(_){d(_);const x=_.currentChar();return x!=="%"&&h(De.EXPECTED_TOKEN,r(),0,x),_.next(),"%"}function pe(_){let x="";for(;;){const C=_.currentChar();if(C==="{"||C==="}"||C==="@"||C==="|"||!C)break;if(C==="%")if(ue(_))x+=C,_.next();else break;else if(C===ni||C===jt)if(ue(_))x+=C,_.next();else{if(O(_))break;x+=C,_.next()}else x+=C,_.next()}return x}function ce(_){d(_);let x="",C="";for(;x=V(_);)C+=x;return _.currentChar()===Si&&h(De.UNTERMINATED_CLOSING_BRACE,r(),0),C}function X(_){d(_);let x="";return _.currentChar()==="-"?(_.next(),x+=`-${ne(_)}`):x+=ne(_),_.currentChar()===Si&&h(De.UNTERMINATED_CLOSING_BRACE,r(),0),x}function Y(_){d(_),v(_,"'");let x="",C="";const N=$=>$!==Md&&$!==jt;for(;x=H(_,N);)x==="\\"?C+=fe(_):C+=x;const B=_.currentChar();return B===jt||B===Si?(h(De.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,r(),0),B===jt&&(_.next(),v(_,"'")),C):(v(_,"'"),C)}function fe(_){const x=_.currentChar();switch(x){case"\\":case"'":return _.next(),`\\${x}`;case"u":return me(_,x,4);case"U":return me(_,x,6);default:return h(De.UNKNOWN_ESCAPE_SEQUENCE,r(),0,x),""}}function me(_,x,C){v(_,x);let N="";for(let B=0;B<C;B++){const $=re(_);if(!$){h(De.INVALID_UNICODE_ESCAPE_SEQUENCE,r(),0,`\\${x}${N}${_.currentChar()}`);break}N+=$}return`\\${x}${N}`}function xe(_){d(_);let x="",C="";const N=B=>B!=="{"&&B!=="}"&&B!==ni&&B!==jt;for(;x=H(_,N);)C+=x;return C}function q(_){let x="",C="";for(;x=V(_);)C+=x;return C}function W(_){const x=(C=!1,N)=>{const B=_.currentChar();return B==="{"||B==="%"||B==="@"||B==="|"||B==="("||B===")"||!B||B===ni?N:B===jt||B===ST?(N+=B,_.next(),x(C,N)):(N+=B,_.next(),x(!0,N))};return x(!1,"")}function J(_){d(_);const x=v(_,"|");return d(_),x}function ie(_,x){let C=null;switch(_.currentChar()){case"{":return x.braceNest>=1&&h(De.NOT_ALLOW_NEST_PLACEHOLDER,r(),0),_.next(),C=f(x,2,"{"),d(_),x.braceNest++,C;case"}":return x.braceNest>0&&x.currentType===2&&h(De.EMPTY_PLACEHOLDER,r(),0),_.next(),C=f(x,3,"}"),x.braceNest--,x.braceNest>0&&d(_),x.inLinked&&x.braceNest===0&&(x.inLinked=!1),C;case"@":return x.braceNest>0&&h(De.UNTERMINATED_CLOSING_BRACE,r(),0),C=ee(_,x)||p(x),x.braceNest=0,C;default:let B=!0,$=!0,le=!0;if(O(_))return x.braceNest>0&&h(De.UNTERMINATED_CLOSING_BRACE,r(),0),C=f(x,1,J(_)),x.braceNest=0,x.inLinked=!1,C;if(x.braceNest>0&&(x.currentType===5||x.currentType===6||x.currentType===7))return h(De.UNTERMINATED_CLOSING_BRACE,r(),0),x.braceNest=0,Ee(_,x);if(B=S(_,x))return C=f(x,5,ce(_)),d(_),C;if($=y(_,x))return C=f(x,6,X(_)),d(_),C;if(le=w(_,x))return C=f(x,7,Y(_)),d(_),C;if(!B&&!$&&!le)return C=f(x,13,xe(_)),h(De.INVALID_TOKEN_IN_PLACEHOLDER,r(),0,C.value),d(_),C;break}return C}function ee(_,x){const{currentType:C}=x;let N=null;const B=_.currentChar();switch((C===8||C===9||C===12||C===10)&&(B===jt||B===ni)&&h(De.INVALID_LINKED_FORMAT,r(),0),B){case"@":return _.next(),N=f(x,8,"@"),x.inLinked=!0,N;case".":return d(_),_.next(),f(x,9,".");case":":return d(_),_.next(),f(x,10,":");default:return O(_)?(N=f(x,1,J(_)),x.braceNest=0,x.inLinked=!1,N):A(_,x)||M(_,x)?(d(_),ee(_,x)):P(_,x)?(d(_),f(x,12,q(_))):I(_,x)?(d(_),B==="{"?ie(_,x)||N:f(x,11,W(_))):(C===8&&h(De.INVALID_LINKED_FORMAT,r(),0),x.braceNest=0,x.inLinked=!1,Ee(_,x))}}function Ee(_,x){let C={type:14};if(x.braceNest>0)return ie(_,x)||p(x);if(x.inLinked)return ee(_,x)||p(x);switch(_.currentChar()){case"{":return ie(_,x)||p(x);case"}":return h(De.UNBALANCED_CLOSING_BRACE,r(),0),_.next(),f(x,3,"}");case"@":return ee(_,x)||p(x);default:if(O(_))return C=f(x,1,J(_)),x.braceNest=0,x.inLinked=!1,C;const{isModulo:B,hasSpace:$}=Q(_);if(B)return $?f(x,0,pe(_)):f(x,4,G(_));if(ue(_))return f(x,0,pe(_));break}return C}function Me(){const{currentType:_,offset:x,startLoc:C,endLoc:N}=l;return l.lastType=_,l.lastOffset=x,l.lastStartLoc=C,l.lastEndLoc=N,l.offset=s(),l.startLoc=r(),i.currentChar()===Si?f(l,14):Ee(i,l)}return{nextToken:Me,currentOffset:s,currentPosition:r,context:c}}const TT="parser",AT=/(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;function CT(n,e,t){switch(n){case"\\\\":return"\\";case"\\'":return"'";default:{const i=parseInt(e||t,16);return i<=55295||i>=57344?String.fromCodePoint(i):"�"}}}function LT(n={}){const e=n.location!==!1,{onError:t}=n;function i(g,b,S,y,...w){const A=g.currentPosition();if(A.offset+=y,A.column+=y,t){const P=e?Ac(S,A):null,M=yr(b,P,{domain:TT,args:w});t(M)}}function s(g,b,S){const y={type:g};return e&&(y.start=b,y.end=b,y.loc={start:S,end:S}),y}function r(g,b,S,y){y&&(g.type=y),e&&(g.end=b,g.loc&&(g.loc.end=S))}function a(g,b){const S=g.context(),y=s(3,S.offset,S.startLoc);return y.value=b,r(y,g.currentOffset(),g.currentPosition()),y}function o(g,b){const S=g.context(),{lastOffset:y,lastStartLoc:w}=S,A=s(5,y,w);return A.index=parseInt(b,10),g.nextToken(),r(A,g.currentOffset(),g.currentPosition()),A}function l(g,b){const S=g.context(),{lastOffset:y,lastStartLoc:w}=S,A=s(4,y,w);return A.key=b,g.nextToken(),r(A,g.currentOffset(),g.currentPosition()),A}function c(g,b){const S=g.context(),{lastOffset:y,lastStartLoc:w}=S,A=s(9,y,w);return A.value=b.replace(AT,CT),g.nextToken(),r(A,g.currentOffset(),g.currentPosition()),A}function u(g){const b=g.nextToken(),S=g.context(),{lastOffset:y,lastStartLoc:w}=S,A=s(8,y,w);return b.type!==12?(i(g,De.UNEXPECTED_EMPTY_LINKED_MODIFIER,S.lastStartLoc,0),A.value="",r(A,y,w),{nextConsumeToken:b,node:A}):(b.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,S.lastStartLoc,0,Fn(b)),A.value=b.value||"",r(A,g.currentOffset(),g.currentPosition()),{node:A})}function h(g,b){const S=g.context(),y=s(7,S.offset,S.startLoc);return y.value=b,r(y,g.currentOffset(),g.currentPosition()),y}function f(g){const b=g.context(),S=s(6,b.offset,b.startLoc);let y=g.nextToken();if(y.type===9){const w=u(g);S.modifier=w.node,y=w.nextConsumeToken||g.nextToken()}switch(y.type!==10&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(y)),y=g.nextToken(),y.type===2&&(y=g.nextToken()),y.type){case 11:y.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(y)),S.key=h(g,y.value||"");break;case 5:y.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(y)),S.key=l(g,y.value||"");break;case 6:y.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(y)),S.key=o(g,y.value||"");break;case 7:y.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(y)),S.key=c(g,y.value||"");break;default:i(g,De.UNEXPECTED_EMPTY_LINKED_KEY,b.lastStartLoc,0);const w=g.context(),A=s(7,w.offset,w.startLoc);return A.value="",r(A,w.offset,w.startLoc),S.key=A,r(S,w.offset,w.startLoc),{nextConsumeToken:y,node:S}}return r(S,g.currentOffset(),g.currentPosition()),{node:S}}function p(g){const b=g.context(),S=b.currentType===1?g.currentOffset():b.offset,y=b.currentType===1?b.endLoc:b.startLoc,w=s(2,S,y);w.items=[];let A=null;do{const I=A||g.nextToken();switch(A=null,I.type){case 0:I.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(I)),w.items.push(a(g,I.value||""));break;case 6:I.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(I)),w.items.push(o(g,I.value||""));break;case 5:I.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(I)),w.items.push(l(g,I.value||""));break;case 7:I.value==null&&i(g,De.UNEXPECTED_LEXICAL_ANALYSIS,b.lastStartLoc,0,Fn(I)),w.items.push(c(g,I.value||""));break;case 8:const O=f(g);w.items.push(O.node),A=O.nextConsumeToken||null;break}}while(b.currentType!==14&&b.currentType!==1);const P=b.currentType===1?b.lastOffset:g.currentOffset(),M=b.currentType===1?b.lastEndLoc:g.currentPosition();return r(w,P,M),w}function v(g,b,S,y){const w=g.context();let A=y.items.length===0;const P=s(1,b,S);P.cases=[],P.cases.push(y);do{const M=p(g);A||(A=M.items.length===0),P.cases.push(M)}while(w.currentType!==14);return A&&i(g,De.MUST_HAVE_MESSAGES_IN_PLURAL,S,0),r(P,g.currentOffset(),g.currentPosition()),P}function m(g){const b=g.context(),{offset:S,startLoc:y}=b,w=p(g);return b.currentType===14?w:v(g,S,y,w)}function d(g){const b=ET(g,ng({},n)),S=b.context(),y=s(0,S.offset,S.startLoc);return e&&y.loc&&(y.loc.source=g),y.body=m(b),n.onCacheKey&&(y.cacheKey=n.onCacheKey(g)),S.currentType!==14&&i(b,De.UNEXPECTED_LEXICAL_ANALYSIS,S.lastStartLoc,0,g[S.offset]||""),r(y,b.currentOffset(),b.currentPosition()),y}return{parse:d}}function Fn(n){if(n.type===14)return"EOF";const e=(n.value||"").replace(/\r?\n/gu,"\\n");return e.length>10?e.slice(0,9)+"…":e}function RT(n,e={}){const t={ast:n,helpers:new Set};return{context:()=>t,helper:r=>(t.helpers.add(r),r)}}function Sd(n,e){for(let t=0;t<n.length;t++)Tu(n[t],e)}function Tu(n,e){switch(n.type){case 1:Sd(n.cases,e),e.helper("plural");break;case 2:Sd(n.items,e);break;case 6:Tu(n.key,e),e.helper("linked"),e.helper("type");break;case 5:e.helper("interpolate"),e.helper("list");break;case 4:e.helper("interpolate"),e.helper("named");break}}function IT(n,e={}){const t=RT(n);t.helper("normalize"),n.body&&Tu(n.body,t);const i=t.context();n.helpers=Array.from(i.helpers)}function PT(n){const e=n.body;return e.type===2?wd(e):e.cases.forEach(t=>wd(t)),n}function wd(n){if(n.items.length===1){const e=n.items[0];(e.type===3||e.type===9)&&(n.static=e.value,delete e.value)}else{const e=[];for(let t=0;t<n.items.length;t++){const i=n.items[t];if(!(i.type===3||i.type===9)||i.value==null)break;e.push(i.value)}if(e.length===n.items.length){n.static=ig(e);for(let t=0;t<n.items.length;t++){const i=n.items[t];(i.type===3||i.type===9)&&delete i.value}}}}const DT="minifier";function ks(n){switch(n.t=n.type,n.type){case 0:const e=n;ks(e.body),e.b=e.body,delete e.body;break;case 1:const t=n,i=t.cases;for(let u=0;u<i.length;u++)ks(i[u]);t.c=i,delete t.cases;break;case 2:const s=n,r=s.items;for(let u=0;u<r.length;u++)ks(r[u]);s.i=r,delete s.items,s.static&&(s.s=s.static,delete s.static);break;case 3:case 9:case 8:case 7:const a=n;a.value&&(a.v=a.value,delete a.value);break;case 6:const o=n;ks(o.key),o.k=o.key,delete o.key,o.modifier&&(ks(o.modifier),o.m=o.modifier,delete o.modifier);break;case 5:const l=n;l.i=l.index,delete l.index;break;case 4:const c=n;c.k=c.key,delete c.key;break;default:throw yr(De.UNHANDLED_MINIFIER_NODE_TYPE,null,{domain:DT,args:[n.type]})}delete n.type}const NT="parser";function OT(n,e){const{sourceMap:t,filename:i,breakLineCode:s,needIndent:r}=e,a=e.location!==!1,o={filename:i,code:"",column:1,line:1,offset:0,map:void 0,breakLineCode:s,needIndent:r,indentLevel:0};a&&n.loc&&(o.source=n.loc.source);const l=()=>o;function c(d,g){o.code+=d}function u(d,g=!0){const b=g?s:"";c(r?b+"  ".repeat(d):b)}function h(d=!0){const g=++o.indentLevel;d&&u(g)}function f(d=!0){const g=--o.indentLevel;d&&u(g)}function p(){u(o.indentLevel)}return{context:l,push:c,indent:h,deindent:f,newline:p,helper:d=>`_${d}`,needIndent:()=>o.needIndent}}function FT(n,e){const{helper:t}=n;n.push(`${t("linked")}(`),or(n,e.key),e.modifier?(n.push(", "),or(n,e.modifier),n.push(", _type")):n.push(", undefined, _type"),n.push(")")}function kT(n,e){const{helper:t,needIndent:i}=n;n.push(`${t("normalize")}([`),n.indent(i());const s=e.items.length;for(let r=0;r<s&&(or(n,e.items[r]),r!==s-1);r++)n.push(", ");n.deindent(i()),n.push("])")}function UT(n,e){const{helper:t,needIndent:i}=n;if(e.cases.length>1){n.push(`${t("plural")}([`),n.indent(i());const s=e.cases.length;for(let r=0;r<s&&(or(n,e.cases[r]),r!==s-1);r++)n.push(", ");n.deindent(i()),n.push("])")}}function BT(n,e){e.body?or(n,e.body):n.push("null")}function or(n,e){const{helper:t}=n;switch(e.type){case 0:BT(n,e);break;case 1:UT(n,e);break;case 2:kT(n,e);break;case 6:FT(n,e);break;case 8:n.push(JSON.stringify(e.value),e);break;case 7:n.push(JSON.stringify(e.value),e);break;case 5:n.push(`${t("interpolate")}(${t("list")}(${e.index}))`,e);break;case 4:n.push(`${t("interpolate")}(${t("named")}(${JSON.stringify(e.key)}))`,e);break;case 9:n.push(JSON.stringify(e.value),e);break;case 3:n.push(JSON.stringify(e.value),e);break;default:throw yr(De.UNHANDLED_CODEGEN_NODE_TYPE,null,{domain:NT,args:[e.type]})}}const VT=(n,e={})=>{const t=bd(e.mode)?e.mode:"normal",i=bd(e.filename)?e.filename:"message.intl",s=!!e.sourceMap,r=e.breakLineCode!=null?e.breakLineCode:t==="arrow"?";":`
`,a=e.needIndent?e.needIndent:t!=="arrow",o=n.helpers||[],l=OT(n,{mode:t,filename:i,sourceMap:s,breakLineCode:r,needIndent:a});l.push(t==="normal"?"function __msg__ (ctx) {":"(ctx) => {"),l.indent(a),o.length>0&&(l.push(`const { ${ig(o.map(h=>`${h}: _${h}`),", ")} } = ctx`),l.newline()),l.push("return "),or(l,n),l.deindent(a),l.push("}"),delete n.helpers;const{code:c,map:u}=l.context();return{ast:n,code:c,map:u?u.toJSON():void 0}};function zT(n,e={}){const t=ng({},e),i=!!t.jit,s=!!t.minify,r=t.optimize==null?!0:t.optimize,o=LT(t).parse(n);return i?(r&&PT(o),s&&ks(o),{ast:o,code:""}):(IT(o,t),VT(o,t))}/*!
  * core-base v9.9.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */function HT(){typeof __INTLIFY_PROD_DEVTOOLS__!="boolean"&&(si().__INTLIFY_PROD_DEVTOOLS__=!1),typeof __INTLIFY_JIT_COMPILATION__!="boolean"&&(si().__INTLIFY_JIT_COMPILATION__=!1),typeof __INTLIFY_DROP_MESSAGE_COMPILER__!="boolean"&&(si().__INTLIFY_DROP_MESSAGE_COMPILER__=!1)}const Vi=[];Vi[0]={w:[0],i:[3,0],"[":[4],o:[7]};Vi[1]={w:[1],".":[2],"[":[4],o:[7]};Vi[2]={w:[2],i:[3,0],0:[3,0]};Vi[3]={i:[3,0],0:[3,0],w:[1,1],".":[2,1],"[":[4,1],o:[7,1]};Vi[4]={"'":[5,0],'"':[6,0],"[":[4,2],"]":[1,3],o:8,l:[4,0]};Vi[5]={"'":[4,0],o:8,l:[5,0]};Vi[6]={'"':[4,0],o:8,l:[6,0]};const WT=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function GT(n){return WT.test(n)}function jT(n){const e=n.charCodeAt(0),t=n.charCodeAt(n.length-1);return e===t&&(e===34||e===39)?n.slice(1,-1):n}function XT(n){if(n==null)return"o";switch(n.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return n;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function YT(n){const e=n.trim();return n.charAt(0)==="0"&&isNaN(parseInt(n))?!1:GT(e)?jT(e):"*"+e}function qT(n){const e=[];let t=-1,i=0,s=0,r,a,o,l,c,u,h;const f=[];f[0]=()=>{a===void 0?a=o:a+=o},f[1]=()=>{a!==void 0&&(e.push(a),a=void 0)},f[2]=()=>{f[0](),s++},f[3]=()=>{if(s>0)s--,i=4,f[0]();else{if(s=0,a===void 0||(a=YT(a),a===!1))return!1;f[1]()}};function p(){const v=n[t+1];if(i===5&&v==="'"||i===6&&v==='"')return t++,o="\\"+v,f[0](),!0}for(;i!==null;)if(t++,r=n[t],!(r==="\\"&&p())){if(l=XT(r),h=Vi[i],c=h[l]||h.l||8,c===8||(i=c[0],c[1]!==void 0&&(u=f[c[1]],u&&(o=r,u()===!1))))return;if(i===7)return e}}const Ed=new Map;function $T(n,e){return nt(n)?n[e]:null}function KT(n,e){if(!nt(n))return null;let t=Ed.get(e);if(t||(t=qT(e),t&&Ed.set(e,t)),!t)return null;const i=t.length;let s=n,r=0;for(;r<i;){const a=s[t[r]];if(a===void 0||lt(s))return null;s=a,r++}return s}const QT=n=>n,JT=n=>"",ZT="text",eA=n=>n.length===0?"":hT(n),tA=uT;function Td(n,e){return n=Math.abs(n),e===2?n?n>1?1:0:1:n?Math.min(n,2):0}function nA(n){const e=Mt(n.pluralIndex)?n.pluralIndex:-1;return n.named&&(Mt(n.named.count)||Mt(n.named.n))?Mt(n.named.count)?n.named.count:Mt(n.named.n)?n.named.n:e:e}function iA(n,e){e.count||(e.count=n),e.n||(e.n=n)}function sA(n={}){const e=n.locale,t=nA(n),i=nt(n.pluralRules)&&be(e)&&lt(n.pluralRules[e])?n.pluralRules[e]:Td,s=nt(n.pluralRules)&&be(e)&&lt(n.pluralRules[e])?Td:void 0,r=g=>g[i(t,g.length,s)],a=n.list||[],o=g=>a[g],l=n.named||{};Mt(n.pluralIndex)&&iA(t,l);const c=g=>l[g];function u(g){const b=lt(n.messages)?n.messages(g):nt(n.messages)?n.messages[g]:!1;return b||(n.parent?n.parent.message(g):JT)}const h=g=>n.modifiers?n.modifiers[g]:QT,f=Oe(n.processor)&&lt(n.processor.normalize)?n.processor.normalize:eA,p=Oe(n.processor)&&lt(n.processor.interpolate)?n.processor.interpolate:tA,v=Oe(n.processor)&&be(n.processor.type)?n.processor.type:ZT,d={list:o,named:c,plural:r,linked:(g,...b)=>{const[S,y]=b;let w="text",A="";b.length===1?nt(S)?(A=S.modifier||A,w=S.type||w):be(S)&&(A=S||A):b.length===2&&(be(S)&&(A=S||A),be(y)&&(w=y||w));const P=u(g)(d),M=w==="vnode"&&ct(P)&&A?P[0]:P;return A?h(A)(M,w):M},message:u,type:v,interpolate:p,normalize:f,values:Dt({},a,l)};return d}let ua=null;function rA(n){ua=n}function aA(n,e,t){ua&&ua.emit("i18n:init",{timestamp:Date.now(),i18n:n,version:e,meta:t})}const oA=lA("function:translate");function lA(n){return e=>ua&&ua.emit(n,e)}const cA={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER:7,__EXTEND_POINT__:8},sg=De.__EXTEND_POINT__,Ki=Eu(sg),Rn={INVALID_ARGUMENT:sg,INVALID_DATE_ARGUMENT:Ki(),INVALID_ISO_DATE_ARGUMENT:Ki(),NOT_SUPPORT_NON_STRING_MESSAGE:Ki(),NOT_SUPPORT_LOCALE_PROMISE_VALUE:Ki(),NOT_SUPPORT_LOCALE_ASYNC_FUNCTION:Ki(),NOT_SUPPORT_LOCALE_TYPE:Ki(),__EXTEND_POINT__:Ki()};function zn(n){return yr(n,null,void 0)}function Au(n,e){return e.locale!=null?Ad(e.locale):Ad(n.locale)}let ql;function Ad(n){if(be(n))return n;if(lt(n)){if(n.resolvedOnce&&ql!=null)return ql;if(n.constructor.name==="Function"){const e=n();if(cT(e))throw zn(Rn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);return ql=e}else throw zn(Rn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)}else throw zn(Rn.NOT_SUPPORT_LOCALE_TYPE)}function uA(n,e,t){return[...new Set([t,...ct(e)?e:nt(e)?Object.keys(e):be(e)?[e]:[t]])]}function rg(n,e,t){const i=be(t)?t:lr,s=n;s.__localeChainCache||(s.__localeChainCache=new Map);let r=s.__localeChainCache.get(i);if(!r){r=[];let a=[t];for(;ct(a);)a=Cd(r,a,e);const o=ct(e)||!Oe(e)?e:e.default?e.default:null;a=be(o)?[o]:o,ct(a)&&Cd(r,a,!1),s.__localeChainCache.set(i,r)}return r}function Cd(n,e,t){let i=!0;for(let s=0;s<e.length&&We(i);s++){const r=e[s];be(r)&&(i=hA(n,e[s],t))}return i}function hA(n,e,t){let i;const s=e.split("-");do{const r=s.join("-");i=fA(n,r,t),s.splice(-1,1)}while(s.length&&i===!0);return i}function fA(n,e,t){let i=!1;if(!n.includes(e)&&(i=!0,e)){i=e[e.length-1]!=="!";const s=e.replace(/!/g,"");n.push(s),(ct(t)||Oe(t))&&t[s]&&(i=t[s])}return i}const dA="9.9.0",Xo=-1,lr="en-US",Ld="",Rd=n=>`${n.charAt(0).toLocaleUpperCase()}${n.substr(1)}`;function pA(){return{upper:(n,e)=>e==="text"&&be(n)?n.toUpperCase():e==="vnode"&&nt(n)&&"__v_isVNode"in n?n.children.toUpperCase():n,lower:(n,e)=>e==="text"&&be(n)?n.toLowerCase():e==="vnode"&&nt(n)&&"__v_isVNode"in n?n.children.toLowerCase():n,capitalize:(n,e)=>e==="text"&&be(n)?Rd(n):e==="vnode"&&nt(n)&&"__v_isVNode"in n?Rd(n.children):n}}let ag;function Id(n){ag=n}let og;function mA(n){og=n}let lg;function gA(n){lg=n}let cg=null;const _A=n=>{cg=n},vA=()=>cg;let ug=null;const Pd=n=>{ug=n},xA=()=>ug;let Dd=0;function yA(n={}){const e=lt(n.onWarn)?n.onWarn:fT,t=be(n.version)?n.version:dA,i=be(n.locale)||lt(n.locale)?n.locale:lr,s=lt(i)?lr:i,r=ct(n.fallbackLocale)||Oe(n.fallbackLocale)||be(n.fallbackLocale)||n.fallbackLocale===!1?n.fallbackLocale:s,a=Oe(n.messages)?n.messages:{[s]:{}},o=Oe(n.datetimeFormats)?n.datetimeFormats:{[s]:{}},l=Oe(n.numberFormats)?n.numberFormats:{[s]:{}},c=Dt({},n.modifiers||{},pA()),u=n.pluralRules||{},h=lt(n.missing)?n.missing:null,f=We(n.missingWarn)||Fi(n.missingWarn)?n.missingWarn:!0,p=We(n.fallbackWarn)||Fi(n.fallbackWarn)?n.fallbackWarn:!0,v=!!n.fallbackFormat,m=!!n.unresolving,d=lt(n.postTranslation)?n.postTranslation:null,g=Oe(n.processor)?n.processor:null,b=We(n.warnHtmlMessage)?n.warnHtmlMessage:!0,S=!!n.escapeParameter,y=lt(n.messageCompiler)?n.messageCompiler:ag,w=lt(n.messageResolver)?n.messageResolver:og||$T,A=lt(n.localeFallbacker)?n.localeFallbacker:lg||uA,P=nt(n.fallbackContext)?n.fallbackContext:void 0,M=n,I=nt(M.__datetimeFormatters)?M.__datetimeFormatters:new Map,O=nt(M.__numberFormatters)?M.__numberFormatters:new Map,Q=nt(M.__meta)?M.__meta:{};Dd++;const ue={version:t,cid:Dd,locale:i,fallbackLocale:r,messages:a,modifiers:c,pluralRules:u,missing:h,missingWarn:f,fallbackWarn:p,fallbackFormat:v,unresolving:m,postTranslation:d,processor:g,warnHtmlMessage:b,escapeParameter:S,messageCompiler:y,messageResolver:w,localeFallbacker:A,fallbackContext:P,onWarn:e,__meta:Q};return ue.datetimeFormats=o,ue.numberFormats=l,ue.__datetimeFormatters=I,ue.__numberFormatters=O,__INTLIFY_PROD_DEVTOOLS__&&aA(ue,t,Q),ue}function Cu(n,e,t,i,s){const{missing:r,onWarn:a}=n;if(r!==null){const o=r(n,t,e,s);return be(o)?o:e}else return e}function Dr(n,e,t){const i=n;i.__localeChainCache=new Map,n.localeFallbacker(n,t,e)}function $l(n){return t=>bA(t,n)}function bA(n,e){const t=e.b||e.body;if((t.t||t.type)===1){const i=t,s=i.c||i.cases;return n.plural(s.reduce((r,a)=>[...r,Nd(n,a)],[]))}else return Nd(n,t)}function Nd(n,e){const t=e.s||e.static;if(t)return n.type==="text"?t:n.normalize([t]);{const i=(e.i||e.items).reduce((s,r)=>[...s,Cc(n,r)],[]);return n.normalize(i)}}function Cc(n,e){const t=e.t||e.type;switch(t){case 3:const i=e;return i.v||i.value;case 9:const s=e;return s.v||s.value;case 4:const r=e;return n.interpolate(n.named(r.k||r.key));case 5:const a=e;return n.interpolate(n.list(a.i!=null?a.i:a.index));case 6:const o=e,l=o.m||o.modifier;return n.linked(Cc(n,o.k||o.key),l?Cc(n,l):void 0,n.type);case 7:const c=e;return c.v||c.value;case 8:const u=e;return u.v||u.value;default:throw new Error(`unhandled node type on format message part: ${t}`)}}const hg=n=>n;let zs=Object.create(null);const cr=n=>nt(n)&&(n.t===0||n.type===0)&&("b"in n||"body"in n);function fg(n,e={}){let t=!1;const i=e.onError||vT;return e.onError=s=>{t=!0,i(s)},{...zT(n,e),detectError:t}}const MA=(n,e)=>{if(!be(n))throw zn(Rn.NOT_SUPPORT_NON_STRING_MESSAGE);{We(e.warnHtmlMessage)&&e.warnHtmlMessage;const i=(e.onCacheKey||hg)(n),s=zs[i];if(s)return s;const{code:r,detectError:a}=fg(n,e),o=new Function(`return ${r}`)();return a?o:zs[i]=o}};function SA(n,e){if(__INTLIFY_JIT_COMPILATION__&&!__INTLIFY_DROP_MESSAGE_COMPILER__&&be(n)){We(e.warnHtmlMessage)&&e.warnHtmlMessage;const i=(e.onCacheKey||hg)(n),s=zs[i];if(s)return s;const{ast:r,detectError:a}=fg(n,{...e,location:!1,jit:!0}),o=$l(r);return a?o:zs[i]=o}else{const t=n.cacheKey;if(t){const i=zs[t];return i||(zs[t]=$l(n))}else return $l(n)}}const Od=()=>"",mn=n=>lt(n);function Fd(n,...e){const{fallbackFormat:t,postTranslation:i,unresolving:s,messageCompiler:r,fallbackLocale:a,messages:o}=n,[l,c]=Lc(...e),u=We(c.missingWarn)?c.missingWarn:n.missingWarn,h=We(c.fallbackWarn)?c.fallbackWarn:n.fallbackWarn,f=We(c.escapeParameter)?c.escapeParameter:n.escapeParameter,p=!!c.resolvedMessage,v=be(c.default)||We(c.default)?We(c.default)?r?l:()=>l:c.default:t?r?l:()=>l:"",m=t||v!=="",d=Au(n,c);f&&wA(c);let[g,b,S]=p?[l,d,o[d]||{}]:dg(n,l,d,a,h,u),y=g,w=l;if(!p&&!(be(y)||cr(y)||mn(y))&&m&&(y=v,w=y),!p&&(!(be(y)||cr(y)||mn(y))||!be(b)))return s?Xo:l;let A=!1;const P=()=>{A=!0},M=mn(y)?y:pg(n,l,b,y,w,P);if(A)return y;const I=AA(n,b,S,c),O=sA(I),Q=EA(n,M,O),ue=i?i(Q,l):Q;if(__INTLIFY_PROD_DEVTOOLS__){const H={timestamp:Date.now(),key:be(l)?l:mn(y)?y.key:"",locale:b||(mn(y)?y.locale:""),format:be(y)?y:mn(y)?y.source:"",message:ue};H.meta=Dt({},n.__meta,vA()||{}),oA(H)}return ue}function wA(n){ct(n.list)?n.list=n.list.map(e=>be(e)?yd(e):e):nt(n.named)&&Object.keys(n.named).forEach(e=>{be(n.named[e])&&(n.named[e]=yd(n.named[e]))})}function dg(n,e,t,i,s,r){const{messages:a,onWarn:o,messageResolver:l,localeFallbacker:c}=n,u=c(n,i,t);let h={},f,p=null;const v="translate";for(let m=0;m<u.length&&(f=u[m],h=a[f]||{},(p=l(h,e))===null&&(p=h[e]),!(be(p)||cr(p)||mn(p)));m++){const d=Cu(n,e,f,r,v);d!==e&&(p=d)}return[p,f,h]}function pg(n,e,t,i,s,r){const{messageCompiler:a,warnHtmlMessage:o}=n;if(mn(i)){const c=i;return c.locale=c.locale||t,c.key=c.key||e,c}if(a==null){const c=()=>i;return c.locale=t,c.key=e,c}const l=a(i,TA(n,t,s,i,o,r));return l.locale=t,l.key=e,l.source=i,l}function EA(n,e,t){return e(t)}function Lc(...n){const[e,t,i]=n,s={};if(!be(e)&&!Mt(e)&&!mn(e)&&!cr(e))throw zn(Rn.INVALID_ARGUMENT);const r=Mt(e)?String(e):(mn(e),e);return Mt(t)?s.plural=t:be(t)?s.default=t:Oe(t)&&!jo(t)?s.named=t:ct(t)&&(s.list=t),Mt(i)?s.plural=i:be(i)?s.default=i:Oe(i)&&Dt(s,i),[r,s]}function TA(n,e,t,i,s,r){return{locale:e,key:t,warnHtmlMessage:s,onError:a=>{throw r&&r(a),a},onCacheKey:a=>rT(e,t,a)}}function AA(n,e,t,i){const{modifiers:s,pluralRules:r,messageResolver:a,fallbackLocale:o,fallbackWarn:l,missingWarn:c,fallbackContext:u}=n,f={locale:e,modifiers:s,pluralRules:r,messages:p=>{let v=a(t,p);if(v==null&&u){const[,,m]=dg(u,p,e,o,l,c);v=a(m,p)}if(be(v)||cr(v)){let m=!1;const g=pg(n,p,e,v,p,()=>{m=!0});return m?Od:g}else return mn(v)?v:Od}};return n.processor&&(f.processor=n.processor),i.list&&(f.list=i.list),i.named&&(f.named=i.named),Mt(i.plural)&&(f.pluralIndex=i.plural),f}function kd(n,...e){const{datetimeFormats:t,unresolving:i,fallbackLocale:s,onWarn:r,localeFallbacker:a}=n,{__datetimeFormatters:o}=n,[l,c,u,h]=Rc(...e),f=We(u.missingWarn)?u.missingWarn:n.missingWarn;We(u.fallbackWarn)?u.fallbackWarn:n.fallbackWarn;const p=!!u.part,v=Au(n,u),m=a(n,s,v);if(!be(l)||l==="")return new Intl.DateTimeFormat(v,h).format(c);let d={},g,b=null;const S="datetime format";for(let A=0;A<m.length&&(g=m[A],d=t[g]||{},b=d[l],!Oe(b));A++)Cu(n,l,g,f,S);if(!Oe(b)||!be(g))return i?Xo:l;let y=`${g}__${l}`;jo(h)||(y=`${y}__${JSON.stringify(h)}`);let w=o.get(y);return w||(w=new Intl.DateTimeFormat(g,Dt({},b,h)),o.set(y,w)),p?w.formatToParts(c):w.format(c)}const mg=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function Rc(...n){const[e,t,i,s]=n,r={};let a={},o;if(be(e)){const l=e.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!l)throw zn(Rn.INVALID_ISO_DATE_ARGUMENT);const c=l[3]?l[3].trim().startsWith("T")?`${l[1].trim()}${l[3].trim()}`:`${l[1].trim()}T${l[3].trim()}`:l[1].trim();o=new Date(c);try{o.toISOString()}catch{throw zn(Rn.INVALID_ISO_DATE_ARGUMENT)}}else if(oT(e)){if(isNaN(e.getTime()))throw zn(Rn.INVALID_DATE_ARGUMENT);o=e}else if(Mt(e))o=e;else throw zn(Rn.INVALID_ARGUMENT);return be(t)?r.key=t:Oe(t)&&Object.keys(t).forEach(l=>{mg.includes(l)?a[l]=t[l]:r[l]=t[l]}),be(i)?r.locale=i:Oe(i)&&(a=i),Oe(s)&&(a=s),[r.key||"",o,r,a]}function Ud(n,e,t){const i=n;for(const s in t){const r=`${e}__${s}`;i.__datetimeFormatters.has(r)&&i.__datetimeFormatters.delete(r)}}function Bd(n,...e){const{numberFormats:t,unresolving:i,fallbackLocale:s,onWarn:r,localeFallbacker:a}=n,{__numberFormatters:o}=n,[l,c,u,h]=Ic(...e),f=We(u.missingWarn)?u.missingWarn:n.missingWarn;We(u.fallbackWarn)?u.fallbackWarn:n.fallbackWarn;const p=!!u.part,v=Au(n,u),m=a(n,s,v);if(!be(l)||l==="")return new Intl.NumberFormat(v,h).format(c);let d={},g,b=null;const S="number format";for(let A=0;A<m.length&&(g=m[A],d=t[g]||{},b=d[l],!Oe(b));A++)Cu(n,l,g,f,S);if(!Oe(b)||!be(g))return i?Xo:l;let y=`${g}__${l}`;jo(h)||(y=`${y}__${JSON.stringify(h)}`);let w=o.get(y);return w||(w=new Intl.NumberFormat(g,Dt({},b,h)),o.set(y,w)),p?w.formatToParts(c):w.format(c)}const gg=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function Ic(...n){const[e,t,i,s]=n,r={};let a={};if(!Mt(e))throw zn(Rn.INVALID_ARGUMENT);const o=e;return be(t)?r.key=t:Oe(t)&&Object.keys(t).forEach(l=>{gg.includes(l)?a[l]=t[l]:r[l]=t[l]}),be(i)?r.locale=i:Oe(i)&&(a=i),Oe(s)&&(a=s),[r.key||"",o,r,a]}function Vd(n,e,t){const i=n;for(const s in t){const r=`${e}__${s}`;i.__numberFormatters.has(r)&&i.__numberFormatters.delete(r)}}HT();/*!
  * vue-i18n v9.9.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */const CA="9.9.0";function LA(){typeof __VUE_I18N_FULL_INSTALL__!="boolean"&&(si().__VUE_I18N_FULL_INSTALL__=!0),typeof __VUE_I18N_LEGACY_API__!="boolean"&&(si().__VUE_I18N_LEGACY_API__=!0),typeof __INTLIFY_JIT_COMPILATION__!="boolean"&&(si().__INTLIFY_JIT_COMPILATION__=!1),typeof __INTLIFY_DROP_MESSAGE_COMPILER__!="boolean"&&(si().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),typeof __INTLIFY_PROD_DEVTOOLS__!="boolean"&&(si().__INTLIFY_PROD_DEVTOOLS__=!1)}const _g=cA.__EXTEND_POINT__,wi=Eu(_g);wi(),wi(),wi(),wi(),wi(),wi(),wi(),wi();const vg=Rn.__EXTEND_POINT__,Kt=Eu(vg),St={UNEXPECTED_RETURN_TYPE:vg,INVALID_ARGUMENT:Kt(),MUST_BE_CALL_SETUP_TOP:Kt(),NOT_INSTALLED:Kt(),NOT_AVAILABLE_IN_LEGACY_MODE:Kt(),REQUIRED_VALUE:Kt(),INVALID_VALUE:Kt(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:Kt(),NOT_INSTALLED_WITH_PROVIDE:Kt(),UNEXPECTED_ERROR:Kt(),NOT_COMPATIBLE_LEGACY_VUE_I18N:Kt(),BRIDGE_SUPPORT_VUE_2_ONLY:Kt(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:Kt(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:Kt(),__EXTEND_POINT__:Kt()};function Rt(n,...e){return yr(n,null,void 0)}const Pc=Bi("__translateVNode"),Dc=Bi("__datetimeParts"),Nc=Bi("__numberParts"),xg=Bi("__setPluralRules"),yg=Bi("__injectWithOption"),Oc=Bi("__dispose");function ha(n){if(!nt(n))return n;for(const e in n)if(To(n,e))if(!e.includes("."))nt(n[e])&&ha(n[e]);else{const t=e.split("."),i=t.length-1;let s=n,r=!1;for(let a=0;a<i;a++){if(t[a]in s||(s[t[a]]={}),!nt(s[t[a]])){r=!0;break}s=s[t[a]]}r||(s[t[i]]=n[e],delete n[e]),nt(s[t[i]])&&ha(s[t[i]])}return n}function Yo(n,e){const{messages:t,__i18n:i,messageResolver:s,flatJson:r}=e,a=Oe(t)?t:ct(i)?{}:{[n]:{}};if(ct(i)&&i.forEach(o=>{if("locale"in o&&"resource"in o){const{locale:l,resource:c}=o;l?(a[l]=a[l]||{},go(c,a[l])):go(c,a)}else be(o)&&go(JSON.parse(o),a)}),s==null&&r)for(const o in a)To(a,o)&&ha(a[o]);return a}function bg(n){return n.type}function Mg(n,e,t){let i=nt(e.messages)?e.messages:{};"__i18nGlobal"in t&&(i=Yo(n.locale.value,{messages:i,__i18n:t.__i18nGlobal}));const s=Object.keys(i);s.length&&s.forEach(r=>{n.mergeLocaleMessage(r,i[r])});{if(nt(e.datetimeFormats)){const r=Object.keys(e.datetimeFormats);r.length&&r.forEach(a=>{n.mergeDateTimeFormat(a,e.datetimeFormats[a])})}if(nt(e.numberFormats)){const r=Object.keys(e.numberFormats);r.length&&r.forEach(a=>{n.mergeNumberFormat(a,e.numberFormats[a])})}}}function zd(n){return Ze(ma,null,n,0)}const Hd="__INTLIFY_META__",Wd=()=>[],RA=()=>!1;let Gd=0;function jd(n){return(e,t,i,s)=>n(t,i,Zr()||void 0,s)}const IA=()=>{const n=Zr();let e=null;return n&&(e=bg(n)[Hd])?{[Hd]:e}:null};function Lu(n={},e){const{__root:t,__injectWithOption:i}=n,s=t===void 0,r=n.flatJson,a=Eo?Ri:qc;let o=We(n.inheritLocale)?n.inheritLocale:!0;const l=a(t&&o?t.locale.value:be(n.locale)?n.locale:lr),c=a(t&&o?t.fallbackLocale.value:be(n.fallbackLocale)||ct(n.fallbackLocale)||Oe(n.fallbackLocale)||n.fallbackLocale===!1?n.fallbackLocale:l.value),u=a(Yo(l.value,n)),h=a(Oe(n.datetimeFormats)?n.datetimeFormats:{[l.value]:{}}),f=a(Oe(n.numberFormats)?n.numberFormats:{[l.value]:{}});let p=t?t.missingWarn:We(n.missingWarn)||Fi(n.missingWarn)?n.missingWarn:!0,v=t?t.fallbackWarn:We(n.fallbackWarn)||Fi(n.fallbackWarn)?n.fallbackWarn:!0,m=t?t.fallbackRoot:We(n.fallbackRoot)?n.fallbackRoot:!0,d=!!n.fallbackFormat,g=lt(n.missing)?n.missing:null,b=lt(n.missing)?jd(n.missing):null,S=lt(n.postTranslation)?n.postTranslation:null,y=t?t.warnHtmlMessage:We(n.warnHtmlMessage)?n.warnHtmlMessage:!0,w=!!n.escapeParameter;const A=t?t.modifiers:Oe(n.modifiers)?n.modifiers:{};let P=n.pluralRules||t&&t.pluralRules,M;M=(()=>{s&&Pd(null);const R={version:CA,locale:l.value,fallbackLocale:c.value,messages:u.value,modifiers:A,pluralRules:P,missing:b===null?void 0:b,missingWarn:p,fallbackWarn:v,fallbackFormat:d,unresolving:!0,postTranslation:S===null?void 0:S,warnHtmlMessage:y,escapeParameter:w,messageResolver:n.messageResolver,messageCompiler:n.messageCompiler,__meta:{framework:"vue"}};R.datetimeFormats=h.value,R.numberFormats=f.value,R.__datetimeFormatters=Oe(M)?M.__datetimeFormatters:void 0,R.__numberFormatters=Oe(M)?M.__numberFormatters:void 0;const D=yA(R);return s&&Pd(D),D})(),Dr(M,l.value,c.value);function O(){return[l.value,c.value,u.value,h.value,f.value]}const Q=_t({get:()=>l.value,set:R=>{l.value=R,M.locale=l.value}}),ue=_t({get:()=>c.value,set:R=>{c.value=R,M.fallbackLocale=c.value,Dr(M,l.value,R)}}),H=_t(()=>u.value),V=_t(()=>h.value),te=_t(()=>f.value);function re(){return lt(S)?S:null}function ne(R){S=R,M.postTranslation=R}function G(){return g}function pe(R){R!==null&&(b=jd(R)),g=R,M.missing=b}const ce=(R,D,Z,ge,de,K)=>{O();let Se;try{__INTLIFY_PROD_DEVTOOLS__,s||(M.fallbackContext=t?xA():void 0),Se=R(M)}finally{__INTLIFY_PROD_DEVTOOLS__,s||(M.fallbackContext=void 0)}if(Z!=="translate exists"&&Mt(Se)&&Se===Xo||Z==="translate exists"&&!Se){const[Ce,Ae]=D();return t&&m?ge(t):de(Ce)}else{if(K(Se))return Se;throw Rt(St.UNEXPECTED_RETURN_TYPE)}};function X(...R){return ce(D=>Reflect.apply(Fd,null,[D,...R]),()=>Lc(...R),"translate",D=>Reflect.apply(D.t,D,[...R]),D=>D,D=>be(D))}function Y(...R){const[D,Z,ge]=R;if(ge&&!nt(ge))throw Rt(St.INVALID_ARGUMENT);return X(D,Z,Dt({resolvedMessage:!0},ge||{}))}function fe(...R){return ce(D=>Reflect.apply(kd,null,[D,...R]),()=>Rc(...R),"datetime format",D=>Reflect.apply(D.d,D,[...R]),()=>Ld,D=>be(D))}function me(...R){return ce(D=>Reflect.apply(Bd,null,[D,...R]),()=>Ic(...R),"number format",D=>Reflect.apply(D.n,D,[...R]),()=>Ld,D=>be(D))}function xe(R){return R.map(D=>be(D)||Mt(D)||We(D)?zd(String(D)):D)}const W={normalize:xe,interpolate:R=>R,type:"vnode"};function J(...R){return ce(D=>{let Z;const ge=D;try{ge.processor=W,Z=Reflect.apply(Fd,null,[ge,...R])}finally{ge.processor=null}return Z},()=>Lc(...R),"translate",D=>D[Pc](...R),D=>[zd(D)],D=>ct(D))}function ie(...R){return ce(D=>Reflect.apply(Bd,null,[D,...R]),()=>Ic(...R),"number format",D=>D[Nc](...R),Wd,D=>be(D)||ct(D))}function ee(...R){return ce(D=>Reflect.apply(kd,null,[D,...R]),()=>Rc(...R),"datetime format",D=>D[Dc](...R),Wd,D=>be(D)||ct(D))}function Ee(R){P=R,M.pluralRules=P}function Me(R,D){return ce(()=>{if(!R)return!1;const Z=be(D)?D:l.value,ge=C(Z),de=M.messageResolver(ge,R);return cr(de)||mn(de)||be(de)},()=>[R],"translate exists",Z=>Reflect.apply(Z.te,Z,[R,D]),RA,Z=>We(Z))}function _(R){let D=null;const Z=rg(M,c.value,l.value);for(let ge=0;ge<Z.length;ge++){const de=u.value[Z[ge]]||{},K=M.messageResolver(de,R);if(K!=null){D=K;break}}return D}function x(R){const D=_(R);return D??(t?t.tm(R)||{}:{})}function C(R){return u.value[R]||{}}function N(R,D){if(r){const Z={[R]:D};for(const ge in Z)To(Z,ge)&&ha(Z[ge]);D=Z[R]}u.value[R]=D,M.messages=u.value}function B(R,D){u.value[R]=u.value[R]||{};const Z={[R]:D};for(const ge in Z)To(Z,ge)&&ha(Z[ge]);D=Z[R],go(D,u.value[R]),M.messages=u.value}function $(R){return h.value[R]||{}}function le(R,D){h.value[R]=D,M.datetimeFormats=h.value,Ud(M,R,D)}function he(R,D){h.value[R]=Dt(h.value[R]||{},D),M.datetimeFormats=h.value,Ud(M,R,D)}function _e(R){return f.value[R]||{}}function T(R,D){f.value[R]=D,M.numberFormats=f.value,Vd(M,R,D)}function E(R,D){f.value[R]=Dt(f.value[R]||{},D),M.numberFormats=f.value,Vd(M,R,D)}Gd++,t&&Eo&&(rs(t.locale,R=>{o&&(l.value=R,M.locale=R,Dr(M,l.value,c.value))}),rs(t.fallbackLocale,R=>{o&&(c.value=R,M.fallbackLocale=R,Dr(M,l.value,c.value))}));const F={id:Gd,locale:Q,fallbackLocale:ue,get inheritLocale(){return o},set inheritLocale(R){o=R,R&&t&&(l.value=t.locale.value,c.value=t.fallbackLocale.value,Dr(M,l.value,c.value))},get availableLocales(){return Object.keys(u.value).sort()},messages:H,get modifiers(){return A},get pluralRules(){return P||{}},get isGlobal(){return s},get missingWarn(){return p},set missingWarn(R){p=R,M.missingWarn=p},get fallbackWarn(){return v},set fallbackWarn(R){v=R,M.fallbackWarn=v},get fallbackRoot(){return m},set fallbackRoot(R){m=R},get fallbackFormat(){return d},set fallbackFormat(R){d=R,M.fallbackFormat=d},get warnHtmlMessage(){return y},set warnHtmlMessage(R){y=R,M.warnHtmlMessage=R},get escapeParameter(){return w},set escapeParameter(R){w=R,M.escapeParameter=R},t:X,getLocaleMessage:C,setLocaleMessage:N,mergeLocaleMessage:B,getPostTranslationHandler:re,setPostTranslationHandler:ne,getMissingHandler:G,setMissingHandler:pe,[xg]:Ee};return F.datetimeFormats=V,F.numberFormats=te,F.rt=Y,F.te=Me,F.tm=x,F.d=fe,F.n=me,F.getDateTimeFormat=$,F.setDateTimeFormat=le,F.mergeDateTimeFormat=he,F.getNumberFormat=_e,F.setNumberFormat=T,F.mergeNumberFormat=E,F[yg]=i,F[Pc]=J,F[Dc]=ee,F[Nc]=ie,F}function PA(n){const e=be(n.locale)?n.locale:lr,t=be(n.fallbackLocale)||ct(n.fallbackLocale)||Oe(n.fallbackLocale)||n.fallbackLocale===!1?n.fallbackLocale:e,i=lt(n.missing)?n.missing:void 0,s=We(n.silentTranslationWarn)||Fi(n.silentTranslationWarn)?!n.silentTranslationWarn:!0,r=We(n.silentFallbackWarn)||Fi(n.silentFallbackWarn)?!n.silentFallbackWarn:!0,a=We(n.fallbackRoot)?n.fallbackRoot:!0,o=!!n.formatFallbackMessages,l=Oe(n.modifiers)?n.modifiers:{},c=n.pluralizationRules,u=lt(n.postTranslation)?n.postTranslation:void 0,h=be(n.warnHtmlInMessage)?n.warnHtmlInMessage!=="off":!0,f=!!n.escapeParameterHtml,p=We(n.sync)?n.sync:!0;let v=n.messages;if(Oe(n.sharedMessages)){const w=n.sharedMessages;v=Object.keys(w).reduce((P,M)=>{const I=P[M]||(P[M]={});return Dt(I,w[M]),P},v||{})}const{__i18n:m,__root:d,__injectWithOption:g}=n,b=n.datetimeFormats,S=n.numberFormats,y=n.flatJson;return{locale:e,fallbackLocale:t,messages:v,flatJson:y,datetimeFormats:b,numberFormats:S,missing:i,missingWarn:s,fallbackWarn:r,fallbackRoot:a,fallbackFormat:o,modifiers:l,pluralRules:c,postTranslation:u,warnHtmlMessage:h,escapeParameter:f,messageResolver:n.messageResolver,inheritLocale:p,__i18n:m,__root:d,__injectWithOption:g}}function Fc(n={},e){{const t=Lu(PA(n)),{__extender:i}=n,s={id:t.id,get locale(){return t.locale.value},set locale(r){t.locale.value=r},get fallbackLocale(){return t.fallbackLocale.value},set fallbackLocale(r){t.fallbackLocale.value=r},get messages(){return t.messages.value},get datetimeFormats(){return t.datetimeFormats.value},get numberFormats(){return t.numberFormats.value},get availableLocales(){return t.availableLocales},get formatter(){return{interpolate(){return[]}}},set formatter(r){},get missing(){return t.getMissingHandler()},set missing(r){t.setMissingHandler(r)},get silentTranslationWarn(){return We(t.missingWarn)?!t.missingWarn:t.missingWarn},set silentTranslationWarn(r){t.missingWarn=We(r)?!r:r},get silentFallbackWarn(){return We(t.fallbackWarn)?!t.fallbackWarn:t.fallbackWarn},set silentFallbackWarn(r){t.fallbackWarn=We(r)?!r:r},get modifiers(){return t.modifiers},get formatFallbackMessages(){return t.fallbackFormat},set formatFallbackMessages(r){t.fallbackFormat=r},get postTranslation(){return t.getPostTranslationHandler()},set postTranslation(r){t.setPostTranslationHandler(r)},get sync(){return t.inheritLocale},set sync(r){t.inheritLocale=r},get warnHtmlInMessage(){return t.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(r){t.warnHtmlMessage=r!=="off"},get escapeParameterHtml(){return t.escapeParameter},set escapeParameterHtml(r){t.escapeParameter=r},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(r){},get pluralizationRules(){return t.pluralRules||{}},__composer:t,t(...r){const[a,o,l]=r,c={};let u=null,h=null;if(!be(a))throw Rt(St.INVALID_ARGUMENT);const f=a;return be(o)?c.locale=o:ct(o)?u=o:Oe(o)&&(h=o),ct(l)?u=l:Oe(l)&&(h=l),Reflect.apply(t.t,t,[f,u||h||{},c])},rt(...r){return Reflect.apply(t.rt,t,[...r])},tc(...r){const[a,o,l]=r,c={plural:1};let u=null,h=null;if(!be(a))throw Rt(St.INVALID_ARGUMENT);const f=a;return be(o)?c.locale=o:Mt(o)?c.plural=o:ct(o)?u=o:Oe(o)&&(h=o),be(l)?c.locale=l:ct(l)?u=l:Oe(l)&&(h=l),Reflect.apply(t.t,t,[f,u||h||{},c])},te(r,a){return t.te(r,a)},tm(r){return t.tm(r)},getLocaleMessage(r){return t.getLocaleMessage(r)},setLocaleMessage(r,a){t.setLocaleMessage(r,a)},mergeLocaleMessage(r,a){t.mergeLocaleMessage(r,a)},d(...r){return Reflect.apply(t.d,t,[...r])},getDateTimeFormat(r){return t.getDateTimeFormat(r)},setDateTimeFormat(r,a){t.setDateTimeFormat(r,a)},mergeDateTimeFormat(r,a){t.mergeDateTimeFormat(r,a)},n(...r){return Reflect.apply(t.n,t,[...r])},getNumberFormat(r){return t.getNumberFormat(r)},setNumberFormat(r,a){t.setNumberFormat(r,a)},mergeNumberFormat(r,a){t.mergeNumberFormat(r,a)},getChoiceIndex(r,a){return-1}};return s.__extender=i,s}}const Ru={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:n=>n==="parent"||n==="global",default:"parent"},i18n:{type:Object}};function DA({slots:n},e){return e.length===1&&e[0]==="default"?(n.default?n.default():[]).reduce((i,s)=>[...i,...s.type===kt?s.children:[s]],[]):e.reduce((t,i)=>{const s=n[i];return s&&(t[i]=s()),t},{})}function Sg(n){return kt}const NA=pa({name:"i18n-t",props:Dt({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:n=>Mt(n)||!isNaN(n)}},Ru),setup(n,e){const{slots:t,attrs:i}=e,s=n.i18n||qo({useScope:n.scope,__useComponent:!0});return()=>{const r=Object.keys(t).filter(h=>h!=="_"),a={};n.locale&&(a.locale=n.locale),n.plural!==void 0&&(a.plural=be(n.plural)?+n.plural:n.plural);const o=DA(e,r),l=s[Pc](n.keypath,o,a),c=Dt({},i),u=be(n.tag)||nt(n.tag)?n.tag:Sg();return Vo(u,c,l)}}}),Xd=NA;function OA(n){return ct(n)&&!be(n[0])}function wg(n,e,t,i){const{slots:s,attrs:r}=e;return()=>{const a={part:!0};let o={};n.locale&&(a.locale=n.locale),be(n.format)?a.key=n.format:nt(n.format)&&(be(n.format.key)&&(a.key=n.format.key),o=Object.keys(n.format).reduce((f,p)=>t.includes(p)?Dt({},f,{[p]:n.format[p]}):f,{}));const l=i(n.value,a,o);let c=[a.key];ct(l)?c=l.map((f,p)=>{const v=s[f.type],m=v?v({[f.type]:f.value,index:p,parts:l}):[f.value];return OA(m)&&(m[0].key=`${f.type}-${p}`),m}):be(l)&&(c=[l]);const u=Dt({},r),h=be(n.tag)||nt(n.tag)?n.tag:Sg();return Vo(h,u,c)}}const FA=pa({name:"i18n-n",props:Dt({value:{type:Number,required:!0},format:{type:[String,Object]}},Ru),setup(n,e){const t=n.i18n||qo({useScope:"parent",__useComponent:!0});return wg(n,e,gg,(...i)=>t[Nc](...i))}}),Yd=FA,kA=pa({name:"i18n-d",props:Dt({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},Ru),setup(n,e){const t=n.i18n||qo({useScope:"parent",__useComponent:!0});return wg(n,e,mg,(...i)=>t[Dc](...i))}}),qd=kA;function UA(n,e){const t=n;if(n.mode==="composition")return t.__getInstance(e)||n.global;{const i=t.__getInstance(e);return i!=null?i.__composer:n.global.__composer}}function BA(n){const e=a=>{const{instance:o,modifiers:l,value:c}=a;if(!o||!o.$)throw Rt(St.UNEXPECTED_ERROR);const u=UA(n,o.$),h=$d(c);return[Reflect.apply(u.t,u,[...Kd(h)]),u]};return{created:(a,o)=>{const[l,c]=e(o);Eo&&n.global===c&&(a.__i18nWatcher=rs(c.locale,()=>{o.instance&&o.instance.$forceUpdate()})),a.__composer=c,a.textContent=l},unmounted:a=>{Eo&&a.__i18nWatcher&&(a.__i18nWatcher(),a.__i18nWatcher=void 0,delete a.__i18nWatcher),a.__composer&&(a.__composer=void 0,delete a.__composer)},beforeUpdate:(a,{value:o})=>{if(a.__composer){const l=a.__composer,c=$d(o);a.textContent=Reflect.apply(l.t,l,[...Kd(c)])}},getSSRProps:a=>{const[o]=e(a);return{textContent:o}}}}function $d(n){if(be(n))return{path:n};if(Oe(n)){if(!("path"in n))throw Rt(St.REQUIRED_VALUE,"path");return n}else throw Rt(St.INVALID_VALUE)}function Kd(n){const{path:e,locale:t,args:i,choice:s,plural:r}=n,a={},o=i||{};return be(t)&&(a.locale=t),Mt(s)&&(a.plural=s),Mt(r)&&(a.plural=r),[e,o,a]}function VA(n,e,...t){const i=Oe(t[0])?t[0]:{},s=!!i.useI18nComponentName;(We(i.globalInstall)?i.globalInstall:!0)&&([s?"i18n":Xd.name,"I18nT"].forEach(a=>n.component(a,Xd)),[Yd.name,"I18nN"].forEach(a=>n.component(a,Yd)),[qd.name,"I18nD"].forEach(a=>n.component(a,qd))),n.directive("t",BA(e))}function zA(n,e,t){return{beforeCreate(){const i=Zr();if(!i)throw Rt(St.UNEXPECTED_ERROR);const s=this.$options;if(s.i18n){const r=s.i18n;if(s.__i18n&&(r.__i18n=s.__i18n),r.__root=e,this===this.$root)this.$i18n=Qd(n,r);else{r.__injectWithOption=!0,r.__extender=t.__vueI18nExtend,this.$i18n=Fc(r);const a=this.$i18n;a.__extender&&(a.__disposer=a.__extender(this.$i18n))}}else if(s.__i18n)if(this===this.$root)this.$i18n=Qd(n,s);else{this.$i18n=Fc({__i18n:s.__i18n,__injectWithOption:!0,__extender:t.__vueI18nExtend,__root:e});const r=this.$i18n;r.__extender&&(r.__disposer=r.__extender(this.$i18n))}else this.$i18n=n;s.__i18nGlobal&&Mg(e,s,s),this.$t=(...r)=>this.$i18n.t(...r),this.$rt=(...r)=>this.$i18n.rt(...r),this.$tc=(...r)=>this.$i18n.tc(...r),this.$te=(r,a)=>this.$i18n.te(r,a),this.$d=(...r)=>this.$i18n.d(...r),this.$n=(...r)=>this.$i18n.n(...r),this.$tm=r=>this.$i18n.tm(r),t.__setInstance(i,this.$i18n)},mounted(){},unmounted(){const i=Zr();if(!i)throw Rt(St.UNEXPECTED_ERROR);const s=this.$i18n;delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,s.__disposer&&(s.__disposer(),delete s.__disposer,delete s.__extender),t.__deleteInstance(i),delete this.$i18n}}}function Qd(n,e){n.locale=e.locale||n.locale,n.fallbackLocale=e.fallbackLocale||n.fallbackLocale,n.missing=e.missing||n.missing,n.silentTranslationWarn=e.silentTranslationWarn||n.silentFallbackWarn,n.silentFallbackWarn=e.silentFallbackWarn||n.silentFallbackWarn,n.formatFallbackMessages=e.formatFallbackMessages||n.formatFallbackMessages,n.postTranslation=e.postTranslation||n.postTranslation,n.warnHtmlInMessage=e.warnHtmlInMessage||n.warnHtmlInMessage,n.escapeParameterHtml=e.escapeParameterHtml||n.escapeParameterHtml,n.sync=e.sync||n.sync,n.__composer[xg](e.pluralizationRules||n.pluralizationRules);const t=Yo(n.locale,{messages:e.messages,__i18n:e.__i18n});return Object.keys(t).forEach(i=>n.mergeLocaleMessage(i,t[i])),e.datetimeFormats&&Object.keys(e.datetimeFormats).forEach(i=>n.mergeDateTimeFormat(i,e.datetimeFormats[i])),e.numberFormats&&Object.keys(e.numberFormats).forEach(i=>n.mergeNumberFormat(i,e.numberFormats[i])),n}const HA=Bi("global-vue-i18n");function WA(n={},e){const t=__VUE_I18N_LEGACY_API__&&We(n.legacy)?n.legacy:__VUE_I18N_LEGACY_API__,i=We(n.globalInjection)?n.globalInjection:!0,s=__VUE_I18N_LEGACY_API__&&t?!!n.allowComposition:!0,r=new Map,[a,o]=GA(n,t),l=Bi("");function c(f){return r.get(f)||null}function u(f,p){r.set(f,p)}function h(f){r.delete(f)}{const f={get mode(){return __VUE_I18N_LEGACY_API__&&t?"legacy":"composition"},get allowComposition(){return s},async install(p,...v){if(p.__VUE_I18N_SYMBOL__=l,p.provide(p.__VUE_I18N_SYMBOL__,f),Oe(v[0])){const g=v[0];f.__composerExtend=g.__composerExtend,f.__vueI18nExtend=g.__vueI18nExtend}let m=null;!t&&i&&(m=ZA(p,f.global)),__VUE_I18N_FULL_INSTALL__&&VA(p,f,...v),__VUE_I18N_LEGACY_API__&&t&&p.mixin(zA(o,o.__composer,f));const d=p.unmount;p.unmount=()=>{m&&m(),f.dispose(),d()}},get global(){return o},dispose(){a.stop()},__instances:r,__getInstance:c,__setInstance:u,__deleteInstance:h};return f}}function qo(n={}){const e=Zr();if(e==null)throw Rt(St.MUST_BE_CALL_SETUP_TOP);if(!e.isCE&&e.appContext.app!=null&&!e.appContext.app.__VUE_I18N_SYMBOL__)throw Rt(St.NOT_INSTALLED);const t=jA(e),i=YA(t),s=bg(e),r=XA(n,s);if(__VUE_I18N_LEGACY_API__&&t.mode==="legacy"&&!n.__useComponent){if(!t.allowComposition)throw Rt(St.NOT_AVAILABLE_IN_LEGACY_MODE);return QA(e,r,i,n)}if(r==="global")return Mg(i,n,s),i;if(r==="parent"){let l=qA(t,e,n.__useComponent);return l==null&&(l=i),l}const a=t;let o=a.__getInstance(e);if(o==null){const l=Dt({},n);"__i18n"in s&&(l.__i18n=s.__i18n),i&&(l.__root=i),o=Lu(l),a.__composerExtend&&(o[Oc]=a.__composerExtend(o)),KA(a,e,o),a.__setInstance(e,o)}return o}function GA(n,e,t){const i=Xg();{const s=__VUE_I18N_LEGACY_API__&&e?i.run(()=>Fc(n)):i.run(()=>Lu(n));if(s==null)throw Rt(St.UNEXPECTED_ERROR);return[i,s]}}function jA(n){{const e=Hn(n.isCE?HA:n.appContext.app.__VUE_I18N_SYMBOL__);if(!e)throw Rt(n.isCE?St.NOT_INSTALLED_WITH_PROVIDE:St.UNEXPECTED_ERROR);return e}}function XA(n,e){return jo(n)?"__i18n"in e?"local":"global":n.useScope?n.useScope:"local"}function YA(n){return n.mode==="composition"?n.global:n.global.__composer}function qA(n,e,t=!1){let i=null;const s=e.root;let r=$A(e,t);for(;r!=null;){const a=n;if(n.mode==="composition")i=a.__getInstance(r);else if(__VUE_I18N_LEGACY_API__){const o=a.__getInstance(r);o!=null&&(i=o.__composer,t&&i&&!i[yg]&&(i=null))}if(i!=null||s===r)break;r=r.parent}return i}function $A(n,e=!1){return n==null?null:e&&n.vnode.ctx||n.parent}function KA(n,e,t){fr(()=>{},e),ko(()=>{const i=t;n.__deleteInstance(e);const s=i[Oc];s&&(s(),delete i[Oc])},e)}function QA(n,e,t,i={}){const s=e==="local",r=qc(null);if(s&&n.proxy&&!(n.proxy.$options.i18n||n.proxy.$options.__i18n))throw Rt(St.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);const a=We(i.inheritLocale)?i.inheritLocale:!be(i.locale),o=Ri(!s||a?t.locale.value:be(i.locale)?i.locale:lr),l=Ri(!s||a?t.fallbackLocale.value:be(i.fallbackLocale)||ct(i.fallbackLocale)||Oe(i.fallbackLocale)||i.fallbackLocale===!1?i.fallbackLocale:o.value),c=Ri(Yo(o.value,i)),u=Ri(Oe(i.datetimeFormats)?i.datetimeFormats:{[o.value]:{}}),h=Ri(Oe(i.numberFormats)?i.numberFormats:{[o.value]:{}}),f=s?t.missingWarn:We(i.missingWarn)||Fi(i.missingWarn)?i.missingWarn:!0,p=s?t.fallbackWarn:We(i.fallbackWarn)||Fi(i.fallbackWarn)?i.fallbackWarn:!0,v=s?t.fallbackRoot:We(i.fallbackRoot)?i.fallbackRoot:!0,m=!!i.fallbackFormat,d=lt(i.missing)?i.missing:null,g=lt(i.postTranslation)?i.postTranslation:null,b=s?t.warnHtmlMessage:We(i.warnHtmlMessage)?i.warnHtmlMessage:!0,S=!!i.escapeParameter,y=s?t.modifiers:Oe(i.modifiers)?i.modifiers:{},w=i.pluralRules||s&&t.pluralRules;function A(){return[o.value,l.value,c.value,u.value,h.value]}const P=_t({get:()=>r.value?r.value.locale.value:o.value,set:x=>{r.value&&(r.value.locale.value=x),o.value=x}}),M=_t({get:()=>r.value?r.value.fallbackLocale.value:l.value,set:x=>{r.value&&(r.value.fallbackLocale.value=x),l.value=x}}),I=_t(()=>r.value?r.value.messages.value:c.value),O=_t(()=>u.value),Q=_t(()=>h.value);function ue(){return r.value?r.value.getPostTranslationHandler():g}function H(x){r.value&&r.value.setPostTranslationHandler(x)}function V(){return r.value?r.value.getMissingHandler():d}function te(x){r.value&&r.value.setMissingHandler(x)}function re(x){return A(),x()}function ne(...x){return r.value?re(()=>Reflect.apply(r.value.t,null,[...x])):re(()=>"")}function G(...x){return r.value?Reflect.apply(r.value.rt,null,[...x]):""}function pe(...x){return r.value?re(()=>Reflect.apply(r.value.d,null,[...x])):re(()=>"")}function ce(...x){return r.value?re(()=>Reflect.apply(r.value.n,null,[...x])):re(()=>"")}function X(x){return r.value?r.value.tm(x):{}}function Y(x,C){return r.value?r.value.te(x,C):!1}function fe(x){return r.value?r.value.getLocaleMessage(x):{}}function me(x,C){r.value&&(r.value.setLocaleMessage(x,C),c.value[x]=C)}function xe(x,C){r.value&&r.value.mergeLocaleMessage(x,C)}function q(x){return r.value?r.value.getDateTimeFormat(x):{}}function W(x,C){r.value&&(r.value.setDateTimeFormat(x,C),u.value[x]=C)}function J(x,C){r.value&&r.value.mergeDateTimeFormat(x,C)}function ie(x){return r.value?r.value.getNumberFormat(x):{}}function ee(x,C){r.value&&(r.value.setNumberFormat(x,C),h.value[x]=C)}function Ee(x,C){r.value&&r.value.mergeNumberFormat(x,C)}const Me={get id(){return r.value?r.value.id:-1},locale:P,fallbackLocale:M,messages:I,datetimeFormats:O,numberFormats:Q,get inheritLocale(){return r.value?r.value.inheritLocale:a},set inheritLocale(x){r.value&&(r.value.inheritLocale=x)},get availableLocales(){return r.value?r.value.availableLocales:Object.keys(c.value)},get modifiers(){return r.value?r.value.modifiers:y},get pluralRules(){return r.value?r.value.pluralRules:w},get isGlobal(){return r.value?r.value.isGlobal:!1},get missingWarn(){return r.value?r.value.missingWarn:f},set missingWarn(x){r.value&&(r.value.missingWarn=x)},get fallbackWarn(){return r.value?r.value.fallbackWarn:p},set fallbackWarn(x){r.value&&(r.value.missingWarn=x)},get fallbackRoot(){return r.value?r.value.fallbackRoot:v},set fallbackRoot(x){r.value&&(r.value.fallbackRoot=x)},get fallbackFormat(){return r.value?r.value.fallbackFormat:m},set fallbackFormat(x){r.value&&(r.value.fallbackFormat=x)},get warnHtmlMessage(){return r.value?r.value.warnHtmlMessage:b},set warnHtmlMessage(x){r.value&&(r.value.warnHtmlMessage=x)},get escapeParameter(){return r.value?r.value.escapeParameter:S},set escapeParameter(x){r.value&&(r.value.escapeParameter=x)},t:ne,getPostTranslationHandler:ue,setPostTranslationHandler:H,getMissingHandler:V,setMissingHandler:te,rt:G,d:pe,n:ce,tm:X,te:Y,getLocaleMessage:fe,setLocaleMessage:me,mergeLocaleMessage:xe,getDateTimeFormat:q,setDateTimeFormat:W,mergeDateTimeFormat:J,getNumberFormat:ie,setNumberFormat:ee,mergeNumberFormat:Ee};function _(x){x.locale.value=o.value,x.fallbackLocale.value=l.value,Object.keys(c.value).forEach(C=>{x.mergeLocaleMessage(C,c.value[C])}),Object.keys(u.value).forEach(C=>{x.mergeDateTimeFormat(C,u.value[C])}),Object.keys(h.value).forEach(C=>{x.mergeNumberFormat(C,h.value[C])}),x.escapeParameter=S,x.fallbackFormat=m,x.fallbackRoot=v,x.fallbackWarn=p,x.missingWarn=f,x.warnHtmlMessage=b}return kp(()=>{if(n.proxy==null||n.proxy.$i18n==null)throw Rt(St.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const x=r.value=n.proxy.$i18n.__composer;e==="global"?(o.value=x.locale.value,l.value=x.fallbackLocale.value,c.value=x.messages.value,u.value=x.datetimeFormats.value,h.value=x.numberFormats.value):s&&_(x)}),Me}const JA=["locale","fallbackLocale","availableLocales"],Jd=["t","rt","d","n","tm","te"];function ZA(n,e){const t=Object.create(null);return JA.forEach(s=>{const r=Object.getOwnPropertyDescriptor(e,s);if(!r)throw Rt(St.UNEXPECTED_ERROR);const a=$t(r.value)?{get(){return r.value.value},set(o){r.value.value=o}}:{get(){return r.get&&r.get()}};Object.defineProperty(t,s,a)}),n.config.globalProperties.$i18n=t,Jd.forEach(s=>{const r=Object.getOwnPropertyDescriptor(e,s);if(!r||!r.value)throw Rt(St.UNEXPECTED_ERROR);Object.defineProperty(n.config.globalProperties,`$${s}`,r)}),()=>{delete n.config.globalProperties.$i18n,Jd.forEach(s=>{delete n.config.globalProperties[`$${s}`]})}}LA();__INTLIFY_JIT_COMPILATION__?Id(SA):Id(MA);mA(KT);gA(rg);if(__INTLIFY_PROD_DEVTOOLS__){const n=si();n.__INTLIFY__=!0,rA(n.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}const eC={style:{padding:"0",margin:"0"}},tC={__name:"LanguageSwitch",props:{fontSize:String},setup(n){const e=qo(),t=Ri(e.locale.value);function i(r){e.locale.value=r,t.value=r}return console.log(n.fontSize),(r,a)=>(Wn(),ci("div",eC,[we("button",{class:Yr([{"is-active":t.value==="zh-CN"},"lang-button"]),style:Xr({fontSize:n.fontSize||"inherit"}),onClick:a[0]||(a[0]=o=>i("zh-CN"))},"中文",6),Ln(" | "),we("button",{class:Yr([{"is-active":t.value==="en-US"},"lang-button"]),style:Xr({fontSize:n.fontSize||"inherit"}),onClick:a[1]||(a[1]=o=>i("en-US"))},"ENGLISH",6)]))}},Eg=ki(tC,[["__scopeId","data-v-d19d484b"]]),vs=n=>(fa("data-v-4731aace"),n=n(),da(),n),nC=vs(()=>we("div",{id:"background"},null,-1)),iC={id:"f-center"},sC=vs(()=>we("h1",{id:"h-title"},"PANNIC",-1)),rC={class:"m-text",style:{"padding-left":"1vw"}},aC=vs(()=>we("br",null,null,-1)),oC=vs(()=>we("br",null,null,-1)),lC=vs(()=>we("br",null,null,-1)),cC=vs(()=>we("a",{href:"https://kaiwuart.cn/"},"kaiwuart.cn",-1)),uC=$p('<p id="m-intro" data-v-4731aace> As a creative programmer, Innovative developer and project manager, successfully launching a mobile online trading app. From my academic background in creative programming, I have been specialised in integrating neural networks with game engines, demonstrating a strong commitment to the game industry. </p><div class="f-social-v" data-v-4731aace><a href="mailto:pannic1984@outlook.com" data-v-4731aace><img class="p-social" src="'+um+'" alt="Email" data-v-4731aace></a><a href="https://github.com/Pannic17" data-v-4731aace><img class="p-social" src="'+hm+'" alt="Github" data-v-4731aace></a><a href="https://www.instagram.com/pannic17/" data-v-4731aace><img class="p-social" src="'+fm+'" alt="Instagram" data-v-4731aace></a></div>',2),hC={class:"f-button"},fC=$p('<div class="f-social-c" data-v-4731aace><a href="mailto:pannic1984@outlook.com" data-v-4731aace><img class="p-social" src="'+um+'" alt="Email" data-v-4731aace></a><a href="https://github.com/Pannic17" data-v-4731aace><img class="p-social" src="'+hm+'" alt="Github" data-v-4731aace></a><a href="https://www.instagram.com/pannic17/" data-v-4731aace><img class="p-social" src="'+fm+'" alt="Instagram" data-v-4731aace></a></div>',1),dC=vs(()=>we("div",{id:"three-canvas"},null,-1)),pC={__name:"Home",setup(n){function e(){jr.push("/about")}function t(){jr.push("/works")}function i(){jr.push("/projects")}return fr(()=>{iT(),window.onresize=function(){location.reload()}}),ko(()=>{sT()}),(s,r)=>(Wn(),ci(kt,null,[nC,we("div",iC,[sC,we("div",rC,[we("p",null,[Ln(on(s.$t("home.name")),1),aC,Ln(" "+on(s.$t("home.master")),1),oC,Ln(" "+on(s.$t("home.bachelor")),1),lC,Ln(" Co-founder and Developer of "),cC]),Ze(Eg),uC,we("div",hC,[we("button",{class:"sub-button",onClick:e},on(s.$t("menu.about")),1),we("button",{class:"sub-button",onClick:t},on(s.$t("menu.works")),1),we("button",{class:"sub-button",onClick:i},on(s.$t("menu.projects")),1)]),fC])]),dC],64))}},mC=ki(pC,[["__scopeId","data-v-4731aace"]]),gC={class:"h-right"},_C={__name:"SubRight",props:{fontSize:{type:String,default:"calc(var(--vsr) * 2)"}},setup(n){function e(){jr.back()}return(t,i)=>(Wn(),ci("div",gC,[Ze(Eg,{fontSize:"calc(var(--vsr) * 2)"}),we("button",{id:"b-back",onClick:e},on(t.$t("menu.back")),1)]))}},Iu=ki(_C,[["__scopeId","data-v-05da8408"]]),Sa=n=>(fa("data-v-548f605c"),n=n(),da(),n),vC=Sa(()=>we("div",{id:"background"},null,-1)),xC={class:"f-center"},yC={id:"f-top"},bC={class:"h-sub"},MC=Sa(()=>we("div",{class:"h-left"},[we("h2",null,"ABOUT"),we("div",{class:"subtitle"},[we("span",null,"关于"),we("span",{class:"t-cyan"}," PANNIC")])],-1)),SC=Sa(()=>we("div",{style:{height:"1px","background-color":"var(--context-color)","margin-block":"1vh"}},null,-1)),wC=Sa(()=>we("div",{id:"block",style:{"background-color":"var(--background-color)",width:"90vw"}},null,-1)),EC=Sa(()=>we("h1",null,[Ln("UNDER"),we("br"),Ln("CONSTRUCTION")],-1)),TC={__name:"About",setup(n){return fr(()=>{const e=document.getElementById("f-top").clientHeight,t=document.getElementById("block");t.style.height=`${e}px`}),(e,t)=>(Wn(),ci(kt,null,[vC,we("div",xC,[we("div",yC,[we("div",bC,[MC,Ze(Iu)]),SC]),wC]),EC],64))}},AC=ki(TC,[["__scopeId","data-v-548f605c"]]),CC=n=>(fa("data-v-d7d7c675"),n=n(),da(),n),LC={class:"section"},RC=["src"],IC={class:"s-text s-overlay"},PC={class:"s-subtitles"},DC=CC(()=>we("span",{style:{color:"var(--hover-color)"}}," | ",-1)),NC={class:"s-category"},OC={style:{"text-align":"right","align-items":"end",display:"flex","justify-content":"flex-end","flex-direction":"column"}},FC={class:"s-intro"},kC={class:"s-title"},UC={__name:"MenuSection",props:{cover:String,title:String,intro:String,category:String,tags:Array},setup(n){return(e,t)=>(Wn(),ci("div",LC,[we("img",{src:n.cover,class:"s-cover s-overlay"},null,8,RC),we("div",IC,[we("div",PC,[(Wn(!0),ci(kt,null,X_(n.tags,(i,s)=>(Wn(),ci("div",{key:s,class:"s-tags"},[Ln(on(i),1),DC]))),128)),we("h4",NC,on(n.category),1)]),we("div",OC,[we("div",FC,[we("span",null,on(n.intro),1)]),we("h3",kC,on(n.title),1)])])]))}},pn=ki(UC,[["__scopeId","data-v-d7d7c675"]]),wa=n=>(fa("data-v-a296e1f2"),n=n(),da(),n),BC=wa(()=>we("div",{id:"background"},null,-1)),VC={class:"f-center"},zC={id:"f-top"},HC={class:"h-sub"},WC=wa(()=>we("div",{class:"h-left"},[we("h2",null,"WORKS"),we("div",{class:"subtitle"},[we("span",null,"Artworks by"),we("span",{class:"t-cyan"}," PANNIC "),we("span",null,"作品")])],-1)),GC=wa(()=>we("div",{style:{height:"1px","background-color":"var(--context-color)","margin-block":"1vh"}},null,-1)),jC=wa(()=>we("div",{id:"block",style:{"background-color":"var(--background-color)",width:"90vw"}},null,-1)),XC=wa(()=>we("h1",null,[Ln("UNDER"),we("br"),Ln("CONSTRUCTION")],-1)),YC={__name:"Works",setup(n){return fr(()=>{const e=document.getElementById("f-top").clientHeight,t=document.getElementById("block");t.style.height=`${e}px`}),(e,t)=>(Wn(),ci(kt,null,[Ze(Jp),BC,we("div",VC,[we("div",zC,[we("div",HC,[WC,Ze(Iu)]),GC]),jC,Ze(pn,{cover:"./image/CAT-Cover.png",title:"CatNet",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"XR游戏",tags:["Unity","AR","ResNet","OpenCV"]}),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"Chronoscape",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"XR交互",tags:["Unreal 5","XR","OpenCV","YOLO","装置"]}),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"O Galaxy",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"AI游戏",tags:["Unreal 5","Stable Diffusion","OpenCV","Django"]}),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"PokemonPad",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"Web游戏",tags:["Three.js","Vue.js","WebGL"]},null,8,["tags"]),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"Anybody Problem",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"XR游戏",tags:["Unreal 4","XR","OpenCV","YOLO","装置"]}),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"Ai, Art & hAsh",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"AI艺术实验",tags:["Python","Stable Diffusion","OpenCV"]}),Ze(pn,{cover:"./image/ZAR-Cover.png",title:"AI Shijing Paintings",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"AI艺术实验",tags:["Python","Stable Diffusion","ChatGPT","LoRA"]})]),XC],64))}},qC=ki(YC,[["__scopeId","data-v-a296e1f2"]]),br=n=>(fa("data-v-f8887974"),n=n(),da(),n),$C=br(()=>we("div",{id:"background"},null,-1)),KC={class:"f-center"},QC={id:"f-top"},JC={class:"h-sub"},ZC={class:"h-left"},eL=br(()=>we("h2",null,"PROJECTS",-1)),tL={class:"subtitle"},nL=br(()=>we("span",{class:"t-cyan"}," PANNIC ",-1)),iL=br(()=>we("div",{style:{height:"1px","background-color":"var(--context-color)","margin-block":"1vh"}},null,-1)),sL=br(()=>we("div",{id:"block",style:{"background-color":"var(--background-color)",width:"90vw"}},null,-1)),rL=br(()=>we("div",{style:{"background-color":"var(--background-color)",width:"90vw",height:"2vh"}},null,-1)),aL={__name:"Projects",setup(n){return fr(()=>{const e=document.getElementById("f-top").clientHeight,t=document.getElementById("block");t.style.height=`${e}px`}),(e,t)=>(Wn(),ci(kt,null,[$C,we("div",KC,[we("div",QC,[we("div",JC,[we("div",ZC,[eL,we("div",tL,[we("span",null,on(e.$t("projects.sub1")),1),nL,we("span",null,on(e.$t("projects.sub2")),1)])]),Ze(Iu)]),iL]),sL,Ze(pn,{cover:"./image/ZAR-Cover.png",title:"状元街区 · 微缩状元府",intro:`状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。\r
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。\r
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。`,category:"AR小程序",tags:["AR","微信小程序"]}),Ze(pn,{cover:"./image/BLA-Cover.png",title:"比恋AI",intro:`比恋AI是一款面向中国AI用户的聊天APP，接入了ChatGPT以及文言一心接口，提供可以在中国大陆访问的AI入口。\r
            我负责该应用的移动端前端开发，前端基于Flutter框架，实现了iOS和Android端跨平台同步开发，使用响应式布局，同时使用了微信分享等相关接口。`,category:"AI聊天应用",tags:["Flutter","AI"]}),Ze(pn,{cover:"./image/Split!.png",title:"SPLIT!",intro:"",category:"工具",tags:["Django","React"]}),Ze(pn,{cover:"./image/CourseWork.png",title:"CCI课程作业",intro:`这里展示了我在UAL CCI硕士一年期间所有的Coding作业。\r
            包括Coding 1中的JavaScript相关，\r
            Coding 2中OpenFramework以及Python相关，\r
            Coding 3中与神经网络相关的作业。`,category:"课程作业",tags:["JavaScripts","OpenFramework","Python"]}),Ze(pn,{cover:"./image/Construction.png",title:"AI Tester",intro:"",category:"仍在开发",tags:["GPTs","AI"]})]),rL],64))}},oL=ki(aL,[["__scopeId","data-v-f8887974"]]),lL=[{path:"/",name:"Home",component:mC},{path:"/about",name:"About",component:AC},{path:"/works",name:"Works",component:qC},{path:"/projects",name:"Projects",component:oL}],jr=ex({history:g0("/Vite-Homepage-24/"),routes:lL}),cL={home:{name:"Jiangyun Pan",master:"MSc Creative Computing - UAL CCI",bachelor:"BSc Biology & Immunology - University of Toronto"},menu:{about:"ABOUT",works:"WORKS",projects:"PROJECTS",back:"BACK"},projects:{sub1:"Projects",sub2:"Developed/Participated"},about:{about:"About PanNic",para:"This is Jiangyun Pan, 'PanNic', 2021 graduate from University of Toronto (St. George), major in Human Biology and Immunology."},contact:{email:"Email:"},game:{demo:"Demo",concept:"Concept",cat:{title:"CatNet",intro1:"Explore the use of Neural Network in AR games.",intro2:"Cat character construction with characteristics from augmented reality using artificial intelligence on Unity.",detail:"Detect cat, classify its color and pattern, and then generate a cat chibi model with similar characteristics or reconstruct 3D cat model in Unity to realized a lightweight fast AR program demo using neural network and computer vision algorithms. The detection is based on built in Haar Cascade by OpenCV, which will be replaced by self-trained YOLO v2 to utilize detection accuracy. The classification of cats' pattern make use of Unity Barracuda packages and a self-trained MobileNet v2 neural network model with accuracy over 80%. K-Means algorithm is used to cluster cat's color into 3 classes for cats' model generation. Current demo can detect 7 classes of cats: solid, bicolor, tabby, colorpoint, orange, calico and mixed pattern of both tabby and bicolor. Further support may includes irregular pattern and hair classification.",download:"Download",windows:"Windows version: ",android:"Android Version: "},meta:{title:"Kaiwu & MetaHouse",intro:"Trade and display platform for NFT artworks, a home in metaverse based on cloud game",para0:"Buy and trade your NFT crypto artworks like digital sculpture, garage kit, cg graphics or interactive artworks on",site:"kaiwuart.io",para1:"And build your own house in metaverse. Display and interact with your own virtual artworks in virtual home ‘MetaHouse’ and raise your virtual pet"}},project:{web:"Website",wx:"WX Miniprogram",nn:"Neural Network",cp:"Creative Programming",ot:"Other Projects"},artwork:{mg:"MG Animation","3d":"3D Artworks",pp:"Post-Production",cc:"Commercial Projects"}},uL={home:{name:"潘江昀",master:"伦敦艺术大学 - 创意计算机硕士",bachelor:"多伦多大学 - 生物学和免疫学学士"},menu:{about:"关于",works:"作品",projects:"项目",back:"返回"},projects:{sub1:"",sub2:"开发/参与的项目"},about:{about:"关于PanNic",para:"PanNic，2021年毕业于多伦多大学的人类生物学和免疫学"},game:{demo:"项目Demo",concept:"项目概念",cat:{title:"CatNet猫猫网络",intro1:"探索神经网络在增强现实类游戏中的应用",intro2:"在Unity中利用神经网络的对猫识别结果建立一个有相似特征的游戏角色",detail:"在Unity中利用OpenCV检测猫猫和猫猫颜色，利用神经网络识别猫猫花纹，生成一只有相似颜色和花纹的3D猫猫模型。实现一个基于神经网络的轻量级AR项目的Demo。检测猫脸模型是OpenCV自带的Haar Cascade，未来会用YOLO v2代替，识别猫花纹的模型是基于MobileNet v2自己训练的，颜色检测是K-Means聚类。目前能识别7大类：纯色，双色，虎纹，重点色，虎纹白化(混合色)，橘猫，三花猫。以后打算进一步细化加上长毛/短毛，不规律混合之类的。",download:"下载",windows:"电脑版：",android:"安卓版："},meta:{title:"开物MetaHouse",intro:"NFT艺术品交易与展示平台：一个基于云游戏的元宇宙之家",para0:"在",site:"开物",para1:"平台上购买数字艺术品例如雕像、手办、3D插画与互动艺术，在Metahouse元宇宙中建设你自己的家，展示你的虚拟艺术品并与之互动"}},project:{web:"网站",wx:"微信小程序",nn:"神经网络",cp:"创意编程",ot:"其他"},artwork:{mg:"MG动画","3d":"3D建模",pp:"后期剪辑",cc:"商业项目"}},hL={"en-US":cL,"zh-CN":uL},fL="en-US";let Tg=fL;navigator.language.toLowerCase().includes("zh")&&(Tg="zh-CN");const dL=WA({legacy:!1,locale:localStorage.getItem("locale")||Tg,messages:hL}),Pu=$v(Jp);Pu.use(jr);Pu.use(dL);Pu.mount("#app");function Ag(){const n=window.innerHeight*.01,e=window.innerWidth*.01,t=Math.min(n,e);document.documentElement.style.setProperty("--vsr",`${t}px`)}Ag();window.addEventListener("resize",Ag);
