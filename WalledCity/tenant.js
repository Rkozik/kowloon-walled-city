class Tenant{
    constructor(node, tower) {
        this.node = node;
        this.tower = tower;
        this.neighbors = new Neighbor(this.node, this.tower);
        this.utils = new Utils();
    }

    draw(){
        if(this.canConstruct()) {
            if (this.neighbors.southernNeighbor().domElement.classList[1]) {
                if (!this.neighbors.southernNeighbor().domElement.classList[1].includes("entrance") &&
                    !this.neighbors.southernNeighbor().domElement.classList[1].includes("balcony")) {
                    this.node.domElement.className = "node";
                    this.node.domElement.classList.add("empty");

                    if (this.neighbors.easternNeighbor().domElement.classList.length === 1) {
                        this.neighbors.easternNeighbor().domElement.classList.add('balcony-top-east');
                        if (this.neighbors.southEasternNeighbor().domElement.classList[1] === 'balcony-top-east') {
                            this.neighbors.southEasternNeighbor().domElement.classList.remove('balcony-top-east');
                            this.neighbors.southEasternNeighbor().domElement.classList.add('balcony-east');
                        }
                    } else if (this.neighbors.easternNeighbor().domElement.classList[1].includes("balcony")) {
                        this.neighbors.easternNeighbor().domElement.className = "node";
                        this.neighbors.easternNeighbor().domElement.classList.add("clothes-line-n2n")
                    }

                    if (this.neighbors.westernNeighbor().domElement.classList.length === 1) {
                        this.neighbors.westernNeighbor().domElement.classList.add('balcony-top-west');
                        if (this.neighbors.southWesternNeighbor().domElement.classList[1] === 'balcony-top-west') {
                            this.neighbors.southWesternNeighbor().domElement.classList.remove('balcony-top-west');
                            this.neighbors.southWesternNeighbor().domElement.classList.add('balcony-west');
                        }
                    } else if (this.neighbors.westernNeighbor().domElement.classList[1].includes("balcony")) {
                        this.neighbors.westernNeighbor().domElement.className = "node";
                        this.neighbors.westernNeighbor().domElement.classList.add("clothes-line-n2n")
                    }
                }
            }
            if(this.neighbors.northernNeighbor().domElement.classList[1]){
                if( this.neighbors.northernNeighbor().domElement.classList[1].includes("lobby") ||
                    this.neighbors.northernNeighbor().domElement.classList[1].includes("empty-basement")){
                    this.node.domElement.setAttribute('style','');
                    this.node.domElement.className = "node";
                    this.node.domElement.classList.add("empty-basement");
                }

                if(this.neighbors.southernNeighbor().domElement.classList.length === 1){
                    this.neighbors.southernNeighbor().domElement.setAttribute('style','background-image:url("img/rooms/basement-bg.png")');
                }

                if(this.neighbors.easternNeighbor().domElement.classList.length === 1){
                    this.utils.addBackgroundImage(this.neighbors.easternNeighbor(), "img/rooms/basement-wall-east.png");
                    this.utils.addBackgroundImage(this.neighbors.southEasternNeighbor(), "img/rooms/basement-wall-southeast.png");
                } else if(this.neighbors.easternNeighbor().domElement.classList[1].includes('wall')){
                    this.utils.addBackgroundImage(this.neighbors.easternNeighbor(), "img/rooms/basement-wall-n2n.png");
                }

                if(this.neighbors.westernNeighbor().domElement.classList.length === 1){
                    this.utils.addBackgroundImage(this.neighbors.westernNeighbor(), "img/rooms/basement-wall-west.png");
                    this.utils.addBackgroundImage(this.neighbors.southWesternNeighbor(), "img/rooms/basement-wall-southwest.png");
                } else if(this.neighbors.westernNeighbor().domElement.classList[1].includes('wall')){
                    this.utils.addBackgroundImage(this.neighbors.westernNeighbor(), "img/rooms/basement-wall-n2n.png");
                }
            }
        }
    }

    canConstruct(){
        return !!(this.neighbors.northernNeighbor() &&
            this.neighbors.southernNeighbor() &&
            this.neighbors.easternNeighbor() &&
            this.neighbors.westernNeighbor() &&
            this.node.floor_id !== 6 &&
            this.node.domElement.classList[1] !== "empty");
    }
}