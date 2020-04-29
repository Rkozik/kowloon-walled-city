class BankAccount{
    constructor(initial_balance) {
        this.balance = initial_balance;
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
        }, 0);
    }
}