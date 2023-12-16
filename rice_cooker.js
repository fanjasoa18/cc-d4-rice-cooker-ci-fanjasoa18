const readlineSync = require('readline-sync');
const Timer = require('./timer');
const {
  DELAY_BOIL_1L,
  DELAY_BOIL_2L,
  DELAY_COOK_WHITE_RICE,
  DELAY_COOK_BROWN_RICE,
} = require('./constants');

class RiceCooker {
  constructor() {
    this.waterLevel = 0;
  }

  addWater(amount) {
    const maxCapacity = 2;
    if (this.waterLevel + amount > maxCapacity) {
      console.log(`Capacité maximale du Rice Cooker atteinte (${maxCapacity} litres).`);
    } else {
      this.waterLevel += amount;
      console.log(`${amount} litre(s) d'eau ajouté(s).`);
    }
  }

  async boilWater(waterQuantityChoice) {
    const maxCapacity = 2;

    try {
      // eslint-disable-next-line no-unused-vars
      const parsedQuantity = parseFloat(waterQuantityChoice);
    } catch (error) {
      const newQuantity = parseFloat(readlineSync.question('Veuillez entrer une valeur numérique valide : '));
      await this.boilWater(newQuantity);
      return;
    }

    if (waterQuantityChoice === 0) {
      console.log("Ajoutez de l'eau d'abord.");
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "));
      await this.boilWater(newQuantity);
      return;
    }

    if (waterQuantityChoice <= 0) {
      console.log("Choix de quantité d'eau non valide.");
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "));
      await this.boilWater(newQuantity);
      return;
    }

    if (waterQuantityChoice > maxCapacity) {
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "));
      await this.boilWater(newQuantity);
      return;
    }

    if (waterQuantityChoice === maxCapacity) {
      console.log(`Attention : Vous avez atteint la capacité maximale du Rice Cooker (${maxCapacity} litres).`);
      const boilingTime = DELAY_BOIL_2L;
      console.log(`L'eau bout pendant ${boilingTime} secondes.`);
      console.log("Le Rice Cooker est en train de bouillir de l'eau.");
      await Timer.runTimer(boilingTime);
      console.log("L'eau est bouillie.");
      return;
    }

    const boilingTime = DELAY_BOIL_1L;

    if (boilingTime !== undefined) {
      console.log(`L'eau bout pendant ${boilingTime} secondes.`);
      console.log("Le Rice Cooker est en train de bouillir de l'eau.");
      await Timer.runTimer(boilingTime);
      console.log("L'eau est bouillie.");
    } else {
      console.log("Choix de quantité d'eau non valide.");
    }
    this.waterLevel = 0;
  }

  async cookRice(riceType) {
    if (this.waterLevel === 0) {
      console.log("Ajoutez de l'eau d'abord.");

      while (true) {
        const waterQuantity = parseFloat(readlineSync.question("Entrez la quantité d'eau (en litres, ne dépassez pas 2 litres) : "));
        if (waterQuantity > 0 && waterQuantity <= 2) {
          this.addWater(waterQuantity);
          break;
        } else {
          console.log("Quantité d'eau non valide. Assurez-vous que la quantité est comprise entre 0 et 2 litres.");
        }
      }
    }

    const cookingTimes = { 1: DELAY_COOK_WHITE_RICE, 2: DELAY_COOK_BROWN_RICE };

    let newRiceType = riceType;
    while (true) {
      if (newRiceType === '1') {
        newRiceType = 'riz blanc';
        break;
      } else if (newRiceType === '2') {
        newRiceType = 'riz brun';
        break;
      } else {
        console.log("Choix non valide. Veuillez choisir '1' pour 'riz blanc' ou '2' pour 'riz brun'.");
        newRiceType = readlineSync.question('Entrez à nouveau le type de riz : ');
      }
    }

    const cookingTime = cookingTimes[riceType];

    if (this.waterLevel > 0) {
      const riceTypeDisplay = riceType === '1' ? 'riz blanc' : 'riz brun';
      console.log(`Le ${riceTypeDisplay} cuit pendant ${cookingTime} secondes.`);
      console.log(`Le RiceCooker est en train de cuire votre ${riceTypeDisplay}`);
      await Timer.runTimer(cookingTime);
      console.log(`Le ${riceTypeDisplay} est cuit.`);
    } else {
      console.log("Ajoutez de l'eau d'abord.");
    }
    this.waterLevel = 0;
  }
}

module.exports = RiceCooker;
