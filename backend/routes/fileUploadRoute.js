const express = require ("express");
const router = express.Router();
const controller = require ("../controllers/fileUploadController");
const { requireLogin, isAdmin } = require("../middlewares/authMiddleware");


router.post("/uploadimg",requireLogin, controller.imageUpload);
router.get("/getAllRoom", controller.getAllRoom);
router.get("/getAllRoomByAdmin", requireLogin, isAdmin, controller.getAllRoomByAdmins);
router.get("/singleRoom/:slug", controller.getSingleRoom);
// router.get("/singleRoom/:id", controller.getSingleRoom);
router.put("/updateRoom/:id", requireLogin, controller.updateRoom);
router.put("/updateRoomByAdmin/:id", requireLogin, isAdmin, controller.updateRoomByAdmin);
router.delete("/deleteRoom/:id", requireLogin, controller.deleteRoom);
router.get("/roomCount", requireLogin, controller.userRoomCount);
router.get("/totalRoomCount", controller.totaRoomCount);



module.exports = router;


