const INTEGRITY_CHECKSUM="5802a8d7200e44f29212aca1f144ea16",bypassHeaderName="x-swap-bypass";let clients={};function serializeHeaders(e){const s={};return e.forEach(((e,t)=>{s[t]=s[t]?[].concat(s[t]).concat(e):e})),s}function sendToClient(e,s){return new Promise(((t,a)=>{const r=new MessageChannel;r.port1.onmessage=e=>{e.data&&e.data.error?a(e.data.error):t(e.data)},e.postMessage(JSON.stringify(s),[r.port2])}))}function createResponse(e){return new Response(e.payload.body,{...e.payload,headers:e.payload.headers})}function ensureKeys(e,s){return Object.keys(s).reduce(((t,a)=>(e.includes(a)&&(t[a]=s[a]),t)),{})}self.addEventListener("install",(function(){return self.skipWaiting()})),self.addEventListener("activate",(async function(e){return self.clients.claim()})),self.addEventListener("message",(async function(e){const s=e.source.id,t=await e.currentTarget.clients.get(s),a=await self.clients.matchAll(),r=a.map((e=>e.id));switch(e.data){case"KEEPALIVE_REQUEST":sendToClient(t,{type:"KEEPALIVE_RESPONSE"});break;case"INTEGRITY_CHECK_REQUEST":sendToClient(t,{type:"INTEGRITY_CHECK_RESPONSE",payload:INTEGRITY_CHECKSUM});break;case"MOCK_ACTIVATE":clients=ensureKeys(r,clients),clients[s]=!0,sendToClient(t,{type:"MOCKING_ENABLED",payload:!0});break;case"MOCK_DEACTIVATE":clients=ensureKeys(r,clients),clients[s]=!1;break;case"CLIENT_CLOSED":0===a.filter((e=>e.id!==s)).length&&self.registration.unregister();break}})),self.addEventListener("fetch",(function(e){const{clientId:s,request:t}=e,a=t.clone(),r=()=>fetch(a);"navigate"!==t.mode&&"image"!==t.destination&&clients[s]&&("only-if-cached"===t.cache&&"same-origin"!==t.mode||e.respondWith(new Promise((async(n,o)=>{const i=await e.target.clients.get(s);if(!i)return n(r());if("true"===a.headers.get("x-swap-bypass")){const e=serializeHeaders(a.headers);delete e["x-swap-bypass"];const s=new Request(a,{headers:new Headers(e)});return n(fetch(s))}const c=serializeHeaders(t.headers),d=await t.text(),l=await sendToClient(i,{type:"REQUEST",payload:{url:t.url,method:t.method,headers:c,cache:t.cache,mode:t.mode,credentials:t.credentials,destination:t.destination,integrity:t.integrity,redirect:t.redirect,referrer:t.referrer,referrerPolicy:t.referrerPolicy,body:d,bodyUsed:t.bodyUsed,keepalive:t.keepalive}});switch(l.type){case"MOCK_SUCCESS":setTimeout(n.bind(this,createResponse(l)),l.payload.delay);break;case"MOCK_BY_PASS":case"MOCK_NOT_FOUND":return n(r());case"NETWORK_ERROR":{const{name:e,message:s}=l.payload,t=new Error(s);return t.name=e,o(t)}case"INTERNAL_ERROR":{const e=JSON.parse(l.payload.body);return console.error(`[SWAP] Request handler function for "%s %s" has thrown the following exception:\n\n${e.errorType}: ${e.message}\n(see more detailed error stack trace in the mocked response body)\n\nThis exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error.\n  `,t.method,t.url),n(createResponse(l))}}})).catch((e=>{console.error('[SWAP] Failed to mock a "%s" request to "%s": %s',t.method,t.url,e)}))))}));