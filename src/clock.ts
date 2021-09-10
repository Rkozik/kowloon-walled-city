export class Clock {
  gametime = 0;
  gameHHMM = "";
  gameAMPM = "";
  mapHH = new Map();
  minute = (60 * 1000 * 0.5) / 24 / 60;
  day = 1;
  month = 1;
  quarter = 1;
  constructor() {}

  run() {
    this.createHHMap();

    setInterval(() => {
      // Reset after 1 month
      if (this.day === 30) {
        this.incrementMonth();
      }

      // Reset after 1 day
      if (this.gametime === 1440) {
        this.day += 1;
        this.gametime = 0;
      }

      this.gametime++;
      this.setGameHHMM();
      this.updateGameClock();
    }, this.minute);
  }

  setGameHHMM() {
    let hours = Math.floor(this.gametime / 60);
    hours = this.mapHH.get(hours);

    let minutes = this.gametime % 60;
    if (minutes < 15) {
      minutes = 0;
    } else if (minutes > 15 && minutes < 30) {
      minutes = 15;
    } else if (minutes > 30 && minutes < 45) {
      minutes = 30;
    } else if (minutes > 45) {
      minutes = 45;
    }

    this.gameAMPM = this.gametime < 720 ? "AM" : "PM";
    this.gameHHMM = hours + ":" + minutes;
  }

  updateGameClock() {
    let game_clock = document.getElementById("game-clock");
    game_clock.innerHTML = "<b>" + this.gameHHMM + "</b>";

    let game_clock_amPm = document.getElementById("game-clock-am-pm");
    game_clock_amPm.innerHTML = "<b>" + this.gameAMPM + "</b>";
  }

  createHHMap() {
    this.mapHH.set(0, "12");
    this.mapHH.set(1, "01");
    this.mapHH.set(2, "02");
    this.mapHH.set(3, "03");
    this.mapHH.set(4, "04");
    this.mapHH.set(5, "05");
    this.mapHH.set(6, "06");
    this.mapHH.set(7, "07");
    this.mapHH.set(8, "08");
    this.mapHH.set(9, "09");
    this.mapHH.set(10, "10");
    this.mapHH.set(11, "11");
    this.mapHH.set(12, "12");
    this.mapHH.set(13, "01");
    this.mapHH.set(14, "02");
    this.mapHH.set(15, "03");
    this.mapHH.set(16, "04");
    this.mapHH.set(17, "05");
    this.mapHH.set(18, "06");
    this.mapHH.set(19, "07");
    this.mapHH.set(20, "08");
    this.mapHH.set(21, "09");
    this.mapHH.set(22, "10");
    this.mapHH.set(23, "11");
    this.mapHH.set(24, "12");
  }

  incrementMonth() {
    this.month = this.month === 12 ? 1 : (this.month += 1);
    this.quarter = Math.floor(this.month / 4) + 1;
  }
}
