import * as readlineSync from 'readline-sync'
import Timer from './Timer'
import {
  DELAY_BOIL_1L,
  DELAY_BOIL_2L,
  DELAY_COOK_WHITE_RICE,
  DELAY_COOK_BROWN_RICE
} from './Constants'

class RiceCooker {
  private waterLevel: number

  constructor () {
    this.waterLevel = 0
  }

  addWater (amount: number): void {
    const maxCapacity = 2
    if (this.waterLevel + amount > maxCapacity) {
      console.log(`Capacité maximale du Rice Cooker atteinte (${maxCapacity} litres).`)
    } else {
      this.waterLevel += amount
      console.log(`${amount} litre(s) d'eau ajouté(s).`)
    }
  }

  async boilWater (waterQuantityChoice: string): Promise<void> {
    const maxCapacity = 2
    const timer = new Timer()

    try {
      const parsedQuantity = parseFloat(waterQuantityChoice)

      if (isNaN(parsedQuantity)) {
        throw new Error('Veuillez entrer une valeur numérique valide.')
      }

      waterQuantityChoice = parsedQuantity.toString()
    } catch (error) {
      const newQuantity = parseFloat(readlineSync.question('Veuillez entrer une valeur numérique valide : '))
      await this.boilWater(newQuantity.toString())
      return
    }

    if (parseFloat(waterQuantityChoice) === 0) {
      console.log("Ajoutez de l'eau d'abord.")
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "))
      await this.boilWater(newQuantity.toString())
      return
    }

    if (parseFloat(waterQuantityChoice) <= 0) {
      console.log("Choix de quantité d'eau non valide.")
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "))
      await this.boilWater(newQuantity.toString())
      return
    }

    if (parseFloat(waterQuantityChoice) > maxCapacity) {
      const newQuantity = parseFloat(readlineSync.question("Entrez une nouvelle quantité d'eau : "))
      await this.boilWater(newQuantity.toString())
      return
    }

    if (parseFloat(waterQuantityChoice) === maxCapacity) {
      console.log(`Attention : Vous avez atteint la capacité maximale du Rice Cooker (${maxCapacity} litres).`)
      const boilingTime = DELAY_BOIL_2L
      console.log(`L'eau bout pendant ${boilingTime} secondes.`)
      console.log("Le Rice Cooker est en train de bouillir de l'eau.")
      await timer.runTimer(boilingTime)
      console.log("L'eau est bouillie.")
      return
    }

    const boilingTime = DELAY_BOIL_1L

    if (boilingTime !== undefined) {
      console.log(`L'eau bout pendant ${boilingTime} secondes.`)
      console.log("Le Rice Cooker est en train de bouillir de l'eau.")
      await timer.runTimer(boilingTime)
      console.log("L'eau est bouillie.")
    } else {
      console.log("Choix de quantité d'eau non valide.")
    }
    this.waterLevel = 0
  }

  async cookRice (riceType: string): Promise<void> {
    if (this.waterLevel === 0) {
      console.log("Ajoutez de l'eau d'abord.")

      while (true) {
        const waterQuantity = parseFloat(readlineSync.question("Entrez la quantité d'eau (en litres, ne dépassez pas 2 litres) : "))
        if (waterQuantity > 0 && waterQuantity <= 2) {
          this.addWater(waterQuantity)
          break
        } else {
          console.log("Quantité d'eau non valide. Assurez-vous que la quantité est comprise entre 0 et 2 litres.")
        }
      }
    }

    const cookingTimes = { 1: DELAY_COOK_WHITE_RICE, 2: DELAY_COOK_BROWN_RICE }

    let riceTypeDisplay: string

    while (true) {
      if (riceType === '1') {
        riceTypeDisplay = 'riz blanc'
        break
      } else if (riceType === '2') {
        riceTypeDisplay = 'riz brun'
        break
      } else {
        console.log("Choix non valide. Veuillez choisir '1' pour 'riz blanc' ou '2' pour 'riz brun'.")
        riceType = readlineSync.question('Entrez à nouveau le type de riz : ')
      }
    }

    const cookingTime = cookingTimes[riceType]

    if (this.waterLevel > 0) {
      console.log(`Le ${riceTypeDisplay} cuit pendant ${cookingTime} secondes.`)
      console.log(`Le RiceCooker est en train de cuire votre ${riceTypeDisplay}`)
      const timer = new Timer()
      await timer.runTimer(cookingTime)
      console.log(`Le ${riceTypeDisplay} est cuit.`)
    } else {
      console.log("Ajoutez de l'eau d'abord.")
    }
    this.waterLevel = 0
  }
}

export default RiceCooker
