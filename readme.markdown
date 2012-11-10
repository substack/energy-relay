# energy-relay

game mechanics for proximity-based energy relay realtime strategy games

[![build status](https://secure.travis-ci.org/substack/energy-relay.png)](http://travis-ci.org/substack/energy-relay)

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

# methods

``` js
var relay = require('energy-relay')
```

## var unit = relay(energy, opts={})

Create a game `unit` with an `energy` levels object. The energy keys are:

* defend
* attack
* storage

Specify `opts.delay` to set the amount of time between attack event.

## var attack = unit.attack(defender)

Attack the `defender` relay with `unit`, returning an attack object.

## attack.cancel()

Cancel an active `attack`.

# events

## attack.on('delta', function (deltas) {})

For the `attack` in progress, emit a `'delta'` with `'attack'` and `'defend'`
keys every time the energy levels for the attacker or defender change.

## attack.on('success', function () {})

When an `attack` was successful, the `'success'` event fires.

## attack.on('failure', function () {})

When an `attack` was unsuccessful because the attacker ran out of attack energy,
the `'failure'` event is emitted.

## attack.on('end', function () {})

When an attack is over for whatever reason, the `'end'` event fires.

## unit.on('damage', function (damage, attacker) {})

When a `unit` gets attacked, a `'damage'` event is emitted with the amount of
damage as an integer and the `attacker` unit responsible for the damage.

## unit.on('cost', function (cost) {})

When a `unit` spends energy on attacks or transfers, the `'cost'` event gets
emitted with the `'cost.type'` of transfer (`'attack'` or `'transfer'`) and the
`cost.value` amount of energy.

# install

With [npm](https://npmjs.org) do:

```
npm install energy-relay
```

# license

MIT
