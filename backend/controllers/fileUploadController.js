const fileUploadModel = require("../models/fileUploadModel");
const cloudinary = require("cloudinary").v2;
const slug = require("slugify");
const fs = require('fs');


async function isFileSupported(type) {
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder, resource_type: 'auto' };
  if (quality) {
      options.quality = quality;
  }
  const result = await cloudinary.uploader.upload(file.tempFilePath, options);
  // Delete the temporary file after upload
  fs.unlink(file.tempFilePath, (err) => {
      if (err) {
          console.error(`Failed to delete temp file ${file.tempFilePath}:`, err);
      }
  });
  return result;
}


exports.imageUpload = async (req, res) => {
    try {
        const { city, address, phone, rent, parking, water, floor, roomType, latitude, longitude } = req.body;
        const files = req.files && req.files.images ? req.files.images : null;
        const authUser = req.user;

        if (!files || !Array.isArray(files)) {
          return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      const fileUploadPromises = files.map(async file => {
        const fileType = file.name.split('.').pop().toLowerCase();
        if (!(await isFileSupported(fileType))) {
            return res.status(400).json({ success: false, message: 'File format is not supported' });
        }
        const response = await uploadFileToCloudinary(file, 'userImages', 90);
        return response.secure_url;
    });

    const uploadedImages = await Promise.all(fileUploadPromises);

        // Save room details including location to database
        const fileData = await fileUploadModel.create({
            authUser,
            city,
            address,
            phone,
            rent,
            images: uploadedImages,
            parking,
            water,
            floor,
            roomType,
            longitude,
            latitude
        });

        res.status(200).json({ success: true, message: 'Thanks for posting your room.', fileData });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error while uploading images: ${error.message}` });
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







// Get related products based on address
exports.getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await fileUploadModel.findById(id);

        if (!property) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const relatedProducts = await fileUploadModel.find({
            address: property.address,
            _id: { $ne: id }
        }).limit(5);

        res.json({ success: true, relatedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
};








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

  





