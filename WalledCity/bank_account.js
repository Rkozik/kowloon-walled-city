class BankAccount{
    constructor(initial_balance, clock) {
        this.balance = initial_balance;
        this.residential_renters = new Map();
        this.commercial_renters = new Map();
        this.industrial_renters = new Map();
        this.residential_rent = 50;
        this.commercial_rent = 75;
        this.industrial_rent = 100;
        this.paid_today = 0;
        this.paid_yesterday = 0;
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

        setInterval(function () {
            self.paid_yesterday = self.paid_today;
            self.paid_today = 0;
        }, 30000);
    }

    addRenter(node){
        switch (node.type) {
            case "residential-occupied":
                this.residential_renters.set(node, true);
                this.deposit(250);
                break;
            case "commercial-occupied":
                this.commercial_renters.set(node, true);
                this.deposit(500);
                break;
            case "industrial-occupied":
                this.industrial_renters.set(node, true);
                this.deposit(750);
                break;
            default:
                break;
        }
    }

    payRent(type){
        switch (type) {
            case "residential":
                this.deposit(this.residential_rent);
                this.paid_today += this.residential_rent;
                break;
            case "commercial":
                this.deposit(this.commercial_rent);
                this.paid_today += this.commercial_rent;
                break;
            case "industrial":
                this.deposit(this.industrial_rent);
                this.paid_today += this.industrial_rent;
                break;
            default:
                break;
        }
    }

    calculateRent(){
        let rental_income = document.getElementById("rental-income");
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        rental_income.innerHTML = '<b>+' + formatter.format(this.paid_yesterday) + "</b>";
    }
}