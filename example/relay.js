var relay = require('../');

var monster = relay({ attack : 10, defend : 3 });
var tree = relay({ attack : 0, defend : 50 });

var attack = monster.attack(tree);
attack.on('hit', function (damage) {
    console.log([
        'tree took ' + damage + ' damage',
        '  tree:    ' + JSON.stringify(tree.energy),
        '  monster: ' + JSON.stringify(monster.energy),
    ].join('\n'));
});

attack.on('success', function () {
    console.log('tree was defeated');
});
