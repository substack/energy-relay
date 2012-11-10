var relay = require('../');

var monster = relay({ attack : 10, defend : 3 }, { delay : 1 });
var tree = relay({ attack : 0, defend : 10 }, { delay : 1 });

var attack = monster.attack(tree);
attack.on('damage', function (damage) {
    console.log([
        'tree took ' + damage + ' damage',
        '  tree:    ' + JSON.stringify(tree.energy),
        '  monster: ' + JSON.stringify(monster.energy),
    ].join('\n'));
});

attack.on('failure', function () {
    console.log('tree withstood attack, out of attack energy');
});

attack.on('success', function () {
    console.log('tree was defeated');
});
