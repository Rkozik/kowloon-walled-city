class Demand{
    constructor(residential, commercial, industrial) {
        this.residential = residential;
        this.commercial = commercial;
        this.industrial = industrial;
        this.residential_limit = 20;
        this.commercial_limit = 17;
        this.industrial_limit = 19;
    }

    draw(){
        let residential_percentage = this.roundUpToNext5((this.residential / this.residential_limit) * 100);
        let commercial_percentage = this.roundUpToNext5((this.commercial / this.commercial_limit) * 100);
        let industrial_percentage = this.roundUpToNext5((this.industrial / this.industrial_limit) * 100);

        let residential_demand = document.getElementById('residential-demand');
        let commercial_demand = document.getElementById('commercial-demand');
        let industrial_demand = document.getElementById('industrial-demand');

        residential_demand.setAttribute('style','width:' + residential_percentage + "px;");
        commercial_demand.setAttribute('style','width:' + commercial_percentage + "px;");
        industrial_demand.setAttribute('style','width:' + industrial_percentage + "px;");
    }

    roundUpToNext5(number){
        if (number < 5 && number > 0){
            number = 5;
        } else {
            number = (number/ 5) * 5;
        }
        return number;
    }

    increaseResidentialDemand(increase){
        if(this.residential + increase < this.residential_limit){
            this.residential += increase;
        }
    }

    decreaseResidentialDemand(decrease){
        this.residential = this.residential - decrease;
    }

    increaseCommercialDemand(increase){
        if(this.commercial + increase < this.commercial_limit){
            this.commercial += increase;
        }
    }

    decreaseCommercialDemand(decrease){
        this.commercial = this.commercial - decrease;
    }

    increaseIndustrialDemand(increase){
        if(this.industrial + increase < this.industrial_limit){
            this.industrial += increase;
        }
    }

    decreaseIndustrialDemand(decrease){
        this.industrial = this.industrial - decrease;
    }

    outputDemand(){
        let self = this;
        setInterval(function () {
            self.draw();
        }, 3000);
    }
}