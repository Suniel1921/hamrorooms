const mongoose = require ('mongoose');


mongoose.connect(process.env.dbConn)
.then(()=>{
    console.log(`Database Connected Successfully !`);
})
.catch((error)=>{
    console.log(`Database Not Connected !`);
});