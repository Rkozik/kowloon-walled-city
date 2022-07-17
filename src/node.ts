export class Node {
  type = null;
  constructor(public floor_id, public position_id) {}

  get floor() {
    return this.floor_id;
  }

  setFloor(floor_id) {
    this.floor_id = floor_id;
  }

  get position() {
    return this.position_id;
  }

  setPosition(position_id) {
    this.position_id = position_id;
  }

  get domElement() {
    return document.getElementById(
      "node_" + this.floor_id + "_" + this.position_id
    );
  }
}
