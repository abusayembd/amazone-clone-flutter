const express = require('express'); // importing express like in dart import 'package:express/express.dart';

const User = require('../models/user'); // importing the user model from the models folder
const bcryptjs = require('bcryptjs');

const authRouter = express.Router(); // creating an instance of express, initialing and saving it to a variable named authRouter

const jwt = require('jsonwebtoken'); // importing jsonwebtoken
const auth = require('../middlewares/auth');

//Signup 
authRouter.post('/api/signup', async (req, res) => {
    //get the data from the client
    try{
        const { name,email, password } = req.body;

        //validate the data
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists !'});
        }

        const hashedPassword = await bcryptjs.hash(password, 8); //salt 8 will automatically included with our string
    
        let user = new User({
            email,
            name,
            password: hashedPassword,
        })
        user = await user.save();
        // res.json(user);
        res.json({user});
    
        //_version
        //id
    
        //post the data in the database
    
        //return the data to the user

    }
    catch(e){
        res.status(500).json({error: e.message});
    }
   
}); // creating a route for the login endpoint

//Sign in route
authRouter.post('/api/signin', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({message: 'User with this email does not exist !'});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Incorrect password !'});
        }
        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({token, ...user._doc}); 

    }catch(e){
        res.status(500).json({error: e.message});
    }
});

authRouter.post('/tokenIsValid', async (req, res) => {
    try{
        
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        const verified = jwt.verify(token, 'passwordKey');
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);
        
        

    }catch(e){
        res.status(500).json({error: e.message});
    }
});

// get user data 
authRouter.get('/', auth, async (req, res)=> {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token})
})

module.exports = authRouter; // exporting the authRouter to the index.js file
