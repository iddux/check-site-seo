const express = require('express');
const app = express();
const middleware =  require('./middlewares/middlewares');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const analysisRouter = require('./routes/analysisRoutes');

const {BadRequest} = require('./utils/handleErrors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


app.use('/auth', authRouter)
app.use('/analysis', middleware.authenticate, analysisRouter);

// not found route
app.use((req, res) => {
    res.status(404);
    throw new BadRequest('Route not found');
});

// errors middleware
app.use(middleware.handleGeneralErrors);

module.exports = app;
