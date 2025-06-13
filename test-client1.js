const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected");

  // Join auction room
  socket.emit("joinAuction", { auctionId: "123" });
  console.log("Joined auction 123");

  // Listen for bid updates
  socket.on("bidUpdate", (data) => {
    console.log("Bid update:", data);
  });

  // Place a bid
  socket.emit("placeBid", { auctionId: "35324", bidderId: "user2", amount: 700 });
  console.log("Placed a bid");
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
