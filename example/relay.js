var relay = require('../');

var monster = relay({ attack : 100, defend : 3 });
var tree = relay({ attack : 0, defend : 10 });

var attack = monster.attack(tree);
attack.on('delta', function (delta) {
    console.log([
        'tree ' + delta.defend + ', monster ' + delta.attack,
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
