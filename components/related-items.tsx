import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ImageIcon, Music } from "lucide-react"

// Mock related items data
const relatedItemsData = {
  "prajnaparamita-sutra": {
    id: "prajnaparamita-sutra",
    title: "Prajnaparamita Sutra",
    type: "manuscript",
    image: "/placeholder.svg?key=sutra",
    monastery: "Ganden Monastery",
  },
  "vinaya-texts": {
    id: "vinaya-texts",
    title: "Vinaya Texts Collection",
    type: "manuscript",
    image: "/placeholder.svg?key=vinaya",
    monastery: "Samye Monastery",
  },
  "abhidhamma-collection": {
    id: "abhidhamma-collection",
    title: "Abhidhamma Commentary",
    type: "manuscript",
    image: "/placeholder.svg?key=abhidhamma",
    monastery: "Hemis Monastery",
  },
}

const typeIcons = {
  manuscript: BookOpen,
  artifact: ImageIcon,
  audio: Music,
  artwork: ImageIcon,
  photograph: ImageIcon,
}

interface RelatedItemsProps {
  itemIds: string[]
}

export function RelatedItems({ itemIds }: RelatedItemsProps) {
  const relatedItems = itemIds.map((id) => relatedItemsData[id as keyof typeof relatedItemsData]).filter(Boolean)

  if (relatedItems.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedItems.map((item) => {
          const IconComponent = typeIcons[item.type as keyof typeof typeIcons]
          return (
            <div key={item.id} className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-12 h-12 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-balance leading-tight mb-1">{item.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <IconComponent className="h-3 w-3" />
                  <span className="capitalize">{item.type}</span>
                  <span>•</span>
                  <span>{item.monastery}</span>
                </div>
              </div>
            </div>
          )
        })}

        <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
          View All Related Items
        </Button>
      </CardContent>
    </Card>
  )
}
