class Lobby{
    constructor(node, tower, bank_account) {
        this.node = node;
        this.tower = tower;
        this.bank_account = bank_account;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.utils = new DrawUtils();
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("lobby");
            this.node.type = "lobby";
            this.utils.addBackgroundImage(this.neighbors.southernNeighbor(), "img/rooms/basement-bg.png");
            this.bank_account.withdraw(1000);

            this.handleEasternNeighbor();
            this.handleWesternNeighbor();
            this.handleSouthernNeighbor();
            this.handleLobbyNode();
        }
    }

    handleEasternNeighbor(){
        if(this.neighbors.easternNeighbor().type === null){
            this.neighbors.easternNeighbor().domElement.classList.add('entrance-east');
            this.neighbors.easternNeighbor().type = "entrance";
            this.utils.addBackgroundImage(this.neighbors.southEasternNeighbor(), "img/rooms/entrance-basement-east.png");
            this.neighbors.southEasternNeighbor().type = "entrance";
        }
    }

    handleWesternNeighbor(){
        if(this.neighbors.westernNeighbor().type === null){
            this.neighbors.westernNeighbor().domElement.classList.add('entrance-west');
            this.neighbors.westernNeighbor().type = "entrance";
            this.utils.addBackgroundImage(this.neighbors.southWesternNeighbor(), "img/rooms/entrance-basement-west.png");
            this.neighbors.southWesternNeighbor().type = "entrance";
        }
    }

    handleSouthernNeighbor(){
        if(this.neighbors.southernNeighbor().type === "entrance"){
            this.neighbors.southernNeighbor().type = "basement";
        }
    }

    handleLobbyNode(){
        if(this.tower.getLobby(this.neighbors.easternNeighbor()) !== false){
            this.tower.removeLobby(this.neighbors.easternNeighbor());
        }
        if(this.tower.getLobby(this.neighbors.westernNeighbor()) !== false){
            this.tower.removeLobby(this.neighbors.westernNeighbor());
        }
        this.tower.addLobby(this.node);
    }

    canConstruct(){
        return !!(this.neighbors.easternNeighbor() &&
            this.neighbors.westernNeighbor() &&
            this.node.floor_id === 6 &&
            this.node.type !== "lobby");
    }
}