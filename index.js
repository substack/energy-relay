var clone = require('clone');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function (energy, opts) {
    return new Relay(clone(energy), opts || {});
};

function Relay (energy, opts) {
    [ 'defend', 'attack', 'storage' ].forEach(function (key) {
        if (!energy[key]) energy[key] = 0;
    });
    this.energy = energy;
    this.delay = opts.delay || 1000;
}

inherits(Relay, EventEmitter);

Relay.prototype.attack = function (defender) {
    var attack = new EventEmitter;
    attack.defender = defender;
    var attacker = attack.attacker = this;
    
    var iv = setInterval(function () {
        var sum = attacker.energy.attack + defender.energy.defend;
        
        var da = Math.ceil(
            Math.log(Math.max(
                1, Math.ceil(Math.pow(2, Math.random() * 4) * sum)
            )) / Math.log(2)
        );
        
        var dd = Math.ceil(
            Math.log(Math.max(
                1, Math.ceil(Math.pow(2, Math.random() * 4) * (sum + 1))
            )) / Math.log(2)
        );
        
        var deltas = {
            attack : da > dd ? 0 : -da,
            defend : dd > da ? 0 : -dd,
        };
        attacker.energy.attack += deltas.attack;
        defender.energy.defend += deltas.defend;
        
        if (attacker.energy.attack < 0) attacker.energy.attack = 0;
        if (defender.energy.defend < 0) defender.energy.defend = 0;
        
        attack.emit('delta', deltas);
        defender.emit('damage', -deltas.defend, attacker);
        attacker.emit('cost', { type : 'attack', value : -deltas.attack });
        
        if (defender.energy.defend === 0) {
            attack.emit('success');
            defender.emit('defeat');
            attack.cancel();
        }
        else if (attacker.energy.attack === 0) {
            attack.emit('failure');
            attack.cancel();
        }
    }, this.delay);
    
    attack.cancel = function () {
        if (!attack.ended) attack.emit('end');
        attack.ended = true;
        clearInterval(iv);
    };
    
    this.on('defeat', function () { attack.cancel() });
    defender.on('defeat', function () { attack.cancel() });
    
    return attack;
};
