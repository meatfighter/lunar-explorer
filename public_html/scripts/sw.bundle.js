(()=>{"use strict";const e="lunar-explorer-v1",t=["/","/app.html","/styles/app.css","/script/app.bundle.js","/resources/lunar-explorer.zip"];self.addEventListener("install",(a=>{a.waitUntil((async()=>{const a=await caches.open(e);await a.addAll(t)})())})),self.addEventListener("fetch",(t=>{t.respondWith((async()=>{const a=await caches.open(e),s=await a.match(t.request);if(s)return s;try{const e=await async function(e,t={},a=5,s=1e3){let r=a-1;for(;;){try{const a=await fetch(e,t);if(a.ok)return a}catch{}if(--r<0)break;await new Promise((e=>setTimeout(e,s)))}throw new Error("Failed to fetch.")}(t.request);return await a.put(t.request,e.clone()),e}catch{return new Response("Service Unavailable",{status:503})}})())}))})();