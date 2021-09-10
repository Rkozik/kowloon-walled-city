import { Route } from "./route";
import { RandomUtils } from "./utils/random_utils";

export class Tenant {
  name = null;
  job = null;
  destination = null;
  location = null;
  random_utils = new RandomUtils();
  constructor(public home, public tower) {}

  assignJob() {
    // Find nearest vacancy
    // TODO: Move logic from residential_residence.js to here.
  }

  draw() {
    //this.dailyRoutine();
  }

  isUnemployed() {
    return this.job === null;
  }

  setJob(node) {
    this.job = node;
  }

  dailyRoutine() {
    setInterval(() => {
      /** There are 2500ms is 1 hour **/

      // Wake up at 6:00-8:00 AM
      let wakeup = [2500 * 6, 2500 * 7, 2500 * 8];
      let wakeup_time = this.random_utils.randomInArray(wakeup);
      let wakeup_animation = 2500;
      setTimeout(() => {}, wakeup_time);

      // TODO: Determine how long it takes to "walk" a single node.
      // TODO: For planning's sake let's say the total time is 30 min --or-- 1250ms
      let walk_to_work_time = wakeup_time + wakeup_animation;
      // setTimeout( ()=> {
      //   if (this.job !== null) {
      //     let route_to_job = new Route(this.tower).traverse(
      //       this.home,
      //       this.job
      //     );
      //     let walk_to_work = this.walkToDestination(route_to_job);

      //     let walk_home = this.walkToDestination();
      //   }
      // }, walk_to_work_time);

      let start_work_time = walk_to_work_time + 1250;
      // setTimeout(() => {}, start_work_time);

      // Stay at work for 4-8 hours
      let work_times = [2500 * 4, 2500 * 5, 2500 * 6, 2500 * 7, 2500 * 8];
      let work_time = this.random_utils.randomInArray(work_times);

      // TODO: If time is left, randomly choose a shop to walk or walk straight home.
      let start_free_time = 1000 * 60 - start_work_time - work_time;
      setTimeout(() => {}, start_free_time);
    }, 1000 * 60);
  }

  walkToDestination(path) {
    for (let i = 0; i < path.length; i++) {
      this.location = path[i];
      // Wait, and play animation.
      // TODO: May have to use setTimeout and recursion/dynamic programming.

      // Handle different node types
      if (path[i].type === "stairs") {
      }
    }
    return true;
  }

  atHomeActivity() {}
}
