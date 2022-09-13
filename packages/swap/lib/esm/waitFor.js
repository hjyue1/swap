const e="function"==typeof setImmediate?setImmediate:setTimeout,t=function(){return new Promise((t=>{e(t)}))};export{t as waitFor};
