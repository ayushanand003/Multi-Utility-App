const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ This is important!
const calculatorRoute = require('./routes/calculator');
app.use('/api/calculate', calculatorRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use((req, res, next) => {
  console.log(`🔥 Unknown route: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
