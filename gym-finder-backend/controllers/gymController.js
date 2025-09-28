const Gym = require("../models/Gym");

const getNearbyGyms = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ message: "Location required" });

  try {
    const gyms = await Gym.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: "distance",
          spherical: true,
        },
      },
    ]);
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGymById = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    res.json(gym); // gym already has comments field
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get comments for a gym
const getComments = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });
    res.json(gym.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Post a new comment
// Post a new comment
const postComment = async (req, res) => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) return res.status(404).json({ message: "Gym not found" });

    const newComment = { user: req.body.user, text: req.body.text };
    gym.comments.push(newComment);
    await gym.save();

    // ✅ return the last comment with _id + createdAt
    res.json(gym.comments[gym.comments.length - 1]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getNearbyGyms, getGymById ,getComments, postComment  };
