# Mapbox Integration Setup Guide

## 🗺️ Getting Your Mapbox API Key

1. **Create a Mapbox Account**
   - Go to [https://www.mapbox.com/](https://www.mapbox.com/)
   - Sign up for a free account

2. **Get Your Access Token**
   - After signing up, go to your [Account page](https://account.mapbox.com/)
   - Find your "Default public token" 
   - Copy the token (it starts with `pk.`)

3. **Set Up Environment Variables**
   - Create a `.env.local` file in your project root
   - Add your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_actual_token_here
   ```

## 🚀 Features Included

### Interactive Map Features:
- ✅ **Real Mapbox Integration** with satellite, terrain, and street views
- ✅ **Custom Monastery Markers** with difficulty color coding
- ✅ **Interactive Popups** showing monastery details and images
- ✅ **Pilgrimage Route Visualization** connecting all monasteries
- ✅ **Zoom Controls** with smooth animations
- ✅ **Map Style Switching** (Street, Terrain, Satellite)
- ✅ **3D Terrain** with pitch and bearing controls

### Monastery Data:
- 🏛️ **6 Sacred Monasteries** across Tibet, Ladakh, and Himalayas
- 📍 **Accurate GPS Coordinates** for each location
- 🎯 **Difficulty Ratings** (Easy, Moderate, Difficult)
- ⛰️ **Altitude Information** for each monastery
- 📷 **Images and Descriptions** in interactive popups

### Map Controls:
- 🔍 **Zoom In/Out** buttons
- 🔄 **Reset View** to show all monasteries
- 🛣️ **Toggle Pilgrimage Route** connecting monasteries
- 🗺️ **Map Style Selector** (3 different styles)
- 📍 **Current Location Info** display

## 🎯 How to Use

1. **Install Dependencies** (already done):
   ```bash
   npm install mapbox-gl @types/mapbox-gl
   ```

2. **Set Your API Key** in `.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

4. **Visit the Map Page**:
   - Go to `http://localhost:3000/map`
   - The interactive Mapbox map will load with all monastery locations

## 📱 Map Features

- **Click any monastery marker** to see detailed popup
- **Use zoom controls** on the right side
- **Toggle pilgrimage route** to see connections between monasteries
- **Switch map styles** for different viewing experiences
- **Reset view** to see all monasteries at once

## 🔧 Customization

The Mapbox map is fully customizable:
- Add more monastery locations in `mapbox-map.tsx`
- Modify map styles and colors
- Add custom icons for different monastery types
- Include additional map layers (weather, elevation, etc.)

## 🌟 Benefits

- **Real satellite imagery** from Mapbox
- **Accurate geographical data** 
- **Smooth 3D navigation**
- **Professional map styling**
- **Mobile responsive design**
- **Fast performance** with WebGL rendering

Enjoy exploring the sacred monasteries with real Mapbox integration! 🙏