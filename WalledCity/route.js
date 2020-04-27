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
            if(typeof neighbors.easternNeighbor().domElement.classList[1] !== "undefined"){
                if(!neighbors.easternNeighbor().domElement.classList[1].includes("balcony") && !visited.includes(node)){
                    visited.push(node);

                    if(node.domElement.classList[1].includes("stairs")){
                        if(target.floor_id > node.floor_id){
                            if(neighbors.northernNeighbor().domElement.classList[1].includes("stairs")){
                                return this.traverse(neighbors.northernNeighbor(),target, path, visited);
                            }
                        } else if(target.floor_id < node.floor_id) {
                            if(neighbors.southernNeighbor().domElement.classList[1].includes("stairs")) {
                                return this.traverse(neighbors.southernNeighbor(), target, path, visited);
                            }
                        }
                    }
                    return this.traverse(neighbors.easternNeighbor(), target, path, visited);
                }
            }
        }

        if(neighbors.westernNeighbor()){
            if(typeof neighbors.westernNeighbor().domElement.classList[1] !== "undefined"){
                if(!neighbors.westernNeighbor().domElement.classList[1].includes("balcony") && !visited.includes(node)){
                    visited.push(node);

                    if(node.domElement.classList[1].includes("stairs")){
                        if(target.floor_id > node.floor_id){
                            if(neighbors.northernNeighbor().domElement.classList[1].includes("stairs")){
                                return this.traverse(neighbors.northernNeighbor(),target, path, visited);
                            }
                        } else if(target.floor_id < node.floor_id) {
                            if(neighbors.southernNeighbor().domElement.classList[1].includes("stairs")) {
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