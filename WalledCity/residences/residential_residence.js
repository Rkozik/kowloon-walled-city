class ResidentialResidence{
    constructor(node, tower) {
        this.utils = new DrawUtils();
        this.node = node;
        this.tower = tower;
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
            this.tower.demand.increaseCommercialDemand(0.05);
        }
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