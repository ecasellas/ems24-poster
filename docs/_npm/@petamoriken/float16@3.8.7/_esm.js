/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/@petamoriken/float16@3.8.7/src/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const t="This constructor is not a subclass of Float16Array",n="The constructor property value is not an object",r="Attempting to access detached ArrayBuffer",e="Cannot convert undefined or null to object",o="Cannot mix BigInt and other types, use explicit conversions",i="@@iterator property is not callable",s="Reduce of empty array with no initial value",u="Offset is out of bounds";function c(t){return(n,...r)=>h(t,n,r)}function f(t,n){return c(y(t,n).get)}const{apply:h,construct:l,defineProperty:a,get:w,getOwnPropertyDescriptor:y,getPrototypeOf:p,has:d,ownKeys:g,set:v,setPrototypeOf:b}=Reflect,A=Proxy,{EPSILON:_,MAX_SAFE_INTEGER:x,isFinite:E,isNaN:T}=Number,{iterator:m,species:O,toStringTag:S,for:P}=Symbol,j=Object,{create:B,defineProperty:L,freeze:R,is:F}=j,I=j.prototype,N=I.__lookupGetter__?c(I.__lookupGetter__):(t,n)=>{if(null==t)throw Bt(e);let r=j(t);do{const t=y(r,n);if(void 0!==t)return U(t,"get")?t.get:void 0}while(null!==(r=p(r)))},U=j.hasOwn||c(I.hasOwnProperty),k=Array,M=k.isArray,D=k.prototype,W=c(D.join),G=c(D.push),C=c(D.toLocaleString),V=D[m],Y=c(V),{abs:z,trunc:K}=Math,X=ArrayBuffer,q=X.isView,H=X.prototype,J=c(H.slice),Q=f(H,"byteLength"),Z="undefined"!=typeof SharedArrayBuffer?SharedArrayBuffer:null,$=Z&&f(Z.prototype,"byteLength"),tt=p(Uint8Array),nt=tt.from,rt=tt.prototype,et=rt[m],ot=c(rt.keys),it=c(rt.values),st=c(rt.entries),ut=c(rt.set),ct=c(rt.reverse),ft=c(rt.fill),ht=c(rt.copyWithin),lt=c(rt.sort),at=c(rt.slice),wt=c(rt.subarray),yt=f(rt,"buffer"),pt=f(rt,"byteOffset"),dt=f(rt,"length"),gt=f(rt,S),vt=Uint8Array,bt=Uint16Array,At=(...t)=>h(nt,bt,t),_t=Uint32Array,xt=Float32Array,Et=p([][m]()),Tt=c(Et.next),mt=c(function*(){}().next),Ot=p(Et),St=DataView.prototype,Pt=c(St.getUint16),jt=c(St.setUint16),Bt=TypeError,Lt=RangeError,Rt=WeakSet,Ft=Rt.prototype,It=c(Ft.add),Nt=c(Ft.has),Ut=WeakMap,kt=Ut.prototype,Mt=c(kt.get),Dt=c(kt.has),Wt=c(kt.set),Gt=new Ut,Ct=B(null,{next:{value:function(){const t=Mt(Gt,this);return Tt(t)}},[m]:{value:function(){return this}}});function Vt(t){if(t[m]===V&&Et.next===Tt)return t;const n=B(Ct);return Wt(Gt,n,Y(t)),n}const Yt=new Ut,zt=B(Ot,{next:{value:function(){const t=Mt(Yt,this);return mt(t)},writable:!0,configurable:!0}});for(const t of g(Et))"next"!==t&&L(zt,t,y(Et,t));function Kt(t){const n=B(zt);return Wt(Yt,n,t),n}function Xt(t){return null!==t&&"object"==typeof t||"function"==typeof t}function qt(t){return null!==t&&"object"==typeof t}function Ht(t){return void 0!==gt(t)}function Jt(t){const n=gt(t);return"BigInt64Array"===n||"BigUint64Array"===n}function Qt(t){if(null===Z)return!1;try{return $(t),!0}catch(t){return!1}}function Zt(t){return function(t){try{return!M(t)&&(Q(t),!0)}catch(t){return!1}}(t)||Qt(t)}function $t(t){return!!M(t)&&(t[m]===V&&Et.next===Tt)}function tn(t){if("string"!=typeof t)return!1;const n=+t;return t===n+""&&(!!E(n)&&n===K(n))}const nn=P("__Float16Array__");const rn=1/_;const en=6103515625e-14,on=65504,sn=.0009765625,un=sn*en,cn=sn*rn;function fn(t){const n=+t;if(!E(n)||0===n)return n;const r=n>0?1:-1,e=z(n);if(e<en)return r*function(t){return t+rn-rn}(e/un)*un;const o=(1+cn)*e,i=o-(o-e);return i>on||T(i)?r*(1/0):r*i}const hn=new X(4),ln=new xt(hn),an=new _t(hn),wn=new bt(512),yn=new vt(512);for(let t=0;t<256;++t){const n=t-127;n<-24?(wn[t]=0,wn[256|t]=32768,yn[t]=24,yn[256|t]=24):n<-14?(wn[t]=1024>>-n-14,wn[256|t]=1024>>-n-14|32768,yn[t]=-n-1,yn[256|t]=-n-1):n<=15?(wn[t]=n+15<<10,wn[256|t]=n+15<<10|32768,yn[t]=13,yn[256|t]=13):n<128?(wn[t]=31744,wn[256|t]=64512,yn[t]=24,yn[256|t]=24):(wn[t]=31744,wn[256|t]=64512,yn[t]=13,yn[256|t]=13)}function pn(t){ln[0]=fn(t);const n=an[0],r=n>>23&511;return wn[r]+((8388607&n)>>yn[r])}const dn=new _t(2048);for(let t=1;t<1024;++t){let n=t<<13,r=0;for(;0==(8388608&n);)n<<=1,r-=8388608;n&=-8388609,r+=947912704,dn[t]=n|r}for(let t=1024;t<2048;++t)dn[t]=939524096+(t-1024<<13);const gn=new _t(64);for(let t=1;t<31;++t)gn[t]=t<<23;gn[31]=1199570944,gn[32]=2147483648;for(let t=33;t<63;++t)gn[t]=2147483648+(t-32<<23);gn[63]=3347054592;const vn=new bt(64);for(let t=1;t<64;++t)32!==t&&(vn[t]=1024);function bn(t){const n=t>>10;return an[0]=dn[vn[n]+(1023&t)]+gn[n],ln[0]}function An(t){const n=+t;return T(n)||0===n?0:K(n)}function _n(t){const n=An(t);return n<0?0:n<x?n:x}function xn(t,r){if(!Xt(t))throw Bt("This is not an object");const e=t.constructor;if(void 0===e)return r;if(!Xt(e))throw Bt(n);const o=e[O];return null==o?r:o}function En(t){if(Qt(t))return!1;try{return J(t,0,0),!1}catch(t){}return!0}function Tn(t,n){const r=T(t),e=T(n);if(r&&e)return 0;if(r)return 1;if(e)return-1;if(t<n)return-1;if(t>n)return 1;if(0===t&&0===n){const r=F(t,0),e=F(n,0);if(!r&&e)return-1;if(r&&!e)return 1}return 0}const mn=new Ut;function On(t){return Dt(mn,t)||!q(t)&&function(t){if(!qt(t))return!1;const r=p(t);if(!qt(r))return!1;const e=r.constructor;if(void 0===e)return!1;if(!Xt(e))throw Bt(n);return d(e,nn)}(t)}function Sn(t){if(!On(t))throw Bt("This is not a Float16Array object")}function Pn(t,n){const r=On(t),e=Ht(t);if(!r&&!e)throw Bt("Species constructor didn't return TypedArray object");if("number"==typeof n){let e;if(r){const n=jn(t);e=dt(n)}else e=dt(t);if(e<n)throw Bt("Derived constructor created TypedArray object which was too small length")}if(Jt(t))throw Bt(o)}function jn(t){const n=Mt(mn,t);if(void 0!==n){if(En(yt(n)))throw Bt(r);return n}const e=t.buffer;if(En(e))throw Bt(r);const o=l(Fn,[e,t.byteOffset,t.length],t.constructor);return Mt(mn,o)}function Bn(t){const n=dt(t),r=[];for(let e=0;e<n;++e)r[e]=bn(t[e]);return r}const Ln=new Rt;for(const t of g(rt)){if(t===S)continue;const n=y(rt,t);U(n,"get")&&"function"==typeof n.get&&It(Ln,n.get)}const Rn=R({get:(t,n,r)=>tn(n)&&U(t,n)?bn(w(t,n)):Nt(Ln,N(t,n))?w(t,n):w(t,n,r),set:(t,n,r,e)=>tn(n)&&U(t,n)?v(t,n,pn(r)):v(t,n,r,e),getOwnPropertyDescriptor(t,n){if(tn(n)&&U(t,n)){const r=y(t,n);return r.value=bn(r.value),r}return y(t,n)},defineProperty:(t,n,r)=>tn(n)&&U(t,n)&&U(r,"value")?(r.value=pn(r.value),a(t,n,r)):a(t,n,r)});class Fn{constructor(t,n,e){let s;if(On(t))s=l(bt,[jn(t)],new.target);else if(Xt(t)&&!Zt(t)){let n,e;if(Ht(t)){n=t,e=dt(t);if(En(yt(t)))throw Bt(r);if(Jt(t))throw Bt(o);const i=new X(2*e);s=l(bt,[i],new.target)}else{const r=t[m];if(null!=r&&"function"!=typeof r)throw Bt(i);null!=r?$t(t)?(n=t,e=t.length):(n=[...t],e=n.length):(n=t,e=_n(n.length)),s=l(bt,[e],new.target)}for(let t=0;t<e;++t)s[t]=pn(n[t])}else s=l(bt,arguments,new.target);const u=new A(s,Rn);return Wt(mn,u,s),u}static from(n,...r){const o=this;if(!d(o,nn))throw Bt(t);if(o===Fn){if(On(n)&&0===r.length){const t=jn(n),r=new bt(yt(t),pt(t),dt(t));return new Fn(yt(at(r)))}if(0===r.length)return new Fn(yt(At(n,pn)));const t=r[0],e=r[1];return new Fn(yt(At(n,(function(n,...r){return pn(h(t,this,[n,...Vt(r)]))}),e)))}let s,u;const c=n[m];if(null!=c&&"function"!=typeof c)throw Bt(i);if(null!=c)$t(n)?(s=n,u=n.length):Ht(f=n)&&f[m]===et&&Et.next===Tt?(s=n,u=dt(n)):(s=[...n],u=s.length);else{if(null==n)throw Bt(e);s=j(n),u=_n(s.length)}var f;const l=new o(u);if(0===r.length)for(let t=0;t<u;++t)l[t]=s[t];else{const t=r[0],n=r[1];for(let r=0;r<u;++r)l[r]=h(t,n,[s[r],r])}return l}static of(...n){const r=this;if(!d(r,nn))throw Bt(t);const e=n.length;if(r===Fn){const t=new Fn(e),r=jn(t);for(let t=0;t<e;++t)r[t]=pn(n[t]);return t}const o=new r(e);for(let t=0;t<e;++t)o[t]=n[t];return o}keys(){Sn(this);const t=jn(this);return ot(t)}values(){Sn(this);const t=jn(this);return Kt(function*(){for(const n of it(t))yield bn(n)}())}entries(){Sn(this);const t=jn(this);return Kt(function*(){for(const[n,r]of st(t))yield[n,bn(r)]}())}at(t){Sn(this);const n=jn(this),r=dt(n),e=An(t),o=e>=0?e:r+e;if(!(o<0||o>=r))return bn(n[o])}with(t,n){Sn(this);const r=jn(this),e=dt(r),o=An(t),i=o>=0?o:e+o,s=+n;if(i<0||i>=e)throw Lt(u);const c=new bt(yt(r),pt(r),dt(r)),f=new Fn(yt(at(c)));return jn(f)[i]=pn(s),f}map(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0],i=xn(r,Fn);if(i===Fn){const n=new Fn(e),i=jn(n);for(let n=0;n<e;++n){const e=bn(r[n]);i[n]=pn(h(t,o,[e,n,this]))}return n}const s=new i(e);Pn(s,e);for(let n=0;n<e;++n){const e=bn(r[n]);s[n]=h(t,o,[e,n,this])}return s}filter(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0],i=[];for(let n=0;n<e;++n){const e=bn(r[n]);h(t,o,[e,n,this])&&G(i,e)}const s=new(xn(r,Fn))(i);return Pn(s),s}reduce(t,...n){Sn(this);const r=jn(this),e=dt(r);if(0===e&&0===n.length)throw Bt(s);let o,i;0===n.length?(o=bn(r[0]),i=1):(o=n[0],i=0);for(let n=i;n<e;++n)o=t(o,bn(r[n]),n,this);return o}reduceRight(t,...n){Sn(this);const r=jn(this),e=dt(r);if(0===e&&0===n.length)throw Bt(s);let o,i;0===n.length?(o=bn(r[e-1]),i=e-2):(o=n[0],i=e-1);for(let n=i;n>=0;--n)o=t(o,bn(r[n]),n,this);return o}forEach(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=0;n<e;++n)h(t,o,[bn(r[n]),n,this])}find(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=0;n<e;++n){const e=bn(r[n]);if(h(t,o,[e,n,this]))return e}}findIndex(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=0;n<e;++n){const e=bn(r[n]);if(h(t,o,[e,n,this]))return n}return-1}findLast(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=e-1;n>=0;--n){const e=bn(r[n]);if(h(t,o,[e,n,this]))return e}}findLastIndex(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=e-1;n>=0;--n){const e=bn(r[n]);if(h(t,o,[e,n,this]))return n}return-1}every(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=0;n<e;++n)if(!h(t,o,[bn(r[n]),n,this]))return!1;return!0}some(t,...n){Sn(this);const r=jn(this),e=dt(r),o=n[0];for(let n=0;n<e;++n)if(h(t,o,[bn(r[n]),n,this]))return!0;return!1}set(t,...n){Sn(this);const i=jn(this),s=An(n[0]);if(s<0)throw Lt(u);if(null==t)throw Bt(e);if(Jt(t))throw Bt(o);if(On(t))return ut(jn(this),jn(t),s);if(Ht(t)){if(En(yt(t)))throw Bt(r)}const c=dt(i),f=j(t),h=_n(f.length);if(s===1/0||h+s>c)throw Lt(u);for(let t=0;t<h;++t)i[t+s]=pn(f[t])}reverse(){Sn(this);const t=jn(this);return ct(t),this}toReversed(){Sn(this);const t=jn(this),n=new bt(yt(t),pt(t),dt(t)),r=new Fn(yt(at(n))),e=jn(r);return ct(e),r}fill(t,...n){Sn(this);const r=jn(this);return ft(r,pn(t),...Vt(n)),this}copyWithin(t,n,...r){Sn(this);const e=jn(this);return ht(e,t,n,...Vt(r)),this}sort(t){Sn(this);const n=jn(this),r=void 0!==t?t:Tn;return lt(n,((t,n)=>r(bn(t),bn(n)))),this}toSorted(t){Sn(this);const n=jn(this);if(void 0!==t&&"function"!=typeof t)throw new Bt("The comparison function must be either a function or undefined");const r=void 0!==t?t:Tn,e=new bt(yt(n),pt(n),dt(n)),o=new Fn(yt(at(e))),i=jn(o);return lt(i,((t,n)=>r(bn(t),bn(n)))),o}slice(t,n){Sn(this);const e=jn(this),o=xn(e,Fn);if(o===Fn){const r=new bt(yt(e),pt(e),dt(e));return new Fn(yt(at(r,t,n)))}const i=dt(e),s=An(t),u=void 0===n?i:An(n);let c,f;c=s===-1/0?0:s<0?i+s>0?i+s:0:i<s?i:s,f=u===-1/0?0:u<0?i+u>0?i+u:0:i<u?i:u;const h=f-c>0?f-c:0,l=new o(h);if(Pn(l,h),0===h)return l;if(En(yt(e)))throw Bt(r);let a=0;for(;c<f;)l[a]=bn(e[c]),++c,++a;return l}subarray(t,n){Sn(this);const r=jn(this),e=xn(r,Fn),o=new bt(yt(r),pt(r),dt(r)),i=wt(o,t,n),s=new e(yt(i),pt(i),dt(i));return Pn(s),s}indexOf(t,...n){Sn(this);const r=jn(this),e=dt(r);let o=An(n[0]);if(o===1/0)return-1;o<0&&(o+=e,o<0&&(o=0));for(let n=o;n<e;++n)if(U(r,n)&&bn(r[n])===t)return n;return-1}lastIndexOf(t,...n){Sn(this);const r=jn(this),e=dt(r);let o=n.length>=1?An(n[0]):e-1;if(o===-1/0)return-1;o>=0?o=o<e-1?o:e-1:o+=e;for(let n=o;n>=0;--n)if(U(r,n)&&bn(r[n])===t)return n;return-1}includes(t,...n){Sn(this);const r=jn(this),e=dt(r);let o=An(n[0]);if(o===1/0)return!1;o<0&&(o+=e,o<0&&(o=0));const i=T(t);for(let n=o;n<e;++n){const e=bn(r[n]);if(i&&T(e))return!0;if(e===t)return!0}return!1}join(t){Sn(this);const n=Bn(jn(this));return W(n,t)}toLocaleString(...t){Sn(this);const n=Bn(jn(this));return C(n,...Vt(t))}get[S](){if(On(this))return"Float16Array"}}L(Fn,"BYTES_PER_ELEMENT",{value:2}),L(Fn,nn,{}),b(Fn,tt);const In=Fn.prototype;function Nn(t){return Ht(t)||On(t)}function Un(t,n,...r){return bn(Pt(t,n,...Vt(r)))}function kn(t,n,r,...e){return jt(t,n,pn(r),...Vt(e))}function Mn(t){return fn(t)}L(In,"BYTES_PER_ELEMENT",{value:2}),L(In,m,{value:In.values,writable:!0,configurable:!0}),b(In,rt);export{Fn as Float16Array,Mn as f16round,Un as getFloat16,Mn as hfround,On as isFloat16Array,Nn as isTypedArray,kn as setFloat16};export default null;