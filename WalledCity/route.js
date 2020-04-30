class Route{
    constructor(tower) {
        this.tower = tower;
    }

    traverseEachBuilding(node, target){
        let lobbies = this.tower.lobbies;
        for(let i=0;i<lobbies.length;i++){
            let traversal = this.traverse(node, target);
            if(traversal.length === 0){
                let path_to_next_lobby = this.traverse(node, lobbies[i]);
                let traverse_next_building = this.traverse(lobbies[i], target);
                if(traverse_next_building.length > 0){
                    return path_to_next_lobby.concat(traverse_next_building);
                }
            } else {
                return traversal;
            }
        }
        return [];
    }

    traverse(node, target, path= [], visited = []){

        let neighbors = new Neighbor(node, this.tower);
        if(node === target || node === false){
            return node === false ? [] : path;
        }

        if(neighbors.easternNeighbor().type !== null &&
            neighbors.easternNeighbor().type !== "balcony" &&
            neighbors.easternNeighbor().type !== "clothes-line" &&
            !visited.includes(node)
            ){
                path.push(node);
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

        if(neighbors.westernNeighbor().type !== null &&
            neighbors.westernNeighbor().type !== "balcony" &&
            neighbors.westernNeighbor().type !== "clothes-line"){
                path.pop();
                path.push(node);
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

        return this.traverse(false, target, path, visited);
    }
}