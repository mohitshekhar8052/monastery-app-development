import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin-header"
import { AdminStats } from "@/components/admin-stats"
import { MonasteryManagement } from "@/components/monastery-management"
import { EventsManagement } from "@/components/events-management"
import { ArchivesManagement } from "@/components/archives-management"
import { UserManagement } from "@/components/user-management"
import { SystemSettings } from "@/components/system-settings"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/20 relative">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23cbd5e1' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10">
        <AdminHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-2xl mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">🏛️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-cyan-800 to-amber-800 bg-clip-text text-transparent mb-3">
              Admin Dashboard
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive management platform for monasteries, cultural events, digital archives, and community
              engagement
            </p>
          </div>

          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50">
              <div className="p-6 border-b border-slate-200/50">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-cyan-800 bg-clip-text text-transparent mb-2">
                  🎬 Featured Monastery Experience
                </h2>
                <p className="text-slate-600">Immerse yourself in the serene beauty of Tibetan monasteries</p>
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-700">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/tibetan-monastery-floating-clouds-mystical.jpg"
                >
                  <source src="/placeholder.mp3" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Sacred Spaces: A Journey Through Time</h3>
                      <p className="text-sm opacity-90">
                        Experience the tranquil beauty of ancient monasteries nestled in the Himalayas
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-xs opacity-75 mb-1">Current Viewers</div>
                  <div className="text-lg font-bold">1,247</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-slate-50 to-cyan-50/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600 mb-1">4.8K</div>
                    <div className="text-sm text-slate-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-1">98%</div>
                    <div className="text-sm text-slate-600">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                    <div className="text-sm text-slate-600">Live Stream</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdminStats />

          <div className="mt-12">
            <Tabs defaultValue="monasteries" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-5 bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg rounded-xl p-1 h-auto">
                  <TabsTrigger
                    value="monasteries"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-6 font-medium transition-all duration-200"
                  >
                    🏛️ Monasteries
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-6 font-medium transition-all duration-200"
                  >
                    📅 Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="archives"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-6 font-medium transition-all duration-200"
                  >
                    📜 Archives
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-6 font-medium transition-all duration-200"
                  >
                    👥 Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 px-6 font-medium transition-all duration-200"
                  >
                    ⚙️ Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monasteries" className="mt-6">
                <MonasteryManagement />
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <EventsManagement />
              </TabsContent>

              <TabsContent value="archives" className="mt-6">
                <ArchivesManagement />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <SystemSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
