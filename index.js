import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';

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

//serving static files
app.use(express.static('public'));

routes(app);

 app.get('/', (req, res) => {
    res.send(`Node and express running on port ${PORT}`);
 });

 app.listen(PORT, () => {
     console.log(`Your Server is running on port ${PORT}`);
 })