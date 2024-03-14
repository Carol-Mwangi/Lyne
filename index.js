const express=require('express');
const app=express();
const port= 3000
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));

app.get('/page2.html', (req, res) => {
    res.sendFile(__dirname + '/page2.html');
});

app.post('/submit-form',(req,res)=>{
    const usernName = req.body.username;
    const password = req.body.password;
    

    // Store to DB here

    if(usernName==='Carolyne' & password==='LyneMwangi') {console.log('Logged in successful')
} else {
    console.log(' Invalid Username or incorrect password');
}
});

app.get('/home.html',(req,res)=>{
    res.sendFile(__dirname + '/home.html')
});

app.post('/reset-password',(req,res)=>{
    const oldPassword = req.body['old-Password'];
    const newpassword = req.body['new-password'];
    const confirmnewpassword = req.body['confirm-password']

    res.send('Password reset successfully')
});

app.listen(port,()=> {
    console.log(`listening form port ${port}`)
});