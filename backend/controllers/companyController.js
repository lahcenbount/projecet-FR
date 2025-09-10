// controllers/companyController.js
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");

// Vérifier si email ou businessLicense existe déjà
const checkDuplicateCompany = async (email, businessLicense) => {
  return await Company.findOne({ $or: [{ email }, { businessLicense }] });
};

// Create new company
exports.createCompany = async (req, res) => {
  try {
    const {
      companyName,
      NameProprietaire,
      businessLicense,
      companyLocation,
      email,
      modePass
    } = req.body;

    // Vérification duplicata
    const existingCompany = await checkDuplicateCompany(email, businessLicense);
    if (existingCompany) {
      return res.status(400).json({ message: "Email ou businessLicense déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(modePass, 10);

    // Créer la nouvelle entreprise
    const company = await Company.create({
      companyName,
      NameProprietaire,
      businessLicense,
      companyLocation,
      email,
      modePass: hashedPassword,
    });

    // Réponse
    res.status(201).json({
      message: "Entreprise créée avec succès",
      company,
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
    const companies = await Company.find().select("-modePass"); // Exclut le mot de passe
    res.status(200).json(companies);
  } catch (error) {
    console.error("Erreur récupération entreprises:", error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer." });
  }
};
