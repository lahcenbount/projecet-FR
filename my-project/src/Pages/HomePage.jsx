import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogIn, UserPlus } from "lucide-react";

// Import des images locales
import darImg from "../assets/dar.webp";
import rabatImg from "../assets/rabat.jpg";
import fesImg from "../assets/fes.jpg";
import Marrakech from "../assets/marrakech.jpg";
import agadirImg from "../assets/agadir.webp";
import tangerImg from "../assets/tanger.jpg";


export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  const marques = ["Tesla", "BMW", "Volkswagen", "Toyota", "Audi"];
  const cities = ["Casablanca", "Rabat", "Fès", "Marrakech", "Agadir", "Tanger"];

  const getCarImageByBrand = (brand) => {
    const carImages = {
      Tesla:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=200&q=80",
      BMW:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&h=200&q=80",
      Volkswagen:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&h=200&q=80",
      Toyota:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=400&h=200&q=80",
      Audi:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&h=200&q=80",
    };
    return carImages[brand] || "https://source.unsplash.com/400x200/?car";
  };

  // Images locales pour chaque ville
  const cityImages = {
    Casablanca: darImg,
    Rabat: rabatImg,
        Fès: fesImg,
  Marrakech: Marrakech,
  Agadir: agadirImg,
      Tanger: tangerImg,

  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* Barre supérieure */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-purple-700">AutoLink</h1>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {/* <span className="text-gray-600">
              {currentUser?.prenom} {currentUser?.nom}
            </span> */}
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              <LogIn size={16} />
              Dashboard
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-100"
            >
              <LogIn size={16} />
              Connexion
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              <UserPlus size={16} />
              S'inscrire
            </button>
          </div>
        )}
      </div>

      {/* Barre de recherche */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <input type="text" placeholder="Lieu" className="border rounded p-2" />
          <input type="date" className="border rounded p-2" />
          <input type="date" className="border rounded p-2" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded">Rechercher</button>
        </div>
      </header>

      {/* Section Hero */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1500&q=80"
          alt="Voiture de location"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Le leader mondial de la location de voitures entre particuliers
          </h2>
          <p className="mt-2 text-lg">Louez la voiture que vous voulez, là où vous le voulez</p>
        </div>
      </section>

      {/* Marques populaires */}
      <section className="p-8 bg-white">
        <h3 className="text-2xl font-semibold mb-4">Populaires par marque</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {marques.map((marque) => (
            <div
              key={marque}
              className="border rounded shadow hover:shadow-lg p-4 text-center cursor-pointer transition-shadow duration-200"
            >
             <img
  src={getCarImageByBrand(marque)}
  alt={`Voiture ${marque}`}
  className="w-full h-32 object-cover rounded mb-2"
  loading="lazy"
/>
              <p className="font-medium text-gray-800">{marque}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bannière promo */}
      <section className="bg-purple-100 p-8 text-center">
        <h4 className="text-xl font-bold">
          Louez la voiture parfaite et partez à la découverte des grands espaces
        </h4>
        <p className="mt-2">Des milliers de voitures disponibles près de chez vous</p>
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded">Parcourir les voitures</button>
      </section>

      {/* Destinations marocaines */}
      <section className="p-8 bg-white">
        <h3 className="text-2xl font-semibold mb-4">Populaire par destination au Maroc</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          {cities.map((city) => (
            <div
              key={city}
              className="p-4 hover:bg-purple-50 hover:shadow rounded transition duration-200"
            >
             <img
  src={cityImages[city]}
  alt={`Destination ${city}`}
  className="mx-auto mb-2 rounded-full w-24 h-24 object-cover"
  loading="lazy"
/>
              <p>{city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="p-8 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-4 text-center">Questions fréquentes</h3>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            "Quel coût pour une location ?",
            "Qui peut louer une voiture ?",
            "Suis-je assuré ?",
            "Puis-je annuler une réservation ?",
          ].map((question, index) => (
            <details key={index} className="bg-white p-4 border rounded shadow-sm">
              <summary className="cursor-pointer font-medium">{question}</summary>
              <p className="mt-2 text-sm text-gray-600">Réponse générique à cette question.</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 p-6">
        © 2025 AutoLink| Mentions légales | Politique de confidentialité
      </footer>
    </div>
  );
}
