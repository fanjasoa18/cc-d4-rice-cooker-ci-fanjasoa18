import time


class Timer:
    @staticmethod
    def run_timer(seconds):
        if seconds > 0:
            for second in range(seconds, -1, -1):
                print(
                    f"Temps restant : {second}"
                    " secondes", end='\r')
                time.sleep(1)
            print("\n")