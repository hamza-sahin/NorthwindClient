const express = require('express');
const connectDB = require('./config/db');

const app = express();

// ConnectDB
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/customers', require('./routes/api/customers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
