class CommercialResidence{
    constructor(node, tower, bank_account) {
        this.utils = new DrawUtils();
        this.node = node;
        this.tower = tower;
        this.bank_account = bank_account;
        this.random_utils = new RandomUtils();
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("commercial-empty");
            this.node.type = "commercial-empty";
        }
        this.checkDemand();
        this.increaseDemand();
        this.handleVacantJobs();
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        if((this.node.domElement.classList[1] === "commercial-empty" || this.node.type === "abandoned") && this.tower.demand.commercial >= 1){
            this.node.domElement.className = "node";
            let residence_lvl1 = ["commercial-occupied", "commercial-occupied-1", "commercial-occupied-2"];
            let residence = this.random_utils.randomInArray(residence_lvl1);
            this.node.domElement.classList.add(residence);
            this.node.type = "commercial-occupied";
            this.tower.demand.decreaseCommercialDemand(1);
            this.tower.demand.increaseResidentialDemand(2);
            this.tower.demand.increaseIndustrialDemand(1);
            this.bank_account.addRenter(this.node);

            // Add jobs to jobs list
            let new_job_1 = new Job(this.tower);
            new_job_1.setLocation(this.node);
            this.tower.addJob(new_job_1);

            let new_job_2 = new Job(this.tower);
            new_job_2.setLocation(this.node);
            this.tower.addJob(new_job_2);
        }
    }

    handleVacantJobs(){
        let self = this;
        setInterval(function () {
            let available_jobs = self.tower.getLocationsAvailableJobs(self.node);
            for(let i=0;i<available_jobs.length;i++){
                self.tower.demand.increaseResidentialDemand(1);
            }
        }, 1000 * 30);
    }

    checkDemand(){
        let self = this;
        setInterval(function () {
            if(self.tower.demand.commercial > 0){
                self.handleDemand();
            }
        }, 1000 * 15);
    }

    increaseDemand(){
        let self = this;
        setInterval(function () {
            if(self.node.type === "commercial-occupied"){
                self.tower.demand.increaseIndustrialDemand(0.1);
            }
        }, 1000 * 75);
    }
}