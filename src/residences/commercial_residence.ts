import { Job } from "../job";
import { DrawUtils } from "../utils/draw_utils";
import { RandomUtils } from "../utils/random_utils";

export class CommercialResidence {
  utils = new DrawUtils();
  random_utils = new RandomUtils();
  constructor(public node, public tower, public bank_account) {}

  draw() {
    if (this.canConstruct()) {
      this.node.domElement.className = "node";
      this.node.domElement.classList.add("commercial-empty");
      this.node.type = "commercial-empty";
    }
    this.checkDemand();
    this.increaseDemand();
    this.handleVacantJobs();
  }

  canConstruct() {
    return (
      this.node.domElement.classList[1] === "empty" ||
      this.node.domElement.classList[1] === "empty-basement"
    );
  }

  handleDemand() {
    if (
      (this.node.domElement.classList[1] === "commercial-empty" ||
        this.node.type === "abandoned") &&
      this.tower.demand.commercial >= 1
    ) {
      this.node.domElement.className = "node";
      let residence_lvl1 = [
        "commercial-occupied",
        "commercial-occupied-1",
        "commercial-occupied-2",
      ];
      let residence = this.random_utils.randomInArray(residence_lvl1);
      this.node.domElement.classList.add(residence);
      this.node.type = "commercial-occupied";
      this.tower.demand.decreaseCommercialDemand(1);
      this.tower.demand.increaseResidentialDemand(2);
      this.tower.demand.increaseIndustrialDemand(1);
      this.bank_account.addRenter(this.node);

      // Add jobs to jobs list
      for (let job of ["manager", "assistent"]) {
        let new_job = new Job(this.tower);
        new_job.setLocation(this.node);
        new_job.setJobName(job);
        this.tower.addJob(new_job);
      }
    }
  }

  handleVacantJobs() {
    setInterval(() => {
      let available_jobs = this.tower.getLocationsAvailableJobs(this.node);
      for (let i = 0; i < available_jobs.length; i++) {
        this.tower.demand.increaseResidentialDemand(1);
      }
    }, 1000 * 30);
  }

  checkDemand() {
    setInterval(() => {
      if (this.tower.demand.commercial > 0) {
        this.handleDemand();
      }
    }, 1000 * 15);
  }

  increaseDemand() {
    setInterval(() => {
      if (this.node.type === "commercial-occupied") {
        this.tower.demand.increaseIndustrialDemand(0.1);
      }
    }, 1000 * 75);
  }
}
