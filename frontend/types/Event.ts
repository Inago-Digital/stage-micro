import z from "zod"

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  eTicketLink: z.string().nullable(),
  gooutLink: z.string().nullable(),
})

export type Event = z.infer<typeof EventSchema>
