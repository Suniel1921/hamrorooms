// const fileUploadModel = require("../models/fileUploadModel");
// const cloudinary = require ("cloudinary").v2;
// const slug = require ("slugify");


// function isFileSupported(type, supportedTypes){
//     return supportedTypes.includes(type);
// }

// async function uploadFileToCloudinary(file, folder, quality){
//     const options = {folder};
//     options.resource_type = 'auto'
//     //for compress image quality
//     if(quality){
//         options.quality = quality
//     }
//     return await cloudinary.uploader.upload(file.tempFilePath, options)
// }

// //crate room controller(post method) 
// exports.imageUpload = async (req ,res)=>{
//     try {
//         const {city, address, phone, rent, parking, water, floor, roomType} = req.body;
//         // console.log(city, address, phone, rent);

//         const file = req.files.imageFile;
//         // console.log('image file is : ', file);
//         const authUser = req.user;   

//         const { latitude, longitude } = req.body;

//         //validation
//         const supportedTypes = ['jpg','jpeg','png'];
//         const fileType = file.name.split('.')[1].toLowerCase();
//         // console.log('file Type : ', fileType);

//         if(!isFileSupported(fileType, supportedTypes)){
//             return res.status(400).send({ success: false, message: 'File format not supported'})
//         }

//         //file format supported hai tab
//         // console.log('uploading file ')
//         const response = await uploadFileToCloudinary(file, "userRoomImg",30); //here is 30 for image compressor you can use also 10, 20, 40, 60 , 90...
//         // console.log(response);

//         //db me entry save karni hai 
//         const fileData = await fileUploadModel.create({authUser, city,address,phone, rent, imageUrl: response.secure_url, parking, water, floor, roomType})
//         res.status(200).send({success: true, message: 'Thanks for posting your room.', fileData})
        
//     } catch (error) {
//         return res.status(500).send({success: false, message: `Error while uploading image${error} `})
//     }
// }





// ***********************

const fileUploadModel = require("../models/fileUploadModel");
const cloudinary = require("cloudinary").v2;
const slug = require("slugify");

function isFileSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = 'auto';
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { city, address, phone, rent, parking, water, floor, roomType, latitude, longitude } = req.body;
        const file = req.files.imageFile;
        const authUser = req.user;

        // Validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).send({ success: false, message: 'File format not supported' });
        }

        // Upload file to Cloudinary
        const response = await uploadFileToCloudinary(file, "userRoomImg", 30);

        // Save room details including location to database
        const fileData = await fileUploadModel.create({
            authUser,
            city,
            address,
            phone,
            rent,
            imageUrl: response.secure_url,
            parking,
            water,
            floor,
            roomType,
            // location: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] }
            longitude,
            latitude

        });

        res.status(200).send({ success: true, message: 'Thanks for posting your room.', fileData });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Error while uploading image: ${error}` });
    }
};











//get all posted room controller (get mothod)
exports.getAllRoom = async (req, res) => {
  try {
    const allRoom = await fileUploadModel.find({verified: true }).populate('city');

    if (!allRoom) {
      return res.status(404).send({ success: false, message: "Room details not found." });
    }

    return res.status(200).send({ success: true, message: "All room details fetched.", allRoom });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal server error." });
  }
};




// //get single post room 
// exports.getSingleRoom = async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const singleRoom = await fileUploadModel.findById(id);
//         if(!singleRoom){
//             return res.status(404).send({success: false, message: "No single room found !"});
//         }        
//         return res.status(200).send({success: true, message: "single room fetched", singleRoom})
        
//     } catch (error) {
//         return res.status(500).send({success: false, message : "Error while getting single room details"})
        
//     }
// }

// get single room with view count
//get single post room 
// get single room with view count
exports.getSingleRoom = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleRoom = await fileUploadModel.findOne({ slug });

    if (!singleRoom) {
      return res.status(404).send({ success: false, message: "No single room found!" });
    }

    // Increment view count for the single room
    singleRoom.viewCount = (singleRoom.viewCount || 0) + 1;
    await singleRoom.save();

    return res.status(200).send({ success: true, message: "Single room fetched", singleRoom });
  } catch (error) {
    return res.status(500).send({ success: false, message: `Error while getting single room details ${error}` });
  }
};
 



//upload room controller (put method)
exports.updateRoom = async (req ,res)=>{
    try {
        const {address, phone, rent,parking,water,floor, roomType} = req.body;
        const {id} = req.params;
        const updateRoom = await fileUploadModel.findByIdAndUpdate(id,{address,phone,rent,parking,water,floor,roomType}, {new: true});
        return res.status(200).send({success: true, message: "Room details updated successfully !", updateRoom});
        
    } catch (error) {
        return res.status(500).send({success: false, message : "Error while updating  room details"})
        
    }
}



//search functionality

// Search rooms by address
exports.searchRoomByAddress = async (req, res) => {
    try {
      const { address } = req.query;
  
      // Use a regular expression for case-insensitive search
      const query = { address: { $regex: new RegExp(address, 'i') } };
  
      const searchResults = await fileUploadModel.find(query);
  
      if (searchResults.length === 0) {
        return res.status(404).json({ success: false, message: "No matching rooms found." });
      }
  
      return res.status(200).json({ success: true, message: "Rooms found successfully.", searchResults });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server Error." });
    }
  };





// **************************
//this route is for showing how many room user can posted (on Account.jsx file)
exports.userRoomCount = async (req, res) => {
    try {
      const userId = req.user;
      const roomsWithUser = await fileUploadModel.find({ authUser: userId }).populate('authUser');
      res.status(200).json({ success: true, message: "User rooms fetched", roomsWithUser });
    } catch (error) {
      console.error('Error fetching user rooms:', error);
      res.status(500).json({ success: false, message: "Internal Server Error." });
    }
  };



  // *****************************************admin crud Operation*********************************************

  //get all rooms by admin route

exports.getAllRoomByAdmins = async (req, res) => {
  try {
    const allRoomByAdmin = await fileUploadModel.find().populate('city');

    if (!allRoomByAdmin) {
      return res.status(404).send({ success: false, message: "Room details not found." });
    }

    return res.status(200).send({ success: true, message: "All room details fetched.", allRoomByAdmin });
  } catch (error) {
    return res.status(500).send({ success: false, message: `Internal server error. ${error}` });
  }
};



//upload room controller (put method)
exports.updateRoomByAdmin = async (req ,res)=>{
  try {
      const {address, phone, rent, parking, water, floor, roomType, verified} = req.body;
      const {id} = req.params;
      const updateRoom = await fileUploadModel.findByIdAndUpdate(id,{address,phone,rent,parking,water,floor,roomType, verified}, {new: true});
      return res.status(200).send({success: true, message: "Room details updated successfully !", updateRoom});
      
  } catch (error) {
      return res.status(500).send({success: false, message : "Error while updating  room details"})
      
  }
}


//delete room controller (delete method)
exports.deleteRoom = async (req, res)=>{
  try {
      const {id} = req.params;
      const deleteRoom = await fileUploadModel.findByIdAndDelete(id);
      if(!deleteRoom){
          return res.status(404).send({success: false , message : "Room Not Found !"});
      }
      res.status(200).send({success: true, message: "Room Deleted Successfully"})
      
  } catch (error) {
      return res.status(500).send({success: false, message : "Internal Server Error"});
      
  }
}


//total user rooms showing on admin dashboard
exports.totaRoomCount = async (req, res) => {
  try {
    const totalRooms = await fileUploadModel.find();
    const count = totalRooms.length;
    res.status(200).json({ success: true, message: "rooms fetched successfully", totalRooms, count });
  } catch (error) {
    console.error('Error fetching user rooms:', error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

  





