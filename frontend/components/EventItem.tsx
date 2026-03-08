import { Event } from "@/types/Event"
import Link from "next/link"
import { motion } from "framer-motion"

const toDate = (value: string | Date) =>
  value instanceof Date ? value : new Date(value)

const dayShort = (value: string | Date) =>
  new Intl.DateTimeFormat("cs-CZ", { weekday: "short" }).format(toDate(value))

const dayMonth = (value: string | Date) =>
  new Intl.DateTimeFormat("cs-CZ", { day: "2-digit", month: "2-digit" }).format(
    toDate(value),
  )

export default function EventItem({ event }: { event: Event }) {
  return (
    <motion.article
      className="mb-6 w-full rounded-lg border border-gray p-6 md:flex md:justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="text-3xl font-medium uppercase md:w-32">
        {dayShort(event.date)}
        <br className="hidden md:inline-block" />
        <span className="text-primary">{dayMonth(event.date)}</span>
      </p>

      <section className="md:w-9/12">
        <h3 className="mt-4 text-xl font-normal md:mt-0">{event.title}</h3>
        <p className="mt-3">{event.description}</p>
      </section>

      <div className="mt-6 flex gap-2 md:mt-0 md:h-20 md:w-48 md:flex-col">
        {event.eTicketLink && (
          <Link
            href={event.eTicketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 flex-1 items-center justify-center rounded bg-primary-pale text-sm text-white transition-colors hover:bg-primary"
          >
            eVSTUPENKA
          </Link>
        )}

        {event.gooutLink && (
          <Link
            href={event.gooutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 flex-1 items-center justify-center rounded bg-dark text-sm text-white transition-colors hover:bg-black"
          >
            vstupenky goout
          </Link>
        )}
      </div>
    </motion.article>
  )
}
