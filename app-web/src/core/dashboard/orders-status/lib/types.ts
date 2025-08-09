export interface Summary {
    title: string;
    value: string | number;
    icon?: string;
    color?: string
}

// Define the Sale type for WebSocket events
export interface Sale {
  amount: number; // Example field for revenue
  orderId: string; // Example field for order tracking
  // Add other fields as needed (e.g., vendorId, shopId)
}

// server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.json());

// // Simulate a sale endpoint or logic
// app.post('/api/sale', (req, res) => {
//   const sale = req.body; // Example: { amount: 100, orderId: '123' }
//   // Update your database or logic here

//   // Emit sale event to all connected clients
//   io.emit('sale', sale);
//   res.sendStatus(200);
// });

// server.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });