
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
  // current browser dosen't support web worker, do nothing.
  if(!this.Worker) return;

  var OriginalWorker = Worker;
  this.Worker = function(url){
    var worker = new OriginalWorker(url);
    // for each worker instance, we call onmessage at first.
    // if a message is a console message, then we handle it and don't pass it to user's handler.
    worker.addEventListener('message', function(e){
      var data   = e.data;
      var method = data.__msg;
      var args   = data.__data;
      if(!method || !args) return;
      if(typeof console[method] === 'function'){
        console[method].apply(console, args);
      }
      e.stopImmediatePropagation();
    });
    return worker;
  };
  this.Worker.prototype = OriginalWorker.prototype;

  this.Worker.version = '1.0';
}

})();