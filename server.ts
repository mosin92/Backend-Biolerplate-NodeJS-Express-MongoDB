import config from 'config';
import connectDB from 'config/database';
import app from 'app';
import registerProcessHandlers from 'services/startupProcessHandlersService';

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

registerProcessHandlers(server);
