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
        return (this.tower.getTotalFloors() >= their_floor && their_position >= 0 && this.tower.getTotalFloors() >= their_floor)
            ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    northEasternNeighbor(){
        let their_floor = this.floor + 1;
        let their_position = this.position + 1;
        return (this.tower.getFloor(their_floor).getTotalNodes() && this.tower.getTotalFloors() >= their_floor) ?
            this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    easternNeighbor(){
        let their_floor = this.floor;
        let their_position = this.position + 1;
        return this.tower.getFloor(their_floor).getTotalNodes() > their_position ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    westernNeighbor(){
        let their_floor = this.floor;
        let their_position = this.position - 1;
        return their_position >= 0 ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    southernNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position;
        return  their_floor >= 0 ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    southWesternNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position - 1;
        return (their_position >= 0 && their_floor >= 0) ? this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }

    southEasternNeighbor(){
        let their_floor = this.floor - 1;
        let their_position = this.position + 1;
        return (this.tower.getFloor(their_floor).getTotalNodes() > their_position && their_floor >= 0) ?
            this.tower.getFloor(their_floor).getNode(their_position) : undefined;
    }
}