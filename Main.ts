import * as readline from 'readline-sync'
import RiceCooker from './Rice__cooker'

async function main (): Promise<void> {
  const riceCooker: RiceCooker = new RiceCooker()

  try {
    let exitProgram: boolean = false

    while (!exitProgram) {
      console.log('\nMenu:')
      console.log("1 - Faire bouillir de l'eau")
      console.log('2 - Cuisiner du riz')
      console.log('0 - Quitter')

      const choice: string = readline.question('Choisissez une option : ')

      switch (choice) {
        case '1': {
          const waterQuantityChoice: string = readline.question("Choisissez la quantité d'eau (1 pour 1 litre, 2 pour 2 litres) : ")
          await riceCooker.boilWater(waterQuantityChoice).catch((error) => {
            console.error(`Erreur lors de l'ébullition de l'eau : ${error.message}`)
          })
          break
        }
        case '2': {
          const riceType: string = readline.question('Choisissez le type de riz (1(riz blanc) / 2(riz brun) : ')
          await riceCooker.cookRice(riceType).catch((error) => {
            console.error(`Erreur lors de la cuisson du riz : ${error.message}`)
          })
          break
        }
        case '0': {
          console.log('Au revoir !')
          exitProgram = true
          break
        }
        default: {
          console.log('Option non valide. Veuillez choisir à nouveau.')
          break
        }
      }
    }
  } catch (error) {
    console.log("\nProgramme interrompu par l'utilisateur. Au revoir!")
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  void main()
}
