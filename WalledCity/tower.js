class Tower{
    constructor(demand) {
        this.floors = [];
        this.demand = demand;
        this.jobs = [];
        this.lobbies = [];
        this.tenants = new Map();
        this.policed_area = [];
        this.crimes = new Map();
    }

    /** Floor Repo **/
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
        return this.floors.length - 1;
    }

    /** Jobs Repo **/
    addJob(job){
        this.jobs.push(job);
    }

    getLocationsAvailableJobs(location){
        let available_jobs = [];
        for(let i=0; i<this.jobs.length;i++){
            if(this.jobs[i].location === location && this.jobs[i].worker === null){
                available_jobs.push(this.jobs[i])
            }
        }
        return available_jobs;
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

    getTenantsJob(tenant){
        for(let i=0; i<this.jobs.length;i++){
            if(this.jobs[i].worker === tenant.home){
                return this.jobs[i];
            }
        }
        return undefined;
    }

    getTotalJobs(){
        return this.jobs.length - 1;
    }

    /** Lobby Repo **/
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

    /** Tenants Repo **/
    addTenant(tenant){
        this.tenants.set(tenant.home, tenant);
    }

    removeTenant(tenant){
        // TODO: Remove from job.
        this.tenants.delete(tenant.home);
    }

    getTenant(node){
        return this.tenants.get(node);
    }

    /** Policed Repo **/
    addPolicedArea(policed_area){
        this.policed_area.concat(policed_area);
    }

    removePolicedArea(policed_area){
        for(let i=0; i<policed_area.length; i++){
            let index = this.policed_area.indexOf(policed_area[i]);
            if(index !== -1){
                this.policed_area.splice(index, 1);
            }
        }
    }

    isPoliced(node){
        return this.policed_area.includes(node);
    }

    /** Crime repo **/
    addCrime(crime){
        this.crimes.set(crime.node, crime);
    }

    removeCrime(crime){
        this.crimes.delete(crime.node);
    }

    getCrime(node){
        return this.crimes.get(node);
    }

    getTotalCrimes(){
        return this.crimes.size;
    }
}