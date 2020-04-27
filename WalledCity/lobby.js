class Lobby{
    constructor(node, tower) {
        this.node = node;
        this.tower = tower;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.utils = new Utils();
    }

    draw(){
        if(this.neighbors.easternNeighbor() && this.neighbors.westernNeighbor() && this.node.floor_id === 6){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("lobby");
            this.utils.addBackgroundImage(this.neighbors.southernNeighbor(), "img/rooms/basement-bg.png");

            if(this.neighbors.easternNeighbor().domElement.classList.length === 1){
                this.neighbors.easternNeighbor().domElement.classList.add('entrance-east');
                this.utils.addBackgroundImage(this.neighbors.southEasternNeighbor(), "img/rooms/entrance-basement-east.png");
            }

            if(this.neighbors.westernNeighbor().domElement.classList.length === 1){
                this.neighbors.westernNeighbor().domElement.classList.add('entrance-west');
                this.utils.addBackgroundImage(this.neighbors.southWesternNeighbor(), "img/rooms/entrance-basement-west.png");
            }
        }
    }
}