import java.util.NoSuchElementException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        RiceCooker riceCooker = new RiceCooker();

        try (Scanner scanner = new Scanner(System.in)) {
            boolean exitProgram = false;
            while (!exitProgram) {
                System.out.println("\nMenu:");
                System.out.println("1 - Faire bouillir de l'eau");
                System.out.println("2 - Cuisiner du riz");
                System.out.println("0 - Quitter");

                System.out.print("Choisissez une option : ");
                String choice = scanner.nextLine();

                switch (choice) {
                    case "1" -> {
                        System.out.print("Choisissez la quantité d'eau (1 pour 1 litre, 2 pour 2 litres) : ");
                        double waterQuantityChoice = scanner.nextDouble();
                        riceCooker.boilWater(waterQuantityChoice);
                        scanner.nextLine();
                    }
                    case "2" -> {
                        System.out.print("Choisissez le type de riz (1(riz blanc) / 2(riz brun) : ");
                        String riceType = scanner.nextLine();
                        riceCooker.cookRice(riceType);
                    }
                    case "0" -> {
                        System.out.println("Au revoir !");
                        exitProgram = true;
                    }
                    default -> System.out.println("Option non valide. Veuillez choisir à nouveau.");
                }
            }
        } catch (NoSuchElementException e) {
            System.out.println("\nProgramme interrompu par l'utilisateur. Au revoir!");
        }

    }
}
