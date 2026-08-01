const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0'
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorHandler);

module.exports = app;
