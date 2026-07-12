const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
}, 
async(accessToken, refreshToken, profile, done)=>{
    try{
        let user = await User.findOne({googleId: profile.id});
        if(!user){
            //check if user emailId already exists
            user = await User.findOne({email: profile.emails[0].value});
            if(user){//update googleId if emailId already exist
                user.googleId = profile.id;
                await user.save();
            }else{ //create new user
                 user = await User.create({
                    googleId: profile.id,
                    email : profile.emails[0].value,
                    username: profile.displayName
                });
            }
        }
        return done(null, user);
    }catch(error){
        return done(error, null);
    }
}
))