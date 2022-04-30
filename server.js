const express = require('express');
// const db = require('./config/connection');
const routes = require('./routes/api');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// turn on routes
app.use('/api', routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

