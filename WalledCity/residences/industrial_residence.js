class IndustrialResidence{
    constructor(node, tower) {
        this.utils = new DrawUtils();
        this.node = node;
        this.tower = tower;
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("industrial-empty");
            this.node.type = "industrial-empty";
        }
        this.checkDemand();
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        if(this.node.domElement.classList[1] === "industrial-empty" && this.tower.demand.industrial >= 1){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("industrial-occupied");
            this.node.type = "industrial-occupied";
            this.tower.demand.decreaseIndustrialDemand(1);
            this.tower.demand.increaseResidentialDemand(2);
        }
    }

    checkDemand(){
        let self = this;
        setInterval(function () {
            if(self.tower.demand.industrial > 0){
                self.handleDemand();
            }
        }, 1000 * 20);
    }
}