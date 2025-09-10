// db.js
const mongoose = require("mongoose");
require("dotenv").config();

// Fonction pour se connecter à MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/autolink_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB: ${error.message}`);
    process.exit(1); // Quitter l'application en cas d'erreur
  }
};

module.exports = connectDB;
