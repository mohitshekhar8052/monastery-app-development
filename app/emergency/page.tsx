"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Hospital, 
  Shield, 
  Car,
  AlertTriangle,
  Navigation,
  Clock,
  Globe
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface EmergencyContact {
  id: string
  name: string
  number: string
  type: "police" | "medical" | "fire" | "tourist" | "transport"
  location: string
  available24: boolean
  description: string
}

interface LocalService {
  id: string
  name: string
  type: "taxi" | "guide" | "hotel" | "restaurant" | "pharmacy"
  phone: string
  address: string
  rating: number
  distance: string
  priceRange: "$" | "$$" | "$$$"
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Emergency Services",
    number: "112",
    type: "police",
    location: "International",
    available24: true,
    description: "Universal emergency number for Europe"
  },
  {
    id: "2", 
    name: "Tibet Police",
    number: "+86-891-6324567",
    type: "police",
    location: "Lhasa, Tibet",
    available24: true,
    description: "Local police emergency services"
  },
  {
    id: "3",
    name: "People's Hospital of Tibet",
    number: "+86-891-6332462",
    type: "medical",
    location: "Lhasa, Tibet",
    available24: true,
    description: "Main hospital with English-speaking staff"
  },
  {
    id: "4",
    name: "Tourist Police",
    number: "+86-891-6834193",
    type: "tourist",
    location: "Lhasa, Tibet",
    available24: false,
    description: "Tourist assistance and guidance"
  },
  {
    id: "5",
    name: "Fire Department",
    number: "+86-891-6322119",
    type: "fire",
    location: "Lhasa, Tibet",
    available24: true,
    description: "Fire and rescue emergency services"
  },
  {
    id: "6",
    name: "Airport Shuttle Service",
    number: "+86-891-6216465",
    type: "transport",
    location: "Lhasa Airport",
    available24: false,
    description: "Airport transportation and assistance"
  }
]

const localServices: LocalService[] = [
  {
    id: "1",
    name: "Lhasa Taxi Service",
    type: "taxi",
    phone: "+86-891-6222222",
    address: "Central Lhasa",
    rating: 4.2,
    distance: "2.1 km",
    priceRange: "$$"
  },
  {
    id: "2",
    name: "Tenzin Local Guide",
    type: "guide",
    phone: "+86-139-0891-2345",
    address: "Barkhor Street Area",
    rating: 4.8,
    distance: "0.8 km",
    priceRange: "$$$"
  },
  {
    id: "3",
    name: "House of Shambhala Hotel",
    type: "hotel",
    phone: "+86-891-6323345",
    address: "Near Potala Palace",
    rating: 4.5,
    distance: "1.2 km",
    priceRange: "$$$"
  },
  {
    id: "4",
    name: "Tashi Delek Restaurant",
    type: "restaurant",
    phone: "+86-891-6234567",
    address: "Barkhor Street",
    rating: 4.6,
    distance: "0.5 km",
    priceRange: "$$"
  },
  {
    id: "5",
    name: "Tibet Pharmacy",
    type: "pharmacy",
    phone: "+86-891-6345678",
    address: "Beijing East Road",
    rating: 4.1,
    distance: "1.8 km",
    priceRange: "$"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "police": return <Shield className="h-5 w-5" />
    case "medical": return <Hospital className="h-5 w-5" />
    case "fire": return <AlertTriangle className="h-5 w-5" />
    case "tourist": return <Navigation className="h-5 w-5" />
    case "transport": return <Car className="h-5 w-5" />
    case "taxi": return <Car className="h-5 w-5" />
    case "guide": return <Navigation className="h-5 w-5" />
    case "hotel": return <MapPin className="h-5 w-5" />
    case "restaurant": return <MapPin className="h-5 w-5" />
    case "pharmacy": return <Hospital className="h-5 w-5" />
    default: return <Phone className="h-5 w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "police": return "bg-blue-500"
    case "medical": return "bg-red-500"
    case "fire": return "bg-orange-500"
    case "tourist": return "bg-green-500"
    case "transport": return "bg-purple-500"
    default: return "bg-slate-500"
  }
}

export default function EmergencyPage() {
  const { user } = useAuth()
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null)

  const handleCall = (number: string) => {
    window.open(`tel:${number}`)
  }

  const handleSMS = (number: string) => {
    window.open(`sms:${number}`)
  }

  const showLocation = (location: string) => {
    // In a real app, this would open maps with the location
    alert(`Opening map for: ${location}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-red-800 to-orange-800 bg-clip-text text-transparent mb-2">
            Emergency & Local Contacts
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Quick access to emergency services and local assistance during your monastery visits
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <Card className="mb-8 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 mb-1">Emergency Quick Access</h3>
                <p className="text-sm text-red-700">
                  In case of emergency, call the local emergency services immediately. Save your location and share it with emergency responders.
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleCall("112")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call 112
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="emergency" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm mb-6">
            <TabsTrigger value="emergency" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              🚨 Emergency Services
            </TabsTrigger>
            <TabsTrigger value="local" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              🏪 Local Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getTypeColor(contact.type)} rounded-full flex items-center justify-center text-white`}>
                          {getTypeIcon(contact.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {contact.type}
                            </Badge>
                            {contact.available24 && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                24/7
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {contact.location}
                      </div>
                      
                      <p className="text-sm text-slate-700">{contact.description}</p>
                      
                      <div className="flex items-center gap-2 font-mono text-lg font-bold text-slate-900">
                        <Phone className="h-4 w-4" />
                        {contact.number}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-500 hover:bg-red-600"
                          onClick={() => handleCall(contact.number)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleSMS(contact.number)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          SMS
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                          {getTypeIcon(service.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {service.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {service.priceRange}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        {service.address}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4 text-slate-500" />
                          <span>{service.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 font-mono text-sm text-slate-700">
                        <Phone className="h-3 w-3" />
                        {service.phone}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleCall(service.phone)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => showLocation(service.address)}
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Location
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Safety Tips */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Safety Tips for Monastery Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">🏔️ High Altitude</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Stay hydrated and rest frequently</li>
                  <li>• Watch for altitude sickness symptoms</li>
                  <li>• Ascend gradually if possible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Communication</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Keep phone charged with power bank</li>
                  <li>• Share your itinerary with others</li>
                  <li>• Download offline maps</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎒 Essential Items</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• First aid kit and medications</li>
                  <li>• Warm clothing for weather changes</li>
                  <li>• Emergency contact information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏛️ Cultural Respect</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Follow monastery rules and guidelines</li>
                  <li>• Dress appropriately and modestly</li>
                  <li>• Ask permission before photographing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}