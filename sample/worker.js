importScripts('../console-enabled-webworker.js');

self.onmessage = function(e){
  console.time(totalTime);
  var data = e.data;
  if(data.task && typeof handler[data.task] === 'function'){
    handler[data.task](data);
  }else{
    console.error('No handler for task: ' + data.task);
  }
  console.timeEnd(totalTime);
};

var totalTime = 'Total time: ';
var handler = {};

handler.summation = function(data){
  var begin  = data.begin;
  var end    = data.end;
  var result = 0;
  for(var i = begin; i < end; i++){
    result += i;
  }
  self.postMessage({
    id    : data.id,
    task  : data.task,
    result: result
  });
  console.log('begin: '  + begin);
  console.log('end: '    + end);
  console.log('result: ' + result);
};