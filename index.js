import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
const PORT = 4000;

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CRMdb',{
    useNewUrlParser: true,
    useUnifiedTopology : true
});

// bodyparser setup
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// JWT setup
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if(err) req.user = undefined;
            req.user = decode;
            next();
        });
    }else{
        req.user = undefined;
        next();
    }
});

//serving static files
app.use(express.static('public'));

routes(app);

 app.get('/', (req, res) => {
    res.send(`Node and express running on port ${PORT}`);
 });

 app.listen(PORT, () => {
     console.log(`Your Server is running on port ${PORT}`);
 })