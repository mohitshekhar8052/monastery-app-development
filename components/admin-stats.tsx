import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Calendar, Archive, MapPin, Activity, Globe, Eye } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Monasteries",
      value: "47",
      change: "+3 this month",
      icon: MapPin,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      percentage: "+6.8%",
    },
    {
      title: "Active Users",
      value: "12,847",
      change: "+1,204 this week",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      percentage: "+10.3%",
    },
    {
      title: "Upcoming Events",
      value: "23",
      change: "5 this week",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      percentage: "+27.8%",
    },
    {
      title: "Archive Items",
      value: "3,421",
      change: "+89 this month",
      icon: Archive,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      percentage: "+2.7%",
    },
  ]

  const additionalStats = [
    {
      title: "Virtual Tours",
      value: "156",
      change: "12 new this week",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      percentage: "+8.3%",
    },
    {
      title: "Global Reach",
      value: "89",
      change: "Countries served",
      icon: Globe,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      percentage: "+5 new",
    },
    {
      title: "Platform Activity",
      value: "94.2%",
      change: "Uptime this month",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      percentage: "99.9%",
    },
    {
      title: "User Engagement",
      value: "8.4m",
      change: "Page views this month",
      icon: TrendingUp,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      percentage: "+15.2%",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`${stat.borderColor} border-2 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">{stat.title}</CardTitle>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  {stat.change}
                </p>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.percentage}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Platform Analytics</h3>
          <p className="text-slate-600">Comprehensive overview of platform performance and engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalStats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs font-medium text-slate-500 bg-white/70 px-2 py-1 rounded-full">
                  {stat.percentage}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <p className="text-sm text-slate-600">{stat.title}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
