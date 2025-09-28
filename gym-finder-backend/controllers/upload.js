const Gym = require("../models/Gym");

const uploadGymPhotos = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const photoUrls = req.files.map((file) => file.path || file.url);

    gym.photos.push(...photoUrls);
    await gym.save();

    res.status(201).json({ message: "Photos uploaded", photos: gym.photos });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};

module.exports = { uploadGymPhotos };
