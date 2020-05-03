class Police{
    constructor(node, tower) {
        this.node = node;
        this.tower = tower;
        this.area = null;
    }

    draw(){
        // TODO: implement draw radius of effect on hover, erase circle on mouseout
        // TODO: functionality for hover might have to be in GUI.js

        let policed_area = new CircleArea(4, this.node, this.tower);
        this.area = policed_area.contents;

        this.tower.addPolicedArea(this.area);
    }

    erase(){
        this.tower.removePolicedArea(this.area);
    }
}