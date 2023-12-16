const readlineSync = require('readline-sync');
const RiceCooker = require('./rice_cooker');

async function main() {
  const riceCooker = new RiceCooker();
  let exitProgram = false;

  async function processChoice() {
    console.log('\nMenu:');
    console.log("1 - Faire bouillir de l'eau");
    console.log('2 - Cuisiner du riz');
    console.log('0 - Quitter');

    const choice = readlineSync.question('Choisissez une option : ');

    switch (choice) {
      case '1': {
        const waterQuantityChoice = readlineSync.question("Choisissez la quantité d'eau (1 pour 1 litre, 2 pour 2 litres) : ");
        await riceCooker.boilWater(waterQuantityChoice);
        break;
      }
      case '2': {
        const riceType = readlineSync.question('Choisissez le type de riz (1(riz blanc) / 2(riz brun) : ');
        await riceCooker.cookRice(riceType);
        break;
      }
      case '0':
        console.log('Au revoir !');
        exitProgram = true;
        break;
      default:
        console.log('Option non valide. Veuillez choisir à nouveau.');
        break;
    }

    if (!exitProgram) {
      await processChoice();
    }
  }

  try {
    await processChoice();
  } catch (error) {
    console.log("\nProgramme interrompu par l'utilisateur. Au revoir!");
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  main();
}
