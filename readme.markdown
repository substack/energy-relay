# energy-relay

game mechanics for proximity-based energy relay realtime strategy games

# example

``` js
var relay = require('energy-relay');

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
```

***

```
$ node example/relay.js
tree 0, monster -9
  tree:    {"attack":0,"defend":10,"throughput":0,"radius":0,"storage":0,"generate":0}
  monster: {"attack":91,"defend":3,"throughput":0,"radius":0,"storage":0,"generate":0}
tree 0, monster -7
  tree:    {"attack":0,"defend":10,"throughput":0,"radius":0,"storage":0,"generate":0}
  monster: {"attack":84,"defend":3,"throughput":0,"radius":0,"storage":0,"generate":0}
tree -9, monster 0
  tree:    {"attack":0,"defend":1,"throughput":0,"radius":0,"storage":0,"generate":0}
  monster: {"attack":84,"defend":3,"throughput":0,"radius":0,"storage":0,"generate":0}
tree 0, monster -9
  tree:    {"attack":0,"defend":1,"throughput":0,"radius":0,"storage":0,"generate":0}
  monster: {"attack":75,"defend":3,"throughput":0,"radius":0,"storage":0,"generate":0}
tree -9, monster 0
  tree:    {"attack":0,"defend":0,"throughput":0,"radius":0,"storage":0,"generate":0}
  monster: {"attack":75,"defend":3,"throughput":0,"radius":0,"storage":0,"generate":0}
tree was defeated
```

# install

With [npm](https://npmjs.org) do:

```
npm install energy-relay
```

# license

MIT
