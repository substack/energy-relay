var relay = require('../');

var counts = { success : 0, failure : 0 };
var pending = 1000;

for (var i = 0; i < 10000; i++) {
    var monster = relay({ attack : 11, defend : 3 }, { delay : 1 });
    var tree = relay({ attack : 0, defend : 10 }, { delay : 1 });
    
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

function done () {
    console.dir(counts);
}
