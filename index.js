const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

let users = []

app.get('/signup', (req,res)=>{
    res.sendFile(__dirname + '/signup.html');
})

app.post('/signup',(req,res)=>{
    const {fname, lname, email, gender, createPassword, confirmPassword } = req.body

    if(createPassword !== confirmPassword) {
        return res.send('Passwords dont Match');
    }

    const newUser ={
        fname,
        lname,
        email,
        gender,
        createPassword,
        confirmPassword
    };

    users.push(newUser);
    
    console.log(users);


    res.redirect('/login');
   
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/login.html')
});

app.post('/login',(req,res)=>{
    const {username, password} = req.body
    
    const user = users.find(user => user.email === username && user.createPassword === password);

    if (user) {
        res.send('Login successful')
    } else {
        res.send('Invalid Credentials')
    }

});


app.get('/users', (req, res) => {
    res.json(users);
});





app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
});