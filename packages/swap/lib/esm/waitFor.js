var e="function"==typeof setImmediate?setImmediate:setTimeout,t=function(){return new Promise((function(t){e(t)}))};export{t as waitFor};
