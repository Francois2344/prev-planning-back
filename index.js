const express = require('express');
const cors = require('cors');
require('./database/initDB')();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

const usersRouter = require('./routes/users');
const agenciesRouter = require('./routes/agency');
const hazardsRouter = require('./routes/hazard');
const othersRouter = require('./routes/other');
const sitesRouter = require('./routes/site');

app.use('/users', usersRouter);
app.use('/agencies', agenciesRouter);
app.use('/hazards', hazardsRouter);
app.use('/others', othersRouter);
app.use('/sites', sitesRouter);

app.listen(PORT, () => {
  console.log(`Server started on port${PORT}...`);
});
