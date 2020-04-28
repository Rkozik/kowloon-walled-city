class Route{
    constructor(tower) {
        this.tower = tower;
    }

    traverse(node, target, path= [], visited= []){
        let neighbors = new Neighbor(node, this.tower);
        if(node === target || node === false){
            return node === false ? [] : path;
        }

        path.push(node);

        if(neighbors.easternNeighbor()){
            if(neighbors.easternNeighbor().type !== null){
                if(neighbors.easternNeighbor().type !== "balcony" &&
                    neighbors.easternNeighbor().type !== "clothes-line" &&
                    !visited.includes(node)){

                    visited.push(node);
                    if(node.type === "stairs"){
                        if(target.floor_id > node.floor_id){
                            if(neighbors.northernNeighbor().type === "stairs"){
                                return this.traverse(neighbors.northernNeighbor(),target, path, visited);
                            }
                        } else if(target.floor_id < node.floor_id) {
                            if(neighbors.southernNeighbor().type === "stairs") {
                                return this.traverse(neighbors.southernNeighbor(), target, path, visited);
                            }
                        }
                    }
                    return this.traverse(neighbors.easternNeighbor(), target, path, visited);
                }
            }
        }

        if(neighbors.westernNeighbor()){
            if(neighbors.westernNeighbor().type !== null){
                if(neighbors.westernNeighbor().type !== "balcony" &&
                    neighbors.westernNeighbor().type !== "clothes-line" &&
                    !visited.includes(node)){

                    visited.push(node);
                    if(node.type === "stairs"){
                        if(target.floor_id > node.floor_id){
                            if(neighbors.northernNeighbor().type === "stairs"){
                                return this.traverse(neighbors.northernNeighbor(),target, path, visited);
                            }
                        } else if(target.floor_id < node.floor_id) {
                            if(neighbors.southernNeighbor().type === "stairs") {
                                return this.traverse(neighbors.southernNeighbor(), target, path, visited);
                            }
                        }
                    }
                    return this.traverse(neighbors.westernNeighbor(), target, path, visited);
                }
            }
        }

        path.pop();
        return this.traverse(neighbors.westernNeighbor(), target, path, visited);
    }
}