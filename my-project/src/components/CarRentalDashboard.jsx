import RentalRequestCard from "./RentalRequestCard";

const rentalRequests = [
];

export default function CarRentalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Demandes de Location</h2>
        <p className="text-gray-600 mb-6">Gérez les demandes de location de vos clients</p>
        <div className="grid gap-6">
          {rentalRequests.map((request) => (
            <RentalRequestCard key={request.id} request={request} />
          ))}
        </div>
      </main>
    </div>
  );
}
