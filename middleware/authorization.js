const jwt = require ('jsonwebtoken');
const userData = require ('../models/userSchema');

const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.KEY);
        console.log(verify);
        //to get user data (see in terminal) 
        const user = await userData.findOne({_id:verify._id});
        console.log(user);
        // for logout user
        req.token = token;
        req.user = user;


        next();        
    } catch (error) {
        // res.status(400).send(`${error}`);
        res.render('login')
        
    }
}

module.exports = auth;
