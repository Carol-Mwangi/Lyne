const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();
const bcrypt = require('bcrypt')
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passport-config');

const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const mongoURI = process.env.mongoURI;

console.log(mongoURI)

//connection using mongoclient
const dbName = 'Carol';
const collection = 'NewUsers';

 const client = new MongoClient(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

 //check connection to Mongodb
 client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    //Setting the bodyParser and passport middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: process.env.secret_Key,
        resave: false,
        saveUninitialized: false
    }));
//initializing the passport and starting a session
    app.use(passport.initialize());
    app.use(passport.session()); //starting a session
    initializePassport(passport, 
       async email => {
        const user =  await client.db('Carol').collection('NewUsers').findOne({ email: email });
       return user;
      },
        async id =>{
        const user =  await client.db('Carol').collection('NewUsers').findOne({ _id: id });
        return user;
         }
           );
                               
    
//creating a user
app.get('/signup', (req, res)=> {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/signup', async (req, res)=>{
    try { //extract the user data
        var firstName = req.body.fname;
        var lastName = req.body.lname;
        var email = req.body.email;
        var gender = req.body.gender;
        var password = req.body.password;

        //connect to db
        await client.connect();

        //access db and collection
        const db = client.db('Carol');
        const collection = db.collection('NewUsers');

        const hashedPassword = await bcrypt.hash(password, 10)
//create ner user account
        const newUser = {
            firstName,
            lastName,
            email,
            gender,
            password: hashedPassword
        }
       await collection.insertOne(newUser);
        res.redirect('/login')
        console.log('newUser', newUser);
    } catch (err){
        console.error(err);
        res.send('Error creating the user')
    }
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});

app.get('/login',(req, res)=>{
    res.sendFile(__dirname +'/login.html')
})



//find and login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}));
 



// Start the Express server

//read operation
app.get('/users',async(req,res)=>{
    try {
        await client.connect();

        const db = client.db('Carol');
        const collection = db.collection('NewUsers');

        const users = await collection.find({}).toArray();
        res.json(users);
        console.log(users)

    } catch (err) {
        console.log(err)
        res.send('Error retrieving users');
    }
})

//update user details
app.get('/reset',(req,res)=>{
    res.sendFile(__dirname+'/reset.html')
});

app.post('/reset', async(req,res)=>{
    try {
        console.log('resetPasswordData',req.body)
        const {email, password, confirmPassword}=req.body;

        
        if(password !== confirmPassword) {
            console.log('password Mismatch');
            return res.send('Password mismatch')
        }
        const resetPassword = await bcrypt.hash(password, 10)

        await client.connect();
         const db = client.db('Carol');
         const collection = db.collection('NewUsers')

         const updated = await collection.updateOne({email: email}, {$set:{password:resetPassword}});
         console.log('password reset successfully',updated);
         res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.send('Error in resetting the password')
    }
})
 app.get('/delete',async(req,res)=>{
    try {
        await client.connect();
        const db = client.db('Carol');
        const collection = db.collection('NewUsers')

       const deleted = await collection.deleteMany({});
        console.log (deleted,'User deleted');
        res.send('User deleted');
    }  catch (err) {
        console.log(err);
        res.send('Trouble deleting the user');
    }
 })






app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});