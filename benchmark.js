var qtimeit = require('qtimeit');
var qrusage = require('./');

//var getrusage = require('getrusage');
//var microtime = require('microtime');

var floats = new Float64Array(16);
var x;
qtimeit.bench.timeGoal = .5;
qtimeit.bench({
    'q.zero return': function() {
        x = qrusage.binding.zero();
        // 23.1m/s (SKL 4.5g)
    },
/**
    'q.zero poke': function() {
        qrusage.binding.zero(floats);
        x = floats[0];
        // 24.6m/s (SKL 4.5g)
    },
    'process.cpuUsage': function() {
        x = process.cpuUsage();
        // 2.3m/s
    },
    'Date.now': function() {
        x = Date.now();
        // 4.9m/s (was 6m/s with node-v0.10.42)
        // 7.3m/s (SKL 4.5g)
    },
    'cputime': function() {
        x = qrusage.cputime();
        // 2.6m/s (SKL 4.5g)
    },
    'q.cpuUsage': function() {
        x = qrusage.cpuUsage();
        // 920k/s returning an array
        // 2.5m/s poking values into Float64 array
        // 2.7m/s (SKL 4.5g)
    },
**/
    'q.getrusage': function() {
        x = qrusage.getrusage();
        // 200k/s returning a new obj (was 400k/s with node-v0.10.42)
        // 655k/s populating Float64 array (Phenom II 3.6g)
        // 1070k/s (Skylake 4.5g)
    },
    'q.microtime': function() {
        x = qrusage.microtime();
        // 4.8m/s
        // 5.2m/s poking value into Float64 array (Phenom II 3.6g)
        // 7.4m/s (SKL 4.5g)
    },
/**
    'microtime': function() {
        x = microtime.now();
        // 4.8m/s
        // x = microtime.nowDouble();
        // 4.5m/s
        // 7.1m/s (SKL 4.5g)
        // x = microtime.nowStruct();
        // 1.1m/s
    },
    'getrusage': function() {
        x = getrusage.usage();
        // 100k/s
    },
**/
});

console.log(x, floats[0], floats[1]);
