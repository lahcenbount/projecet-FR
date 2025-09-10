import React, { useEffect, useState } from "react";
// import { CarIcon } from "lucide-react";

// Custom icons
const FuelIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h10v16H4z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4l6 6v6a2 2 0 01-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CarIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
  </svg>
);

const UserIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DollarIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AutoLocPremiumDashboard = () => {
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')); 

  
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    type: "",
    carburant: "",
    places: "",
    year: "",
    price: "",
    status: "available",
  });

  // Handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const token = localStorage.getItem('token'); 

  // 🔹 Fetch Cars - Replace with your actual API
  const fetchCars = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const res = await fetch(`http://localhost:5000/api/cars/company/${user._id}`);
      const data = await res.json();
      setCars(data);
      
      // Mock data for demo - remove when using real API
      // const mockCars = [
      //   {
      //     _id: "1",
      //     marque: "BMW",
      //     modele: "Serie 3",
      //     year: 2023,
      //     status: "available",
      //     type: "Berline",
      //     carburant: "Essence",
      //     places: 5,
      //     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      //     immatriculation: "123456-A-12"
      //   },
      //   {
      //     _id: "2", 
      //     marque: "Mercedes",
      //     modele: "Class C",
      //     year: 2023,
      //     status: "booked",
      //     type: "Berline",
      //     carburant: "Diesel",
      //     places: 5,
      //     image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      //     immatriculation: "789012-B-34"
      //   },
      //   {
      //     _id: "3",
      //     marque: "Audi",
      //     modele: "A4",
      //     year: 2022,
      //     status: "available", 
      //     type: "SUV",
      //     carburant: "Hybride",
      //     places: 7,
      //     image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      //     immatriculation: "345678-C-56"
      //   }
      // ];
      // setTimeout(() => setCars(mockCars), 800);
    } catch (err) {
      console.error("Erreur fetch cars:", err);
    }
  };

  // 🔹 Fetch Rentals - Replace with your actual API  
  const fetchRentals = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const res = await fetch(`http://localhost:5000/api/rentals/company/${user._id}`);
      const data = await res.json();
      setRentals(data);
      
      // Mock data for demo - remove when using real API
      // const mockRentals = [
      //   {
      //     _id: "r1",
      //     carId: { _id: "2" },
      //     userId: {
      //       nom: "Ahmed Benali",
      //       email: "ahmed.benali@email.com"
      //     },
      //     startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      //     endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      //     status: "approved",
      //     price: 1200
      //   },
      //   {
      //     _id: "r2",
      //     carId: { _id: "1" },
      //     userId: {
      //       nom: "Fatima El Amrani",
      //       email: "fatima.elamrani@email.com"
      //     },
      //     startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      //     endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      //     status: "pending",
      //     price: 800
      //   },
      //   {
      //     _id: "r3",
      //     carId: { _id: "3" },
      //     userId: {
      //       nom: "Omar Khalil",
      //       email: "omar.khalil@email.com"
      //     },
      //     startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      //     endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      //     status: "approved",
      //     price: 1500
      //   }
      // ];
      // setTimeout(() => setRentals(mockRentals), 600);
    } catch (err) {
      console.error("Erreur fetch rentals:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCars(), fetchRentals()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Helper: Status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "available":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";
      case "booked":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  // Helper: Find upcoming rental for a car
  const getUpcomingRental = (carId) => {
    const now = new Date();
    return rentals.find(
      (r) => r.carId?._id === carId && new Date(r.startDate) > now
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header avec gradient */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold tracking-tight">AutoLoc Premium</h1>
          <p className="text-blue-100 mt-1">Tableau de bord administrateur</p>
        </div>
      </div> */}

      {/* Stats Cards */}
      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Véhicules</p>
              <p className="text-3xl font-bold text-gray-900">{cars.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CarIcon className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Réservations</p>
              <p className="text-3xl font-bold text-gray-900">{rentals.length}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <CalendarIcon className="text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approuvées</p>
              <p className="text-3xl font-bold text-gray-900">
                {rentals.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <UserIcon className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Revenus</p>
              <p className="text-3xl font-bold text-gray-900">
                {rentals.reduce((sum, r) => sum + (r.price || 0), 0).toLocaleString()} MAD
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarIcon className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Réservations - Version moderne */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <CalendarIcon className="text-blue-600" />
              Réservations Récentes
            </h2>
          </div>
          
          <div className="p-6">
            {rentals.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">Aucune réservation</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div key={rental._id} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-300 hover:bg-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <UserIcon className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{rental.userId?.nom}</h3>
                          <p className="text-sm text-gray-500">{rental.userId?.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{rental.price} MAD</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(rental.status)}`}>
                          {rental.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {new Date(rental.startDate).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })} 
                        →
                        {new Date(rental.endDate).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="ml-auto text-gray-500">
                        {Math.ceil((new Date(rental.endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24))} jours
                      </span>
                    </div>
                  </div>
                ))}
                {rentals.length > 3 && (
                  <div className="mt-6 text-center">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-all duration-200">
                      Voir {rentals.length - 3} réservation{rentals.length - 3 > 1 ? 's' : ''} de plus
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Véhicules - Design premium */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <CarIcon className="text-blue-600" />
                Flotte de Véhicules
              </h2>

              {/* Button to toggle the form */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {showForm ? "Fermer le formulaire" : "Ajouter un véhicule"}
              </button>
            </div>


            {showForm && (
              <div className="mt-4 p-6 bg-white rounded shadow">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const payload = {
                      ...formData,
                      places: Number(formData.places),
                      year: Number(formData.year),
                      price: Number(formData.price),
                      locationId: '', // replace with your company/user ID
                    };

                    try {
                      const response = await fetch(`http://localhost:5000/api/cars/company/${user._id}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });

                      if (response.ok) {
                        alert("Véhicule ajouté avec succès !");
                        setFormData({
                          marque: "",
                          modele: "",
                          type: "",
                          carburant: "",
                          places: "",
                          year: "",
                          price: "",
                          status: "available",
                        });
                      } else {
                        const err = await response.json();
                        console.error(err);
                        // alert(`Erreur lors de l'ajout du véhicule: ${error}`);
                        // alert("Erreur: " + err.message);
                      }
                    } catch (error) {
                      console.error(error);
                      // alert(`Erreur lors de l'ajout du véhicule: ${error}`);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* Marque */}
                  <div>
                    <label className="block text-gray-700">Marque</label>
                    <input
                      type="text"
                      name="marque"
                      value={formData.marque}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: Toyota"
                      required
                    />
                  </div>

                  {/* Modèle */}
                  <div>
                    <label className="block text-gray-700">Modèle</label>
                    <input
                      type="text"
                      name="modele"
                      value={formData.modele}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: Corolla"
                      required
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-gray-700">Type</label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: SUV, Berline"
                      required
                    />
                  </div>

                  {/* Carburant */}
                  <div>
                    <label className="block text-gray-700">Carburant</label>
                    <select
                      name="carburant"
                      value={formData.carburant}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                    </select>
                  </div>

                  {/* Places */}
                  <div>
                    <label className="block text-gray-700">Nombre de places</label>
                    <input
                      type="number"
                      name="places"
                      value={formData.places}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: 4"
                      required
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-gray-700">Année</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: 2023"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-gray-700">Prix</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Ex: 500"
                      required
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-gray-700">Statut</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="available">Disponible</option>
                      <option value="booked">Réservé</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Enregistrer
                  </button>
                </form>
              </div>
            )}

          </div>
          <div className="p-6">
            {cars.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CarIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">Aucun véhicule</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cars.map((car) => {
                  const upcomingRental = getUpcomingRental(car._id);
                  
                  return (
                    <div key={car._id} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                      {/* Image du véhicule */}
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <img
                          src={car.image || "https://via.placeholder.com/300x200?text=Car"}
                          alt={`${car.marque} ${car.modele}`}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(car.status)}`}>
                            {car.status}
                          </span>
                        </div>
                      </div>

                      {/* Infos véhicule */}
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-bold text-base text-gray-900">
                            {car.marque} {car.modele}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {car.year} • {car.immatriculation}
                          </p>
                        </div>

                        {/* Spécifications */}
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <CarIcon className="h-3 w-3" />
                            <span>{car.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FuelIcon className="h-3 w-3" />
                            <span>{car.carburant}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-3 w-3" />
                            <span>{car.places}</span>
                          </div>
                        </div>

                        {/* Prochaine réservation */}
                        {upcomingRental && upcomingRental.status === "approved" && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2 mt-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold text-blue-800">Prochaine réservation</span>
                            </div>
                            <p className="text-xs text-blue-700 mb-1">
                              {new Date(upcomingRental.startDate).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'short' 
                              })} • {upcomingRental.userId?.nom}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-blue-600">
                                {Math.ceil((new Date(upcomingRental.endDate) - new Date(upcomingRental.startDate)) / (1000 * 60 * 60 * 24))} jours
                              </span>
                              <span className="text-xs font-bold text-blue-700">
                                {(() => {
                                  const now = new Date();
                                  const start = new Date(upcomingRental.startDate);
                                  const diff = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
                                  return `Dans ${diff} jour${diff !== 1 ? "s" : ""}`;
                                })()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoLocPremiumDashboard;