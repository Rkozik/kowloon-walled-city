class Demand{
    constructor(residential, commercial, industrial) {
        this.residential = residential;
        this.commercial = commercial;
        this.industrial = industrial;
    }

    increaseResidentialDemand(increase){
        this.residential = this.residential + increase;
    }

    decreaseResidentialDemand(decrease){
        this.residential = this.residential - decrease;
    }

    increaseCommercialDemand(increase){
        this.commercial = this.commercial + increase;
    }

    decreaseCommercialDemand(decrease){
        this.commercial = this.commercial - decrease;
    }

    increaseIndustrialDemand(increase){
        this.industrial = this.industrial + increase;
    }

    decreaseIndustrialDemand(decrease){
        this.industrial = this.industrial - decrease;
    }

    outputDemand(){
        let self = this;
        setInterval(function () {
            console.log("Residential Demand: ", self.residential);
            console.log("Commercial Demand: ", self.commercial);
            console.log("Industrial Demand: ", self.industrial);
        }, 3000);
    }
}