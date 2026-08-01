const config = require('./config');
const connectDB = require('./config/database');
const app = require('./app');

const PORT = config.port;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
