const mongoose = require('mongoose');
const config = require('./config');
const connectDB = require('./config/database');
const app = require('./app');

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  server.close(async () => {
    await mongoose.connection.close();
    console.log('Server and MongoDB connection closed');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
