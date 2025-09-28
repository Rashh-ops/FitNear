const express = require("express");
const { getNearbyGyms, getGymById, getComments, postComment } = require("../controllers/gymController");
const { uploadGymPhotos } = require("../controllers/upload");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getNearbyGyms);
router.get("/:id", getGymById);

router.get("/:id/comments", getComments);
router.post("/:id/comments", postComment);

// upload photos
router.post("/:id/photos", (req, res, next) => {
  upload.array("photos", 5)(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(400).json({ message: "Upload failed", error: err.message || err });
    }
    next();
  });
}, uploadGymPhotos);


module.exports = router;
