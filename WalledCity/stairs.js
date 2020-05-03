class Stairs{
    constructor(node, tower,bank_account) {
        this.node = node;
        this.tower = tower;
        this.bank_account = bank_account;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.utils = new DrawUtils();
        this.occupied = false;
    }

    draw(){
        if(this.canConstruct()){
            this.node.domElement.className = "node";
            this.node.domElement.classList.add("stairs-l");
            this.node.type = "stairs";
            this.bank_account.withdraw(500);
            this.repaintStairs(this.traverseDown(this.node));
        }
    }

    repaintStairs(node){
        let northern_neighbor = new Neighbor(node, this.tower).northernNeighbor();
        let southern_neighbor = new Neighbor(node, this.tower).southernNeighbor();

        if(southern_neighbor.domElement.classList[1] === "stairs-l"){
            node.domElement.className = "node";
            node.domElement.classList.add("stairs-r");
        } else {
            node.domElement.className = "node";
            node.domElement.classList.add("stairs-l");
        }

        if(northern_neighbor.type !== "stairs"){
            node.domElement.className = "node";
            if(node.floor_id === 6){
                if(southern_neighbor.domElement.classList[1] === "stairs-l"){
                    node.domElement.classList.add("stairs-down-lobby-l");
                } else {
                    node.domElement.classList.add("stairs-down-lobby-r");
                }
            } else if(node.floor_id < 6){
                if(southern_neighbor.domElement.classList[1] === "stairs-l"){
                    node.domElement.classList.add("stairs-down-l-underground");
                } else {
                    node.domElement.classList.add("stairs-down-r-underground");
                }
            } else {
                if(southern_neighbor.domElement.classList[1] === "stairs-l"){
                    node.domElement.classList.add("stairs-down-r");
                } else {
                    node.domElement.classList.add("stairs-down-l");
                }
            }
        }

        if(this.isTopFloor(node) || northern_neighbor.type !== "stairs"){
            return;
        }

        return this.repaintStairs(northern_neighbor);
    }

    traverseDown(node){
        let southern_neighbor = new Neighbor(node, this.tower).southernNeighbor();
        if(southern_neighbor.domElement.classList.length > 1){
            if(southern_neighbor.type === "stairs"){
                return this.traverseDown(southern_neighbor);
            }
        }
        return node;
    }

    canConstruct(){
        return !!(this.neighbors.northernNeighbor() &&
            this.neighbors.southernNeighbor() &&
            this.neighbors.easternNeighbor() &&
            this.neighbors.westernNeighbor() &&
            this.node.domElement.classList.length > 1 &&
            (this.node.type === "empty" ||
            this.node.type === "lobby" ||
            this.node.type === "empty-basement"));
    }

    isLobby(){
        return this.node.floor_id === 6;
    }

    isTopFloor(node){
        let neighbors = new Neighbor(node, this.tower);
        return neighbors.northernNeighbor().domElement.classList.length === 1;
    }

    isBottomFloor(node){
        let neighbors = new Neighbor(node, this.tower);
        return neighbors.southernNeighbor().domElement.classList.length === 1;
    }
}