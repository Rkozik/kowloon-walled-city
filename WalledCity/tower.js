class Tower{
    constructor(demand) {
        this.floors = [];
        this.demand = demand;
        this.jobs = [];
    }

    addFloor(floor){
        this.floors.push(floor);
    }

    getFloor(number){
        for(let i=0;i<this.floors.length;i++){
            if(this.floors[i].number === number){
                return this.floors[i];
            }
        }
        return false;
    }

    getTotalFloors(){
        return this.floors.length;
    }

    addJob(job){
        this.jobs.push(job);
    }

    getAvailableJobs(){
        let open_jobs = [];
        for(let i=0; i<this.jobs.length;i++){
            if(this.jobs[i].worker === null){
                open_jobs.push(this.jobs[i]);
            }
        }
        return open_jobs;
    }

    getTotalJobs(){
        return this.jobs.length;
    }
}