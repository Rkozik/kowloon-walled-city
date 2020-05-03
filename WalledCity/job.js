class Job{
    constructor(tower) {
        this.tower = tower;
        this.location = null;
        this.worker = null;
        this.name = "";
    }

    setJobName(name){
        this.name = name;
    }

    setWorker(worker){
        this.worker = this.worker === null ? worker : this.worker;
    }

    removeWorker(worker){
        this.worker = null;
        worker.job = null;
    }

    setLocation(location){
        this.location = location;
    }

    jobSearch(worker){
        let job_list = this.tower.getAvailableJobs();
        let route = new Route(this.tower);
        let job_distances = new Map();
        if(job_list.length > 0){
            for(let i=0;i<job_list.length;i++){
                let job_distance = route.traverseEachBuilding(worker, job_list[i].location);
                job_distances.set(job_list[i], job_distance.length);
            }
            let reversed = new Map();
            let values = [];
            job_distances.forEach(function (v, k) {
                reversed.set(v, k);
                values.push(v);
            });
            values.sort();

            let closest_job = reversed.get(values[0]);
            closest_job.setWorker(worker);
            return closest_job;
        }
        return false;
    }
}