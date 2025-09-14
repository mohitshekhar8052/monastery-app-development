import { Button } from "@/components/ui/button"
import { Bell, Settings, User, LogOut, Search, Menu, Home } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-cyan-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">🏛️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-cyan-800 bg-clip-text text-transparent">
                  Monastery Platform
                </h1>
                <p className="text-sm text-slate-500 font-medium">Admin Dashboard</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <Home className="w-4 h-4" />
              <span>/</span>
              <span className="text-slate-700 font-medium">Admin</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-white/80 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <Button variant="ghost" size="sm" className="relative hover:bg-slate-100 rounded-xl">
              <Bell className="w-5 h-5 text-slate-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-xl px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center mr-2">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-slate-900">Admin User</div>
                    <div className="text-xs text-slate-500">admin@monastery.com</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/95 backdrop-blur-sm border-slate-200/50 shadow-xl"
              >
                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                  <User className="w-4 h-4 mr-2 text-slate-600" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-50 cursor-pointer">
                  <Settings className="w-4 h-4 mr-2 text-slate-600" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-red-50 text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" className="md:hidden hover:bg-slate-100 rounded-xl">
              <Menu className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
