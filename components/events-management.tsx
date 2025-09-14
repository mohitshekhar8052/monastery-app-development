import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EventsManagement() {
  const events = [
    {
      id: 1,
      name: "Losar Festival",
      monastery: "Potala Palace",
      date: "2024-02-10",
      type: "Festival",
      attendees: 450,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Meditation Retreat",
      monastery: "Sera Monastery",
      date: "2024-01-25",
      type: "Retreat",
      attendees: 89,
      status: "Active",
    },
    {
      id: 3,
      name: "Teaching Session",
      monastery: "Jokhang Temple",
      date: "2024-01-20",
      type: "Teaching",
      attendees: 234,
      status: "Completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Events Management</CardTitle>
            <CardDescription>Manage cultural events, festivals, and ceremonies</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Monastery</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.monastery}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                    {event.date}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{event.type}</Badge>
                </TableCell>
                <TableCell>{event.attendees}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      event.status === "Active" ? "default" : event.status === "Upcoming" ? "secondary" : "outline"
                    }
                  >
                    {event.status}
                  </Badge>
                </TableCell>
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
