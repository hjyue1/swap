import{c as t,a as e,i as n,k as r,l as o,j as s,h as a,_ as i,b as h,e as u,s as c,f as l,g as f,o as p,q as m,t as d,n as v,x as y}from"./xml-deps.js";function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function b(t,e,n,r,o,s,a){try{var i=t[s](a),h=i.value}catch(t){return void n(t)}i.done?e(h):Promise.resolve(h).then(r,o)}function w(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var s=t.apply(e,n);function a(t){b(s,r,o,a,i,"next",t)}function i(t){b(s,r,o,a,i,"throw",t)}a(void 0)}))}}function x(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e,n){return e&&j(t.prototype,e),n&&j(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function A(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,o,s=[],a=!0,i=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(s.push(r.value),!e||s.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return s}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return C(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return C(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var E=t((function(t,n){!function(r){var o=n&&!n.nodeType&&n,s=t&&!t.nodeType&&t,a="object"==g(e)&&e;a.global!==a&&a.window!==a&&a.self!==a||(r=a);var i,h,u=2147483647,c=36,l=/^xn--/,f=/[^\x20-\x7E]/,p=/[\x2E\u3002\uFF0E\uFF61]/g,m={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},d=Math.floor,v=String.fromCharCode;function y(t){throw RangeError(m[t])}function b(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}function w(t,e){var n=t.split("@"),r="";return n.length>1&&(r=n[0]+"@",t=n[1]),r+b((t=t.replace(p,".")).split("."),e).join(".")}function x(t){for(var e,n,r=[],o=0,s=t.length;o<s;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<s?56320==(64512&(n=t.charCodeAt(o++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--):r.push(e);return r}function j(t){return b(t,(function(t){var e="";return t>65535&&(e+=v((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=v(t)})).join("")}function O(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function A(t,e,n){var r=0;for(t=n?d(t/700):t>>1,t+=d(t/e);t>455;r+=c)t=d(t/35);return d(r+36*t/(t+38))}function C(t){var e,n,r,o,s,a,i,h,l,f,p,m=[],v=t.length,g=0,b=128,w=72;for((n=t.lastIndexOf("-"))<0&&(n=0),r=0;r<n;++r)t.charCodeAt(r)>=128&&y("not-basic"),m.push(t.charCodeAt(r));for(o=n>0?n+1:0;o<v;){for(s=g,a=1,i=c;o>=v&&y("invalid-input"),((h=(p=t.charCodeAt(o++))-48<10?p-22:p-65<26?p-65:p-97<26?p-97:c)>=c||h>d((u-g)/a))&&y("overflow"),g+=h*a,!(h<(l=i<=w?1:i>=w+26?26:i-w));i+=c)a>d(u/(f=c-l))&&y("overflow"),a*=f;w=A(g-s,e=m.length+1,0==s),d(g/e)>u-b&&y("overflow"),b+=d(g/e),g%=e,m.splice(g++,0,b)}return j(m)}function E(t){var e,n,r,o,s,a,i,h,l,f,p,m,g,b,w,j=[];for(m=(t=x(t)).length,e=128,n=0,s=72,a=0;a<m;++a)(p=t[a])<128&&j.push(v(p));for(r=o=j.length,o&&j.push("-");r<m;){for(i=u,a=0;a<m;++a)(p=t[a])>=e&&p<i&&(i=p);for(i-e>d((u-n)/(g=r+1))&&y("overflow"),n+=(i-e)*g,e=i,a=0;a<m;++a)if((p=t[a])<e&&++n>u&&y("overflow"),p==e){for(h=n,l=c;!(h<(f=l<=s?1:l>=s+26?26:l-s));l+=c)w=h-f,b=c-f,j.push(v(O(f+w%b,0))),h=d(w/b);j.push(v(O(h,0))),s=A(n,g,r==o),n=0,++r}++n,++e}return j.join("")}if(i={version:"1.3.2",ucs2:{decode:x,encode:j},decode:C,encode:E,toASCII:function(t){return w(t,(function(t){return f.test(t)?"xn--"+E(t):t}))},toUnicode:function(t){return w(t,(function(t){return l.test(t)?C(t.slice(4).toLowerCase()):t}))}},o&&s)if(t.exports==o)s.exports=i;else for(h in i)i.hasOwnProperty(h)&&(o[h]=i[h]);else r.punycode=i}(e)})),q=function(t){return"string"==typeof t},R=function(t){return"object"===g(t)&&null!==t},P=function(t){return null===t},S=function(t){return null==t};function T(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var I=function(t,e,n,r){e=e||"&",n=n||"=";var o={};if("string"!=typeof t||0===t.length)return o;var s=/\+/g;t=t.split(e);var a=1e3;r&&"number"==typeof r.maxKeys&&(a=r.maxKeys);var i=t.length;a>0&&i>a&&(i=a);for(var h=0;h<i;++h){var u,c,l,f,p=t[h].replace(s,"%20"),m=p.indexOf(n);m>=0?(u=p.substr(0,m),c=p.substr(m+1)):(u=p,c=""),l=decodeURIComponent(u),f=decodeURIComponent(c),T(o,l)?Array.isArray(o[l])?o[l].push(f):o[l]=[o[l],f]:o[l]=f}return o},k=function(t){switch(g(t)){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}},U=function(t,e,n,r){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"===g(t)?Object.keys(t).map((function(r){var o=encodeURIComponent(k(r))+n;return Array.isArray(t[r])?t[r].map((function(t){return o+encodeURIComponent(k(t))})).join(e):o+encodeURIComponent(k(t[r]))})).join(e):r?encodeURIComponent(k(r))+n+encodeURIComponent(k(t)):""},H=t((function(t,e){e.decode=e.parse=I,e.encode=e.stringify=U})),L=function(t){q(t)&&(t=J(t));return t instanceof $?t.format():$.prototype.format.call(t)};function $(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}var F=/^([a-z0-9.+-]+:)/i,D=/:[0-9]*$/,W=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,_=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),B=["'"].concat(_),N=["%","/","?",";","#"].concat(B),z=["/","?","#"],M=/^[+a-z0-9A-Z_-]{0,63}$/,G=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,K={javascript:!0,"javascript:":!0},Z={javascript:!0,"javascript:":!0},Q={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function J(t,e,n){if(t&&R(t)&&t instanceof $)return t;var r=new $;return r.parse(t,e,n),r}$.prototype.parse=function(t,e,n){if(!q(t))throw new TypeError("Parameter 'url' must be a string, not "+g(t));var r=t.indexOf("?"),o=-1!==r&&r<t.indexOf("#")?"?":"#",s=t.split(o);s[0]=s[0].replace(/\\/g,"/");var a=t=s.join(o);if(a=a.trim(),!n&&1===t.split("#").length){var i=W.exec(a);if(i)return this.path=a,this.href=a,this.pathname=i[1],i[2]?(this.search=i[2],this.query=e?H.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var h=F.exec(a);if(h){var u=(h=h[0]).toLowerCase();this.protocol=u,a=a.substr(h.length)}if(n||h||a.match(/^\/\/[^@\/]+@[^@\/]+/)){var c="//"===a.substr(0,2);!c||h&&Z[h]||(a=a.substr(2),this.slashes=!0)}if(!Z[h]&&(c||h&&!Q[h])){for(var l,f,p=-1,m=0;m<z.length;m++){-1!==(d=a.indexOf(z[m]))&&(-1===p||d<p)&&(p=d)}-1!==(f=-1===p?a.lastIndexOf("@"):a.lastIndexOf("@",p))&&(l=a.slice(0,f),a=a.slice(f+1),this.auth=decodeURIComponent(l)),p=-1;for(m=0;m<N.length;m++){var d;-1!==(d=a.indexOf(N[m]))&&(-1===p||d<p)&&(p=d)}-1===p&&(p=a.length),this.host=a.slice(0,p),a=a.slice(p),this.parseHost(),this.hostname=this.hostname||"";var v="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!v)for(var y=this.hostname.split(/\./),b=(m=0,y.length);m<b;m++){var w=y[m];if(w&&!w.match(M)){for(var x="",j=0,O=w.length;j<O;j++)w.charCodeAt(j)>127?x+="x":x+=w[j];if(!x.match(M)){var A=y.slice(0,m),C=y.slice(m+1),R=w.match(G);R&&(A.push(R[1]),C.unshift(R[2])),C.length&&(a="/"+C.join(".")+a),this.hostname=A.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),v||(this.hostname=E.toASCII(this.hostname));var P=this.port?":"+this.port:"",S=this.hostname||"";this.host=S+P,this.href+=this.host,v&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==a[0]&&(a="/"+a))}if(!K[u])for(m=0,b=B.length;m<b;m++){var T=B[m];if(-1!==a.indexOf(T)){var I=encodeURIComponent(T);I===T&&(I=escape(T)),a=a.split(T).join(I)}}var k=a.indexOf("#");-1!==k&&(this.hash=a.substr(k),a=a.slice(0,k));var U=a.indexOf("?");if(-1!==U?(this.search=a.substr(U),this.query=a.substr(U+1),e&&(this.query=H.parse(this.query)),a=a.slice(0,U)):e&&(this.search="",this.query={}),a&&(this.pathname=a),Q[u]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){P=this.pathname||"";var L=this.search||"";this.path=P+L}return this.href=this.format(),this},$.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,s="";this.host?o=t+this.host:this.hostname&&(o=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&R(this.query)&&Object.keys(this.query).length&&(s=H.stringify(this.query));var a=this.search||s&&"?"+s||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||Q[e])&&!1!==o?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),n=n.replace(/[?#]/g,(function(t){return encodeURIComponent(t)})),e+o+n+(a=a.replace("#","%23"))+r},$.prototype.resolve=function(t){return this.resolveObject(J(t,!1,!0)).format()},$.prototype.resolveObject=function(t){if(q(t)){var e=new $;e.parse(t,!1,!0),t=e}for(var n=new $,r=Object.keys(this),o=0;o<r.length;o++){var s=r[o];n[s]=this[s]}if(n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol){for(var a=Object.keys(t),i=0;i<a.length;i++){var h=a[i];"protocol"!==h&&(n[h]=t[h])}return Q[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(t.protocol&&t.protocol!==n.protocol){if(!Q[t.protocol]){for(var u=Object.keys(t),c=0;c<u.length;c++){var l=u[c];n[l]=t[l]}return n.href=n.format(),n}if(n.protocol=t.protocol,t.host||Z[t.protocol])n.pathname=t.pathname;else{for(var f=(t.pathname||"").split("/");f.length&&!(t.host=f.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==f[0]&&f.unshift(""),f.length<2&&f.unshift(""),n.pathname=f.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var p=n.pathname||"",m=n.search||"";n.path=p+m}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var d=n.pathname&&"/"===n.pathname.charAt(0),v=t.host||t.pathname&&"/"===t.pathname.charAt(0),y=v||d||n.host&&t.pathname,g=y,b=n.pathname&&n.pathname.split("/")||[],w=(f=t.pathname&&t.pathname.split("/")||[],n.protocol&&!Q[n.protocol]);if(w&&(n.hostname="",n.port=null,n.host&&(""===b[0]?b[0]=n.host:b.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===f[0]?f[0]=t.host:f.unshift(t.host)),t.host=null),y=y&&(""===f[0]||""===b[0])),v)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,b=f;else if(f.length)b||(b=[]),b.pop(),b=b.concat(f),n.search=t.search,n.query=t.query;else if(!S(t.search)){if(w)n.hostname=n.host=b.shift(),(C=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=C.shift(),n.host=n.hostname=C.shift());return n.search=t.search,n.query=t.query,P(n.pathname)&&P(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!b.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var x=b.slice(-1)[0],j=(n.host||t.host||b.length>1)&&("."===x||".."===x)||""===x,O=0,A=b.length;A>=0;A--)"."===(x=b[A])?b.splice(A,1):".."===x?(b.splice(A,1),O++):O&&(b.splice(A,1),O--);if(!y&&!g)for(;O--;O)b.unshift("..");!y||""===b[0]||b[0]&&"/"===b[0].charAt(0)||b.unshift(""),j&&"/"!==b.join("/").substr(-1)&&b.push("");var C,E=""===b[0]||b[0]&&"/"===b[0].charAt(0);w&&(n.hostname=n.host=E?"":b.length?b.shift():"",(C=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=C.shift(),n.host=n.hostname=C.shift()));return(y=y||n.host&&b.length)&&!E&&b.unshift(""),b.length?n.pathname=b.join("/"):(n.pathname=null,n.path=null),P(n.pathname)&&P(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},$.prototype.parseHost=function(){var t=this.host,e=D.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)};var V=function(t){return t.referrer.startsWith(t.url.origin)?t.url.pathname:L({protocol:t.url.protocol,host:t.url.host,pathname:t.url.pathname})};function X(t,e){return t.toLowerCase()===e.toLowerCase()}function Y(t){return t<300?"#69AB32":t<400?"#F0BB4B":"#E95F5D"}function tt(){var t=new Date;return[t.getHours(),t.getMinutes(),t.getSeconds()].map(String).map((function(t){return t.slice(0,2)})).map((function(t){return t.padStart(2,"0")})).join(":")}function et(t){return n(n({},t),{headers:t.headers.all()})}function nt(t){var e,n,r=o.stringToHeaders(t),s=r.get("content-type")||"text/plain",a=r.get("content-disposition");if(!a)throw new Error('"Content-Disposition" header is required.');var i=a.split(";").reduce((function(t,e){var n=e.trim().split("="),r=n[0],o=n.slice(1);return t[r]=o.join("="),t}),{});return{name:null===(e=i.name)||void 0===e?void 0:e.slice(1,-1),filename:null===(n=i.filename)||void 0===n?void 0:n.slice(1,-1),contentType:s}}function rt(t,e){if(t){var n=null==e?void 0:e.get("content-type");return(null==n?void 0:n.startsWith("multipart/form-data"))&&"object"!=typeof t?function(t,e){var n=null==e?void 0:e.get("content-type");if(n){var o=n.split(/; */).slice(1).filter((function(t){return t.startsWith("boundary=")})).map((function(t){return t.replace(/^boundary=/,"")}))[0];if(o){var s=new RegExp("--+".concat(o)),a=t.split(s).filter((function(t){return t.startsWith("\r\n")&&t.endsWith("\r\n")})).map((function(t){return t.trimStart().replace(/\r\n$/,"")}));if(a.length){var i={};try{for(var h=0,u=a;h<u.length;h++){var c=u[h].split("\r\n\r\n"),l=c[0],f=c.slice(1).join("\r\n\r\n"),p=nt(l),m=p.contentType,d=p.filename,v=p.name,y=void 0===d?f:new File([f],d,{type:m}),g=i[v];void 0===g?i[v]=y:Array.isArray(g)?i[v]=r(r([],g,!0),[y],!1):i[v]=[g,y]}return i}catch(t){return}}}}}(t,e)||t:(null==n?void 0:n.includes("json"))&&"object"!=typeof t&&s(t)||t}return t}function ot(t){var e=o.listToHeaders(t.headers);return n(n({},t),{body:rt(t.body,e)})}var st=function(t,e){var n=t instanceof RegExp?t:function(t){var e=t.replace(/\./g,"\\.").replace(/\//g,"/").replace(/\?/g,"\\?").replace(/\/+$/,"").replace(/\*+/g,".*").replace(/:([^\d|^\/][a-zA-Z0-9_]*(?=(?:\/|\\.)|$))/g,(function(t,e){return"(?<".concat(e,">[^/]+?)")})).concat("(\\/|$)");return new RegExp(e,"gi")}(t),r=n.exec(e)||!1,o=t instanceof RegExp?!!r:!!r&&r[0]===r.input;return{matches:o,params:r&&o&&r.groups||null}},at=t((function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.getCleanUrl=void 0,e.getCleanUrl=function(t,e){return void 0===e&&(e=!0),[e&&t.origin,t.pathname].filter(Boolean).join("")}})),it=function(t){var e="undefined"!=typeof location;return"string"==typeof t&&t.startsWith("/")?"".concat(e?location.origin:"").concat(t):t};function ht(t){if(t instanceof RegExp||t.includes("*"))return t;try{return new URL(it(t))}catch(e){return t}}function ut(t,e){var n=function(t){return t instanceof URL?at.getCleanUrl(t):t instanceof RegExp?t:it(t)}(ht(e)),r=at.getCleanUrl(t);return st(n,r)}function ct(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return t.reduceRight((function(t,e){return t instanceof Promise?Promise.resolve(t).then(e):e(t)}),e[0])}}var lt=function(t){function e(e){var n=t.call(this,e)||this;return n.name="NetworkError",n}return a(e,t),e}(Error),ft={status:200,statusText:"OK",body:null,delay:0,once:!1},pt=[];function mt(t,e){var n=this;return void 0===e&&(e=pt),function(){for(var s=[],a=0;a<arguments.length;a++)s[a]=arguments[a];return i(n,void 0,void 0,(function(){var n,a;return h(this,(function(i){return n=Object.assign({},ft,{headers:new o.Headers({"x-powered-by":"swap","access-control-allow-origin":"*","access-control-allow-credentials":"true"})},t),a=r(r([],e,!0),s,!0).filter(Boolean),[2,a.length>0?ct.apply(void 0,a)(n):n]}))}))}}var dt=Object.assign(mt(),{once:mt({once:!0}),networkError:function(t){throw new lt(t)}});var vt,yt={status:u,set:c,delay:l,fetch:f},gt=function(){function t(t){this.shouldSkip=!1,this.ctx=t.ctx||yt,this.resolver=t.resolver;var e=function(){var t=((new Error).stack||"").split("\n"),e=/(node_modules)?[\/\\]lib[\/\\](umd|esm|iief|cjs)[\/\\]|^[^\/\\]*$/,n=t.slice(1).find((function(t){return!e.test(t)}));if(n)return n.replace(/\s*at [^()]*\(([^)]+)\)/,"$1").replace(/^@/,"")}();this.info=n(n({},t.info),{callFrame:e})}return t.prototype.parse=function(t){return null},t.prototype.test=function(t){return this.predicate(t,this.parse(t))},t.prototype.getPublicRequest=function(t,e){return t},t.prototype.markAsSkipped=function(t){void 0===t&&(t=!0),this.shouldSkip=t},t.prototype.run=function(t){return i(this,void 0,void 0,(function(){var e,n,r;return h(this,(function(o){switch(o.label){case 0:return this.shouldSkip?[2,null]:(e=this.parse(t),this.predicate(t,e)?(n=this.getPublicRequest(t,e),[4,this.resolver(n,dt,this.ctx)]):[2,null]);case 1:return r=o.sent(),[2,this.createExecutionResult(e,n,r)]}}))}))},t.prototype.createExecutionResult=function(t,e,n){return{handler:this,parsedResult:t||null,request:e,response:n||null}},t}();!function(t){t.HEAD="HEAD",t.GET="GET",t.POST="POST",t.PUT="PUT",t.PATCH="PATCH",t.OPTIONS="OPTIONS",t.DELETE="DELETE"}(vt||(vt={}));var bt={set:c,status:u,cookie:p,body:m,text:d,json:v,xml:y,delay:l,fetch:f},wt=function(t){function e(e,n,r){var o=t.call(this,{info:{header:"".concat(e," ").concat(n),mask:n,method:e},ctx:bt,resolver:r})||this;return o.checkRedundantQueryParameters(),o}return a(e,t),e.prototype.checkRedundantQueryParameters=function(){var t=this.info,e=t.method,n=t.mask,r=ht(n);if(r instanceof URL&&""!==r.search){var o=[];r.searchParams.forEach((function(t,e){o.push(e)})),console.warn('[SWAP] Found a redundant usage of query parameters in the request handler URL for "'.concat(e," ").concat(n,'". Please match against a path instead, and access query parameters in the response resolver function:\n\nrest.').concat(e.toLowerCase(),'("').concat(r.pathname,'", (req, res, ctx) => {\n  const query = req.url.searchParams\n').concat(o.map((function(t){return"  const ".concat(t,' = query.get("').concat(t,'")')})).join("\n"),"\n})      "))}},e.prototype.parse=function(t){return ut(t.url,this.info.mask)},e.prototype.getPublicRequest=function(t,e){return n(n({},t),{params:e.params||{}})},e.prototype.predicate=function(t,e){return X(this.info.method,t.method)&&e.matches},e.prototype.log=function(t,e){var n=V(t),r=et(t),o=ot(e);console.groupCollapsed("[SWAP] %s %s %s (%c%s%c)",tt(),t.method,n,"color:".concat(Y(e.status)),e.status,"color:inherit"),console.log("Request",r),console.log("Handler:",{mask:this.info.mask,resolver:this.resolver}),console.log("Response",o),console.groupEnd()},e}(gt);function xt(t){return function(e,n){return new wt(t,e,n)}}var jt={head:xt(vt.HEAD),get:xt(vt.GET),post:xt(vt.POST),put:xt(vt.PUT),delete:xt(vt.DELETE),patch:xt(vt.PATCH),options:xt(vt.OPTIONS)};export{lt as N,gt as R,g as _,w as a,ot as b,tt as c,Y as d,wt as e,O as f,V as g,x as h,X as i,A as j,rt as k,ft as l,ut as m,mt as n,yt as o,et as p,jt as q,dt as r,vt as s,bt as t,ct as u};
