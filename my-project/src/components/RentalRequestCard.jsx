import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import ClientInfo from "./ClientInfo";
import CarInfo from "./CarInfo";
import RentalDetails from "./RentalDetails";

export default function RentalRequestCard({ request }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Demande #{request.id}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <Badge
                variant={request.status === "Confirmée" ? "default" : "secondary"}
                className={
                  request.status === "Confirmée"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {request.status}
              </Badge>
              <span className="text-sm text-gray-600">{request.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{request.totalPrice}</div>
            <div className="text-sm text-gray-500">Prix total</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 grid lg:grid-cols-3 gap-6">
        <ClientInfo client={request.client} />
        <CarInfo car={request.car} />
        <RentalDetails request={request} />
      </CardContent>
    </Card>
  );
}
