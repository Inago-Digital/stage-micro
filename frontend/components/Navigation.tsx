"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    const body = document.body

    if (menuOpen) {
      scrollYRef.current = window.scrollY
      body.style.position = "fixed"
      body.style.top = `-${scrollYRef.current}px`
      body.style.left = "0"
      body.style.right = "0"
      body.style.overflow = "hidden"
      body.style.height = "100vh"
      return
    }

    const wasLocked = body.style.position === "fixed"
    body.style.position = ""
    body.style.top = ""
    body.style.left = ""
    body.style.right = ""
    body.style.overflow = ""
    body.style.height = ""

    if (wasLocked) {
      window.scrollTo(0, scrollYRef.current)
    }
  }, [menuOpen])

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "#program", label: "Program" },
    { href: "#o-klubu", label: "O klubu" },
  ]

  return (
    <>
      <header className="flex justify-between items-center bg-dark z-50 fixed top-0 left-0 right-0 md:h-28 max-w-screen">
        <Link href="#">
          <Image
            src="/graphic/logo.svg"
            alt="Stage Klub Logo"
            className="w-50 md:w-80 h-auto ml-5 md:ml-20"
            width={200}
            height={100}
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8 mr-20">
          <Link
            href="#program"
            className="text-white text-xl font-bold underline hover:text-primary uppercase transition-colors"
          >
            Program
          </Link>
          <Link
            href="#o-klubu"
            className="text-white text-xl font-bold underline hover:text-primary uppercase transition-colors"
          >
            O klubu
          </Link>

          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/stage_klub/"
              className="bg-darker-gray w-16 h-16 flex justify-center items-center cursor-pointer rounded-lg hover:bg-dark-gray transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram Icon"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61574165311841"
              className="bg-darker-gray w-16 h-16 flex justify-center items-center cursor-pointer rounded-lg hover:bg-dark-gray transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image
                src="/icons/facebook.svg"
                alt="Facebook Icon"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </Link>
          </div>
        </div>

        <button
          id="menu-toggle"
          className="md:hidden bg-primary w-16 h-16 flex justify-center items-center cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="flex flex-col items-end justify-between w-8 h-[19px]">
            <motion.span
              className="bg-white w-full h-[3px] block"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="bg-white w-full h-[3px] block"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="bg-white h-[3px] block"
              animate={
                menuOpen
                  ? { rotate: -45, y: -8, width: "100%" }
                  : { rotate: 0, y: 0, width: "50%" }
              }
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="fixed inset-0 top-16 bg-primary z-20 md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src="/graphic/thorns_dark.svg"
              alt="Stage Klub Logo"
              className="w-50 h-auto ml-5"
              width={200}
              height={100}
            />

            <ul className="mt-6 space-y-8 p-5">
              {mobileLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  {link.href === "/" ? (
                    <Link
                      href={link.href}
                      className="text-white text-5xl font-bold underline hover:text-dark transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white text-5xl font-bold underline hover:text-dark transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
