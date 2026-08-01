const config = require('./config');
const connectDB = require('./config/database');
const app = require('./app');
const registerProcessHandlers = require('./services/startupProcessHandlersService');

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

registerProcessHandlers(server);
