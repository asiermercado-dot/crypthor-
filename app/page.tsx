import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, CATEGORIES, type Article } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Crypthor — Guías de Criptomonedas Independientes',
  description:
    'Guías, comparativas y análisis independientes sobre criptomonedas, exchanges y wallets. Todo lo que necesitas para invertir en crypto con criterio.',
}

interface HomePageProps {
  searchParams: { cat?: string }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const allArticles = getAllArticles()
  const activeCategory = searchParams.cat ?? ''
  const filtered = activeCategory
    ? allArticles.filter((a) => a.category === activeCategory)
    : allArticles
  const featured = filtered.slice(0, 6)
  const rest = filtered.slice(6)

  return (
    <>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href="/"
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              !activeCategory
                ? 'bg-yellow-400 text-slate-950 border-yellow-400'
                : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-700'
            }`}
          >
            Todo
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`/?cat=${encodeURIComponent(cat)}`}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-yellow-400 text-slate-950 border-yellow-400'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-700'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            {activeCategory || 'Últimas guías'}
          </h2>
          <span className="text-sm text-gray-400">{filtered.length} guías publicadas</span>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Remaining list */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {rest.map((article) => (
              <ArticleCardCompact key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
      <TrustBanner />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-slate-950 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-medium text-yellow-300 border border-yellow-800 bg-slate-900/60 px-3 py-1 rounded-full mb-5">
          Independiente · Sin sesgos · Actualizado 2026
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-5 leading-tight">
          Guías de Cripto<br />que Puedes Confiar
        </h1>
        <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Desde cómo comprar tu primera Bitcoin hasta analizar el próximo bull run — guías honestas para invertidores de todos los niveles.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-yellow-300">
          {['Bitcoin', 'Ethereum', 'Exchanges', 'Wallets', 'Bull Run'].map((tag) => (
            <span
              key={tag}
              className="border border-yellow-800 px-3 py-1 rounded-full hover:border-yellow-500 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-yellow-300 transition-all duration-200"
    >
      <div className="h-1.5 w-full bg-yellow-400" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.verified && <span className="badge-verificado">✓ Verificado</span>}
        </div>
        <h3 className="font-serif text-gray-900 font-bold text-lg mb-2 leading-snug group-hover:text-yellow-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
          <span>{article.readingTime} min lectura</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString('es-ES', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArticleCardCompact({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-yellow-300 hover:shadow-sm transition-all duration-200 bg-white"
    >
      <div className="w-1 flex-shrink-0 self-stretch bg-yellow-400 rounded-full" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
          {article.category}
        </span>
        <h3 className="font-serif text-gray-900 font-semibold mt-1.5 mb-1 text-sm leading-snug group-hover:text-yellow-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400">{article.readingTime} min lectura</p>
      </div>
    </Link>
  )
}

function TrustBanner() {
  const stats = [
    { value: '100+', label: 'Guías publicadas' },
    { value: '4', label: 'Exchanges analizados' },
    { value: '6', label: 'Categorías cubiertas' },
    { value: '100%', label: 'Independiente' },
  ]
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-serif font-bold text-yellow-500">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
