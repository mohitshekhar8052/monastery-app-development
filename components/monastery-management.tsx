import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, MapPin } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MonasteryManagement() {
  const monasteries = [
    {
      id: 1,
      name: "Potala Palace",
      location: "Lhasa, Tibet",
      status: "Active",
      tours: 12,
      visitors: 2847,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Jokhang Temple",
      location: "Lhasa, Tibet",
      status: "Active",
      tours: 8,
      visitors: 1923,
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      name: "Sera Monastery",
      location: "Lhasa, Tibet",
      status: "Pending",
      tours: 5,
      visitors: 1456,
      lastUpdated: "2024-01-13",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monastery Management</CardTitle>
            <CardDescription>Manage monastery listings, virtual tours, and information</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Monastery
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search monasteries..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tours</TableHead>
              <TableHead>Visitors</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monasteries.map((monastery) => (
              <TableRow key={monastery.id}>
                <TableCell className="font-medium">{monastery.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    {monastery.location}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={monastery.status === "Active" ? "default" : "secondary"}>{monastery.status}</Badge>
                </TableCell>
                <TableCell>{monastery.tours}</TableCell>
                <TableCell>{monastery.visitors.toLocaleString()}</TableCell>
                <TableCell>{monastery.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
