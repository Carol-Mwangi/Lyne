const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection URI
const mongoURI = 'mongodb+srv://carolyne:BgfduSTsMYrXTzWI@lyne.zm3suyw.mongodb.net/carolyne?retryWrites=true&w=majority&appName=Lyne';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Failed to connect to MongoDB:', error));
 // creating a schema ie the structure of my db data and defining the schema types
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    password: String
});

// Define a Mongoose model 
const userModel = mongoose.model('User', userSchema);

app.get('/save', async (req, res)=>{
 const newUser = userModel({
    firstName: 'Carol',
    lastName: 'Mwangi',
    email: 'wanguicaroline@gmail.com',
    gender: 'Female',
    password: 'Mwangi'
 });
  try {
    const saveUser = await newUser.save();
       console.log(saveUser, 'New User created');
        res.send('Created user');
    } 
    catch (error) {
        console.log(error);
        res.send('error creating the user')
    }
});

// finding a user from my db 
app.get('/findAll', async (req,res)=>{
   try {const users = await userModel.find({email: 'carolyne@boyahq.com'});
       console.log(users);
        res.send(users)
    } 
    catch(error) {
        console.log(error)
        res.send('Error Retrieving data')
    }
   });

//updating the data in the db
   app.get('/update',async(req,res)=>{
    try {const updateUser = await userModel.findOneAndUpdate({firstName: 'Carol'}, {email : 'caroline@boya.co'});
    console.log(updateUser);
    res.send('User Updated Successfully')       

   }
   catch(error) {
    console.log(error)
    res.send('Trouble Updating the user')
   }
});

//deleting the user
app.get('/delete',async(req,res) =>{
    try {
        const deleteUser = await userModel.findOneAndDelete({email: 'lilian@gmail.com'});
        console.log('deleteUser');
        res.send(`${deleteUser} successfully deleted`);
    }
    catch (err) {
        console.log(error);
        res.send('Unable to perfom the operation')
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

