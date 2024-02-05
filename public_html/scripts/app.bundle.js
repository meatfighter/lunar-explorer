(()=>{"use strict";const e=100,t=5;let n=!1,o=0,r=0,A=0;function a(){if(!n)return;o=requestAnimationFrame(a),oe();const l=performance.now(),i=l-r;r=l,A+=i;let c=0;for(;A>=e&&n;)if(te(),A-=e,++c>t){A=0,r=performance.now();break}}var l,i,c;!function(e){e[e.WIDTH=320]="WIDTH",e[e.HEIGHT=200]="HEIGHT"}(l||(l={})),function(e){e[e.WIDTH=4]="WIDTH",e[e.HEIGHT=3]="HEIGHT"}(i||(i={})),function(e){e[e.BLACK=0]="BLACK",e[e.BLUE=1]="BLUE",e[e.GREEN=2]="GREEN",e[e.CYAN=3]="CYAN",e[e.RED=4]="RED",e[e.MAGENTA=5]="MAGENTA",e[e.BROWN=6]="BROWN",e[e.LIGHT_GRAY=7]="LIGHT_GRAY",e[e.GRAY=8]="GRAY",e[e.LIGHT_BLUE=9]="LIGHT_BLUE",e[e.LIGHT_GREEN=10]="LIGHT_GREEN",e[e.LIGHT_CYAN=11]="LIGHT_CYAN",e[e.LIGHT_RED=12]="LIGHT_RED",e[e.LIGHT_MAGENTA=13]="LIGHT_MAGENTA",e[e.YELLOW=14]="YELLOW",e[e.WHITE=15]="WHITE"}(c||(c={}));const s=[0,170,43520,43690,11141120,11141290,11162880,11184810,5592405,5592575,5635925,5636095,16733525,16733695,16777045,16777215];function f(e,t=255){return new Uint8ClampedArray([e>>>16,255&e>>>8,255&e,t])}const M=new Array(s.length).fill(null).map(((e,t)=>f(s[t]))),u=new Array(s.length).fill(null).map(((e,t)=>f(s[t],t===c.BLACK?0:255))),d=Array.from({length:64},(()=>Array.from({length:8},(()=>new Uint8ClampedArray(8).fill(0)))));(()=>{const e=atob("AAAAAAAAAAAMHh4MDAAMADY2NgAAAAAANjZ/Nn82NgAMPgMeMB8MAABjMxgMZmMAHDYcbjszbgAGBgMAAAAAABgMBgYGDBgABgwYGBgMBgAAZjz/PGYAAAAMDD8MDAAAAAAAAAAMDAYAAAA/AAAAAAAAAAAADAwAYDAYDAYDAQA+Y3N7b2c+AAwODAwMDD8AHjMwHAYzPwAeMzAcMDMeADg8NjN/MHgAPwMfMDAzHgAcBgMfMzMeAD8zMBgMDAwAHjMzHjMzHgAeMzM+MBgOAAAMDAAADAwAAAwMAAAMDAYYDAYDBgwYAAAAPwAAPwAABgwYMBgMBgAeMzAYDAAMAD5je3t7Ax4ADB4zMz8zMwA/ZmY+ZmY/ADxmAwMDZjwAHzZmZmY2HwB/RhYeFkZ/AH9GFh4WBg8APGYDA3NmfAAzMzM/MzMzAB4MDAwMDB4AeDAwMDMzHgBnZjYeNmZnAA8GBgZGZn8AY3d/f2tjYwBjZ297c2NjABw2Y2NjNhwAP2ZmPgYGDwAeMzMzOx44AD9mZj42ZmcAHjMGDBgzHgA/LQwMDAweADMzMzMzMz8AMzMzMzMeDABjY2Nrf3djAGNjNhwcNmMAMzMzHgwMHgB/YzEYTGZ/AB4GBgYGBh4AAwYMGDBgQAAeGBgYGBgeAAgcNmMAAAAAAAAAAAAAAP8=");for(let t=0,n=0;t<64;++t){const o=d[t];for(let t=0;t<8;++t){const r=o[t];let A=e.charCodeAt(n++);for(let e=0;e<8;++e,A>>=1)1==(1&A)&&(r[e]=c.WHITE)}}})();const h=new Uint8ClampedArray(l.WIDTH*l.HEIGHT).fill(c.BLACK);let E=0,w=0;function H(){h.fill(c.BLACK)}let T=0,G=0;function I(e,t){T=8*(t-1),G=8*(e-1)}function B(e){for(let t=0;t<e.length;++t){const n=d[e.charCodeAt(t)-32];for(let e=0;e<8;++e)h.set(n[e],l.WIDTH*(e+G)+T);T+=8}}var D;!function(e){e[e.STRING=0]="STRING",e[e.NUMBER=1]="NUMBER"}(D||(D={}));class g{type;value;index;constructor(e,t,n){this.type=e,this.value=e===D.NUMBER?parseInt(t):t,this.index=n}}function R(e,t,n){e>=0&&t>=0&&e<l.WIDTH&&t<l.HEIGHT&&(h[l.WIDTH*Math.floor(t)+Math.floor(e)]=n)}function m(e,t){return e>=0&&t>=0&&e<l.WIDTH&&t<l.HEIGHT?h[l.WIDTH*Math.floor(t)+Math.floor(e)]:0}function L(e,t,n,o,r){let A,a,l,i,c;void 0===o||void 0===r?(A=E,a=w,l=Math.floor(e),i=Math.floor(t),c=Math.floor(n)):(A=Math.floor(e),a=Math.floor(t),l=Math.floor(n),i=Math.floor(o),c=Math.floor(r)),E=l,w=i;const s=Math.abs(l-A),f=A<l?1:-1,M=-Math.abs(i-a),u=a<i?1:-1;let d=s+M;for(;R(A,a,c),A!==l||a!==i;){const e=2*d;if(e>=M){if(A===l)break;d+=M,A+=f}if(e<=s){if(a===i)break;d+=s,a+=u}}}class N{x1;x2;y;dy;constructor(e,t,n,o){this.x1=e,this.x2=t,this.y=n,this.dy=o}}function p(e,t,n){return e>=0&&t>=0&&e<l.WIDTH&&t<l.HEIGHT&&h[l.WIDTH*t+e]!==n}function v(e,t,n,o=n){let r=Math.floor(e),A=Math.floor(t),a=Math.floor(n),l=Math.floor(o);if(!p(r,A,l))return;const i=[];for(i.push(new N(r,r,A,1)),i.push(new N(r,r,A-1,-1));i.length>0;){const e=i.pop();let t=r=e.x1,n=e.x2,o=e.dy;if(A=e.y,p(r,A,l)){for(;p(r-1,A,l);)R(r-1,A,a),--r;r<t&&i.push(new N(r,t-1,A-o,-o))}for(;t<=n;){for(;p(t,A,l);)R(t,A,a),++t;for(t>r&&i.push(new N(r,t-1,A+o,o)),t-1>n&&i.push(new N(n+1,t-1,A-o,-o)),++t;t<n&&!p(t,A,l);)++t;r=t}}}async function W(){const e=new Uint8ClampedArray(l.WIDTH*l.HEIGHT*4);for(let t=h.length-1,n=e.length-4;t>=0;--t,n-=4)e.set(M[h[t]],n);return createImageBitmap(new ImageData(e,l.WIDTH,l.HEIGHT))}let Y=null,y=!1;function _(){!y&&null===Y&&"wakeLock"in navigator&&(y=!0,navigator.wakeLock.request("screen").then((e=>{y&&(Y=e,Y.addEventListener("release",(()=>{y||(Y=null)})))})).catch((e=>{})).finally((()=>y=!1)))}var O;let z,b,x,U;!function(e){e[e.GAME_START=0]="GAME_START",e[e.LEVEL_START=1]="LEVEL_START",e[e.WAITING_FOR_BUFFER_TO_IMAGE=2]="WAITING_FOR_BUFFER_TO_IMAGE",e[e.PLAYING=3]="PLAYING",e[e.GAME_OVER=4]="GAME_OVER"}(O||(O={}));let k=null,C=!1;const j=new Set,$=new Set,Z=new Set,F=[260,20,290,90,320,90,320,110,290,110,270,180,70,180,0,199];let S=O.GAME_START,P=0,V=0,K=0,q=0,Q=0,J=!1;const X=()=>{if(null!==k&&(k(),k=null),C)return;const e=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);e.addEventListener("change",X),k=()=>e.removeEventListener("change",X),fe()};async function ee(){H(),function(e){const t=function(e){e=e.toUpperCase();let t=[],n=null,o="",r=0;for(let A=0;A<=e.length;++A){const a=A<e.length?e.charAt(A):"\0";a>="A"&&a<="Z"?(n!==D.STRING&&(null!==n&&t.push(new g(n,o,r)),n=D.STRING,o="",r=A),o+=a):a>="0"&&a<="9"?(n!==D.NUMBER&&(null!==n&&t.push(new g(n,o,r)),n=D.NUMBER,o="",r=A),o+=a):(null!==n&&t.push(new g(n,o,r)),n=null,o="")}return t}(e);let n=0,o=0,r=0,A=0;for(;r<t.length;){const e=t[r++];if(e.type!==D.STRING)throw new Error(`<${e.index}> Expected string: ${e.value}`);const a=e.value;let l,i;if(a.length>2)throw new Error(`<${e.index}> String too long: ${e.value}`);if(2===a.length?(l=a.charAt(0),i=a.charAt(1)):(l=null,i=a.charAt(0)),r>=t.length)throw new Error("Expected number, but reached end of string.");const c=t[r++];if(c.type!==D.NUMBER)throw new Error(`<${c.index}> Expected number: ${c.value}`);const s=c.value;let f=n,M=o;switch(i){case"C":A=s;continue;case"U":M-=s;break;case"D":M+=s;break;case"L":f-=s;break;case"R":f+=s;break;case"E":f+=s,M-=s;break;case"F":f+=s,M+=s;break;case"G":f-=s,M+=s;break;case"H":f-=s,M-=s;break;case"M":{if(r>=t.length)throw new Error("Expected number, but reached end of string.");const e=t[r++];if(e.type!==D.NUMBER)throw new Error(`<${e.index}> Expected number: ${e.value}`);f=s,M=e.value;break}default:throw new Error(`<${e.index}> Unknown command: ${i}`)}if(null===l)L(n,o,f,M,A),n=f,o=M;else if("B"===l)n=f,o=M;else{if("N"!==l)throw new Error(`<${e.index}> Invalid prefix: ${e.value}`);L(n,o,f,M,A)}}}("BM0,6C12R16L1H1L12D2C4R12L1G1L8BL1BU4C11R10H1L8U1R8H1L6R1E1R2D1C15R1D1R1D1BD1BL3C3L3U1F1U1E1"),x=await async function(e,t,n,o){let r=Math.floor(0),A=Math.floor(0),a=Math.floor(16),l=Math.floor(8);if(a<r){let e=a;a=r,r=e}if(l<A){let e=l;l=A,A=e}const i=a-r+1,c=l-A+1,s=new Uint8ClampedArray(i*c*4);for(let e=A,t=0;e<=l;++e)for(let n=r;n<=a;++n,t+=4)s.set(u[m(n,e)],t);return createImageBitmap(new ImageData(s,i,c))}()}function te(){switch(S){case O.GAME_START:P=1,V=40,ne();break;case O.LEVEL_START:ne();break;case O.PLAYING:J?(J=!1,--Q):Q+=.4,K++,q+=Q,m(K+17,q+6)===c.BROWN||m(K+9,q-1)===c.BROWN||m(K+8,q+9)===c.BROWN?(I(10,15),B("GAME OVER"),S=O.WAITING_FOR_BUFFER_TO_IMAGE,W().then((e=>{U=e,S=O.GAME_OVER}))):K>=303&&(++P,V+=2,ne());case O.GAME_OVER:}}function ne(){K=1,q=30,Q=0,J=!1,S=O.WAITING_FOR_BUFFER_TO_IMAGE,async function(){H(),L(0,0,60,20,6);for(let e=0;e<F.length;e+=2)L(F[e],F[e+1],c.BROWN);v(160,10,c.BROWN,c.BROWN),v(160,190,c.BROWN,c.BROWN);for(let e=60;e<=240;e+=20){let t=Math.floor(43*Math.random()+1)+V;L(e,20,e+10,t,c.BROWN),L(e+20,20,c.BROWN),v(e+10,22,c.BROWN,c.BROWN),t=Math.floor(50*Math.random()+1)+100,L(e+10,180,e+20,t,c.BROWN),L(e+30,180,c.BROWN),v(e+20,178,c.BROWN,c.BROWN)}I(1,10),B(`LEVEL ${P} `),U=await W()}().then((()=>S=O.PLAYING))}function oe(){b?U&&(b.drawImage(U,0,0),b.drawImage(x,Math.floor(K),Math.floor(q))):fe()}function re(){S==O.PLAYING&&0===j.size&&0===$.size&&0===Z.size&&(J=!0)}function Ae(e){C||(re(),j.add(e.key))}function ae(e){C||j.delete(e.key)}function le(e){if(!C){re();for(const t of Array.from(e.touches))$.add(t.identifier)}e.preventDefault()}function ie(e){if(!C)for(const t of Array.from(e.changedTouches))$.delete(t.identifier)}function ce(e){C||(re(),Z.add(e.button))}function se(e){C||Z.delete(e.button)}function fe(){if(C)return;if(b=null,z=document.getElementById("lunar-canvas"),!z)return;z.style.display="none";const e=window.innerWidth,t=window.innerHeight;let n,o;const r=new DOMMatrix;e>=t?(z.width=l.WIDTH,z.height=l.HEIGHT,n=e,o=n*i.HEIGHT/i.WIDTH,t<o&&(o=t,n=o*i.WIDTH/i.HEIGHT)):(z.width=l.HEIGHT,z.height=l.WIDTH,o=t,n=o*i.HEIGHT/i.WIDTH,e<n&&(n=e,o=n*i.WIDTH/i.HEIGHT),r.a=r.d=r.e=0,r.b=-1,r.c=1,r.f=l.WIDTH),z.style.display="block",z.style.width=`${Math.floor(n)}px`,z.style.height=`${Math.floor(o)}px`,z.style.left=`${Math.floor((e-n)/2)}px`,z.style.top=`${Math.floor((t-o)/2)}px`,b=z.getContext("2d"),b&&(b.setTransform(r),oe())}function Me(){C||"visible"!==document.visibilityState||_()}document.addEventListener("DOMContentLoaded",(async function(){window.addEventListener("error",(e=>{console.error(`Caught in global handler: ${e.message}`,{source:e.filename,lineno:e.lineno,colno:e.colno,error:e.error}),e.preventDefault()})),window.addEventListener("unhandledrejection",(e=>e.preventDefault())),document.addEventListener("dblclick",(e=>e.preventDefault()),{passive:!1}),window.addEventListener("touchmove",(e=>e.preventDefault()),{passive:!1}),await ee(),C=!1,window.addEventListener("resize",fe),document.addEventListener("visibilitychange",Me),document.addEventListener("keydown",Ae),document.addEventListener("keyup",ae),document.addEventListener("touchstart",le,{passive:!1}),document.addEventListener("touchend",ie),document.addEventListener("touchcancel",ie),document.addEventListener("mousedown",ce),document.addEventListener("mouseup",se),_(),document.getElementById("main-content").innerHTML=`<canvas id="lunar-canvas" class="canvas" width="${l.WIDTH}" \n            height="${l.HEIGHT}"></canvas>`,z=document.getElementById("lunar-canvas"),X(),S=O.GAME_START,n||(n=!0,A=0,o=requestAnimationFrame(a),r=performance.now())}))})();