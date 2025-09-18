"use client"

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, RotateCcw, Route, Satellite, Map as MapIcon, Search, X } from "lucide-react"

// You'll need to set your Mapbox access token
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN_HERE'

interface Monastery {
  id: string
  name: string
  location: string
  coordinates: [number, number] // [lng, lat] - Note: Mapbox uses [lng, lat] format
  description: string
  image: string
  established: string
  visitors: string
  tags: string[]
  difficulty: "Easy" | "Moderate" | "Difficult"
  altitude: string
}

interface SearchResult {
  id: string
  place_name: string
  center: [number, number]
  place_type: string[]
}

interface MapboxMapProps {
  selectedMonastery?: Monastery | null
}

const monasteries: Monastery[] = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6019, 27.3319], // [lng, lat] - Updated accurate coordinates
    description: "The largest monastery in Sikkim and seat of the Karmapa. Known for its golden stupa and beautiful architecture.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/15870906958510098992",
    established: "1966 CE",
    visitors: "200K annually",
    tags: ["Kagyu School", "Karmapa Seat", "Golden Stupa"],
    difficulty: "Easy",
    altitude: "1,550m",
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6192, 27.3358], // [lng, lat] - Updated accurate coordinates
    description: "Built on a site blessed by Lama Druptob Karpo, offering panoramic views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9645865906034039316",
    established: "1909 CE",
    visitors: "120K annually",
    tags: ["Nyingma School", "City Views", "Tantric Practices"],
    difficulty: "Easy",
    altitude: "1,675m",
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "Yuksom, West Sikkim",
    coordinates: [88.2299, 27.3668], // [lng, lat] - Updated accurate coordinates
    description: "The oldest monastery in Sikkim, also known as 'The Retreat'. Founded by Lhatsun Chenpo.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/13186172895752387023",
    established: "1701 CE",
    visitors: "45K annually",
    tags: ["Oldest Monastery", "Historical Site", "Lhatsun Chenpo"],
    difficulty: "Difficult",
    altitude: "2,100m",
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    location: "North Sikkim",
    coordinates: [88.5829, 27.4168], // [lng, lat] - Updated accurate coordinates
    description: "One of the most important monasteries in North Sikkim, known for its annual masked dance festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8355151222744786139",
    established: "1740 CE",
    visitors: "65K annually",
    tags: ["Kagyu School", "Masked Dance", "North Sikkim"],
    difficulty: "Moderate",
    altitude: "1,300m",
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    coordinates: [88.2981, 27.3083], // [lng, lat] - Updated accurate coordinates
    description: "Sacred monastery on a hilltop, believed to cleanse sins of those who see it. Famous for Bhumchu festival.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/1933641250976900931",
    established: "1641 CE",
    visitors: "80K annually",
    tags: ["Sacred Site", "Bhumchu Festival", "Sin Cleansing"],
    difficulty: "Moderate",
    altitude: "1,465m",
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim",
    coordinates: [88.2520, 27.3045], // [lng, lat] - Updated accurate coordinates
    description: "One of the oldest and most important monasteries in Sikkim, meaning 'Perfect Sublime Lotus'.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/223723027753944223",
    established: "1705 CE",
    visitors: "150K annually",
    tags: ["Nyingma School", "Royal Monastery", "Ancient Artifacts"],
    difficulty: "Moderate",
    altitude: "2,085m",
  },
  {
    id: "ralang",
    name: "Ralang Monastery",
    location: "Ralang, West Sikkim",
    coordinates: [88.3267, 27.3257], // [lng, lat] - Updated accurate coordinates
    description: "Beautiful monastery known for its peaceful surroundings and traditional Kagyu teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9820843602396613586",
    established: "1768 CE",
    visitors: "40K annually",
    tags: ["Kagyu School", "Peaceful", "Traditional"],
    difficulty: "Moderate",
    altitude: "1,600m",
  },
  {
    id: "kartok",
    name: "Kartok Monastery",
    location: "West Sikkim",
    coordinates: [88.5881, 27.2408], // [lng, lat] - Updated accurate coordinates
    description: "Ancient monastery with rich historical significance and beautiful mountain views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/12649175881081987815",
    established: "17th Century",
    visitors: "25K annually",
    tags: ["Ancient", "Mountain Views", "Historical"],
    difficulty: "Difficult",
    altitude: "1,800m",
  },
  {
    id: "lingdum",
    name: "Lingdum Monastery",
    location: "Ranka, East Sikkim",
    coordinates: [88.5795, 27.3308], // [lng, lat] - Updated accurate coordinates
    description: "Modern monastery complex known for its beautiful architecture and peaceful meditation halls.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/11678863970765068241",
    established: "1999 CE",
    visitors: "85K annually",
    tags: ["Modern", "Architecture", "Meditation"],
    difficulty: "Easy",
    altitude: "1,200m",
  },
  {
    id: "phensang",
    name: "Phensang Monastery",
    location: "North Sikkim",
    coordinates: [88.6103, 27.4203], // [lng, lat] - Updated accurate coordinates
    description: "Remote monastery offering stunning views of the Himalayas and traditional Buddhist practices.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3246796675827008895",
    established: "18th Century",
    visitors: "30K annually",
    tags: ["Remote", "Himalayan Views", "Traditional"],
    difficulty: "Difficult",
    altitude: "2,200m",
  },
  {
    id: "sanga-choeling",
    name: "Sanga Choeling Monastery",
    location: "Pelling, West Sikkim",
    coordinates: [88.2216, 27.2979], // [lng, lat] - Updated accurate coordinates
    description: "The second oldest monastery in Sikkim, offering spectacular views of Kanchenjunga.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8957885440789428602",
    established: "1697 CE",
    visitors: "55K annually",
    tags: ["Second Oldest", "Kanchenjunga Views", "Historic"],
    difficulty: "Moderate",
    altitude: "2,100m",
  },
  {
    id: "tsuklakhang",
    name: "Tsuklakhang Monastery",
    location: "Gangtok, Sikkim",
    coordinates: [88.6150, 27.3260], // [lng, lat] - Updated accurate coordinates
    description: "Royal chapel and monastery, center of Buddhist activities in Gangtok.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3133993396411084512",
    established: "1894 CE",
    visitors: "100K annually",
    tags: ["Royal Chapel", "Buddhist Center", "Gangtok"],
    difficulty: "Easy",
    altitude: "1,650m",
  },
  {
    id: "labrang",
    name: "Labrang Monastery",
    location: "North Sikkim",
    coordinates: [88.5794, 27.4181], // [lng, lat] - Updated accurate coordinates
    description: "Historic monastery known for its ancient manuscripts and traditional teachings.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4077670432127252993",
    established: "1844 CE",
    visitors: "35K annually",
    tags: ["Ancient Manuscripts", "Traditional", "Historic"],
    difficulty: "Moderate",
    altitude: "1,400m",
  },
  {
    id: "lachen",
    name: "Lachen Monastery",
    location: "Lachen, North Sikkim",
    coordinates: [88.5566, 27.7162], // [lng, lat] - Updated accurate coordinates
    description: "High-altitude monastery in the beautiful Lachen valley, gateway to Gurudongmar Lake.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/3084510397331365072",
    established: "19th Century",
    visitors: "20K annually",
    tags: ["High Altitude", "Lachen Valley", "Gurudongmar Gateway"],
    difficulty: "Difficult",
    altitude: "2,750m",
  },
  {
    id: "ranka",
    name: "Ranka Monastery",
    location: "Ranka, East Sikkim",
    coordinates: [88.5795, 27.3308], // [lng, lat] - Same as Lingdum (as noted by user)
    description: "Serene monastery surrounded by lush forests and offering panoramic valley views.",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4184074827260027762",
    established: "20th Century",
    visitors: "50K annually",
    tags: ["Forest Setting", "Valley Views", "Serene"],
    difficulty: "Easy",
    altitude: "1,400m",
  },
]

