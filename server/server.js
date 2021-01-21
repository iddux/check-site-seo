const app = require('./index.js');
const http = require('http').createServer(app);
const DBConnect = require('./config/DBConnect')

DBConnect();

http.listen(process.env.DB_PORT, () => {
    console.log('listen on port 5000')
})
