const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
require("dotenv").config();

// Middleware général pour l'auth
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// Vérification des rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé: rôle non autorisé" });
    }
    next();
  };
};

// Middleware spécifique aux companies
const companyExists = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Entreprise non trouvée" });
    }
    req.company = company; // stocker la company pour le controller
    next();
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// Vérifier si l'utilisateur peut éditer la company (ex: admin ou propriétaire)
const canEditCompany = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.nom !== req.company.proprietaire) {
    return res.status(403).json({ message: "Accès refusé: vous ne pouvez pas modifier cette entreprise" });
  }
  next();
};

module.exports = { protect, authorize, companyExists, canEditCompany };
