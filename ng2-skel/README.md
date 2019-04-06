# Ng2-Skel

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Run server
Run `ng build && node server/app.js` for a dev server. Navigate to `http://localhost:3000/`. The app will not automatically reload if you change any of the source files.

## Further help for angular-cli

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Install instructions from clone
```
git clone https://github.com/haradatm/ng2-skel
cd ng2-skel
npm install
```

## Step by step guide to installing the skelton from scratch
```
nodebrew install-binary v6.9.5
nodebrew use v6.9.5
node -v
#=> v6.9.5
npm -v
#=> 3.10.10

npm install -g npm to update
npm update -g
#npm install -g npm-check-updates to update
npm -g cache clear

# Ng2-skel
npm install -g angular-cli to update
ng new ng2-skel && cd ng2-skel

npm install --save express body-parser
npm install --save intl ng2-bootstrap bootstrap jquery to update
npm install --save socket.io-client
npm install --save @types/socket.io-client
npm install --save socket.io
npm install --save request https-proxy-agent

# for babel
#npm install --save babel-core babel-preset-es2015

# for mongodb
npm install --save mongoose to update
mkdir -p db logs
/usr/local/bin/mongod --dbpath db --logpath logs/mongodb.log &

cat << 'EOF' > server/app.js
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
//const api = require('./server/routes/api/rest');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
//app.use('/api/rest', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
EOF

ng generate component rest
ng generate service ./rest/rest.service

mkdir -p server/api/rest
cat << 'EOF' > server/api/rest/index.js
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
EOF
```
