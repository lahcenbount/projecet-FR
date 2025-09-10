const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ⚡ Charger les variables d'environnement
dotenv.config();

// ⚡ Import connexion DB
const connectDB = require("./config/db");

// ⚡ Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const locationRoutes = require("./routes/locationRoutes");
const companyRoutes = require("./routes/companyRoutes");
const adstats = require("./routes/adstats");

// ⚡ Import middleware d'erreur
const { errorMiddleware } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ⚡ Connecter MongoDB
connectDB();

// ⚡ Routes API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/rentals", rentalRoutes);
// app.use("/api/locations", locationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/statics", adstats);

// ⚡ Middleware global pour gérer les erreurs
app.use(errorMiddleware);

// ⚡ Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
