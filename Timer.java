public class Timer {
    public static void runTimer(int seconds) {
        for (int second = seconds; second >= 0; second--) {
            System.out.printf("Temps restant : %d secondes%n", second);
            try {
                Thread.sleep(1000); // Attente de 1 seconde (1000 ms)
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println();
    }
}
