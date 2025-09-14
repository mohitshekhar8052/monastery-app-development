import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, FileText, ImageIcon, Music } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ArchivesManagement() {
  const archives = [
    {
      id: 1,
      title: "Tibetan Book of the Dead",
      type: "Manuscript",
      monastery: "Potala Palace",
      language: "Tibetan",
      condition: "Excellent",
      digitized: true,
      icon: FileText,
    },
    {
      id: 2,
      title: "Buddha Statue Collection",
      type: "Artifact",
      monastery: "Jokhang Temple",
      language: "N/A",
      condition: "Good",
      digitized: true,
      icon: ImageIcon,
    },
    {
      id: 3,
      title: "Chanting Recordings",
      type: "Audio",
      monastery: "Sera Monastery",
      language: "Tibetan",
      condition: "Good",
      digitized: true,
      icon: Music,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Archives Management</CardTitle>
            <CardDescription>Manage digital archives, manuscripts, and cultural artifacts</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Archive Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search archives..." className="pl-10" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Monastery</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {archives.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <item.icon className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.type}</Badge>
                </TableCell>
                <TableCell>{item.monastery}</TableCell>
                <TableCell>{item.language}</TableCell>
                <TableCell>
                  <Badge variant={item.condition === "Excellent" ? "default" : "secondary"}>{item.condition}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.digitized ? "default" : "destructive"}>
                    {item.digitized ? "Digitized" : "Pending"}
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
