class ResidentialResidence{
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
            this.node.domElement.classList.add("residential-empty");
            this.node.type = "residential-empty";
        }
        this.checkDemand();
        this.increaseDemand();
        this.checkJobs()
    }

    erase(){

    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        let build_on_abandoned = false;
        if(this.node.type === "abandoned"){
            build_on_abandoned = this.random_utils.randomInRange(0, 9) === 0;
        }

        if((this.node.type === "residential-empty" || build_on_abandoned)
            && this.tower.demand.residential >= 1 && !this.tower.getCrime(self.node)){
            this.node.domElement.className = "node";

            let residence_lvl1 = ["residential-occupied","residential-occupied-1","residential-occupied-2","residential-occupied-3"];
            let residence = this.random_utils.randomInArray(residence_lvl1);
            this.node.domElement.classList.add(residence);
            this.node.type = "residential-occupied";

            // Register tenant
            let new_tenant = new Tenant(this.node, this.tower);
            this.tower.addTenant(new_tenant);

            // Add tenant as a renter
            this.bank_account.addRenter(this.node);

            // Modify demand
            this.tower.demand.decreaseResidentialDemand(1);
            this.tower.demand.increaseCommercialDemand(0.075);
        }
    }

    checkJobs(){
        let self = this;
        let job = new Job(this.tower);
        setInterval(function () {
            let tenant = self.tower.getTenant(self.node);
            if(self.node.type === "residential-occupied" && tenant.isUnemployed() && !self.tower.getCrime(self.node)){
                let new_job = job.jobSearch(tenant.home);
                if(new_job !== false){
                    tenant.setJob(new_job);
                    self.node.domElement.innerHTML = "";
                } else {
                    self.node.domElement.innerHTML = '<div id="'+self.node.domElement.id+'" class="no-job"></div>';
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
            if(self.node.type === "residential-occupied" && !self.tower.getCrime(self.node)){
                self.tower.demand.increaseCommercialDemand(0.025);
            }
        }, 1000 * 45);
    }
}