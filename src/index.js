const express = require('express');
const env = require('dotenv');
const  app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');

//environmental variables
env.config();

//mongodb connection
//mongodb+srv://penguin:<password>@cluster0.9znoc.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.9znoc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
   {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
   }
).then(() => {
    console.log('database connected');
})


app.use(bodyParser.json());

app.use('/api',userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});