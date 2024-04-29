const localStrategy =require('passport-local').Strategy
const bcrypt = require('bcrypt');



function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email,password,done)=> {
       try {const user = await getUserByEmail(email);
       if(!user) {
        return done({message: 'No user with the email'});
       }

       if( await bcrypt.compare(password, user.password)) {
            return done (null, user, ({message:'Logged in successfully'}))

        } else {
            return done (null, {message:'Invalid password'})
        }


       } catch(error){
        return done(error)

       }
        
    }
    passport.use (new localStrategy({usernameField:'email'},
    authenticateUser));
    passport.serializeUser((user,done)=> {
        console.log("Serializing user:", user) 
        done(null, user._id)});
    passport.deserializeUser(async(id,done)=> {
        try { 
            const user = await getUserById(id);            
            return done (null, user)
    } catch (error) {
        return done(error)
    }
    });
}
    

module.exports = initialize