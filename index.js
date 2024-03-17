const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/reset', (req,res)=>{
    res.sendFile(__dirname + '/reset.html')
});

app.post('/reset',(req,res)=>{
    const {oldpassword, newpassword, confirmnewpassword} = req.body
    res.send('Password reset successful')
})

app.post('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
});

app.post('/login',(req,res)=>{
    const {username, pwd} = req.body

    res.send('login successful')


})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});



app.post('/signup', (req, res) => {
    const { fname, lname, email, gender, pwd, confirm } = req.body;

    console.log('First Name:', fname);
    console.log('Last Name:', lname);
    console.log('Email:', email);
    console.log('Gender:', gender);
    console.log('Password:', pwd);
    console.log('Confirm Password:', confirm);

    res.send('Signed up successfully');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
