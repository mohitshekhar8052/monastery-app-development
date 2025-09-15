"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Coffee,
  Phone,
  Globe,
  Heart,
  Share,
  Filter,
  Search,
  Calendar,
  Users,
  DollarSign
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Hotel {
  id: string
  name: string
  type: "hotel" | "guesthouse" | "hostel" | "resort"
  rating: number
  reviews: number
  priceRange: "$" | "$$" | "$$$" | "$$$$"
  pricePerNight: number
  distance: string
  image: string
  description: string
  amenities: string[]
  phone: string
  website?: string
  address: string
  coordinates: { lat: number; lng: number }
  nearbyMonastery: string
  bookingAvailable: boolean
  instantBook: boolean
}

const hotels: Hotel[] = [
  {
    id: "1",
    name: "House of Shambhala",
    type: "hotel",
    rating: 4.8,
    reviews: 342,
    priceRange: "$$$",
    pricePerNight: 120,
    distance: "0.8 km",
    image: "/monastery-golden-hour-mountain-backdrop.jpg",
    description: "Luxury Tibetan-style hotel with stunning views of Potala Palace and traditional architecture.",
    amenities: ["wifi", "parking", "restaurant", "spa", "tour-desk"],
    phone: "+86-891-6323345",
    website: "www.shambhala-lhasa.com",
    address: "12 Beijing Middle Road, Lhasa",
    coordinates: { lat: 29.6516, lng: 91.1172 },
    nearbyMonastery: "Potala Palace",
    bookingAvailable: true,
    instantBook: true
  },
  {
    id: "2", 
    name: "Tashi Delek Guesthouse",
    type: "guesthouse",
    rating: 4.5,
    reviews: 156,
    priceRange: "$$",
    pricePerNight: 45,
    distance: "1.2 km",
    image: "/tibetan-monastery-floating-clouds-mystical.jpg",
    description: "Cozy family-run guesthouse in traditional Tibetan style, close to Barkhor Street.",
    amenities: ["wifi", "breakfast", "tour-desk", "laundry"],
    phone: "+86-891-6234567",
    address: "Barkhor Street, Old Town, Lhasa",
    coordinates: { lat: 29.6506, lng: 91.1320 },
    nearbyMonastery: "Jokhang Temple",
    bookingAvailable: true,
    instantBook: false
  },
  {
    id: "3",
    name: "Himalaya Heritage Hotel",
    type: "hotel", 
    rating: 4.6,
    reviews: 289,
    priceRange: "$$$",
    pricePerNight: 95,
    distance: "2.1 km",
    image: "/butter-lamps-monastery-golden-light-prayer.jpg",
    description: "Modern hotel with traditional touches, featuring rooftop restaurant with mountain views.",
    amenities: ["wifi", "parking", "restaurant", "gym", "tour-desk", "airport-shuttle"],
    phone: "+86-891-6345678",
    website: "www.himalaya-heritage.com",
    address: "Norbulingka Road, Lhasa",
    coordinates: { lat: 29.6400, lng: 91.1050 },
    nearbyMonastery: "Norbulingka Palace",
    bookingAvailable: true,
    instantBook: true
  },
  {
    id: "4",
    name: "Backpacker's Haven Hostel",
    type: "hostel",
    rating: 4.2,
    reviews: 198,
    priceRange: "$",
    pricePerNight: 15,
    distance: "1.8 km",
    image: "/monks-debating-courtyard-traditional-robes-animate.jpg",
    description: "Budget-friendly hostel popular with international travelers, great atmosphere.",
    amenities: ["wifi", "kitchen", "laundry", "common-room"],
    phone: "+86-891-6456789",
    address: "Tengye Road, Lhasa",
    coordinates: { lat: 29.6450, lng: 91.1280 },
    nearbyMonastery: "Sera Monastery",
    bookingAvailable: true,
    instantBook: false
  },
  {
    id: "5",
    name: "Yak Palace Resort",
    type: "resort",
    rating: 4.9,
    reviews: 412,
    priceRange: "$$$$",
    pricePerNight: 280,
    distance: "5.2 km",
    image: "/hemis-festival-masked-dancers-colorful.jpg",
    description: "Luxury resort with spa, multiple restaurants, and panoramic mountain views.",
    amenities: ["wifi", "parking", "restaurant", "spa", "pool", "gym", "tour-desk", "airport-shuttle"],
    phone: "+86-891-6567890",
    website: "www.yakpalace.com",
    address: "Lhasa Economic Development Zone",
    coordinates: { lat: 29.6200, lng: 91.0800 },
    nearbyMonastery: "Drepung Monastery",
    bookingAvailable: true,
    instantBook: true
  },
  {
    id: "6",
    name: "Monastery View Lodge",
    type: "guesthouse",
    rating: 4.4,
    reviews: 127,
    priceRange: "$$",
    pricePerNight: 65,
    distance: "0.5 km",
    image: "/ancient-buddhist-manuscript-kangyur-text.jpg",
    description: "Intimate lodge with direct monastery views and traditional Tibetan hospitality.",
    amenities: ["wifi", "breakfast", "tour-desk", "garden"],
    phone: "+86-891-6678901",
    address: "Near Ramoche Temple, Lhasa",
    coordinates: { lat: 29.6580, lng: 91.1380 },
    nearbyMonastery: "Ramoche Temple",
    bookingAvailable: true,
    instantBook: false
  }
]

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi": return <Wifi className="h-4 w-4" />
    case "parking": return <Car className="h-4 w-4" />
    case "restaurant": return <Utensils className="h-4 w-4" />
    case "breakfast": return <Coffee className="h-4 w-4" />
    default: return null
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "hotel": return "bg-blue-100 text-blue-800"
    case "resort": return "bg-purple-100 text-purple-800"
    case "guesthouse": return "bg-green-100 text-green-800"
    case "hostel": return "bg-orange-100 text-orange-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export default function HotelsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.nearbyMonastery.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || hotel.type === selectedType
    const matchesPrice = priceFilter === "all" || hotel.priceRange === priceFilter
    
    return matchesSearch && matchesType && matchesPrice
  })

  const handleBooking = (hotel: Hotel) => {
    // In a real app, this would integrate with booking platforms
    alert(`Booking ${hotel.name}... Redirecting to booking platform.`)
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const handleWebsite = (website?: string) => {
    if (website) {
      window.open(`https://${website}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
            Hotels Near Monasteries
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find comfortable accommodations close to sacred sites for your spiritual journey
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search hotels or nearby monasteries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="hotel">Hotels</option>
                  <option value="resort">Resorts</option>
                  <option value="guesthouse">Guesthouses</option>
                  <option value="hostel">Hostels</option>
                </select>
                
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="$">Budget ($)</option>
                  <option value="$$">Moderate ($$)</option>
                  <option value="$$$">Upscale ($$$)</option>
                  <option value="$$$$">Luxury ($$$$)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative aspect-[4/3]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <Badge className={getTypeColor(hotel.type)}>
                    {hotel.type}
                  </Badge>
                  {hotel.instantBook && (
                    <Badge className="bg-green-500 text-white">
                      Instant Book
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/70 rounded-lg p-2 text-white">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${hotel.pricePerNight}</span>
                      <span className="text-sm">per night</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{hotel.distance} from {hotel.nearbyMonastery}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                    </div>
                    <div className="text-xs text-slate-500">({hotel.reviews} reviews)</div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{hotel.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 bg-slate-100 rounded-full px-2 py-1">
                      {getAmenityIcon(amenity)}
                      <span className="text-xs text-slate-600 capitalize">{amenity.replace("-", " ")}</span>
                    </div>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <div className="bg-slate-100 rounded-full px-2 py-1">
                      <span className="text-xs text-slate-600">+{hotel.amenities.length - 4} more</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleBooking(hotel)}
                    disabled={!hotel.bookingAvailable}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCall(hotel.phone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  {hotel.website && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWebsite(hotel.website)}
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No hotels found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Booking Tips */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-500" />
              Booking Tips for Monastery Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">🕐 Best Time to Book</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Book 2-3 weeks ahead for peak season</li>
                  <li>• Early morning check-ins for monastery visits</li>
                  <li>• Consider festival dates for special experiences</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🧳 What to Bring</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Warm clothing for high altitude</li>
                  <li>• Respectful attire for monastery visits</li>
                  <li>• Comfortable walking shoes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💡 Local Tips</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Ask hotels about monastery tour packages</li>
                  <li>• Many offer early morning pick-up services</li>
                  <li>• Check for group discounts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📞 Contact Hotels</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Call directly for better rates</li>
                  <li>• Ask about monastery visit packages</li>
                  <li>• Confirm altitude sickness support</li>
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