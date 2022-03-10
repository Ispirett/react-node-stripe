const express = require('express');
var cors = require('cors');
require('dotenv').config();
const app = express();
var morgan = require('morgan');
var mongoose = require('mongoose')




//* Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* routes
app.get('/', (req,res) => {
    res.send('Stripe example');
})

const routes = require('./routes')(app);


//* db 
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db')

        //* serve
        const server = app.listen(process.env.PORT || 4100, () => {
            console.log('Server is running on port', server.address().port);
        })
})

