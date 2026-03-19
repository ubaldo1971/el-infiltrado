/**
 * FeaturedArticle — Artículo destacado con imagen grande y overlay.
 * Ahora con Link para navegar a la página completa.
 */
import { Link } from 'react-router-dom';

export default function FeaturedArticle({ article }) {
    if (!article) return null;

    const articleUrl = `/articulo/${article.id}`;

    return (
        <Link to={articleUrl} className="block">
            <article className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                {/* Background image */}
                <div className="relative h-72 md:h-96">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 lg:p-20">
                    {/* Category badge */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            {article.category}
                        </span>
                        {article.sponsored && (
                            <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                Patrocinado
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1
                        className="text-xl md:text-3xl font-black text-white leading-tight mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {article.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 max-w-2xl line-clamp-2">
                        {article.excerpt}
                    </p>

                    {/* Meta + CTA */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-4 text-white/60 text-xs">
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.date || new Date(article.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span>•</span>
                            <span>{article.readTime} lectura</span>
                        </div>

                        <span className="bg-accent hover:bg-accent-hover text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/30">
                            Leer Más
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
