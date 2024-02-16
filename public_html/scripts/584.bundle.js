"use strict";(self.webpackChunklunar_explorer=self.webpackChunklunar_explorer||[]).push([[584],{584:(e,t,n)=>{n.r(t),n.d(t,{init:()=>Se});var o=n(152),i=n.n(o),r=n(476);const l=new AudioContext;let s=!0;document.addEventListener("visibilitychange",(()=>{"visible"===document.visibilityState?(s=!0,"suspended"===l.state&&l.resume()):"hidden"===document.visibilityState&&(s=!1,"running"===l.state&&l.suspend())}));const a=l.createGain();a.connect(l.destination),a.gain.value=.1;const c=[],d=new Map;function u(e){if("suspended"===l.state)return void(s&&l.resume().then((()=>u(e))));const t=l.createBufferSource();t.buffer=d.get(e),t.connect(a),t.start()}const A=100,f=5;let h=!1,m=0,E=0,g=0;function v(){if(!h)return;m=requestAnimationFrame(v),ve();const e=performance.now(),t=e-E;E=e,g+=t;let n=0;for(;g>=A&&h;)if(Ee(),g-=A,++n>f){g=0,E=performance.now();break}}var w,p,M;!function(e){e[e.WIDTH=320]="WIDTH",e[e.HEIGHT=200]="HEIGHT"}(w||(w={})),function(e){e[e.WIDTH=4]="WIDTH",e[e.HEIGHT=3]="HEIGHT"}(p||(p={})),function(e){e[e.BLACK=0]="BLACK",e[e.BLUE=1]="BLUE",e[e.GREEN=2]="GREEN",e[e.CYAN=3]="CYAN",e[e.RED=4]="RED",e[e.MAGENTA=5]="MAGENTA",e[e.BROWN=6]="BROWN",e[e.LIGHT_GRAY=7]="LIGHT_GRAY",e[e.GRAY=8]="GRAY",e[e.LIGHT_BLUE=9]="LIGHT_BLUE",e[e.LIGHT_GREEN=10]="LIGHT_GREEN",e[e.LIGHT_CYAN=11]="LIGHT_CYAN",e[e.LIGHT_RED=12]="LIGHT_RED",e[e.LIGHT_MAGENTA=13]="LIGHT_MAGENTA",e[e.YELLOW=14]="YELLOW",e[e.WHITE=15]="WHITE"}(M||(M={}));const y=[0,170,43520,43690,11141120,11141290,11162880,11184810,5592405,5592575,5635925,5636095,16733525,16733695,16777045,16777215];function B(e,t=255){return new Uint8ClampedArray([e>>>16,255&e>>>8,255&e,t])}const I=new Array(y.length).fill(null).map(((e,t)=>B(y[t]))),L=new Array(y.length).fill(null).map(((e,t)=>B(y[t],t===M.BLACK?0:255))),G=Array.from({length:64},(()=>Array.from({length:8},(()=>new Uint8ClampedArray(8).fill(0)))));(()=>{const e=atob("AAAAAAAAAAAMHh4MDAAMADY2NgAAAAAANjZ/Nn82NgAMPgMeMB8MAABjMxgMZmMAHDYcbjszbgAGBgMAAAAAABgMBgYGDBgABgwYGBgMBgAAZjz/PGYAAAAMDD8MDAAAAAAAAAAMDAYAAAA/AAAAAAAAAAAADAwAYDAYDAYDAQA+Y3N7b2c+AAwODAwMDD8AHjMwHAYzPwAeMzAcMDMeADg8NjN/MHgAPwMfMDAzHgAcBgMfMzMeAD8zMBgMDAwAHjMzHjMzHgAeMzM+MBgOAAAMDAAADAwAAAwMAAAMDAYYDAYDBgwYAAAAPwAAPwAABgwYMBgMBgAeMzAYDAAMAD5je3t7Ax4ADB4zMz8zMwA/ZmY+ZmY/ADxmAwMDZjwAHzZmZmY2HwB/RhYeFkZ/AH9GFh4WBg8APGYDA3NmfAAzMzM/MzMzAB4MDAwMDB4AeDAwMDMzHgBnZjYeNmZnAA8GBgZGZn8AY3d/f2tjYwBjZ297c2NjABw2Y2NjNhwAP2ZmPgYGDwAeMzMzOx44AD9mZj42ZmcAHjMGDBgzHgA/LQwMDAweADMzMzMzMz8AMzMzMzMeDABjY2Nrf3djAGNjNhwcNmMAMzMzHgwMHgB/YzEYTGZ/AB4GBgYGBh4AAwYMGDBgQAAeGBgYGBgeAAgcNmMAAAAAAAAAAAAAAP8=");for(let t=0,n=0;t<64;++t){const o=G[t];for(let t=0;t<8;++t){const i=o[t];let r=e.charCodeAt(n++);for(let e=0;e<8;++e,r>>=1)1==(1&r)&&(i[e]=M.WHITE)}}})();const H=new Uint8ClampedArray(w.WIDTH*w.HEIGHT).fill(M.BLACK);let T=0,R=0;function D(){H.fill(M.BLACK)}let N=0,x=0;function b(e,t){N=8*(t-1),x=8*(e-1)}function _(e){for(let t=0;t<e.length;++t){const n=G[e.charCodeAt(t)-32];for(let e=0;e<8;++e)H.set(n[e],w.WIDTH*(e+x)+N);N+=8}}var C;!function(e){e[e.STRING=0]="STRING",e[e.NUMBER=1]="NUMBER"}(C||(C={}));class W{type;value;index;constructor(e,t,n){this.type=e,this.value=e===C.NUMBER?parseInt(t):t,this.index=n}}function Y(e,t,n){e>=0&&t>=0&&e<w.WIDTH&&t<w.HEIGHT&&(H[w.WIDTH*Math.floor(t)+Math.floor(e)]=n)}function O(e,t){return e>=0&&t>=0&&e<w.WIDTH&&t<w.HEIGHT?H[w.WIDTH*Math.floor(t)+Math.floor(e)]:0}function k(e,t,n,o,i){let r,l,s,a,c;void 0===o||void 0===i?(r=T,l=R,s=Math.floor(e),a=Math.floor(t),c=Math.floor(n)):(r=Math.floor(e),l=Math.floor(t),s=Math.floor(n),a=Math.floor(o),c=Math.floor(i)),T=s,R=a;const d=Math.abs(s-r),u=r<s?1:-1,A=-Math.abs(a-l),f=l<a?1:-1;let h=d+A;for(;Y(r,l,c),r!==s||l!==a;){const e=2*h;if(e>=A){if(r===s)break;h+=A,r+=u}if(e<=d){if(l===a)break;h+=d,l+=f}}}class z{x1;x2;y;dy;constructor(e,t,n,o){this.x1=e,this.x2=t,this.y=n,this.dy=o}}function S(e,t,n){return e>=0&&t>=0&&e<w.WIDTH&&t<w.HEIGHT&&H[w.WIDTH*t+e]!==n}function U(e,t,n,o=n){let i=Math.floor(e),r=Math.floor(t),l=Math.floor(n),s=Math.floor(o);if(!S(i,r,s))return;const a=[];for(a.push(new z(i,i,r,1)),a.push(new z(i,i,r-1,-1));a.length>0;){const e=a.pop();let t=i=e.x1,n=e.x2,o=e.dy;if(r=e.y,S(i,r,s)){for(;S(i-1,r,s);)Y(i-1,r,l),--i;i<t&&a.push(new z(i,t-1,r-o,-o))}for(;t<=n;){for(;S(t,r,s);)Y(t,r,l),++t;for(t>i&&a.push(new z(i,t-1,r+o,o)),t-1>n&&a.push(new z(n+1,t-1,r-o,-o)),++t;t<n&&!S(t,r,s);)++t;i=t}}}async function $(){const e=new Uint8ClampedArray(w.WIDTH*w.HEIGHT*4);for(let t=H.length-1,n=e.length-4;t>=0;--t,n-=4)e.set(I[H[t]],n);return createImageBitmap(new ImageData(e,w.WIDTH,w.HEIGHT))}var F=n(724);const P=10,j=10,Z=290;var V;let K,q,Q,J;!function(e){e[e.GAME_START=0]="GAME_START",e[e.LEVEL_START=1]="LEVEL_START",e[e.WAITING_FOR_BUFFER_TO_IMAGE=2]="WAITING_FOR_BUFFER_TO_IMAGE",e[e.PLAYING=3]="PLAYING",e[e.SUCCESS=4]="SUCCESS",e[e.GAME_OVER_BLOCKING_TAP=5]="GAME_OVER_BLOCKING_TAP",e[e.GAME_OVER=6]="GAME_OVER"}(V||(V={}));let X=null,ee=!1;const te=new Set,ne=new Set,oe=new Set,ie=[260,20,290,90,320,90,320,110,290,110,270,180,70,180,0,199];let re=V.GAME_START,le=0,se=0,ae=0,ce=0,de=0,ue=!1,Ae=0;const fe=()=>{if(null!==X&&(X(),X=null),ee)return;const e=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);e.addEventListener("change",fe),X=()=>e.removeEventListener("change",fe),Ge()};function he(){ee=!1,document.body.style.backgroundColor="#C2BCB1",window.addEventListener("resize",Ge),window.addEventListener("touchmove",me,{passive:!1}),document.addEventListener("visibilitychange",He),document.addEventListener("keydown",pe),document.addEventListener("keyup",Me),document.addEventListener("touchstart",ye,{passive:!1}),document.addEventListener("touchend",Be),document.addEventListener("touchcancel",Be),document.addEventListener("mousedown",Ie),document.addEventListener("mouseup",Le),(0,F.s)(),document.getElementById("main-content").innerHTML=`<canvas id="lunar-canvas" class="canvas" width="${w.WIDTH}" \n            height="${w.HEIGHT}"></canvas>`,K=document.getElementById("lunar-canvas"),fe(),D(),function(e){const t=function(e){e=e.toUpperCase();let t=[],n=null,o="",i=0;for(let r=0;r<=e.length;++r){const l=r<e.length?e.charAt(r):"\0";l>="A"&&l<="Z"?(n!==C.STRING&&(null!==n&&t.push(new W(n,o,i)),n=C.STRING,o="",i=r),o+=l):l>="0"&&l<="9"?(n!==C.NUMBER&&(null!==n&&t.push(new W(n,o,i)),n=C.NUMBER,o="",i=r),o+=l):(null!==n&&t.push(new W(n,o,i)),n=null,o="")}return t}(e);let n=0,o=0,i=0,r=0;for(;i<t.length;){const e=t[i++];if(e.type!==C.STRING)throw new Error(`<${e.index}> Expected string: ${e.value}`);const l=e.value;let s,a;if(l.length>2)throw new Error(`<${e.index}> String too long: ${e.value}`);if(2===l.length?(s=l.charAt(0),a=l.charAt(1)):(s=null,a=l.charAt(0)),i>=t.length)throw new Error("Expected number, but reached end of string.");const c=t[i++];if(c.type!==C.NUMBER)throw new Error(`<${c.index}> Expected number: ${c.value}`);const d=c.value;let u=n,A=o;switch(a){case"C":r=d;continue;case"U":A-=d;break;case"D":A+=d;break;case"L":u-=d;break;case"R":u+=d;break;case"E":u+=d,A-=d;break;case"F":u+=d,A+=d;break;case"G":u-=d,A+=d;break;case"H":u-=d,A-=d;break;case"M":{if(i>=t.length)throw new Error("Expected number, but reached end of string.");const e=t[i++];if(e.type!==C.NUMBER)throw new Error(`<${e.index}> Expected number: ${e.value}`);u=d,A=e.value;break}default:throw new Error(`<${e.index}> Unknown command: ${a}`)}if(null===s)k(n,o,u,A,r),n=u,o=A;else if("B"===s)n=u,o=A;else{if("N"!==s)throw new Error(`<${e.index}> Invalid prefix: ${e.value}`);k(n,o,u,A,r)}}}("BM0,6C12R16L1H1L12D2C4R12L1G1L8BL1BU4C11R10H1L8U1R8H1L6R1E1R2D1C15R1D1R1D1BD1BL3C3L3U1F1U1E1"),async function(e,t,n,o){let i=Math.floor(0),r=Math.floor(0),l=Math.floor(16),s=Math.floor(8);if(l<i){let e=l;l=i,i=e}if(s<r){let e=s;s=r,r=e}const a=l-i+1,c=s-r+1,d=new Uint8ClampedArray(a*c*4);for(let e=r,t=0;e<=s;++e)for(let n=i;n<=l;++n,t+=4)d.set(L[O(n,e)],t);return createImageBitmap(new ImageData(d,a,c))}().then((e=>{Q=e,re=V.GAME_START,h||(h=!0,g=0,m=requestAnimationFrame(v),E=performance.now())}))}function me(e){e.preventDefault()}function Ee(){switch(re){case V.GAME_START:le=1,se=40,ge();break;case V.LEVEL_START:ge();break;case V.PLAYING:ue?(ue=!1,--de,u("sfx/boost.mp3")):de+=.4,ae++,ce+=de,O(ae+17,ce+6)===M.BROWN||O(ae+9,ce-1)===M.BROWN||O(ae+8,ce+9)===M.BROWN?(b(10,15),_("GAME OVER"),u("sfx/crash.mp3"),re=V.WAITING_FOR_BUFFER_TO_IMAGE,$().then((e=>{J=e,re=V.GAME_OVER_BLOCKING_TAP,Ae=j}))):ae>=303&&(++le,se+=2,u("sfx/success.mp3"),re=V.SUCCESS,Ae=P);break;case V.SUCCESS:0==--Ae&&ge();break;case V.GAME_OVER_BLOCKING_TAP:0==--Ae&&(Ae=Z,re=V.GAME_OVER);break;case V.GAME_OVER:(0==--Ae||ue)&&(ue=!1,ee=!0,h&&(h=!1,cancelAnimationFrame(m)),(0,F.k)(),window.removeEventListener("resize",Ge),window.removeEventListener("touchmove",me),document.removeEventListener("visibilitychange",He),document.removeEventListener("keydown",pe),document.removeEventListener("keyup",Me),document.removeEventListener("touchstart",ye),document.removeEventListener("touchend",Be),document.removeEventListener("touchcancel",Be),document.removeEventListener("mousedown",Ie),document.removeEventListener("mouseup",Le),null!==X&&(X(),X=null),te.clear(),ne.clear(),oe.clear(),De())}}function ge(){ae=1,ce=30,de=0,ue=!1,re=V.WAITING_FOR_BUFFER_TO_IMAGE,async function(){D(),k(0,0,60,20,6);for(let e=0;e<ie.length;e+=2)k(ie[e],ie[e+1],M.BROWN);U(160,10,M.BROWN,M.BROWN),U(160,190,M.BROWN,M.BROWN);for(let e=60;e<=240;e+=20){let t=Math.floor(43*Math.random()+1)+se;k(e,20,e+10,t,M.BROWN),k(e+20,20,M.BROWN),U(e+10,22,M.BROWN,M.BROWN),t=Math.floor(50*Math.random()+1)+100,k(e+10,180,e+20,t,M.BROWN),k(e+30,180,M.BROWN),U(e+20,178,M.BROWN,M.BROWN)}b(1,10),_(`LEVEL ${le} `),J=await $()}().then((()=>re=V.PLAYING))}function ve(){q?J&&(q.drawImage(J,0,0),re!==V.GAME_OVER_BLOCKING_TAP&&re!==V.GAME_OVER&&q.drawImage(Q,Math.floor(ae),Math.floor(ce))):Ge()}function we(){re!=V.PLAYING&&re!=V.GAME_OVER||0!==te.size||0!==ne.size||0!==oe.size||(ue=!0)}function pe(e){ee||(we(),te.add(e.key))}function Me(e){ee||te.delete(e.key)}function ye(e){if(!ee){we();for(const t of Array.from(e.touches))ne.add(t.identifier)}e.preventDefault()}function Be(e){if(!ee)for(const t of Array.from(e.changedTouches))ne.delete(t.identifier)}function Ie(e){ee||(we(),oe.add(e.button))}function Le(e){ee||oe.delete(e.button)}function Ge(){if(ee)return;if(q=null,K=document.getElementById("lunar-canvas"),!K)return;K.style.display="none";const e=window.innerWidth,t=window.innerHeight;let n,o;const i=new DOMMatrix;e>=t?(K.width=w.WIDTH,K.height=w.HEIGHT,n=e,o=n*p.HEIGHT/p.WIDTH,t<o&&(o=t,n=o*p.WIDTH/p.HEIGHT)):(K.width=w.HEIGHT,K.height=w.WIDTH,o=t,n=o*p.HEIGHT/p.WIDTH,e<n&&(n=e,o=n*p.WIDTH/p.HEIGHT),i.a=i.d=i.e=0,i.b=-1,i.c=1,i.f=w.WIDTH),K.style.display="block",K.style.width=`${Math.floor(n)}px`,K.style.height=`${Math.floor(o)}px`,K.style.left=`${Math.floor((e-n)/2)}px`,K.style.top=`${Math.floor((t-o)/2)}px`,q=K.getContext("2d"),q&&(q.setTransform(i),ve())}function He(){ee||"visible"!==document.visibilityState||(0,F.s)()}let Te=0,Re=!1;function De(){document.body.style.backgroundColor="#0D1117",window.addEventListener("resize",_e),window.addEventListener("touchmove",xe,{passive:!1}),document.getElementById("main-content").innerHTML='\n            <div id="start-div">\n                <div class="volume-div">\n                    <span class="left-volume-label material-symbols-outlined" id="left-volume-span" \n                            lang="en">volume_mute</span>\n                    <input type="range" id="volume-input" min="0" max="100" step="any" value="10">\n                    <span class="right-volume-label" id="right-volume-span" lang="en">100</span>\n                </div>\n                <div id="go-div">\n                    <button id="start-button">Start</button>\n                </div>\n            </div>',Te=100*a.gain.value;const e=document.getElementById("volume-input");e.addEventListener("input",be),e.value=String(Te),document.getElementById("start-button").addEventListener("click",Ne),_e()}function Ne(){!function(e){a.gain.value=e/100}(Te),window.removeEventListener("resize",_e),window.removeEventListener("touchmove",xe),document.getElementById("volume-input").removeEventListener("input",be),document.getElementById("start-button").removeEventListener("click",Ne),he()}function xe(e){let t=e.target;for(;null!==t;){if("volume-input"===t.id){if(Re)return;const n=t,o=parseFloat(n.max),i=parseFloat(n.min),r=n.getBoundingClientRect(),l=(1-(e.touches[0].clientY-r.top)/r.height)*(o-i)+i;return n.value=l.toString(),void n.dispatchEvent(new Event("input"))}t=t.parentElement}e.preventDefault()}function be(){const e=document.getElementById("left-volume-span"),t=document.getElementById("volume-input"),n=document.getElementById("right-volume-span");Te=100*(+t.value-+t.min)/(+t.max-+t.min),t.style.setProperty("--thumb-position",`${Te}%`),e.textContent=0===Te?"no_sound":Te<33?"volume_mute":Te<66?"volume_down":"volume_up",n.textContent=String(Math.round(Te))}function _e(){const e=document.getElementById("start-div"),t=document.getElementById("left-volume-span"),n=document.getElementById("right-volume-span");e.style.top=e.style.left=e.style.transform="",e.style.display="none";const o=window.innerWidth,i=window.innerHeight;if(Re=o>=i,e.style.display="flex",t.style.width="",t.style.display="inline-block",t.style.textAlign="center",t.textContent="🔇",t.style.transform="",n.style.width="",n.style.display="inline-block",n.style.textAlign="center",n.textContent="100",Re){const r=t.getBoundingClientRect().width;t.style.width=`${r}px`;const l=n.getBoundingClientRect().width;n.style.width=`${l}px`;const s=e.getBoundingClientRect();e.style.left=(o-s.width)/2+"px",e.style.top=(i-s.height)/2+"px"}else{const r=t.getBoundingClientRect().height;t.style.width=`${r}px`;const l=n.getBoundingClientRect().height;n.style.width=`${l}px`,e.style.transform="rotate(-90deg)";const s=e.getBoundingClientRect();e.style.left=(o-s.height)/2+"px",e.style.top=(i-s.width)/2+"px"}n.textContent=String(Te),be()}const Ce=90;let We=!1;function Ye(e){(new(i())).loadAsync(e).then((e=>Object.entries(e.files).forEach((e=>{const[t,n]=e;var o,i;n.dir||t.endsWith(".mp3")&&(o=t,i=n,c.push(i.async("arraybuffer").then((e=>l.decodeAudioData(e))).then((e=>d.set(o,e)))))})))),async function(){return Promise.all(c).then((()=>c.length=0))}().then((()=>{document.getElementById("loading-progress").value=100,window.removeEventListener("resize",ke),window.removeEventListener("touchmove",Oe),De()}))}function Oe(e){e.preventDefault()}function ke(){const e=document.getElementById("progress-div");e.style.top=e.style.left=e.style.transform="",e.style.display="none";const t=window.innerWidth,n=window.innerHeight;if(We=t>=n,e.style.display="flex",We){const o=e.getBoundingClientRect();e.style.left=(t-o.width)/2+"px",e.style.top=(n-o.height)/2+"px"}else{e.style.transform="rotate(-90deg)";const o=e.getBoundingClientRect();e.style.left=(t-o.height)/2+"px",e.style.top=(n-o.width)/2+"px"}}var ze=n(876);async function Se(){window.addEventListener("error",(e=>{console.error(`Caught in global handler: ${e.message}`,{source:e.filename,lineno:e.lineno,colno:e.colno,error:e.error}),e.preventDefault(),(0,ze.Y)()})),window.addEventListener("unhandledrejection",(e=>e.preventDefault())),document.addEventListener("dblclick",(e=>e.preventDefault()),{passive:!1}),function(){window.addEventListener("resize",ke),window.addEventListener("touchmove",Oe,{passive:!1}),document.getElementById("main-content").innerHTML='\n            <div id="progress-div">\n                <progress id="loading-progress" value="0" max="100"></progress>\n            </div>',ke();const e=document.getElementById("loading-progress");(0,r.k)("resources/lunar-explorer.zip",(t=>e.value=Ce*t)).then(Ye)}()}},876:(e,t,n)=>{n.d(t,{Y:()=>i});let o=!1;function i(){window.addEventListener("resize",l),window.addEventListener("touchmove",r,{passive:!1}),document.getElementById("main-content").innerHTML='<div id="death-div"><span id="fatal-error">&#x1F480;</span></div>',l()}function r(e){e.preventDefault()}function l(){const e=document.getElementById("death-div");e.style.top=e.style.left=e.style.transform="",e.style.display="none";const t=window.innerWidth,n=window.innerHeight;if(o=t>=n,e.style.display="flex",o){const o=e.getBoundingClientRect();e.style.left=(t-o.width)/2+"px",e.style.top=(n-o.height)/2+"px"}else{e.style.transform="rotate(-90deg)";const o=e.getBoundingClientRect();e.style.left=(t-o.height)/2+"px",e.style.top=(n-o.width)/2+"px"}}},476:(e,t,n)=>{n.d(t,{k:()=>i});const o=5;async function i(e,t){for(let n=o-1;n>=0;--n)try{const n=await fetch(e);if(!n.ok)continue;const o=n.headers.get("Content-Length");if(!o)continue;const i=parseInt(o);if(isNaN(i)||i<=0)continue;const r=n.body;if(null===r)continue;const l=r.getReader(),s=[];let a=0;for(;;){const{done:e,value:n}=await l.read();if(e)break;s.push(n),a+=n.length,t(a/i)}const c=new Uint8Array(a);let d=0;return s.forEach((e=>{c.set(e,d),d+=e.length})),c}catch(e){if(0===n)throw e}throw new Error("Failed to fetch.")}},724:(e,t,n)=>{n.d(t,{k:()=>l,s:()=>r});let o=null,i=!1;function r(){!i&&null===o&&"wakeLock"in navigator&&(i=!0,navigator.wakeLock.request("screen").then((e=>{i&&(o=e,o.addEventListener("release",(()=>{i||(o=null)})))})).catch((e=>{})).finally((()=>i=!1)))}function l(){null!==o&&"wakeLock"in navigator&&(i=!1,o.release().then((()=>{i||(o=null)})).catch((e=>{})))}}}]);