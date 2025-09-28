const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Gym = require("./models/Gym");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected for seeding...");

  await Gym.deleteMany();

    await Gym.insertMany([
    {
      name: "Powerhouse Gym",
      type: "Fitness Center",
      fees: 2000,
      activities: ["Gym", "CrossFit"],
      timings: "6am - 10pm",
      memberships: [
        { type: "Monthly", price: 2000 },
        { type: "Yearly", price: 18000 },
        { type: "Student", price: 1500 } // ✅ Student plan
      ],
      trainers: [
        { name: "Ravi Kumar", bio: "Certified fitness trainer specializing in strength training.", experience: 5 },
        { name: "Suresh Nair", bio: "Expert in weight loss and HIIT workouts.", experience: 3 }
      ],
      equipment: [
        { name: "Treadmill", description: "Running machine with incline support", maxWeight: 150 },
        { name: "Dumbbells", description: "Adjustable dumbbells", maxWeight: 50 }
      ],
      location: { type: "Point", coordinates: [77.5946, 12.9716] } ,
      contact: {
        phone: "+91 9812343210",
        email: "Powerhouse@example.com",
        social: {
            facebook: "https://facebook.com/Powerhouse",
            instagram: "https://instagram.com/Powerhouse",
            twitter: "https://twitter.com/Powerhouse"
        }
        }

    },
    {
      name: "Zen Yoga Studio",
      fees: 1500,
      activities: ["Yoga", "Meditation"],
      timings: "5am - 9pm",
      memberships: [
        { type: "Monthly", price: 1500 },
        { type: "Quarterly", price: 4000 },
        { type: "Student", price: 1000 } // ✅ Student plan
      ],
      trainers: [
        { name: "Anjali Sharma", bio: "Yoga expert with 10 years of teaching experience.", experience: 10 }
      ],
      equipment: [],
      location: { type: "Point", coordinates: [77.6010, 12.9760] }, 
      contact: {
        phone: "+91 9812343210",
        email: "ZenYoga@example.com",
        social: {
            facebook: "https://facebook.com/ZenYoga",
            instagram: "https://instagram.com/ZenYoga",
            twitter: "https://twitter.com/ZenYoga"
        }
        }
    },
    {
      name: "Dragon Martial Arts Academy",
      fees: 2200,
      activities: ["Martial Arts", "Karate", "Taekwondo"],
      timings: "6am - 8pm",
      memberships: [
        { type: "Monthly", price: 2200 },
        { type: "Yearly", price: 20000 },
        { type: "Student", price: 1200 } // ✅ Student plan
      ],
      trainers: [
        { name: "Vikram Singh", bio: "Black belt in Karate, specializes in self-defense.", experience: 12 }
      ],
      equipment: [
        { name: "Punching Bags", description: "Heavy bags for practice", maxWeight: 100 },
        { name: "Mats", description: "Soft mats for sparring", maxWeight: 200 }
      ],
      location: { type: "Point", coordinates: [77.6090, 12.9721] },
       // Bangalore
        contact: {
        phone: "+91 9876543210",
        email: "Dmaa@example.com",
        social: {
            facebook: "https://facebook.com/Dmaa",
            instagram: "https://instagram.com/Dmaa",
            twitter: "https://twitter.com/Dmaa"
        }
        }
    },
    {
      name: "Rhythm Zumba Center",
      fees: 1800,
      activities: ["Zumba", "Dance"],
      timings: "7am - 9pm",
      memberships: [
        { type: "Monthly", price: 1800 },
        { type: "Half-Yearly", price: 9500 },
        { type: "Student", price: 1200 } // ✅ Student plan
      ],
      trainers: [
        { name: "Meera Joshi", bio: "Certified Zumba instructor and dance fitness coach.", experience: 6 }
      ],
      equipment: [
        { name: "Speakers", description: "High-quality sound system", maxWeight: 50 }
      ],
      location: { type: "Point", coordinates: [77.6030, 12.9745] } ,
      contact: {
        phone: "+91 9812343210",
        email: "RythmZumba@example.com",
        social: {
            facebook: "https://facebook.com/RythmZumba",
            instagram: "https://instagram.com/RythmZumba",
            twitter: "https://twitter.com/RythmZumba"
        }
       }
    }
  ]);



  console.log("Gyms seeded!");
  process.exit();
});
