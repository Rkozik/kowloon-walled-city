class Toolbar{
    constructor(gui, clock, bank_account) {
        this.gameboard =  document.getElementById("gameboard");
        this.toolbar = document.createElement('div');
        this.toolbar.id = "toolbar";
        this.gui = gui;
        this.clock = clock;
        this.bank_account = bank_account;
    }

    run(){
        this.draw();
        let toolbar_icons = document.getElementsByClassName("toolbar-ico");
        for(let i=0;i<toolbar_icons.length;i++){
            toolbar_icons[i].addEventListener('click', this.iconClick.bind(this), false);
        }
    }

    draw(){
        this.createToolbarIcon("lobby-ico");
        this.createToolbarIcon("tenant-ico");
        this.createToolbarIcon("stairs-ico");
        this.createToolBarDivider();
        this.createToolbarIcon("residential-ico");
        this.createToolbarIcon("commercial-ico");
        this.createToolbarIcon("industrial-ico");
        this.createToolBarDivider();
        this.createToolbarIcon("pointer-ico");
        this.createGameClock();
        this.createRentalIncome();
        this.createWallet();
        this.createToolBarDemand();
        this.gameboard.prepend(this.toolbar);

        this.clock.run();
        this.bank_account.run();
    }

    iconClick(event){
        switch(event.target.id){
            case "residential-ico":
                this.gui.updatePointer("residential");
                break;
            case "commercial-ico":
                this.gui.updatePointer("commercial");
                break;
            case "industrial-ico":
                this.gui.updatePointer("industrial");
                break;
            case "lobby-ico":
                this.gui.updatePointer("lobby");
                break;
            case "tenant-ico":
                this.gui.updatePointer("tenant");
                break;
            case "stairs-ico":
                this.gui.updatePointer("stairs");
                break;
            default:
                this.gui.updatePointer("pointer");
                break;
        }
    }

    createToolbarIcon(id_name){
        let icon = document.createElement('div');
        icon.className = "toolbar-ico";
        icon.id = id_name;

        this.toolbar.append(icon);
    }

    createToolBarDivider(){
        let divider = document.createElement('div');
        divider.classList = "toolbar-divider";

        this.toolbar.append(divider);
    }

    createToolBarDemand(){
        let demand_container = document.createElement('div');

        demand_container.id = "demand-container";

        let residential_demand = document.createElement('div');
        let commercial_demand = document.createElement('div');
        let industrial_demand = document.createElement('div');

        residential_demand.className = "demand-bar";
        commercial_demand.className = "demand-bar";
        industrial_demand.className = "demand-bar";

        let residential_demand_indicator = document.createElement('div');
        let commercial_demand_indicator = document.createElement('div');
        let industrial_demand_indicator = document.createElement('div');

        residential_demand_indicator.id = "residential-demand";
        commercial_demand_indicator.id = "commercial-demand";
        industrial_demand_indicator.id = "industrial-demand";

        residential_demand.append(residential_demand_indicator);
        commercial_demand.append(commercial_demand_indicator);
        industrial_demand.append(industrial_demand_indicator);

        demand_container.append(residential_demand);
        demand_container.append(commercial_demand);
        demand_container.append(industrial_demand);

        this.toolbar.append(demand_container);
    }

    createGameClock(){
        let game_clock_container = document.createElement('div');
        game_clock_container.id = "game-clock-container";

        let game_clock = document.createElement('div');
        game_clock.id = "game-clock";
        game_clock.innerHTML = "<b>00:00</b>";

        let game_clock_amPm = document.createElement('div');
        game_clock_amPm.id = "game-clock-am-pm";
        game_clock_amPm.innerHTML = "<b>AM</b>";

        game_clock_container.append(game_clock);
        game_clock_container.append(game_clock_amPm);

        this.toolbar.append(game_clock_container);
    }

    createWallet(){
        let wallet = document.createElement('div');
        wallet.id = "wallet";
        wallet.innerHTML = "<b>$0.00</b>";

        this.toolbar.append(wallet)
    }

    createRentalIncome(){
        let rental_income = document.createElement('div');
        rental_income.id = "rental-income";
        rental_income.innerHTML = "<b>+$0.00</b>";

        this.toolbar.append(rental_income);
    }
}