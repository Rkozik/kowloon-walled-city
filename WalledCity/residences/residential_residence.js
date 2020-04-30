class ResidentialResidence{
    constructor(node, tower, bank_account) {
        this.utils = new DrawUtils();
        this.node = node;
        this.tower = tower;
        this.bank_account = bank_account;
        this.random_utils = new RandomUtils();
        this.tenant = new Tenant(this.node, this.tower);
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("residential-empty");
            this.node.type = "residential-empty";
        }
        this.checkDemand();
        this.increaseDemand();
        this.checkJobs()
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        if(this.node.domElement.classList[1] === "residential-empty" && this.tower.demand.residential >= 1){
            this.node.domElement.className = "node";

            let residence_lvl1 = ["residential-occupied","residential-occupied-1","residential-occupied-2","residential-occupied-3"];
            let residence = this.random_utils.randomInArray(residence_lvl1);
            this.node.domElement.classList.add(residence);

            this.node.type = "residential-occupied";
            this.tower.demand.decreaseResidentialDemand(1);
            this.tower.demand.increaseCommercialDemand(0.075);

            // Add tenant as a renter
            this.bank_account.addRenter(this.node);
        }
    }

    checkJobs(){
        let self = this;
        let job = new Job(this.tower);
        setInterval(function () {
            if(self.node.type === "residential-occupied" && self.tenant.isUnemployed()){
                let new_job = job.jobSearch(self.tenant.home);
                if(new_job !== false){
                    self.tenant.setJob(new_job);
                }
            }
        }, 1000 * 3);
    }

    checkDemand(){
        let self = this;
        setInterval(function () {
            if(self.tower.demand.residential > 0){
                self.handleDemand();
            }
        }, 1000 * 10);
    }

    increaseDemand(){
        let self = this;
        setInterval(function () {
            if(self.node.type === "residential-occupied"){
                self.tower.demand.increaseCommercialDemand(0.025);
            }
        }, 1000 * 45);
    }
}