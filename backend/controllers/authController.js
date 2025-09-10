const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const user = await User.create({ nom, email, motDePasse: hashedPassword, role});

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
