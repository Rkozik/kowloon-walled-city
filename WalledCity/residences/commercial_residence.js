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
            this.node.type = "commercial-empty";
        }
        this.checkDemand();
        this.increaseDemand();
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        let isConnected = this.utils.nodeIsConnected(this.node, this.tower);
        if(this.node.domElement.classList[1] === "commercial-empty" && this.tower.demand.commercial >= 1 && isConnected){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("commercial-occupied");
            this.node.type = "commercial-occupied";
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
            if(self.node.type === "commercial-occupied"){
                self.tower.demand.increaseIndustrialDemand(0.05);
            }
        }, 1000 * 75);
    }
}