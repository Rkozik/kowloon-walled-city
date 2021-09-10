import { Job } from "../job";
import { DrawUtils } from "../utils/draw_utils";
import { RandomUtils } from "../utils/random_utils";

export class IndustrialResidence {
  utils = new DrawUtils();
  random_utils = new RandomUtils();
  jobs;
  constructor(public node, public tower, public bank_account) {
    this.jobs = new Job(this.tower);
  }

  draw() {
    if (this.canConstruct()) {
      this.node.domElement.className = "node";
      this.node.domElement.classList.add("industrial-empty");
      this.node.type = "industrial-empty";
    }
    this.checkDemand();
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
      (this.node.domElement.classList[1] === "industrial-empty" ||
        this.node.type === "abandoned") &&
      this.tower.demand.industrial >= 1
    ) {
      this.node.domElement.className = "node";
      let residence_lvl1 = [
        "industrial-occupied",
        "industrial-occupied-1",
        "industrial-occupied-2",
      ];
      let residence = this.random_utils.randomInArray(residence_lvl1);
      this.node.domElement.classList.add(residence);
      this.node.type = "industrial-occupied";
      this.tower.demand.decreaseIndustrialDemand(1);
      this.bank_account.addRenter(this.node);

      // Add job to job list
      let new_job = new Job(this.tower);
      new_job.setLocation(this.node);

      let new_job2 = new Job(this.tower);
      new_job2.setLocation(this.node);

      this.tower.addJob(new_job);
      this.tower.addJob(new_job2);
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
      if (this.tower.demand.industrial > 0) {
        this.handleDemand();
      }
    }, 1000 * 15);
  }
}
