import java.util.Scanner;

public class RiceCooker {
    private double waterLevel;

    public RiceCooker() {
        this.waterLevel = 0;
    }

    public void addWater(double amount) {
        final double maxCapacity = 2.0;
        if (this.waterLevel + amount > maxCapacity) {
            System.out.printf("Capacité maximale du Rice Cooker atteinte (%.1f litres).%n", maxCapacity);
        } else {
            this.waterLevel += amount;
            System.out.printf("%.1f litre(s) d'eau ajouté(s).%n", amount);
        }
    }

    public void boilWater(double waterQuantityChoice) {
        final double maxCapacity = 2.0;

        try {
            waterQuantityChoice = Double.parseDouble(String.valueOf(waterQuantityChoice));
        } catch (NumberFormatException e) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Veuillez entrer une valeur numérique valide : ");
            double newQuantity = scanner.nextDouble();
            boilWater(newQuantity);
            return;
        }

        if (waterQuantityChoice == 0) {
            System.out.println("Ajoutez de l'eau d'abord.");
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez une nouvelle quantité d'eau : ");
            double newQuantity = scanner.nextDouble();
            boilWater(newQuantity);
            return;
        }

        if (waterQuantityChoice <= 0) {
            System.out.println("Choix de quantité d'eau non valide.");
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez une nouvelle quantité d'eau : ");
            double newQuantity = scanner.nextDouble();
            boilWater(newQuantity);
            return;
        }

        if (waterQuantityChoice > maxCapacity) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez une nouvelle quantité d'eau : ");
            double newQuantity = scanner.nextDouble();
            boilWater(newQuantity);
            return;
        }

        if (waterQuantityChoice == maxCapacity) {
            System.out.printf("Attention : Vous avez atteint la capacité maximale du Rice Cooker (%.1f litres).%n", maxCapacity);
            int boilingTime = Constant.DELAY_BOIL_2L;
            System.out.printf("L'eau bout pendant %d secondes.%n", boilingTime);
            System.out.println("Le Rice Cooker est en train de bouillir de l'eau.");
            Timer.runTimer(boilingTime);
            System.out.println("L'eau est bouillie.");
            return;
        }

        int boilingTime = Constant.DELAY_BOIL_1L;

        System.out.printf("L'eau bout pendant %d secondes.%n", boilingTime);
        System.out.println("Le Rice Cooker est en train de bouillir de l'eau.");
        Timer.runTimer(boilingTime);
        System.out.println("L'eau est bouillie.");
        this.waterLevel = 0;
    }

    public void cookRice(String riceType) {
        if (this.waterLevel == 0) {
            System.out.println("Ajoutez de l'eau d'abord.");

            while (true) {
                Scanner scanner = new Scanner(System.in);
                System.out.print("Entrez la quantité d'eau (en litres, ne dépassez pas 2 litres) : ");
                double waterQuantity = scanner.nextDouble();

                if (0 < waterQuantity && waterQuantity <= 2) {
                    addWater(waterQuantity);
                    break;
                } else {
                    System.out.println("Quantité d'eau non valide. Assurez-vous que la quantité est comprise entre 0 et 2 litres.");
                }
            }
        }

        int cookingTime;
        if ("1".equals(riceType) || "2".equals(riceType)) {
            cookingTime = "1".equals(riceType) ? Constant.DELAY_COOK_WHITE_RICE : Constant.DELAY_COOK_BROWN_RICE;
        } else {
            System.out.println("Choix non valide. Veuillez choisir '1' pour 'riz blanc' ou '2' pour 'riz brun'.");
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez à nouveau le type de riz : ");
            riceType = scanner.nextLine();
            cookRice(riceType);
            return;
        }

        if (this.waterLevel > 0) {
            String riceTypeDisplay = "1".equals(riceType) ? "riz blanc" : "riz brun";
            System.out.printf("Le %s cuit pendant %d secondes.%n", riceTypeDisplay, cookingTime);
            System.out.printf("Le Rice Cooker est en train de cuire votre %s%n", riceTypeDisplay);
            Timer.runTimer(cookingTime);
            System.out.printf("Le %s est cuit.%n", riceTypeDisplay);
        } else {
            System.out.println("Ajoutez de l'eau d'abord.");
        }
        this.waterLevel = 0;
    }
}
