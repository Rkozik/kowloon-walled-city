class CircleArea{
    constructor(radius, center, tower) {
        this.radius = radius;
        this.center = center;
        this.tower = tower;
        this.contents = this.setContents();
    }

    draw(){
        let start_position = this.searchStartPosition(this.center);
        let end_position = this.searchEndPosition(this.center);
        this.paint(start_position, end_position, start_position.floor_id);
    }

    erase(){
        let start_position = this.searchStartPosition(this.center);
        let end_position = this.searchEndPosition(this.center);
        this.stripPaint(start_position, end_position, start_position.floor_id);
    }

    inCircle(node){
        let dx = Math.abs(node.position_id - this.center.position_id);
        let dy = Math.abs( node.floor_id - this.center.floor_id);
        return dx*dx + dy*dy <= this.radius*this.radius;
    }


    setContents(){
        let start_position = this.searchStartPosition(this.center);
        let end_position = this.searchEndPosition(this.center);
        return this.getContents(start_position,  end_position, start_position.floor_id)
    }

    getContents(node, end_position, floor, contents=[]){
        let neighbors = new Neighbor(node, this.tower);
        if(floor === end_position.floor_id - 1 || floor === -1){
            return contents;
        }

        if(this.inCircle(node)){
            contents.push(node);
        }

        let new_floor = floor - 1;

        if(new_floor !== -1){
            if(neighbors.easternNeighbor() && neighbors.easternNeighbor().position_id <= end_position.position_id){
                return this.getContents(neighbors.easternNeighbor(), end_position, floor, contents);
            } else {
                let next_row_first = (node.position_id - (this.radius * 2)) >= 0 ?
                    this.tower.getFloor(new_floor).getNode((node.position_id - (this.radius * 2))) :
                    this.tower.getFloor(new_floor).getNode(0);
                return this.getContents(next_row_first, end_position, new_floor, contents);
            }
        }
        return this.getContents(node, end_position, new_floor, contents);
    }

    // TODO: Refactor paint/unpaint to leverage contents instead of re-implementing search method.
    paint(node, end_position, floor){
        let neighbors = new Neighbor(node, this.tower);
        if(floor === end_position.floor_id - 1){
            return true;
        }

        if(this.inCircle(node)){
            node.domElement.classList.add('circle-area');
        }

        if(neighbors.easternNeighbor().position_id <= end_position.position_id){
            return this.paint(neighbors.easternNeighbor(), end_position, floor);
        } else {
            let new_floor = floor - 1;
            let next_row_first = this.tower.getFloor(new_floor).getNode((node.position_id - (this.radius * 2)));
            return this.paint(next_row_first, end_position, new_floor);
        }
    }

    stripPaint(node, end_position, floor){
        let neighbors = new Neighbor(node, this.tower);
        if(floor === end_position.floor_id - 1){
            return true;
        }

        if(this.inCircle(node)){
            this.contents.pop();
            node.domElement.classList.remove('circle-area');
        }

        if(neighbors.easternNeighbor().position_id <= end_position.position_id){
            return this.stripPaint(neighbors.easternNeighbor(), end_position, floor);
        } else {
            let new_floor = floor - 1;
            let next_row_first = this.tower.getFloor(new_floor).getNode((node.position_id - (this.radius * 2)));
            return this.stripPaint(next_row_first, end_position, new_floor);
        }
    }

    searchStartPosition(node, steps=0){
        let neighbors = new Neighbor(node, this.tower);
        if (steps === this.radius * 2 || !neighbors.northernNeighbor()){
            return node;
        }

        if(steps < this.radius){
            if(neighbors.westernNeighbor()){
                return this.searchStartPosition(neighbors.westernNeighbor(), steps + 1);
            }
            // Handle if we're at the left edge of the map
            let max_steps_left = this.radius / 2;
            return this.searchStartPosition(neighbors.northernNeighbor(), steps + max_steps_left + 1);
        } else {
            return this.searchStartPosition(neighbors.northernNeighbor(), steps + 1);
        }
    }

    searchEndPosition(node, steps=0){
        let neighbors = new Neighbor(node, this.tower);
        if (steps === this.radius * 2 || !neighbors.easternNeighbor()){
            return node;
        }

        if(steps < this.radius){
            return this.searchEndPosition(neighbors.easternNeighbor(), steps + 1);
        } else {
            if(neighbors.southernNeighbor()){
                return this.searchEndPosition(neighbors.southernNeighbor(), steps + 1);
            } else {
                return this.searchEndPosition(node, this.radius * 2);
            }
        }
    }
}