class BankAccount{
    constructor(initial_balance) {
        this.balance = initial_balance;
        this.residential_renters = new Map();
        this.commercial_renters = new Map();
        this.industrial_renters = new Map();
        this.residential_rent = 50;
        this.commercial_rent = 75;
        this.industrial_rent = 100;
    }

    deposit(money){
        this.balance = this.balance + money;
    }

    withdraw(money){
        this.balance = this.balance - money;
    }

    run(){
        let self = this;
        setInterval(function () {
            let formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            let balance = document.getElementById("wallet");
            balance.innerHTML = '<b>' + formatter.format(self.balance)+ '</b>';
            self.calculateRent();
        }, 0);
    }

    addRenter(node){
        switch (node.type) {
            case "residential-occupied":
                this.residential_renters.set(node, true);
                this.deposit(1000);
                break;
            case "commercial-occupied":
                this.commercial_renters.set(node, true);
                this.deposit(1500);
                break;
            case "industrial-occupied":
                this.industrial_renters.set(node, true);
                this.deposit(1750);
                break;
            default:
                break;
        }
    }

    payRent(type){
        switch (type) {
            case "residential":
                this.deposit(this.residential_rent);
                break;
            case "commercial":
                this.deposit(this.commercial_rent);
                break;
            case "industrial":
                this.deposit(this.industrial_rent);
                break;
            default:
                break;

        }
    }

    calculateRent(){
        let residential_income = this.residential_renters.size * this.residential_rent;
        let commercial_income = this.commercial_renters.size * this.commercial_rent;
        let industrial_income = this.industrial_renters.size * this.industrial_rent;

        let rental_income = document.getElementById("rental-income");

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        let total_rent = residential_income + commercial_income + industrial_income;

        rental_income.innerHTML = '<b>+' + formatter.format(total_rent) + "</b>";

    }
}