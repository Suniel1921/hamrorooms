const mongoose = require ('mongoose');


mongoose.connect('mongodb+srv://anil:anil1921@cluster0.634sltj.mongodb.net/hamroRoomsNepal?retryWrites=true&w=majority')
// mongoose.connect(process.env.dbConn)
.then(()=>{
    console.log(`Database Connected Successfully !`);
})
.catch((error)=>{
    console.log(`Database Not Connected !`);
});