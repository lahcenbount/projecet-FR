import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mail, Phone, User } from "lucide-react";

export default function ClientInfo({ client }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 flex items-center">
        <User className="h-4 w-4 mr-2" />
        Informations Client
      </h3>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={client.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {client.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900">{client.name}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <Mail className="h-3 w-3 mr-1" />
            {client.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {client.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
