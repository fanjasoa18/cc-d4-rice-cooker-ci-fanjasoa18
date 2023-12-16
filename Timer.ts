class Timer {
  async runTimer (seconds: number): Promise<void> {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        console.log(`Temps restant : ${seconds} seconde(s)`, '\r')
        seconds--

        if (seconds < 0) {
          clearInterval(interval)
          console.log('\n')
          resolve()
        }
      }, 1000)
    })
  }
}

export default Timer
