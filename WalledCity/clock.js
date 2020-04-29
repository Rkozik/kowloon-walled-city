class Clock{
    constructor() {
        this.gametime = 0;
        this.gameHHMM = "";
        this.gameAMPM = "";
        this.mapHH = new Map();
        this.minute = ((((60 * 1000) * 1) / 24) / 60);
    }

    runGameClock(){
        let self = this;
        self.createHHMap();

        setInterval(function () {
            // Reset after 1 day
            if(self.gametime === 1440){
                self.gametime = 0;
            }
            self.gametime++;
            self.setGameHHMM();
            self.updateGameClock()
        }, self.minute);
    }

    setGameHHMM(){
        let hours = Math.floor(this.gametime / 60);
        hours = this.mapHH.get(hours);

        let minutes = this.gametime % 60;
        if(minutes < 15){
            minutes = "00";
        } else if(minutes > 15 && minutes < 30){
            minutes = 15;
        } else if(minutes > 30 && minutes < 45){
            minutes = 30
        } else if(minutes > 45){
            minutes = 45;
        }

        this.gameAMPM = this.gametime < 720 ? "AM" : "PM";
        this.gameHHMM = hours + ":" + minutes + " " + this.gameAMPM;
    }

    updateGameClock(){
        let game_clock = document.getElementById('game-clock');
        game_clock.innerHTML = '<b>' + this.gameHHMM + '</b>';
    }

    createHHMap(){
        this.mapHH.set(0, '12');
        this.mapHH.set(1, '01');
        this.mapHH.set(2, '02');
        this.mapHH.set(3, '03');
        this.mapHH.set(4, '04');
        this.mapHH.set(5, '05');
        this.mapHH.set(6, '06');
        this.mapHH.set(7, '07');
        this.mapHH.set(8, '08');
        this.mapHH.set(9, '09');
        this.mapHH.set(10, '10');
        this.mapHH.set(11, '11');
        this.mapHH.set(12, '12');
        this.mapHH.set(13, '01');
        this.mapHH.set(14, '02');
        this.mapHH.set(15, '03');
        this.mapHH.set(16, '04');
        this.mapHH.set(17, '05');
        this.mapHH.set(18, '06');
        this.mapHH.set(19, '07');
        this.mapHH.set(20, '08');
        this.mapHH.set(21, '09');
        this.mapHH.set(22, '10');
        this.mapHH.set(23, '11');
        this.mapHH.set(24, '12');
    }

}