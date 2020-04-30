class Tower{
    constructor(demand) {
        this.floors = [];
        this.demand = demand;
        this.jobs = [];
        this.lobbies = [];
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

    addLobby(lobby){
        this.lobbies.push(lobby);
    }

    removeLobby(lobby){
        let index = this.lobbies.indexOf(lobby);
        if(index > -1){
            this.lobbies.splice(index, 1);
        }
    }

    getLobby(node){
        let index = this.lobbies.indexOf(node);
        return index !== -1 ? this.lobbies[index] : false;
    }
}