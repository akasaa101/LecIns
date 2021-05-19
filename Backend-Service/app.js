const express = require ('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

//require('dotenv').config({path: __dirname + '/.env'});


const UserRoutes = require('./api/routes/user');

mongoose.connect('mongodb://bauproje:bahcesehir3434i@cluster0-shard-00-00.ed8qj.mongodb.net:27017,cluster0-shard-00-01.ed8qj.mongodb.net:27017,cluster0-shard-00-02.ed8qj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-a6f8vz-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex :true
}).then(() => console.log('Auth-Mongo DB connection is Done...'))
.catch(err =>console.log(err)); 



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res,next)=>{
    res.status(200).json({message : 'Okey'})
})
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json();   
    }
    next();
})


app.use('/user', UserRoutes);

app.use((req,res,next) => {
    const error = new Error ('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app;