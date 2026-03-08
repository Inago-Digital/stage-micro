import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Stage",
  description:
    "Jeden z nejdéle fungujících hudebních klubů v České republice během své téměř 30 leté existence hostil řadu významných českých i zahraničních interpretů. Nyní je klub po kompletní rekonstrukci, vede ho Tomáš Hájíček ml. a píše tak novou kapitolu tohoto místa.",
  abstract:
    "Stage je hudební klub v Brně, který se nachází v prostorách bývalé továrny na výrobu obuvi. Klub byl založen v roce 1992 a od té doby se stal jedním z nejvýznamnějších hudebních klubů v České republice. Stage hostí širokou škálu hudebních žánrů, včetně rocku, popu, elektronické hudby a jazzu. Klub je známý pro svou vynikající akustiku a přátelskou atmosféru, která přitahuje jak místní obyvatele, tak i návštěvníky z celého světa. Stage také podporuje místní hudební scénu a často pořádá koncerty mladých talentů.",
  keywords: [
    "hudební klub",
    "Brno",
    "koncerty",
    "rock",
    "pop",
    "elektronická hudba",
    "jazz",
    "místní hudební scéna",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
