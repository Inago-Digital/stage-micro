"use client"

import Navigation from "@/components/Navigation"
import Image from "next/image"
import partners from "@/data/partners.json"
import tags from "@/data/tags.json"
import Footer from "@/components/Footer"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Event } from "@/types/Event"
import EventItem from "@/components/EventItem"

export default function Home({ events }: { events: Event[] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <>
      <Navigation />

      <main className="p-5 md:p-20 pt-16 md:pt-28 bg-dark relative bg-[url('/graphic/smoke.png')] md:flex md:gap-16 md:h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="md:w-1/2"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <Image
              src="/graphic/thorns_primary.svg"
              alt="Stage Klub Logo"
              className="w-50 md:w-80 h-auto"
              width={200}
              height={100}
            />
          </motion.div>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-16 text-7xl text-white hidden md:inline-block"
          >
            Multižánrový
            <br />
            klub
            <br />
            <span className="oblique">v Jablonci</span>
          </motion.h1>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-12 text-6xl text-white md:hidden"
          >
            Hudební klub
            <br />
            <span className="oblique">v Jablonci</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="mt-10 text-white text-xl"
          >
            Nová kapitola jednoho z nejstarších hudebních klubů v Česku. Přijďte
            se přesvědčit na vlastní uši!
          </motion.p>
          <motion.a
            href="#program"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="uppercase flex items-center justify-center mt-16 bg-primary text-white text-2xl font-bold h-20 w-80 rounded-lg hover:bg-primary-pale transition-colors"
          >
            Program
          </motion.a>
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mt-16 md:w-1/2 md:mt-10"
        >
          <Image
            src="/graphic/video_thumb.png"
            alt="Video Thumbnail"
            className="w-full h-auto z-10 relative object-cover rounded-xl"
            width={800}
            height={800}
          />
        </motion.div>

        <div className="absolute w-full h-[125px] bottom-0 bg-white left-0 md:hidden"></div>
      </main>

      <section
        className="bg-white px-5 py-16 md:px-56 md:py-32 flex flex-col items-center"
        id="program"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-8xl font-bold uppercase mb-10 md:mb-16"
        >
          Program
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="w-full"
        >
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </motion.div>
      </section>

      <section
        className="bg-dark px-5 md:px-20 py-16 md:py-24 flex flex-col md:flex-row md:gap-20"
        id="o-klubu"
      >
        <div className="md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-white mb-8 hidden md:inline-block"
          >
            Multižánrové
            <br />
            kulturní místo
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl text-white mb-8 md:hidden"
          >
            Moderní multifunkční
            <br />
            klub
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white mb-8 md:mb-10"
          >
            Jeden z nejdéle fungujících hudebních klubů v České republice během
            své téměř 30 leté existence hostil řadu významných českých i
            zahraničních interpretů. Nyní je klub po kompletní rekonstrukci,
            vede ho Tomáš Hájíček ml. a píše tak novou kapitolu tohoto místa.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="flex flex-wrap gap-3"
          >
            {tags.map((tag) => (
              <motion.h3
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{
                  scale: 1.05,
                  rotateZ: -2,
                }}
                className="text-xl text-primary inline py-4 px-5 border-primary border rounded-xl"
              >
                {tag}
              </motion.h3>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.825008000747!2d15.16989931271069!3d50.72318557152738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ecad024a94ddf%3A0x359033d656bb40c1!2sJir%C3%A1skova%204898%2F9%2C%20466%2001%20Jablonec%20nad%20Nisou%201!5e0!3m2!1sen!2scz!4v1754993538104!5m2!1sen!2scz"
            loading="lazy"
            height="280"
            className="mt-12 w-full rounded-xl mb-10 md:mt-0"
          ></iframe>

          <p className="text-white font-bold text-xl leading-6 mb-8">
            Jiráskova 4898/9, 466 01 Jablonec nad Nisou 1
          </p>
          <div className="md:flex md:gap-10">
            <motion.a
              href="mailto:klubstage@seznam.cz"
              whileHover={{ scale: 1.05 }}
              className="text-white font-bold hover:underline flex items-center gap-4 text-xl mb-4 md:mb-0"
            >
              <Image
                src="/icons/email.svg"
                className="w-6 h-auto"
                alt="Email Icon"
                width={24}
                height={24}
              />
              klubstage@seznam.cz
            </motion.a>
            <motion.a
              href="tel:+420 725 293 312"
              whileHover={{ scale: 1.05 }}
              className="text-white font-bold hover:underline flex items-center gap-4 text-xl"
            >
              <Image
                src="/icons/phone.svg"
                className="w-6 h-auto"
                alt="Phone Icon"
                width={24}
                height={24}
              />
              +420 725 293 312
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section
        className="bg-white px-5 md:px-20 py-16 md:py-24 flex flex-col items-center"
        id="partners"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold uppercase mb-10"
        >
          Partneři
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`/partners/${partner}`}
                alt={partner.replace(".png", "")}
                className="md:px-10 object-contain md:w-64"
                width={200}
                height={100}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
