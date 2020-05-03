class Neighbor{
    constructor(node, tower) {
        this.floor = node.floor_id;
        this.position = node.position;
        this.tower = tower;
    }

    northernNeighbor(){
        let their_floor = this.floor + 1;
        let their_position = this.position;
        return this.tower.getTotalFloors() >= their_floor ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    northWesternNeighbor(){
        let their_floor = this.floor + 1;
        let their_position = this.position - 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }

    northEasternNeighbor(){
        let their_floor = this.floor + 1;
        let their_position = this.position + 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }

    easternNeighbor(){
        let their_floor = this.floor;
        let their_position = this.position + 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }

    westernNeighbor(){
        let their_floor = this.floor;
        let their_position = this.position - 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }

    southernNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position;
        return  their_floor >= 0 ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    southWesternNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position - 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }

    southEasternNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position + 1;
        return this.tower.getFloor(their_floor).getNode(their_position);
    }
}