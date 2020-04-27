class IndustrialResidence{
    constructor(node, tower) {
        this.utils = new Utils();
        this.node = node;
        this.tower = tower;
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("industrial-empty");
        }
        this.checkDemand();
        this.checkLobbyConnection();
    }

    canConstruct(){
        return this.node.domElement.classList[1] === "empty" || this.node.domElement.classList[1] === "empty-basement";
    }

    handleDemand(){
        if(this.node.domElement.classList[1] === "industrial-empty" && this.tower.demand.industrial >= 1){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("industrial-occupied");
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

    checkLobbyConnection(){
        let self = this;
        setInterval(function () {
            let lobby_node = self.utils.getLobbyNode(self.tower);
            let lobby_connection = self.route.traverse(self.node,lobby_node);
            if(lobby_connection.length < 1){
                self.node.domElement.classList.add("no-lobby");
                setTimeout(function () {
                    self.node.domElement.classList.remove("no-lobby")
                }, 1000)
            }

        }, 5000);
    }
}