const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("🚀 ~ client connected");

      // Escuchar evento: mensaje-to-server
      socket.on("request-ticket", (_, callback) => {
        const newTicket = this.ticketList.createTicket();

        callback(newTicket);
      });
      socket.on("take-next-ticket", ({ agent, desktop }, callback) => {
        const assignedTicket = this.ticketList.assignTicket(agent, desktop);

        callback(assignedTicket);
        this.io.emit("ticket-assigned", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
