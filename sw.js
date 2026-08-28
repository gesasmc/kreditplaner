const VERSION='26';
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{
   let html=await r.text();
   const scripts=['auto-calc.js','loan-options.js','forecast.js','shared-sync.js','ui-fixes.js','required-fields-fix.js','compact-form.js'];
   for(const f of scripts)if(!html.includes(f))html=html.replace('</body>',`<script src="./${f}?v=${VERSION}"></script></body>`);
   return new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
  }));
  return;
 }
 e.respondWith(fetch(e.request,{cache:'no-store'}));
});