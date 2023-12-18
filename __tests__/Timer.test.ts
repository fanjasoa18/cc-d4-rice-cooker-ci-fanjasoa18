import Timer from '../Timer';

jest.useFakeTimers();

describe('Timer', () => {
  it('should run the timer for the specified duration', async () => {
    const timer = new Timer();
    const seconds = 3;

    const promise = timer.runTimer(seconds);

    jest.advanceTimersByTime(1000);
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds} seconde(s)`, '\r');
    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds - 1} seconde(s)`, '\r');
    expect(setInterval).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(console.log).toHaveBeenCalledWith(`Temps restant : ${seconds - 2} seconde(s)`, '\r');
    expect(setInterval).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(1000);
    expect(console.log).toHaveBeenCalledWith('\n');
    expect(clearInterval).toHaveBeenCalledTimes(1);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should handle a duration of 0 seconds', async () => {
    const timer = new Timer();
    const seconds = 0;

    const promise = timer.runTimer(seconds);

    expect(console.log).toHaveBeenCalledWith('\n');
    expect(clearInterval).toHaveBeenCalledTimes(1);

    await expect(promise).resolves.toBeUndefined();
  });
});

// Mocking console.log to avoid actual console output
jest.spyOn(console, 'log').mockImplementation(() => {});
