// controllers/companyController.js
const Company = require("../models/Company");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Vérifier si companyName ou businessLicense existe déjà
const checkDuplicateCompany = async (companyName, businessLicense) => {
  return await Company.findOne({
    $or: [
      { companyName },
      { businessLicense }
    ]
  });
};

// Create new company
exports.createCompany = async (req, res) => {
  try {
    const {
      userId,
      companyName,
      businessLicense,
      companyLocation,
      status,
      logo,
      chiffreAffaires,
      carsNumber
    } = req.body;

    // Vérification duplicata
    const existingCompany = await checkDuplicateCompany(companyName, businessLicense);
    if (existingCompany) {
      return res.status(400).json({ message: "Nom d'entreprise ou businessLicense déjà utilisé" });
    }

    // Créer la nouvelle entreprise
    const company = await Company.create({
      userId,
      companyName,
      businessLicense,
      companyLocation,
      status,
      logo: logo || "",
      chiffreAffaires: chiffreAffaires || 0,
      carsNumber: carsNumber || 0
    });

    // Mettre à jour isComplet à true pour l'utilisateur
    await User.findByIdAndUpdate(userId, { isComplet: true }, { new: true });

    // Réponse
    res.status(201).json({
      message: "Entreprise créée avec succès",
      company
    });

  } catch (error) {
    console.error("Erreur création entreprise:", error);

    // Gestion des erreurs de validation Mongoose
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Erreur serveur
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer." });
  }
};





// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
    .populate("userId", "nom"); // Exclut le mot de passe
    res.status(200).json(companies);
  } catch (error) {
    console.error("Erreur récupération entreprises:", error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer." });
  }
};
