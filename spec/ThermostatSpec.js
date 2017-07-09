describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('has a default temperature of 20 degrees', function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it('has a minimum temperature of 10 degrees', function() {
    expect(thermostat.MIN).toEqual(10);
  });

  it('has a power saving mode on by default', function() {
    expect(thermostat.psmOn).toBe(true);
  });

  describe('get current temperature', function() {
    it('reads the current temperature', function() {
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('up function', function() {
    it('has an up function that can increase the temperature', function() {
      thermostat.up();
      expect(thermostat.temperature).toEqual(21);
    });

    it('can only go up to 25 degrees when power saving mode is on', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();
      }
      spyOn(window, 'alert');
      thermostat.up();
      expect(window.alert).toHaveBeenCalledWith('Cannot go past 25 degrees when psm is on')
    });

    it('can only go up to 32 degrees when power saving mode is off', function() {
      thermostat.switchPsmOff()
      for (var i = 0; i < 12; i++) {
        thermostat.up();
      }
      spyOn(window, 'alert');
      thermostat.up();
      expect(window.alert).toHaveBeenCalledWith('Cannot go past 32 degrees when psm is off')
    });
  });

  describe('down function', function() {
    it('has an down function that can decrease the temperature', function() {
      thermostat.down();
      expect(thermostat.temperature).toEqual(19);
    });

    it('cannot go past the minimum temp', function() {
      for (var i = 0; i < 10; i ++) {
        thermostat.down();
      }
      spyOn(window, 'alert');
      thermostat.down();
      expect(window.alert).toHaveBeenCalledWith('Cannot go lower than 10 degrees')
    });
  });

  describe('minimum temperature check', function() {
    it('can check to see if the current temperature is the same as the minimum temperature', function() {
      for (var i = 0; i < 10; i++) {
        thermostat.down();
      }
      expect(thermostat.isMinTemp()).toBe(true);
    });
  });

  describe('power saving mode', function() {
    it('can turn power saving mode off', function() {
      thermostat.switchPsmOff();
      expect(thermostat.isPsmOn()).toBe(false);
    });

    it('can turn power saving mode on', function() {
      thermostat.switchPsmOff();
      thermostat.switchPsmOn();
      expect(thermostat.isPsmOn()).toBe(true);
    });
  });

  describe('power saving mode check', function() {
    it('can check to see if power saving mode is on', function() {
      expect(thermostat.isPsmOn()).toBe(true);
    });
  });

  describe('reset function', function() {
    it('has a reset function which resets back to 20', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.up();
      }
      thermostat.reset();
      expect(thermostat.temperature).toEqual(20)
    });
  });

  describe('energy usage', function() {
    describe('when temperature is below 18 degrees', function() {
      it('is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });

    describe('when temperature is between 18 and 25 degrees', function() {
      it('is considered medium-usage', function() {
        for (var i = 0; i < 4; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });

    describe('when temperature is above 25 degrees', function() {
      it('is considered high-usage', function() {
        thermostat.switchPsmOff();
        for (var i = 0; i < 10; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});
