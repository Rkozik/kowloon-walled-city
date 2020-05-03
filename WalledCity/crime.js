class Crime{
    constructor(node, tower) {
        this.node = node;
        this.tower = tower;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.random_utils = new RandomUtils();
    }

    check(){
        let unemployment = 0;

        let eastern_neighbor = this.tower.getTenant(this.neighbors.easternNeighbor());
        let western_neighbor = this.tower.getTenant(this.neighbors.westernNeighbor());
        let southern_neighbor = this.tower.getTenant(this.neighbors.westernNeighbor());
        let northern_neighbor = this.tower.getTenant(this.neighbors.northernNeighbor());

        if(typeof eastern_neighbor !== "undefined" && eastern_neighbor.isUnemployed()){
            unemployment += 1;
        }
        if(typeof western_neighbor !== "undefined" && western_neighbor.isUnemployed()){
            unemployment += 1;
        }
        if(typeof southern_neighbor !== "undefined" && southern_neighbor.isUnemployed()){
            unemployment += 1;
        }
        if(typeof northern_neighbor !== "undefined" && northern_neighbor.isUnemployed()){
            unemployment += 1;
        }

        if( unemployment >= 2){
            if(this.random_utils.randomInRange(0, 9) === 0){
                this.tower.addCrime(this);
            }
        }
    }

    spread(){
        let spread = this.random_utils.randomInRange(0, 9) === 0;
        if(spread){
            let neighbors = ["north", "south", "east", "west"];
            let random_neighbor = this.random_utils.randomInArray(neighbors);
            let evict_neighbor = null;
            switch(random_neighbor){
                case "north":
                    evict_neighbor = this.neighbors.northernNeighbor();
                    break;
                case "south":
                    evict_neighbor = this.neighbors.southernNeighbor();
                    break;
                case "east":
                    evict_neighbor = this.neighbors.easternNeighbor();
                    break;
                case "west":
                    evict_neighbor = this.neighbors.westernNeighbor();
                    break
            }
            return evict_neighbor;
        }
    }

    pushOutNeighbor(){
        let area_of_influence = new CircleArea(2, this.node, this.tower).contents;
        let random_neighbor = this.random_utils.randomInArray(area_of_influence);
        if(this.random_utils.randomInRange(0,9) === 0){
            return random_neighbor;
        }
    }
}