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
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        if(this.node.domElement.classList[1] === "commercial-empty" && this.tower.demand.commercial >= 1){
            this.node.domElement.className = "node";
            let residence_lvl1 = ["commercial-occupied", "commercial-occupied-1"];
            let residence = this.random_utils.randomInArray(residence_lvl1);
            this.node.domElement.classList.add(residence);
            this.node.type = "commercial-occupied";
            this.tower.demand.decreaseCommercialDemand(1);
            this.tower.demand.increaseResidentialDemand(2);
            this.tower.demand.increaseIndustrialDemand(0.5);
            this.bank_account.deposit(1000);
        }
    }

    checkDemand(){
        let self = this;
        setInterval(function () {
            if(self.tower.demand.commercial > 0){
                self.handleDemand();
            }
        }, 1000 * 20);
    }

    increaseDemand(){
        let self = this;
        setInterval(function () {
            if(self.node.type === "commercial-occupied"){
                self.tower.demand.increaseIndustrialDemand(0.05);
            }
        }, 1000 * 75);
    }
}