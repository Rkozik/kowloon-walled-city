import { Job } from "../job";
import { Tenant } from "../tenant";
import { DrawUtils } from "../utils/draw_utils";
import { RandomUtils } from "../utils/random_utils";

export class ResidentialResidence {
  utils = new DrawUtils();
  random_utils = new RandomUtils();
  constructor(public node, public tower, public bank_account) {}

  draw() {
    if (this.canConstruct()) {
      this.node.domElement.className = "node";
      this.node.domElement.classList.add("residential-empty");
      this.node.type = "residential-empty";
    }
    this.checkDemand();
    this.increaseDemand();
    this.checkJobs();
  }

  erase() {}

  canConstruct() {
    return (
      this.node.domElement.classList[1] === "empty" ||
      this.node.domElement.classList[1] === "empty-basement"
    );
  }

  handleDemand() {
    let build_on_abandoned = false;
    if (this.node.type === "abandoned") {
      build_on_abandoned = this.random_utils.randomInRange(0, 9) === 0;
    }

    if (
      (this.node.type === "residential-empty" || build_on_abandoned) &&
      this.tower.demand.residential >= 1 &&
      !this.tower.getCrime(this.node)
    ) {
      this.node.domElement.className = "node";

      let residence_lvl1 = [
        "residential-occupied",
        "residential-occupied-1",
        "residential-occupied-2",
        "residential-occupied-3",
      ];
      let residence = this.random_utils.randomInArray(residence_lvl1);
      this.node.domElement.classList.add(residence);
      this.node.type = "residential-occupied";

      // Register tenant
      let new_tenant = new Tenant(this.node, this.tower);
      this.tower.addTenant(new_tenant);

      // Add tenant as a renter
      this.bank_account.addRenter(this.node);

      // Modify demand
      this.tower.demand.decreaseResidentialDemand(1);
      this.tower.demand.increaseCommercialDemand(0.075);
    }
  }

  checkJobs() {
    let job = new Job(this.tower);
    setInterval(() => {
      let tenant = this.tower.getTenant(this.node);
      if (
        this.node.type === "residential-occupied" &&
        tenant.isUnemployed() &&
        !this.tower.getCrime(this.node)
      ) {
        let new_job = job.jobSearch(tenant.home);
        if (new_job !== false) {
          tenant.setJob(new_job);
          this.node.domElement.innerHTML = "";
        } else {
          this.node.domElement.innerHTML =
            '<div id="' + this.node.domElement.id + '" class="no-job"></div>';
        }
      }
    }, 1000 * 3);
  }

  checkDemand() {
    setInterval(() => {
      if (this.tower.demand.residential > 0) {
        this.handleDemand();
      }
    }, 1000 * 10);
  }

  increaseDemand() {
    setInterval(() => {
      if (
        this.node.type === "residential-occupied" &&
        !this.tower.getCrime(this.node)
      ) {
        this.tower.demand.increaseCommercialDemand(0.025);
      }
    }, 1000 * 45);
  }
}
