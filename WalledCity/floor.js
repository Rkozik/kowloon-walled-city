class Floor {
    constructor(id) {
        this.number = id;
        this.node_list = [];
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
}