function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

class Timer {
  static runTimer(seconds) {
    for (let second = seconds; second >= 0; second -= 1) {
      console.log(`Temps restant : ${second} secondes`, '\r');
      sleep(1000); // Fonction pour attendre 1 seconde (1000 ms)
    }
    console.log('\n');
  }
}

module.exports = Timer;
