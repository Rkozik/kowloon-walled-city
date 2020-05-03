class Crime{
    constructor(node, tower) {
        this.node = node;
        this.tower = tower;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.influence = new CircleArea(2, this.node, this.tower).contents;
        this.residence_utils = new ResidenceUtils();
        this.random_utils = new RandomUtils();

        this.init();
    }

    init(){
        let self = this;
        setInterval(function () {
            self.start();
            if(self.tower.getCrime(self.node)){
                self.spread();
                self.forceOutNeighbor();
                self.stop();
            }
        }, 30000)
    }

    start(){
        if(this.canHaveCrime(this.node)){
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
                    this.node.domElement.innerHTML = '<div id="'+this.node.domElement.id+'" class="crime"></div>';
                    return this.tower.addCrime(this);
                }
            }
        }
    }

    stop(){
        if(typeof this.tower.getCrime(this.node) !== "undefined"){
            if(this.random_utils.randomInRange(0, 26) === 0){
                this.node.domElement.innerHTML = "";
                return this.tower.removeCrime(this);
            }
        }
    }

    spread(){
        let spread = this.random_utils.randomInRange(0, 9) === 0;
        if(spread){
            let neighbors = ["north", "south", "east", "west"];
            let random_neighbor = this.random_utils.randomInArray(neighbors);
            let spread_to = null;
            switch(random_neighbor){
                case "north":
                    spread_to =  this.neighbors.northernNeighbor();
                    break;
                case "south":
                    spread_to =  this.neighbors.southernNeighbor();
                    break;
                case "east":
                    spread_to =  this.neighbors.easternNeighbor();
                    break;
                case "west":
                    spread_to =  this.neighbors.westernNeighbor();
                    break
            }

            if(this.canHaveCrime(spread_to)){
                let new_crime = new Crime(this.tower.getTenant(spread_to), this.tower);
                this.tower.addCrime(new_crime);
                spread_to.domElement.setAttribute('style','background-color:green');
            }
        }
    }

    forceOutNeighbor(){
        if(this.tower.getCrime(this.node)){
            let random_neighbor = this.random_utils.randomInArray(this.influence);
            if(this.random_utils.randomInRange(0,9) === 0 && this.canHaveCrime(random_neighbor)){
                console.log("abandoned", random_neighbor);
                this.residence_utils.abandon(random_neighbor, this.tower);
            }
        }
    }

    canHaveCrime(node){
        return typeof node &&
            typeof this.tower.getCrime(node) === "undefined" &&
            node.type !== null &&
            node.type.includes("occupied");
    }
}