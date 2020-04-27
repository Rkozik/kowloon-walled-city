class CommercialResidence{
    constructor(node, tower) {
        this.utils = new Utils();
        this.node = node;
        this.tower = tower;
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("commercial-empty");
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
            this.node.domElement.classList.add("commercial-occupied");
            this.tower.demand.decreaseCommercialDemand(1);
            this.tower.demand.increaseResidentialDemand(2);
            this.tower.demand.increaseIndustrialDemand(0.5);
        }
    }

    checkDemand(){
        let self = this;
        setInterval(function () {
            if(self.tower.demand.commercial > 0){
                self.handleDemand();
            }
        }, 1000 * 30);
    }

    increaseDemand(){
        let self = this;
        setInterval(function () {
            if(self.node.domElement.classList[1] === "commercial-occupied"){
                self.tower.demand.increaseIndustrialDemand(0.05);
            }
        }, 1000 * 75);
    }
}