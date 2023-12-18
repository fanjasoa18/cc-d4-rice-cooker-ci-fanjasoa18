const RiceCooker = require('../rice_cooker');

jest.mock('../timer', () => ({
  runTimer: jest.fn(),
}));

describe('RiceCooker', () => {
  let riceCooker;

  beforeEach(() => {
    riceCooker = new RiceCooker();
  });

  describe('addWater', () => {
    it('should add water within the capacity', () => {
        const initialWaterLevel = riceCooker.waterLevel;
        const addedWater = 1;
    
        riceCooker.addWater(addedWater);
    
        expect(riceCooker.waterLevel).toBe(initialWaterLevel + addedWater);
        expect(console.log).toHaveBeenCalledWith(`${addedWater} litre(s) d'eau ajouté(s).`);
      });
    
      it('should not exceed the maximum capacity', () => {
        const maxCapacity = 2;
        riceCooker.waterLevel = maxCapacity - 1;
        const exceedingWater = 1;
    
        riceCooker.addWater(exceedingWater);
    
        expect(riceCooker.waterLevel).toBe(maxCapacity);
        expect(console.log).toHaveBeenCalledWith(`Capacité maximale du Rice Cooker atteinte (${maxCapacity} litres).`);
      });
    
      it('should not add water if the input is not a valid number', () => {
        const initialWaterLevel = riceCooker.waterLevel;
        const invalidWaterInput = 'not_a_number';
    
        riceCooker.addWater(invalidWaterInput);
    
        expect(riceCooker.waterLevel).toBe(initialWaterLevel);
        expect(console.log).toHaveBeenCalledWith('Veuillez entrer une valeur numérique valide : ');
      });
  });

  describe('boilWater', () => {
    it('should boil water with valid quantity', async () => {
        const validWaterQuantity = '1';
        const boilingTime = 3;
    
        readlineSync.question.mockReturnValueOnce(validWaterQuantity);
    
        await riceCooker.boilWater(validWaterQuantity);
    
        expect(console.log).toHaveBeenCalledWith(`L'eau bout pendant ${boilingTime} secondes.`);
        expect(console.log).toHaveBeenCalledWith("Le Rice Cooker est en train de bouillir de l'eau.");
        expect(Timer.runTimer).toHaveBeenCalledWith(boilingTime);
        expect(console.log).toHaveBeenCalledWith("L'eau est bouillie.");
      });
    
      it('should handle invalid water quantity input', async () => {
        const invalidWaterQuantity = 'not_a_number';
        const validWaterQuantity = '2';
        const boilingTime = 5;
    
        readlineSync.question.mockReturnValueOnce(invalidWaterQuantity).mockReturnValueOnce(validWaterQuantity);
    
        await riceCooker.boilWater(invalidWaterQuantity);
    
        expect(console.log).toHaveBeenCalledWith('Veuillez entrer une valeur numérique valide : ');
        expect(console.log).toHaveBeenCalledWith(`L'eau bout pendant ${boilingTime} secondes.`);
        expect(console.log).toHaveBeenCalledWith("Le Rice Cooker est en train de bouillir de l'eau.");
        expect(Timer.runTimer).toHaveBeenCalledWith(boilingTime);
        expect(console.log).toHaveBeenCalledWith("L'eau est bouillie.");
      });
    
      it('should handle adding water if no water is available', async () => {
        riceCooker.waterLevel = 0;
        const validWaterQuantity = '1';
        const boilingTime = 3;
    
        readlineSync.question.mockReturnValueOnce(validWaterQuantity);
    
        await riceCooker.boilWater(validWaterQuantity);
    
        expect(console.log).toHaveBeenCalledWith("Ajoutez de l'eau d'abord.");
        expect(console.log).toHaveBeenCalledWith(`L'eau bout pendant ${boilingTime} secondes.`);
        expect(console.log).toHaveBeenCalledWith("Le Rice Cooker est en train de bouillir de l'eau.");
        expect(Timer.runTimer).toHaveBeenCalledWith(boilingTime);
        expect(console.log).toHaveBeenCalledWith("L'eau est bouillie.");
      });
  });

  describe('cookRice', () => {
    it('should cook rice with water available', async () => {
        const riceType = '1'; 
        const cookingTime = 7; 
    
        riceCooker.waterLevel = 1; // Set up the riceCooker with water
    
        // Mock user input for rice type
        readlineSync.question.mockReturnValueOnce(riceType);
    
        await riceCooker.cookRice(riceType);
    
        expect(console.log).toHaveBeenCalledWith(`Le riz blanc cuit pendant ${cookingTime} secondes.`);
        expect(console.log).toHaveBeenCalledWith("Le RiceCooker est en train de cuire votre riz blanc");
        expect(Timer.runTimer).toHaveBeenCalledWith(cookingTime);
        expect(console.log).toHaveBeenCalledWith("Le riz blanc est cuit.");
      });
    
      it('should handle invalid rice type input', async () => {
        const invalidRiceType = 'not_a_valid_type';
        const validRiceType = '1'; 
        const cookingTime = 7; 
    
        readlineSync.question.mockReturnValueOnce(invalidRiceType).mockReturnValueOnce(validRiceType);
    
        await riceCooker.cookRice(invalidRiceType);
    
        expect(console.log).toHaveBeenCalledWith("Choix non valide. Veuillez choisir '1' pour 'riz blanc' ou '2' pour 'riz brun'.");
        expect(console.log).toHaveBeenCalledWith(`Le riz blanc cuit pendant ${cookingTime} secondes.`);
        expect(console.log).toHaveBeenCalledWith("Le RiceCooker est en train de cuire votre riz blanc");
        expect(Timer.runTimer).toHaveBeenCalledWith(cookingTime);
        expect(console.log).toHaveBeenCalledWith("Le riz blanc est cuit.");
      });
    });
})
