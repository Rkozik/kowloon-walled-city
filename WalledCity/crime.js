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
                self.forceOutNeighbor();
                self.stop();
            }
        }, 15000);

        setInterval(function () {
            if(self.tower.getCrime(self.node)){
                self.spread();
            }
        }, 10000)

    }

    start(){
        if(this.canHaveCrime(this.node)){
            let crime_score = 0;

            let eastern_neighbor = this.tower.getTenant(this.neighbors.easternNeighbor());
            let western_neighbor = this.tower.getTenant(this.neighbors.westernNeighbor());
            let southern_neighbor = this.tower.getTenant(this.neighbors.westernNeighbor());
            let northern_neighbor = this.tower.getTenant(this.neighbors.northernNeighbor());

            if(eastern_neighbor && eastern_neighbor.isUnemployed()){
                crime_score += 1;
            }
            if(western_neighbor && western_neighbor.isUnemployed()){
                crime_score += 1;
            }
            if(southern_neighbor && southern_neighbor.isUnemployed()){
                crime_score += 1;
            }
            if(northern_neighbor && northern_neighbor.isUnemployed()){
                crime_score += 1;
            }

            if(this.node.type === "abandoned"){
                crime_score += 2;
            }

            if( crime_score >= 2){
                if(this.random_utils.randomInRange(0, 9) === 0){
                    this.node.domElement.innerHTML = '<div id="'+this.node.domElement.id+'" class="crime"></div>';
                    this.removeJob(this.node);
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
        let spread = this.random_utils.randomInRange(0, 4) === 0;
        if(spread){
            let random_neighbor = this.random_utils.randomInArray(this.influence);
            if(this.canHaveCrime(random_neighbor)){
                let new_crime = new Crime(random_neighbor, this.tower);
                this.tower.addCrime(new_crime);
                random_neighbor.domElement.innerHTML = '<div id="'+random_neighbor.domElement.id+'" class="crime"></div>';
                this.removeJob(this.node);

                if(random_neighbor.type === "industrial-occupied"){
                    random_neighbor.domElement.className = "node";
                    // TODO: Select from 3 different criminal industries (plants at different growth stages)
                    random_neighbor.domElement.classList.add("industrial-crime");
                    random_neighbor.type = "industrial-crime";
                }
            }
        }
    }

    forceOutNeighbor(){
        if(this.tower.getCrime(this.node)){
            let random_neighbor = this.tower.getTenant(this.random_utils.randomInArray(this.influence));
            if(this.random_utils.randomInRange(0,6) === 0 && random_neighbor && random_neighbor !== this.node){
                this.residence_utils.abandon(random_neighbor.home, this.tower);
                this.tower.demand.decreaseResidentialDemand(1.5);
            }
        }
    }

    removeJob(node){
        let tenant = this.tower.getTenant(node);
        if(tenant){
            let job = this.tower.getTenantsJob(tenant);
            if(job){
                job.removeWorker(this.tower.getTenant(node));
            }
        }
    }

    canHaveCrime(node){
        return node &&
            node.type !== null &&
            node.type !== "stairs" &&
            !this.tower.getCrime(node) &&
            (node.type.includes("occupied") || node.type === "abandoned");
    }
}