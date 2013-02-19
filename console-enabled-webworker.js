
(function(){
// cannot put it ouside clousure and change to var console;
// or it will overwrite window.sonsole in IE.
this.console = this.console || {};

// what methods in console would be enabled.
var fields = 'log debug info error time timeEnd'.split(' ');

// to judge me loaded in html file or in webworker.
var insideWorker = typeof window !== 'object';

if( insideWorker ){
  fields.forEach(function(it){
    console[it] = function(){
      self.postMessage({
        '__msg' : it,
        '__data': Array.prototype.splice.call(arguments, 0)
      });
    };
  });
}else{
  var orignal = Worker.prototype.addEventListener;
  Worker.prototype.addEventListener = function(message, callback){
    if(!this.consoleable){
      this.consoleable = true;
      orignal.call(this, 'message', function(e){
        var data   = e.data;
        var method = data.__msg;
        var args   = data.__data;
        if(!method || !args) return;
        if(typeof console[method] === 'function'){
          console[method].apply(console, args);
        }
        e.stopImmediatePropagation();
      });
    }
    orignal.call(this, message, callback);
  };
}

})();