class Tower{
    constructor(demand) {
        this.floors = [];
        this.demand = demand;
    }

    addFloor(floor){
        this.floors.push(floor);
    }

    getFloor(number){
        for(let i=0;i<this.floors.length;i++){
            if(this.floors[i].number === number){
                return this.floors[i];
            }
        }
        return false;
    }

    getTotalFloors(){
        return this.floors.length;
    }
}