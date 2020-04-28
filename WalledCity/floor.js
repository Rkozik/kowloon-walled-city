class Floor {
    constructor(id, tower) {
        this.number = id;
        this.node_list = [];
        this.tower = tower;
        this.route = new Route(this.tower);
        this.connected = true;
        this.isConnected();
        this.utils = new Utils();
    }

    get nodes(){
        return this.node_list;
    }

    setNode(node){
        this.node_list.push(node);
    }

    getNode(position){
        for(let i=0;i<this.node_list.length;i++){
            if(this.node_list[i].position_id === position){
                return this.node_list[i];
            }
        }
        return false;
    }

    updateNodes(){
        this.node_list.forEach(function (node) {

        });
    }

    getFirstUsedNode(){
        for(let i=0;i<this.node_list.length;i++){
            if(this.node_list[i].domElement.classList.length > 1){
                return this.node_list[i];
            }
        }
        return false;
    }

    isConnected(){
        let self = this;

        setInterval(function () {
            if(self.getFirstUsedNode() !== false){
                let node = self.getFirstUsedNode();
                let lobby_node = self.utils.getLobbyNode(self.tower);
                let lobby_connection = self.route.traverse(node,lobby_node);
                if(lobby_connection.length < 1){
                    self.connected = false;
                    for(let i=0;i<self.node_list.length;i++){
                        if(self.utils.isOccupied(self.node_list[i])){
                            self.node_list[i].domElement.classList.add("no-lobby");
                            setTimeout(function () {
                                self.node_list[i].domElement.classList.remove("no-lobby")
                            }, 1000);
                        }
                    }
                } else {
                    self.connected = true;
                }
            }
        }, 5000);
    }
}