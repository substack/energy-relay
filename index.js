var clone = require('clone');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = function (energy, opts) {
    return new Relay(clone(energy), opts || {});
};

function Relay (energy, opts) {
    [ 'defend', 'attack', 'throughput', 'radius', 'storage', 'generate' ]
        .forEach(function (key) { if (!energy[key]) energy[key] = 0 })
    ;
    this.energy = energy;
    this.delay = opts.delay || 1000;
}

inherits(Relay, EventEmitter);

Relay.prototype.attack = function (n, target) {
    var self = this;
    
    if (target === undefined) {
        target = n;
        n = self.energy.attack;
    }
    
    var attack = new EventEmitter;
    var iv = setInterval(function () {
        n = Math.min(n, self.energy.attack);
        
        var power = {
            defend : Math.floor((target.energy.defend + 1) * Math.random()),
            attack : Math.floor((n + 1) * Math.random())
        };
        
        var delta = {
            defend : power.attack > power.defend ? - power.attack : 0,
            attack : power.attack > power.defend ? 0 : - power.defend
        };
        
        n += delta.attack;
        self.energy.attack = Math.max(
            0, self.energy.attack + delta.attack
        );
        target.energy.defend = Math.max(
            0, target.energy.defend + delta.defend
        );
        
        attack.emit('damage', -delta.defend);
        
        if (target.energy.defend === 0) {
            attack.emit('success');
            target.emit('defeat');
            attack.cancel();
        }
        else if (n <= 0) {
            attack.cancel();
            attack.emit('failure');
        }
    }, self.delay);
    
    attack.cancel = function () { clearInterval(iv) };
    self.on('defeat', function () { attack.cancel() });
    
    return attack;
};
