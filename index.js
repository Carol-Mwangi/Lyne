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

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    password: String
});

// Define a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

app.get('/signup', (req, res)=>{
    res.sendFile(__dirname + '/signup.html')
})

// Define the route for handling form submission
app.post('/signup', async (req, res) => {
    try {
        // Create a new user instance based on the form data
        const newUser = new User({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.createPassword // Assuming you want to store the password
        });

        // Save the new user to the database
        await newUser.save();

        console.log('User signed up:', newUser);
        // Optionally, you can redirect the user to a success page
        res.redirect('/login')
    } catch (error) {
        console.log('Failed to process signup:', error);
        // Handle the error appropriately (e.g., render an error page)
        res.status(500).send('Signup failed. Please try again later.');
    }
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.post('/login', (req,res)=>{
    const {email, password} = req.body
    if (username === email & password === createPassword) {
    res.send('login successful')
    } else {
        res.send('Incorrect login details')
    }
})

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

