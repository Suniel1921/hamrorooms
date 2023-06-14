const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true,
    },
    confPassword: {
        type : String,
        required : true,
    },
    phone :{
        type: Number,
        required: true,
    },

    tokens :[
        {
            token:{
                type: String,
                required : true,
            }
        }
    ]
})

// jsonwebtoken/cookies

userSchema.methods.generateToken = async function(){
    try {
        const tokenUser = jwt.sign({_id:this._id.toString()}, process.env.KEY);
        this.tokens = this.tokens.concat({token:tokenUser});
        await this.save();
        console.log(tokenUser);
        return tokenUser;

        
    } catch (error) {
        
    }
}





// hashing/bcrypt password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
   
})







const userData = mongoose.model('register_User_Data', userSchema);

module.exports = userData;