require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// routes
const vaultRoutes = require('./routes/vault');
app.use('/api', vaultRoutes);

// basic health route
app.get('/', (req, res) => res.send('HeirLoom backend'));

//const { sequelize } = require('./models/User');
//sequelize.sync({ alter: true }).then(() => console.log('DB synced'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
