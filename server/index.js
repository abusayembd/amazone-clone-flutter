const express = require('express'); // importing express like in dart import 'package:express/express.dart';
const mongoose = require('mongoose'); // importing mongoose like in dart import 'package:mongoose/mongoose.dart';
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth'); // importing the auth router from the routes folder

//init
const PORT = 3000; // creating a constant variable named PORT and assigning it a value of 3000

const app = express(); // creating an instance of express, initialing and saving it to a variable named app
const DB = "mongodb+srv://sayem:sayem1234@cluster0.dgxet5t.mongodb.net/?retryWrites=true&w=majority"; // creating a constant variable named DB and assigning it a value of mongodb+srv://MD_Abu_Sayem:<password>@cluster0.jgf71ls.mongodb.net/?retryWrites=true&w=majority



//middleware
//Clint ->  Middleware -> Server -> Client
app.use(express.json()); // using the express json middleware to parse the json data from the client
app.use(authRouter); // middleware to parse the json data
app.use(adminRouter);


//creating an API
mongoose.connect(DB).then(() => {
    console.log(' Succesfully Connected to MongoDB');
}
)
.catch((e)=> {console.log(e);
});

// GET, PUT, POST, DELETE, UPDATE -> CRUD

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Connected at port no  ${PORT}`);
}); // listening to the port 3000, and if it works, it will print to the console

