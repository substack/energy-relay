var relay = require('../');
var test = require('tap').test;
var SIZE = 10000;

test('balanced levels', function (t) { 
    t.plan(15);
    
    play(10, 10, function (counts) {
        console.dir([ '10 v 10', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success < 5500);
        t.ok(counts.success > 3500);
    });
    
    play(20, 10, function (counts) {
        console.dir([ '20 v 10', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success > 5500);
        t.ok(counts.success < 8500);
    });
    
    play(50, 10, function (counts) {
        console.dir([ '50 v 10', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success > 9000);
    });
    
    play(100, 10, function (counts) {
        console.dir([ '100 v 10', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success > 9900);
    });
    
    play(100, 100, function (counts) {
        console.dir([ '100 v 100', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success > 3500);
        t.ok(counts.success < 5200);
    });
    
    play(100, 1000, function (counts) {
        console.dir([ '100 v 1000', counts ]);
        t.ok(counts.success + counts.failure === SIZE);
        t.ok(counts.success < 10);
    });
});

function play (a, d, cb) {
    var counts = { success : 0, failure : 0 };
    var pending = SIZE;
    
    for (var i = 0; i < SIZE; i++) {
        var monster = relay({ attack : a, defend : 3 }, { delay : 1 });
        var tree = relay({ attack : 0, defend : d }, { delay : 1 });
        
        var attack = monster.attack(tree);
        
        attack.on('failure', function () {
            counts.failure ++;
            if (--pending === 0) done();
        });
        
        attack.on('success', function () {
            counts.success ++;
            if (--pending === 0) done();
        });
    }
    
    function done () { cb(counts) }
}
