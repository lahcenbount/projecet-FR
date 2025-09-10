const User = require("../models/User");
const bcrypt = require("bcryptjs");

// جلب جميع المستخدمين
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-motDePasse");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// جلب مستخدم واحد
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-motDePasse");
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateIsComplet = async (req, res) => {
  try {
    const { isComplet } = req.body;
    const updateData = { isComplet };

    // if (motDePasse) {
    //   updateData.motDePasse = await bcrypt.hash(motDePasse, 10);
    // }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-motDePasse");

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// تعديل مستخدم
const updateUser = async (req, res) => {
  try {
    const { nom, email, motDePasse, role, location } = req.body;
    const updateData = { nom, email, role, location };

    if (motDePasse) {
      updateData.motDePasse = await bcrypt.hash(motDePasse, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-motDePasse");

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// حذف مستخدم
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateIsComplet
};
