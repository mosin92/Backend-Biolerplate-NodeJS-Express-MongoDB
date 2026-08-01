const mongoose = require('mongoose');

const registerProcessHandlers = (server) => {
  const shutdown = (signal) => {
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
};

module.exports = registerProcessHandlers;
