import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Crypthor — Guías de Criptomonedas Independientes',
    template: '%s | Crypthor',
  },
  description:
    'Guías, comparativas y análisis independientes sobre criptomonedas, exchanges y wallets. Todo lo que necesitas para invertir en crypto con criterio.',
  metadataBase: new URL('https://crypthor.io'),
  openGraph: { type: 'website', locale: 'es_ES', siteName: 'Crypthor' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: 'NAX43QmKXExL4kQNMXT8GXq6JR2C7BEO25pQQ1VPM9E' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore – Impact.com uses non-standard `value` attribute */}
        <meta name="impact-site-verification" value="10939b30-da51-4bcf-b16d-d39519d0b4b6" />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <span className="text-white font-serif text-xl font-bold tracking-tight">
            Crypt<span className="text-yellow-400">hor</span>
          </span>
          <span className="hidden sm:inline text-xs text-yellow-300 border border-yellow-800 px-2 py-0.5 rounded">
            Independiente
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="/" className="hover:text-white transition-colors">Guías</a>
          <a href="/?cat=Comparativas" className="hover:text-white transition-colors">Comparativas</a>
          <a href="/?cat=Inversión+y+análisis" className="hover:text-white transition-colors">Análisis</a>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-serif text-white font-bold text-lg mb-2">Crypthor</p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Guías, comparativas y análisis independientes sobre criptomonedas, exchanges y wallets. Sin patrocinadores que condicionen nuestras opiniones.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Aviso legal</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Este sitio contiene enlaces de afiliado. Ganamos una comisión si realizas una compra a través de nuestros enlaces, sin coste adicional para ti. Nuestros análisis y rankings son editorialmente independientes.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Legal</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="/privacidad" className="hover:text-yellow-300 transition-colors">Política de privacidad</a></li>
              <li><a href="/terminos" className="hover:text-yellow-300 transition-colors">Términos de uso</a></li>
              <li><a href="/afiliados" className="hover:text-yellow-300 transition-colors">Divulgación de afiliados</a></li>
            </ul>
            <p className="text-xs text-slate-500 mt-4">
              Invertir en criptomonedas conlleva riesgos. Esto no es asesoramiento financiero.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Crypthor. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
