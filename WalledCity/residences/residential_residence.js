class ResidentialResidence{
    constructor(node, tower) {
        this.utils = new Utils();
        this.node = node;
        this.tower = tower;
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
        let isConnected = this.utils.nodeIsConnected(this.node, this.tower);
        if(this.node.domElement.classList[1] === "residential-empty" && this.tower.demand.residential >= 1 && isConnected){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("residential-occupied");
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
        }, 1000 * 20);
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