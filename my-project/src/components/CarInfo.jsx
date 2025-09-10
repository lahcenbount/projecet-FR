import { Car, Fuel, Settings, Users } from "lucide-react";

export default function CarInfo({ car }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <Car className="h-4 w-4 mr-2" />
        Véhicule Demandé
      </h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <img
          src={car.image || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-32 object-cover rounded-md mb-3"
        />
        <div className="space-y-2">
          <div className="font-medium text-gray-900">
            {car.brand} {car.model} ({car.year})
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Settings className="h-3 w-3 mr-1" />
              {car.type}
            </span>
            <span className="flex items-center">
              <Fuel className="h-3 w-3 mr-1" />
              {car.fuel}
            </span>
            <span className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {car.seats} places
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
