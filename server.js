require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const port = 8088;
const helmet = require('helmet');
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://example2.com'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(helmet());

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rapid Cricket Line, live score  app for mobile !!',
  });
});

require('./routes/global.route')(app);

server.listen(port, () => {
  console.log(`Rapid Cricket Line app listening on port ${port}`);
});
