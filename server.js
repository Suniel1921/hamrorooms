const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require ('path');
const routes = require ('./routes/main')
const hbs = require ('hbs');
const multer = require ('multer');







const PORT = process.env.PORT || 2000;
const app  = express();

//setting template engine
app.set('view engine', 'hbs')

// accessing partial folder
hbs.registerPartials('views/partials')



//middleware for accesing routes folder/path
app.use('', routes);

//Accessing public folder
// const publicPath = path.join(__dirname, ('public'));
// app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, 'public')));









// rendering 404 page

// app.get('*', function(req, res){
//     res.render('404')
//   });

app.get('*',(req, res)=>{
    res.render('404')
})





app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port No : ${PORT}`);
})