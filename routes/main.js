const express = require ('express');
const routes = express.Router();

//index 
routes.get('/',(req, res)=>{
    res.render('index');
})

//rendering roomslist
routes.get('/roomslist',(req, res)=>{
    res.render('roomslist');
})






module.exports = routes;