import { fetchStrapi } from "@/utils/fetchStrapi"
import Home from "./page"
import { Event } from "@/types/Event"

export default async function Layout() {
  const events = await fetchStrapi<Event[]>("events")

  return <Home events={events} />
}
