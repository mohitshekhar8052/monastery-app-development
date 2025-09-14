"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

// Mock events data
const events = [
  {
    id: "hemis-festival-2024",
    title: "Hemis Festival",
    date: "2024-07-15",
    type: "festival",
    monastery: "Hemis Monastery",
    color: "bg-red-500",
  },
  {
    id: "losar-celebration",
    title: "Losar New Year",
    date: "2024-02-10",
    type: "celebration",
    monastery: "Multiple Monasteries",
    color: "bg-blue-500",
  },
  {
    id: "buddha-purnima",
    title: "Buddha Purnima",
    date: "2024-05-23",
    type: "religious",
    monastery: "All Monasteries",
    color: "bg-yellow-500",
  },
  {
    id: "monlam-prayer",
    title: "Monlam Prayer Festival",
    date: "2024-03-15",
    type: "prayer",
    monastery: "Ganden Monastery",
    color: "bg-green-500",
  },
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const getEventsForDate = (date: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    return events.filter((event) => event.date === dateString)
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>)
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = getEventsForDate(date)
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, date).toDateString()
      const isSelected =
        selectedDate && selectedDate.toDateString() === new Date(currentYear, currentMonth, date).toDateString()

      days.push(
        <div
          key={date}
          className={`h-24 p-1 border border-border cursor-pointer hover:bg-muted/50 transition-colors ${
            isToday ? "bg-primary/10 border-primary" : ""
          } ${isSelected ? "bg-accent/20" : ""}`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, date))}
        >
          <div className="h-full flex flex-col">
            <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{date}</div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${event.color}`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
              )}
            </div>
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {months[currentMonth]} {currentYear}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Today
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
          {/* Header row with days of the week */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="h-10 bg-muted flex items-center justify-center text-sm font-medium border-r border-border last:border-r-0"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {renderCalendarDays()}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Festivals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Celebrations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Religious Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Prayer Ceremonies</span>
          </div>
        </div>

        {/* Selected date events */}
        {selectedDate && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">
              Events on{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>
            {getEventsForDate(selectedDate.getDate()).length > 0 ? (
              <div className="space-y-2">
                {getEventsForDate(selectedDate.getDate()).map((event) => (
                  <div key={event.id} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded ${event.color}`}></div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.monastery}</div>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events scheduled for this date.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
