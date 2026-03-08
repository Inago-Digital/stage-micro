import { fetchStrapi } from "@/utils/fetchStrapi"
import Home from "./page"
import { Event } from "@/types/Event"

export default async function Layout() {
  const events = await fetchStrapi<Event[]>("events")

  events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((event) => {
      const eventDate = new Date(event.date)
      const now = new Date()
      return eventDate >= now
    })

  return <Home events={events} />
}
