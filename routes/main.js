const express = require ('express');
const routes = express.Router();

const roomOwnerData = require ('../models/roomOwnerData');
const database = require ('../database/dbConn');
const userData = require ('../models/userSchema')
const bcrypt = require ('bcrypt');
const cookieparser = require ('cookie-parser');
const jwt = require ('jsonwebtoken');
const auth = require ('../middleware/authorization');

const multer = require ('multer');





// its help storing data in database (middleware)
routes.use(express.urlencoded({extended:false}));

// dont forget to import this line of code this is very very imp.
routes.use(cookieparser());





//index 
routes.get('/',(req, res)=>{
    res.render('index');
})

//rendering room_owener page/dashboard
routes.get('/room_owner',auth,async(req, res)=>{
    res.render('room_owner')
})

//rendering register form
routes.get('/register',(req, res)=>{
    res.render('register');
   
})

routes.post('/register',async(req, res)=>{
   try {
    const registerData = await userData(req.body);
    if(registerData.password === registerData.confPassword){
        const notValidEmail = await userData.findOne({email: registerData.email});
        if(notValidEmail){
            res.render('register',{
                message : 'Email alredy in use please login'
            })
        }

        //jwt function  calling 
        const token = await registerData.generateToken();
        // console.log(`register user token : ${token}`);

        //sending cookies on browser (cookie name "jwt")
        res.cookie('jwt', token);

        await registerData.save();
        res.render('login');


        // else{
        //     await registerData.save();
        //     res.render('login');
        // }

        
    }
    else{
        res.render('register',{
            message : 'password not match !'
        })
    }
   
    
   } catch (error) {
    // res.status(400).send(`${error}`)
    res.render('register',{
        message : 'please fill the data !'
    })
    
   }
    
})


//rendering login page (get method)
routes.get('/login',(req, res)=>{
    res.render('login');   

    
})

// rendering logout

routes.get('/logout',auth, async(req, res)=>{


try {
    req.user.tokens=[];
    res.clearCookie('jwt');
    await req.user.save();
    res.render('login');
        
} catch (error) {
    res.status(400).send(`${error}`)
    
}

})









// login post method
routes.post('/login',async(req, res)=>{
    try {
    const userPassword = await req.body.password;
    const checkEmail = await req.body.email;
    const databaseData = await userData.findOne({email: checkEmail});
    // without hashing/bcrypting password
    // if(databaseData.password === userPassword){
    //     res.render('index');
    // }

    // with hashing/bcrypting password

    const isMatch = await bcrypt.compare(userPassword, databaseData.password);
    if(isMatch){
        const token = await databaseData.generateToken();
        console.log(`login token : ${token}`)
        res.cookie('jwt', token);
        res.render('index');

    }


    else{
        res.render('login',{
            message : 'Invalid Email or Password !'
        })
    }
  
        
    } catch (error) {
        res.status(400).send(`${error}`)
        
    }
})






// Setting up multer for file uploads
const storage = multer.diskStorage({
    destination: 'public/roomImage',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  // Route for handling room owner form submission
  routes.post('/roomowner', upload.single('roomImage'), async (req, res) => {
    try {
      const sendData = new roomOwnerData({
        address: req.body.address,
        city: req.body.city,
        rent: req.body.rent,
        phone: req.body.phone,
        roomImage: req.file.filename
      });
  
      await sendData.save();
  
      res.render('room_owner', {
        message: 'Thanks for posting your room!'
      });
    } catch (error) {
      res.status(400).send(`${error}`);
    }
  });



  // storing room owner room information in database

// routes.post('/roomowner',upload.single('roomImage'),async(req, res)=>{
//     try {
//         const sendData = await roomOwnerData(req.body);
//         await sendData.save();
//         res.render('room_owner',{
//             message : 'Thanks for posting your room !'
//         })
        
//     } catch (error) {
//         res.status(400).send(`${error}`)
//         // res.render('room_owner',{
//         //     message : 'Please fill the details about your room.'
//         // })
        
//     }

// })













//rendering roomslist
routes.get('/roomslist', async(req, res)=>{
    const roomListData = await roomOwnerData.find({})
    console.log(roomListData);
    res.render('roomslist',{
        roomListData:roomListData,
    });
})


// admin dashboard rendering

routes.get('/admin', async(req ,res)=>{
    const adminData = await roomOwnerData.find({});
    // console.log(adminData);
    res.render('admin',{
        adminData : adminData
    });
})

// rendering edit page

routes.get('/edit/:id',async(req ,res)=>{
    const {id} = req.params;
    const editData = await roomOwnerData.findById({_id:id});
    // console.log(editData)
    if(editData == null){
        res.redirect('/');
    }
    else{
        res.render('edit',{
            editData : editData,
        })
    }
})

//updating data 

routes.post('/update/:id',async(req ,res)=>{
    const {id} = req.params;
    const {address, city, rent, phone, roomImage} = req.body;
    const updateData = await roomOwnerData.findByIdAndUpdate({_id: id}, {address, city, rent, phone, roomImage}, {new:true});
    res.redirect('/admin');
})

// deleting data 

routes.get('/delete/:id',async(req, res)=>{
    const {id} = req.params;
    const deleteData = await roomOwnerData.findByIdAndDelete({_id:id});
    res.redirect('/admin');

})

// creating post using amdin panel

// rendering cratepost
routes.get('/createpost',(req, res)=>{
    res.render('createpost')
})

routes.post('/createPost',async(req, res)=>{
    const createPost = await roomOwnerData(req.body);
    await createPost.save();
    res.render('createPost',{
        message : 'your post are created !'
    })
})









module.exports = routes;