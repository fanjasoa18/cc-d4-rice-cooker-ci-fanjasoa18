const Timer = require('./Timer');

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Timer', () => {
  it('devrait exécuter le minuteur pendant la durée spécifiée', () => {
    const seconds = 3;

    Timer.runTimer(seconds);

    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds} secondes`, '\r');
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds - 1} secondes`, '\r');
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds - 2} secondes`, '\r');
    expect(console.log).toHaveBeenCalledWith('\n');
  });

  it('devrait gérer une durée de 0 seconde', () => {
    const seconds = 0;

    Timer.runTimer(seconds);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('\n');
  });
});
