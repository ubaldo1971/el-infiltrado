/**
 * ArticleCard — Tarjeta de artículo reutilizable.
 * Ahora con Link para navegar a la página completa del artículo.
 */
import { Link } from 'react-router-dom';

export default function ArticleCard({ article, variant = 'default' }) {
    if (!article) return null;

    const articleUrl = `/articulo/${article.id}`;

    /* ===== Horizontal variant (for section grids) ===== */
    if (variant === 'horizontal') {
        return (
            <Link to={articleUrl} className="block">
                <article className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-48 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            {article.category}
                        </span>
                        {article.sponsored && (
                            <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                Patrocinado
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                        <div>
                            <h3 className="text-base font-bold text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">
                                {article.excerpt}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-text-muted">
                                <span>{article.date || new Date(article.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
                            </div>
                            <span className="text-accent text-xs font-bold uppercase tracking-wide hover:underline">
                                Leer Más
                            </span>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    /* ===== Default vertical card ===== */
    return (
        <Link to={articleUrl} className="block">
            <article className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {article.category}
                    </span>
                    {article.sponsored && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            Patrocinado
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                        {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                            <span className="font-medium text-text-secondary">{article.author}</span>
                            <span>•</span>
                            <span>{article.date || new Date(article.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
                        </div>
                        <span className="text-xs text-text-muted">{article.readTime}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
