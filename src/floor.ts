import { DrawUtils } from "./utils/draw_utils";

export class Floor {
  node_list = [];
  utils = new DrawUtils();
  constructor(public number, public tower) {}

  get nodes() {
    return this.node_list;
  }

  setNode(node) {
    this.node_list.push(node);
  }

  getNode(position) {
    for (let i = 0; i < this.node_list.length; i++) {
      if (this.node_list[i].position_id === position) {
        return this.node_list[i];
      }
    }
    return false;
  }

  getTotalNodes() {
    return this.node_list.length - 1;
  }

  updateNodes() {
    this.node_list.forEach(function (node) {});
  }

  getFirstUsedNode() {
    for (let i = 0; i < this.node_list.length; i++) {
      if (this.node_list[i].domElement.classList.length > 1) {
        return this.node_list[i];
      }
    }
    return false;
  }
}
