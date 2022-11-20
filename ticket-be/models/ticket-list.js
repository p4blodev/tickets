const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pendings = [];
    this.assigneds = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get last13() {
    return this.assigneds.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendings.push(newTicket);

    return newTicket;
  }

  assignTicket(agent, desktop) {
    if (this.pendings.length === 0) return;

    const nextTicket = this.pendings.shift();

    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.assigneds.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
