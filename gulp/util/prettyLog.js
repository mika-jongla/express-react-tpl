var colors = require('colors');

function timeStamp(date){
  var h = date.getHours()
    , min = date.getMinutes() 
    , secs = date.getSeconds();

  return [
    h    < 10 ? '0' + h    : h,
    min  < 10 ? '0' + min  : min,
    secs < 10 ? '0' + secs : secs,
  ].join(':');   
}

function log(name, startTime) {
  var now = new Date()
    , stamp = timeStamp(now)
    , delta = (now.getTime() - startTime) + ' ms';

  console.log(
    '[' + stamp.gray + ']', 
    'Rebundled ' + name.red, 
    'after', delta.magenta
  );
};

// Test
//log('test', Date.now());

module.exports = log;
