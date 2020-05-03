class ResidenceUtils{
    constructor() {
    }

    getLobbyNode(tower){
        let lobby_nodes = tower.getFloor(6).node_list;
        for(let i=0;i<lobby_nodes.length;i++){
            if(lobby_nodes[i].domElement.classList[1] === "lobby"){
                return lobby_nodes[i];
            }
        }
        return false;
    }

    isOccupied(node){
        if(node.domElement.classList.length > 1){
            if(node.domElement.classList[1].includes("occupied") ||
                node.domElement.classList[1].includes("empty") ){
                return true;
            }
        }
        return false;
    }

    abandon(node, tower){
        this.removeJob(node, tower);
        tower.removeTenant(tower.getTenant(node));
        node.domElement.classList.add("abandoned");
        node.type = "abandoned";
        node.domElement.innerHTML = "";
    }

    removeJob(node,tower){
        let tenant = tower.getTenant(node);
        if(tenant){
            let job = tower.getTenantsJob(tenant);
            if(job){
                job.removeWorker(tower.getTenant(node));
            }
        }
    }
}