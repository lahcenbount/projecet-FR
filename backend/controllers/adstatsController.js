const Rental = require("../models/Rental");
const Company = require("../models/Company");
const Car = require("../models/Car");

const getLatestStats = async (req, res) => {
  try {
    // 1️⃣ حساب الطلبات على حسب الحجز
    const demandesCount = await Rental.countDocuments();
    
    // 2️⃣ الشركات النشيطة
    const entreprisesActivesCount = await Company.countDocuments({ status: "Active" });
    console.log(entreprisesActivesCount)
    
    // 3️⃣ السيارات المتوفرة
    const vehiculesDisponiblesCount = await Car.countDocuments({ status: "available" });
    
    // 4️⃣ حساب الإيرادات الشهرية (مثال: من الحجز الموافق عليه)
    const rentalsApproved = await Rental.find({ status: "approved" });
    const revenusMensuels = rentalsApproved.reduce((sum, r) => sum + r.price, 0);

    // 5️⃣ إعداد JSON response بطريقة مشابهة للـ frontend
    const statsResponse = [
      {
        title: "Demandes de Location",
        value: demandesCount.toLocaleString(),
        change: "+0%", // تقدر تزيد حساب التغيير لاحقاً
        color: "text-green-600"
      },
      {
        title: "Entreprises Actives",
        value: entreprisesActivesCount.toLocaleString(),
        change: "+0%",
        color: "text-orange-600"
      },
      {
        title: "Véhicules Disponibles",
        value: vehiculesDisponiblesCount.toLocaleString(),
        change: "+0%",
        color: "text-purple-600"
      },
      {
        title: "Revenus Mensuels",
        value: `${revenusMensuels.toLocaleString()} MAD`,
        change: "+0%",
        color: "text-green-600"
      },
    ];

    res.json(statsResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { getLatestStats };
