const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const http = require('http');
const https = require('https');
const fs = require('fs');
const fileRoutes = require('./routes/fileupload');

require('./database/initDB')();

const options = {
  key: fs.readFileSync(path.resolve('selfsigned.key')),
  cert: fs.readFileSync(path.resolve('selfsigned.cert')),
};

const app = express();
const PORT = process.env.PORT || 8000;

const optionsSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Planning Prev API',
      version: '1.0.0',
      description: 'Prev Management',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(optionsSwagger);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

const usersRouter = require('./routes/users');
const agenciesRouter = require('./routes/agency');
const hazardsRouter = require('./routes/hazard');
const othersRouter = require('./routes/other');
const sitesRouter = require('./routes/site');
const adminAuthRouter = require('./routes/adminAuth');

app.use('/users', usersRouter);
app.use('/agencies', agenciesRouter);
app.use('/hazards', hazardsRouter);
app.use('/others', othersRouter);
app.use('/sites', sitesRouter);
app.use('/register', adminAuthRouter);
app.use('/imagesUpload', fileRoutes.routes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port${PORT}...`);
});

http.createServer(app).listen(8080);
https.createServer(options, app).listen(443);

module.exports = server;
