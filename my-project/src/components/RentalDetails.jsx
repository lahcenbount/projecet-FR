import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/Button";

export default function RentalDetails({ request }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <CalendarDays className="h-4 w-4 mr-2" />
        Détails de Location
      </h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Début:</span>
          <span className="font-medium">{request.startDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Fin:</span>
          <span className="font-medium">{request.endDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Lieu de retrait:</span>
        </div>
        <div className="text-sm font-medium text-gray-900 ml-6">{request.pickupLocation}</div>
      </div>

      <div className="flex space-x-2 pt-4">
        {request.status === "En attente" ? (
          <>
            <Button size="sm" className="flex-1">
              Confirmer
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Refuser
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" className="w-full">
            Voir détails
          </Button>
        )}
      </div>
    </div>
  );
}
