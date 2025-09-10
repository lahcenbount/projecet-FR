import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table"
import { Badge } from "./ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"
import {
  Car,
  Building2,
  FileText,
  Users,
  Plus,
  Filter,
  Download,
} from "lucide-react"

export default function AdminDashboard() {
  const [statisticsRequests, setStatisticsRequests] = useState([])
  const [companies, setCompanies] = useState([])
  const [companyRequests, setCompanyRequests] = useState([]) 
  const [rentalRequests, setRentalRequests] = useState([])
  const [rentalRequestsNew, setRentalRequestsNew] = useState([])

  // 🔹 Fetch Statistics
  const fetchStatistics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/statics")
      setStatisticsRequests(res.data)
    } catch (err) {
      console.error("Erreur fetch statistics:", err)
    }
  }

  // 🔹 Fetch Companies
  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies")
      setCompanies(res.data)
    } catch (err) {
      console.error("Erreur fetch companies:", err)
    }
  }

  // 🔹 Fetch Rental Requests
  const fetchRentalRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rentals")
      setRentalRequests(res.data)
    } catch (err) {
      console.error("Erreur fetch rentals:", err)
    }
  }

  // 🔹 Fetch Company Requests
  const fetchCompanyRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies/requests")
      setCompanyRequests(res.data) 
    } catch (err) {
      console.error("Erreur fetch company requests:", err)
    }
  }

  // 🔹 Fetch Pending Rental Requests
  const fetchGetNewCompany = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rentals/pending")
      setRentalRequestsNew(res.data)
    } catch (err) {
      console.error("Erreur fetch new rental requests:", err)
    }
  }

  useEffect(() => {
    fetchStatistics()
    fetchCompanies()
    fetchRentalRequests()
    fetchCompanyRequests()
    fetchGetNewCompany()
  }, [])

  const getStatusBadge = (status) => {
    const statusConfig = {
      "En attente": { color: "bg-yellow-100 text-yellow-800" },
      "approved": { color: "bg-green-100 text-green-800" },
      "pending": { color: "bg-blue-100 text-blue-800" },
      "Refusée": { color: "bg-red-100 text-red-800" },
      "Actif": { color: "bg-green-100 text-green-800" },
      "En révision": { color: "bg-orange-100 text-orange-800" },
    }
    const config = statusConfig[status] || statusConfig["En attente"]
    return <Badge className={config.color}>{status}</Badge>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        {/* 🔹 Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statisticsRequests.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 🔹 Tabs */}
        <Tabs defaultValue="demandes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demandes">Demandes de Location</TabsTrigger>
            <TabsTrigger value="entreprises">Entreprises</TabsTrigger>
            <TabsTrigger value="nouvelles-entreprises">Nouvelles Demandes</TabsTrigger>
          </TabsList>

          {/*  Rental Requests */}
          <TabsContent value="demandes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Demandes de Location</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filtrer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalRequests.map((request) => (
                      <TableRow key={request._id || request.id}>
                        <TableCell>{request._id || request.id}</TableCell>
                        <TableCell>{request.userId?.nom || "—"}</TableCell>
                        <TableCell>{request.carId?.locationId?.companyName || "—"}</TableCell>
                        <TableCell>
                          {request.carId?.marque} {request.carId?.modele}
                        </TableCell>
                        <TableCell>
                          {request.startDate && request.endDate
                            ? `${formatDateFR(request.startDate)} au ${formatDateFR(request.endDate)}`
                            : "—"}
                        </TableCell>
                        <TableCell className="font-semibold">{request.price} MAD</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/*  Companies */}
          <TabsContent value="entreprises">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" /> <span>Entreprises de Location</span>
                  </CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Ajouter Entreprise
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Propriétaire</TableHead>
                      <TableHead>Véhicules</TableHead>
                      <TableHead>Chiffre d'Affaires</TableHead>
                      <TableHead>Date Création</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company._id}>
                        <TableCell className="font-medium">{company.companyName}</TableCell>
                        <TableCell>{company.userId.nom}</TableCell>
                        <TableCell className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-gray-500" /> <span>{company.carsNumber}</span>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {company.chiffreAffaires} MAD
                        </TableCell>
                        <TableCell>
                          {company.createdAt ? formatDateFR(company.createdAt) : "—"}
                        </TableCell>
                        <TableCell>{getStatusBadge(company.statut || "Actif")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 🆕 New Rental Requests */}
          <TabsContent value="nouvelles-entreprises">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Nouvelles Demandes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rentalRequestsNew.map((request) => (
                      <TableRow key={request._id || request.id}>
                        <TableCell>{request._id || request.id}</TableCell>
                        <TableCell>{request.userId?.nom || "—"}</TableCell>
                        <TableCell>{request.carId?.locationId?.companyName || "—"}</TableCell>
                        <TableCell>
                          {request.carId?.marque} {request.carId?.modele}
                        </TableCell>
                        <TableCell>
                          {request.startDate && request.endDate
                            ? `${formatDateFR(request.startDate)} au ${formatDateFR(request.endDate)}`
                            : "—"}
                        </TableCell>
                        <TableCell className="font-semibold">{request.price} MAD</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function formatDateFR(isoDate) {
  if (!isoDate) return "—"
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}
