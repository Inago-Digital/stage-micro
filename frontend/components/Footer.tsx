import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-dark px-5 md:px-20 py-16 md:py-8 text-dark-gray">
      <p className="mb-10">
        <span className="font-medium">Provozovatel:</span> PACCA s.r.o.,
        Františkovská 233/6, Liberec Liberec III-Jeřáb, 460&nbsp;07,
        IČ:&nbsp;04975154
      </p>

      <div className="md:flex md:justify-between">
        <p className="font-sm mb-8">Copyright &copy; 2025</p>

        <Link href="https://inago.cz" target="_blank" rel="noopener noreferrer">
          <Image
            src="/graphic/logo_inago.svg"
            alt="Inago Logo"
            className="w-48 h-auto"
            width={192}
            height={48}
          />
        </Link>
      </div>
    </footer>
  )
}
