import RiceCooker from '../Rice__cooker';
import Timer from '../Timer';

// Mockez la classe Timer
jest.mock('../Timer', () => ({
  runTimer: jest.fn(),
}));

describe('RiceCooker', () => {
  let riceCooker: RiceCooker;

  beforeEach(() => {
    riceCooker = new RiceCooker();
  });

  describe('Add water', () => {
    test('cookRice cooks white rice correctly', async () => {
        jest.setTimeout(7000);
        jest.spyOn(console, 'log').mockImplementation(() => {});
        riceCooker.addWater(1);
        await riceCooker.cookRice('1');
        expect(console.log).toHaveBeenCalledTimes(3);
      });
    
      test('cookRice handles invalid rice type correctly', async () => {
        jest.setTimeout(10000);
        jest.spyOn(console, 'log').mockImplementation(() => {});
        riceCooker.addWater(1);
        await riceCooker.cookRice('3');
        expect(console.log).toHaveBeenCalledTimes(2);
      });
  })

  describe('RiceCooker boil water', () => {
  
    test('boilWater should handle water level 1', async () => {
      const timerInstance = new Timer();
      jest.spyOn(timerInstance, 'runTimer').mockResolvedValueOnce(undefined);
  
      await riceCooker.boilWater('1');
      
      expect(riceCooker.getWaterLevel()).toEqual(1);
      expect(timerInstance.runTimer).toHaveBeenCalledWith(3);
    });
  
    test('boilWater should handle water level 2', async () => {
      const timerInstance = new Timer();
      jest.spyOn(timerInstance, 'runTimer').mockResolvedValueOnce(undefined);
  
      await riceCooker.boilWater('2');
      
      expect(riceCooker.getWaterLevel()).toEqual(2);
      expect(timerInstance.runTimer).toHaveBeenCalledWith(5);
    });
  });

  describe('cookRice method', () => {
    test('cooks white rice correctly', async () => {
      // Mockez le console.log pour éviter les sorties indésirables dans les tests
      jest.spyOn(console, 'log').mockImplementation(() => {});
      riceCooker.addWater(1);
      await riceCooker.cookRice('1');
      expect(console.log).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenCalledWith('Méthode de cuisson du riz blanc');
    });

    test('handles invalid rice type correctly', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {});
      riceCooker.addWater(1);
      await riceCooker.cookRice('3');

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith('Type de riz non valide');
    });
  });

});