export function MapboxMap({ selectedMonastery: selectedMonasteryProp }: MapboxMapProps): React.JSX.Element {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [mapStyle, setMapStyle] = useState<'satellite' | 'terrain' | 'standard'>('terrain')
  const [showRoute, setShowRoute] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const markers = useRef<mapboxgl.Marker[]>([])
  const popup = useRef<mapboxgl.Popup | null>(null)
  const searchMarker = useRef<mapboxgl.Marker | null>(null)

  const getMapboxStyle = (style: string) => {
    switch (style) {
      case 'satellite':
        return 'mapbox://styles/mapbox/satellite-v9'
      case 'terrain':
        return 'mapbox://styles/mapbox/outdoors-v12'
      case 'standard':
      default:
        return 'mapbox://styles/mapbox/streets-v12'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#22c55e"
      case "Moderate":
        return "#eab308"
      case "Difficult":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  // Geocoding search function
  const searchLocation = async (query: string) => {
    if (!query.trim() || !MAPBOX_ACCESS_TOKEN) return

    setIsSearching(true)
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=5&types=place,locality,neighborhood,address`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`)
      }

      const data = await response.json()
      
      const results: SearchResult[] = data.features.map((feature: any) => ({
        id: feature.id,
        place_name: feature.place_name,
        center: feature.center,
        place_type: feature.place_type
      }))

      setSearchResults(results)
      setShowSearchResults(results.length > 0)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setShowSearchResults(false)
    } finally {
      setIsSearching(false)
    }
  }

  // Navigate to search result
  const navigateToLocation = (result: SearchResult) => {
    if (!map.current) return

    // Remove existing search marker
    if (searchMarker.current) {
      searchMarker.current.remove()
    }

    // Fly to location
    map.current.flyTo({
      center: result.center,
      zoom: 14,
      duration: 2000
    })

    // Add search marker
    const el = document.createElement('div')
    el.className = 'search-marker'
    el.style.width = '20px'
    el.style.height = '20px'
    el.style.borderRadius = '50%'
    el.style.backgroundColor = '#ef4444'
    el.style.border = '2px solid white'
    el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)'

    searchMarker.current = new mapboxgl.Marker(el)
      .setLngLat(result.center)
      .addTo(map.current)

    // Add popup for search result
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setLngLat(result.center)
      .setHTML(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${result.place_name}</h3>
          <p class="text-xs text-gray-600">Search Result</p>
        </div>
      `)
      .addTo(map.current)

    setShowSearchResults(false)
    setSearchQuery('')
  }

  const createCustomMarker = (monastery: Monastery) => {
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.style.width = '30px'
    el.style.height = '30px'
    el.style.borderRadius = '50%'
    el.style.backgroundColor = getDifficultyColor(monastery.difficulty)
    el.style.border = '3px solid white'
    el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)'
    el.style.cursor = 'pointer'
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'
    
    const icon = document.createElement('div')
    icon.innerHTML = '🏛️'
    icon.style.fontSize = '14px'
    el.appendChild(icon)

    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.2)'
      el.style.transition = 'transform 0.2s ease'
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)'
    })

    return el
  }

  const addMarkers = () => {
    if (!map.current || !map.current.isStyleLoaded()) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    monasteries.forEach((monastery) => {
      try {
        const el = createCustomMarker(monastery)
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat(monastery.coordinates)
          .addTo(map.current!)

        el.addEventListener('click', () => {
          setSelectedMonastery(monastery)
          if (map.current) {
            map.current.flyTo({
              center: monastery.coordinates,
              zoom: 12,
              duration: 1500
            })
          }
          showMonasteryPopup(monastery)
        })

        markers.current.push(marker)
      } catch (error) {
        console.error('Error adding marker for', monastery.name, error)
      }
    })
  }

  const showMonasteryPopup = (monastery: Monastery) => {
    if (!map.current) return

    // Remove existing popup
    if (popup.current) {
      popup.current.remove()
    }

    const popupHTML = `
      <div class="p-2 min-w-[200px]">
        <img src="${monastery.image || '/placeholder.svg'}" alt="${monastery.name}" class="w-full h-32 object-cover rounded mb-2" />
        <h3 class="font-semibold text-sm mb-1">${monastery.name}</h3>
        <p class="text-xs text-gray-600 mb-2">${monastery.location}</p>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-1 bg-gray-100 rounded text-xs">${monastery.difficulty}</span>
          <span class="text-gray-600">${monastery.altitude}</span>
        </div>
        <p class="text-xs text-gray-700 mb-2">${monastery.description}</p>
        <div class="text-xs text-gray-600">
          <div>Established: ${monastery.established}</div>
          <div>Visitors: ${monastery.visitors}</div>
        </div>
      </div>
    `

    popup.current = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: false,
      className: 'monastery-popup'
    })
      .setLngLat(monastery.coordinates)
      .setHTML(popupHTML)
      .addTo(map.current)
  }

  const addRoute = () => {
    if (!map.current || !map.current.isStyleLoaded() || !showRoute) return

    try {
      // Create route coordinates
      const routeCoordinates = monasteries.map(m => m.coordinates)

      // Remove existing route if it exists
      if (map.current.getSource('route')) {
        map.current.removeLayer('route')
        map.current.removeSource('route')
      }

      // Add route source
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates
          }
        }
      })

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      })
    } catch (error) {
      console.error('Error adding route:', error)
    }
  }

  const removeRoute = () => {
    if (!map.current) return
    
    try {
      if (map.current.getSource('route')) {
        map.current.removeLayer('route')
        map.current.removeSource('route')
      }
    } catch (error) {
      console.error('Error removing route:', error)
    }
  }

  useEffect(() => {
    if (map.current) return // Initialize map only once
    if (!mapContainer.current) return // Ensure container exists

    // Set access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: getMapboxStyle(mapStyle),
        center: [88.5122, 27.5330], // Centered on Sikkim
        zoom: 9,
        pitch: 45,
        bearing: 0
      })

      map.current.on('load', () => {
        setIsLoading(false)
        addMarkers()
      })

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('Failed to load map. Please check your internet connection.')
        setIsLoading(false)
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    } catch (error) {
      console.error('Failed to initialize Mapbox map:', error)
      setMapError('Failed to initialize map. Please check your API key.')
      setIsLoading(false)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Handle selectedMonastery prop changes
  useEffect(() => {
    if (map.current && selectedMonasteryProp) {
      // Fly to the selected monastery
      map.current.flyTo({
        center: selectedMonasteryProp.coordinates,
        zoom: 15,
        duration: 2000,
        essential: true
      })
      
      // Update local selected state
      setSelectedMonastery(selectedMonasteryProp)
    }
  }, [selectedMonasteryProp])

  useEffect(() => {
    if (map.current) {
      map.current.setStyle(getMapboxStyle(mapStyle))
      map.current.on('styledata', () => {
        addMarkers()
        if (showRoute) {
          addRoute()
        }
      })
    }
  }, [mapStyle])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (showRoute) {
        addRoute()
      } else {
        removeRoute()
      }
    }
  }, [showRoute])

  // Handle search input
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchLocation(searchQuery)
      } else {
        setSearchResults([])
        setShowSearchResults(false)
      }
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery])

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut()
    }
  }

  const resetView = () => {
    if (map.current) {
      map.current.flyTo({
        center: [88.5122, 27.5330],
        zoom: 9,
        pitch: 45,
        bearing: 0,
        duration: 2000
      })
      setSelectedMonastery(null)
      if (popup.current) {
        popup.current.remove()
      }
      if (searchMarker.current) {
        searchMarker.current.remove()
      }
    }
  }

  const toggleRoute = () => {
    setShowRoute(!showRoute)
  }

  const changeMapStyle = (style: 'satellite' | 'terrain' | 'standard') => {
    setMapStyle(style)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchResults(false)
    if (searchMarker.current) {
      searchMarker.current.remove()
    }
  }

  if (!MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Card>
          <CardContent className="p-6 text-center">
            <MapIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Mapbox Access Token Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide your Mapbox access token to display the interactive map.
            </p>
            <p className="text-xs text-gray-500">
              Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your environment variables
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Card>
          <CardContent className="p-6 text-center">
            <MapIcon className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-lg font-semibold mb-2 text-red-600">Map Error</h3>
            <p className="text-sm text-gray-600 mb-4">{mapError}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden map-container">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full overflow-hidden" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Loading interactive map...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Box */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-80 z-50">
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search monasteries, places in Sikkim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
                style={{ fontSize: '14px' }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
              <div className="p-2">
                {isSearching ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-sm text-gray-600">Searching...</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => navigateToLocation(result)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{result.place_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Zoom Controls */}
        <div className="bg-background/90 backdrop-blur rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button size="sm" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Feature Controls */}
        <div className="bg-background/90 backdrop-blur rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button 
              size="sm" 
              variant={showRoute ? "default" : "outline"} 
              onClick={toggleRoute}
              title="Toggle pilgrimage route"
            >
              <Route className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Map Style Controls */}
        <div className="bg-background/90 backdrop-blur rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button 
              size="sm" 
              variant={mapStyle === 'standard' ? "default" : "outline"} 
              onClick={() => changeMapStyle('standard')}
              title="Street view"
            >
              <MapIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === 'terrain' ? "default" : "outline"} 
              onClick={() => changeMapStyle('terrain')}
              title="Terrain view"
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === 'satellite' ? "default" : "outline"} 
              onClick={() => changeMapStyle('satellite')}
              title="Satellite view"
            >
              <Satellite className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4">
        <Card className="bg-background/90 backdrop-blur">
          <CardContent className="p-3">
            <h4 className="font-semibold text-sm mb-2">Difficulty Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Easy Access</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Moderate Trek</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Difficult Journey</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Location Info */}
      <div className="absolute top-20 left-4">
        <Card className="bg-background/90 backdrop-blur">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <div className="font-semibold text-sm">
                  {selectedMonastery ? selectedMonastery.name : "Sikkim Region"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedMonastery ? selectedMonastery.location : "Buddhist Monasteries of Sikkim"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
