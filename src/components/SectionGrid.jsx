/**
 * SectionGrid — Sección de categoría con grid de artículos.
 * Diseño limpio con separación visual clara.
 */
import ArticleCard from './ArticleCard';

export default function SectionGrid({ id, title, articles, variant = 'default' }) {
    if (!articles || articles.length === 0) return null;

    return (
        <section id={id} className="scroll-mt-20 pt-20 pb-10 first:pt-0 first:border-t-0 border-t border-border/50">
            {/* Section header */}
            <div className="flex flex-col items-center gap-2 mb-12">
                <div className="flex items-center justify-center w-full gap-4">
                    <div className="flex-1 h-px bg-border/50" />
                    <h2
                        className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-wide text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        {title}
                    </h2>
                    <div className="flex-1 h-px bg-border/50" />
                </div>
                <a
                    href="#"
                    className="text-xs font-bold text-accent uppercase tracking-wider hover:underline whitespace-nowrap"
                >
                    Ver Todo →
                </a>
            </div>

            {/* Articles grid */}
            {variant === 'horizontal' ? (
                <div className="grid grid-cols-1 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="horizontal" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </section>
    );
}
