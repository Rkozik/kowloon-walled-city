class RandomUtils{
    constructor() {
    }

    randomInRange(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomInArray(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    notPreviousRoll(min, max, rolls){
        let roll = this.randomInRange(min, max);
        if(roll === rolls.pop()){
            return this.notPreviousRoll(min, max, rolls);
        }
        return roll;
    }
}