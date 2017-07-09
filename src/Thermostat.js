function Thermostat() {
  this.temperature = 20;
  this.MIN = 10;
  this.psmOn = true;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if (this.psmOn === true && this.temperature === 25) {
    alert('Cannot go past 25 degrees when psm is on')
  } else if (this.psmOn === false && this.temperature === 32) {
    alert('Cannot go past 32 degrees when psm is off')
  } else {
    return (this.temperature += 1);
  }
};

Thermostat.prototype.down = function() {
  if (this.isMinTemp()) {
    alert('Cannot go lower than 10 degrees')
  }
  return (this.temperature -= 1);
};

Thermostat.prototype.isMinTemp = function() {
  return this.temperature === this.MIN;
};

Thermostat.prototype.isPsmOn = function() {
  return this.psmOn === true;
};

Thermostat.prototype.switchPsmOff = function() {
  this.psmOn = false;
};

Thermostat.prototype.switchPsmOn = function() {
  this.psmOn = true;
};
