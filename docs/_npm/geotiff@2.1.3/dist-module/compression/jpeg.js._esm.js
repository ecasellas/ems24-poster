/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/geotiff@2.1.3/dist-module/compression/jpeg.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(e,n){let t=e.length-n,r=0;do{for(let t=n;t>0;t--)e[r+n]+=e[r],r++;t-=n}while(t>0)}function n(e,n,t){let r=0,s=e.length;const o=s/t;for(;s>n;){for(let t=n;t>0;--t)e[r+n]+=e[r],++r;s-=n}const a=e.slice();for(let n=0;n<o;++n)for(let r=0;r<t;++r)e[t*n+r]=a[(t-r-1)*o+n]}class t{async decode(t,r){const s=await this.decodeBlock(r),o=t.Predictor||1;if(1!==o){const r=!t.StripOffsets;return function(t,r,s,o,a,i){if(!r||1===r)return t;for(let e=0;e<a.length;++e){if(a[e]%8!=0)throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");if(a[e]!==a[0])throw new Error("When decoding with predictor, all samples must have the same size.")}const c=a[0]/8,l=2===i?1:a.length;for(let i=0;i<o&&!(i*l*s*c>=t.byteLength);++i){let o;if(2===r){switch(a[0]){case 8:o=new Uint8Array(t,i*l*s*c,l*s*c);break;case 16:o=new Uint16Array(t,i*l*s*c,l*s*c/2);break;case 32:o=new Uint32Array(t,i*l*s*c,l*s*c/4);break;default:throw new Error(`Predictor 2 not allowed with ${a[0]} bits per sample.`)}e(o,l)}else 3===r&&(o=new Uint8Array(t,i*l*s*c,l*s*c),n(o,l,c))}return t}(s,o,r?t.TileWidth:t.ImageWidth,r?t.TileLength:t.RowsPerStrip||t.ImageLength,t.BitsPerSample,t.PlanarConfiguration)}return s}}const r=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),s=4017,o=799,a=3406,i=2276,c=1567,l=3784,f=5793,h=2896;function u(e,n){let t=0;const r=[];let s=16;for(;s>0&&!e[s-1];)--s;r.push({children:[],index:0});let o,a=r[0];for(let i=0;i<s;i++){for(let s=0;s<e[i];s++){for(a=r.pop(),a.children[a.index]=n[t];a.index>0;)a=r.pop();for(a.index++,r.push(a);r.length<=i;)r.push(o={children:[],index:0}),a.children[a.index]=o.children,a=o;t++}i+1<s&&(r.push(o={children:[],index:0}),a.children[a.index]=o.children,a=o)}return r[0].children}function m(e,n,t,s,o,a,i,c,l){const{mcusPerLine:f,progressive:h}=t,u=n;let m=n,d=0,b=0;function p(){if(b>0)return b--,d>>b&1;if(d=e[m++],255===d){const n=e[m++];if(n)throw new Error(`unexpected marker: ${(d<<8|n).toString(16)}`)}return b=7,d>>>7}function w(e){let n,t=e;for(;null!==(n=p());){if(t=t[n],"number"==typeof t)return t;if("object"!=typeof t)throw new Error("invalid huffman sequence")}return null}function k(e){let n=e,t=0;for(;n>0;){const e=p();if(null===e)return;t=t<<1|e,--n}return t}function g(e){const n=k(e);return n>=1<<e-1?n:n+(-1<<e)+1}let y=0;let P,T=0;function A(e,n,t,r,s){const o=t%f,a=(t/f|0)*e.v+r,i=o*e.h+s;n(e,e.blocks[a][i])}function C(e,n,t){const r=t/e.blocksPerLine|0,s=t%e.blocksPerLine;n(e,e.blocks[r][s])}const x=s.length;let v,L,E,I,U,D;D=h?0===a?0===c?function(e,n){const t=w(e.huffmanTableDC),r=0===t?0:g(t)<<l;e.pred+=r,n[0]=e.pred}:function(e,n){n[0]|=p()<<l}:0===c?function(e,n){if(y>0)return void y--;let t=a;const s=i;for(;t<=s;){const s=w(e.huffmanTableAC),o=15&s,a=s>>4;if(0===o){if(a<15){y=k(a)+(1<<a)-1;break}t+=16}else t+=a,n[r[t]]=g(o)*(1<<l),t++}}:function(e,n){let t=a;const s=i;let o=0;for(;t<=s;){const s=r[t],a=n[s]<0?-1:1;switch(T){case 0:{const n=w(e.huffmanTableAC),t=15&n;if(o=n>>4,0===t)o<15?(y=k(o)+(1<<o),T=4):(o=16,T=1);else{if(1!==t)throw new Error("invalid ACn encoding");P=g(t),T=o?2:3}continue}case 1:case 2:n[s]?n[s]+=(p()<<l)*a:(o--,0===o&&(T=2===T?3:0));break;case 3:n[s]?n[s]+=(p()<<l)*a:(n[s]=P<<l,T=0);break;case 4:n[s]&&(n[s]+=(p()<<l)*a)}t++}4===T&&(y--,0===y&&(T=0))}:function(e,n){const t=w(e.huffmanTableDC),s=0===t?0:g(t);e.pred+=s,n[0]=e.pred;let o=1;for(;o<64;){const t=w(e.huffmanTableAC),s=15&t,a=t>>4;if(0===s){if(a<15)break;o+=16}else o+=a,n[r[o]]=g(s),o++}};let q,z,O=0;z=1===x?s[0].blocksPerLine*s[0].blocksPerColumn:f*t.mcusPerColumn;const M=o||z;for(;O<z;){for(L=0;L<x;L++)s[L].pred=0;if(y=0,1===x)for(v=s[0],U=0;U<M;U++)C(v,D,O),O++;else for(U=0;U<M;U++){for(L=0;L<x;L++){v=s[L];const{h:e,v:n}=v;for(E=0;E<n;E++)for(I=0;I<e;I++)A(v,D,O,E,I)}if(O++,O===z)break}if(b=0,q=e[m]<<8|e[m+1],q<65280)throw new Error("marker was not found");if(!(q>=65488&&q<=65495))break;m+=2}return m-u}function d(e,n){const t=[],{blocksPerLine:r,blocksPerColumn:u}=n,m=r<<3,d=new Int32Array(64),b=new Uint8Array(64);function p(e,t,r){const u=n.quantizationTable;let m,d,b,p,w,k,g,y,P;const T=r;let A;for(A=0;A<64;A++)T[A]=e[A]*u[A];for(A=0;A<8;++A){const e=8*A;0!==T[1+e]||0!==T[2+e]||0!==T[3+e]||0!==T[4+e]||0!==T[5+e]||0!==T[6+e]||0!==T[7+e]?(m=f*T[0+e]+128>>8,d=f*T[4+e]+128>>8,b=T[2+e],p=T[6+e],w=h*(T[1+e]-T[7+e])+128>>8,y=h*(T[1+e]+T[7+e])+128>>8,k=T[3+e]<<4,g=T[5+e]<<4,P=m-d+1>>1,m=m+d+1>>1,d=P,P=b*l+p*c+128>>8,b=b*c-p*l+128>>8,p=P,P=w-g+1>>1,w=w+g+1>>1,g=P,P=y+k+1>>1,k=y-k+1>>1,y=P,P=m-p+1>>1,m=m+p+1>>1,p=P,P=d-b+1>>1,d=d+b+1>>1,b=P,P=w*i+y*a+2048>>12,w=w*a-y*i+2048>>12,y=P,P=k*o+g*s+2048>>12,k=k*s-g*o+2048>>12,g=P,T[0+e]=m+y,T[7+e]=m-y,T[1+e]=d+g,T[6+e]=d-g,T[2+e]=b+k,T[5+e]=b-k,T[3+e]=p+w,T[4+e]=p-w):(P=f*T[0+e]+512>>10,T[0+e]=P,T[1+e]=P,T[2+e]=P,T[3+e]=P,T[4+e]=P,T[5+e]=P,T[6+e]=P,T[7+e]=P)}for(A=0;A<8;++A){const e=A;0!==T[8+e]||0!==T[16+e]||0!==T[24+e]||0!==T[32+e]||0!==T[40+e]||0!==T[48+e]||0!==T[56+e]?(m=f*T[0+e]+2048>>12,d=f*T[32+e]+2048>>12,b=T[16+e],p=T[48+e],w=h*(T[8+e]-T[56+e])+2048>>12,y=h*(T[8+e]+T[56+e])+2048>>12,k=T[24+e],g=T[40+e],P=m-d+1>>1,m=m+d+1>>1,d=P,P=b*l+p*c+2048>>12,b=b*c-p*l+2048>>12,p=P,P=w-g+1>>1,w=w+g+1>>1,g=P,P=y+k+1>>1,k=y-k+1>>1,y=P,P=m-p+1>>1,m=m+p+1>>1,p=P,P=d-b+1>>1,d=d+b+1>>1,b=P,P=w*i+y*a+2048>>12,w=w*a-y*i+2048>>12,y=P,P=k*o+g*s+2048>>12,k=k*s-g*o+2048>>12,g=P,T[0+e]=m+y,T[56+e]=m-y,T[8+e]=d+g,T[48+e]=d-g,T[16+e]=b+k,T[40+e]=b-k,T[24+e]=p+w,T[32+e]=p-w):(P=f*r[A+0]+8192>>14,T[0+e]=P,T[8+e]=P,T[16+e]=P,T[24+e]=P,T[32+e]=P,T[40+e]=P,T[48+e]=P,T[56+e]=P)}for(A=0;A<64;++A){const e=128+(T[A]+8>>4);t[A]=e<0?0:e>255?255:e}}for(let e=0;e<u;e++){const s=e<<3;for(let e=0;e<8;e++)t.push(new Uint8Array(m));for(let o=0;o<r;o++){p(n.blocks[e][o],b,d);let r=0;const a=o<<3;for(let e=0;e<8;e++){const n=t[s+e];for(let e=0;e<8;e++)n[a+e]=b[r++]}}}return t}class b{constructor(){this.jfif=null,this.adobe=null,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.resetFrames()}resetFrames(){this.frames=[]}parse(e){let n=0;function t(){const t=e[n]<<8|e[n+1];return n+=2,t}function s(){const r=t(),s=e.subarray(n,n+r-2);return n+=s.length,s}function o(e){let n,t,r=0,s=0;for(t in e.components)e.components.hasOwnProperty(t)&&(n=e.components[t],r<n.h&&(r=n.h),s<n.v&&(s=n.v));const o=Math.ceil(e.samplesPerLine/8/r),a=Math.ceil(e.scanLines/8/s);for(t in e.components)if(e.components.hasOwnProperty(t)){n=e.components[t];const i=Math.ceil(Math.ceil(e.samplesPerLine/8)*n.h/r),c=Math.ceil(Math.ceil(e.scanLines/8)*n.v/s),l=o*n.h,f=a*n.v,h=[];for(let e=0;e<f;e++){const e=[];for(let n=0;n<l;n++)e.push(new Int32Array(64));h.push(e)}n.blocksPerLine=i,n.blocksPerColumn=c,n.blocks=h}e.maxH=r,e.maxV=s,e.mcusPerLine=o,e.mcusPerColumn=a}let a=t();if(65496!==a)throw new Error("SOI not found");for(a=t();65497!==a;){switch(a){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:{const e=s();65504===a&&74===e[0]&&70===e[1]&&73===e[2]&&70===e[3]&&0===e[4]&&(this.jfif={version:{major:e[5],minor:e[6]},densityUnits:e[7],xDensity:e[8]<<8|e[9],yDensity:e[10]<<8|e[11],thumbWidth:e[12],thumbHeight:e[13],thumbData:e.subarray(14,14+3*e[12]*e[13])}),65518===a&&65===e[0]&&100===e[1]&&111===e[2]&&98===e[3]&&101===e[4]&&0===e[5]&&(this.adobe={version:e[6],flags0:e[7]<<8|e[8],flags1:e[9]<<8|e[10],transformCode:e[11]});break}case 65499:{const s=t()+n-2;for(;n<s;){const s=e[n++],o=new Int32Array(64);if(s>>4==0)for(let t=0;t<64;t++){o[r[t]]=e[n++]}else{if(s>>4!=1)throw new Error("DQT: invalid table spec");for(let e=0;e<64;e++){o[r[e]]=t()}}this.quantizationTables[15&s]=o}break}case 65472:case 65473:case 65474:{t();const r={extended:65473===a,progressive:65474===a,precision:e[n++],scanLines:t(),samplesPerLine:t(),components:{},componentsOrder:[]},s=e[n++];let i;for(let t=0;t<s;t++){i=e[n];const t=e[n+1]>>4,s=15&e[n+1],o=e[n+2];r.componentsOrder.push(i),r.components[i]={h:t,v:s,quantizationIdx:o},n+=3}o(r),this.frames.push(r);break}case 65476:{const r=t();for(let t=2;t<r;){const r=e[n++],s=new Uint8Array(16);let o=0;for(let t=0;t<16;t++,n++)s[t]=e[n],o+=s[t];const a=new Uint8Array(o);for(let t=0;t<o;t++,n++)a[t]=e[n];t+=17+o,r>>4==0?this.huffmanTablesDC[15&r]=u(s,a):this.huffmanTablesAC[15&r]=u(s,a)}break}case 65501:t(),this.resetInterval=t();break;case 65498:{t();const r=e[n++],s=[],o=this.frames[0];for(let t=0;t<r;t++){const t=o.components[e[n++]],r=e[n++];t.huffmanTableDC=this.huffmanTablesDC[r>>4],t.huffmanTableAC=this.huffmanTablesAC[15&r],s.push(t)}const a=e[n++],i=e[n++],c=e[n++],l=m(e,n,o,s,this.resetInterval,a,i,c>>4,15&c);n+=l;break}case 65535:255!==e[n]&&n--;break;default:if(255===e[n-3]&&e[n-2]>=192&&e[n-2]<=254){n-=3;break}throw new Error(`unknown JPEG marker ${a.toString(16)}`)}a=t()}}getResult(){const{frames:e}=this;if(0===this.frames.length)throw new Error("no frames were decoded");this.frames.length>1&&console.warn("more than one frame is not supported");for(let e=0;e<this.frames.length;e++){const n=this.frames[e].components;for(const e of Object.keys(n))n[e].quantizationTable=this.quantizationTables[n[e].quantizationIdx],delete n[e].quantizationIdx}const n=e[0],{components:t,componentsOrder:r}=n,s=[],o=n.samplesPerLine,a=n.scanLines;for(let e=0;e<r.length;e++){const o=t[r[e]];s.push({lines:d(0,o),scaleX:o.h/n.maxH,scaleY:o.v/n.maxV})}const i=new Uint8Array(o*a*s.length);let c=0;for(let e=0;e<a;++e)for(let n=0;n<o;++n)for(let t=0;t<s.length;++t){const r=s[t];i[c]=r.lines[0|e*r.scaleY][0|n*r.scaleX],++c}return i}}class p extends t{constructor(e){super(),this.reader=new b,e.JPEGTables&&this.reader.parse(e.JPEGTables)}decodeBlock(e){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(e)),this.reader.getResult().buffer}}export{p as default};
