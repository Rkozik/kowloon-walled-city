class Floor {
    constructor(id, tower) {
        this.number = id;
        this.node_list = [];
        this.tower = tower;
        this.utils = new DrawUtils();
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

    getTotalNodes(){
        return this.node_list.length - 1;
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
}