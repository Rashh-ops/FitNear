const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: String,
  bio: String,
  experience: Number, // in years
});

const membershipSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. "Monthly", "Quarterly", "Yearly"
  price: { type: Number, required: true }
});

const equipmentSchema = new mongoose.Schema({
  name: String,
  description: String,
  maxWeight: Number, // in kg (optional)
});
const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const gymSchema = new mongoose.Schema({
  name: String,
  fees: Number,
  timings: String,
  activities: [
    {
      type: String,
      enum: ["Gym", "Yoga", "Martial Arts", "Zumba", "CrossFit", "Dance", "Pilates","Meditation","Taekwondo","Karate"], // ✅ pre-defined list
    },
  ],
  trainers: [trainerSchema],    // 👈 detailed trainer info
  equipment: [equipmentSchema],
  memberships: [membershipSchema], // 👈 detailed equipment info
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  comments: [commentSchema],
  photos: { type: [String], default: [] },
  contact: {
    phone: String,
    email: String,
    social: {
      facebook: String,
      instagram: String,
      twitter: String
    }
  }
});

gymSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Gym", gymSchema);
