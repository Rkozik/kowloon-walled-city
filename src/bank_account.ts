export class BankAccount {
  residential_renters = new Map();
  commercial_renters = new Map();
  industrial_renters = new Map();
  residential_rent = 50;
  commercial_rent = 75;
  industrial_rent = 100;
  paid_today = 0;
  paid_yesterday = 0;
  constructor(public balance, clock?) {}

  deposit(money) {
    this.balance = this.balance + money;
  }

  withdraw(money) {
    this.balance = this.balance - money;
  }

  run() {
    setInterval(() => {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let balance = document.getElementById("wallet");
      balance.innerHTML = "<b>" + formatter.format(this.balance) + "</b>";
      this.calculateRent();
    }, 0);

    setInterval(() => {
      this.paid_yesterday = this.paid_today;
      this.paid_today = 0;
    }, 30000);
  }

  addRenter(node) {
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

  payRent(type) {
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

  calculateRent() {
    let rental_income = document.getElementById("rental-income");
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    rental_income.innerHTML =
      "<b>+" + formatter.format(this.paid_yesterday) + "</b>";
  }
}
